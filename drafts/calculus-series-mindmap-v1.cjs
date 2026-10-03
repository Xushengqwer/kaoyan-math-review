// 高数第 8 章路线图的内容（v1）。导出：node tools/mindmap.cjs drafts/calculus-series-mindmap-v1.cjs drafts/calculus-series-mindmap-v1.webp
module.exports = ({ frame, lab, zh, dot, svg, AX }) => {
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
  const sample = (g, a, b, n = 120) => { const p = []; for (let i = 0; i <= n; i++) p.push(g(a + (b - a) * i / n)); return p; };
  // 横轴（带箭头），不画纵轴时用
  const xaxis = (Y0, x0 = 10, x1 = 194) => line2(x0, Y0, x1, Y0, AX, 1.4, "", true);
  const yaxis = (X0, y0 = 146, y1 = 8) => line2(X0, y0, X0, y1, AX, 1.4, "", true);
  const text = (x, y, s, c, size = 12, anchor = "middle") => `<text x="${f1(x)}" y="${f1(y)}" font-family="'Times New Roman',serif" font-size="${size}" fill="${c}" text-anchor="${anchor}">${s}</text>`;

  // ① 部分和 S_n = 1 − 2^(−n) 一个个往上，逼近和 S = 1
  function plot1() {
    const { X, Y } = frame([0, 9.3], [0, 1.18], [22, 12, 190, 132]), C = "#2f6fe0";
    let body = xaxis(Y(0), 14) + yaxis(X(0)) + line2(X(0), Y(1), X(9.2), Y(1), "#e2463f", 1.4, "4 3");
    const pts = [];
    for (let n = 1; n <= 9; n++) pts.push([X(n), Y(1 - Math.pow(2, -n))]);
    body += path2(pts, "#9db8ec", 1.2);
    pts.forEach(([u, v], i) => { body += dot(u, v, C, 3); if (i < 3) body += `<text x="${f1(u)}" y="${f1(v + 15)}" font-family="'Times New Roman',serif" font-size="11.5" fill="${C}" text-anchor="middle"><tspan font-style="italic">S</tspan><tspan font-size="8" dy="3">${i + 1}</tspan></text>`; });
    body += text(X(9.1), Y(1) - 6, "<tspan font-style=\"italic\">S</tspan>", "#e2463f", 13, "end") +
      lab(X(9.2), Y(0) + 14, "n", { size: 12 }) +
      zh(100, 157, "部分和有极限，就是级数的和", C, 11);
    return fig(body);
  }

  // ② 正项级数：第 n 项画成宽 1 的矩形，都在 y = 1/x² 的下方，部分和有上界
  function plot2() {
    const { X, Y } = frame([0, 7.4], [0, 1.15], [22, 12, 190, 132]), O = "#f08a1c";
    let body = "";
    for (let n = 2; n <= 7; n++) {
      const h = 1 / (n * n);
      body += `<rect x="${f1(X(n - 1))}" y="${f1(Y(h))}" width="${f1(X(n) - X(n - 1))}" height="${f1(Y(0) - Y(h))}" fill="${O}" fill-opacity="0.45" stroke="${O}" stroke-width="1"/>`;
    }
    body += path2(sample((x) => [X(x), Y(1 / (x * x))], 0.93, 7.3), "#b8640a", 2) +
      xaxis(Y(0), 14) + yaxis(X(0)) +
      text(X(1.25) + 8, Y(1 / 1.5625) - 2, "<tspan font-style=\"italic\">y</tspan> = 1/<tspan font-style=\"italic\">x</tspan><tspan font-size=\"8\" dy=\"-5\">2</tspan>", "#b8640a", 12, "start") +
      lab(X(1), Y(0) + 13, "1", { size: 11, upright: true }) + lab(X(7), Y(0) + 13, "7", { size: 11, upright: true }) +
      zh(100, 157, "每项都在曲线下：部分和有上界", "#b8640a", 11);
    return fig(body);
  }

  // ③ 交错级数 Σ(−1)^(n−1)/n 的部分和左右摆动，逼近 ln 2
  function plot3() {
    const { X, Y } = frame([0, 12.5], [0.3, 1.08], [22, 12, 190, 132]), G = "#16a05a";
    let s = 0;
    const pts = [];
    for (let n = 1; n <= 12; n++) { s += (n % 2 ? 1 : -1) / n; pts.push([X(n), Y(s)]); }
    let body = xaxis(Y(0.3), 14) + yaxis(X(0)) + line2(X(0), Y(Math.LN2), X(12.4), Y(Math.LN2), "#e2463f", 1.4, "4 3") +
      path2(pts, "#7cc79f", 1.4);
    for (const [u, v] of pts) body += dot(u, v, G, 2.8);
    body += text(X(12.4), Y(Math.LN2) - 6, "ln 2", "#e2463f", 12, "end") +
      lab(X(12.3), Y(0.3) + 14, "n", { size: 12 }) +
      zh(100, 157, "正负相间，越摆越小，停在中间", G, 11);
    return fig(body);
  }

  // ④ 数轴：(−R, R) 内绝对收敛，外面发散，端点单独判
  function plot4() {
    const V = "#7b3fd0", R = "#e2463f", y0 = 78, cx = 100, r = 52;
    let body = line2(10, y0, 192, y0, AX, 1.4, "", true) +
      `<line x1="${cx - r}" y1="${y0}" x2="${cx + r}" y2="${y0}" stroke="${V}" stroke-width="7" stroke-opacity="0.55"/>` +
      `<line x1="14" y1="${y0}" x2="${cx - r - 4}" y2="${y0}" stroke="${R}" stroke-width="3" stroke-dasharray="3 3"/>` +
      `<line x1="${cx + r + 4}" y1="${y0}" x2="186" y2="${y0}" stroke="${R}" stroke-width="3" stroke-dasharray="3 3"/>` +
      dot(cx - r, y0, V, 4.2, true) + dot(cx + r, y0, V, 4.2, true) + dot(cx, y0, AX, 2.4) +
      lab(cx, y0 + 17, "O", { size: 12 }) + text(cx - r, y0 + 18, "−<tspan font-style=\"italic\">R</tspan>", V, 13) + text(cx + r, y0 + 18, "<tspan font-style=\"italic\">R</tspan>", V, 13) +
      zh(cx - r, y0 - 12, "?", V, 15) + zh(cx + r, y0 - 12, "?", V, 15) +
      zh(cx, y0 - 22, "绝对收敛", V, 12) + zh(27, y0 - 12, "发散", R, 11) + zh(173, y0 - 12, "发散", R, 11) +
      zh(100, 135, "端点代进去，按 ②③ 判断", "#5b2fb0", 11) +
      zh(100, 157, "收敛的点是以原点为中心的区间", V, 11);
    return fig(body);
  }

  // ⑤ 1/(1 − x) 与它的部分和多项式：项数越多，在 (−1, 1) 里越贴近
  function plot5() {
    const { X, Y } = frame([-1.25, 1.1], [-0.2, 5.2], [16, 10, 194, 140]), T = "#0e8f8a";
    let body = xaxis(Y(0), 10) + yaxis(X(0)) +
      line2(X(1), Y(-0.2), X(1), Y(5.1), "#8a8f98", 1, "3 3") + line2(X(-1), Y(-0.2), X(-1), Y(5.1), "#8a8f98", 1, "3 3");
    const cols = ["#f2b36b", "#e0884a", "#c0602a"];
    [1, 3, 7].forEach((N, k) => {
      body += path2(sample((x) => { let s = 0; for (let i = 0; i <= N; i++) s += Math.pow(x, i); return [X(x), Y(Math.min(Math.max(s, -0.2), 5.2))]; }, -1.2, 1.05), cols[k], 1.4);
    });
    body += path2(sample((x) => [X(x), Y(1 / (1 - x))], -1.2, 0.81), T, 2.4) +
      text(X(0.82) - 4, Y(5.0), "<tspan font-style=\"italic\">S</tspan>(<tspan font-style=\"italic\">x</tspan>)", T, 12, "end") +
      lab(X(1) + 2, Y(0) + 13, "1", { size: 11, upright: true }) + text(X(-1), Y(0) + 13, "−1", AX, 11) +
      zh(100, 157, "多项式越加越贴近和函数", T, 11);
    return fig(body);
  }

  // ⑥ 方波的傅里叶部分和：项数越多越贴近，跳跃点收敛到中点
  function plot6() {
    const { X, Y } = frame([-Math.PI - 0.2, Math.PI + 0.35], [-1.45, 1.45], [12, 10, 194, 134]), B = "#3b47c4";
    const SN = (x, N) => { let s = 0; for (let k = 1; k <= N; k += 2) s += Math.sin(k * x) / k; return 4 / Math.PI * s; };
    let body = xaxis(Y(0), 8) +
      path2([[X(-Math.PI), Y(-1)], [X(0), Y(-1)]], "#9aa0a8", 2.2) + path2([[X(0), Y(1)], [X(Math.PI), Y(1)]], "#9aa0a8", 2.2) +
      path2(sample((x) => [X(x), Y(SN(x, 3))], -Math.PI, Math.PI, 200), "#a9aef0", 1.4) +
      path2(sample((x) => [X(x), Y(SN(x, 15))], -Math.PI, Math.PI, 400), B, 1.6) +
      dot(X(0), Y(1), "#9aa0a8", 3, true) + dot(X(0), Y(-1), "#9aa0a8", 3, true) + dot(X(0), Y(0), "#e2463f", 3.6) +
      text(X(0) + 6, Y(0) + 15, "中点", "#e2463f", 11, "start") +
      text(X(-Math.PI), Y(0) + 14, "−π", AX, 11) + text(X(Math.PI), Y(0) + 14, "π", AX, 11) +
      zh(100, 157, "间断点收敛到左右极限的平均", B, 11);
    return fig(body);
  }

  return {
    chapter: "第 8 章",
    name: "无穷级数",
    mainline: "把无穷多个数\n或函数加起来，\n再用它表示函数",
    height: 1000,
    keyLabel: "重点",
    layers: [
      { from: 1, to: 3, label: "数项级数", color: "#c46c0c" },
      { from: 4, to: 5, label: "幂级数", color: "#7b3fd0" },
      // 字间加 U+2060（不断行），否则单站括号太窄，标签会折成两行
      { from: 6, to: 6, label: "傅\u2060里\u2060叶\u2060级\u2060数", color: "#3b47c4" },
    ],
    stations: [
      { n: 1, name: "无穷多个数怎么相加", color: "#2f6fe0", bg: "#eaf2fe", w: 226,
        desc: "一项一项往上加，部分和有极限就收敛；收敛的级数，一般项一定趋于 $0$",
        fig: plot1(),
        groups: [["什么叫有和", ["部分和 $S_n = u_1 + u_2 + \\cdots + u_n$", "$\\lim S_n = S$ 存在：收敛，和为 $S$\n不存在：发散"]],
                 ["必要条件", ["收敛 $\\Rightarrow u_n \\to 0$\n$u_n \\not\\to 0 \\Rightarrow$ 发散", "反过来不对：$\\sum \\dfrac{1}{n}$ 发散"]],
                 ["能直接求和的", ["等比：$|q| < 1$ 时\n$\\sum_{n=0}^{\\infty} aq^n = \\dfrac{a}{1 - q}$", "裂项：$\\dfrac{1}{n(n + 1)} = \\dfrac{1}{n} - \\dfrac{1}{n + 1}$"]]] },
      { n: 2, name: "全是正项，收不收敛", color: "#f08a1c", bg: "#fff3e6", w: 226, key: true,
        desc: "部分和一直增大，有界就收敛：和 $p$ 级数、等比级数比大小",
        fig: plot2(),
        groups: [["和 $p$ 级数比", ["$\\sum \\dfrac{1}{n^p}$：$p > 1$ 收敛，$p \\le 1$ 发散", "极限形式：$\\dfrac{u_n}{v_n} \\to l$，$0 < l < +\\infty$\n同敛散（用等价无穷小）"]],
                 ["和等比级数比", ["比值 $\\dfrac{u_{n+1}}{u_n} \\to \\rho$，根值 $\\sqrt[n]{u_n} \\to \\rho$\n$\\rho < 1$ 收敛，$\\rho > 1$ 发散", "含 $n!$、$n^n$ 用比值\n整个是 $n$ 次方用根值"]],
                 ["积分判别", ["$f$ 单调减：$\\sum f(n)$ 与\n$\\int_1^{+\\infty} f(x)\\,\\mathrm{d}x$ 同敛散"]]] },
      { n: 3, name: "有正有负，收不收敛", color: "#16a05a", bg: "#e9f7ef", w: 226, key: true,
        desc: "先取绝对值：收敛就是绝对收敛；绝对值发散时，交错级数看正负能不能抵消",
        fig: plot3(),
        groups: [["绝对收敛", ["$\\sum |u_n|$ 收敛 $\\Rightarrow \\sum u_n$ 收敛", "$\\sum |u_n|$ 发散、$\\sum u_n$ 收敛：\n条件收敛"]],
                 ["交错级数", ["莱布尼茨：$u_n$ 单调减、$u_n \\to 0$\n$\\Rightarrow \\sum (-1)^{n-1}u_n$ 收敛", "误差 $|r_n| \\le u_{n+1}$"]],
                 ["常用结论", ["$\\sum \\dfrac{(-1)^{n-1}}{n^p}$：$p > 1$ 绝对收敛\n$0 < p \\le 1$ 条件收敛", "收敛 + 发散 = 发散\n绝对收敛 + 条件收敛 = 条件收敛"]]] },
      { n: 4, name: "幂级数在哪些点收敛", color: "#7b3fd0", bg: "#f3ecfd", w: 226, key: true,
        desc: "对一般项取绝对值用比值法：收敛的点是一个区间，端点单独判",
        fig: plot4(),
        groups: [["收敛半径", ["$\\rho = \\lim\\left|\\dfrac{a_{n+1}}{a_n}\\right|$，$R = \\dfrac{1}{\\rho}$", "阿贝尔：收敛点往里都绝对收敛\n发散点往外都发散"]],
                 ["收敛域", ["$|x| < R$ 绝对收敛，$|x| > R$ 发散", "端点 $x = \\pm R$ 代入，\n按 ②③ 判断", "例：$\\sum \\dfrac{x^n}{n}$ 的收敛域是 $[-1, 1)$"]],
                 ["特殊的幂级数", ["缺项、中心不在原点：\n对整个一般项用比值法"]]] },
      { n: 5, name: "幂级数与函数来回换", color: "#0e8f8a", bg: "#e6f6f5", w: 226, key: true,
        desc: "逐项求导、逐项积分，和几个已知展开式来回换：求和函数，展开函数",
        fig: plot5(),
        groups: [["求和函数", ["收敛区间内逐项求导、逐项积分\n收敛半径不变", "化成已知的和，如\n$\\sum x^n = \\dfrac{1}{1 - x}$，再反向运算", "$\\sum_{n=1}^{\\infty}\\dfrac{x^n}{n} = -\\ln(1 - x)$，$[-1, 1)$"]],
                 ["展开成幂级数", ["系数 $a_n = \\dfrac{f^{(n)}(x_0)}{n!}$：泰勒级数\n余项 $\\to 0$ 时等于 $f(x)$", "$e^x$、$\\sin x$、$\\cos x$：$(-\\infty, +\\infty)$\n$\\ln(1 + x)$：$(-1, 1]$", "间接展开：代换、\n逐项求导、逐项积分"]]] },
      { n: 6, name: "用正弦余弦来展开", color: "#3b47c4", bg: "#ecedfb", w: 226,
        desc: "周期函数用 $\\cos nx$、$\\sin nx$ 展开，系数由正交性求出",
        fig: plot6(),
        groups: [["傅里叶系数", ["正交：不同的两个相乘，\n在一个周期上积分为 $0$", "$a_n = \\dfrac{1}{\\pi}\\int_{-\\pi}^{\\pi} f(x)\\cos nx\\,\\mathrm{d}x$\n$b_n = \\dfrac{1}{\\pi}\\int_{-\\pi}^{\\pi} f(x)\\sin nx\\,\\mathrm{d}x$"]],
                 ["收敛到什么", ["狄利克雷：连续点收敛于 $f(x)$\n间断点收敛于左右极限的平均"]],
                 ["奇偶与延拓", ["奇函数：正弦级数\n偶函数：余弦级数", "$[0, \\pi]$ 上：奇延拓得正弦级数\n偶延拓得余弦级数", "周期 $2l$：$nx$ 换成 $\\dfrac{n\\pi x}{l}$"]]] },
    ],
  };
};
