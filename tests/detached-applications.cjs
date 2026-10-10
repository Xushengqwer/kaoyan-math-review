const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { abs, gitShow, loadSite, loadSubjects, loadNotes } = require('../tools/lib.cjs');

const dataFiles = ['calculus', 'linalg', 'probability', 'notes', 'superseded', 'mindmaps']
  .map(name => abs('assets/data/' + name + '.js'));
const dataBefore = dataFiles.map(file => fs.readFileSync(file));
const subjects = loadSubjects(), notes = loadNotes();
const headSubjects = loadSubjects('HEAD'), headNotes = loadNotes('HEAD');
const site = loadSite();
site.App.subjects = subjects;

// The unrelated subjects retain the renderer/rail behavior of the committed
// site, not just unchanged data. Run the actual HEAD scripts in an isolated VM.
const headStorage = {};
const headContext = vm.createContext({
  console, window: {},
  document: { addEventListener() {}, querySelectorAll() { return []; }, getElementById() { return null; } },
  localStorage: { getItem: key => headStorage[key] || null, setItem: (key, value) => { headStorage[key] = value; } },
});
for (const file of ['assets/vendor/marked/marked.umd.js', 'assets/js/data-loader.js', 'assets/js/storage.js',
  'assets/data/calculus.js', 'assets/data/linalg.js', 'assets/data/probability.js', 'assets/data/notes.js',
  'assets/data/superseded.js', 'assets/js/katex-init.js', 'assets/js/app.js']) {
  vm.runInContext(gitShow(file), headContext, { filename: file });
}
vm.runInContext('App.subjects = KaoyanData.subjects();', headContext);
const headSite = vm.runInContext('({ App, mdHtml })', headContext);

const expectedCounts = new Map([
  ['calc-lim-function', [10, 14]],
  ['calc-der-derivative', [6, 6]],
  ['calc-int-antiderivative', [18, 11]],
  ['calc-vec-coordinates', [15, 8]],
  ['calc-mvd-limit-continuity', [15, 9]],
  ['calc-mi-double-def', [18, 11]],
  ['calc-ls-line-first', [20, 10]],
  ['calc-ser-convergence', [19, 10]],
  ['calc-ode-concepts', [17, 8]],
]);
const same = (a, b, message) => assert(JSON.stringify(a) === JSON.stringify(b), message);
const attributes = text => Object.fromEntries(Array.from(text.matchAll(/([a-z][a-z0-9-]*)="([^"]*)"/gi),
  match => [match[1], match[2].replace(/&quot;/g, '"').replace(/&amp;/g, '&')]));
const details = (outline, part, sec) => outline.blocks.flatMap(block =>
  Array.from((block.rows[part + sec] || { items: [] }).items, item => ({ num: item.num, title: item.title, group: item.group })));
const coreShape = raw => site.cardBlocks(raw).blocks.filter(block => ['定义', '性质'].includes(block.sec))
  .map(block => ({ kind: block.kind, sec: block.sec, station: block.station, group: block.group,
    id: block.id, value: block.value, text: raw.slice(block.start, block.end) }));
const applicationIds = raw => site.cardBlocks(raw).blocks.filter(block =>
  ['意义', '例题'].includes(block.sec) && ['card', 'group'].includes(block.kind))
  .map(block => ({ kind: block.kind, sec: block.sec, id: block.id }));

// Read the section attributes from actual rendered row wrappers/cells. The
// station ordering is applied by dualTrackHtml, so model source order alone
// cannot prove that the application sections appear after all core stations.
function renderedRows(html) {
  const starts = Array.from(html.matchAll(/<div class="dual-row [^"]*"[^>]*>/g), match => match.index);
  return starts.map((start, index) => {
    const piece = html.slice(start, starts[index + 1] ?? html.length);
    const secs = [];
    for (const match of piece.matchAll(/<div class="(?:dual-shared|dual-cell [^"]*)"[^>]*>/g)) {
      const attrs = attributes(match[0]);
      if (attrs['data-sec']) secs.push(attrs['data-sec']);
      if (attrs['data-book-sec']) secs.push(attrs['data-book-sec']);
      if (attrs['data-note-sec']) secs.push(attrs['data-note-sec']);
    }
    return secs;
  });
}
function assertSourceCoverage(model, originals, id) {
  for (const part of ['book', 'note']) {
    const side = model[part];
    assert(side.raw === originals[part], id + ': complete ' + part + ' source is preserved');
    let end = 0;
    for (const piece of side.sourcePieces) {
      assert(piece.start >= end && piece.end >= piece.start && piece.end <= side.raw.length,
        id + ': original source spans remain ordered and non-overlapping');
      assert(piece.text === side.raw.slice(piece.start, piece.end), id + ': exact original substring');
      end = piece.end;
    }
    assert(side.sourcePieces.map(piece => piece.text).join('') === site.stripMarkers(side.raw),
      id + ': every original character outside structural marker lines is reconstructed');
    const projected = model.rows.flatMap(row => row[part] ? Array.from(row[part].sourcePieces) : []);
    assert.equal(projected.length, side.sourcePieces.length, id + ': every source piece is represented');
    assert.equal(new Set(projected).size, projected.length, id + ': source pieces are not duplicated');
  }
}

const calculus = subjects.find(subject => subject.id === 'calculus');
const headCalculus = headSubjects.find(subject => subject.id === 'calculus');
assert.equal(calculus.items.length, expectedCounts.size, 'Exercise all nine calculus cards');
for (const item of calculus.items) {
  const id = item.id, previous = headCalculus.items.find(old => old.id === id);
  const originals = { book: item.md, note: notes[id] };
  const prior = { book: previous.md, note: headNotes[id] };
  const outline = site.cardOutline(originals.book, originals.note);
  const previousOutline = site.cardOutline(prior.book, prior.note);
  const counts = expectedCounts.get(id);
  assert(counts, 'Known calculus card: ' + id);
  for (const [part, sec, count] of [['book', '意义', counts[0]], ['note', '例题', counts[1]]]) {
    const blocks = site.cardBlocks(originals[part]).blocks.filter(block => block.sec === sec);
    assert(blocks.length, id + ': ' + sec + ' remains present');
    assert(blocks.every(block => !block.station && block.kind !== 'station'), id + ': ' + sec + ' is detached from all stations');
    same(coreShape(originals[part]), coreShape(prior[part]), id + ': original core stations/cards/content remain unchanged');
    // Existing chapter 1/2 application card/group IDs retain their identities.
    same(applicationIds(originals[part]), applicationIds(prior[part]), id + ': application card/group IDs are preserved');
    const titles = details(outline, part, sec);
    assert.equal(titles.length, count, id + ': complete ' + sec + ' item count');
    same(titles, details(previousOutline, part, sec), id + ': original titles/numbers/order are preserved');
  }
  const model = site.App.dualTrackModel(id, originals.book, originals.note);
  const html = site.App.dualTrackHtml(model);
  assertSourceCoverage(model, originals, id);
  const displayed = renderedRows(html);
  const lastCore = displayed.reduce((last, secs, index) => secs.some(sec => ['定义', '性质'].includes(sec)) ? index : last, -1);
  assert(lastCore >= 0, id + ': original core content is rendered');
  for (const sec of ['意义', '例题']) {
    const indexes = displayed.flatMap((secs, index) => secs.includes(sec) ? [index] : []);
    assert(indexes.length && indexes.every(index => index > lastCore), id + ': complete ' + sec + ' section appears after all core stations');
  }
  const rail = site.App.stationRailHtml(item, 'calculus', item.chapterId).body;
  const links = Array.from(rail.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g), match => ({ attrs: attributes(match[1]), html: match[2] }))
    .filter(link => (link.attrs.class || '').split(/\s+/).includes('rl-item'));
  for (const [part, sec] of [['book', '意义'], ['note', '例题']]) {
    const titles = details(outline, part, sec);
    const sectionLinks = links.filter(link => link.attrs['data-part'] === part && link.attrs['data-sec'] === sec);
    assert.equal(sectionLinks.length, titles.length, id + ': separate full ' + sec + ' directory links');
    sectionLinks.forEach((link, index) => {
      assert.equal(link.attrs['data-station'], '', id + ': application directory link has no station');
      assert.equal(link.attrs['data-goto'], id, id + ': directory link belongs to this card');
      assert.equal(+link.attrs['data-ord'], index, id + ': application directory order is preserved');
      assert(link.html.includes(headSite.mdHtml(titles[index].title, true)), id + ': directory keeps the original title');
    });
  }
}

for (const subject of subjects.filter(subject => subject.id !== 'calculus')) {
  const oldSubject = headSubjects.find(old => old.id === subject.id);
  same(subject, oldSubject, subject.id + ': textbook/chapter/card metadata unchanged from HEAD');
  for (const item of subject.items) {
    const oldItem = oldSubject.items.find(old => old.id === item.id);
    assert(notes[item.id] === headNotes[item.id], item.id + ': unrelated note unchanged');
    const currentModel = site.App.dualTrackModel(item.id, item.md, notes[item.id] || '');
    const oldModel = headSite.App.dualTrackModel(item.id, oldItem.md, headNotes[item.id] || '');
    assert(site.App.dualTrackHtml(currentModel) === headSite.App.dualTrackHtml(oldModel), item.id + ': non-calculus rendering unchanged from HEAD');
    same(site.App.stationRailHtml(item, subject.id, item.chapterId),
      headSite.App.stationRailHtml(oldItem, subject.id, oldItem.chapterId), item.id + ': non-calculus rail unchanged from HEAD');
  }
}
dataFiles.forEach((file, index) => assert(fs.readFileSync(file).equals(dataBefore[index]), file + ': rendering/navigation do not write source data'));
console.log('PASS: all calculus applications are detached, complete, after core content, with independent meaning/example directory links; source data and other subjects are preserved.');
