const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// 防止正文断句漏掉标点、拆散尾随引号，或误拆小数与区间。
const context = vm.createContext({});
vm.runInContext(fs.readFileSync('assets/js/katex-init.js', 'utf8'), context);
assert.equal(typeof context.bookSentenceBreaks, 'function', 'textbook sentence break rules must exist');
const display = (text) => {
  const ends = Array.from(context.bookSentenceBreaks(text));
  let start = 0, out = '';
  for (const end of ends) { out += text.slice(start, end) + '\n'; start = end; }
  return out + text.slice(start);
};
const cases = [
  ['说明，补充。后续；结论！再问？结束。', '说明，\n补充。\n后续；\n结论！\n再问？\n结束。'],
  ['“定义，条件。”下一句。', '“定义，\n条件。”\n下一句。'],
  ['甲！？） 乙。', '甲！？）\n 乙。'],
  ['甲，  ', '甲，  '],
  ['0.5, interval=(0,1); next.', '0.5, interval=(0,1); next.'],
  // U+FFFC 代表完整的行内公式，U+0000 代表已有换行或块边界。
  ['甲，\uFFFC', '甲，\n\uFFFC'],
  ['甲。\u0000乙，继续。', '甲。\u0000乙，\n继续。'],
  ['甲， \u0000乙。', '甲， \u0000乙。'],
];
for (const [input, want] of cases) assert.equal(display(input), want, input);
assert.deepEqual(Array.from(context.bookSentenceBreaks('甲，\n乙。')), [2], 'Markdown soft newline still needs a display break');
console.log('PASS: textbook punctuation breaks preserve closers, existing breaks, decimals and inline math boundaries.');
