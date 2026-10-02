// 高数第 4 章路线图的内容。导出：node tools/mindmap.cjs drafts/calculus-vector-geometry-mindmap-v1.cjs drafts/calculus-vector-geometry-mindmap-v1.webp
module.exports = ({ tx, lab, zh, dot, svg, AX }) => {
  // 正投影：绕 z 轴转 φ、再俯视 e，水平的圆画出来是横放的椭圆
  const PHI = 25 * Math.PI / 180, EL = 22 * Math.PI / 180;
  const view = (cx, cy, s) => (x, y, z) => [
    cx + s * (-x * Math.sin(PHI) + y * Math.cos(PHI)),
    cy - s * (z * Math.cos(EL) - (x * Math.cos(PHI) + y * Math.sin(PHI)) * Math.sin(EL)),
  ];
  const f1 = (n) => n.toFixed(1);
  const seg = (P, a, b, c = AX, w = 1.4, dash = "", arrow = false) => {
    const [x1, y1] = P(...a), [x2, y2] = P(...b);
    return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}${arrow ? ` marker-end="url(#${arrow === true ? "ah" : arrow})"` : ""}/>`;
  };
  // 彩色箭头：每种颜色一个 marker
  const marks = new Set();
  const mk = (c) => { marks.add(c); return "m" + c.slice(1); };
  const arrowDefs = () => [...marks].map((c) => `<marker id="m${c.slice(1)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join("");
  const vec = (P, a, b, c, w = 2.6) => seg(P, a, b, c, w, "", mk(c));
  const poly = (P, pts, fill, op, stroke = "none", sw = 1) =>
    `<path d="M${pts.map((p) => P(...p).map(f1).join(" ")).join(" L")} Z" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}"/>`;
  const curve3 = (P, g, a, b, c, w = 2, dash = "", n = 90) => {
    let d = "";
    for (let i = 0; i <= n; i++) { const [u, v] = P(...g(a + (b - a) * i / n)); d += (i ? "L" : "M") + f1(u) + " " + f1(v) + " "; }
    return `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  };
  // 高度 z、半径 r 的水平圆：前半实线、后半虚线
  const ring = (P, r, z, c, w = 1.6, back = true) =>
    curve3(P, (t) => [r * Math.cos(t), r * Math.sin(t), z], -Math.PI / 2 + PHI, Math.PI / 2 + PHI, c, w) +
    curve3(P, (t) => [r * Math.cos(t), r * Math.sin(t), z], Math.PI / 2 + PHI, 1.5 * Math.PI + PHI, c, w, back ? "3 3" : "");
  const axes3 = (P, L) =>
    seg(P, [0, 0, 0], [L[0], 0, 0], AX, 1.3, "", true) + seg(P, [0, 0, 0], [0, L[1], 0], AX, 1.3, "", true) + seg(P, [0, 0, 0], [0, 0, L[2]], AX, 1.3, "", true) +
    lab(...P(L[0] + 0.25, 0, 0), "x", { size: 12 }) + lab(...P(0, L[1] + 0.3, -0.12), "y", { size: 12 }) + lab(...P(0, -0.25, L[2]), "z", { size: 12 });
  const bold = (x, y, s, c, size = 13) => `<text x="${f1(x)}" y="${f1(y)}" font-family="'Times New Roman',serif" font-weight="700" font-size="${size}" fill="${c}" text-anchor="middle">${s}</text>`;
  const fig = (body) => svg(`<defs>${arrowDefs()}</defs>` + body);

  // ① 向量 a 由三个坐标确定：虚线画出坐标盒
  function plot1() {
    const P = view(74, 118, 36);
    const A = [1.4, 2.3, 1.9], c = "#2f6fe0";
    const body =
      axes3(P, [2.0, 3.2, 2.6]) +
      seg(P, [A[0], 0, 0], [A[0], A[1], 0], "#8a8f98", 1, "3 3") + seg(P, [0, A[1], 0], [A[0], A[1], 0], "#8a8f98", 1, "3 3") +
      seg(P, [A[0], A[1], 0], A, "#8a8f98", 1, "3 3") + seg(P, [0, 0, A[2]], A, "#8a8f98", 1, "3 3") +
      vec(P, [0, 0, 0], A, c) + dot(...P(...A), c, 3.2) +
      bold(P(...A)[0] + 12, P(...A)[1] + 4, "a", c, 16) +
      zh(100, 158, "三个坐标定下长度和方向", c, 11);
    return fig(body);
  }
  // ② 向量积：a、b 张成平行四边形，a×b 同时垂直于两者，长度等于面积
  function plot2() {
    const P = view(60, 102, 32);
    const a = [1.6, 0.9, 0], b = [0, 2.8, 0], c = "#f08a1c";
    const body =
      poly(P, [[0, 0, 0], a, [a[0] + b[0], a[1] + b[1], 0], b], c, 0.22, c, 1) +
      vec(P, [0, 0, 0], a, "#2f6fe0") + vec(P, [0, 0, 0], b, "#16a05a") + vec(P, [0, 0, 0], [0, 0, 2.3], "#e2463f") +
      bold(...P(a[0] + 0.15, a[1] - 0.55, 0), "a", "#2f6fe0", 15) + bold(...P(0, b[1] + 0.1, 0.3), "b", "#16a05a", 15) +
      bold(P(0, 0, 2.3)[0] + 26, P(0, 0, 2.3)[1] + 12, "a × b", "#e2463f", 14) +
      zh(...P(a[0] / 2, 1.9, 0), "面积", "#b8640a", 11.5) +
      zh(100, 159, "同时垂直于 a、b；长度 = 面积", "#b8640a", 11);
    return fig(body);
  }
  // ③ 左：平面 = 一个点 + 法向量；右：直线 = 一个点 + 方向向量
  function plot3() {
    const L = view(52, 100, 24), c = "#16a05a";
    const left =
      poly(L, [[1.3, -1.6, 0], [1.3, 1.6, 0], [-1.3, 1.6, 0], [-1.3, -1.6, 0]], c, 0.2, c, 1) +
      vec(L, [0, 0, 0], [0, 0, 2.3], "#e2463f", 2.4) + dot(...L(0, 0, 0), AX, 3.2) +
      bold(L(0, 0, 2.3)[0] + 10, L(0, 0, 2.3)[1] + 10, "n", "#e2463f", 14) +
      lab(L(0, 0, 0)[0] + 13, L(0, 0, 0)[1] + 12, "M", { size: 12 }) + lab(L(0, 0, 0)[0] + 21, L(0, 0, 0)[1] + 15, "0", { size: 8, upright: true }) +
      zh(52, 156, "平面：点 + n", "#16a05a", 11.5);
    const R = view(150, 92, 24);
    const right =
      seg(R, [0.6, -1.8, -1.1], [-0.6, 1.8, 1.1], "#2f6fe0", 2) +
      vec(R, [0, 0, 0], [-0.3, 0.95, 0.55], "#e2463f", 2.4) + dot(...R(0, 0, 0), AX, 3.2) +
      bold(...R(-0.25, 0.75, 1.2), "s", "#e2463f", 14) +
      lab(R(0, 0, 0)[0] + 2, R(0, 0, 0)[1] + 17, "M", { size: 12 }) + lab(R(0, 0, 0)[0] + 10, R(0, 0, 0)[1] + 20, "0", { size: 8, upright: true }) +
      zh(150, 156, "直线：点 + s", "#16a05a", 11.5);
    return fig(left + `<line x1="101" y1="12" x2="101" y2="146" stroke="#d9dce3" stroke-width="1"/>` + right);
  }
  // ④ 点到平面的距离 = 连线向量在法向量上的投影长
  function plot4() {
    const P = view(100, 112, 30), c = "#7b3fd0";
    const M0 = [0, 0.4, 2.1], N = [0, 0.4, 0], M1 = [0.6, -1.6, 0];
    const body =
      poly(P, [[1.4, -2.4, 0], [1.4, 2.4, 0], [-1.4, 2.4, 0], [-1.4, -2.4, 0]], c, 0.14, c, 1) +
      seg(P, N, M0, "#8a8f98", 1.2, "4 3") + dot(...P(...N), "#8a8f98", 2.6) +
      vec(P, M1, M0, "#e2463f", 2.2) + vec(P, M1, [M1[0], M1[1], 1.25], "#2f6fe0", 2.2) +
      dot(...P(...M0), AX, 3.2) + dot(...P(...M1), AX, 3.2) +
      lab(P(...M0)[0] + 12, P(...M0)[1] - 2, "M", { size: 12 }) + lab(P(...M0)[0] + 20, P(...M0)[1] + 1, "0", { size: 8, upright: true }) +
      lab(P(...M1)[0] - 6, P(...M1)[1] + 15, "M", { size: 12 }) + lab(P(...M1)[0] + 2, P(...M1)[1] + 18, "1", { size: 8, upright: true }) +
      bold(P(M1[0], M1[1], 1.25)[0] - 9, P(M1[0], M1[1], 1.25)[1] + 2, "n", "#2f6fe0", 14) +
      lab(P(0, 0.4, 1.05)[0] + 9, P(0, 0.4, 1.05)[1] + 4, "d", { size: 13, color: "#7b3fd0" }) +
      zh(100, 156, "d = 连线在 n 上的投影长", "#7b3fd0", 11);
    return fig(body);
  }
  // ⑤ 直线 (1, t, t) 绕 z 轴转一周：每点高度不变、到 z 轴的距离不变，得到单叶双曲面
  function plot5() {
    const P = view(100, 76, 26), c = "#e2463f", z0 = 1.45, r = (z) => Math.sqrt(1 + z * z);
    // 轮廓线直接在屏幕上画：水平圆的最左、最右点在圆心左右各 s·r 处
    const sil = (sgn) => { let d = ""; for (let i = 0; i <= 60; i++) { const z = -z0 + 2 * z0 * i / 60, [u, v] = P(0, 0, z); d += (i ? "L" : "M") + f1(u + sgn * 26 * r(z)) + " " + f1(v) + " "; } return `<path d="${d}" stroke="#2f6fe0" stroke-width="1.8" fill="none"/>`; };
    const body =
      seg(P, [0, 0, -z0 - 0.35], [0, 0, z0 + 0.55], AX, 1.3, "", true) + lab(...P(0, -0.25, z0 + 0.6), "z", { size: 12 }) +
      sil(-1) + sil(1) + ring(P, r(-z0), -z0, "#2f6fe0", 1.4) + ring(P, 1, 0, "#2f6fe0", 1.4) + ring(P, r(z0), z0, "#2f6fe0", 1.6, false) +
      curve3(P, (t) => [1, t, t], -z0, z0, c, 2.6) +
      zh(100, 156, "高度不变，到 z 轴的距离不变", c, 11);
    return fig(body);
  }
  // ⑥ 立体压到 xOy 面上：顶上的交线圆投下来，围成投影区域 D
  function plot6() {
    const P = view(100, 126, 42), c = "#3b47c4", h0 = 0.6, top = 1.6, S = 42;
    const sil = (sgn) => { let d = ""; for (let i = 0; i <= 50; i++) { const z = h0 + (top - h0) * i / 50, [u, v] = P(0, 0, z); d += (i ? "L" : "M") + f1(u + sgn * S * Math.sqrt(z - h0)) + " " + f1(v) + " "; } return `<path d="${d}" stroke="#2f6fe0" stroke-width="1.8" fill="none"/>`; };
    const disk = (() => { let pts = []; for (let i = 0; i <= 72; i++) { const t = 2 * Math.PI * i / 72; pts.push([Math.cos(t), Math.sin(t), 0]); } return poly(P, pts, c, 0.22, c, 1.4); })();
    const body =
      seg(P, [0, 0, 0], [1.25, 0, 0], AX, 1.3, "", true) + seg(P, [0, 0, 0], [0, 1.7, 0], AX, 1.3, "", true) + seg(P, [0, 0, 0], [0, 0, 1.95], AX, 1.3, "", true) +
      lab(...P(1.45, 0.1, 0), "x", { size: 12 }) + lab(...P(0, 1.95, -0.1), "y", { size: 12 }) + lab(...P(0, -0.2, 2.0), "z", { size: 12 }) +
      disk +
      `<line x1="${f1(P(0, 0, top)[0] - S)}" y1="${f1(P(0, 0, top)[1])}" x2="${f1(P(0, 0, 0)[0] - S)}" y2="${f1(P(0, 0, 0)[1])}" stroke="#8a8f98" stroke-width="1" stroke-dasharray="3 3"/>` +
      `<line x1="${f1(P(0, 0, top)[0] + S)}" y1="${f1(P(0, 0, top)[1])}" x2="${f1(P(0, 0, 0)[0] + S)}" y2="${f1(P(0, 0, 0)[1])}" stroke="#8a8f98" stroke-width="1" stroke-dasharray="3 3"/>` +
      sil(-1) + sil(1) + ring(P, 1, top, "#e2463f", 2, false) +
      lab(P(0.2, 0.55, 0)[0] + 2, P(0.2, 0.55, 0)[1] + 4, "D", { size: 13, color: c }) +
      zh(100, 159, "交线投下来，围成投影区域", c, 11);
    return fig(body);
  }

  return {
    chapter: "第 4 章",
    name: "向量代数与空间解析几何",
    nameSize: 17.5,
    mainline: "为多元微积分，\n描述空间里的图形",
    height: 1240,
    keyLabel: "重点",
    layers: [
      { from: 1, to: 2, label: "工具", color: "#c46c0c" },
      { from: 3, to: 4, label: "平的图形", color: "#16a05a" },
      { from: 5, to: 6, label: "弯的图形", color: "#3b47c4" },
    ],
    stations: [
      { n: 1, name: "空间里的长度和方向", color: "#2f6fe0", bg: "#eaf2fe", w: 210,
        desc: "用三个坐标表示一个向量，长度和方向都从坐标算出",
        fig: plot1(),
        groups: [["向量的坐标", ["$\\boldsymbol{a} = (a_x, a_y, a_z)$", "$\\overrightarrow{M_1M_2}$ = 终点坐标 − 起点坐标"]],
                 ["长度和方向", ["$|\\boldsymbol{a}| = \\sqrt{a_x^2 + a_y^2 + a_z^2}$", "方向余弦：$\\cos\\alpha = \\dfrac{a_x}{|\\boldsymbol{a}|}$ 等\n$\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$"]],
                 ["平行", ["$\\boldsymbol{b} \\parallel \\boldsymbol{a} \\iff$ 坐标成比例", "分母为 $0$ 时，分子也为 $0$（边界）"]]] },
      { n: 2, name: "向量的三种乘法", color: "#f08a1c", bg: "#fff3e6", w: 226,
        desc: "两个向量：数量积管夹角、垂直，向量积管垂直方向、面积；三个向量：混合积管共面、体积",
        fig: plot2(),
        groups: [["数量积（得一个数）", ["$\\boldsymbol{a} \\cdot \\boldsymbol{b} = |\\boldsymbol{a}||\\boldsymbol{b}|\\cos\\theta$\n$= a_xb_x + a_yb_y + a_zb_z$", "垂直 $\\iff \\boldsymbol{a} \\cdot \\boldsymbol{b} = 0$", "投影：$\\operatorname{Prj}_{\\boldsymbol{b}}\\boldsymbol{a} = \\dfrac{\\boldsymbol{a} \\cdot \\boldsymbol{b}}{|\\boldsymbol{b}|}$"]],
                 ["向量积（得一个向量）", ["同时垂直于 $\\boldsymbol{a}, \\boldsymbol{b}$，右手法则", "$|\\boldsymbol{a} \\times \\boldsymbol{b}|$ = 平行四边形面积", "平行 $\\iff \\boldsymbol{a} \\times \\boldsymbol{b} = \\boldsymbol{0}$"]],
                 ["混合积（得一个数）", ["$[\\boldsymbol{a}\\ \\boldsymbol{b}\\ \\boldsymbol{c}] = (\\boldsymbol{a} \\times \\boldsymbol{b}) \\cdot \\boldsymbol{c}$ = 三阶行列式", "绝对值 = 平行六面体体积\n共面 $\\iff [\\boldsymbol{a}\\ \\boldsymbol{b}\\ \\boldsymbol{c}] = 0$"]]] },
      { n: 3, name: "平面和直线", color: "#16a05a", bg: "#e9f7ef", w: 232,
        desc: "都由一个点加一个向量确定：平面用法向量 $\\boldsymbol{n}$，直线用方向向量 $\\boldsymbol{s}$",
        fig: plot3(),
        groups: [["平面", ["点法式：$A(x - x_0) + B(y - y_0)$\n$+ C(z - z_0) = 0$", "一般式：$Ax + By + Cz + D = 0$\n$\\boldsymbol{n} = (A, B, C)$", "截距式、三点式（查表）"]],
                 ["直线", ["对称式：$\\dfrac{x - x_0}{m} = \\dfrac{y - y_0}{n} = \\dfrac{z - z_0}{p}$", "一般式：两个平面的交线\n$\\boldsymbol{s} = \\boldsymbol{n}_1 \\times \\boldsymbol{n}_2$"]],
                 ["平面束", ["过两平面的交线：\n$\\pi_1 + \\lambda\\pi_2 = 0$（不含 $\\pi_2$）", "$\\pi_i$ 指平面方程的左边"]]] },
      { n: 4, name: "两个图形摆在一起", color: "#7b3fd0", bg: "#f3ecfd", w: 244, key: true,
        desc: "先比较两个向量，需要时再代一个点；距离分别用三种乘法算",
        fig: plot4(),
        groups: [["位置关系", ["两个向量：点积为 $0$ 是垂直，叉积为 $\\boldsymbol{0}$ 是平行", "线面要翻译：\n线 ⊥ 面 $\\iff \\boldsymbol{s} \\parallel \\boldsymbol{n}$\n线 ∥ 面 $\\iff \\boldsymbol{s} \\perp \\boldsymbol{n}$（边界）", "平行还是重合：代一个点", "两直线共面 $\\iff [\\overrightarrow{M_1M_2}\\ \\boldsymbol{s}_1\\ \\boldsymbol{s}_2] = 0$"]],
                 ["夹角", ["面面：$\\cos\\theta = \\dfrac{|\\boldsymbol{n}_1 \\cdot \\boldsymbol{n}_2|}{|\\boldsymbol{n}_1||\\boldsymbol{n}_2|}$\n线线：把 $\\boldsymbol{n}$ 换成 $\\boldsymbol{s}$", "线面：$\\sin\\varphi = \\dfrac{|\\boldsymbol{s} \\cdot \\boldsymbol{n}|}{|\\boldsymbol{s}||\\boldsymbol{n}|}$"]],
                 ["距离", ["点到面：投影长 $\\dfrac{|\\overrightarrow{M_1M_0} \\cdot \\boldsymbol{n}|}{|\\boldsymbol{n}|}$", "点到线：面积 ÷ 底 $\\dfrac{|\\overrightarrow{M_1M_0} \\times \\boldsymbol{s}|}{|\\boldsymbol{s}|}$", "异面直线：体积 ÷ 底面积"]],
                 ["常见操作", ["垂足、对称点", "直线在平面上的投影（平面束）"]]] },
      { n: 5, name: "曲面长什么样", color: "#e2463f", bg: "#fdecec", w: 222, key: true,
        desc: "从方程看形状：缺一个变量是柱面，$x^2 + y^2$ 整体出现是旋转曲面，其余用截痕法",
        fig: plot5(),
        groups: [["柱面", ["缺 $z$：$F(x, y) = 0$\n母线平行于 $z$ 轴"]],
                 ["旋转曲面", ["绕 $z$ 轴转：高度不变，到轴的距离不变", "$yOz$ 面上的曲线 $f(y, z) = 0$：\n$f(\\pm\\sqrt{x^2 + y^2},\\ z) = 0$", "空间曲线（常考直线）：\n$x^2 + y^2 = x^2(t) + y^2(t)$，$z = z(t)$，消去 $t$"]],
                 ["二次曲面（查表）", ["球面、椭球面、锥面、单叶与双叶双曲面、椭圆抛物面、马鞍面", "认形状：用 $z = c$ 等平面去切，看截痕"]]] },
      { n: 6, name: "压到坐标面上", color: "#3b47c4", bg: "#ecedfb", w: 200, key: true,
        desc: "空间曲线是两张曲面的交线；消去 $z$，得到它在 $xOy$ 面上的投影",
        fig: plot6(),
        groups: [["空间曲线", ["一般式：两张曲面的交线", "参数式：\n$x = x(t),\\ y = y(t),\\ z = z(t)$"]],
                 ["曲线的投影", ["消去 $z$ 得 $H(x, y) = 0$：投影柱面", "投影曲线：$H(x, y) = 0$，$z = 0$"]],
                 ["立体的投影区域", ["找围成立体的曲面的交线（或侧面轮廓），投影下来，所围区域就是 $D_{xy}$"]]] },
    ],
  };
};
