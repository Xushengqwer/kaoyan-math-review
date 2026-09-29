// 提交用户从网站导出的「待提交笔记 / 教材」文件：每一条正文夹在
//   <!-- ↓ 正文开始 · … -->  和  <!-- ↑ 正文结束 · <id> -->
// 之间（两侧各空一行），id 以 book: 开头的是教材，其余是笔记。逐条原样写进网站并读回核对。
//
// 用法：
//   node tools/apply-export.cjs <导出文件.md>          先列出每一条（新增 / 替换 / 没变化），不写
//   node tools/apply-export.cjs <导出文件.md> --write  真正写入
//
// 用户的文字一个字都不改。发现格式问题（KaTeX 报错、漏出记号等）只报告，改不改由用户决定。
const fs = require("fs");
const { main, must, loadNotes, findItem } = require("./lib.cjs");
const { writeNote, writeBook } = require("./write.cjs");

main(() => {
  const [file, flag] = process.argv.slice(2);
  must(file && fs.existsSync(file), "用法：node tools/apply-export.cjs <导出文件.md> [--write]");
  let raw = fs.readFileSync(file, "utf8");
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  const crlf = raw.includes("\r\n");
  raw = raw.replace(/\r\n/g, "\n");
  const re = /<!-- ↓ 正文开始 · [^\n]*-->\n\n([\s\S]*?)\n\n<!-- ↑ 正文结束 · ([^\n]+?) -->/g;
  const entries = [];
  let m;
  while ((m = re.exec(raw))) entries.push({ id: m[2], body: m[1] });
  must(entries.length, "文件里没有找到「正文开始 / 正文结束」夹住的条目");
  const opens = (raw.match(/<!-- ↓ 正文开始/g) || []).length;
  must(opens === entries.length, "有 " + opens + " 个「正文开始」，只配上了 " + entries.length + " 条：检查两侧是否各空一行");
  must(new Set(entries.map((e) => e.id)).size === entries.length, "同一个 id 出现了两次");

  const N = loadNotes();
  entries.forEach((e) => {
    const isBook = e.id.startsWith("book:");
    const cur = isBook ? (findItem(e.id.slice(5)) || {}).item : null;
    must(!isBook || cur, "找不到这张卡：" + e.id);
    const old = isBook ? cur.md : N[e.id];
    e.state = old == null ? "新增" : old === e.body ? "没变化" : "替换";
  });
  console.log("共 " + entries.length + " 条" + (crlf ? "（文件是 CRLF 换行，已按 LF 读）" : "") + "：");
  entries.forEach((e) => console.log("  " + e.state + "　" + e.id + "（" + e.body.length + " 字）"));
  if (flag !== "--write") { console.log("这是预览；确认无误后加 --write 写入"); return; }
  entries.filter((e) => e.state !== "没变化").forEach((e) => {
    const msg = e.id.startsWith("book:") ? writeBook(e.id.slice(5), e.body) : writeNote(e.id, e.body);
    console.log("✓ " + e.id + "：" + msg);
  });
});
