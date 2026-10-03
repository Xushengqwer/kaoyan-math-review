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
// 大纲视图（cardOutline / cardStory / outlineGist / App.outlineHtml）和按站的右侧目录：只读原文、只改显示
App.subjects = KaoyanData.subjects();
const outline = (id) => cardOutline(KaoyanData.find(id).md, Notes.has(id) ? Notes.get(id) : '');
const total = (o, part, sec) => o.blocks.reduce((n, b) => n + (b.rows[part + sec] || { items: [] }).items.length, 0);

// 重构过的卡：块数（站数，⑤′ 单独一块；没有站的整张卡一块）和各节条数。
// 〔定义〕+〔性质〕的条数等于对照视图的配对数（tests/dual-track.cjs），笔记的〔定义〕〔性质〕条数与教材相同。
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
  OUTLINE_SECS.forEach(([part, sec], i) => assert.equal(total(o, part, sec), counts[i], id + ' ' + sec));
  assert.equal(total(o, 'note', '定义'), counts[0], id + ' 笔记定义');
  assert.equal(total(o, 'note', '性质'), counts[1], id + ' 笔记性质');
  // 每一节每一站里的 ord 从 0 连续编号
  o.blocks.forEach((b) => Object.values(b.rows).forEach((r) => r.items.forEach((it, k) => assert.equal(it.ord, k, id + b.mark + r.sec))));
  // 大纲里每一条一行，行上带着找到这一条要用的小节、站、序号
  const html = App.outlineHtml(id);
  assert.equal((html.match(/class="ov-line/g) || []).length, counts.reduce((a, c) => a + c, 0), id + ' 行数');
  assert(html.startsWith('<div class="outline-view" data-outline="' + id + '">'));
  assert.equal((html.match(/class="ov-station"/g) || []).length, blocks, id + ' 站块');
}

// 第 1 章 ①：顺序、原文编号、笔记那半句
const lim = outline('calc-lim-function');
assert.deepEqual(lim.blocks.map((b) => b.mark), ['①', '②', '③', '④', '⑤', '⑥']);
const d1 = lim.blocks[0].rows.book定义.items, n1 = lim.blocks[0].rows.note定义.items;
assert.deepEqual(d1.slice(0, 3).map((it) => [it.num, it.title]), [['1', '函数'], ['2', '有界性'], ['3', '单调性']]);
assert.equal(outlineGist(d1[0].title, n1[0].title), '每个 x 只对应一个 y');
const html1 = App.outlineHtml('calc-lim-function');
assert(html1.includes('<span class="ov-t">函数</span><span class="ov-g">每个 x 只对应一个 y</span>'));
// 意义按原文编号（全卡连续），例题也是
const m5 = lim.blocks[4].rows.book意义.items;
assert.deepEqual(m5.map((it) => it.num).slice(0, 2), ['7', '8']);
assert(/^\\d+$/.test(lim.blocks[0].rows.note例题.items[0].num));

// 第 6 章 ①：分组记在条目上
const mi = outline('calc-mi-double-def');
assert.deepEqual(mi.blocks[0].rows.book性质.items.map((it) => it.group), ['二重积分', '二重积分', '二重积分', '二重积分', '三重积分', '反过来用定义']);
assert.deepEqual(outline('la-eig-def-eigen').blocks.map((b) => b.mark), ['①', '②', '③', '④', '⑤', '⑤′', '⑥']);

// 笔记那半句
assert.equal(outlineGist('函数', '函数'), '');
assert.equal(outlineGist('实对称矩阵：凑齐，而且两两垂直', '实对称矩阵：为什么天然轴一定垂直'), '为什么天然轴一定垂直');
assert.equal(outlineGist('秩', '完全不同的标题'), '完全不同的标题');
assert.equal(outlineGist('秩', ''), '');

// 本卡主线：开头一句、每站一句
const story = cardStory(KaoyanData.find('calc-lim-function').md);
assert.equal(story.lead, '$x$ 靠近某点时，$f(x)$ 靠近谁。');
assert.deepEqual(Object.keys(story.st), ['①', '②', '③', '④', '⑤', '⑥']);
assert(story.st['①'].startsWith('函数——它的定义'));
assert.deepEqual(cardStory('没有主线').st, {});

// 一张超级卡的章：章节头、右侧目录按站；其余的章照旧
const sup = (s, c) => { const it = App.superCard(s, c); return it && it.id; };
assert.equal(sup('calculus', 'limit'), 'calc-lim-function');
assert.equal(sup('linalg', 'eigen'), 'la-eig-def-eigen');
assert.equal(sup('linalg', 'vector-space'), null);
assert.equal(sup('linalg', 'determinant'), null);
const rail = App.stationRailHtml(KaoyanData.find('la-eig-def-eigen'), 'linalg', 'eigen');
assert.equal(rail.count, 6, '⑤′ 不算一站');
assert.equal((rail.body.match(/class="rl-st"/g) || []).length, 7);
assert.equal((rail.body.match(/class="rl-chip[ "]/g) || []).length, 35);
assert.equal((rail.body.match(/class="rl-extra"/g) || []).length, 3);
assert.equal(App.stationRailHtml(KaoyanData.find('calc-lim-function'), 'calculus', 'limit').count, 6);

// 旧卡（没有站、没有分组）和没有笔记的卡：不用大纲
for (const id of ['la-det-def-n-order', 'la-mat-def-matrix', 'la-vec-def-linear-dependence', 'prob-evt-events']) {
  assert(!outline(id).structured, id);
}

// 认法的边界
const o1 = cardOutline([
  '### 〔定义〕', '', '**① 甲**', '', '#### 1. 一', '正文', '**不是分组**', '', '#### 2. 二', '',
  '**② 乙**', '', '**组名**', '', '#### 1. 三', '',
  '### 意义', '', '**① 甲**', '', '* **1. 题型一**', '  * **问题**：…', '* **2. 题型二**',
].join('\\n'), [
  '### 〔定义〕', '', '**① 甲**', '', '#### 1. 一：解释', '',
  '### 〔例题〕', '', '**① 甲**', '', '#### 例题 1：小', '##### 【小题 1】不算', '#### 例题 10：大', '',
  '\`\`\`', '#### 例题 2：代码块里的不算', '\`\`\`', '',
  '### 〔提示〕', '', '**② 乙**', '', '#### 1. 坑',
].join('\\n'));
assert(o1.structured);
assert.deepEqual(o1.blocks.map((b) => b.mark), ['①', '②']);
assert.deepEqual(o1.blocks[0].rows.book定义.items.map((it) => [it.title, it.group]), [['一', ''], ['二', '']], '紧贴正文的加粗行不是分组');
assert.deepEqual(o1.blocks[1].rows.book定义.items.map((it) => [it.title, it.group]), [['三', '组名']]);
assert.deepEqual(o1.blocks[0].rows.note定义.items.map((it) => it.title), ['一：解释']);
assert.deepEqual(o1.blocks[0].rows.book意义.items.map((it) => [it.num, it.title]), [['1', '题型一'], ['2', '题型二']]);
assert.deepEqual(o1.blocks[0].rows.note例题.items.map((it) => [it.num, it.title]), [['1', '小'], ['10', '大']]);
assert.deepEqual(o1.blocks[1].rows.note提示.items.map((it) => [it.title, it.ord]), [['坑', 0]]);
assert(!cardOutline('### 〔定义〕\\n\\n#### 1. 一\\n', '').structured, '没有站、没有分组：不用大纲');
`, context);
console.log('outline view ok');
