// 简单的离线缓存：优先使用缓存，后台静默更新，方便在地铁/宿舍弱网环境下阅读。
const CACHE_NAME = "kaoyan-math-v204";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "assets/css/style.css?v=198",
  "assets/js/data-loader.js",
  "assets/js/storage.js",
  "assets/js/katex-init.js?v=111",
  "assets/js/app.js?v=198",
  "assets/data/calculus.js",
  "assets/data/linalg.js",
  "assets/data/probability.js",
  "assets/data/notes.js",
  "assets/data/superseded.js",
  "assets/data/mindmaps.js",
  "assets/vendor/katex/katex.min.css",
  "assets/vendor/katex/katex.min.js",
  "assets/vendor/katex/auto-render.min.js",
  "assets/vendor/marked/marked.umd.js",
  "assets/icons/favicon.svg",
];

// 卡片里的示意图（第 4 章第⑤站曲面图、第⑥站投影图）单独放一个缓存，升版本号时不删：每台设备只下载一次（约 390 KB），
// 安装时补齐还没缓存的，没打开过的章节离线也能看。图改了照常后台静默更新；从清单里去掉的图，激活时清出缓存。
// 新增图片要加进这个清单（tests/surface-figures.cjs 会查数据里引用的图都在清单里）。
const IMAGE_CACHE = "kaoyan-math-images";
const IMAGES = [
  "assets/images/surfaces/cylinder-circular.svg",
  "assets/images/surfaces/cylinder-elliptic.svg",
  "assets/images/surfaces/cylinder-generic.svg",
  "assets/images/surfaces/cylinder-hyperbolic.svg",
  "assets/images/surfaces/cylinder-offset.svg",
  "assets/images/surfaces/cylinder-parabolic.svg",
  "assets/images/surfaces/ellipsoid.svg",
  "assets/images/surfaces/elliptic-cone.svg",
  "assets/images/surfaces/elliptic-paraboloid.svg",
  "assets/images/surfaces/hyperboloid-one-sheet.svg",
  "assets/images/surfaces/hyperboloid-two-sheets.svg",
  "assets/images/surfaces/line-intersect-cone.svg",
  "assets/images/surfaces/line-parallel-cylinder.svg",
  "assets/images/surfaces/line-skew-hyperboloid.svg",
  "assets/images/surfaces/paraboloid-of-revolution.svg",
  "assets/images/surfaces/proj-ball-contour.svg",
  "assets/images/surfaces/proj-cone-hemisphere.svg",
  "assets/images/surfaces/proj-cylinder-and-curve.svg",
  "assets/images/surfaces/proj-cylinder-solid.svg",
  "assets/images/surfaces/proj-elimination-extra.svg",
  "assets/images/surfaces/proj-intersection-curve.svg",
  "assets/images/surfaces/revolution-generic.svg",
  "assets/images/surfaces/saddle.svg",
  "assets/images/surfaces/sphere.svg",
  "assets/images/surfaces/torus.svg",
  "assets/images/surfaces/upper-cone.svg",
  "assets/images/surfaces/upper-hemisphere.svg",
];
const IMAGE_SET = new Set(IMAGES);
// 请求地址 → 清单里的写法（网站挂在 /kaoyan-math-review/ 下，只看 assets/images/ 往后的部分）
function imageKey(url) {
  const p = new URL(url).pathname, i = p.indexOf("/assets/images/");
  return i >= 0 ? p.slice(i + 1) : null;
}

// 装新缓存时绕过浏览器的 HTTP 缓存（cache: "reload"）：GitHub Pages 让文件在 HTTP 缓存里留 10 分钟，
// 不绕过的话，新版本的缓存里装进去的可能还是旧的数据文件，刷新多少次都看不到更新（2026-10-12 v163 就是这样）。
self.addEventListener("install", (event) => {
  event.waitUntil(Promise.all([
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS.map((url) => new Request(url, { cache: "reload" }))))
      .catch(() => {}),
    caches.open(IMAGE_CACHE)
      .then((cache) => Promise.all(IMAGES.map((url) => cache.match(url).then((hit) => hit || cache.add(url).catch(() => {})))))
      .catch(() => {}),
  ]));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(Promise.all([
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== IMAGE_CACHE).map((k) => caches.delete(k)))
    ),
    caches.open(IMAGE_CACHE)
      .then((cache) => cache.keys().then((reqs) => Promise.all(reqs.filter((r) => !IMAGE_SET.has(imageKey(r.url))).map((r) => cache.delete(r)))))
      .catch(() => {}),
  ]));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  // 只缓存本站资源：GitHub API 的响应必须每次实时拿（缓存会导致 sha 过期、提交冲突）
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // 后台更新同样要向服务器确认（no-cache 会带 ETag 去问，没变就 304，很快）；页面导航请求不能改 cache 模式
      const fresh = event.request.mode === "navigate" ? event.request : new Request(event.request, { cache: "no-cache" });
      const fetchPromise = fetch(fresh)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            const store = IMAGE_SET.has(imageKey(event.request.url)) ? IMAGE_CACHE : CACHE_NAME;
            caches.open(store).then((cache) => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
