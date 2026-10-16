// 导出 PDF / 打印一律浅色：style.css 里的深色规则只给屏幕（2026-10-16 系统深色时导出的 PDF 是一张张深色卡片）
const assert = require("node:assert/strict");
const { read } = require("../tools/lib.cjs");

const css = read("assets/css/style.css").replace(/\/\*[\s\S]*?\*\//g, "");
const queries = [...css.matchAll(/@media\s+([^{]*prefers-color-scheme\s*:\s*dark[^{]*)\{/g)].map((m) => m[1].trim());
assert(queries.length >= 7, "找到深色规则（变量、mark、站卡、小卡片阴影……）：" + queries.length);
for (const q of queries) assert.match(q, /^screen and \(prefers-color-scheme:\s*dark\)$/, "深色规则只给屏幕：@media " + q);
// 打印块里不能再出现深色规则
for (const block of css.split(/@media\s+print\s*\{/).slice(1)) assert(!/prefers-color-scheme/.test(block.split(/\n\}/)[0]), "@media print 里没有深色规则");
console.log("print light ok (" + queries.length + " 条深色规则只给屏幕)");
