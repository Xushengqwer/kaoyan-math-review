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
// 站卡小标题（cardOutline）、本卡主线（cardStory）、按站的右侧目录、单张小卡片编辑（cellSource / cellSplice）：只读原文、只改显示
App.subjects = KaoyanData.subjects();
const outline = (id) => cardOutline(KaoyanData.find(id).md, Notes.has(id) ? Notes.get(id) : '');
const total = (o, part, sec) => o.blocks.reduce((n, b) => n + (b.rows[part + sec] || { items: [] }).items.length, 0);

// 重构过的卡：块数（站数，⑤′ 单独一块；没有站的整张卡一块）和各节条数。
// 〔定义〕+〔性质〕的条数等于对照视图的配对数（tests/dual-track.cjs），笔记的〔定义〕〔性质〕条数与教材相同。
const expected = {
  'calc-lim-function':              [6, 13, 14, 17, 18, 0],
  'calc-der-derivative':            [6, 14, 38, 21, 8, 9],
  'calc-int-antiderivative':        [6, 12, 41, 18, 11, 15],
  'calc-vec-coordinates':           [6, 23, 46, 15, 8, 18],
  'calc-mvd-limit-continuity':      [6, 19, 46, 15, 9, 19],
  'calc-mi-double-def':             [6, 15, 31, 18, 11, 19],
  'calc-ls-line-first': [6,16,39,20,10,18],
  'calc-ser-convergence': [6,16,36,19,10,18],
  'calc-ode-concepts': [6,15,29,17,8,15],
  'la-eig-def-eigen':               [7, 19, 25, 19, 14, 30],
  'la-vec-def-max-independent-set': [1, 11, 11, 9, 6, 14],
};
for (const [id, [blocks, ...counts]] of Object.entries(expected)) {
  const o = outline(id);
  assert(o.structured, id + ' 按站或分组组织');
  assert.equal(o.blocks.length, blocks, id + ' 块数');
  OUTLINE_SECS.forEach(([part, sec], i) => assert.equal(total(o, part, sec), counts[i], id + ' ' + sec));
  assert.equal(total(o, 'note', '定义'), counts[0], id + ' 笔记定义');
  assert.equal(total(o, 'note', '性质'), counts[1], id + ' 笔记性质');
  o.blocks.forEach((b) => Object.values(b.rows).forEach((r) => r.items.forEach((it, k) => assert.equal(it.ord, k, id + b.mark + r.sec))));
}

// 第 1 章 ①：站卡上〔定义〕的小标题，按原文顺序
const lim = outline('calc-lim-function');
// 意义、例题按题型分组，不挂在站里：都在最后那个没有站名的块
assert.deepEqual(lim.blocks.map((b) => b.mark), ['①', '②', '③', '④', '⑤', '']);
assert.deepEqual(lim.blocks[0].rows.book定义.items.map((it) => it.title),
  ['函数概念与两要素', '函数四大性态', '复合函数与反函数', '初等函数与特殊形态']);
assert.deepEqual(lim.blocks[5].rows.book意义.items.map((it) => it.num).slice(0, 2), ['1', '2']);
// 「例题 1-1」「例题 1-2」都记在题型 1 下
assert.deepEqual(lim.blocks[5].rows.note例题.items.map((it) => it.num).slice(0, 3), ['1', '1', '2']);
assert.equal(lim.blocks[5].rows.note例题.items[1].title, '判断奇偶性与周期性');
// 第 6 章 ①：〔性质〕的分组记在条目上
assert.deepEqual(outline('calc-mi-double-def').blocks[0].rows.book性质.items.map((it) => it.group),
  ['二重积分', '二重积分', '二重积分', '二重积分', '三重积分', '反过来用定义']);
assert.deepEqual(outline('la-eig-def-eigen').blocks.map((b) => b.mark), ['①', '②', '③', '④', '⑤', '⑤′', '⑥']);

// 本卡主线：开头一句、每站一句
// 写法一：「**本卡主线**：……」「* **① 站名**：一句话」
const story = cardStory(KaoyanData.find('calc-der-derivative').md);
assert.equal(story.lead, '从一点的变化率，看清整个函数。');
assert.deepEqual(Object.keys(story.st), ['①', '②', '③', '④', '⑤', '⑥']);
// 写法二：「**本卡主线：……**」「- **① 问句** $\to$ **答案**：一句话」
const story2 = cardStory(KaoyanData.find('calc-lim-function').md);
assert.equal(story2.lead, '$x$ 靠近某点时，$f(x)$ 靠近谁？');
assert.deepEqual(Object.keys(story2.st), ['①', '②', '③', '④', '⑤']);
assert.equal(story2.st['①'], '谁在靠近？ $\\\\to$ **函数**：研究对象、构造与四大性态');
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
// 每站列出定义、性质的小标题（rl-item），意义、例题、提示只给条数（rl-mini）
assert.equal((rail.body.match(/class="rl-item"/g) || []).length, 44);
assert.equal((rail.body.match(/class="rl-mini /g) || []).length, 18);
assert(!rail.body.includes('rl-types'), '旧写法没有「题型」一组');
// 题型写法（第 1 章）：六站后面一组「题型」，17 个题型、4 个分组；各站不再有意义、例题、提示的条数
const limRail = App.stationRailHtml(KaoyanData.find('calc-lim-function'), 'calculus', 'limit');
assert.equal((limRail.body.match(/class="rl-st rl-types"/g) || []).length, 1);
assert.equal((limRail.body.match(/data-sec="意义" data-station="" data-ord=/g) || []).length, 17);
assert.equal((limRail.body.match(/class="rl-mini /g) || []).length, 0);
assert.equal((rail.body.match(/class="rl-extra"/g) || []).length, 3);
for (const id of ['la-det-def-n-order', 'la-mat-def-matrix', 'la-vec-def-linear-dependence', 'prob-evt-events']) {
  assert(!outline(id).structured, id);
}

// 对照视图里每一张小卡片都记着它在原文里的位置；原样拼回去和原文一字不差，
// 〔定义〕〔性质〕的卡片正文以这一条的「#### n.」标题开头。
let cells = 0;
for (const id of Object.keys(expected)) {
  const book = KaoyanData.find(id).md, note = Notes.get(id);
  const html = App.dualTrackHtml(App.dualTrackModel(id, book, note));
  for (const m of html.matchAll(/<div class="dual-cell dual-(book|note)" data-part="[^"]*" data-sec="([^"]*)" data-station="[^"]*" data-src="(\\d+)-(\\d+)">/g)) {
    const full = m[1] === 'book' ? book : note, start = +m[3], end = +m[4];
    assert(start < end && end <= full.length, id + ' 位置在原文范围内');
    const { core } = cellSource(full, start, end);
    assert.equal(cellSplice(full, start, end, core), full, id + ' 原样拼回');
    assert.equal(cellSplice(full, start, end, '\\n\\n' + core + '\\n\\n\\n'), full, id + ' 前后多的空行不算改动');
    if ((m[2] === '定义' || m[2] === '性质') && /^#### \\d+\\./.test(core)) cells++;
  }
}
assert(cells >= 2 * (20 + 29 + 14 + 38 + 12 + 41 + 23 + 46 + 19 + 46 + 15 + 31 + 19 + 25 + 11 + 11), '每一对〔定义〕〔性质〕卡片都能单独编辑');

// 拼回：改了正文，前后的空行原样保留，下一个标题不会粘上来
const doc = '### 〔定义〕\\n\\n#### 1. 甲\\n正文一\\n\\n#### 2. 乙\\n正文二\\n';
const s1 = doc.indexOf('#### 1.'), e1 = doc.indexOf('#### 2.');
assert.deepEqual(cellSource(doc, s1, e1), { lead: '', core: '#### 1. 甲\\n正文一', tail: '\\n\\n' });
assert.equal(cellSplice(doc, s1, e1, '#### 1. 甲\\n新的正文'), '### 〔定义〕\\n\\n#### 1. 甲\\n新的正文\\n\\n#### 2. 乙\\n正文二\\n');
assert.equal(cellSplice(doc, s1, e1, '#### 1. 甲\\n新的正文   \\n\\n'), '### 〔定义〕\\n\\n#### 1. 甲\\n新的正文\\n\\n#### 2. 乙\\n正文二\\n');
// 补写：插在下一段开头之前，前后各一个空行
assert.equal(cellInsert(doc, e1, '#### 1′. 丙\\n正文三\\n\\n'), '### 〔定义〕\\n\\n#### 1. 甲\\n正文一\\n\\n#### 1′. 丙\\n正文三\\n\\n#### 2. 乙\\n正文二\\n');
assert.equal(cellInsert('甲\\n', 2, '乙'), '甲\\n\\n乙');

// 标题改坏（「#### 2. 两个重要极限：」被去掉）：这一条落进上一格，右栏显示「笔记没有这一条」。
// 那一格带着配对键和插入位置，「补写这一条」填好仓库里的那一版，插回去就又配上了，原文其他地方不动。
{
  const id = 'calc-lim-function', book = KaoyanData.find(id).md, note = Notes.get(id);
  const broken = note.replace('#### 2. 两个重要极限：', '两个重要极限：');
  const html = App.dualTrackHtml(App.dualTrackModel(id, book, broken));
  const m = html.match(/<div class="dual-cell dual-note dual-missing" [^>]*data-key="([^"]*)" data-at="(\\d+)">/);
  assert(m, '缺的那一格带配对键和插入位置');
  const key = m[1].replace(/&quot;/g, '"');
  const seg = dualSource(note, 'note', appByType(book)).find((r) => r.key === key);
  const fill = cellSource(note, seg.sourcePieces[0].start, seg.sourcePieces[seg.sourcePieces.length - 1].end).core;
  assert(fill.startsWith('#### 2. 两个重要极限：'), '填好的是仓库里的那一条');
  const fixed = cellInsert(broken, +m[2], fill);
  assert(fixed.includes(fill + '\\n\\n#### 3. 无穷小的运算'), '插在下一条前面');
  assert.equal(fixed.replace(fill + '\\n\\n', ''), broken, '除了插进去的这一段，原文一字不变');
  const after = App.dualTrackModel(id, book, fixed);
  assert(!after.rows.some((r) => r.kind === 'entry' && (!r.book || !r.note)), '补写以后不再缺');
}
`, context);
console.log('station cards ok');
