// 登记旧版本：凡是 notes.js、各科教材（md）、思维导图（mindmaps.js）里改过、删掉的条目，
// 把 git HEAD 里那一版的指纹记进 superseded.js。
// 用户浏览器里存着的本地副本如果正好是旧版，打开网页时会自动清掉，不会冒充「本地已改」盖住新版。
//
// 用法：改完数据文件、提交之前运行一次（可重复运行，不会重复登记）：
//   node tools/supersede.cjs
//
// 规则：旧版一律取 git HEAD，新版取工作区；删掉的条目也登记；笔记只差 $ 的（规整后相同）不必登记。
const { main, must, read, gitShow, splitLines, writeLines, loadSubjects, loadNotes, parseSuperseded } = require("./lib.cjs");
const vm = require("vm");

main(() => {
  // 指纹函数取自网站自己的 storage.js，保证和浏览器里算的一样
  const st = read("assets/js/storage.js");
  const src = st.slice(st.indexOf("function textFingerprint"), st.indexOf("function isSuperseded"));
  must(src.length > 0, "storage.js 里找不到 textFingerprint");
  const textFingerprint = vm.runInNewContext(src + "\ntextFingerprint;");
  const norm = (s) => String(s || "").replace(/\r\n/g, "\n").split("$").join("").trim();

  const N0 = loadNotes("HEAD"), N1 = loadNotes();
  const mdOf = (subjects) => Object.fromEntries(subjects.flatMap((s) => s.items.map((i) => [i.id, i.md])));
  const md0 = mdOf(loadSubjects("HEAD")), md1 = mdOf(loadSubjects());

  const maps = (src) => { const got = {}; vm.runInNewContext(src, { registerMindMaps: (m) => Object.assign(got, m) }); return got; };
  const M0 = maps(gitShow("assets/data/mindmaps.js")), M1 = maps(read("assets/data/mindmaps.js"));

  const noteReg = [], bookReg = [], imageReg = [], skipped = [];
  for (const id of Object.keys(M0)) {
    if (M1[id] && M1[id].sha256 === M0[id].sha256) continue;
    imageReg.push([id, M0[id].sha256, M1[id] ? M1[id].sha256 : null]);
  }
  for (const id of Object.keys(N0)) {
    if (N1[id] === N0[id]) continue;
    if (N1[id] != null && norm(N1[id]) === norm(N0[id])) { skipped.push(id); continue; }
    noteReg.push([id, textFingerprint(norm(N0[id])), N1[id] == null ? null : textFingerprint(norm(N1[id]))]);
  }
  for (const id of Object.keys(md0)) {
    if (md1[id] === md0[id]) continue;
    bookReg.push([id, textFingerprint(md0[id]), md1[id] == null ? null : textFingerprint(md1[id])]);
  }

  const rel = "assets/data/superseded.js";
  const { lines, eol } = splitLines(read(rel));
  const add = (section, id, fp, newFp) => {
    const start = lines.findIndex((l) => l === "  " + section + ": {");
    must(start >= 0, "superseded.js 里找不到 " + section + " 段");
    let end = start + 1;
    while (lines[end] !== "  }," && lines[end] !== "  }") end++;
    must(fp !== newFp, "旧版与新版指纹相同：" + id);
    const k = lines.findIndex((l, j) => j > start && j < end && l.startsWith("    " + JSON.stringify(id) + ":"));
    if (k >= 0) {
      const list = JSON.parse(lines[k].match(/^    "[^"]+": (\[.*\]),$/)[1]);
      must(newFp == null || !list.includes(newFp), "新版的指纹已经在旧版列表里：" + id);
      if (!list.includes(fp)) list.push(fp);
      lines[k] = "    " + JSON.stringify(id) + ": " + JSON.stringify(list) + ",";
    } else {
      lines.splice(start + 1, 0, "    " + JSON.stringify(id) + ": " + JSON.stringify([fp]) + ",");
    }
  };
  noteReg.forEach(([id, fp, n]) => add("notes", id, fp, n));
  bookReg.forEach(([id, fp, n]) => add("book", id, fp, n));
  imageReg.forEach(([id, fp, n]) => add("images", id, fp, n));
  if (noteReg.length || bookReg.length || imageReg.length) writeLines(rel, lines, eol);

  const S = parseSuperseded(read(rel));
  const done = (sec, reg) => reg.every(([id, fp, n]) => S[sec][id].includes(fp) && (n == null || !S[sec][id].includes(n)));
  must(done("notes", noteReg) && done("book", bookReg) && done("images", imageReg), "登记后核对失败");
  const names = (reg) => reg.map((r) => r[0] + (r[2] == null ? "（删除）" : "")).join("、") || "无";
  console.log("✓ 笔记登记 " + noteReg.length + " 条：" + names(noteReg));
  console.log("✓ 教材登记 " + bookReg.length + " 条：" + names(bookReg));
  console.log("✓ 思维导图登记 " + imageReg.length + " 张：" + names(imageReg));
  if (skipped.length) console.log("  只差 $、不必登记：" + skipped.join("、"));
});
