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
assert.deepEqual(lint('笔记·性质 第 1 张', '#### 1. 甲\n\n* 乙\n* ⚠️ **边界与避坑**：丙').warns, [], '〔性质〕的卡里 ⚠️ 前不用 ---');
assert.match(lint('意义', '#### 1. 甲\n\n截断的 $x + y').warns.join(), /不成对/);
assert.deepEqual(lint('意义', '#### 1. 甲\n\n$$\na + b\n$$').warns, [], '跨行的 $$ 不算不成对');
assert.throws(() => H.parseHandoff('<!-- 意义 -->\n\n#### 1. 甲'), /---/);
assert.throws(() => H.applyHandoff(base, H.parseHandoff(handoff({ 卡片: id, 操作: '整节换掉' }, [['意义', '#### 1. 甲']])), 'abcd'), /不认识的操作/);

// 重写站（10-18，第 5 章起交稿）：拿第 4 章手工提交的两次整站重写当样本，把新站的卡抽出来做成交稿，接到上一版上，
// 记号按当时用的顺序给，必须逐字等于当时的教材和笔记。
//   88b33f2 第③站：定义、性质都换（站引子换新、去掉分组）
//   68d344a 第③④站：定义写「（无）」整站删掉，性质换成一个工具一张卡、加站引子
{
  const stationOf = (src, sec, st) => {
    const bs = site.cardBlocks(src).blocks;
    const i = bs.findIndex(b => b.kind === 'station' && b.sec === sec && b.value === st);
    if (i < 0) return null;
    let j = i + 1;
    while (j < bs.length && bs[j].kind !== 'station' && bs[j].kind !== 'section') j++;
    const cards = bs.slice(i + 1, j).filter(b => b.kind === 'card');
    return { intro: src.slice(bs[i].start, bs[i].end).trim().split('\n').slice(1).join('\n').trim(), ids: cards.map(b => b.id),
      texts: cards.map(b => src.slice(b.start, b.end).replace(/\n+---[ \t]*\n\s*$/, '').trim()) };
  };
  const segment = (s) => s ? [s.intro, ...s.texts].filter(Boolean).join('\n\n') : '（无）';
  const restation = (target, st) => {
    const parts = [], ids = [];
    for (const sec of ['定义', '性质']) {
      for (const [part, name] of [['book', '教材'], ['note', '笔记']]) parts.push([name + '·' + sec, segment(stationOf(target[part], sec, st))]);
      ids.push(...(stationOf(target.book, sec, st) || { ids: [] }).ids);
    }
    return { h: H.parseHandoff(handoff({ 卡片: id, 操作: '重写站', 站: st, 说明: '第' + st + '站' }, parts)), ids };
  };
  const run = (base, x) => H.applyHandoff(base, x.h, () => x.ids.shift());

  const t3 = at('88b33f2'), s3 = restation(t3, '③');
  assert.deepEqual(Object.keys(s3.h.parts).sort(), ['book:定义', 'book:性质', 'note:定义', 'note:性质']);
  const o3 = run(at('7df07dc'), s3);
  assert.equal(o3.book, t3.book, '第③站教材整站换掉，和手工提交的一样');
  assert.equal(o3.note, t3.note, '第③站笔记整站换掉，和手工提交的一样');

  const t34 = at('68d344a'), a3 = restation(t34, '③'), a4 = restation(t34, '④');
  assert.equal(a3.h.parts['book:定义'].text, '（无）');
  const list = [{ h: a3.h }, { h: a4.h }], ids = [...a3.ids, ...a4.ids];
  const o34 = H.applyAll({ [id]: at('0a24ce3') }, list, () => ids.shift())[id];
  assert.equal(o34.book, t34.book, '第③④站〔定义〕删掉、〔性质〕换掉，和手工提交的一样');
  assert.equal(o34.note, t34.note);
  assert.equal(site.markerIssues(o34.book, o34.note).length, 0);
  assert.deepEqual(list.map(x => Object.keys(x.ids)), [['定义', '性质'], ['定义', '性质']]);
  assert.match(list[0].summary[0], /〔定义〕删掉这一站：旧 3 张/);

  // 只交〔性质〕两段：〔定义〕不动；没写站引子就沿用旧的
  const base = at('0a24ce3'), p = stationOf(t34.book, '性质', '③'), pn = stationOf(t34.note, '性质', '③');
  const only = H.rewriteStation(base, H.parseHandoff(handoff({ 卡片: id, 操作: '重写站', 站: '③' },
    [['教材·性质', p.texts.join('\n\n')], ['笔记·性质', pn.texts.join('\n\n')]])), (() => { const q = [...p.ids]; return () => q.shift(); })());
  assert.equal(only.summary[0], '〔定义〕不动');
  assert.equal(stationOf(only.out.book, '定义', '③').texts.join(), stationOf(base.book, '定义', '③').texts.join());
  assert.equal(stationOf(only.out.book, '性质', '③').intro, stationOf(base.book, '性质', '③').intro);
  assert.equal(site.markerIssues(only.out.book, only.out.note).length, 0);

  // 这一节原来没有这一站：按圈号插进去（把删掉的〔定义〕第③站加回去）
  const addBack = (src) => H.rewriteStation(src, H.parseHandoff(handoff({ 卡片: id, 操作: '重写站', 站: '③' },
    [['教材·定义', '#### 1. 甲\n\n教材甲'], ['笔记·定义', '#### 1. 甲\n\n笔记甲']])), () => 'zq01').out;
  const defStations = (src) => Array.from(site.cardBlocks(src).blocks.filter(b => b.kind === 'station' && b.sec === '定义'), b => b.value);
  const mid = addBack(t34);   // 68d344a：〔定义〕还有 ⑤⑥
  assert.deepEqual(defStations(mid.book), ['①', '②', '③', '⑤', '⑥'], '插在第⑤站前面');
  assert(mid.note.includes('笔记甲\n\n<!-- station:⑤ -->'));
  const end = addBack(at('124e1c1'));   // 〔定义〕只剩 ①②
  assert.deepEqual(defStations(end.book), ['①', '②', '③'], '插在〔定义〕末尾');
  assert(end.book.includes('#### 1. 甲\n\n教材甲\n\n---\n\n<!-- section:性质 -->'), '在〔定义〕末尾的分隔线之前');
  for (const o of [mid, end]) assert.equal(site.markerIssues(o.book, o.note).length, 0);

  // 拦住的写法
  const bad = (parts, st = '③') => () => H.rewriteStation(base, H.parseHandoff(handoff({ 卡片: id, 操作: '重写站', 站: st }, parts)), () => 'zq02');
  assert.throws(bad([['教材·性质', '#### 1. 甲'], ['笔记·性质', '#### 1. 甲\n\n#### 2. 乙']]), /一样多/);
  assert.throws(bad([['教材·性质', '#### 1. 甲']]), /成对/);
  assert.throws(bad([['教材·定义', '（无）'], ['笔记·定义', '#### 1. 甲']]), /（无）/);
  assert.throws(bad([['教材·性质', '#### 1. 甲'], ['笔记·性质', '#### 1. 甲']], '3'), /站的圈号/);
  assert.throws(bad([['教材·性质', '只有字没有卡'], ['笔记·性质', '#### 1. 甲']]), /分不出卡/);
  const pieces = H.stationPieces({ name: '教材·性质', text: '**③ 平面和直线**\n\n引子\n\n#### 1. 甲\n\n正文\n\n---\n\n乙\n\n#### 丙' });
  assert.match(pieces.errors.join(), /站名行不用写/);
  assert.match(pieces.warns.join(), /不是「#### n. 标题」/);
  assert.deepEqual(pieces.pieces.map(q => q.name), ['教材·性质 站引子', '教材·性质 第 1 张', '教材·性质 第 2 张']);
  assert.match(H.stationPieces({ name: '笔记·定义', text: '#### 1. 甲\n\n正文\n\n---' }).warns.join(), /末尾有 ---/);
  // 先只交教材（10-19 起）：笔记卡写「（待写）」也能接成一站（预览、审教材用），记下还有几张没写
  const draft = H.parseHandoff(handoff({ 卡片: id, 操作: '重写站', 站: '③' },
    [['教材·性质', '#### 1. 甲\n\n* **甲**：定义\n\n#### 2. 乙\n\n* **乙**：定理'], ['笔记·性质', '#### 1. 甲\n\n（待写）\n\n#### 2. 乙\n\n（待写）']]));
  assert.equal(H.pendingCards(draft), 2);
  const drafted = H.rewriteStation(base, draft, (() => { const q = ['zq03', 'zq04']; return () => q.shift(); })()).out;
  assert.equal(site.markerIssues(drafted.book, drafted.note).length, 0, '待写的笔记卡照样配对');
  assert.equal(H.pendingCards(H.parseHandoff(handoff({ 卡片: id, 操作: '重写站', 站: '③' },
    [['教材·性质', '#### 1. 甲\n\n写了「（待写）」这几个字不算'], ['笔记·性质', '#### 1. 甲\n\n笔记']]))), 0, '只认单独一行的（待写）');
}

// 替换本卡主线（10-19，第 5 章五站）：换回同样的字不变；换成新的只动「### 〔定义〕」到第一个站记号之间
{
  const book = at('124e1c1').book;
  const sec = site.cardBlocks(book).blocks.find(b => b.kind === 'section' && b.value === '定义');
  const old = book.slice(sec.start, sec.end).replace(/^\s*###[^\n]*\n/, '').trim();
  assert.match(old, /^\*\*本卡主线\*\*/);
  const swap = (text) => H.applyHandoff(at('124e1c1'), H.parseHandoff(handoff({ 卡片: id, 操作: '替换本卡主线' }, [['教材', text]])), '');
  assert.equal(swap(old).book, book, '换回原样，一字不差');
  const changed = swap('**本卡主线**：新的一句。\n* **依赖**：无。');
  assert.equal(changed.book, book.replace(old, '**本卡主线**：新的一句。\n* **依赖**：无。'));
  assert.equal(changed.note, at('124e1c1').note, '笔记不动');
  assert.equal(site.markerIssues(changed.book, changed.note).length, 0);
  assert.throws(() => swap('没有标签的一句'), /本卡主线/);
  const list = [{ h: H.parseHandoff(handoff({ 卡片: id, 操作: '替换本卡主线' }, [['教材', old]])) }];
  H.applyAll({ [id]: at('124e1c1') }, list, () => assert.fail('替换本卡主线不该要新记号'));
}

// 审稿状态（10-17 晚起 Claude 审稿）：--reviewed 把审过的那一版复制进 drafts/审过/，--write 只接一字不差的
{
  const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'handoff-review-'));
  try {
    const draft = path.join(tmp, '方向2.md'), snaps = path.join(tmp, '审过');
    fs.writeFileSync(draft, '第一版');
    assert.equal(H.reviewState(draft, snaps), '没审过');
    H.markReviewed(draft, snaps);
    assert.equal(H.reviewState(draft, snaps), '审过');
    fs.writeFileSync(draft, '按意见改过');
    assert.equal(H.reviewState(draft, snaps), '审过后改过');
    assert.equal(fs.readFileSync(path.join(snaps, '方向2.md'), 'utf8'), '第一版', '副本留着审过的那一版，好只看改动');
    // 审稿意见在镜像根目录的 审稿意见/ 里，和稿子同名；稿子不在 待提交/ 里就没有
    assert.equal(H.reviewNotes(path.join(tmp, '待提交', '方向2.md')), path.join(tmp, '审稿意见', '方向2.md'));
    assert.equal(H.reviewNotes(draft), null);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  assert.equal(path.relative(require('../tools/lib.cjs').REPO, H.REVIEWED), path.join('drafts', '审过'), '副本在仓库 drafts/ 里，Gemini 看不到');
}

console.log('handoff ok');
