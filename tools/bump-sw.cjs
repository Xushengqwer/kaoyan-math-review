// 网站缓存版本号 +1（sw.js 的 CACHE_NAME）。改了任何会发布到网站的文件（数据、代码、样式）都要升，
// 否则手机上装过的网页会继续用旧缓存。一次提交升一次就够。
//
// 用法：node tools/bump-sw.cjs
const { main, must, read, splitLines, writeLines } = require("./lib.cjs");

main(() => {
  const { lines, eol } = splitLines(read("sw.js"));
  const k = lines.findIndex((l) => /^const CACHE_NAME = "kaoyan-math-v\d+";$/.test(l));
  must(k >= 0, "sw.js 里找不到 CACHE_NAME 这一行");
  const v = +lines[k].match(/v(\d+)/)[1];
  lines[k] = 'const CACHE_NAME = "kaoyan-math-v' + (v + 1) + '";';
  writeLines("sw.js", lines, eol);
  console.log("✓ sw.js：v" + v + " → v" + (v + 1));
});
