const assert = require('node:assert/strict');
const { loadSubjects, loadNotes, loadSite } = require('../tools/lib.cjs');
const H = require('../tools/apply-handoff.cjs');

// 交稿工具（tools/apply-handoff.cjs，2026-10-17）：拿第 4 章方向 1 当样本——
// 把 8bb4d36 里意义 1、例题 1 两半抽出来做成交稿，接到上一版 80b5e48 上，必须逐字等于 8bb4d36 的教材和笔记。
const id = 'calc-vec-coordinates';
const at = (rev) => ({ book: loadSubjects(rev).flatMap(s => s.items).find(i => i.id === id).md, note: loadNotes(rev)[id] });
const base = at('80b5e48'), target = at('8bb4d36');
const site = loadSite();
const half = (src, cid) => {
  const b = site.cardBlocks(src).blocks.find(x => x.kind === 'card' && x.id === cid);
  return src.slice(b.start, b.end).replace(/\n+---[ \t]*\n\s*$/, '').trim();
};
const handoff = (head, parts) => '---\n' + Object.entries(head).map(([k, v]) => k + ': ' + v).join('\n') + '\n---\n\n' +
  parts.map(([name, text]) => '<!-- ' + name + ' -->\n\n' + text).join('\n\n') + '\n';

const yiyi = half(target.book, 'f6rk'), liti = half(target.note, 'f6rk');
const h = H.parseHandoff(handoff({ 卡片: id, 操作: '追加意义例题', 说明: '方向 1' }, [['意义', yiyi], ['例题', liti]]));
assert.equal(h.head['卡片'], id);
assert.deepEqual(Object.keys(h.parts).sort(), ['book', 'note']);
const out = H.applyHandoff(base, h, 'f6rk');
assert.equal(out.book, target.book, '意义接在〔意义〕末尾，和手工提交的一样');
assert.equal(out.note, target.note, '例题接在〔例题〕末尾、〔提示〕前的分隔线之前，和手工提交的一样');
assert.equal(site.markerIssues(out.book, out.note).length, 0, '接完记号完整');
assert.deepEqual(H.lintPart('意义', yiyi), { errors: [], warns: [] });
assert.deepEqual(H.lintPart('例题', liti), { errors: [], warns: [] });

// 只交一半：另一半不动
const onlyNote = H.applyHandoff(base, H.parseHandoff(handoff({ 卡片: id, 操作: '追加意义例题' }, [['例题', liti]])), 'f6rk');
assert.equal(onlyNote.book, base.book);
assert.equal(onlyNote.note, target.note);

// 替换卡：换回同样的字不变；换成别的字只动这一块，后面的分隔线和别的卡照旧
const same = H.applyHandoff(target, H.parseHandoff(handoff({ 卡片: id, 操作: '替换卡', 记号: 'f6rk' }, [['例题', liti]])), 'f6rk');
assert.equal(same.note, target.note);
const changed = H.applyHandoff(target, H.parseHandoff(handoff({ 卡片: id, 操作: '替换卡', 记号: 'tyal' }, [['笔记', '#### 1. 向量与坐标\n\n改过的一句。']])), 'tyal');
assert.equal(changed.book, target.book);
const b0 = site.cardBlocks(target.note).blocks.find(x => x.id === 'tyal');
assert.equal(changed.note, target.note.slice(0, b0.start) + '#### 1. 向量与坐标\n\n改过的一句。' + target.note.slice(b0.start, b0.end).match(/\s*$/)[0] + target.note.slice(b0.end));
assert.equal(site.markerIssues(changed.book, changed.note).length, 0);
assert.throws(() => H.applyHandoff(target, H.parseHandoff(handoff({ 卡片: id, 操作: '替换卡', 记号: 'zzzz' }, [['笔记', 'x']])), 'zzzz'), /找不到记号/);

// 一次接几份（攒着交）：同一张卡按顺序依次接上，记号各不相同；结果和一份一份接一样
{
  const one = H.parseHandoff(handoff({ 卡片: id, 操作: '追加意义例题' }, [['意义', yiyi], ['例题', liti]]));
  const two = H.parseHandoff(handoff({ 卡片: id, 操作: '追加意义例题' }, [['意义', '#### 2. 方向二：乙'], ['例题', '#### 例题 2：乙']]));
  const ids = ['f6rk', 'q7zz'];
  const list = [{ h: one }, { h: two }];
  const all = H.applyAll({ [id]: base }, list, () => ids.shift());
  assert.deepEqual(list.map(x => x.id), ['f6rk', 'q7zz'], '每份记下自己的记号');
  const stepwise = H.applyHandoff(H.applyHandoff(base, one, 'f6rk'), two, 'q7zz');
  assert.equal(all[id].book, stepwise.book);
  assert.equal(all[id].note, stepwise.note);
  assert(all[id].book.indexOf('<!-- card:f6rk -->') < all[id].book.indexOf('<!-- card:q7zz -->'), '按顺序接');
  assert(all[id].note.includes('#### 例题 2：乙\n\n---\n\n<!-- section:提示 -->'), '第二份例题也在〔提示〕前的分隔线之前');
  assert.equal(site.markerIssues(all[id].book, all[id].note).length, 0);
  const swap = H.applyAll({ [id]: target }, [{ h: H.parseHandoff(handoff({ 卡片: id, 操作: '替换卡', 记号: 'f6rk' }, [['例题', liti]])) }], () => assert.fail('替换卡不该要新记号'));
  assert.equal(swap[id].note, target.note);
}

// 体检：挡住记号行、[cite]、反引号、HTML；提醒标题、⚠️ 前的分隔线、$ 不成对
const lint = (name, t) => H.lintPart(name, t);
assert.match(lint('例题', '#### 例题 1：甲\n\n走 `##### ❶` 的分支').errors.join(), /反引号/);
assert.match(lint('意义', '#### 1. 甲\n\n<!-- card:abcd -->').errors.join(), /记号行/);
assert.match(lint('意义', '#### 1. 甲\n\n结论 [cite: 1]').errors.join(), /cite/);
assert.match(lint('意义', '#### 1. 甲\n\n<br>换行').errors.join(), /HTML/);
assert.deepEqual(lint('意义', '#### 1. 甲\n\n$a<b$ 与 $c>d$').errors, [], '公式里的 < > 不算 HTML');
assert.match(lint('意义', '## 1. 甲').warns.join(), /####/);
assert.match(lint('意义', '#### 1. 甲\n\n* 乙\n\n* ⚠️ **边界与避坑**：丙').warns.join(), /分隔线/);
assert.deepEqual(lint('意义', '#### 1. 甲\n\n---\n\n* ⚠️ **边界与避坑**：丙').warns, []);
assert.match(lint('意义', '#### 1. 甲\n\n截断的 $x + y').warns.join(), /不成对/);
assert.deepEqual(lint('意义', '#### 1. 甲\n\n$$\na + b\n$$').warns, [], '跨行的 $$ 不算不成对');
assert.throws(() => H.parseHandoff('<!-- 意义 -->\n\n#### 1. 甲'), /---/);
assert.throws(() => H.applyHandoff(base, H.parseHandoff(handoff({ 卡片: id, 操作: '整节换掉' }, [['意义', '#### 1. 甲']])), 'abcd'), /不认识的操作/);

console.log('handoff ok');
