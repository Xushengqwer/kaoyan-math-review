const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const index = fs.readFileSync('index.html', 'utf8');
assert.match(index, /id="sidebar-collapse"/);
assert.match(index, /id="sidebar-reopen"/);

const context = vm.createContext({
  window: {},
  document: { compatMode: 'CSS1Compat', addEventListener() {} },
  console,
});
for (const file of [
  'assets/vendor/marked/marked.umd.js', 'assets/js/data-loader.js', 'assets/js/storage.js',
  'assets/data/calculus.js', 'assets/data/linalg.js', 'assets/data/probability.js',
  'assets/data/notes.js', 'assets/data/superseded.js', 'assets/data/mindmaps.js',
  'assets/js/katex-init.js', 'assets/js/app.js',
]) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
context.assert = assert;
vm.runInContext(`
  App.subjects = KaoyanData.subjects();
  const global = App.searchViewHtml('秩增量与解的存在性考题判定准则');
  assert.match(global, /data-item="la-vec-def-max-independent-set"[^>]*data-match-source="note"/);
  assert.equal(typeof App.highlightSearchTerm, 'function');
  const chapter = App.chapterViewHtml('linalg', 'vector-space');
  assert(chapter.includes('id="chapter-search"'));
`, context);
console.log('PASS: desktop sidebar controls and searchable destination metadata');
