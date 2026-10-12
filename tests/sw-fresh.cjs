// 离线缓存不能装进旧文件：装新缓存时绕过 HTTP 缓存，后台更新时向服务器确认（2026-10-12 v163 缓存里装的是旧数据文件）
const assert = require("node:assert/strict");
const vm = require("node:vm");
const { read } = require("../tools/lib.cjs");

const src = read("sw.js");
const handlers = {};
const made = [];
class FakeRequest {
  constructor(input, init = {}) {
    this.url = typeof input === "string" ? input : input.url;
    this.mode = typeof input === "string" ? "cors" : input.mode;
    this.cache = init.cache || "default";
    made.push(this);
  }
}
let added = null;
const fetched = [];
const ctx = {
  self: { addEventListener: (type, fn) => { handlers[type] = fn; }, skipWaiting() {}, clients: { claim() {} }, location: { origin: "https://site" } },
  caches: {
    open: async () => ({ addAll: async (list) => { added = list; }, put: async () => {} }),
    match: async () => undefined,
    keys: async () => [],
    delete: async () => true,
  },
  fetch: async (req) => { fetched.push(req); return { status: 200, clone() { return this; } }; },
  Request: FakeRequest,
  URL,
  Promise,
};
vm.runInNewContext(src, ctx);

(async () => {
  // 安装：每个资源都用 cache: "reload"
  let waited;
  handlers.install({ waitUntil: (p) => { waited = p; } });
  await waited;
  assert(Array.isArray(added) && added.length > 0, "安装时缓存了资源清单");
  assert(added.every((r) => r instanceof FakeRequest && r.cache === "reload"), "安装时绕过 HTTP 缓存");
  assert(added.some((r) => r.url === "assets/data/calculus.js"), "数据文件在清单里");

  // 普通资源：后台更新用 no-cache；页面导航请求原样发出
  for (const [mode, expect] of [["cors", "no-cache"], ["navigate", undefined]]) {
    fetched.length = 0;
    let resp;
    const request = { method: "GET", url: "https://site/assets/data/notes.js", mode };
    handlers.fetch({ request, respondWith: (p) => { resp = p; } });
    await resp;
    assert.equal(fetched.length, 1, mode + "：发了一次请求");
    if (expect) assert.equal(fetched[0].cache, expect, mode + "：后台更新向服务器确认");
    else assert.equal(fetched[0], request, mode + "：导航请求原样发出");
  }
  console.log("sw fresh ok");
})().catch((e) => { console.error(e); process.exit(1); });
