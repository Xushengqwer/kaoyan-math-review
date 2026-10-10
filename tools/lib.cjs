// tools/ 共用：仓库路径、按原换行读写数据文件、解析数据、读草稿、用网站自己的渲染函数渲染与体检。
// 所有写入都「按行替换 + 读回核对」，不整文件重排，不改其他条目的一个字节。
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const cp = require("child_process");

const REPO = path.resolve(__dirname, "..");
const SUBJECTS = ["calculus", "linalg", "probability"];
const abs = (rel) => path.join(REPO, rel);
const read = (rel) => fs.readFileSync(abs(rel), "utf8");
const gitShow = (rel, rev = "HEAD") =>
  cp.execSync("git show " + rev + ":" + rel, { cwd: REPO, encoding: "utf8", maxBuffer: 64 << 20 });

function fail(msg) {
  const e = new Error(msg);
  e.userFacing = true;
  throw e;
}
const must = (cond, msg) => { if (!cond) fail(msg); };

// 顶层脚本统一入口：出错只打印一行原因，退出码 1
function main(fn) {
  try { fn(); }
  catch (e) { console.error("✗ " + (e.userFacing ? e.message : e.stack)); process.exit(1); }
}

// 按文件原来的换行符拆行、写回（仓库里 CRLF 与 LF 都有，保持原样）
function splitLines(raw) {
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  return { lines: raw.split(eol), eol };
}
const writeLines = (rel, lines, eol) => fs.writeFileSync(abs(rel), lines.join(eol), "utf8");

// 解析数据文件（它们本身就是一次函数调用）
function parseSubject(src) {
  const got = [];
  vm.runInNewContext(src, { registerSubject: (x) => got.push(x) });
  return got[0];
}
function parseNotes(src) {
  const got = {};
  vm.runInNewContext(src, { registerNotes: (m) => Object.assign(got, m) });
  return got;
}
function parseSuperseded(src) {
  const got = { images: {}, notes: {}, book: {} };
  vm.runInNewContext(src, { registerSuperseded: (m) => Object.assign(got, m) });
  return got;
}
const subjectFile = (id) => "assets/data/" + id + ".js";
const loadSubjects = (rev) => SUBJECTS.map((id) => parseSubject(rev ? gitShow(subjectFile(id), rev) : read(subjectFile(id))));
const loadNotes = (rev) => parseNotes(rev ? gitShow("assets/data/notes.js", rev) : read("assets/data/notes.js"));

// 找一张卡：{ subject, item, file }
function findItem(itemId, subjects) {
  for (const s of subjects || loadSubjects()) {
    const item = s.items.find((i) => i.id === itemId);
    if (item) return { subject: s, item, file: subjectFile(s.id) };
  }
  return null;
}

// 读草稿：去掉 BOM、CRLF 统一成 LF、去掉末尾空白（网站里存的就是这样）；返回正文和做过的规整
function readDraft(file) {
  let text = fs.readFileSync(path.resolve(file), "utf8");
  const notes = [];
  if (text.charCodeAt(0) === 0xfeff) { text = text.slice(1); notes.push("去掉了开头的 BOM"); }
  if (text.includes("\r")) { text = text.replace(/\r\n?/g, "\n"); notes.push("CRLF 换行统一成 LF"); }
  const trimmed = text.replace(/\s+$/, "");
  must(trimmed.length, "草稿是空的：" + file);
  must(!/�/.test(trimmed), "草稿里有乱码替换符 U+FFFD（编码被弄坏了？）：" + file);
  return { text: trimmed, notes };
}

// 两段文字第一处不同的位置，带前后文
function firstDiff(a, b) {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a[i] === b[i]) i++;
  if (i === n && a.length === b.length) return null;
  const line = a.slice(0, i).split("\n").length;
  const ctx = (s) => JSON.stringify(s.slice(Math.max(0, i - 20), i + 30));
  return { index: i, line, site: ctx(a), draft: ctx(b) };
}

// 在网站自己的代码里渲染（和 tests/*.cjs 同一种载法）：返回 { App, bookParts, noteMdHtml, stationBarHtml, … }
function loadSite() {
  const storage = {};
  const ctx = vm.createContext({
    console,
    window: {},
    document: { addEventListener() {}, querySelectorAll() { return []; }, getElementById() { return null; } },
    localStorage: { getItem: (k) => storage[k] || null, setItem: (k, v) => { storage[k] = v; } },
  });
  const files = ["assets/vendor/marked/marked.umd.js", "assets/js/data-loader.js", "assets/js/storage.js"]
    .concat(SUBJECTS.map(subjectFile), ["assets/data/notes.js", "assets/data/superseded.js", "assets/js/katex-init.js", "assets/js/app.js"]);
  files.forEach((f) => vm.runInContext(read(f), ctx, { filename: f }));
  return vm.runInContext("({ App, bookParts, noteMdHtml, mathRe: () => App.MATH_RE(), cardBlocks, stripMarkers, hasMarkers, markMode, " +
    "markerIssues, markedPieces, cardNumbers, cardOutline, cardStory, CardOps, dualSource, appByType, cellSource, cellSpliceMarked, " +
    "numberCard, cardTitle, mdHtml })", ctx);
}

// KaTeX（网站自带的那份）和网站用的宏
function loadKatex() {
  const katex = require(abs("assets/vendor/katex/katex.min.js"));
  const ki = read("assets/js/katex-init.js");
  const body = ki.slice(ki.indexOf("macros: {") + 8, ki.indexOf("});")).replace(/,\s*$/, "");
  const macros = vm.runInNewContext("(" + body + ")");
  return { katex, macros };
}

// 体检一段文字：kind = "note"（笔记、决策流、章节总结）或 "book"（教材）
// 查：KaTeX 严格解析、渲染后漏出的 ** / == / $、被当成代码块的缩进
function makeChecker() {
  const site = loadSite();
  const { katex, macros } = loadKatex();
  return function check(text, kind) {
    const out = { math: 0, katex: [], stray: [], pre: 0, html: "" };
    const b = kind === "book" ? site.bookParts(text) : null;
    out.html = b ? b.main + b.tip : site.noteMdHtml(text);
    out.pre = (out.html.match(/<pre/g) || []).length - Math.floor((text.match(/^\s*```/gm) || []).length / 2);
    const parts = String(text).split(site.mathRe());
    for (let i = 1; i < parts.length; i += 2) {
      const f = parts[i];
      out.math++;
      const d = f.startsWith("$$");
      try {
        katex.renderToString(f.slice(d ? 2 : 1, f.length - (d ? 2 : 1)), { throwOnError: true, strict: false, displayMode: d, macros: { ...macros } });
      } catch (e) {
        out.katex.push(e.message.slice(0, 80) + "  ← " + f.slice(0, 60));
      }
    }
    const plain = out.html.replace(/<[^>]+>/g, "").replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g, "");
    const re = /.{0,18}(\*\*|==|\$).{0,18}/g;
    let m;
    while ((m = re.exec(plain)) && out.stray.length < 5) out.stray.push(m[0].replace(/\s+/g, " "));
    return out;
  };
}

module.exports = {
  REPO, SUBJECTS, abs, read, gitShow, fail, must, main, splitLines, writeLines,
  parseSubject, parseNotes, parseSuperseded, subjectFile, loadSubjects, loadNotes, findItem,
  readDraft, firstDiff, loadSite, loadKatex, makeChecker,
};
