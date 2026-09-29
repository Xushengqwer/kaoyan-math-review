// 逐字核对：网站数据里的这一条，和用户确认过的草稿是否完全相同（交付前的最后一道检查）。
//
// 用法：
//   node tools/verify.cjs note <key> <草稿.md>
//   node tools/verify.cjs book <卡片id> <草稿.md>
//   加 --rev <提交>（如 --rev HEAD、--rev origin/main）核对某次提交里的版本；不加就核对工作区。
//
// 草稿读入时只做三件事：去 BOM、CRLF 统一成 LF、去掉末尾空白（和写入时一样）。
const { main, must, loadNotes, loadSubjects, findItem, readDraft, firstDiff } = require("./lib.cjs");

main(() => {
  const args = process.argv.slice(2);
  const r = args.indexOf("--rev");
  const rev = r >= 0 ? args.splice(r, 2)[1] : null;
  const [kind, id, file] = args;
  must((kind === "note" || kind === "book") && id && file, "用法：node tools/verify.cjs note|book <key 或 卡片id> <草稿.md> [--rev 提交]");
  const { text } = readDraft(file);
  let site;
  if (kind === "note") {
    const N = loadNotes(rev);
    must(id in N, "找不到这条笔记：" + id);
    site = N[id];
  } else {
    const hit = findItem(id, loadSubjects(rev));
    must(hit, "找不到这张卡：" + id);
    site = hit.item.md;
  }
  const d = firstDiff(site, text);
  const where = (rev ? rev : "工作区") + " 的 " + (kind === "book" ? "book:" : "") + id;
  if (!d) { console.log("✓ 逐字一致：" + where + "（" + text.length + " 字）"); return; }
  console.log("✗ 不一致：" + where + "\n  第 " + d.line + " 行附近（第 " + d.index + " 个字符）\n  网站：" + d.site + "\n  草稿：" + d.draft);
  process.exit(1);
});
