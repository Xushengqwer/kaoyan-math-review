// 删除一条笔记或一整张卡。必须先用 tools/archive.cjs 存档：这里会检查存档文件里有这一条的原文，没有就拒绝删除。
//
// 用法：
//   node tools/remove.cjs note <key> --archived <存档.md>        从 notes.js 删掉这一条
//   node tools/remove.cjs item <卡片id> --archived <存档.md>     从数据文件删掉这张卡（整块）；它的笔记另用 note 删
//
// 删完读回核对：只少了这一条，其他一个字节都没变。之后同样要 supersede → bump-sw → 测试。
const fs = require("fs");
const { main, must, read, splitLines, writeLines, parseNotes, parseSubject, findItem } = require("./lib.cjs");
const J = JSON.stringify;
const OPEN = "<!-- ↓ 正文开始 · 到「正文结束」为止逐字节原样，请勿改动 -->";
const close = (id) => "<!-- ↑ 正文结束 · " + id + " -->";

main(() => {
  const args = process.argv.slice(2);
  const a = args.indexOf("--archived");
  const archive = a >= 0 ? args.splice(a, 2)[1] : null;
  const [kind, id] = args;
  must((kind === "note" || kind === "item") && id, "用法：node tools/remove.cjs note|item <key 或 卡片id> --archived <存档.md>");
  must(archive && fs.existsSync(archive), "先用 tools/archive.cjs 存档，再用 --archived 指明存档文件");
  const saved = fs.readFileSync(archive, "utf8");

  if (kind === "note") {
    const rel = "assets/data/notes.js";
    const before = parseNotes(read(rel));
    must(id in before, "notes.js 里没有这一条：" + id);
    must(saved.includes(OPEN + "\n\n" + before[id] + "\n\n" + close(id)), "存档里没有这条笔记的原文，拒绝删除：" + id);
    const { lines, eol } = splitLines(read(rel));
    const k = lines.findIndex((l) => l.startsWith("  " + J(id) + ": "));
    must(k >= 0 && lines.filter((l) => l.startsWith("  " + J(id) + ": ")).length === 1, "notes.js 里这一行找不到或不唯一：" + id);
    lines.splice(k, 1);
    writeLines(rel, lines, eol);
    const after = parseNotes(read(rel));
    must(!(id in after) && Object.keys(after).length === Object.keys(before).length - 1, "读回核对失败");
    for (const x of Object.keys(after)) must(after[x] === before[x], "读回核对失败：别的条目被动到了：" + x);
    console.log("✓ 已删除笔记 " + id + "，其他 " + Object.keys(after).length + " 条不变");
    return;
  }

  const hit = findItem(id);
  must(hit, "找不到这张卡：" + id);
  must(saved.includes(OPEN + "\n\n" + hit.item.md + "\n\n" + close("book:" + id)), "存档里没有这张卡的教材原文，拒绝删除：" + id);
  const rel = hit.file;
  const before = parseSubject(read(rel));
  const { lines, eol } = splitLines(read(rel));
  const idLine = lines.findIndex((l) => l === "      id: " + J(id) + ",");
  must(idLine > 0 && lines[idLine - 1] === "    {", rel + " 里这张卡的开头和预期不同：" + id);
  let end = idLine;
  while (end < lines.length && !/^    \},?$/.test(lines[end])) end++;
  must(end < lines.length, rel + " 里找不到这张卡的结尾：" + id);
  lines.splice(idLine - 1, end - idLine + 2);
  writeLines(rel, lines, eol);
  const after = parseSubject(read(rel));
  must(J(after.chapters) === J(before.chapters), "读回核对失败：章节信息被动到了");
  must(J(after.items) === J(before.items.filter((i) => i.id !== id)), "读回核对失败：别的卡被动到了");
  console.log("✓ 已删除卡片 " + id + "（" + rel + "），其他 " + after.items.length + " 张不变。它的笔记如果有，另用 note 删");
});
