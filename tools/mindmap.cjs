// 章节路线图（思维导图）：由 Claude 用代码画，文字与公式逐字来自内容文件，曲线由真实函数算出。
//
// 用法：
//   node tools/mindmap.cjs <内容文件.cjs> <输出.webp> [--html <输出.html>]
//   例：node tools/mindmap.cjs drafts/calculus-derivative-mindmap-v2.cjs drafts/calculus-derivative-mindmap-v2.webp
//
// 内容文件导出一个函数 (h) => spec，h 是下面的画图工具：
//   spec = { chapter: "第 2 章", name: "一元函数微分学", nameSize: 25（可选，章名太长时调小）, mainline: "从一点的变化率，\n看清整个函数", height: 900,
//            keyLabel: "本章重点",
//            stations: [{ n, name, color, bg, w, key, desc, fig, chips: [...] 或 groups: [[小标题, [...]], ...] }] }
//   文字里 $...$ 用网站同一套 KaTeX 排版，\n 换行。
// 导出：用本机 Edge（或 Chrome）无界面截图（2 倍分辨率），再用 ffmpeg 转成 webp。
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const { main, must, abs, read } = require("./lib.cjs");

const katex = require(abs("assets/vendor/katex/katex.min.js"));
const V = "assets/vendor/katex/";
const kcss = () => read(V + "katex.min.css").replace(/src:url\(fonts\/([^)]+?)\.woff2\)[^;}]*/g, (m, name) =>
  "src:url(data:font/woff2;base64," + fs.readFileSync(abs(V + "fonts/" + name + ".woff2")).toString("base64") + ") format(\"woff2\")");

// ---------- 画图工具（传给内容文件） ----------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const tx = (s) => s.split(/(\$[^$]+\$)/).map((p) => p.startsWith("$")
  ? '<span class="m">' + katex.renderToString(p.slice(1, -1), { throwOnError: true, strict: false, output: "html" }) + "</span>"
  : esc(p).replace(/\n/g, "<br>").replace(/（第 (\d+) 章）/g, '<span class="m">（第&nbsp;$1&nbsp;章）</span>')).join("");
const W = 200, H = 162, AX = "#2b2b2b";
function frame(xr, yr, box = [16, 10, 194, 138]) {
  const [x0, y0, x1, y1] = box;
  return {
    X: (x) => x0 + (x - xr[0]) / (xr[1] - xr[0]) * (x1 - x0),
    Y: (y) => y1 - (y - yr[0]) / (yr[1] - yr[0]) * (y1 - y0),
  };
}
function pathOf(f, a, b, X, Y, n = 120, clip) {
  let d = "", pen = false;
  for (let i = 0; i <= n; i++) {
    const x = a + (b - a) * i / n, y = f(x);
    if (clip && (y < clip[0] || y > clip[1])) { pen = false; continue; }
    d += (pen ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1) + " ";
    pen = true;
  }
  return d;
}
const arrowDefs = `<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="${AX}"/></marker></defs>`;
const axes = (ox, oy, x1 = 196, y1 = 6) =>
  `<line x1="8" y1="${oy}" x2="${x1}" y2="${oy}" stroke="${AX}" stroke-width="1.6" marker-end="url(#ah)"/>` +
  `<line x1="${ox}" y1="146" x2="${ox}" y2="${y1}" stroke="${AX}" stroke-width="1.6" marker-end="url(#ah)"/>`;
const lab = (x, y, s, opt = {}) => `<text x="${x}" y="${y}" font-family="'Times New Roman',serif" font-style="${opt.upright ? "normal" : "italic"}" font-size="${opt.size || 13}" fill="${opt.color || AX}" text-anchor="${opt.anchor || "middle"}">${s}</text>`;
const zh = (x, y, s, color, size = 11, anchor = "middle") => `<text x="${x}" y="${y}" font-family="'HarmonyOS Sans SC','Microsoft YaHei',sans-serif" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="600">${s}</text>`;
const dot = (x, y, c, r = 4.2, hollow = false) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${hollow ? "#fff" : c}" stroke="${c}" stroke-width="${hollow ? 1.8 : 1.2}"/>`;
const svg = (body) => `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg">${arrowDefs}${body}</svg>`;
const helpers = { tx, esc, frame, pathOf, axes, lab, zh, dot, svg, AX };

// ---------- 排版 ----------
function render(spec) {
  const height = spec.height || 900, GAP = 10, LEFT = 266, lineY = 86;
  let x = LEFT;
  const cols = spec.stations.map((s) => { const c = { ...s, x }; x += s.w + GAP; return c; });
  must(x - GAP <= 1672, "各站宽度加起来超出画布：" + (x - GAP));
  const cx = (c) => c.x + c.w / 2;
  const keys = cols.filter((c) => c.key);
  const key = keys.length ? (() => {
    const k0 = keys[0].x + 6, k1 = keys[keys.length - 1].x + keys[keys.length - 1].w - 6, w = k1 - k0;
    return `<div class="key" style="left:${k0}px;width:${w}px"><svg width="${w}" height="30" viewBox="0 0 ${w} 30"><path d="M2 28 V8 Q2 4 6 4 H${w - 6} Q${w - 2} 4 ${w - 2} 8 V28" stroke="#b07be8" stroke-width="3" fill="none"/></svg><span>${esc(spec.keyLabel || "本章重点")}</span></div>`;
  })() : "";
  const list = (arr) => arr.map((t) => `<div class="chip">${tx(t)}</div>`).join("");
  const card = (c) => `
<section class="col" style="left:${c.x}px;width:${c.w}px">
  <div class="top" style="background:${c.bg}">
    <h2 style="color:${c.color}">${esc(c.name)}</h2>
    <div class="desc">${tx(c.desc)}</div>
    <div class="fig">${c.fig || ""}</div>
  </div>
  <div class="stem"></div>
  ${c.chips ? list(c.chips) : ""}
  ${c.groups ? c.groups.map(([h, l]) => `<div class="ghead" style="color:${c.color}">${tx(h)}</div>` + list(l)).join("") : ""}
</section>`;
  const wave = `M250 ${lineY + 10} C 420 ${lineY - 18}, 560 ${lineY + 18}, 760 ${lineY} S 1180 ${lineY - 16}, 1400 ${lineY + 2} S 1600 ${lineY + 14}, 1672 ${lineY - 4}`;
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>${esc(spec.chapter + " " + spec.name)}</title>
<style>${kcss()}</style>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1672px;height:${height}px;background:#fff;overflow:hidden}
body{font-family:'HarmonyOS Sans SC','Microsoft YaHei',sans-serif;color:#1f2430;position:relative}
.katex{font-size:1.06em}
.m{display:inline-block;white-space:nowrap}
.title{position:absolute;left:12px;top:44px;width:242px;height:330px;border-radius:20px;background:linear-gradient(160deg,#16489e,#0d3a86);color:#fff;padding:26px 22px;box-shadow:0 6px 18px rgba(13,58,134,.25)}
.title .ch{font-size:46px;font-weight:700;letter-spacing:2px}
.title .nm{font-size:${spec.nameSize || 25}px;letter-spacing:.5px;font-weight:700;margin-top:6px;white-space:nowrap}
.title hr{border:0;border-top:2px solid rgba(255,255,255,.55);margin:16px 0 14px}
.title .ml{font-size:22px;font-weight:700}
.title .mt{font-size:21px;line-height:1.45;margin-top:4px;font-weight:600}
.main{position:absolute;left:0;top:0}
.num{position:absolute;top:${lineY - 30}px;width:60px;height:60px;border-radius:50%;color:#fff;font:700 34px/56px 'HarmonyOS Sans SC',sans-serif;text-align:center;border:3px solid #fff;box-shadow:0 0 0 2px rgba(0,0,0,.08),0 4px 10px rgba(0,0,0,.18)}
.key{position:absolute;top:8px;height:30px}
.key span{position:absolute;left:50%;top:-4px;transform:translateX(-50%);background:#fff;padding:0 14px;font-size:24px;font-weight:700;color:#7b3fd0;letter-spacing:2px}
.col{position:absolute;top:${lineY + 36}px}
.top{border-radius:16px;padding:12px 10px 6px;box-shadow:0 2px 8px rgba(30,40,70,.08)}
h2{font-size:22px;font-weight:700;text-align:center;letter-spacing:.5px;white-space:nowrap}
.desc{background:rgba(255,255,255,.82);border-radius:10px;padding:8px 9px;margin-top:9px;font-size:14.5px;line-height:1.6;min-height:90px}
.fig{margin-top:6px;height:178px;display:flex;flex-direction:column;justify-content:center}
.stem{width:3px;height:10px;background:#c9ced8;margin:0 auto}
.chip{background:#f1f3f7;border:1px solid #e3e7ee;border-radius:10px;padding:6px 9px;margin-top:6px;font-size:14px;line-height:1.5}
.ghead{margin-top:8px;text-align:center;font-weight:700;font-size:15px;background:#dfe2fb;border-radius:9px;padding:3px 0}
.legend{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:2px 6px;font-size:11.5px;font-weight:600;color:#4a5060;margin-top:2px}
.legend i{display:inline-block;width:18px;height:0;margin-right:2px;vertical-align:middle}
.chain{display:flex;align-items:center;justify-content:center;gap:2px}
.cn{width:40px;height:40px;border-radius:50%;border:2.5px solid;background:#fff;display:flex;align-items:center;justify-content:center;font-size:17px}
.ca{display:flex;flex-direction:column;align-items:center;font-size:12px}
.cl{margin-bottom:-2px}
.chain-sub{text-align:center;font-size:12.5px;color:#4a5060;margin-top:6px}
</style></head><body>
<svg class="main" width="1672" height="140" viewBox="0 0 1672 140"><path d="${wave}" stroke="#2f7be8" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/></svg>
${key}
${cols.map((c) => `<div class="num" style="left:${cx(c) - 30}px;background:${c.color}">${c.n}</div>`).join("")}
<div class="title"><div class="ch">${esc(spec.chapter)}</div><div class="nm">${esc(spec.name)}</div><hr><div class="ml">一条主线：</div><div class="mt">${tx(spec.mainline)}</div></div>
${cols.map(card).join("")}
</body></html>`;
}

function browser() {
  const c = [process.env.MINDMAP_BROWSER,
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe"].filter(Boolean);
  const b = c.find((p) => fs.existsSync(p));
  must(b, "找不到 Edge 或 Chrome；可用环境变量 MINDMAP_BROWSER 指定");
  return b;
}

main(() => {
  const args = process.argv.slice(2);
  const hi = args.indexOf("--html");
  const htmlOut = hi >= 0 ? args.splice(hi, 2)[1] : null;
  const [specFile, out] = args;
  must(specFile && out && /\.webp$/i.test(out), "用法：node tools/mindmap.cjs <内容文件.cjs> <输出.webp> [--html <输出.html>]");
  const spec = require(path.resolve(specFile))(helpers);
  const html = render(spec);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mindmap-"));
  const htmlFile = path.join(tmp, "map.html"), png = path.join(tmp, "map.png");
  fs.writeFileSync(htmlFile, html, "utf8");
  if (htmlOut) fs.writeFileSync(htmlOut, html, "utf8");
  const r = spawnSync(browser(), ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2",
    `--user-data-dir=${path.join(tmp, "profile")}`,
    `--window-size=1672,${spec.height || 900}`, `--screenshot=${png}`, "file:///" + htmlFile.replace(/\\/g, "/")], { encoding: "utf8" });
  // 新版 Edge 的 msedge.exe 只是启动器，会先返回，截图稍后才写出：等文件出现、大小不再变化
  const nap = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  for (let i = 0, last = -1; i < 120; i++) {
    const size = fs.existsSync(png) ? fs.statSync(png).size : -1;
    if (size > 0 && size === last) break;
    last = size;
    nap(250);
  }
  must(fs.existsSync(png), "截图失败：" + (r.stderr || "").slice(-300));
  const f = spawnSync("ffmpeg", ["-loglevel", "error", "-y", "-i", png, "-c:v", "libwebp", "-quality", "92", path.resolve(out)], { encoding: "utf8" });
  must(f.status === 0, "ffmpeg 转换失败：" + (f.stderr || "").slice(-300));
  try { fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 400 }); } catch (e) { /* 浏览器还占着临时目录，留给系统清理 */ }
  console.log("✓ 路线图：" + out + "（" + Math.round(fs.statSync(out).size / 1024) + " KB）");
});
