const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const context = vm.createContext({ window: {}, document: { compatMode: 'CSS1Compat', addEventListener() {} }, console });
for (const file of [
  'assets/vendor/katex/katex.min.js',
  'assets/vendor/marked/marked.umd.js',
  'assets/js/data-loader.js',
  'assets/js/storage.js',
  'assets/data/linalg.js',
  'assets/data/notes.js',
  'assets/data/superseded.js',
  'assets/js/katex-init.js',
  'assets/js/app.js',
]) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
context.assert = assert;
vm.runInContext(`
App.subjects = KaoyanData.subjects();
const cards = KaoyanData.itemsByChapter('linalg', 'matrix');
assert.equal(cards.length, 4);
assert.equal(cards.map(x => x.card).join(''), '①②③④');
assert.equal(JSON.stringify(cards.map(x => x.module)), '[1,2,2,3]');
assert.equal(JSON.stringify(cards.map(x => x.title)), JSON.stringify([
  '矩阵的基础概念与基本运算',
  '逆矩阵的定义 -- 变换无损撤销',
  '分块矩阵与分块求逆 -- 超大型矩阵解耦与模块化',
  '初等变换与秩',
]));
const chapter = KaoyanData.chapter('linalg', 'matrix');
assert.equal(JSON.stringify(chapter.modules.map(x => x.name)), JSON.stringify([
  '基础概念与运算', '逆矩阵与分块', '初等变换与秩'
]));
assert.equal(JSON.stringify(App.chapterGroups('linalg', 'matrix', cards).map(x => x.items.length)), '[1,2,1]');
assert.equal(Notes.get('ch:linalg/matrix').length > 6000, true);
assert(App.chapterViewHtml('linalg', 'matrix').includes('共 4 条'));
assert(App.chapterViewHtml('linalg', 'matrix').includes('定义 4 · 性质 4'));
for (const card of cards) {
  assert(Notes.has(card.id), 'missing note ' + card.id);
  assert(bookParts(card.md).main.includes('class="term-label'));
  assert(noteMdHtml(Notes.get(card.id)).includes('例题'));
}
assert.equal(App.chapterFlowId('linalg', 'matrix'), 'flow:linalg/matrix');
const page = App.chapterViewHtml('linalg', 'matrix');
assert(page.indexOf('id="item-flow:linalg/matrix"') < page.indexOf('id="item-ch:linalg/matrix"'));
console.log('PASS: four ordered matrix cards, three populated modules, notes, renderer, chapter summary and decision-flow placement.');
`, context);
