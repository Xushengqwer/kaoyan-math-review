const assert = require('node:assert/strict');
const fs = require('node:fs');
const { loadSite, loadSubjects, loadNotes, findItem } = require('../tools/lib.cjs');

// The production loader deliberately has no DOM construction APIs. Comparison
// must work here because content checks and Markdown previews share this loader.
const site = loadSite();
const subjects = loadSubjects();
const notes = loadNotes();
const dataFiles = ['calculus', 'linalg', 'probability', 'notes', 'superseded']
  .map(name => 'assets/data/' + name + '.js');
const dataBefore = dataFiles.map(file => fs.readFileSync(file));
const expected = new Map([
  ['calc-lim-function', 49],
  ['calc-der-derivative', 52],
  ['calc-int-antiderivative', 53],
  ['calc-vec-coordinates', 69],
  ['calc-mvd-limit-continuity', 65],
  ['calc-mi-double-def', 46],
  ['la-eig-def-eigen', 44],
  ['la-vec-def-max-independent-set', 22],
]);

assert.equal(typeof site.App.dualTrackModel, 'function',
  'the production comparison model must expose a DOM-free API');
assert.equal(typeof site.App.dualTrackHtml, 'function',
  'the production comparison model must render the actual paired display');

// The user approved exactly this one existing pair as a title-guard exception.
// Any different card, structural key, or character still follows the guard.
const exceptionBookTitle = '实对称矩阵：凑齐，而且两两垂直';
const exceptionNoteTitle = '实对称矩阵：为什么天然轴一定垂直';
function approvedTitleException(id, pair) {
  return id === 'la-eig-def-eigen'
    && ['book', 'note'].every(part => pair[part].sec === '性质'
      && pair[part].station === '④' && pair[part].group === '' && String(pair[part].num) === '1')
    && pair.book.title === exceptionBookTitle && pair.note.title === exceptionNoteTitle;
}

function exceptionSource(title, station = '④', num = 1, sec = '性质', group = '') {
  return '### 〔' + sec + '〕\n\n**' + station + ' 站名**\n\n'
    + (group ? '**' + group + '**\n\n' : '') + '#### ' + num + '. ' + title + '\n\n正文。';
}
const approved = site.App.dualTrackModel('la-eig-def-eigen',
  exceptionSource(exceptionBookTitle), exceptionSource(exceptionNoteTitle));
assert.equal(approved.enabled, true, 'the exact user-approved eigen pair may bypass the title guard');
assert.equal(approved.pairs.length, 1);
assert(approvedTitleException('la-eig-def-eigen', approved.pairs[0]));
for (const [id, book, note, label] of [
  ['calc-mi-double-def', exceptionSource(exceptionBookTitle), exceptionSource(exceptionNoteTitle), 'another card'],
  ['la-eig-def-eigen', exceptionSource(exceptionBookTitle, '⑤'), exceptionSource(exceptionNoteTitle, '⑤'), 'another station'],
  ['la-eig-def-eigen', exceptionSource(exceptionBookTitle, '④', 2), exceptionSource(exceptionNoteTitle, '④', 2), 'another item number'],
  ['la-eig-def-eigen', exceptionSource(exceptionBookTitle, '④', 1, '定义'), exceptionSource(exceptionNoteTitle, '④', 1, '定义'), 'another section'],
  ['la-eig-def-eigen', exceptionSource(exceptionBookTitle, '④', 1, '性质', '分组'), exceptionSource(exceptionNoteTitle, '④', 1, '性质', '分组'), 'a nonempty group'],
  ['la-eig-def-eigen', exceptionSource(exceptionBookTitle), exceptionSource(exceptionNoteTitle.replace('天然', '天燃')), 'a changed note character'],
  ['la-eig-def-eigen', exceptionSource(exceptionBookTitle.replace('凑齐', '凑全')), exceptionSource(exceptionNoteTitle), 'a changed textbook character'],
]) {
  const rejected = site.App.dualTrackModel(id, book, note);
  assert.equal(rejected.pairs.length, 1, label + ': the structurally matching pair remains available for the guard');
  assert.equal(rejected.enabled, false,
    label + ' cannot borrow the user-approved title exception');
}

function assertCoverage(model, id) {
  const texts = { book: model.book.raw, note: model.note.raw };
  const renderedBook = site.bookParts(texts.book, site.App.stationDeco(id, texts));
  assert.equal(model.book.html, renderedBook.main + renderedBook.tip,
    id + ': the reference HTML is the complete existing textbook renderer output');
  assert.equal(model.note.html,
    site.App.stationizeNote(site.noteMdHtml(texts.note), texts.note, id, texts),
    id + ': the reference HTML is the complete existing note renderer output');
  for (const part of ['book', 'note']) {
    const side = model[part];
    for (const [field, original] of [['sourcePieces', side.raw], ['htmlPieces', side.html]]) {
      assert(Array.isArray(side[field]), id + ': ' + part + ' ' + field);
      let end = 0;
      for (const piece of side[field]) {
        assert(Number.isInteger(piece.start) && Number.isInteger(piece.end));
        assert.equal(piece.start, end, id + ': intervals have no overlap or gaps');
        assert(piece.end >= piece.start && piece.end <= original.length);
        assert.equal(piece.text, original.slice(piece.start, piece.end),
          id + ': every piece contains its exact original substring');
        end = piece.end;
      }
      assert.equal(end, original.length, id + ': intervals cover the final character');
      assert.equal(side[field].map(piece => piece.text).join(''), original,
        id + ': complete piece arrays restore the whole original');
      const projected = model.rows.flatMap(row => row[part] ? row[part][field] : []);
      assert.equal(projected.length, side[field].length,
        id + ': rows contain every original piece exactly once, including merged headings');
      assert.equal(new Set(projected).size, projected.length,
        id + ': rows never duplicate a piece');
      for (const piece of side[field]) {
        assert(projected.includes(piece), id + ': every registered piece is actually used by a row');
      }
      assert.equal(projected.map(piece => piece.text).join(''), original,
        id + ': each side projected through display rows preserves original order and HTML');
    }
  }
  for (const row of model.rows) {
    if (!['section', 'station', 'group'].includes(row.kind)) continue;
    const same = !!(row.book && row.note && row.book.line === row.note.line);
    assert.equal(row.merged, same, id + ': headings merge only when their complete source lines match');
    if (row.merged) assert.equal(typeof row.html, 'string');
  }
}

function assertVisible(model, label) {
  const html = site.App.dualTrackHtml(model);
  assert.equal(typeof html, 'string');
  assert(html.includes('dual-row'), label + ': the comparison renders its rows');
  for (const row of model.rows) {
    if (row.merged) {
      assert(html.includes(row.html), label + ': a merged heading is actually rendered');
    } else {
      for (const part of ['book', 'note']) {
        const segment = row[part];
        if (!segment || !segment.html) continue;
        assert(html.includes(segment.html), label + ': every visible complete ' + part + ' HTML block is rendered');
      }
    }
  }
  return html;
}

assertCoverage(approved, 'la-eig-def-eigen');
assertVisible(approved, 'the exact approved eigen title exception');

const formulaStation = site.App.dualTrackModel('calc-mi-double-def',
  '### 〔定义〕\n\n**① $a<b$ 比较**\n\n#### 1. 比较\n\n教材。',
  '### 〔定义〕\n\n**① $a<b$ 比较**\n\n#### 1. 比较：解释\n\n笔记。');
assert.equal(formulaStation.enabled, true);
assertCoverage(formulaStation, 'calc-mi-double-def');
const formulaHeading = formulaStation.rows.find(row => row.kind === 'station' && row.merged);
assert(formulaHeading.html.includes('$a&lt;b$'),
  'merged station math retains the original renderer escaping instead of reinserting raw less-than');
assert(!formulaHeading.html.includes('$a<b$'), 'raw station text must not become new HTML');
assertVisible(formulaStation, 'a station name containing a math comparison');

const enabled = [];
for (const subject of subjects) {
  for (const item of subject.items) {
    if (!Object.prototype.hasOwnProperty.call(notes, item.id)) continue;
    const model = site.App.dualTrackModel(item.id, item.md, notes[item.id]);
    assert.equal(model.book.raw, item.md, item.id + ': textbook source is retained');
    assert.equal(model.note.raw, notes[item.id], item.id + ': note source is retained');
    assertCoverage(model, item.id);
    if (model.enabled) enabled.push(item.id);
    if (!expected.has(item.id)) {
      assert.equal(model.enabled, false, item.id + ': older notes retain their existing display');
      continue;
    }
    assert.equal(model.enabled, true, item.id + ': matching reconstructed notes enable comparison');
    assertVisible(model, item.id);
    assert.equal(model.pairs.length, expected.get(item.id), item.id + ': structural pairs');
    for (const pair of model.pairs) {
      for (const field of ['sec', 'station', 'group', 'num']) {
        assert.equal(pair.book[field], pair.note[field], item.id + ': pairing uses the complete structural key');
      }
      assert(pair.note.title === pair.book.title || pair.note.title.startsWith(pair.book.title + '：')
        || approvedTitleException(item.id, pair),
        item.id + ': every pair must pass the full-width-colon title guard');
    }
  }
}
assert.deepEqual(enabled.sort(), [...expected.keys()].sort(),
  'exactly the eight reconstructed cards currently enable comparison');

const fixtureId = 'calc-mi-double-def';
const simpleBook = '### 〔定义〕\n\n#### 1. 标题甲\n\n教材甲。\n\n#### 2. 标题乙\n\n教材乙。';
const simpleNote = '### 〔定义〕\n\n#### 1. 标题甲：解释\n\n笔记甲。\n\n#### 2. 标题乙\n\n笔记乙。';
const simple = site.App.dualTrackModel(fixtureId, simpleBook, simpleNote);
assert.equal(simple.enabled, true, 'an exact title or its full-width-colon explanation enables comparison');
assert.equal(simple.pairs.length, 2);
assertCoverage(simple, fixtureId);
assertVisible(simple, 'matching source titles');

for (const [book, note, intro, part] of [
  ['教材独有前言。\n\n' + simpleBook, '\n\n' + simpleNote, '教材独有前言。', 'book'],
  ['\n\n' + simpleBook, '笔记独有前言。\n\n' + simpleNote, '笔记独有前言。', 'note'],
]) {
  const model = site.App.dualTrackModel(fixtureId, book, note);
  assert.equal(model.enabled, true);
  assertCoverage(model, fixtureId);
  const html = assertVisible(model, part + ' introduction');
  const introIndex = html.indexOf('<p>' + intro + '</p>');
  assert(introIndex >= 0, 'the single visible introduction remains present');
  const rowTag = [...html.slice(0, introIndex).matchAll(/<div\b[^>]*class="[^"]*\bdual-row\b[^"]*"[^>]*>/g)].at(-1);
  assert(rowTag && /\bis-wide\b/.test(rowTag[0]),
    part + ': an introduction fills the row even if the opposite source segment contains only invisible whitespace');
  const nextRow = /<div\b[^>]*class="[^"]*\bdual-row\b[^"]*"[^>]*>/.exec(html.slice(introIndex));
  const rowHtml = html.slice(rowTag.index, nextRow ? introIndex + nextRow.index : html.length);
  assert.equal([...rowHtml.matchAll(/<div\b[^>]*class="[^"]*\bdual-cell\b[^"]*"[^>]*>/g)].length, 1,
    part + ': the invisible opposite introduction does not consume an empty column');
}

for (const [title, description] of [
  ['标题甲：解释', 'full-width-colon explanation'],
  ['标题甲', 'exact title'],
]) {
  const note = '### 〔定义〕\n\n#### 1. ' + title + '\n\n说明。';
  assert.equal(site.App.dualTrackModel(fixtureId, simpleBook, note).enabled, true, description);
}
for (const [title, description] of [
  ['标题甲:解释', 'ASCII colon is not the approved guard'],
  ['标题甲追加文字', 'an arbitrary prefix is not an explanation'],
  ['另一个标题', 'same number cannot override a mismatched title'],
]) {
  const note = '### 〔定义〕\n\n#### 1. ' + title + '\n\n说明。';
  assert.equal(site.App.dualTrackModel(fixtureId, simpleBook, note).enabled, false, description);
}
assert.equal(site.App.dualTrackModel(fixtureId, simpleBook,
  simpleNote.replace('标题乙', '标题乙错误后缀')).enabled, false,
  'one good pair cannot hide a different pair that fails the title guard');
for (const note of ['', '### 〔提示〕\n\n只有提醒，没有对应条目。']) {
  const model = site.App.dualTrackModel(fixtureId, simpleBook, note);
  assert.equal(model.enabled, false,
    'comparison needs at least one actual pair');
  assertCoverage(model, fixtureId);
}

// Older notes genuinely omit entries or add one. They must remain independent,
// even though the card itself stays in its current, disabled comparison layout.
for (const [id, part, sec, nums] of [
  ['la-det-prop-transpose', 'book', '定义', [3]],
  ['la-det-prop-transpose', 'book', '性质', [4, 5]],
  ['la-det-prop-swap-rows', 'book', '定义', [3]],
  ['la-det-prop-diag-multiply', 'book', '性质', [3]],
  ['la-mat-prop-operations', 'note', '性质', [4]],
  ['la-vec-def-linear-dependence', 'note', '定义', [7]],
]) {
  const item = findItem(id, subjects).item;
  const model = site.App.dualTrackModel(id, item.md, notes[id]);
  const opposite = part === 'book' ? 'note' : 'book';
  for (const num of nums) {
    assert(model.rows.some(row => row.kind === 'entry' && row[part] && !row[opposite]
      && row[part].sec === sec && Number(row[part].num) === num),
    id + ': ' + part + ' ' + sec + num + ' remains a single-sided row');
  }
}

const partialNote = '### 〔定义〕\n\n#### 1. 标题甲：解释\n\n笔记甲。\n\n#### 3. 笔记独有\n\n不能遗漏。';
const partial = site.App.dualTrackModel(fixtureId, simpleBook, partialNote);
assert.equal(partial.enabled, true, 'a reconstructed card can retain unmatched entries');
assert.equal(partial.pairs.length, 1);
assert(partial.rows.some(row => row.kind === 'entry' && row.book && !row.note && Number(row.book.num) === 2));
assert(partial.rows.some(row => row.kind === 'entry' && row.note && !row.book && Number(row.note.num) === 3));
assertCoverage(partial, fixtureId);
const partialHtml = assertVisible(partial, 'missing corresponding entries');
assert(partialHtml.includes('dual-missing'));
assert(partialHtml.includes('笔记没有这一条'), 'an absent note gets an explicit placeholder');
assert(partialHtml.includes('教材没有这一条'), 'an absent textbook entry gets an explicit placeholder');
assert(/<div\b(?=[^>]*class="[^"]*\bdual-note\b)(?=[^>]*class="[^"]*\bdual-missing\b)[^>]*>笔记没有这一条<\/div>/.test(partialHtml),
  'the missing note prompt is in the note column');
assert(/<div\b(?=[^>]*class="[^"]*\bdual-book\b)(?=[^>]*class="[^"]*\bdual-missing\b)[^>]*>教材没有这一条<\/div>/.test(partialHtml),
  'the missing textbook prompt is in the textbook column');

const groupedBook = '### 〔定义〕\n\n**① 同站**\n\n**共同组**\n\n#### 1. 第一条\n\n教材。\n\n**下一组**\n\n#### 1. 第二条\n\n另一条教材。';
const groupedNote = '### 〔定义〕\n\n**① 同站**\n\n**共同组**\n\n#### 1. 第一条：解释\n\n笔记。\n\n**下一组**\n\n#### 1. 第二条：解释\n\n另一条笔记。';
const grouped = site.App.dualTrackModel(fixtureId, groupedBook, groupedNote);
assert.equal(grouped.enabled, true);
assert.equal(grouped.pairs.length, 2, 'a new bold group may restart item numbering without ambiguity');
assertCoverage(grouped, fixtureId);
const groupedHtml = assertVisible(grouped, 'shared headings');
assert(groupedHtml.includes('dual-shared'), 'identical source headings render as one shared heading');
assert.equal((groupedHtml.match(/class="dual-shared"/g) || []).length, 4,
  'one section, one station and two groups each appear once as shared headings');
for (const part of ['book', 'note']) {
  assert(groupedHtml.includes('data-part="' + part + '"'), 'both tracks retain navigation targets');
}
assert(groupedHtml.includes('data-sec="定义"'));
assert(groupedHtml.includes('data-station="①"'));
for (const kind of ['section', 'station', 'group']) {
  assert(grouped.rows.some(row => row.kind === kind && row.merged), kind + ': identical source headings merge');
}
for (const row of grouped.rows.filter(row => row.kind === 'station' && row.merged)) {
  const bookLinks = row.html.split('<span class="station-part">教材</span>')[1];
  const noteLinks = row.html.split('<span class="station-part">笔记</span>')[1];
  assert(bookLinks && noteLinks, 'the shared station still exposes both tracks');
  assert(/station-link [^"]*current">定义<\/span>/.test(bookLinks.split('<span class="station-part">')[0]),
    'the textbook current section is highlighted in a merged station');
  assert(/station-link [^"]*current">定义<\/span>/.test(noteLinks.split('<span class="station-part">')[0]),
    'the note current section is highlighted in a merged station');
}

const meaningBook = simpleBook + '\n\n### 意义\n\n**① 同站**\n\n教材意义。';
const exampleNote = simpleNote + '\n\n### 〔例题〕\n\n**① 同站**\n\n#### 例题 1：演示\n\n笔记例题。';
const meaning = site.App.dualTrackModel(fixtureId, meaningBook, exampleNote);
assert.equal(meaning.enabled, true);
assertCoverage(meaning, fixtureId);
assertVisible(meaning, 'meaning and examples');
assert(meaning.rows.some(row => row.kind === 'content' && row.book && row.note
  && row.book.sec === '意义' && row.note.sec === '例题'
  && row.book.station === '①' && row.note.station === '①'),
'textbook meaning and note examples align by station without using example item titles');
const meaningStation = meaning.rows.find(row => row.kind === 'station' && row.merged
  && row.book.sec === '意义' && row.note.sec === '例题');
assert(meaningStation, 'identical station source lines merge across meaning and example sections');
assert(/station-link [^"]*current">意义<\/span>/.test(meaningStation.html));
assert(/station-link [^"]*current">例题<\/span>/.test(meaningStation.html),
  'different current sections are both highlighted in the merged station');

for (const [before, after, kind] of [
  ['### 〔定义〕', '### 〔定义〕笔记标题', 'section'],
  ['**① 同站**', '**① 笔记的站名**', 'station'],
  ['**下一组**', '**笔记的下一组**', 'group'],
  ['### 〔定义〕', '### 〔定义〕  ', 'section'],
  ['### 〔定义〕', '## 〔定义〕', 'section'],
]) {
  const changed = site.App.dualTrackModel(fixtureId, groupedBook, groupedNote.replace(before, after));
  assert.equal(changed.enabled, true, 'the remaining structurally matching entry allows comparison');
  assertCoverage(changed, fixtureId);
  assertVisible(changed, 'different ' + kind + ' source titles');
  assert(changed.rows.some(row => row.kind === kind && !row.merged
    && ((row.book && row.book.line === before) || (row.note && row.note.line === after))),
  kind + ': different source heading lines are preserved separately');
  if (kind === 'group') {
    assert(!/class="dual-row kind-group is-wide"/.test(site.App.dualTrackHtml(changed)),
      'different group titles remain in their respective columns instead of spanning both');
  }
}

// Ordinary bold text is not a heading; no split is permitted inside the <p>.
const touchingBook = '### 〔定义〕\n\n#### 1. 第一条\n\n上一段\n**紧贴分组**\n\n#### 2. 第二条\n\n后续教材。';
const touchingNote = '### 〔定义〕\n\n#### 1. 第一条：解释\n\n上一段\n**紧贴分组**\n\n#### 2. 第二条：解释\n\n后续笔记。';
const touching = site.App.dualTrackModel(fixtureId, touchingBook, touchingNote);
assert.equal(touching.enabled, true);
assertCoverage(touching, fixtureId);
const touchingHtml = assertVisible(touching, 'touching paragraph and bold line');
assert(touchingHtml.includes('<p>上一段\n<strong>紧贴分组</strong></p>'),
  'the display mounts the intact paragraph rather than rendering its bold line as a heading');
for (const part of ['book', 'note']) {
  assert(touching[part].htmlPieces.some(piece => piece.text.includes('<p>上一段\n<strong>紧贴分组</strong></p>')),
    part + ': a paragraph containing a touching bold line remains one complete HTML block');
}
assert(!touching.rows.some(row => row.kind === 'group'
  && ((row.book && row.book.line === '**紧贴分组**') || (row.note && row.note.line === '**紧贴分组**'))),
'a touching bold line is never pulled out of its paragraph to create a heading row');

const emphasizedBook = '### 〔定义〕\n\n#### 1. 甲\n\n段落\n**正文强调**\n\n#### 2. 乙\n\n教材。';
const emphasizedNote = '### 〔定义〕\n\n#### 1. 甲：解释\n\n段落。\n\n#### 2. 不匹配\n\n笔记。';
const emphasized = site.App.dualTrackModel(fixtureId, emphasizedBook, emphasizedNote);
assert.equal(emphasized.enabled, false,
  'ordinary paragraph emphasis cannot hide a mismatched title from the card eligibility guard');
assert.equal(emphasized.pairs.length, 2, 'attached bold never changes the following entry group key');
assert(emphasized.pairs.every(pair => !pair.book.group && !pair.note.group));
assertCoverage(emphasized, fixtureId);
assertVisible(emphasized, 'paragraph emphasis with a rejected title');

const boundaryBook = '\n---\n\n### 〔定义〕\n\n#### 1. 边界\n\n段落\n---\n\n- 列表\n  #### 9. 列表内部标题\n\n```\n#### 8. 代码内部标题\n**② 假站**\n```\n\n| 甲 | 乙 |\n| --- | --- |\n| $a < b$ | **值** |\n\n### 〔提示〕提醒\n\n底部提示。\n\n';
const boundaryNote = boundaryBook.replace('#### 1. 边界', '#### 1. 边界：解释');
const boundary = site.App.dualTrackModel(fixtureId, boundaryBook, boundaryNote);
assert.equal(boundary.enabled, true);
assert.equal(boundary.pairs.length, 1, 'nested or fenced headings never become item pairs');
assertCoverage(boundary, fixtureId);
assertVisible(boundary, 'Markdown block boundaries');
assert(boundary.book.html.includes('底部提示。'), 'textbook tips remain in the complete bottom output');
assert(boundary.book.html.includes('<h2>段落</h2>'), 'a Setext underline remains a heading');
assert(boundary.book.htmlPieces.some(piece => piece.text.includes('<ul>') && piece.text.includes('</ul>')),
  'an entire nested list stays within one HTML interval');

const referenceBook = '### 〔定义〕\n\n#### 1. 引用\n\n[跨条引用][target]。\n\n#### 2. 后续\n\n后续正文。\n\n[target]: https://example.com/';
const referenceNote = referenceBook.replace('#### 1. 引用', '#### 1. 引用：解释').replace('#### 2. 后续', '#### 2. 后续：解释');
const reference = site.App.dualTrackModel(fixtureId, referenceBook, referenceNote);
assert.equal(reference.enabled, true);
assertCoverage(reference, fixtureId);
assertVisible(reference, 'reference links across items');
assert(reference.book.html.includes('<a href="https://example.com/">跨条引用</a>'),
  'a reference defined in another item retains its whole-block Markdown context');

const duplicateBook = '### 〔定义〕\n\n#### 1. 甲\n\n第一条。\n\n#### 1. 乙\n\n重复键。\n\n#### 2. 唯一条\n\n教材。';
const duplicateNote = '### 〔定义〕\n\n#### 1. 甲：解释\n\n笔记。\n\n#### 2. 唯一条：解释\n\n第二条。';
const duplicate = site.App.dualTrackModel(fixtureId, duplicateBook, duplicateNote);
assert.equal(duplicate.enabled, true);
assert.equal(duplicate.pairs.length, 1, 'ambiguous repeated keys never create an arbitrary pair');
assert.equal(Number(duplicate.pairs[0].book.num), 2);
assertCoverage(duplicate, fixtureId);
assertVisible(duplicate, 'ambiguous repeated keys');

const crlfBook = simpleBook.replace(/\n/g, '\r\n') + '\r\n\r\n';
const crlfNote = simpleNote.replace(/\n/g, '\r\n') + '\r\n ';
const crlf = site.App.dualTrackModel(fixtureId, crlfBook, crlfNote);
assert.equal(crlf.enabled, false,
  'the existing section recognizers do not recognize CRLF note sections; keep their original display semantics');
assert.equal(crlf.book.raw, crlfBook);
assert.equal(crlf.note.raw, crlfNote);
assertCoverage(crlf, fixtureId);

for (let i = 0; i < dataFiles.length; i++) {
  assert(fs.readFileSync(dataFiles[i]).equals(dataBefore[i]), dataFiles[i] + ': display tests never alter data bytes');
}
console.log('PASS: comparison guards reconstructed cards, preserves both full sources and renderer HTML, keeps unmatched entries, and merges only exact headings.');
