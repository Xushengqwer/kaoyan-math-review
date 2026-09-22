const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({ document: { addEventListener() {} } });
for (const file of ['assets/vendor/marked/marked.umd.js', 'assets/js/katex-init.js', 'assets/js/app.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context);
}
const render = (fn, text) => { context.sample = text; return vm.runInContext(fn + '(sample)', context); };

const book = render('bookParts', '### 〔定义〕\n\n原定义。\n\n### 意义\n\n原意义 $|A|$。\n\n### 〔提示〕\n\n原提示。');
assert(book.main.includes('<div class="term"><div class="term-label meaning">〔意义〕</div>'));
assert(book.main.includes('原意义 $|A|$。'));
assert(book.tip.includes('原提示。'));
assert(render('bookParts', '### 〔意义〕用途\n\n正文').main.includes('term-label meaning'));

for (const title of ['例题', '例题 1：计算', '〔例题〕计算', '三、例题：计算', '**例题**']) {
  const html = render('noteMdHtml', '### ' + title + '\n\n原文 $a_1$。');
  assert(html.includes('<h3 class="term-head ex">'), title);
  assert(html.includes('原文 $a_1$。'));
}
for (const title of ['【小题 1】计算', '【小题 2】计算', '小题1：计算', '小题二：计算', '**【小题 3】计算**']) {
  assert(render('noteMdHtml', '#### ' + title).includes('<h4 class="term-head subquestion">'), title);
}
assert(render('noteMdHtml', '## 四、〔方法〕计算').includes('class="term-head method"'));
assert(!render('noteMdHtml', '### 例题之外的讨论').includes('term-head'));
assert(!render('noteMdHtml', '正文中的例题和小题1不应变成标题。').includes('term-head'));
assert(!render('noteMdHtml', '```\n### 例题\n```').includes('term-head'));
assert(render('noteMdHtml', '### 例题\n\n==重点 $a_1$==').includes('\\underline{a_1}'));
console.log('PASS: meaning sections, examples, subquestions, existing labels, formulas and literal text.');
