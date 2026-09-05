// 简单的离线缓存：优先使用缓存，后台静默更新，方便在地铁/宿舍弱网环境下阅读。
const CACHE_NAME = "kaoyan-math-v11";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "assets/css/style.css",
  "assets/js/data-loader.js",
  "assets/js/storage.js",
  "assets/js/katex-init.js",
  "assets/js/app.js",
  "assets/data/calculus.js",
  "assets/data/linalg.js",
  "assets/data/probability.js",
  "assets/data/notes.js",
  "assets/vendor/katex/katex.min.css",
  "assets/vendor/katex/katex.min.js",
  "assets/vendor/katex/auto-render.min.js",
  "assets/icons/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
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
      const fetchPromise = fetch(event.request)
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
