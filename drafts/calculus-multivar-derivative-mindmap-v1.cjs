// 高数第 5 章路线图的内容。导出：node tools/mindmap.cjs drafts/calculus-multivar-derivative-mindmap-v1.cjs drafts/calculus-multivar-derivative-mindmap-v1.webp
module.exports = ({ tx, lab, zh, dot, svg, AX }) => {
  // 正投影：绕 z 轴转 φ、再俯视 e（与第 4 章路线图同一套视角）
  const PHI = 25 * Math.PI / 180, EL = 22 * Math.PI / 180;
  const view = (cx, cy, s) => (x, y, z) => [
    cx + s * (-x * Math.sin(PHI) + y * Math.cos(PHI)),
    cy - s * (z * Math.cos(EL) - (x * Math.cos(PHI) + y * Math.sin(PHI)) * Math.sin(EL)),
  ];
  // 平面图：横竖同一比例，垂直才画得出垂直
  const flat = (cx, cy, s) => ({ X: (x) => cx + s * x, Y: (y) => cy - s * y });
  const f1 = (n) => n.toFixed(1);
  const marks = new Set();
  const mk = (c) => { marks.add(c); return "m" + c.slice(1); };
  const arrowDefs = () => [...marks].map((c) => `<marker id="m${c.slice(1)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join("");
  const fig = (body) => svg(`<defs>${arrowDefs()}</defs>` + body);
  const line2 = (x1, y1, x2, y2, c, w = 1.4, dash = "", arrow = false) =>
    `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}${arrow ? ` marker-end="url(#${mk(c)})"` : ""}/>`;
  const pts2 = (pts) => pts.map(([u, v], i) => (i ? "L" : "M") + f1(u) + " " + f1(v)).join(" ");
  const path2 = (pts, c, w = 2, dash = "", arrow = false, fill = "none") =>
    `<path d="${pts2(pts)}" stroke="${c}" stroke-width="${w}" fill="${fill}"${dash ? ` stroke-dasharray="${dash}"` : ""}${arrow ? ` marker-end="url(#${mk(c)})"` : ""}/>`;
  const curve3 = (P, g, a, b, c, w = 2, dash = "", n = 80) => {
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push(P(...g(a + (b - a) * i / n)));
    return path2(pts, c, w, dash);
  };
  const poly3 = (P, pts, fill, op, stroke = "none", sw = 1) =>
    `<path d="${pts2(pts.map((p) => P(...p)))} Z" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}"/>`;
  const vec3 = (P, a, b, c, w = 2.4) => { const [x1, y1] = P(...a), [x2, y2] = P(...b); return line2(x1, y1, x2, y2, c, w, "", true); };
  // 加粗的向量名、grad f
  const bold = (x, y, s, c, size = 13) => `<text x="${f1(x)}" y="${f1(y)}" font-family="'Times New Roman',serif" font-weight="700" font-size="${size}" fill="${c}" text-anchor="middle">${s}</text>`;
  const grad = (x, y, fn, c, size = 12.5, anchor = "middle") => `<text x="${f1(x)}" y="${f1(y)}" font-family="'Times New Roman',serif" font-size="${size}" fill="${c}" text-anchor="${anchor}">grad <tspan font-style="italic">${fn}</tspan></text>`;

  // ① 从四面八方靠近 P0：直线、抛物线、螺旋线
  function plot1() {
    const cx = 100, cy = 74, R = 62, r0 = 10;
    let body = "";
    for (const [deg, c] of [[30, "#2f6fe0"], [150, "#16a05a"], [272, "#7b3fd0"]]) {
      const t = deg * Math.PI / 180;
      body += line2(cx + R * Math.cos(t), cy - R * Math.sin(t), cx + r0 * Math.cos(t), cy - r0 * Math.sin(t), c, 2, "", true);
    }
    // 抛物线：从右下方弯过来，贴着水平方向进入
    const par = [];
    for (let i = 0; i <= 40; i++) { const u = 1.3 - 1.12 * i / 40; par.push([cx + 46 * u, cy + 40 * u * u]); }
    body += path2(par, "#e2463f", 2, "", true);
    // 螺旋线：绕两圈靠近
    const sp = [];
    for (let i = 0; i <= 200; i++) { const th = 3.4 + 4 * Math.PI * i / 200, rr = 60 - 48 * i / 200; sp.push([cx + rr * Math.cos(th), cy - 0.8 * rr * Math.sin(th)]); }
    body += path2(sp, "#f08a1c", 1.5, "", true);
    body += dot(cx, cy, AX, 4) + lab(cx - 17, cy + 17, "P", { size: 13 }) + lab(cx - 9, cy + 20, "0", { size: 8, upright: true }) +
      zh(100, 157, "任意路径靠近，都要趋于同一个数", "#2f6fe0", 11);
    return fig(body);
  }

  // ② 曲面 z = g(x, y)：两条截线的切线（斜率是偏导数）张成切平面
  function plot2() {
    const P = view(96, 112, 38);
    const g = (x, y) => 1.75 - 0.3 * x * x - 0.2 * y * y;
    const gx = (x) => -0.6 * x, gy = (y) => -0.4 * y;
    const x0 = 0.55, y0 = 0.45, z0 = g(x0, y0), a = gx(x0), b = gy(y0);
    let body = "";
    for (let x = -1.5; x <= 1.51; x += 0.5) body += curve3(P, (y) => [x, y, g(x, y)], -1.8, 1.8, "#a9c1ea", 0.9);
    for (let y = -1.8; y <= 1.81; y += 0.6) body += curve3(P, (x) => [x, y, g(x, y)], -1.5, 1.5, "#a9c1ea", 0.9);
    const pl = (dx, dy) => [x0 + dx, y0 + dy, z0 + a * dx + b * dy], h = 0.72;
    body += poly3(P, [pl(-h, -h), pl(h, -h), pl(h, h), pl(-h, h)], "#f08a1c", 0.24, "#f08a1c", 1);
    body += curve3(P, (x) => [x, y0, g(x, y0)], -1.5, 1.5, "#e2463f", 2.2) + curve3(P, (y) => [x0, y, g(x0, y)], -1.8, 1.8, "#16a05a", 2.2);
    body += curve3(P, (t) => [x0 + t, y0, z0 + a * t], -0.95, 0.95, "#e2463f", 1.4, "4 2", 2) +
      curve3(P, (t) => [x0, y0 + t, z0 + b * t], -0.95, 0.95, "#16a05a", 1.4, "4 2", 2);
    const [mx, my] = P(x0, y0, z0);
    body += dot(mx, my, AX, 3.4);
    const [ex, ey] = P(x0 + 0.95, y0, z0 + a * 0.95), [fx, fy] = P(x0, y0 + 0.95, z0 + b * 0.95);
    body += lab(ex - 2, ey + 15, "f", { size: 13, color: "#e2463f" }) + lab(ex + 4, ey + 18, "x", { size: 9, color: "#e2463f" }) +
      lab(fx + 8, fy - 4, "f", { size: 13, color: "#16a05a" }) + lab(fx + 14, fy - 1, "y", { size: 9, color: "#16a05a" }) +
      zh(100, 157, "偏导数：两条截线的斜率", "#b8640a", 11);
    return fig(body);
  }

  // ③ 复合函数：z → u, v → x, y；到 x 有两条路径
  function tree3() {
    const N = { z: [100, 17], u: [58, 60], v: [142, 60], x: [70, 104], y: [130, 104] };
    const R = 13, C1 = "#c46c0c", C2 = "#2f6fe0", G = "#c4c9d2";
    const edge = (p, q, c, w) => { const [x1, y1] = N[p], [x2, y2] = N[q], d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
      return line2(x1 + ux * R, y1 + uy * R, x2 - ux * R, y2 - uy * R, c, w); };
    const node = (k, c) => `<circle cx="${N[k][0]}" cy="${N[k][1]}" r="${R}" fill="#fff" stroke="${c}" stroke-width="2.2"/>` + lab(N[k][0], N[k][1] + 5, k, { size: 15, color: c });
    const body =
      edge("u", "y", G, 1.6) + edge("v", "y", G, 1.6) +
      edge("z", "u", C1, 2.6) + edge("u", "x", C1, 2.6) + edge("z", "v", C2, 2.6) + edge("v", "x", C2, 2.6) +
      node("z", AX) + node("u", C1) + node("v", C2) + node("x", AX) + node("y", "#8a8f98");
    return `<svg viewBox="0 0 200 120" width="100%" xmlns="http://www.w3.org/2000/svg">${body}</svg>` +
      `<div class="chain-sub">${tx("$z_x = \\textcolor{#c46c0c}{f_1'u_x} + \\textcolor{#2f6fe0}{f_2'v_x}$")}</div>` +
      `<div class="chain-sub">每条路径逐层相乘，各条路径相加</div>`;
  }

  // ④ 等值线 x²/4 + y² = c：梯度垂直于等值线，方向导数 = |grad f| cos θ
  function plot4() {
    const { X, Y } = flat(100, 92, 27);
    let body = "";
    for (const c of [0.45, 1.2, 2.15]) {
      const pts = [];
      for (let i = 0; i <= 120; i++) { const t = 2 * Math.PI * i / 120; pts.push([X(2 * Math.sqrt(c) * Math.cos(t)), Y(Math.sqrt(c) * Math.sin(t))]); }
      body += path2(pts, "#b9a3e6", c === 1.2 ? 2 : 1.3);
    }
    const c = 1.2, t0 = 55 * Math.PI / 180, px = 2 * Math.sqrt(c) * Math.cos(t0), py = Math.sqrt(c) * Math.sin(t0);
    const gl = Math.hypot(px / 2, 2 * py), gu = [px / 2 / gl, 2 * py / gl], tu = [gu[1], -gu[0]];
    const th = 50 * Math.PI / 180, eu = [Math.cos(th) * gu[0] + Math.sin(th) * tu[0], Math.cos(th) * gu[1] + Math.sin(th) * tu[1]];
    const L = 1.55, Le = 1.25;
    body += line2(X(px - 1.2 * tu[0]), Y(py - 1.2 * tu[1]), X(px + 1.2 * tu[0]), Y(py + 1.2 * tu[1]), "#8a8f98", 1.2, "4 3");
    // θ 的圆弧
    const arc = [];
    for (let i = 0; i <= 20; i++) { const s = th * i / 20, d = [Math.cos(s) * gu[0] + Math.sin(s) * tu[0], Math.cos(s) * gu[1] + Math.sin(s) * tu[1]]; arc.push([X(px + 0.6 * d[0]), Y(py + 0.6 * d[1])]); }
    body += path2(arc, "#4a5060", 1.1);
    body += line2(X(px), Y(py), X(px + L * gu[0]), Y(py + L * gu[1]), "#e2463f", 2.6, "", true) +
      line2(X(px), Y(py), X(px + Le * eu[0]), Y(py + Le * eu[1]), "#2f6fe0", 2.4, "", true);
    const md = [Math.cos(th / 2) * gu[0] + Math.sin(th / 2) * tu[0], Math.cos(th / 2) * gu[1] + Math.sin(th / 2) * tu[1]];
    body += dot(X(px), Y(py), AX, 3.2) +
      grad(X(px + L * gu[0]) - 4, Y(py + L * gu[1]) - 4, "f", "#e2463f", 12.5, "end") +
      bold(X(px + Le * eu[0]) + 7, Y(py + Le * eu[1]) + 4, "e", "#2f6fe0", 14) +
      lab(X(px + 0.85 * md[0]) + 1, Y(py + 0.85 * md[1]) + 4, "θ", { size: 12, color: "#4a5060" }) +
      zh(100, 157, "沿梯度升得最快；梯度垂直于等值线", "#7b3fd0", 11);
    return fig(body);
  }

  // ⑤ 球面 F = x² + y² + z² − R² = 0：法向量 n = grad F，切平面过 M0 垂直于 n
  function plot5() {
    const P = view(84, 92, 34), Rr = 1.45, C = "#e2463f";
    const nv = (() => { const v = [-0.1, 0.75, 0.6], l = Math.hypot(...v); return v.map((t) => t / l); })();
    const M = nv.map((t) => Rr * t);
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const unit = (v) => { const l = Math.hypot(...v); return v.map((t) => t / l); };
    const u1 = unit(cross([0, 0, 1], nv)), u2 = cross(nv, u1), h = 0.78;
    const pt = (s, t) => M.map((m, i) => m + s * u1[i] + t * u2[i]);
    const [ox, oy] = P(0, 0, 0), rad = 34 * Rr;
    // 赤道：前半实线、后半虚线
    const eq = (a, b, dash) => curve3(P, (t) => [Rr * Math.cos(t), Rr * Math.sin(t), 0], a, b, "#e8a3a0", 1.2, dash);
    let body = `<circle cx="${f1(ox)}" cy="${f1(oy)}" r="${f1(rad)}" fill="${C}" fill-opacity="0.08" stroke="${C}" stroke-width="1.8"/>` +
      eq(-Math.PI / 2 + PHI, Math.PI / 2 + PHI, "") + eq(Math.PI / 2 + PHI, 1.5 * Math.PI + PHI, "3 3") +
      poly3(P, [pt(-h, -h), pt(h, -h), pt(h, h), pt(-h, h)], "#f08a1c", 0.26, "#f08a1c", 1.1) +
      vec3(P, M, M.map((m, i) => m + 1.0 * nv[i]), C, 2.6);
    const [mx, my] = P(...M), [nx, ny] = P(...M.map((m, i) => m + 1.0 * nv[i]));
    body += dot(mx, my, AX, 3.2) +
      lab(mx - 10, my + 15, "M", { size: 12 }) + lab(mx - 2, my + 18, "0", { size: 8, upright: true }) +
      bold(nx + 9, ny + 3, "n", C, 14) +
      zh(100, 157, "法向量 n = grad F", C, 11);
    return fig(body);
  }

  // ⑥ 约束 x + y = 2 上求 f = x² + y² 的最小值：在 (1, 1) 处等值线与直线相切，两个梯度共线
  function plot6() {
    const { X, Y } = flat(50, 122, 37);
    let body = line2(X(-0.3), Y(0), X(3.4), Y(0), AX, 1.3) + line2(X(0), Y(-0.25), X(0), Y(2.95), AX, 1.3) +
      lab(X(3.4) - 2, Y(0) + 14, "x", { size: 12 }) + lab(X(0) - 10, Y(2.95) + 6, "y", { size: 12 });
    for (const r of [0.75, Math.SQRT2, 2.1]) {
      const pts = [];
      for (let i = 0; i <= 60; i++) { const t = (-8 + 106 * i / 60) * Math.PI / 180; pts.push([X(r * Math.cos(t)), Y(r * Math.sin(t))]); }
      body += path2(pts, "#a7aef0", r === Math.SQRT2 ? 2 : 1.3);
    }
    body += line2(X(-0.4), Y(2.4), X(2.6), Y(-0.6), "#16a05a", 2.2);
    const k = Math.SQRT1_2;
    body += line2(X(1), Y(1), X(1 + 0.85 * k), Y(1 + 0.85 * k), "#3b47c4", 2.6, "", true) +
      line2(X(1), Y(1), X(1 - 0.6 * k), Y(1 - 0.6 * k), "#16a05a", 2.6, "", true) +
      dot(X(1), Y(1), AX, 3.4) +
      grad(X(1 + 0.85 * k) + 2, Y(1 + 0.85 * k) - 3, "f", "#3b47c4", 12.5, "start") +
      grad(X(1 - 0.6 * k) - 2, Y(1 - 0.6 * k) + 12, "φ", "#16a05a", 12.5, "end") +
      zh(X(2.5) + 3, Y(-0.6) - 4, "约束", "#16a05a", 10.5, "start") +
      zh(100, 157, "相切处，两个梯度共线", "#3b47c4", 11);
    return fig(body);
  }

  return {
    chapter: "第 5 章",
    name: "多元函数微分学",
    mainline: "站在曲面上一点，\n往四周走，\n高度怎么变",
    height: 1280,
    keyLabel: "重点",
    layers: [
      { from: 1, to: 3, label: "变化率", color: "#c46c0c" },
      { from: 4, to: 5, label: "方向", color: "#7b3fd0" },
      { from: 6, to: 6, label: "极值", color: "#3b47c4" },
    ],
    stations: [
      { n: 1, name: "从四面八方靠近", color: "#2f6fe0", bg: "#eaf2fe", w: 206,
        desc: "一元只有左右两条路；二元可以沿任意路径靠近，极限要求每条路径都趋于同一个数",
        fig: plot1(),
        groups: [["二重极限", ["$(x, y) \\to (x_0, y_0)$ 时 $f(x, y) \\to A$：\n不管沿哪条路径", "连续：$\\lim f(x, y) = f(x_0, y_0)$\n多元初等函数在定义区域内连续"]],
                 ["说明不存在", ["找两条路径，极限不同", "$\\dfrac{xy}{x^2 + y^2}$ 沿 $y = kx$ 得 $\\dfrac{k}{1 + k^2}$"]],
                 ["说明存在", ["夹逼：用与路径无关的量去夹", "$|xy| \\le \\dfrac{x^2 + y^2}{2}$", "极坐标：$|f - A| \\le g(\\rho)$，\n$g(\\rho) \\to 0$ 且与 $\\theta$ 无关"]]] },
      { n: 2, name: "变化有多快", color: "#f08a1c", bg: "#fff3e6", w: 236, key: true,
        desc: "先沿坐标轴看，是偏导数；一点附近整体像一张平面，是可微",
        fig: plot2(),
        groups: [["偏导数", ["$f_x$：只动 $x$，把 $y$ 当常数求导", "分段点处用定义求"]],
                 ["可微", ["$\\Delta z = A\\Delta x + B\\Delta y + o(\\rho)$", "可微时 $A = f_x$，$B = f_y$：\n$\\mathrm{d}z = f_x\\,\\mathrm{d}x + f_y\\,\\mathrm{d}y$", "判可微：$\\lim\\limits_{\\rho \\to 0}\\dfrac{\\Delta z - f_x\\Delta x - f_y\\Delta y}{\\rho} = 0$"]],
                 ["四个概念", ["偏导数连续 $\\Rightarrow$ 可微\n可微 $\\Rightarrow$ 连续，可微 $\\Rightarrow$ 偏导数存在", "反过来都不成立；连续与偏导数存在互不推出"]],
                 ["原点处的反例（边界）", ["$\\sqrt{x^2 + y^2}$：连续，偏导数不存在", "$\\dfrac{xy}{x^2 + y^2}$：偏导数存在，不连续", "$\\sqrt{|xy|}$：连续，偏导数存在，不可微", "$(x^2 + y^2)\\sin\\dfrac{1}{x^2 + y^2}$：\n可微，偏导数不连续", "分式和 $\\sin$ 两例补定义 $f(0, 0) = 0$"]]] },
      { n: 3, name: "怎么求偏导", color: "#16a05a", bg: "#e9f7ef", w: 236, key: true,
        desc: "套着的函数用链式法则；藏在方程里的函数，对恒等式两边求偏导",
        fig: tree3(),
        groups: [["复合函数", ["$z = f(u, v)$：$z_x = f_1'u_x + f_2'v_x$", "全导数：$\\dfrac{\\mathrm{d}z}{\\mathrm{d}t} = f_1'u'(t) + f_2'v'(t)$", "二阶：$f_1'$ 仍是 $x, y$ 的复合函数，\n还要再走一遍链式（易错）", "二阶偏导数连续时 $f_{12}'' = f_{21}''$"]],
                 ["隐函数", ["对 $F(x, y, z(x, y)) \\equiv 0$ 两边对 $x$ 求偏导", "$z_x = -\\dfrac{F_x}{F_z}$，$z_y = -\\dfrac{F_y}{F_z}$（$F_z \\ne 0$）", "方程组：两边求偏导，\n解关于 $u_x, v_x$ 的线性方程组"]],
                 ["全微分", ["形式不变：中间变量也写\n$\\mathrm{d}z = f_1'\\,\\mathrm{d}u + f_2'\\,\\mathrm{d}v$", "两边取全微分，一次得出全部偏导数"]],
                 ["常见操作", ["用变量代换化简含偏导数的方程"]]] },
      { n: 4, name: "往哪个方向升得最快", color: "#7b3fd0", bg: "#f3ecfd", w: 232,
        desc: "可微时，两个偏导数拼出所有方向：\n方向导数 $= \\operatorname{grad} f \\cdot \\boldsymbol{e}$",
        fig: plot4(),
        groups: [["方向导数", ["沿单位向量 $\\boldsymbol{e} = (\\cos\\alpha, \\cos\\beta)$\n走 $t$，$t \\to 0^+$ 时的变化率", "可微时：$\\dfrac{\\partial f}{\\partial l} = f_x\\cos\\alpha + f_y\\cos\\beta$"]],
                 ["梯度", ["$\\operatorname{grad} f = (f_x, f_y)$；三元再加 $f_z$", "$\\dfrac{\\partial f}{\\partial l} = |\\operatorname{grad} f|\\cos\\theta$", "沿梯度升得最快，变化率 $|\\operatorname{grad} f|$\n反方向降得最快", "垂直于等值线 $f(x, y) = c$"]],
                 ["单侧极限（边界）", ["$\\sqrt{x^2 + y^2}$ 在原点：各方向的方向导数都是 $1$，偏导数却不存在", "方向导数都存在，推不出可微"]]] },
      { n: 5, name: "切平面和切线", color: "#e2463f", bg: "#fdecec", w: 222,
        desc: "曲面 $F = 0$ 是 $F$ 的一张等值面，法向量就是 $\\operatorname{grad} F$；再按第 4 章写平面和直线",
        fig: plot5(),
        groups: [["曲面", ["$F(x, y, z) = 0$：\n$\\boldsymbol{n} = (F_x, F_y, F_z)$", "切平面：点法式\n法线：对称式（第 4 章）", "$z = f(x, y)$：$\\boldsymbol{n} = (f_x, f_y, -1)$\n切平面就是全微分：\n$z - z_0 = f_x(x - x_0) + f_y(y - y_0)$"]],
                 ["曲线", ["参数式：$\\boldsymbol{T} = (x'(t_0), y'(t_0), z'(t_0))$", "两张曲面的交线：$\\boldsymbol{T} = \\boldsymbol{n}_1 \\times \\boldsymbol{n}_2$", "切线：对称式\n法平面：点法式"]]] },
      { n: 6, name: "最高点和最低点", color: "#3b47c4", bg: "#ecedfb", w: 224, key: true,
        desc: "驻点是候选，二阶看二次型的符号；有约束时，相切处两个梯度共线",
        fig: plot6(),
        groups: [["无条件极值", ["候选：驻点 $f_x = f_y = 0$，\n以及偏导数不存在的点", "驻点处记\n$A = f_{xx}$，$B = f_{xy}$，$C = f_{yy}$", "$AC - B^2 > 0$：$A > 0$ 极小，$A < 0$ 极大\n$AC - B^2 < 0$：不是极值\n$AC - B^2 = 0$：另行讨论", "二阶泰勒的二次项 $\\frac{1}{2}(Ah^2 + 2Bhk + Ck^2)$ 是二次型，用线代第 4 章「读出符号」"]],
                 ["最值", ["有界闭区域上连续 $\\Rightarrow$ 取得最大值、最小值", "比较：内部的候选点、边界上的最值", "边界：代入化成一元，或用拉格朗日"]],
                 ["条件极值", ["相切：$\\operatorname{grad} f \\parallel \\operatorname{grad}\\varphi$", "$L = f + \\lambda\\varphi$：$L_x = L_y = 0$，$\\varphi = 0$", "两个约束：$L = f + \\lambda\\varphi + \\mu\\psi$"]]] },
    ],
  };
};
