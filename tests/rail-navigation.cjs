const assert = require('node:assert/strict');
const fs = require('node:fs');
const { abs, loadSite, loadSubjects, loadNotes, findItem } = require('../tools/lib.cjs');

const dataFiles = ['calculus', 'linalg', 'probability', 'notes', 'superseded', 'mindmaps']
  .map(name => abs('assets/data/' + name + '.js'));
const dataBefore = dataFiles.map(file => fs.readFileSync(file));
const site = loadSite();
site.App.subjects = loadSubjects();

// No DOM package is installed in this static repository. Keep the real rendered
// div tree, classes, data attributes and sibling order needed by both target
// functions; headings/text inside the divs do not affect row navigation.
class Element {
  constructor(tag, attrs = {}) {
    this.tagName = tag.toUpperCase();
    this.attrs = attrs;
    this.children = [];
    this.parentElement = null;
    this.dataset = {};
    for (const [name, value] of Object.entries(attrs)) {
      if (name.startsWith('data-')) {
        const key = name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        this.dataset[key] = value;
      }
    }
    this.classList = { contains: name => (attrs.class || '').split(/\s+/).includes(name) };
  }
  append(child) { child.parentElement = this; this.children.push(child); }
  get nextElementSibling() {
    if (!this.parentElement) return null;
    const siblings = this.parentElement.children;
    return siblings[siblings.indexOf(this) + 1] || null;
  }
  matches(selector) {
    let matched = true;
    const rest = selector.trim().replace(/\[([^\]=\s]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\]]+)))?\]/g,
      (_, name, double, single, bare) => {
        const value = double ?? single ?? bare;
        if (!(name in this.attrs) || (value != null && this.attrs[name] !== value)) matched = false;
        return '';
      });
    assert(/^(?:[a-z][a-z0-9-]*)?(?:\.[a-z0-9_-]+)*$/i.test(rest), 'Unsupported DOM selector: ' + selector);
    const tag = rest.match(/^[a-z][a-z0-9-]*/i);
    if (tag && this.tagName !== tag[0].toUpperCase()) matched = false;
    for (const match of rest.matchAll(/\.([a-z0-9_-]+)/gi)) {
      if (!this.classList.contains(match[1])) matched = false;
    }
    return matched;
  }
  closest(selector) {
    for (let node = this; node; node = node.parentElement) if (node.matches(selector)) return node;
    return null;
  }
  querySelectorAll(selector) {
    const selectors = selector.split(','), result = [];
    const visit = node => {
      for (const child of node.children) {
        if (selectors.some(s => child.matches(s))) result.push(child);
        visit(child);
      }
    };
    visit(this);
    return result;
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
}

const attributes = text => Object.fromEntries(Array.from(text.matchAll(/([a-z][a-z0-9-]*)="([^"]*)"/gi),
  match => [match[1], match[2].replace(/&quot;/g, '"').replace(/&amp;/g, '&')]));
function renderedEntry(model) {
  const entry = new Element('article', { class: 'entry' });
  entry.append(new Element('section', { class: 'card-book' }));
  entry.append(new Element('div', { class: 'mynote-slot' }));
  const stack = [entry];
  for (const match of site.App.dualTrackHtml(model).matchAll(/<!--[^]*?-->|<(\/?)div\b([^>]*)>/gi)) {
    if (match[0].startsWith('<!--')) continue;
    if (match[1]) { assert(stack.length > 1, 'Balanced div tree'); stack.pop(); }
    else { const element = new Element('div', attributes(match[2])); stack.at(-1).append(element); stack.push(element); }
  }
  assert.equal(stack.length, 1, 'Every rendered div is closed');
  return entry;
}
function markerId(row, book) {
  if (!row) return null;
  const cell = row.querySelector('.dual-cell[data-part="book"]');
  if (!cell || !cell.dataset.src) return null;
  const start = +cell.dataset.src.split('-')[0];
  const block = site.cardBlocks(book).blocks.find(b => b.kind === 'card' && b.start === start);
  return block ? block.id : null;
}

const id = 'calc-der-derivative';
const book = findItem(id).item.md, note = loadNotes()[id];
const model = site.App.dualTrackModel(id, book, note);
const entry = renderedEntry(model);
const railHtml = site.App.stationRailHtml(findItem(id).item, 'calculus', findItem(id).item.chapterId).body;
const links = Array.from(railHtml.matchAll(/<a class="rl-item"([^>]*)>/g), match => new Element('a', attributes(match[1])));
const applications = links.filter(link => link.dataset.sec === '意义');
const target = (node, sec, station, ord) => site.App.railItemTarget(node, sec, station, ord);

assert.equal(applications.length, 6, 'The six current application links are exercised');
const third = applications[2].dataset;
// Regression: tocTarget returns the book cell of an unmerged section row.
// Counting siblings from the cell (or rejecting it) must not send link 3 back to
// the section heading instead of the actual card with marker i1te.
assert.equal(markerId(target(entry, third.sec, third.station, +third.ord), book), 'i1te',
  '第 2 章右侧目录第三题型必须定位到 card:i1te，而不是意义小节头');
const applicationIds = ['vzgd', 'wgud', 'i1te', 'ntzm', 'zjyh', 'o3rn'];
applications.forEach((link, ord) => {
  assert.equal(+link.dataset.ord, ord, 'Application link order is zero-based');
  assert.equal(markerId(target(entry, link.dataset.sec, link.dataset.station, +link.dataset.ord), book), applicationIds[ord],
    'Application ' + (ord + 1) + ' resolves to its complete marker card');
});
const appHead = site.App.tocTarget(entry, 'book', '意义', '');
assert(appHead.classList.contains('dual-cell'), 'Current meaning/example headings are separate cells');
assert(appHead.closest('.kind-section'), 'The separate heading cell is inside its section row');

// Existing definitions/properties still use their own station and ordinal,
// including groups inside a station; no later station may satisfy an overflow.
for (const [sec, station, ids] of [
  ['定义', '①', ['p71z', 'vxuw']],
  ['定义', '②', ['zjde']],
  ['定义', '③', ['v5sb']],
  ['定义', '⑤', ['a6fg', 'kq81']],
  ['定义', '⑥', ['jirr', 'lcgx', 'j2z5', 'rby6']],
  ['性质', '①', ['u8cn', 'naif']],
  ['性质', '②', ['r123', 'r0fx', 'piio']],
  ['性质', '③', ['qo9s', 'r2sm']],
  ['性质', '⑤', ['ul6c']],
]) {
  ids.forEach((cardId, ord) => assert.equal(markerId(target(entry, sec, station, ord), book), cardId,
    sec + station + ': entry ' + (ord + 1) + ' stays in its station'));
  assert.equal(target(entry, sec, station, ids.length), null, sec + station + ': do not cross the next station/section');
}

// A marked fixture has visible introduction rows and two group headings. Both
// a merged heading and two separate heading cells must use the same card order.
const fixtureBook = [
  '<!-- section:意义 -->', '', '### 意义', '', '章节介绍。', '',
  '<!-- group:gx01 -->', '', '**分组甲**', '', '分组介绍。', '',
  '<!-- card:nv01 -->', '', '#### 1. 甲', '', '甲正文。', '',
  '<!-- card:nv02 -->', '', '#### 2. 乙', '', '乙正文。', '',
  '<!-- group:gx02 -->', '', '**分组乙**', '',
  '<!-- card:nv03 -->', '', '#### 3. 丙', '', '丙正文。', '',
  '<!-- section:性质 -->', '', '### 〔性质〕', '',
  '<!-- card:nx01 -->', '', '#### 1. 下一节', '', '下一节正文。',
].join('\n');
for (const merged of [true, false]) {
  const fixtureNote = merged ? fixtureBook : fixtureBook.replace('<!-- section:意义 -->', '<!-- section:例题 -->').replace('### 意义', '### 〔例题〕');
  const fixtureModel = site.App.dualTrackModel(id, fixtureBook, fixtureNote);
  const fixtureEntry = renderedEntry(fixtureModel);
  assert.equal(fixtureModel.rows.find(row => row.kind === 'section').merged, merged, 'Fixture heading shape');
  assert(fixtureEntry.querySelector('.kind-content'), 'Visible introduction is rendered');
  assert.equal(fixtureEntry.querySelectorAll('.kind-group').length, 2, 'Two visible group rows are rendered');
  ['nv01', 'nv02', 'nv03'].forEach((cardId, ord) => {
    assert.equal(markerId(target(fixtureEntry, '意义', '', ord), fixtureBook), cardId,
      (merged ? 'Merged' : 'Separate') + ' heading: skip introductions/groups');
  });
  assert.equal(target(fixtureEntry, '意义', '', 3), null, 'Never count a card from the next section');
  assert.equal(target(fixtureEntry, '意义', '', 99), null, 'Out-of-range application has no target');
  assert.equal(fixtureModel.book.raw, fixtureBook, 'Navigation/rendering preserve complete book source');
  assert.equal(fixtureModel.note.raw, fixtureNote, 'Navigation/rendering preserve complete note source');
}

assert.equal(model.book.raw, book, 'Real textbook source is unchanged');
assert.equal(model.note.raw, note, 'Real note source is unchanged');
dataFiles.forEach((file, i) => assert(fs.readFileSync(file).equals(dataBefore[i]), file + ': navigation does not write source data'));
console.log('PASS: rail links select their marker cards across separate/merged headings, skip introductions/groups, and preserve source data.');
