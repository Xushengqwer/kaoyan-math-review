// 内容上线一条命令（2026-10-20）：Antigravity 里的模型代替 Claude 跑，不用做任何判断。
// 在任何目录都能跑（自己切到仓库根目录）：
//   node E:\AI_lunwen\kaoyan-math-review\tools\publish.cjs          预览：开工检查、这次上哪几份、各节条数前后；除了 git pull 什么都不改
//   node E:\AI_lunwen\kaoyan-math-review\tools\publish.cjs --go     上线：存档 → 写入 → supersede → bump-sw → test-all → 提交 → 推送 → 等上线 → 镜像 → 方向文件进度
//   node E:\AI_lunwen\kaoyan-math-review\tools\publish.cjs --undo   撤销最近一次上线（只认本工具的提交）：数据文件回到上线前，缓存版本号照样 +1，推送、等上线、镜像
//
// 交稿：镜像 待提交/ 里的 .md（格式见 docs/mirror-gemini.md「交稿格式」），按文件名顺序。只上 Claude 审过的（drafts/审过/ 里一字不差、
//   没有「（待写）」），而且是排在第一份没审过的前面那几份；没审过的后面又有审过的，整个不上（先上后面的会乱序）。
// 任何一步失败：立刻停，不推送；推送前失败的，自己改过的文件恢复原样、交稿文件挪回 待提交/，打印「停在第几步、仓库现在什么状态、请叫 Claude」。
// 结构改动、代码改动不走这里（Claude 做）。
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const { REPO, read, readDraft, loadSubjects, loadNotes, loadSite, findItem } = require("./lib.cjs");
const H = require("./apply-handoff.cjs");
const { DEFAULT_DIR: MIRROR, SHARED } = require("./mirror.cjs");

const PENDING = path.join(MIRROR, "待提交");
const PROXY = "http://127.0.0.1:7897";
const PREFIX = "上线（publish.cjs）：", UNDO_PREFIX = "撤销上线（publish.cjs）：";
const SELF = path.join(REPO, "tools", "publish.cjs");
const SUBJ = { calculus: "高数", linalg: "线代", probability: "概率" };

class Stop extends Error {}
const stop = (msg) => { throw new Stop(msg); };
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const indent = (text, n = 4) => String(text).trim().split("\n").filter((l) => l.trim()).map((l) => " ".repeat(n) + l).join("\n");
const tail = (text, n) => String(text).trim().split("\n").slice(-n).join("\n");

function git(args, opts = {}) {
  const r = cp.spawnSync("git", ["-c", "core.quotepath=false", ...args], { cwd: REPO, encoding: "utf8", maxBuffer: 64 << 20, ...opts });
  if (r.error) stop("git 跑不起来：" + r.error.message);
  return { ok: r.status === 0, out: (r.stdout || "").trim(), err: (r.stderr || "").trim() };
}
const gitOk = (args, what) => { const r = git(args); if (!r.ok) stop(what + "：" + tail(r.err || r.out, 6)); return r.out; };
function node(script, args = [], env = {}) {
  const r = cp.spawnSync(process.execPath, [path.join(REPO, "tools", script), ...args],
    { cwd: REPO, encoding: "utf8", maxBuffer: 64 << 20, env: { ...process.env, ...env } });
  return { ok: r.status === 0, out: ((r.stdout || "") + (r.stderr || "")).trim() };
}
const head = () => gitOk(["rev-parse", "HEAD"], "读 HEAD");
const lf = (t) => String(t).replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");

// 已跟踪、有改动的文件（不管 drafts/ 里那些没跟踪的）
function dirtyTracked() {
  const r = cp.spawnSync("git", ["-c", "core.quotepath=false", "status", "--porcelain=v1", "-z", "--untracked-files=no"], { cwd: REPO, encoding: "utf8" });
  if (r.status !== 0) stop("git status 没成功：" + (r.stderr || "").trim());
  // 每一项是「XY 路径」，开头两位状态可能是空格，不能 trim
  return r.stdout.split("\0").filter(Boolean).map((e) => e.slice(3));
}
// 共同维护的两份：mirror.cjs 从镜像抄回仓库、还没提交的，和镜像里一字不差就跟这次一起提交
function sharedPending() {
  return SHARED.filter(([rel, name]) => {
    const inMirror = path.join(MIRROR, name);
    return fs.existsSync(inMirror) && lf(fs.readFileSync(path.join(REPO, rel), "utf8")) === lf(fs.readFileSync(inMirror, "utf8"));
  }).map(([rel]) => rel);
}

// ── 第 1 步：开工检查 ──
function preflight() {
  const branch = gitOk(["rev-parse", "--abbrev-ref", "HEAD"], "读分支");
  if (branch !== "main") stop("仓库不在 main 上（现在是 " + branch + "）");
  const shared = sharedPending();
  const dirty = dirtyTracked().filter((f) => !shared.includes(f));
  if (dirty.length) stop("仓库里有没提交的改动（Claude 可能正在改）：" + dirty.join("、"));
  const pull = git(["-c", "http.proxy=" + PROXY, "pull", "--ff-only"]);
  if (!pull.ok) stop("git pull 没成功（网络或代理 127.0.0.1:7897？）：" + tail(pull.err || pull.out, 4));
  const h = head(), remote = git(["rev-parse", "origin/main"]).out;
  if (h !== remote) stop("本地 main 和 GitHub 上的不一样（有没推送的提交）：HEAD " + h.slice(0, 7) + "，origin/main " + remote.slice(0, 7));
  return { start: h, shared: dirtyTracked().filter((f) => shared.includes(f)) };
}

// 待提交/ 里这次能上的：文件名顺序、审过、没有（待写）的前面几份
function pickDrafts() {
  if (!fs.existsSync(PENDING)) stop("找不到镜像的 待提交/：" + PENDING);
  const all = fs.readdirSync(PENDING).filter((f) => f.endsWith(".md")).sort().map((f) => path.join(PENDING, f));
  const info = all.map((file) => {
    const state = H.reviewState(file);
    let h = null, pending = 0, bad = "";
    try { h = H.parseHandoff(readDraft(file).text); pending = H.pendingCards(h); } catch (e) { bad = e.message; }
    return { file, name: path.basename(file), state, h, pending, bad, ready: state === "审过" && !pending && !bad };
  });
  const k = info.findIndex((x) => !x.ready);
  const ready = k < 0 ? info : info.slice(0, k), later = k < 0 ? [] : info.slice(k);
  const why = (x) => x.bad ? "格式有错：" + x.bad : x.state !== "审过" ? x.state : "还有 " + x.pending + " 张卡写着（待写）";
  const blocked = later.filter((x) => x.ready);
  if (blocked.length) stop(blocked.map((x) => x.name).join("、") + " 审过了，但排在前面的 " + later[0].name + "（" + why(later[0]) + "）还不能上：" +
    "等它审完一起上（先上后面的会乱序）");
  for (const x of ready) if (fs.existsSync(path.join(PENDING, "已提交", x.name))) stop("待提交/已提交/ 里已经有同名的 " + x.name + "（以前交过？）");
  if (!ready.length) stop("待提交/ 里没有能上线的稿" + (later.length ? "：" + later.map((x) => x.name + "（" + why(x) + "）").join("、") + "；先请 Claude 审" : "（是空的）"));
  return { ready, later, why };
}

// 一张卡各节的条数：教材〔定义〕〔性质〕〔意义〕，笔记〔例题〕〔提示〕
function counts(site, book, note) {
  const o = site.cardOutline(book, note), n = {};
  for (const [part, sec] of [["book", "定义"], ["book", "性质"], ["book", "意义"], ["note", "例题"], ["note", "提示"], ["book", "提示"]])
    n[sec] = (n[sec] || 0) + o.blocks.reduce((s, b) => s + (b.rows[part + sec] || { items: [] }).items.length, 0);
  return n;
}
function countLine(card, a, b) {
  const secs = ["定义", "性质", "意义", "例题", "提示"];
  const changed = secs.filter((s) => a[s] !== b[s]).map((s) => s + " " + a[s] + " → " + b[s]);
  const same = secs.filter((s) => a[s] === b[s] && (a[s] || b[s])).map((s) => s + " " + a[s]);
  return card + "：" + (changed.join("、") || "条数不变") + (same.length && changed.length ? "（" + same.join("、") + " 不变）" : "");
}
function chapterOf(card, subjects) {
  const hit = findItem(card, subjects);
  const ch = hit.subject.chapters.find((c) => c.id === hit.item.chapterId);
  return SUBJ[hit.subject.id] + "第" + ch.order + "章";
}
function lastPublish() {
  const log = git(["log", "-n", "200", "--format=%H%x09%s"]).out.split("\n").filter(Boolean).map((l) => l.split("\t"));
  const hit = log.find(([, s]) => s.startsWith(PREFIX) || s.startsWith(UNDO_PREFIX));
  return hit ? { hash: hit[0], subject: hit[1], undone: hit[1].startsWith(UNDO_PREFIX) } : null;
}

// ── 预览 ──
// 工具自己的输出里给 Claude 看的提示（apply-handoff 的「加 --write」「下一步」）不转给 Antigravity，免得它照着跑
const forAntigravity = (out) => out.split("\n").filter((l) => !/^(✓ 预览通过|下一步：)/.test(l.trim())).join("\n");

function preview({ step }) {
  let ready, later, why, shared;
  step(1, "开工检查", () => {
    ({ shared } = preflight());
    console.log("  ✓ 在 main 上、没有没提交的改动、已拉到最新（" + head().slice(0, 7) + "）");
    for (const f of shared) console.log("  · " + f + " 是从镜像 共同维护/ 抄回来的，会跟这次一起提交");
    const last = lastPublish();
    if (last) console.log("  最近一次" + (last.undone ? "撤销" : "上线") + "：" + last.hash.slice(0, 7) + " " + last.subject);
    ({ ready, later, why } = pickDrafts());
    for (const x of later) console.log("  · 这次不上：" + x.name + "（" + why(x) + "）");
  });
  step(2, "交稿体检（预览，不写）", () => {
    const r = node("apply-handoff.cjs", ready.map((x) => x.file));
    console.log(indent(forAntigravity(r.out), 2));
    if (!r.ok) stop("交稿体检没过（见上面 ✗ 那几行）");
  });
  // 在内存里接一遍，算各节条数前后（记号随便给，不影响条数）
  const subjects = loadSubjects(), notes = loadNotes(), site = loadSite();
  const bases = {};
  for (const x of ready) { const c = x.h.head["卡片"], hit = findItem(c, subjects); bases[c] = bases[c] || { book: hit.item.md, note: notes[c] || "" }; }
  let k = 0;
  const out = H.applyAll(bases, ready.map((x) => ({ h: x.h })), () => "zz" + String(k++).padStart(2, "0"));
  console.log("\n这次上线 " + ready.length + " 份：" + ready.map((x) => x.name).join("、"));
  for (const c of Object.keys(out)) console.log("  " + countLine(c, counts(site, bases[c].book, bases[c].note), counts(site, out[c].book, out[c].note)));
  console.log("\n--go 会依次：存档到 Downloads → 写入 → supersede → bump-sw → test-all → 提交 → 推送 → 等上线 → 重新生成镜像 → 方向文件进度补一句");
  console.log("✓ 预览完，什么都没改。用户同意后跑：node " + SELF + " --go");
}

// ── 回滚：推送前失败时，把自己改过的恢复原样 ──
function makeRollback(start, files, ready, unstage) {
  const saved = new Map(files.map((rel) => [rel, fs.readFileSync(path.join(REPO, rel))]));
  const snaps = new Map(ready.map((x) => [x.name, fs.readFileSync(path.join(H.REVIEWED, x.name))]));
  const notesBefore = new Set(ready.filter((x) => { const n = H.reviewNotes(x.file); return n && fs.existsSync(n); }).map((x) => x.name));
  return () => {
    const done = [];
    const h = git(["rev-parse", "HEAD"]).out;
    if (h && h !== start) {
      const parent = git(["rev-parse", "HEAD~1"]).out, subject = git(["log", "-1", "--format=%s"]).out;
      if (parent === start && (subject.startsWith(PREFIX) || subject.startsWith(UNDO_PREFIX))) {
        git(["reset", "-q", "--soft", start]);
        done.push("撤回了本地提交（没推送）");
      } else done.push("⚠ HEAD 不是这次的提交，git 没动");
    }
    for (const [rel, buf] of saved) {
      const abs = path.join(REPO, rel);
      if (!fs.existsSync(abs) || !fs.readFileSync(abs).equals(buf)) fs.writeFileSync(abs, buf);
    }
    git(["reset", "-q", "--", ...unstage]);
    done.push("数据文件、sw.js 回到开工前");
    let moved = 0;
    for (const x of ready) {
      const doneFile = path.join(PENDING, "已提交", x.name);
      if (!fs.existsSync(x.file) && fs.existsSync(doneFile)) { fs.renameSync(doneFile, x.file); moved++; }
      const n = H.reviewNotes(x.file);
      if (n && notesBefore.has(x.name) && !fs.existsSync(n)) {
        const nd = path.join(path.dirname(n), "已提交", x.name);
        if (fs.existsSync(nd)) fs.renameSync(nd, n);
      }
      const snap = path.join(H.REVIEWED, x.name);
      if (!fs.existsSync(snap)) { fs.mkdirSync(H.REVIEWED, { recursive: true }); fs.writeFileSync(snap, snaps.get(x.name)); }
    }
    if (ready.length) done.push("交稿文件挪回 待提交/（" + moved + " 份）、审过的记录恢复");
    return done;
  };
}

// 第 5 步 test-all；没过就把 ✗ 那几项的头几行带出来
function testAll() {
  const r = node("test-all.cjs");
  if (r.ok) return;
  const lines = r.out.split("\n"), bad = [];
  lines.forEach((l, i) => { if (/^✗/.test(l)) bad.push(l, ...lines.slice(i + 1, i + 6).filter((x) => /^    /.test(x))); });
  stop("测试没过：\n" + indent(bad.slice(0, 30).join("\n") || tail(r.out, 20)));
}

function commitWith(message, files) {
  gitOk(["add", "--", ...files], "git add");
  const r = git(["commit", "-q", "-F", "-"], { input: message });
  if (!r.ok) stop("git commit 没成功：" + tail(r.err || r.out, 4));
}

function push() {
  for (let i = 1; i <= 3; i++) {
    const r = git(["-c", "http.proxy=" + PROXY, "push", "origin", "main"]);
    if (r.ok && git(["rev-parse", "origin/main"]).out === head()) return;
    if (i === 3) stop("推送三次都没成功（网络或代理 127.0.0.1:7897？）：" + tail(r.err || r.out, 4));
    sleep(5000);
  }
}

// 第 10 步：镜像 共同维护/<章>-意义例题方向.md 的「**进度**」那一行末尾补一句；找不到就跳过
function noteProgress(chapters, sentence) {
  for (const ch of chapters) {
    const file = path.join(MIRROR, "共同维护", ch + "-意义例题方向.md");
    if (!fs.existsSync(file)) { console.log("  · 没有 共同维护/" + ch + "-意义例题方向.md，进度没补（不要紧）"); continue; }
    const text = fs.readFileSync(file, "utf8"), eol = text.includes("\r\n") ? "\r\n" : "\n";
    const lines = text.split(eol), k = lines.findIndex((l) => /^\*\*进度\*\*/.test(l));
    if (k < 0) { console.log("  · " + ch + "-意义例题方向.md 里没有「**进度**」那一行，进度没补（不要紧）"); continue; }
    lines[k] = lines[k].replace(/\s+$/, "") + " " + sentence;
    fs.writeFileSync(file, lines.join(eol), "utf8");
    console.log("  ✓ " + ch + "-意义例题方向.md 进度补了一句");
  }
}

const today = () => { const d = new Date(); return String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
const swVersion = () => (read("sw.js").match(/kaoyan-math-v(\d+)/) || [])[1];
const DATA = ["assets/data/calculus.js", "assets/data/linalg.js", "assets/data/probability.js", "assets/data/notes.js", "assets/data/superseded.js", "sw.js"];

// 推送以后的几步：等上线、镜像、进度；失败只报告，不回滚（内容已经在 GitHub 上）
function afterPush(step, chapters, sentence) {
  step(8, "等上线（wait-live）", () => {
    const r = node("wait-live.cjs", [], { HTTPS_PROXY: PROXY, NODE_USE_ENV_PROXY: "1" });
    if (!r.ok) stop("5 分钟内没等到网站更新：" + tail(r.out, 2));
    console.log(indent(tail(r.out, 1)));
  });
  step(9, "重新生成镜像（mirror）", () => {
    const r = node("mirror.cjs");
    if (!r.ok) stop("镜像没生成：" + tail(r.out, 4));
    console.log(indent(r.out));
  });
  step(10, "方向文件进度", () => noteProgress(chapters, sentence));
}

function runSteps(fn) {
  let current = 0, label = "", rollback = null, pushed = false, commit = "";
  const step = (n, name, body) => { current = n; label = name; console.log("第 " + n + " 步 " + name); body(); };
  try {
    fn({ step, setRollback: (r) => { rollback = r; }, setPushed: (h) => { pushed = true; commit = h; } });
  } catch (e) {
    const msg = e instanceof Stop ? e.message : (e.stack || String(e));
    console.error("\n✗ 停在第 " + current + " 步（" + label + "）：" + msg);
    if (pushed) console.error("  仓库现在：已推送 " + commit.slice(0, 7) + "（内容已在 GitHub 上），后面几步没做完");
    else if (rollback) {
      let done;
      try { done = rollback(); } catch (r) { done = ["⚠ 恢复时出错：" + r.message + "（数据文件可能还是改过的样子）"]; }
      console.error("  仓库现在：没推送；" + done.join("；") + "（存档留在 Downloads，不碍事）");
    } else console.error("  仓库现在：什么都没改，没推送");
    console.error("  请叫 Claude（把上面这几行原样给它）");
    process.exit(1);
  }
}

// ── 上线 ──
function go() {
  runSteps(({ step, setRollback, setPushed }) => {
    let start, shared, ready;
    step(1, "开工检查", () => {
      ({ start, shared } = preflight());
      ({ ready } = pickDrafts());
      console.log("  ✓ 接 " + ready.length + " 份：" + ready.map((x) => x.name).join("、"));
    });
    const subjects = loadSubjects(), site = loadSite();
    const cards = [...new Set(ready.map((x) => x.h.head["卡片"]))];
    for (const c of cards) if (!findItem(c, subjects)) stop("找不到卡片 " + c);
    const notes0 = loadNotes();
    const before = Object.fromEntries(cards.map((c) => [c, counts(site, findItem(c, subjects).item.md, notes0[c] || "")]));
    const v0 = swVersion();
    setRollback(makeRollback(start, DATA, ready, DATA.concat(shared)));
    let applied = "", chapters = [], sentence = "";
    step(2, "存档、写入（apply-handoff --write）", () => {
      const r = node("apply-handoff.cjs", [...ready.map((x) => x.file), "--write"]);
      applied = r.out;
      console.log(indent(forAntigravity(r.out)));
      if (!r.ok) stop("交稿没接上（见上面）");
    });
    step(3, "登记旧版本（supersede）", () => { const r = node("supersede.cjs"); console.log(indent(r.out)); if (!r.ok) stop("supersede 失败"); });
    step(4, "缓存版本号 +1（bump-sw）", () => { const r = node("bump-sw.cjs"); console.log(indent(r.out)); if (!r.ok) stop("bump-sw 失败"); });
    step(5, "全部测试（test-all）", () => { testAll(); console.log("    ✓ 全部通过"); });
    let hash = "";
    step(6, "提交", () => {
      const changed = dirtyTracked();
      const extra = changed.filter((f) => !DATA.includes(f) && !shared.includes(f));
      if (extra.length) stop("除了数据文件、sw.js 还改到了：" + extra.join("、"));
      if (!changed.includes("sw.js") || !changed.some((f) => f.startsWith("assets/data/") && f !== "assets/data/superseded.js")) stop("数据文件或 sw.js 没变，不对劲");
      const subjects1 = loadSubjects(), notes1 = loadNotes();
      chapters = [...new Set(cards.map((c) => chapterOf(c, subjects1)))];
      const lines = applied.split("\n");
      const what = lines.filter((l, i) => /^交稿：/.test(l) || (/^  \S/.test(l) && !/^  (✓ 存档|审稿意见|只审改动)/.test(l) && lines.slice(0, i).some((x) => /^交稿：/.test(x))))
        .filter((l) => !/^(✓|下一步)/.test(l));
      const archives = lines.map((l) => (l.match(/✓ 存档 \d+ 条，逐字核对通过：(.+)$/) || [])[1]).filter(Boolean);
      const msg = [PREFIX + chapters.join("、") + " 接 " + ready.length + " 份交稿（" + ready.map((x) => x.name.replace(/\.md$/, "").replace(/^(高数|线代|概率)第\d+章-/, "")).join("、") + "），缓存升至 v" + swVersion(), "",
        ...what.map((l) => "- " + l.trim()),
        "- 条数：" + cards.map((c) => countLine(c, before[c], counts(site, findItem(c, subjects1).item.md, notes1[c] || ""))).join("；"),
        "- 存档：" + (archives.join("、") || "（没找到存档路径）"),
        ...(shared.length ? ["- 共同维护抄回：" + shared.join("、")] : []),
        "- 缓存 v" + v0 + " → v" + swVersion() + "；由 tools/publish.cjs 生成"].join("\n") + "\n";
      commitWith(msg, changed);
      hash = head();
      console.log("    ✓ " + hash.slice(0, 7) + " " + msg.split("\n")[0]);
      sentence = today() + " 上线 " + ready.map((x) => x.name.replace(/\.md$/, "").replace(/^(高数|线代|概率)第\d+章-/, "")).join("、") +
        "（`" + hash.slice(0, 7) + "`，缓存 v" + swVersion() + "，publish.cjs）。";
    });
    step(7, "推送", () => { push(); setPushed(hash); console.log("    ✓ 已推送 " + hash.slice(0, 7)); });
    afterPush(step, chapters, sentence);
    console.log("\n✓ 上线完成：" + hash.slice(0, 7) + "，缓存 v" + swVersion() + "。要撤销就跑 node " + SELF + " --undo（先问用户）");
  });
}

// ── 撤销最近一次上线 ──
function undo() {
  runSteps(({ step, setRollback, setPushed }) => {
    let start, shared, target, files;
    step(1, "开工检查", () => {
      ({ start, shared } = preflight());
      const last = lastPublish();
      if (!last) stop("最近 200 个提交里没有 publish.cjs 的上线提交");
      if (last.undone) stop("最近一次上线已经撤销过了（" + last.hash.slice(0, 7) + " " + last.subject + "）；再往前的请叫 Claude");
      target = last;
      files = gitOk(["diff-tree", "--no-commit-id", "--name-only", "-r", target.hash], "读那次提交改了哪些文件").split("\n")
        .filter((f) => f.startsWith("assets/data/"));
      if (!files.length) stop("那次提交没改数据文件，不对劲");
      const later = files.filter((f) => git(["rev-parse", "HEAD:" + f]).out !== git(["rev-parse", target.hash + ":" + f]).out);
      if (later.length) stop("上线以后 " + later.join("、") + " 又改过，不能自动撤销");
      console.log("  ✓ 撤销 " + target.hash.slice(0, 7) + " " + target.subject);
    });
    const cards = (() => {
      const now = loadSubjects(), was = loadSubjects(target.hash + "~1"), n1 = loadNotes(), n0 = loadNotes(target.hash + "~1");
      return now.flatMap((s) => s.items).filter((it) => { const old = findItem(it.id, was); return !old || old.item.md !== it.md || n0[it.id] !== n1[it.id]; }).map((it) => it.id);
    })();
    setRollback(makeRollback(start, DATA, [], DATA.concat(shared)));
    step(2, "数据文件回到上线前", () => {
      gitOk(["checkout", target.hash + "~1", "--", ...files], "取回上线前的数据文件");
      git(["reset", "-q", "--", ...files]);
      console.log("    ✓ " + files.join("、"));
    });
    step(3, "登记旧版本（supersede）", () => { const r = node("supersede.cjs"); console.log(indent(r.out)); if (!r.ok) stop("supersede 失败"); });
    step(4, "缓存版本号 +1（bump-sw）", () => { const r = node("bump-sw.cjs"); console.log(indent(r.out)); if (!r.ok) stop("bump-sw 失败"); });
    step(5, "全部测试（test-all）", () => { testAll(); console.log("    ✓ 全部通过"); });
    let hash = "";
    step(6, "提交", () => {
      const changed = dirtyTracked();
      const extra = changed.filter((f) => !DATA.includes(f) && !shared.includes(f));
      if (extra.length) stop("除了数据文件、sw.js 还改到了：" + extra.join("、"));
      const msg = UNDO_PREFIX + target.subject.slice(PREFIX.length).replace(/，缓存升至 v\d+$/, "") + "，缓存升至 v" + swVersion() + "\n\n- 撤销 " + target.hash.slice(0, 7) + "：" + files.join("、") + " 回到它之前的样子（交稿文件还在 待提交/已提交/）\n" +
        "- 缓存照样 +1，升至 v" + swVersion() + "；由 tools/publish.cjs --undo 生成\n";
      commitWith(msg, changed);
      hash = head();
      console.log("    ✓ " + hash.slice(0, 7) + " " + msg.split("\n")[0]);
    });
    step(7, "推送", () => { push(); setPushed(hash); console.log("    ✓ 已推送 " + hash.slice(0, 7)); });
    const chapters = [...new Set(cards.map((c) => chapterOf(c, loadSubjects())))];
    afterPush(step, chapters, today() + " 撤销了 `" + target.hash.slice(0, 7) + "` 那次上线（`" + hash.slice(0, 7) + "`，缓存 v" + swVersion() + "）。");
    console.log("\n✓ 撤销完成：" + hash.slice(0, 7) + "，缓存 v" + swVersion() + "。交稿文件还在 待提交/已提交/，要重新上线请叫 Claude");
  });
}

if (require.main === module) {
  process.chdir(REPO);
  const args = process.argv.slice(2);
  const bad = args.filter((a) => !["--go", "--undo"].includes(a));
  if (bad.length || args.length > 1) { console.error("✗ 用法：node " + SELF + " [--go | --undo]（不加是预览）"); process.exit(1); }
  if (args[0] === "--go") go();
  else if (args[0] === "--undo") undo();
  else runSteps(preview);
}
