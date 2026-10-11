// 给 Gemini（AI Studio）打包一章的素材：整科其他章的教材 + 这一章全文（教材、笔记、决策流、本章总结），输出一个 .md，拖进对话即可。
// 只给材料，不带任务和格式要求（用户在对话里自己提）；网站用的隐藏记号行（<!-- section/station/group/card -->）去掉。
// 读的是工作区里的数据文件（先 git pull --ff-only，就是网站上的那一版）。
//
// 用法：
//   node tools/pack.cjs <目标卡id> [输出.md] [--only 定义,性质]
//   例：node tools/pack.cjs calc-int-antiderivative
//   --only：这一章只放列出的小节（按 <!-- section:… --> 记号切），不放决策流、本章总结
//
// 输出位置：默认 C:\Users\许志火\Downloads\Gemini素材-高等数学第3章.md
const fs = require("fs");
const path = require("path");
const os = require("os");
const { main, must, loadSubjects, loadNotes, findItem } = require("./lib.cjs");

// 只留列出的小节（按 section 记号切；第一个记号之前的开头部分保留）
function onlySections(md, names) {
  const out = [];
  let keep = true;
  for (const line of md.split("\n")) {
    const m = line.trim().match(/^<!-- section:(.+) -->$/);
    if (m) keep = names.includes(m[1]);
    if (keep) out.push(line);
  }
  return out.join("\n");
}

// 去掉记号行和紧跟的一个空行
function stripMarkers(md) {
  const lines = md.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^<!-- (section|station|group|card):.* -->$/.test(lines[i].trim())) {
      if (lines[i + 1] !== undefined && lines[i + 1].trim() === "") i++;
      continue;
    }
    out.push(lines[i]);
  }
  return out.join("\n");
}

const doc = (title, body) => '<document title="' + title + '">\n' + stripMarkers(body).trimEnd() + "\n</document>";

main(() => {
  const args = process.argv.slice(2);
  const oi = args.indexOf("--only");
  const only = oi >= 0 ? args.splice(oi, 2)[1].split(/[,，]/) : null;
  const [targetId, outArg] = args;
  must(targetId, "用法：node tools/pack.cjs <目标卡id> [输出.md] [--only 定义,性质]");
  const pick = (md) => (only ? onlySections(md, only) : md);
  const subjects = loadSubjects();
  const notes = loadNotes();
  const target = findItem(targetId, subjects);
  must(target, "找不到目标卡：" + targetId);

  const subj = target.subject;
  const subjName = subj.name.replace(/（.*$/, "");
  const chapters = subj.chapters.slice().sort((a, b) => a.order - b.order);
  const tch = chapters.find((c) => c.id === target.item.chapterId);
  const chLabel = (c) => "第" + c.order + "章「" + c.name + "」";

  const out = [];
  out.push("# " + subjName + " " + chLabel(tch) + " · 素材");
  out.push("");
  out.push("这是我的考研数学复习网站里" + subjName + "的内容，分两部分：");
  out.push("1. 其他各章的教材全文，用来了解哪些知识在前面章节已经有了、哪些要到后面才讲；");
  out.push("2. " + chLabel(tch) + (only ? "的〔" + only.join("〕〔") + "〕：教材和笔记。" : "的全部内容：教材、笔记、决策流、本章总结。"));
  out.push("");
  out.push("## 第 1 部分 · 其他各章的教材");
  out.push("");
  for (const c of chapters) {
    if (c.id === tch.id) continue;
    for (const it of subj.items.filter((i) => i.chapterId === c.id)) out.push(doc(chLabel(c) + " · 教材 · " + it.title, it.md), "");
  }
  out.push("## 第 2 部分 · " + chLabel(tch) + (only ? "〔" + only.join("〕〔") + "〕" : "全部内容"));
  out.push("");
  for (const it of subj.items.filter((i) => i.chapterId === tch.id)) {
    out.push(doc(chLabel(tch) + " · 教材 · " + it.title, pick(it.md)), "");
    if (notes[it.id]) out.push(doc(chLabel(tch) + " · 笔记 · " + it.title, pick(notes[it.id])), "");
  }
  for (const [key, name] of only ? [] : [["flow:", "决策流"], ["ch:", "本章总结"]]) {
    const k = key + subj.id + "/" + tch.id;
    if (notes[k]) out.push(doc(chLabel(tch) + " · " + name, notes[k]), "");
  }

  const text = out.join("\n");
  const file = outArg || path.join(os.homedir(), "Downloads", "Gemini素材-" + subjName + "第" + tch.order + "章.md");
  fs.writeFileSync(file, text, "utf8");
  const cjk = (text.match(/[\u3400-\u9fff\uff00-\uffef\u3000-\u303f]/g) || []).length;
  console.log("✓ " + file);
  console.log("  " + text.length + " 字符，约 " + Math.round((cjk * 0.9 + (text.length - cjk) / 3.5) / 1000) + "k token");
});
