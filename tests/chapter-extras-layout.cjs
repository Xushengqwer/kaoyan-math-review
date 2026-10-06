const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const vm = require('node:vm');
const { abs } = require('../tools/lib.cjs');

const dataFiles = ['calculus', 'linalg', 'probability', 'notes', 'mindmaps', 'superseded']
  .map(name => 'assets/data/' + name + '.js');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const dataBefore = dataFiles.map(file => hash(fs.readFileSync(abs(file))));
const storage = {};
let nodes = [];
const hitBar = {};
const context = vm.createContext({
  console,
  window: {},
  document: {
    addEventListener() {},
    querySelectorAll(selector) {
      const classes = selector.split(',').map(value => value.trim().slice(1));
      return nodes.filter(node => classes.some(name => node.classes.includes(name)));
    },
    getElementById(id) { return id === 'chapter-hits' ? hitBar : null; },
  },
  localStorage: { getItem: key => storage[key] || null, setItem: (key, value) => { storage[key] = value; } },
});
for (const file of [
  'assets/vendor/marked/marked.umd.js', 'assets/js/data-loader.js', 'assets/js/storage.js',
  ...dataFiles, 'assets/js/katex-init.js', 'assets/js/app.js',
]) vm.runInContext(fs.readFileSync(abs(file), 'utf8'), context, { filename: file });
const { App, Notes, KaoyanData, noteMdHtml } = vm.runInContext('({ App, Notes, KaoyanData, noteMdHtml })', context);
App.subjects = KaoyanData.subjects();
const failures = [];
function test(name, check) {
  try { check(); console.log('PASS: ' + name); }
  catch (error) { failures.push(name); console.error('FAIL: ' + name + '\n' + error.message); }
}
function chapters(check) {
  for (const subject of App.subjects) for (const chapter of KaoyanData.chapters(subject.id)) {
    check(subject.id, chapter.id);
  }
}
function blocks(subjectId, chapterId) {
  return [App.chapterFlowHtml(subjectId, chapterId), App.chapterMapHtml(subjectId, chapterId),
    App.chapterSummaryHtml(subjectId, chapterId)].map(html => html.trim());
}
function once(html, text, label) {
  const at = html.indexOf(text);
  assert(at >= 0, label + ' is present');
  assert.equal(html.indexOf(text, at + text.length), -1, label + ' appears exactly once');
  return at;
}

test('every chapter wraps its unchanged flow, map and summary blocks in source order', () => {
  chapters((subjectId, chapterId) => {
    const expected = blocks(subjectId, chapterId);
    const html = App.chapterViewHtml(subjectId, chapterId);
    const outer = '<div class="chapter-extras">';
    const grid = '<div class="chapter-extras-grid">';
    const outerAt = once(html, outer, subjectId + '/' + chapterId + ': chapter extras container');
    const gridAt = once(html, grid, 'chapter extras grid');
    assert.match(html.slice(outerAt + outer.length, gridAt), /^\s*$/, 'the grid belongs inside the extras container');
    let cursor = gridAt + grid.length;
    for (const block of expected) {
      const at = once(html, block, 'original standalone extra HTML');
      assert(at >= cursor, 'flow, map and summary keep their original DOM order');
      assert.match(html.slice(cursor, at), /^\s*$/, 'no extra content replaces or splits the original cards');
      cursor = at + block.length;
    }
    assert.match(html.slice(cursor), /^\s*<\/div>\s*<\/div>/, 'both containers end immediately after the summary');
  });
});

test('all chapter IDs, note bodies, map slots and TOC order remain intact', () => {
  const notesBefore = JSON.stringify(Notes.exportAll());
  chapters((subjectId, chapterId) => {
    const expected = blocks(subjectId, chapterId);
    const html = App.chapterViewHtml(subjectId, chapterId);
    const ids = [App.chapterFlowId(subjectId, chapterId), App.chapterMapId(subjectId, chapterId),
      App.chapterNoteId(subjectId, chapterId)];
    const positions = expected.map((block, index) => {
      once(html, block, 'unchanged ' + ids[index] + ' HTML');
      return once(html, 'id="item-' + ids[index] + '"', ids[index]);
    });
    assert(positions[0] < positions[1] && positions[1] < positions[2], 'page source order stays flow / map / summary');
    for (const index of [0, 2]) {
      const raw = Notes.get(ids[index]);
      if (raw.trim()) assert(expected[index].includes(noteMdHtml(raw)), 'chapter note Markdown is rendered unchanged');
    }
    assert(expected[1].includes('data-map="' + ids[1] + '"'), 'the map retains its original storage key');
    const toc = App.chapterExtraTocHtml(subjectId, chapterId);
    const targets = ids.map(id => once(toc, 'data-goto="' + id + '"', 'TOC target ' + id));
    assert(targets[0] < targets[1] && targets[1] < targets[2], 'TOC keeps its original order and targets');
  });
  assert.equal(JSON.stringify(Notes.exportAll()), notesBefore, 'rendering does not rewrite any repository or local note');
});

test('local chapter drafts keep exact whitespace, formulas and export text', () => {
  const subjectId = 'linalg', chapterId = 'matrix';
  const drafts = [
    [App.chapterFlowId(subjectId, chapterId), '  ## 本机决策流\r\n\r\n保留  两个空格、==$x<2$==和“原文”。\r\n'],
    [App.chapterNoteId(subjectId, chapterId), '\n## 本机总结\n\n**原样草稿**：$0.5<x<1$；不删尾部空白。  \n'],
  ];
  for (const [id, raw] of drafts) assert(Notes.set(id, raw), 'the fixture is stored in the isolated VM');
  const before = JSON.stringify(Notes.exportAll());
  const expected = blocks(subjectId, chapterId);
  const html = App.chapterViewHtml(subjectId, chapterId);
  expected.forEach(block => once(html, block, 'standalone HTML with local drafts'));
  for (const [id, raw] of drafts) {
    assert.equal(Notes.get(id), raw, 'render preserves draft bytes for ' + id);
    assert(html.includes(noteMdHtml(raw)), 'the page renders the local draft instead of the seed');
    assert(App.buildNoteText(id).includes(App.BODY_OPEN + '\n\n' + raw + '\n\n' + App.bodyClose(id)),
      'export retains the exact local Markdown');
  }
  assert.equal(JSON.stringify(Notes.exportAll()), before, 'render and export leave all draft text unchanged');
});

test('chapter search hides and restores the parent layout and every original card', () => {
  // These stand-ins expose only the DOM contract used by chapterSearchMode.
  // Card HTML comes from the real renderer; visibility must change without rebuilding it.
  const html = blocks('linalg', 'matrix');
  const parent = { classes: ['chapter-extras'], hidden: false };
  const cards = html.map(innerHTML => ({ classes: ['chapter-summary'], hidden: false, innerHTML }));
  const controls = ['export-bar', 'pager'].map(name => ({ classes: [name], hidden: false }));
  nodes = [parent, ...cards, ...controls];
  App.chapterSearchMode(true);
  assert.equal(parent.hidden, true, 'search must hide the whole chapter extras container');
  assert(cards.every(card => card.hidden), 'search keeps the original child-card visibility behavior');
  assert(controls.every(node => node.hidden), 'export and pager remain hidden during search');
  App.chapterSearchMode(false);
  assert(nodes.every(node => !node.hidden), 'clearing search restores the parent, cards and controls');
  assert.equal(hitBar.hidden, true, 'clearing search also hides the result count');
  assert.deepEqual(cards.map(card => card.innerHTML), html, 'search leaves every card HTML unchanged');
});

test('chapter rendering and local drafts leave every data file byte unchanged', () => {
  assert.deepEqual(dataFiles.map(file => hash(fs.readFileSync(abs(file)))), dataBefore);
});
if (failures.length) process.exitCode = 1;
else console.log('PASS: chapter extras keep original HTML, text, source order, search visibility and data bytes.');
