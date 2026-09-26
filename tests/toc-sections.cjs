const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const storage = {};
const context = vm.createContext({
  console,
  window: {},
  document: {
    addEventListener() {},
    querySelectorAll() { return []; },
    getElementById() { return null; },
  },
  localStorage: { getItem: k => storage[k] || null, setItem: (k, v) => { storage[k] = v; } },
});
for (const f of ['assets/vendor/marked/marked.umd.js', 'assets/js/data-loader.js', 'assets/js/storage.js', 'assets/data/linalg.js', 'assets/data/notes.js', 'assets/data/superseded.js', 'assets/js/katex-init.js', 'assets/js/app.js']) {
  vm.runInContext(fs.readFileSync(f, 'utf8'), context);
}
context.assert = assert;
vm.runInContext(`
// 小节标题的认法：〔〕开头、带编号、加粗、没加〔〕的例题
assert.equal(sectionKind('〔定义〕'), '定义');
assert.equal(sectionKind('四、〔方法〕先凑零'), '方法');
assert.equal(sectionKind('**〔提示〕**'), '提示');
assert.equal(sectionKind('例题'), '例题');
assert.equal(sectionKind('例题 1：计算'), '例题');
assert.equal(sectionKind('【小题 1】计算'), null);
assert.equal(sectionKind('例题之外的讨论'), null);

// 教材：同类只列一次，意义也算
assert.deepEqual([...bookSections('### 〔定义〕A\\n\\n### 〔定义〕B\\n\\n### 〔性质〕\\n\\n### 意义\\n\\n### 〔提示〕')], ['定义', '性质', '意义', '提示']);

// 笔记：只认最外层一级，下一级的「例题 1」和代码块里的标题不算
const note = '### 〔定义〕\\n#### 1. x\\n### 〔例题〕\\n#### 例题 1：y\\n##### 【小题 1】z\\n\`\`\`\\n### 〔方法〕\\n\`\`\`\\n### 〔提示〕';
const ns = noteSections(note);
assert.equal(ns.level, 3);
assert.deepEqual([...ns.kinds], ['定义', '例题', '提示']);
assert.deepEqual([...noteSections('### 〔定义〕\\n### 例题\\n#### 【小题 1】a').kinds], ['定义', '例题']);
assert.deepEqual([...noteSections('没有标题').kinds], []);

// 真实数据：第 3 章卡②
const id = 'la-vec-def-max-independent-set';
assert.deepEqual([...bookSections(KaoyanData.find(id).md)], ['定义', '性质', '意义']);
assert.deepEqual([...noteSections(Notes.get(id)).kinds], ['定义', '性质', '例题', '提示']);

// 章节页的目录（顶部一份）里，这张卡下面有「教材」「笔记」两行和对应小节
App.subjects = KaoyanData.subjects();
const items = KaoyanData.itemsByChapter('linalg', 'vector-space');
const toc = App.tocHtml(App.chapterGroups('linalg', 'vector-space', items), App.chapterNos('linalg', 'vector-space'), 'linalg', 'vector-space');
const rows = App.tocSubHtml(id);
assert(toc.includes(rows));
assert.equal(toc.split('class="toc-sub"').length - 1, items.length);
assert(rows.includes('data-part="book">教材</a>'));
assert(rows.includes('data-part="note">笔记</a>'));
for (const k of ['定义', '性质', '意义']) assert(rows.includes('data-part="book" data-sec="' + k + '">' + k + '</a>'), '教材 ' + k);
for (const k of ['定义', '性质', '例题', '提示']) assert(rows.includes('data-part="note" data-sec="' + k + '">' + k + '</a>'), '笔记 ' + k);

// 每张卡都有「教材」一行；没写笔记的卡没有「笔记」一行
for (const chapter of KaoyanData.chapters('linalg')) {
  for (const it of KaoyanData.itemsByChapter('linalg', chapter.id)) {
    const h = App.tocSubHtml(it.id);
    assert(h.includes('data-part="book">教材</a>'), it.id);
    assert.equal(h.includes('data-part="note">笔记</a>'), Notes.has(it.id), it.id);
  }
}
`, context);
console.log('PASS: chapter TOC lists 教材/笔记 rows with their own section headings.');
