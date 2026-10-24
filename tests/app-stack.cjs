const assert = require('node:assert/strict');
const fs = require('node:fs');
const { abs, loadSite, loadSubjects, loadNotes, PINNED } = require('../tools/lib.cjs');

// 2026-10-15 用户定：对照里的意义、例题不分两栏。两半都有的行上下叠成满格（is-stack，意义在上、例题在下），
// 只有一半的占满格（is-wide），不出「没有这一条」；定义、性质照旧左右两栏。只改显示，数据文件不动。
const dataFiles = ['calculus', 'linalg', 'probability', 'notes', 'superseded'].map(name => abs('assets/data/' + name + '.js'));
const dataBefore = dataFiles.map(file => fs.readFileSync(file));
// 每一行的规矩查现在的全部内容；条数、顺序快照只查钉住的那一版（tools/lib.cjs 的 PINNED），以后上线不用改这里
const at = (rev) => { const subjects = loadSubjects(rev), notes = loadNotes(rev), site = loadSite(rev); site.App.subjects = subjects; return { subjects, notes, site }; };
const now = at(), pinned = at(PINNED);

const rowsOf = html => Array.from(html.matchAll(/<div class="(dual-row [^"]*)">([\s\S]*?)(?=<div class="dual-row |<\/div>$)/g),
  m => ({ cls: m[1], secs: Array.from(m[2].matchAll(/<div class="dual-cell[^"]*"[^>]*data-part="(book|note)" data-sec="([^"]*)"/g), x => x[1] + ':' + x[2]),
    missing: /dual-missing/.test(m[2]) }));

function stackRows({ subjects, notes, site }, ids) {
let stacked = 0, checked = 0;
for (const id of ids) {
  const item = subjects.flatMap(s => s.items).find(i => i.id === id);
  const model = site.App.dualTrackModel(id, item.md, notes[id]);
  const rows = rowsOf(site.App.dualTrackHtml(model));
  assert(rows.length, id + ': rows rendered');
  for (const r of rows) {
    const app = r.secs.some(s => /:(意义|例题)$/.test(s));
    if (app) {
      checked++;
      assert(!r.missing, id + ': 意义/例题 不显示「没有这一条」');
      if (r.secs.length === 2) { stacked++; assert(/\bis-stack\b/.test(r.cls), id + ': 意义、例题两半都有的行上下叠成满格'); }
      else assert(/\bis-wide\b|\bis-merged\b/.test(r.cls) || r.secs.length < 2, id + ': 只有一半的意义/例题占满格');
      if (r.secs.length === 2) assert.deepEqual(r.secs.map(s => s.split(':')[0]), ['book', 'note'], id + ': 意义在上、例题在下');
    } else {
      assert(!/\bis-stack\b/.test(r.cls), id + ': 定义、性质不叠');
    }
  }
}
return { stacked, checked };
}
stackRows(now, now.subjects.flatMap(s => s.items).filter(i => now.site.hasMarkers(i.md)).map(i => i.id));
const { stacked, checked } = stackRows(pinned, ['calc-lim-function', 'calc-der-derivative', 'calc-int-antiderivative', 'calc-vec-coordinates', 'la-eig-def-eigen']);
assert(stacked >= 3, '至少有几行意义、例题叠成满格');
assert(checked > stacked, '也检查到只有一半或小节标题的行');

// 右侧目录（现在的全部高数卡）：题型写法（有例题条目）的，意义 1、2、3……依次排，每道例题 n 跟在意义 n 后面、意义 n+1 前面；
// 旧写法（意义、例题各一整段）每段从 1 起依次排；例题那一段（rl-sec ex）记作「题」，「例题 n-1」「例题 n-2」同号（2026-10-24，第 5 章新旧并存时）
const railOrder = (id, chapter, { subjects, site } = pinned) => {
  const item = subjects.flatMap(s => s.items).find(i => i.id === id);
  const r = site.App.stationRailHtml(item, 'calculus', chapter);
  const body = typeof r === 'string' ? r : r.body, exAt = body.indexOf('<div class="rl-sec ex">');
  return Array.from(body.matchAll(/<li( class="rl-ex")?>[\s\S]*?<span class="rl-tno">([^<]*)<\/span>/g),
    m => (m[1] ? '例' : exAt >= 0 && m.index > exAt ? '题' : '意') + m[2].replace(/^例 /, ''));
};
for (const item of now.subjects.find(s => s.id === 'calculus').items) {
  const order = railOrder(item.id, item.chapterId, now), typed = order.some(x => x[0] === '例');
  let last = 0;
  for (const x of order) {
    const n = parseInt(x.slice(1), 10);
    if (x[0] === '例') assert.equal(n, last, item.id + '：例题 ' + n + ' 跟在意义 ' + n + ' 后面');
    else if (x[0] === '题') { assert(n === last + 1 || n === 1 || n === last, item.id + '：目录里例题按顺序编号（' + order.join(' ') + '）'); last = n; }
    else { assert(n === last + 1 || (!typed && n === 1), item.id + '：目录里意义按顺序编号（' + order.join(' ') + '）'); last = n; }
  }
}

// 以下是钉住的那一版。第 3 章：意义 1、例题 1、意义 2、例题 2 依次排下来
const { subjects, notes, site } = pinned;
const ch3 = subjects.flatMap(s => s.items).find(i => i.id === 'calc-int-antiderivative');
const html3 = site.App.dualTrackHtml(site.App.dualTrackModel(ch3.id, ch3.md, notes[ch3.id]));
const order = Array.from(html3.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/g), m => m[1].replace(/<[^>]+>/g, ''))
  .map(t => (t.trim().match(/^(\d+\. 方向.|例题 \d+)(?=：|（)/) || [])[0]).filter(Boolean);
assert.deepEqual(order, ['1. 方向一', '例题 1', '2. 方向二', '例题 2', '3. 方向三', '例题 3', '4. 方向四', '例题 4'], '第 3 章意义、例题交替排列');

// 右侧目录：题型写法（意义是「#### n.」）的卡，意义 n 下面紧跟例题 n；旧写法（意义是一整张列表）仍分两段
assert.deepEqual(railOrder('calc-int-antiderivative', 'integral'), ['意1', '例1', '意2', '例2', '意3', '例3', '意4', '例4'], '第 3 章目录：意义、例题交替');
const lim = railOrder('calc-lim-function', 'limit');
assert.deepEqual(lim.slice(0, 4), ['意1', '例1', '例1', '意2'], '第 1 章目录：题型 1 的两道例题挂在意义 1 下面');
// 第 4 章（10-17 删掉旧版、只留四个方向）：和第 3 章一样意义 n、例题 n 交替
assert.deepEqual(railOrder('calc-vec-coordinates', 'vector-geometry'), ['意1', '例1', '意2', '例2', '意3', '例3', '意4', '例4'], '第 4 章目录：意义、例题交替');

dataFiles.forEach((file, i) => assert(dataBefore[i].equals(fs.readFileSync(file)), '数据文件不变：' + file));
console.log('app-stack ok: ' + stacked + ' 行叠成满格，检查 ' + checked + ' 行意义/例题');
