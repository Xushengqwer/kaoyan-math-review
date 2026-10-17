// 给 Gemini 的开场白：把 docs/gemini-kickoff.md 的两段模板填好，拼成一章能直接复制的成品。
// 学习方法两段直接从 docs/learning-method.md 的代码块里抽，不手抄；章名、站名从数据文件里读。
//
// 用法：
//   node tools/kickoff.cjs <卡片id> [输出.md]
//   例：node tools/kickoff.cjs calc-vec-coordinates
//
// 输出位置：默认 C:\Users\许志火\Downloads\给Gemini的开场白-高等数学第4章.md
const fs = require("fs");
const path = require("path");
const os = require("os");
const { main, must, read, loadSubjects, findItem } = require("./lib.cjs");

// 取「标题行」之后的第一个 ```text 代码块的内容
function blockAfter(md, heading) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const h = lines.findIndex((l) => l.trim() === heading);
  must(h >= 0, "找不到标题：" + heading);
  const s = lines.findIndex((l, i) => i > h && /^```text\s*$/.test(l));
  must(s > h, heading + " 下面没有 ```text 代码块");
  const e = lines.findIndex((l, i) => i > s && /^```\s*$/.test(l));
  must(e > s, heading + " 的代码块没有结尾");
  return lines.slice(s + 1, e).join("\n");
}

main(() => {
  const [targetId, outArg] = process.argv.slice(2);
  must(targetId, "用法：node tools/kickoff.cjs <卡片id> [输出.md]");
  const subjects = loadSubjects();
  const target = findItem(targetId, subjects);
  must(target, "找不到这张卡：" + targetId);
  const subj = target.subject;
  const ch = subj.chapters.find((c) => c.id === target.item.chapterId);
  const subjName = subj.name.replace(/（.*$/, "");

  // 站列表：教材〔定义〕〔性质〕里的站名行「**① 名字**」，同一站只取一次，按圈号排（有的站定义并进了性质卡，只在〔性质〕里）
  const byMark = new Map();
  let sec = "";
  for (const l of target.item.md.split("\n")) {
    const m = l.trim().match(/^<!-- section:(.+) -->$/);
    if (m) sec = m[1];
    const st = (sec === "定义" || sec === "性质") && l.trim().match(/^\*\*(([①②③④⑤⑥⑦⑧⑨⑩][′']?)[\s\S]*?)\*\*$/);
    if (st && !byMark.has(st[2])) byMark.set(st[2], st[1].trim());
  }
  const stations = [...byMark.keys()].sort((a, b) => a.codePointAt(0) - b.codePointAt(0) || a.length - b.length).map((k) => byMark.get(k));
  must(stations.length, "这张卡的〔定义〕〔性质〕里没有站名行");

  const tpl = read("docs/gemini-kickoff.md");
  const lm = read("docs/learning-method.md");
  const stage1 = blockAfter(tpl, "## 第一段：〔定义〕〔性质〕");
  const stage2 = blockAfter(tpl, "## 第二段：〔意义〕〔例题〕");
  const method = blockAfter(lm, "## 给 AI 的版本");
  const appMethod = blockAfter(lm.slice(lm.indexOf("## 意义和例题怎么推")), "### 给 AI 的版本");

  const fill = (t) => t
    .replace("{科目}", subjName).replace("{N}", String(ch.order)).replace("{章名}", ch.name)
    .replace("{站列表}", stations.join(" → "))
    .replace("{learning-method.md「给 AI 的版本」代码块}", method)
    .replace("{learning-method.md「意义和例题怎么推 · 给 AI 的版本」代码块}", appMethod);
  const one = fill(stage1), two = fill(stage2);
  must(!/\{[^}\n]*\}/.test(one.replace(/\$[^$]*\$/g, "")) && !/\{learning-method/.test(two), "模板里还有没填的占位");

  const title = subjName + "第" + ch.order + "章「" + ch.name + "」";
  const out = [
    "# 给 Gemini 的开场白 · " + title,
    "",
    "由 `node tools/kickoff.cjs " + targetId + "` 按 docs/gemini-kickoff.md 生成。两段各在一个新对话里用，代码块里的整段复制过去。",
    "",
    "## 第一段：〔定义〕〔性质〕（附素材包：`node tools/pack.cjs " + targetId + " --only 定义,性质 --deps none`）",
    "",
    "```text", one, "```",
    "",
    "## 第二段：〔意义〕〔例题〕（定义、性质都弄懂以后；附素材包：`node tools/pack.cjs " + targetId + " <输出> --only 意义,例题 --deps none`）",
    "",
    "```text", two, "```",
    "",
  ].join("\n");
  const file = outArg || path.join(os.homedir(), "Downloads", "给Gemini的开场白-" + subjName + "第" + ch.order + "章.md");
  fs.writeFileSync(file, out, "utf8");
  console.log("✓ " + file + "（" + stations.length + " 站：" + stations.join(" → ") + "）");
});
