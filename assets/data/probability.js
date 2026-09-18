registerSubject({
  id: "probability",
  name: "概率论与数理统计",
  color: "#a1751f",
  chapters: [
    // 第1章按「模块」组织：2 个模块 5 张卡。
    { id: "probability-basics", name: "随机事件与概率", order: 1, modules: [
      { no: "一", name: "随机事件与概率", brief: "研究对象：事件及其运算，概率的定义、性质与两种等可能模型" },
      { no: "二", name: "条件概率与独立性", brief: "已知部分信息时的概率，以及事件之间互不影响的情形" }
    ] },
    // 第2章按「模块」组织：3 个模块 4 张卡。
    { id: "random-variable", name: "一维随机变量及其分布", order: 2, modules: [
      { no: "一", name: "随机变量与分布函数", brief: "研究对象：随机变量，以及刻画它的分布函数" },
      { no: "二", name: "常见分布", brief: "离散型用分布律，连续型用概率密度，以及八种常见分布" },
      { no: "三", name: "随机变量函数的分布", brief: "已知 X 的分布，求 Y = g(X) 的分布" }
    ] },
    // 第3章按「模块」组织：3 个模块 6 张卡。
    { id: "multivariate-rv", name: "多维随机变量及其分布", order: 3, modules: [
      { no: "一", name: "联合分布、边缘分布与条件分布", brief: "二维随机变量的整体分布，以及由它得到的单个分量与条件分布" },
      { no: "二", name: "独立性与常见二维分布", brief: "分量之间互不影响的条件，以及二维均匀分布、二维正态分布" },
      { no: "三", name: "两个随机变量函数的分布", brief: "已知 (X, Y) 的分布，求 Z = g(X, Y) 的分布" }
    ] },
    // 第4章按「模块」组织：2 个模块 5 张卡。
    { id: "numerical-characteristics", name: "随机变量的数字特征", order: 4, modules: [
      { no: "一", name: "期望与方差", brief: "随机变量的平均值与离散程度，以及常用分布的结果" },
      { no: "二", name: "矩、协方差与相关系数", brief: "两个随机变量之间的线性关联，以及不相关与独立的区别" }
    ] },
    // 第5章按「模块」组织：2 个模块 2 张卡。
    { id: "limit-theorems", name: "大数定律与中心极限定理", order: 5, modules: [
      { no: "一", name: "大数定律", brief: "大量随机变量的平均值稳定在期望附近" },
      { no: "二", name: "中心极限定理", brief: "大量独立随机变量之和近似服从正态分布" }
    ] },
    // 第6章按「模块」组织：2 个模块 3 张卡。
    { id: "statistics-basics", name: "数理统计的基本概念", order: 6, modules: [
      { no: "一", name: "总体、样本与统计量", brief: "研究对象：从总体中抽样，用样本的函数推断总体" },
      { no: "二", name: "抽样分布", brief: "三大抽样分布，以及正态总体下常用统计量的分布" }
    ] },
    // 第7章按「模块」组织：2 个模块 4 张卡。
    { id: "parameter-estimation", name: "参数估计", order: 7, modules: [
      { no: "一", name: "点估计", brief: "用一个统计量估计未知参数：两种求法与三条评选标准" },
      { no: "二", name: "区间估计", brief: "给出以一定概率包含未知参数的随机区间" }
    ] },
    // 第8章按「模块」组织：2 个模块 3 张卡。
    { id: "hypothesis-testing", name: "假设检验", order: 8, modules: [
      { no: "一", name: "基本概念", brief: "小概率原理、拒绝域、两类错误与检验步骤" },
      { no: "二", name: "正态总体参数的检验", brief: "单个与两个正态总体的均值、方差检验" }
    ] }
  ],
  items: [
    {
      id: "prob-evt-events",
      chapterId: "probability-basics",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "①",
      title: "随机事件及其运算",
      md: "### 〔定义〕随机试验与样本空间\n\n满足下列条件的试验称为==随机试验==，记作 $E$：\n- **可重复**：可以在相同条件下重复进行；\n- **结果明确**：所有可能结果事先明确，且不止一个；\n- **结果随机**：每次试验前不能确定出现哪一个结果。\n\n$E$ 的所有可能结果组成的集合称为==样本空间==，记作 $\\Omega$，其元素称为样本点。\n\n---\n\n### 〔定义〕随机事件\n\n- **随机事件**：样本空间 $\\Omega$ 的子集，简称事件；试验中出现的样本点属于 $A$ 时，称事件 $A$ 发生；\n- **基本事件**：只含一个样本点的事件；\n- **必然事件与不可能事件**：$\\Omega$ 与 $\\varnothing$。\n\n---\n\n### 〔定义〕事件的关系与运算\n\n- **包含**：$A \\subset B$，$A$ 发生必导致 $B$ 发生；$A \\subset B$ 且 $B \\subset A$ 时称 $A = B$；\n- **和**：$A \\cup B$，$A$ 与 $B$ 至少有一个发生；\n- **积**：$A \\cap B$（记作 $AB$），$A$ 与 $B$ 同时发生；\n- **差**：$A - B$，$A$ 发生而 $B$ 不发生；\n- **互不相容（互斥）**：$AB = \\varnothing$，$A$ 与 $B$ 不能同时发生；\n- **对立**：$A \\cup B = \\Omega$ 且 $AB = \\varnothing$，记 $B = \\overline{A}$。\n\n---\n\n### 〔性质〕事件的运算律\n\n- **交换律与结合律**：$A \\cup B = B \\cup A$，$AB = BA$；$(A \\cup B) \\cup C = A \\cup (B \\cup C)$，$(AB)C = A(BC)$；\n- **分配律**：$A(B \\cup C) = AB \\cup AC$，$A \\cup BC = (A \\cup B)(A \\cup C)$；\n- **德摩根律**：$\\overline{A \\cup B} = \\overline{A}\\,\\overline{B}$，$\\overline{AB} = \\overline{A} \\cup \\overline{B}$，可推广到 $n$ 个事件；\n- **差的转化**：$A - B = A\\overline{B} = A - AB$。\n\n---\n\n### 〔提示〕\n\n- 对立事件一定互斥，互斥事件不一定对立。",
      tags: ["随机试验", "样本空间", "随机事件", "事件的关系", "事件的运算", "互斥", "对立事件", "德摩根律", "定义", "性质"]
    },
    {
      id: "prob-evt-probability",
      chapterId: "probability-basics",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 1,
      card: "②",
      title: "概率的定义与性质",
      md: "### 〔定义〕概率的公理化定义\n\n设 $E$ 的样本空间为 $\\Omega$，对每个事件 $A$ 赋予一个实数 $P(A)$，若满足：\n1. **非负性**：$P(A) \\ge 0$；\n2. **规范性**：$P(\\Omega) = 1$；\n3. **可列可加性**：对两两互不相容的事件 $A_1, A_2, \\cdots$，\n   $$P\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) = \\sum_{i=1}^{\\infty} P(A_i)$$\n\n则称 $P(A)$ 为事件 $A$ 的==概率==。\n\n---\n\n### 〔性质〕概率的基本性质\n\n- **不可能事件**：$P(\\varnothing) = 0$；\n- **有限可加**：$A_1, \\cdots, A_n$ 两两互不相容时，$P(A_1 \\cup \\cdots \\cup A_n) = P(A_1) + \\cdots + P(A_n)$；\n- **对立事件**：$P(\\overline{A}) = 1 - P(A)$；\n- **减法公式**：$P(A - B) = P(A) - P(AB)$；特别地，$B \\subset A$ 时 $P(A - B) = P(A) - P(B)$，且 $P(B) \\le P(A)$；\n- **有界**：$0 \\le P(A) \\le 1$。\n\n---\n\n### 〔定理〕加法公式\n\n- **两个事件**：$P(A \\cup B) = P(A) + P(B) - P(AB)$；\n- **三个事件**：\n  $$\\begin{aligned} & P(A \\cup B \\cup C) \\\\ = {} & P(A) + P(B) + P(C) \\\\ & - P(AB) - P(AC) - P(BC) \\\\ & + P(ABC) \\end{aligned}$$",
      tags: ["概率", "公理化定义", "可列可加性", "减法公式", "加法公式", "定义", "定理", "性质"]
    },
    {
      id: "prob-evt-classical-geometric",
      chapterId: "probability-basics",
      type: "definition",
      types: ["definition"],
      module: 1,
      card: "③",
      title: "古典概型与几何概型",
      md: "### 〔定义〕古典概型\n\n若试验满足：\n- **有限**：样本空间只含有限个样本点；\n- **等可能**：每个样本点出现的可能性相同；\n\n则称为==古典概型==（等可能概型）。设 $\\Omega$ 含 $n$ 个样本点，事件 $A$ 含 $k$ 个，则\n$$P(A) = \\dfrac{k}{n}$$\n\n---\n\n### 〔定义〕几何概型\n\n若试验满足：\n- **区域**：样本空间 $\\Omega$ 是一个可度量的几何区域（度量指长度、面积或体积）；\n- **等可能**：样本点落在 $\\Omega$ 的子区域 $A$ 内的可能性只与 $A$ 的度量成正比，而与 $A$ 的位置、形状无关；\n\n则称为==几何概型==。记 $m(\\cdot)$ 为度量，则\n$$P(A) = \\dfrac{m(A)}{m(\\Omega)}$$",
      tags: ["古典概型", "等可能概型", "几何概型", "定义"]
    },
    {
      id: "prob-evt-conditional",
      chapterId: "probability-basics",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "④",
      title: "条件概率、全概率公式与贝叶斯公式",
      md: "### 〔定义〕条件概率\n\n设 $P(A) > 0$，称\n$$P(B \\mid A) = \\dfrac{P(AB)}{P(A)}$$\n\n为在事件 $A$ 发生的条件下事件 $B$ 发生的==条件概率==。\n\n---\n\n### 〔性质〕条件概率的性质\n\n条件概率 $P(\\cdot \\mid A)$ 满足概率的三条公理，因而具有概率的一切性质，如：\n- **对立事件**：$P(\\overline{B} \\mid A) = 1 - P(B \\mid A)$；\n- **加法公式**：$P(B_1 \\cup B_2 \\mid A) = P(B_1 \\mid A) + P(B_2 \\mid A) - P(B_1 B_2 \\mid A)$。\n\n---\n\n### 〔定理〕乘法公式\n\n- **两个事件**：$P(A) > 0$ 时，$P(AB) = P(A)P(B \\mid A)$；\n- **$n$ 个事件**：$P(A_1 A_2 \\cdots A_{n-1}) > 0$ 时，\n  $$\\begin{aligned} & P(A_1 A_2 \\cdots A_n) \\\\ = {} & P(A_1)P(A_2 \\mid A_1)P(A_3 \\mid A_1 A_2) \\\\ & \\cdots P(A_n \\mid A_1 \\cdots A_{n-1}) \\end{aligned}$$\n\n---\n\n### 〔定义〕完备事件组\n\n若事件 $B_1, B_2, \\cdots, B_n$ 满足：\n- **两两互斥**：$B_i B_j = \\varnothing\\ (i \\neq j)$；\n- **和为全集**：$B_1 \\cup B_2 \\cup \\cdots \\cup B_n = \\Omega$；\n\n则称 $B_1, B_2, \\cdots, B_n$ 为样本空间 $\\Omega$ 的一个==划分==（完备事件组）。\n\n---\n\n### 〔定理〕全概率公式\n\n设 $B_1, \\cdots, B_n$ 为 $\\Omega$ 的一个划分，且 $P(B_i) > 0$，则对任一事件 $A$，\n$$P(A) = \\sum_{i=1}^{n} P(B_i)P(A \\mid B_i)$$\n\n---\n\n### 〔定理〕贝叶斯公式\n\n在全概率公式的条件下，若 $P(A) > 0$，则\n$$P(B_i \\mid A) = \\dfrac{P(B_i)P(A \\mid B_i)}{\\sum\\limits_{j=1}^{n} P(B_j)P(A \\mid B_j)}$$\n\n（$i = 1, \\cdots, n$），其中 $P(B_i)$ 称为==先验概率==，$P(B_i \\mid A)$ 称为==后验概率==。",
      tags: ["条件概率", "乘法公式", "完备事件组", "全概率公式", "贝叶斯公式", "先验概率", "后验概率", "定义", "定理", "性质"]
    },
    {
      id: "prob-evt-independence",
      chapterId: "probability-basics",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "⑤",
      title: "事件的独立性与伯努利概型",
      md: "### 〔定义〕两个事件的独立性\n\n若 $P(AB) = P(A)P(B)$，则称事件 $A$ 与 $B$ ==相互独立==。\n\n---\n\n### 〔性质〕独立性的性质\n\n- **与条件概率**：$P(A) > 0$ 时，$A$ 与 $B$ 独立 $\\iff P(B \\mid A) = P(B)$；\n- **换成对立事件**：若 $A$ 与 $B$ 独立，则 $A$ 与 $\\overline{B}$、$\\overline{A}$ 与 $B$、$\\overline{A}$ 与 $\\overline{B}$ 也都相互独立；\n- **与互斥的关系**：若 $P(A) > 0$，$P(B) > 0$，则「$A, B$ 独立」与「$A, B$ 互斥」不能同时成立；\n- **概率为 $0$ 或 $1$ 的事件**：与任何事件都相互独立。\n\n---\n\n### 〔定义〕多个事件的独立性\n\n对事件 $A_1, A_2, \\cdots, A_n$：\n- **相互独立**：对其中任意 $k$ 个（$2 \\le k \\le n$）事件 $A_{i_1}, \\cdots, A_{i_k}$，都有\n  $$P(A_{i_1} A_{i_2} \\cdots A_{i_k}) = P(A_{i_1})P(A_{i_2}) \\cdots P(A_{i_k})$$\n- **两两独立**：只要求其中任意两个事件相互独立。\n\n相互独立 $\\implies$ 两两独立，==反之不成立==。\n\n---\n\n### 〔性质〕相互独立事件的性质\n\n设 $A_1, \\cdots, A_n$ 相互独立：\n- **部分独立**：其中任取一部分事件，仍相互独立；\n- **换成对立事件**：把其中任意几个换成各自的对立事件，仍相互独立；\n- **至少一个发生**：$P(A_1 \\cup \\cdots \\cup A_n) = 1 - P(\\overline{A_1})P(\\overline{A_2}) \\cdots P(\\overline{A_n})$。\n\n---\n\n### 〔定义〕伯努利概型\n\n若试验只有 $A$ 与 $\\overline{A}$ 两个结果，$P(A) = p\\ (0 < p < 1)$，把它在相同条件下==独立地重复==进行 $n$ 次，称为 ==$n$ 重伯努利试验==。\n\n---\n\n### 〔定理〕二项概率公式\n\n在 $n$ 重伯努利试验中，事件 $A$ 恰好发生 $k$ 次的概率为\n$$P_n(k) = \\mathrm{C}_n^k\\, p^k (1 - p)^{n-k}, \\quad k = 0, 1, \\cdots, n$$",
      tags: ["独立性", "相互独立", "两两独立", "伯努利试验", "二项概率公式", "定义", "定理", "性质"]
    },
    {
      id: "prob-rv-cdf",
      chapterId: "random-variable",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "①",
      title: "随机变量与分布函数",
      md: "### 〔定义〕随机变量\n\n设随机试验的样本空间为 $\\Omega$，若对每个样本点 $\\omega \\in \\Omega$，都有唯一的实数 $X(\\omega)$ 与之对应，则称实值函数 $X = X(\\omega)$ 为==随机变量==。\n\n---\n\n### 〔定义〕分布函数\n\n设 $X$ 为随机变量，称\n$$F(x) = P\\{X \\le x\\}, \\quad -\\infty < x < +\\infty$$\n\n为 $X$ 的==分布函数==。\n\n---\n\n### 〔性质〕分布函数的充要条件\n\n函数 $F(x)$ 是某个随机变量的分布函数 $\\iff$ 同时满足：\n1. **单调不减**：$x_1 < x_2$ 时 $F(x_1) \\le F(x_2)$；\n2. **两端极限**：$0 \\le F(x) \\le 1$，且 $F(-\\infty) = 0$，$F(+\\infty) = 1$；\n3. **右连续**：$F(x + 0) = F(x)$。\n\n---\n\n### 〔性质〕用分布函数求概率\n\n- **不超过与小于**：$P\\{X \\le a\\} = F(a)$，$P\\{X < a\\} = F(a - 0)$；\n- **单点**：$P\\{X = a\\} = F(a) - F(a - 0)$；\n- **区间**：$P\\{a < X \\le b\\} = F(b) - F(a)$；\n- **大于**：$P\\{X > a\\} = 1 - F(a)$。",
      tags: ["随机变量", "分布函数", "右连续", "单调不减", "定义", "性质"]
    },
    {
      id: "prob-rv-discrete",
      chapterId: "random-variable",
      type: "definition",
      types: ["definition", "theorem"],
      module: 2,
      card: "②",
      title: "离散型随机变量及常见分布",
      md: "### 〔定义〕离散型随机变量与分布律\n\n若 $X$ 的全部可能取值为有限个或可列无限个 $x_1, x_2, \\cdots$，则称 $X$ 为==离散型随机变量==，称\n$$P\\{X = x_k\\} = p_k, \\quad k = 1, 2, \\cdots$$\n\n为 $X$ 的==分布律==。\n- **充要条件**：$p_k \\ge 0$，且 $\\sum\\limits_k p_k = 1$；\n- **分布函数**：$F(x) = \\sum\\limits_{x_k \\le x} p_k$，是右连续的阶梯函数，在 $x_k$ 处跳跃 $p_k$。\n\n---\n\n### 〔定义〕0-1 分布与二项分布\n\n- **0-1 分布**：$P\\{X = k\\} = p^k(1 - p)^{1-k}$，$k = 0, 1$（$0 < p < 1$），记作 $X \\sim B(1, p)$；\n- **二项分布**：$P\\{X = k\\} = \\mathrm{C}_n^k\\, p^k(1 - p)^{n-k}$，$k = 0, 1, \\cdots, n$，记作 $X \\sim B(n, p)$；它是 $n$ 重伯努利试验中事件 $A$ 发生次数的分布（第1章卡⑤）。\n\n---\n\n### 〔定义〕泊松分布\n\n$$P\\{X = k\\} = \\dfrac{\\lambda^k}{k!}e^{-\\lambda}, \\quad k = 0, 1, 2, \\cdots \\ (\\lambda > 0)$$\n\n记作 $X \\sim P(\\lambda)$。\n\n---\n\n### 〔定理〕泊松定理\n\n设 $np_n = \\lambda$（$\\lambda > 0$ 为常数），则对任意固定的非负整数 $k$，\n$$\\lim\\limits_{n \\to \\infty} \\mathrm{C}_n^k\\, p_n^k(1 - p_n)^{n-k} = \\dfrac{\\lambda^k}{k!}e^{-\\lambda}$$\n\n- **近似计算**：$n$ 很大、$p$ 很小时，$B(n, p)$ 可用 $P(\\lambda)$ 近似，$\\lambda = np$。\n\n---\n\n### 〔定义〕几何分布\n\n在伯努利试验中，设 $X$ 为事件 $A$ 首次发生时的试验次数，则\n$$P\\{X = k\\} = (1 - p)^{k-1}p, \\quad k = 1, 2, \\cdots$$\n\n记作 $X \\sim G(p)$。\n- **无记忆性**：$P\\{X > m + n \\mid X > m\\} = P\\{X > n\\}$（$m, n$ 为正整数）。\n\n---\n\n### 〔定义〕超几何分布\n\n$N$ 件产品中有 $M$ 件次品，==不放回==地任取 $n$ 件，其中的次品数 $X$ 的分布律为\n$$P\\{X = k\\} = \\dfrac{\\mathrm{C}_M^k\\,\\mathrm{C}_{N-M}^{n-k}}{\\mathrm{C}_N^n}$$\n\n$k$ 取 $\\max\\{0, n - N + M\\}$ 到 $\\min\\{n, M\\}$ 之间的整数。\n- **与二项分布的关系**：$N$ 很大而 $n$ 相对很小时，近似于 $B\\left(n, \\dfrac{M}{N}\\right)$。",
      tags: ["离散型随机变量", "分布律", "0-1分布", "二项分布", "泊松分布", "泊松定理", "几何分布", "超几何分布", "定义", "定理"]
    },
    {
      id: "prob-rv-continuous",
      chapterId: "random-variable",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "③",
      title: "连续型随机变量及常见分布",
      md: "### 〔定义〕连续型随机变量与概率密度\n\n若存在非负可积函数 $f(x)$，使对任意实数 $x$，\n$$F(x) = \\int_{-\\infty}^{x} f(t)\\,\\mathrm{d}t$$\n\n则称 $X$ 为==连续型随机变量==，$f(x)$ 称为 $X$ 的==概率密度==。\n\n---\n\n### 〔性质〕概率密度的性质\n\n- **充要条件**：$f(x) \\ge 0$，且 $\\displaystyle\\int_{-\\infty}^{+\\infty} f(x)\\,\\mathrm{d}x = 1$；\n- **与分布函数**：$F(x)$ 是连续函数；在 $f(x)$ 的连续点处 $F'(x) = f(x)$；\n- **区间概率**：$P\\{a < X \\le b\\} = \\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$；\n- **单点概率为零**：$P\\{X = a\\} = 0$，因而区间端点取不取等号不影响概率。\n\n---\n\n### 〔定义〕均匀分布\n\n$$f(x) = \\begin{cases} \\dfrac{1}{b - a}, & a < x < b \\\\ 0, & \\text{其他} \\end{cases}$$\n\n记作 $X \\sim U(a, b)$。\n\n---\n\n### 〔定义〕指数分布\n\n$$f(x) = \\begin{cases} \\lambda e^{-\\lambda x}, & x > 0 \\\\ 0, & x \\le 0 \\end{cases} \\quad (\\lambda > 0)$$\n\n记作 $X \\sim E(\\lambda)$。\n- **分布函数**：$x > 0$ 时 $F(x) = 1 - e^{-\\lambda x}$，$x \\le 0$ 时 $F(x) = 0$；\n- **无记忆性**：$P\\{X > s + t \\mid X > s\\} = P\\{X > t\\}$（$s, t > 0$）。\n\n---\n\n### 〔定义〕正态分布\n\n$$f(x) = \\dfrac{1}{\\sqrt{2\\pi}\\,\\sigma}e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}$$\n\n（$-\\infty < x < +\\infty$，$\\sigma > 0$），记作 $X \\sim N(\\mu, \\sigma^2)$。\n- **图形**：关于 $x = \\mu$ 对称，在 $x = \\mu$ 处取最大值 $\\dfrac{1}{\\sqrt{2\\pi}\\,\\sigma}$，在 $x = \\mu \\pm \\sigma$ 处有拐点。\n\n---\n\n### 〔定义〕标准正态分布\n\n$\\mu = 0$，$\\sigma = 1$ 的正态分布 $N(0, 1)$ 称为==标准正态分布==，其密度与分布函数记作\n$$\\varphi(x) = \\dfrac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^2}{2}}, \\qquad \\Phi(x) = \\int_{-\\infty}^{x} \\varphi(t)\\,\\mathrm{d}t$$\n\n- **对称性**：$\\Phi(-x) = 1 - \\Phi(x)$，$\\Phi(0) = \\dfrac{1}{2}$。\n\n---\n\n### 〔定理〕正态分布的标准化\n\n若 $X \\sim N(\\mu, \\sigma^2)$，则 $\\dfrac{X - \\mu}{\\sigma} \\sim N(0, 1)$，从而：\n- **分布函数**：$F(x) = \\Phi\\left(\\dfrac{x - \\mu}{\\sigma}\\right)$；\n- **区间概率**：$P\\{a < X \\le b\\} = \\Phi\\left(\\dfrac{b - \\mu}{\\sigma}\\right) - \\Phi\\left(\\dfrac{a - \\mu}{\\sigma}\\right)$。",
      tags: ["连续型随机变量", "概率密度", "均匀分布", "指数分布", "正态分布", "标准正态分布", "标准化", "定义", "定理", "性质"]
    },
    {
      id: "prob-rv-function",
      chapterId: "random-variable",
      type: "property",
      types: ["theorem", "property"],
      module: 3,
      card: "④",
      title: "一维随机变量函数的分布",
      md: "### 〔方法〕离散型随机变量的函数\n\n已知 $X$ 的分布律，求 $Y = g(X)$ 的分布律：\n1. **列出取值**：写出 $Y$ 的全部取值 $g(x_k)$；\n2. **合并概率**：$g(x_k)$ 相同的，把对应的概率相加。\n\n---\n\n### 〔方法〕分布函数法\n\n已知 $X$ 的概率密度 $f_X(x)$，求 $Y = g(X)$ 的概率密度：\n1. **求分布函数**：\n   $$F_Y(y) = P\\{g(X) \\le y\\} = \\int_{g(x) \\le y} f_X(x)\\,\\mathrm{d}x$$\n2. **求导**：$f_Y(y) = F_Y'(y)$。\n\n---\n\n### 〔定理〕单调函数的公式法\n\n设 $X$ 的概率密度为 $f_X(x)$，$y = g(x)$ 处处可导且严格单调，其反函数为 $x = h(y)$，则 $Y = g(X)$ 的概率密度为\n$$f_Y(y) = \\begin{cases} f_X[h(y)]\\,|h'(y)|, & \\alpha < y < \\beta \\\\ 0, & \\text{其他} \\end{cases}$$\n\n其中 $(\\alpha, \\beta)$ 为 $g(x)$ 的值域。\n\n---\n\n### 〔推论〕正态分布的线性函数\n\n若 $X \\sim N(\\mu, \\sigma^2)$，则\n$$aX + b \\sim N(a\\mu + b,\\ a^2\\sigma^2) \\quad (a \\neq 0)$$",
      tags: ["随机变量函数的分布", "分布函数法", "公式法", "正态分布的线性函数", "定理", "性质"]
    },
    {
      id: "prob-mrv-joint-cdf",
      chapterId: "multivariate-rv",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "①",
      title: "二维随机变量与联合分布函数",
      md: "### 〔定义〕二维随机变量与联合分布函数\n\n设 $X, Y$ 是定义在同一样本空间上的两个随机变量，称 $(X, Y)$ 为==二维随机变量==，称\n$$F(x, y) = P\\{X \\le x,\\ Y \\le y\\}$$\n\n为 $(X, Y)$ 的==联合分布函数==。\n\n---\n\n### 〔性质〕联合分布函数的性质\n\n- **单调不减**：$F(x, y)$ 对 $x$、对 $y$ 分别单调不减；\n- **两端极限**：$0 \\le F(x, y) \\le 1$，$F(-\\infty, y) = F(x, -\\infty) = 0$，$F(+\\infty, +\\infty) = 1$；\n- **右连续**：$F(x, y)$ 对 $x$、对 $y$ 分别右连续；\n- **矩形概率**：\n  $$\\begin{aligned} & P\\{x_1 < X \\le x_2,\\ y_1 < Y \\le y_2\\} \\\\ = {} & F(x_2, y_2) - F(x_1, y_2) \\\\ & - F(x_2, y_1) + F(x_1, y_1) \\end{aligned}$$\n\n---\n\n### 〔定义〕边缘分布函数\n\n$$F_X(x) = F(x, +\\infty), \\qquad F_Y(y) = F(+\\infty, y)$$\n\n分别称为 $X$ 与 $Y$ 的==边缘分布函数==。联合分布决定边缘分布；反之，边缘分布一般不能决定联合分布。",
      tags: ["二维随机变量", "联合分布函数", "边缘分布函数", "定义", "性质"]
    },
    {
      id: "prob-mrv-discrete",
      chapterId: "multivariate-rv",
      type: "definition",
      types: ["definition", "theorem"],
      module: 1,
      card: "②",
      title: "二维离散型随机变量",
      md: "### 〔定义〕联合分布律\n\n若 $(X, Y)$ 的全部可能取值为有限对或可列无限对 $(x_i, y_j)$，称\n$$P\\{X = x_i,\\ Y = y_j\\} = p_{ij}, \\quad i, j = 1, 2, \\cdots$$\n\n为 $(X, Y)$ 的==联合分布律==，其充要条件为 $p_{ij} \\ge 0$，$\\sum\\limits_i \\sum\\limits_j p_{ij} = 1$。\n\n---\n\n### 〔定理〕边缘分布律\n\n- **$X$ 的边缘分布律**：$p_{i\\cdot} = P\\{X = x_i\\} = \\sum\\limits_j p_{ij}$；\n- **$Y$ 的边缘分布律**：$p_{\\cdot j} = P\\{Y = y_j\\} = \\sum\\limits_i p_{ij}$。\n\n---\n\n### 〔定义〕条件分布律\n\n- **$Y = y_j$ 条件下 $X$ 的分布律**（$p_{\\cdot j} > 0$）：$P\\{X = x_i \\mid Y = y_j\\} = \\dfrac{p_{ij}}{p_{\\cdot j}}$，$i = 1, 2, \\cdots$；\n- **$X = x_i$ 条件下 $Y$ 的分布律**（$p_{i\\cdot} > 0$）：$P\\{Y = y_j \\mid X = x_i\\} = \\dfrac{p_{ij}}{p_{i\\cdot}}$，$j = 1, 2, \\cdots$。",
      tags: ["联合分布律", "边缘分布律", "条件分布律", "定义", "定理"]
    },
    {
      id: "prob-mrv-continuous",
      chapterId: "multivariate-rv",
      type: "definition",
      types: ["definition", "theorem"],
      module: 1,
      card: "③",
      title: "二维连续型随机变量",
      md: "### 〔定义〕联合概率密度\n\n若存在非负可积函数 $f(x, y)$，使对任意 $x, y$，\n$$F(x, y) = \\int_{-\\infty}^{x}\\int_{-\\infty}^{y} f(u, v)\\,\\mathrm{d}u\\,\\mathrm{d}v$$\n\n则称 $(X, Y)$ 为==二维连续型随机变量==，$f(x, y)$ 称为==联合概率密度==。\n- **充要条件**：$f(x, y) \\ge 0$，且 $\\displaystyle\\iint_{\\mathbb{R}^2} f(x, y)\\,\\mathrm{d}x\\,\\mathrm{d}y = 1$；\n- **区域概率**：$P\\{(X, Y) \\in D\\} = \\displaystyle\\iint_D f(x, y)\\,\\mathrm{d}x\\,\\mathrm{d}y$；\n- **与分布函数**：在 $f(x, y)$ 的连续点处，$\\dfrac{\\partial^2 F}{\\partial x\\,\\partial y} = f(x, y)$。\n\n---\n\n### 〔定理〕边缘概率密度\n\n$$f_X(x) = \\int_{-\\infty}^{+\\infty} f(x, y)\\,\\mathrm{d}y$$\n$$f_Y(y) = \\int_{-\\infty}^{+\\infty} f(x, y)\\,\\mathrm{d}x$$\n\n---\n\n### 〔定义〕条件概率密度\n\n- **$Y = y$ 条件下 $X$ 的密度**（$f_Y(y) > 0$）：$f_{X \\mid Y}(x \\mid y) = \\dfrac{f(x, y)}{f_Y(y)}$；\n- **$X = x$ 条件下 $Y$ 的密度**（$f_X(x) > 0$）：$f_{Y \\mid X}(y \\mid x) = \\dfrac{f(x, y)}{f_X(x)}$；\n- **乘法公式**：$f(x, y) = f_X(x)f_{Y \\mid X}(y \\mid x) = f_Y(y)f_{X \\mid Y}(x \\mid y)$。",
      tags: ["联合概率密度", "边缘概率密度", "条件概率密度", "定义", "定理"]
    },
    {
      id: "prob-mrv-independence",
      chapterId: "multivariate-rv",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "④",
      title: "随机变量的独立性",
      md: "### 〔定义〕随机变量的相互独立\n\n若对任意实数 $x, y$，\n$$F(x, y) = F_X(x)F_Y(y)$$\n\n则称 $X$ 与 $Y$ ==相互独立==。\n\n---\n\n### 〔定理〕独立性的判别\n\n- **离散型**：$X$ 与 $Y$ 独立 $\\iff$ 对一切 $i, j$ 有 $p_{ij} = p_{i\\cdot}\\,p_{\\cdot j}$；\n- **连续型**：$X$ 与 $Y$ 独立 $\\iff$ 在 $f(x, y)$、$f_X(x)$、$f_Y(y)$ 的公共连续点处 $f(x, y) = f_X(x)f_Y(y)$；\n- **分离变量**：若联合密度对一切 $(x, y)$ 可写成 $f(x, y) = g(x)h(y)$，则 $X$ 与 $Y$ 独立。\n\n---\n\n### 〔定义〕$n$ 个随机变量的相互独立\n\n若对任意实数 $x_1, \\cdots, x_n$，\n$$F(x_1, \\cdots, x_n) = F_{X_1}(x_1)F_{X_2}(x_2) \\cdots F_{X_n}(x_n)$$\n\n则称 $X_1, \\cdots, X_n$ ==相互独立==。\n\n---\n\n### 〔性质〕独立随机变量的函数\n\n- **函数仍独立**：若 $X$ 与 $Y$ 独立，$g, h$ 为连续函数，则 $g(X)$ 与 $h(Y)$ 独立；\n- **分组后仍独立**：若 $X_1, \\cdots, X_n$ 相互独立，则 $g(X_1, \\cdots, X_m)$ 与 $h(X_{m+1}, \\cdots, X_n)$ 独立。",
      tags: ["相互独立", "独立性的判别", "n个随机变量的独立性", "定义", "定理", "性质"]
    },
    {
      id: "prob-mrv-common",
      chapterId: "multivariate-rv",
      type: "definition",
      types: ["definition", "property"],
      module: 2,
      card: "⑤",
      title: "二维均匀分布与二维正态分布",
      md: "### 〔定义〕二维均匀分布\n\n设 $G$ 是面积为 $S_G$ 的平面有界区域，若 $(X, Y)$ 的联合密度为\n$$f(x, y) = \\begin{cases} \\dfrac{1}{S_G}, & (x, y) \\in G \\\\ 0, & \\text{其他} \\end{cases}$$\n\n则称 $(X, Y)$ 在 $G$ 上服从==二维均匀分布==。\n- **子区域概率**：$D \\subset G$ 时，$P\\{(X, Y) \\in D\\} = \\dfrac{S_D}{S_G}$。\n\n---\n\n### 〔定义〕二维正态分布\n\n若 $(X, Y)$ 的联合密度为\n$$f(x, y) = \\dfrac{1}{2\\pi\\sigma_1\\sigma_2\\sqrt{1 - \\rho^2}}\\,e^{-\\frac{Q}{2(1 - \\rho^2)}}$$\n\n其中\n$$\\begin{aligned} Q = {} & \\dfrac{(x - \\mu_1)^2}{\\sigma_1^2} + \\dfrac{(y - \\mu_2)^2}{\\sigma_2^2} \\\\ & - 2\\rho\\dfrac{(x - \\mu_1)(y - \\mu_2)}{\\sigma_1\\sigma_2} \\end{aligned}$$\n\n（$\\sigma_1, \\sigma_2 > 0$，$|\\rho| < 1$），则称 $(X, Y)$ 服从==二维正态分布==，记作 $(X, Y) \\sim N(\\mu_1, \\mu_2; \\sigma_1^2, \\sigma_2^2; \\rho)$。\n\n---\n\n### 〔性质〕二维正态分布的性质\n\n设 $(X, Y) \\sim N(\\mu_1, \\mu_2; \\sigma_1^2, \\sigma_2^2; \\rho)$：\n- **边缘分布**：$X \\sim N(\\mu_1, \\sigma_1^2)$，$Y \\sim N(\\mu_2, \\sigma_2^2)$；\n- **独立的充要条件**：$X$ 与 $Y$ 相互独立 $\\iff$ ==$\\rho = 0$==；\n- **线性组合**：$aX + bY$（$a, b$ 不全为零）服从一维正态分布。",
      tags: ["二维均匀分布", "二维正态分布", "边缘分布", "线性组合", "定义", "性质"]
    },
    {
      id: "prob-mrv-function",
      chapterId: "multivariate-rv",
      type: "property",
      types: ["theorem", "property"],
      module: 3,
      card: "⑥",
      title: "两个随机变量函数的分布",
      md: "### 〔方法〕离散型\n\n已知 $(X, Y)$ 的联合分布律，求 $Z = g(X, Y)$ 的分布律：列出 $Z$ 的全部取值，取值相同的把概率相加，即\n$$P\\{Z = z_k\\} = \\sum_{g(x_i, y_j) = z_k} p_{ij}$$\n\n---\n\n### 〔方法〕分布函数法\n\n已知 $(X, Y)$ 的联合密度 $f(x, y)$：\n1. **求分布函数**：\n   $$\\begin{aligned} F_Z(z) &= P\\{g(X, Y) \\le z\\} \\\\ &= \\iint_{g(x, y) \\le z} f(x, y)\\,\\mathrm{d}x\\,\\mathrm{d}y \\end{aligned}$$\n2. **求导**：$f_Z(z) = F_Z'(z)$。\n\n---\n\n### 〔定理〕和的分布（卷积公式）\n\n设 $(X, Y)$ 的联合密度为 $f(x, y)$，则 $Z = X + Y$ 的概率密度为\n$$\\begin{aligned} f_Z(z) &= \\int_{-\\infty}^{+\\infty} f(x, z - x)\\,\\mathrm{d}x \\\\ &= \\int_{-\\infty}^{+\\infty} f(z - y, y)\\,\\mathrm{d}y \\end{aligned}$$\n\n- **独立时**：$f_Z(z) = \\displaystyle\\int_{-\\infty}^{+\\infty} f_X(x)f_Y(z - x)\\,\\mathrm{d}x$。\n\n---\n\n### 〔定理〕最大值与最小值的分布\n\n设 $X_1, \\cdots, X_n$ 相互独立，分布函数分别为 $F_1(x), \\cdots, F_n(x)$：\n- **最大值** $M = \\max\\{X_1, \\cdots, X_n\\}$：$F_M(z) = F_1(z)F_2(z) \\cdots F_n(z)$；\n- **最小值** $N = \\min\\{X_1, \\cdots, X_n\\}$：$F_N(z) = 1 - [1 - F_1(z)] \\cdots [1 - F_n(z)]$；\n- **同分布时**：$F_M(z) = [F(z)]^n$，$F_N(z) = 1 - [1 - F(z)]^n$。\n\n---\n\n### 〔性质〕常见分布的可加性\n\n设 $X$ 与 $Y$ 相互独立：\n- **二项分布**：$X \\sim B(n_1, p)$，$Y \\sim B(n_2, p)$ $\\implies X + Y \\sim B(n_1 + n_2, p)$；\n- **泊松分布**：$X \\sim P(\\lambda_1)$，$Y \\sim P(\\lambda_2)$ $\\implies X + Y \\sim P(\\lambda_1 + \\lambda_2)$；\n- **正态分布**：$X \\sim N(\\mu_1, \\sigma_1^2)$，$Y \\sim N(\\mu_2, \\sigma_2^2)$ $\\implies$\n  $$aX + bY \\sim N(a\\mu_1 + b\\mu_2,\\ a^2\\sigma_1^2 + b^2\\sigma_2^2)$$\n  （$a, b$ 不全为零）。",
      tags: ["随机变量函数的分布", "卷积公式", "最大值", "最小值", "可加性", "定理", "性质"]
    },
    {
      id: "prob-nc-expectation",
      chapterId: "numerical-characteristics",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 1,
      card: "①",
      title: "数学期望",
      md: "### 〔定义〕数学期望\n\n- **离散型**：若级数 $\\sum\\limits_k x_k p_k$ ==绝对收敛==，则 $E(X) = \\sum\\limits_k x_k p_k$；\n- **连续型**：若积分 $\\displaystyle\\int_{-\\infty}^{+\\infty} xf(x)\\,\\mathrm{d}x$ ==绝对收敛==，则 $E(X) = \\displaystyle\\int_{-\\infty}^{+\\infty} xf(x)\\,\\mathrm{d}x$。\n\n级数（积分）不绝对收敛时，称 $X$ 的数学期望不存在。\n\n---\n\n### 〔定理〕随机变量函数的数学期望\n\n不必先求出函数的分布，直接用原分布计算（级数、积分绝对收敛时）：\n- **一维**：$Y = g(X)$，$E(Y) = \\sum\\limits_k g(x_k)p_k$ 或 $E(Y) = \\displaystyle\\int_{-\\infty}^{+\\infty} g(x)f(x)\\,\\mathrm{d}x$；\n- **二维**：$Z = g(X, Y)$，$E(Z) = \\sum\\limits_i \\sum\\limits_j g(x_i, y_j)p_{ij}$ 或\n  $$E(Z) = \\iint_{\\mathbb{R}^2} g(x, y)f(x, y)\\,\\mathrm{d}x\\,\\mathrm{d}y$$\n\n---\n\n### 〔性质〕数学期望的性质\n\n- **常数**：$E(C) = C$；\n- **线性**：$E(aX + b) = aE(X) + b$，$E(X + Y) = E(X) + E(Y)$（==不要求独立==）；\n- **独立时的乘积**：若 $X$ 与 $Y$ 独立，则 $E(XY) = E(X)E(Y)$。",
      tags: ["数学期望", "绝对收敛", "随机变量函数的期望", "期望的性质", "定义", "定理", "性质"]
    },
    {
      id: "prob-nc-variance",
      chapterId: "numerical-characteristics",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 1,
      card: "②",
      title: "方差",
      md: "### 〔定义〕方差与标准差\n\n若 $E\\{[X - E(X)]^2\\}$ 存在，则称它为 $X$ 的==方差==，记作 $D(X)$；$\\sqrt{D(X)}$ 称为==标准差==。\n\n---\n\n### 〔定理〕方差的计算公式\n\n$$D(X) = E(X^2) - [E(X)]^2$$\n\n---\n\n### 〔性质〕方差的性质\n\n- **常数**：$D(C) = 0$；\n- **线性变换**：$D(aX + b) = a^2 D(X)$；\n- **独立时的和差**：若 $X$ 与 $Y$ 独立，则 $D(X \\pm Y) = D(X) + D(Y)$（一般情形见卡④）；\n- **方差为零**：$D(X) = 0 \\iff P\\{X = C\\} = 1$，其中 $C = E(X)$。\n\n---\n\n### 〔定义〕标准化随机变量\n\n设 $D(X) > 0$，称\n$$X^* = \\dfrac{X - E(X)}{\\sqrt{D(X)}}$$\n\n为 $X$ 的==标准化随机变量==，$E(X^*) = 0$，$D(X^*) = 1$。",
      tags: ["方差", "标准差", "方差的计算公式", "方差的性质", "标准化随机变量", "定义", "定理", "性质"]
    },
    {
      id: "prob-nc-common-distributions",
      chapterId: "numerical-characteristics",
      type: "property",
      types: ["property"],
      module: 1,
      card: "③",
      title: "常用分布的数字特征",
      md: "### 〔性质〕常用分布的数学期望与方差\n\n| 分布 | 记号 | 期望 | 方差 |\n| :--- | :--- | :--- | :--- |\n| 0-1 分布 | $B(1, p)$ | $p$ | $p(1 - p)$ |\n| 二项分布 | $B(n, p)$ | $np$ | $np(1 - p)$ |\n| 泊松分布 | $P(\\lambda)$ | $\\lambda$ | $\\lambda$ |\n| 几何分布 | $G(p)$ | $\\frac{1}{p}$ | $\\frac{1 - p}{p^2}$ |\n| 均匀分布 | $U(a, b)$ | $\\frac{a + b}{2}$ | $\\frac{(b - a)^2}{12}$ |\n| 指数分布 | $E(\\lambda)$ | $\\frac{1}{\\lambda}$ | $\\frac{1}{\\lambda^2}$ |\n| 正态分布 | $N(\\mu, \\sigma^2)$ | $\\mu$ | $\\sigma^2$ |\n\n- **超几何分布**：$E(X) = \\dfrac{nM}{N}$。",
      tags: ["常用分布", "数学期望", "方差", "二项分布", "泊松分布", "几何分布", "均匀分布", "指数分布", "正态分布", "性质"]
    },
    {
      id: "prob-nc-covariance",
      chapterId: "numerical-characteristics",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "④",
      title: "矩与协方差",
      md: "### 〔定义〕矩\n\n- **$k$ 阶原点矩**：$E(X^k)$；\n- **$k$ 阶中心矩**：$E\\{[X - E(X)]^k\\}$；\n- **$k + l$ 阶混合矩**：$E(X^k Y^l)$；\n- **$k + l$ 阶混合中心矩**：$E\\{[X - E(X)]^k[Y - E(Y)]^l\\}$。\n\n$E(X)$ 是一阶原点矩，$D(X)$ 是二阶中心矩。\n\n---\n\n### 〔定义〕协方差\n\n$$\\operatorname{Cov}(X, Y) = E\\{[X - E(X)][Y - E(Y)]\\}$$\n\n称为 $X$ 与 $Y$ 的==协方差==，即 $1 + 1$ 阶混合中心矩。\n\n---\n\n### 〔定理〕协方差的计算公式\n\n$$\\operatorname{Cov}(X, Y) = E(XY) - E(X)E(Y)$$\n\n---\n\n### 〔性质〕协方差的性质\n\n- **对称**：$\\operatorname{Cov}(X, Y) = \\operatorname{Cov}(Y, X)$；\n- **与方差**：$\\operatorname{Cov}(X, X) = D(X)$；\n- **常数**：$\\operatorname{Cov}(X, C) = 0$；\n- **线性**：$\\operatorname{Cov}(aX + b, cY + d) = ac\\operatorname{Cov}(X, Y)$，$\\operatorname{Cov}(X_1 + X_2, Y) = \\operatorname{Cov}(X_1, Y) + \\operatorname{Cov}(X_2, Y)$；\n- **独立**：若 $X$ 与 $Y$ 独立，则 $\\operatorname{Cov}(X, Y) = 0$。\n\n---\n\n### 〔定理〕和的方差\n\n- **两个**：$D(X \\pm Y) = D(X) + D(Y) \\pm 2\\operatorname{Cov}(X, Y)$；\n- **$n$ 个**：\n  $$\\begin{aligned} & D\\left(\\sum_{i=1}^{n} a_i X_i\\right) \\\\ = {} & \\sum_{i=1}^{n} a_i^2 D(X_i) \\\\ & + 2\\sum_{1 \\le i < j \\le n} a_i a_j \\operatorname{Cov}(X_i, X_j) \\end{aligned}$$",
      tags: ["原点矩", "中心矩", "混合矩", "协方差", "协方差的性质", "和的方差", "定义", "定理", "性质"]
    },
    {
      id: "prob-nc-correlation",
      chapterId: "numerical-characteristics",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "⑤",
      title: "相关系数与不相关性",
      md: "### 〔定义〕相关系数\n\n设 $D(X) > 0$，$D(Y) > 0$，称\n$$\\rho_{XY} = \\dfrac{\\operatorname{Cov}(X, Y)}{\\sqrt{D(X)}\\sqrt{D(Y)}}$$\n\n为 $X$ 与 $Y$ 的==相关系数==；$\\rho_{XY} = 0$ 时称 $X$ 与 $Y$ ==不相关==。\n\n---\n\n### 〔性质〕相关系数的性质\n\n- **有界**：$|\\rho_{XY}| \\le 1$（由 $[\\operatorname{Cov}(X, Y)]^2 \\le D(X)D(Y)$ 得到）；\n- **线性关系**：$|\\rho_{XY}| = 1 \\iff$ 存在常数 $a \\neq 0$、$b$，使 $P\\{Y = aX + b\\} = 1$；$a > 0$ 时 $\\rho_{XY} = 1$，$a < 0$ 时 $\\rho_{XY} = -1$。\n\n---\n\n### 〔定理〕不相关的等价条件\n\n设 $D(X) > 0$，$D(Y) > 0$，以下条件等价：\n1. $\\rho_{XY} = 0$；\n2. $\\operatorname{Cov}(X, Y) = 0$；\n3. $E(XY) = E(X)E(Y)$；\n4. $D(X + Y) = D(X) + D(Y)$。\n\n---\n\n### 〔性质〕独立与不相关\n\n- **独立必不相关**：$X$ 与 $Y$ 独立 $\\implies$ 不相关，==反之不成立==；\n- **二维正态**：若 $(X, Y) \\sim N(\\mu_1, \\mu_2; \\sigma_1^2, \\sigma_2^2; \\rho)$，则参数 $\\rho$ 就是相关系数 $\\rho_{XY}$，此时 $X$ 与 $Y$ 独立 $\\iff$ 不相关（第3章卡⑤）。",
      tags: ["相关系数", "不相关", "不相关的等价条件", "独立与不相关", "二维正态分布", "定义", "定理", "性质"]
    },
    {
      id: "prob-lt-lln",
      chapterId: "limit-theorems",
      type: "theorem",
      types: ["definition", "theorem", "property"],
      module: 1,
      card: "①",
      title: "切比雪夫不等式与大数定律",
      md: "### 〔定理〕切比雪夫不等式\n\n设 $E(X) = \\mu$，$D(X) = \\sigma^2$ 存在，则对任意 $\\varepsilon > 0$，\n$$P\\{|X - \\mu| \\ge \\varepsilon\\} \\le \\dfrac{\\sigma^2}{\\varepsilon^2}$$\n\n等价地，$P\\{|X - \\mu| < \\varepsilon\\} \\ge 1 - \\dfrac{\\sigma^2}{\\varepsilon^2}$。\n\n---\n\n### 〔定义〕依概率收敛\n\n设 $Y_1, Y_2, \\cdots$ 为随机变量序列，$a$ 为常数，若对任意 $\\varepsilon > 0$，\n$$\\lim\\limits_{n \\to \\infty} P\\{|Y_n - a| < \\varepsilon\\} = 1$$\n\n则称 $Y_n$ ==依概率收敛==于 $a$，记作 $Y_n \\xrightarrow{P} a$。\n\n---\n\n### 〔性质〕依概率收敛的运算\n\n若 $X_n \\xrightarrow{P} a$，$Y_n \\xrightarrow{P} b$，函数 $g(x, y)$ 在点 $(a, b)$ 连续，则 $g(X_n, Y_n) \\xrightarrow{P} g(a, b)$。\n\n---\n\n### 〔定理〕切比雪夫大数定律\n\n设 $X_1, X_2, \\cdots$ 相互独立，方差都存在且有公共上界（$D(X_i) \\le C$），则\n$$\\dfrac{1}{n}\\sum_{i=1}^{n} X_i - \\dfrac{1}{n}\\sum_{i=1}^{n} E(X_i) \\xrightarrow{P} 0$$\n\n- **期望相同时**：若 $E(X_i) = \\mu$，则 $\\dfrac{1}{n}\\displaystyle\\sum_{i=1}^{n} X_i \\xrightarrow{P} \\mu$。\n\n---\n\n### 〔定理〕伯努利大数定律\n\n设 $n_A$ 是 $n$ 重伯努利试验中事件 $A$ 发生的次数，$p = P(A)$，则\n$$\\dfrac{n_A}{n} \\xrightarrow{P} p$$\n\n---\n\n### 〔定理〕辛钦大数定律\n\n设 $X_1, X_2, \\cdots$ ==独立同分布==，且 $E(X_i) = \\mu$ 存在（不要求方差存在），则\n$$\\dfrac{1}{n}\\sum_{i=1}^{n} X_i \\xrightarrow{P} \\mu$$\n\n- **推论**：若 $E(X_i^k)$ 存在，则 $\\dfrac{1}{n}\\displaystyle\\sum_{i=1}^{n} X_i^k \\xrightarrow{P} E(X_1^k)$。",
      tags: ["切比雪夫不等式", "依概率收敛", "切比雪夫大数定律", "伯努利大数定律", "辛钦大数定律", "定义", "定理", "性质"]
    },
    {
      id: "prob-lt-clt",
      chapterId: "limit-theorems",
      type: "theorem",
      types: ["theorem"],
      module: 2,
      card: "②",
      title: "中心极限定理",
      md: "### 〔定理〕列维-林德伯格中心极限定理\n\n设 $X_1, X_2, \\cdots$ ==独立同分布==，$E(X_i) = \\mu$，$D(X_i) = \\sigma^2 > 0$，则对任意实数 $x$，\n$$\\lim\\limits_{n \\to \\infty} P\\left\\{\\dfrac{\\sum\\limits_{i=1}^{n} X_i - n\\mu}{\\sqrt{n}\\,\\sigma} \\le x\\right\\} = \\Phi(x)$$\n\n---\n\n### 〔推论〕和与均值的近似分布\n\n在上述条件下，$n$ 充分大时：\n- **和**：$\\sum\\limits_{i=1}^{n} X_i$ 近似服从 $N(n\\mu,\\ n\\sigma^2)$；\n- **均值**：$\\bar{X} = \\dfrac{1}{n}\\sum\\limits_{i=1}^{n} X_i$ 近似服从 $N\\left(\\mu,\\ \\dfrac{\\sigma^2}{n}\\right)$。\n\n---\n\n### 〔定理〕棣莫弗-拉普拉斯中心极限定理\n\n设 $\\eta_n \\sim B(n, p)$（$0 < p < 1$），则对任意实数 $x$，\n$$\\lim\\limits_{n \\to \\infty} P\\left\\{\\dfrac{\\eta_n - np}{\\sqrt{np(1 - p)}} \\le x\\right\\} = \\Phi(x)$$\n\n- **近似计算**：$n$ 很大时，$B(n, p)$ 可用 $N(np,\\ np(1 - p))$ 近似。",
      tags: ["中心极限定理", "列维-林德伯格定理", "棣莫弗-拉普拉斯定理", "正态近似", "定理"]
    },
    {
      id: "prob-st-sample",
      chapterId: "statistics-basics",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "①",
      title: "总体、样本与统计量",
      md: "### 〔定义〕总体与个体\n\n研究对象的全体称为==总体==，组成总体的每个元素称为==个体==；总体用一个随机变量 $X$ 表示，$X$ 的分布称为总体的分布。\n\n---\n\n### 〔定义〕简单随机样本\n\n若 $X_1, X_2, \\cdots, X_n$ ==相互独立==，且都与总体 $X$ ==同分布==，则称它们为来自总体 $X$、容量为 $n$ 的==简单随机样本==（简称样本），其观测值 $x_1, \\cdots, x_n$ 称为样本值。\n- **联合分布**：总体的分布函数为 $F(x)$ 时，样本的联合分布函数为 $F(x_1)F(x_2) \\cdots F(x_n)$；有密度 $f(x)$ 时，联合密度为 $\\prod\\limits_{i=1}^{n} f(x_i)$。\n\n---\n\n### 〔定义〕统计量\n\n样本 $X_1, \\cdots, X_n$ 的函数 $g(X_1, \\cdots, X_n)$ 若==不含任何未知参数==，则称为==统计量==。\n\n---\n\n### 〔定义〕常用统计量\n\n- **样本均值**：$\\bar{X} = \\dfrac{1}{n}\\sum\\limits_{i=1}^{n} X_i$；\n- **样本方差**：$S^2 = \\dfrac{1}{n - 1}\\sum\\limits_{i=1}^{n} (X_i - \\bar{X})^2$，样本标准差 $S = \\sqrt{S^2}$；\n- **样本 $k$ 阶原点矩**：$A_k = \\dfrac{1}{n}\\sum\\limits_{i=1}^{n} X_i^k$；\n- **样本 $k$ 阶中心矩**：$B_k = \\dfrac{1}{n}\\sum\\limits_{i=1}^{n} (X_i - \\bar{X})^k$。\n\n---\n\n### 〔性质〕样本均值与样本方差的数字特征\n\n设总体的 $E(X) = \\mu$，$D(X) = \\sigma^2$，则\n$$E(\\bar{X}) = \\mu, \\quad D(\\bar{X}) = \\dfrac{\\sigma^2}{n}, \\quad E(S^2) = \\sigma^2$$",
      tags: ["总体", "个体", "简单随机样本", "统计量", "样本均值", "样本方差", "样本矩", "定义", "性质"]
    },
    {
      id: "prob-st-sampling-distributions",
      chapterId: "statistics-basics",
      type: "definition",
      types: ["definition"],
      module: 2,
      card: "②",
      title: "分位点与三大抽样分布",
      md: "### 〔定义〕上 $\\alpha$ 分位点\n\n对给定的 $\\alpha\\ (0 < \\alpha < 1)$，满足 $P\\{X > x_\\alpha\\} = \\alpha$ 的点 $x_\\alpha$ 称为 $X$ 的分布的==上 $\\alpha$ 分位点==。\n- **标准正态分布**：上 $\\alpha$ 分位点记作 $z_\\alpha$，$\\Phi(z_\\alpha) = 1 - \\alpha$，且 $z_{1-\\alpha} = -z_\\alpha$。\n\n---\n\n### 〔定义〕$\\chi^2$ 分布\n\n设 $X_1, \\cdots, X_n$ 相互独立，都服从 $N(0, 1)$，则\n$$\\chi^2 = X_1^2 + X_2^2 + \\cdots + X_n^2$$\n\n服从自由度为 $n$ 的 ==$\\chi^2$ 分布==，记作 $\\chi^2 \\sim \\chi^2(n)$，上 $\\alpha$ 分位点记作 $\\chi^2_\\alpha(n)$。\n- **可加性**：$\\chi_1^2 \\sim \\chi^2(n_1)$，$\\chi_2^2 \\sim \\chi^2(n_2)$ 且相互独立，则 $\\chi_1^2 + \\chi_2^2 \\sim \\chi^2(n_1 + n_2)$；\n- **数字特征**：$E(\\chi^2) = n$，$D(\\chi^2) = 2n$。\n\n---\n\n### 〔定义〕$t$ 分布\n\n设 $X \\sim N(0, 1)$，$Y \\sim \\chi^2(n)$，且 $X$ 与 $Y$ 相互独立，则\n$$T = \\dfrac{X}{\\sqrt{Y/n}}$$\n\n服从自由度为 $n$ 的 ==$t$ 分布==，记作 $T \\sim t(n)$，上 $\\alpha$ 分位点记作 $t_\\alpha(n)$。\n- **对称**：密度关于 $0$ 对称，$t_{1-\\alpha}(n) = -t_\\alpha(n)$；\n- **极限**：$n \\to \\infty$ 时，$t(n)$ 趋于 $N(0, 1)$。\n\n---\n\n### 〔定义〕$F$ 分布\n\n设 $U \\sim \\chi^2(n_1)$，$V \\sim \\chi^2(n_2)$，且 $U$ 与 $V$ 相互独立，则\n$$F = \\dfrac{U/n_1}{V/n_2}$$\n\n服从自由度为 $(n_1, n_2)$ 的 ==$F$ 分布==，记作 $F \\sim F(n_1, n_2)$，上 $\\alpha$ 分位点记作 $F_\\alpha(n_1, n_2)$。\n- **倒数**：$F \\sim F(n_1, n_2) \\implies \\dfrac{1}{F} \\sim F(n_2, n_1)$；\n- **分位点**：$F_{1-\\alpha}(n_1, n_2) = \\dfrac{1}{F_\\alpha(n_2, n_1)}$；\n- **与 $t$ 分布**：$T \\sim t(n) \\implies T^2 \\sim F(1, n)$。",
      tags: ["上α分位点", "χ²分布", "t分布", "F分布", "定义"]
    },
    {
      id: "prob-st-normal-sampling",
      chapterId: "statistics-basics",
      type: "theorem",
      types: ["theorem"],
      module: 2,
      card: "③",
      title: "正态总体的抽样分布",
      md: "### 〔定理〕单个正态总体的抽样分布\n\n设 $X_1, \\cdots, X_n$ 是来自 $N(\\mu, \\sigma^2)$ 的样本，则：\n1. **样本均值**：$\\bar{X} \\sim N\\left(\\mu, \\dfrac{\\sigma^2}{n}\\right)$，即 $\\dfrac{\\bar{X} - \\mu}{\\sigma/\\sqrt{n}} \\sim N(0, 1)$；\n2. **样本方差**：$\\dfrac{(n - 1)S^2}{\\sigma^2} \\sim \\chi^2(n - 1)$；\n3. **独立性**：$\\bar{X}$ 与 $S^2$ ==相互独立==；\n4. **用 $S$ 代替 $\\sigma$**：$\\dfrac{\\bar{X} - \\mu}{S/\\sqrt{n}} \\sim t(n - 1)$。\n\n另有：$\\dfrac{1}{\\sigma^2}\\sum\\limits_{i=1}^{n} (X_i - \\mu)^2 \\sim \\chi^2(n)$。\n\n---\n\n### 〔定理〕两个正态总体的抽样分布\n\n设 $X_1, \\cdots, X_{n_1}$ 来自 $N(\\mu_1, \\sigma_1^2)$，$Y_1, \\cdots, Y_{n_2}$ 来自 $N(\\mu_2, \\sigma_2^2)$，两样本相互独立，样本方差分别为 $S_1^2$、$S_2^2$：\n1. **方差已知**：\n   $$\\dfrac{(\\bar{X} - \\bar{Y}) - (\\mu_1 - \\mu_2)}{\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}} \\sim N(0, 1)$$\n2. **方差相等但未知**（$\\sigma_1^2 = \\sigma_2^2$）：\n   $$\\dfrac{(\\bar{X} - \\bar{Y}) - (\\mu_1 - \\mu_2)}{S_w\\sqrt{1/n_1 + 1/n_2}} \\sim t(n_1 + n_2 - 2)$$\n   其中 $S_w^2 = \\dfrac{(n_1 - 1)S_1^2 + (n_2 - 1)S_2^2}{n_1 + n_2 - 2}$；\n3. **方差比**：\n   $$\\dfrac{S_1^2/S_2^2}{\\sigma_1^2/\\sigma_2^2} \\sim F(n_1 - 1,\\ n_2 - 1)$$",
      tags: ["正态总体", "抽样分布", "样本均值的分布", "样本方差的分布", "两个正态总体", "定理"]
    },
    {
      id: "prob-pe-point",
      chapterId: "parameter-estimation",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "①",
      title: "矩估计与最大似然估计",
      md: "### 〔定义〕点估计\n\n设总体的分布含未知参数 $\\theta$，用统计量 $\\hat{\\theta} = \\hat{\\theta}(X_1, \\cdots, X_n)$ 估计 $\\theta$，称 $\\hat{\\theta}$ 为 $\\theta$ 的==估计量==，代入样本值得到的数值称为==估计值==。\n\n---\n\n### 〔方法〕矩估计法\n\n设总体含 $k$ 个未知参数 $\\theta_1, \\cdots, \\theta_k$，且前 $k$ 阶原点矩存在：\n1. **求总体矩**：$\\mu_l = E(X^l)$，它是 $\\theta_1, \\cdots, \\theta_k$ 的函数（$l = 1, \\cdots, k$）；\n2. **令样本矩等于总体矩**：$\\mu_l(\\theta_1, \\cdots, \\theta_k) = A_l = \\dfrac{1}{n}\\sum\\limits_{i=1}^{n} X_i^l$；\n3. **解方程组**：解出的 $\\hat{\\theta}_1, \\cdots, \\hat{\\theta}_k$ 即为==矩估计量==。\n\n---\n\n### 〔定义〕似然函数\n\n设样本值为 $x_1, \\cdots, x_n$：\n- **离散型总体**：$L(\\theta) = \\prod\\limits_{i=1}^{n} P\\{X = x_i;\\ \\theta\\}$；\n- **连续型总体**：$L(\\theta) = \\prod\\limits_{i=1}^{n} f(x_i;\\ \\theta)$。\n\n使 $L(\\theta)$ 达到最大的 $\\hat{\\theta}$ 称为 $\\theta$ 的==最大似然估计==。\n\n---\n\n### 〔方法〕最大似然估计法\n\n1. **写似然函数**：$L(\\theta)$；\n2. **取对数求导**：令 $\\dfrac{\\mathrm{d}\\ln L(\\theta)}{\\mathrm{d}\\theta} = 0$（多个参数时令各偏导数为零），解出 $\\hat{\\theta}$；\n3. **无驻点时**：若似然方程无解（如 $L(\\theta)$ 关于 $\\theta$ 单调），由 $L(\\theta)$ 的单调性和参数的取值范围直接确定使 $L$ 最大的 $\\hat{\\theta}$。\n\n---\n\n### 〔性质〕最大似然估计的不变性\n\n若 $\\hat{\\theta}$ 是 $\\theta$ 的最大似然估计，$u = u(\\theta)$ 具有单值反函数，则 $u(\\hat{\\theta})$ 是 $u(\\theta)$ 的最大似然估计。",
      tags: ["点估计", "估计量", "矩估计法", "似然函数", "最大似然估计", "不变性", "定义", "性质"]
    },
    {
      id: "prob-pe-criteria",
      chapterId: "parameter-estimation",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "②",
      title: "估计量的评选标准",
      md: "### 〔定义〕无偏性\n\n若 $E(\\hat{\\theta}) = \\theta$，则称 $\\hat{\\theta}$ 为 $\\theta$ 的==无偏估计量==。\n\n---\n\n### 〔定义〕有效性\n\n设 $\\hat{\\theta}_1$、$\\hat{\\theta}_2$ 都是 $\\theta$ 的无偏估计量，若 $D(\\hat{\\theta}_1) \\le D(\\hat{\\theta}_2)$，则称 $\\hat{\\theta}_1$ 比 $\\hat{\\theta}_2$ ==有效==。\n\n---\n\n### 〔定义〕一致性（相合性）\n\n若 $n \\to \\infty$ 时 $\\hat{\\theta} \\xrightarrow{P} \\theta$，则称 $\\hat{\\theta}$ 为 $\\theta$ 的==一致估计量==（相合估计量）。\n\n---\n\n### 〔性质〕常见结论\n\n- **均值与方差**：$\\bar{X}$ 是 $\\mu$ 的无偏估计，$S^2$ 是 $\\sigma^2$ 的无偏估计；$B_2 = \\dfrac{n - 1}{n}S^2$ 是 $\\sigma^2$ 的有偏估计；\n- **样本矩的一致性**：样本 $k$ 阶原点矩 $A_k$ 是总体 $k$ 阶原点矩 $E(X^k)$ 的一致估计（由辛钦大数定律，第5章卡①）。",
      tags: ["无偏性", "有效性", "一致性", "相合性", "无偏估计", "定义", "性质"]
    },
    {
      id: "prob-pe-interval",
      chapterId: "parameter-estimation",
      type: "definition",
      types: ["definition", "theorem", "property"],
      module: 2,
      card: "③",
      title: "置信区间与单个正态总体",
      md: "### 〔定义〕置信区间\n\n对给定的 $\\alpha\\ (0 < \\alpha < 1)$，若统计量 $\\hat{\\theta}_1 < \\hat{\\theta}_2$ 满足\n$$P\\{\\hat{\\theta}_1 < \\theta < \\hat{\\theta}_2\\} = 1 - \\alpha$$\n\n则称 $(\\hat{\\theta}_1, \\hat{\\theta}_2)$ 为 $\\theta$ 的置信水平为 $1 - \\alpha$ 的==置信区间==。\n- **单侧置信限**：若 $P\\{\\theta > \\hat{\\theta}_1\\} = 1 - \\alpha$，称 $\\hat{\\theta}_1$ 为==单侧置信下限==；若 $P\\{\\theta < \\hat{\\theta}_2\\} = 1 - \\alpha$，称 $\\hat{\\theta}_2$ 为==单侧置信上限==。\n\n---\n\n### 〔方法〕枢轴量法\n\n1. **找枢轴量**：找一个含 $\\theta$、不含其他未知参数、且分布已知的样本函数 $W(X_1, \\cdots, X_n;\\ \\theta)$；\n2. **定分位点**：取 $a, b$ 使 $P\\{a < W < b\\} = 1 - \\alpha$（通常两侧各占 $\\frac{\\alpha}{2}$）；\n3. **解不等式**：由 $a < W < b$ 解出 $\\hat{\\theta}_1 < \\theta < \\hat{\\theta}_2$。\n\n---\n\n### 〔定理〕正态总体均值的置信区间\n\n设样本来自 $N(\\mu, \\sigma^2)$，$\\mu$ 的置信水平为 $1 - \\alpha$ 的置信区间（写成「中心 $\\pm$ 半径」的形式）：\n- **$\\sigma^2$ 已知**：\n  $$\\bar{X} \\pm \\dfrac{\\sigma}{\\sqrt{n}}z_{\\alpha/2}$$\n- **$\\sigma^2$ 未知**：\n  $$\\bar{X} \\pm \\dfrac{S}{\\sqrt{n}}t_{\\alpha/2}(n - 1)$$\n\n---\n\n### 〔定理〕正态总体方差的置信区间\n\n设样本来自 $N(\\mu, \\sigma^2)$，$\\mu$ 未知，$\\sigma^2$ 的置信水平为 $1 - \\alpha$ 的置信区间为\n$$\\left(\\dfrac{(n - 1)S^2}{\\chi^2_{\\alpha/2}(n - 1)},\\ \\ \\dfrac{(n - 1)S^2}{\\chi^2_{1-\\alpha/2}(n - 1)}\\right)$$",
      tags: ["置信区间", "置信水平", "单侧置信限", "枢轴量", "正态总体均值", "正态总体方差", "定义", "定理", "性质"]
    },
    {
      id: "prob-pe-two-populations",
      chapterId: "parameter-estimation",
      type: "theorem",
      types: ["theorem"],
      module: 2,
      card: "④",
      title: "两个正态总体的置信区间",
      md: "### 〔定理〕均值差的置信区间\n\n设两样本分别来自 $N(\\mu_1, \\sigma_1^2)$、$N(\\mu_2, \\sigma_2^2)$ 且相互独立，$\\mu_1 - \\mu_2$ 的置信水平为 $1 - \\alpha$ 的置信区间：\n- **$\\sigma_1^2, \\sigma_2^2$ 已知**：\n  $$(\\bar{X} - \\bar{Y}) \\pm z_{\\alpha/2}\\sqrt{\\dfrac{\\sigma_1^2}{n_1} + \\dfrac{\\sigma_2^2}{n_2}}$$\n- **$\\sigma_1^2 = \\sigma_2^2$ 未知**：\n  $$(\\bar{X} - \\bar{Y}) \\pm t_{\\alpha/2}(n_1 + n_2 - 2)\\,S_w\\sqrt{\\dfrac{1}{n_1} + \\dfrac{1}{n_2}}$$\n  其中 $S_w$ 见第6章卡③。\n\n---\n\n### 〔定理〕方差比的置信区间\n\n$\\mu_1, \\mu_2$ 未知时，$\\dfrac{\\sigma_1^2}{\\sigma_2^2}$ 的置信水平为 $1 - \\alpha$ 的置信区间：\n- **下限**：$\\dfrac{S_1^2/S_2^2}{F_{\\alpha/2}(n_1 - 1, n_2 - 1)}$；\n- **上限**：$\\dfrac{S_1^2/S_2^2}{F_{1-\\alpha/2}(n_1 - 1, n_2 - 1)}$。",
      tags: ["两个正态总体", "均值差的置信区间", "方差比的置信区间", "定理"]
    },
    {
      id: "prob-ht-basics",
      chapterId: "hypothesis-testing",
      type: "definition",
      types: ["definition", "property"],
      module: 1,
      card: "①",
      title: "假设检验的基本思想与两类错误",
      md: "### 〔定义〕原假设与备择假设\n\n- **原假设与备择假设**：待检验的假设称为==原假设==，记作 $H_0$；与之对立的假设称为==备择假设==，记作 $H_1$；\n- **双侧与单侧**：$H_1: \\theta \\neq \\theta_0$ 为双侧检验；$H_1: \\theta > \\theta_0$（右侧）或 $H_1: \\theta < \\theta_0$（左侧）为单侧检验。\n\n---\n\n### 〔方法〕假设检验的基本思想\n\n依据==小概率原理==（小概率事件在一次试验中几乎不会发生）作反证：\n1. **先假定 $H_0$ 成立**；\n2. **看是否矛盾**：若在 $H_0$ 成立的条件下，一个概率很小（不超过 $\\alpha$）的事件在一次抽样中发生了，则拒绝 $H_0$；否则接受 $H_0$。\n\n---\n\n### 〔定义〕检验统计量与拒绝域\n\n- **检验统计量**：用于判断是否拒绝 $H_0$ 的统计量；\n- **拒绝域**：使 $H_0$ 被拒绝的检验统计量取值的范围，记作 $W$；\n- **临界点**：拒绝域的边界点。\n\n---\n\n### 〔定义〕两类错误\n\n- **第一类错误（弃真）**：$H_0$ 为真而拒绝 $H_0$，要求 $P\\{\\text{拒绝 } H_0 \\mid H_0 \\text{ 为真}\\} \\le \\alpha$，$\\alpha$ 称为==显著性水平==；\n- **第二类错误（取伪）**：$H_0$ 不真而接受 $H_0$，其概率记作 $\\beta$；\n- **二者关系**：样本容量 $n$ 固定时，$\\alpha$ 减小则 $\\beta$ 增大；只控制第一类错误的检验称为==显著性检验==。\n\n---\n\n### 〔方法〕假设检验的一般步骤\n\n1. **提出假设**：写出 $H_0$ 与 $H_1$；\n2. **选统计量**：选取检验统计量，写出 $H_0$ 为真时它的分布；\n3. **定拒绝域**：按显著性水平 $\\alpha$ 与 $H_1$ 的方向（双侧或单侧）确定拒绝域；\n4. **下结论**：计算统计量的观测值，落入拒绝域则拒绝 $H_0$，否则接受 $H_0$。\n\n---\n\n### 〔性质〕假设检验与置信区间的关系\n\n对双侧检验 $H_0: \\theta = \\theta_0$，$H_1: \\theta \\neq \\theta_0$：在显著性水平 $\\alpha$ 下接受 $H_0$ $\\iff$ $\\theta_0$ 落在 $\\theta$ 的置信水平为 $1 - \\alpha$ 的置信区间内（第7章卡③）。",
      tags: ["原假设", "备择假设", "小概率原理", "检验统计量", "拒绝域", "两类错误", "显著性水平", "定义", "性质"]
    },
    {
      id: "prob-ht-one-population",
      chapterId: "hypothesis-testing",
      type: "theorem",
      types: ["theorem"],
      module: 2,
      card: "②",
      title: "单个正态总体的检验",
      md: "### 〔定理〕均值的检验（$\\sigma^2$ 已知，$Z$ 检验）\n\n$H_0: \\mu = \\mu_0$。检验统计量\n$$Z = \\dfrac{\\bar{X} - \\mu_0}{\\sigma/\\sqrt{n}}$$\n\n$H_0$ 为真时 $Z \\sim N(0, 1)$，拒绝域：\n- **双侧**（$H_1: \\mu \\neq \\mu_0$）：$|Z| \\ge z_{\\alpha/2}$；\n- **右侧**（$H_1: \\mu > \\mu_0$）：$Z \\ge z_\\alpha$；\n- **左侧**（$H_1: \\mu < \\mu_0$）：$Z \\le -z_\\alpha$。\n\n---\n\n### 〔定理〕均值的检验（$\\sigma^2$ 未知，$t$ 检验）\n\n$H_0: \\mu = \\mu_0$。检验统计量\n$$T = \\dfrac{\\bar{X} - \\mu_0}{S/\\sqrt{n}}$$\n\n$H_0$ 为真时 $T \\sim t(n - 1)$，拒绝域：\n- **双侧**：$|T| \\ge t_{\\alpha/2}(n - 1)$；\n- **右侧**：$T \\ge t_\\alpha(n - 1)$；\n- **左侧**：$T \\le -t_\\alpha(n - 1)$。\n\n---\n\n### 〔定理〕方差的检验（$\\chi^2$ 检验）\n\n$\\mu$ 未知，$H_0: \\sigma^2 = \\sigma_0^2$。检验统计量\n$$\\chi^2 = \\dfrac{(n - 1)S^2}{\\sigma_0^2}$$\n\n$H_0$ 为真时 $\\chi^2 \\sim \\chi^2(n - 1)$，拒绝域：\n- **双侧**（$H_1: \\sigma^2 \\neq \\sigma_0^2$）：$\\chi^2 \\ge \\chi^2_{\\alpha/2}(n - 1)$ 或 $\\chi^2 \\le \\chi^2_{1-\\alpha/2}(n - 1)$；\n- **右侧**（$H_1: \\sigma^2 > \\sigma_0^2$）：$\\chi^2 \\ge \\chi^2_\\alpha(n - 1)$；\n- **左侧**（$H_1: \\sigma^2 < \\sigma_0^2$）：$\\chi^2 \\le \\chi^2_{1-\\alpha}(n - 1)$。",
      tags: ["Z检验", "t检验", "χ²检验", "均值的检验", "方差的检验", "定理"]
    },
    {
      id: "prob-ht-two-populations",
      chapterId: "hypothesis-testing",
      type: "theorem",
      types: ["theorem"],
      module: 2,
      card: "③",
      title: "两个正态总体的检验",
      md: "### 〔定理〕均值差的检验（方差已知，$Z$ 检验）\n\n$H_0: \\mu_1 = \\mu_2$。检验统计量\n$$Z = \\dfrac{\\bar{X} - \\bar{Y}}{\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}}$$\n\n$H_0$ 为真时 $Z \\sim N(0, 1)$；双侧拒绝域 $|Z| \\ge z_{\\alpha/2}$，单侧与卡② 的 $Z$ 检验相同。\n\n---\n\n### 〔定理〕均值差的检验（方差相等但未知，$t$ 检验）\n\n$H_0: \\mu_1 = \\mu_2$。检验统计量\n$$T = \\dfrac{\\bar{X} - \\bar{Y}}{S_w\\sqrt{1/n_1 + 1/n_2}}$$\n\n$H_0$ 为真时 $T \\sim t(n_1 + n_2 - 2)$（$S_w$ 见第6章卡③）：\n- **双侧**：$|T| \\ge t_{\\alpha/2}(n_1 + n_2 - 2)$；\n- **右侧**：$T \\ge t_\\alpha(n_1 + n_2 - 2)$；\n- **左侧**：$T \\le -t_\\alpha(n_1 + n_2 - 2)$。\n\n---\n\n### 〔定理〕方差比的检验（$F$ 检验）\n\n$\\mu_1, \\mu_2$ 未知，$H_0: \\sigma_1^2 = \\sigma_2^2$。检验统计量\n$$F = \\dfrac{S_1^2}{S_2^2}$$\n\n$H_0$ 为真时 $F \\sim F(n_1 - 1, n_2 - 1)$，拒绝域：\n- **双侧**：$F \\ge F_{\\alpha/2}(n_1 - 1, n_2 - 1)$ 或 $F \\le F_{1-\\alpha/2}(n_1 - 1, n_2 - 1)$；\n- **右侧**（$H_1: \\sigma_1^2 > \\sigma_2^2$）：$F \\ge F_\\alpha(n_1 - 1, n_2 - 1)$；\n- **左侧**（$H_1: \\sigma_1^2 < \\sigma_2^2$）：$F \\le F_{1-\\alpha}(n_1 - 1, n_2 - 1)$。",
      tags: ["两个正态总体", "均值差的检验", "方差比的检验", "F检验", "定理"]
    }
  ]
});
