// 高数第 1 章路线图的内容。导出：node tools/mindmap.cjs drafts/calculus-limit-mindmap-v2.cjs drafts/calculus-limit-mindmap-v2.webp
module.exports = ({ tx, frame, pathOf, axes, lab, zh, dot, svg, AX }) => {
  const curve = (f, a, b, X, Y, c = "#2f6fe0", w = 3, n = 120) => `<path d="${pathOf(f, a, b, X, Y, n)}" stroke="${c}" stroke-width="${w}" fill="none"/>`;
  const drop = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8a8f98" stroke-width="1" stroke-dasharray="2.5 2.5"/>`;
  const x0lab = (x, y) => `<text x="${x}" y="${y}" font-family="'Times New Roman',serif" font-size="13" text-anchor="middle" fill="${AX}"><tspan font-style="italic">x</tspan><tspan font-size="9" dy="3">0</tspan></text>`;
  // 两幅并排时用的小坐标系
  const mini = (X, Y, xa, xb, yTop) =>
    `<line x1="${X(xa)}" y1="${Y(0)}" x2="${X(xb)}" y2="${Y(0)}" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
    `<line x1="${X(0)}" y1="${Y(0) + 6}" x2="${X(0)}" y2="${yTop}" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>`;
  const wide = (body, w) => svg(body).replace('viewBox="0 0 200 162"', `viewBox="0 0 ${w} 162"`);

  // ① 函数：一条曲线 y = f(x)
  function plot1() {
    const f = (x) => 0.75 + 0.28 * x + 0.38 * Math.sin(2.1 * x);
    const { X, Y } = frame([-0.2, 3.3], [0, 2.3]);
    return svg(
      axes(X(0), Y(0)) + curve(f, 0.15, 3.15, X, Y) +
      `<text x="${X(1.55)}" y="${Y(2.0)}" font-family="'Times New Roman',serif" font-size="14" fill="#2f6fe0" text-anchor="middle"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text>`
    );
  }
  // ② 为什么需要极限：割线越来越短，趋向切线；Δx = 0 时代不进去
  function plot2() {
    const f = (x) => 0.25 + 0.28 * x * x;
    const { X, Y } = frame([-0.25, 3.3], [0, 2.3]);
    const x0 = 0.75, k = 0.56 * x0, tanL = (x) => f(x0) + k * (x - x0);
    const sec = (x1) => { const s = (f(x1) - f(x0)) / (x1 - x0); return (x) => f(x0) + s * (x - x0); };
    const xs = [2.6, 1.8];
    return svg(
      axes(X(0), Y(0)) +
      `<path d="${pathOf(tanL, 0.05, 3.15, X, Y, 2)}" stroke="#e2463f" stroke-width="2" fill="none"/>` +
      xs.map((x1, i) => `<path d="${pathOf(sec(x1), x0 - 0.4, x1 + 0.15, X, Y, 2)}" stroke="#2f6fe0" stroke-width="1.5" stroke-dasharray="5 4" fill="none" opacity="${[0.95, 0.65][i]}"/>`).join("") +
      curve(f, 0.0, 2.75, X, Y) +
      drop(X(x0), Y(f(x0)), X(1.8), Y(f(x0))) + drop(X(1.8), Y(f(x0)), X(1.8), Y(f(1.8))) +
      lab((X(x0) + X(1.8)) / 2, Y(f(x0)) + 14, "Δx", { upright: true, size: 12 }) +
      lab(X(1.8) + 13, (Y(f(x0)) + Y(f(1.8))) / 2 + 8, "Δy", { upright: true, size: 12 }) +
      xs.map((x1) => dot(X(x1), Y(f(x1)), "#2f6fe0", 3)).join("") + dot(X(x0), Y(f(x0)), "#e2463f", 4.4) +
      zh(X(1.75), Y(1.6), "割线", "#2f6fe0", 10.5, "end") + zh(X(3.05), Y(tanL(3.05)) + 15, "切线", "#e2463f", 10.5)
    );
  }
  // ③ 极限：x 靠近 x0（蓝色竖条）时，f(x) 落进 A ± ε（红色横条）；x0 处空心，与 f(x0) 无关
  function plot3() {
    const A = 1.3, eps = 0.3, x0 = 1.6;
    const f = (x) => A + 0.75 * (2 / Math.PI) * Math.atan(1.6 * (x - x0));
    const d = Math.tan(eps / 0.75 * Math.PI / 2) / 1.6; // |x - x0| < d 时 |f(x) - A| < ε
    const { X, Y } = frame([-0.75, 3.3], [0, 2.3]);
    const band = (y1, y2) => `<rect x="${X(0)}" y="${Y(y2)}" width="${X(3.2) - X(0)}" height="${Y(y1) - Y(y2)}" fill="#e2463f" opacity="0.13"/>`;
    const hl = (y) => `<line x1="${X(0)}" y1="${Y(y)}" x2="${X(3.2)}" y2="${Y(y)}" stroke="#e2463f" stroke-width="1.1" stroke-dasharray="4 3"/>`;
    return svg(
      band(A - eps, A + eps) + hl(A - eps) + hl(A + eps) +
      `<rect x="${X(x0 - d)}" y="${Y(2.25)}" width="${X(x0 + d) - X(x0 - d)}" height="${Y(0) - Y(2.25)}" fill="#2f6fe0" opacity="0.1"/>` +
      axes(X(0), Y(0)) + drop(X(x0), Y(A), X(x0), Y(0)) +
      curve(f, 0.1, 3.2, X, Y) + dot(X(x0), Y(A), "#2f6fe0", 4.2, true) +
      lab(X(0) - 4, Y(A + eps) + 4, "A+ε", { anchor: "end", size: 12 }) + lab(X(0) - 4, Y(A) + 4, "A", { anchor: "end", size: 12 }) +
      lab(X(0) - 4, Y(A - eps) + 4, "A−ε", { anchor: "end", size: 12 }) + x0lab(X(x0), Y(0) + 15)
    );
  }
  // ④ 连续与间断：左边连续，能代入；右边可去间断，极限 ≠ f(x0)
  function plot4() {
    const g = (x) => 0.3 + 0.85 * Math.sin(0.75 * x), x0 = 1.1;
    const panel = (ox, broken) => {
      const { X, Y } = frame([0, 2.1], [0, 1.5], [ox + 12, 18, ox + 90, 128]);
      return mini(X, Y, -0.1, 2.25, 8) + drop(X(x0), broken ? Y(0.5 * g(x0)) : Y(g(x0)), X(x0), Y(0)) +
        curve(g, 0.1, 2.0, X, Y) +
        (broken ? dot(X(x0), Y(g(x0)), "#2f6fe0", 4.2, true) + dot(X(x0), Y(0.5 * g(x0)), "#2f6fe0", 4.2)
                : dot(X(x0), Y(g(x0)), "#2f6fe0", 4.2)) +
        x0lab(X(x0), Y(0) + 15) + zh(ox + 52, 158, broken ? "可去间断" : "连续", broken ? "#e2463f" : "#16a05a", 11.5);
    };
    return svg(panel(0, false) + `<line x1="100" y1="10" x2="100" y2="150" stroke="#d9dce3" stroke-width="1"/>` + panel(102, true));
  }
  // ⑤ 左：夹逼，g ≤ f ≤ h，g、h 趋于同一个值；右：x 与 x²，都趋于 0，x² 快得多
  function plot5() {
    const L = 1.0, x0 = 2.0;
    const h = (x) => L + 0.4 * (x0 - x) + 0.05 * (x0 - x) ** 2;
    const g = (x) => L - 0.38 * (x0 - x) + 0.04 * (x0 - x) ** 2;
    const f = (x) => L + 0.3 * (x0 - x) * Math.sin(3.2 * x);
    const P = frame([0, 2.2], [0, 2.0], [12, 14, 118, 128]);
    const s = 0.25, end = (fn) => P.Y(fn(s)) + 5; // 三条曲线从 s 起画，名字标在起点左边
    const left = mini(P.X, P.Y, -0.05, 2.25, 6) +
      curve(h, s, x0, P.X, P.Y, "#e2463f", 2.4) + curve(g, s, x0, P.X, P.Y, "#16a05a", 2.4) +
      curve(f, s, x0, P.X, P.Y, "#2f6fe0", 2.4, 160) + dot(P.X(x0), P.Y(L), "#7b3fd0", 4.4) +
      lab(P.X(0.13), end(h), "h", { color: "#e2463f", size: 14 }) + lab(P.X(0.13), end(f), "f", { color: "#2f6fe0", size: 14 }) +
      lab(P.X(0.13), end(g), "g", { color: "#16a05a", size: 14 }) + zh(65, 150, "夹逼", "#e2463f", 11.5);
    const Q = frame([0, 1.1], [0, 1.1], [139, 14, 244, 128]);
    const right = mini(Q.X, Q.Y, -0.05, 1.17, 6) +
      curve((x) => x, 0, 1.0, Q.X, Q.Y, "#e2463f", 2.4, 2) + curve((x) => x * x, 0, 1.0, Q.X, Q.Y, "#2f6fe0", 2.4) +
      lab(Q.X(0.55) - 7, Q.Y(0.55) - 5, "x", { color: "#e2463f", size: 14 }) +
      `<text x="${Q.X(0.8) + 8}" y="${Q.Y(0.64) + 14}" font-family="'Times New Roman',serif" font-size="14" fill="#2f6fe0" text-anchor="middle"><tspan font-style="italic">x</tspan><tspan font-size="10" dy="-6">2</tspan></text>` +
      zh(191, 150, "比快慢", "#e2463f", 11.5);
    return wide(left + `<line x1="125" y1="10" x2="125" y2="150" stroke="#d9dce3" stroke-width="1"/>` + right, 250);
  }
  // ⑥ 闭区间上连续：两端实心；最大值 M、最小值 m 都取到；f(a) < 0 < f(b)，中间有零点 ξ
  function plot6() {
    const f = (x) => -0.25 + 0.55 * (x - 1.75) + 0.95 * Math.sin(2.1 * (x - 1.75));
    const a = 0.35, b = 3.25;
    let xm = a, xn = a, xi;
    for (let i = 0; i <= 2000; i++) { const x = a + (b - a) * i / 2000; if (f(x) > f(xm)) xm = x; if (f(x) < f(xn)) xn = x; }
    { let lo = xn, hi = xm; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (f(m) < 0) lo = m; else hi = m; } xi = (lo + hi) / 2; }
    const { X, Y } = frame([-0.15, 3.42], [-1.95, 1.5]);
    return svg(
      axes(X(0), Y(0)) + drop(X(a), Y(f(a)), X(a), Y(0)) + drop(X(b), Y(f(b)), X(b), Y(0)) +
      curve(f, a, b, X, Y) +
      dot(X(a), Y(f(a)), "#2f6fe0", 3.8) + dot(X(b), Y(f(b)), "#2f6fe0", 3.8) +
      dot(X(xm), Y(f(xm)), "#e2463f", 4.6) + dot(X(xn), Y(f(xn)), "#16a05a", 4.6) + dot(X(xi), Y(0), "#f08a1c", 4.2) +
      lab(X(xm), Y(f(xm)) - 9, "M", { color: "#e2463f", size: 14 }) + lab(X(xn), Y(f(xn)) + 18, "m", { color: "#16a05a", size: 14 }) +
      lab(X(a), Y(0) - 6, "a") + lab(X(b), Y(0) + 15, "b") + lab(X(xi) - 8, Y(0) - 7, "ξ", { color: "#f08a1c" })
    );
  }

  return {
    chapter: "第 1 章",
    name: "函数、极限、连续",
    nameSize: 23,
    mainline: "$x$ 靠近某点时，\n$f(x)$ 靠近谁？",
    height: 990,
    stations: [
      { n: 1, name: "研究对象是什么？", color: "#2f6fe0", bg: "#eaf2fe", w: 204,
        desc: "函数 $y = f(x)$：定义域 + 对应法则；复合、反函数、初等函数",
        fig: plot1(),
        chips: ["有界：$|f(x)| \\le M$", "单调增：$x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$", "奇偶：$f(-x) = \\pm f(x)$", "周期：$f(x + T) = f(x)$"] },
      { n: 2, name: "为什么需要极限？", color: "#f08a1c", bg: "#fff3e6", w: 204,
        desc: "最关心的地方代不进去：切线斜率 $\\dfrac{\\Delta y}{\\Delta x}$，令 $\\Delta x = 0$ 就成了 $\\frac{0}{0}$",
        fig: plot2(),
        chips: ["连续（本章）", "导数：切线斜率（第 2 章）", "积分：曲边面积（第 3 章）"] },
      { n: 3, name: "极限是什么？", color: "#16a05a", bg: "#e9f7ef", w: 206,
        desc: "$x$ 足够靠近 $x_0$，$|f(x) - A|$ 就能小于任意给定的 $\\varepsilon$",
        fig: plot3(),
        chips: ["只看附近，与 $f(x_0)$ 无关", "存在 $\\iff$ 左极限 $=$ 右极限", "唯一、局部有界、保号", "四则、复合运算法则", "不存在：左右不等，或沿两条数列趋于不同值"] },
      { n: 4, name: "能不能直接代入？", color: "#7b3fd0", bg: "#f3ecfd", w: 210,
        desc: "连续：$x \\to x_0$ 时 $f(x) \\to f(x_0)$，就能直接代入；初等函数在定义区间内都连续",
        fig: plot4(),
        chips: ["代不进去的点：间断点", "第一类（左右极限都存在）：可去、跳跃", "第二类（至少一侧不存在）：无穷、振荡"] },
      { n: 5, name: "代不进去怎么求？", color: "#e2463f", bg: "#fdecec", w: 268,
        desc: "先看题目问的是哪一种：有没有极限，还是极限是多少",
        fig: plot5(),
        groups: [["有没有极限", ["夹逼：$g \\le f \\le h$，$g$、$h$ 极限相同", "单调有界数列必收敛"]],
                 ["极限是多少", ["$\\frac{0}{0}$：两个无穷小比快慢", "$x \\to 0$ 时 $\\dfrac{\\sin x}{x} \\to 1$，$(1 + x)^{1/x} \\to e$", "等价：$\\sin x \\sim x$，$e^x - 1 \\sim x$，\n$\\ln(1 + x) \\sim x$，$1 - \\cos x \\sim \\frac{1}{2}x^2$","等价替换只换乘除因子", "$1^\\infty$ 型：$\\lim u^v = e^A$，$A = \\lim v(u - 1)$", "有界 $\\times$ 无穷小 $=$ 无穷小", "更强的工具：洛必达、泰勒（第 2 章）"]]] },
      { n: 6, name: "整段连续能保证什么？", color: "#3b47c4", bg: "#ecedfb", w: 244,
        desc: "$f$ 在闭区间 $[a, b]$ 上连续：从一点推到整段",
        fig: plot6(),
        chips: ["有界，且取到最大值 $M$、最小值 $m$", "零点：$f(a) \\cdot f(b) < 0 \\Rightarrow$ 存在 $\\xi \\in (a, b)$，$f(\\xi) = 0$", "介值：取遍 $m$ 与 $M$ 之间的一切值", "缺一不可：$\\dfrac{1}{x}$ 在开区间 $(0, 1)$ 内无界", "用处：证明方程有根、存在 $\\xi$"] },
    ],
  };
};
