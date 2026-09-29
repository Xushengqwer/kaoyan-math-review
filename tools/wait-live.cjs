// 推送后确认上线：反复读取线上 sw.js 的缓存版本号，直到它等于本地 sw.js 的版本号（最多等 5 分钟）。
// 用法：node tools/wait-live.cjs
const { read } = require("./lib.cjs");

const URL = "https://xushengqwer.github.io/kaoyan-math-review/sw.js";
const want = (read("sw.js").match(/kaoyan-math-v\d+/) || [])[0];
if (!want) { console.error("✗ 本地 sw.js 里找不到版本号"); process.exit(1); }

(async () => {
  const start = Date.now();
  let last = "";
  while (Date.now() - start < 5 * 60 * 1000) {
    try {
      const txt = await (await fetch(URL + "?t=" + Date.now(), { cache: "no-store" })).text();
      last = (txt.match(/kaoyan-math-v\d+/) || ["?"])[0];
      if (last === want) { console.log("✓ 已上线：" + want + "（约 " + Math.round((Date.now() - start) / 1000) + " 秒）"); return; }
    } catch (e) { last = "读取失败：" + e.message; }
    await new Promise((r) => setTimeout(r, 10000));
  }
  console.error("✗ 5 分钟内没等到 " + want + "，线上现在是 " + last);
  process.exit(1);
})();
