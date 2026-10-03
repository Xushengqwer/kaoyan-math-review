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
for (const f of ['assets/vendor/marked/marked.umd.js', 'assets/js/data-loader.js', 'assets/js/storage.js',
  'assets/data/calculus.js', 'assets/data/linalg.js', 'assets/data/probability.js', 'assets/data/notes.js',
  'assets/data/superseded.js', 'assets/js/katex-init.js', 'assets/js/app.js']) {
  vm.runInContext(fs.readFileSync(f, 'utf8'), context);
}
context.assert = assert;
vm.runInContext(`
// 右侧目录的大纲（cardOutline / App.railSubHtml）：只读原文、只改显示
const outline = (id) => cardOutline(KaoyanData.find(id).md, Notes.has(id) ? Notes.get(id) : '');
const total = (o, sec) => o.blocks.reduce((n, b) => n + Object.values(b.rows).filter((r) => r.sec === sec).reduce((m, r) => m + r.items.length, 0), 0);

// 重构过的卡：块数（站数，⑤′ 单独一块；没有站的整张卡一块）和各节条数。
// 〔定义〕+〔性质〕的条数等于对照视图的配对数（tests/dual-track.cjs）。
const expected = {
  'calc-lim-function':              [6, 20, 29, 16, 16, 9],
  'calc-der-derivative':            [6, 14, 38, 21, 8, 9],
  'calc-int-antiderivative':        [6, 12, 41, 18, 11, 15],
  'calc-vec-coordinates':           [6, 23, 46, 15, 8, 18],
  'calc-mvd-limit-continuity':      [6, 19, 46, 15, 9, 19],
  'calc-mi-double-def':             [6, 15, 31, 18, 11, 19],
  'la-eig-def-eigen':               [7, 19, 25, 19, 14, 30],
  'la-vec-def-max-independent-set': [1, 11, 11, 9, 6, 14],
};
for (const [id, [blocks, ...counts]] of Object.entries(expected)) {
  const o = outline(id);
  assert(o.structured, id + ' 用大纲');
  assert.equal(o.blocks.length, blocks, id + ' 块数');
  ['定义', '性质', '意义', '例题', '提示'].forEach((sec, i) => assert.equal(total(o, sec), counts[i], id + ' ' + sec));
  // 每一节每一站里的 ord 从 0 连续编号
  o.blocks.forEach((b) => Object.values(b.rows).forEach((r) => r.items.forEach((it, k) => assert.equal(it.ord, k, id + b.mark + r.sec))));
  // 目录里每一条都是一个带 data-ord 的链接
  const html = App.railSubHtml(id);
  assert.equal((html.match(/class="ol-item"/g) || []).length, counts.reduce((a, c) => a + c, 0), id + ' 链接数');
  assert(html.startsWith('<div class="toc-sub rail-outline" data-sub="' + id + '">'));
}

// 第 6 章 ① 的内容和顺序；分组（二重积分 / 三重积分 / 反过来用定义）记在条目上
const mi = outline('calc-mi-double-def');
assert.deepEqual(mi.blocks.map((b) => b.mark), ['①', '②', '③', '④', '⑤', '⑥']);
assert.equal(mi.blocks[0].name, '① 曲顶柱体的体积怎么算');
const p1 = mi.blocks[0].rows.book性质.items;
assert.deepEqual(p1.map((it) => it.title), ['几何意义', '基本性质', '中值定理', '二重积分是一个数', '性质', '双重和式的极限']);
assert.deepEqual(p1.map((it) => it.group), ['二重积分', '二重积分', '二重积分', '二重积分', '三重积分', '反过来用定义']);
assert.deepEqual(p1.map((it) => it.ord), [0, 1, 2, 3, 4, 5]);
assert.deepEqual(mi.blocks[0].rows.note例题.items.map((it) => it.title), ['一个圆，四种问法', '和式与积分方程']);
assert.deepEqual(mi.blocks[1].rows.book意义.items.map((it) => it.title).slice(0, 2), ['在直角坐标下算二重积分', '被积函数含绝对值、$\\\\max$、$\\\\min$']);

// ⑤ 和 ⑤′ 是两块
assert.deepEqual(outline('la-eig-def-eigen').blocks.map((b) => b.mark), ['①', '②', '③', '④', '⑤', '⑤′', '⑥']);

// 旧卡（没有站、没有分组）和没有笔记的卡：不用大纲，右侧目录和顶部目录一样
for (const id of ['la-det-def-n-order', 'la-mat-def-matrix', 'la-vec-def-linear-dependence', 'prob-evt-events']) {
  assert(!outline(id).structured, id);
  assert.equal(App.railSubHtml(id), App.tocSubHtml(id), id);
}

// 认法的边界
const o1 = cardOutline([
  '### 〔定义〕', '', '**① 甲**', '', '#### 1. 一', '正文', '**不是分组**', '', '#### 2. 二', '',
  '**② 乙**', '', '**组名**', '', '#### 1. 三', '',
  '### 意义', '', '**① 甲**', '', '* **1. 题型一**', '  * **问题**：…', '* **2. 题型二**',
].join('\\n'), [
  '### 〔例题〕', '', '**① 甲**', '', '#### 例题 1：小', '##### 【小题 1】不算', '#### 例题 10：大', '',
  '\`\`\`', '#### 例题 2：代码块里的不算', '\`\`\`', '',
  '### 〔提示〕', '', '**② 乙**', '', '#### 1. 坑',
].join('\\n'));
assert(o1.structured);
assert.deepEqual(o1.blocks.map((b) => b.mark), ['①', '②']);
const def1 = o1.blocks[0].rows.book定义.items;
assert.deepEqual(def1.map((it) => [it.title, it.group]), [['一', ''], ['二', '']], '紧贴正文的加粗行不是分组');
assert.deepEqual(o1.blocks[1].rows.book定义.items.map((it) => [it.title, it.group]), [['三', '组名']]);
assert.deepEqual(o1.blocks[0].rows.book意义.items.map((it) => it.title), ['题型一', '题型二']);
assert.deepEqual(o1.blocks[0].rows.note例题.items.map((it) => it.title), ['小', '大']);
assert.deepEqual(o1.blocks[1].rows.note提示.items.map((it) => [it.title, it.ord]), [['坑', 0]]);
assert(!cardOutline('### 〔定义〕\\n\\n#### 1. 一\\n', '').structured, '没有站、没有分组：不用大纲');
`, context);
console.log('rail outline ok');
