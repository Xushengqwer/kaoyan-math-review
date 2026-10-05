const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { loadSite, loadSubjects, loadNotes, findItem } = require('../tools/lib.cjs');

const dataFiles = ['calculus', 'linalg', 'probability', 'notes', 'mindmaps', 'superseded']
  .map(name => 'assets/data/' + name + '.js');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const dataBefore = dataFiles.map(file => hash(fs.readFileSync(file)));
const site = loadSite();
const subjects = loadSubjects();
const notes = loadNotes();
site.App.subjects = subjects;
const fixtureId = 'calc-lim-function';
const failures = [];

function test(name, check) {
  try {
    check();
    console.log('PASS: ' + name);
  } catch (error) {
    failures.push(name);
    console.error('FAIL: ' + name + '\n' + error.message);
  }
}

function attr(tag, name) {
  const match = tag.match(new RegExp('(?:^|\\s)' + name + '="([^"]*)"'));
  return match ? match[1] : '';
}
function hasClass(tag, name) {
  return attr(tag, 'class').split(/\s+/).includes(name);
}
function displayRows(html) {
  return html.split(/(?=<div class="dual-row\b)/).slice(1).map(chunk => {
    const tags = [...chunk.matchAll(/<div\b[^>]*>/g)].map(match => match[0]);
    const kind = attr(tags[0], 'class').split(/\s+/).find(name => name.startsWith('kind-')).slice(5);
    const cells = tags.filter(tag => hasClass(tag, 'dual-cell')).map(tag => ({
      part: attr(tag, 'data-part'),
      sec: attr(tag, 'data-sec'),
      station: attr(tag, 'data-station'),
      src: attr(tag, 'data-src'),
      at: attr(tag, 'data-at'),
      missing: hasClass(tag, 'dual-missing'),
    }));
    return { kind, book: cells.find(cell => cell.part === 'book'), note: cells.find(cell => cell.part === 'note') };
  });
}
function entryRows(html) {
  return displayRows(html).filter(row => row.kind === 'entry');
}
function signature(part, sec, station, src) {
  return [part, sec, station, src].join('|');
}
function render(model) {
  const originalRows = model.rows;
  const rowRefs = model.rows.slice();
  const before = hash(JSON.stringify(model));
  const html = site.App.dualTrackHtml(model);
  assert.strictEqual(model.rows, originalRows, 'render keeps the canonical row array');
  assert.equal(model.rows.length, rowRefs.length, 'render does not add or drop canonical rows');
  rowRefs.forEach((row, index) => assert.strictEqual(model.rows[index], row,
    'render keeps each canonical row at its original index'));
  assert.equal(hash(JSON.stringify(model)), before,
    'render leaves model rows, raw text, sourcePieces and htmlPieces unchanged');

  const expected = Array.from(model.rows).filter(row => row.kind === 'entry').flatMap(row =>
    ['book', 'note'].flatMap(part => {
      const segment = row[part];
      if (!segment || !segment.sourcePieces.length) return [];
      const pieces = segment.sourcePieces;
      return [signature(part, segment.sec, segment.station, pieces[0].start + '-' + pieces[pieces.length - 1].end)];
    })).sort();
  const actual = entryRows(html).flatMap(row => ['book', 'note'].flatMap(part => {
    const cell = row[part];
    return cell && cell.src ? [signature(part, cell.sec, cell.station, cell.src)] : [];
  })).sort();
  assert.deepEqual(actual, expected, 'every editable entry renders once with its original data-src offsets');
  return html;
}
function model(book, note = book) {
  const value = site.App.dualTrackModel(fixtureId, book, note);
  assert.equal(value.enabled, true, 'the fixture must exercise the actual comparison renderer');
  return value;
}
function compact(values) {
  return values.filter((value, index) => index === 0 || value !== values[index - 1]);
}
function groups(html) {
  return compact(entryRows(html).flatMap(row => {
    const cell = row.book;
    return cell && !cell.missing && ['定义', '性质'].includes(cell.sec) ? [cell.station + cell.sec] : [];
  }));
}
function section(name, body) {
  return '### 〔' + name + '〕\n\n' + body;
}
function station(mark, name, entries) {
  return '**' + mark + ' ' + name + '**\n\n' + entries;
}
function entry(number, title, text) {
  return '#### ' + number + '. ' + title + '\n\n' + text;
}

test('the first chapter displays definition and property entries station by station', () => {
  const book = findItem(fixtureId, subjects).item.md;
  const html = render(site.App.dualTrackModel(fixtureId, book, notes[fixtureId]));
  assert.deepEqual(groups(html),
    ['①定义', '②定义', '③定义', '③性质', '④定义', '④性质', '⑤性质']);
  const rows = entryRows(html);
  const lastCore = rows.findLastIndex(row => row.book && ['定义', '性质'].includes(row.book.sec));
  const applications = rows.filter(row => (row.book && row.book.sec === '意义') || (row.note && row.note.sec === '例题'));
  assert(applications.length > 0, 'the real chapter still displays meaning/example pairs');
  assert(rows.every((row, index) =>
    !((row.book && row.book.sec === '意义') || (row.note && row.note.sec === '例题')) || index > lastCore),
  'meaning and example entries remain after all station definition/property entries');
});

test('two stations interleave their definition and property blocks', () => {
  const book = section('定义', [
    station('①', '第一站', entry(1, '甲定义', '甲。')),
    station('②', '第二站', entry(1, '乙定义', '乙。')),
  ].join('\n\n')) + '\n\n' + section('性质', [
    station('①', '第一站', entry(1, '甲性质', '甲性质。')),
    station('②', '第二站', entry(1, '乙性质', '乙性质。')),
  ].join('\n\n'));
  assert.deepEqual(groups(render(model(book))), ['①定义', '①性质', '②定义', '②性质']);
});

test('station five and its prime stay distinct and sort in natural station order', () => {
  const book = section('定义', [
    station('⑤′', '补充站', entry(1, '补充定义', '补充。')),
    station('⑤', '第五站', entry(1, '主站定义', '主站。')),
  ].join('\n\n')) + '\n\n' + section('性质', [
    station('⑤′', '补充站', entry(1, '补充性质', '补充性质。')),
    station('⑤', '第五站', entry(1, '主站性质', '主站性质。')),
  ].join('\n\n'));
  assert.deepEqual(groups(render(model(book))), ['⑤定义', '⑤性质', '⑤′定义', '⑤′性质']);
});

test('a station with only one section remains present without invented entries', () => {
  const book = section('定义', station('③', '仅定义站', entry(1, '只有定义', '定义。'))) +
    '\n\n' + section('性质', station('①', '仅性质站', entry(1, '只有性质', '性质。')));
  const html = render(model(book));
  assert.deepEqual(groups(html), ['①性质', '③定义']);
  assert.equal(entryRows(html).length, 2, 'both one-section stations render exactly once');
});

test('a reordered missing note inserts before the next station in the original note', () => {
  const definitions = section('定义', [
    station('①', '第一站', entry(1, '甲定义', '甲。')),
    station('②', '第二站', entry(1, '乙定义', '乙。')),
  ].join('\n\n'));
  const firstExisting = entry(1, '已有性质', '已有内容。');
  const nextStation = station('②', '第二站', entry(1, '后站性质', '后续内容。'));
  const book = definitions + '\n\n' + section('性质',
    station('①', '第一站', firstExisting + '\n\n' + entry(2, '待补性质', '需要补写。')) + '\n\n' + nextStation);
  const note = definitions + '\n\n' + section('性质',
    station('①', '第一站', firstExisting) + '\n\n' + nextStation);
  const html = render(model(book, note));
  const missing = entryRows(html).map(row => row.note).find(cell =>
    cell && cell.missing && cell.sec === '性质' && cell.station === '①');
  assert(missing, 'the missing note still exposes its insertion target');
  const nextStationStart = note.indexOf('**② 第二站**', note.indexOf('### 〔性质〕'));
  assert(nextStationStart >= 0, 'the fixture contains the original next property station');
  assert.equal(Number(missing.at), nextStationStart,
    'data-at uses the original note position, not the next row in the reordered display');
  assert.deepEqual(groups(html), ['①定义', '①性质', '②定义', '②性质'],
    'the missing-entry fixture must also use station order');
});

test('cards without stations preserve their original section and group order', () => {
  const book = section('定义', '**二、先出现的组**\n\n' + entry(1, '定义甲', '甲。') +
    '\n\n**一、后出现的组**\n\n' + entry(2, '定义乙', '乙。')) +
    '\n\n' + section('性质', '**一、后出现的组**\n\n' + entry(1, '性质甲', '甲性质。'));
  const html = render(model(book));
  assert.deepEqual(groups(html), ['定义', '性质']);
  assert(html.indexOf('定义甲') < html.indexOf('定义乙') && html.indexOf('定义乙') < html.indexOf('性质甲'),
    'unstationed groups stay in source order');
});

test('rendering keeps every data asset byte unchanged', () => {
  assert.deepEqual(dataFiles.map(file => hash(fs.readFileSync(file))), dataBefore);
});

if (failures.length) {
  console.error('Station order failed: ' + failures.join('; '));
  process.exitCode = 1;
} else {
  console.log('PASS: station order preserves canonical sources, edit offsets, tail content and data bytes.');
}
