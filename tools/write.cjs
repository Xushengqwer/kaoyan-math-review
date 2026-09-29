// 把用户确认过的草稿逐字写进网站数据。只替换这一条所在的那一行，写完读回核对：
// 这一条与草稿逐字相同，其他所有条目一个字节都没变。
//
// 用法：
//   node tools/write.cjs note <key> <草稿.md>     写进 notes.js 的这一条（已有就替换，没有就加在末尾）
//                                                key 例：la-eig-def-eigen（卡片笔记）、flow:linalg/eigen（决策流）、ch:linalg/eigen（章节总结）
//   node tools/write.cjs book <卡片id> <草稿.md>  写进这张卡的教材（数据文件里的 md 字段）
//
// 写完还要：node tools/supersede.cjs（登记旧版本）→ node tools/bump-sw.cjs → 测试与体检，见 AGENTS.md。
const { main, must, read, splitLines, writeLines, parseNotes, parseSubject, findItem, readDraft } = require("./lib.cjs");
const J = JSON.stringify;

function writeNote(key, text) {
  const rel = "assets/data/notes.js";
  const before = parseNotes(read(rel));
  const { lines, eol } = splitLines(read(rel));
  const head = "  " + J(key) + ": ";
  const k = lines.findIndex((l) => l.startsWith(head));
  if (k >= 0) {
    must(lines.filter((l) => l.startsWith(head)).length === 1, "notes.js 里这一条出现了不止一次：" + key);
    const comma = lines[k].endsWith(",") ? "," : "";
    must(lines[k] === head + J(before[key]) + comma, "notes.js 这一行的写法和预期不同，先人工看一下：" + key);
    if (before[key] === text) return "没有变化（网站上已经是这一版）";
    lines[k] = head + J(text) + comma;
  } else {
    const end = lines.lastIndexOf("});");
    must(end > 0, "notes.js 找不到结尾的 });");
    let last = end - 1;
    while (last > 0 && !lines[last].startsWith("  \"")) last--;
    must(last > 0, "notes.js 找不到最后一条");
    if (!lines[last].endsWith(",")) lines[last] += ",";
    lines.splice(last + 1, 0, head + J(text) + ",");
  }
  writeLines(rel, lines, eol);
  const after = parseNotes(read(rel));
  must(after[key] === text, "读回核对失败：写进去的和草稿不一样");
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  keys.delete(key);
  for (const x of keys) must(after[x] === before[x], "读回核对失败：别的条目被动到了：" + x);
  return (k >= 0 ? "替换" : "新增") + "，其他 " + keys.size + " 条不变";
}

function writeBook(itemId, text) {
  const hit = findItem(itemId);
  must(hit, "三个科目的数据文件里都找不到这张卡：" + itemId);
  const rel = hit.file;
  const before = parseSubject(read(rel));
  const { lines, eol } = splitLines(read(rel));
  const idLine = lines.findIndex((l) => l === "      id: " + J(itemId) + ",");
  must(idLine >= 0, rel + " 里找不到 id 行：" + itemId);
  let k = idLine + 1;
  while (k < lines.length && !lines[k].startsWith("      md: ") && !/^    \},?$/.test(lines[k])) k++;
  must(lines[k] && lines[k].startsWith("      md: "), rel + " 里这张卡没有单独一行的 md 字段：" + itemId);
  const comma = lines[k].endsWith(",") ? "," : "";
  must(lines[k] === "      md: " + J(hit.item.md) + comma, rel + " 里 md 这一行的写法和预期不同，先人工看一下：" + itemId);
  if (hit.item.md === text) return "没有变化（网站上已经是这一版）";
  lines[k] = "      md: " + J(text) + comma;
  writeLines(rel, lines, eol);
  const after = parseSubject(read(rel));
  const it = after.items.find((i) => i.id === itemId);
  must(it && it.md === text, "读回核对失败：写进去的和草稿不一样");
  must(J(after.chapters) === J(before.chapters), "读回核对失败：章节信息被动到了");
  must(after.items.length === before.items.length, "读回核对失败：卡片数量变了");
  before.items.forEach((b, i) => {
    const a = after.items[i];
    must(a.id === b.id, "读回核对失败：卡片顺序变了");
    must(J(a) === J(b.id === itemId ? { ...b, md: text } : b), "读回核对失败：别的内容被动到了：" + b.id);
  });
  return "替换（" + rel + "），其他 " + (before.items.length - 1) + " 张卡不变";
}

module.exports = { writeNote, writeBook };
if (require.main === module) main(() => {
  const [kind, id, file] = process.argv.slice(2);
  must(kind === "note" || kind === "book", "用法：node tools/write.cjs note|book <key 或 卡片id> <草稿.md>");
  must(id && file, "缺参数：需要 key（或卡片id）和草稿文件");
  const { text, notes } = readDraft(file);
  const msg = kind === "note" ? writeNote(id, text) : writeBook(id, text);
  console.log("✓ " + (kind === "note" ? "笔记 " : "教材 book:") + id + "：" + msg + "；" + text.length + " 字，与草稿逐字一致" +
    (notes.length ? "（读草稿时" + notes.join("、") + "）" : ""));
});
