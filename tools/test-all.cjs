// 提交前的总检查：逐个运行 tests/*.cjs，再跑全站体检（tools/check.cjs）。任何一项失败，退出码为 1。
// 在 bash 和 PowerShell 里都能用：node tools/test-all.cjs
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const { REPO } = require("./lib.cjs");

const run = (file) => {
  const r = cp.spawnSync(process.execPath, [file], { cwd: REPO, encoding: "utf8" });
  return { ok: r.status === 0, out: (r.stdout + r.stderr).trim() };
};
let failed = 0;
for (const f of fs.readdirSync(path.join(REPO, "tests")).filter((x) => x.endsWith(".cjs")).sort()) {
  const r = run(path.join("tests", f));
  console.log((r.ok ? "✓ " : "✗ ") + "tests/" + f);
  if (!r.ok) { failed++; console.log("    " + r.out.split("\n").slice(0, 12).join("\n    ")); }
}
const c = run(path.join("tools", "check.cjs"));
console.log(c.out.split("\n").map((l) => "  " + l).join("\n"));
if (!c.ok) failed++;
console.log(failed ? "✗ 有 " + failed + " 项没通过" : "✓ 全部通过");
process.exit(failed ? 1 : 0);
