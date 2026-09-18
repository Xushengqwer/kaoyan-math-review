registerSubject({
  id: "calculus",
  name: "高等数学（微积分）",
  color: "#2b6f77",
  chapters: [
    // 第1章按「模块」组织：4 个模块 9 张卡。
    { id: "limit", name: "函数、极限、连续", order: 1, modules: [
      { no: "一", name: "函数", brief: "研究对象：函数的概念、四种基本特性与初等函数" },
      { no: "二", name: "极限的概念与性质", brief: "极限的精确定义，以及由定义推出的性质" },
      { no: "三", name: "极限的运算与存在准则", brief: "怎样求极限，以及判定极限存在的两个准则" },
      { no: "四", name: "连续与间断", brief: "用极限刻画连续，闭区间上连续函数的整体性质" }
    ] },
    // 第2章按「模块」组织：5 个模块 11 张卡。
    { id: "derivative", name: "一元函数微分学", order: 2, modules: [
      { no: "一", name: "导数与微分的概念", brief: "用极限定义导数与微分，二者在一元函数中等价" },
      { no: "二", name: "求导法则", brief: "基本公式加上各种法则，把求导变成机械运算" },
      { no: "三", name: "微分中值定理与泰勒公式", brief: "把函数值与导数值联系起来的一组定理" },
      { no: "四", name: "未定式与洛必达法则", brief: "中值定理的第一个应用：用导数求未定式的极限" },
      { no: "五", name: "导数的应用", brief: "用导数研究函数的性态与曲线的几何性质" }
    ] },
    // 第3章按「模块」组织：6 个模块 10 张卡。
    { id: "integral", name: "一元函数积分学", order: 3, modules: [
      { no: "一", name: "不定积分", brief: "求导的逆运算：原函数、基本公式与三大积分法" },
      { no: "二", name: "定积分的概念与性质", brief: "和式的极限，以及由定义推出的性质" },
      { no: "三", name: "微积分基本定理", brief: "变限积分把定积分与原函数连接起来" },
      { no: "四", name: "定积分的计算", brief: "换元、分部与利用对称性、周期性的公式" },
      { no: "五", name: "反常积分", brief: "积分区间无穷或被积函数无界时的推广" },
      { no: "六", name: "定积分的应用", brief: "微元法求几何量与物理量" }
    ] },
    // 第4章按「模块」组织：4 个模块 8 张卡。
    { id: "vector-geometry", name: "向量代数与空间解析几何", order: 4, modules: [
      { no: "一", name: "向量及其运算", brief: "工具：向量的坐标与三种乘积" },
      { no: "二", name: "平面与直线的方程", brief: "用法向量写平面，用方向向量写直线" },
      { no: "三", name: "位置关系、夹角与距离", brief: "平面、直线之间的关系全部化为向量运算" },
      { no: "四", name: "曲面与空间曲线", brief: "柱面、旋转曲面、二次曲面，以及曲线的投影" }
    ] },
    // 第5章按「模块」组织：5 个模块 9 张卡。
    { id: "multivar-derivative", name: "多元函数微分学", order: 5, modules: [
      { no: "一", name: "多元函数的极限与连续", brief: "研究对象：二元函数，以及它的极限与连续" },
      { no: "二", name: "偏导数与全微分", brief: "沿坐标轴的变化率，以及整体的线性近似" },
      { no: "三", name: "多元函数求导法则", brief: "复合函数与隐函数的偏导数怎么求" },
      { no: "四", name: "方向导数、梯度与几何应用", brief: "任意方向的变化率，以及曲线、曲面的切线与法线" },
      { no: "五", name: "多元函数的极值", brief: "无条件极值、最值与条件极值" }
    ] },
    // 第6章按「模块」组织：5 个模块 8 张卡。
    { id: "multiple-integral", name: "重积分（二重积分、三重积分）", order: 6, modules: [
      { no: "一", name: "二重积分的概念与性质", brief: "定积分的思想推广到平面区域" },
      { no: "二", name: "二重积分的计算", brief: "化为两次定积分：直角坐标、极坐标与一般换元" },
      { no: "三", name: "三重积分", brief: "推广到空间区域：投影法、截面法、柱面坐标与球面坐标" },
      { no: "四", name: "对称性", brief: "利用区域与被积函数的对称性化简重积分" },
      { no: "五", name: "重积分的应用", brief: "体积、曲面面积、质量、质心、转动惯量与引力" }
    ] },
    // 第7章按「模块」组织：5 个模块 9 张卡。
    { id: "line-surface-integral", name: "曲线积分与曲面积分", order: 7, modules: [
      { no: "一", name: "曲线积分", brief: "在曲线上积分：对弧长（第一类）与对坐标（第二类）" },
      { no: "二", name: "格林公式与路径无关", brief: "平面闭曲线上的积分化为二重积分，以及与路径无关的条件" },
      { no: "三", name: "曲面积分", brief: "在曲面上积分：对面积（第一类）与对坐标（第二类）" },
      { no: "四", name: "高斯公式与斯托克斯公式", brief: "闭曲面积分化为三重积分，空间闭曲线积分化为曲面积分" },
      { no: "五", name: "对称性与物理应用", brief: "对称性化简，以及曲线、曲面构件的质量、质心与转动惯量" }
    ] },
    // 第8章按「模块」组织：5 个模块 8 张卡。
    { id: "series", name: "无穷级数", order: 8, modules: [
      { no: "一", name: "常数项级数的概念与性质", brief: "无穷多项求和：部分和的极限，以及收敛级数的性质" },
      { no: "二", name: "正项级数", brief: "各项非负时，用比较、比值、根值判断敛散" },
      { no: "三", name: "任意项级数", brief: "交错级数，以及绝对收敛与条件收敛" },
      { no: "四", name: "幂级数", brief: "收敛域、和函数，以及把函数展开成幂级数" },
      { no: "五", name: "傅里叶级数", brief: "把周期函数展开成三角级数" }
    ] },
    // 第9章按「模块」组织：4 个模块 9 张卡。
    { id: "ode", name: "常微分方程", order: 9, modules: [
      { no: "一", name: "基本概念", brief: "微分方程、阶、解、通解与特解" },
      { no: "二", name: "一阶微分方程", brief: "按方程类型选解法：分离变量、换元、公式与全微分" },
      { no: "三", name: "可降阶的高阶方程", brief: "用换元把二阶方程降为一阶" },
      { no: "四", name: "高阶线性微分方程", brief: "解的结构，常系数方程的特征方程法，以及欧拉方程" }
    ] }
  ],
  items: [
    {
      id: "calc-lim-function",
      chapterId: "limit",
      type: "definition",
      types: ["definition"],
      module: 1,
      card: "①",
      title: "函数的概念与基本特性",
      md: "### 〔定义〕函数\n\n设数集 $D \\subset \\mathbb{R}$，若对每个 $x \\in D$，按照某个对应法则 $f$ 总有==唯一确定==的数 $y$ 与之对应，则称 $f$ 为定义在 $D$ 上的==函数==，记作 $y = f(x)$。\n- **定义域**：数集 $D$，记作 $D_f$；\n- **值域**：$R_f = \\{\\, y \\mid y = f(x),\\ x \\in D \\,\\}$；\n- **两要素**：定义域与对应法则相同的两个函数是同一函数。\n\n---\n\n### 〔定义〕有界性\n\n设函数 $f(x)$ 在数集 $X$ 上有定义：\n- **有界**：若存在 $M > 0$，使对任意 $x \\in X$ 都有 $|f(x)| \\le M$，则称 $f(x)$ 在 $X$ 上==有界==；\n- **无界**：若对任意 $M > 0$，总存在 $x_0 \\in X$，使 $|f(x_0)| > M$，则称 $f(x)$ 在 $X$ 上无界；\n- **上界与下界**：$f(x) \\le M_1$ 恒成立称有上界，$f(x) \\ge M_2$ 恒成立称有下界；有界 $\\iff$ 既有上界又有下界。\n\n---\n\n### 〔定义〕单调性\n\n设函数 $f(x)$ 在区间 $I$ 上有定义，对 $I$ 上任意两点 $x_1 < x_2$：\n- **单调增加**：恒有 $f(x_1) < f(x_2)$；\n- **单调减少**：恒有 $f(x_1) > f(x_2)$。\n\n---\n\n### 〔定义〕奇偶性\n\n设函数 $f(x)$ 的定义域 $D$ 关于原点对称：\n- **偶函数**：对任意 $x \\in D$ 有 $f(-x) = f(x)$，图形关于 $y$ 轴对称；\n- **奇函数**：对任意 $x \\in D$ 有 $f(-x) = -f(x)$，图形关于原点对称。\n\n---\n\n### 〔定义〕周期性\n\n若存在 $T > 0$，使对任意 $x \\in D$ 有 $x + T \\in D$ 且 $f(x + T) = f(x)$，则称 $f(x)$ 为==周期函数==，$T$ 称为它的一个周期；通常所说的周期指==最小正周期==。",
      tags: ["函数", "定义域", "有界性", "单调性", "奇偶性", "周期性", "定义"]
    },
    {
      id: "calc-lim-composite-inverse",
      chapterId: "limit",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "②",
      title: "复合函数、反函数与初等函数",
      md: "### 〔定义〕复合函数\n\n设 $y = f(u)$ 的定义域为 $D_f$，$u = g(x)$ 的值域为 $R_g$，若 $R_g \\subset D_f$，则\n$$y = f[g(x)]$$\n\n称为由 $u = g(x)$ 与 $y = f(u)$ 构成的==复合函数==，$u$ 称为==中间变量==。\n\n---\n\n### 〔定义〕反函数\n\n设函数 $y = f(x)$ 的定义域为 $D$、值域为 $R_f$，若对每个 $y \\in R_f$ 有==唯一==的 $x \\in D$ 使 $f(x) = y$，则由此确定的函数 $x = f^{-1}(y)$ 称为 $f$ 的==反函数==，习惯上记作 $y = f^{-1}(x)$。\n\n---\n\n### 〔性质〕反函数的性质\n\n- **存在条件**：单调函数必有反函数，且反函数与原函数的单调性相同；\n- **图形**：$y = f(x)$ 与 $y = f^{-1}(x)$ 的图形关于直线 $y = x$ 对称；\n- **复合**：$f^{-1}[f(x)] = x\\ (x \\in D)$，$f[f^{-1}(y)] = y\\ (y \\in R_f)$。\n\n---\n\n### 〔定义〕基本初等函数与初等函数\n\n- **基本初等函数**：幂函数 $x^\\mu$、指数函数 $a^x$、对数函数 $\\log_a x$、三角函数、反三角函数（$a > 0$，$a \\neq 1$）；\n- **初等函数**：由常数和基本初等函数经过==有限次==四则运算和有限次复合所构成、并可用一个式子表示的函数。\n\n---\n\n### 〔定义〕分段函数与隐函数\n\n- **分段函数**：在定义域的不同部分用不同式子表示的函数，如 $|x|$、符号函数 $\\operatorname{sgn} x$、取整函数 $[x]$；\n- **隐函数**：由方程 $F(x, y) = 0$ 确定的函数 $y = y(x)$。",
      tags: ["复合函数", "反函数", "基本初等函数", "初等函数", "分段函数", "定义", "性质"]
    },
    {
      id: "calc-lim-limit-def",
      chapterId: "limit",
      type: "definition",
      types: ["definition", "theorem"],
      module: 2,
      card: "③",
      title: "数列极限与函数极限的定义",
      md: "### 〔定义〕数列极限（$\\varepsilon$-$N$ 定义）\n\n设数列 $\\{x_n\\}$ 与常数 $a$，若对任意给定的 $\\varepsilon > 0$，总存在正整数 $N$，使当 $n > N$ 时恒有\n$$|x_n - a| < \\varepsilon$$\n\n则称数列 $\\{x_n\\}$ ==收敛于== $a$，记作 $\\lim\\limits_{n \\to \\infty} x_n = a$；不收敛的数列称为==发散==。\n\n---\n\n### 〔定义〕函数极限（$x \\to x_0$）\n\n设 $f(x)$ 在 $x_0$ 的某==去心邻域==内有定义，若对任意给定的 $\\varepsilon > 0$，总存在 $\\delta > 0$，使当 $0 < |x - x_0| < \\delta$ 时恒有\n$$|f(x) - A| < \\varepsilon$$\n\n则称 $A$ 为 $x \\to x_0$ 时 $f(x)$ 的==极限==，记作 $\\lim\\limits_{x \\to x_0} f(x) = A$。\n- **与该点无关**：极限是否存在、等于多少，与 $f(x_0)$ 有无定义、取何值无关。\n\n---\n\n### 〔定义〕函数极限（$x \\to \\infty$）\n\n设 $|x|$ 大于某正数时 $f(x)$ 有定义，若对任意给定的 $\\varepsilon > 0$，总存在 $X > 0$，使当 $|x| > X$ 时恒有 $|f(x) - A| < \\varepsilon$，则称 $\\lim\\limits_{x \\to \\infty} f(x) = A$。\n- **单向情形**：把 $|x| > X$ 换成 $x > X$ 或 $x < -X$，即得 $x \\to +\\infty$、$x \\to -\\infty$ 时的极限。\n\n---\n\n### 〔定义〕单侧极限\n\n- **左极限**：把条件 $0 < |x - x_0| < \\delta$ 换成 $x_0 - \\delta < x < x_0$，记作 $f(x_0^-) = \\lim\\limits_{x \\to x_0^-} f(x)$；\n- **右极限**：换成 $x_0 < x < x_0 + \\delta$，记作 $f(x_0^+) = \\lim\\limits_{x \\to x_0^+} f(x)$。\n\n---\n\n### 〔定理〕极限存在的充要条件\n\n- **单侧**：$\\lim\\limits_{x \\to x_0} f(x) = A \\iff f(x_0^-) = f(x_0^+) = A$；\n- **无穷远**：$\\lim\\limits_{x \\to \\infty} f(x) = A \\iff \\lim\\limits_{x \\to +\\infty} f(x) = \\lim\\limits_{x \\to -\\infty} f(x) = A$。",
      tags: ["数列极限", "函数极限", "ε-N", "ε-δ", "单侧极限", "定义", "定理"]
    },
    {
      id: "calc-lim-limit-properties",
      chapterId: "limit",
      type: "theorem",
      types: ["theorem"],
      module: 2,
      card: "④",
      title: "极限的性质",
      md: "### 〔定理〕唯一性\n\n若数列（或函数）的极限存在，则极限==唯一==。\n\n---\n\n### 〔定理〕有界性\n\n- **数列**：收敛数列必有界；\n- **函数（局部有界）**：若 $\\lim\\limits_{x \\to x_0} f(x) = A$，则存在 $M > 0$ 与 $\\delta > 0$，使当 $0 < |x - x_0| < \\delta$ 时 $|f(x)| \\le M$。\n\n---\n\n### 〔定理〕保号性\n\n设 $\\lim\\limits_{x \\to x_0} f(x) = A$：\n- **由极限推函数**：若 $A > 0$（或 $A < 0$），则存在 $x_0$ 的某去心邻域，在其内 $f(x) > 0$（或 $f(x) < 0$）；\n- **由函数推极限**：若在 $x_0$ 的某去心邻域内 $f(x) \\ge 0$（或 $f(x) \\le 0$），则 $A \\ge 0$（或 $A \\le 0$）。\n\n数列极限有相同的结论（把「某去心邻域内」换成「$n$ 充分大时」）。\n\n---\n\n### 〔定理〕收敛数列与子数列\n\n- **子数列同极限**：若 $\\lim\\limits_{n \\to \\infty} x_n = a$，则 $\\{x_n\\}$ 的任一子数列也收敛于 $a$；\n- **奇偶子列**：$\\lim\\limits_{n \\to \\infty} x_n = a \\iff \\lim\\limits_{k \\to \\infty} x_{2k-1} = \\lim\\limits_{k \\to \\infty} x_{2k} = a$。\n\n---\n\n### 〔定理〕函数极限与数列极限的关系（归结原则）\n\n$\\lim\\limits_{x \\to x_0} f(x) = A$ 的==充要条件==是：对任意满足 $x_n \\to x_0$ 且 $x_n \\neq x_0$ 的数列 $\\{x_n\\}$，都有\n$$\\lim\\limits_{n \\to \\infty} f(x_n) = A$$\n\n---\n\n### 〔提示〕\n\n- 由归结原则：若能找到两个趋于 $x_0$ 的数列使 $f(x_n)$ 的极限不同，则 $\\lim\\limits_{x \\to x_0} f(x)$ 不存在，例如 $\\sin\\dfrac{1}{x}$（$x \\to 0$）。",
      tags: ["唯一性", "有界性", "保号性", "子数列", "归结原则", "海涅定理", "定理"]
    },
    {
      id: "calc-lim-infinitesimal",
      chapterId: "limit",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "⑤",
      title: "无穷小与无穷大",
      md: "### 〔定义〕无穷小与无穷大\n\n在自变量的某一变化过程中：\n- **无穷小**：若 $\\lim f(x) = 0$，则称 $f(x)$ 为这一过程中的==无穷小==；\n- **无穷大**：若对任意 $M > 0$，在该过程中（从某时刻起）总有 $|f(x)| > M$，则称 $f(x)$ 为==无穷大==，记作 $\\lim f(x) = \\infty$。\n\n---\n\n### 〔定理〕极限与无穷小的关系\n\n$$\\lim f(x) = A \\iff f(x) = A + \\alpha$$\n\n其中 $\\alpha$ 是同一变化过程中的无穷小（$\\lim \\alpha = 0$）。\n\n---\n\n### 〔定理〕无穷小与无穷大的关系\n\n在同一变化过程中：\n- 若 $f(x)$ 为无穷大，则 $\\dfrac{1}{f(x)}$ 为无穷小；\n- 若 $f(x)$ 为无穷小且 $f(x) \\neq 0$，则 $\\dfrac{1}{f(x)}$ 为无穷大。\n\n---\n\n### 〔性质〕无穷小的运算性质\n\n- **有限个之和**：有限个无穷小的和是无穷小；\n- **有限个之积**：有限个无穷小的乘积是无穷小；\n- **有界乘无穷小**：有界函数与无穷小的乘积是==无穷小==。\n\n---\n\n### 〔定义〕无穷小的比较\n\n设 $\\alpha, \\beta$ 是同一变化过程中的无穷小，且 $\\alpha \\neq 0$：\n- **高阶**：若 $\\lim \\dfrac{\\beta}{\\alpha} = 0$，称 $\\beta$ 是比 $\\alpha$ ==高阶的无穷小==，记作 $\\beta = o(\\alpha)$；\n- **低阶**：若 $\\lim \\dfrac{\\beta}{\\alpha} = \\infty$，称 $\\beta$ 是比 $\\alpha$ 低阶的无穷小；\n- **同阶**：若 $\\lim \\dfrac{\\beta}{\\alpha} = c \\neq 0$，称 $\\beta$ 与 $\\alpha$ 是==同阶无穷小==；\n- **$k$ 阶**：若 $\\lim \\dfrac{\\beta}{\\alpha^k} = c \\neq 0\\ (k > 0)$，称 $\\beta$ 是关于 $\\alpha$ 的 ==$k$ 阶无穷小==；\n- **等价**：若 $\\lim \\dfrac{\\beta}{\\alpha} = 1$，称 $\\beta$ 与 $\\alpha$ 是==等价无穷小==，记作 $\\alpha \\sim \\beta$。\n\n---\n\n### 〔定理〕等价无穷小的充要条件\n\n$$\\alpha \\sim \\beta \\iff \\beta = \\alpha + o(\\alpha)$$",
      tags: ["无穷小", "无穷大", "无穷小的比较", "等价无穷小", "高阶无穷小", "定义", "定理", "性质"]
    },
    {
      id: "calc-lim-operations",
      chapterId: "limit",
      type: "theorem",
      types: ["theorem", "property"],
      module: 3,
      card: "⑥",
      title: "极限的运算法则与等价无穷小",
      md: "### 〔定理〕极限的四则运算法则\n\n设 $\\lim f(x) = A$，$\\lim g(x) = B$，则：\n- **加减**：$\\lim [f(x) \\pm g(x)] = A \\pm B$；\n- **乘积**：$\\lim f(x)g(x) = AB$，特别地 $\\lim kf(x) = kA$，$\\lim [f(x)]^n = A^n$；\n- **商**：若 $B \\neq 0$，则 $\\lim \\dfrac{f(x)}{g(x)} = \\dfrac{A}{B}$。\n\n法则要求参与运算的各个极限==都存在==（商还要求分母极限不为零）。\n\n---\n\n### 〔定理〕复合函数的极限\n\n设 $\\lim\\limits_{x \\to x_0} g(x) = u_0$，$\\lim\\limits_{u \\to u_0} f(u) = A$，且在 $x_0$ 的某去心邻域内 $g(x) \\neq u_0$，则\n$$\\lim\\limits_{x \\to x_0} f[g(x)] = \\lim\\limits_{u \\to u_0} f(u) = A$$\n\n---\n\n### 〔定理〕等价无穷小替换\n\n设 $\\alpha \\sim \\alpha'$，$\\beta \\sim \\beta'$，且 $\\lim \\dfrac{\\beta'}{\\alpha'}$ 存在，则\n$$\\lim \\dfrac{\\beta}{\\alpha} = \\lim \\dfrac{\\beta'}{\\alpha'}$$\n\n- **适用范围**：只对==乘除因子==整体替换；和差中的项不能随意替换。\n\n---\n\n### 〔性质〕常用等价无穷小\n\n当 $x \\to 0$ 时：\n- **三角类**：$\\sin x \\sim x$，$\\tan x \\sim x$，$\\arcsin x \\sim x$，$\\arctan x \\sim x$；\n- **余弦**：$1 - \\cos x \\sim \\dfrac{1}{2}x^2$；\n- **指数与对数**：$e^x - 1 \\sim x$，$a^x - 1 \\sim x\\ln a$，$\\ln(1 + x) \\sim x$；\n- **幂**：$(1 + x)^\\alpha - 1 \\sim \\alpha x\\ (\\alpha \\neq 0)$。\n\n把 $x$ 换成任一趋于 $0$ 的 $u(x)$ 后仍成立，如 $x \\to 0$ 时 $\\sin x^2 \\sim x^2$。",
      tags: ["四则运算", "复合函数的极限", "等价无穷小替换", "常用等价无穷小", "定理", "性质"]
    },
    {
      id: "calc-lim-criteria",
      chapterId: "limit",
      type: "theorem",
      types: ["theorem"],
      module: 3,
      card: "⑦",
      title: "极限存在准则与两个重要极限",
      md: "### 〔定理〕夹逼准则\n\n若在 $x_0$ 的某去心邻域内（或 $n$ 充分大时）有\n$$g(x) \\le f(x) \\le h(x)$$\n\n且 $\\lim g(x) = \\lim h(x) = A$，则 $\\lim f(x) = A$。\n\n---\n\n### 〔定理〕单调有界准则\n\n- **数列**：单调增加且有上界（或单调减少且有下界）的数列==必收敛==；\n- **函数**：$f(x)$ 在 $x_0$ 的某左邻域内单调且有界，则 $f(x_0^-)$ 必存在（右侧、$x \\to \\pm\\infty$ 同理）。\n\n---\n\n### 〔定理〕两个重要极限\n\n- **第一个**：\n  $$\\lim\\limits_{x \\to 0} \\dfrac{\\sin x}{x} = 1$$\n- **第二个**：\n  $$\\lim\\limits_{x \\to \\infty} \\left(1 + \\dfrac{1}{x}\\right)^x = e, \\qquad \\lim\\limits_{x \\to 0} (1 + x)^{\\frac{1}{x}} = e$$\n\n---\n\n### 〔推论〕$1^\\infty$ 型极限\n\n若 $\\lim u(x) = 1$，$\\lim v(x) = \\infty$，且 $\\lim v(x)[u(x) - 1] = A$，则\n$$\\lim u(x)^{v(x)} = e^A$$",
      tags: ["夹逼准则", "单调有界准则", "两个重要极限", "1的无穷次方", "定理"]
    },
    {
      id: "calc-lim-continuity",
      chapterId: "limit",
      type: "definition",
      types: ["definition", "theorem"],
      module: 4,
      card: "⑧",
      title: "连续与间断点",
      md: "### 〔定义〕函数在一点连续\n\n设 $f(x)$ 在 $x_0$ 的某邻域内有定义：\n- **增量形式**：若 $\\lim\\limits_{\\Delta x \\to 0} \\Delta y = \\lim\\limits_{\\Delta x \\to 0} [f(x_0 + \\Delta x) - f(x_0)] = 0$，则称 $f(x)$ 在 $x_0$ ==连续==；\n- **极限形式**：等价地，$\\lim\\limits_{x \\to x_0} f(x) = f(x_0)$。\n\n即同时满足：$f(x_0)$ 有定义、$\\lim\\limits_{x \\to x_0} f(x)$ 存在、二者相等。\n\n---\n\n### 〔定义〕左连续与右连续\n\n- **左连续**：$f(x_0^-) = f(x_0)$；\n- **右连续**：$f(x_0^+) = f(x_0)$；\n- **关系**：$f(x)$ 在 $x_0$ 连续 $\\iff$ 在 $x_0$ 既左连续又右连续。\n\n在区间上每一点都连续的函数称为该区间上的连续函数（端点处指单侧连续）。\n\n---\n\n### 〔定义〕间断点及其分类\n\n设 $f(x)$ 在 $x_0$ 的某去心邻域内有定义，且在 $x_0$ 不连续，则 $x_0$ 称为==间断点==：\n1. **第一类间断点**：$f(x_0^-)$ 与 $f(x_0^+)$ ==都存在==：\n   - **可去间断点**：$f(x_0^-) = f(x_0^+)$，但不等于 $f(x_0)$ 或 $f(x_0)$ 无定义；\n   - **跳跃间断点**：$f(x_0^-) \\neq f(x_0^+)$。\n2. **第二类间断点**：$f(x_0^-)$ 与 $f(x_0^+)$ ==至少一个不存在==：\n   - **无穷间断点**：至少一侧极限为 $\\infty$，如 $\\dfrac{1}{x}$ 在 $x = 0$；\n   - **振荡间断点**：函数值无限振荡，如 $\\sin\\dfrac{1}{x}$ 在 $x = 0$。\n\n---\n\n### 〔定理〕连续函数的运算与初等函数的连续性\n\n- **四则运算**：连续函数的和、差、积、商（分母不为零）仍连续；\n- **复合**：连续函数的复合函数仍连续；\n- **反函数**：单调连续函数的反函数仍单调连续；\n- **初等函数**：一切初等函数在其==定义区间==内都连续。",
      tags: ["连续", "左连续", "右连续", "间断点", "可去间断点", "跳跃间断点", "无穷间断点", "振荡间断点", "定义", "定理"]
    },
    {
      id: "calc-lim-closed-interval",
      chapterId: "limit",
      type: "theorem",
      types: ["theorem"],
      module: 4,
      card: "⑨",
      title: "闭区间上连续函数的性质",
      md: "### 〔定理〕有界性与最大值最小值定理\n\n设 $f(x)$ 在闭区间 $[a, b]$ 上连续，则：\n- **有界性**：$f(x)$ 在 $[a, b]$ 上有界；\n- **最值**：$f(x)$ 在 $[a, b]$ 上一定能取得==最大值 $M$ 与最小值 $m$==。\n\n---\n\n### 〔定理〕零点定理\n\n设 $f(x)$ 在 $[a, b]$ 上连续，且 $f(a) \\cdot f(b) < 0$，则至少存在一点 $\\xi \\in (a, b)$，使\n$$f(\\xi) = 0$$\n\n---\n\n### 〔定理〕介值定理\n\n设 $f(x)$ 在 $[a, b]$ 上连续，且 $f(a) \\neq f(b)$，则对介于 $f(a)$ 与 $f(b)$ 之间的任一数 $C$，至少存在一点 $\\xi \\in (a, b)$，使 $f(\\xi) = C$。\n\n---\n\n### 〔推论〕连续函数的值域\n\n在 $[a, b]$ 上连续的函数必取得介于最小值 $m$ 与最大值 $M$ 之间的一切值，即值域为 $[m, M]$。\n\n---\n\n### 〔提示〕\n\n- 「闭区间」与「连续」缺一不可：$f(x) = \\dfrac{1}{x}$ 在开区间 $(0, 1)$ 内连续，但无界，也取不到最值。",
      tags: ["有界性定理", "最值定理", "介值定理", "零点定理", "定理"]
    },
    {
      id: "calc-der-derivative",
      chapterId: "derivative",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 1,
      card: "①",
      title: "导数的定义与几何意义",
      md: "### 〔定义〕导数\n\n设 $y = f(x)$ 在 $x_0$ 的某邻域内有定义，若极限\n$$f'(x_0) = \\lim\\limits_{\\Delta x \\to 0} \\dfrac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$$\n\n存在，则称 $f(x)$ 在 $x_0$ ==可导==，此极限值称为 $f(x)$ 在 $x_0$ 的==导数==，也记作 $y'\\big|_{x = x_0}$ 或 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}\\Big|_{x = x_0}$。\n- **等价写法**：$f'(x_0) = \\lim\\limits_{x \\to x_0} \\dfrac{f(x) - f(x_0)}{x - x_0}$；\n- **导函数**：若 $f(x)$ 在区间 $I$ 内每一点都可导，则 $x \\mapsto f'(x)$ 称为 $f(x)$ 的导函数。\n\n---\n\n### 〔定义〕左导数与右导数\n\n- **左导数**：$f'_-(x_0) = \\lim\\limits_{\\Delta x \\to 0^-} \\dfrac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$；\n- **右导数**：$f'_+(x_0) = \\lim\\limits_{\\Delta x \\to 0^+} \\dfrac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$。\n\n---\n\n### 〔定理〕可导的充要条件\n\n$f(x)$ 在 $x_0$ 可导 $\\iff$ $f'_-(x_0)$ 与 $f'_+(x_0)$ ==都存在且相等==。\n\n---\n\n### 〔性质〕导数的几何意义\n\n$f'(x_0)$ 是曲线 $y = f(x)$ 在点 $M(x_0, f(x_0))$ 处切线的斜率：\n- **切线方程**：$y - f(x_0) = f'(x_0)(x - x_0)$；\n- **法线方程**：$y - f(x_0) = -\\dfrac{1}{f'(x_0)}(x - x_0)\\ \\ (f'(x_0) \\neq 0)$。\n\n---\n\n### 〔定理〕可导与连续的关系\n\n- **可导必连续**：若 $f(x)$ 在 $x_0$ 可导，则 $f(x)$ 在 $x_0$ ==连续==；\n- **反之不成立**：例如 $f(x) = |x|$ 在 $x = 0$ 连续但不可导。",
      tags: ["导数", "左导数", "右导数", "可导", "切线", "法线", "可导与连续", "定义", "定理", "性质"]
    },
    {
      id: "calc-der-differential",
      chapterId: "derivative",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 1,
      card: "②",
      title: "微分",
      md: "### 〔定义〕微分\n\n设 $y = f(x)$ 在 $x_0$ 的某邻域内有定义，若增量 $\\Delta y = f(x_0 + \\Delta x) - f(x_0)$ 可表示为\n$$\\Delta y = A\\Delta x + o(\\Delta x) \\quad (\\Delta x \\to 0)$$\n\n其中 $A$ 是与 $\\Delta x$ 无关的常数，则称 $f(x)$ 在 $x_0$ ==可微==，$A\\Delta x$ 称为 $f(x)$ 在 $x_0$ 的==微分==，记作 $\\mathrm{d}y = A\\Delta x$。\n\n---\n\n### 〔定理〕可微与可导的关系\n\n$f(x)$ 在 $x_0$ 可微 $\\iff$ $f(x)$ 在 $x_0$ 可导，且 ==$A = f'(x_0)$==。\n\n于是 $\\mathrm{d}y = f'(x_0)\\Delta x = f'(x_0)\\,\\mathrm{d}x$（自变量的微分 $\\mathrm{d}x = \\Delta x$），即 $f'(x) = \\dfrac{\\mathrm{d}y}{\\mathrm{d}x}$。\n\n---\n\n### 〔性质〕一阶微分形式不变性\n\n设 $y = f(u)$ 可导：\n- **$u$ 为自变量**：$\\mathrm{d}y = f'(u)\\,\\mathrm{d}u$；\n- **$u = g(x)$ 为中间变量**：$\\mathrm{d}y = f'(u)g'(x)\\,\\mathrm{d}x = f'(u)\\,\\mathrm{d}u$，形式==不变==。",
      tags: ["微分", "可微", "微分形式不变性", "线性主部", "定义", "定理", "性质"]
    },
    {
      id: "calc-der-basic-rules",
      chapterId: "derivative",
      type: "property",
      types: ["property"],
      module: 2,
      card: "③",
      title: "基本求导公式与四则运算",
      md: "### 〔性质〕基本初等函数的导数公式\n\n- **常数与幂**：$(C)' = 0$，$(x^\\mu)' = \\mu x^{\\mu - 1}$；\n- **指数**：$(a^x)' = a^x\\ln a$，$(e^x)' = e^x$；\n- **对数**：$(\\log_a x)' = \\dfrac{1}{x\\ln a}$，$(\\ln x)' = \\dfrac{1}{x}$；\n- **三角**：\n  - $(\\sin x)' = \\cos x$，$(\\cos x)' = -\\sin x$；\n  - $(\\tan x)' = \\sec^2 x$，$(\\cot x)' = -\\csc^2 x$；\n  - $(\\sec x)' = \\sec x\\tan x$，$(\\csc x)' = -\\csc x\\cot x$；\n- **反三角**：\n  - $(\\arcsin x)' = \\dfrac{1}{\\sqrt{1 - x^2}}$，$(\\arccos x)' = -\\dfrac{1}{\\sqrt{1 - x^2}}$；\n  - $(\\arctan x)' = \\dfrac{1}{1 + x^2}$，$(\\operatorname{arccot} x)' = -\\dfrac{1}{1 + x^2}$。\n\n---\n\n### 〔性质〕导数的四则运算法则\n\n设 $u = u(x)$，$v = v(x)$ 都在 $x$ 处可导，则：\n- **和差**：$(u \\pm v)' = u' \\pm v'$；\n- **乘积**：$(uv)' = u'v + uv'$，特别地 $(Cu)' = Cu'$；\n- **商**：$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}\\ \\ (v \\neq 0)$。",
      tags: ["基本初等函数的导数", "求导公式", "四则运算法则", "性质"]
    },
    {
      id: "calc-der-chain-implicit",
      chapterId: "derivative",
      type: "property",
      types: ["property"],
      module: 2,
      card: "④",
      title: "复合、反函数、隐函数与参数方程求导",
      md: "### 〔性质〕复合函数求导法则（链式法则）\n\n设 $u = g(x)$ 在 $x$ 处可导，$y = f(u)$ 在对应的 $u = g(x)$ 处可导，则 $y = f[g(x)]$ 在 $x$ 处可导，且\n$$\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = \\dfrac{\\mathrm{d}y}{\\mathrm{d}u} \\cdot \\dfrac{\\mathrm{d}u}{\\mathrm{d}x} = f'(u)\\,g'(x)$$\n\n---\n\n### 〔性质〕反函数求导法则\n\n设 $x = f(y)$ 在区间 $I_y$ 内单调、可导且 $f'(y) \\neq 0$，则其反函数 $y = f^{-1}(x)$ 在对应区间内也可导，且\n$$[f^{-1}(x)]' = \\dfrac{1}{f'(y)}, \\quad \\text{即} \\quad \\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = \\dfrac{1}{\\mathrm{d}x/\\mathrm{d}y}$$\n\n---\n\n### 〔方法〕隐函数求导\n\n设方程 $F(x, y) = 0$ 确定了可导函数 $y = y(x)$：\n1. **两边求导**：方程两边同时对 $x$ 求导，把 $y$ 看作 $x$ 的函数，含 $y$ 的项用链式法则；\n2. **解出导数**：从所得等式中解出 $y'$。\n\n---\n\n### 〔方法〕对数求导法\n\n对幂指函数 $y = u(x)^{v(x)}$（$u > 0$）或多个因子连乘除的函数：\n1. **取对数**：两边取对数，如 $\\ln y = v(x)\\ln u(x)$；\n2. **隐函数求导**：两边对 $x$ 求导后解出 $y'$，如\n   $$y' = u^v\\left[v'\\ln u + \\dfrac{v\\,u'}{u}\\right]$$\n\n---\n\n### 〔性质〕参数方程求导\n\n设 $\\begin{cases} x = \\varphi(t) \\\\ y = \\psi(t) \\end{cases}$，$\\varphi, \\psi$ 可导且 $\\varphi'(t) \\neq 0$，则：\n- **一阶导数**：$\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = \\dfrac{\\psi'(t)}{\\varphi'(t)}$；\n- **二阶导数**（$\\varphi, \\psi$ 二阶可导）：\n  $$\\dfrac{\\mathrm{d}^2y}{\\mathrm{d}x^2} = \\dfrac{\\mathrm{d}}{\\mathrm{d}t}\\left(\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}\\right) \\Big/ \\dfrac{\\mathrm{d}x}{\\mathrm{d}t} = \\dfrac{\\psi''\\varphi' - \\psi'\\varphi''}{\\varphi'^3}$$",
      tags: ["链式法则", "复合函数求导", "反函数求导", "隐函数求导", "对数求导法", "参数方程求导", "性质"]
    },
    {
      id: "calc-der-higher-order",
      chapterId: "derivative",
      type: "definition",
      types: ["definition", "property"],
      module: 2,
      card: "⑤",
      title: "高阶导数",
      md: "### 〔定义〕高阶导数\n\n$f'(x)$ 的导数称为 $f(x)$ 的==二阶导数==，记作 $f''(x)$ 或 $\\dfrac{\\mathrm{d}^2y}{\\mathrm{d}x^2}$；一般地，$(n-1)$ 阶导数的导数称为 ==$n$ 阶导数==，记作 $f^{(n)}(x)$。\n\n---\n\n### 〔性质〕常用函数的 $n$ 阶导数\n\n- **指数**：$(e^{ax})^{(n)} = a^n e^{ax}$，$(a^x)^{(n)} = a^x(\\ln a)^n$；\n- **正弦余弦**：\n  - $(\\sin kx)^{(n)} = k^n\\sin\\left(kx + \\dfrac{n\\pi}{2}\\right)$；\n  - $(\\cos kx)^{(n)} = k^n\\cos\\left(kx + \\dfrac{n\\pi}{2}\\right)$；\n- **分式与对数**：\n  - $\\left(\\dfrac{1}{x + a}\\right)^{(n)} = \\dfrac{(-1)^n n!}{(x + a)^{n+1}}$；\n  - $[\\ln(1 + x)]^{(n)} = \\dfrac{(-1)^{n-1}(n-1)!}{(1 + x)^n}$；\n- **幂**：$(x^m)^{(n)} = m(m-1)\\cdots(m-n+1)x^{m-n}$，且当 $n > m$（$m$ 为正整数）时为 $0$。\n\n---\n\n### 〔性质〕莱布尼茨公式\n\n设 $u(x), v(x)$ 都有 $n$ 阶导数，则\n$$(uv)^{(n)} = \\sum_{k=0}^{n} \\mathrm{C}_n^k\\, u^{(n-k)} v^{(k)}$$\n\n展开即 $u^{(n)}v + nu^{(n-1)}v' + \\dfrac{n(n-1)}{2!}u^{(n-2)}v'' + \\cdots + uv^{(n)}$。",
      tags: ["高阶导数", "n阶导数", "莱布尼茨公式", "定义", "性质"]
    },
    {
      id: "calc-der-mean-value",
      chapterId: "derivative",
      type: "theorem",
      types: ["theorem"],
      module: 3,
      card: "⑥",
      title: "费马引理与三大中值定理",
      md: "### 〔定理〕费马引理\n\n设 $f(x)$ 在 $x_0$ 的某邻域 $U(x_0)$ 内有定义，并在 $x_0$ 处可导，若对任意 $x \\in U(x_0)$ 有 $f(x) \\le f(x_0)$（或 $f(x) \\ge f(x_0)$），则\n$$f'(x_0) = 0$$\n\n导数为零的点称为==驻点==。\n\n---\n\n### 〔定理〕罗尔定理\n\n若 $f(x)$ 满足：\n1. **闭区间连续**：在 $[a, b]$ 上连续；\n2. **开区间可导**：在 $(a, b)$ 内可导；\n3. **端点等值**：$f(a) = f(b)$；\n\n则至少存在一点 $\\xi \\in (a, b)$，使 $f'(\\xi) = 0$。\n\n---\n\n### 〔定理〕拉格朗日中值定理\n\n若 $f(x)$ 在 $[a, b]$ 上连续，在 $(a, b)$ 内可导，则至少存在一点 $\\xi \\in (a, b)$，使\n$$f(b) - f(a) = f'(\\xi)(b - a)$$\n\n- **有限增量形式**：$\\Delta y = f'(x_0 + \\theta\\Delta x)\\Delta x\\ \\ (0 < \\theta < 1)$。\n\n---\n\n### 〔推论〕导数恒为零的函数\n\n- **常数**：若在区间 $I$ 上 $f'(x) \\equiv 0$，则 $f(x)$ 在 $I$ 上恒为常数；\n- **相差常数**：若在 $I$ 上 $f'(x) \\equiv g'(x)$，则 $f(x) = g(x) + C$。\n\n---\n\n### 〔定理〕柯西中值定理\n\n若 $f(x), g(x)$ 在 $[a, b]$ 上连续，在 $(a, b)$ 内可导，且 $g'(x) \\neq 0$，则至少存在一点 $\\xi \\in (a, b)$，使\n$$\\dfrac{f(b) - f(a)}{g(b) - g(a)} = \\dfrac{f'(\\xi)}{g'(\\xi)}$$\n\n- **与拉格朗日的关系**：取 $g(x) = x$ 即为拉格朗日中值定理。",
      tags: ["费马引理", "罗尔定理", "拉格朗日中值定理", "柯西中值定理", "驻点", "定理"]
    },
    {
      id: "calc-der-taylor",
      chapterId: "derivative",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 3,
      card: "⑦",
      title: "泰勒公式",
      md: "### 〔定义〕泰勒多项式\n\n设 $f(x)$ 在 $x_0$ 处具有 $n$ 阶导数，称\n$$P_n(x) = \\sum_{k=0}^{n} \\dfrac{f^{(k)}(x_0)}{k!}(x - x_0)^k$$\n\n为 $f(x)$ 在 $x_0$ 处的 ==$n$ 次泰勒多项式==。\n\n---\n\n### 〔定理〕带佩亚诺余项的泰勒公式\n\n设 $f(x)$ 在 $x_0$ 处具有 $n$ 阶导数，则当 $x \\to x_0$ 时\n$$f(x) = P_n(x) + o\\big((x - x_0)^n\\big)$$\n\n---\n\n### 〔定理〕带拉格朗日余项的泰勒公式\n\n设 $f(x)$ 在 $x_0$ 的某邻域内具有 $n + 1$ 阶导数，则对该邻域内任一 $x$，\n$$f(x) = P_n(x) + R_n(x)$$\n\n其中==拉格朗日余项== $R_n(x) = \\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}(x - x_0)^{n+1}$，$\\xi$ 介于 $x_0$ 与 $x$ 之间。\n\n---\n\n### 〔定义〕麦克劳林公式\n\n泰勒公式中取 $x_0 = 0$，称为==麦克劳林公式==：\n$$\\begin{aligned} f(x) = {} & f(0) + f'(0)x + \\dfrac{f''(0)}{2!}x^2 + \\cdots \\\\ & + \\dfrac{f^{(n)}(0)}{n!}x^n + R_n(x) \\end{aligned}$$\n\n---\n\n### 〔性质〕常用函数的麦克劳林公式（佩亚诺余项）\n\n当 $x \\to 0$ 时：\n- $e^x = 1 + x + \\dfrac{x^2}{2!} + \\cdots + \\dfrac{x^n}{n!} + o(x^n)$；\n- $\\sin x = x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots + \\dfrac{(-1)^{m-1}x^{2m-1}}{(2m-1)!} + o(x^{2m})$；\n- $\\cos x = 1 - \\dfrac{x^2}{2!} + \\dfrac{x^4}{4!} - \\cdots + \\dfrac{(-1)^m x^{2m}}{(2m)!} + o(x^{2m+1})$；\n- $\\ln(1 + x) = x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\cdots + \\dfrac{(-1)^{n-1}x^n}{n} + o(x^n)$；\n- $(1 + x)^\\alpha = 1 + \\alpha x + \\dfrac{\\alpha(\\alpha - 1)}{2!}x^2 + \\cdots + \\dfrac{\\alpha(\\alpha - 1)\\cdots(\\alpha - n + 1)}{n!}x^n + o(x^n)$；\n- $\\tan x = x + \\dfrac{x^3}{3} + o(x^3)$，$\\arcsin x = x + \\dfrac{x^3}{6} + o(x^3)$，$\\arctan x = x - \\dfrac{x^3}{3} + o(x^3)$。",
      tags: ["泰勒公式", "佩亚诺余项", "拉格朗日余项", "麦克劳林公式", "定义", "定理", "性质"]
    },
    {
      id: "calc-der-lhospital",
      chapterId: "derivative",
      type: "theorem",
      types: ["theorem", "property"],
      module: 4,
      card: "⑧",
      title: "洛必达法则",
      md: "### 〔定理〕洛必达法则（$\\frac{0}{0}$ 型）\n\n设：\n1. **同趋于零**：$\\lim\\limits_{x \\to x_0} f(x) = \\lim\\limits_{x \\to x_0} g(x) = 0$；\n2. **可导**：在 $x_0$ 的某去心邻域内 $f'(x)$、$g'(x)$ 都存在且 $g'(x) \\neq 0$；\n3. **导数比有极限**：$\\lim\\limits_{x \\to x_0} \\dfrac{f'(x)}{g'(x)}$ 存在（或为 $\\infty$）；\n\n则\n$$\\lim\\limits_{x \\to x_0} \\dfrac{f(x)}{g(x)} = \\lim\\limits_{x \\to x_0} \\dfrac{f'(x)}{g'(x)}$$\n\n---\n\n### 〔推论〕其他情形\n\n- **$\\frac{\\infty}{\\infty}$ 型**：把条件 1 换成 $\\lim f(x) = \\lim g(x) = \\infty$，结论不变；\n- **$x \\to \\infty$**：把 $x \\to x_0$ 换成 $x \\to \\infty$（相应地「去心邻域」换成「$|x|$ 充分大」），结论不变。\n\n---\n\n### 〔方法〕其他未定式的转化\n\n- **$0 \\cdot \\infty$ 型**：化为 $\\dfrac{0}{1/\\infty}$ 或 $\\dfrac{\\infty}{1/0}$；\n- **$\\infty - \\infty$ 型**：通分或提公因子，化为 $\\frac{0}{0}$ 或 $\\frac{\\infty}{\\infty}$；\n- **$1^\\infty$、$0^0$、$\\infty^0$ 型**：写成 $u^v = e^{v\\ln u}$，转化为求指数 $v\\ln u$（$0 \\cdot \\infty$ 型）的极限。\n\n---\n\n### 〔提示〕\n\n- 条件 3 不满足时（$\\lim\\frac{f'}{g'}$ 不存在且不为 $\\infty$），不能断定原极限不存在：例如 $\\lim\\limits_{x \\to \\infty} \\dfrac{x + \\sin x}{x} = 1$，而 $\\dfrac{1 + \\cos x}{1}$ 的极限不存在。",
      tags: ["洛必达法则", "未定式", "0/0型", "∞/∞型", "定理", "性质"]
    },
    {
      id: "calc-der-monotone-extremum",
      chapterId: "derivative",
      type: "theorem",
      types: ["definition", "theorem", "property"],
      module: 5,
      card: "⑨",
      title: "单调性、极值与最值",
      md: "### 〔定理〕单调性判别法\n\n设 $f(x)$ 在 $[a, b]$ 上连续，在 $(a, b)$ 内可导：\n- **单调增加**：若在 $(a, b)$ 内 $f'(x) > 0$，则 $f(x)$ 在 $[a, b]$ 上单调增加；\n- **单调减少**：若在 $(a, b)$ 内 $f'(x) < 0$，则 $f(x)$ 在 $[a, b]$ 上单调减少；\n- **有限个零点**：若 $f'(x) \\ge 0$（或 $\\le 0$）且等号只在有限个点成立，结论仍成立。\n\n---\n\n### 〔定义〕极值\n\n设 $f(x)$ 在 $x_0$ 的某邻域内有定义，若对该邻域内任一 $x \\neq x_0$ 恒有 $f(x) < f(x_0)$（或 $f(x) > f(x_0)$），则称 $f(x_0)$ 为==极大值==（或==极小值==），$x_0$ 称为极值点。\n\n---\n\n### 〔定理〕极值的必要条件\n\n若 $f(x)$ 在 $x_0$ 处可导且取得极值，则 $f'(x_0) = 0$（费马引理，见卡⑥）。\n- **可疑极值点**：极值点只可能是==驻点或不可导点==。\n\n---\n\n### 〔定理〕第一充分条件\n\n设 $f(x)$ 在 $x_0$ 处连续，在 $x_0$ 的某去心邻域内可导：\n- **左正右负**：$x < x_0$ 时 $f'(x) > 0$，$x > x_0$ 时 $f'(x) < 0$，则 $f(x_0)$ 为==极大值==；\n- **左负右正**：$x < x_0$ 时 $f'(x) < 0$，$x > x_0$ 时 $f'(x) > 0$，则 $f(x_0)$ 为==极小值==；\n- **不变号**：$f'(x)$ 在 $x_0$ 两侧同号，则 $f(x_0)$ 不是极值。\n\n---\n\n### 〔定理〕第二充分条件\n\n设 $f(x)$ 在 $x_0$ 处二阶可导，且 $f'(x_0) = 0$，$f''(x_0) \\neq 0$：\n- **$f''(x_0) < 0$**：$f(x_0)$ 为==极大值==；\n- **$f''(x_0) > 0$**：$f(x_0)$ 为==极小值==。\n\n$f''(x_0) = 0$ 时本判别法失效。\n\n---\n\n### 〔方法〕闭区间上的最值\n\n设 $f(x)$ 在 $[a, b]$ 上连续：\n1. **找可疑点**：求出 $(a, b)$ 内的全部驻点与不可导点；\n2. **比较**：计算这些点及端点 $a, b$ 处的函数值，其中最大者为最大值，最小者为最小值。",
      tags: ["单调性", "极值", "极值的必要条件", "第一充分条件", "第二充分条件", "最值", "定义", "定理", "性质"]
    },
    {
      id: "calc-der-convexity-asymptote",
      chapterId: "derivative",
      type: "definition",
      types: ["definition", "theorem"],
      module: 5,
      card: "⑩",
      title: "凹凸性、拐点与渐近线",
      md: "### 〔定义〕凹凸性\n\n设 $f(x)$ 在区间 $I$ 上连续，对 $I$ 上任意两点 $x_1 \\neq x_2$：\n- **凹**：若恒有 $f\\left(\\dfrac{x_1 + x_2}{2}\\right) < \\dfrac{f(x_1) + f(x_2)}{2}$，称曲线 $y = f(x)$ 在 $I$ 上是==凹的==；\n- **凸**：若恒有 $f\\left(\\dfrac{x_1 + x_2}{2}\\right) > \\dfrac{f(x_1) + f(x_2)}{2}$，称曲线在 $I$ 上是==凸的==。\n\n---\n\n### 〔定理〕凹凸性判别法\n\n设 $f(x)$ 在 $[a, b]$ 上连续，在 $(a, b)$ 内二阶可导：\n- **$f''(x) > 0$**：曲线在 $[a, b]$ 上是凹的；\n- **$f''(x) < 0$**：曲线在 $[a, b]$ 上是凸的。\n\n---\n\n### 〔定义〕拐点\n\n连续曲线上凹弧与凸弧的==分界点== $(x_0, f(x_0))$ 称为曲线的拐点。\n\n---\n\n### 〔定理〕拐点的判定\n\n- **必要条件**：若 $f''(x_0)$ 存在且 $(x_0, f(x_0))$ 为拐点，则 $f''(x_0) = 0$；\n- **充分条件一**：$f(x)$ 在 $x_0$ 连续，$f''(x)$ 在 $x_0$ 两侧==异号==（$x_0$ 处 $f''$ 为零或不存在均可），则 $(x_0, f(x_0))$ 为拐点；\n- **充分条件二**：$f''(x_0) = 0$ 且 $f'''(x_0) \\neq 0$，则 $(x_0, f(x_0))$ 为拐点。\n\n---\n\n### 〔定义〕渐近线\n\n- **水平渐近线**：若 $\\lim\\limits_{x \\to +\\infty} f(x) = b$ 或 $\\lim\\limits_{x \\to -\\infty} f(x) = b$，则 $y = b$ 为水平渐近线；\n- **铅直渐近线**：若 $\\lim\\limits_{x \\to x_0^+} f(x) = \\infty$ 或 $\\lim\\limits_{x \\to x_0^-} f(x) = \\infty$，则 $x = x_0$ 为铅直渐近线；\n- **斜渐近线**：若 $\\lim\\limits_{x \\to +\\infty} \\dfrac{f(x)}{x} = a \\neq 0$，且 $\\lim\\limits_{x \\to +\\infty} [f(x) - ax] = b$，则 $y = ax + b$ 为斜渐近线（$x \\to -\\infty$ 同理）。",
      tags: ["凹凸性", "拐点", "渐近线", "水平渐近线", "铅直渐近线", "斜渐近线", "定义", "定理"]
    },
    {
      id: "calc-der-curvature",
      chapterId: "derivative",
      type: "definition",
      types: ["definition", "property"],
      module: 5,
      card: "⑪",
      title: "弧微分与曲率",
      md: "### 〔定义〕弧微分\n\n设曲线 $y = f(x)$ 具有连续导数，则弧长 $s$ 的微分（==弧微分==）为\n$$\\mathrm{d}s = \\sqrt{1 + y'^2}\\,\\mathrm{d}x$$\n\n- **参数方程** $x = \\varphi(t)$，$y = \\psi(t)$：$\\mathrm{d}s = \\sqrt{\\varphi'^2(t) + \\psi'^2(t)}\\,\\mathrm{d}t$；\n- **极坐标** $r = r(\\theta)$：$\\mathrm{d}s = \\sqrt{r^2(\\theta) + r'^2(\\theta)}\\,\\mathrm{d}\\theta$。\n\n---\n\n### 〔定义〕曲率\n\n曲线上一点处切线倾角 $\\alpha$ 对弧长 $s$ 的变化率的绝对值\n$$K = \\left|\\dfrac{\\mathrm{d}\\alpha}{\\mathrm{d}s}\\right|$$\n\n称为曲线在该点的==曲率==。\n\n---\n\n### 〔性质〕曲率的计算公式\n\n- **直角坐标** $y = f(x)$：\n  $$K = \\dfrac{|y''|}{(1 + y'^2)^{3/2}}$$\n- **参数方程** $x = \\varphi(t)$，$y = \\psi(t)$：\n  $$K = \\dfrac{|\\varphi'\\psi'' - \\varphi''\\psi'|}{(\\varphi'^2 + \\psi'^2)^{3/2}}$$\n\n---\n\n### 〔定义〕曲率半径与曲率圆\n\n设曲线在点 $M$ 处的曲率 $K \\neq 0$：\n- **曲率半径**：$\\rho = \\dfrac{1}{K}$；\n- **曲率圆**：在 $M$ 处曲线的法线上、凹向一侧取点 $D$，使 $|DM| = \\rho$，以 $D$ 为圆心、$\\rho$ 为半径的圆称为曲率圆，$D$ 称为曲率中心。",
      tags: ["弧微分", "曲率", "曲率半径", "曲率圆", "定义", "性质"]
    },
    {
      id: "calc-int-antiderivative",
      chapterId: "integral",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "①",
      title: "原函数与不定积分",
      md: "### 〔定义〕原函数\n\n若在区间 $I$ 上 $F'(x) = f(x)$（或 $\\mathrm{d}F(x) = f(x)\\,\\mathrm{d}x$），则称 $F(x)$ 为 $f(x)$ 在 $I$ 上的一个==原函数==。\n- **原函数族**：若 $F(x)$ 是 $f(x)$ 的一个原函数，则 $f(x)$ 的全体原函数为 $F(x) + C$（$C$ 为任意常数）。\n\n---\n\n### 〔定义〕不定积分\n\n$f(x)$ 在区间 $I$ 上的全体原函数称为 $f(x)$ 在 $I$ 上的==不定积分==，记作\n$$\\int f(x)\\,\\mathrm{d}x = F(x) + C$$\n\n---\n\n### 〔性质〕不定积分的性质\n\n- **与求导互逆**：$\\left[\\displaystyle\\int f(x)\\,\\mathrm{d}x\\right]' = f(x)$，$\\displaystyle\\int F'(x)\\,\\mathrm{d}x = F(x) + C$；\n- **线性**：$\\displaystyle\\int [k_1 f(x) + k_2 g(x)]\\,\\mathrm{d}x = k_1\\int f(x)\\,\\mathrm{d}x + k_2\\int g(x)\\,\\mathrm{d}x$（$k_1, k_2$ 不同时为零）。\n\n---\n\n### 〔性质〕基本积分公式\n\n- **幂与指数**：\n  - $\\displaystyle\\int x^\\mu\\,\\mathrm{d}x = \\dfrac{x^{\\mu+1}}{\\mu+1} + C\\ \\ (\\mu \\neq -1)$，$\\displaystyle\\int \\dfrac{\\mathrm{d}x}{x} = \\ln|x| + C$；\n  - $\\displaystyle\\int a^x\\,\\mathrm{d}x = \\dfrac{a^x}{\\ln a} + C$，$\\displaystyle\\int e^x\\,\\mathrm{d}x = e^x + C$；\n- **三角**：\n  - $\\displaystyle\\int \\sin x\\,\\mathrm{d}x = -\\cos x + C$，$\\displaystyle\\int \\cos x\\,\\mathrm{d}x = \\sin x + C$；\n  - $\\displaystyle\\int \\sec^2 x\\,\\mathrm{d}x = \\tan x + C$，$\\displaystyle\\int \\csc^2 x\\,\\mathrm{d}x = -\\cot x + C$；\n  - $\\displaystyle\\int \\sec x\\tan x\\,\\mathrm{d}x = \\sec x + C$，$\\displaystyle\\int \\csc x\\cot x\\,\\mathrm{d}x = -\\csc x + C$；\n  - $\\displaystyle\\int \\tan x\\,\\mathrm{d}x = -\\ln|\\cos x| + C$，$\\displaystyle\\int \\cot x\\,\\mathrm{d}x = \\ln|\\sin x| + C$；\n  - $\\displaystyle\\int \\sec x\\,\\mathrm{d}x = \\ln|\\sec x + \\tan x| + C$，$\\displaystyle\\int \\csc x\\,\\mathrm{d}x = \\ln|\\csc x - \\cot x| + C$；\n- **有理与根式**（$a > 0$）：\n  - $\\displaystyle\\int \\dfrac{\\mathrm{d}x}{a^2 + x^2} = \\dfrac{1}{a}\\arctan\\dfrac{x}{a} + C$；\n  - $\\displaystyle\\int \\dfrac{\\mathrm{d}x}{x^2 - a^2} = \\dfrac{1}{2a}\\ln\\left|\\dfrac{x - a}{x + a}\\right| + C$；\n  - $\\displaystyle\\int \\dfrac{\\mathrm{d}x}{\\sqrt{a^2 - x^2}} = \\arcsin\\dfrac{x}{a} + C$；\n  - $\\displaystyle\\int \\dfrac{\\mathrm{d}x}{\\sqrt{x^2 \\pm a^2}} = \\ln\\left|x + \\sqrt{x^2 \\pm a^2}\\right| + C$；\n  - $\\displaystyle\\int \\sqrt{a^2 - x^2}\\,\\mathrm{d}x = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\arcsin\\dfrac{x}{a} + C$。",
      tags: ["原函数", "不定积分", "基本积分公式", "定义", "性质"]
    },
    {
      id: "calc-int-substitution-parts",
      chapterId: "integral",
      type: "property",
      types: ["property"],
      module: 1,
      card: "②",
      title: "换元积分法与分部积分法",
      md: "### 〔方法〕第一类换元法（凑微分法）\n\n设 $\\displaystyle\\int f(u)\\,\\mathrm{d}u = F(u) + C$，$u = \\varphi(x)$ 可导，则\n$$\\begin{aligned} \\int f[\\varphi(x)]\\varphi'(x)\\,\\mathrm{d}x &= \\int f(u)\\,\\mathrm{d}u\\,\\Big|_{u = \\varphi(x)} \\\\ &= F[\\varphi(x)] + C \\end{aligned}$$\n\n---\n\n### 〔方法〕第二类换元法\n\n设 $x = \\psi(t)$ 单调、可导且 $\\psi'(t) \\neq 0$，则\n$$\\int f(x)\\,\\mathrm{d}x = \\left[\\int f[\\psi(t)]\\psi'(t)\\,\\mathrm{d}t\\right]_{t = \\psi^{-1}(x)}$$\n\n常用代换（$a > 0$）：\n- **三角代换**：\n  - 含 $\\sqrt{a^2 - x^2}$：令 $x = a\\sin t$；\n  - 含 $\\sqrt{a^2 + x^2}$：令 $x = a\\tan t$；\n  - 含 $\\sqrt{x^2 - a^2}$：令 $x = a\\sec t$；\n- **根式代换**：含 $\\sqrt[n]{ax + b}$ 时令 $t = \\sqrt[n]{ax + b}$；\n- **倒代换**：分母次数较高时令 $x = \\dfrac{1}{t}$。\n\n---\n\n### 〔方法〕分部积分法\n\n设 $u = u(x)$，$v = v(x)$ 具有连续导数，则\n$$\\int u\\,\\mathrm{d}v = uv - \\int v\\,\\mathrm{d}u$$\n\n即 $\\displaystyle\\int uv'\\,\\mathrm{d}x = uv - \\int u'v\\,\\mathrm{d}x$。",
      tags: ["第一类换元法", "凑微分", "第二类换元法", "三角代换", "分部积分法", "性质"]
    },
    {
      id: "calc-int-rational",
      chapterId: "integral",
      type: "property",
      types: ["property"],
      module: 1,
      card: "③",
      title: "有理函数及可化为有理函数的积分",
      md: "### 〔方法〕有理函数的积分（部分分式法）\n\n对有理函数 $\\dfrac{P(x)}{Q(x)}$：\n1. **化为真分式**：若分子次数不低于分母次数，先作多项式除法，化为多项式与真分式之和；\n2. **分母因式分解**：把 $Q(x)$ 分解为一次因式 $(x - a)^k$ 与不可约二次因式 $(x^2 + px + q)^l$（$p^2 - 4q < 0$）之积；\n3. **拆成部分分式**：\n   - 因式 $(x - a)^k$ 对应 $\\dfrac{A_1}{x - a} + \\dfrac{A_2}{(x - a)^2} + \\cdots + \\dfrac{A_k}{(x - a)^k}$；\n   - 因式 $(x^2 + px + q)^l$ 对应 $\\displaystyle\\sum_{j=1}^{l} \\dfrac{M_j x + N_j}{(x^2 + px + q)^j}$；\n4. **逐项积分**：待定系数求出后逐项积分。\n\n---\n\n### 〔方法〕三角函数有理式的积分（万能代换）\n\n对 $\\displaystyle\\int R(\\sin x, \\cos x)\\,\\mathrm{d}x$，令 $t = \\tan\\dfrac{x}{2}$，则：\n- **正弦余弦**：$\\sin x = \\dfrac{2t}{1 + t^2}$，$\\cos x = \\dfrac{1 - t^2}{1 + t^2}$；\n- **微分**：$\\mathrm{d}x = \\dfrac{2}{1 + t^2}\\,\\mathrm{d}t$。\n\n积分化为 $t$ 的有理函数的积分。\n\n---\n\n### 〔方法〕简单无理函数的积分\n\n含 $\\sqrt[n]{ax + b}$ 或 $\\sqrt[n]{\\dfrac{ax + b}{cx + d}}$ 时，令该根式为 $t$，化为 $t$ 的有理函数的积分。",
      tags: ["有理函数", "部分分式", "万能代换", "三角函数有理式", "性质"]
    },
    {
      id: "calc-int-definite-def",
      chapterId: "integral",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "④",
      title: "定积分的定义与可积条件",
      md: "### 〔定义〕定积分\n\n设 $f(x)$ 在 $[a, b]$ 上有界：\n1. **分割**：任取分点 $a = x_0 < x_1 < \\cdots < x_n = b$，记 $\\Delta x_i = x_i - x_{i-1}$，$\\lambda = \\max\\limits_{1 \\le i \\le n} \\Delta x_i$；\n2. **求和**：任取 $\\xi_i \\in [x_{i-1}, x_i]$，作和 $\\displaystyle\\sum_{i=1}^{n} f(\\xi_i)\\Delta x_i$；\n3. **取极限**：若不论怎样分割、怎样取点，极限\n   $$\\lim\\limits_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i)\\Delta x_i$$\n   总存在且相等，则称此极限为 $f(x)$ 在 $[a, b]$ 上的==定积分==，记作 $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$，并称 $f(x)$ 在 $[a, b]$ 上==可积==。\n\n---\n\n### 〔性质〕定积分的几何意义\n\n- **$f(x) \\ge 0$**：$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ 等于曲线 $y = f(x)$、直线 $x = a$、$x = b$ 与 $x$ 轴围成的曲边梯形的面积；\n- **一般情形**：等于 $x$ 轴上方部分的面积减去下方部分的面积。\n\n---\n\n### 〔定理〕可积的条件\n\n- **必要条件**：若 $f(x)$ 在 $[a, b]$ 上可积，则 $f(x)$ 在 $[a, b]$ 上有界；\n- **充分条件一**：$f(x)$ 在 $[a, b]$ 上连续；\n- **充分条件二**：$f(x)$ 在 $[a, b]$ 上有界，且只有有限个间断点；\n- **充分条件三**：$f(x)$ 在 $[a, b]$ 上单调。\n\n---\n\n### 〔推论〕和式极限化为定积分\n\n设 $f(x)$ 在 $[a, b]$ 上可积，把 $[a, b]$ 等分为 $n$ 份并取右端点，则\n$$\\lim\\limits_{n \\to \\infty} \\dfrac{b - a}{n}\\sum_{i=1}^{n} f\\left(a + \\dfrac{i(b - a)}{n}\\right) = \\int_a^b f(x)\\,\\mathrm{d}x$$\n\n特别地，$\\lim\\limits_{n \\to \\infty} \\dfrac{1}{n}\\displaystyle\\sum_{i=1}^{n} f\\left(\\dfrac{i}{n}\\right) = \\int_0^1 f(x)\\,\\mathrm{d}x$。",
      tags: ["定积分", "黎曼和", "可积", "几何意义", "和式极限", "定义", "定理", "性质"]
    },
    {
      id: "calc-int-definite-properties",
      chapterId: "integral",
      type: "property",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "⑤",
      title: "定积分的性质与积分中值定理",
      md: "### 〔性质〕规定与线性、可加性\n\n- **两个规定**：$\\displaystyle\\int_a^a f(x)\\,\\mathrm{d}x = 0$，$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = -\\int_b^a f(x)\\,\\mathrm{d}x$；\n- **线性**：$\\displaystyle\\int_a^b [k_1 f(x) + k_2 g(x)]\\,\\mathrm{d}x = k_1\\int_a^b f(x)\\,\\mathrm{d}x + k_2\\int_a^b g(x)\\,\\mathrm{d}x$；\n- **区间可加**：对任意 $c$（不论 $c$ 是否在 $a, b$ 之间），$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = \\int_a^c f(x)\\,\\mathrm{d}x + \\int_c^b f(x)\\,\\mathrm{d}x$；\n- **常数 1**：$\\displaystyle\\int_a^b 1\\,\\mathrm{d}x = b - a$。\n\n---\n\n### 〔性质〕保号性、比较与估值\n\n设 $a < b$：\n- **保号性**：若在 $[a, b]$ 上 $f(x) \\ge 0$，则 $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x \\ge 0$；若 $f(x)$ 还连续且不恒为零，则积分 $> 0$；\n- **比较**：若在 $[a, b]$ 上 $f(x) \\le g(x)$，则 $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x \\le \\int_a^b g(x)\\,\\mathrm{d}x$；\n- **绝对值**：$\\left|\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x\\right| \\le \\int_a^b |f(x)|\\,\\mathrm{d}x$；\n- **估值**：若在 $[a, b]$ 上 $m \\le f(x) \\le M$，则 $m(b - a) \\le \\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x \\le M(b - a)$。\n\n---\n\n### 〔定理〕积分中值定理\n\n若 $f(x)$ 在 $[a, b]$ 上连续，则至少存在一点 $\\xi \\in [a, b]$，使\n$$\\int_a^b f(x)\\,\\mathrm{d}x = f(\\xi)(b - a)$$\n\n---\n\n### 〔定义〕函数的平均值\n\n$$\\bar{f} = \\dfrac{1}{b - a}\\int_a^b f(x)\\,\\mathrm{d}x$$\n\n称为 $f(x)$ 在 $[a, b]$ 上的==平均值==。",
      tags: ["线性性", "区间可加性", "保号性", "估值定理", "积分中值定理", "平均值", "定义", "定理", "性质"]
    },
    {
      id: "calc-int-fundamental",
      chapterId: "integral",
      type: "definition",
      types: ["definition", "theorem"],
      module: 3,
      card: "⑥",
      title: "变限积分与牛顿-莱布尼茨公式",
      md: "### 〔定义〕变上限积分\n\n设 $f(x)$ 在 $[a, b]$ 上可积，则\n$$\\Phi(x) = \\int_a^x f(t)\\,\\mathrm{d}t, \\quad x \\in [a, b]$$\n\n称为==变上限积分==（积分上限函数）；$\\Phi(x)$ 在 $[a, b]$ 上连续。\n\n---\n\n### 〔定理〕变限积分的求导\n\n- **基本形式**：若 $f(x)$ 在 $[a, b]$ 上连续，则 $\\Phi(x)$ 在 $[a, b]$ 上可导，且\n  $$\\Phi'(x) = \\dfrac{\\mathrm{d}}{\\mathrm{d}x}\\int_a^x f(t)\\,\\mathrm{d}t = f(x)$$\n- **一般形式**：若 $f$ 连续，$\\varphi(x)$、$\\psi(x)$ 可导，则\n  $$\\begin{aligned} & \\dfrac{\\mathrm{d}}{\\mathrm{d}x}\\int_{\\psi(x)}^{\\varphi(x)} f(t)\\,\\mathrm{d}t \\\\ = {} & f[\\varphi(x)]\\varphi'(x) - f[\\psi(x)]\\psi'(x) \\end{aligned}$$\n\n---\n\n### 〔定理〕原函数存在定理\n\n若 $f(x)$ 在 $[a, b]$ 上==连续==，则 $\\Phi(x) = \\displaystyle\\int_a^x f(t)\\,\\mathrm{d}t$ 就是 $f(x)$ 在 $[a, b]$ 上的一个原函数。\n\n---\n\n### 〔定理〕牛顿-莱布尼茨公式\n\n若 $f(x)$ 在 $[a, b]$ 上连续，$F(x)$ 是 $f(x)$ 在 $[a, b]$ 上的一个原函数，则\n$$\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a) = F(x)\\Big|_a^b$$",
      tags: ["变上限积分", "变限积分求导", "原函数存在定理", "牛顿-莱布尼茨公式", "微积分基本定理", "定义", "定理"]
    },
    {
      id: "calc-int-definite-computation",
      chapterId: "integral",
      type: "property",
      types: ["property"],
      module: 4,
      card: "⑦",
      title: "定积分的换元法、分部积分法与常用公式",
      md: "### 〔方法〕定积分的换元法\n\n设 $f(x)$ 在 $[a, b]$ 上连续，$x = \\varphi(t)$ 满足：\n- **端点对应**：$\\varphi(\\alpha) = a$，$\\varphi(\\beta) = b$；\n- **光滑**：$\\varphi(t)$ 在 $[\\alpha, \\beta]$（或 $[\\beta, \\alpha]$）上有连续导数，且值域不越出 $[a, b]$；\n\n则\n$$\\int_a^b f(x)\\,\\mathrm{d}x = \\int_\\alpha^\\beta f[\\varphi(t)]\\varphi'(t)\\,\\mathrm{d}t$$\n\n换元的同时==换积分限==，求出后不必代回原变量。\n\n---\n\n### 〔方法〕定积分的分部积分法\n\n设 $u(x)$、$v(x)$ 在 $[a, b]$ 上有连续导数，则\n$$\\int_a^b u\\,\\mathrm{d}v = uv\\Big|_a^b - \\int_a^b v\\,\\mathrm{d}u$$\n\n---\n\n### 〔性质〕奇偶性与周期性\n\n- **奇偶性**：设 $f(x)$ 在 $[-a, a]$ 上连续：\n  - $f(x)$ 为奇函数时，$\\displaystyle\\int_{-a}^{a} f(x)\\,\\mathrm{d}x = 0$；\n  - $f(x)$ 为偶函数时，$\\displaystyle\\int_{-a}^{a} f(x)\\,\\mathrm{d}x = 2\\int_0^a f(x)\\,\\mathrm{d}x$；\n- **周期性**：设 $f(x)$ 是以 $T$ 为周期的连续函数：\n  - $\\displaystyle\\int_a^{a+T} f(x)\\,\\mathrm{d}x = \\int_0^T f(x)\\,\\mathrm{d}x$（与 $a$ 无关）；\n  - $\\displaystyle\\int_0^{nT} f(x)\\,\\mathrm{d}x = n\\int_0^T f(x)\\,\\mathrm{d}x$（$n$ 为正整数）。\n\n---\n\n### 〔性质〕华里士公式（点火公式）\n\n$$I_n = \\int_0^{\\frac{\\pi}{2}} \\sin^n x\\,\\mathrm{d}x = \\int_0^{\\frac{\\pi}{2}} \\cos^n x\\,\\mathrm{d}x$$\n\n- **$n$ 为正偶数**：$I_n = \\dfrac{(n-1)!!}{n!!} \\cdot \\dfrac{\\pi}{2}$；\n- **$n$ 为大于 1 的奇数**：$I_n = \\dfrac{(n-1)!!}{n!!}$；\n- **递推式**：$I_n = \\dfrac{n - 1}{n}I_{n-2}$，$I_0 = \\dfrac{\\pi}{2}$，$I_1 = 1$。\n\n---\n\n### 〔性质〕三角函数的两个积分公式\n\n设 $f(x)$ 在 $[0, 1]$ 上连续，则：\n- **正弦余弦互换**：$\\displaystyle\\int_0^{\\frac{\\pi}{2}} f(\\sin x)\\,\\mathrm{d}x = \\int_0^{\\frac{\\pi}{2}} f(\\cos x)\\,\\mathrm{d}x$；\n- **提出 $x$**：$\\displaystyle\\int_0^{\\pi} x f(\\sin x)\\,\\mathrm{d}x = \\dfrac{\\pi}{2}\\int_0^{\\pi} f(\\sin x)\\,\\mathrm{d}x$。",
      tags: ["定积分换元法", "定积分分部积分法", "奇偶性", "周期性", "华里士公式", "点火公式", "性质"]
    },
    {
      id: "calc-int-improper",
      chapterId: "integral",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 5,
      card: "⑧",
      title: "反常积分及其敛散性",
      md: "### 〔定义〕无穷区间上的反常积分\n\n设 $f(x)$ 在 $[a, +\\infty)$ 上连续：\n$$\\int_a^{+\\infty} f(x)\\,\\mathrm{d}x = \\lim\\limits_{t \\to +\\infty}\\int_a^t f(x)\\,\\mathrm{d}x$$\n\n极限存在称该反常积分==收敛==，否则称==发散==。\n- **下限无穷**：$\\displaystyle\\int_{-\\infty}^{b} f(x)\\,\\mathrm{d}x = \\lim\\limits_{t \\to -\\infty}\\int_t^b f(x)\\,\\mathrm{d}x$；\n- **两端无穷**：$\\displaystyle\\int_{-\\infty}^{+\\infty} f(x)\\,\\mathrm{d}x = \\int_{-\\infty}^{c} f(x)\\,\\mathrm{d}x + \\int_c^{+\\infty} f(x)\\,\\mathrm{d}x$，右边==两个都收敛==时才收敛。\n\n---\n\n### 〔定义〕无界函数的反常积分（瑕积分）\n\n若 $f(x)$ 在点 $a$ 的任一右邻域内无界，则 $a$ 称为 $f(x)$ 的==瑕点==。设 $f(x)$ 在 $(a, b]$ 上连续，$a$ 为瑕点：\n$$\\int_a^b f(x)\\,\\mathrm{d}x = \\lim\\limits_{t \\to a^+}\\int_t^b f(x)\\,\\mathrm{d}x$$\n\n- **瑕点在右端**：$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = \\lim\\limits_{t \\to b^-}\\int_a^t f(x)\\,\\mathrm{d}x$；\n- **瑕点 $c$ 在内部**：$\\displaystyle\\int_a^b = \\int_a^c + \\int_c^b$，右边==两个都收敛==时才收敛。\n\n---\n\n### 〔性质〕两个基本的反常积分\n\n- **无穷限**（$a > 0$）：$\\displaystyle\\int_a^{+\\infty} \\dfrac{\\mathrm{d}x}{x^p}$ 当 $p > 1$ 时收敛，当 $p \\le 1$ 时发散；\n- **瑕积分**（$b > a$）：$\\displaystyle\\int_a^b \\dfrac{\\mathrm{d}x}{(x - a)^p}$ 当 $p < 1$ 时收敛，当 $p \\ge 1$ 时发散。\n\n---\n\n### 〔定理〕比较判别法\n\n设 $f(x)$、$g(x)$ 在 $[a, +\\infty)$ 上连续且非负：\n- **比较形式**：若 $f(x) \\le g(x)$，则 $\\displaystyle\\int_a^{+\\infty} g\\,\\mathrm{d}x$ 收敛 $\\implies \\int_a^{+\\infty} f\\,\\mathrm{d}x$ 收敛；$\\displaystyle\\int_a^{+\\infty} f\\,\\mathrm{d}x$ 发散 $\\implies \\int_a^{+\\infty} g\\,\\mathrm{d}x$ 发散；\n- **极限形式**：若 $\\lim\\limits_{x \\to +\\infty} \\dfrac{f(x)}{g(x)} = l\\ (0 < l < +\\infty)$，则两个反常积分==同敛散==。\n\n瑕积分有相同的比较判别法（极限取在瑕点处）。",
      tags: ["反常积分", "无穷限积分", "瑕积分", "瑕点", "p积分", "比较判别法", "定义", "定理", "性质"]
    },
    {
      id: "calc-int-geometry",
      chapterId: "integral",
      type: "property",
      types: ["property"],
      module: 6,
      card: "⑨",
      title: "微元法与几何应用",
      md: "### 〔方法〕微元法\n\n所求量 $U$ 对区间 $[a, b]$ 具有可加性时：\n1. **取微元**：在 $[x, x + \\mathrm{d}x]$ 上求出部分量的近似值 $\\mathrm{d}U = f(x)\\,\\mathrm{d}x$；\n2. **积分**：$U = \\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$。\n\n---\n\n### 〔性质〕平面图形的面积\n\n- **直角坐标**：由 $y = f(x)$、$y = g(x)$、$x = a$、$x = b$ 围成：\n  $$A = \\int_a^b |f(x) - g(x)|\\,\\mathrm{d}x$$\n- **参数方程**：曲线 $x = \\varphi(t)$，$y = \\psi(t) \\ge 0$ 与 $x$ 轴围成（$t$ 由 $\\alpha$ 变到 $\\beta$ 时 $x$ 由 $a$ 单调变到 $b$）：\n  $$A = \\int_\\alpha^\\beta \\psi(t)\\varphi'(t)\\,\\mathrm{d}t$$\n- **极坐标**：由 $r = r(\\theta)$、$\\theta = \\alpha$、$\\theta = \\beta$ 围成的曲边扇形：\n  $$A = \\dfrac{1}{2}\\int_\\alpha^\\beta r^2(\\theta)\\,\\mathrm{d}\\theta$$\n\n---\n\n### 〔性质〕立体的体积\n\n设 $f(x)$ 在 $[a, b]$ 上连续：\n- **绕 $x$ 轴旋转**：曲边梯形 $0 \\le y \\le |f(x)|$，$a \\le x \\le b$ 绕 $x$ 轴旋转一周：\n  $$V_x = \\pi\\int_a^b f^2(x)\\,\\mathrm{d}x$$\n- **绕 $y$ 轴旋转**（$0 \\le a < b$，柱壳法）：\n  $$V_y = 2\\pi\\int_a^b x|f(x)|\\,\\mathrm{d}x$$\n- **平行截面面积已知**：垂直于 $x$ 轴的截面面积为 $A(x)$：\n  $$V = \\int_a^b A(x)\\,\\mathrm{d}x$$\n\n---\n\n### 〔性质〕平面曲线的弧长\n\n由弧微分（第2章卡⑪）积分得到：\n- **直角坐标** $y = f(x)$，$a \\le x \\le b$：$s = \\displaystyle\\int_a^b \\sqrt{1 + f'^2(x)}\\,\\mathrm{d}x$；\n- **参数方程** $x = \\varphi(t)$，$y = \\psi(t)$，$\\alpha \\le t \\le \\beta$：$s = \\displaystyle\\int_\\alpha^\\beta \\sqrt{\\varphi'^2(t) + \\psi'^2(t)}\\,\\mathrm{d}t$；\n- **极坐标** $r = r(\\theta)$，$\\alpha \\le \\theta \\le \\beta$：$s = \\displaystyle\\int_\\alpha^\\beta \\sqrt{r^2(\\theta) + r'^2(\\theta)}\\,\\mathrm{d}\\theta$。\n\n---\n\n### 〔性质〕旋转曲面的面积\n\n曲线 $y = f(x)$（$a \\le x \\le b$）绕 $x$ 轴旋转一周所得旋转曲面的面积：\n$$S = 2\\pi\\int_a^b |f(x)|\\sqrt{1 + f'^2(x)}\\,\\mathrm{d}x$$\n\n- **参数方程**：$S = 2\\pi\\displaystyle\\int_\\alpha^\\beta |\\psi(t)|\\sqrt{\\varphi'^2(t) + \\psi'^2(t)}\\,\\mathrm{d}t$。",
      tags: ["微元法", "平面图形面积", "旋转体体积", "平行截面", "弧长", "旋转曲面面积", "性质"]
    },
    {
      id: "calc-int-physics",
      chapterId: "integral",
      type: "property",
      types: ["property"],
      module: 6,
      card: "⑩",
      title: "定积分的物理应用",
      md: "### 〔性质〕变力沿直线做功\n\n物体在变力 $F(x)$ 作用下沿 $x$ 轴从 $a$ 移动到 $b$（力的方向与 $x$ 轴一致），所做的功为\n$$W = \\int_a^b F(x)\\,\\mathrm{d}x$$\n\n- **抽水做功**：把深度 $x$ 处厚度为 $\\mathrm{d}x$ 的一层液体提到液面，功的微元为 $\\mathrm{d}W = \\rho g\\,A(x)\\,x\\,\\mathrm{d}x$（$A(x)$ 为该层的截面积，$\\rho$ 为液体密度）。\n\n---\n\n### 〔性质〕液体的静压力\n\n平板铅直放入液体中，深度 $x$ 处平板的宽度为 $l(x)$，平板位于深度 $a$ 到 $b$ 之间，则平板一侧所受的压力为\n$$P = \\int_a^b \\rho g\\,x\\,l(x)\\,\\mathrm{d}x$$\n\n---\n\n### 〔性质〕引力\n\n质量为 $m_1$、$m_2$，相距 $r$ 的两质点间的引力大小为 $F = G\\dfrac{m_1 m_2}{r^2}$。求细杆对质点的引力时：\n1. **取微元**：杆上一小段 $\\mathrm{d}x$ 的质量为 $\\mu\\,\\mathrm{d}x$（$\\mu$ 为线密度），它对质点的引力 $\\mathrm{d}F = G\\dfrac{m\\,\\mu\\,\\mathrm{d}x}{r^2}$；\n2. **分解后积分**：把 $\\mathrm{d}F$ 分解到坐标轴上，分别积分得各分力。",
      tags: ["变力做功", "液体压力", "引力", "微元法", "性质"]
    },
    {
      id: "calc-vec-coordinates",
      chapterId: "vector-geometry",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 1,
      card: "①",
      title: "向量的坐标、模与方向余弦",
      md: "### 〔定义〕向量及其坐标\n\n既有大小又有方向的量称为==向量==。在空间直角坐标系中，\n$$\\boldsymbol{a} = a_x\\boldsymbol{i} + a_y\\boldsymbol{j} + a_z\\boldsymbol{k} = (a_x, a_y, a_z)$$\n\n- **两点确定的向量**：$\\overrightarrow{M_1M_2} = (x_2 - x_1,\\ y_2 - y_1,\\ z_2 - z_1)$；\n- **线性运算**：设 $\\boldsymbol{b} = (b_x, b_y, b_z)$，则 $\\boldsymbol{a} \\pm \\boldsymbol{b} = (a_x \\pm b_x,\\ a_y \\pm b_y,\\ a_z \\pm b_z)$，$\\lambda\\boldsymbol{a} = (\\lambda a_x,\\ \\lambda a_y,\\ \\lambda a_z)$。\n\n---\n\n### 〔定理〕两向量平行的条件\n\n设 $\\boldsymbol{a} \\neq \\boldsymbol{0}$，则\n$$\\boldsymbol{b} \\parallel \\boldsymbol{a} \\iff \\boldsymbol{b} = \\lambda\\boldsymbol{a} \\iff \\dfrac{b_x}{a_x} = \\dfrac{b_y}{a_y} = \\dfrac{b_z}{a_z}$$\n\n（分母为零时，理解为对应分子也为零。）\n\n---\n\n### 〔性质〕模、单位向量与方向余弦\n\n设 $\\boldsymbol{a} = (a_x, a_y, a_z) \\neq \\boldsymbol{0}$：\n- **模**：$|\\boldsymbol{a}| = \\sqrt{a_x^2 + a_y^2 + a_z^2}$；\n- **单位向量**：与 $\\boldsymbol{a}$ 同向的单位向量 $\\boldsymbol{e}_a = \\dfrac{\\boldsymbol{a}}{|\\boldsymbol{a}|}$；\n- **方向余弦**：$\\boldsymbol{a}$ 与三坐标轴正向的夹角 $\\alpha, \\beta, \\gamma$ 满足\n  $$\\cos\\alpha = \\dfrac{a_x}{|\\boldsymbol{a}|}, \\quad \\cos\\beta = \\dfrac{a_y}{|\\boldsymbol{a}|}, \\quad \\cos\\gamma = \\dfrac{a_z}{|\\boldsymbol{a}|}$$\n  且 $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$，即 $\\boldsymbol{e}_a = (\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$。\n\n---\n\n### 〔定义〕向量的投影\n\n设 $\\boldsymbol{a}$ 与 $\\boldsymbol{b}$ 的夹角为 $\\theta$，则\n$$\\operatorname{Prj}_{\\boldsymbol{b}}\\boldsymbol{a} = |\\boldsymbol{a}|\\cos\\theta$$\n\n称为 $\\boldsymbol{a}$ 在 $\\boldsymbol{b}$ 上的==投影==；$a_x, a_y, a_z$ 就是 $\\boldsymbol{a}$ 在三坐标轴上的投影。",
      tags: ["向量", "坐标", "线性运算", "模", "单位向量", "方向余弦", "投影", "定义", "定理", "性质"]
    },
    {
      id: "calc-vec-products",
      chapterId: "vector-geometry",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "②",
      title: "数量积、向量积与混合积",
      md: "### 〔定义〕数量积\n\n$$\\boldsymbol{a} \\cdot \\boldsymbol{b} = |\\boldsymbol{a}||\\boldsymbol{b}|\\cos\\theta = a_x b_x + a_y b_y + a_z b_z$$\n\n其中 $\\theta$ 为 $\\boldsymbol{a}, \\boldsymbol{b}$ 的夹角（$0 \\le \\theta \\le \\pi$），结果是==数==。\n\n---\n\n### 〔性质〕数量积的性质\n\n- **运算律**：$\\boldsymbol{a} \\cdot \\boldsymbol{b} = \\boldsymbol{b} \\cdot \\boldsymbol{a}$，$(\\boldsymbol{a} + \\boldsymbol{b}) \\cdot \\boldsymbol{c} = \\boldsymbol{a} \\cdot \\boldsymbol{c} + \\boldsymbol{b} \\cdot \\boldsymbol{c}$；\n- **模**：$\\boldsymbol{a} \\cdot \\boldsymbol{a} = |\\boldsymbol{a}|^2$；\n- **垂直**：$\\boldsymbol{a} \\perp \\boldsymbol{b} \\iff \\boldsymbol{a} \\cdot \\boldsymbol{b} = 0$；\n- **夹角与投影**：$\\cos\\theta = \\dfrac{\\boldsymbol{a} \\cdot \\boldsymbol{b}}{|\\boldsymbol{a}||\\boldsymbol{b}|}$，$\\operatorname{Prj}_{\\boldsymbol{b}}\\boldsymbol{a} = \\dfrac{\\boldsymbol{a} \\cdot \\boldsymbol{b}}{|\\boldsymbol{b}|}$。\n\n---\n\n### 〔定义〕向量积\n\n$\\boldsymbol{a} \\times \\boldsymbol{b}$ 是一个==向量==：\n- **模**：$|\\boldsymbol{a} \\times \\boldsymbol{b}| = |\\boldsymbol{a}||\\boldsymbol{b}|\\sin\\theta$；\n- **方向**：同时垂直于 $\\boldsymbol{a}$ 与 $\\boldsymbol{b}$，且 $\\boldsymbol{a}, \\boldsymbol{b}, \\boldsymbol{a} \\times \\boldsymbol{b}$ 符合右手法则；\n- **坐标**：\n  $$\\boldsymbol{a} \\times \\boldsymbol{b} = \\begin{vmatrix} \\boldsymbol{i} & \\boldsymbol{j} & \\boldsymbol{k} \\\\ a_x & a_y & a_z \\\\ b_x & b_y & b_z \\end{vmatrix}$$\n\n---\n\n### 〔性质〕向量积的性质\n\n- **反交换**：$\\boldsymbol{a} \\times \\boldsymbol{b} = -\\boldsymbol{b} \\times \\boldsymbol{a}$，$\\boldsymbol{a} \\times \\boldsymbol{a} = \\boldsymbol{0}$；\n- **分配律**：$(\\boldsymbol{a} + \\boldsymbol{b}) \\times \\boldsymbol{c} = \\boldsymbol{a} \\times \\boldsymbol{c} + \\boldsymbol{b} \\times \\boldsymbol{c}$；\n- **平行**：$\\boldsymbol{a} \\parallel \\boldsymbol{b} \\iff \\boldsymbol{a} \\times \\boldsymbol{b} = \\boldsymbol{0}$；\n- **面积**：$|\\boldsymbol{a} \\times \\boldsymbol{b}|$ 等于以 $\\boldsymbol{a}, \\boldsymbol{b}$ 为邻边的平行四边形的面积。\n\n---\n\n### 〔定义〕混合积\n\n$$[\\boldsymbol{a}\\ \\boldsymbol{b}\\ \\boldsymbol{c}] = (\\boldsymbol{a} \\times \\boldsymbol{b}) \\cdot \\boldsymbol{c} = \\begin{vmatrix} a_x & a_y & a_z \\\\ b_x & b_y & b_z \\\\ c_x & c_y & c_z \\end{vmatrix}$$\n\n---\n\n### 〔性质〕混合积的性质\n\n- **轮换不变**：$[\\boldsymbol{a}\\ \\boldsymbol{b}\\ \\boldsymbol{c}] = [\\boldsymbol{b}\\ \\boldsymbol{c}\\ \\boldsymbol{a}] = [\\boldsymbol{c}\\ \\boldsymbol{a}\\ \\boldsymbol{b}]$；\n- **体积**：$|[\\boldsymbol{a}\\ \\boldsymbol{b}\\ \\boldsymbol{c}]|$ 等于以 $\\boldsymbol{a}, \\boldsymbol{b}, \\boldsymbol{c}$ 为棱的平行六面体的体积；\n- **共面**：$\\boldsymbol{a}, \\boldsymbol{b}, \\boldsymbol{c}$ 共面 $\\iff [\\boldsymbol{a}\\ \\boldsymbol{b}\\ \\boldsymbol{c}] = 0$。",
      tags: ["数量积", "点积", "向量积", "叉积", "混合积", "垂直", "平行", "共面", "定义", "性质"]
    },
    {
      id: "calc-vec-plane",
      chapterId: "vector-geometry",
      type: "definition",
      types: ["definition", "property"],
      module: 2,
      card: "③",
      title: "平面方程",
      md: "### 〔定义〕平面的点法式方程\n\n垂直于平面的非零向量称为该平面的==法向量==。过点 $M_0(x_0, y_0, z_0)$、法向量为 $\\boldsymbol{n} = (A, B, C)$ 的平面方程为\n$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$$\n\n---\n\n### 〔定义〕平面的一般式方程\n\n$$Ax + By + Cz + D = 0 \\quad (A, B, C \\text{ 不全为零})$$\n\n其中 $\\boldsymbol{n} = (A, B, C)$ 就是法向量：\n- **过原点**：$D = 0$；\n- **平行于坐标轴**：缺哪个变量，就平行于（或包含）哪个坐标轴，如 $By + Cz + D = 0$ 平行于 $x$ 轴；\n- **平行于坐标面**：只含一个变量，如 $Cz + D = 0$ 平行于 $xOy$ 面。\n\n---\n\n### 〔定义〕平面的截距式方程\n\n在 $x, y, z$ 轴上的截距分别为 $a, b, c$（都不为零）的平面：\n$$\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1$$\n\n---\n\n### 〔性质〕过三点的平面\n\n过不共线三点 $M_i(x_i, y_i, z_i)\\ (i = 1, 2, 3)$ 的平面方程为\n$$\\begin{vmatrix} x - x_1 & y - y_1 & z - z_1 \\\\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1 \\end{vmatrix} = 0$$\n\n---\n\n### 〔定义〕平面束\n\n设直线 $L$ 是两个不平行平面 $A_1x + B_1y + C_1z + D_1 = 0$ 与 $A_2x + B_2y + C_2z + D_2 = 0$ 的交线，则方程\n$$\\begin{aligned} & A_1x + B_1y + C_1z + D_1 \\\\ & + \\lambda(A_2x + B_2y + C_2z + D_2) = 0 \\end{aligned}$$\n\n表示过 $L$ 的一族平面（不含第二个平面），称为过 $L$ 的==平面束==。",
      tags: ["平面", "法向量", "点法式", "一般式", "截距式", "平面束", "定义", "性质"]
    },
    {
      id: "calc-vec-line",
      chapterId: "vector-geometry",
      type: "definition",
      types: ["definition", "property"],
      module: 2,
      card: "④",
      title: "空间直线方程",
      md: "### 〔定义〕直线的对称式（点向式）方程\n\n平行于直线的非零向量称为该直线的==方向向量==。过点 $M_0(x_0, y_0, z_0)$、方向向量为 $\\boldsymbol{s} = (m, n, p)$ 的直线方程为\n$$\\dfrac{x - x_0}{m} = \\dfrac{y - y_0}{n} = \\dfrac{z - z_0}{p}$$\n\n（分母为零时，理解为对应分子也为零。）\n\n---\n\n### 〔定义〕直线的参数式方程\n\n$$x = x_0 + mt, \\quad y = y_0 + nt, \\quad z = z_0 + pt$$\n\n---\n\n### 〔定义〕直线的一般式方程\n\n两个不平行平面的交线：\n$$\\begin{cases} A_1x + B_1y + C_1z + D_1 = 0 \\\\ A_2x + B_2y + C_2z + D_2 = 0 \\end{cases}$$\n\n---\n\n### 〔方法〕一般式化为对称式\n\n1. **求方向向量**：$\\boldsymbol{s} = \\boldsymbol{n}_1 \\times \\boldsymbol{n}_2$，其中 $\\boldsymbol{n}_1 = (A_1, B_1, C_1)$，$\\boldsymbol{n}_2 = (A_2, B_2, C_2)$；\n2. **找一个点**：给某个变量取定一个值（如 $z = 0$），解出另外两个，得直线上一点；\n3. **写方程**：代入对称式。",
      tags: ["直线", "方向向量", "对称式", "点向式", "参数式", "一般式", "定义", "性质"]
    },
    {
      id: "calc-vec-angles",
      chapterId: "vector-geometry",
      type: "property",
      types: ["property"],
      module: 3,
      card: "⑤",
      title: "夹角与位置关系",
      md: "### 〔性质〕两平面的夹角与位置关系\n\n设两平面的法向量为 $\\boldsymbol{n}_1, \\boldsymbol{n}_2$：\n- **夹角**（取 $0 \\le \\theta \\le \\frac{\\pi}{2}$）：$\\cos\\theta = \\dfrac{|\\boldsymbol{n}_1 \\cdot \\boldsymbol{n}_2|}{|\\boldsymbol{n}_1||\\boldsymbol{n}_2|}$；\n- **垂直**：$\\boldsymbol{n}_1 \\cdot \\boldsymbol{n}_2 = 0$；\n- **平行或重合**：$\\boldsymbol{n}_1 \\parallel \\boldsymbol{n}_2$。\n\n---\n\n### 〔性质〕两直线的夹角与位置关系\n\n设两直线的方向向量为 $\\boldsymbol{s}_1, \\boldsymbol{s}_2$，分别过点 $M_1, M_2$：\n- **夹角**（取 $0 \\le \\varphi \\le \\frac{\\pi}{2}$）：$\\cos\\varphi = \\dfrac{|\\boldsymbol{s}_1 \\cdot \\boldsymbol{s}_2|}{|\\boldsymbol{s}_1||\\boldsymbol{s}_2|}$；\n- **垂直**：$\\boldsymbol{s}_1 \\cdot \\boldsymbol{s}_2 = 0$；\n- **平行或重合**：$\\boldsymbol{s}_1 \\parallel \\boldsymbol{s}_2$；\n- **共面与异面**：两直线共面 $\\iff [\\overrightarrow{M_1M_2}\\ \\boldsymbol{s}_1\\ \\boldsymbol{s}_2] = 0$，否则为==异面直线==。\n\n---\n\n### 〔性质〕直线与平面的夹角与位置关系\n\n设直线方向向量为 $\\boldsymbol{s}$，平面法向量为 $\\boldsymbol{n}$：\n- **夹角**（直线与它在平面上投影的夹角，$0 \\le \\varphi \\le \\frac{\\pi}{2}$）：$\\sin\\varphi = \\dfrac{|\\boldsymbol{s} \\cdot \\boldsymbol{n}|}{|\\boldsymbol{s}||\\boldsymbol{n}|}$；\n- **垂直**：直线垂直于平面 $\\iff \\boldsymbol{s} \\parallel \\boldsymbol{n}$；\n- **平行或在平面内**：$\\boldsymbol{s} \\cdot \\boldsymbol{n} = 0$；再看直线上一点是否在平面上，区分平行与在平面内。",
      tags: ["两平面夹角", "两直线夹角", "直线与平面夹角", "平行", "垂直", "共面", "异面", "性质"]
    },
    {
      id: "calc-vec-distances",
      chapterId: "vector-geometry",
      type: "property",
      types: ["property"],
      module: 3,
      card: "⑥",
      title: "距离公式",
      md: "### 〔性质〕点到平面的距离\n\n点 $M_0(x_0, y_0, z_0)$ 到平面 $Ax + By + Cz + D = 0$ 的距离：\n$$d = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$\n\n- **两平行平面**：$Ax + By + Cz + D_1 = 0$ 与 $Ax + By + Cz + D_2 = 0$ 之间的距离为 $d = \\dfrac{|D_1 - D_2|}{\\sqrt{A^2 + B^2 + C^2}}$。\n\n---\n\n### 〔性质〕点到直线的距离\n\n设直线过点 $M_1$、方向向量为 $\\boldsymbol{s}$，则点 $M_0$ 到该直线的距离：\n$$d = \\dfrac{|\\overrightarrow{M_1M_0} \\times \\boldsymbol{s}|}{|\\boldsymbol{s}|}$$\n\n---\n\n### 〔性质〕两异面直线的距离\n\n设两直线分别过点 $M_1, M_2$，方向向量为 $\\boldsymbol{s}_1, \\boldsymbol{s}_2$，则它们之间的距离：\n$$d = \\dfrac{|[\\overrightarrow{M_1M_2}\\ \\boldsymbol{s}_1\\ \\boldsymbol{s}_2]|}{|\\boldsymbol{s}_1 \\times \\boldsymbol{s}_2|}$$",
      tags: ["点到平面的距离", "点到直线的距离", "平行平面间距离", "异面直线的距离", "性质"]
    },
    {
      id: "calc-vec-surfaces",
      chapterId: "vector-geometry",
      type: "definition",
      types: ["definition"],
      module: 4,
      card: "⑦",
      title: "柱面、旋转曲面与二次曲面",
      md: "### 〔定义〕曲面方程\n\n若曲面 $S$ 上任一点的坐标都满足方程 $F(x, y, z) = 0$，而不在 $S$ 上的点的坐标都不满足，则称 $F(x, y, z) = 0$ 为曲面 $S$ 的方程。\n\n---\n\n### 〔定义〕柱面\n\n平行于定直线并沿定曲线 $C$ 移动的直线 $L$ 所形成的曲面称为==柱面==，$C$ 称为准线，$L$ 称为母线。\n- **缺变量的方程**：只含 $x, y$ 的方程 $F(x, y) = 0$ 表示母线平行于 $z$ 轴的柱面，准线为 $xOy$ 面上的曲线 $F(x, y) = 0$（缺 $x$、缺 $y$ 同理）；\n- **常见柱面**：椭圆柱面 $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$，双曲柱面 $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$，抛物柱面 $x^2 = 2py$。\n\n---\n\n### 〔定义〕旋转曲面\n\n平面曲线绕该平面上一条定直线旋转一周所成的曲面称为==旋转曲面==。设 $yOz$ 面上的曲线 $C: f(y, z) = 0$：\n- **绕 $z$ 轴**：$f\\left(\\pm\\sqrt{x^2 + y^2},\\ z\\right) = 0$；\n- **绕 $y$ 轴**：$f\\left(y,\\ \\pm\\sqrt{x^2 + z^2}\\right) = 0$。\n\n即绕哪个轴旋转，该轴的坐标不变，另一个坐标换成它到该轴距离的 $\\pm$ 形式（其他坐标面上的曲线同理）。\n\n---\n\n### 〔定义〕常见二次曲面\n\n- **球面**：$(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$；\n- **椭球面**：$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} + \\dfrac{z^2}{c^2} = 1$；\n- **椭圆锥面**：$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = z^2$；\n- **单叶双曲面**：$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} - \\dfrac{z^2}{c^2} = 1$；\n- **双叶双曲面**：$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} - \\dfrac{z^2}{c^2} = -1$；\n- **椭圆抛物面**：$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = z$；\n- **双曲抛物面（马鞍面）**：$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = z$。",
      tags: ["曲面方程", "柱面", "旋转曲面", "二次曲面", "球面", "椭球面", "双曲面", "抛物面", "锥面", "定义"]
    },
    {
      id: "calc-vec-space-curves",
      chapterId: "vector-geometry",
      type: "definition",
      types: ["definition", "property"],
      module: 4,
      card: "⑧",
      title: "空间曲线及其投影",
      md: "### 〔定义〕空间曲线的方程\n\n- **一般方程**：两曲面的交线\n  $$\\begin{cases} F(x, y, z) = 0 \\\\ G(x, y, z) = 0 \\end{cases}$$\n- **参数方程**：$x = x(t)$，$y = y(t)$，$z = z(t)$。\n\n---\n\n### 〔定义〕投影柱面与投影曲线\n\n设空间曲线 $C: \\begin{cases} F(x, y, z) = 0 \\\\ G(x, y, z) = 0 \\end{cases}$：\n- **投影柱面**：从方程组中消去 $z$ 得 $H(x, y) = 0$，它是包含 $C$ 且母线平行于 $z$ 轴的柱面，称为 $C$ 关于 $xOy$ 面的==投影柱面==；\n- **投影曲线**：$C$ 在 $xOy$ 面上的==投影曲线==为\n  $$\\begin{cases} H(x, y) = 0 \\\\ z = 0 \\end{cases}$$\n\n向 $yOz$ 面、$zOx$ 面投影时，分别消去 $x$、$y$。\n\n---\n\n### 〔方法〕立体在坐标面上的投影区域\n\n求空间立体 $\\Omega$ 在 $xOy$ 面上的投影区域：\n1. **找边界曲线**：求出围成 $\\Omega$ 的曲面的交线（或 $\\Omega$ 的侧面轮廓线）；\n2. **投影**：求该曲线在 $xOy$ 面上的投影曲线；\n3. **定区域**：投影曲线所围的平面区域即为投影区域 $D_{xy}$。",
      tags: ["空间曲线", "一般方程", "参数方程", "投影柱面", "投影曲线", "投影区域", "定义", "性质"]
    },
    {
      id: "calc-mvd-limit-continuity",
      chapterId: "multivar-derivative",
      type: "definition",
      types: ["definition", "theorem"],
      module: 1,
      card: "①",
      title: "二元函数的极限与连续",
      md: "### 〔定义〕二元函数与邻域\n\n- **二元函数**：设 $D$ 是平面上的非空点集，若对每个点 $(x, y) \\in D$，按照某一法则 $f$ 总有唯一确定的数 $z$ 与之对应，则称 $z = f(x, y)$ 为定义在 $D$ 上的==二元函数==；\n- **邻域**：$U(P_0, \\delta) = \\{\\, P \\mid |PP_0| < \\delta \\,\\}$，去掉中心 $P_0$ 后称为去心邻域 $\\mathring{U}(P_0, \\delta)$。\n\n---\n\n### 〔定义〕二重极限\n\n设 $f(x, y)$ 在 $P_0(x_0, y_0)$ 的某去心邻域内有定义，若对任意 $\\varepsilon > 0$，总存在 $\\delta > 0$，使当\n$$0 < \\sqrt{(x - x_0)^2 + (y - y_0)^2} < \\delta$$\n\n时恒有 $|f(x, y) - A| < \\varepsilon$，则称 $A$ 为 $f(x, y)$ 当 $(x, y) \\to (x_0, y_0)$ 时的==极限==，记作 $\\lim\\limits_{(x, y) \\to (x_0, y_0)} f(x, y) = A$。\n- **任意方式趋近**：要求点 $(x, y)$ 以==任意方式==趋于 $(x_0, y_0)$ 时，$f(x, y)$ 都趋于同一个 $A$。\n\n---\n\n### 〔定义〕二元函数的连续性\n\n若 $\\lim\\limits_{(x, y) \\to (x_0, y_0)} f(x, y) = f(x_0, y_0)$，则称 $f(x, y)$ 在 $(x_0, y_0)$ ==连续==。\n- **多元初等函数**：一切多元初等函数在其定义区域内连续。\n\n---\n\n### 〔定理〕有界闭区域上连续函数的性质\n\n设 $f(x, y)$ 在有界闭区域 $D$ 上连续，则：\n- **有界与最值**：$f$ 在 $D$ 上有界，且能取得最大值与最小值；\n- **介值**：$f$ 能取得介于最小值与最大值之间的任何值。\n\n---\n\n### 〔提示〕\n\n- 若沿两条不同路径趋于 $(x_0, y_0)$ 时极限不同，则二重极限不存在：例如 $f(x, y) = \\dfrac{xy}{x^2 + y^2}$ 沿 $y = kx$ 趋于原点时极限为 $\\dfrac{k}{1 + k^2}$，随 $k$ 而变。",
      tags: ["二元函数", "邻域", "二重极限", "连续", "有界闭区域", "定义", "定理"]
    },
    {
      id: "calc-mvd-partial",
      chapterId: "multivar-derivative",
      type: "definition",
      types: ["definition", "theorem"],
      module: 2,
      card: "②",
      title: "偏导数与高阶偏导数",
      md: "### 〔定义〕偏导数\n\n设 $z = f(x, y)$ 在 $(x_0, y_0)$ 的某邻域内有定义，若极限\n$$f_x(x_0, y_0) = \\lim\\limits_{\\Delta x \\to 0} \\dfrac{f(x_0 + \\Delta x, y_0) - f(x_0, y_0)}{\\Delta x}$$\n\n存在，则称此极限为 $f(x, y)$ 在 $(x_0, y_0)$ 处对 $x$ 的==偏导数==，也记作 $\\dfrac{\\partial z}{\\partial x}\\Big|_{(x_0, y_0)}$；对 $y$ 的偏导数 $f_y(x_0, y_0)$ 同理。\n- **求法**：对 $x$ 求偏导时，把 $y$ 看作常数，按一元函数求导。\n\n---\n\n### 〔定义〕高阶偏导数\n\n偏导数 $f_x, f_y$ 的偏导数称为二阶偏导数：\n$$f_{xx} = \\dfrac{\\partial^2 z}{\\partial x^2}, \\quad f_{xy} = \\dfrac{\\partial^2 z}{\\partial x\\,\\partial y}$$\n$$f_{yx} = \\dfrac{\\partial^2 z}{\\partial y\\,\\partial x}, \\quad f_{yy} = \\dfrac{\\partial^2 z}{\\partial y^2}$$\n\n其中 $f_{xy}$（先对 $x$ 后对 $y$）与 $f_{yx}$ 称为==混合偏导数==。\n\n---\n\n### 〔定理〕混合偏导数相等的条件\n\n若 $f_{xy}(x, y)$ 与 $f_{yx}(x, y)$ 在区域 $D$ 内连续，则在 $D$ 内\n$$f_{xy}(x, y) = f_{yx}(x, y)$$\n\n即二阶混合偏导数在连续的条件下与求导次序无关。",
      tags: ["偏导数", "高阶偏导数", "混合偏导数", "求导次序", "定义", "定理"]
    },
    {
      id: "calc-mvd-differential",
      chapterId: "multivar-derivative",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "③",
      title: "全微分及可微的条件",
      md: "### 〔定义〕可微与全微分\n\n设 $z = f(x, y)$ 在 $(x_0, y_0)$ 的某邻域内有定义，若全增量 $\\Delta z = f(x_0 + \\Delta x, y_0 + \\Delta y) - f(x_0, y_0)$ 可表示为\n$$\\Delta z = A\\Delta x + B\\Delta y + o(\\rho)$$\n\n其中 $A, B$ 与 $\\Delta x, \\Delta y$ 无关，$\\rho = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$，则称 $f$ 在 $(x_0, y_0)$ ==可微==，$A\\Delta x + B\\Delta y$ 称为==全微分==，记作 $\\mathrm{d}z$。\n\n---\n\n### 〔定理〕可微的必要条件\n\n若 $f(x, y)$ 在 $(x_0, y_0)$ 可微，则：\n- **连续**：$f$ 在 $(x_0, y_0)$ 连续；\n- **偏导数存在**：$f_x(x_0, y_0)$、$f_y(x_0, y_0)$ 存在，且 $A = f_x(x_0, y_0)$，$B = f_y(x_0, y_0)$，即\n  $$\\mathrm{d}z = f_x(x_0, y_0)\\,\\mathrm{d}x + f_y(x_0, y_0)\\,\\mathrm{d}y$$\n\n---\n\n### 〔定理〕可微的充分条件\n\n若 $f_x(x, y)$、$f_y(x, y)$ 在 $(x_0, y_0)$ ==连续==，则 $f$ 在 $(x_0, y_0)$ 可微。\n\n---\n\n### 〔方法〕用定义判断可微\n\n1. **求偏导数**：先求出 $f_x(x_0, y_0)$、$f_y(x_0, y_0)$，若不存在则不可微；\n2. **验证极限**：判断\n   $$\\lim\\limits_{\\rho \\to 0} \\dfrac{\\Delta z - f_x(x_0, y_0)\\Delta x - f_y(x_0, y_0)\\Delta y}{\\rho} = 0$$\n   是否成立，成立则可微，否则不可微。\n\n---\n\n### 〔性质〕四个概念的关系\n\n- **成立的推出**：偏导数连续 $\\implies$ 可微；可微 $\\implies$ 连续；可微 $\\implies$ 偏导数存在；\n- **不成立的推出**：以上各箭头的反方向都不成立，且「连续」与「偏导数存在」互不蕴含。",
      tags: ["全微分", "可微", "必要条件", "充分条件", "连续", "偏导数存在", "定义", "定理", "性质"]
    },
    {
      id: "calc-mvd-chain-rule",
      chapterId: "multivar-derivative",
      type: "theorem",
      types: ["definition", "theorem", "property"],
      module: 3,
      card: "④",
      title: "复合函数求导与全微分形式不变性",
      md: "### 〔定理〕多元复合函数求导法则\n\n设 $u = \\varphi(x, y)$、$v = \\psi(x, y)$ 在点 $(x, y)$ 处偏导数存在，$z = f(u, v)$ 在对应点 $(u, v)$ 处可微，则 $z = f[\\varphi(x, y), \\psi(x, y)]$ 在 $(x, y)$ 处的偏导数存在，且\n$$\\dfrac{\\partial z}{\\partial x} = \\dfrac{\\partial z}{\\partial u}\\dfrac{\\partial u}{\\partial x} + \\dfrac{\\partial z}{\\partial v}\\dfrac{\\partial v}{\\partial x}$$\n$$\\dfrac{\\partial z}{\\partial y} = \\dfrac{\\partial z}{\\partial u}\\dfrac{\\partial u}{\\partial y} + \\dfrac{\\partial z}{\\partial v}\\dfrac{\\partial v}{\\partial y}$$\n\n---\n\n### 〔推论〕其他复合情形\n\n- **中间变量是一元函数（全导数）**：$z = f(u, v)$，$u = \\varphi(t)$，$v = \\psi(t)$，则\n  $$\\dfrac{\\mathrm{d}z}{\\mathrm{d}t} = \\dfrac{\\partial z}{\\partial u}\\varphi'(t) + \\dfrac{\\partial z}{\\partial v}\\psi'(t)$$\n- **自变量也直接出现**：$z = f(u, x, y)$，$u = \\varphi(x, y)$，则\n  $$\\dfrac{\\partial z}{\\partial x} = \\dfrac{\\partial f}{\\partial u}\\dfrac{\\partial u}{\\partial x} + \\dfrac{\\partial f}{\\partial x}$$\n  其中 $\\dfrac{\\partial z}{\\partial x}$ 是复合后对 $x$ 的偏导数，$\\dfrac{\\partial f}{\\partial x}$ 是把 $u, y$ 看作常数时 $f$ 对第二个变量的偏导数。\n\n---\n\n### 〔定义〕抽象函数的偏导数记号\n\n对 $z = f(u, v)$：\n- **一阶**：$f_1' = \\dfrac{\\partial f}{\\partial u}$，$f_2' = \\dfrac{\\partial f}{\\partial v}$（下标表示对第几个变量求偏导）；\n- **二阶**：$f_{12}'' = \\dfrac{\\partial^2 f}{\\partial u\\,\\partial v}$，余类推；二阶偏导数连续时 $f_{12}'' = f_{21}''$。\n\n---\n\n### 〔性质〕全微分形式不变性\n\n设 $z = f(u, v)$ 可微，无论 $u, v$ 是自变量还是中间变量，都有\n$$\\mathrm{d}z = \\dfrac{\\partial z}{\\partial u}\\,\\mathrm{d}u + \\dfrac{\\partial z}{\\partial v}\\,\\mathrm{d}v$$",
      tags: ["链式法则", "多元复合函数", "全导数", "抽象函数", "全微分形式不变性", "定义", "定理", "性质"]
    },
    {
      id: "calc-mvd-implicit",
      chapterId: "multivar-derivative",
      type: "theorem",
      types: ["theorem", "property"],
      module: 3,
      card: "⑤",
      title: "隐函数求导",
      md: "### 〔定理〕一个方程确定的一元隐函数\n\n设 $F(x, y)$ 在 $P(x_0, y_0)$ 的某邻域内具有连续偏导数，$F(x_0, y_0) = 0$，$F_y(x_0, y_0) \\neq 0$，则方程 $F(x, y) = 0$ 在 $x_0$ 的某邻域内能唯一确定一个具有连续导数的函数 $y = f(x)$，满足 $y_0 = f(x_0)$，且\n$$\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = -\\dfrac{F_x}{F_y}$$\n\n---\n\n### 〔定理〕一个方程确定的二元隐函数\n\n设 $F(x, y, z)$ 在 $(x_0, y_0, z_0)$ 的某邻域内具有连续偏导数，$F(x_0, y_0, z_0) = 0$，$F_z(x_0, y_0, z_0) \\neq 0$，则方程 $F(x, y, z) = 0$ 在该点附近唯一确定具有连续偏导数的函数 $z = z(x, y)$，且\n$$\\dfrac{\\partial z}{\\partial x} = -\\dfrac{F_x}{F_z}, \\qquad \\dfrac{\\partial z}{\\partial y} = -\\dfrac{F_y}{F_z}$$\n\n---\n\n### 〔方法〕方程组确定的隐函数\n\n设方程组 $\\begin{cases} F(x, y, u, v) = 0 \\\\ G(x, y, u, v) = 0 \\end{cases}$ 在某点附近确定 $u = u(x, y)$，$v = v(x, y)$，且雅可比行列式\n$$J = \\dfrac{\\partial(F, G)}{\\partial(u, v)} = \\begin{vmatrix} F_u & F_v \\\\ G_u & G_v \\end{vmatrix} \\neq 0$$\n\n1. **两边对 $x$ 求偏导**：得关于 $u_x, v_x$ 的线性方程组\n   $$\\begin{cases} F_x + F_u u_x + F_v v_x = 0 \\\\ G_x + G_u u_x + G_v v_x = 0 \\end{cases}$$\n2. **解方程组**：由 $J \\neq 0$ 解出唯一的 $u_x, v_x$；对 $y$ 的偏导数同理。",
      tags: ["隐函数存在定理", "隐函数求导", "方程组确定的隐函数", "雅可比行列式", "定理", "性质"]
    },
    {
      id: "calc-mvd-gradient",
      chapterId: "multivar-derivative",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 4,
      card: "⑥",
      title: "方向导数与梯度",
      md: "### 〔定义〕方向导数\n\n设 $\\boldsymbol{e}_l = (\\cos\\alpha, \\cos\\beta)$ 是与方向 $l$ 同向的单位向量，点 $P(x_0 + t\\cos\\alpha,\\ y_0 + t\\cos\\beta)$ 在从 $P_0(x_0, y_0)$ 出发、沿 $l$ 方向的射线上，$|PP_0| = t$。若极限\n$$\\dfrac{\\partial f}{\\partial l}\\Big|_{P_0} = \\lim\\limits_{t \\to 0^+} \\dfrac{f(P) - f(P_0)}{t}$$\n\n存在，则称其为 $f(x, y)$ 在 $P_0$ 处沿方向 $l$ 的==方向导数==。\n\n---\n\n### 〔定理〕方向导数的计算\n\n若 $f(x, y)$ 在 $(x_0, y_0)$ ==可微==，则沿任一方向 $l$ 的方向导数都存在，且\n$$\\dfrac{\\partial f}{\\partial l}\\Big|_{(x_0, y_0)} = f_x(x_0, y_0)\\cos\\alpha + f_y(x_0, y_0)\\cos\\beta$$\n\n- **三元函数**：$\\dfrac{\\partial f}{\\partial l} = f_x\\cos\\alpha + f_y\\cos\\beta + f_z\\cos\\gamma$。\n\n---\n\n### 〔定义〕梯度\n\n$$\\operatorname{grad} f = \\nabla f = f_x\\,\\boldsymbol{i} + f_y\\,\\boldsymbol{j} = (f_x, f_y)$$\n\n（偏导数取在 $(x_0, y_0)$ 处）称为 $f(x, y)$ 在 $(x_0, y_0)$ 的==梯度==；三元函数 $\\operatorname{grad} f = (f_x, f_y, f_z)$。\n\n---\n\n### 〔性质〕梯度与方向导数的关系\n\n设 $f$ 可微，$\\theta$ 为 $\\operatorname{grad} f$ 与 $\\boldsymbol{e}_l$ 的夹角，则\n$$\\dfrac{\\partial f}{\\partial l} = \\operatorname{grad} f \\cdot \\boldsymbol{e}_l = |\\operatorname{grad} f|\\cos\\theta$$\n\n- **最大值**：沿梯度方向（$\\theta = 0$），方向导数取最大值 $|\\operatorname{grad} f|$；\n- **最小值**：沿梯度反方向，方向导数取最小值 $-|\\operatorname{grad} f|$；\n- **与等值线垂直**：$\\operatorname{grad} f(x_0, y_0)$ 是等值线 $f(x, y) = f(x_0, y_0)$ 在该点的法向量。",
      tags: ["方向导数", "梯度", "等值线", "方向导数的最大值", "定义", "定理", "性质"]
    },
    {
      id: "calc-mvd-geometry",
      chapterId: "multivar-derivative",
      type: "property",
      types: ["theorem", "property"],
      module: 4,
      card: "⑦",
      title: "空间曲线的切线与曲面的切平面",
      md: "### 〔性质〕参数方程曲线的切线与法平面\n\n设曲线 $\\Gamma: x = \\varphi(t)$，$y = \\psi(t)$，$z = \\omega(t)$，$t = t_0$ 对应点 $M_0(x_0, y_0, z_0)$，且 $\\varphi'(t_0), \\psi'(t_0), \\omega'(t_0)$ 不全为零：\n- **切向量**：$\\boldsymbol{T} = (\\varphi'(t_0), \\psi'(t_0), \\omega'(t_0))$；\n- **切线**：\n  $$\\dfrac{x - x_0}{\\varphi'(t_0)} = \\dfrac{y - y_0}{\\psi'(t_0)} = \\dfrac{z - z_0}{\\omega'(t_0)}$$\n- **法平面**：$\\varphi'(t_0)(x - x_0) + \\psi'(t_0)(y - y_0) + \\omega'(t_0)(z - z_0) = 0$。\n\n曲线 $y = \\varphi(x)$，$z = \\psi(x)$ 可取 $x$ 为参数，切向量为 $(1, \\varphi'(x_0), \\psi'(x_0))$。\n\n---\n\n### 〔性质〕交线式曲线的切向量\n\n设曲线 $\\Gamma: \\begin{cases} F(x, y, z) = 0 \\\\ G(x, y, z) = 0 \\end{cases}$，则在 $M_0$ 处的切向量可取\n$$\\boldsymbol{T} = (F_x, F_y, F_z) \\times (G_x, G_y, G_z)\\Big|_{M_0}$$\n\n---\n\n### 〔性质〕曲面的切平面与法线\n\n设曲面 $\\Sigma: F(x, y, z) = 0$，$F$ 在 $M_0(x_0, y_0, z_0)$ 处偏导数连续且不全为零：\n- **法向量**：$\\boldsymbol{n} = (F_x, F_y, F_z)\\big|_{M_0}$；\n- **切平面**：$F_x(M_0)(x - x_0) + F_y(M_0)(y - y_0) + F_z(M_0)(z - z_0) = 0$；\n- **法线**：\n  $$\\dfrac{x - x_0}{F_x(M_0)} = \\dfrac{y - y_0}{F_y(M_0)} = \\dfrac{z - z_0}{F_z(M_0)}$$\n\n---\n\n### 〔推论〕显式曲面 $z = f(x, y)$\n\n令 $F = f(x, y) - z$，得：\n- **法向量**：$\\boldsymbol{n} = (f_x(x_0, y_0),\\ f_y(x_0, y_0),\\ -1)$；\n- **切平面**：$z - z_0 = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)$，右端即全微分 $\\mathrm{d}z$。",
      tags: ["切线", "法平面", "切向量", "切平面", "法线", "法向量", "定理", "性质"]
    },
    {
      id: "calc-mvd-extremum",
      chapterId: "multivar-derivative",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 5,
      card: "⑧",
      title: "无条件极值与最值",
      md: "### 〔定义〕二元函数的极值\n\n设 $f(x, y)$ 在 $(x_0, y_0)$ 的某邻域内有定义，若对该邻域内异于 $(x_0, y_0)$ 的点都有 $f(x, y) < f(x_0, y_0)$（或 $>$），则称 $f(x_0, y_0)$ 为==极大值==（或==极小值==）。\n\n---\n\n### 〔定理〕极值的必要条件\n\n若 $f(x, y)$ 在 $(x_0, y_0)$ 处偏导数存在且取得极值，则\n$$f_x(x_0, y_0) = 0, \\quad f_y(x_0, y_0) = 0$$\n\n满足上式的点称为==驻点==；极值点只可能是驻点或偏导数不存在的点。\n\n---\n\n### 〔定理〕二元函数的二阶泰勒公式\n\n设 $f(x, y)$ 在 $(x_0, y_0)$ 的某邻域内有连续的二阶偏导数，则\n$$\\begin{aligned} & f(x_0 + h, y_0 + k) \\\\ = {} & f(x_0, y_0) + f_x h + f_y k \\\\ & + \\dfrac{1}{2}\\left(f_{xx}h^2 + 2f_{xy}hk + f_{yy}k^2\\right) + o(\\rho^2) \\end{aligned}$$\n\n其中各偏导数取在 $(x_0, y_0)$ 处，$\\rho = \\sqrt{h^2 + k^2}$。\n\n---\n\n### 〔定理〕极值的充分条件\n\n设 $f(x, y)$ 在驻点 $(x_0, y_0)$ 的某邻域内有连续的二阶偏导数，记\n$$A = f_{xx}, \\quad B = f_{xy}, \\quad C = f_{yy}$$\n\n（均取在 $(x_0, y_0)$ 处）：\n\n- **$AC - B^2 > 0$**：取得极值，$A < 0$ 时为==极大值==，$A > 0$ 时为==极小值==；\n- **$AC - B^2 < 0$**：不是极值；\n- **$AC - B^2 = 0$**：不能确定，需另行讨论。\n\n---\n\n### 〔方法〕有界闭区域上的最值\n\n设 $f(x, y)$ 在有界闭区域 $D$ 上连续：\n1. **内部**：求出 $D$ 内的驻点与偏导数不存在的点，算出函数值；\n2. **边界**：求出 $f$ 在 $D$ 的边界上的最大值与最小值（化为一元函数或用条件极值）；\n3. **比较**：以上所有值中最大者为最大值，最小者为最小值。",
      tags: ["极值", "驻点", "必要条件", "充分条件", "二阶泰勒公式", "最值", "定义", "定理", "性质"]
    },
    {
      id: "calc-mvd-lagrange",
      chapterId: "multivar-derivative",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 5,
      card: "⑨",
      title: "条件极值与拉格朗日乘数法",
      md: "### 〔定义〕条件极值\n\n对自变量附加约束条件的极值称为==条件极值==，如求 $z = f(x, y)$ 在条件 $\\varphi(x, y) = 0$ 下的极值。\n\n---\n\n### 〔方法〕拉格朗日乘数法\n\n求 $z = f(x, y)$ 在条件 $\\varphi(x, y) = 0$ 下的可能极值点：\n1. **构造拉格朗日函数**：$L(x, y, \\lambda) = f(x, y) + \\lambda\\varphi(x, y)$；\n2. **求驻点**：解方程组\n   $$\\begin{cases} L_x = f_x(x, y) + \\lambda\\varphi_x(x, y) = 0 \\\\ L_y = f_y(x, y) + \\lambda\\varphi_y(x, y) = 0 \\\\ L_\\lambda = \\varphi(x, y) = 0 \\end{cases}$$\n3. **判定**：所得 $(x, y)$ 为可能的极值点，是否为极值点一般由问题的实际意义判定。\n\n---\n\n### 〔推论〕多个变量、多个约束\n\n求 $u = f(x, y, z)$ 在条件 $\\varphi(x, y, z) = 0$，$\\psi(x, y, z) = 0$ 下的极值：\n- **拉格朗日函数**：$L = f(x, y, z) + \\lambda\\varphi(x, y, z) + \\mu\\psi(x, y, z)$；\n- **方程组**：令 $L_x = L_y = L_z = 0$，与 $\\varphi = 0$、$\\psi = 0$ 联立求解。",
      tags: ["条件极值", "拉格朗日乘数法", "拉格朗日函数", "约束条件", "定义", "定理", "性质"]
    },
    {
      id: "calc-mi-double-def",
      chapterId: "multiple-integral",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 1,
      card: "①",
      title: "二重积分的定义与性质",
      md: "### 〔定义〕二重积分\n\n设 $f(x, y)$ 在有界闭区域 $D$ 上有界：\n1. **分割**：把 $D$ 任意分成 $n$ 个小闭区域 $\\Delta\\sigma_1, \\cdots, \\Delta\\sigma_n$（$\\Delta\\sigma_i$ 也表示其面积），记 $\\lambda$ 为各小区域直径的最大值；\n2. **求和**：任取 $(\\xi_i, \\eta_i) \\in \\Delta\\sigma_i$，作和 $\\displaystyle\\sum_{i=1}^{n} f(\\xi_i, \\eta_i)\\Delta\\sigma_i$；\n3. **取极限**：若不论怎样分割、怎样取点，极限\n   $$\\lim\\limits_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i, \\eta_i)\\Delta\\sigma_i$$\n   总存在且相等，则称此极限为 $f(x, y)$ 在 $D$ 上的==二重积分==，记作 $\\displaystyle\\iint_D f(x, y)\\,\\mathrm{d}\\sigma$。\n\n$f(x, y)$ 在有界闭区域 $D$ 上连续时，二重积分必存在。\n\n---\n\n### 〔性质〕二重积分的几何意义\n\n当 $f(x, y) \\ge 0$ 时，$\\displaystyle\\iint_D f(x, y)\\,\\mathrm{d}\\sigma$ 等于以 $D$ 为底、以曲面 $z = f(x, y)$ 为顶的==曲顶柱体的体积==。\n\n---\n\n### 〔性质〕二重积分的基本性质\n\n与定积分的性质（第3章卡⑤）一一对应，设 $\\sigma$ 为 $D$ 的面积：\n- **线性**：$\\displaystyle\\iint_D [\\alpha f + \\beta g]\\,\\mathrm{d}\\sigma = \\alpha\\iint_D f\\,\\mathrm{d}\\sigma + \\beta\\iint_D g\\,\\mathrm{d}\\sigma$；\n- **区域可加**：$D = D_1 \\cup D_2$ 且 $D_1, D_2$ 无公共内点时，$\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma = \\iint_{D_1} f\\,\\mathrm{d}\\sigma + \\iint_{D_2} f\\,\\mathrm{d}\\sigma$；\n- **面积**：$\\displaystyle\\iint_D 1\\,\\mathrm{d}\\sigma = \\sigma$；\n- **比较**：在 $D$ 上 $f \\le g$ 时，$\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma \\le \\iint_D g\\,\\mathrm{d}\\sigma$；且 $\\left|\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma\\right| \\le \\iint_D |f|\\,\\mathrm{d}\\sigma$；\n- **估值**：在 $D$ 上 $m \\le f \\le M$ 时，$m\\sigma \\le \\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma \\le M\\sigma$。\n\n---\n\n### 〔定理〕二重积分的中值定理\n\n设 $f(x, y)$ 在有界闭区域 $D$ 上连续，$\\sigma$ 为 $D$ 的面积，则至少存在一点 $(\\xi, \\eta) \\in D$，使\n$$\\iint_D f(x, y)\\,\\mathrm{d}\\sigma = f(\\xi, \\eta)\\,\\sigma$$",
      tags: ["二重积分", "曲顶柱体", "积分区域", "二重积分的性质", "中值定理", "定义", "定理", "性质"]
    },
    {
      id: "calc-mi-cartesian",
      chapterId: "multiple-integral",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "②",
      title: "直角坐标与交换积分次序",
      md: "### 〔定义〕X 型区域与 Y 型区域\n\n- **X 型区域**：$D = \\{(x, y) \\mid a \\le x \\le b,\\ \\varphi_1(x) \\le y \\le \\varphi_2(x)\\}$，穿过 $D$ 内部且平行于 $y$ 轴的直线与 $D$ 的边界至多交于两点；\n- **Y 型区域**：$D = \\{(x, y) \\mid c \\le y \\le d,\\ \\psi_1(y) \\le x \\le \\psi_2(y)\\}$，穿过 $D$ 内部且平行于 $x$ 轴的直线与边界至多交于两点。\n\n两者都不是时，把 $D$ 分成若干个 X 型或 Y 型区域，再用区域可加性。\n\n---\n\n### 〔定理〕化二重积分为累次积分\n\n直角坐标下面积元 $\\mathrm{d}\\sigma = \\mathrm{d}x\\,\\mathrm{d}y$：\n- **X 型区域（先 $y$ 后 $x$）**：\n  $$\\iint_D f(x, y)\\,\\mathrm{d}\\sigma = \\int_a^b \\mathrm{d}x\\int_{\\varphi_1(x)}^{\\varphi_2(x)} f(x, y)\\,\\mathrm{d}y$$\n- **Y 型区域（先 $x$ 后 $y$）**：\n  $$\\iint_D f(x, y)\\,\\mathrm{d}\\sigma = \\int_c^d \\mathrm{d}y\\int_{\\psi_1(y)}^{\\psi_2(y)} f(x, y)\\,\\mathrm{d}x$$\n\n---\n\n### 〔方法〕交换积分次序\n\n1. **还原区域**：由所给累次积分的上下限写出区域 $D$ 的不等式表示；\n2. **画出区域**：画出 $D$ 的图形；\n3. **换型重写**：把 $D$ 改写为另一型区域（必要时分块），写出新的累次积分。",
      tags: ["X型区域", "Y型区域", "累次积分", "二次积分", "交换积分次序", "定义", "定理", "性质"]
    },
    {
      id: "calc-mi-polar",
      chapterId: "multiple-integral",
      type: "theorem",
      types: ["theorem", "property"],
      module: 2,
      card: "③",
      title: "极坐标与二重积分换元法",
      md: "### 〔定理〕极坐标下的二重积分\n\n令 $x = r\\cos\\theta$，$y = r\\sin\\theta$，面积元 $\\mathrm{d}\\sigma = r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta$，则\n$$\\iint_D f(x, y)\\,\\mathrm{d}\\sigma = \\iint_D f(r\\cos\\theta, r\\sin\\theta)\\,r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta$$\n\n---\n\n### 〔性质〕极坐标下化为累次积分\n\n- **极点在 $D$ 外**：$D = \\{(r, \\theta) \\mid \\alpha \\le \\theta \\le \\beta,\\ r_1(\\theta) \\le r \\le r_2(\\theta)\\}$，化为\n  $$\\int_\\alpha^\\beta \\mathrm{d}\\theta\\int_{r_1(\\theta)}^{r_2(\\theta)} f(r\\cos\\theta, r\\sin\\theta)\\,r\\,\\mathrm{d}r$$\n- **极点在 $D$ 的边界上**：$D = \\{(r, \\theta) \\mid \\alpha \\le \\theta \\le \\beta,\\ 0 \\le r \\le r(\\theta)\\}$，内层积分下限为 $0$；\n- **极点在 $D$ 内部**：$D = \\{(r, \\theta) \\mid 0 \\le \\theta \\le 2\\pi,\\ 0 \\le r \\le r(\\theta)\\}$。\n\n---\n\n### 〔定理〕二重积分的换元法\n\n设变换 $x = x(u, v)$，$y = y(u, v)$ 把 $uv$ 平面上的闭区域 $D'$ 一对一地变为 $xy$ 平面上的 $D$，$x(u, v)$、$y(u, v)$ 在 $D'$ 上有连续偏导数，且雅可比行列式\n$$J(u, v) = \\dfrac{\\partial(x, y)}{\\partial(u, v)} = \\begin{vmatrix} x_u & x_v \\\\ y_u & y_v \\end{vmatrix} \\neq 0$$\n\n则\n$$\\begin{aligned} & \\iint_D f(x, y)\\,\\mathrm{d}x\\,\\mathrm{d}y \\\\ = {} & \\iint_{D'} f[x(u, v), y(u, v)]\\,|J(u, v)|\\,\\mathrm{d}u\\,\\mathrm{d}v \\end{aligned}$$\n\n- **极坐标是特例**：$x = r\\cos\\theta$，$y = r\\sin\\theta$ 时 $J = r$。",
      tags: ["极坐标", "面积元", "雅可比行列式", "二重积分换元法", "定理", "性质"]
    },
    {
      id: "calc-mi-triple",
      chapterId: "multiple-integral",
      type: "definition",
      types: ["definition", "property"],
      module: 3,
      card: "④",
      title: "三重积分的定义与直角坐标计算",
      md: "### 〔定义〕三重积分\n\n把二重积分定义中的平面区域 $D$ 换成空间有界闭区域 $\\Omega$，面积元换成==体积元== $\\mathrm{d}v$，得到 $f(x, y, z)$ 在 $\\Omega$ 上的==三重积分==\n$$\\iiint_\\Omega f(x, y, z)\\,\\mathrm{d}v = \\lim\\limits_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i, \\eta_i, \\zeta_i)\\Delta v_i$$\n\n- **性质**：与二重积分的性质相同，其中 $\\displaystyle\\iiint_\\Omega 1\\,\\mathrm{d}v$ 等于 $\\Omega$ 的体积；\n- **物理意义**：$f \\ge 0$ 表示密度时，三重积分是物体的质量。\n\n---\n\n### 〔方法〕投影法（先一后二）\n\n若 $\\Omega = \\{(x, y, z) \\mid (x, y) \\in D_{xy},\\ z_1(x, y) \\le z \\le z_2(x, y)\\}$，其中 $D_{xy}$ 为 $\\Omega$ 在 $xOy$ 面上的投影区域，则\n$$\\iiint_\\Omega f\\,\\mathrm{d}v = \\iint_{D_{xy}} \\mathrm{d}x\\,\\mathrm{d}y\\int_{z_1(x, y)}^{z_2(x, y)} f(x, y, z)\\,\\mathrm{d}z$$\n\n---\n\n### 〔方法〕截面法（先二后一）\n\n若 $\\Omega = \\{(x, y, z) \\mid c_1 \\le z \\le c_2,\\ (x, y) \\in D_z\\}$，其中 $D_z$ 为竖坐标为 $z$ 的平面截 $\\Omega$ 所得的截面，则\n$$\\iiint_\\Omega f\\,\\mathrm{d}v = \\int_{c_1}^{c_2} \\mathrm{d}z\\iint_{D_z} f(x, y, z)\\,\\mathrm{d}x\\,\\mathrm{d}y$$",
      tags: ["三重积分", "体积元", "投影法", "先一后二", "截面法", "先二后一", "定义", "性质"]
    },
    {
      id: "calc-mi-cylindrical-spherical",
      chapterId: "multiple-integral",
      type: "definition",
      types: ["definition", "theorem"],
      module: 3,
      card: "⑤",
      title: "柱面坐标与球面坐标",
      md: "### 〔定义〕柱面坐标\n\n点 $M(x, y, z)$ 的柱面坐标 $(\\rho, \\theta, z)$ 与直角坐标的关系：\n$$\\begin{cases} x = \\rho\\cos\\theta \\\\ y = \\rho\\sin\\theta \\\\ z = z \\end{cases}$$\n\n其中 $0 \\le \\rho < +\\infty$，$0 \\le \\theta \\le 2\\pi$，$-\\infty < z < +\\infty$（即 $xOy$ 面上用极坐标）。\n\n---\n\n### 〔定理〕柱面坐标下的三重积分\n\n体积元 $\\mathrm{d}v = \\rho\\,\\mathrm{d}\\rho\\,\\mathrm{d}\\theta\\,\\mathrm{d}z$，\n$$\\iiint_\\Omega f\\,\\mathrm{d}v = \\iiint_\\Omega f(\\rho\\cos\\theta, \\rho\\sin\\theta, z)\\,\\rho\\,\\mathrm{d}\\rho\\,\\mathrm{d}\\theta\\,\\mathrm{d}z$$\n\n---\n\n### 〔定义〕球面坐标\n\n点 $M(x, y, z)$ 的球面坐标 $(r, \\varphi, \\theta)$ 与直角坐标的关系：\n$$\\begin{cases} x = r\\sin\\varphi\\cos\\theta \\\\ y = r\\sin\\varphi\\sin\\theta \\\\ z = r\\cos\\varphi \\end{cases}$$\n\n- **$r$**：点 $M$ 到原点的距离，$0 \\le r < +\\infty$；\n- **$\\varphi$**：$\\overrightarrow{OM}$ 与 $z$ 轴正向的夹角，$0 \\le \\varphi \\le \\pi$；\n- **$\\theta$**：$\\overrightarrow{OM}$ 在 $xOy$ 面上的投影与 $x$ 轴正向的夹角，$0 \\le \\theta \\le 2\\pi$。\n\n---\n\n### 〔定理〕球面坐标下的三重积分\n\n体积元 $\\mathrm{d}v = r^2\\sin\\varphi\\,\\mathrm{d}r\\,\\mathrm{d}\\varphi\\,\\mathrm{d}\\theta$，\n$$\\iiint_\\Omega f\\,\\mathrm{d}v = \\iiint_\\Omega F(r, \\varphi, \\theta)\\,r^2\\sin\\varphi\\,\\mathrm{d}r\\,\\mathrm{d}\\varphi\\,\\mathrm{d}\\theta$$\n\n其中 $F(r, \\varphi, \\theta) = f(r\\sin\\varphi\\cos\\theta,\\ r\\sin\\varphi\\sin\\theta,\\ r\\cos\\varphi)$。",
      tags: ["柱面坐标", "球面坐标", "体积元", "三重积分换元", "定义", "定理"]
    },
    {
      id: "calc-mi-symmetry",
      chapterId: "multiple-integral",
      type: "property",
      types: ["property"],
      module: 4,
      card: "⑥",
      title: "重积分的对称性",
      md: "### 〔性质〕二重积分的奇偶对称性\n\n设 $f(x, y)$ 在 $D$ 上连续：\n- **$D$ 关于 $y$ 轴对称**（$D_1$ 为 $D$ 中 $x \\ge 0$ 的部分）：\n  - $f(-x, y) = -f(x, y)$ 时，$\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma = 0$；\n  - $f(-x, y) = f(x, y)$ 时，$\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma = 2\\iint_{D_1} f\\,\\mathrm{d}\\sigma$；\n- **$D$ 关于 $x$ 轴对称**：看 $f$ 关于 $y$ 的奇偶性，结论同上；\n- **$D$ 关于原点对称**（$D_1$ 为 $D$ 的一半，且 $D$ 由 $D_1$ 与它关于原点的对称区域组成）：\n  - $f(-x, -y) = -f(x, y)$ 时，积分为 $0$；\n  - $f(-x, -y) = f(x, y)$ 时，积分为 $2\\displaystyle\\iint_{D_1} f\\,\\mathrm{d}\\sigma$。\n\n---\n\n### 〔性质〕二重积分的轮换对称性\n\n若 $D$ 关于直线 $y = x$ 对称（即把 $x, y$ 互换后 $D$ 不变），则\n$$\\begin{aligned} \\iint_D f(x, y)\\,\\mathrm{d}\\sigma &= \\iint_D f(y, x)\\,\\mathrm{d}\\sigma \\\\ &= \\dfrac{1}{2}\\iint_D [f(x, y) + f(y, x)]\\,\\mathrm{d}\\sigma \\end{aligned}$$\n\n---\n\n### 〔性质〕三重积分的对称性\n\n设 $f(x, y, z)$ 在 $\\Omega$ 上连续：\n- **奇偶对称**：若 $\\Omega$ 关于 $xOy$ 面对称（$\\Omega_1$ 为 $\\Omega$ 中 $z \\ge 0$ 的部分）：\n  - $f$ 关于 $z$ 为奇函数时，$\\displaystyle\\iiint_\\Omega f\\,\\mathrm{d}v = 0$；\n  - $f$ 关于 $z$ 为偶函数时，$\\displaystyle\\iiint_\\Omega f\\,\\mathrm{d}v = 2\\iiint_{\\Omega_1} f\\,\\mathrm{d}v$；\n  - 关于 $yOz$ 面、$zOx$ 面对称时，分别看 $f$ 关于 $x$、$y$ 的奇偶性；\n- **轮换对称**：若把 $x$ 与 $y$ 互换后 $\\Omega$ 不变，则 $\\displaystyle\\iiint_\\Omega f(x, y, z)\\,\\mathrm{d}v = \\iiint_\\Omega f(y, x, z)\\,\\mathrm{d}v$；若 $x, y, z$ 任意互换后 $\\Omega$ 都不变，则如\n  $$\\iiint_\\Omega x^2\\,\\mathrm{d}v = \\iiint_\\Omega y^2\\,\\mathrm{d}v = \\iiint_\\Omega z^2\\,\\mathrm{d}v$$",
      tags: ["对称性", "奇偶性", "轮换对称性", "二重积分", "三重积分", "性质"]
    },
    {
      id: "calc-mi-volume-area",
      chapterId: "multiple-integral",
      type: "property",
      types: ["property"],
      module: 5,
      card: "⑦",
      title: "体积与曲面面积",
      md: "### 〔性质〕立体的体积\n\n- **三重积分**：$V = \\displaystyle\\iiint_\\Omega \\mathrm{d}v$；\n- **二重积分**：$\\Omega = \\{(x, y, z) \\mid (x, y) \\in D,\\ g(x, y) \\le z \\le f(x, y)\\}$ 时，\n  $$V = \\iint_D [f(x, y) - g(x, y)]\\,\\mathrm{d}\\sigma$$\n\n---\n\n### 〔性质〕曲面的面积\n\n设曲面 $\\Sigma: z = f(x, y)$，$(x, y) \\in D_{xy}$，$f$ 有连续偏导数：\n- **曲面面积元**：\n  $$\\mathrm{d}S = \\sqrt{1 + f_x^2 + f_y^2}\\,\\mathrm{d}x\\,\\mathrm{d}y$$\n- **曲面面积**：\n  $$A = \\iint_{D_{xy}} \\sqrt{1 + f_x^2 + f_y^2}\\,\\mathrm{d}x\\,\\mathrm{d}y$$\n\n曲面为 $x = g(y, z)$ 或 $y = h(z, x)$ 时，向 $yOz$ 面或 $zOx$ 面投影，公式同理。",
      tags: ["体积", "曲顶柱体", "曲面面积", "曲面面积元", "性质"]
    },
    {
      id: "calc-mi-mass-centroid",
      chapterId: "multiple-integral",
      type: "property",
      types: ["definition", "property"],
      module: 5,
      card: "⑧",
      title: "质量、质心与转动惯量",
      md: "### 〔性质〕质量与质心\n\n- **平面薄片**（面密度 $\\mu(x, y)$，占有区域 $D$）：\n  - 质量 $M = \\displaystyle\\iint_D \\mu(x, y)\\,\\mathrm{d}\\sigma$；\n  - 质心 $\\bar{x} = \\dfrac{1}{M}\\displaystyle\\iint_D x\\,\\mu(x, y)\\,\\mathrm{d}\\sigma$，$\\bar{y} = \\dfrac{1}{M}\\displaystyle\\iint_D y\\,\\mu(x, y)\\,\\mathrm{d}\\sigma$；\n- **空间物体**（密度 $\\rho(x, y, z)$，占有区域 $\\Omega$）：\n  - 质量 $M = \\displaystyle\\iiint_\\Omega \\rho\\,\\mathrm{d}v$；\n  - 质心 $\\bar{x} = \\dfrac{1}{M}\\displaystyle\\iiint_\\Omega x\\rho\\,\\mathrm{d}v$，$\\bar{y}$、$\\bar{z}$ 同理。\n\n---\n\n### 〔定义〕形心\n\n密度为常数时的质心称为==形心==，如平面区域 $D$ 的形心 $\\bar{x} = \\dfrac{1}{\\sigma}\\displaystyle\\iint_D x\\,\\mathrm{d}\\sigma$（$\\sigma$ 为 $D$ 的面积）。\n\n---\n\n### 〔性质〕转动惯量\n\n- **平面薄片**（对 $x$ 轴、$y$ 轴、原点）：\n  - $I_x = \\displaystyle\\iint_D y^2\\mu\\,\\mathrm{d}\\sigma$，$I_y = \\displaystyle\\iint_D x^2\\mu\\,\\mathrm{d}\\sigma$；\n  - $I_O = \\displaystyle\\iint_D (x^2 + y^2)\\mu\\,\\mathrm{d}\\sigma$；\n- **空间物体**（对三坐标轴）：\n  - $I_x = \\displaystyle\\iiint_\\Omega (y^2 + z^2)\\rho\\,\\mathrm{d}v$；\n  - $I_y = \\displaystyle\\iiint_\\Omega (z^2 + x^2)\\rho\\,\\mathrm{d}v$；\n  - $I_z = \\displaystyle\\iiint_\\Omega (x^2 + y^2)\\rho\\,\\mathrm{d}v$。\n\n即被积函数为「密度 × 到轴（点）距离的平方」。\n\n---\n\n### 〔性质〕引力\n\n密度为 $\\rho(x, y, z)$ 的物体 $\\Omega$ 对位于 $P_0(x_0, y_0, z_0)$、质量为 $m$ 的质点的引力 $\\boldsymbol{F} = (F_x, F_y, F_z)$：\n$$F_x = Gm\\iiint_\\Omega \\dfrac{\\rho\\,(x - x_0)}{r^3}\\,\\mathrm{d}v$$\n\n其中 $r = \\sqrt{(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2}$；$F_y$、$F_z$ 同理（把 $x - x_0$ 换成 $y - y_0$、$z - z_0$）。",
      tags: ["质量", "质心", "形心", "转动惯量", "引力", "密度", "定义", "性质"]
    },
    {
      id: "calc-ls-line-first",
      chapterId: "line-surface-integral",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "①",
      title: "第一类曲线积分",
      md: "### 〔定义〕对弧长的曲线积分\n\n设 $L$ 为 $xOy$ 面内的光滑曲线弧，$f(x, y)$ 在 $L$ 上有界。把 $L$ 任意分成 $n$ 小段，第 $i$ 段长 $\\Delta s_i$，任取其上一点 $(\\xi_i, \\eta_i)$，若 $\\lambda = \\max \\Delta s_i \\to 0$ 时极限\n$$\\int_L f(x, y)\\,\\mathrm{d}s = \\lim\\limits_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i, \\eta_i)\\Delta s_i$$\n\n存在（与分法、取点无关），则称其为 $f(x, y)$ 在 $L$ 上==对弧长的曲线积分==（第一类曲线积分）。空间曲线 $\\Gamma$ 上的 $\\displaystyle\\int_\\Gamma f(x, y, z)\\,\\mathrm{d}s$ 同理。\n\n---\n\n### 〔性质〕第一类曲线积分的性质\n\n- **与方向无关**：$\\displaystyle\\int_{\\widehat{AB}} f\\,\\mathrm{d}s = \\int_{\\widehat{BA}} f\\,\\mathrm{d}s$；\n- **线性与可加**：与定积分相同；$L = L_1 + L_2$ 时 $\\displaystyle\\int_L = \\int_{L_1} + \\int_{L_2}$；\n- **弧长**：$\\displaystyle\\int_L 1\\,\\mathrm{d}s$ 等于 $L$ 的弧长。\n\n---\n\n### 〔方法〕化为定积分计算\n\n用弧微分（第2章卡⑪）把 $\\mathrm{d}s$ 写成参数的微分，==下限必须小于上限==：\n- **参数方程** $x = \\varphi(t)$，$y = \\psi(t)$，$\\alpha \\le t \\le \\beta$：\n  $$\\begin{aligned} & \\int_L f(x, y)\\,\\mathrm{d}s \\\\ = {} & \\int_\\alpha^\\beta f[\\varphi(t), \\psi(t)]\\sqrt{\\varphi'^2 + \\psi'^2}\\,\\mathrm{d}t \\end{aligned}$$\n- **直角坐标** $y = y(x)$，$a \\le x \\le b$：$\\mathrm{d}s = \\sqrt{1 + y'^2}\\,\\mathrm{d}x$；\n- **极坐标** $r = r(\\theta)$，$\\alpha \\le \\theta \\le \\beta$：$\\mathrm{d}s = \\sqrt{r^2 + r'^2}\\,\\mathrm{d}\\theta$；\n- **空间曲线** $x = x(t)$，$y = y(t)$，$z = z(t)$：$\\mathrm{d}s = \\sqrt{x'^2 + y'^2 + z'^2}\\,\\mathrm{d}t$。\n\n被积函数中的点在曲线上，可先用曲线方程化简被积函数。",
      tags: ["第一类曲线积分", "对弧长的曲线积分", "弧长元", "定义", "性质"]
    },
    {
      id: "calc-ls-line-second",
      chapterId: "line-surface-integral",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "②",
      title: "第二类曲线积分",
      md: "### 〔定义〕对坐标的曲线积分\n\n设 $L$ 为从 $A$ 到 $B$ 的有向光滑曲线弧，$P(x, y)$、$Q(x, y)$ 在 $L$ 上有界。按 $L$ 的方向依次取分点，记 $\\Delta x_i = x_i - x_{i-1}$，$\\Delta y_i = y_i - y_{i-1}$，若极限\n$$\\begin{aligned} & \\int_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y \\\\ = {} & \\lim\\limits_{\\lambda \\to 0} \\sum_{i=1}^{n} [P(\\xi_i, \\eta_i)\\Delta x_i + Q(\\xi_i, \\eta_i)\\Delta y_i] \\end{aligned}$$\n\n存在，则称其为==对坐标的曲线积分==（第二类曲线积分）。\n- **物理意义**：变力 $\\boldsymbol{F} = (P, Q)$ 沿 $L$ 从 $A$ 到 $B$ 所做的功。\n\n---\n\n### 〔性质〕第二类曲线积分的性质\n\n- **与方向有关**：$\\displaystyle\\int_{L^-} P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = -\\int_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y$（$L^-$ 为 $L$ 的反向曲线）；\n- **线性与可加**：与定积分相同。\n\n---\n\n### 〔方法〕化为定积分计算\n\n==下限对应起点，上限对应终点==（下限不一定小于上限）：\n- **参数方程** $x = \\varphi(t)$，$y = \\psi(t)$，$t$ 从 $\\alpha$（起点）变到 $\\beta$（终点）：\n  $$\\int_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = \\int_\\alpha^\\beta [P\\varphi'(t) + Q\\psi'(t)]\\,\\mathrm{d}t$$\n  其中 $P, Q$ 取在点 $(\\varphi(t), \\psi(t))$ 处；\n- **直角坐标** $y = y(x)$，$x$ 从 $a$ 变到 $b$：$\\displaystyle\\int_a^b \\{P[x, y(x)] + Q[x, y(x)]y'(x)\\}\\,\\mathrm{d}x$；\n- **空间曲线**：$\\displaystyle\\int_\\Gamma P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y + R\\,\\mathrm{d}z = \\int_\\alpha^\\beta (Px' + Qy' + Rz')\\,\\mathrm{d}t$。\n\n---\n\n### 〔性质〕两类曲线积分的联系\n\n设 $(\\cos\\alpha, \\cos\\beta)$ 为 $L$ 上点 $(x, y)$ 处与 $L$ 方向一致的单位切向量，则\n$$\\int_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = \\int_L (P\\cos\\alpha + Q\\cos\\beta)\\,\\mathrm{d}s$$\n\n空间曲线同理：$\\displaystyle\\int_\\Gamma P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y + R\\,\\mathrm{d}z = \\int_\\Gamma (P\\cos\\alpha + Q\\cos\\beta + R\\cos\\gamma)\\,\\mathrm{d}s$。",
      tags: ["第二类曲线积分", "对坐标的曲线积分", "有向曲线", "变力做功", "两类曲线积分的联系", "定义", "性质"]
    },
    {
      id: "calc-ls-green",
      chapterId: "line-surface-integral",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "③",
      title: "格林公式",
      md: "### 〔定义〕区域的连通性与边界正向\n\n- **单连通区域**：区域 $D$ 内任一闭曲线所围的部分都属于 $D$（没有「洞」），否则称为==复连通区域==；\n- **边界正向**：沿边界行走时，$D$ 总在==左侧==（外边界逆时针，内边界顺时针）。\n\n---\n\n### 〔定理〕格林公式\n\n设闭区域 $D$ 由分段光滑的曲线 $L$ 围成，$P(x, y)$、$Q(x, y)$ 在 $D$ 上具有一阶连续偏导数，则\n$$\\oint_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = \\iint_D \\left(\\dfrac{\\partial Q}{\\partial x} - \\dfrac{\\partial P}{\\partial y}\\right)\\mathrm{d}x\\,\\mathrm{d}y$$\n\n其中 $L$ 是 $D$ 的==取正向的边界曲线==（复连通区域时为全部边界）。\n\n---\n\n### 〔推论〕用曲线积分求面积\n\n取 $P = -y$，$Q = x$，得 $D$ 的面积\n$$A = \\dfrac{1}{2}\\oint_L x\\,\\mathrm{d}y - y\\,\\mathrm{d}x$$\n\n---\n\n### 〔方法〕补线法\n\n$L$ 不封闭时，添加辅助曲线 $L_1$ 使 $L + L_1$ 成为闭曲线：\n$$\\int_L = \\oint_{L + L_1} - \\int_{L_1}$$\n\n对 $\\displaystyle\\oint_{L + L_1}$ 用格林公式（注意它是正向还是负向）。\n\n---\n\n### 〔方法〕挖去奇点\n\n设 $L$ 为围住点 $M_0$ 的正向闭曲线，$P, Q$ 在 $M_0$ 处不满足条件（如无定义），但在其余点处有连续偏导数且 $\\dfrac{\\partial Q}{\\partial x} = \\dfrac{\\partial P}{\\partial y}$。作包含在 $L$ 内、围住 $M_0$ 的正向小闭曲线 $l$（如小圆），则\n$$\\oint_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = \\oint_l P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y$$",
      tags: ["格林公式", "单连通区域", "复连通区域", "正向边界", "补线法", "挖去奇点", "定义", "定理", "性质"]
    },
    {
      id: "calc-ls-path-independence",
      chapterId: "line-surface-integral",
      type: "theorem",
      types: ["theorem", "property"],
      module: 2,
      card: "④",
      title: "平面曲线积分与路径无关",
      md: "### 〔定理〕曲线积分与路径无关的条件\n\n设 $G$ 是==单连通区域==，$P(x, y)$、$Q(x, y)$ 在 $G$ 内具有一阶连续偏导数，则以下四条等价：\n1. **路径无关**：$\\displaystyle\\int_L P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y$ 在 $G$ 内与路径无关，只与起点、终点有关；\n2. **闭路积分为零**：沿 $G$ 内任一分段光滑闭曲线 $C$，$\\displaystyle\\oint_C P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = 0$；\n3. **偏导相等**：在 $G$ 内处处有 $\\dfrac{\\partial P}{\\partial y} = \\dfrac{\\partial Q}{\\partial x}$；\n4. **全微分**：存在 $u(x, y)$，使 $\\mathrm{d}u = P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y$，$u$ 称为 $P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y$ 的==原函数==。\n\n---\n\n### 〔方法〕求原函数\n\n条件满足时，取定点 $(x_0, y_0) \\in G$，沿折线积分：\n$$u(x, y) = \\int_{x_0}^{x} P(x, y_0)\\,\\mathrm{d}x + \\int_{y_0}^{y} Q(x, y)\\,\\mathrm{d}y$$\n\n也可先由 $u_x = P$ 对 $x$ 积分得 $u = \\displaystyle\\int P\\,\\mathrm{d}x + \\varphi(y)$，再由 $u_y = Q$ 确定 $\\varphi(y)$。\n\n---\n\n### 〔性质〕与路径无关时的计算\n\n$$\\int_{(x_1, y_1)}^{(x_2, y_2)} P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = u(x_2, y_2) - u(x_1, y_1)$$\n\n也可改走任何方便的路径（如平行于坐标轴的折线）计算。",
      tags: ["路径无关", "全微分", "原函数", "单连通区域", "定理", "性质"]
    },
    {
      id: "calc-ls-surface-first",
      chapterId: "line-surface-integral",
      type: "definition",
      types: ["definition", "property"],
      module: 3,
      card: "⑤",
      title: "第一类曲面积分",
      md: "### 〔定义〕对面积的曲面积分\n\n设 $\\Sigma$ 为光滑曲面，$f(x, y, z)$ 在 $\\Sigma$ 上有界。把 $\\Sigma$ 任意分成 $n$ 小块 $\\Delta S_i$（也表示面积），任取 $(\\xi_i, \\eta_i, \\zeta_i) \\in \\Delta S_i$，若各小块直径的最大值 $\\lambda \\to 0$ 时极限\n$$\\iint_\\Sigma f(x, y, z)\\,\\mathrm{d}S = \\lim\\limits_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i, \\eta_i, \\zeta_i)\\Delta S_i$$\n\n存在，则称其为 $f$ 在 $\\Sigma$ 上==对面积的曲面积分==（第一类曲面积分）。\n\n---\n\n### 〔性质〕第一类曲面积分的性质\n\n- **与侧无关**：积分值与曲面取哪一侧无关；\n- **线性与可加**：与重积分相同；\n- **面积**：$\\displaystyle\\iint_\\Sigma 1\\,\\mathrm{d}S$ 等于 $\\Sigma$ 的面积。\n\n---\n\n### 〔方法〕化为二重积分计算\n\n设 $\\Sigma: z = z(x, y)$，$\\Sigma$ 在 $xOy$ 面上的投影区域为 $D_{xy}$，用曲面面积元（第6章卡⑦）：\n$$\\begin{aligned} & \\iint_\\Sigma f(x, y, z)\\,\\mathrm{d}S \\\\ = {} & \\iint_{D_{xy}} f[x, y, z(x, y)]\\sqrt{1 + z_x^2 + z_y^2}\\,\\mathrm{d}x\\,\\mathrm{d}y \\end{aligned}$$\n\n- **向其他坐标面投影**：$\\Sigma$ 为 $x = x(y, z)$ 或 $y = y(z, x)$ 时，同理向 $yOz$ 面或 $zOx$ 面投影；\n- **化简**：被积函数中的点在曲面上，可先用曲面方程化简被积函数。",
      tags: ["第一类曲面积分", "对面积的曲面积分", "曲面面积元", "定义", "性质"]
    },
    {
      id: "calc-ls-surface-second",
      chapterId: "line-surface-integral",
      type: "definition",
      types: ["definition", "property"],
      module: 3,
      card: "⑥",
      title: "第二类曲面积分",
      md: "### 〔定义〕有向曲面\n\n取定了法向量指向（即取定了侧）的双侧曲面称为==有向曲面==：\n- **上侧与下侧**：$z = z(x, y)$ 的法向量与 $z$ 轴正向夹角为锐角时取上侧，为钝角时取下侧；\n- **前侧与后侧、右侧与左侧**：分别看法向量与 $x$ 轴、$y$ 轴正向的夹角；\n- **内侧与外侧**：闭曲面分内侧、外侧。\n\n---\n\n### 〔定义〕对坐标的曲面积分\n\n设 $\\Sigma$ 为有向光滑曲面，$\\boldsymbol{A} = (P, Q, R)$ 在 $\\Sigma$ 上有界，$\\boldsymbol{n} = (\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$ 为 $\\Sigma$ 上与所取侧一致的单位法向量，称\n$$\\iint_\\Sigma P\\,\\mathrm{d}y\\,\\mathrm{d}z + Q\\,\\mathrm{d}z\\,\\mathrm{d}x + R\\,\\mathrm{d}x\\,\\mathrm{d}y$$\n\n为==对坐标的曲面积分==（第二类曲面积分）。\n- **物理意义**：流速场 $\\boldsymbol{A}$ 单位时间内流向 $\\Sigma$ 指定一侧的流量（通量）。\n\n---\n\n### 〔性质〕两类曲面积分的联系\n\n$$\\begin{aligned} & \\iint_\\Sigma P\\,\\mathrm{d}y\\,\\mathrm{d}z + Q\\,\\mathrm{d}z\\,\\mathrm{d}x + R\\,\\mathrm{d}x\\,\\mathrm{d}y \\\\ = {} & \\iint_\\Sigma (P\\cos\\alpha + Q\\cos\\beta + R\\cos\\gamma)\\,\\mathrm{d}S \\end{aligned}$$\n\n- **与侧有关**：$\\displaystyle\\iint_{\\Sigma^-} = -\\iint_\\Sigma$（$\\Sigma^-$ 为 $\\Sigma$ 取相反侧）。\n\n---\n\n### 〔方法〕分面投影法\n\n以 $\\displaystyle\\iint_\\Sigma R\\,\\mathrm{d}x\\,\\mathrm{d}y$ 为例，$\\Sigma: z = z(x, y)$，投影区域 $D_{xy}$：\n$$\\iint_\\Sigma R\\,\\mathrm{d}x\\,\\mathrm{d}y = \\pm\\iint_{D_{xy}} R[x, y, z(x, y)]\\,\\mathrm{d}x\\,\\mathrm{d}y$$\n\n- **定号**：上侧取正，下侧取负；$P\\,\\mathrm{d}y\\,\\mathrm{d}z$ 向 $yOz$ 面投影，前侧取正；$Q\\,\\mathrm{d}z\\,\\mathrm{d}x$ 向 $zOx$ 面投影，右侧取正；\n- **垂直的曲面**：$\\Sigma$ 垂直于 $xOy$ 面（如母线平行于 $z$ 轴的柱面）时，$\\displaystyle\\iint_\\Sigma R\\,\\mathrm{d}x\\,\\mathrm{d}y = 0$。\n\n---\n\n### 〔方法〕合一投影法\n\n设 $\\Sigma: z = z(x, y)$，$(x, y) \\in D_{xy}$，取上侧，则三项可一起投影到 $xOy$ 面：\n$$\\begin{aligned} & \\iint_\\Sigma P\\,\\mathrm{d}y\\,\\mathrm{d}z + Q\\,\\mathrm{d}z\\,\\mathrm{d}x + R\\,\\mathrm{d}x\\,\\mathrm{d}y \\\\ = {} & \\iint_{D_{xy}} (-Pz_x - Qz_y + R)\\,\\mathrm{d}x\\,\\mathrm{d}y \\end{aligned}$$\n\n其中 $P, Q, R$ 中的 $z$ 用 $z(x, y)$ 代入；取下侧时右端加负号。",
      tags: ["第二类曲面积分", "对坐标的曲面积分", "有向曲面", "通量", "两类曲面积分的联系", "合一投影法", "定义", "性质"]
    },
    {
      id: "calc-ls-gauss",
      chapterId: "line-surface-integral",
      type: "theorem",
      types: ["definition", "theorem", "property"],
      module: 4,
      card: "⑦",
      title: "高斯公式、通量与散度",
      md: "### 〔定理〕高斯公式\n\n设空间闭区域 $\\Omega$ 由分片光滑的闭曲面 $\\Sigma$ 围成，$P, Q, R$ 在 $\\Omega$ 上具有一阶连续偏导数，则\n$$\\begin{aligned} & \\oiint_\\Sigma P\\,\\mathrm{d}y\\,\\mathrm{d}z + Q\\,\\mathrm{d}z\\,\\mathrm{d}x + R\\,\\mathrm{d}x\\,\\mathrm{d}y \\\\ = {} & \\iiint_\\Omega \\left(\\dfrac{\\partial P}{\\partial x} + \\dfrac{\\partial Q}{\\partial y} + \\dfrac{\\partial R}{\\partial z}\\right)\\mathrm{d}v \\end{aligned}$$\n\n其中 $\\Sigma$ 取==外侧==。\n\n---\n\n### 〔定义〕通量与散度\n\n设向量场 $\\boldsymbol{A} = (P, Q, R)$，$\\boldsymbol{n}$ 为有向曲面 $\\Sigma$ 上与所取侧一致的单位法向量：\n- **通量**：$\\Phi = \\displaystyle\\iint_\\Sigma \\boldsymbol{A} \\cdot \\boldsymbol{n}\\,\\mathrm{d}S$，即 $\\boldsymbol{A}$ 通过 $\\Sigma$ 指定一侧的通量；\n- **散度**：\n  $$\\operatorname{div}\\boldsymbol{A} = \\dfrac{\\partial P}{\\partial x} + \\dfrac{\\partial Q}{\\partial y} + \\dfrac{\\partial R}{\\partial z}$$\n\n高斯公式即：$\\displaystyle\\oiint_\\Sigma \\boldsymbol{A} \\cdot \\boldsymbol{n}\\,\\mathrm{d}S = \\iiint_\\Omega \\operatorname{div}\\boldsymbol{A}\\,\\mathrm{d}v$。\n\n---\n\n### 〔方法〕补面法\n\n$\\Sigma$ 不封闭时，添加辅助曲面 $\\Sigma_1$（常取平行于坐标面的平面）使 $\\Sigma + \\Sigma_1$ 封闭，并取合适的侧：\n$$\\iint_\\Sigma = \\oiint_{\\Sigma + \\Sigma_1} - \\iint_{\\Sigma_1}$$\n\n对 $\\displaystyle\\oiint_{\\Sigma + \\Sigma_1}$ 用高斯公式（取内侧时加负号）。",
      tags: ["高斯公式", "通量", "散度", "补面法", "定义", "定理", "性质"]
    },
    {
      id: "calc-ls-stokes",
      chapterId: "line-surface-integral",
      type: "theorem",
      types: ["definition", "theorem", "property"],
      module: 4,
      card: "⑧",
      title: "斯托克斯公式、环流量与旋度",
      md: "### 〔定理〕斯托克斯公式\n\n设 $\\Gamma$ 为分段光滑的空间有向闭曲线，$\\Sigma$ 是以 $\\Gamma$ 为边界的分片光滑有向曲面，$\\Gamma$ 的正向与 $\\Sigma$ 的侧符合==右手法则==，$P, Q, R$ 在包含 $\\Sigma$ 的空间区域内具有一阶连续偏导数，则\n$$\\begin{aligned} & \\oint_\\Gamma P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y + R\\,\\mathrm{d}z \\\\ = {} & \\iint_\\Sigma \\begin{vmatrix} \\mathrm{d}y\\,\\mathrm{d}z & \\mathrm{d}z\\,\\mathrm{d}x & \\mathrm{d}x\\,\\mathrm{d}y \\\\ \\dfrac{\\partial}{\\partial x} & \\dfrac{\\partial}{\\partial y} & \\dfrac{\\partial}{\\partial z} \\\\ P & Q & R \\end{vmatrix} \\end{aligned}$$\n\n- **展开式**：右端 $= \\displaystyle\\iint_\\Sigma (R_y - Q_z)\\,\\mathrm{d}y\\,\\mathrm{d}z + (P_z - R_x)\\,\\mathrm{d}z\\,\\mathrm{d}x + (Q_x - P_y)\\,\\mathrm{d}x\\,\\mathrm{d}y$；\n- **第一类形式**：把行列式第一行换成 $\\cos\\alpha, \\cos\\beta, \\cos\\gamma$，并乘 $\\mathrm{d}S$。\n\n---\n\n### 〔定义〕环流量与旋度\n\n设向量场 $\\boldsymbol{A} = (P, Q, R)$：\n- **环流量**：$\\displaystyle\\oint_\\Gamma P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y + R\\,\\mathrm{d}z$ 称为 $\\boldsymbol{A}$ 沿有向闭曲线 $\\Gamma$ 的==环流量==；\n- **旋度**：\n  $$\\operatorname{rot}\\boldsymbol{A} = \\begin{vmatrix} \\boldsymbol{i} & \\boldsymbol{j} & \\boldsymbol{k} \\\\ \\dfrac{\\partial}{\\partial x} & \\dfrac{\\partial}{\\partial y} & \\dfrac{\\partial}{\\partial z} \\\\ P & Q & R \\end{vmatrix}$$\n  即 $\\operatorname{rot}\\boldsymbol{A} = (R_y - Q_z,\\ P_z - R_x,\\ Q_x - P_y)$。\n\n斯托克斯公式即：环流量 $= \\displaystyle\\iint_\\Sigma \\operatorname{rot}\\boldsymbol{A} \\cdot \\boldsymbol{n}\\,\\mathrm{d}S$。\n\n---\n\n### 〔性质〕梯度、散度、旋度的关系\n\n设函数具有二阶连续偏导数，则：\n- **梯度无旋**：$\\operatorname{rot}(\\operatorname{grad} u) = \\boldsymbol{0}$；\n- **旋度无源**：$\\operatorname{div}(\\operatorname{rot}\\boldsymbol{A}) = 0$。\n\n梯度的定义见第5章卡⑥。",
      tags: ["斯托克斯公式", "环流量", "旋度", "右手法则", "定义", "定理", "性质"]
    },
    {
      id: "calc-ls-symmetry-applications",
      chapterId: "line-surface-integral",
      type: "property",
      types: ["property"],
      module: 5,
      card: "⑨",
      title: "对称性与物理应用",
      md: "### 〔性质〕第一类曲线积分、曲面积分的对称性\n\n与重积分的对称性（第6章卡⑥）相同：\n- **奇偶对称**：如 $L$ 关于 $y$ 轴对称，$f$ 关于 $x$ 为奇函数时 $\\displaystyle\\int_L f\\,\\mathrm{d}s = 0$，为偶函数时等于右半部分上积分的 $2$ 倍；曲面积分同理；\n- **轮换对称**：曲线（曲面）的方程在 $x, y$ 互换后不变时，被积函数中 $x, y$ 可互换，例如在球面 $x^2 + y^2 + z^2 = R^2$ 上\n  $$\\oiint_\\Sigma x^2\\,\\mathrm{d}S = \\oiint_\\Sigma y^2\\,\\mathrm{d}S = \\oiint_\\Sigma z^2\\,\\mathrm{d}S$$\n  三者都等于 $\\dfrac{1}{3}\\displaystyle\\oiint_\\Sigma R^2\\,\\mathrm{d}S$。\n\n---\n\n### 〔性质〕第二类曲面积分的对称性\n\n设 $\\Sigma$ 关于 $xOy$ 面对称，且对称的两部分所取的侧相反（如闭曲面的外侧），$\\Sigma_1$ 为 $z \\ge 0$ 的部分：\n- **$R$ 关于 $z$ 为偶函数**：$\\displaystyle\\iint_\\Sigma R\\,\\mathrm{d}x\\,\\mathrm{d}y = 0$；\n- **$R$ 关于 $z$ 为奇函数**：$\\displaystyle\\iint_\\Sigma R\\,\\mathrm{d}x\\,\\mathrm{d}y = 2\\iint_{\\Sigma_1} R\\,\\mathrm{d}x\\,\\mathrm{d}y$。\n\n结论与第一类（奇零偶倍）==正好相反==；$P\\,\\mathrm{d}y\\,\\mathrm{d}z$、$Q\\,\\mathrm{d}z\\,\\mathrm{d}x$ 分别对 $yOz$ 面、$zOx$ 面同理。\n\n---\n\n### 〔性质〕曲线、曲面构件的质量、质心与转动惯量\n\n公式与第6章卡⑧相同，只需把 $\\mathrm{d}\\sigma$、$\\mathrm{d}v$ 换成弧长元 $\\mathrm{d}s$ 或曲面面积元 $\\mathrm{d}S$：\n- **曲线构件**（线密度 $\\rho$）：$M = \\displaystyle\\int_\\Gamma \\rho\\,\\mathrm{d}s$，$\\bar{x} = \\dfrac{1}{M}\\displaystyle\\int_\\Gamma x\\rho\\,\\mathrm{d}s$，$I_z = \\displaystyle\\int_\\Gamma (x^2 + y^2)\\rho\\,\\mathrm{d}s$；\n- **曲面构件**（面密度 $\\rho$）：$M = \\displaystyle\\iint_\\Sigma \\rho\\,\\mathrm{d}S$，$\\bar{x} = \\dfrac{1}{M}\\displaystyle\\iint_\\Sigma x\\rho\\,\\mathrm{d}S$，$I_z = \\displaystyle\\iint_\\Sigma (x^2 + y^2)\\rho\\,\\mathrm{d}S$。",
      tags: ["对称性", "轮换对称性", "曲线构件", "曲面构件", "质量", "质心", "转动惯量", "性质"]
    },
    {
      id: "calc-ser-convergence",
      chapterId: "series",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 1,
      card: "①",
      title: "级数的收敛与基本性质",
      md: "### 〔定义〕级数的收敛与发散\n\n设数列 $\\{u_n\\}$，称 $\\displaystyle\\sum_{n=1}^{\\infty} u_n = u_1 + u_2 + \\cdots + u_n + \\cdots$ 为（常数项）==级数==，$S_n = u_1 + u_2 + \\cdots + u_n$ 称为它的==部分和==：\n- **收敛**：若 $\\lim\\limits_{n \\to \\infty} S_n = S$ 存在，称级数收敛，$S$ 称为级数的和；\n- **发散**：若 $\\lim\\limits_{n \\to \\infty} S_n$ 不存在，称级数发散；\n- **余项**：收敛时 $r_n = S - S_n = u_{n+1} + u_{n+2} + \\cdots$，且 $\\lim\\limits_{n \\to \\infty} r_n = 0$。\n\n---\n\n### 〔性质〕收敛级数的基本性质\n\n1. **数乘**：级数各项乘以非零常数 $k$，敛散性不变；收敛时 $\\displaystyle\\sum ku_n = k\\sum u_n$；\n2. **加减**：若 $\\displaystyle\\sum u_n = S$，$\\displaystyle\\sum v_n = \\sigma$，则 $\\displaystyle\\sum (u_n \\pm v_n) = S \\pm \\sigma$；\n3. **有限项**：去掉、加上或改变有限项，不改变级数的敛散性（收敛时和可能改变）；\n4. **加括号**：收敛级数任意加括号后所成的级数仍收敛，且和不变；\n   - 推论：加括号后的级数发散，则原级数发散。\n\n---\n\n### 〔定理〕级数收敛的必要条件\n\n$$\\sum_{n=1}^{\\infty} u_n \\text{ 收敛} \\implies \\lim\\limits_{n \\to \\infty} u_n = 0$$\n\n- **逆否**：若 $\\lim\\limits_{n \\to \\infty} u_n \\neq 0$ 或不存在，则级数==发散==。\n\n---\n\n### 〔性质〕等比级数\n\n$$\\sum_{n=0}^{\\infty} aq^n = a + aq + aq^2 + \\cdots \\quad (a \\neq 0)$$\n\n- **$|q| < 1$**：收敛，和为 $\\dfrac{a}{1 - q}$；\n- **$|q| \\ge 1$**：发散。\n\n---\n\n### 〔提示〕\n\n- 必要条件不是充分条件：调和级数 $\\displaystyle\\sum_{n=1}^{\\infty} \\dfrac{1}{n}$ 的一般项趋于零，但发散。\n- 加括号后收敛，原级数未必收敛：$(1 - 1) + (1 - 1) + \\cdots$ 收敛，而 $1 - 1 + 1 - 1 + \\cdots$ 发散。",
      tags: ["常数项级数", "部分和", "收敛", "发散", "余项", "必要条件", "等比级数", "定义", "定理", "性质"]
    },
    {
      id: "calc-ser-positive",
      chapterId: "series",
      type: "theorem",
      types: ["theorem", "property"],
      module: 2,
      card: "②",
      title: "正项级数的判别法",
      md: "### 〔定理〕正项级数收敛的充要条件\n\n各项 $u_n \\ge 0$ 的级数称为==正项级数==，其部分和数列单调增加，故\n$$\\sum_{n=1}^{\\infty} u_n \\text{ 收敛} \\iff \\{S_n\\} \\text{ 有界}$$\n\n---\n\n### 〔性质〕$p$ 级数\n\n$$\\sum_{n=1}^{\\infty} \\dfrac{1}{n^p}$$\n\n- **$p > 1$**：收敛；\n- **$p \\le 1$**：发散（$p = 1$ 时为调和级数）。\n\n---\n\n### 〔定理〕比较判别法\n\n设 $\\displaystyle\\sum u_n$、$\\displaystyle\\sum v_n$ 都是正项级数，且从某项起 $u_n \\le v_n$：\n- **大的收敛，小的收敛**：$\\displaystyle\\sum v_n$ 收敛 $\\implies \\sum u_n$ 收敛；\n- **小的发散，大的发散**：$\\displaystyle\\sum u_n$ 发散 $\\implies \\sum v_n$ 发散。\n\n---\n\n### 〔定理〕比较判别法的极限形式\n\n设 $\\displaystyle\\sum u_n$、$\\displaystyle\\sum v_n$ 都是正项级数（$v_n > 0$），$\\lim\\limits_{n \\to \\infty} \\dfrac{u_n}{v_n} = l$：\n- **$0 < l < +\\infty$**：两级数==同敛散==；\n- **$l = 0$**：$\\displaystyle\\sum v_n$ 收敛 $\\implies \\sum u_n$ 收敛；\n- **$l = +\\infty$**：$\\displaystyle\\sum v_n$ 发散 $\\implies \\sum u_n$ 发散。\n\n---\n\n### 〔定理〕比值判别法（达朗贝尔判别法）\n\n设 $\\displaystyle\\sum u_n$ 为正项级数（$u_n > 0$），$\\lim\\limits_{n \\to \\infty} \\dfrac{u_{n+1}}{u_n} = \\rho$：\n- **$\\rho < 1$**：收敛；\n- **$\\rho > 1$（或 $\\rho = +\\infty$）**：发散；\n- **$\\rho = 1$**：不能判定。\n\n---\n\n### 〔定理〕根值判别法（柯西判别法）\n\n设 $\\displaystyle\\sum u_n$ 为正项级数，$\\lim\\limits_{n \\to \\infty} \\sqrt[n]{u_n} = \\rho$，则 $\\rho < 1$ 时收敛，$\\rho > 1$（或 $\\rho = +\\infty$）时发散，$\\rho = 1$ 时不能判定。",
      tags: ["正项级数", "p级数", "比较判别法", "比值判别法", "根值判别法", "定理", "性质"]
    },
    {
      id: "calc-ser-alternating-absolute",
      chapterId: "series",
      type: "theorem",
      types: ["definition", "theorem", "property"],
      module: 3,
      card: "③",
      title: "交错级数与绝对收敛",
      md: "### 〔定理〕莱布尼茨判别法\n\n设交错级数 $\\displaystyle\\sum_{n=1}^{\\infty} (-1)^{n-1}u_n$（$u_n > 0$）满足：\n1. **单调不增**：$u_n \\ge u_{n+1}$（$n = 1, 2, \\cdots$）；\n2. **趋于零**：$\\lim\\limits_{n \\to \\infty} u_n = 0$；\n\n则该级数收敛，其和 $S \\le u_1$，余项 $|r_n| \\le u_{n+1}$。\n\n---\n\n### 〔定义〕绝对收敛与条件收敛\n\n对任意项级数 $\\displaystyle\\sum u_n$：\n- **绝对收敛**：$\\displaystyle\\sum |u_n|$ 收敛；\n- **条件收敛**：$\\displaystyle\\sum u_n$ 收敛，而 $\\displaystyle\\sum |u_n|$ 发散。\n\n---\n\n### 〔定理〕绝对收敛与收敛的关系\n\n- **绝对收敛必收敛**：若 $\\displaystyle\\sum |u_n|$ 收敛，则 $\\displaystyle\\sum u_n$ 收敛；\n- **比值、根值法判出发散**：若用比值法或根值法判定 $\\displaystyle\\sum |u_n|$ 的 $\\rho > 1$，则 $u_n \\not\\to 0$，$\\displaystyle\\sum u_n$ 发散。\n\n---\n\n### 〔性质〕绝对收敛级数的性质\n\n- **重排不变**：绝对收敛级数任意交换各项次序后仍绝对收敛，且和不变；\n- **乘积**：两个绝对收敛级数 $\\displaystyle\\sum u_n = S$、$\\displaystyle\\sum v_n = \\sigma$ 的柯西乘积也绝对收敛，且和为 $S\\sigma$。\n\n---\n\n### 〔提示〕\n\n- 条件收敛级数重排后，可以收敛到任意指定的数，也可以发散（黎曼定理）。",
      tags: ["交错级数", "莱布尼茨判别法", "绝对收敛", "条件收敛", "任意项级数", "定义", "定理", "性质"]
    },
    {
      id: "calc-ser-power-domain",
      chapterId: "series",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 4,
      card: "④",
      title: "幂级数的收敛域",
      md: "### 〔定义〕函数项级数与和函数\n\n设 $u_n(x)$ 都在区间 $I$ 上有定义，称 $\\displaystyle\\sum_{n=1}^{\\infty} u_n(x)$ 为==函数项级数==：\n- **收敛域**：使它收敛的点 $x$ 的全体；\n- **和函数**：在收敛域上，$S(x) = \\displaystyle\\sum_{n=1}^{\\infty} u_n(x)$。\n\n---\n\n### 〔定义〕幂级数\n\n形如\n$$\\sum_{n=0}^{\\infty} a_n(x - x_0)^n$$\n\n即 $a_0 + a_1(x - x_0) + a_2(x - x_0)^2 + \\cdots$ 的函数项级数称为==幂级数==；令 $t = x - x_0$ 可化为 $\\displaystyle\\sum a_n t^n$ 的形式，以下以 $x_0 = 0$ 叙述。\n\n---\n\n### 〔定理〕阿贝尔定理\n\n- **收敛点向内**：若 $\\displaystyle\\sum a_n x^n$ 在 $x = x_0\\ (x_0 \\neq 0)$ 处收敛，则当 $|x| < |x_0|$ 时它==绝对收敛==；\n- **发散点向外**：若它在 $x = x_0$ 处发散，则当 $|x| > |x_0|$ 时它发散。\n\n---\n\n### 〔定义〕收敛半径、收敛区间与收敛域\n\n由阿贝尔定理，存在 $R$（$0 \\le R \\le +\\infty$），使：\n- **$|x| < R$**：幂级数绝对收敛；\n- **$|x| > R$**：幂级数发散；\n- **$x = \\pm R$**：可能收敛也可能发散。\n\n$R$ 称为==收敛半径==，$(-R, R)$ 称为==收敛区间==，收敛区间加上收敛的端点称为==收敛域==。\n\n---\n\n### 〔定理〕收敛半径的求法\n\n若 $\\lim\\limits_{n \\to \\infty} \\left|\\dfrac{a_{n+1}}{a_n}\\right| = \\rho$（或 $\\lim\\limits_{n \\to \\infty} \\sqrt[n]{|a_n|} = \\rho$），则\n$$R = \\begin{cases} \\dfrac{1}{\\rho}, & 0 < \\rho < +\\infty \\\\ +\\infty, & \\rho = 0 \\\\ 0, & \\rho = +\\infty \\end{cases}$$\n\n---\n\n### 〔方法〕缺项幂级数的收敛半径\n\n对 $\\displaystyle\\sum a_n x^{2n}$ 这类缺项的级数，不能直接用上面的公式，而是对通项 $u_n(x)$ 用比值法：\n1. **求极限**：$\\lim\\limits_{n \\to \\infty} \\left|\\dfrac{u_{n+1}(x)}{u_n(x)}\\right| = \\rho(x)$；\n2. **定范围**：由 $\\rho(x) < 1$ 解出 $x$ 的范围，得收敛区间；端点另行判断。",
      tags: ["函数项级数", "和函数", "幂级数", "阿贝尔定理", "收敛半径", "收敛区间", "收敛域", "定义", "定理", "性质"]
    },
    {
      id: "calc-ser-power-sum",
      chapterId: "series",
      type: "property",
      types: ["property"],
      module: 4,
      card: "⑤",
      title: "幂级数的运算与和函数",
      md: "### 〔性质〕幂级数的四则运算\n\n设 $\\displaystyle\\sum a_n x^n$、$\\displaystyle\\sum b_n x^n$ 的收敛半径分别为 $R_1$、$R_2$，则在 $|x| < R = \\min\\{R_1, R_2\\}$ 内：\n- **加减**：$\\displaystyle\\sum a_n x^n \\pm \\sum b_n x^n = \\sum (a_n \\pm b_n)x^n$；\n- **乘积**：$\\left(\\displaystyle\\sum a_n x^n\\right)\\left(\\displaystyle\\sum b_n x^n\\right) = \\displaystyle\\sum_{n=0}^{\\infty} c_n x^n$，$c_n = a_0 b_n + a_1 b_{n-1} + \\cdots + a_n b_0$。\n\n---\n\n### 〔性质〕和函数的分析性质\n\n设 $\\displaystyle\\sum a_n x^n$ 的收敛半径 $R > 0$，和函数为 $S(x)$：\n- **连续**：$S(x)$ 在收敛域上连续；\n- **逐项求导**：在 $(-R, R)$ 内 $S'(x) = \\displaystyle\\sum_{n=1}^{\\infty} na_n x^{n-1}$；\n- **逐项积分**：在 $(-R, R)$ 内 $\\displaystyle\\int_0^x S(t)\\,\\mathrm{d}t = \\sum_{n=0}^{\\infty} \\dfrac{a_n}{n + 1}x^{n+1}$；\n- **半径不变**：逐项求导、逐项积分后收敛半径仍为 $R$，但端点处的敛散性可能改变。\n\n---\n\n### 〔方法〕求幂级数的和函数\n\n1. **求收敛域**；\n2. **化为已知级数**：通过逐项求导、逐项积分、提出或乘以 $x$ 的幂、拆项等，化为已知和的级数（如 $\\displaystyle\\sum_{n=0}^{\\infty} x^n = \\dfrac{1}{1 - x}$，$|x| < 1$）；\n3. **还原**：对所得结果作相反的运算（积分或求导），注意用 $S(0)$ 确定积分常数；\n4. **注明范围**：写出和函数成立的区间（端点处用连续性）。",
      tags: ["幂级数的运算", "和函数", "逐项求导", "逐项积分", "性质"]
    },
    {
      id: "calc-ser-taylor-expansion",
      chapterId: "series",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 4,
      card: "⑥",
      title: "函数展开成幂级数",
      md: "### 〔定义〕泰勒级数\n\n设 $f(x)$ 在 $x_0$ 的某邻域内具有任意阶导数，称\n$$\\sum_{n=0}^{\\infty} \\dfrac{f^{(n)}(x_0)}{n!}(x - x_0)^n$$\n\n为 $f(x)$ 在 $x_0$ 处的==泰勒级数==；$x_0 = 0$ 时称为==麦克劳林级数==。\n\n---\n\n### 〔定理〕展开成泰勒级数的充要条件\n\n设 $f(x)$ 在 $x_0$ 的某邻域 $U(x_0)$ 内具有任意阶导数，则 $f(x)$ 在 $U(x_0)$ 内能展开成泰勒级数 $\\iff$ 在 $U(x_0)$ 内其泰勒公式的余项满足\n$$\\lim\\limits_{n \\to \\infty} R_n(x) = 0$$\n\n---\n\n### 〔定理〕展开式的唯一性\n\n若 $f(x)$ 在 $x_0$ 的某邻域内能展开成 $x - x_0$ 的幂级数，则展开式==唯一==，就是 $f(x)$ 的泰勒级数。\n\n---\n\n### 〔性质〕常用函数的麦克劳林展开式\n\n有限项形式见第2章卡⑦，这里是级数形式与成立范围：\n- $e^x = \\displaystyle\\sum_{n=0}^{\\infty} \\dfrac{x^n}{n!}$，$x \\in (-\\infty, +\\infty)$；\n- $\\sin x = \\displaystyle\\sum_{n=0}^{\\infty} \\dfrac{(-1)^n x^{2n+1}}{(2n+1)!}$，$\\cos x = \\displaystyle\\sum_{n=0}^{\\infty} \\dfrac{(-1)^n x^{2n}}{(2n)!}$，$x \\in (-\\infty, +\\infty)$；\n- $\\dfrac{1}{1 - x} = \\displaystyle\\sum_{n=0}^{\\infty} x^n$，$\\dfrac{1}{1 + x} = \\displaystyle\\sum_{n=0}^{\\infty} (-1)^n x^n$，$x \\in (-1, 1)$；\n- $\\ln(1 + x) = \\displaystyle\\sum_{n=1}^{\\infty} \\dfrac{(-1)^{n-1}x^n}{n}$，$x \\in (-1, 1]$；\n- $\\arctan x = \\displaystyle\\sum_{n=0}^{\\infty} \\dfrac{(-1)^n x^{2n+1}}{2n+1}$，$x \\in [-1, 1]$；\n- $(1 + x)^\\alpha = 1 + \\displaystyle\\sum_{n=1}^{\\infty} \\dfrac{\\alpha(\\alpha - 1)\\cdots(\\alpha - n + 1)}{n!}x^n$，$x \\in (-1, 1)$（端点处的敛散性依 $\\alpha$ 而定）。\n\n---\n\n### 〔方法〕间接展开法\n\n利用已知展开式，通过变量代换（如把 $x$ 换成 $-x^2$）、四则运算、逐项求导、逐项积分得到所求展开式，并写出成立的范围。",
      tags: ["泰勒级数", "麦克劳林级数", "展开的充要条件", "常用展开式", "间接展开法", "定义", "定理", "性质"]
    },
    {
      id: "calc-ser-fourier",
      chapterId: "series",
      type: "property",
      types: ["definition", "theorem", "property"],
      module: 5,
      card: "⑦",
      title: "傅里叶级数与收敛定理",
      md: "### 〔性质〕三角函数系的正交性\n\n三角函数系 $1$，$\\cos x$，$\\sin x$，$\\cos 2x$，$\\sin 2x$，$\\cdots$，$\\cos nx$，$\\sin nx$，$\\cdots$ 中任意两个不同函数的乘积在 $[-\\pi, \\pi]$ 上的积分都为零，如\n$$\\int_{-\\pi}^{\\pi} \\cos kx\\cos nx\\,\\mathrm{d}x = 0 \\quad (k \\neq n)$$\n$$\\int_{-\\pi}^{\\pi} \\sin kx\\cos nx\\,\\mathrm{d}x = 0$$\n\n---\n\n### 〔定义〕傅里叶系数与傅里叶级数\n\n设 $f(x)$ 以 $2\\pi$ 为周期，在 $[-\\pi, \\pi]$ 上可积：\n- **傅里叶系数**：\n  $$a_n = \\dfrac{1}{\\pi}\\int_{-\\pi}^{\\pi} f(x)\\cos nx\\,\\mathrm{d}x \\ \\ (n = 0, 1, 2, \\cdots)$$\n  $$b_n = \\dfrac{1}{\\pi}\\int_{-\\pi}^{\\pi} f(x)\\sin nx\\,\\mathrm{d}x \\ \\ (n = 1, 2, \\cdots)$$\n- **傅里叶级数**：\n  $$\\dfrac{a_0}{2} + \\sum_{n=1}^{\\infty} (a_n\\cos nx + b_n\\sin nx)$$\n\n---\n\n### 〔定理〕狄利克雷收敛定理\n\n设 $f(x)$ 以 $2\\pi$ 为周期，且在一个周期内：\n1. **连续或只有有限个第一类间断点**；\n2. **至多只有有限个极值点**；\n\n则 $f(x)$ 的傅里叶级数收敛，且：\n- **连续点**：收敛于 $f(x)$；\n- **间断点**：收敛于 $\\dfrac{f(x^-) + f(x^+)}{2}$。",
      tags: ["三角函数系", "正交性", "傅里叶系数", "傅里叶级数", "狄利克雷收敛定理", "定义", "定理", "性质"]
    },
    {
      id: "calc-ser-sine-cosine",
      chapterId: "series",
      type: "property",
      types: ["property"],
      module: 5,
      card: "⑧",
      title: "正弦级数、余弦级数与一般周期",
      md: "### 〔性质〕奇函数与偶函数的傅里叶级数\n\n设 $f(x)$ 以 $2\\pi$ 为周期：\n- **奇函数**：$a_n = 0$，$b_n = \\dfrac{2}{\\pi}\\displaystyle\\int_0^{\\pi} f(x)\\sin nx\\,\\mathrm{d}x$，傅里叶级数为==正弦级数== $\\displaystyle\\sum_{n=1}^{\\infty} b_n\\sin nx$；\n- **偶函数**：$b_n = 0$，$a_n = \\dfrac{2}{\\pi}\\displaystyle\\int_0^{\\pi} f(x)\\cos nx\\,\\mathrm{d}x$，傅里叶级数为==余弦级数== $\\dfrac{a_0}{2} + \\displaystyle\\sum_{n=1}^{\\infty} a_n\\cos nx$。\n\n---\n\n### 〔方法〕$[0, \\pi]$ 上的函数展开成正弦或余弦级数\n\n1. **延拓**：\n   - 展开成正弦级数：作==奇延拓==，得 $(-\\pi, \\pi]$ 上的奇函数；\n   - 展开成余弦级数：作==偶延拓==，得 $[-\\pi, \\pi]$ 上的偶函数；\n2. **求系数**：按上面奇、偶函数的公式计算 $b_n$ 或 $a_n$；\n3. **定收敛范围**：用狄利克雷收敛定理确定级数在 $[0, \\pi]$ 上各点的和，如正弦级数在 $x = 0$、$x = \\pi$ 处收敛于 $0$。\n\n---\n\n### 〔性质〕周期为 $2l$ 的傅里叶级数\n\n设 $f(x)$ 以 $2l$ 为周期，满足收敛定理的条件，则\n$$f(x) \\sim \\dfrac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left(a_n\\cos\\dfrac{n\\pi x}{l} + b_n\\sin\\dfrac{n\\pi x}{l}\\right)$$\n\n其中\n$$a_n = \\dfrac{1}{l}\\int_{-l}^{l} f(x)\\cos\\dfrac{n\\pi x}{l}\\,\\mathrm{d}x \\ \\ (n = 0, 1, 2, \\cdots)$$\n$$b_n = \\dfrac{1}{l}\\int_{-l}^{l} f(x)\\sin\\dfrac{n\\pi x}{l}\\,\\mathrm{d}x \\ \\ (n = 1, 2, \\cdots)$$\n\n收敛情况与周期 $2\\pi$ 时相同；$[0, l]$ 上的函数同样可作奇、偶延拓，系数为 $\\dfrac{2}{l}\\displaystyle\\int_0^l$ 的形式。",
      tags: ["正弦级数", "余弦级数", "奇延拓", "偶延拓", "周期为2l的傅里叶级数", "性质"]
    },
    {
      id: "calc-ode-concepts",
      chapterId: "ode",
      type: "definition",
      types: ["definition", "theorem"],
      module: 1,
      card: "①",
      title: "微分方程的基本概念",
      md: "### 〔定义〕微分方程及其解\n\n- **微分方程**：含有未知函数的导数（或微分）的方程；未知函数是一元函数时称为常微分方程；\n- **阶**：方程中未知函数的最高阶导数的阶数；\n- **解**：代入方程后使其成为恒等式的函数；\n- **通解**：含有独立的任意常数、且任意常数的个数==等于方程的阶数==的解；\n- **特解**：确定了通解中任意常数后得到的解。\n\n---\n\n### 〔定义〕初值问题\n\n用来确定通解中任意常数的条件称为==初始条件==，如 $y\\big|_{x = x_0} = y_0$，$y'\\big|_{x = x_0} = y_1$；求微分方程满足初始条件的特解的问题称为==初值问题==。\n\n---\n\n### 〔定理〕一阶方程解的存在唯一性\n\n设 $f(x, y)$ 及 $\\dfrac{\\partial f}{\\partial y}$ 在矩形区域 $|x - x_0| \\le a$，$|y - y_0| \\le b$ 上连续，则初值问题\n$$y' = f(x, y), \\quad y(x_0) = y_0$$\n\n在 $x_0$ 的某邻域内存在唯一解。",
      tags: ["微分方程", "阶", "解", "通解", "特解", "初值问题", "存在唯一性定理", "定义", "定理"]
    },
    {
      id: "calc-ode-separable-homogeneous",
      chapterId: "ode",
      type: "property",
      types: ["property"],
      module: 2,
      card: "②",
      title: "可分离变量方程与齐次方程",
      md: "### 〔方法〕可分离变量的方程\n\n方程 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = f(x)g(y)$：\n1. **分离变量**：$g(y) \\neq 0$ 时，$\\dfrac{\\mathrm{d}y}{g(y)} = f(x)\\,\\mathrm{d}x$；\n2. **两边积分**：$\\displaystyle\\int \\dfrac{\\mathrm{d}y}{g(y)} = \\int f(x)\\,\\mathrm{d}x + C$，得隐式通解；\n3. **补常数解**：若 $g(y_0) = 0$，则 $y = y_0$ 也是方程的解。\n\n---\n\n### 〔方法〕齐次方程\n\n方程 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = \\varphi\\left(\\dfrac{y}{x}\\right)$：\n1. **换元**：令 $u = \\dfrac{y}{x}$，即 $y = ux$，则 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = u + x\\dfrac{\\mathrm{d}u}{\\mathrm{d}x}$；\n2. **化为可分离**：代入得\n   $$x\\dfrac{\\mathrm{d}u}{\\mathrm{d}x} = \\varphi(u) - u$$\n3. **求解代回**：分离变量求出 $u$ 后，以 $\\dfrac{y}{x}$ 代 $u$。\n\n---\n\n### 〔方法〕可化为可分离变量的方程\n\n方程 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = f(ax + by + c)$（$b \\neq 0$）：令 $u = ax + by + c$，则 $\\dfrac{\\mathrm{d}u}{\\mathrm{d}x} = a + bf(u)$，为可分离变量方程。",
      tags: ["可分离变量方程", "分离变量法", "齐次方程", "变量代换", "性质"]
    },
    {
      id: "calc-ode-linear-first",
      chapterId: "ode",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "③",
      title: "一阶线性方程与伯努利方程",
      md: "### 〔定义〕一阶线性微分方程\n\n$$\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} + P(x)y = Q(x)$$\n\n- **齐次**：$Q(x) \\equiv 0$；\n- **非齐次**：$Q(x) \\not\\equiv 0$。\n\n---\n\n### 〔定理〕一阶线性方程的通解公式\n\n- **齐次方程**：$y = Ce^{-\\int P(x)\\,\\mathrm{d}x}$；\n- **非齐次方程**：\n  $$y = e^{-\\int P(x)\\,\\mathrm{d}x}\\left[\\int Q(x)e^{\\int P(x)\\,\\mathrm{d}x}\\,\\mathrm{d}x + C\\right]$$\n\n公式中的不定积分都只取一个原函数。\n\n---\n\n### 〔方法〕常数变易法\n\n1. **求齐次通解**：$y = Ce^{-\\int P(x)\\,\\mathrm{d}x}$；\n2. **常数变易**：设非齐次方程的解为 $y = C(x)e^{-\\int P(x)\\,\\mathrm{d}x}$；\n3. **代入求 $C(x)$**：代入原方程得 $C'(x) = Q(x)e^{\\int P(x)\\,\\mathrm{d}x}$，积分即得。\n\n---\n\n### 〔方法〕伯努利方程\n\n方程 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} + P(x)y = Q(x)y^n$（$n \\neq 0, 1$）：\n1. **换元**：两边除以 $y^n$，令 $z = y^{1-n}$；\n2. **化为线性**：得一阶线性方程\n   $$\\dfrac{\\mathrm{d}z}{\\mathrm{d}x} + (1 - n)P(x)z = (1 - n)Q(x)$$\n3. **求解代回**：用通解公式求出 $z$，再以 $y^{1-n}$ 代 $z$。",
      tags: ["一阶线性微分方程", "通解公式", "常数变易法", "伯努利方程", "定义", "定理", "性质"]
    },
    {
      id: "calc-ode-exact",
      chapterId: "ode",
      type: "definition",
      types: ["definition", "theorem"],
      module: 2,
      card: "④",
      title: "全微分方程",
      md: "### 〔定义〕全微分方程\n\n若方程 $P(x, y)\\,\\mathrm{d}x + Q(x, y)\\,\\mathrm{d}y = 0$ 的左端恰是某函数 $u(x, y)$ 的全微分，即 $\\mathrm{d}u = P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y$，则称它为==全微分方程==，其通解为\n$$u(x, y) = C$$\n\n---\n\n### 〔定理〕全微分方程的判别\n\n设 $P, Q$ 在单连通区域 $G$ 内具有一阶连续偏导数，则\n$P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y = 0$ 是全微分方程 $\\iff$ ==$\\dfrac{\\partial P}{\\partial y} = \\dfrac{\\partial Q}{\\partial x}$==。\n\n这就是曲线积分与路径无关的条件（第7章卡④），$u(x, y)$ 的求法也与那里相同。\n\n---\n\n### 〔定义〕积分因子\n\n若存在函数 $\\mu(x, y) \\neq 0$，使 $\\mu P\\,\\mathrm{d}x + \\mu Q\\,\\mathrm{d}y = 0$ 成为全微分方程，则称 $\\mu(x, y)$ 为原方程的==积分因子==。",
      tags: ["全微分方程", "恰当方程", "积分因子", "原函数", "定义", "定理"]
    },
    {
      id: "calc-ode-reducible",
      chapterId: "ode",
      type: "property",
      types: ["property"],
      module: 3,
      card: "⑤",
      title: "可降阶的高阶微分方程",
      md: "### 〔方法〕$y^{(n)} = f(x)$ 型\n\n连续积分 $n$ 次，每次积分出现一个任意常数，得含 $n$ 个任意常数的通解。\n\n---\n\n### 〔方法〕$y'' = f(x, y')$ 型（不显含 $y$）\n\n1. **换元**：令 $y' = p(x)$，则 $y'' = p'$；\n2. **降阶**：方程化为一阶方程 $p' = f(x, p)$，求出 $p = \\varphi(x, C_1)$；\n3. **再积分**：$y = \\displaystyle\\int \\varphi(x, C_1)\\,\\mathrm{d}x + C_2$。\n\n---\n\n### 〔方法〕$y'' = f(y, y')$ 型（不显含 $x$）\n\n1. **换元**：令 $y' = p(y)$，把 $y$ 看作自变量，则\n   $$y'' = \\dfrac{\\mathrm{d}p}{\\mathrm{d}x} = \\dfrac{\\mathrm{d}p}{\\mathrm{d}y}\\cdot\\dfrac{\\mathrm{d}y}{\\mathrm{d}x} = p\\dfrac{\\mathrm{d}p}{\\mathrm{d}y}$$\n2. **降阶**：方程化为一阶方程 $p\\dfrac{\\mathrm{d}p}{\\mathrm{d}y} = f(y, p)$，求出 $p = \\varphi(y, C_1)$；\n3. **分离变量**：由 $\\dfrac{\\mathrm{d}y}{\\varphi(y, C_1)} = \\mathrm{d}x$ 积分得通解。",
      tags: ["可降阶方程", "降阶法", "y''=f(x", "y')", "y''=f(y", "性质"]
    },
    {
      id: "calc-ode-linear-structure",
      chapterId: "ode",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 4,
      card: "⑥",
      title: "线性微分方程解的结构",
      md: "### 〔定义〕函数组的线性相关与线性无关\n\n设 $y_1(x), \\cdots, y_n(x)$ 定义在区间 $I$ 上，若存在==不全为零==的常数 $k_1, \\cdots, k_n$，使在 $I$ 上\n$$k_1 y_1 + k_2 y_2 + \\cdots + k_n y_n \\equiv 0$$\n\n则称这组函数在 $I$ 上==线性相关==，否则称==线性无关==。\n- **两个函数**：$y_1, y_2$ 线性无关 $\\iff \\dfrac{y_1}{y_2}$ 在 $I$ 上不恒为常数。\n\n---\n\n### 〔定理〕齐次线性方程解的结构\n\n对二阶齐次线性方程 $y'' + P(x)y' + Q(x)y = 0$：\n- **叠加**：若 $y_1, y_2$ 是它的解，则 $C_1 y_1 + C_2 y_2$ 也是它的解；\n- **通解**：若 $y_1, y_2$ 是它的两个==线性无关==的解，则 $y = C_1 y_1 + C_2 y_2$ 是它的通解。\n\n$n$ 阶齐次线性方程同理：$n$ 个线性无关解的线性组合就是通解。\n\n---\n\n### 〔定理〕非齐次线性方程解的结构\n\n设 $y^*$ 是非齐次方程 $y'' + P(x)y' + Q(x)y = f(x)$ 的一个特解，$Y$ 是对应齐次方程的通解，则\n$$y = Y + y^*$$\n\n是非齐次方程的通解。\n\n---\n\n### 〔性质〕解的叠加与差\n\n- **两解之差**：非齐次方程的两个解之差是对应齐次方程的解；\n- **叠加原理**：若 $y_1^*$、$y_2^*$ 分别是右端为 $f_1(x)$、$f_2(x)$ 的非齐次方程的特解，则 $y_1^* + y_2^*$ 是右端为 $f_1(x) + f_2(x)$ 的方程的特解。",
      tags: ["线性相关", "线性无关", "解的结构", "叠加原理", "齐次", "非齐次", "定义", "定理", "性质"]
    },
    {
      id: "calc-ode-constant-homogeneous",
      chapterId: "ode",
      type: "property",
      types: ["property"],
      module: 4,
      card: "⑦",
      title: "常系数齐次线性方程",
      md: "### 〔方法〕二阶常系数齐次线性方程\n\n方程 $y'' + py' + qy = 0$（$p, q$ 为常数），写出==特征方程== $r^2 + pr + q = 0$，按特征根写通解：\n- **两个不等实根 $r_1 \\neq r_2$**：$y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$；\n- **两个相等实根 $r_1 = r_2 = r$**：$y = (C_1 + C_2 x)e^{rx}$；\n- **一对共轭复根 $r_{1,2} = \\alpha \\pm \\mathrm{i}\\beta$**：$y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$。\n\n---\n\n### 〔性质〕$n$ 阶常系数齐次线性方程\n\n方程 $y^{(n)} + p_1 y^{(n-1)} + \\cdots + p_{n-1}y' + p_n y = 0$ 的特征方程为\n$$r^n + p_1 r^{n-1} + \\cdots + p_{n-1}r + p_n = 0$$\n\n每个特征根对应通解中的若干项：\n- **单实根 $r$**：一项 $Ce^{rx}$；\n- **$k$ 重实根 $r$**：$k$ 项 $e^{rx}(C_1 + C_2 x + \\cdots + C_k x^{k-1})$；\n- **一对单复根 $\\alpha \\pm \\mathrm{i}\\beta$**：两项 $e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$；\n- **一对 $k$ 重复根 $\\alpha \\pm \\mathrm{i}\\beta$**：$2k$ 项\n  $$\\begin{aligned} e^{\\alpha x}\\big[ & (C_1 + \\cdots + C_k x^{k-1})\\cos\\beta x \\\\ & + (D_1 + \\cdots + D_k x^{k-1})\\sin\\beta x\\big] \\end{aligned}$$",
      tags: ["常系数齐次线性微分方程", "特征方程", "特征根", "通解", "性质"]
    },
    {
      id: "calc-ode-particular",
      chapterId: "ode",
      type: "property",
      types: ["property"],
      module: 4,
      card: "⑧",
      title: "常系数非齐次方程的特解",
      md: "### 〔方法〕自由项为 $e^{\\lambda x}P_m(x)$ 型\n\n方程 $y'' + py' + qy = e^{\\lambda x}P_m(x)$（$P_m(x)$ 为 $m$ 次多项式），设特解\n$$y^* = x^k Q_m(x)e^{\\lambda x}$$\n\n- **$Q_m(x)$**：$m$ 次待定多项式；\n- **$k$**：$\\lambda$ 不是特征根取 $0$，是单根取 $1$，是重根取 $2$；\n- **定系数**：代入原方程，比较两端同类项的系数求出 $Q_m(x)$。\n\n---\n\n### 〔方法〕自由项为 $e^{\\lambda x}[P_l(x)\\cos\\omega x + P_n(x)\\sin\\omega x]$ 型\n\n设特解\n$$y^* = x^k e^{\\lambda x}\\left[R_m^{(1)}(x)\\cos\\omega x + R_m^{(2)}(x)\\sin\\omega x\\right]$$\n\n- **$R_m^{(1)}, R_m^{(2)}$**：$m$ 次待定多项式，$m = \\max\\{l, n\\}$；\n- **$k$**：$\\lambda + \\mathrm{i}\\omega$ 不是特征根取 $0$，是特征根取 $1$；\n- **两项都要设**：即使自由项中只有 $\\cos\\omega x$（或只有 $\\sin\\omega x$），特解中也必须同时含 $\\cos\\omega x$ 与 $\\sin\\omega x$ 两项。",
      tags: ["常系数非齐次线性微分方程", "特解", "待定系数法", "自由项", "性质"]
    },
    {
      id: "calc-ode-euler",
      chapterId: "ode",
      type: "definition",
      types: ["definition", "property"],
      module: 4,
      card: "⑨",
      title: "欧拉方程",
      md: "### 〔定义〕欧拉方程\n\n形如\n$$\\begin{aligned} & x^n y^{(n)} + p_1 x^{n-1}y^{(n-1)} + \\cdots \\\\ & + p_{n-1}xy' + p_n y = f(x) \\end{aligned}$$\n\n（$p_1, \\cdots, p_n$ 为常数）的方程称为==欧拉方程==，其特点是各项中 $x$ 的幂次与导数的阶数相同。\n\n---\n\n### 〔方法〕欧拉方程的解法\n\n1. **换元**：$x > 0$ 时令 $x = e^t$（即 $t = \\ln x$），记 $D = \\dfrac{\\mathrm{d}}{\\mathrm{d}t}$，则\n   - $xy' = Dy$，$x^2 y'' = D(D - 1)y$；\n   - $x^3 y''' = D(D - 1)(D - 2)y$；\n   - 一般地 $x^k y^{(k)} = D(D - 1)\\cdots(D - k + 1)y$；\n2. **化为常系数**：代入后得到以 $t$ 为自变量的常系数线性方程，按卡⑦、卡⑧求解；\n3. **代回**：以 $\\ln x$ 代 $t$，得原方程的解。\n\n$x < 0$ 时令 $x = -e^t$，结论相同。",
      tags: ["欧拉方程", "变量代换", "常系数线性方程", "定义", "性质"]
    }
  ]
});
