const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const storage = {};
const hiddenNodes = [{ hidden: false }, { hidden: false }];
const hitBar = {};
const context = vm.createContext({
  console,
  window: {},
  document: {
    addEventListener() {},
    querySelectorAll() { return hiddenNodes; },
    getElementById(id) { return id === 'chapter-hits' ? hitBar : null; },
  },
  localStorage: { getItem: k => storage[k] || null, setItem: (k, v) => { storage[k] = v; } },
});
for (const f of ['assets/vendor/marked/marked.umd.js', 'assets/js/data-loader.js', 'assets/js/storage.js', 'assets/data/linalg.js', 'assets/data/notes.js', 'assets/data/superseded.js', 'assets/js/katex-init.js', 'assets/js/app.js']) {
  vm.runInContext(fs.readFileSync(f, 'utf8'), context);
}
context.assert = assert;
vm.runInContext(`
App.subjects = KaoyanData.subjects();
const id = App.chapterFlowId('linalg', 'determinant');
assert.equal(id, 'flow:linalg/determinant');
const before = Notes.exportAll();
for (const chapter of KaoyanData.chapters('linalg')) {
  const html = App.chapterViewHtml('linalg', chapter.id);
  const marker = 'id="item-' + App.chapterFlowId('linalg', chapter.id) + '"';
  assert.equal(html.split(marker).length, 2);
  assert(html.indexOf('chapter-item-groups') < html.indexOf(marker));
  assert(html.indexOf(marker) < html.indexOf('id="item-ch:linalg/' + chapter.id + '"'));
}
assert.equal(JSON.stringify(Notes.exportAll()), JSON.stringify(before));
assert(App.myNoteHtml(id).includes('写一份决策流'));
assert(App.editorHtml(id).includes('决策流'));
assert.equal(App.locate(id).typeLabel, '决策流');
assert(App.noteFileName(id).includes('第1章-决策流-行列式'));
assert.equal(App.noteSlotLabel(App.locate('ch:linalg/determinant')), '本章总结');
const body = '  ## 条件判断\\n\\n先判断 $|A|=0$，再选择路线。\\n';
assert(Notes.set(id, body));
Notes._cache = null;
assert.equal(Notes.get(id), body);
assert(Notes.pendingIds().includes(id));
const exported = App.buildNoteText(id);
assert(exported.includes('决策流'));
assert(exported.includes(App.BODY_OPEN + '\\n\\n' + body + '\\n\\n' + App.bodyClose(id)));
assert.equal(JSON.parse(JSON.stringify(Notes.exportAll()))[id], body);
const groups = App.chapterGroups('linalg', 'determinant', KaoyanData.itemsByChapter('linalg', 'determinant'));
const toc = App.tocHtml(groups, App.chapterNos('linalg', 'determinant'), 'linalg', 'determinant');
assert(toc.indexOf('data-goto="' + id + '"') < toc.indexOf('data-goto="ch:linalg/determinant"'));
assert(toc.includes('7 条'));
assert(App.searchViewHtml('条件判断').includes('data-item="' + id + '"'));
const wrap = { innerHTML: '', querySelectorAll() { return []; } };
App.chapterQuery = '条件判断';
App.renderChapterResults('linalg', 'determinant', KaoyanData.itemsByChapter('linalg', 'determinant'), wrap);
assert(wrap.innerHTML.includes('data-item="' + id + '"'));
assert(wrap.innerHTML.includes('决策流'));
App.chapterSearchMode(true);
App.chapterSearchMode(false);
`, context);
assert(hiddenNodes.every(n => n.hidden === false));
assert(hitBar.innerHTML.includes('决策流'));
console.log('PASS: one flow card per chapter, placement, edit/save/reload, exact export, search, navigation and unchanged card counts.');
