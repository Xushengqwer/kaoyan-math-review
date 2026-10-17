// 接 Gemini 在 Antigravity 里写的稿（镜像目录 待提交/ 里的 .md）：查格式 → 接到卡片里正确的位置 → 存档 → 写入。
// 交稿格式见 docs/mirror-gemini.md（镜像里的 GEMINI.md）「交稿格式」一节。不加 --write 只预览。
//
// 用法：
//   node tools/apply-handoff.cjs <交稿.md | 待提交目录>... [--reviewed | --write] [--id xxxx]
//   给目录就接里面所有 .md（不含 已提交/），按文件名排序；几份先全部体检，都过了才一起接、每张卡存档一次、写一次
//   --id：只交一份、追加时指定新记号（默认随机取一个没用过的 4 位）
//   --reviewed：Claude 审完这几份，把它们复制进仓库 drafts/审过/（同名），记下「审过的是这一版」
//   --write 只接和 drafts/审过/ 里一字不差的（审过后改过的，先 git diff --no-index 只审改动，再 --reviewed）；
//           写完把 待提交/ 里的文件挪进 待提交/已提交/，drafts/审过/ 里这几份删掉
//
// 两种操作（文件开头 --- 之间的「操作:」）：
//   追加意义例题  <!-- 意义 --> 接在〔意义〕末尾、<!-- 例题 --> 接在〔例题〕末尾（这一节后面的 --- 分隔线之前），共用一个新记号
//   替换卡        「记号: xxxx」那张卡：<!-- 教材 -->/<!-- 意义 --> 换教材那一半，<!-- 笔记 -->/<!-- 例题 --> 换笔记那一半
// 写完还要：改测试里的条数（追加时）→ supersede → bump-sw → test-all → 提交推送 → wait-live → mirror，见 CLAUDE.md。
const fs = require("fs");
const path = require("path");
const os = require("os");
const cp = require("child_process");
const { main, must, fail, REPO, read, SUBJECTS, subjectFile, loadSubjects, loadNotes, findItem, readDraft, loadSite, makeChecker } = require("./lib.cjs");

const PART = { 意义: "book", 教材: "book", 例题: "note", 笔记: "note" };
const REVIEWED = path.join(REPO, "drafts", "审过");

// 审稿状态：drafts/审过/ 里的同名文件就是 Claude 审过的那一版
function reviewState(file, dir = REVIEWED) {
  const snap = path.join(dir, path.basename(file));
  if (!fs.existsSync(snap)) return "没审过";
  return fs.readFileSync(snap, "utf8") === fs.readFileSync(file, "utf8") ? "审过" : "审过后改过";
}
function markReviewed(file, dir = REVIEWED) {
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(file, path.join(dir, path.basename(file)));
}

// 交稿文件 → { head: {卡片, 操作, 记号, 说明, …}, parts: { book: {name, text}, note: {name, text} } }
function parseHandoff(text) {
  const t = text.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const m = t.match(/^---\n([\s\S]*?)\n---\n/);
  must(m, "交稿文件开头要有 --- 包起来的几行（卡片、操作……）");
  const head = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^\s*([^:：]+?)\s*[:：]\s*(.*?)\s*$/);
    if (kv) head[kv[1]] = kv[2];
  }
  const parts = {};
  const re = /^<!--\s*(意义|例题|教材|笔记)\s*-->[ \t]*$/gm;
  const body = t.slice(m[0].length);
  const hits = [...body.matchAll(re)];
  must(hits.length, "正文里没有 <!-- 意义 --> / <!-- 例题 --> / <!-- 教材 --> / <!-- 笔记 --> 分段行");
  must(!body.slice(0, hits[0].index).trim(), "第一个分段行前面还有字：" + body.slice(0, 40).trim());
  hits.forEach((h, i) => {
    const part = PART[h[1]];
    must(!parts[part], "教材（意义）或笔记（例题）出现了两段：" + h[1]);
    const text = body.slice(h.index + h[0].length, i + 1 < hits.length ? hits[i + 1].index : body.length).trim();
    must(text, "「" + h[1] + "」这一段是空的");
    parts[part] = { name: h[1], text };
  });
  return { head, parts };
}

// 内容体检：errors 会挡住写入，warns 只提醒
function lintPart(name, text) {
  const errors = [], warns = [];
  if (/<!--/.test(text)) errors.push(name + "：正文里有 <!-- -->（记号行由工具加，交稿里不要写）");
  if (/\[cite/i.test(text)) errors.push(name + "：有 [cite …] 引用标记");
  if (/`/.test(text)) errors.push(name + "：有反引号（网站上会变成灰底代码块）");
  const tag = text.replace(/\$\$[\s\S]*?\$\$|\$[^$\n]*\$/g, "").match(/<\/?[a-zA-Z][a-zA-Z0-9]*(\s[^>]*)?\/?>/);
  if (tag) errors.push(name + "：有 HTML 标签 " + tag[0]);
  const lines = text.split("\n");
  let inDisplay = false;
  lines.forEach((l, i) => {
    const dd = (l.match(/\$\$/g) || []).length;
    if (dd % 2) inDisplay = !inDisplay;
    if (!inDisplay && !dd && (l.match(/\$/g) || []).length % 2) warns.push(name + " 第 " + (i + 1) + " 行 $ 不成对（截断了？）：" + l.slice(0, 40));
  });
  const heads = lines.filter((l) => /^####[ \t]/.test(l));
  if (name === "意义" && !/^####[ \t]+\d+\.[ \t]*\S/.test(lines[0])) warns.push("意义第一行不是「#### n. 方向名：一句话」：" + lines[0].slice(0, 40));
  if (name === "例题" && !/^####[ \t]+例题[ \t]*\d+/.test(lines[0])) warns.push("例题第一行不是「#### 例题 n：……」：" + lines[0].slice(0, 40));
  if (heads.length > 1) warns.push(name + "：有 " + heads.length + " 个 #### 标题（一张卡只该有一个，后面的会显示成卡片里的大标题）");
  lines.forEach((l, i) => {
    if (!/^[*-]?\s*⚠️\s*\*\*边界与避坑\*\*/.test(l)) return;
    let j = i - 1;
    while (j >= 0 && !lines[j].trim()) j--;
    if (j >= 0 && lines[j].trim() !== "---") warns.push(name + "：「⚠️ 边界与避坑」前面没有 --- 分隔线");
  });
  return { errors, warns };
}

// 接在某一节末尾：这一节最后的 --- 分隔线（紧挨着下一节记号的那条）留在后面
function appendToSection(src, sec, id, text) {
  const site = loadSite();
  const cb = site.cardBlocks(src);
  must(cb, "这一半没有格子记号，不能按记号接");
  const blocks = cb.blocks.filter((b) => b.sec === sec);
  must(blocks.some((b) => b.kind === "section"), "这一半里没有〔" + sec + "〕这一节（<!-- section:" + sec + " -->）");
  const end = blocks[blocks.length - 1].end;
  let head = src.slice(0, end);
  const tail = src.slice(end);
  const sep = head.match(/\n+---[ \t]*\n\s*$/);
  let rest;
  if (sep) { rest = head.slice(sep.index); head = head.slice(0, sep.index); }
  else { rest = head.match(/\s*$/)[0]; head = head.slice(0, head.length - rest.length); }
  return head + "\n\n<!-- card:" + id + " -->\n\n" + text + rest + tail;
}

// 换掉一张卡的这一半（卡后面的空行、紧挨下一节的 --- 分隔线照旧）
function replaceCard(src, id, text) {
  const site = loadSite();
  const cb = site.cardBlocks(src);
  must(cb, "这一半没有格子记号");
  const b = cb.blocks.find((x) => x.kind === "card" && x.id === id);
  must(b, "这一半里找不到记号 card:" + id);
  const old = src.slice(b.start, b.end);
  const sep = old.match(/\n+---[ \t]*\n\s*$/) || old.match(/\s*$/);
  return src.slice(0, b.start) + text + sep[0] + src.slice(b.end);
}

function usedIds() {
  const all = SUBJECTS.map((s) => read(subjectFile(s))).join("\n") + read("assets/data/notes.js");
  return new Set([...all.matchAll(/<!-- (?:card|group):([a-z0-9]+) -->/g)].map((m) => m[1]));
}
function newId(used) {
  const c = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (;;) {
    const id = Array.from(require("crypto").randomBytes(4), (x) => c[x % 36]).join("");
    if (!used.has(id) && /[a-z]/.test(id[0])) return id;
  }
}

// 纯函数：base = { book, note } → { book, note }（测试用它对着历史版本复现）
function applyHandoff(base, h, id) {
  const op = h.head["操作"];
  const out = { ...base };
  if (op === "追加意义例题") {
    for (const p of Object.values(h.parts)) must(p.name === "意义" || p.name === "例题", "追加意义例题只收 <!-- 意义 --> 和 <!-- 例题 -->，不收「" + p.name + "」");
    if (h.parts.book) out.book = appendToSection(base.book, "意义", id, h.parts.book.text);
    if (h.parts.note) out.note = appendToSection(base.note, "例题", id, h.parts.note.text);
  } else if (op === "替换卡") {
    must(id, "替换卡要写「记号: xxxx」");
    if (h.parts.book) out.book = replaceCard(base.book, id, h.parts.book.text);
    if (h.parts.note) out.note = replaceCard(base.note, id, h.parts.note.text);
  } else fail("不认识的操作「" + (op || "") + "」：只有 追加意义例题、替换卡");
  return out;
}

// 一份交稿：读、解析、体检（errors 挡写入，warns 只提醒）
function inspect(file, check) {
  const h = parseHandoff(readDraft(file).text);
  must(h.head["卡片"], path.basename(file) + "：开头缺「卡片: <卡片id>」");
  const lint = Object.values(h.parts).map((p) => lintPart(p.name, p.text));
  for (const [part, p] of Object.entries(h.parts)) {
    const r = check(p.text, part);
    if (r.katex.length) lint.push({ errors: r.katex.map((e) => p.name + " 公式报错：" + e), warns: [] });
    if (r.stray.length) lint.push({ errors: r.stray.map((e) => p.name + " 漏出记号：" + e), warns: [] });
    if (r.pre > 0) lint.push({ errors: [p.name + "：有 " + r.pre + " 处会变成代码块（行首缩进 4 格？）"], warns: [] });
  }
  return { file, h, errors: lint.flatMap((x) => x.errors), warns: lint.flatMap((x) => x.warns) };
}

// 几份交稿依次接到各自的卡上：bases = { 卡片id: { book, note } }，nextId() 给追加的新记号 → { 卡片id: { book, note } }，并把记号记在每份上
function applyAll(bases, list, nextId) {
  const out = { ...bases };
  for (const x of list) {
    const card = x.h.head["卡片"];
    must(out[card], "找不到卡片：" + card);
    x.id = x.h.head["操作"] === "替换卡" ? x.h.head["记号"] : nextId();
    out[card] = applyHandoff(out[card], x.h, x.id);
  }
  return out;
}

module.exports = { parseHandoff, lintPart, appendToSection, replaceCard, applyHandoff, applyAll, reviewState, markReviewed, REVIEWED };
if (require.main === module) main(() => {
  const args = process.argv.slice(2);
  const write = args.includes("--write"), reviewed = args.includes("--reviewed");
  must(!(write && reviewed), "--reviewed 和 --write 分开跑：先记审过，再写入");
  const ii = args.indexOf("--id");
  const forced = ii >= 0 ? args[ii + 1] : null;
  const inputs = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--id");
  must(inputs.length, "用法：node tools/apply-handoff.cjs <交稿.md | 待提交目录>... [--reviewed | --write] [--id xxxx]");
  const files = inputs.flatMap((p) => fs.statSync(p).isDirectory()
    ? fs.readdirSync(p).filter((f) => f.endsWith(".md")).sort().map((f) => path.join(p, f)) : [p]);
  must(files.length, "没有要接的交稿（目录里没有 .md）");
  must(!forced || files.length === 1, "--id 只能在交一份时用");

  const check = makeChecker();
  const list = files.map((f) => inspect(f, check));
  const subjects = loadSubjects(), notes = loadNotes();
  const bases = {};
  for (const x of list) {
    const card = x.h.head["卡片"], hit = findItem(card, subjects);
    must(hit, path.basename(x.file) + "：找不到卡片 " + card);
    bases[card] = bases[card] || { book: hit.item.md, note: notes[card] || "" };
  }
  const used = usedIds();
  if (forced) must(!used.has(forced), "记号 " + forced + " 已经用过了");
  const out = applyAll(bases, list, () => { const id = forced || newId(used); used.add(id); return id; });
  const site = loadSite();
  for (const [card, v] of Object.entries(out)) {
    const issues = site.markerIssues(v.book, v.note);
    must(!issues.length, card + "：接完记号不完整：" + JSON.stringify(issues).slice(0, 200));
  }

  if (reviewed) for (const x of list) markReviewed(x.file);
  for (const x of list) {
    x.state = reviewState(x.file);
    console.log("交稿：" + path.basename(x.file) + (x.h.head["说明"] ? "（" + x.h.head["说明"] + "）" : "") + " · " + x.state);
    console.log("  " + x.h.head["卡片"] + " · " + x.h.head["操作"] + " · 记号 " + x.id + " · " +
      Object.values(x.h.parts).map((p) => p.name + " " + p.text.length + " 字").join("、") + (x.h.head["审稿"] ? " · 审稿：" + x.h.head["审稿"] : ""));
    for (const w of x.warns) console.log("  ⚠ " + w);
    for (const e of x.errors) console.log("  ✗ " + e);
    if (x.state === "审过后改过") console.log("  只审改动：git diff --no-index \"" + path.join(REVIEWED, path.basename(x.file)) + "\" \"" + path.resolve(x.file) + "\"");
  }
  const bad = list.filter((x) => x.errors.length);
  if (bad.length) fail(bad.length + " 份有要先改的地方（改交稿文件，或请用户转给 Gemini）；一份都没写");
  if (reviewed) { console.log("✓ 已记为审过（" + list.length + " 份，drafts/审过/）"); return; }
  if (!write) { console.log("✓ 预览通过（" + list.length + " 份）；审过的加 --write 写入"); return; }
  const unreviewed = list.filter((x) => x.state !== "审过");
  must(!unreviewed.length, unreviewed.map((x) => path.basename(x.file) + "（" + x.state + "）").join("、") + " 还没审：审完加 --reviewed 记下再写；一份都没写");

  const hash = cp.execSync("git rev-parse --short HEAD", { cwd: REPO, encoding: "utf8" }).trim();
  const d = new Date(), date = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const { writeBook, writeNote } = require("./write.cjs");
  for (const [card, v] of Object.entries(out)) {
    const hit = findItem(card, subjects);
    const subj = { calculus: "高数", linalg: "线代", probability: "概率" }[hit.subject.id];
    const ch = hit.subject.chapters.find((c) => c.id === hit.item.chapterId);
    const mine = list.filter((x) => x.h.head["卡片"] === card);
    const what = ((mine[0].h.head["说明"] || mine[0].h.head["操作"]).split(/[：:]/)[0] + (mine.length > 1 ? "等 " + mine.length + " 份" : "")).replace(/[\\/:*?"<>|]/g, "-");
    const arch = path.join(os.homedir(), "Downloads", subj + "第" + ch.order + "章-教材与笔记存档（交稿" + what + "前）-" + date + "-" + hash + ".md");
    const r = cp.spawnSync(process.execPath, [path.join(REPO, "tools", "archive.cjs"), arch, subj + "第" + ch.order + "章 教材与笔记存档（交稿" + what + "前）", card, "book:" + card],
      { cwd: REPO, encoding: "utf8" });
    must(r.status === 0, "存档失败：" + (r.stderr || r.stdout).trim());
    console.log("  " + (r.stdout || "").trim());
    if (v.book !== bases[card].book) console.log("✓ " + card + " 教材：" + writeBook(card, v.book));
    if (v.note !== bases[card].note) console.log("✓ " + card + " 笔记：" + writeNote(card, v.note));
    const added = mine.filter((x) => x.h.head["操作"] === "追加意义例题").length;
    if (added) console.log("  " + card + " 追加了 " + added + " 对：测试条数要改（station-cards、detached-applications、dual-track，第 4 章还有 app-stack）");
  }
  for (const x of list) {
    if (path.basename(path.dirname(path.resolve(x.file))) !== "待提交") continue;
    const done = path.join(path.dirname(path.resolve(x.file)), "已提交");
    fs.mkdirSync(done, { recursive: true });
    fs.renameSync(x.file, path.join(done, path.basename(x.file)));
  }
  for (const x of list) fs.rmSync(path.join(REVIEWED, path.basename(x.file)), { force: true });
  console.log("下一步：supersede → bump-sw → test-all → 提交推送 → wait-live → mirror（交稿文件已挪进 已提交/，审过的副本已删）");
});
