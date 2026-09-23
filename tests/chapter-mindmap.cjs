const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({ window: {}, document: { compatMode: 'CSS1Compat', addEventListener() {} }, console });
for (const f of [
  'assets/vendor/marked/marked.umd.js', 'assets/js/data-loader.js', 'assets/js/storage.js',
  'assets/data/calculus.js', 'assets/data/linalg.js', 'assets/data/probability.js',
  'assets/data/notes.js', 'assets/data/superseded.js', 'assets/data/mindmaps.js',
  'assets/js/katex-init.js', 'assets/js/app.js',
]) vm.runInContext(fs.readFileSync(f, 'utf8'), context);
context.assert = assert;
vm.runInContext(`
App.subjects = KaoyanData.subjects();
for (const subject of KaoyanData.subjects()) for (const chapter of KaoyanData.chapters(subject.id)) {
  const id = App.chapterMapId(subject.id, chapter.id);
  assert.equal(id, 'map:' + subject.id + '/' + chapter.id);
  const html = App.chapterViewHtml(subject.id, chapter.id);
  const flow = html.indexOf('id="item-flow:' + subject.id + '/' + chapter.id + '"');
  const map = html.indexOf('id="item-' + id + '"');
  const summary = html.indexOf('id="item-ch:' + subject.id + '/' + chapter.id + '"');
  assert(flow >= 0 && flow < map && map < summary);
  assert.equal(html.split('id="item-' + id + '"').length, 2);
  assert(html.includes('type="file"') && html.includes('accept="image/png,image/jpeg,image/webp,image/gif"'));
  const toc = App.tocHtml(App.chapterGroups(subject.id, chapter.id, KaoyanData.itemsByChapter(subject.id, chapter.id)), App.chapterNos(subject.id, chapter.id), subject.id, chapter.id);
  assert(toc.indexOf('data-goto="flow:' + subject.id + '/' + chapter.id + '"') < toc.indexOf('data-goto="' + id + '"'));
  assert(toc.indexOf('data-goto="' + id + '"') < toc.indexOf('data-goto="ch:' + subject.id + '/' + chapter.id + '"'));
}
assert.equal(KaoyanData.itemsByChapter('linalg', 'matrix').length, 4);
assert.equal(Notes.get('ch:linalg/matrix').length > 6000, true);
assert(App.searchViewHtml('思维导图').includes('data-item="map:linalg/matrix"'));
`, context);
console.log('PASS: one picture-only mind map slot per chapter, after decision flow and before chapter summary, in page and TOC.');
