const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { PINNED, loadSubjects, loadNotes } = require('../tools/lib.cjs');
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
// 第 4 章第①站的外壳断言对着钉住的那一版内容（tools/lib.cjs 的 PINNED），以后上线、改这一站都不用改这里
context.pinnedCh4 = { md: loadSubjects(PINNED)[0].items.find((i) => i.id === 'calc-vec-coordinates').md, note: loadNotes(PINNED)['calc-vec-coordinates'] };
vm.runInContext(`
// 配色改版（2026-10-15）的外壳只加标签和属性、不动一个字：
// 全站每张教材、每条笔记、每张对照卡，拆掉外壳以后必须和不加外壳时的渲染逐字相同；对照的配对也不能变。
App.subjects = KaoyanData.subjects();
const shell = emphasisHtml;
const undo = (h) => h
  .replace(/<span class="hno">([^<]*)<\\/span><span class="hdot">([^<]*)<\\/span><span class="httl">([\\s\\S]*?)<\\/span><\\/h([34])>/g, '$1$2$3</h$4>')
  .replace(/<h5([^>]*)><span class="h5-topic">([^<]*)<\\/span><span class="h5-colon">：<\\/span><span class="h5-punch">([\\s\\S]*?)<\\/span><\\/h5>/g, '<h5$1>$2：$3</h5>')
  .replace(/<li class="li-key" data-emo="[^"]*">/g, '<li>')
  .replace(/<blockquote class="bq-emo" data-emo="[^"]*">/g, '<blockquote>')
  .replace(/<span class="emo">([^<]*)<\\/span>/g, '$1')
  .replace(/<strong class="(?:key|lbl)">/g, '<strong>');
const both = (f) => { const on = f(); emphasisHtml = (h) => h; try { return [on, f()]; } finally { emphasisHtml = shell; } };
const seen = { hno: 0, topic: 0, key: 0, bq: 0, lbl: 0 };
const tally = (h) => {
  seen.hno += (h.match(/class="hno"/g) || []).length;
  seen.topic += (h.match(/class="h5-topic"/g) || []).length;
  seen.key += (h.match(/class="li-key"/g) || []).length;
  seen.bq += (h.match(/class="bq-emo"/g) || []).length;
  seen.lbl += (h.match(/class="lbl"/g) || []).length;
};
const same = (label, f) => {
  const [on, off] = both(f);
  tally(on);
  assert.equal(undo(on), off, label);
};

let books = 0, notes = 0, duals = 0;
for (const it of KaoyanData.allItems()) {
  same('教材 ' + it.id, () => { const p = bookParts(it.md); return p.main + '\\u0000' + p.tip; });
  same('教材（站牌）' + it.id, () => { const p = bookParts(it.md, App.stationDeco(it.id)); return p.main + '\\u0000' + p.tip; });
  books++;
}
const seed = window.__KAOYAN_SEED_NOTES__;
for (const key of Object.keys(seed)) {
  same('笔记 ' + key, () => noteMdHtml(seed[key]));
  if (KaoyanData.find(key)) same('笔记（站牌）' + key, () => App.noteBodyHtml(seed[key], key));
  notes++;
}
// 对照：配对键、配对数一样，整张对照的 HTML 拆掉外壳后一样
for (const it of KaoyanData.allItems()) {
  if (!Notes.has(it.id)) continue;
  const [mOn, mOff] = both(() => App.dualTrackModel(it.id, it.md, Notes.get(it.id)));
  assert.equal(mOn.enabled, mOff.enabled, '对照开关 ' + it.id);
  if (!mOn.enabled) continue;
  const keys = (m) => JSON.stringify(m.rows ? m.rows.map((r) => [r.kind, r.key || '', !!r.book, !!r.note]) : m);
  assert.equal(keys(mOn), keys(mOff), '对照配对 ' + it.id);
  const [hOn, hOff] = both(() => App.dualTrackHtml(App.dualTrackModel(it.id, it.md, Notes.get(it.id))));
  assert.equal(undo(hOn), hOff, '对照 HTML ' + it.id);
  duals++;
}

// 第 4 章第①站（Gemini 新格式）每种外壳都用上了
const ch4 = App.dualTrackHtml(App.dualTrackModel('calc-vec-coordinates', pinnedCh4.md, pinnedCh4.note));
assert(ch4.includes('<h4><span class="hno">1</span><span class="hdot">. </span><span class="httl">向量与坐标</span></h4>'));
assert(ch4.includes('<h5><span class="h5-topic">向量</span><span class="h5-colon">：</span><span class="h5-punch">只认大小和方向，不认起点</span></h5>'));
assert(ch4.includes('<li class="li-key" data-emo="🎯"><span class="emo">🎯</span> <strong class="key">点是死位置，向量是活位移</strong>'));
assert(ch4.includes('<li class="li-key" data-emo="⚠"><span class="emo">⚠️</span> <strong class="key">零向量（边界）</strong>'));
assert(/<blockquote class="bq-emo" data-emo="💡">\\s*<p><span class="emo">💡<\\/span> <strong class="lbl">本站定位<\\/strong>：/.test(ch4));
assert(ch4.includes('<strong class="lbl">为什么能平移</strong>：'));
// 只有教材标题那一行的冒号前面不含标签才拆；行内模式（目录、标签里的标题）不加外壳
assert.equal(emphasisHtml('<h5><strong>甲</strong>：乙</h5>'), '<h5><strong class="lbl">甲</strong>：乙</h5>');
assert.equal(mdHtml('**本质**：一句话', true), '<strong>本质</strong>：一句话');
assert.equal(emphasisHtml('<h5>：乙</h5>'), '<h5>：乙</h5>');
// 审查找到的几种写法（10-16）：
// ==…== 跨过冒号的五级标题不拆（拆了 <u> 会跨标签，对照拼不起来，整章渲染中断）
assert(mdHtml('##### ==行列式：一个数==').includes('<h5><u>行列式：一个数</u></h5>'));
assert(mdHtml('##### 行列式：==一个数==').includes('<span class="h5-punch"><u>一个数</u></span>'));
{
  const id = 'la-det-def-n-order', it = KaoyanData.find(id);
  const [on, off] = both(() => App.dualTrackModel(id, it.md, Notes.get(id) + '\\n\\n##### ==行列式：一个数==\\n'));
  assert.equal(on.enabled, off.enabled, '标题整行加重点：对照照常（不抛错）');
  assert.equal(on.pairs.length, off.pairs.length);
}
// 小数不是编号
assert(!mdHtml('#### 0.5 倍的陷阱').includes('hno'));
assert(!mdHtml('### 3.14 与圆周率').includes('hno'));
assert(mdHtml('#### 12. 甲').includes('<span class="hno">12</span>'));
// 旧卡按标题配对：「**甲**：」的 lbl 也拆回去再比
assert.equal(unshellHead(mdHtml('#### 1. **甲**：乙').match(/<h4>([\\s\\S]*)<\\/h4>/)[1]), mdHtml('1. **甲**：乙', true));
assert.equal(unshellHead(mdHtml('#### 例题 1：**换元**：求积分').match(/<h4>([\\s\\S]*)<\\/h4>/)[1]), mdHtml('例题 1：**换元**：求积分', true));
assert(Object.values(seen).every((n) => n > 0), JSON.stringify(seen));
console.log('PASS: 外壳只加标签：教材 ' + books + ' 张、笔记 ' + notes + ' 条、对照 ' + duals + ' 张拆回后与原渲染逐字相同 ' + JSON.stringify(seen));
`, context);
