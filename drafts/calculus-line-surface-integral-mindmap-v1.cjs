// 高数第 7 章路线图的内容（v1）。导出：node tools/mindmap.cjs drafts/calculus-line-surface-integral-mindmap-v1.cjs drafts/calculus-line-surface-integral-mindmap-v1.webp
module.exports = ({ tx, lab, zh, dot, svg, AX }) => {
  // 正投影：绕 z 轴转 φ、再俯视 e（与第 4、5、6 章路线图同一套视角）
  const PHI = 25 * Math.PI / 180, EL = 22 * Math.PI / 180;
  const view = (cx, cy, s) => (x, y, z) => [
    cx + s * (-x * Math.sin(PHI) + y * Math.cos(PHI)),
    cy - s * (z * Math.cos(EL) - (x * Math.cos(PHI) + y * Math.sin(PHI)) * Math.sin(EL)),
  ];
  // 平面图：横竖同一比例
  const flat = (cx, cy, s) => ({ X: (x) => cx + s * x, Y: (y) => cy - s * y });
  const f1 = (n) => n.toFixed(1);
  const marks = new Set();
  const mk = (c) => { marks.add(c); return "m" + c.slice(1); };
  const arrowDefs = () => [...marks].map((c) => `<marker id="m${c.slice(1)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join("");
  const fig = (body) => svg(`<defs>${arrowDefs()}</defs>` + body);
  const line2 = (x1, y1, x2, y2, c, w = 1.4, dash = "", arrow = false) =>
    `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}${arrow ? ` marker-end="url(#${mk(c)})"` : ""}/>`;
  const pts2 = (pts) => pts.map(([u, v], i) => (i ? "L" : "M") + f1(u) + " " + f1(v)).join(" ");
  const path2 = (pts, c, w = 2, dash = "", fill = "none", op = 1, arrow = false) =>
    `<path d="${pts2(pts)}" stroke="${c}" stroke-width="${w}" fill="${fill}" fill-opacity="${op}"${dash ? ` stroke-dasharray="${dash}"` : ""}${arrow ? ` marker-end="url(#${mk(c)})"` : ""}/>`;
  const sample = (g, a, b, n = 80) => { const p = []; for (let i = 0; i <= n; i++) p.push(g(a + (b - a) * i / n)); return p; };
  const curve3 = (P, g, a, b, c, w = 2, dash = "", n = 80, arrow = false) => path2(sample((t) => P(...g(t)), a, b, n), c, w, dash, "none", 1, arrow);
  const fill3 = (P, pts, fill, op, stroke = "none", sw = 1) => `<path d="${pts2(pts.map((p) => P(...p)))} Z" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}"/>`;
  // 粗体向量字母，如 F、n、v；前面可加 Δ
  const vec = (x, y, s, c, size = 13, pre = "") =>
    `<text x="${f1(x)}" y="${f1(y)}" font-family="'Times New Roman',serif" font-size="${size}" fill="${c}" text-anchor="middle">${pre}<tspan font-weight="700">${s}</tspan></text>`;
  // 「d」正体、后面的字母斜体，如 ds
  const dd = (x, y, v, c, size = 12.5, anchor = "middle", pre = "d") =>
    `<text x="${f1(x)}" y="${f1(y)}" font-family="'Times New Roman',serif" font-size="${size}" fill="${c}" text-anchor="${anchor}">${pre}<tspan font-style="italic">${v}</tspan></text>`;

  // ① 一根弯的铁丝：线越粗、颜色越深，密度越大；切出一小段 Δs
  function plot1() {
    const { X, Y } = flat(100, 82, 56), C = "#2f6fe0", O = "#f08a1c";
    const g = (t) => [-1.5 + 3 * t, 0.42 * Math.sin(5.4 * t - 0.6) + 0.3 * t - 0.1];
    const rho = (t) => 0.15 + 0.85 * Math.pow(Math.sin(Math.PI * (0.15 + 0.8 * t)), 2);
    let body = "";
    const N = 60;
    for (let i = 0; i < N; i++) {
      const a = i / N, b = (i + 1) / N, m = (a + b) / 2;
      const [x1, y1] = g(a), [x2, y2] = g(b);
      body += `<line x1="${f1(X(x1))}" y1="${f1(Y(y1))}" x2="${f1(X(x2))}" y2="${f1(Y(y2))}" stroke="${C}" stroke-width="${f1(1.6 + 5 * rho(m))}" stroke-opacity="${(0.3 + 0.7 * rho(m)).toFixed(2)}" stroke-linecap="round"/>`;
    }
    const s0 = 0.6, s1 = 0.68;
    body += path2(sample((t) => { const [x, y] = g(t); return [X(x), Y(y)]; }, s0, s1, 12), O, 7.5);
    for (const t of [s0, s1]) { const [x, y] = g(t); body += dot(X(x), Y(y), O, 2.6); }
    const [mx, my] = g((s0 + s1) / 2), [ax, ay] = g(0.02), [bx, by] = g(0.98);
    body += `<text x="${f1(X(mx) + 4)}" y="${f1(Y(my) - 12)}" font-family="'Times New Roman',serif" font-size="13" fill="#b8640a" text-anchor="middle">Δ<tspan font-style="italic">s</tspan></text>` +
      lab(X(ax) + 4, Y(ay) + 16, "L", { size: 13, color: "#4a6fb0" }) +
      zh(100, 157, "每一小段：密度 × 弧长", C, 11);
    void bx; void by;
    return fig(body);
  }

  // ② 力沿弯路做功：每一小段上，力 F 与位移 Δr 作数量积
  function plot2() {
    const { X, Y } = flat(100, 92, 58), C = "#f08a1c", R = "#e2463f", G = "#8a8f98";
    const g = (t) => [-1.35 + 2.7 * t, 0.62 * Math.sin(Math.PI * t) - 0.35 + 0.25 * t];
    const dg = (t) => [2.7, 0.62 * Math.PI * Math.cos(Math.PI * t) + 0.25];
    const F = (x, y) => [0.42 + 0.12 * y, 0.3 - 0.12 * x];
    let body = path2(sample((t) => { const [x, y] = g(t); return [X(x), Y(y)]; }, 0, 1, 80), C, 2.2);
    // 方向箭头
    body += path2(sample((t) => { const [x, y] = g(t); return [X(x), Y(y)]; }, 0.3, 0.36, 6), C, 2.2, "", "none", 1, true);
    for (const t of [0.12, 0.88]) {
      const [x, y] = g(t), [u, v] = F(x, y);
      body += line2(X(x), Y(y), X(x + u), Y(y + v), G, 1.3, "", true);
    }
    const t0 = 0.6, [x0, y0] = g(t0), [p, q] = dg(t0), L = Math.hypot(p, q), [u0, v0] = F(x0, y0);
    body += line2(X(x0), Y(y0), X(x0 + 0.42 * p / L), Y(y0 + 0.42 * q / L), C, 2.4, "", true) +
      line2(X(x0), Y(y0), X(x0 + u0), Y(y0 + v0), R, 2, "", true) + dot(X(x0), Y(y0), R, 2.8) +
      vec(X(x0 + u0) + 8, Y(y0 + v0) - 2, "F", R, 13) +
      vec(X(x0 + 0.42 * p / L) + 6, Y(y0 + 0.42 * q / L) + 15, "r", "#b8640a", 13, "Δ");
    const [ax, ay] = g(0), [bx, by] = g(1);
    body += dot(X(ax), Y(ay), AX, 3) + dot(X(bx), Y(by), AX, 3) +
      lab(X(ax) - 2, Y(ay) + 16, "A", { size: 13 }) + lab(X(bx) + 2, Y(by) + 16, "B", { size: 13 }) +
      zh(100, 157, "每一小段：F · Δr，方向一反就变号", "#b8640a", 11);
    return fig(body);
  }

  // ③ 格林：每个小方块逆时针绕一圈，公共边一来一回抵消，只剩外圈
  function plot3() {
    const G = "#16a05a", D = "#0d6b3a", s = 42, x0 = 37, y0 = 14, nx = 3, ny = 3;
    let body = `<rect x="${x0}" y="${y0}" width="${nx * s}" height="${ny * s}" fill="${G}" fill-opacity="0.12"/>`;
    const e = 6, k = 0.22;
    const edge = (xa, ya, xb, yb) => line2(xa + (xb - xa) * k, ya + (yb - ya) * k, xb - (xb - xa) * k, yb - (yb - ya) * k, "#5fb98a", 1.3, "", true);
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
      const L = x0 + i * s + e, R = x0 + (i + 1) * s - e, T = y0 + j * s + e, B = y0 + (j + 1) * s - e;
      // 逆时针（数学方向）：下边向右、右边向上、上边向左、左边向下
      body += edge(L, B, R, B) + edge(R, B, R, T) + edge(R, T, L, T) + edge(L, T, L, B);
    }
    const X1 = x0 + nx * s, Y1 = y0 + ny * s;
    body += `<rect x="${x0}" y="${y0}" width="${nx * s}" height="${ny * s}" fill="none" stroke="${D}" stroke-width="2.2"/>`;
    for (const [xa, ya, xb, yb] of [[x0 + 50, Y1, x0 + 80, Y1], [X1, Y1 - 50, X1, Y1 - 80], [X1 - 50, y0, X1 - 80, y0], [x0, y0 + 50, x0, y0 + 80]])
      body += line2(xa, ya, xb, yb, D, 2.6, "", true);
    body += zh(100, 157, "公共边一来一回，只剩外圈", G, 11);
    return fig(body);
  }

  // ④ 从 A 到 B 的三条路，积分都相等
  function plot4() {
    const V = "#7b3fd0", { X, Y } = flat(100, 80, 60);
    const A = [-1.25, -0.8], B = [1.2, 0.85];
    const straight = sample((t) => [X(A[0] + (B[0] - A[0]) * t), Y(A[1] + (B[1] - A[1]) * t)], 0, 1, 2);
    const curve = sample((t) => { const x = A[0] + (B[0] - A[0]) * t, y = A[1] + (B[1] - A[1]) * t + 0.75 * Math.sin(Math.PI * t); return [X(x), Y(y)]; }, 0, 1, 60);
    const broken = [[X(A[0]), Y(A[1])], [X(B[0]), Y(A[1])], [X(B[0]), Y(B[1])]];
    const mid = (pts, a) => { const i = Math.floor(pts.length * a); return [pts[i - 1], pts[i]]; };
    let body = path2(curve, V, 2) + path2(straight, "#9b6fe0", 2) + path2(broken, "#b9a3e3", 2);
    const tip = (p, q, c) => line2(p[0], p[1], p[0] + (q[0] - p[0]) * 1.001, p[1] + (q[1] - p[1]) * 1.001, c, 2, "", true);
    const [c0, c1] = mid(curve, 0.5); body += tip(c0, c1, V);
    body += line2(X(-0.05), Y(0.0), X(0.05), Y(0.067), "#9b6fe0", 2, "", true);
    body += line2(X(0), Y(A[1]), X(0.12), Y(A[1]), "#b9a3e3", 2, "", true) + line2(X(B[0]), Y(0), X(B[0]), Y(0.12), "#b9a3e3", 2, "", true);
    body += dot(X(A[0]), Y(A[1]), AX, 3.4) + dot(X(B[0]), Y(B[1]), AX, 3.4) +
      lab(X(A[0]) - 9, Y(A[1]) + 4, "A", { size: 13 }) + lab(X(B[0]) - 11, Y(B[1]) - 2, "B", { size: 13 }) +
      zh(100, 157, "三条路，积分都等于 u(B) − u(A)", "#5b2fb0", 11);
    return fig(body);
  }

  // ⑤ 流过曲面：小块面积 ΔS，单位法向量 n，流速 v；流过的是 v 在 n 上的分量
  function plot5() {
    const P = view(100, 112, 42), T = "#0e8f8a", N = "#7b3fd0";
    const z = (x, y) => 0.85 + 0.22 * x - 0.18 * y * y;
    const h = 1;
    const edge = [...sample((y) => [h, y, z(h, y)], -h, h, 20), ...sample((x) => [x, h, z(x, h)], h, -h, 20),
      ...sample((y) => [-h, y, z(-h, y)], h, -h, 20), ...sample((x) => [x, -h, z(x, -h)], -h, h, 20)];
    // 流速：平行的箭头，从曲面下方穿到上方
    const vdir = [0.25, 0.15, 1];
    let body = "";
    for (const [a, b] of [[-0.55, -0.5], [0.55, 0.45], [-0.5, 0.6], [0.6, -0.55]]) {
      const zz = z(a, b);
      body += curve3(P, (t) => [a + vdir[0] * t, b + vdir[1] * t, zz + vdir[2] * t], -0.9, 0, "#9fd6d3", 1.3, "3 2", 4);
    }
    body += fill3(P, edge, T, 0.16, T, 1.6);
    for (const c of [-0.5, 0, 0.5]) {
      body += curve3(P, (y) => [c, y, z(c, y)], -h, h, "#7cc5c1", 0.8, "", 30) + curve3(P, (x) => [x, c, z(x, c)], -h, h, "#7cc5c1", 0.8, "", 30);
    }
    // 小块 ΔS
    const x0 = 0.05, y0 = 0.1, d = 0.2;
    body += fill3(P, [[x0 - d, y0 - d, z(x0 - d, y0 - d)], [x0 + d, y0 - d, z(x0 + d, y0 - d)], [x0 + d, y0 + d, z(x0 + d, y0 + d)], [x0 - d, y0 + d, z(x0 - d, y0 + d)]], "#f08a1c", 0.7, "#f08a1c", 1);
    for (const [a, b] of [[-0.55, -0.5], [0.55, 0.45], [-0.5, 0.6], [0.6, -0.55]]) {
      const zz = z(a, b);
      body += curve3(P, (t) => [a + vdir[0] * t, b + vdir[1] * t, zz + vdir[2] * t], 0, 0.75, T, 1.5, "", 4, true);
    }
    // 法向量 n = (−z_x, −z_y, 1) 归一化
    const zx = 0.22, zy = -0.36 * y0, L = Math.hypot(zx, zy, 1), z0 = z(x0, y0);
    const n = [-zx / L, -zy / L, 1 / L];
    const [px, py] = P(x0, y0, z0), [qx, qy] = P(x0 + 0.85 * n[0], y0 + 0.85 * n[1], z0 + 0.85 * n[2]);
    body += line2(px, py, qx, qy, N, 2.4, "", true) + dot(px, py, N, 2.4) +
      vec(qx + 9, qy + 6, "n", N, 14) +
      vec(P(0.6 + 0.19, -0.55 + 0.11, z(0.6, -0.55) + 0.75)[0] + 8, P(0.6 + 0.19, -0.55 + 0.11, z(0.6, -0.55) + 0.75)[1] + 4, "v", T, 14) +
      `<text x="${f1(px + 16)}" y="${f1(py + 14)}" font-family="'Times New Roman',serif" font-size="12.5" fill="#b8640a" text-anchor="middle">Δ<tspan font-style="italic">S</tspan></text>` +
      zh(100, 157, "每一小块：v · n × ΔS，先定哪一侧", T, 11);
    return fig(body);
  }

  // ⑥ 左：闭曲面，往外流出（高斯）；右：空间闭曲线张成曲面，右手法则（斯托克斯）
  function plot6() {
    const B = "#3b47c4", R = "#e2463f";
    // 左：球面
    const P = view(50, 76, 30), r = 1;
    const ring = (Pv, R0, z0, c, w, back = "3 3") =>
      curve3(Pv, (t) => [R0 * Math.cos(t), R0 * Math.sin(t), z0], PHI - Math.PI / 2, PHI + Math.PI / 2, c, w) +
      curve3(Pv, (t) => [R0 * Math.cos(t), R0 * Math.sin(t), z0], PHI + Math.PI / 2, PHI + 1.5 * Math.PI, c, w, back);
    const [cx, cy] = P(0, 0, 0);
    let left = `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="30" fill="${B}" fill-opacity="0.1" stroke="${B}" stroke-width="1.6"/>` + ring(P, r, 0, "#8d94de", 1);
    for (const [a, e] of [[0, 1.2], [1.6, 1.2], [3.2, 1.2], [4.7, 1.2], [0.8, -0.6], [2.6, 0.2], [4.2, -0.5], [5.5, 0.4]]) {
      const d = [Math.cos(e) * Math.cos(a), Math.cos(e) * Math.sin(a), Math.sin(e)];
      const front = d[0] * Math.cos(PHI) + d[1] * Math.sin(PHI) > -0.2;
      if (!front) continue;
      const [ux, uy] = P(d[0], d[1], d[2]), [vx, vy] = P(1.55 * d[0], 1.55 * d[1], 1.55 * d[2]);
      left += line2(ux, uy, vx, vy, R, 1.6, "", true);
    }
    left += zh(50, 141, "闭曲面：往外流出", B, 11) + zh(50, 156, "高斯", B, 11);
    // 右：上半球面，边界是 xOy 面上的圆，逆时针（从上往下看）
    const Q = view(150, 104, 30);
    let right = "";
    const dome = [...sample((t) => Q(Math.cos(t) * Math.cos(PHI + Math.PI / 2), Math.cos(t) * Math.sin(PHI + Math.PI / 2), Math.sin(t)), 0, Math.PI, 40)];
    right += `<path d="${pts2(dome)}" fill="${B}" fill-opacity="0.1" stroke="${B}" stroke-width="1.5"/>`;
    right += fill3(Q, sample((t) => [Math.cos(t), Math.sin(t), 0], 0, 2 * Math.PI, 60), B, 0.05);
    right += ring(Q, 1, 0, R, 1.8);
    // 圆周上的方向箭头（前方，从左往右）
    right += curve3(Q, (t) => [Math.cos(t), Math.sin(t), 0], PHI - 0.25, PHI + 0.05, R, 2, "", 8, true);
    const [tx0, ty0] = Q(0, 0, 1), [tx1, ty1] = Q(0, 0, 1.75);
    right += line2(tx0, ty0, tx1, ty1, "#7b3fd0", 2.2, "", true) + dot(tx0, ty0, "#7b3fd0", 2.4) +
      vec(tx1 + 9, ty1 + 6, "n", "#7b3fd0", 14) +
      lab(Q(Math.cos(PHI - 0.6), Math.sin(PHI - 0.6), 0)[0] - 2, Q(Math.cos(PHI - 0.6), Math.sin(PHI - 0.6), 0)[1] + 15, "Γ", { size: 13, color: R }) +
      zh(150, 141, "闭曲线：右手法则", B, 11) + zh(150, 156, "斯托克斯", B, 11);
    return fig(left + `<line x1="100" y1="10" x2="100" y2="150" stroke="#d9dce3" stroke-width="1"/>` + right);
  }

  return {
    chapter: "第 7 章",
    name: "曲线积分与曲面积分",
    nameSize: 20,
    mainline: "把重积分的办法\n搬到弯的线和面上，\n再把边界换成里面",
    height: 1030,
    keyLabel: "重点",
    layers: [
      // 字间加 U+2060（不断行），否则单站括号太窄，标签会折成两行
      { from: 1, to: 1, label: "不⁠分⁠方⁠向", color: "#2f6fe0" },
      { from: 2, to: 4, label: "沿着曲线", color: "#c46c0c" },
      { from: 5, to: 6, label: "穿过曲面", color: "#3b47c4" },
    ],
    stations: [
      { n: 1, name: "弯的线和面上的总量", color: "#2f6fe0", bg: "#eaf2fe", w: 230,
        desc: "切成小段（小块），密度当常数，乘弧长（面积），加起来，取极限；与方向、侧无关",
        fig: plot1(),
        groups: [["第一类曲线积分", ["$\\int_L f\\,\\mathrm{d}s = \\lim\\limits_{\\lambda \\to 0}\\sum f(\\xi_i, \\eta_i)\\Delta s_i$", "化成定积分，下限小于上限：\n$\\mathrm{d}s = \\sqrt{\\varphi'^2(t) + \\psi'^2(t)}\\,\\mathrm{d}t$"]],
                 ["第一类曲面积分", ["$\\iint_\\Sigma f\\,\\mathrm{d}S$：小块换成曲面的面积", "投影到 $xOy$ 面：\n$\\mathrm{d}S = \\sqrt{1 + z_x^2 + z_y^2}\\,\\mathrm{d}x\\,\\mathrm{d}y$"]],
                 ["怎么算更省事", ["先把曲线、曲面的方程\n代进被积函数", "对称、轮换照搬重积分", "权：$1$ 弧长、面积；$\\mu$ 质量\n$x\\mu$ 静矩；$d^2\\mu$ 转动惯量"]]] },
      { n: 2, name: "沿着路走做的功", color: "#f08a1c", bg: "#fff3e6", w: 220,
        desc: "每一小段上力和位移作数量积：$P\\,\\Delta x + Q\\,\\Delta y$；路的方向一反，积分变号",
        fig: plot2(),
        groups: [["第二类曲线积分", ["$\\int_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y$\n力 $\\boldsymbol{F} = (P, Q)$ 沿 $L$ 做的功", "反向变号：$\\int_{L^-} = -\\int_L$"]],
                 ["怎么算", ["参数化：下限对应起点，\n上限对应终点", "$\\int_\\alpha^\\beta [P\\varphi'(t) + Q\\psi'(t)]\\,\\mathrm{d}t$", "空间曲线多一项 $R\\,\\mathrm{d}z$\n交线先写成参数式"]],
                 ["两类的联系", ["$\\int_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y$\n$= \\int_L (P\\cos\\alpha + Q\\cos\\beta)\\,\\mathrm{d}s$\n$(\\cos\\alpha, \\cos\\beta)$：单位切向量"]]] },
      { n: 3, name: "绕一圈换成二重积分", color: "#16a05a", bg: "#e9f7ef", w: 226, key: true,
        desc: "区域切成小块，每块各绕一圈，公共边抵消，只剩外圈：这是格林公式",
        fig: plot3(),
        groups: [["格林公式", ["$\\oint_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y$\n$= \\iint_D \\left(\\dfrac{\\partial Q}{\\partial x} - \\dfrac{\\partial P}{\\partial y}\\right)\\mathrm{d}x\\,\\mathrm{d}y$", "查三件事：闭不闭；正向；\n$P$、$Q$ 在 $D$ 上偏导数连续", "正向：沿边界走，区域在左边"]],
                 ["条件不满足", ["不闭：补线\n$\\int_L = \\oint_{L + L_1} - \\int_{L_1}$", "有奇点：挖掉，\n换成绕小圆的积分"]],
                 ["面积", ["$A = \\dfrac{1}{2}\\oint_L x\\,\\mathrm{d}y - y\\,\\mathrm{d}x$"]]] },
      { n: 4, name: "只看起点和终点", color: "#7b3fd0", bg: "#f3ecfd", w: 220, key: true,
        desc: "区域里没有洞、处处 $\\dfrac{\\partial Q}{\\partial x} = \\dfrac{\\partial P}{\\partial y}$：绕哪一圈都是 $0$，走哪条路都一样",
        fig: plot4(),
        groups: [["四条等价（单连通）", ["与路径无关 $\\iff$ 闭路积分为 $0$", "$\\iff \\dfrac{\\partial P}{\\partial y} = \\dfrac{\\partial Q}{\\partial x}$\n$\\iff P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = \\mathrm{d}u$"]],
                 ["怎么用", ["$\\int_A^B P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = u(B) - u(A)$\n或改走平行于坐标轴的折线", "求 $u$：沿折线积分\n或先对 $x$ 积分，再定 $\\varphi(y)$"]],
                 ["有洞时", ["$\\dfrac{x\\,\\mathrm{d}y - y\\,\\mathrm{d}x}{x^2 + y^2}$：原点外偏导相等\n绕原点一圈却是 $2\\pi$"]]] },
      { n: 5, name: "流过一张曲面的量", color: "#0e8f8a", bg: "#e6f6f5", w: 230,
        desc: "先定哪一侧为正；每一小块流过 $\\boldsymbol{v} \\cdot \\boldsymbol{n}\\,\\Delta S$，加起来；换一侧，变号",
        fig: plot5(),
        groups: [["第二类曲面积分", ["流量 $= \\iint_\\Sigma \\boldsymbol{v} \\cdot \\boldsymbol{n}\\,\\mathrm{d}S$", "$= \\iint_\\Sigma P\\,\\mathrm{d}y\\,\\mathrm{d}z + Q\\,\\mathrm{d}z\\,\\mathrm{d}x$\n$\\quad + R\\,\\mathrm{d}x\\,\\mathrm{d}y$"]],
                 ["怎么算", ["分面投影：\n$\\iint_\\Sigma R\\,\\mathrm{d}x\\,\\mathrm{d}y = \\pm\\iint_{D_{xy}} R\\,\\mathrm{d}x\\,\\mathrm{d}y$\n上侧取正，下侧取负", "合一投影（上侧）：\n$\\iint_{D_{xy}} (-Pz_x - Qz_y + R)\\,\\mathrm{d}x\\,\\mathrm{d}y$"]],
                 ["对称", ["与第一类相反：$R$ 关于 $z$\n偶 $\\Rightarrow 0$，奇 $\\Rightarrow$ 加倍"]]] },
      { n: 6, name: "闭曲面和空间曲线", color: "#3b47c4", bg: "#ecedfb", w: 230, key: true,
        desc: "格林公式的两个空间版本：闭曲面上的流出量，闭曲线上的绕圈积分，都换成里面的积分",
        fig: plot6(),
        groups: [["高斯公式", ["$\\oiint_\\Sigma \\boldsymbol{A} \\cdot \\boldsymbol{n}\\,\\mathrm{d}S = \\iiint_\\Omega \\operatorname{div}\\boldsymbol{A}\\,\\mathrm{d}v$\n$\\Sigma$ 取外侧", "$\\operatorname{div}\\boldsymbol{A} = P_x + Q_y + R_z$", "不闭：补面；有奇点：挖掉"]],
                 ["斯托克斯公式", ["$\\oint_\\Gamma \\boldsymbol{A} \\cdot \\mathrm{d}\\boldsymbol{r} = \\iint_\\Sigma \\operatorname{rot}\\boldsymbol{A} \\cdot \\boldsymbol{n}\\,\\mathrm{d}S$\n$\\Gamma$ 与 $\\Sigma$ 的侧：右手法则", "$\\operatorname{rot}\\boldsymbol{A}$\n$= (R_y - Q_z, P_z - R_x, Q_x - P_y)$", "$\\Sigma$ 在 $xOy$ 面上：\n就是格林公式"]]] },
    ],
  };
};
