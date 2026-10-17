// 生成给 Antigravity（Gemini 写稿）用的只读镜像：全部章节的可读 markdown + 规矩文档 + 交稿文件夹。
// 内容取 git 的某一版（默认 HEAD，就是推送上线的那一版），不带工作区里没提交的改动。
// 每次推送后跑一次（CLAUDE.md「提交导出的固定步骤」第 5 条）。
//
// 用法：
//   node tools/mirror.cjs [镜像目录] [--rev HEAD]     --rev work：用工作区（没提交的也算，自己试的时候用）
//   默认目录：E:\AI_lunwen\kaoyan-mirror（仓库旁边，路径全是英文，Antigravity 打开不出问题）
//
// 镜像里：
//   GEMINI.md      给 Gemini 的写稿守则（docs/mirror-gemini.md）：Antigravity 每个对话自动读工作区根目录的这个文件
//   章节/          每章一个文件：教材 + 笔记（含意义、例题、提示）+ 决策流 + 本章总结，卡片记号行保留
//   规矩/          学习方法、内容组织原则、网站排版规则、进度（只读）
//   共同维护/      设计口味、写作格式要求：以镜像里这份为准，用户和 Antigravity 可以改；
//                  没有就从仓库 docs/ 抄一份，和仓库工作区那份不一样就抄回仓库（要提交，git 里留底）
//   待提交/        交稿文件放这里；提交后挪进 待提交/已提交/
// 重新生成时只删 GEMINI.md、README.md（旧版的说明）、章节/、规矩/ 再写；共同维护/、待提交/ 从不删。目录里要有 .kaoyan-mirror 才会删东西。
const fs = require("fs");
const path = require("path");
const { main, must, REPO, read, gitShow, loadSubjects, loadNotes } = require("./lib.cjs");
const cp = require("child_process");

const DEFAULT_DIR = path.resolve(REPO, "..", "kaoyan-mirror");
const MARK = ".kaoyan-mirror";
const SITE = "https://xushengqwer.github.io/kaoyan-math-review/";
const RULES = [
  ["docs/learning-method.md", "学习方法.md"],
  ["docs/architecture.md", "内容组织原则.md"],
  ["docs/site-format.md", "网站排版规则.md"],
  ["docs/status.md", "进度.md"],
];
// 共同维护：[仓库里的备份, 镜像里的正本]
const SHARED = [
  ["docs/reviewer-taste.md", "共同维护/设计口味.md"],
  ["docs/gemini-kickoff.md", "共同维护/写作格式要求.md"],
];

const safe = (s) => s.replace(/[\\/:*?"<>|]/g, "-");
const doc = (title, body) => '<document title="' + title + '">\n' + String(body).trimEnd() + "\n</document>";

function chapterFiles(subjects, notes, stamp) {
  const files = [];
  const index = ["# 目录", "", stamp, ""];
  for (const s of subjects) {
    const sname = s.name.replace(/（.*$/, "");
    index.push("## " + sname, "");
    for (const c of s.chapters.slice().sort((a, b) => a.order - b.order)) {
      const items = s.items.filter((i) => i.chapterId === c.id);
      const rel = path.join("章节", sname, "第" + String(c.order).padStart(2, "0") + "章-" + safe(c.name) + ".md");
      const out = [
        "# " + sname + " 第" + c.order + "章「" + c.name + "」", "",
        stamp + " 网站上这一章：" + SITE + "#" + s.id + "/" + c.id, "",
        "只读。`<!-- section:… -->`、`<!-- station:… -->`、`<!-- group:… -->`、`<!-- card:… -->` 是网站看不见的记号行：" +
        "小节、站、分组、卡片的边界只认它们，同一个 card id = 同一张卡的教材、笔记两半（意义 n 和例题 n 也共用一个）。交稿时用 card id 指认一张卡。", "",
      ];
      for (const it of items) {
        out.push("## 卡片：" + it.title + "（id：" + it.id + "）", "");
        out.push(doc(sname + " 第" + c.order + "章 · 教材 · " + it.title, it.md), "");
        if (notes[it.id]) out.push(doc(sname + " 第" + c.order + "章 · 笔记 · " + it.title, notes[it.id]), "");
      }
      for (const [key, name] of [["flow:", "决策流"], ["ch:", "本章总结"]]) {
        const k = key + s.id + "/" + c.id;
        if (notes[k]) out.push("## " + name, "", doc(sname + " 第" + c.order + "章 · " + name, notes[k]), "");
      }
      files.push([rel, out.join("\n").trimEnd() + "\n"]);
      index.push("- 第" + c.order + "章「" + c.name + "」：" + items.map((i) => "`" + i.id + "`").join("、") +
        " → `" + rel.replace(/\\/g, "/") + "`");
    }
    index.push("");
  }
  files.push([path.join("章节", "目录.md"), index.join("\n").trimEnd() + "\n"]);
  return files;
}

function build(dir, rev) {
  const work = rev === "work", r = work ? "HEAD" : rev;
  const git = (cmd) => cp.execSync("git " + cmd, { cwd: REPO, encoding: "utf8" }).trim();
  const hash = git("rev-parse --short " + r) + (work ? "+工作区" : "");
  const when = git("log -1 --format=%ci " + r).slice(0, 16);
  const stamp = "（生成自仓库 " + hash + "，" + when + "；Claude 每次推送后重新生成，别在这里改。）";
  const src = (rel) => (work ? read(rel) : gitShow(rel, r));
  const files = chapterFiles(work ? loadSubjects() : loadSubjects(r), work ? loadNotes() : loadNotes(r), stamp);
  for (const [rel, name] of RULES) files.push([path.join("规矩", name), src(rel)]);
  files.push(["GEMINI.md", src("docs/mirror-gemini.md").replace("{生成说明}", stamp)]);
  return { files: files.map(([rel, text]) => [rel, text.replace(/\r\n/g, "\n")]), hash };
}

// 共同维护的文件：镜像里没有就从仓库抄过去；有、而且和仓库那份不一样，就抄回仓库（保持仓库原来的换行符）
function syncShared(dir, repo = REPO) {
  const lf = (t) => t.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const report = [];
  for (const [rel, name] of SHARED) {
    const inRepo = path.join(repo, rel), inMirror = path.join(dir, name);
    const repoText = fs.readFileSync(inRepo, "utf8");
    if (!fs.existsSync(inMirror)) {
      fs.mkdirSync(path.dirname(inMirror), { recursive: true });
      fs.writeFileSync(inMirror, lf(repoText), "utf8");
      report.push("新建 " + name);
      continue;
    }
    const mirrorText = lf(fs.readFileSync(inMirror, "utf8"));
    if (mirrorText === lf(repoText)) continue;
    fs.writeFileSync(inRepo, repoText.includes("\r\n") ? mirrorText.replace(/\n/g, "\r\n") : mirrorText, "utf8");
    report.push(name + " 有改动，已抄回 " + rel + "（要提交）");
  }
  return report;
}

function write(dir, files, hash) {
  if (fs.existsSync(dir)) {
    const entries = fs.readdirSync(dir);
    must(!entries.length || entries.includes(MARK), "目录已存在、不是空的，也不是镜像（没有 " + MARK + "），不动它：" + dir);
    for (const name of ["GEMINI.md", "README.md", "章节", "规矩"]) fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
  fs.mkdirSync(path.join(dir, "待提交", "已提交"), { recursive: true });
  fs.writeFileSync(path.join(dir, MARK), "tools/mirror.cjs 生成的只读镜像；当前版本 " + hash + "\n", "utf8");
  for (const [rel, text] of files) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), text, "utf8");
  }
}

module.exports = { build, write, syncShared, SHARED, DEFAULT_DIR };
if (require.main === module) main(() => {
  const args = process.argv.slice(2);
  const ri = args.indexOf("--rev");
  const rev = ri >= 0 ? args.splice(ri, 2)[1] : "HEAD";
  const dir = path.resolve(args[0] || DEFAULT_DIR);
  const { files, hash } = build(dir, rev);
  write(dir, files, hash);
  for (const line of syncShared(dir)) console.log("  " + line);
  const waiting = fs.readdirSync(path.join(dir, "待提交")).filter((f) => f.endsWith(".md"));
  console.log("✓ 镜像 " + dir + "：" + files.length + " 个文件，版本 " + hash +
    (waiting.length ? "；待提交里有 " + waiting.length + " 份：" + waiting.join("、") : "；待提交是空的"));
});
