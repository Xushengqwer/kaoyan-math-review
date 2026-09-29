// 存档：把要被替换或删除的条目原文导出成一个 .md（格式与网站「导出」相同，正文夹在两行标记之间，逐字节原样）。
// 取的是 git HEAD 里的版本，也就是网站上现在的那一版；写完逐条核对存档里的正文与原文完全相同。
//
// 用法：
//   node tools/archive.cjs <输出.md> "<存档标题>" <条目> [<条目> ...]
//   条目：笔记写 key（如 la-eig-def-eigen、flow:linalg/eigen、ch:linalg/eigen），教材写 book:<卡片id>
//
// 输出位置：本机时放 C:\Users\许志火\Downloads\，文件名如「线性代数-第4章XX存档（YY前）-2026-09-29.md」。
const fs = require("fs");
const path = require("path");
const { main, must, loadNotes, loadSubjects, findItem } = require("./lib.cjs");

const OPEN = "<!-- ↓ 正文开始 · 到「正文结束」为止逐字节原样，请勿改动 -->";
const close = (id) => "<!-- ↑ 正文结束 · " + id + " -->";

main(() => {
  const [out, title, ...ids] = process.argv.slice(2);
  must(out && title && ids.length, "用法：node tools/archive.cjs <输出.md> \"<存档标题>\" <条目>...");
  must(!fs.existsSync(out), "输出文件已存在，换个名字，免得覆盖旧存档：" + out);
  const N = loadNotes("HEAD");
  const subjects = loadSubjects("HEAD");
  const chapterName = (sid, cid) => {
    const s = subjects.find((x) => x.id === sid);
    const c = s && s.chapters.find((x) => x.id === cid);
    return s && c ? s.name + " · 第" + c.order + "章 " + c.name : sid + "/" + cid;
  };
  const blocks = ids.map((id) => {
    let body, where, name, fmt;
    if (id.startsWith("book:")) {
      const hit = findItem(id.slice(5), subjects);
      must(hit, "HEAD 里找不到这张卡：" + id);
      body = hit.item.md;
      where = chapterName(hit.subject.id, hit.item.chapterId) + " · 卡" + (hit.item.card || "") + " · 教材内容";
      name = hit.item.title; fmt = "教材 Markdown";
    } else {
      must(id in N, "HEAD 里找不到这条笔记：" + id);
      body = N[id];
      const m = id.match(/^(ch|flow):([^/]+)\/(.+)$/);
      if (m) { where = chapterName(m[2], m[3]); name = m[1] === "ch" ? "本章总结" : "决策流"; }
      else {
        const hit = findItem(id, subjects);
        where = hit ? chapterName(hit.subject.id, hit.item.chapterId) + " · 卡" + (hit.item.card || "") : "笔记";
        name = hit ? hit.item.title : id;
      }
      fmt = "Markdown";
    }
    return { id, body, text: ["> **" + where + "**", "> " + name + "　·　`" + id + "`　·　" + fmt, "", OPEN, "", body, "", close(id), ""].join("\n") };
  });
  const parts = ["# " + title, "", "本文件保存改动前的原文（取自 git HEAD，即当时网站上的版本），格式与网站导出一致。", ""];
  blocks.forEach((b, i) => parts.push("---", "", "<!-- 第 " + (i + 1) + " / " + blocks.length + " 条 -->", b.text));
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  fs.writeFileSync(out, parts.join("\n"), "utf8");
  const saved = fs.readFileSync(out, "utf8");
  blocks.forEach((b) => must(saved.includes(OPEN + "\n\n" + b.body + "\n\n" + close(b.id)), "存档核对失败：" + b.id));
  console.log("✓ 存档 " + blocks.length + " 条，逐字核对通过：" + path.resolve(out));
});
