const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const storage = {};
const context = vm.createContext({
  console,
  window: {},
  document: {
    addEventListener() {},
    querySelectorAll() { return []; },
    getElementById() { return null; },
  },
  localStorage: { getItem: k => storage[k] || null, setItem: (k, v) => { storage[k] = v; } },
});
for (const f of ['assets/vendor/marked/marked.umd.js', 'assets/js/data-loader.js', 'assets/js/storage.js', 'assets/data/linalg.js', 'assets/data/notes.js', 'assets/data/superseded.js', 'assets/js/katex-init.js', 'assets/js/app.js']) {
  vm.runInContext(fs.readFileSync(f, 'utf8'), context);
}
context.assert = assert;
vm.runInContext(`
// 站牌只改显示：把每块站牌还原成原来的「<p><strong>站名</strong></p>」，必须和不加站牌时的渲染完全一样
const BAR = /<div class="station [^"]*" data-part="[^"]*" data-sec="[^"]*" data-station="[^"]*"><div class="station-head"><span class="station-no">([^<]*)<\\/span>([ \\t]*)<span class="station-name">([^<]*)<\\/span><\\/div><div class="station-links">[\\s\\S]*?<\\/div><\\/div>/g;
const undo = (html) => html.replace(BAR, '<p><strong>$1$2$3</strong></p>');
const count = (html) => (html.match(/<div class="station /g) || []).length;

// 第 4 章超级卡：教材 19 块（〔定义〕7、〔性质〕6、〔意义〕6），笔记 25 块（〔定义〕7，其余三节各 6）
const id = 'la-eig-def-eigen';
const md = KaoyanData.find(id).md, note = Notes.get(id);
const plain = bookParts(md).main, deco = bookParts(md, App.stationDeco(id)).main;
assert.equal(count(deco), 19);
assert.equal(undo(deco), plain);
const nPlain = noteMdHtml(note), nDeco = App.noteBodyHtml(note, id);
assert.equal(count(nDeco), 25);
assert.equal(undo(nDeco), nPlain);
// 没有漏下的站名行
assert(!/<p><strong>[①-⑳]/.test(deco) && !/<p><strong>[①-⑳]/.test(nDeco));

// 站牌标在它所在的小节上，块里的站名就是原来那一行
assert(deco.includes('<div class="station prp" data-part="book" data-sec="性质" data-station="⑥"><div class="station-head"><span class="station-no">⑥</span> <span class="station-name">读出符号</span></div>'));
assert(nDeco.includes('<div class="station ex" data-part="note" data-sec="例题" data-station="⑤′"><div class="station-head"><span class="station-no">⑤′</span> <span class="station-name">另一种换法：配方法</span></div>'));

// 站牌下面一行：这一节高亮；同一站在别的小节有就给链接，没有就灰掉
const bar = (html, sec, mark) => html.split('<div class="station ').find((b) => b.slice(0, b.indexOf('>')).includes('data-sec="' + sec + '" data-station="' + mark + '"'));
const b6 = bar(deco, '性质', '⑥');
assert(b6.includes('<span class="station-link prp current">性质</span>'));
for (const [p, k] of [['book', '定义'], ['book', '意义'], ['note', '定义'], ['note', '性质'], ['note', '例题'], ['note', '提示']]) {
  assert(b6.includes('data-part="' + p + '" data-sec="' + k + '" data-station="⑥">' + k + '</a>'), p + k);
}
const b1 = bar(deco, '定义', '①');
assert.equal((b1.match(/ missing">/g) || []).length, 5);
assert(b1.includes('data-part="note" data-sec="定义" data-station="①">定义</a>'));

// 不按站组织的卡、章节笔记：一点不变
const other = 'la-vec-def-max-independent-set';
assert.equal(bookParts(KaoyanData.find(other).md, App.stationDeco(other)).main, bookParts(KaoyanData.find(other).md).main);
assert.equal(App.noteBodyHtml(Notes.get(other), other), noteMdHtml(Notes.get(other)));
const chNote = Notes.get('ch:linalg/matrix');
assert(/\\*\\*①/.test(chNote));
assert.equal(App.noteBodyHtml(chNote, 'ch:linalg/matrix'), noteMdHtml(chNote));
// 体检（不带 noteId）不加站牌
assert.equal(App.noteBodyHtml(note), nPlain);

// 笔记里第一个小节之前、代码块里的站名行不算
const n2 = '**① 前言**\\n\\n### 〔定义〕\\n\\n**① 甲**\\n\\n\`\`\`\\n**② 乙**\\n\`\`\`';
const h2 = App.stationizeNote(noteMdHtml(n2), n2, id);
assert.equal(count(h2), 1);
assert(h2.includes('<p><strong>① 前言</strong></p>'));
`, context);
console.log('PASS: station bars change only the display: every bar restores to its original line, links point to the same station in other sections, other cards untouched.');
