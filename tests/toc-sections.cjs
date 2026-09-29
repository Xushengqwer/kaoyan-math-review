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

// 不按「站」组织的卡：没有「主线」一行，也没有圈号
assert(!rows.includes('data-station') && !rows.includes('主线'));

// 站：小节里单独一行、整行加粗、圈号开头；⑤ 与 ⑤′ 分开，同一节同一站只列一次；没整行加粗的、代码块里的、小节之前的不算
const marks = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v.map((s) => s.mark).join(' ')]));
const sn = sectionStations('**① 前言**\\n### 〔定义〕\\n**① 甲**\\n#### 1. x\\n**⑤ 乙**\\n### 〔性质〕\\n**⑤′ 丙**\\n**⑤′ 丙**\\n**②** 不是整行\\n\`\`\`\\n**③ 丁**\\n\`\`\`', 'note');
assert.deepEqual(sn, { 定义: [{ mark: '①', name: '① 甲' }, { mark: '⑤', name: '⑤ 乙' }], 性质: [{ mark: '⑤′', name: '⑤′ 丙' }] });
assert.deepEqual(marks(sectionStations('**① 前言**\\n### 〔定义〕\\n**① 甲**\\n### 意义\\n**② 乙**', 'book')), { 定义: '①', 意义: '②' });

// 真实数据：第 4 章超级卡按六站组织
const eid = 'la-eig-def-eigen';
const all = '① ② ③ ④ ⑤ ⑤′ ⑥', rest = '② ③ ④ ⑤ ⑤′ ⑥';
assert.deepEqual(marks(sectionStations(KaoyanData.find(eid).md, 'book')), { 定义: all, 性质: rest, 意义: rest });
assert.deepEqual(marks(sectionStations(Notes.get(eid), 'note')), { 定义: all, 性质: rest, 例题: rest, 提示: rest });
const er = App.tocSubHtml(eid);
// 「主线」一行：各站全名，跳到教材〔定义〕里的这一站
assert(er.includes('<span class="toc-sub-label">主线</span>'));
assert(er.includes('data-part="book" data-sec="定义" data-station="⑤′">⑤′ 另一种换法：配方法</a>'));
// 每个小节一行，后面是圈号；没有的站留空位，各行对齐
assert(er.includes('data-part="note" data-sec="例题" data-station="⑥" title="⑥ 读出符号">⑥</a>'));
assert.equal((er.match(/data-station=/g) || []).length, 7 + (7 + 6 + 6) + (7 + 6 + 6 + 6));
assert.equal((er.match(/<span class="toc-sub-st"><\\/span>/g) || []).length, 2 + 3);
assert.equal((er.match(/class="toc-sub-row toc-sub-stations"/g) || []).length, 3 + 4);

// 每张卡都有「教材」一行；没写笔记的卡没有「笔记」一行
for (const chapter of KaoyanData.chapters('linalg')) {
  for (const it of KaoyanData.itemsByChapter('linalg', chapter.id)) {
    const h = App.tocSubHtml(it.id);
    assert(h.includes('data-part="book">教材</a>'), it.id);
    assert.equal(h.includes('data-part="note">笔记</a>'), Notes.has(it.id), it.id);
  }
}
`, context);
console.log('PASS: chapter TOC lists 教材/笔记 rows with their own section headings, and stations for cards organised by stations.');
