// 高数第 2 章路线图的内容。导出：node tools/mindmap.cjs drafts/calculus-derivative-mindmap-v2.cjs drafts/calculus-derivative-mindmap-v2.webp
module.exports = ({ tx, frame, pathOf, axes, lab, zh, dot, svg, AX }) => {
  // ① 导数：切线与割线，Δx、Δy
  function plot1() {
    const f = (x) => 0.35 + 0.18 * x * x;
    const { X, Y } = frame([-0.25, 3.3], [0, 2.3]);
    const x0 = 1.0, x1 = 2.4, k = 0.36, ks = (f(x1) - f(x0)) / (x1 - x0);
    const tanL = (x) => f(x0) + k * (x - x0), secL = (x) => f(x0) + ks * (x - x0);
    return svg(
      axes(X(0), Y(0)) +
      `<path d="${pathOf(tanL, 0.05, 3.15, X, Y, 2)}" stroke="#e2463f" stroke-width="2" fill="none"/>` +
      `<path d="${pathOf(secL, 0.45, 3.0, X, Y, 2)}" stroke="#2f6fe0" stroke-width="1.8" stroke-dasharray="5 4" fill="none"/>` +
      `<path d="${pathOf(f, 0.0, 3.15, X, Y)}" stroke="#2f6fe0" stroke-width="3" fill="none"/>` +
      `<line x1="${X(x0)}" y1="${Y(f(x0))}" x2="${X(x1)}" y2="${Y(f(x0))}" stroke="#8a8f98" stroke-width="1.2" stroke-dasharray="3 3"/>` +
      `<line x1="${X(x1)}" y1="${Y(f(x0))}" x2="${X(x1)}" y2="${Y(f(x1))}" stroke="#8a8f98" stroke-width="1.2" stroke-dasharray="3 3"/>` +
      lab((X(x0) + X(x1)) / 2, Y(f(x0)) + 14, "Δx", { upright: true, size: 12 }) +
      lab(X(x1) + 14, (Y(f(x0)) + Y(f(x1))) / 2 + 4, "Δy", { upright: true, size: 12 }) +
      dot(X(x0), Y(f(x0)), "#2f6fe0") + dot(X(x1), Y(f(x1)), "#2f6fe0", 3.2) +
      zh(X(3.12), Y(tanL(3.12)) + 15, "切线", "#e2463f", 10.5) + zh(X(1.45), Y(1.32), "割线", "#2f6fe0", 10.5)
    );
  }
  // ② 链式法则：每经过一层，乘一层的导数
  function chain2() {
    const node = (s, c) => `<div class="cn" style="border-color:${c};color:${c}">${tx(s)}</div>`;
    const arr = (s) => `<div class="ca"><div class="cl">${tx(s)}</div><svg viewBox="0 0 40 10" width="40" height="10"><line x1="0" y1="5" x2="32" y2="5" stroke="${AX}" stroke-width="1.6"/><path d="M30 1L39 5L30 9z" fill="${AX}"/></svg></div>`;
    return `<div class="chain">${node("$x$", "#f08a1c")}${arr("$g'(x)$")}${node("$u$", "#2f6fe0")}${arr("$f'(u)$")}${node("$y$", "#16a05a")}</div>` +
      `<div class="chain-sub">${tx("$u = g(x)$，$y = f(u)$")}</div><div class="chain-sub">每经过一层，乘一层的导数</div>`;
  }
  // ③ 中值定理：割线，与割线平行的切线；ξ 由 f'(ξ) = 割线斜率 解出
  function plot3() {
    const f = (x) => 0.5 + 1.2 * Math.sin(0.9 * x);
    const a = 0.3, b = 3.0, ks = (f(b) - f(a)) / (b - a);
    const xi = Math.acos(ks / 1.08) / 0.9; // f'(x) = 1.08 cos(0.9x)
    const { X, Y } = frame([-0.15, 3.35], [0, 2.15]);
    const secL = (x) => f(a) + ks * (x - a), tanL = (x) => f(xi) + ks * (x - xi);
    const drop = (x, y) => `<line x1="${X(x)}" y1="${Y(y)}" x2="${X(x)}" y2="${Y(0)}" stroke="#8a8f98" stroke-width="1" stroke-dasharray="2.5 2.5"/>`;
    return svg(
      axes(X(0), Y(0)) +
      drop(a, f(a)) + drop(b, f(b)) + drop(xi, f(xi)) +
      `<path d="${pathOf(secL, a, b, X, Y, 2)}" stroke="#e2463f" stroke-width="1.8" stroke-dasharray="5 4" fill="none"/>` +
      `<path d="${pathOf(tanL, xi - 1.05, xi + 1.05, X, Y, 2)}" stroke="#16a05a" stroke-width="1.8" stroke-dasharray="5 4" fill="none"/>` +
      `<path d="${pathOf(f, a, b, X, Y)}" stroke="#2f6fe0" stroke-width="3" fill="none"/>` +
      dot(X(a), Y(f(a)), "#2f6fe0", 3.6) + dot(X(b), Y(f(b)), "#2f6fe0", 3.6) + dot(X(xi), Y(f(xi)), "#e2463f", 4.4) +
      lab(X(a), Y(0) + 15, "a") + lab(X(xi), Y(0) + 15, "ξ") + lab(X(b), Y(0) + 15, "b") +
      zh(X(xi + 1.05) + 2, Y(tanL(xi + 1.05)) - 6, "切线", "#16a05a", 10.5) + zh(X(b) - 4, Y(secL(b)) + 16, "割线", "#e2463f", 10.5)
    );
  }
  // ④ 洛必达：f、g 在 x0 处都趋于 0，各画出 x0 处的切线
  function plot4() {
    const x0 = 0.35, f = (x) => 1.25 * (x - x0) + 0.32 * (x - x0) ** 2, g = (x) => 0.42 * (x - x0) + 0.04 * (x - x0) ** 2;
    const { X, Y } = frame([-0.15, 3.3], [-0.05, 2.25]);
    const ft = (x) => 1.25 * (x - x0), gt = (x) => 0.42 * (x - x0);
    return svg(
      axes(X(0), Y(0)) +
      `<path d="${pathOf(ft, x0, x0 + 1.35, X, Y, 2)}" stroke="#e2463f" stroke-width="1.5" stroke-dasharray="4 3.5" fill="none" opacity="0.8"/>` +
      `<path d="${pathOf(gt, x0, x0 + 2.4, X, Y, 2)}" stroke="#2f6fe0" stroke-width="1.5" stroke-dasharray="4 3.5" fill="none" opacity="0.8"/>` +
      `<path d="${pathOf(f, x0, 3.2, X, Y, 120, [-1, 2.25])}" stroke="#e2463f" stroke-width="3" fill="none"/>` +
      `<path d="${pathOf(g, x0, 3.2, X, Y)}" stroke="#2f6fe0" stroke-width="3" fill="none"/>` +
      dot(X(x0), Y(0), "#7b3fd0", 4, true) +
      lab(X(1.62), Y(2.05), "f", { color: "#e2463f", size: 15 }) + lab(X(3.12), Y(g(3.12)) - 8, "g", { color: "#2f6fe0", size: 15 }) +
      `<text x="${X(x0)}" y="${Y(0) + 15}" font-family="'Times New Roman',serif" font-size="13" text-anchor="middle" fill="${AX}"><tspan font-style="italic">x</tspan><tspan font-size="9" dy="3">0</tspan></text>`
    );
  }
  // ⑤ 泰勒：sin x 与它在 0 处的 1、3、5 次泰勒多项式
  function plot5() {
    const { X, Y } = frame([-3.6, 3.6], [-1.75, 1.75], [8, 8, 196, 140]);
    const p1 = (x) => x, p3 = (x) => x - x ** 3 / 6, p5 = (x) => x - x ** 3 / 6 + x ** 5 / 120;
    const clip = [-1.75, 1.75];
    return svg(
      `<line x1="6" y1="${Y(0)}" x2="196" y2="${Y(0)}" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
      `<line x1="${X(0)}" y1="146" x2="${X(0)}" y2="5" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
      `<path d="${pathOf(p1, -3.6, 3.6, X, Y, 200, clip)}" stroke="#e2463f" stroke-width="1.7" fill="none"/>` +
      `<path d="${pathOf(p3, -3.6, 3.6, X, Y, 200, clip)}" stroke="#f08a1c" stroke-width="1.8" stroke-dasharray="5 3.5" fill="none"/>` +
      `<path d="${pathOf(p5, -3.6, 3.6, X, Y, 200, clip)}" stroke="#16a05a" stroke-width="1.8" stroke-dasharray="5 3.5" fill="none"/>` +
      `<path d="${pathOf(Math.sin, -3.6, 3.6, X, Y, 200)}" stroke="#2f6fe0" stroke-width="3" fill="none"/>` +
      `<text x="${X(2.25)}" y="${Y(-1.35)}" font-family="'Times New Roman',serif" font-size="13" fill="#2f6fe0" text-anchor="middle">sin <tspan font-style="italic">x</tspan></text>`
    ) + `<div class="legend"><i style="border-top:2px solid #e2463f"></i>1 次<i style="border-top:2px dashed #f08a1c"></i>3 次<i style="border-top:2px dashed #16a05a"></i>5 次<i style="border-top:3px solid #2f6fe0"></i>${tx("$\\sin x$")}</div>`;
  }
  // ⑥ 形状：x^3 - 3x 的极大值、拐点、极小值
  function plot6() {
    const f = (x) => x ** 3 - 3 * x;
    const { X, Y } = frame([-2.25, 2.35], [-3.4, 3.4], [16, 10, 194, 138]);
    return svg(
      `<line x1="8" y1="${Y(0)}" x2="196" y2="${Y(0)}" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
      `<line x1="${X(-2.25) + 4}" y1="146" x2="${X(-2.25) + 4}" y2="5" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
      `<path d="${pathOf(f, -2.12, 2.15, X, Y, 200)}" stroke="#2f6fe0" stroke-width="3" fill="none"/>` +
      dot(X(-1), Y(2), "#e2463f", 4.6) + dot(X(0), Y(0), "#f08a1c", 4.6) + dot(X(1), Y(-2), "#16a05a", 4.6) +
      zh(X(-1), Y(2) - 9, "极大值", "#e2463f") + zh(X(0) + 22, Y(0) - 6, "拐点", "#f08a1c") + zh(X(1), Y(-2) + 17, "极小值", "#16a05a") +
      zh(X(-1.45), Y(-1.2), "凸", "#5b6170", 12) + zh(X(1.55), Y(1.0), "凹", "#5b6170", 12)
    );
  }

  return {
    chapter: "第 2 章",
    name: "一元函数微分学",
    mainline: "从一点的变化率，\n看清整个函数",
    height: 900,
    stations: [
      { n: 1, name: "变化有多快？", color: "#2f6fe0", bg: "#eaf2fe", w: 214,
        desc: "导数是割线斜率的极限：\n$f'(x_0) = \\lim\\limits_{\\Delta x \\to 0}\\dfrac{\\Delta y}{\\Delta x}$\n微分：$\\Delta y \\approx f'(x_0)\\Delta x$，以直代曲",
        fig: plot1(),
        chips: ["可导 $\\iff$ 左导数 $=$ 右导数", "可导 $\\Rightarrow$ 连续；$|x|$ 在 $0$ 处连续但不可导", "可微 $\\iff$ 可导，$\\mathrm{d}y = f'(x)\\,\\mathrm{d}x$", "切线：$y - f(x_0) = f'(x_0)(x - x_0)$"] },
      { n: 2, name: "怎么求导？", color: "#f08a1c", bg: "#fff3e6", w: 214,
        desc: "先记基本公式，再用四则、链式、反函数法则，机械地求",
        fig: chain2(),
        chips: ["链式：$\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = \\dfrac{\\mathrm{d}y}{\\mathrm{d}u}\\cdot\\dfrac{\\mathrm{d}u}{\\mathrm{d}x}$", "隐函数：两边同时对 $x$ 求导", "幂指函数：先取对数", "参数方程：$\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = \\dfrac{y'(t)}{x'(t)}$", "高阶导数、莱布尼茨公式"] },
      { n: 3, name: "一点怎么管住一整段？", color: "#16a05a", bg: "#e9f7ef", w: 236, key: true,
        desc: "平均变化率，等于中途某一点的瞬时变化率",
        fig: plot3(),
        chips: ["费马：可导的极值点处 $f' = 0$", "罗尔：$f(a) = f(b) \\Rightarrow$ 存在 $\\xi$，$f'(\\xi) = 0$", "拉格朗日：$f(b) - f(a) = f'(\\xi)(b - a)$", "柯西：$\\dfrac{f(b) - f(a)}{g(b) - g(a)} = \\dfrac{f'(\\xi)}{g'(\\xi)}$", "证明题：构造辅助函数，用罗尔"] },
      { n: 4, name: "回到第 1 章：洛必达", color: "#7b3fd0", bg: "#f3ecfd", w: 236, key: true,
        desc: "$\\frac{0}{0}$、$\\frac{\\infty}{\\infty}$ 型：由柯西中值定理，换成导数之比",
        fig: plot4(),
        chips: ["$\\lim\\dfrac{f}{g} = \\lim\\dfrac{f'}{g'}$", "前提：$\\dfrac{f'}{g'}$ 的极限存在（或为 $\\infty$）", "$\\dfrac{f'}{g'}$ 没有极限，不能说原极限不存在", "其他未定式先化成 $\\frac{0}{0}$、$\\frac{\\infty}{\\infty}$（第 1 章）"] },
      { n: 5, name: "写成多项式：泰勒", color: "#e2463f", bg: "#fdecec", w: 236, key: true,
        desc: "在 $x_0$ 处，让多项式与 $f$ 的各阶导数都相同，误差是更高阶的无穷小",
        fig: plot5(),
        chips: ["佩亚诺余项：求极限、定阶\n$o\\big((x - x_0)^n\\big)$", "拉格朗日余项：证明、估计\n$\\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}(x - x_0)^{n+1}$", "展开到 $0$ 阶，就是拉格朗日中值定理", "$e^x$、$\\sin x$、$\\cos x$、$\\ln(1+x)$、$(1+x)^\\alpha$ 的展开", "由展开式读出 $f^{(n)}(0)$"] },
      { n: 6, name: "用导数看函数", color: "#3b47c4", bg: "#ecedfb", w: 204,
        desc: "一阶导数定增减，二阶导数定凹凸",
        fig: plot6(),
        groups: [["一阶导数", ["$f' > 0$ 增，$f' < 0$ 减", "极值点：驻点或不可导点", "最值：比较可疑点与端点", "证不等式、数方程根的个数"]],
                 ["二阶导数", ["$f'' > 0$ 凹，$f'' < 0$ 凸；凹凸分界是拐点", "渐近线：水平、铅直、斜", "曲率：$K = \\dfrac{|y''|}{(1 + y'^2)^{3/2}}$"]]] },
    ],
  };
};
