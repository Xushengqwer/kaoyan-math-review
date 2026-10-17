// 曲面示意图（第 4 章第⑤站等）：由 Claude 用代码画，曲面、截痕、母线都由真实方程算出，输出 SVG。
//
// 用法：
//   node tools/surface-fig.cjs <内容文件.cjs> <输出目录> [--only 名字,名字] [--gallery <预览.html>] [--png <预览.png>]
//   例：node tools/surface-fig.cjs drafts/calculus-vec-surfaces-v1.cjs assets/images/surfaces --gallery drafts/surfaces-gallery.html
//
// 内容文件导出 (h) => [figure, ...]，h 是下面的小工具（h.M 是 Math）。figure：
//   { name: "hyperboloid-1", title: "单叶双曲面", eq: "\\frac{x^2}{a^2}+…=1",   // eq 用下面的迷你排版：^ _ \frac \sqrt \pm \ge \le
//     view: { az: 32, el: 20 },             // 正交投影：方位角（从 x 轴量起）、仰角，单位度；默认 x 轴朝左下、y 轴朝右、z 轴朝上
//     width: 480, maxHeight: 420, pad: [l, t, r, b],
//     axes: { x: [-0.3, 2], y: [...], z: [...], labels: {x:[dx,dy]...}, origin: [dx, dy] | false } | false,
//     surfaces: [{ f: (u, v) => [x, y, z], u: [u0, u1], v: [v0, v1], fill: [nu, nv], out: 1 | -1,
//                  contour: true, boundary: true | ["u0","u1","v0","v1"], mesh: { u: [值...], v: [值...] } }],
//     planes: [{ o: [x, y, z], e1: [...], e2: [...] }],          // 半透明平行四边形（截平面）
//     curves: [{ f: (t) => [x, y, z], t: [t0, t1], n: 240, c: "k1", w: 2.4, hidden: "dash" | "hide" | "show", arrow: "end" }],
//     points: [{ p: [x, y, z], c: "k1" }],
//     labels: [{ at: [x, y, z], text: "准线 $C$", dx, dy, anchor: "start" | "middle" | "end", c: "k1", size: 17, lead: true }] }
// 颜色类：k1 橙（准线、截痕）、k2 绿（母线）、k3 玫红（旋转轴）、k4 蓝紫、k5 金。
// 图里只有浅色一套：SVG 当 <img> 用时，里面的 prefers-color-scheme 不认打印，系统深色时导出 PDF 会是深色图。
// 深色模式由网站 CSS 给图片加 filter: invert(1) hue-rotate(180deg)（只在 screen and (prefers-color-scheme: dark)）。
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const { PI, sin, cos, sqrt, min, max, round } = Math;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const addv = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const len = (a) => sqrt(dot(a, a));
const unit = (a) => { const l = len(a); return l > 1e-12 ? mul(a, 1 / l) : [0, 0, 0]; };
const fmt = (n) => { const r = round(n * 10) / 10; return Object.is(r, -0) ? "0" : String(r); };
// 路径：坐标取到 0.1，第一个点绝对坐标，后面用相对位移（文件小一半）
const t10 = (n) => { const r = (n / 10).toFixed(1).replace(/\.0$/, "").replace(/^(-?)0\./, "$1."); return r === "-0" ? "0" : r; };
function pathD(pts, close) {
  const r = pts.map((p) => [round(p[0] * 10), round(p[1] * 10)]);
  const parts = [];
  for (let k = 1; k < r.length; k++) {
    const dx = r[k][0] - r[k - 1][0], dy = r[k][1] - r[k - 1][1];
    if (dx || dy) parts.push(t10(dx) + " " + t10(dy));
  }
  return ("M" + t10(r[0][0]) + " " + t10(r[0][1]) + (parts.length ? "l" + parts.join(" ") : "")).replace(/ -/g, "-") + (close ? "z" : "");
}
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- 颜色 ----------
const SHADES = 28;
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => "#" + hex(a).map((x, i) => round(x + (hex(b)[i] - x) * t).toString(16).padStart(2, "0")).join("");
const PALETTE = {
  light: {
    ink: "#3c4878", text: "#141a36", halo: "#ffffff",
    out: ["#8e9be0", "#e4e9ff"], inn: ["#a690e0", "#efe6ff"],
    plane: "#f59e0b", planeOp: 0.17, planeEdge: "#d97706",
    contour: "#3b3f9e", mesh: "#5965a6",
    k1: "#ea580c", k2: "#059669", k3: "#e11d48", k4: "#4f46e5", k5: "#c27803",
  },
};
const SANS = "'PingFang SC','Microsoft YaHei','Noto Sans CJK SC','Source Han Sans SC',sans-serif";
const SERIF = "'Times New Roman','Nimbus Roman','Noto Serif',serif";

function css(p) {
  const r = [];
  for (let i = 0; i < SHADES; i++) {
    const t = i / (SHADES - 1);
    const o = mix(p.out[0], p.out[1], t), n = mix(p.inn[0], p.inn[1], t);
    r.push(`.o${i}{fill:${o};stroke:${o}}.i${i}{fill:${n};stroke:${n}}`);
  }
  r.push(`.rg{fill:${p.k2};stroke:none}.pl{fill:${p.plane};fill-opacity:${p.planeOp}}.ple{stroke:${p.planeEdge};stroke-opacity:.7}`);
  r.push(`.ax{stroke:${p.ink}}.axa{fill:${p.ink}}.ct,.bd{stroke:${p.contour}}.ms{stroke:${p.mesh}}`);
  r.push(`text{fill:${p.text}}.lead{stroke:${p.ink}}.bar{stroke:${p.text}}`);
  for (const k of ["k1", "k2", "k3", "k4", "k5"]) r.push(`path.${k}{stroke:${p[k]}}.${k}f{fill:${p[k]}}text.${k}{fill:${p[k]}}`);
  return r.join("");
}
function styleBlock() {
  const base = "path{fill:none;stroke-linecap:round;stroke-linejoin:round}" +
    ".srf path{stroke-width:.7}.pl{stroke:none}" +
    ".ax{stroke-width:1.3}.ct{stroke-width:1.7}.bd{stroke-width:1.4}.ms{stroke-width:.8;stroke-opacity:.38}.ple{stroke-width:1}" +
    ".hid{stroke-dasharray:5 4;stroke-opacity:.72}.ms.hid{stroke-opacity:.2}.ax.hid{stroke-dasharray:4 4}" +
    ".lead{stroke-width:.9;stroke-opacity:.7}" +
    "text{stroke:none}.hl text{stroke-width:4px;stroke-linejoin:round}" +
    `.zh{font-family:${SANS}}.mi{font-family:${SERIF};font-style:italic}.mu{font-family:${SERIF}}.bar{stroke-width:1.2}`;
  return `<style>${base}${css(PALETTE.light)}.hl text{fill:${PALETTE.light.halo};stroke:${PALETTE.light.halo}}</style>`;
}

// ---------- 迷你排版：标签里的 $…$ 与标题方程 ----------
const OPS = new Set(["=", "+", "−", "±", "<", ">", "≤", "≥", "∥", "→", "⇒"]);
const WIDE = { i: .28, j: .28, l: .28, f: .3, t: .3, r: .39, m: .72, w: .67, x: .44, y: .44, z: .39, s: .39 };
function mathCharW(ch) {
  if (WIDE[ch]) return WIDE[ch];
  if (/[a-z]/.test(ch)) return .5;
  if (/[A-Z]/.test(ch)) return ({ M: .83, O: .72, C: .67, N: .67, L: .56, S: .5 })[ch] || .62;
  if (/[0-9]/.test(ch)) return .5;
  if ("()[]".includes(ch)) return .33;
  if (",.·′".includes(ch)) return .26;
  if (ch === "|") return .2;
  if (ch === " ") return .25;
  if (ch === "√") return .55;
  if (OPS.has(ch)) return .56;
  if (ch.charCodeAt(0) >= 0x2e80) return 1;
  return .5;
}
const sansCharW = (ch) => ch === " " ? .3 : ch.charCodeAt(0) >= 0x2e80 || "（）：，、；。".includes(ch) ? 1 : /[0-9a-z]/.test(ch) ? .55 : .62;
const SYM = { "\\pm": "±", "\\le": "≤", "\\ge": "≥", "\\cdot": "·", "\\parallel": "‖", "\\to": "→", "\\Rightarrow": "⇒", "\\infty": "∞" };

function parseMath(s) {
  let i = 0;
  const group = () => {
    if (s[i] === "{") { i++; const g = seq("}"); i++; return g; }
    const c = s[i++]; return c === "\\" ? seqFromCmd() : [{ k: "ch", t: c === "-" ? "−" : c }];
  };
  const seqFromCmd = () => { i--; return [cmd()]; };
  function cmd() {
    const m = /^\\[a-zA-Z]+/.exec(s.slice(i));
    i += m[0].length;
    if (m[0] === "\\frac") { const a = group(), b = group(); return { k: "frac", a, b }; }
    if (m[0] === "\\sqrt") return { k: "sqrt", a: group() };
    if (m[0] === "\\text") return { k: "zh", t: group().map((n) => n.t).join("") };
    if (SYM[m[0]]) return { k: "ch", t: SYM[m[0]] };
    throw new Error("迷你排版不认识 " + m[0]);
  }
  function seq(end) {
    const out = [];
    while (i < s.length && s[i] !== end) {
      const c = s[i];
      if (c === "^" || c === "_") { i++; const g = group(); const base = out.pop() || { k: "ch", t: "" }; out.push({ k: c === "^" ? "sup" : "sub", base, a: g }); continue; }
      if (c === "\\") { out.push(cmd()); continue; }
      if (c === "{") { i++; out.push(...seq("}")); i++; continue; }
      i++;
      out.push({ k: "ch", t: c === "-" ? "−" : c });
    }
    return out;
  }
  return seq(null);
}

// 返回 { w, asc, desc, items }，坐标相对基线起点；items：{ t, x, y, size, cls } 或 { line: [x1, y1, x2, y2] }
function layoutMath(nodes, size) {
  let x = 0, asc = size * .72, desc = size * .22;
  const items = [];
  const put = (box, dy = 0) => {
    box.items.forEach((it) => items.push(it.line ? { line: [it.line[0] + x, it.line[1] + dy, it.line[2] + x, it.line[3] + dy] }
      : { ...it, x: it.x + x, y: it.y + dy }));
    asc = max(asc, box.asc - dy); desc = max(desc, box.desc + dy);
    x += box.w;
  };
  nodes.forEach((n, idx) => {
    if (n.k === "ch") {
      const op = OPS.has(n.t), prev = nodes[idx - 1];
      const unary = (n.t === "−" || n.t === "±") && (!prev || (prev.k === "ch" && (OPS.has(prev.t) || prev.t === "(")));
      const gap = op && !unary ? size * .24 : 0;
      x += gap;
      if (n.t !== " ") items.push({ t: n.t, x, y: 0, size, cls: /[a-zA-Z]/.test(n.t) ? "mi" : "mu" });
      x += mathCharW(n.t) * size + gap;
    } else if (n.k === "zh") {
      items.push({ t: n.t, x, y: 0, size, cls: "zh" });
      x += [...n.t].reduce((a, c) => a + sansCharW(c), 0) * size;
    } else if (n.k === "sup" || n.k === "sub") {
      put(layoutMath([n.base], size));
      const s2 = layoutMath(n.a, size * .68);
      put(s2, n.k === "sup" ? -size * .42 : size * .2);
      x += size * .04;
    } else if (n.k === "frac") {
      const fs2 = size * .9, a = layoutMath(n.a, fs2), b = layoutMath(n.b, fs2);
      const w = max(a.w, b.w) + size * .2, axis = -size * .3;
      const box = { w, asc: 0, desc: 0, items: [] };
      const place = (bx, dy) => bx.items.forEach((it) => box.items.push(it.line
        ? { line: [it.line[0] + (w - bx.w) / 2, it.line[1] + dy, it.line[2] + (w - bx.w) / 2, it.line[3] + dy] }
        : { ...it, x: it.x + (w - bx.w) / 2, y: it.y + dy }));
      const ny = axis - size * .14 - a.desc, dy2 = axis + size * .14 + b.asc;
      place(a, ny); place(b, dy2);
      box.items.push({ line: [size * .06, axis, w - size * .06, axis] });
      box.asc = -(ny - a.asc); box.desc = dy2 + b.desc;
      x += size * .08; put(box); x += size * .08;
    } else if (n.k === "sqrt") {
      const a = layoutMath(n.a, size);
      items.push({ t: "√", x, y: 0, size, cls: "mu" });
      const x0 = x + size * .52, top = -a.asc - size * .06;
      x = x0; put(a);
      items.push({ line: [x0, top, x, top] });
      asc = max(asc, -top + 2);
      x += size * .05;
    }
  });
  return { w: x, asc, desc, items };
}

// 「准线 $C$」：中文用无衬线，$…$ 里按数学排
function layoutLabel(text, size) {
  const parts = String(text).split("$");
  let x = 0, asc = size * .8, desc = size * .25;
  const items = [];
  parts.forEach((p, k) => {
    if (!p) return;
    if (k % 2) {
      const b = layoutMath(parseMath(p), size);
      b.items.forEach((it) => items.push(it.line ? { line: [it.line[0] + x, it.line[1], it.line[2] + x, it.line[3]] } : { ...it, x: it.x + x }));
      asc = max(asc, b.asc); desc = max(desc, b.desc); x += b.w;
    } else {
      items.push({ t: p, x, y: 0, size, cls: "zh" });
      x += [...p].reduce((a, c) => a + sansCharW(c), 0) * size;
    }
  });
  return { w: x, asc, desc, items };
}

function emitText(box, x0, y0, cls) {
  // 先画整条标签的白边（halo），再画字：每个字符是单独的 <text>，白边和字一起画的话，
  // 后一个字的白边会盖掉前一个字的边（斜体 O 后面跟 y，O 就被削成了 C）
  const extra = cls ? " " + cls : "";
  const halo = [], fg = [];
  box.items.forEach((it) => {
    if (it.line) {
      const d = `M${fmt(x0 + it.line[0])} ${fmt(y0 + it.line[1])}H${fmt(x0 + it.line[2])}`;
      fg.push(`<path class="bar${cls ? " " + cls : ""}" d="${d}"/>`);
    } else {
      const at = `x="${fmt(x0 + it.x)}" y="${fmt(y0 + it.y)}" font-size="${fmt(it.size)}">${esc(it.t)}</text>`;
      halo.push(`<text class="${it.cls}" ${at}`);
      fg.push(`<text class="${it.cls}${extra}" ${at}`);
    }
  });
  return `<g class="hl">${halo.join("")}</g>` + fg.join("");
}

// ---------- 相机 ----------
function camera(az, el) {
  const a = az * PI / 180, e = el * PI / 180;
  const V = [cos(e) * cos(a), cos(e) * sin(a), sin(e)];
  const R = [-sin(a), cos(a), 0];
  const U = [-sin(e) * cos(a), -sin(e) * sin(a), cos(e)];
  const L = unit(addv(addv(mul(R, -0.45), mul(U, 0.7)), mul(V, 0.55)));
  return { V, R, U, L, p: (q) => [dot(R, q), dot(U, q), dot(V, q)] };
}

// ---------- 曲面采样 ----------
function partials(f, u, v, du, dv) {
  const fu = mul(sub(f(u + du, v), f(u - du, v)), 1 / (2 * du));
  const fv = mul(sub(f(u, v + dv), f(u, v - dv)), 1 / (2 * dv));
  return cross(fu, fv);
}
function grid(S, nu, nv) {
  const [u0, u1] = S.u, [v0, v1] = S.v;
  const P = [], N = [];
  const du = (u1 - u0) * 1e-4, dv = (v1 - v0) * 1e-4;
  for (let i = 0; i <= nu; i++) {
    P.push([]); N.push([]);
    for (let j = 0; j <= nv; j++) {
      const u = u0 + (u1 - u0) * i / nu, v = v0 + (v1 - v0) * j / nv;
      P[i].push(S.f(u, v));
      let n = partials(S.f, u, v, du, dv);
      if (len(n) < 1e-9) n = partials(S.f, u + (u1 - u0) * 1e-3, v + (v1 - v0) * 1e-3 * (j === nv ? -1 : 1), du, dv);
      N[i].push(n);
    }
  }
  return { P, N, nu, nv };
}
const nearly = (a, b) => len(sub(a, b)) < 1e-6;

// ---------- 遮挡：细网格三角形 + 屏幕分桶 ----------
function occluder(tris, extent) {
  const cell = extent / 90, B = new Map();
  const key = (i, j) => i * 100003 + j;
  tris.forEach((t, k) => {
    const xs = [t[0][0], t[1][0], t[2][0]], ys = [t[0][1], t[1][1], t[2][1]];
    const i0 = Math.floor(min(...xs) / cell), i1 = Math.floor(max(...xs) / cell);
    const j0 = Math.floor(min(...ys) / cell), j1 = Math.floor(max(...ys) / cell);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
      const kk = key(i, j); if (!B.has(kk)) B.set(kk, []); B.get(kk).push(k);
    }
  });
  const eps = extent * 0.012;
  return (q) => {
    const list = B.get(key(Math.floor(q[0] / cell), Math.floor(q[1] / cell)));
    if (!list) return true;
    for (const k of list) {
      const [a, b, c] = tris[k];
      const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
      if (Math.abs(d) < 1e-12) continue;
      const l1 = ((b[1] - c[1]) * (q[0] - c[0]) + (c[0] - b[0]) * (q[1] - c[1])) / d;
      const l2 = ((c[1] - a[1]) * (q[0] - c[0]) + (a[0] - c[0]) * (q[1] - c[1])) / d;
      const l3 = 1 - l1 - l2;
      if (l1 < -1e-9 || l2 < -1e-9 || l3 < -1e-9) continue;
      if (l1 * a[2] + l2 * b[2] + l3 * c[2] > q[2] + eps) return false;
    }
    return true;
  };
}

// ---------- 等值线（轮廓线 n·V = 0）：参数网格上 marching squares ----------
function contourParams(S, G, cam) {
  const { nu, nv } = G;
  const [u0, u1] = S.u, [v0, v1] = S.v;
  const wrapU = S.wrapU, g = (i, j) => dot(unit(G.N[i][j]), cam.V);
  const U = (i) => u0 + (u1 - u0) * i / nu, Vv = (j) => v0 + (v1 - v0) * j / nv;
  const I = (i) => wrapU ? i % nu : i;
  const pts = new Map(), segs = [];
  const cross0 = (ga, gb) => (ga > 0) !== (gb > 0);
  const edgeH = (i, j) => { // (i,j)-(i+1,j)
    const k = "h" + I(i) + ":" + j;
    if (!pts.has(k)) { const a = g(i, j), b = g(i + 1, j), t = a / (a - b); pts.set(k, [U(i + t), Vv(j)]); }
    return k;
  };
  const edgeV = (i, j) => { // (i,j)-(i,j+1)
    const k = "v" + I(i) + ":" + j;
    if (!pts.has(k)) { const a = g(i, j), b = g(i, j + 1), t = a / (a - b); pts.set(k, [U(i), Vv(j + t)]); }
    return k;
  };
  for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
    const a = g(i, j), b = g(i + 1, j), c = g(i + 1, j + 1), d = g(i, j + 1);
    const e = [];
    if (cross0(a, b)) e.push(edgeH(i, j));
    if (cross0(b, c)) e.push(edgeV(i + 1, j));
    if (cross0(d, c)) e.push(edgeH(i, j + 1));
    if (cross0(a, d)) e.push(edgeV(i, j));
    if (e.length === 2) segs.push(e);
    else if (e.length === 4) {
      const ctr = (a + b + c + d) / 4;
      if ((ctr > 0) === (a > 0)) { segs.push([e[0], e[1]]); segs.push([e[2], e[3]]); }
      else { segs.push([e[0], e[3]]); segs.push([e[1], e[2]]); }
    }
  }
  // 串成折线
  const at = new Map();
  segs.forEach((s, k) => s.forEach((p) => { if (!at.has(p)) at.set(p, []); at.get(p).push(k); }));
  const used = new Set(), lines = [];
  segs.forEach((s, k) => {
    if (used.has(k)) return;
    used.add(k);
    const chain = [s[0], s[1]];
    for (const dir of [1, 0]) {
      for (;;) {
        const end = dir ? chain[chain.length - 1] : chain[0];
        const nxt = (at.get(end) || []).find((m) => !used.has(m));
        if (nxt === undefined) break;
        used.add(nxt);
        const o = segs[nxt][0] === end ? segs[nxt][1] : segs[nxt][0];
        if (dir) chain.push(o); else chain.unshift(o);
      }
    }
    lines.push(chain.map((p) => pts.get(p)));
  });
  return lines.map((l) => l.map(([u, v]) => S.f(u, v)));
}

// ---------- 主过程 ----------
function build(fig) {
  const cam = camera(fig.view?.az ?? 32, fig.view?.el ?? 20);
  const W = fig.width || 480, maxH = fig.maxHeight || 420;
  const pad = fig.pad || [14, 14, 14, 14];
  const polys = [];          // 画家算法：{ d: 深度, pts: [[X,Y]...], cls }
  const tris = [];           // 遮挡用（相机坐标）
  const strokes = [];        // { pts3: [...], c, w, hidden, kind, arrow }
  const all2 = [];           // 拟合范围

  const surfaces = (fig.surfaces || []).map((S0) => {
    // region: true → 平面上的一块区域（如投影区域 D_xy），淡绿色半透明、不分明暗、不画轮廓；
    // alpha: 0~1 → 半透明曲面（看得见后面的交线）；occlude: false → 不挡线；ramp: "o" | "i" → 整张固定用蓝 / 紫（两张面好分）
    const S = { contour: !S0.region, boundary: !S0.region, out: 1, ...S0 };
    const alpha = S.region ? (S.alpha ?? 0.2) : S.alpha;
    const [nu, nv] = S.fill || [48, 24];
    const probe = [0, 0.37, 1].map((t) => S.v[0] + (S.v[1] - S.v[0]) * t);
    if (S.wrapU === undefined) S.wrapU = probe.every((v) => nearly(S.f(S.u[0], v), S.f(S.u[1], v)));
    const G = grid(S, nu, nv);
    const Pc = G.P.map((row) => row.map(cam.p));
    for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
      const q = [G.P[i][j], G.P[i + 1][j], G.P[i + 1][j + 1], G.P[i][j + 1]];
      let n = cross(sub(q[2], q[0]), sub(q[3], q[1]));
      if (len(n) < 1e-12) n = G.N[i][j];
      n = mul(unit(n), S.out);
      const facing = dot(n, cam.V);
      const nl = facing >= 0 ? n : mul(n, -1);
      const lam = max(0, dot(nl, cam.L));
      let shade = min(SHADES - 1, max(0, round((0.18 + 0.82 * Math.pow(lam, 0.85)) * (SHADES - 1))));
      // 半透明的面看不出细的明暗差，档位放粗（每 3 档并一档），相邻面片能合成一条路径，文件小一半
      if (alpha !== undefined) shade = min(SHADES - 1, round(shade / 3) * 3);
      const c2 = [Pc[i][j], Pc[i + 1][j], Pc[i + 1][j + 1], Pc[i][j + 1]];
      const dep = (c2[0][2] + c2[1][2] + c2[2][2] + c2[3][2]) / 4;
      polys.push({ d: dep, pts: c2, cls: S.region ? "rg" : (S.ramp || (facing >= 0 ? "o" : "i")) + shade, alpha, crisp: alpha !== undefined });
    }
    // 遮挡网格（更细）
    const [ou, ov] = S.occ || [nu * 2, nv * 2];
    const GO = grid(S, ou, ov);
    const Oc = GO.P.map((row) => row.map(cam.p));
    if (S.occlude !== false) for (let i = 0; i < ou; i++) for (let j = 0; j < ov; j++) {
      tris.push([Oc[i][j], Oc[i + 1][j], Oc[i + 1][j + 1]], [Oc[i][j], Oc[i + 1][j + 1], Oc[i][j + 1]]);
    }
    Oc.forEach((row) => row.forEach((p) => all2.push(p)));
    // 轮廓线
    if (S.contour) {
      const GC = grid(S, ou, ov);
      contourParams(S, GC, cam).forEach((pts3) => strokes.push({ pts3, kind: "ct", hidden: S.contourHidden || "dash" }));
    }
    // 边界
    const edges = S.boundary === true ? (S.wrapU ? ["v0", "v1"] : ["u0", "u1", "v0", "v1"]) : (S.boundary || []);
    const n = 260;
    edges.forEach((e) => {
      const pts3 = [];
      for (let k = 0; k <= n; k++) {
        const t = k / n;
        const u = e[0] === "u" ? S.u[e[1] === "0" ? 0 : 1] : S.u[0] + (S.u[1] - S.u[0]) * t;
        const v = e[0] === "v" ? S.v[e[1] === "0" ? 0 : 1] : S.v[0] + (S.v[1] - S.v[0]) * t;
        pts3.push(S.f(u, v));
      }
      strokes.push({ pts3, kind: "bd", hidden: S.boundaryHidden || "dash" });
    });
    // 网格线
    const mesh = S.mesh || {};
    (mesh.u || []).forEach((u) => {
      const pts3 = []; for (let k = 0; k <= n; k++) pts3.push(S.f(u, S.v[0] + (S.v[1] - S.v[0]) * k / n));
      strokes.push({ pts3, kind: "ms", hidden: mesh.hidden || "hide" });
    });
    (mesh.v || []).forEach((v) => {
      const pts3 = []; for (let k = 0; k <= n; k++) pts3.push(S.f(S.u[0] + (S.u[1] - S.u[0]) * k / n, v));
      strokes.push({ pts3, kind: "ms", hidden: mesh.hidden || "hide" });
    });
    return S;
  });

  // 平面：半透明，切成小块参与画家排序（crispEdges 消接缝，外框单独描）
  (fig.planes || []).forEach((P) => {
    const m = P.n || 14;
    const pt = (a, b) => addv(addv(P.o, mul(P.e1, a)), mul(P.e2, b));
    for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) {
      const c2 = [pt(i / m, j / m), pt((i + 1) / m, j / m), pt((i + 1) / m, (j + 1) / m), pt(i / m, (j + 1) / m)].map(cam.p);
      polys.push({ d: (c2[0][2] + c2[1][2] + c2[2][2] + c2[3][2]) / 4, pts: c2, cls: "pl", crisp: true });
    }
    const ring = [pt(0, 0), pt(1, 0), pt(1, 1), pt(0, 1), pt(0, 0)];
    const pts3 = [];
    for (let k = 0; k < 4; k++) for (let s = 0; s < 40; s++) pts3.push(addv(ring[k], mul(sub(ring[k + 1], ring[k]), s / 40)));
    pts3.push(ring[4]);
    strokes.push({ pts3, kind: "ple", hidden: "dash" });
    ring.forEach((p) => all2.push(cam.p(p)));
  });

  (fig.curves || []).forEach((C) => {
    const n = C.n || 240, pts3 = [];
    for (let k = 0; k <= n; k++) pts3.push(C.f(C.t[0] + (C.t[1] - C.t[0]) * k / n));
    strokes.push({ pts3, kind: "c", c: C.c || "k1", w: C.w || 2.4, hidden: C.hidden || "dash", arrow: C.arrow, dash: C.dash });
    pts3.forEach((p) => all2.push(cam.p(p)));
  });

  // 坐标轴
  const ax = fig.axes === false ? null : (fig.axes || {});
  const axisDefs = [];
  if (ax) {
    [["x", [1, 0, 0]], ["y", [0, 1, 0]], ["z", [0, 0, 1]]].forEach(([k, e]) => {
      if (!ax[k]) return;
      const [a, b] = ax[k];
      const pts3 = [];
      for (let s = 0; s <= 160; s++) pts3.push(mul(e, a + (b - a) * s / 160));
      strokes.push({ pts3, kind: "ax", hidden: ax.hidden || "dash", arrow: "end" });
      axisDefs.push({ k, tip: mul(e, b), dir: e });
      all2.push(cam.p(mul(e, a)), cam.p(mul(e, b)));
    });
  }

  // ---------- 标签：先排好，和图形一起拟合到画布 ----------
  const xs = all2.map((p) => p[0]), ys = all2.map((p) => p[1]);
  const bx0 = min(...xs), bx1 = max(...xs), by0 = min(...ys), by1 = max(...ys);
  const extent = max(bx1 - bx0, by1 - by0, 1e-6);
  const labels = [];
  const addLabel = (c, text, o) => labels.push({ c, dx: o.dx || 0, dy: o.dy || 0, box: layoutLabel(text, o.size || 21),
    anchor: o.anchor || "start", cls: o.cls || "", lead: o.lead });
  if (ax) {
    const lab = ax.labels || {};
    axisDefs.forEach(({ k, tip }) => {
      const a = cam.p(tip), b = cam.p(mul(tip, 0.9));
      const dx = a[0] - b[0], dy = -(a[1] - b[1]), dl = Math.hypot(dx, dy) || 1;
      const off = lab[k] || [dx / dl * 13, dy / dl * 13 + 6];
      addLabel(a, "$" + k + "$", { dx: off[0], dy: off[1], anchor: "middle", size: 21 });
    });
    if (ax.origin !== false) { const off = ax.origin || [-15, 15]; addLabel([0, 0, 0], "$O$", { dx: off[0], dy: off[1], anchor: "middle", size: 18 }); }
  }
  (fig.labels || []).forEach((Lb) => addLabel(cam.p(Lb.at), Lb.text, { ...Lb, cls: Lb.c }));
  const lx0 = (L) => L.anchor === "middle" ? -L.box.w / 2 : L.anchor === "end" ? -L.box.w : 0;

  const titleBox = fig.title ? layoutLabel(fig.title, 22) : null;
  const eqBox = fig.eq ? layoutMath(parseMath(fig.eq), 22) : null;
  const top = titleBox ? max(titleBox.asc, eqBox ? eqBox.asc : 0) + max(titleBox.desc, eqBox ? eqBox.desc : 0) + 30 : 0;
  const caps = [].concat(fig.caption || []).map((c) => layoutLabel(c, 19));
  // 每行图注的高度按实际排版算（有分数的行更高），行距 6
  const capRow = (c) => max(c.asc, 19 * 0.8) + max(c.desc, 19 * 0.25) + 6;
  const capH = caps.length ? caps.reduce((a, c) => a + capRow(c), 0) + 8 : 0;
  const availW = W - pad[0] - pad[2], availH = maxH - top - capH - pad[1] - pad[3];
  const extents = (s) => {
    let x0 = bx0 * s, x1 = bx1 * s, y0 = -by1 * s, y1 = -by0 * s;
    labels.forEach((L) => {
      const x = L.c[0] * s + L.dx + lx0(L), y = -L.c[1] * s + L.dy;
      x0 = min(x0, x); x1 = max(x1, x + L.box.w); y0 = min(y0, y - L.box.asc); y1 = max(y1, y + L.box.desc);
    });
    return { x0, x1, y0, y1 };
  };
  // 先只按图形拟合，再把标签算进去缩小；最多缩到 60%（标签太长时宁可让它出界，也不把图缩没，出界要改标签）
  const s0 = min(availW / (bx1 - bx0), availH / (by1 - by0));
  let s = s0;
  for (let k = 0; k < 30; k++) { const e = extents(s); s = max(0.6 * s0, s * min(availW / (e.x1 - e.x0), availH / (e.y1 - e.y0))); }
  { const e = extents(s); if (e.x1 - e.x0 > availW + 1) console.warn("  ⚠ " + fig.name + "：标签太宽，超出画布 " + round(e.x1 - e.x0 - availW) + "px"); }
  s *= fig.zoom || 1;
  const E = extents(s);
  const ox = pad[0] + (availW - (E.x1 - E.x0)) / 2 - E.x0, oy = top + pad[1] - E.y0;
  const H = round(top + pad[1] + (E.y1 - E.y0) + pad[3] + capH);
  const X = (p) => ox + p[0] * s, Y = (p) => oy - p[1] * s;
  const P2 = (q3) => { const c = cam.p(q3); return [X(c), Y(c)]; };

  // 面片
  polys.sort((a, b) => a.d - b.d);
  const surfOut = [];
  let run = null;
  // 半透明的面片不描边（描边和相邻面片叠两层会出网格），crispEdges 让相邻面片严丝合缝
  const flush = () => { if (run) surfOut.push(`<path class="${run.cls}"${run.alpha !== undefined ? ` style="fill-opacity:${run.alpha};stroke:none"` : ""}${run.crisp ? ' shape-rendering="crispEdges"' : ""} d="${run.d.join("")}"/>`); run = null; };
  polys.forEach((p) => {
    let q = p.pts.map((c) => [X(c), Y(c)]);
    let area = 0;
    for (let k = 0; k < 4; k++) { const a = q[k], b = q[(k + 1) % 4]; area += a[0] * b[1] - b[0] * a[1]; }
    if (area < 0) q = q.reverse();
    if (!run || run.cls !== p.cls || run.alpha !== p.alpha) { flush(); run = { cls: p.cls, crisp: p.crisp, alpha: p.alpha, d: [] }; }
    run.d.push(pathD(q, true));
  });
  flush();

  // 线：可见实线、被挡虚线
  const visible = occluder(tris, extent);
  const lineOut = [], hidOut = [], arrowOut = [];
  const classOf = (st) => st.kind === "c" ? st.c : st.kind;
  strokes.forEach((st) => {
    const cpts = st.pts3.map(cam.p);
    const vis = cpts.map((c) => visible(c));
    for (let k = 1; k < vis.length - 1; k++) if (vis[k - 1] === vis[k + 1] && vis[k] !== vis[k - 1]) vis[k] = vis[k - 1];
    const runs = [];
    let cur = null;
    for (let k = 0; k < cpts.length - 1; k++) {
      const v = vis[k] && vis[k + 1];
      if (!cur || cur.v !== v) { cur = { v, pts: [cpts[k]] }; runs.push(cur); }
      cur.pts.push(cpts[k + 1]);
    }
    const cls = classOf(st);
    const width = st.kind === "c" ? ` style="stroke-width:${st.w}"` : "";
    runs.forEach((r) => {
      if (r.pts.length < 2 || (!r.v && st.hidden === "hide")) return;
      const shown = r.v || st.hidden === "show";
      (shown ? lineOut : hidOut).push(`<path class="${cls}${shown && !st.dash ? "" : " hid"}"${width} d="${pathD(r.pts.map((c) => [X(c), Y(c)]))}"/>`);
    });
    if (st.arrow) {
      const a = cpts[cpts.length - 3], b = cpts[cpts.length - 1];
      const ang = Math.atan2(-(b[1] - a[1]), b[0] - a[0]);
      const L = st.kind === "ax" ? 10 : 12, Wd = st.kind === "ax" ? 3.6 : 5;
      const tx = X(b), ty = Y(b);
      const p1 = [tx - L * cos(ang) + Wd * sin(ang), ty - L * sin(ang) - Wd * cos(ang)];
      const p2 = [tx - L * cos(ang) - Wd * sin(ang), ty - L * sin(ang) + Wd * cos(ang)];
      arrowOut.push(`<path class="${st.kind === "ax" ? "axa" : st.c + "f"}" style="stroke:none" d="${pathD([[tx, ty], p1, p2], true)}"/>`);
    }
  });

  // 点
  const ptOut = (fig.points || []).map((P) => {
    const [x, y] = P2(P.p);
    return `<circle class="${P.c || "k1"}f" cx="${fmt(x)}" cy="${fmt(y)}" r="${P.r || 3.6}"/>`;
  });

  // 标签与引线
  const labOut = [], leadOut = [];
  labels.forEach((L) => {
    const x = X(L.c), y = Y(L.c), lx = x + L.dx + lx0(L), ly = y + L.dy;
    if (L.lead) {
      const cx = min(max(x, lx), lx + L.box.w), cy = min(max(y, ly - L.box.asc * 0.8), ly + L.box.desc * 0.3);
      const dl = Math.hypot(x - cx, y - cy) || 1, ux = (x - cx) / dl, uy = (y - cy) / dl;
      leadOut.push(`<path class="lead" d="${pathD([[cx + ux * 4, cy + uy * 4], [x - ux * 3, y - uy * 3]])}"/>`);
    }
    labOut.push(emitText(L.box, lx, ly, L.cls));
  });

  // 标题、图注
  const head = [];
  if (titleBox) {
    const y = pad[1] + titleBox.asc + 4;
    head.push(emitText(titleBox, pad[0], y, "ttl"));
    if (eqBox) head.push(emitText(eqBox, pad[0] + titleBox.w + 14, y, "eq"));
  }
  let capY = H - pad[3] - capH + 8;
  caps.forEach((c) => { const row = capRow(c); head.push(emitText(c, (W - c.w) / 2, capY + max(c.asc, 19 * 0.8), "cap")); capY += row; });
  caps.forEach((c) => { if (c.w > W - 8) console.warn("  ⚠ " + fig.name + "：图注太宽 " + round(c.w) + "px"); });

  const aria = esc((fig.title || fig.name) + (fig.alt ? "：" + fig.alt : ""));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${aria}">` +
    styleBlock() +
    `<g class="srf">${surfOut.join("")}</g>` +
    `<g>${hidOut.join("")}</g><g>${lineOut.join("")}${arrowOut.join("")}${ptOut.join("")}</g>` +
    `<g>${leadOut.join("")}${head.join("")}${labOut.join("")}</g></svg>\n`;
}

// ---------- 预览页：浅色、深色各一列，桌面窄栏 380px 与手机 330px ----------
function galleryHtml(files, dir) {
  const rel = (f) => path.relative(dir, f).replace(/\\/g, "/");
  const rows = files.map((f) => `<div class="row"><div class="name">${esc(path.basename(f))}　${round(fs.statSync(f).size / 1024)} KB</div>
    <div class="cell light w480"><img src="${rel(f)}"></div>
    <div class="cell dark w480"><img src="${rel(f)}"></div>
    <div class="cell light w330"><img src="${rel(f)}"></div></div>`).join("\n");
  return `<!doctype html><meta charset="utf-8"><title>曲面示意图预览</title>
<style>body{margin:0;padding:16px;background:#f3f5ff;font:14px 'Microsoft YaHei',sans-serif}
.row{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start;margin-bottom:22px}.name{width:100%;color:#3c4878}
.cell{border-radius:14px;padding:12px;box-shadow:0 6px 18px rgba(60,70,160,.08)}.light{background:#fff}.dark{background:#131932}
.dark img{filter:invert(1) hue-rotate(180deg)}
.w480{width:480px}.w330{width:330px}img{max-width:100%;height:auto;display:block}</style>${rows}`;
}
function gallery(files, outHtml) {
  fs.writeFileSync(outHtml, galleryHtml(files, path.dirname(path.resolve(outHtml))), "utf8");
}

function browser() {
  return ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe"].find((p) => fs.existsSync(p));
}
function screenshot(htmlFile, png, width, height) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "surf-"));
  spawnSync(browser(), ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1.5",
    `--user-data-dir=${path.join(tmp, "profile")}`, "--allow-file-access-from-files",
    `--window-size=${width},${height}`, `--screenshot=${path.resolve(png)}`, "file:///" + path.resolve(htmlFile).replace(/\\/g, "/")]);
  const nap = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  for (let i = 0, last = -1; i < 120; i++) {
    const size = fs.existsSync(png) ? fs.statSync(png).size : -1;
    if (size > 0 && size === last) break;
    last = size; nap(250);
  }
}

const helpers = { M: Math, PI };

if (require.main === module) {
  const args = process.argv.slice(2);
  const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args.splice(i, 2)[1] : null; };
  const only = opt("--only"), gal = opt("--gallery"), png = opt("--png"), sheet = opt("--sheet");
  const [specFile, outDir] = args;
  if (!specFile || !outDir) { console.error("用法：node tools/surface-fig.cjs <内容文件.cjs> <输出目录> [--only a,b] [--gallery x.html] [--png x.png]"); process.exit(1); }
  let figs = require(path.resolve(specFile))(helpers);
  if (only) { const want = only.split(","); figs = figs.filter((f) => want.includes(f.name)); }
  fs.mkdirSync(outDir, { recursive: true });
  const files = figs.map((fig) => {
    const t0 = Date.now();
    const svg = build(fig);
    const out = path.join(outDir, fig.name + ".svg");
    fs.writeFileSync(out, svg, "utf8");
    console.log("✓ " + out + "（" + round(svg.length / 1024) + " KB，" + (Date.now() - t0) + " ms）");
    return out;
  });
  if (gal) { gallery(files, gal); console.log("✓ 预览：" + gal); }
  if (sheet) { // 总览：浅色 480，一行三张
    const dir = path.dirname(path.resolve(sheet)), rel = (f) => path.relative(dir, f).replace(/\\/g, "/");
    const html = sheet.replace(/\.png$/, ".html");
    fs.writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:10px;background:#e8ecfb;display:grid;grid-template-columns:repeat(3,500px);gap:10px;font:13px 'Microsoft YaHei'}
div{background:#fff;border-radius:10px;padding:10px}img{width:480px;display:block}</style>` +
      files.map((f) => `<div>${esc(path.basename(f))}　${round(fs.statSync(f).size / 1024)} KB<img src="${rel(f)}"></div>`).join(""), "utf8");
    try { fs.unlinkSync(sheet); } catch (e) { /* 没有旧图 */ }
    screenshot(html, sheet, 1540, 30 + Math.ceil(files.length / 3) * 520);
    console.log("✓ 总览：" + sheet);
  }
  if (png) { // 每张图一张截图：浅色 480、深色 480、手机 330
    fs.mkdirSync(png, { recursive: true });
    files.forEach((f) => {
      const html = path.join(path.resolve(png), path.basename(f, ".svg") + ".html");
      fs.writeFileSync(html, galleryHtml([f], path.resolve(png)), "utf8");
      const h = Number((fs.readFileSync(f, "utf8").match(/viewBox="0 0 \d+ (\d+)"/) || [])[1] || 420);
      const out = html.replace(/\.html$/, ".png");
      try { fs.unlinkSync(out); } catch (e) { /* 没有旧图 */ }
      screenshot(html, out, 1460, h + 90);
      console.log("✓ 截图：" + out);
    });
  }
}

module.exports = { build, layoutMath, parseMath, screenshot };
