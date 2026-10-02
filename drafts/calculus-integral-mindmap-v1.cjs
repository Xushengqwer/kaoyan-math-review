// 高数第 3 章路线图的内容。导出：node tools/mindmap.cjs drafts/calculus-integral-mindmap-v1.cjs drafts/calculus-integral-mindmap-v1.webp
module.exports = ({ tx, frame, pathOf, axes, lab, zh, dot, svg, AX }) => {
  const curve = (f, a, b, X, Y, c = "#2f6fe0", w = 3, n = 120) => `<path d="${pathOf(f, a, b, X, Y, n)}" stroke="${c}" stroke-width="${w}" fill="none"/>`;
  // 曲线 f 与 x 轴在 [a, b] 之间的区域
  const area = (f, a, b, X, Y, fill, op = 0.25, n = 80) => {
    let d = `M${X(a).toFixed(1)} ${Y(0).toFixed(1)} `;
    for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; d += `L${X(x).toFixed(1)} ${Y(f(x)).toFixed(1)} `; }
    return `<path d="${d}L${X(b).toFixed(1)} ${Y(0).toFixed(1)} Z" fill="${fill}" opacity="${op}"/>`;
  };
  const drop = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8a8f98" stroke-width="1" stroke-dasharray="2.5 2.5"/>`;
  const mini = (X, Y, xa, xb, yTop) =>
    `<line x1="${X(xa)}" y1="${Y(0)}" x2="${X(xb)}" y2="${Y(0)}" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
    `<line x1="${X(0)}" y1="${Y(0) + 6}" x2="${X(0)}" y2="${yTop}" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>`;
  const it = (x, y, parts, opt = {}) => `<text x="${x}" y="${y}" font-family="'Times New Roman',serif" font-size="${opt.size || 13}" fill="${opt.color || AX}" text-anchor="${opt.anchor || "middle"}">${parts}</text>`;

  // ① 定积分：切成细条，每条当矩形
  function plot1() {
    const f = (x) => 0.55 + 0.45 * x - 0.25 * Math.sin(2.2 * x);
    const { X, Y } = frame([-0.2, 3.3], [0, 2.3]);
    const a = 0.4, b = 3.0, n = 8, w = (b - a) / n;
    let rects = "";
    for (let i = 0; i < n; i++) {
      const x0 = a + i * w, xi = x0 + w / 2;
      rects += `<rect x="${X(x0)}" y="${Y(f(xi))}" width="${X(x0 + w) - X(x0)}" height="${Y(0) - Y(f(xi))}" fill="#2f6fe0" fill-opacity="0.16" stroke="#2f6fe0" stroke-width="1"/>`;
    }
    return svg(
      rects + axes(X(0), Y(0)) + curve(f, 0.1, 3.2, X, Y) +
      lab(X(a), Y(0) + 15, "a") + lab(X(b), Y(0) + 15, "b")
    );
  }
  // ② 面积函数 Φ(x)：右端挪 Δx，多出一条高约 f(x) 的细条
  function plot2() {
    const f = (x) => 0.75 + 0.35 * x + 0.25 * Math.sin(1.8 * x);
    const { X, Y } = frame([-0.2, 3.3], [0, 2.3]);
    const a = 0.35, x = 2.1, dx = 0.28;
    return svg(
      area(f, a, x, X, Y, "#f08a1c", 0.22) + area(f, x, x + dx, X, Y, "#e2463f", 0.55) +
      axes(X(0), Y(0)) + curve(f, 0.1, 3.2, X, Y) +
      drop(X(a), Y(f(a)), X(a), Y(0)) +
      it((X(a) + X(x)) / 2, Y(0.55), `<tspan font-size="15">Φ</tspan>(<tspan font-style="italic">x</tspan>)`, { size: 14, color: "#b8640a" }) +
      lab(X(a), Y(0) + 15, "a") + lab(X(x), Y(0) + 15, "x") +
      it(X(x + dx / 2), Y(f(x + dx)) - 7, `Δ<tspan font-style="italic">x</tspan>`, { size: 12, color: "#e2463f" })
    );
  }
  // ③ 求导与积分：同一张表，正着读、倒着读
  function table3() {
    const box = (s, c) => `<div style="flex:1;border:2px solid ${c};border-radius:8px;background:#fff;padding:3px 2px;font-size:13px;font-weight:600;text-align:center;color:${c}">${tx(s)}</div>`;
    const arrows = `<svg width="30" height="16" viewBox="0 0 30 16" style="flex:none"><path d="M2 4H26M22 1L27 4L22 7" stroke="#f08a1c" fill="none" stroke-width="1.5"/><path d="M28 12H4M8 9L3 12L8 15" stroke="#16a05a" fill="none" stroke-width="1.5"/></svg>`;
    const row = (l, r) => `<div style="display:flex;align-items:center;gap:3px;margin:6px 0">${box(l, "#c46c0c")}${arrows}${box(r, "#16a05a")}</div>`;
    const head = `<div style="display:flex;font-size:13px;font-weight:700;color:#4a5060;text-align:center"><div style="flex:1">求导</div><div style="width:30px"></div><div style="flex:1">积分</div></div>`;
    return head + row("求导公式", "积分公式") + row("链式法则", "换元") + row("乘积法则", "分部") +
      `<div class="chain-sub">同一张表，倒着读</div>`;
  }
  // ④ 借区间省事：奇函数在对称区间上，正负两块面积抵消
  function plot4() {
    const f = (x) => 0.95 * Math.sin(1.4 * x) * (1 - 0.06 * x * x);
    const { X, Y } = frame([-2.45, 2.45], [-1.25, 1.25], [10, 10, 194, 132]);
    return svg(
      area(f, -2, 0, X, Y, "#e2463f", 0.25) + area(f, 0, 2, X, Y, "#7b3fd0", 0.25) +
      `<line x1="8" y1="${Y(0)}" x2="196" y2="${Y(0)}" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
      `<line x1="${X(0)}" y1="140" x2="${X(0)}" y2="5" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
      curve(f, -2.3, 2.3, X, Y, "#2f6fe0", 2.8) +
      drop(X(-2), Y(f(-2)), X(-2), Y(0)) + drop(X(2), Y(f(2)), X(2), Y(0)) +
      it(X(-2), Y(0) - 6, `−<tspan font-style="italic">a</tspan>`) + lab(X(2), Y(0) + 15, "a") +
      zh(X(1.1), Y(0.35), "+", "#7b3fd0", 16) + zh(X(-1.1), Y(-0.2), "−", "#e2463f", 16) +
      zh(100, 156, "奇函数：两块抵消", "#7b3fd0", 11)
    );
  }
  // ⑤ 左：区间无穷（1/x² 往右一直延伸）；右：函数无界（1/√x 在 0 附近冲上去）
  function plot5() {
    const P = frame([0, 4.4], [0, 1.25], [12, 18, 96, 128]);
    const g1 = (x) => 1 / (x * x);
    const left = area(g1, 1, 4.3, P.X, P.Y, "#e2463f", 0.2) + mini(P.X, P.Y, -0.1, 4.6, 8) +
      curve(g1, 0.92, 4.3, P.X, P.Y, "#2f6fe0", 2.6) + drop(P.X(1), P.Y(1), P.X(1), P.Y(0)) +
      lab(P.X(1), P.Y(0) + 14, "1", { upright: true, size: 12 }) +
      it(P.X(3.0), P.Y(0.32), "→ +∞", { size: 12, color: "#e2463f" }) + zh(54, 158, "区间无穷", "#e2463f", 11.5);
    const Q = frame([0, 1.25], [0, 4.6], [114, 18, 196, 128]);
    const g2 = (x) => 1 / Math.sqrt(x);
    const right = area(g2, 0.05, 1, Q.X, Q.Y, "#e2463f", 0.2) + mini(Q.X, Q.Y, -0.05, 1.32, 8) +
      curve(g2, 0.048, 1.2, Q.X, Q.Y, "#2f6fe0", 2.6, 200) + drop(Q.X(1), Q.Y(1), Q.X(1), Q.Y(0)) +
      lab(Q.X(1), Q.Y(0) + 14, "1", { upright: true, size: 12 }) + zh(155, 158, "函数无界", "#e2463f", 11.5);
    return svg(left + `<line x1="104" y1="10" x2="104" y2="150" stroke="#d9dce3" stroke-width="1"/>` + right);
  }
  // ⑥ 微元法：绕 x 轴旋转的立体，在 x 处切一片厚 dx 的圆片
  function plot6() {
    const f = (x) => 0.55 + 0.32 * x - 0.06 * x * x;
    const { X, Y } = frame([-0.2, 3.3], [-1.3, 1.3], [16, 8, 194, 140]);
    const a = 0.3, b = 3.0, x = 1.75, dx = 0.22, ell = (xx, c, fill, op) =>
      `<ellipse cx="${X(xx)}" cy="${Y(0)}" rx="${(Y(0) - Y(f(xx))) * 0.28}" ry="${Y(0) - Y(f(xx))}" fill="${fill}" fill-opacity="${op}" stroke="${c}" stroke-width="1.3"/>`;
    return svg(
      `<line x1="8" y1="${Y(0)}" x2="196" y2="${Y(0)}" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
      `<line x1="${X(0)}" y1="146" x2="${X(0)}" y2="5" stroke="${AX}" stroke-width="1.4" marker-end="url(#ah)"/>` +
      `<path d="${pathOf((t) => -f(t), a, b, X, Y)}" stroke="#2f6fe0" stroke-width="1.6" stroke-dasharray="4 3" fill="none" opacity="0.6"/>` +
      ell(a, "#2f6fe0", "#2f6fe0", 0.05) + ell(b, "#2f6fe0", "#2f6fe0", 0.08) +
      `<rect x="${X(x)}" y="${Y(f(x + dx))}" width="${X(x + dx) - X(x)}" height="${Y(-f(x + dx)) - Y(f(x + dx))}" fill="#3b47c4" opacity="0.28"/>` +
      ell(x, "#3b47c4", "#3b47c4", 0.18) + ell(x + dx, "#3b47c4", "#3b47c4", 0.18) +
      curve(f, a, b, X, Y) +
      it(X(x + dx / 2), Y(-f(x + dx)) + 15, `d<tspan font-style="italic">x</tspan>`, { size: 12, color: "#3b47c4" }) +
      lab(X(a), Y(0) - 5, "a", { size: 12 }) + lab(X(b) + 8, Y(0) - 5, "b", { size: 12 })
    );
  }

  return {
    chapter: "第 3 章",
    name: "一元函数积分学",
    mainline: "从变化率倒回去，\n求整段的总量",
    height: 1080,
    stations: [
      { n: 1, name: "曲边的面积怎么算？", color: "#2f6fe0", bg: "#eaf2fe", w: 224,
        desc: "切成细条，每条当矩形，加起来，再取极限",
        fig: plot1(),
        groups: [["定积分是什么", ["$\\int_a^b f(x)\\,\\mathrm{d}x = \\lim\\limits_{\\lambda \\to 0}\\sum f(\\xi_i)\\Delta x_i$", "几何意义：上方面积减下方面积"]],
                 ["有什么性质", ["线性、可加；保号、比较、估值", "积分中值：$\\int_a^b f(x)\\,\\mathrm{d}x = f(\\xi)(b - a)$"]],
                 ["反过来用定义", ["$\\lim\\limits_{n \\to \\infty}\\dfrac{1}{n}\\sum\\limits_{i=1}^{n} f\\Big(\\dfrac{i}{n}\\Big) = \\int_0^1 f(x)\\,\\mathrm{d}x$"]],
                 ["什么函数能积（边界）", ["必要：有界\n充分：连续；单调；有界且只有有限个间断点"]]] },
      { n: 2, name: "面积怎么随右端变？", color: "#f08a1c", bg: "#fff3e6", w: 224, key: true,
        desc: "右端挪 $\\Delta x$，面积多出一条细条，高约 $f(x)$：$\\Phi(x) = \\int_a^x f(t)\\,\\mathrm{d}t$，$\\Phi'(x) = f(x)$",
        fig: plot2(),
        groups: [["$\\Phi$ 的导数", ["$\\dfrac{\\mathrm{d}}{\\mathrm{d}x}\\int_{\\psi(x)}^{\\varphi(x)} f(t)\\,\\mathrm{d}t$\n$= f(\\varphi)\\varphi' - f(\\psi)\\psi'$", "$f$ 连续 $\\Rightarrow$ $\\Phi$ 是 $f$ 的原函数", "牛顿-莱布尼茨：$\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a)$"]],
                 ["$\\Phi$ 作为一个函数", ["$f$ 可积 $\\Rightarrow$ $\\Phi$ 连续；$f$ 连续 $\\Rightarrow$ $\\Phi$ 可导", "$f$ 奇 $\\Rightarrow$ $\\Phi$ 偶\n$f$ 偶 $\\Rightarrow$ $\\int_0^x f(t)\\,\\mathrm{d}t$ 奇", "$f$ 以 $T$ 为周期时：\n$\\Phi$ 也以 $T$ 为周期 $\\iff \\int_0^T f(x)\\,\\mathrm{d}x = 0$"]],
                 ["什么时候没有原函数（边界）", ["可去、跳跃、无穷间断点 $\\Rightarrow$ 没有原函数", "可积与有原函数，谁也推不出谁"]]] },
      { n: 3, name: "原函数怎么找？", color: "#16a05a", bg: "#e9f7ef", w: 196, key: true,
        desc: "把求导倒过来用：链式法则倒过来是换元，乘积法则倒过来是分部",
        fig: table3(),
        groups: [["把求导倒过来", ["基本积分公式（查表）", "凑微分：$\\int f[\\varphi(x)]\\varphi'(x)\\,\\mathrm{d}x$\n$= \\int f(u)\\,\\mathrm{d}u$", "分部：$\\int u\\,\\mathrm{d}v = uv - \\int v\\,\\mathrm{d}u$"]],
                 ["化成能积的形式", ["根式：三角代换、根式代换", "有理函数：拆成部分分式，一定积得出来", "三角有理式：令 $t = \\tan\\dfrac{x}{2}$"]]] },
      { n: 4, name: "定积分怎么算更省事？", color: "#7b3fd0", bg: "#f3ecfd", w: 246, key: true,
        desc: "用牛顿-莱布尼茨公式；换元时同时换积分限，再借区间的对称、周期省事",
        fig: plot4(),
        groups: [["怎么用公式", ["换元：同时换积分限，不用换回", "分部：$\\int_a^b u\\,\\mathrm{d}v = uv\\Big|_a^b - \\int_a^b v\\,\\mathrm{d}u$"]],
                 ["借区间省事", ["奇函数积分为 $0$；偶函数 $= 2\\int_0^a f(x)\\,\\mathrm{d}x$", "周期：$\\int_a^{a+T} f(x)\\,\\mathrm{d}x = \\int_0^T f(x)\\,\\mathrm{d}x$", "区间再现：$\\int_a^b f(x)\\,\\mathrm{d}x = \\int_a^b f(a + b - x)\\,\\mathrm{d}x$"]],
                 ["点火公式（查表）", ["$I_n = \\int_0^{\\frac{\\pi}{2}} \\sin^n x\\,\\mathrm{d}x = \\dfrac{n - 1}{n}I_{n-2}$"]]] },
      { n: 5, name: "区间无穷、函数无界", color: "#e2463f", bg: "#fdecec", w: 224,
        desc: "定积分要求区间有限、函数有界；不满足时，先积能积的一段，再取一次极限",
        fig: plot5(),
        groups: [["怎么定义", ["$\\int_a^{+\\infty} f(x)\\,\\mathrm{d}x = \\lim\\limits_{t \\to +\\infty}\\int_a^t f(x)\\,\\mathrm{d}x$", "两端无穷、瑕点在内部：拆开，两个都收敛才收敛"]],
                 ["怎么判敛散", ["$\\int_1^{+\\infty}\\dfrac{\\mathrm{d}x}{x^p}$：$p > 1$ 收敛", "$\\int_0^1\\dfrac{\\mathrm{d}x}{x^p}$：$p < 1$ 收敛", "比较判别：和 $\\dfrac{1}{x^p}$ 比，$0 < l < +\\infty$ 同敛散", "$l = 0$、$l = +\\infty$：只能推一个方向（边界）"]]] },
      { n: 6, name: "什么量能用积分算？", color: "#3b47c4", bg: "#ecedfb", w: 224,
        desc: "能切成小段，每段近似 $f(x)\\,\\mathrm{d}x$，总量等于各段相加，就能积分",
        fig: plot6(),
        groups: [["微元法", ["$\\mathrm{d}U = f(x)\\,\\mathrm{d}x$，$U = \\int_a^b f(x)\\,\\mathrm{d}x$"]],
                 ["几何量（查表）", ["面积：直角坐标、参数方程、极坐标", "体积：$V_x = \\pi\\int_a^b f^2(x)\\,\\mathrm{d}x$", "弧长：$s = \\int \\mathrm{d}s$，$\\mathrm{d}s = \\sqrt{1 + y'^2}\\,\\mathrm{d}x$（第 2 章）", "旋转曲面：$S = 2\\pi\\int |f(x)|\\,\\mathrm{d}s$"]],
                 ["物理量（查表）", ["功、液体静压力"]]] },
    ],
  };
};
