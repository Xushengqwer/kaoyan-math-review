// 卡片格子的记号（见 app.js「卡片格子」那一段）：一次性迁移 + 完整性核对。
//
// 用法：
//   node tools/card-markers.cjs                        核对：所有带记号的卡，记号完整（格式、id 唯一、配对、小节归属）
//   node tools/card-markers.cjs migrate [卡片id...]     迁移预演：给对照卡加记号，逐卡核对，不写文件
//   node tools/card-markers.cjs migrate --write [卡片id...]   核对全部通过才写进数据文件（write.cjs 按行替换 + 读回核对）
//
// 不写卡片 id 时，迁移 tests/dual-track.cjs 里那 11 张对照卡。
// 迁移用现有的对照模型（dualTrackModel）拿到切法和配对，在每个小节、站、分组、卡片的开头插入「记号 + 空行」，
// 配上对的两半给同一个 id。每张卡都要核对（任何一项不过就停，不写）：
//   1. 去掉记号以后，教材、笔记都和迁移前逐字节相同；
//   2. 记号完整（markerIssues 为空）；
//   3. 按记号的对照和迁移前一样：行数、每行的种类、两边有没有、每一格显示的内容（HTML，空白不计）、配对数；
//   4. 站卡小标题（cardOutline）、本卡主线（cardStory）、站牌用的小节表（stationMap）一样；
//   5. 整页显示（教材 bookParts、笔记 stationizeNote）和打印一样。
// 迁移以后跑 node tools/supersede.cjs，用户浏览器里迁移前的旧副本会自动换掉。
const { main, must, loadSite, loadSubjects, loadNotes, findItem } = require("./lib.cjs");
const { writeNote, writeBook } = require("./write.cjs");
const crypto = require("crypto");

const DUAL = ["calc-lim-function", "calc-der-derivative", "calc-int-antiderivative", "calc-vec-coordinates",
  "calc-mvd-limit-continuity", "calc-mi-double-def", "calc-ls-line-first", "calc-ser-convergence", "calc-ode-concepts",
  "la-eig-def-eigen", "la-vec-def-max-independent-set"];

const norm = (html) => String(html || "").replace(/\s+/g, " ").replace(/> </g, "><").trim();
const plainView = (html) => norm(String(html).replace(/ data-(?:src|at|key)="[^"]*"/g, ""));

function newId(used) {
  const abc = "abcdefghijklmnopqrstuvwxyz", all = abc + "0123456789";
  for (;;) {
    const b = crypto.randomBytes(4);
    const id = abc[b[0] % 26] + [1, 2, 3].map((i) => all[b[i] % all.length]).join("");
    if (!used.has(id)) { used.add(id); return id; }
  }
}

// 迁移一张卡：→ { book, note, report }
function migrateCard(site, id, book, note) {
  must(!site.hasMarkers(book) && !site.hasMarkers(note), id + "：已经有记号了");
  const legacy = site.App.dualTrackModel(id, book, note);
  must(legacy.enabled, id + "：这张卡现在没有开对照，不迁移");
  const opaque = ["book", "note"].flatMap((p) => legacy[p].segments.filter((s) => /:opaque:/.test(s.key)));
  must(!opaque.length, id + "：有 " + opaque.length + " 段在对照里认不出标题（opaque），先人工看一下");
  const used = new Set(), ins = { book: [], note: [] };
  legacy.rows.forEach((r) => {
    if (r.kind === "content") return;
    const uid = r.kind === "entry" || r.kind === "group" ? newId(used) : "";
    ["book", "note"].forEach((p) => {
      const s = r[p];
      if (!s) return;
      const mark = r.kind === "section" ? "section:" + s.sec : r.kind === "station" ? "station:" + s.station
        : (r.kind === "group" ? "group:" : "card:") + uid;
      ins[p].push({ at: s.sourcePieces[0].start, mark });
    });
  });
  const insert = (raw, list, part) => {
    let out = raw;
    list.slice().sort((a, b) => b.at - a.at).forEach(({ at, mark }) => {
      must(at === 0 || out[at - 1] === "\n", id + " " + part + "：记号的位置不在行首（" + mark + "）");
      out = out.slice(0, at) + "<!-- " + mark + " -->\n\n" + out.slice(at);
    });
    return out;
  };
  const mb = insert(book, ins.book, "教材"), mn = insert(note, ins.note, "笔记");
  verifyCard(site, id, { book, note }, { book: mb, note: mn }, legacy);
  return { book: mb, note: mn, report: id + "：教材 " + ins.book.length + " 个记号、笔记 " + ins.note.length + " 个；对照 " + legacy.pairs.length + " 对，逐格一致" };
}

function verifyCard(site, id, before, after, legacy) {
  const App = site.App;
  must(site.stripMarkers(after.book) === before.book, id + "：教材去掉记号后和原文不一样");
  must(site.stripMarkers(after.note) === before.note, id + "：笔记去掉记号后和原文不一样");
  const issues = site.markerIssues(after.book, after.note);
  must(!issues.length, id + "：记号不完整：" + issues.slice(0, 5).join("；"));
  must(site.markMode(after.book, after.note) === "marked", id + "：迁移后不是按格子显示");
  const old = legacy || App.dualTrackModel(id, before.book, before.note);
  const now = App.dualTrackModel(id, after.book, after.note);
  must(now.marked && now.enabled, id + "：按格子的对照没有打开");
  must(now.pairs.length === old.pairs.length, id + "：配对数 " + old.pairs.length + " → " + now.pairs.length);
  must(now.rows.length === old.rows.length, id + "：对照行数 " + old.rows.length + " → " + now.rows.length);
  now.rows.forEach((r, i) => {
    const o = old.rows[i], at = id + " 第 " + (i + 1) + " 行（" + o.kind + "）";
    must(r.kind === o.kind && r.merged === o.merged, at + "：种类或合并不一样");
    ["book", "note"].forEach((p) => {
      must(!!r[p] === !!o[p], at + "：" + p + " 有没有不一样");
      if (!r[p]) return;
      ["sec", "station", "group", "line", "title", "num"].forEach((f) =>
        must(String(r[p][f]) === String(o[p][f]), at + "：" + p + "." + f + "「" + o[p][f] + "」→「" + r[p][f] + "」"));
      must(norm(r[p].html) === norm(o[p].html), at + "：" + p + " 这一格显示的内容不一样");
    });
    if (r.merged) must(norm(r.html) === norm(o.html), at + "：合并的标题行显示不一样");
  });
  must(plainView(App.dualTrackHtml(now)) === plainView(App.dualTrackHtml(old)), id + "：整个对照页面的 HTML 不一样");
  const J = JSON.stringify;
  must(J(site.cardOutline(after.book, after.note)) === J(site.cardOutline(before.book, before.note)), id + "：站卡小标题（cardOutline）不一样");
  must(J(site.cardStory(after.book)) === J(site.cardStory(before.book)), id + "：本卡主线（cardStory）不一样");
  must(J(App.stationMap(id, after)) === J(App.stationMap(id, before)), id + "：站牌的小节表（stationMap）不一样");
  const page = (t) => {
    const b = site.bookParts(t.book, App.stationDeco(id, t));
    return norm(b.main + b.tip) + "|" + norm(App.stationizeNote(site.noteMdHtml(t.note), t.note, id, t));
  };
  must(page(after) === page(before), id + "：整页显示（打印用）不一样");
}

module.exports = { migrateCard, verifyCard };
if (require.main === module) main(() => {
  const args = process.argv.slice(2);
  const site = loadSite();
  const subjects = loadSubjects(), notes = loadNotes();
  if (args[0] !== "migrate") {
    let n = 0;
    const bad = [];
    subjects.forEach((s) => s.items.forEach((it) => {
      const note = notes[it.id] || "";
      if (!site.hasMarkers(it.md) && !site.hasMarkers(note)) return;
      n++;
      site.markerIssues(it.md, note).forEach((x) => bad.push(it.id + "：" + x));
    }));
    must(!bad.length, "记号有问题：\n  " + bad.slice(0, 20).join("\n  "));
    console.log("✓ 带记号的卡 " + n + " 张，记号完整");
    return;
  }
  const write = args.includes("--write");
  const ids = args.slice(1).filter((a) => a !== "--write");
  const list = ids.length ? ids : DUAL;
  const done = [];
  list.forEach((id) => {
    const hit = findItem(id, subjects);
    must(hit, "找不到这张卡：" + id);
    must(Object.prototype.hasOwnProperty.call(notes, id), id + "：没有笔记");
    done.push({ id, ...migrateCard(site, id, hit.item.md, notes[id]) });
  });
  done.forEach((d) => console.log("✓ " + d.report));
  if (!write) { console.log("这是预演；全部通过后加 --write 写入"); return; }
  done.forEach((d) => {
    console.log("  教材 " + d.id + "：" + writeBook(d.id, d.book));
    console.log("  笔记 " + d.id + "：" + writeNote(d.id, d.note));
  });
  // 读回再核对一次
  const site2 = loadSite(), subjects2 = loadSubjects(), notes2 = loadNotes();
  done.forEach((d) => {
    const it = findItem(d.id, subjects2).item;
    must(it.md === d.book && notes2[d.id] === d.note, d.id + "：读回和迁移结果不一样");
    must(!site2.markerIssues(it.md, notes2[d.id]).length, d.id + "：读回后记号不完整");
  });
  console.log("✓ 已写入 " + done.length + " 张，读回核对通过");
});
