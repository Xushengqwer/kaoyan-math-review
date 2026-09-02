registerSubject({
  id: "probability",
  name: "概率论与数理统计",
  color: "#a1751f",
  chapters: [
    { id: "probability-basics", name: "随机事件与概率", order: 1 },
    { id: "random-variable", name: "一维随机变量及其分布", order: 2 },
    { id: "multivariate-rv", name: "多维随机变量及其分布", order: 3 },
    { id: "numerical-characteristics", name: "随机变量的数字特征", order: 4 },
    { id: "limit-theorems", name: "大数定律与中心极限定理", order: 5 },
    { id: "statistics-basics", name: "数理统计的基本概念", order: 6 },
    { id: "parameter-estimation", name: "参数估计", order: 7 },
    { id: "hypothesis-testing", name: "假设检验", order: 8 }
  ],
  items: [
    {
      id: "prob-basics-def-sample-space",
      chapterId: "probability-basics",
      type: "definition",
      title: "样本空间与随机事件",
      statement: "随机试验 $E$ 的所有可能结果组成的集合称为<strong>样本空间</strong>，记作 $\\Omega$，$\\Omega$ 中的元素称为样本点。样本空间的子集称为<strong>随机事件</strong>，简称事件，仅含一个样本点的事件称为<strong>基本事件</strong>；$\\Omega$ 称为<strong>必然事件</strong>，空集 $\\varnothing$ 称为<strong>不可能事件</strong>。",
      explanation: "随机试验需满足三个特点：<ul><li>可重复</li><li>结果不止一个且试验前明确</li><li>每次试验前不能确定哪个结果出现</li></ul>事件发生当且仅当该子集中某一样本点出现。",
      tags: ["样本空间", "随机事件", "基本概念"]
    },
    {
      id: "prob-basics-def-event-relations",
      chapterId: "probability-basics",
      type: "definition",
      title: "事件的关系与运算",
      statement: "<ul><li><strong>包含：</strong>$A\\subset B$ 表示 $A$ 发生必导致 $B$ 发生。</li><li><strong>和事件：</strong>$A\\cup B$（$A,B$ 至少一个发生）。</li><li><strong>积事件：</strong>$A\\cap B$（简记 $AB$，$A,B$ 同时发生）。</li><li><strong>差事件：</strong>$A-B=A\\overline{B}$（$A$ 发生而 $B$ 不发生）。</li><li><strong>互斥（互不相容）：</strong>$AB=\\varnothing$。</li><li><strong>对立事件：</strong>$A\\cup B=\\Omega$ 且 $AB=\\varnothing$，记 $B=\\overline{A}$。</li></ul>",
      explanation: "<u>对立事件一定互斥，但互斥事件不一定对立</u>（互斥只要求不能同时发生，未要求必有一个发生）。差事件常用公式 $A-B=A-AB=A\\overline{B}$ 便于计算。",
      tags: ["事件关系", "并交差", "互斥对立"]
    },
    {
      id: "prob-basics-prop-de-morgan",
      chapterId: "probability-basics",
      type: "property",
      title: "事件运算的德摩根律",
      statement: "$\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$，$\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$；一般地，$\\overline{\\bigcup\\limits_{i=1}^{n}A_i}=\\bigcap\\limits_{i=1}^{n}\\overline{A_i}$，$\\overline{\\bigcap\\limits_{i=1}^{n}A_i}=\\bigcup\\limits_{i=1}^{n}\\overline{A_i}$。",
      explanation: "记忆口诀：<strong>\"取反变符号，并变交、交变并\"</strong>。是事件运算化简、求对立事件概率（正难则反）的常用工具。",
      tags: ["德摩根律", "事件运算"]
    },
    {
      id: "prob-basics-def-classical",
      chapterId: "probability-basics",
      type: "definition",
      title: "古典概型",
      statement: "若随机试验的样本空间 $\\Omega$ 只含有限个样本点，且每个样本点发生的可能性相同，则称此试验为<strong>古典概型（等可能概型）</strong>。事件 $A$ 所含样本点数为 $k$，$\\Omega$ 中样本点总数为 $n$，则 $P(A)=\\dfrac{k}{n}=\\dfrac{A\\text{ 所包含的基本事件数}}{\\Omega\\text{ 中基本事件总数}}$。",
      explanation: "求解古典概型问题的关键是正确使用排列组合计数：<ul><li>不放回抽样用组合</li><li>放回抽样用乘法原理</li><li>有序问题用排列</li></ul><u>计数时分子分母的计数口径要一致</u>（都算作有序或都算作无序）。",
      tags: ["古典概型", "等可能", "排列组合"]
    },
    {
      id: "prob-basics-def-geometric",
      chapterId: "probability-basics",
      type: "definition",
      title: "几何概型",
      statement: "若样本空间 $\\Omega$ 是某个可度量的几何区域，且样本点落在 $\\Omega$ 中任一子区域的概率只与该子区域的度量（长度、面积、体积）成正比而与其位置和形状无关，则称此试验为<strong>几何概型</strong>，此时 $P(A)=\\dfrac{A\\text{ 的度量}}{\\Omega\\text{ 的度量}}$。",
      explanation: "常见于会面问题、随机投点等题型，解题关键是<strong>把随机变量取值范围转化为平面区域，再求面积比</strong>。",
      tags: ["几何概型", "度量比"]
    },
    {
      id: "prob-basics-def-axioms",
      chapterId: "probability-basics",
      type: "definition",
      title: "概率的公理化定义",
      statement: "设 $E$ 的样本空间为 $\\Omega$，对每一事件 $A$ 赋予一个实数 $P(A)$，若满足：<ul><li><strong>非负性：</strong>$P(A)\\geqslant 0$。</li><li><strong>规范性：</strong>$P(\\Omega)=1$。</li><li><strong>可列可加性：</strong>对两两互不相容的事件 $A_1,A_2,\\cdots$ 有 $P\\left(\\bigcup\\limits_{i=1}^{\\infty}A_i\\right)=\\sum\\limits_{i=1}^{\\infty}P(A_i)$。</li></ul>则称 $P(A)$ 为事件 $A$ 的概率。",
      explanation: "这三条<strong>公理</strong>是概率论的公理化基础，古典概型、几何概型、后续所有分布的概率都必须满足这三条。由此可推出 $P(\\varnothing)=0$、有限可加性等一系列基本性质。",
      tags: ["概率公理", "可列可加性"]
    },
    {
      id: "prob-basics-prop-basic",
      chapterId: "probability-basics",
      type: "property",
      title: "概率的基本性质",
      statement: "<ul><li>$P(\\varnothing)=0$。</li><li><strong>有限可加性：</strong>若 $A_1,\\cdots,A_n$ 两两互斥，则 $P\\left(\\bigcup\\limits_{i=1}^{n}A_i\\right)=\\sum\\limits_{i=1}^{n}P(A_i)$。</li><li>$P(\\overline{A})=1-P(A)$。</li><li>若 $A\\subset B$，则 $P(B-A)=P(B)-P(A)$，且 $P(A)\\leqslant P(B)$。</li><li>对任意事件 $A,B$，$P(A-B)=P(A)-P(AB)$。</li></ul>",
      explanation: "<strong>\"正难则反\"</strong>是概率论解题的核心技巧之一，<u>遇到\"至少\"\"至多\"型问题优先考虑对立事件 $P(A)=1-P(\\overline{A})$</u>。",
      tags: ["概率性质", "对立事件"]
    },
    {
      id: "prob-basics-thm-addition",
      chapterId: "probability-basics",
      type: "theorem",
      title: "概率加法公式",
      statement: "对任意两事件 $A,B$，$P(A\\cup B)=P(A)+P(B)-P(AB)$；对任意三事件 $A,B,C$，$P(A\\cup B\\cup C)=P(A)+P(B)+P(C)-P(AB)-P(AC)-P(BC)+P(ABC)$。",
      explanation: "当 $A,B$ 互斥时 $P(AB)=0$，退化为有限可加性。这是<strong>容斥原理</strong>在概率上的体现，三事件公式记忆口诀：<strong>\"单加、两两减、三个加回来\"</strong>。",
      tags: ["加法公式", "容斥原理"]
    },
    {
      id: "prob-basics-def-conditional",
      chapterId: "probability-basics",
      type: "definition",
      title: "条件概率",
      statement: "设 $A,B$ 是两个事件，且 $P(A)>0$，则称 $P(B\\mid A)=\\dfrac{P(AB)}{P(A)}$ 为在事件 $A$ 发生的条件下事件 $B$ 发生的<strong>条件概率</strong>。",
      explanation: "<u>条件概率本质上仍是概率</u>，满足概率的三条公理（非负性、规范性、可列可加性），因此普通概率的一切性质（加法公式、德摩根律等）对条件概率同样成立。",
      tags: ["条件概率", "定义"]
    },
    {
      id: "prob-basics-thm-multiplication",
      chapterId: "probability-basics",
      type: "theorem",
      title: "乘法公式",
      statement: "若 $P(A)>0$，则 $P(AB)=P(A)P(B\\mid A)$；一般地，若 $P(A_1A_2\\cdots A_{n-1})>0$，则 $P(A_1A_2\\cdots A_n)=P(A_1)P(A_2\\mid A_1)P(A_3\\mid A_1A_2)\\cdots P(A_n\\mid A_1A_2\\cdots A_{n-1})$。",
      explanation: "乘法公式常用于把多阶段随机试验（如不放回摸球）的联合概率分解为<strong>逐步条件概率的乘积</strong>，是全概率公式推导的基础。",
      tags: ["乘法公式", "多阶段试验"]
    },
    {
      id: "prob-basics-def-partition",
      chapterId: "probability-basics",
      type: "definition",
      title: "样本空间的划分",
      statement: "设 $\\Omega$ 为试验 $E$ 的样本空间，$B_1,B_2,\\cdots,B_n$ 为 $E$ 的一组事件，若<ul><li>$B_iB_j=\\varnothing\\ (i\\neq j)$；</li><li>$B_1\\cup B_2\\cup\\cdots\\cup B_n=\\Omega$；</li></ul>则称 $B_1,B_2,\\cdots,B_n$ 为样本空间 $\\Omega$ 的一个<strong>划分</strong>（完备事件组）。",
      explanation: "每次试验中，事件组 $B_1,\\cdots,B_n$ 中<u>必有且只有一个发生</u>，这是全概率公式与贝叶斯公式成立的前提条件。",
      tags: ["划分", "完备事件组"]
    },
    {
      id: "prob-basics-thm-total-probability",
      chapterId: "probability-basics",
      type: "theorem",
      title: "全概率公式",
      statement: "设 $B_1,B_2,\\cdots,B_n$ 为样本空间 $\\Omega$ 的一个划分，且 $P(B_i)>0\\ (i=1,2,\\cdots,n)$，则对任一事件 $A$ 有 $P(A)=\\sum\\limits_{i=1}^{n}P(B_i)P(A\\mid B_i)$。",
      explanation: "全概率公式用于<strong>\"由因求果\"</strong>：把复杂事件 $A$ 按导致其发生的不同原因（途径）$B_i$ 分类，分别求条件概率再加权求和。关键是正确划分完备事件组。",
      diagram: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="260" height="140" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
        <line x1="90" y1="20" x2="90" y2="160" stroke="currentColor" stroke-width="1" opacity="0.4"/>
        <line x1="150" y1="20" x2="150" y2="160" stroke="currentColor" stroke-width="1" opacity="0.4"/>
        <line x1="210" y1="20" x2="210" y2="160" stroke="currentColor" stroke-width="1" opacity="0.4"/>
        <ellipse cx="150" cy="95" rx="95" ry="38" fill="#3b82f6" opacity="0.18" stroke="#3b82f6" stroke-width="1.8"/>
        <text x="30" y="35" font-size="11" fill="currentColor" opacity="0.7">B₁</text>
        <text x="100" y="35" font-size="11" fill="currentColor" opacity="0.7">B₂</text>
        <text x="160" y="35" font-size="11" fill="currentColor" opacity="0.7">B₃</text>
        <text x="220" y="35" font-size="11" fill="currentColor" opacity="0.7">B₄</text>
        <text x="143" y="99" font-size="12" fill="#3b82f6" font-weight="700">A</text>
        <text x="130" y="15" font-size="11" fill="currentColor" opacity="0.6">Ω</text>
      </svg>`,
      diagramCaption: "B₁…B₄ 把样本空间 Ω 划分成互不相交的几块，事件 A（蓝色区域）分别与每一块相交",
      tags: ["全概率公式", "由因求果"]
    },
    {
      id: "prob-basics-thm-bayes",
      chapterId: "probability-basics",
      type: "theorem",
      title: "贝叶斯公式",
      statement: "设 $B_1,B_2,\\cdots,B_n$ 为样本空间 $\\Omega$ 的一个划分，且 $P(A)>0$，$P(B_i)>0$，则 $P(B_i\\mid A)=\\dfrac{P(B_i)P(A\\mid B_i)}{\\sum\\limits_{j=1}^{n}P(B_j)P(A\\mid B_j)}\\ (i=1,2,\\cdots,n)$。",
      explanation: "贝叶斯公式用于<strong>\"由果溯因\"</strong>：已知结果 $A$ 发生，反推是由原因 $B_i$ 引起的概率。分母恰为全概率公式，$P(B_i)$ 称为<strong>先验概率</strong>，$P(B_i\\mid A)$ 称为<strong>后验概率</strong>。",
      tags: ["贝叶斯公式", "由果溯因", "先验后验"]
    },
    {
      id: "prob-basics-def-independence",
      chapterId: "probability-basics",
      type: "definition",
      title: "事件的独立性",
      statement: "设 $A,B$ 是两事件，若 $P(AB)=P(A)P(B)$，则称事件 $A,B$ <strong>相互独立</strong>。若 $A,B$ 相互独立且 $P(A)>0$，则 $P(B\\mid A)=P(B)$。",
      explanation: "独立性描述的是概率上的无关性，与<strong>互斥</strong>是完全不同的概念：若 $P(A)>0,P(B)>0$，则 $A,B$ 独立与 $A,B$ 互斥不能同时成立。<u>若 $A,B$ 独立，则 $A$ 与 $\\overline{B}$、$\\overline{A}$ 与 $B$、$\\overline{A}$ 与 $\\overline{B}$ 也都相互独立</u>。",
      tags: ["独立性", "定义", "易混淆点"]
    },
    {
      id: "prob-basics-def-mutual-independence",
      chapterId: "probability-basics",
      type: "definition",
      title: "多个事件的相互独立性",
      statement: "设 $A_1,A_2,\\cdots,A_n$ 是 $n$ 个事件，若对任意 $k\\ (2\\leqslant k\\leqslant n)$ 个事件 $A_{i_1},\\cdots,A_{i_k}$，都有 $P(A_{i_1}A_{i_2}\\cdots A_{i_k})=P(A_{i_1})P(A_{i_2})\\cdots P(A_{i_k})$ 成立，则称 $A_1,A_2,\\cdots,A_n$ <strong>相互独立</strong>。",
      explanation: "$n$ 个事件相互独立需要 $2^n-n-1$ 个等式全部成立，<u>两两独立（只要求任意两个乘法式成立）不能推出相互独立</u>，这是常考的反例题型。",
      tags: ["相互独立", "两两独立"]
    },
    {
      id: "prob-basics-prop-independent-trials",
      chapterId: "probability-basics",
      type: "property",
      title: "独立重复试验与伯努利概型",
      statement: "将同一试验在相同条件下独立重复进行 $n$ 次称为 <strong>$n$ 重独立重复试验</strong>；若每次试验只有两个可能结果 $A$ 与 $\\overline{A}$，且 $P(A)=p$ 保持不变，则称为 <strong>$n$ 重伯努利试验</strong>。设 $X$ 为 $n$ 次试验中 $A$ 发生的次数，则 $P(X=k)=\\dbinom{n}{k}p^k(1-p)^{n-k},\\ k=0,1,\\cdots,n$。",
      explanation: "这是二项分布的概率来源，<strong>各次试验相互独立</strong>是使用该公式的前提，考试中常需先判断是否满足伯努利概型的条件（结果二元、概率不变、独立）。",
      tags: ["伯努利概型", "独立重复试验", "二项分布来源"]
    },
    {
      id: "prob-rv-def-rv",
      chapterId: "random-variable",
      type: "definition",
      title: "随机变量与分布函数",
      statement: "设随机试验的样本空间为 $\\Omega$，若对每一个样本点 $\\omega\\in\\Omega$，都有唯一实数 $X(\\omega)$ 与之对应，则称 $X=X(\\omega)$ 为<strong>随机变量</strong>。设 $X$ 是一个随机变量，称函数 $F(x)=P\\{X\\leqslant x\\},\\ -\\infty<x<+\\infty$ 为 $X$ 的<strong>分布函数</strong>。",
      explanation: "分布函数完整刻画了随机变量取值的概率规律，$P\\{a<X\\leqslant b\\}=F(b)-F(a)$。分布函数具有<strong>单调不减</strong>、<strong>右连续</strong>、$F(-\\infty)=0$、$F(+\\infty)=1$ 四条基本性质，<u>这四条是判定一个函数能否作为分布函数的充要条件</u>。",
      tags: ["随机变量", "分布函数"]
    },
    {
      id: "prob-rv-prop-distribution-function",
      chapterId: "random-variable",
      type: "property",
      title: "分布函数的基本性质",
      statement: "<ul><li><strong>单调不减：</strong>$x_1<x_2\\Rightarrow F(x_1)\\leqslant F(x_2)$。</li><li><strong>有界性：</strong>$0\\leqslant F(x)\\leqslant 1$，且 $F(-\\infty)=\\lim\\limits_{x\\to-\\infty}F(x)=0$，$F(+\\infty)=\\lim\\limits_{x\\to+\\infty}F(x)=1$。</li><li><strong>右连续：</strong>$F(x+0)=F(x)$。</li></ul>",
      explanation: "<u>反之，任何满足这三条性质的函数都可以作为某个随机变量的分布函数</u>（这是判定题的常考点）。离散型随机变量的分布函数是阶梯形右连续函数，连续型是连续函数。",
      tags: ["分布函数", "性质", "判定"]
    },
    {
      id: "prob-rv-def-discrete",
      chapterId: "random-variable",
      type: "definition",
      title: "离散型随机变量及其分布律",
      statement: "若随机变量 $X$ 只能取有限个或可列无限个值，则称 $X$ 为<strong>离散型随机变量</strong>。设 $X$ 所有可能取值为 $x_k\\ (k=1,2,\\cdots)$，称 $P\\{X=x_k\\}=p_k,\\ k=1,2,\\cdots$ 为 $X$ 的<strong>分布律</strong>，满足 $p_k\\geqslant 0$ 且 $\\sum\\limits_{k}p_k=1$。",
      explanation: "分布律常用表格表示，判定题常考\"某数列能否作为分布律\"，关键就检验<strong>非负性</strong>和<strong>归一性</strong>两条。",
      tags: ["离散型", "分布律", "归一性"]
    },
    {
      id: "prob-rv-def-01-distribution",
      chapterId: "random-variable",
      type: "definition",
      title: "0-1分布",
      statement: "若随机变量 $X$ 只取 $0$ 和 $1$ 两个值，其分布律为 $P\\{X=k\\}=p^k(1-p)^{1-k},\\ k=0,1\\ (0<p<1)$，则称 $X$ 服从参数为 $p$ 的<strong>0-1 分布（两点分布）</strong>，记作 $X\\sim B(1,p)$。",
      explanation: "0-1 分布是描述\"只有两种结果\"的伯努利试验的最基本模型，是二项分布 <strong>$n=1$ 时的特例</strong>。",
      tags: ["0-1分布", "两点分布"]
    },
    {
      id: "prob-rv-def-binomial",
      chapterId: "random-variable",
      type: "definition",
      title: "二项分布",
      statement: "若随机变量 $X$ 的分布律为 $P\\{X=k\\}=\\dbinom{n}{k}p^k(1-p)^{n-k},\\ k=0,1,\\cdots,n\\ (0<p<1)$，则称 $X$ 服从参数为 $n,p$ 的<strong>二项分布</strong>，记作 $X\\sim B(n,p)$。",
      explanation: "二项分布是 $n$ 重伯努利试验中事件 $A$ 发生次数的分布，$E(X)=np$，$D(X)=np(1-p)$。<u>当 $n=1$ 时退化为 0-1 分布</u>。",
      tags: ["二项分布", "伯努利试验"]
    },
    {
      id: "prob-rv-def-poisson",
      chapterId: "random-variable",
      type: "definition",
      title: "泊松分布",
      statement: "若随机变量 $X$ 的分布律为 $P\\{X=k\\}=\\dfrac{\\lambda^{k}e^{-\\lambda}}{k!},\\ k=0,1,2,\\cdots\\ (\\lambda>0)$，则称 $X$ 服从参数为 $\\lambda$ 的<strong>泊松分布</strong>，记作 $X\\sim P(\\lambda)$。",
      explanation: "泊松分布常用于描述单位时间（或空间）内随机事件发生次数，如电话呼叫数、事故次数等，其<u>显著特点是 $E(X)=D(X)=\\lambda$</u>。",
      tags: ["泊松分布", "计数过程"]
    },
    {
      id: "prob-rv-thm-poisson-approx",
      chapterId: "random-variable",
      type: "theorem",
      title: "泊松定理（二项分布的泊松近似）",
      statement: "设 $\\lambda>0$ 为常数，$n$ 为正整数，$np_n=\\lambda$（即 $p_n=\\lambda/n$），则对任意固定的非负整数 $k$，有 $\\lim\\limits_{n\\to\\infty}\\dbinom{n}{k}p_n^{k}(1-p_n)^{n-k}=\\dfrac{\\lambda^{k}e^{-\\lambda}}{k!}$。",
      explanation: "实际应用中，当 <strong>$n$ 很大、$p$ 很小</strong> 而 $np$ 大小适中时，可用参数 $\\lambda=np$ 的泊松分布近似二项分布 $B(n,p)$，即<strong>\"二项分布的泊松近似\"</strong>，常用于稀有事件的概率计算。",
      tags: ["泊松定理", "二项分布近似"]
    },
    {
      id: "prob-rv-def-geometric",
      chapterId: "random-variable",
      type: "definition",
      title: "几何分布",
      statement: "在伯努利试验中，事件 $A$ 发生的概率为 $p\\ (0<p<1)$，设 $X$ 为首次事件 $A$ 发生时所需的试验次数，则 $X$ 的分布律为 $P\\{X=k\\}=(1-p)^{k-1}p,\\ k=1,2,\\cdots$，称 $X$ 服从参数为 $p$ 的<strong>几何分布</strong>。",
      explanation: "几何分布具有<strong>无记忆性</strong>：$P\\{X>m+n\\mid X>m\\}=P\\{X>n\\}$，<u>是离散型分布中唯一具有无记忆性的分布</u>，$E(X)=1/p$。",
      tags: ["几何分布", "无记忆性"]
    },
    {
      id: "prob-rv-def-continuous",
      chapterId: "random-variable",
      type: "definition",
      title: "连续型随机变量及其概率密度",
      statement: "设随机变量 $X$ 的分布函数为 $F(x)$，若存在非负可积函数 $f(x)$，使对任意实数 $x$ 有 $F(x)=\\displaystyle\\int_{-\\infty}^{x}f(t)\\,\\mathrm{d}t$，则称 $X$ 为<strong>连续型随机变量</strong>，$f(x)$ 称为 $X$ 的<strong>概率密度函数</strong>，满足 $f(x)\\geqslant 0$ 且 $\\displaystyle\\int_{-\\infty}^{+\\infty}f(x)\\,\\mathrm{d}x=1$。",
      explanation: "<u>连续型随机变量取任一确定值的概率为零</u>：$P\\{X=a\\}=0$，因此 $P\\{a\\leqslant X\\leqslant b\\}=P\\{a<X<b\\}=P\\{a\\leqslant X<b\\}=P\\{a<X\\leqslant b\\}=\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$，端点是否取等号不影响概率。",
      tags: ["连续型", "概率密度", "定义"]
    },
    {
      id: "prob-rv-prop-density",
      chapterId: "random-variable",
      type: "property",
      title: "概率密度的性质",
      statement: "<ul><li><strong>非负性：</strong>$f(x)\\geqslant 0$。</li><li><strong>归一性：</strong>$\\displaystyle\\int_{-\\infty}^{+\\infty}f(x)\\,\\mathrm{d}x=1$。</li><li>在 $f(x)$ 的连续点处，$F'(x)=f(x)$。</li><li>对任意 $a\\leqslant b$，$P\\{a<X\\leqslant b\\}=F(b)-F(a)=\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$。</li></ul>",
      explanation: "判定一个函数能否作为概率密度，只需检验非负性和积分为 1 两条；<u>$f(x)$ 本身不是概率，可以大于 1，只有曲线下面积才代表概率</u>。",
      tags: ["概率密度", "性质", "判定"]
    },
    {
      id: "prob-rv-def-uniform",
      chapterId: "random-variable",
      type: "definition",
      title: "均匀分布",
      statement: "若随机变量 $X$ 的概率密度为 $f(x)=\\begin{cases}\\dfrac{1}{b-a}, & a<x<b,\\\\[4pt] 0, & \\text{其他},\\end{cases}$ 则称 $X$ 在区间 $(a,b)$ 上服从<strong>均匀分布</strong>，记作 $X\\sim U(a,b)$。",
      explanation: "均匀分布描述<strong>\"等可能性\"</strong>，其分布函数在 $[a,b]$ 上是线性函数，$E(X)=\\dfrac{a+b}{2}$，$D(X)=\\dfrac{(b-a)^2}{12}$。",
      tags: ["均匀分布", "等可能"]
    },
    {
      id: "prob-rv-def-exponential",
      chapterId: "random-variable",
      type: "definition",
      title: "指数分布",
      statement: "若随机变量 $X$ 的概率密度为 $f(x)=\\begin{cases}\\lambda e^{-\\lambda x}, & x>0,\\\\ 0, & x\\leqslant 0,\\end{cases}\\ (\\lambda>0)$，则称 $X$ 服从参数为 $\\lambda$ 的<strong>指数分布</strong>，其分布函数为 $F(x)=\\begin{cases}1-e^{-\\lambda x}, & x>0,\\\\ 0, & x\\leqslant 0.\\end{cases}$",
      explanation: "指数分布常用于描述元件寿命、等待时间，具有与几何分布类似的<strong>无记忆性</strong>：$P\\{X>s+t\\mid X>s\\}=P\\{X>t\\}$，<u>是连续型分布中唯一具有无记忆性的分布</u>，$E(X)=1/\\lambda$。",
      tags: ["指数分布", "无记忆性", "寿命分布"]
    },
    {
      id: "prob-rv-def-normal",
      chapterId: "random-variable",
      type: "definition",
      title: "正态分布",
      statement: "若随机变量 $X$ 的概率密度为 $f(x)=\\dfrac{1}{\\sqrt{2\\pi}\\sigma}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}},\\ -\\infty<x<+\\infty$（$\\mu,\\sigma$ 为常数，$\\sigma>0$），则称 $X$ 服从参数为 $\\mu,\\sigma^2$ 的<strong>正态分布</strong>，记作 $X\\sim N(\\mu,\\sigma^2)$，此时 $E(X)=\\mu$，$D(X)=\\sigma^2$。",
      explanation: "密度曲线关于 $x=\\mu$ 对称，在 $x=\\mu$ 处取最大值，在 $x=\\mu\\pm\\sigma$ 处有拐点，是自然界和社会现象中最常见的分布，<u>中心极限定理保证了大量独立随机因素叠加近似服从正态分布</u>。",
      diagram: `<svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="150" x2="300" y2="150" stroke="currentColor" stroke-width="1.5"/>
        <path d="M30,150 C70,150 90,40 160,40 C230,40 250,150 290,150" fill="none" stroke="#3b82f6" stroke-width="2"/>
        <line x1="160" y1="150" x2="160" y2="40" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>
        <text x="155" y="166" font-size="11" fill="currentColor">μ</text>
        <line x1="120" y1="150" x2="120" y2="95" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
        <line x1="200" y1="150" x2="200" y2="95" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
        <text x="105" y="166" font-size="10" fill="currentColor" opacity="0.7">μ-σ</text>
        <text x="192" y="166" font-size="10" fill="currentColor" opacity="0.7">μ+σ</text>
      </svg>`,
      diagramCaption: "正态分布密度曲线关于 x=μ 对称的钟形曲线，μ±σ 处是曲线的拐点",
      tags: ["正态分布", "高斯分布"]
    },
    {
      id: "prob-rv-def-standard-normal",
      chapterId: "random-variable",
      type: "definition",
      title: "标准正态分布及标准化",
      statement: "$\\mu=0,\\sigma=1$ 时的正态分布称为<strong>标准正态分布</strong>，记作 $N(0,1)$，其密度记为 $\\varphi(x)=\\dfrac{1}{\\sqrt{2\\pi}}e^{-\\frac{x^2}{2}}$，分布函数记为 $\\Phi(x)$。若 $X\\sim N(\\mu,\\sigma^2)$，则 $Z=\\dfrac{X-\\mu}{\\sigma}\\sim N(0,1)$，且 $F(x)=\\Phi\\left(\\dfrac{x-\\mu}{\\sigma}\\right)$。",
      explanation: "<strong>标准化</strong>是求一般正态分布概率的核心方法：<u>任何正态分布问题都通过 $Z=(X-\\mu)/\\sigma$ 转化为查标准正态分布表</u>。$\\Phi(-x)=1-\\Phi(x)$，$\\Phi(0)=0.5$。",
      tags: ["标准正态分布", "标准化", "Φ函数"]
    },
    {
      id: "prob-rv-thm-function-of-rv",
      chapterId: "random-variable",
      type: "theorem",
      title: "随机变量函数的分布（一维）",
      statement: "设 $X$ 是连续型随机变量，密度为 $f_X(x)$，$Y=g(X)$。若 $g(x)$ <strong>严格单调</strong>、可导且反函数 $h(y)=g^{-1}(y)$ 存在连续导数，则 $Y$ 的概率密度为 $f_Y(y)=f_X(h(y))\\,|h'(y)|$（在 $y$ 的相应取值范围内，否则为 $0$）。",
      explanation: "非单调情形（如 $Y=X^2$）需先用<strong>分布函数法</strong>：$F_Y(y)=P\\{g(X)\\leqslant y\\}$，通过求 $X$ 满足条件的区域再对 $x$ 积分，最后对 $y$ 求导得到 $f_Y(y)$，<u>这是处理非单调函数的通用方法</u>。",
      tags: ["随机变量函数", "分布函数法", "公式法"]
    },
    {
      id: "prob-mrv-def-joint-distribution",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "二维随机变量及联合分布函数",
      statement: "设 $X,Y$ 是定义在同一样本空间上的两个随机变量，称 $(X,Y)$ 为<strong>二维随机变量</strong>。对任意实数 $x,y$，称 $F(x,y)=P\\{X\\leqslant x, Y\\leqslant y\\}$ 为 $(X,Y)$ 的<strong>联合分布函数</strong>。",
      explanation: "$F(x,y)$ 表示随机点 $(X,Y)$ 落在以 $(x,y)$ 为右上顶点的左下无穷矩形区域内的概率，$P\\{x_1<X\\leqslant x_2, y_1<Y\\leqslant y_2\\}=F(x_2,y_2)-F(x_1,y_2)-F(x_2,y_1)+F(x_1,y_1)$。",
      tags: ["联合分布函数", "二维随机变量"]
    },
    {
      id: "prob-mrv-def-joint-discrete",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "二维离散型随机变量的联合分布律",
      statement: "若二维随机变量 $(X,Y)$ 所有可能取值为有限对或可列无限多对，称 $(X,Y)$ 为<strong>离散型</strong>。称 $P\\{X=x_i, Y=y_j\\}=p_{ij},\\ i,j=1,2,\\cdots$ 为 $(X,Y)$ 的<strong>联合分布律</strong>，满足 $p_{ij}\\geqslant 0$ 且 $\\sum\\limits_{i}\\sum\\limits_{j}p_{ij}=1$。",
      explanation: "通常用二维表格表示联合分布律，<u>横向、纵向求和分别得到 $Y,X$ 的边缘分布律</u>，这是求边缘分布最直观的方法。",
      tags: ["联合分布律", "离散型", "二维"]
    },
    {
      id: "prob-mrv-def-joint-density",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "二维连续型随机变量的联合概率密度",
      statement: "若存在非负可积函数 $f(x,y)$，使对任意 $x,y$ 有 $F(x,y)=\\displaystyle\\int_{-\\infty}^{x}\\int_{-\\infty}^{y}f(u,v)\\,\\mathrm{d}u\\,\\mathrm{d}v$，则称 $(X,Y)$ 为<strong>二维连续型随机变量</strong>，$f(x,y)$ 为其<strong>联合概率密度</strong>，满足 $f(x,y)\\geqslant 0$ 且 $\\displaystyle\\iint_{\\mathbb{R}^2}f(x,y)\\,\\mathrm{d}x\\,\\mathrm{d}y=1$。",
      explanation: "对平面区域 $D$，$P\\{(X,Y)\\in D\\}=\\displaystyle\\iint_D f(x,y)\\,\\mathrm{d}x\\,\\mathrm{d}y$，在 $f(x,y)$ 连续点处 $\\dfrac{\\partial^2 F}{\\partial x\\partial y}=f(x,y)$。",
      tags: ["联合概率密度", "连续型", "二维"]
    },
    {
      id: "prob-mrv-def-marginal-distribution",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "边缘分布函数",
      statement: "设 $(X,Y)$ 的联合分布函数为 $F(x,y)$，则 $X$ 的<strong>边缘分布函数</strong> $F_X(x)=P\\{X\\leqslant x\\}=F(x,+\\infty)$，$Y$ 的边缘分布函数 $F_Y(y)=P\\{Y\\leqslant y\\}=F(+\\infty,y)$。",
      explanation: "边缘分布反映单个随机变量自身的分布规律，是从联合分布中\"退化\"得到的，可以由联合分布唯一确定，但<u>反过来一般不能由边缘分布确定联合分布（除非独立）</u>。",
      tags: ["边缘分布函数", "定义"]
    },
    {
      id: "prob-mrv-thm-marginal-density",
      chapterId: "multivariate-rv",
      type: "theorem",
      title: "边缘分布律与边缘密度的计算",
      statement: "<ul><li><strong>离散型：</strong>$p_{i\\cdot}=P\\{X=x_i\\}=\\sum\\limits_{j}p_{ij}$，$p_{\\cdot j}=P\\{Y=y_j\\}=\\sum\\limits_{i}p_{ij}$。</li><li><strong>连续型：</strong>$f_X(x)=\\displaystyle\\int_{-\\infty}^{+\\infty}f(x,y)\\,\\mathrm{d}y$，$f_Y(y)=\\displaystyle\\int_{-\\infty}^{+\\infty}f(x,y)\\,\\mathrm{d}x$。</li></ul>",
      explanation: "<u>求边缘密度时要特别注意积分限</u>——需根据 $(x,y)$ 使 $f(x,y)\\neq 0$ 的区域确定关于另一变量的积分范围，这是求边缘密度最容易出错的地方。",
      tags: ["边缘分布律", "边缘密度", "计算公式"]
    },
    {
      id: "prob-mrv-def-conditional-distribution",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "条件分布",
      statement: "<ul><li><strong>离散型：</strong>当 $P\\{Y=y_j\\}>0$ 时，$P\\{X=x_i\\mid Y=y_j\\}=\\dfrac{p_{ij}}{p_{\\cdot j}}$。</li><li><strong>连续型：</strong>当 $f_Y(y)>0$ 时，$X$ 在 $Y=y$ 条件下的条件密度为 $f_{X\\mid Y}(x\\mid y)=\\dfrac{f(x,y)}{f_Y(y)}$。</li></ul>",
      explanation: "条件密度公式形式上与条件概率公式 $P(A\\mid B)=P(AB)/P(B)$ 完全类似，只是把概率换成了密度。使用连续型条件密度公式时<strong>要求分母 $f_Y(y)>0$</strong>。",
      tags: ["条件分布", "条件密度"]
    },
    {
      id: "prob-mrv-def-independence",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "随机变量的独立性",
      statement: "设 $F(x,y)$、$F_X(x)$、$F_Y(y)$ 分别为 $(X,Y)$ 的联合分布函数和边缘分布函数，若对任意 $x,y$ 都有 $F(x,y)=F_X(x)F_Y(y)$，则称 $X$ 与 $Y$ <strong>相互独立</strong>。离散型等价于对一切 $i,j$ 有 $p_{ij}=p_{i\\cdot}\\,p_{\\cdot j}$；连续型等价于在 $f(x,y)$ 的连续点处 $f(x,y)=f_X(x)f_Y(y)$。",
      explanation: "判断连续型独立性的常用<strong>充要条件</strong>：<u>密度函数 $f(x,y)$ 可以分离变量为 $g(x)h(y)$ 的乘积形式，且 $(X,Y)$ 的取值区域是矩形</u>（可分离为 $x$、$y$ 各自的区间），二者缺一不可。",
      tags: ["独立性", "二维随机变量", "充要条件"]
    },
    {
      id: "prob-mrv-def-binormal",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "二维正态分布",
      statement: "若 $(X,Y)$ 的联合概率密度为 $f(x,y)=\\dfrac{1}{2\\pi\\sigma_1\\sigma_2\\sqrt{1-\\rho^2}}\\exp\\left\\{-\\dfrac{1}{2(1-\\rho^2)}\\left[\\dfrac{(x-\\mu_1)^2}{\\sigma_1^2}-2\\rho\\dfrac{(x-\\mu_1)(y-\\mu_2)}{\\sigma_1\\sigma_2}+\\dfrac{(y-\\mu_2)^2}{\\sigma_2^2}\\right]\\right\\}$，则称 $(X,Y)$ 服从参数为 $\\mu_1,\\mu_2,\\sigma_1^2,\\sigma_2^2,\\rho$ 的<strong>二维正态分布</strong>，记作 $(X,Y)\\sim N(\\mu_1,\\mu_2,\\sigma_1^2,\\sigma_2^2,\\rho)$。",
      explanation: "二维正态分布的两个边缘分布分别为 $X\\sim N(\\mu_1,\\sigma_1^2)$，$Y\\sim N(\\mu_2,\\sigma_2^2)$，且 $\\rho$ 就是 $X,Y$ 的相关系数。二维正态分布中，$X$ 与 $Y$ 相互独立的<strong>充要条件</strong>是 $\\rho=0$（<u>不相关等价于独立，这是正态分布独有的性质</u>）。",
      tags: ["二维正态分布", "相关系数", "独立性"]
    },
    {
      id: "prob-mrv-thm-binormal-linear",
      chapterId: "multivariate-rv",
      type: "theorem",
      title: "二维正态分布的线性组合",
      statement: "若 $(X,Y)\\sim N(\\mu_1,\\mu_2,\\sigma_1^2,\\sigma_2^2,\\rho)$，则 $X,Y$ 的任意线性组合 $aX+bY$（$a,b$ 不同时为零）<strong>仍服从一维正态分布</strong>；且当 $X,Y$ 相互独立且均为正态分布时，$aX+bY\\sim N(a\\mu_1+b\\mu_2,\\ a^2\\sigma_1^2+b^2\\sigma_2^2)$。",
      explanation: "<u>\"正态分布的线性组合仍是正态分布\"</u>是正态分布的<strong>可加性</strong>，是数理统计中抽样分布（如样本均值的分布）推导的理论基础。",
      tags: ["二维正态", "线性组合", "正态可加性"]
    },
    {
      id: "prob-mrv-thm-sum-of-independent",
      chapterId: "multivariate-rv",
      type: "theorem",
      title: "两个独立随机变量之和的分布（卷积公式）",
      statement: "设 $X,Y$ 相互独立，概率密度分别为 $f_X(x),f_Y(y)$，则 $Z=X+Y$ 的概率密度为 $f_Z(z)=\\displaystyle\\int_{-\\infty}^{+\\infty}f_X(x)f_Y(z-x)\\,\\mathrm{d}x=\\displaystyle\\int_{-\\infty}^{+\\infty}f_Y(y)f_X(z-y)\\,\\mathrm{d}y$。",
      explanation: "该公式称为<strong>卷积公式</strong>，是求两独立随机变量之和分布的通用方法。特别地：<ul><li>独立正态变量之和仍为正态（可加性）</li><li>独立同参数指数/伽马变量之和有类似可加性</li><li>独立泊松变量之和仍为泊松（$\\lambda$ 相加）</li><li>独立二项变量（相同 $p$）之和仍为二项（$n$ 相加）</li></ul>",
      tags: ["卷积公式", "和的分布", "分布可加性"]
    },
    {
      id: "prob-mrv-thm-max-min",
      chapterId: "multivariate-rv",
      type: "theorem",
      title: "多个独立随机变量最大值与最小值的分布",
      statement: "设 $X_1,X_2,\\cdots,X_n$ 相互独立，$X_i$ 的分布函数为 $F_{X_i}(x)$，令 $M=\\max\\{X_1,\\cdots,X_n\\}$，$N=\\min\\{X_1,\\cdots,X_n\\}$，则 $F_M(x)=\\prod\\limits_{i=1}^{n}F_{X_i}(x)$，$F_N(x)=1-\\prod\\limits_{i=1}^{n}[1-F_{X_i}(x)]$。特别当 $X_1,\\cdots,X_n$ 独立同分布，分布函数均为 $F(x)$ 时，$F_M(x)=[F(x)]^n$，$F_N(x)=1-[1-F(x)]^n$。",
      explanation: "推导关键：$\\{M\\leqslant x\\}=\\{X_1\\leqslant x,\\cdots,X_n\\leqslant x\\}$（各事件独立取乘积），$\\{N> x\\}=\\{X_1>x,\\cdots,X_n>x\\}$。<u>这是数理统计中样本极值分布、次序统计量问题的基础</u>。",
      tags: ["最大值分布", "最小值分布", "次序统计量"]
    },
    {
      id: "prob-mrv-def-uniform2d",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "二维均匀分布",
      statement: "设 $G$ 是平面上的有界区域，其面积为 $S_G$，若二维随机变量 $(X,Y)$ 的概率密度为 $f(x,y)=\\begin{cases}\\dfrac{1}{S_G}, & (x,y)\\in G,\\\\ 0, & (x,y)\\notin G,\\end{cases}$ 则称 $(X,Y)$ 在区域 $G$ 上服从<strong>均匀分布</strong>。",
      explanation: "二维均匀分布下，$(X,Y)$ 落在 $G$ 内任一子区域 $D$ 的概率只与 $D$ 的面积成正比，$P\\{(X,Y)\\in D\\}=\\dfrac{S_D}{S_G}\\ (D\\subset G)$，这是几何概型在二维情形的推广，<u>边缘分布一般不再是均匀分布（除非 $G$ 为矩形）</u>。",
      tags: ["二维均匀分布", "几何概型"]
    },
    {
      id: "prob-mrv-def-conditional-distribution-function",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "条件分布函数",
      statement: "设 $(X,Y)$ 为二维离散型随机变量，对于固定的 $j$，若 $P\\{Y=y_j\\}>0$，则称 $F_{X\\mid Y}(x\\mid y_j)=P\\{X\\leqslant x\\mid Y=y_j\\}=\\sum\\limits_{x_i\\leqslant x}P\\{X=x_i\\mid Y=y_j\\}$ 为在 $Y=y_j$ 条件下 $X$ 的<strong>条件分布函数</strong>；类似地可定义 $F_{Y\\mid X}(y\\mid x_i)$。",
      explanation: "条件分布函数与条件分布律满足普通分布函数与分布律之间同样的关系，用于研究\"给定一个变量取值后另一变量的分布规律\"，是条件密度概念在离散场合的对应。",
      tags: ["条件分布函数", "离散型"]
    },
    {
      id: "prob-mrv-def-n-independence",
      chapterId: "multivariate-rv",
      type: "definition",
      title: "n个随机变量的相互独立性",
      statement: "设 $X_1,X_2,\\cdots,X_n$ 是 $n$ 个随机变量，若它们的联合分布函数等于各自边缘分布函数的乘积，即对任意实数 $x_1,\\cdots,x_n$ 有 $F(x_1,x_2,\\cdots,x_n)=F_{X_1}(x_1)F_{X_2}(x_2)\\cdots F_{X_n}(x_n)$，则称 $X_1,X_2,\\cdots,X_n$ <strong>相互独立</strong>。",
      explanation: "若 $X_1,\\cdots,X_n$ 相互独立，则<strong>其中任意 $k\\ (2\\leqslant k\\leqslant n)$ 个也相互独立</strong>；若把它们分成两组，则由各组变量构成的函数（如 $g(X_1,\\cdots,X_m)$ 与 $h(X_{m+1},\\cdots,X_n)$）也相互独立。",
      tags: ["多个随机变量独立", "相互独立"]
    },
    {
      id: "prob-mrv-prop-function-independence",
      chapterId: "multivariate-rv",
      type: "property",
      title: "随机变量函数的独立性",
      statement: "设 $X$ 与 $Y$ 相互独立，$g(\\cdot),h(\\cdot)$ 为连续函数，则 $g(X)$ 与 $h(Y)$ <strong>也相互独立</strong>。",
      explanation: "该性质说明<u>独立性在取函数变换下具有传递性</u>，是判断复杂随机变量函数（如 $X^2$ 与 $\\sin Y$）独立性的常用依据，也是理解正态总体中 $\\bar X$ 与 $S^2$ 独立性证明思路的直观基础。",
      tags: ["独立性", "函数独立性"]
    },
    {
      id: "prob-nc-def-expectation-discrete",
      chapterId: "numerical-characteristics",
      type: "definition",
      title: "数学期望（离散型）",
      statement: "设离散型随机变量 $X$ 的分布律为 $P\\{X=x_k\\}=p_k,\\ k=1,2,\\cdots$，若级数 $\\sum\\limits_{k=1}^{\\infty}x_kp_k$ <strong>绝对收敛</strong>，则称其和为 $X$ 的<strong>数学期望</strong>，记作 $E(X)=\\sum\\limits_{k=1}^{\\infty}x_kp_k$。",
      explanation: "要求级数绝对收敛（即 $\\sum|x_k|p_k$ 收敛）是为了保证期望值不依赖于求和顺序，若不满足绝对收敛则称期望不存在。数学期望是随机变量取值的<strong>\"概率加权平均\"</strong>，反映其集中位置。",
      tags: ["数学期望", "离散型", "绝对收敛"]
    },
    {
      id: "prob-nc-def-expectation-continuous",
      chapterId: "numerical-characteristics",
      type: "definition",
      title: "数学期望（连续型）",
      statement: "设连续型随机变量 $X$ 的概率密度为 $f(x)$，若积分 $\\displaystyle\\int_{-\\infty}^{+\\infty}xf(x)\\,\\mathrm{d}x$ <strong>绝对收敛</strong>，则称其值为 $X$ 的<strong>数学期望</strong>，记作 $E(X)=\\displaystyle\\int_{-\\infty}^{+\\infty}xf(x)\\,\\mathrm{d}x$。",
      explanation: "同样要求绝对收敛，例如标准柯西分布的期望就不存在。数学期望是连续型分布密度曲线的<strong>\"质心\"</strong>横坐标。",
      tags: ["数学期望", "连续型"]
    },
    {
      id: "prob-nc-thm-expectation-function",
      chapterId: "numerical-characteristics",
      type: "theorem",
      title: "随机变量函数的数学期望",
      statement: "设 $Y=g(X)$：<ul><li><strong>$X$ 离散：</strong>分布律为 $p_k$，则 $E(Y)=\\sum\\limits_{k}g(x_k)p_k$。</li><li><strong>$X$ 连续：</strong>密度为 $f(x)$，则 $E(Y)=\\displaystyle\\int_{-\\infty}^{+\\infty}g(x)f(x)\\,\\mathrm{d}x$（级数或积分绝对收敛时成立）。</li><li><strong>二维情形：</strong>$Z=g(X,Y)$ 时 $E(Z)=\\sum\\limits_i\\sum\\limits_j g(x_i,y_j)p_{ij}$ 或 $E(Z)=\\displaystyle\\iint_{\\mathbb{R}^2}g(x,y)f(x,y)\\,\\mathrm{d}x\\,\\mathrm{d}y$。</li></ul>",
      explanation: "这条定理（有时称为<strong>\"无需求出 $Y$ 分布的公式\"</strong>）是求随机变量函数期望最重要的工具，<u>避免了先求 $Y=g(X)$ 的分布再求期望的繁琐步骤</u>，考研中求 $E(X^2)$、$E(XY)$ 等几乎都靠它。",
      tags: ["期望的计算", "随机变量函数", "核心公式"]
    },
    {
      id: "prob-nc-prop-expectation",
      chapterId: "numerical-characteristics",
      type: "property",
      title: "数学期望的性质",
      statement: "设 $a,b,c$ 为常数：<ul><li>$E(c)=c$。</li><li>$E(aX+b)=aE(X)+b$。</li><li><strong>线性可加性：</strong>$E(X+Y)=E(X)+E(Y)$（对任意 $X,Y$，无需独立）。</li><li>若 $X,Y$ <strong>相互独立</strong>，则 $E(XY)=E(X)E(Y)$。</li></ul>",
      explanation: "性质（3）线性可加性对任意随机变量都成立，是求复杂随机变量期望（如超几何分布期望）时<strong>\"拆分为若干简单变量之和\"</strong>技巧的理论依据；而性质（4）的乘积可分离性则<u>必须要求独立</u>。",
      tags: ["期望性质", "线性性", "独立性"]
    },
    {
      id: "prob-nc-def-variance",
      chapterId: "numerical-characteristics",
      type: "definition",
      title: "方差与标准差",
      statement: "设 $X$ 是随机变量，若 $E\\{[X-E(X)]^2\\}$ 存在，则称其为 $X$ 的<strong>方差</strong>，记作 $D(X)$ 或 $\\mathrm{Var}(X)$，即 $D(X)=E\\{[X-E(X)]^2\\}$；称 $\\sqrt{D(X)}$ 为 $X$ 的<strong>标准差（均方差）</strong>，记作 $\\sigma(X)$。常用计算公式：$D(X)=E(X^2)-[E(X)]^2$。",
      explanation: "方差衡量随机变量取值相对于其期望的离散程度，方差越小取值越集中。<u>计算公式 $D(X)=E(X^2)-[E(X)]^2$ 是考试中求方差的最常用方法</u>，比按定义直接计算更简便。",
      tags: ["方差", "标准差", "计算公式"]
    },
    {
      id: "prob-nc-prop-variance",
      chapterId: "numerical-characteristics",
      type: "property",
      title: "方差的性质",
      statement: "设 $a,b,c$ 为常数：<ul><li>$D(c)=0$。</li><li>$D(aX+b)=a^2D(X)$。</li><li>$D(X)=0\\iff P\\{X=E(X)\\}=1$。</li><li>$D(X+Y)=D(X)+D(Y)+2\\mathrm{Cov}(X,Y)$；特别地，若 $X,Y$ <strong>相互独立</strong>（或不相关），则 $D(X+Y)=D(X)+D(Y)$。</li></ul>",
      explanation: "性质（2）中<strong>平移不改变方差</strong>（$b$ 不出现），伸缩按平方倍变化，这与期望的线性变化 $E(aX+b)=aE(X)+b$ 形成对照，是<u>极易混淆、常考的辨析点</u>。",
      tags: ["方差性质", "独立", "常考辨析"]
    },
    {
      id: "prob-nc-def-moments",
      chapterId: "numerical-characteristics",
      type: "definition",
      title: "矩：原点矩与中心矩",
      statement: "设 $X$ 为随机变量，若 $E(X^k)\\ (k=1,2,\\cdots)$ 存在，称其为 $X$ 的 $k$ 阶<strong>原点矩</strong>；若 $E\\{[X-E(X)]^k\\}$ 存在，称其为 $X$ 的 $k$ 阶<strong>中心矩</strong>。类似地可定义 $(X,Y)$ 的 $k+l$ 阶混合矩 $E(X^kY^l)$ 和 $k+l$ 阶混合中心矩 $E\\{[X-E(X)]^k[Y-E(Y)]^l\\}$。",
      explanation: "<u>一阶原点矩即数学期望 $E(X)$，二阶中心矩即方差 $D(X)$，二阶混合中心矩（$k=l=1$）即协方差 $\\mathrm{Cov}(X,Y)$</u>。矩估计法正是用样本矩估计总体矩的思想来源。",
      tags: ["矩", "原点矩", "中心矩"]
    },
    {
      id: "prob-nc-def-covariance",
      chapterId: "numerical-characteristics",
      type: "definition",
      title: "协方差",
      statement: "设 $(X,Y)$ 是二维随机变量，称 $E\\{[X-E(X)][Y-E(Y)]\\}$ 为 $X$ 与 $Y$ 的<strong>协方差</strong>，记作 $\\mathrm{Cov}(X,Y)$。常用计算公式：$\\mathrm{Cov}(X,Y)=E(XY)-E(X)E(Y)$。",
      explanation: "协方差衡量两个随机变量的线性相关程度及方向：$\\mathrm{Cov}(X,Y)>0$ 表明 $X,Y$ 有同向变化趋势，$<0$ 表明反向。若 $X,Y$ 独立，则 $\\mathrm{Cov}(X,Y)=0$，但<u>反之不一定成立</u>。",
      tags: ["协方差", "计算公式"]
    },
    {
      id: "prob-nc-prop-covariance",
      chapterId: "numerical-characteristics",
      type: "property",
      title: "协方差的性质",
      statement: "<ul><li>$\\mathrm{Cov}(X,Y)=\\mathrm{Cov}(Y,X)$。</li><li>$\\mathrm{Cov}(aX,bY)=ab\\,\\mathrm{Cov}(X,Y)$（$a,b$ 为常数）。</li><li>$\\mathrm{Cov}(X_1+X_2,Y)=\\mathrm{Cov}(X_1,Y)+\\mathrm{Cov}(X_2,Y)$。</li><li>$\\mathrm{Cov}(X,X)=D(X)$。</li><li>$\\mathrm{Cov}(X,c)=0$（$c$ 为常数）。</li></ul>",
      explanation: "由这些性质可推出一般公式 $D(X\\pm Y)=D(X)+D(Y)\\pm 2\\mathrm{Cov}(X,Y)$，<u>协方差的双线性性质是计算多个变量线性组合方差的关键工具</u>。",
      tags: ["协方差性质", "双线性"]
    },
    {
      id: "prob-nc-def-correlation",
      chapterId: "numerical-characteristics",
      type: "definition",
      title: "相关系数",
      statement: "设 $D(X)>0,D(Y)>0$，称 $\\rho_{XY}=\\dfrac{\\mathrm{Cov}(X,Y)}{\\sqrt{D(X)}\\sqrt{D(Y)}}$ 为 $X$ 与 $Y$ 的（线性）<strong>相关系数</strong>。若 $\\rho_{XY}=0$，称 $X,Y$ <strong>不相关</strong>。",
      explanation: "相关系数是协方差的标准化（消除量纲影响），$|\\rho_{XY}|$ 越接近 1，$X,Y$ 之间的线性关系越强；$\\rho_{XY}=0$ 只说明二者没有线性关系，不代表没有其他函数关系（<strong>不相关不能推出独立</strong>），但<u>若 $(X,Y)$ 服从二维正态分布，则不相关与独立等价</u>。",
      tags: ["相关系数", "不相关", "独立性对比"]
    },
    {
      id: "prob-nc-prop-correlation",
      chapterId: "numerical-characteristics",
      type: "property",
      title: "相关系数的性质与不相关的等价条件",
      statement: "（1）$|\\rho_{XY}|\\leqslant 1$；（2）$|\\rho_{XY}|=1$ 的<strong>充要条件</strong>是 $X,Y$ 之间几乎处处存在线性关系，即存在常数 $a\\neq 0,b$，使 $P\\{Y=aX+b\\}=1$。下列四个命题相互等价：<ul><li>$\\rho_{XY}=0$</li><li>$\\mathrm{Cov}(X,Y)=0$</li><li>$E(XY)=E(X)E(Y)$</li><li>$D(X+Y)=D(X)+D(Y)$</li></ul>",
      explanation: "这四个等价命题是判断\"不相关\"的常用切入口，考试中常要求证明或利用其一推出其余。切记<u>\"不相关\"是比\"独立\"更弱的条件：独立必不相关，不相关未必独立</u>。",
      tags: ["相关系数性质", "不相关等价条件"]
    },
    {
      id: "prob-nc-thm-linear-combination-variance",
      chapterId: "numerical-characteristics",
      type: "theorem",
      title: "多个随机变量线性组合的方差公式",
      statement: "设 $X_1,X_2,\\cdots,X_n$ 为随机变量，$a_1,a_2,\\cdots,a_n$ 为常数，则 $D\\left(\\sum\\limits_{i=1}^{n}a_iX_i\\right)=\\sum\\limits_{i=1}^{n}a_i^2D(X_i)+2\\sum\\limits_{1\\leqslant i<j\\leqslant n}a_ia_j\\mathrm{Cov}(X_i,X_j)$。特别地，若 $X_1,\\cdots,X_n$ 两两不相关，则 $D\\left(\\sum\\limits_{i=1}^{n}a_iX_i\\right)=\\sum\\limits_{i=1}^{n}a_i^2D(X_i)$。",
      explanation: "该公式是 $D(X\\pm Y)=D(X)+D(Y)\\pm2\\mathrm{Cov}(X,Y)$ 在多变量情形下的推广，<u>是求样本方差、多元线性组合方差的通用工具</u>，常结合独立同分布条件化简交叉项。",
      tags: ["方差公式", "线性组合", "协方差"]
    },
    {
      id: "prob-nc-def-standardized-variable",
      chapterId: "numerical-characteristics",
      type: "definition",
      title: "标准化随机变量",
      statement: "设随机变量 $X$ 的期望 $E(X)$、方差 $D(X)>0$ 存在，称 $X^{*}=\\dfrac{X-E(X)}{\\sqrt{D(X)}}$ 为 $X$ 的<strong>标准化随机变量</strong>，此时 $E(X^{*})=0$，$D(X^{*})=1$。",
      explanation: "标准化消除了量纲和数值大小的影响，便于不同随机变量之间的比较；正态分布的标准化 $Z=(X-\\mu)/\\sigma\\sim N(0,1)$ 是其最典型的应用。",
      tags: ["标准化", "期望", "方差"]
    },
    {
      id: "prob-nc-thm-cauchy-schwarz",
      chapterId: "numerical-characteristics",
      type: "theorem",
      title: "柯西-施瓦茨不等式（协方差形式）",
      statement: "对任意随机变量 $X,Y$（方差存在），有 $[\\mathrm{Cov}(X,Y)]^2\\leqslant D(X)D(Y)$，<strong>等号成立当且仅当</strong> $X$ 与 $Y$ 之间几乎处处存在线性关系。",
      explanation: "<u>该不等式是相关系数 $|\\rho_{XY}|\\leqslant 1$ 的直接来源</u>（两边同除以 $D(X)D(Y)$ 再开方即得），本质上是概率空间中的柯西-施瓦茨不等式。",
      tags: ["柯西-施瓦茨不等式", "协方差", "相关系数"]
    },
    {
      id: "prob-nc-prop-binormal-independence",
      chapterId: "numerical-characteristics",
      type: "property",
      title: "二维正态分布中不相关与独立的等价性",
      statement: "若 $(X,Y)\\sim N(\\mu_1,\\mu_2,\\sigma_1^2,\\sigma_2^2,\\rho)$，则 $X$ 与 $Y$ 的相关系数就是参数 $\\rho$，即 $\\rho_{XY}=\\rho$；且 $X$ 与 $Y$ 相互独立的<strong>充要条件</strong>是 $\\rho=0$，即在二维正态分布场合下，<u>\"不相关\"与\"独立\"是等价的</u>。",
      explanation: "这是二维正态分布的特有性质，一般随机变量不相关不能推出独立，但正态分布的联合密度形式使得 $\\rho=0$ 时联合密度恰好可分离为两个边缘密度的乘积，因此二者等价，是<strong>考研中的高频考点</strong>。",
      tags: ["二维正态", "不相关", "独立性", "常考"]
    },
    {
      id: "prob-lt-thm-markov-inequality",
      chapterId: "limit-theorems",
      type: "theorem",
      title: "马尔可夫不等式",
      statement: "设随机变量 $X$ 只取<strong>非负值</strong>，且 $E(X)$ 存在，则对任意 $\\varepsilon>0$，有 $P\\{X\\geqslant\\varepsilon\\}\\leqslant\\dfrac{E(X)}{\\varepsilon}$。",
      explanation: "马尔可夫不等式只需 $X\\geqslant 0$ 且期望存在即可使用，<u>条件比切比雪夫不等式更弱</u>；对 $Y=(X-\\mu)^2$ 应用马尔可夫不等式即可导出切比雪夫不等式，二者一脉相承。",
      tags: ["马尔可夫不等式", "概率估计"]
    },
    {
      id: "prob-lt-thm-chebyshev-inequality",
      chapterId: "limit-theorems",
      type: "theorem",
      title: "切比雪夫不等式",
      statement: "设随机变量 $X$ 具有数学期望 $E(X)=\\mu$，方差 $D(X)=\\sigma^2$，则对任意 $\\varepsilon>0$，有 $P\\{|X-\\mu|\\geqslant\\varepsilon\\}\\leqslant\\dfrac{\\sigma^2}{\\varepsilon^2}$，等价地 $P\\{|X-\\mu|<\\varepsilon\\}\\geqslant 1-\\dfrac{\\sigma^2}{\\varepsilon^2}$。",
      explanation: "切比雪夫不等式只需知道 $X$ 的期望和方差，<strong>不依赖具体分布形式</strong>，就能给出概率的上（下）界估计，是证明大数定律的核心工具，也是理解<u>\"方差越小，取值越集中于均值附近\"</u>的定量表述。",
      tags: ["切比雪夫不等式", "概率估计"]
    },
    {
      id: "prob-lt-def-convergence-in-probability",
      chapterId: "limit-theorems",
      type: "definition",
      title: "依概率收敛",
      statement: "设 $Y_1,Y_2,\\cdots,Y_n,\\cdots$ 为一随机变量序列，$a$ 为常数，若对任意 $\\varepsilon>0$，有 $\\lim\\limits_{n\\to\\infty}P\\{|Y_n-a|<\\varepsilon\\}=1$（等价地 $\\lim\\limits_{n\\to\\infty}P\\{|Y_n-a|\\geqslant\\varepsilon\\}=0$），则称序列 $Y_1,Y_2,\\cdots$ <strong>依概率收敛</strong>于 $a$，记作 $Y_n\\xrightarrow{P}a$。",
      explanation: "依概率收敛是概率论中比高等数学\"数列收敛\"更弱的收敛概念：<u>并非要求 $Y_n$ 一定趋于 $a$，而是 $Y_n$ 与 $a$ 偏差超过任意小正数的概率趋于 0</u>。这是各大数定律结论的统一表述形式。",
      tags: ["依概率收敛", "定义"]
    },
    {
      id: "prob-lt-thm-chebyshev-lln",
      chapterId: "limit-theorems",
      type: "theorem",
      title: "切比雪夫大数定律",
      statement: "设随机变量 $X_1,X_2,\\cdots$ <strong>相互独立</strong>（不要求同分布），且<strong>方差存在并有共同上界</strong>（即存在常数 $C$，使 $D(X_i)\\leqslant C,\\ i=1,2,\\cdots$），则对任意 $\\varepsilon>0$，有 $\\lim\\limits_{n\\to\\infty}P\\left\\{\\left|\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}X_i-\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}E(X_i)\\right|<\\varepsilon\\right\\}=1$，即 $\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}X_i\\xrightarrow{P}\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}E(X_i)$。",
      explanation: "该定理说明大量相互独立、方差有界的随机变量的算术平均值，会依概率收敛于其数学期望的算术平均值，这是<u>\"平均值的稳定性\"</u>的理论依据。证明利用切比雪夫不等式对 $\\bar X_n$ 取极限即可得到。",
      tags: ["切比雪夫大数定律", "大数定律"]
    },
    {
      id: "prob-lt-thm-bernoulli-lln",
      chapterId: "limit-theorems",
      type: "theorem",
      title: "伯努利大数定律",
      statement: "设 $n_A$ 是 $n$ 次独立重复试验中事件 $A$ 发生的次数，$p$ 是事件 $A$ 在每次试验中发生的概率，则对任意 $\\varepsilon>0$，有 $\\lim\\limits_{n\\to\\infty}P\\left\\{\\left|\\dfrac{n_A}{n}-p\\right|<\\varepsilon\\right\\}=1$，即 $\\dfrac{n_A}{n}\\xrightarrow{P}p$。",
      explanation: "伯努利大数定律是切比雪夫大数定律的特例（把 $n_A$ 看成 $n$ 个独立同分布的 0-1 分布之和），它从理论上证明了<strong>频率的稳定性</strong>，<u>是用频率估计概率这一实际做法的数学基础</u>。",
      tags: ["伯努利大数定律", "频率稳定性"]
    },
    {
      id: "prob-lt-thm-khinchin-lln",
      chapterId: "limit-theorems",
      type: "theorem",
      title: "辛钦大数定律",
      statement: "设随机变量 $X_1,X_2,\\cdots$ <strong>相互独立、服从同一分布</strong>，且数学期望 $E(X_i)=\\mu$ 存在（<strong>不要求方差存在</strong>），则对任意 $\\varepsilon>0$，有 $\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}X_i\\xrightarrow{P}\\mu$。",
      explanation: "<u>辛钦大数定律的条件比切比雪夫大数定律更弱</u>（只需独立同分布且期望存在，不要求方差存在），是应用最广泛的一种大数定律；伯努利大数定律也可看作辛钦大数定律的特例。",
      tags: ["辛钦大数定律", "独立同分布"]
    },
    {
      id: "prob-lt-thm-levy-lindeberg-clt",
      chapterId: "limit-theorems",
      type: "theorem",
      title: "林德伯格-列维中心极限定理（独立同分布）",
      statement: "设随机变量 $X_1,X_2,\\cdots$ 独立同分布，且 $E(X_i)=\\mu$，$D(X_i)=\\sigma^2>0$ 存在，记 $Y_n=\\dfrac{\\sum\\limits_{i=1}^{n}X_i-n\\mu}{\\sqrt{n}\\sigma}$，则对任意实数 $x$，有 $\\lim\\limits_{n\\to\\infty}P\\{Y_n\\leqslant x\\}=\\Phi(x)=\\dfrac{1}{\\sqrt{2\\pi}}\\displaystyle\\int_{-\\infty}^{x}e^{-t^2/2}\\,\\mathrm{d}t$。",
      explanation: "该定理说明：<u>大量独立同分布、期望方差都有限的随机变量之和，经标准化后近似服从标准正态分布</u>，即 $\\sum X_i\\overset{\\text{近似}}{\\sim}N(n\\mu,n\\sigma^2)$。这是考研中处理<strong>\"大量独立随机变量之和的近似概率\"</strong>问题的核心定理。",
      tags: ["中心极限定理", "独立同分布", "林德伯格-列维"]
    },
    {
      id: "prob-lt-thm-demoivre-laplace-clt",
      chapterId: "limit-theorems",
      type: "theorem",
      title: "棣莫弗-拉普拉斯中心极限定理（二项分布的正态近似）",
      statement: "设随机变量 $X_n\\sim B(n,p)\\ (0<p<1,\\ n=1,2,\\cdots)$，则对任意实数 $x$，有 $\\lim\\limits_{n\\to\\infty}P\\left\\{\\dfrac{X_n-np}{\\sqrt{np(1-p)}}\\leqslant x\\right\\}=\\Phi(x)$。",
      explanation: "该定理是林德伯格-列维中心极限定理在 $X_i$ 为 0-1 分布时的特例（$X_n=\\sum X_i$），说明当 $n$ 较大时可用正态分布 $N(np,\\,np(1-p))$ 近似二项分布 $B(n,p)$，是<strong>二项分布正态近似</strong>（而非泊松近似）的理论依据，<u>注意与泊松定理适用条件的区别</u>：泊松近似要求 $p$ 很小，正态近似要求 $n$ 很大且 $np(1-p)$ 不太小。",
      tags: ["棣莫弗-拉普拉斯定理", "二项分布正态近似"]
    },
    {
      id: "prob-lt-def-convergence-in-distribution",
      chapterId: "limit-theorems",
      type: "definition",
      title: "依分布收敛",
      statement: "设随机变量 $X,X_1,X_2,\\cdots$ 的分布函数分别为 $F(x),F_1(x),F_2(x),\\cdots$，若在 $F(x)$ 的每一个连续点 $x$ 处都有 $\\lim\\limits_{n\\to\\infty}F_n(x)=F(x)$，则称 $X_n$ <strong>依分布收敛</strong>于 $X$，记作 $X_n\\xrightarrow{L}X$。",
      explanation: "中心极限定理的严格表述正是标准化和 $Y_n$ 依分布收敛于标准正态变量：$Y_n\\xrightarrow{L}N(0,1)$。<u>依分布收敛只涉及分布函数的逐点收敛，是比依概率收敛更弱的一种收敛性</u>。",
      tags: ["依分布收敛", "弱收敛"]
    },
    {
      id: "prob-lt-def-general-lln",
      chapterId: "limit-theorems",
      type: "definition",
      title: "大数定律的一般形式",
      statement: "设 $Y_1,Y_2,\\cdots,Y_n,\\cdots$ 是随机变量序列，若存在常数序列 $a_n$，使当 $n\\to\\infty$ 时 $Y_n-a_n\\xrightarrow{P}0$，即对任意 $\\varepsilon>0$ 有 $\\lim\\limits_{n\\to\\infty}P\\{|Y_n-a_n|<\\varepsilon\\}=1$，则称 $\\{Y_n\\}$ 服从大数定律。通常取 $Y_n=\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}X_i$，$a_n=\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}E(X_i)$。",
      explanation: "<u>这是大数定律的统一定义</u>，切比雪夫大数定律、伯努利大数定律、辛钦大数定律都是在不同条件假设下、验证该一般形式成立的具体结论。",
      tags: ["大数定律", "一般定义"]
    },
    {
      id: "prob-stat-def-population-sample",
      chapterId: "statistics-basics",
      type: "definition",
      title: "总体、个体与简单随机样本",
      statement: "研究对象的全体称为<strong>总体</strong>，组成总体的每个单元称为<strong>个体</strong>。设 $X_1,X_2,\\cdots,X_n$ 是来自总体 $X$、相互独立且与 $X$ 同分布的随机变量，则称 $X_1,\\cdots,X_n$ 为容量为 $n$ 的<strong>简单随机样本</strong>，简称样本；样本的一次观测结果 $x_1,\\cdots,x_n$ 称为样本值。",
      explanation: "简单随机样本必须同时满足<strong>\"独立性\"</strong>与<strong>\"同分布性\"</strong>两个条件，这是后续推导抽样分布（如 $\\chi^2$、$t$、$F$ 分布）的前提假设。总体的分布常记为 $X$ 的分布，样本 $X_1,\\cdots,X_n$ 的联合分布由此分布的 $n$ 次独立乘积给出。",
      tags: ["总体", "样本", "简单随机样本"]
    },
    {
      id: "prob-stat-def-statistic",
      chapterId: "statistics-basics",
      type: "definition",
      title: "统计量",
      statement: "设 $X_1,X_2,\\cdots,X_n$ 是来自总体 $X$ 的样本，若 $g(X_1,\\cdots,X_n)$ 是<strong>不含任何未知参数</strong>的样本的函数，则称 $g(X_1,\\cdots,X_n)$ 为<strong>统计量</strong>。",
      explanation: "统计量必须是<strong>可计算的（不含未知参数）</strong>，常见统计量包括样本均值、样本方差、样本矩等，<u>统计量本身仍是随机变量，其分布称为抽样分布</u>。",
      tags: ["统计量", "定义", "不含未知参数"]
    },
    {
      id: "prob-stat-def-sample-mean-variance",
      chapterId: "statistics-basics",
      type: "definition",
      title: "样本均值、样本方差与样本矩",
      statement: "<ul><li><strong>样本均值：</strong>$\\bar X=\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}X_i$。</li><li><strong>样本方差：</strong>$S^2=\\dfrac{1}{n-1}\\sum\\limits_{i=1}^{n}(X_i-\\bar X)^2$。</li><li><strong>样本标准差：</strong>$S=\\sqrt{S^2}$。</li><li><strong>样本 $k$ 阶原点矩：</strong>$A_k=\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}X_i^k$。</li><li><strong>样本 $k$ 阶中心矩：</strong>$B_k=\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}(X_i-\\bar X)^k$。</li></ul>",
      explanation: "<u>样本方差 $S^2$ 的分母是 $n-1$ 而不是 $n$</u>（$n-1$ 称为<strong>自由度</strong>），这是为了保证 $E(S^2)=\\sigma^2$（无偏性），与样本二阶中心矩 $B_2$（分母为 $n$）要区分开，$B_2$ 是有偏估计。",
      tags: ["样本均值", "样本方差", "自由度"]
    },
    {
      id: "prob-stat-prop-sample-mean-variance",
      chapterId: "statistics-basics",
      type: "property",
      title: "样本均值与样本方差的数字特征",
      statement: "设总体 $X$ 的 $E(X)=\\mu$，$D(X)=\\sigma^2$，样本容量为 $n$，则 $E(\\bar X)=\\mu$，$D(\\bar X)=\\dfrac{\\sigma^2}{n}$，$E(S^2)=\\sigma^2$。",
      explanation: "$D(\\bar X)=\\sigma^2/n$ 表明<u>样本容量越大，样本均值围绕总体均值的波动就越小</u>，这是\"大样本更可靠\"的定量体现；$E(S^2)=\\sigma^2$ 说明样本方差是总体方差的<strong>无偏估计</strong>。",
      tags: ["样本均值方差", "无偏性", "数字特征"]
    },
    {
      id: "prob-stat-def-chi-square",
      chapterId: "statistics-basics",
      type: "definition",
      title: "χ²分布",
      statement: "设 $X_1,X_2,\\cdots,X_n$ <strong>相互独立</strong>，且都服从标准正态分布 $N(0,1)$，则称随机变量 $\\chi^2=X_1^2+X_2^2+\\cdots+X_n^2$ 所服从的分布为自由度为 $n$ 的 <strong>$\\chi^2$ 分布</strong>，记作 $\\chi^2\\sim\\chi^2(n)$。",
      explanation: "$\\chi^2$ 分布的<strong>可加性</strong>：若 $\\chi_1^2\\sim\\chi^2(n_1)$，$\\chi_2^2\\sim\\chi^2(n_2)$ 且相互独立，则 $\\chi_1^2+\\chi_2^2\\sim\\chi^2(n_1+n_2)$；数字特征：$E(\\chi^2)=n$，$D(\\chi^2)=2n$。",
      tags: ["卡方分布", "抽样分布", "可加性"]
    },
    {
      id: "prob-stat-def-t-distribution",
      chapterId: "statistics-basics",
      type: "definition",
      title: "t分布",
      statement: "设 $X\\sim N(0,1)$，$Y\\sim\\chi^2(n)$，且 $X,Y$ 相互独立，则称随机变量 $T=\\dfrac{X}{\\sqrt{Y/n}}$ 所服从的分布为自由度为 $n$ 的 <strong>$t$ 分布（学生氏分布）</strong>，记作 $T\\sim t(n)$。",
      explanation: "$t$ 分布的密度函数关于 $0$ 对称，形状与标准正态分布相似但<strong>尾部更\"厚\"（方差更大）</strong>，<u>当自由度 $n\\to\\infty$ 时 $t$ 分布的极限分布趋于标准正态分布 $N(0,1)$</u>。",
      tags: ["t分布", "学生氏分布", "抽样分布"]
    },
    {
      id: "prob-stat-def-f-distribution",
      chapterId: "statistics-basics",
      type: "definition",
      title: "F分布",
      statement: "设 $U\\sim\\chi^2(n_1)$，$V\\sim\\chi^2(n_2)$，且 $U,V$ 相互独立，则称随机变量 $F=\\dfrac{U/n_1}{V/n_2}$ 所服从的分布为自由度为 $(n_1,n_2)$ 的 <strong>$F$ 分布</strong>，记作 $F\\sim F(n_1,n_2)$，其中 $n_1$ 称为<strong>第一自由度</strong>，$n_2$ 称为<strong>第二自由度</strong>。",
      explanation: "重要性质：<u>若 $F\\sim F(n_1,n_2)$，则 $\\dfrac{1}{F}\\sim F(n_2,n_1)$</u>（分子分母自由度互换）；且 $F$ 分布的上 $\\alpha$ 分位点满足 $F_{1-\\alpha}(n_1,n_2)=\\dfrac{1}{F_\\alpha(n_2,n_1)}$，用于查表时将下侧分位点转化为上侧分位点。",
      tags: ["F分布", "抽样分布", "分位点关系"]
    },
    {
      id: "prob-stat-def-quantile",
      chapterId: "statistics-basics",
      type: "definition",
      title: "上α分位点",
      statement: "设随机变量 $X$ 的分布函数为连续函数，对给定的 $\\alpha\\ (0<\\alpha<1)$，称满足 $P\\{X>x_\\alpha\\}=\\alpha$ 的点 $x_\\alpha$ 为 $X$ 分布的<strong>上 $\\alpha$ 分位点</strong>。标准正态分布记作 $z_\\alpha$，满足 $\\Phi(z_\\alpha)=1-\\alpha$；$\\chi^2(n)$、$t(n)$、$F(n_1,n_2)$ 分布分别记作 $\\chi_\\alpha^2(n)$、$t_\\alpha(n)$、$F_\\alpha(n_1,n_2)$。",
      explanation: "<u>由标准正态分布的对称性可得 $z_{1-\\alpha}=-z_\\alpha$；由 $t$ 分布密度关于 0 对称可得 $t_{1-\\alpha}(n)=-t_\\alpha(n)$</u>。这些分位点是构造置信区间、假设检验拒绝域的基本工具。",
      tags: ["分位点", "查表", "对称性"]
    },
    {
      id: "prob-stat-thm-normal-sampling",
      chapterId: "statistics-basics",
      type: "theorem",
      title: "正态总体样本均值与样本方差的抽样分布",
      statement: "设 $X_1,\\cdots,X_n$ 是来自正态总体 $N(\\mu,\\sigma^2)$ 的样本，$\\bar X,S^2$ 分别为样本均值、样本方差，则：<ul><li>$\\bar X\\sim N\\left(\\mu,\\dfrac{\\sigma^2}{n}\\right)$。</li><li>$\\dfrac{(n-1)S^2}{\\sigma^2}\\sim\\chi^2(n-1)$。</li><li><strong>$\\bar X$ 与 $S^2$ 相互独立</strong>。</li><li>$\\dfrac{\\bar X-\\mu}{S/\\sqrt{n}}\\sim t(n-1)$。</li></ul>",
      explanation: "这是数理统计中最重要的一组定理，是后续单个正态总体参数区间估计和假设检验的直接理论依据。特别注意（2）中<strong>自由度为 $n-1$</strong>（因为估计 $\\mu$ 用掉了一个自由度），<u>（3）$\\bar X$ 与 $S^2$ 相互独立是正态总体特有的性质，一般总体不成立</u>。",
      tags: ["正态总体抽样分布", "核心定理", "独立性"]
    },
    {
      id: "prob-stat-thm-two-sample-normal",
      chapterId: "statistics-basics",
      type: "theorem",
      title: "两个正态总体样本均值差的抽样分布",
      statement: "设 $X_1,\\cdots,X_{n_1}$ 与 $Y_1,\\cdots,Y_{n_2}$ 分别是来自 $N(\\mu_1,\\sigma_1^2)$ 和 $N(\\mu_2,\\sigma_2^2)$ 的相互独立样本：<ul><li><strong>方差已知：</strong>$\\dfrac{(\\bar X-\\bar Y)-(\\mu_1-\\mu_2)}{\\sqrt{\\sigma_1^2/n_1+\\sigma_2^2/n_2}}\\sim N(0,1)$。</li><li><strong>方差相等但未知（$\\sigma_1^2=\\sigma_2^2=\\sigma^2$）：</strong>$\\dfrac{(\\bar X-\\bar Y)-(\\mu_1-\\mu_2)}{S_w\\sqrt{1/n_1+1/n_2}}\\sim t(n_1+n_2-2)$，其中 $S_w^2=\\dfrac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}$。</li></ul>",
      explanation: "这是两正态总体均值差假设检验（如比较两组数据均值是否相等）的理论基础，<strong>$S_w^2$ 称为混合（合并）样本方差</strong>，用于两方差相等但未知的情形。",
      tags: ["双正态总体", "抽样分布", "混合方差"]
    },
    {
      id: "prob-pe-def-point-estimation",
      chapterId: "parameter-estimation",
      type: "definition",
      title: "点估计",
      statement: "设总体 $X$ 的分布中含未知参数 $\\theta$，$X_1,\\cdots,X_n$ 为样本，用统计量 $\\hat\\theta=\\hat\\theta(X_1,\\cdots,X_n)$ 作为 $\\theta$ 的估计，称 $\\hat\\theta$ 为 $\\theta$ 的<strong>点估计量</strong>，代入样本值后得到的具体数值称为<strong>点估计值</strong>。",
      explanation: "点估计是用一个具体的数（统计量的取值）去估计未知参数，与给出区间范围的区间估计相对，常用方法有<strong>矩估计法</strong>和<strong>极大似然估计法</strong>。",
      tags: ["点估计", "估计量", "定义"]
    },
    {
      id: "prob-pe-thm-moment-method",
      chapterId: "parameter-estimation",
      type: "theorem",
      title: "矩估计法",
      statement: "设总体 $X$ 含 $k$ 个未知参数 $\\theta_1,\\cdots,\\theta_k$，且总体的前 $k$ 阶原点矩 $\\mu_l=E(X^l)\\ (l=1,\\cdots,k)$ 存在。<strong>令总体矩等于样本矩</strong>：$\\mu_l(\\theta_1,\\cdots,\\theta_k)=A_l=\\dfrac{1}{n}\\sum\\limits_{i=1}^{n}X_i^l,\\ l=1,\\cdots,k$，解出的 $\\hat\\theta_1,\\cdots,\\hat\\theta_k$（表示为样本矩的函数）即为 $\\theta_1,\\cdots,\\theta_k$ 的<strong>矩估计量</strong>。",
      explanation: "矩估计法的思想是<u>\"用样本矩替代总体矩\"</u>，依据是辛钦大数定律保证样本矩依概率收敛于总体矩。方法直观、计算通常较简单，但可能不唯一或效率不如极大似然估计。",
      tags: ["矩估计法", "点估计方法"]
    },
    {
      id: "prob-pe-thm-mle",
      chapterId: "parameter-estimation",
      type: "theorem",
      title: "极大似然估计法",
      statement: "设总体 $X$ 的分布律（或密度）为 $p(x;\\theta)$（$\\theta$ 为待估参数），样本值为 $x_1,\\cdots,x_n$，则<strong>似然函数</strong>为 $L(\\theta)=\\prod\\limits_{i=1}^{n}p(x_i;\\theta)$。若存在 $\\hat\\theta$ 使 $L(\\hat\\theta)=\\max\\limits_{\\theta}L(\\theta)$，则称 $\\hat\\theta$ 为 $\\theta$ 的<strong>极大似然估计值</strong>。",
      explanation: "求解步骤：<ul><li>写出似然函数 $L(\\theta)$</li><li>取对数得对数似然函数 $\\ln L(\\theta)=\\sum\\ln p(x_i;\\theta)$（连乘化为连加便于求导）</li><li>令 $\\dfrac{\\mathrm{d}\\ln L(\\theta)}{\\mathrm{d}\\theta}=0$（似然方程）解出 $\\hat\\theta$</li></ul><u>当似然方程不可导或无驻点时（如均匀分布参数估计），需根据 $L(\\theta)$ 的单调性直接判断最大值点</u>。",
      tags: ["极大似然估计", "似然函数", "对数似然方程"]
    },
    {
      id: "prob-pe-thm-invariance-mle",
      chapterId: "parameter-estimation",
      type: "property",
      title: "极大似然估计的不变性",
      statement: "设 $\\hat\\theta$ 是参数 $\\theta$ 的极大似然估计，$g(\\theta)$ 是 $\\theta$ 的<strong>严格单调函数</strong>（或更一般地，具有单值反函数），则 $g(\\hat\\theta)$ 是 $g(\\theta)$ 的<strong>极大似然估计</strong>。",
      explanation: "该性质使得极大似然估计的应用更加灵活：例如已知 $\\hat\\sigma^2$ 是 $\\sigma^2$ 的 MLE，则 $\\sqrt{\\hat\\sigma^2}$ 就是 $\\sigma$ 的 MLE，无需重新构造似然函数求解。",
      tags: ["MLE不变性", "点估计性质"]
    },
    {
      id: "prob-pe-def-unbiasedness",
      chapterId: "parameter-estimation",
      type: "definition",
      title: "估计量的无偏性",
      statement: "设 $\\hat\\theta=\\hat\\theta(X_1,\\cdots,X_n)$ 是未知参数 $\\theta$ 的估计量，若 $E(\\hat\\theta)=\\theta$ 对一切 $\\theta$ 成立，则称 $\\hat\\theta$ 为 $\\theta$ 的<strong>无偏估计量</strong>；若 $\\lim\\limits_{n\\to\\infty}E(\\hat\\theta)=\\theta$，则称 $\\hat\\theta$ 为 $\\theta$ 的<strong>渐近无偏估计量</strong>。",
      explanation: "无偏性要求估计量<strong>没有系统性偏差</strong>，是评价估计量优劣最基本的标准之一。典型例子：样本均值 $\\bar X$ 是总体期望 $\\mu$ 的无偏估计；样本方差 $S^2$（分母 $n-1$）是总体方差 $\\sigma^2$ 的无偏估计，而<u>二阶样本中心矩 $B_2$（分母 $n$）是有偏的</u>。",
      tags: ["无偏性", "估计量评价标准"]
    },
    {
      id: "prob-pe-def-efficiency",
      chapterId: "parameter-estimation",
      type: "definition",
      title: "估计量的有效性",
      statement: "设 $\\hat\\theta_1=\\hat\\theta_1(X_1,\\cdots,X_n)$ 与 $\\hat\\theta_2=\\hat\\theta_2(X_1,\\cdots,X_n)$ 都是 $\\theta$ 的无偏估计量，若 $D(\\hat\\theta_1)\\leqslant D(\\hat\\theta_2)$ 对一切 $\\theta$ 成立，且至少有一个 $\\theta$ 使不等号严格成立，则称 $\\hat\\theta_1$ 比 $\\hat\\theta_2$ <strong>有效</strong>。",
      explanation: "有效性是在无偏性基础上进一步比较方差大小：在同为无偏估计的前提下，方差越小的估计量越<strong>\"稳定\"</strong>、越优。<u>比较有效性的前提是两个估计量都必须先满足无偏性</u>，这是常考的比较题型。",
      tags: ["有效性", "估计量评价标准", "方差比较"]
    },
    {
      id: "prob-pe-def-consistency",
      chapterId: "parameter-estimation",
      type: "definition",
      title: "估计量的一致性（相合性）",
      statement: "设 $\\hat\\theta_n=\\hat\\theta_n(X_1,\\cdots,X_n)$ 是 $\\theta$ 的估计量，若对任意 $\\theta$，当 $n\\to\\infty$ 时 $\\hat\\theta_n$ 依概率收敛于 $\\theta$，即对任意 $\\varepsilon>0$，$\\lim\\limits_{n\\to\\infty}P\\{|\\hat\\theta_n-\\theta|<\\varepsilon\\}=1$，则称 $\\hat\\theta_n$ 为 $\\theta$ 的<strong>一致估计量（相合估计量）</strong>。",
      explanation: "一致性描述的是<strong>大样本性质</strong>：样本容量越大，估计量越接近真值。矩估计量在总体矩存在的条件下一般都具有一致性（依据辛钦大数定律）。",
      tags: ["一致性", "相合估计", "估计量评价标准"]
    },
    {
      id: "prob-pe-def-interval-estimation",
      chapterId: "parameter-estimation",
      type: "definition",
      title: "区间估计与置信区间",
      statement: "设总体 $X$ 的分布中含未知参数 $\\theta$，对给定的 $\\alpha\\ (0<\\alpha<1)$，若存在统计量 $\\hat\\theta_1=\\hat\\theta_1(X_1,\\cdots,X_n)$、$\\hat\\theta_2=\\hat\\theta_2(X_1,\\cdots,X_n)$，使 $P\\{\\hat\\theta_1<\\theta<\\hat\\theta_2\\}=1-\\alpha$，则称区间 $(\\hat\\theta_1,\\hat\\theta_2)$ 为 $\\theta$ 的置信度为 $1-\\alpha$ 的<strong>置信区间</strong>，$\\hat\\theta_1,\\hat\\theta_2$ 分别称为<strong>置信下限</strong>与<strong>置信上限</strong>，$1-\\alpha$ 称为<strong>置信度（置信水平）</strong>。",
      explanation: "置信区间的正确理解：<u>反复抽样多次构造区间，大约有 $1-\\alpha$ 比例的区间会包含真值 $\\theta$</u>，而不是\"$\\theta$ 落在某个具体区间内的概率是 $1-\\alpha$\"（$\\theta$ 是常数，具体区间要么包含要么不包含）。构造方法一般是找到一个含 $\\theta$ 且分布已知的<strong>枢轴量</strong>，再由分位点解出不等式。",
      diagram: `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="60" x2="300" y2="60" stroke="currentColor" stroke-width="1.5"/>
        <line x1="90" y1="45" x2="90" y2="75" stroke="#3b82f6" stroke-width="2"/>
        <line x1="230" y1="45" x2="230" y2="75" stroke="#3b82f6" stroke-width="2"/>
        <line x1="90" y1="60" x2="230" y2="60" stroke="#3b82f6" stroke-width="3"/>
        <circle cx="160" cy="60" r="4" fill="#b5490f"/>
        <text x="152" y="40" font-size="11" fill="#b5490f">θ̂</text>
        <text x="78" y="90" font-size="10" fill="currentColor" opacity="0.7">下限</text>
        <text x="218" y="90" font-size="10" fill="currentColor" opacity="0.7">上限</text>
      </svg>`,
      diagramCaption: "以点估计 θ̂ 为中心划出一段区间，反复抽样时约有 1-α 比例的区间能覆盖真值 θ",
      tags: ["区间估计", "置信区间", "置信度"]
    },
    {
      id: "prob-pe-thm-ci-normal-mean",
      chapterId: "parameter-estimation",
      type: "theorem",
      title: "正态总体均值的置信区间",
      statement: "设 $X_1,\\cdots,X_n$ 来自 $N(\\mu,\\sigma^2)$：<ul><li><strong>$\\sigma^2$ 已知：</strong>$\\mu$ 的置信度为 $1-\\alpha$ 的置信区间为 $\\left(\\bar X-\\dfrac{\\sigma}{\\sqrt{n}}z_{\\alpha/2},\\ \\bar X+\\dfrac{\\sigma}{\\sqrt{n}}z_{\\alpha/2}\\right)$。</li><li><strong>$\\sigma^2$ 未知：</strong>置信区间为 $\\left(\\bar X-\\dfrac{S}{\\sqrt{n}}t_{\\alpha/2}(n-1),\\ \\bar X+\\dfrac{S}{\\sqrt{n}}t_{\\alpha/2}(n-1)\\right)$。</li></ul>",
      explanation: "$\\sigma^2$ 已知时用枢轴量 $\\dfrac{\\bar X-\\mu}{\\sigma/\\sqrt{n}}\\sim N(0,1)$，$\\sigma^2$ 未知时用 $\\dfrac{\\bar X-\\mu}{S/\\sqrt{n}}\\sim t(n-1)$（用 $S$ 替代未知的 $\\sigma$），这是最基础也是最常考的置信区间构造情形，<u>二者的区分依据是方差是否已知</u>。",
      tags: ["置信区间", "正态总体均值", "z分位点", "t分位点"]
    },
    {
      id: "prob-pe-thm-ci-normal-variance",
      chapterId: "parameter-estimation",
      type: "theorem",
      title: "正态总体方差的置信区间",
      statement: "设 $X_1,\\cdots,X_n$ 来自 $N(\\mu,\\sigma^2)$，$\\mu$ 未知，则 $\\sigma^2$ 的置信度为 $1-\\alpha$ 的置信区间为 $\\left(\\dfrac{(n-1)S^2}{\\chi_{\\alpha/2}^2(n-1)},\\ \\dfrac{(n-1)S^2}{\\chi_{1-\\alpha/2}^2(n-1)}\\right)$。",
      explanation: "构造依据是枢轴量 $\\dfrac{(n-1)S^2}{\\sigma^2}\\sim\\chi^2(n-1)$；<u>由于 $\\chi^2$ 分布不对称，置信区间的上下限分别用 $\\chi_{\\alpha/2}^2(n-1)$ 与 $\\chi_{1-\\alpha/2}^2(n-1)$ 两个不同的分位点</u>，不能像正态分布那样直接取相反数。",
      tags: ["置信区间", "正态总体方差", "卡方分位点"]
    },
    {
      id: "prob-pe-def-one-sided-ci",
      chapterId: "parameter-estimation",
      type: "definition",
      title: "单侧置信区间",
      statement: "设总体参数为 $\\theta$：<ul><li>若统计量 $\\hat\\theta_1=\\hat\\theta_1(X_1,\\cdots,X_n)$ 满足 $P\\{\\theta>\\hat\\theta_1\\}=1-\\alpha$，则称 $\\hat\\theta_1$ 为 $\\theta$ 的置信度为 $1-\\alpha$ 的<strong>单侧置信下限</strong>，$(\\hat\\theta_1,+\\infty)$ 称为单侧置信区间。</li><li>类似地可定义满足 $P\\{\\theta<\\hat\\theta_2\\}=1-\\alpha$ 的<strong>单侧置信上限</strong> $\\hat\\theta_2$。</li></ul>",
      explanation: "当只关心参数不小于（或不大于）某个界限时（如产品寿命下限、误差上限），<u>采用单侧置信区间比双侧区间更贴合实际需求</u>，构造方法与双侧区间类似，只是把显著性水平 $\\alpha$ 全部分配到一侧的分位点上。",
      tags: ["单侧置信区间", "置信下限", "置信上限"]
    },
    {
      id: "prob-ht-def-basic-idea",
      chapterId: "hypothesis-testing",
      type: "definition",
      title: "假设检验的基本思想",
      statement: "根据样本对关于总体分布（或参数）的某个假设 $H_0$（<strong>原假设/零假设</strong>）作出接受或拒绝的判断的统计推断方法称为<strong>假设检验</strong>。其基本原则是<strong>小概率反证法</strong>思想：先假定 $H_0$ 成立，若由此导致样本观测值落入某个概率很小的区域（小概率事件在一次试验中几乎不发生），则认为出现了矛盾，从而拒绝 $H_0$；否则没有充分理由拒绝 $H_0$。",
      explanation: "假设检验通常同时提出原假设 $H_0$ 与<strong>备择假设 $H_1$（对立假设）</strong>，根据样本构造合适的检验统计量，在 $H_0$ 成立的前提下确定其分布，再依据显著性水平 $\\alpha$ 划定拒绝域。",
      tags: ["假设检验", "小概率反证法", "原假设"]
    },
    {
      id: "prob-ht-def-two-errors",
      chapterId: "hypothesis-testing",
      type: "definition",
      title: "两类错误与显著性水平",
      statement: "<ul><li><strong>第一类错误（弃真错误）：</strong>当 $H_0$ 为真时，却拒绝了 $H_0$，其概率记作 $\\alpha=P\\{\\text{拒绝}H_0\\mid H_0\\text{为真}\\}$，称为<strong>显著性水平</strong>。</li><li><strong>第二类错误（取伪错误）：</strong>当 $H_0$ 不真时，却接受了 $H_0$，其概率记作 $\\beta=P\\{\\text{接受}H_0\\mid H_0\\text{不真}\\}$。</li></ul>",
      explanation: "在样本容量 $n$ 固定的情况下，<u>$\\alpha$ 与 $\\beta$ 通常不能同时减小</u>（此消彼长），假设检验的一般原则是控制第一类错误概率不超过给定的显著性水平 $\\alpha$（如 0.05），在此前提下尽量使第二类错误概率 $\\beta$ 小。要增大样本容量 $n$ 才能同时降低两类错误的概率。",
      tags: ["两类错误", "显著性水平", "弃真取伪"]
    },
    {
      id: "prob-ht-def-rejection-region",
      chapterId: "hypothesis-testing",
      type: "definition",
      title: "检验统计量与拒绝域",
      statement: "由样本构造的、用于确定是否拒绝 $H_0$ 的统计量称为<strong>检验统计量</strong>。使原假设 $H_0$ 被拒绝的样本观测值所在区域称为<strong>拒绝域</strong>，其边界点称为<strong>临界点</strong>。",
      explanation: "构造检验统计量的一般方法：<u>找一个在 $H_0$ 成立下分布已知的量（通常与相应的置信区间枢轴量一致）</u>，根据备择假设的方向（双侧/左侧/右侧）和显著性水平 $\\alpha$ 结合分位点确定拒绝域的形式。",
      tags: ["检验统计量", "拒绝域", "临界点"]
    },
    {
      id: "prob-ht-thm-z-test",
      chapterId: "hypothesis-testing",
      type: "theorem",
      title: "单个正态总体均值的检验（方差已知，Z检验）",
      statement: "设总体 $X\\sim N(\\mu,\\sigma^2)$，$\\sigma^2$ <strong>已知</strong>，检验假设 $H_0:\\mu=\\mu_0$ vs $H_1:\\mu\\neq\\mu_0$。取检验统计量 $Z=\\dfrac{\\bar X-\\mu_0}{\\sigma/\\sqrt{n}}$，在 $H_0$ 成立时 $Z\\sim N(0,1)$。给定显著性水平 $\\alpha$，拒绝域为 $|Z|\\geqslant z_{\\alpha/2}$。",
      explanation: "该检验称为 <strong>Z 检验（U 检验）</strong>。对单侧备择假设 $H_1:\\mu>\\mu_0$，拒绝域为 $Z\\geqslant z_\\alpha$；对 $H_1:\\mu<\\mu_0$，拒绝域为 $Z\\leqslant -z_\\alpha$。<u>检验统计量与相应置信区间的枢轴量形式完全一致</u>，这是区间估计与假设检验内在联系的体现。",
      tags: ["Z检验", "均值检验", "方差已知"]
    },
    {
      id: "prob-ht-thm-t-test",
      chapterId: "hypothesis-testing",
      type: "theorem",
      title: "单个正态总体均值的检验（方差未知，t检验）",
      statement: "设总体 $X\\sim N(\\mu,\\sigma^2)$，$\\sigma^2$ <strong>未知</strong>，检验假设 $H_0:\\mu=\\mu_0$ vs $H_1:\\mu\\neq\\mu_0$。取检验统计量 $T=\\dfrac{\\bar X-\\mu_0}{S/\\sqrt{n}}$，在 $H_0$ 成立时 $T\\sim t(n-1)$。给定显著性水平 $\\alpha$，拒绝域为 $|T|\\geqslant t_{\\alpha/2}(n-1)$。",
      explanation: "该检验称为 <strong>$t$ 检验</strong>，用样本标准差 $S$ 替代未知的 $\\sigma$。单侧检验时同理将拒绝域改为单侧形式并把分位点由 $t_{\\alpha/2}(n-1)$ 换成 $t_\\alpha(n-1)$。",
      tags: ["t检验", "均值检验", "方差未知"]
    },
    {
      id: "prob-ht-thm-chi-square-test",
      chapterId: "hypothesis-testing",
      type: "theorem",
      title: "单个正态总体方差的检验（χ²检验）",
      statement: "设总体 $X\\sim N(\\mu,\\sigma^2)$，$\\mu$ 未知，检验假设 $H_0:\\sigma^2=\\sigma_0^2$ vs $H_1:\\sigma^2\\neq\\sigma_0^2$。取检验统计量 $\\chi^2=\\dfrac{(n-1)S^2}{\\sigma_0^2}$，在 $H_0$ 成立时 $\\chi^2\\sim\\chi^2(n-1)$。给定显著性水平 $\\alpha$，拒绝域为 $\\chi^2\\geqslant\\chi_{\\alpha/2}^2(n-1)$ 或 $\\chi^2\\leqslant\\chi_{1-\\alpha/2}^2(n-1)$。",
      explanation: "<u>由于 $\\chi^2$ 分布不对称，双侧检验的两个临界值不能像正态分布那样简单取相反数</u>，须分别查 $\\chi_{\\alpha/2}^2(n-1)$ 与 $\\chi_{1-\\alpha/2}^2(n-1)$ 两个不同的分位点。",
      tags: ["卡方检验", "方差检验"]
    },
    {
      id: "prob-ht-def-p-value",
      chapterId: "hypothesis-testing",
      type: "definition",
      title: "p值",
      statement: "在假设检验中，<strong>p值</strong>是指在原假设 $H_0$ 成立的条件下，检验统计量取到其样本观测值以及更极端方向取值的概率，即<strong>拒绝 $H_0$ 所需要的最小显著性水平</strong>。",
      explanation: "<u>若 $p$ 值小于给定的显著性水平 $\\alpha$，则在水平 $\\alpha$ 下拒绝 $H_0$；反之则不拒绝</u>。相较于只给出\"拒绝\"或\"不拒绝\"的结论，$p$ 值能提供更精细的证据强度信息，$p$ 值越小说明拒绝 $H_0$ 的证据越强。",
      tags: ["p值", "假设检验"]
    },
    {
      id: "prob-ht-thm-two-sample-mean-test",
      chapterId: "hypothesis-testing",
      type: "theorem",
      title: "两个正态总体均值差的检验（方差相等但未知，t检验）",
      statement: "设 $X_1,\\cdots,X_{n_1}$ 与 $Y_1,\\cdots,Y_{n_2}$ 分别来自相互独立的正态总体 $N(\\mu_1,\\sigma^2)$ 与 $N(\\mu_2,\\sigma^2)$（<strong>方差相等但未知</strong>），检验假设 $H_0:\\mu_1=\\mu_2$ vs $H_1:\\mu_1\\neq\\mu_2$。取检验统计量 $T=\\dfrac{\\bar X-\\bar Y}{S_w\\sqrt{1/n_1+1/n_2}}$，其中 $S_w^2=\\dfrac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}$，在 $H_0$ 成立时 $T\\sim t(n_1+n_2-2)$。给定显著性水平 $\\alpha$，拒绝域为 $|T|\\geqslant t_{\\alpha/2}(n_1+n_2-2)$。",
      explanation: "该检验用于比较两组独立正态样本的均值是否相等（如两种工艺的产品指标对比），<u>前提是两总体方差相等（可先用 F 检验验证）</u>，统计量与其对应的置信区间构造方法一致。",
      tags: ["两样本t检验", "均值差检验"]
    },
    {
      id: "prob-ht-thm-f-test-variance-ratio",
      chapterId: "hypothesis-testing",
      type: "theorem",
      title: "两个正态总体方差比的检验（F检验）",
      statement: "设 $X_1,\\cdots,X_{n_1}$ 与 $Y_1,\\cdots,Y_{n_2}$ 分别来自相互独立的正态总体 $N(\\mu_1,\\sigma_1^2)$ 与 $N(\\mu_2,\\sigma_2^2)$，$\\mu_1,\\mu_2$ 未知，检验假设 $H_0:\\sigma_1^2=\\sigma_2^2$ vs $H_1:\\sigma_1^2\\neq\\sigma_2^2$。取检验统计量 $F=\\dfrac{S_1^2}{S_2^2}$，在 $H_0$ 成立时 $F\\sim F(n_1-1,n_2-1)$。给定显著性水平 $\\alpha$，拒绝域为 $F\\geqslant F_{\\alpha/2}(n_1-1,n_2-1)$ 或 $F\\leqslant F_{1-\\alpha/2}(n_1-1,n_2-1)$。",
      explanation: "该检验称为 <strong>F 检验</strong>，常作为两样本 t 检验（方差齐性假设）的前置检验；<u>由于 $F$ 分布不对称，双侧检验需分别确定上下两个不同的临界值</u>，可利用关系 $F_{1-\\alpha/2}(n_1-1,n_2-1)=1/F_{\\alpha/2}(n_2-1,n_1-1)$ 简化查表。",
      tags: ["F检验", "方差比检验"]
    },
    {
      id: "prob-ht-prop-test-ci-duality",
      chapterId: "hypothesis-testing",
      type: "property",
      title: "假设检验与置信区间的对偶关系",
      statement: "对双侧假设 $H_0:\\theta=\\theta_0$ vs $H_1:\\theta\\neq\\theta_0$，在显著性水平 $\\alpha$ 下<strong>\"接受 $H_0$\"</strong>等价于<strong>\"$\\theta_0$ 落在 $\\theta$ 的置信度为 $1-\\alpha$ 的置信区间内\"</strong>；<strong>\"拒绝 $H_0$\"</strong>等价于<strong>\"$\\theta_0$ 不在该置信区间内\"</strong>。",
      explanation: "这一<strong>对偶关系</strong>表明置信区间与假设检验本质上是同一枢轴量在不同角度下的应用：<u>置信区间回答\"参数的合理取值范围是什么\"，假设检验回答\"某个特定值是否合理\"</u>，二者可以相互转化。",
      tags: ["假设检验", "置信区间", "对偶关系"]
    },
    {
      id: "prob-rv-def-hypergeometric",
      chapterId: "random-variable",
      type: "definition",
      title: "超几何分布",
      statement: "设 $N$ 件产品中有 $M$ 件次品，从中<strong>不放回</strong>地任取 $n$ 件，则其中次品数 $X$ 服从<strong>超几何分布</strong> $H(n,M,N)$，其分布律为 $$P\\{X=k\\}=\\frac{\\dbinom{M}{k}\\dbinom{N-M}{n-k}}{\\dbinom{N}{n}},\\quad k=\\max(0,\\,n-N+M),\\cdots,\\min(n,M).$$ 其期望为 $E(X)=n\\dfrac{M}{N}$。",
      explanation: "与二项分布的核心区别在于<strong>是否放回</strong>：<u>放回抽样是二项分布（各次独立），不放回抽样是超几何分布（各次不独立）</u>。但当 $N$ 很大而 $n$ 相对很小时，抽走几件对总体比例影响甚微，此时超几何分布可用二项分布近似：$P\\{X=k\\}\\approx\\dbinom{n}{k}p^k(1-p)^{n-k}$，其中 $p=M/N$。注意两者<strong>期望公式形式相同</strong>（都是 $np$），但方差不同。",
      tags: ["随机变量", "超几何分布", "不放回抽样"]
    },
    {
      id: "prob-nc-def-covariance-matrix",
      chapterId: "numerical-characteristics",
      type: "definition",
      title: "n 维随机变量的协方差矩阵",
      statement: "设 $n$ 维随机变量 $(X_1,X_2,\\cdots,X_n)$ 的二阶混合中心矩 $c_{ij}=\\operatorname{Cov}(X_i,X_j)=E\\{[X_i-E(X_i)][X_j-E(X_j)]\\}$ 均存在，则矩阵 $$C=\\begin{pmatrix} c_{11} & c_{12} & \\cdots & c_{1n}\\\\ c_{21} & c_{22} & \\cdots & c_{2n}\\\\ \\vdots & \\vdots & & \\vdots\\\\ c_{n1} & c_{n2} & \\cdots & c_{nn}\\end{pmatrix}$$ 称为该 $n$ 维随机变量的<strong>协方差矩阵</strong>。",
      explanation: "三个必记性质：<ul><li><strong>主对角元就是方差：</strong>$c_{ii}=\\operatorname{Cov}(X_i,X_i)=D(X_i)$</li><li><strong>对称性：</strong>$c_{ij}=c_{ji}$，故 $C$ 是<strong>实对称矩阵</strong>（可正交对角化，与线代打通）</li><li><strong>半正定性：</strong>$C$ 总是半正定的；若各分量不存在线性相关关系则为正定</li></ul><u>若 $X_1,\\cdots,X_n$ 两两不相关，则 $C$ 是对角矩阵</u>，这是判断独立性/不相关性的常用切入点。",
      tags: ["数字特征", "协方差矩阵", "多维随机变量"]
    }
  ]
});
