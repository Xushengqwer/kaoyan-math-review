// 接 Gemini 在 Antigravity 里写的稿（镜像目录 待提交/ 里的 .md）：查格式 → 接到卡片里正确的位置 → 存档 → 写入。
// 交稿格式见 docs/mirror-gemini.md（镜像里的 GEMINI.md）「交稿格式」一节。不加 --write 只预览。
//
// 用法：
//   node tools/apply-handoff.cjs <交稿.md | 待提交目录>... [--reviewed | --write] [--id xxxx]
//   给目录就接里面所有 .md（不含 已提交/），按文件名排序；几份先全部体检，都过了才一起接、每张卡存档一次、写一次
//   --id：只交一份、追加时指定新记号（默认随机取一个没用过的 4 位）
//   --reviewed：Claude 审完这几份，把它们复制进仓库 drafts/审过/（同名），记下「审过的是这一版」
//   --write 只接和 drafts/审过/ 里一字不差的（审过后改过的，先 git diff --no-index 只审改动，再 --reviewed）；
//           写完把 待提交/ 里的文件挪进 待提交/已提交/、镜像 审稿意见/ 里的同名意见挪进 审稿意见/已提交/，drafts/审过/ 里这几份删掉
//
// 六种操作（文件开头 --- 之间的「操作:」）：
//   追加意义例题  <!-- 意义 --> 接在〔意义〕末尾、<!-- 例题 --> 接在〔例题〕末尾（这一节后面的 --- 分隔线之前），共用一个新记号
//   替换卡        「记号: xxxx」那张卡：<!-- 教材 -->/<!-- 意义 --> 换教材那一半，<!-- 笔记 -->/<!-- 例题 --> 换笔记那一半
//   替换本卡主线  <!-- 教材 --> 换掉〔定义〕开头「### 〔定义〕」和第一个站记号之间的「本卡主线」
//   重写站        「站: ①」那一站：<!-- 教材·定义 --> <!-- 笔记·定义 --> <!-- 教材·性质 --> <!-- 笔记·性质 --> 各是这一站这一节的全部卡
//                 （一张卡一个 ####，第一个 #### 前面的字是站引子，不写就沿用旧的；写「（无）」删掉这一节的这一站）；
//                 教材第 n 张和笔记第 n 张配成一对、共用一个新记号，旧卡和分组整站换掉，站记号和站名行照旧；
//                 只交了〔性质〕两段时〔定义〕不动
//   删卡          「记号: xxxx yyyy」这几张卡的教材、笔记两半一起删（卡后面紧挨下一节的 --- 留着）；没有正文
//   删旧版        〔意义〕〔例题〕〔提示〕里只留「保留: xxxx yyyy」这几张卡：这几节开头的旧版正文、别的卡、没有留下卡的站和分组都删掉，
//                 〔提示〕一张都不留就整节删（连同前面的 ---）；没有正文（2026-10-20，照 aac0e76 第 4 章那次）
// 写完还要：supersede → bump-sw → test-all → 提交推送 → wait-live → mirror；这一串由 tools/publish.cjs 一次跑完。
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
// 镜像里这份稿的审稿意见（审稿意见/<同名>.md，2026-10-18 起）；稿子不在镜像 待提交/ 里就没有
function reviewNotes(file) {
  const d = path.dirname(path.resolve(file));
  return path.basename(d) === "待提交" ? path.join(path.dirname(d), "审稿意见", path.basename(file)) : null;
}
function markReviewed(file, dir = REVIEWED) {
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(file, path.join(dir, path.basename(file)));
}

// 交稿文件 → { head: {卡片, 操作, 记号, 说明, …}, parts: { book: {name, text}, note: {name, text} } }
function parseHandoff(text) {
  const t = text.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const m = t.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  must(m, "交稿文件开头要有 --- 包起来的几行（卡片、操作……）");
  const head = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^\s*([^:：]+?)\s*[:：]\s*(.*?)\s*$/);
    if (kv) head[kv[1]] = kv[2];
  }
  const parts = {};
  const re = /^<!--\s*(意义|例题|教材|笔记)(?:\s*[·・.．]\s*(定义|性质))?\s*-->[ \t]*$/gm;
  const body = t.slice(m[0].length);
  const hits = [...body.matchAll(re)];
  // 删卡、删旧版只有开头几行，没有正文
  if (!hits.length && !body.trim()) return { head, parts };
  must(hits.length, "正文里没有 <!-- 意义 --> / <!-- 例题 --> / <!-- 教材 --> / <!-- 笔记 --> 分段行");
  must(!body.slice(0, hits[0].index).trim(), "第一个分段行前面还有字：" + body.slice(0, 40).trim());
  hits.forEach((h, i) => {
    // 重写站的四段记成 book:定义、note:性质……
    const part = PART[h[1]] + (h[2] ? ":" + h[2] : ""), name = h[1] + (h[2] ? "·" + h[2] : "");
    must(!parts[part], "同一半出现了两段：" + name);
    const text = body.slice(h.index + h[0].length, i + 1 < hits.length ? hits[i + 1].index : body.length).trim();
    must(text, "「" + name + "」这一段是空的");
    parts[part] = { name, text };
  });
  return { head, parts };
}

// ── 重写站 ──
const NONE = /^[（(]?[ \t]*无[ \t]*[）)]?$/;
const STATION_NO = /^[①-⑳]′?$/;
const stationOrder = (st) => (st.codePointAt(0) - 0x2460) * 2 + (st.includes("′") ? 1 : 0);

// 一段「重写站」稿 → { none, intro, cards: [卡片全文] }：第一个 #### 前面是站引子，每个 #### 起一张卡
function splitStationPart(text) {
  const t = String(text).trim();
  if (NONE.test(t)) return { none: true, intro: "", cards: [] };
  const lines = t.split("\n");
  const heads = lines.map((l, i) => (/^####[ \t]/.test(l) ? i : -1)).filter((i) => i >= 0);
  must(heads.length, "这一段没有「#### n. 标题」，分不出卡（工具站没有〔定义〕时写一行「（无）」）：" + t.slice(0, 40));
  const intro = lines.slice(0, heads[0]).join("\n").trim();
  const cards = heads.map((h, k) => lines.slice(h, k + 1 < heads.length ? heads[k + 1] : lines.length).join("\n").trim());
  return { none: false, intro, cards };
}

// 体检用：一段拆成站引子 + 每张卡，各自单独查；另外查这类稿特有的毛病
function stationPieces(p) {
  const s = splitStationPart(p.text);
  const pieces = [], errors = [], warns = [];
  if (s.intro) pieces.push({ name: p.name + " 站引子", text: s.intro });
  s.cards.forEach((c, k) => pieces.push({ name: p.name + " 第 " + (k + 1) + " 张", text: c }));
  for (const q of pieces) {
    const lines = q.text.split("\n");
    if (lines.some((l) => /^\*\*[①-⑳]/.test(l.trim()) && /\*\*[ \t]*$/.test(l)))
      errors.push(q.name + "：有整行加粗、圈号开头的行（站名行不用写，会多出一个站牌；要改站名写在开头「站名:」那一行）");
    if (lines.some((l) => /^#{1,3}[ \t]/.test(l))) warns.push(q.name + "：有 #/##/### 标题（会打乱小节结构）");
  }
  s.cards.forEach((c, k) => {
    const first = c.split("\n")[0], last = c.split("\n").pop().trim();
    if (!/^####[ \t]+\d+\.[ \t]*\S/.test(first)) warns.push(p.name + " 第 " + (k + 1) + " 张标题不是「#### n. 标题」：" + first.slice(0, 40));
    if (/^(?:-[ \t]*){3,}$/.test(last)) warns.push(p.name + " 第 " + (k + 1) + " 张末尾有 ---（卡和卡之间不用分隔线，会显示在卡里）");
  });
  return { pieces, errors, warns };
}

// 一节里某一站占的范围 [from, to)：从站记号到下一站 / 下一节的记号；站名行、站引子、卡、分组、末尾的空行或分隔线
function stationRegion(src, cb, sec, st) {
  const bs = cb.blocks;
  const i = bs.findIndex((b) => b.kind === "station" && b.sec === sec && b.value === st);
  if (i < 0) return null;
  let j = i + 1;
  while (j < bs.length && bs[j].kind !== "station" && bs[j].kind !== "section") j++;
  const from = bs[i].mstart, to = j < bs.length ? bs[j].mstart : src.length;
  const region = src.slice(from, to);
  const tail = (region.match(/\n+---[ \t]*\n\s*$/) || region.match(/\s*$/))[0];
  let head = src.slice(bs[i].start, bs[i].end).replace(/^\s+/, "");
  if (j === i + 1) head = head.slice(0, head.length - Math.min(head.length, tail.length));
  const nl = head.indexOf("\n");
  const name = (nl < 0 ? head : head.slice(0, nl)).trim();
  must(/^\*\*[①-⑳]/.test(name), sec + "第" + st + "站的记号后面不是站名行：" + name.slice(0, 40));
  const inner = bs.slice(i + 1, j);
  return { from, to, tail, name, intro: nl < 0 ? "" : head.slice(nl + 1).trim(),
    cards: inner.filter((b) => b.kind === "card").map((b) => ({ id: b.id, title: src.slice(b.start, b.end).trim().split("\n")[0] })),
    groups: inner.filter((b) => b.kind === "group").map((b) => b.id) };
}

function stationText(st, name, intro, cards, ids) {
  return "<!-- station:" + st + " -->\n\n" + name + "\n\n" + (intro ? intro + "\n\n" : "") +
    cards.map((c, k) => "<!-- card:" + ids[k] + " -->\n\n" + c).join("\n\n");
}

// 这一站的站名行：哪一半、哪一节先有就用哪个
function stationName(base, st) {
  const site = loadSite();
  for (const src of [base.book, base.note]) {
    const cb = site.cardBlocks(src);
    const b = cb && cb.blocks.find((x) => x.kind === "station" && x.value === st);
    if (b) return src.slice(b.start, b.end).trim().split("\n")[0].trim();
  }
  return "";
}

// 一半（教材或笔记）的一节里，把这一站换成新的卡；这一节原来没有这一站就按圈号插进去
function rewriteIn(src, sec, st, seg, ids, name) {
  const site = loadSite();
  const cb = site.cardBlocks(src);
  must(cb, "这一半没有格子记号，不能按站换");
  const r = stationRegion(src, cb, sec, st);
  if (seg.none) return r ? src.slice(0, r.from) + r.tail.replace(/^\n+/, "") + src.slice(r.to) : src;
  if (r) return src.slice(0, r.from) + stationText(st, r.name, seg.intro || r.intro, seg.cards, ids) + r.tail + src.slice(r.to);
  must(name, "第" + st + "站在哪儿都还没有，不知道站名");
  const k = cb.blocks.findIndex((b) => b.kind === "section" && b.value === sec);
  must(k >= 0, "这一半里没有〔" + sec + "〕这一节");
  let e = k + 1;
  while (e < cb.blocks.length && cb.blocks[e].kind !== "section") e++;
  const later = cb.blocks.slice(k + 1, e).find((b) => b.kind === "station" && stationOrder(b.value) > stationOrder(st));
  const text = stationText(st, name, seg.intro, seg.cards, ids);
  if (later) return src.slice(0, later.mstart) + text + "\n\n" + src.slice(later.mstart);
  const end = e < cb.blocks.length ? cb.blocks[e].mstart : src.length;
  const at = end - (src.slice(0, end).match(/\n+---[ \t]*\n\s*$/) || src.slice(0, end).match(/\s*$/))[0].length;
  return src.slice(0, at) + "\n\n" + text + src.slice(at);
}

// 一半里所有小节的这一站，站名行换成 line（「站名:」，2026-10-20；以前写在说明里、Claude 手改）
function renameStation(src, st, line) {
  const cb = loadSite().cardBlocks(src);
  if (!cb) return src;
  let out = src;
  for (const b of cb.blocks.filter((x) => x.kind === "station" && x.value === st).reverse()) {
    const text = out.slice(b.start, b.end), lead = text.match(/^\s*/)[0], nl = text.indexOf("\n", lead.length);
    const first = text.slice(lead.length, nl < 0 ? text.length : nl);
    must(/^\*\*[①-⑳]/.test(first.trim()), "第" + st + "站的记号后面不是站名行：" + first.slice(0, 40));
    out = out.slice(0, b.start + lead.length) + line + out.slice(b.start + lead.length + first.length);
  }
  return out;
}

// base = { book, note } → { out: { book, note }, ids: { 定义: [...], 性质: [...] }, summary: [给人看的几行] }；nextId() 给每一对新记号
function rewriteStation(base, h, nextId) {
  const st = h.head["站"];
  must(STATION_NO.test(st || ""), "重写站要写「站: ①」（站的圈号），现在是「" + (st || "") + "」");
  for (const [k, p] of Object.entries(h.parts))
    must(/^(book|note):(定义|性质)$/.test(k), "重写站只收 教材·定义、笔记·定义、教材·性质、笔记·性质 四段，不收「" + p.name + "」");
  const site = loadSite();
  const rename = String(h.head["站名"] || "").trim();
  if (rename) {
    must(rename.startsWith(st) && !(rename.slice(st.length).startsWith("′")) && rename.slice(st.length).trim(), "「站名」要以这一站的圈号 " + st + " 开头，后面跟名字，现在是「" + rename + "」");
    must(!/[*\n]/.test(rename), "「站名」里不要写 *（工具会加粗）");
  }
  const old = stationName(base, st);
  const name = rename ? "**" + rename + "**" : old;
  const out = { ...base }, ids = {}, summary = [];
  for (const sec of ["定义", "性质"]) {
    const b = h.parts["book:" + sec], n = h.parts["note:" + sec];
    if (!b && !n) { summary.push("〔" + sec + "〕不动"); continue; }
    must(b && n, "〔" + sec + "〕教材、笔记要成对交（只有「" + (b || n).name + "」）");
    const sb = splitStationPart(b.text), sn = splitStationPart(n.text);
    must(sb.none === sn.none, "〔" + sec + "〕教材、笔记一边写了（无）、一边有卡");
    must(sb.cards.length === sn.cards.length, "〔" + sec + "〕教材 " + sb.cards.length + " 张、笔记 " + sn.cards.length + " 张：按顺序配对，要一样多");
    const old = stationRegion(out.book, site.cardBlocks(out.book), sec, st);
    const cardIds = sb.cards.map(() => nextId());
    ids[sec] = cardIds;
    const was = old ? "旧 " + old.cards.length + " 张（" + old.cards.map((c) => c.id + " " + c.title.replace(/^#+[ \t]*/, "")).join("；") + "）" +
      (old.groups.length ? "、分组 " + old.groups.join(" ") : "") : "原来没有这一站";
    if (sb.none) summary.push("〔" + sec + "〕删掉这一站：" + was);
    else summary.push("〔" + sec + "〕" + was + " → 新 " + sb.cards.length + " 张（" +
      sb.cards.map((c, k) => cardIds[k] + " " + c.split("\n")[0].replace(/^#+[ \t]*/, "")).join("；") + "）；站引子" +
      (sb.intro ? "换新" : old && old.intro ? "沿用旧的" : "无") + (sn.intro ? "；笔记也有站引子" : ""));
    out.book = rewriteIn(out.book, sec, st, sb, cardIds, name);
    out.note = rewriteIn(out.note, sec, st, sn, cardIds, name);
  }
  must(Object.keys(ids).length, "重写站一段都没交");
  if (rename) {
    out.book = renameStation(out.book, st, name);
    out.note = renameStation(out.note, st, name);
    summary.push(old === name ? "站名不变：" + name : "站名改成 " + name + (old ? "（原来 " + old + "）" : "（新站）"));
  }
  return { out, ids, summary };
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
  // 「例题 n-1」「例题 n-2」是同一题型的几道，网站放在同一格（app.js 解析例题标题处），不算多出来的标题
  const exNo = (l) => (l.match(/^####[ \t]+例题[ \t]*(\d+)-\d+/) || [])[1];
  const sameType = name === "例题" && heads.every((l) => exNo(l) && exNo(l) === exNo(heads[0]));
  if (heads.length > 1 && !sameType) warns.push(name + "：有 " + heads.length + " 个 #### 标题（一张卡只该有一个，后面的会显示成卡片里的大标题）");
  // 「⚠️ 边界与避坑」前的 --- 只是〔意义〕的规矩（GEMINI.md「格式规矩」），〔定义〕〔性质〕的卡里不用
  if (name === "意义") lines.forEach((l, i) => {
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

// 换掉〔定义〕开头的「本卡主线」：「### 〔定义〕」标题行之后、第一个站记号之前的那段（2026-10-19，第 5 章五站）
function replaceStoryline(book, text) {
  const site = loadSite();
  const cb = site.cardBlocks(book);
  must(cb, "教材没有格子记号");
  const b = cb.blocks.find((x) => x.kind === "section" && x.value === "定义");
  must(b, "教材里没有〔定义〕这一节");
  const body = book.slice(b.start, b.end);
  const head = body.match(/^\s*###[^\n]*\n/);
  must(head, "〔定义〕这一节开头不是 ### 标题");
  must(/本卡主线/.test(body), "〔定义〕开头原来没有「本卡主线」，不知道换哪段");
  must(/^\*\*本卡主线\*\*/.test(String(text).trim()), "新的主线要以「**本卡主线**」开头");
  return book.slice(0, b.start) + head[0] + "\n" + String(text).trim() + body.match(/\s*$/)[0] + book.slice(b.end);
}

// ── 删卡、删旧版（2026-10-20）──
const SEP_TAIL = /\n+---[ \t]*\n\s*$/;
const idList = (s) => String(s || "").split(/[\s,，、;；]+/).filter(Boolean);
const titleOf = (src, b) => (src.slice(b.start, b.end).trim().split("\n")[0] || "").replace(/^#+[ \t]*/, "").slice(0, 30);

// 删掉一半里的一张卡：卡后面紧挨下一节的 --- 留给下一节；删的是最后一块就连前面的空行一起去掉
function cutCard(src, id) {
  const cb = loadSite().cardBlocks(src);
  const b = cb && cb.blocks.find((x) => x.kind === "card" && x.id === id);
  if (!b) return null;
  const sep = src.slice(b.mstart, b.end).match(SEP_TAIL);
  if (b.end === src.length) return src.slice(0, b.mstart).replace(/\s+$/, "");
  return src.slice(0, b.mstart) + (sep ? sep[0].replace(/^\n+/, "") : "") + src.slice(b.end);
}

function deleteCards(base, h) {
  const ids = idList(h.head["记号"]);
  must(ids.length, "删卡要写「记号: xxxx」（几张用空格隔开）");
  must(new Set(ids).size === ids.length, "「记号」里有重复的");
  must(!Object.keys(h.parts).length, "删卡不用正文，只写开头几行（卡片、操作、记号、说明）");
  const site = loadSite(), out = { ...base }, summary = [];
  for (const id of ids) {
    const where = [];
    for (const part of ["book", "note"]) {
      const cb = site.cardBlocks(out[part]);
      const b = cb && cb.blocks.find((x) => x.kind === "card" && x.id === id);
      if (!b) continue;
      where.push((part === "book" ? "教材" : "笔记") + "〔" + b.sec + "〕" + (b.station ? "第" + b.station + "站" : "") + "「" + titleOf(out[part], b) + "」");
      out[part] = cutCard(out[part], id);
    }
    must(where.length, "找不到记号 card:" + id + "（教材、笔记里都没有）");
    summary.push("删掉 " + id + "：" + where.join("、"));
  }
  // 删完空掉的站、分组只提醒（站名还在，下面没有卡）
  for (const part of ["book", "note"]) {
    const cb = site.cardBlocks(out[part]);
    if (!cb) continue;
    cb.blocks.forEach((b, i) => {
      if (b.kind !== "station" && b.kind !== "group") return;
      const next = cb.blocks[i + 1];
      if (!next || next.kind === "section" || (b.kind === "station" && next.kind === "station"))
        summary.push("⚠ 删完" + (part === "book" ? "教材" : "笔记") + "〔" + b.sec + "〕" + (b.kind === "station" ? "第" + b.value + "站" : "分组 " + b.id) + "下面没有卡了");
    });
  }
  return { out, summary };
}

// 一半里的一节只留 keep 里的卡：开头的旧版正文、别的卡、没有留下卡的站和分组删掉；一张都不留、又不是 keepHead 的节整节删掉
function dropOldIn(src, sec, keep, keepHead) {
  const cb = loadSite().cardBlocks(src);
  if (!cb) return { src, note: null };
  const k = cb.blocks.findIndex((b) => b.kind === "section" && b.value === sec);
  if (k < 0) return { src, note: null };
  let e = k + 1;
  while (e < cb.blocks.length && cb.blocks[e].kind !== "section") e++;
  const head = cb.blocks[k], inner = cb.blocks.slice(k + 1, e);
  const from = head.mstart, to = e < cb.blocks.length ? cb.blocks[e].mstart : src.length;
  const tail = (src.slice(from, to).match(SEP_TAIL) || src.slice(from, to).match(/\s*$/))[0];
  const cards = inner.filter((b) => b.kind === "card"), kept = cards.filter((b) => keep.has(b.id));
  const lost = cards.filter((b) => !keep.has(b.id)).map((b) => b.id + " " + titleOf(src, b));
  const headText = src.slice(head.start, head.end), lines = headText.trim().split("\n");
  const old = lines.slice(1).join("\n").trim();
  const blocks = inner.filter((b) => b.kind === "card" ? keep.has(b.id)
    : kept.some((c) => (b.kind === "station" ? c.station === b.value : c.group === b.id)));
  // 站、分组记号下面的字（站名行、引子，旧写法整站的内容）跟着站一起删
  const extra = inner.filter((b) => b.kind !== "card" && !blocks.includes(b))
    .map((b) => (b.kind === "station" ? "第" + b.value + "站" : "分组 " + b.id) + " " + src.slice(b.start, b.end).trim().length + " 字");
  const report = { old: old.length, oldFirst: old.split("\n")[0].slice(0, 30), extra, lost, kept: kept.map((b) => b.id), whole: false };
  if (!kept.length && !keepHead) {
    report.whole = true;
    if (e < cb.blocks.length) return { src: src.slice(0, from) + src.slice(to), note: report };
    return { src: src.slice(0, from).replace(SEP_TAIL, "").replace(/\s+$/, ""), note: report };
  }
  const pieces = [src.slice(head.mstart, head.start) + lines[0].replace(/\s+$/, "")]
    .concat(blocks.map((b) => src.slice(b.mstart, b.end).replace(SEP_TAIL, "").replace(/\s+$/, "")));
  return { src: src.slice(0, from) + pieces.join("\n\n") + (tail || (to < src.length ? "\n\n" : "")) + src.slice(to), note: report };
}

function dropOld(base, h) {
  const raw = String(h.head["保留"] || "").trim();
  must(raw, "删旧版要写「保留: xxxx yyyy」（新写的、要留下的意义例题记号）");
  const keep = new Set(idList(raw));
  must(!Object.keys(h.parts).length, "删旧版不用正文，只写开头几行（卡片、操作、保留、说明）");
  const site = loadSite();
  const appIds = (src) => new Set(((site.cardBlocks(src) || { blocks: [] }).blocks)
    .filter((b) => b.kind === "card" && ["意义", "例题", "提示"].includes(b.sec)).map((b) => b.id));
  const have = new Set([...appIds(base.book), ...appIds(base.note)]);
  const missing = [...keep].filter((id) => !have.has(id));
  must(!missing.length, "「保留」里的 " + missing.join("、") + " 不在这张卡的〔意义〕〔例题〕〔提示〕里（记号写错了？写错会把要留的卡删掉）");
  const out = { ...base }, summary = [];
  for (const [part, secs] of [["book", ["意义", "例题", "提示"]], ["note", ["意义", "例题", "提示"]]]) {
    for (const sec of secs) {
      const r = dropOldIn(out[part], sec, keep, sec !== "提示");
      if (!r.note) continue;
      out[part] = r.src;
      const n = r.note, side = (part === "book" ? "教材" : "笔记") + "〔" + sec + "〕";
      const gone = [n.old ? "开头旧版正文 " + n.old + " 字（「" + n.oldFirst + "…」）" : "", n.extra.length ? n.extra.join("、") : "",
        n.lost.length ? "卡 " + n.lost.length + " 张：" + n.lost.join("；") : ""].filter(Boolean).join("、");
      if (n.whole) summary.push(side + "整节删掉" + (gone ? "：" + gone : ""));
      else summary.push(side + (gone ? "删掉" + gone + "；" : "不动；") + "留下 " + (n.kept.length ? n.kept.join(" ") : "（无）"));
    }
  }
  return { out, summary };
}

// 纯函数：base = { book, note } → { book, note }（测试用它对着历史版本复现）；重写站时 id 是给新记号的函数
function applyHandoff(base, h, id) {
  const op = h.head["操作"];
  const out = { ...base };
  if (op === "追加意义例题") {
    for (const p of Object.values(h.parts)) must(p.name === "意义" || p.name === "例题", "追加意义例题只收 <!-- 意义 --> 和 <!-- 例题 -->，不收「" + p.name + "」");
    if (h.parts.book) out.book = appendToSection(base.book, "意义", id, h.parts.book.text);
    if (h.parts.note) out.note = appendToSection(base.note, "例题", id, h.parts.note.text);
  } else if (op === "替换卡") {
    must(id, "替换卡要写「记号: xxxx」");
    for (const p of Object.values(h.parts)) must(!p.name.includes("·"), "替换卡只收 <!-- 教材 -->/<!-- 意义 --> 和 <!-- 笔记 -->/<!-- 例题 -->，不收「" + p.name + "」");
    if (h.parts.book) out.book = replaceCard(base.book, id, h.parts.book.text);
    if (h.parts.note) out.note = replaceCard(base.note, id, h.parts.note.text);
  } else if (op === "重写站") {
    must(typeof id === "function", "重写站要一个给新记号的函数");
    return rewriteStation(base, h, id).out;
  } else if (op === "替换本卡主线") {
    must(h.parts.book && Object.keys(h.parts).length === 1, "替换本卡主线只收一段 <!-- 教材 -->");
    out.book = replaceStoryline(base.book, h.parts.book.text);
  } else if (op === "删卡") return deleteCards(base, h).out;
  else if (op === "删旧版") return dropOld(base, h).out;
  else fail("不认识的操作「" + (op || "") + "」：只有 追加意义例题、替换卡、重写站、替换本卡主线、删卡、删旧版");
  return out;
}

// 一份交稿：读、解析、体检（errors 挡写入，warns 只提醒）；重写站的稿按站引子、每张卡分开查
function inspect(file, check) {
  const h = parseHandoff(readDraft(file).text);
  must(h.head["卡片"], path.basename(file) + "：开头缺「卡片: <卡片id>」");
  const lint = [];
  for (const [key, p] of Object.entries(h.parts)) {
    const kind = key.split(":")[0];
    let pieces = [{ name: p.name, text: p.text }];
    if (key.includes(":")) {
      const s = stationPieces(p);
      pieces = s.pieces;
      lint.push({ errors: s.errors, warns: s.warns });
    }
    for (const q of pieces) {
      lint.push(lintPart(q.name, q.text));
      const r = check(q.text, kind);
      if (r.katex.length) lint.push({ errors: r.katex.map((e) => q.name + " 公式报错：" + e), warns: [] });
      if (r.stray.length) lint.push({ errors: r.stray.map((e) => q.name + " 漏出记号：" + e), warns: [] });
      if (r.pre > 0) lint.push({ errors: [q.name + "：有 " + r.pre + " 处会变成代码块（行首缩进 4 格？）"], warns: [] });
    }
  }
  return { file, h, errors: lint.flatMap((x) => x.errors), warns: lint.flatMap((x) => x.warns), pending: pendingCards(h) };
}

// 先只交教材时，笔记卡写「（待写）」（2026-10-19 起）：能预览、能审教材，不能上线 → 还在待写的卡数
function pendingCards(h) {
  return Object.values(h.parts).reduce((n, p) => n + (p.text.match(/^[（(][ \t]*待写[ \t]*[）)][ \t]*$/gm) || []).length, 0);
}

// 几份交稿依次接到各自的卡上：bases = { 卡片id: { book, note } }，nextId() 给追加、重写站的新记号 → { 卡片id: { book, note } }，
// 并把记号记在每份上（重写站还记下 ids、summary）
function applyAll(bases, list, nextId) {
  const out = { ...bases };
  for (const x of list) {
    const card = x.h.head["卡片"];
    must(out[card], "找不到卡片：" + card);
    if (x.h.head["操作"] === "重写站") {
      const r = rewriteStation(out[card], x.h, nextId);
      x.id = "";
      x.ids = r.ids;
      x.summary = r.summary;
      out[card] = r.out;
      continue;
    }
    if (x.h.head["操作"] === "删卡" || x.h.head["操作"] === "删旧版") {
      const r = (x.h.head["操作"] === "删卡" ? deleteCards : dropOld)(out[card], x.h);
      x.id = "";
      x.summary = r.summary;
      out[card] = r.out;
      continue;
    }
    x.id = x.h.head["操作"] === "替换卡" ? x.h.head["记号"] : x.h.head["操作"] === "替换本卡主线" ? "" : nextId();
    out[card] = applyHandoff(out[card], x.h, x.id);
  }
  return out;
}

module.exports = { parseHandoff, lintPart, appendToSection, replaceCard, applyHandoff, applyAll, reviewState, markReviewed, reviewNotes, REVIEWED,
  splitStationPart, stationPieces, rewriteStation, pendingCards, replaceStoryline, deleteCards, dropOld, inspect, usedIds, newId };
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
  must(!forced || !list.some((x) => x.h.head["操作"] === "重写站"), "重写站一次要好几个新记号，不能用 --id");
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
    console.log("  " + x.h.head["卡片"] + " · " + x.h.head["操作"] + (x.ids ? " · 第" + x.h.head["站"] + "站" : x.id ? " · 记号 " + x.id : "") +
      (x.h.head["操作"] === "删卡" ? " · 记号 " + x.h.head["记号"] : x.h.head["操作"] === "删旧版" ? " · 保留 " + x.h.head["保留"] : "") + " · " +
      Object.values(x.h.parts).map((p) => p.name + " " + p.text.length + " 字").join("、") + (x.h.head["审稿"] ? " · 审稿：" + x.h.head["审稿"] : ""));
    for (const line of x.summary || []) console.log("  " + line);
    for (const w of x.warns) console.log("  ⚠ " + w);
    for (const e of x.errors) console.log("  ✗ " + e);
    if (x.pending) console.log("  ⏳ 还有 " + x.pending + " 张卡写着（待写）：先审教材；笔记压缩好之前不能上线");
    const notes = reviewNotes(x.file);
    if (notes) console.log("  审稿意见：" + (fs.existsSync(notes) ? notes : "还没有（审完写进 " + notes + "）"));
    if (x.state === "审过后改过") console.log("  只审改动：git diff --no-index \"" + path.join(REVIEWED, path.basename(x.file)) + "\" \"" + path.resolve(x.file) + "\"");
  }
  const bad = list.filter((x) => x.errors.length);
  if (bad.length) fail(bad.length + " 份有要先改的地方（改交稿文件，或请用户转给 Gemini）；一份都没写");
  if (reviewed) { console.log("✓ 已记为审过（" + list.length + " 份，drafts/审过/）"); return; }
  if (!write) { console.log("✓ 预览通过（" + list.length + " 份）；审过的加 --write 写入"); return; }
  const waiting = list.filter((x) => x.pending);
  must(!waiting.length, waiting.map((x) => path.basename(x.file)).join("、") + " 还有卡写着（待写）：笔记压缩好、审过再上线；一份都没写");
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
    // 存档名：重写站写「重写第①②③站」（说明往往是一长句）；其他取说明冒号前那段
    const rest = mine.filter((x) => x.h.head["操作"] !== "重写站");
    const stations = rest.every((x) => x.h.head["操作"] === "替换本卡主线") ? mine.filter((x) => x.ids || x.h.head["操作"] === "重写站").map((x) => x.h.head["站"]).join("") : "";
    const what = (stations ? "重写第" + stations + "站" + (rest.length ? "与本卡主线" : "") :(mine[0].h.head["说明"] || mine[0].h.head["操作"]).split(/[：:]/)[0] + (mine.length > 1 ? "等 " + mine.length + " 份" : "")).replace(/[\\/:*?"<>|]/g, "-");
    // 同一天、同一版上第二次接（上次中途失败、撤回了）：存档名加 -2、-3，旧存档不覆盖
    const stem = path.join(os.homedir(), "Downloads", subj + "第" + ch.order + "章-教材与笔记存档（交稿" + what + "前）-" + date + "-" + hash);
    let arch = stem + ".md";
    for (let k = 2; fs.existsSync(arch); k++) arch = stem + "-" + k + ".md";
    const r = cp.spawnSync(process.execPath, [path.join(REPO, "tools", "archive.cjs"), arch, subj + "第" + ch.order + "章 教材与笔记存档（交稿" + what + "前）", card, "book:" + card],
      { cwd: REPO, encoding: "utf8" });
    must(r.status === 0, "存档失败：" + (r.stderr || r.stdout).trim());
    console.log("  " + (r.stdout || "").trim());
    if (v.book !== bases[card].book) console.log("✓ " + card + " 教材：" + writeBook(card, v.book));
    if (v.note !== bases[card].note) console.log("✓ " + card + " 笔记：" + writeNote(card, v.note));
  }
  for (const x of list) {
    if (path.basename(path.dirname(path.resolve(x.file))) !== "待提交") continue;
    const done = path.join(path.dirname(path.resolve(x.file)), "已提交");
    fs.mkdirSync(done, { recursive: true });
    fs.renameSync(x.file, path.join(done, path.basename(x.file)));
    const notes = reviewNotes(x.file);
    if (notes && fs.existsSync(notes)) {
      fs.mkdirSync(path.join(path.dirname(notes), "已提交"), { recursive: true });
      fs.renameSync(notes, path.join(path.dirname(notes), "已提交", path.basename(notes)));
    }
  }
  for (const x of list) fs.rmSync(path.join(REVIEWED, path.basename(x.file)), { force: true });
  console.log("下一步：supersede → bump-sw → test-all → 提交推送 → wait-live → mirror（交稿文件、审稿意见已挪进各自的 已提交/，审过的副本已删；tools/publish.cjs --go 一次跑完）");
});
