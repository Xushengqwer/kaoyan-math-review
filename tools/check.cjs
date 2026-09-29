// 体检：KaTeX 严格解析 + 用网站自己的渲染函数查漏出的 ** / == / $、意外的代码块。
//
// 用法：
//   node tools/check.cjs                 全站：所有教材与笔记（提交前必跑）
//   node tools/check.cjs note <草稿.md>  一份笔记草稿（卡片笔记、决策流、章节总结都算笔记）
//   node tools/check.cjs book <草稿.md>  一份教材草稿
//
// 有任何问题，退出码为 1。
const { main, must, loadSubjects, loadNotes, readDraft, makeChecker } = require("./lib.cjs");

main(() => {
  const [kind, file] = process.argv.slice(2);
  const check = makeChecker();
  const problems = [];
  const report = (label, r) => {
    r.katex.forEach((x) => problems.push(label + " · KaTeX：" + x));
    r.stray.forEach((x) => problems.push(label + " · 漏出记号：" + x));
    if (r.pre > 0) problems.push(label + " · 有 " + r.pre + " 处被当成代码块（多半是行首缩进 4 格）");
  };

  if (!kind) {
    let nBook = 0, nNote = 0, nMath = 0;
    loadSubjects().forEach((s) => s.items.forEach((it) => {
      const r = check(it.md, "book"); nBook++; nMath += r.math; report(s.id + "/" + it.id + " 教材", r);
    }));
    Object.entries(loadNotes()).forEach(([k, v]) => {
      if (!String(v).trim()) return;
      const r = check(v, "note"); nNote++; nMath += r.math; report(k + " 笔记", r);
    });
    console.log("教材 " + nBook + " 张，笔记 " + nNote + " 条，公式 " + nMath + " 个");
  } else {
    must(kind === "note" || kind === "book", "第一个参数是 note 或 book");
    must(file, "缺草稿文件路径");
    const { text, notes } = readDraft(file);
    const r = check(text, kind);
    report(file, r);
    const heads = (r.html.match(/<h[1-6][ >]/g) || []).length;
    console.log("字符 " + text.length + "，公式 " + r.math + " 个，标题 " + heads + " 个" + (notes.length ? "（读入时" + notes.join("、") + "）" : ""));
  }

  if (problems.length) {
    console.log("✗ 发现 " + problems.length + " 处问题：\n  " + problems.slice(0, 30).join("\n  "));
    process.exit(1);
  }
  console.log("✓ KaTeX 报错 0，漏出记号 0，意外代码块 0");
});
