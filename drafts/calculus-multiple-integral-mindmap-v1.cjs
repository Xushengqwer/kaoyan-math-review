// 高数第 6 章路线图的内容。导出：node tools/mindmap.cjs drafts/calculus-multiple-integral-mindmap-v1.cjs drafts/calculus-multiple-integral-mindmap-v1.webp
module.exports = ({ tx, frame, pathOf, axes, lab, zh, dot, svg, AX }) => {
  // 正投影：绕 z 轴转 φ、再俯视 e（与第 4、5 章路线图同一套视角）
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
  const path2 = (pts, c, w = 2, dash = "", fill = "none", op = 1) =>
    `<path d="${pts2(pts)}" stroke="${c}" stroke-width="${w}" fill="${fill}" fill-opacity="${op}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  const sample = (g, a, b, n = 80) => { const p = []; for (let i = 0; i <= n; i++) p.push(g(a + (b - a) * i / n)); return p; };
  const curve3 = (P, g, a, b, c, w = 2, dash = "", n = 80) => path2(sample((t) => P(...g(t)), a, b, n), c, w, dash);
  const fill3 = (P, pts, fill, op, stroke = "none", sw = 1) => `<path d="${pts2(pts.map((p) => P(...p)))} Z" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}"/>`;
  // 斜体字母带下标，如 φ₁(x)、D_xy
  const sub = (x, y, base, s, tail = "", opt = {}) =>
    `<text x="${f1(x)}" y="${f1(y)}" font-family="'Times New Roman',serif" font-style="italic" font-size="${opt.size || 13}" fill="${opt.color || AX}" text-anchor="${opt.anchor || "middle"}">${base}<tspan font-size="${(opt.size || 13) * 0.68}" dy="3">${s}</tspan>${tail ? `<tspan dy="-3">${tail}</tspan>` : ""}</text>`;
  // 「d」正体、后面的字母斜体，如 dσ、r dθ
  const dd = (x, y, pre, v, c, size = 12, anchor = "middle") =>
    `<text x="${f1(x)}" y="${f1(y)}" font-family="'Times New Roman',serif" font-size="${size}" fill="${c}" text-anchor="${anchor}">${pre ? `<tspan font-style="italic">${pre}</tspan> ` : ""}d<tspan font-style="italic">${v}</tspan></text>`;
  // 平面上的圆（在 xOy 面里以 (x0, y0) 为心、半径 R，高度 z），前半实线、后半虚线
  const front = (t) => Math.cos(t - PHI) > 0;
  const ring = (P, R, z, c, w = 1.4, x0 = 0, y0 = 0, back = "3 3") =>
    curve3(P, (t) => [x0 + R * Math.cos(t), y0 + R * Math.sin(t), z], PHI - Math.PI / 2, PHI + Math.PI / 2, c, w) +
    curve3(P, (t) => [x0 + R * Math.cos(t), y0 + R * Math.sin(t), z], PHI + Math.PI / 2, PHI + 1.5 * Math.PI, c, w, back);

  // ① 曲顶柱体：底 D 是圆，顶是曲面 z = f(x, y)；切出一个小柱体，当平顶
  function plot1() {
    const P = view(100, 124, 44), R = 1.2, C = "#2f6fe0";
    const f = (x, y) => 1.25 + 0.3 * Math.cos(1.2 * x + 0.4) + 0.18 * y;
    const bd = (t) => [R * Math.cos(t), R * Math.sin(t)];
    const tl = PHI + Math.PI / 2, tr = PHI - Math.PI / 2;
    // 前侧面：底边前半 + 顶边前半倒回
    const wall = [...sample((t) => [...bd(t), 0], tr, tl), ...sample((t) => [...bd(t), f(...bd(t))], tl, tr)];
    let body = fill3(P, sample((t) => [...bd(t), 0], 0, 2 * Math.PI), C, 0.06) +
      fill3(P, wall, C, 0.07) +
      ring(P, R, 0, "#8aa6d6", 1.2) +
      fill3(P, sample((t) => [...bd(t), f(...bd(t))], 0, 2 * Math.PI), C, 0.2, C, 1.8);
    // 顶面网格
    for (const c of [-0.8, -0.4, 0, 0.4, 0.8]) {
      const h = Math.sqrt(R * R - c * c);
      body += curve3(P, (y) => [c, y, f(c, y)], -h, h, "#7fa3e6", 0.8) + curve3(P, (x) => [x, c, f(x, c)], -h, h, "#7fa3e6", 0.8);
    }
    for (const t of [tl, tr]) { const [a, b] = bd(t); body += curve3(P, (z) => [a, b, z], 0, f(a, b), C, 1.6); }
    // 小柱体：底是 dσ，高取其中一点的函数值
    const x0 = 0.35, y0 = -0.05, h = 0.16, z0 = f(x0, y0), O = "#f08a1c";
    const sq = (z) => [[x0 - h, y0 - h, z], [x0 + h, y0 - h, z], [x0 + h, y0 + h, z], [x0 - h, y0 + h, z]];
    body += fill3(P, sq(0), O, 0.75, O, 1) +
      fill3(P, [[x0 + h, y0 - h, 0], [x0 + h, y0 + h, 0], [x0 + h, y0 + h, z0], [x0 + h, y0 - h, z0]], O, 0.35, O, 1) +
      fill3(P, [[x0 - h, y0 + h, 0], [x0 + h, y0 + h, 0], [x0 + h, y0 + h, z0], [x0 - h, y0 + h, z0]], O, 0.45, O, 1) +
      fill3(P, sq(z0), O, 0.6, O, 1);
    const [bx, by] = P(x0 + h, y0 + h, 0), [dx, dy] = P(-0.35, 0.72, 0);
    body += dd(bx + 12, by + 2, "", "σ", "#b8640a", 12.5, "start") + lab(dx, dy + 3, "D", { size: 13, color: "#4a6fb0" }) +
      zh(100, 157, "每一小块当平顶柱体", C, 11);
    return fig(body);
  }

  // ② X 型区域：竖线从下边界 φ₁(x) 进、从上边界 φ₂(x) 出
  function plot2() {
    const { X, Y } = frame([-0.3, 3.4], [-0.25, 2.4]);
    const p2 = (x) => 1.75 + 0.22 * Math.sin(1.5 * x) - 0.04 * x * x, p1 = (x) => 0.55 + 0.12 * (x - 1.7) ** 2;
    const a = 0.45, b = 3.05, x = 1.9, C = "#f08a1c", R = "#e2463f";
    const region = [...sample((t) => [X(t), Y(p2(t))], a, b), ...sample((t) => [X(t), Y(p1(t))], b, a)];
    return fig(
      path2(region, C, 1.8, "", C, 0.18) + axes(X(0), Y(0)) +
      line2(X(a), Y(p1(a)), X(a), Y(0), "#8a8f98", 1, "2.5 2.5") + line2(X(b), Y(p1(b)), X(b), Y(0), "#8a8f98", 1, "2.5 2.5") +
      line2(X(x), Y(0), X(x), Y(p1(x)), "#8a8f98", 1, "2.5 2.5") +
      line2(X(x), Y(p1(x)), X(x), Y(p2(x)) + 2, R, 2.4, "", true) +
      dot(X(x), Y(p1(x)), R, 3.2) + dot(X(x), Y(p2(x)), R, 3.2) +
      sub(X(0.95), Y(p2(0.95)) - 7, "φ", "2", "(x)", { size: 13, color: "#b8640a" }) +
      sub(X(0.95), Y(p1(0.95)) + 15, "φ", "1", "(x)", { size: 13, color: "#b8640a" }) +
      lab(X(a), Y(0) + 15, "a") + lab(X(b), Y(0) + 15, "b") + lab(X(x), Y(0) + 15, "x", { color: R }) +
      zh(100, 157, "竖线从下边界进、从上边界出", "#b8640a", 11)
    );
  }

  // ③ 极坐标：按射线和圆周切，小块是扇环，两边 dr、r dθ
  function plot3() {
    const { X, Y } = flat(98, 80, 60), G = "#16a05a";
    const deg = Math.PI / 180, r1 = 0.5, r2 = 0.8, t1 = 35 * deg, t2 = 58 * deg;
    let body = `<circle cx="${X(0)}" cy="${Y(0)}" r="60" fill="${G}" fill-opacity="0.1" stroke="${G}" stroke-width="1.8"/>`;
    for (const r of [0.2, 0.35, 0.5, 0.65, 0.8]) body += `<circle cx="${X(0)}" cy="${Y(0)}" r="${60 * r}" fill="none" stroke="#9fd3b6" stroke-width="0.8"/>`;
    for (let k = 0; k < 24; k++) { const t = k * 15 * deg; body += line2(X(0), Y(0), X(Math.cos(t)), Y(Math.sin(t)), "#9fd3b6", 0.8); }
    const pt = (r, t) => [X(r * Math.cos(t)), Y(r * Math.sin(t))];
    const cell = [...sample((t) => pt(r2, t), t1, t2, 30), ...sample((t) => pt(r1, t), t2, t1, 30)];
    body += path2(cell, G, 1.6, "", G, 0.55);
    // 两条边：径向 dr（θ = t1 处），弧向 r dθ（r = r2 处）
    const [mx, my] = pt((r1 + r2) / 2, t1), [ax, ay] = pt(r2, (t1 + t2) / 2);
    body += dd(mx + 12, my + 12, "", "r", "#0d6b3a", 12.5) +
      `<text x="${f1(ax + 11)}" y="${f1(ay - 8)}" font-family="'Times New Roman',serif" font-size="12.5" fill="#0d6b3a" text-anchor="middle"><tspan font-style="italic">r</tspan> d<tspan font-style="italic">θ</tspan></text>` +
      dot(X(0), Y(0), AX, 3) + lab(X(0) - 9, Y(0) + 13, "O", { size: 12 }) +
      zh(100, 157, "扇环：边长 dr 和 r dθ", G, 11);
    return fig(body);
  }

  // ④ 左：竖着切，细柱从下曲面 z₁ 进、上曲面 z₂ 出；右：横着切，截面 D_z
  function plot4() {
    const V = "#7b3fd0";
    // 左：圆柱形区域上，下曲面 z₁ = 0.5 + 0.3r²，上曲面 z₂ = 2.6 − 0.4r²
    const P = view(50, 116, 30), R = 1;
    const z1 = (x, y) => 0.5 + 0.3 * (x * x + y * y), z2 = (x, y) => 2.6 - 0.4 * (x * x + y * y);
    const u = [-Math.sin(PHI), Math.cos(PHI)];
    let left = fill3(P, sample((t) => [R * Math.cos(t), R * Math.sin(t), 0], 0, 2 * Math.PI), V, 0.22, V, 1) +
      ring(P, R, z1(R, 0), V, 1.3) + ring(P, R, z2(R, 0), V, 1.3, 0, 0, "") +
      curve3(P, (t) => [t * u[0], t * u[1], z2(t * u[0], t * u[1])], -R, R, V, 1.3) +
      curve3(P, (t) => [t * u[0], t * u[1], z1(t * u[0], t * u[1])], -R, R, V, 1, "3 3");
    for (const s of [-1, 1]) {
      const x = s * R * u[0], y = s * R * u[1];
      left += curve3(P, (z) => [x, y, z], z1(x, y), z2(x, y), V, 1.3) + curve3(P, (z) => [x, y, z], 0, z1(x, y), "#b9a3e3", 0.9, "2 2");
    }
    const nx = 0.1, ny = -0.35;
    const [b0x, b0y] = P(nx, ny, 0), [b1x, b1y] = P(nx, ny, z1(nx, ny)), [b2x, b2y] = P(nx, ny, z2(nx, ny));
    left += line2(b0x, b0y, b1x, b1y, "#8a8f98", 1, "2.5 2.5") + line2(b1x, b1y, b2x, b2y + 3, "#e2463f", 2.4, "", true) +
      dot(b0x, b0y, AX, 2.6) + dot(b1x, b1y, "#e2463f", 2.6) +
      sub(b1x + 6, b1y + 12, "z", "1", "", { size: 12, color: "#e2463f", anchor: "start" }) +
      sub(b2x + 6, b2y + 8, "z", "2", "", { size: 12, color: "#e2463f", anchor: "start" }) +
      sub(67, 124, "D", "xy", "", { size: 12, color: "#5b2fb0" }) +
      zh(50, 156, "竖着切：先一后二", V, 11);
    // 右：碗形区域 1.6(x² + y²) ≤ z ≤ 2.4，高度 c 处的截面是圆
    const Q = view(150, 118, 30), k = 1.6, h = 2.4, Rr = Math.sqrt(h / k), c = 1.15, rc = Math.sqrt(c / k);
    let right = fill3(Q, sample((t) => [Rr * Math.cos(t), Rr * Math.sin(t), h], 0, 2 * Math.PI), V, 0.08, V, 1.3) +
      curve3(Q, (t) => [t * u[0], t * u[1], k * t * t], -Rr, Rr, V, 1.4) +
      line2(...Q(0, 0, 0), ...Q(0, 0, h + 0.8), "#8a8f98", 1, "2.5 2.5") +
      fill3(Q, sample((t) => [rc * Math.cos(t), rc * Math.sin(t), c], 0, 2 * Math.PI), "#e2463f", 0.4, "#e2463f", 1.4);
    const [sx, sy] = Q(rc * u[0], rc * u[1], c), [zx, zy] = Q(0, 0, h + 0.8);
    right += sub(sx + 6, sy + 4, "D", "z", "", { size: 12, color: "#e2463f", anchor: "start" }) +
      lab(zx + 7, zy + 4, "z", { size: 12 }) +
      zh(150, 156, "横着切：先二后一", V, 11);
    return fig(left + `<line x1="100" y1="10" x2="100" y2="146" stroke="#d9dce3" stroke-width="1"/>` + right);
  }

  // ⑤ 区域关于 y 轴对称，f 关于 x 是奇函数：(x, y) 与 (−x, y) 处的值相反，两半抵消
  function plot5() {
    const { X, Y } = flat(100, 70, 55), C = "#e2463f", V = "#7b3fd0";
    const lo = (x) => 0.45 * x * x - 0.95, hi = (x) => 0.85 - 0.2 * x * x, A = 1.25;
    const half = (a, b) => [...sample((t) => [X(t), Y(hi(t))], a, b), ...sample((t) => [X(t), Y(lo(t))], b, a)];
    return fig(
      path2(half(-A, 0), C, 0, "", C, 0.22) + path2(half(0, A), V, 0, "", V, 0.22) +
      path2([...sample((t) => [X(t), Y(hi(t))], -A, A), ...sample((t) => [X(t), Y(lo(t))], A, -A), [X(-A), Y(hi(-A))]], "#6b6f78", 1.6) +
      line2(14, Y(0), 190, Y(0), AX, 1.4, "", true) + line2(X(0), 140, X(0), 8, AX, 1.8, "", true) +
      lab(186, Y(0) + 14, "x", { size: 12 }) + lab(X(0) + 9, 16, "y", { size: 12 }) +
      dot(X(0.62), Y(0.3), V, 3.2) + dot(X(-0.62), Y(0.3), C, 3.2) +
      lab(X(0.62), Y(0.3) - 8, "f", { size: 13, color: V }) +
      `<text x="${f1(X(-0.62))}" y="${f1(Y(0.3) - 8)}" font-family="'Times New Roman',serif" font-size="13" fill="${C}" text-anchor="middle">−<tspan font-style="italic">f</tspan></text>` +
      zh(X(0.7), Y(-0.45), "+", V, 17) + zh(X(-0.7), Y(-0.45), "−", C, 17) +
      zh(100, 157, "左右对称、f 关于 x 是奇函数：抵消", C, 11)
    );
  }

  // ⑥ 权的阶梯：同一个 ∬(权) dσ，权不同，得到的量不同
  function table6() {
    const B = "#3b47c4";
    const row = (w, s) => `<div style="display:flex;align-items:center;gap:4px;margin:5px 0">` +
      `<div style="width:52px;flex:none;border:2px solid ${B};border-radius:8px;background:#fff;padding:2px 0;text-align:center;font-size:13px;color:${B}">${tx(w)}</div>` +
      `<svg width="16" height="10" viewBox="0 0 16 10" style="flex:none"><path d="M1 5H13M9 1L14 5L9 9" stroke="${B}" fill="none" stroke-width="1.5"/></svg>` +
      `<div style="flex:1;font-size:13px;font-weight:600;color:#2a2f6e;line-height:1.35">${tx(s)}</div></div>`;
    return `<div style="text-align:center;font-size:13.5px;font-weight:700;color:#4a5060;margin-bottom:2px">${tx("$\\iint_D (\\text{权})\\,\\mathrm{d}\\sigma$，权取：")}</div>` +
      row("$1$", "面积（三重：体积）") + row("$\\mu$", "质量") + row("$x\\mu$", "一次矩，除以质量是质心") + row("$d^2\\mu$", "转动惯量\n$d$：到轴的距离");
  }

  return {
    chapter: "第 6 章",
    name: "重积分",
    mainline: "把定积分的办法\n搬到区域和立体上，\n再化回定积分",
    height: 1080,
    stations: [
      { n: 1, name: "曲顶柱体的体积怎么算", color: "#2f6fe0", bg: "#eaf2fe", w: 246,
        desc: "切成小块，每块当平顶柱体，加起来，再取极限；区域换成立体，就是三重积分",
        fig: plot1(),
        groups: [["二重积分是什么", ["$\\iint_D f\\,\\mathrm{d}\\sigma = \\lim\\limits_{\\lambda \\to 0}\\sum f(\\xi_i, \\eta_i)\\Delta\\sigma_i$", "$f \\ge 0$：曲顶柱体的体积\n$\\iint_D 1\\,\\mathrm{d}\\sigma$ = $D$ 的面积", "有界闭区域上连续 $\\Rightarrow$ 二重积分存在"]],
                 ["三重积分", ["$D$ 换成立体 $\\Omega$，$\\mathrm{d}\\sigma$ 换成 $\\mathrm{d}v$", "$\\iiint_\\Omega 1\\,\\mathrm{d}v$ = 体积\n$f$ 是密度时 = 质量"]],
                 ["性质（照搬定积分）", ["线性、区域可加、比较、估值", "中值：$\\iint_D f\\,\\mathrm{d}\\sigma = f(\\xi, \\eta)\\,\\sigma$\n推平后的高度，顶上一定取得到", "缩成一点：\n$\\dfrac{1}{\\pi r^2}\\iint_{x^2 + y^2 \\le r^2} f\\,\\mathrm{d}\\sigma \\to f(0, 0)$"]]] },
      { n: 2, name: "怎么化成两次定积分", color: "#f08a1c", bg: "#fff3e6", w: 224, key: true,
        desc: "$x$ 处的截面面积 $A(x) = \\int f\\,\\mathrm{d}y$，再对 $x$ 积分：二重积分 = 两次定积分",
        fig: plot2(),
        groups: [["直角坐标", ["X 型：$\\int_a^b \\mathrm{d}x\\int_{\\varphi_1(x)}^{\\varphi_2(x)} f\\,\\mathrm{d}y$", "Y 型：$\\int_c^d \\mathrm{d}y\\int_{\\psi_1(y)}^{\\psi_2(y)} f\\,\\mathrm{d}x$", "两型都不是：分块，用区域可加"]],
                 ["交换次序", ["由上下限还原区域 → 画图 → 按另一型重写", "为什么换：\n边界中途换式子，要分块\n内层积不出，如 $e^{y^2}$、$\\dfrac{\\sin y}{y}$", "$\\int_0^1 \\mathrm{d}x\\int_x^1 e^{y^2}\\,\\mathrm{d}y = \\int_0^1 y\\,e^{y^2}\\,\\mathrm{d}y$"]]] },
      { n: 3, name: "区域是圆的怎么办", color: "#16a05a", bg: "#e9f7ef", w: 212, key: true,
        desc: "按圆来切：小块是扇环，两边是 $\\mathrm{d}r$、$r\\,\\mathrm{d}\\theta$，所以 $\\mathrm{d}\\sigma = r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta$",
        fig: plot3(),
        groups: [["什么时候用", ["区域是圆、扇形、圆环", "被积函数里有 $x^2 + y^2$\n多出的 $r$ 常能凑微分：$\\int e^{-r^2}r\\,\\mathrm{d}r$"]],
                 ["怎么定限", ["先定 $\\theta$ 的范围，\n再看射线从哪进、从哪出", "极点在边界或内部：\n内层下限是 $0$", "$x^2 + y^2 = 2x$：$r = 2\\cos\\theta$\n$x^2 + y^2 = 2y$：$r = 2\\sin\\theta$"]],
                 ["一般换元", ["$\\mathrm{d}x\\,\\mathrm{d}y = |J|\\,\\mathrm{d}u\\,\\mathrm{d}v$\n$J = \\dfrac{\\partial(x, y)}{\\partial(u, v)}$；极坐标 $J = r$"]]] },
      { n: 4, name: "三重积分怎么算", color: "#7b3fd0", bg: "#f3ecfd", w: 226, key: true,
        desc: "同样的事再做一次：竖着切先积 $z$，横着切先积截面；圆的立体按形状切",
        fig: plot4(),
        groups: [["直角坐标", ["先一后二：\n$\\iint_{D_{xy}} \\mathrm{d}x\\,\\mathrm{d}y\\int_{z_1(x, y)}^{z_2(x, y)} f\\,\\mathrm{d}z$\n$D_{xy}$：投影区域（第 4 章）", "先二后一：$\\int_{c_1}^{c_2} \\mathrm{d}z\\iint_{D_z} f\\,\\mathrm{d}x\\,\\mathrm{d}y$", "只含 $z$：$\\int_{c_1}^{c_2} f(z)S(z)\\,\\mathrm{d}z$\n$S(z)$：截面面积"]],
                 ["柱面坐标", ["$xOy$ 面上用极坐标，$z$ 不动", "$\\mathrm{d}v = \\rho\\,\\mathrm{d}\\rho\\,\\mathrm{d}\\theta\\,\\mathrm{d}z$\n圆柱、旋转抛物面"]],
                 ["球面坐标", ["$x = r\\sin\\varphi\\cos\\theta$，$y = r\\sin\\varphi\\sin\\theta$\n$z = r\\cos\\varphi$", "$\\mathrm{d}v = r^2\\sin\\varphi\\,\\mathrm{d}r\\,\\mathrm{d}\\varphi\\,\\mathrm{d}\\theta$\n三条边：$\\mathrm{d}r$、$r\\,\\mathrm{d}\\varphi$、$r\\sin\\varphi\\,\\mathrm{d}\\theta$", "球面 $r = $ 常数；圆锥面 $\\varphi = $ 常数"]]] },
      { n: 5, name: "重积分怎么算更省事", color: "#e2463f", bg: "#fdecec", w: 224, key: true,
        desc: "动手之前先看对称：奇函数两半抵消；$x, y$ 互换区域不变，积分也不变",
        fig: plot5(),
        groups: [["奇偶对称", ["关于 $y$ 轴对称，看 $f$ 关于 $x$\n奇 $\\Rightarrow 0$；偶 $\\Rightarrow$ 一半的 $2$ 倍", "关于 $x$ 轴对称，看 $y$\n关于原点对称，看 $f(-x, -y)$", "三重：关于 $xOy$ 面对称，看 $z$"]],
                 ["轮换对称", ["区域关于 $y = x$ 对称：\n$\\iint_D f(x, y)\\,\\mathrm{d}\\sigma = \\iint_D f(y, x)\\,\\mathrm{d}\\sigma$", "$\\iint_D x^2\\,\\mathrm{d}\\sigma = \\dfrac{1}{2}\\iint_D (x^2 + y^2)\\,\\mathrm{d}\\sigma$", "三重：$x, y, z$ 任意互换区域不变\n$\\iiint x^2\\,\\mathrm{d}v = \\iiint z^2\\,\\mathrm{d}v$"]]] },
      { n: 6, name: "什么量能用重积分算", color: "#3b47c4", bg: "#ecedfb", w: 224,
        desc: "能切成小块，每块近似「权 × 面积元」，总量等于各块相加，就能写成重积分",
        fig: table6(),
        groups: [["几何量", ["体积：$\\iint_D (f - g)\\,\\mathrm{d}\\sigma$，$f$ 在上", "曲面面积：\n$\\mathrm{d}S = \\sqrt{1 + f_x^2 + f_y^2}\\,\\mathrm{d}\\sigma$\n由 $\\boldsymbol{n} = (f_x, f_y, -1)$（第 5 章）"]],
                 ["物理量", ["质量：$M = \\iint_D \\mu\\,\\mathrm{d}\\sigma$", "质心：$\\bar{x} = \\dfrac{1}{M}\\iint_D x\\mu\\,\\mathrm{d}\\sigma$\n形心反用：$\\iint_D x\\,\\mathrm{d}\\sigma = \\bar{x}\\,\\sigma$", "转动惯量：\n$I_z = \\iiint_\\Omega (x^2 + y^2)\\rho\\,\\mathrm{d}v$"]]] },
    ],
  };
};
