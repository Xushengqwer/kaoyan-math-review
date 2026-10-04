// 高数第 9 章路线图的内容（v1）。导出：node tools/mindmap.cjs drafts/calculus-ode-mindmap-v1.cjs drafts/calculus-ode-mindmap-v1.webp
module.exports = ({ tx, frame, lab, zh, dot, svg, AX }) => {
  const f1 = (n) => n.toFixed(1);
  const marks = new Set();
  const mk = (c) => { marks.add(c); return "m" + c.slice(1); };
  const arrowDefs = () => [...marks].map((c) => `<marker id="m${c.slice(1)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join("");
  const fig = (body) => svg(`<defs>${arrowDefs()}</defs>` + body);
  const line2 = (x1, y1, x2, y2, c, w = 1.4, dash = "", arrow = false) =>
    `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}${arrow ? ` marker-end="url(#${mk(c)})"` : ""}/>`;
  const pts2 = (pts) => pts.map(([u, v], i) => (i ? "L" : "M") + f1(u) + " " + f1(v)).join(" ");
  const path2 = (pts, c, w = 2, dash = "") => `<path d="${pts2(pts)}" stroke="${c}" stroke-width="${w}" fill="none"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  const sample = (g, a, b, n = 160) => { const p = []; for (let i = 0; i <= n; i++) p.push(g(a + (b - a) * i / n)); return p; };
  const xaxis = (Y0, x0 = 10, x1 = 194) => line2(x0, Y0, x1, Y0, AX, 1.4, "", true);
  const yaxis = (X0, y0 = 146, y1 = 8) => line2(X0, y0, X0, y1, AX, 1.4, "", true);
  const text = (x, y, s, c, size = 12, anchor = "middle") => `<text x="${f1(x)}" y="${f1(y)}" font-family="'Times New Roman',serif" font-size="${size}" fill="${c}" text-anchor="${anchor}">${s}</text>`;
  const curve = (X, Y, g, a, b, c, w = 2, dash = "", lo = -1e9, hi = 1e9) => path2(sample((x) => [X(x), Y(Math.min(Math.max(g(x), lo), hi))], a, b), c, w, dash);

  // ① 斜率场 y' = −y：每一点的斜率已知；初始条件挑出一条
  function plot1() {
    const { X, Y } = frame([-0.15, 3.2], [-1.6, 1.9], [16, 10, 194, 140]), C = "#2f6fe0";
    let body = xaxis(Y(0), 10) + yaxis(X(0));
    for (let i = 0; i <= 8; i++) for (let j = 0; j <= 8; j++) {
      const x = 0.15 + i * 0.36, y = -1.4 + j * 0.38, s = -y, L = 0.13 / Math.hypot(1, s);
      body += line2(X(x - L), Y(y - s * L), X(x + L), Y(y + s * L), "#9db8ec", 1.3);
    }
    for (const c of [-1.2, -0.5, 0.6]) body += curve(X, Y, (x) => c * Math.exp(-x), 0, 3.1, "#b9c9ea", 1.3);
    body += curve(X, Y, (x) => 1.6 * Math.exp(-x), 0, 3.1, C, 2.4) + dot(X(0), Y(1.6), "#e2463f", 3.4) +
      text(X(0) + 8, Y(1.6) - 2, "初始点", "#e2463f", 11, "start") +
      zh(100, 157, "每点的斜率已知，找出过初始点的曲线", C, 10.5);
    return fig(body);
  }

  // 方程的样子 → 办法 的小表
  const table = (rows, color, head) => {
    const row = ([a, b]) => `<div style="display:flex;align-items:center;gap:4px;margin:5px 0">` +
      `<div style="flex:1.1;border:2px solid ${color};border-radius:8px;background:#fff;padding:2px 4px;text-align:center;font-size:12.5px;color:${color};line-height:1.35">${tx(a)}</div>` +
      `<svg width="14" height="10" viewBox="0 0 14 10" style="flex:none"><path d="M1 5H11M7 1L12 5L7 9" stroke="${color}" fill="none" stroke-width="1.5"/></svg>` +
      `<div style="flex:1;font-size:12.5px;font-weight:600;color:#2a2f6e;line-height:1.35">${tx(b)}</div></div>`;
    return `<div style="text-align:center;font-size:13px;font-weight:700;color:#4a5060;margin-bottom:2px">${tx(head)}</div>` + rows.map(row).join("");
  };

  // ② 一阶方程：看样子选办法
  function table2() {
    return table([
      ["$g(y)\\,\\mathrm{d}y = f(x)\\,\\mathrm{d}x$", "两边积分"],
      ["$y' = \\varphi\\left(\\dfrac{y}{x}\\right)$", "换元 $u = \\dfrac{y}{x}$"],
      ["$y' + Py = Q$", "乘 $e^{\\int P\\,\\mathrm{d}x}$"],
      ["$P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = \\mathrm{d}u$", "通解 $u = C$"],
    ], "#f08a1c", "目标：变成能直接积分的样子");
  }

  // ③ 降阶
  function table3() {
    return table([
      ["$y^{(n)} = f(x)$", "积 $n$ 次"],
      ["$y'' = f(x, y')$", "$y' = p(x)$\n$p' = f(x, p)$"],
      ["$y'' = f(y, y')$", "$y' = p(y)$\n$p\\dfrac{\\mathrm{d}p}{\\mathrm{d}y} = f(y, p)$"],
    ], "#16a05a", "令 $y' = p$，降成一阶");
  }

  // ④ y'' + y = 1 的几个解：都绕着特解 y* = 1 振动
  function plot4() {
    const { X, Y } = frame([-0.2, 7], [-0.9, 2.9], [16, 10, 194, 140]), V = "#7b3fd0";
    let body = xaxis(Y(0), 10) + yaxis(X(0));
    for (const [a, b, c] of [[0.8, 0.3, "#c8b3ef"], [-0.6, 0.9, "#b49ae8"], [1.4, -0.5, "#9b7ee0"]])
      body += curve(X, Y, (x) => 1 + a * Math.cos(x) + b * Math.sin(x), 0, 6.9, c, 1.6);
    body += line2(X(0), Y(1), X(6.9), Y(1), "#e2463f", 2, "5 3") +
      `<text x="${f1(X(6.9))}" y="${f1(Y(1) - 6)}" font-family="'Times New Roman',serif" font-size="12" fill="#e2463f" text-anchor="end"><tspan font-style="italic">y</tspan>* = 1</text>` +
      zh(100, 157, "通解 = 一个特解 + 齐次通解", V, 11);
    return fig(body);
  }

  // ⑤ 三种特征根的解
  function plot5() {
    const { X, Y } = frame([-0.2, 4.6], [-1.15, 1.25], [16, 10, 194, 132]), T = "#0e8f8a";
    let body = xaxis(Y(0), 10) + yaxis(X(0)) +
      curve(X, Y, (x) => Math.exp(-0.5 * x) - 0.6 * Math.exp(-2 * x), 0, 4.5, "#e0884a", 2) +
      curve(X, Y, (x) => (1 + 2 * x) * Math.exp(-1.2 * x), 0, 4.5, "#3b47c4", 2) +
      curve(X, Y, (x) => Math.exp(-0.35 * x) * Math.cos(3 * x), 0, 4.5, T, 2);
    const leg = (x, y, c, s) => `<line x1="${x}" y1="${y - 4}" x2="${x + 14}" y2="${y - 4}" stroke="${c}" stroke-width="2.4"/>` + zh(x + 17, y, s, c, 10.5, "start");
    body += leg(104, 22, "#e0884a", "不等实根") + leg(104, 36, "#3b47c4", "重根") + leg(104, 50, T, "共轭复根") +
      zh(100, 157, "代入 e^{rx}：解方程变成解 r", T, 11);
    return fig(body.replace("e^{rx}", "e<tspan font-size=\"8\" dy=\"-5\">rx</tspan><tspan dy=\"5\"></tspan>"));
  }

  // ⑥ y'' + y = sin x：右端碰上特征根 ±i，特解 −(x/2)cos x 振幅越来越大；对照 y'' + 4y = sin x 的 sin x/3
  function plot6() {
    const { X, Y } = frame([-0.2, 12.8], [-6.6, 6.6], [16, 10, 194, 140]), B = "#3b47c4";
    let body = xaxis(Y(0), 10) + yaxis(X(0)) +
      curve(X, Y, (x) => x / 2, 0, 12.6, "#c3c7f0", 1, "3 3") + curve(X, Y, (x) => -x / 2, 0, 12.6, "#c3c7f0", 1, "3 3") +
      curve(X, Y, (x) => Math.sin(x) / 3, 0, 12.6, "#8a8f98", 1.6) +
      curve(X, Y, (x) => -x / 2 * Math.cos(x), 0, 12.6, B, 2);
    body += `<text x="${f1(X(0.3))}" y="${f1(Y(5.3))}" font-family="'Times New Roman',serif" font-size="11.5" fill="${B}" text-anchor="start"><tspan font-style="italic">y</tspan>'' + <tspan font-style="italic">y</tspan> = sin <tspan font-style="italic">x</tspan>：乘 <tspan font-style="italic">x</tspan></text>` +
      `<text x="${f1(X(0.3))}" y="${f1(Y(-5.4))}" font-family="'Times New Roman',serif" font-size="11.5" fill="#6b6f78" text-anchor="start"><tspan font-style="italic">y</tspan>'' + 4<tspan font-style="italic">y</tspan> = sin <tspan font-style="italic">x</tspan>：不乘</text>` +
      zh(100, 157, "右端碰上特征根，特解要乘 x", B, 11);
    return fig(body);
  }

  return {
    chapter: "第 9 章",
    name: "常微分方程",
    mainline: "只知道变化规律，\n反过来求函数，\n按方程的样子求解",
    height: 1000,
    keyLabel: "重点",
    layers: [
      { from: 1, to: 1, label: "列方程", color: "#2f6fe0" },
      // 字间加 U+2060（不断行），否则单站括号太窄，标签会折成两行
      { from: 2, to: 2, label: "一\u2060阶\u2060方\u2060程", color: "#c46c0c" },
      { from: 3, to: 6, label: "高阶方程", color: "#3b47c4" },
    ],
    stations: [
      { n: 1, name: "怎么列方程，解是什么", color: "#2f6fe0", bg: "#eaf2fe", w: 250,
        desc: "把变化规律写成含导数的方程；$n$ 阶方程的通解带 $n$ 个常数，初始条件定出特解",
        fig: plot1(),
        groups: [["微分方程", ["含未知函数导数的方程\n阶：最高阶导数的阶数", "通解：$n$ 阶带 $n$ 个独立常数\n特解：用初始条件定出常数"]],
                 ["怎么列方程", ["切线斜率 $= y'$\n变化率 $= \\dfrac{\\mathrm{d}y}{\\mathrm{d}t}$", "面积、弧长写成变限积分，再求导", "积分方程：两边求导\n上下限相等处给出初始条件"]],
                 ["不解方程", ["只问 $y''(0)$：把 $x = 0$ 代进方程"]]] },
      { n: 2, name: "一阶方程怎么积出来", color: "#f08a1c", bg: "#fff3e6", w: 224, key: true,
        desc: "想办法变成能直接积分的样子：分离变量、换元、乘积分因子、认出全微分",
        fig: table2(),
        groups: [["变量能分开", ["$\\int\\dfrac{\\mathrm{d}y}{g(y)} = \\int f(x)\\,\\mathrm{d}x + C$", "齐次：$u = \\dfrac{y}{x}$\n$f(ax + by + c)$：$u = ax + by + c$"]],
                 ["一阶线性", ["乘 $e^{\\int P\\,\\mathrm{d}x}$：\n$\\left(ye^{\\int P\\,\\mathrm{d}x}\\right)' = Qe^{\\int P\\,\\mathrm{d}x}$", "伯努利：$z = y^{1-n}$ 化成线性", "$x$ 当未知函数：\n$\\dfrac{\\mathrm{d}x}{\\mathrm{d}y} + P(y)x = Q(y)$"]],
                 ["全微分方程", ["$\\dfrac{\\partial P}{\\partial y} = \\dfrac{\\partial Q}{\\partial x}$：通解 $u(x, y) = C$\n求 $u$ 用第 7 章的办法"]]] },
      { n: 3, name: "高阶方程怎么降阶", color: "#16a05a", bg: "#e9f7ef", w: 216,
        desc: "缺 $y$ 或缺 $x$，令 $y' = p$，降成一阶方程，再用 ② 的办法",
        fig: table3(),
        groups: [["三类可降阶", ["$y^{(n)} = f(x)$：积 $n$ 次", "缺 $y$：$y' = p(x)$，$y'' = p'$", "缺 $x$：$y' = p(y)$\n$y'' = p\\dfrac{\\mathrm{d}p}{\\mathrm{d}y}$"]],
                 ["怎么省事", ["给了初始条件：\n先定 $C_1$，再积第二次"]]] },
      { n: 4, name: "线性方程的解的结构", color: "#7b3fd0", bg: "#f3ecfd", w: 224,
        desc: "齐次方程的解能叠加；非齐次方程的通解 = 一个特解 + 齐次方程的通解",
        fig: plot4(),
        groups: [["齐次方程", ["解相加、乘常数仍是解", "$y_1, y_2$ 不成比例：\n通解 $C_1y_1 + C_2y_2$"]],
                 ["非齐次方程", ["通解 $=$ 齐次通解 $+$ 一个特解", "两个解之差：齐次方程的解", "右端相加：特解相加"]]] },
      { n: 5, name: "常系数齐次怎么解", color: "#0e8f8a", bg: "#e6f6f5", w: 216, key: true,
        desc: "用 $e^{rx}$ 去试：求导只多一个 $r$，方程变成特征方程",
        fig: plot5(),
        groups: [["特征方程", ["$y = e^{rx}$ 代入：$r^2 + pr + q = 0$"]],
                 ["三种根", ["不等实根：$C_1e^{r_1x} + C_2e^{r_2x}$", "重根：$(C_1 + C_2x)e^{rx}$", "复根 $\\alpha \\pm \\mathrm{i}\\beta$：\n$e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$"]],
                 ["高阶、反求", ["$k$ 重根：乘 $1, x, \\cdots, x^{k-1}$", "由通解读出根，写出方程"]]] },
      { n: 6, name: "常系数非齐次怎么解", color: "#3b47c4", bg: "#ecedfb", w: 224, key: true,
        desc: "右端什么样，特解就设什么样；碰上特征根，乘 $x$",
        fig: plot6(),
        groups: [["待定系数", ["$e^{\\lambda x}P_m(x)$：$y^* = x^kQ_m(x)e^{\\lambda x}$\n$k$：$\\lambda$ 是几重特征根", "含 $\\cos\\omega x$、$\\sin\\omega x$：两项都设\n$\\lambda + \\mathrm{i}\\omega$ 是特征根时 $k = 1$", "右端是和：分开设，再相加"]],
                 ["欧拉方程", ["$x = e^t$，$D = \\dfrac{\\mathrm{d}}{\\mathrm{d}t}$：\n$xy' = Dy$，$x^2y'' = D(D - 1)y$", "化成常系数方程"]]] },
    ],
  };
};
