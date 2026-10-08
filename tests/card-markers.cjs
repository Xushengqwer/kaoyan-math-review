// 卡片格子（app.js「卡片格子」那一段）：结构和配对只看看不见的记号，卡片里写什么标题都不会错位；
// 卡片按钮（上移、下移、在下面加一张、复制到、删除）只挪动、增删记号块；迁移往返逐字节相同。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { loadSite, loadSubjects, loadNotes, findItem } = require('../tools/lib.cjs');
const { migrateCard, verifyCard } = require('../tools/card-markers.cjs');

const site = loadSite();
// 网站代码跑在 vm 里，数组、对象跨上下文，按 JSON 比
const same = (a, b, msg) => assert.equal(JSON.stringify(a), JSON.stringify(b), msg);
const { App, CardOps } = site;
const dataFiles = ['calculus', 'linalg', 'probability', 'notes', 'superseded'].map((n) => 'assets/data/' + n + '.js');
const dataBefore = dataFiles.map((f) => fs.readFileSync(f));

// ── 一张小样卡：定义 ① 两张；性质 ① 一个分组一张、② 一张 ──
const card = (id) => '<!-- card:' + id + ' -->\n\n';
const sideText = (note) => [
  '<!-- section:定义 -->\n\n### 〔定义〕\n\n',
  '<!-- station:① -->\n\n**① 第一站**\n\n',
  card('aaaa') + '#### 1. 甲' + (note ? '：解释' : '') + '\n\n' + (note ? '笔记甲。' : '教材甲。') + '\n\n',
  card('bbbb') + '#### 1. 乙' + (note ? '：解释' : '') + '\n\n' + (note ? '笔记乙。' : '教材乙。') + '\n\n',
  '<!-- section:性质 -->\n\n### 〔性质〕\n\n',
  '<!-- station:① -->\n\n**① 第一站**\n\n',
  '<!-- group:gggg -->\n\n**一组**\n\n',
  card('cccc') + '#### 1. 丙\n\n' + (note ? '笔记丙。' : '教材丙。') + '\n\n',
  '<!-- station:② -->\n\n**② 第二站**\n\n',
  card('dddd') + '#### 1. 丁\n\n' + (note ? '笔记丁。' : '教材丁。'),
].join('');
const texts = { book: sideText(false), note: sideText(true) };
const id = 'calc-mi-double-def';
const model = (t) => App.dualTrackModel(id, t.book, t.note);
const titlesOf = (t) => model(t).pairs.map((p) => p.book.num + '.' + p.book.title + '/' + p.note.num + '.' + p.note.title);

assert.equal(site.hasMarkers(texts.book), true);
assert.equal(site.markMode(texts.book, texts.note), 'marked');
assert.equal(site.markMode(texts.book, ''), 'marked', '笔记还空着也按格子');
assert.equal(site.markMode(texts.book, '### 〔定义〕\n\n#### 1. 甲'), 'mixed', '只有一边有记号 = 本机旧副本');
assert.equal(site.markMode('### 〔定义〕', '正文'), '');
same(site.markerIssues(texts.book, texts.note), []);
assert.equal(site.stripMarkers(texts.book).includes('<!--'), false);
assert(site.stripMarkers(texts.book).startsWith('### 〔定义〕\n\n**① 第一站**\n\n#### 1. 甲\n\n教材甲。\n\n#### 1. 乙'), '去掉记号连同后面的空行');

const m0 = model(texts);
assert.equal(m0.marked, true);
assert.equal(m0.enabled, true);
// 编号按位置：原文里两张都写的「1.」，显示成 1、2；分组、站里各自从 1 起
same(titlesOf(texts), ['1.甲/1.甲：解释', '2.乙/2.乙：解释', '1.丙/1.丙', '1.丁/1.丁']);
const html0 = App.dualTrackHtml(m0);
assert(html0.includes('<h4>2. 乙</h4>'), '显示自动编号');
assert(!html0.includes('没有这一条'));
assert(!html0.includes('&lt;!--') && !html0.includes('card:'), '记号不显示');
assert.equal(m0.pairs.find((p) => p.book.title === '丙').book.group, '一组');
// 站卡小标题、站表
const o0 = site.cardOutline(texts.book, texts.note);
assert.equal(o0.structured, true);
same(o0.blocks.map((b) => b.mark), ['①', '②']);
same(o0.blocks[0].rows.book定义.items.map((it) => it.num + it.title), ['1甲', '2乙']);
same(o0.blocks[0].rows.book性质.items.map((it) => it.group), ['一组']);
same(App.stationMap(id, texts).book.kinds, ['定义', '性质']);

// ── 卡片里写任何标题都不影响结构 ──
const noisy = '\n\n### 〔性质〕粘进来的小节\n\n**② 粘进来的站名**\n\n#### 7. 粘进来的卡\n\n### 随便一个标题\n\n**加粗一行**';
for (const part of ['book', 'note']) {
  const t = { ...texts };
  t[part] = t[part].replace(part === 'book' ? '教材乙。' : '笔记乙。', (x) => x + noisy);
  same(titlesOf(t), titlesOf(texts), part + '：卡片里有 ###、#### 7.、**② …** 也照样配对、编号不变');
  assert.equal(JSON.stringify(site.cardOutline(t.book, t.note)), JSON.stringify(o0), part + '：站卡小标题不变');
  const h = App.dualTrackHtml(model(t));
  assert(!h.includes('没有这一条'));
  assert(h.includes('粘进来的卡'), '粘进来的标题只是卡片里的字');
  assert(!/class="station[^"]*" data-part="[^"]*" data-sec="[^"]*" data-station="②"[^>]*><div class="station-head"><span class="station-no">②<\/span>[^<]*<span class="station-name">粘进来的站名/.test(h),
    '卡片里的「**② …**」不会变成站牌');
}
// 标题不写编号也行：显示时补上
{
  const t = { ...texts, book: texts.book.replace('#### 1. 乙', '#### 乙改了名') };
  assert(App.dualTrackHtml(model(t)).includes('<h4>2. 乙改了名</h4>'));
  assert.equal(model(t).pairs[1].book.title, '乙改了名');
}
assert.equal(site.numberCard('#### 例题 3-2：甲\n\n#### 例题 3：乙', '5', '例题'), '#### 例题 5-2：甲\n\n#### 例题 5：乙');
assert.equal(site.numberCard('\n#### 9. 甲', '2', '性质'), '\n#### 2. 甲');
assert.equal(site.numberCard('正文第一行', '2', '性质'), '正文第一行', '第一行不是标题就不加编号');
assert.equal(site.cardTitle('#### 例题 2-1：判断奇偶', '例题'), '判断奇偶');

// ── 卡片按钮 ──
const blocksOf = (raw) => site.cardBlocks(raw).blocks.map((b) => b.kind + ':' + b.value);
const coresOf = (raw) => CardOps.split(raw).items.map((x) => x.core).sort();
const okTexts = (t, label) => same(site.markerIssues(t.book, t.note), [], label + '：记号完整');

// 上移：同一站里换位置；两边一起
{
  assert.equal(CardOps.canMove(texts, 'aaaa', -1), false, '第一站最上面那张不能再往上');
  assert.equal(CardOps.canMove(texts, 'bbbb', 1), false, '小节的最后一张不能挪进下一个小节');
  const t = CardOps.move(texts, 'bbbb', -1);
  okTexts(t, '上移');
  same(titlesOf(t).slice(0, 2), ['1.乙/1.乙：解释', '2.甲/2.甲：解释']);
  same(coresOf(t.book), coresOf(texts.book), '只换了位置，每一块的字都没变');
  same(coresOf(t.note), coresOf(texts.note));
  same(CardOps.move(t, 'bbbb', 1), texts, '再下移就回到原样，逐字节');
}
// 到了站的边上就挪进相邻那一站（第二站的第一张往上 → 第一站「一组」的末尾）
{
  const t = CardOps.move(texts, 'dddd', -1);
  okTexts(t, '跨站');
  const p = model(t).pairs.find((x) => x.book.title === '丁');
  assert.equal(p.book.station, '①'); assert.equal(p.note.station, '①');
  assert.equal(p.book.group, '一组'); assert.equal(p.book.num, '2');
  same(CardOps.move(t, 'dddd', 1), texts, '再下移回到第二站');
}
// 在下面加一张：教材「#### 新卡片」，笔记空着但有一格
{
  const nid = CardOps.newId(texts);
  assert.match(nid, /^[a-z][a-z0-9]{3}$/);
  const t = CardOps.add(texts, 'aaaa', nid);
  okTexts(t, '加一张');
  same(titlesOf(t).slice(0, 3), ['1.甲/1.甲：解释', '2.新卡片/2.', '3.乙/3.乙：解释']);
  const h = App.dualTrackHtml(model(t));
  assert(h.includes('（还没写）'), '空的笔记那一半照样留一格');
  // 在空格子里写笔记：和下一张之间空一行
  const seg = model(t).note.segments.find((s) => s.id === nid);
  assert.equal(seg.start, seg.end);
  const filled = site.cellSpliceMarked(t.note, seg.start, seg.end, '新笔记');
  assert(filled.includes('<!-- card:' + nid + ' -->\n\n新笔记\n\n<!-- card:bbbb -->'));
  okTexts({ book: t.book, note: filled }, '写进空格子');
  same(site.stripMarkers(CardOps.remove(t, nid).book), site.stripMarkers(texts.book), '删掉新加的那张，回到原样');
}
// 删除：教材、笔记两半一起删，别的块一个字不动
{
  const t = CardOps.remove(texts, 'bbbb');
  okTexts(t, '删除');
  assert.equal(model(t).pairs.length, 3);
  assert(!t.book.includes('教材乙') && !t.note.includes('笔记乙'));
  const rest = (raw) => coresOf(raw).filter((c) => !c.includes('bbbb'));
  same(coresOf(t.book), rest(texts.book));
  same(coresOf(t.note), rest(texts.note));
  same(blocksOf(CardOps.remove(texts, 'dddd').book).slice(-1), ['station:②'], '删最后一张，前面的不受影响');
}
// 复制到：接到目标卡末尾，前面一行「##### 复制自：标题」代替原来的标题行；这张卡保留
{
  const t = CardOps.copy(texts, 'aaaa', 'dddd', '甲');
  okTexts(t, '复制');
  assert(t.book.endsWith('#### 1. 丁\n\n教材丁。\n\n##### 复制自：甲\n\n教材甲。'));
  assert(t.note.endsWith('#### 1. 丁\n\n笔记丁。\n\n##### 复制自：甲：解释\n\n笔记甲。'));
  assert.equal(model(t).pairs.length, 4, '复制不改变卡片数');
  assert(t.book.includes(card('aaaa') + '#### 1. 甲\n\n教材甲。'), '原卡保留');
  const mid = CardOps.copy(texts, 'dddd', 'aaaa', '丁');
  assert(mid.book.includes('教材甲。\n\n##### 复制自：丁\n\n教材丁。\n\n' + card('bbbb')), '复制到中间的卡，和下一张之间照样空一行');
  okTexts(mid, '复制到中间');
}

// ── 只有一边有记号（本机旧副本）：去掉记号照旧显示，标出来 ──
{
  const mixed = App.dualTrackModel(id, texts.book, site.stripMarkers(texts.note));
  assert.equal(mixed.mixed, true);
  assert(!mixed.marked);
}

// ── 真实数据：带记号的卡记号完整、去掉记号还能照旧显示；没带记号的对照卡，迁移预演逐格一致 ──
const subjects = loadSubjects(), notes = loadNotes();
const DUAL = ['calc-lim-function', 'calc-der-derivative', 'calc-int-antiderivative', 'calc-vec-coordinates',
  'calc-mvd-limit-continuity', 'calc-mi-double-def', 'calc-ls-line-first', 'calc-ser-convergence', 'calc-ode-concepts',
  'la-eig-def-eigen', 'la-vec-def-max-independent-set'];
// 迁移以后用户在网站上改过结构的卡（合并、删卡、标题改成 ### 等）：边界和配对只认记号，
// 去掉记号的旧对照已经认不出这些标题，不再逐格比；改查两边都有的卡都配上（意义可以没有例题，笔记的卡教材里都有）
const RESTRUCTURED = new Set(['calc-der-derivative']);
let marked = 0;
for (const did of DUAL) {
  const book = findItem(did, subjects).item.md, note = notes[did];
  if (site.hasMarkers(book)) {
    marked++;
    same(site.markerIssues(book, note), [], did + '：记号完整');
    if (RESTRUCTURED.has(did)) {
      const m = App.dualTrackModel(did, book, note);
      assert(m.marked && m.enabled, did + '：按格子对照');
      const cards = (t) => new Set(site.cardBlocks(t).blocks.filter((b) => b.kind === 'card').map((b) => b.id));
      const bookIds = cards(book), noteIds = [...cards(note)];
      assert(noteIds.every((x) => bookIds.has(x)), did + '：笔记的卡教材里都有');
      assert.equal(m.pairs.length, noteIds.length, did + '：两边都有的卡都配上');
    } else {
      verifyCard(site, did, { book: site.stripMarkers(book), note: site.stripMarkers(note) }, { book, note });
    }
    // 每张卡都能上下移再挪回来，逐字节回到原样
    const t = { book, note };
    const ids = site.cardBlocks(book).blocks.filter((b) => b.kind === 'card').map((b) => b.id);
    for (const cid of ids.filter((_, i) => i % 7 === 0)) {
      for (const dir of [-1, 1]) {
        if (!CardOps.canMove(t, cid, dir)) continue;
        const moved = CardOps.move(t, cid, dir);
        same(site.markerIssues(moved.book, moved.note), [], did + ' ' + cid + '：挪完记号完整');
        same(CardOps.move(moved, cid, -dir), t, did + ' ' + cid + '：挪回去逐字节一样');
      }
    }
  } else {
    migrateCard(site, did, book, note);
  }
}
console.log('  带记号的对照卡 ' + marked + ' 张，其余 ' + (DUAL.length - marked) + ' 张迁移预演通过');
// 别的卡都没有记号
for (const s of subjects) for (const it of s.items) {
  if (!DUAL.includes(it.id)) assert(!site.hasMarkers(it.md) && !site.hasMarkers(notes[it.id] || ''), it.id + '：不在对照卡里，不该有记号');
}

for (let i = 0; i < dataFiles.length; i++) {
  assert(fs.readFileSync(dataFiles[i]).equals(dataBefore[i]), dataFiles[i] + '：显示和按钮的测试不改数据文件');
}
console.log('card markers ok');
