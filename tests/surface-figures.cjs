// 卡片里的曲面示意图（第 4 章第⑤站，assets/images/surfaces/，tools/surface-fig.cjs 生成）：
// 引用的图都在、都进了离线清单；图里没有深色规则（打印 / 导出 PDF 一律浅色），深色由网站 CSS 只在屏幕上反相；
// 搜索摘要不露文件路径；图片缓存升版本号不删、清单外的图会清掉。
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { read, abs } = require("../tools/lib.cjs");

const DIR = "assets/images/surfaces/";
const swSrc = read("sw.js");
const listed = [...swSrc.matchAll(/"(assets\/images\/[^"]+)"/g)].map((m) => m[1]);
const onDisk = fs.readdirSync(abs(DIR)).filter((f) => f.endsWith(".svg")).map((f) => DIR + f);

// 1. 数据里引用的图：文件在、进了 sw.js 的 IMAGES；目录里的图都在清单里
const data = ["assets/data/calculus.js", "assets/data/linalg.js", "assets/data/probability.js", "assets/data/notes.js"].map(read).join("\n");
const used = [...new Set([...data.matchAll(/!\[[^\]\n]*\]\((assets\/images\/[^)\s]+)\)/g)].map((m) => m[1]))];
assert(used.length >= 21, "数据里引用了曲面图：" + used.length);
for (const u of used) {
  assert(fs.existsSync(abs(u)), "图片文件存在：" + u);
  assert(listed.includes(u), "图片在 sw.js 的 IMAGES 里：" + u);
}
for (const f of onDisk) assert(listed.includes(f), "目录里的图都在 IMAGES 里：" + f);
for (const l of listed) assert(fs.existsSync(abs(l)), "IMAGES 里的图都存在：" + l);

// 2. 图里没有深色规则（SVG 当 <img> 用时内部的 prefers-color-scheme 不认打印）
for (const f of onDisk) {
  const svg = read(f);
  assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 \d+ \d+"/, "SVG 开头：" + f);
  assert(!/prefers-color-scheme/.test(svg), "图里没有深色规则：" + f);
}

// 3. 深色反相只在 screen and (prefers-color-scheme: dark) 里
const css = read("assets/css/style.css").replace(/\/\*[\s\S]*?\*\//g, "");
const filt = [...css.matchAll(/@media\s+([^{]+)\{\s*img\[src\*="images\/surfaces\/"\]\s*\{[^}]*filter:\s*invert\(1\)/g)];
assert.equal(filt.length, 1, "曲面图的深色反相规则只有一条");
assert.equal(filt[0][1].trim(), "screen and (prefers-color-scheme: dark)", "反相只给屏幕");
assert(!/img\[src\*="images\/surfaces\/"\][^}]*filter/.test(css.replace(filt[0][0], "")), "别处没有给曲面图加滤镜");

// 4. 渲染成独立一段的 <img>；搜索、摘要只留说明文字
const ctx = vm.createContext({ window: {}, document: { compatMode: "CSS1Compat", addEventListener() {} }, console });
for (const file of ["assets/vendor/marked/marked.umd.js", "assets/js/data-loader.js", "assets/js/storage.js",
  "assets/data/calculus.js", "assets/data/linalg.js", "assets/data/probability.js", "assets/data/notes.js",
  "assets/data/superseded.js", "assets/data/mindmaps.js", "assets/js/katex-init.js", "assets/js/app.js"]) vm.runInContext(read(file), ctx);
const { mdHtml, searchText, plainText } = vm.runInContext("({ mdHtml, searchText, plainText })", ctx);
const md = "* **椭圆柱面**：$x^2 = 1$\n\n![椭圆柱面](assets/images/surfaces/cylinder-elliptic.svg)\n\n* **双曲柱面**：$y$";
assert.match(mdHtml(md), /<p><img src="assets\/images\/surfaces\/cylinder-elliptic\.svg" alt="椭圆柱面"><\/p>/, "图片单独一段");
assert(!/assets\/images/.test(searchText(md)) && searchText(md).includes("椭圆柱面"), "搜索文字里只留说明");
assert(!/assets\/images|svg/.test(plainText(md)) && plainText(md).includes("椭圆柱面"), "摘要里只留说明");

// 5. 离线缓存：图片单独一个缓存，升版本号不删；安装时补齐；清单外的清掉；取到的图存进图片缓存
const stores = {};
const store = (name) => stores[name] || (stores[name] = { items: new Map(), deleted: [] });
class FakeRequest { constructor(input, init = {}) { this.url = typeof input === "string" ? input : input.url; this.mode = "cors"; this.cache = init.cache || "default"; } }
const full = (u) => (/^https?:/.test(u) ? u : "https://site/kaoyan-math-review/" + u);
const handlers = {};
const sw = {
  self: { addEventListener: (t, fn) => { handlers[t] = fn; }, skipWaiting() {}, clients: { claim() {} }, location: { origin: "https://site" } },
  caches: {
    open: async (name) => {
      const s = store(name);
      return {
        addAll: async (list) => list.forEach((r) => s.items.set(full(r.url), true)),
        add: async (u) => { s.items.set(full(u), true); },
        match: async (u) => s.items.get(full(typeof u === "string" ? u : u.url)),
        put: async (r) => { s.items.set(full(r.url), true); },
        keys: async () => [...s.items.keys()].map((url) => ({ url })),
        delete: async (r) => { s.deleted.push(r.url); return s.items.delete(r.url); },
      };
    },
    match: async () => undefined,
    keys: async () => Object.keys(stores),
    delete: async (name) => { stores[name].gone = true; return true; },
  },
  fetch: async () => ({ status: 200, clone() { return this; } }),
  Request: FakeRequest, URL, Promise, Set,
};
vm.runInNewContext(swSrc, sw);
const IMAGE_CACHE = (swSrc.match(/const IMAGE_CACHE = "([^"]+)"/) || [])[1];
const CACHE_NAME = (swSrc.match(/const CACHE_NAME = "([^"]+)"/) || [])[1];
assert(IMAGE_CACHE && !/v\d+/.test(IMAGE_CACHE), "图片缓存名不带版本号：" + IMAGE_CACHE);
(async () => {
  store("kaoyan-math-v1");
  store(IMAGE_CACHE).items.set(full("assets/images/surfaces/old-removed.svg"), true);
  let waited;
  handlers.install({ waitUntil: (p) => { waited = p; } });
  await waited;
  for (const l of listed) assert(store(IMAGE_CACHE).items.has(full(l)), "安装时补齐图片：" + l);
  assert(!store(CACHE_NAME).items.has(full(listed[0])), "图片不进版本缓存");
  handlers.activate({ waitUntil: (p) => { waited = p; } });
  await waited;
  assert(stores["kaoyan-math-v1"].gone, "旧版本缓存删掉");
  assert(!stores[IMAGE_CACHE].gone, "图片缓存不删");
  assert(!store(IMAGE_CACHE).items.has(full("assets/images/surfaces/old-removed.svg")), "清单外的图清出缓存");
  store(IMAGE_CACHE).items.clear();
  let resp;
  handlers.fetch({ request: { method: "GET", url: full(listed[0]), mode: "no-cors" }, respondWith: (p) => { resp = p; } });
  await resp;
  await new Promise((r) => setTimeout(r, 10));
  assert(store(IMAGE_CACHE).items.has(full(listed[0])), "取到的图存进图片缓存");
  console.log("surface figures ok（数据引用 " + used.length + " 张，离线清单 " + listed.length + " 张）");
})().catch((e) => { console.error(e); process.exit(1); });
