const assert = require('node:assert/strict');
const fs = require('node:fs');
const { abs, loadSite, loadSubjects, loadNotes } = require('../tools/lib.cjs');

// 2026-10-10：去掉了与 HEAD 比较的断言（定义/性质、意义/例题 id 与标题、其他科目不变）。
// 它们只适合核对 2a0967c 那一次改动；留着的话，任何内容改动在提交前都过不了。
const dataFiles = ['calculus', 'linalg', 'probability', 'notes', 'superseded', 'mindmaps']
  .map(name => abs('assets/data/' + name + '.js'));
const dataBefore = dataFiles.map(file => fs.readFileSync(file));
const subjects = loadSubjects(), notes = loadNotes();
const site = loadSite();
site.App.subjects = subjects;

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
assert.equal(calculus.items.length, expectedCounts.size, 'Exercise all nine calculus cards');
for (const item of calculus.items) {
  const id = item.id;
  const originals = { book: item.md, note: notes[id] };
  const outline = site.cardOutline(originals.book, originals.note);
  const counts = expectedCounts.get(id);
  assert(counts, 'Known calculus card: ' + id);
  for (const [part, sec, count] of [['book', '意义', counts[0]], ['note', '例题', counts[1]]]) {
    const blocks = site.cardBlocks(originals[part]).blocks.filter(block => block.sec === sec);
    assert(blocks.length, id + ': ' + sec + ' remains present');
    assert(blocks.every(block => !block.station && block.kind !== 'station'), id + ': ' + sec + ' is detached from all stations');
    const titles = details(outline, part, sec);
    assert.equal(titles.length, count, id + ': complete ' + sec + ' item count');
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
      assert(link.html.includes(site.mdHtml(titles[index].title, true)), id + ': directory keeps the original title');
    });
  }
}

dataFiles.forEach((file, index) => assert(fs.readFileSync(file).equals(dataBefore[index]), file + ': rendering/navigation do not write source data'));
console.log('PASS: all calculus applications are detached, complete, after core content, with independent meaning/example directory links; source data is not written.');
