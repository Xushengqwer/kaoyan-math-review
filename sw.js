// 简单的离线缓存：优先使用缓存，后台静默更新，方便在地铁/宿舍弱网环境下阅读。
const CACHE_NAME = "kaoyan-math-v182";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "assets/css/style.css?v=182",
  "assets/js/data-loader.js",
  "assets/js/storage.js",
  "assets/js/katex-init.js?v=111",
  "assets/js/app.js?v=181",
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

// 装新缓存时绕过浏览器的 HTTP 缓存（cache: "reload"）：GitHub Pages 让文件在 HTTP 缓存里留 10 分钟，
// 不绕过的话，新版本的缓存里装进去的可能还是旧的数据文件，刷新多少次都看不到更新（2026-10-12 v163 就是这样）。
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS.map((url) => new Request(url, { cache: "reload" }))))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
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
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
