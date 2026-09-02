registerSubject({
  id: "calculus",
  name: "高等数学（微积分）",
  color: "#2b6f77",
  chapters: [
    { id: "limit", name: "函数、极限、连续", order: 1 },
    { id: "derivative", name: "一元函数微分学", order: 2 },
    { id: "integral", name: "一元函数积分学", order: 3 },
    { id: "vector-geometry", name: "向量代数与空间解析几何", order: 4 },
    { id: "multivar-derivative", name: "多元函数微分学", order: 5 },
    { id: "multiple-integral", name: "重积分（二重积分、三重积分）", order: 6 },
    { id: "line-surface-integral", name: "曲线积分与曲面积分", order: 7 },
    { id: "series", name: "无穷级数", order: 8 },
    { id: "ode", name: "常微分方程", order: 9 }
  ],
  items: [
    {
      id: "calc-limit-def-eps-n",
      chapterId: "limit",
      type: "definition",
      title: "数列极限的 ε-N 定义",
      statement: "设数列 $\\{x_n\\}$，若存在常数 $A$，对任意给定的 $\\varepsilon>0$，总存在正整数 $N$，使得当 $n>N$ 时恒有 $|x_n-A|<\\varepsilon$，则称数列 $\\{x_n\\}$ <strong>收敛于</strong> $A$，记作 $\\lim\\limits_{n\\to\\infty}x_n=A$。",
      explanation: "<strong>几何意义</strong>：数列从某一项之后，所有点都落在区间 $(A-\\varepsilon, A+\\varepsilon)$ 内。<strong>记忆口诀</strong>：\"任意小的 ε，总能找到 N，N 之后都在范围内\"。<strong>易错点</strong>：N 依赖于 ε，且 N 不唯一，只需存在即可。",
      tags: ["极限", "数列", "ε-N语言"]
    },
    {
      id: "calc-limit-def-eps-delta",
      chapterId: "limit",
      type: "definition",
      title: "函数极限的 ε-δ 定义",
      statement: "设函数 $f(x)$ 在点 $x_0$ 的某<strong>去心邻域</strong>内有定义，若存在常数 $A$，对任意给定的 $\\varepsilon>0$，总存在 $\\delta>0$，使得当 $0<|x-x_0|<\\delta$ 时恒有 $|f(x)-A|<\\varepsilon$，则称当 $x\\to x_0$ 时函数 $f(x)$ <strong>以 $A$ 为极限</strong>，记作 $\\lim\\limits_{x\\to x_0}f(x)=A$。",
      explanation: "<strong>去心邻域</strong>强调极限与 $f(x_0)$ 是否存在、是否相等<strong>无关</strong>。类似地可定义 $x\\to\\infty$、单侧极限（$x\\to x_0^+$、$x\\to x_0^-$）的 ε-δ（ε-X）语言，只需把邻域改成相应形式。",
      tags: ["极限", "函数", "ε-δ语言"]
    },
    {
      id: "calc-limit-thm-two-important",
      chapterId: "limit",
      type: "theorem",
      title: "两个重要极限",
      statement: "<ul><li><strong>第一个重要极限：</strong>$\\lim\\limits_{x\\to 0}\\dfrac{\\sin x}{x}=1$。</li><li><strong>第二个重要极限：</strong>$\\lim\\limits_{x\\to\\infty}\\left(1+\\dfrac{1}{x}\\right)^{x}=e$，等价地 $\\lim\\limits_{x\\to 0}(1+x)^{\\frac{1}{x}}=e$。</li></ul>",
      explanation: "第一个是 $\\frac{0}{0}$ 型（三角函数与自变量之比趋于1），第二个是 $1^{\\infty}$ 型。使用时要注意<strong>凑形式</strong>：括号内为 $\\Box\\to 0$，指数为 $\\frac{1}{\\Box}$ 时极限为 $e$。是求 $1^\\infty$、$\\frac{0}{0}$ 未定式的常用工具。",
      tags: ["极限", "重要极限", "e"]
    },
    {
      id: "calc-limit-thm-equivalent-infinitesimal",
      chapterId: "limit",
      type: "theorem",
      title: "常用等价无穷小",
      statement: "当 $x\\to 0$ 时：$\\sin x\\sim x$，$\\tan x\\sim x$，$\\arcsin x\\sim x$，$\\arctan x\\sim x$，$1-\\cos x\\sim \\dfrac{1}{2}x^{2}$，$e^{x}-1\\sim x$，$\\ln(1+x)\\sim x$，$(1+x)^{\\alpha}-1\\sim \\alpha x$，$a^{x}-1\\sim x\\ln a$。",
      explanation: "等价无穷小替换<strong>只能在乘除因子中整体替换</strong>，<strong>加减时需谨慎</strong>（一般要求替换后不改变主部，可用泰勒展开验证）。求极限时优先尝试等价无穷小简化，再考虑洛必达法则。",
      tags: ["极限", "等价无穷小", "求极限"]
    },
    {
      id: "calc-limit-thm-lhospital",
      chapterId: "limit",
      type: "theorem",
      title: "洛必达法则",
      statement: "设 $\\lim\\limits_{x\\to x_0}f(x)=\\lim\\limits_{x\\to x_0}g(x)=0$（或都为 $\\infty$），$f,g$ 在 $x_0$ 去心邻域内可导且 $g'(x)\\neq 0$，若 $\\lim\\limits_{x\\to x_0}\\dfrac{f'(x)}{g'(x)}=A$（可为 $\\pm\\infty$），则 $\\lim\\limits_{x\\to x_0}\\dfrac{f(x)}{g(x)}=\\lim\\limits_{x\\to x_0}\\dfrac{f'(x)}{g'(x)}=A$。",
      explanation: "<strong>只适用于</strong> $\\frac{0}{0}$ 或 $\\frac{\\infty}{\\infty}$ 型，其他未定式（$0\\cdot\\infty$、$\\infty-\\infty$、$0^0$、$1^\\infty$、$\\infty^0$）需先化为这两种形式。<strong>易错点</strong>：用洛必达前必须验证条件（尤其是极限存在性），且可反复使用。",
      tags: ["极限", "洛必达法则", "未定式"]
    },
    {
      id: "calc-limit-def-continuity",
      chapterId: "limit",
      type: "definition",
      title: "函数在一点连续的定义",
      statement: "设函数 $f(x)$ 在点 $x_0$ 的某邻域内有定义，若 $\\lim\\limits_{\\Delta x\\to 0}\\Delta y=\\lim\\limits_{\\Delta x\\to 0}[f(x_0+\\Delta x)-f(x_0)]=0$，等价地 $\\lim\\limits_{x\\to x_0}f(x)=f(x_0)$，则称 $f(x)$ 在点 $x_0$ 处<strong>连续</strong>。",
      explanation: "<strong>三个条件缺一不可</strong>：$f(x_0)$ 有定义、$\\lim\\limits_{x\\to x_0}f(x)$ 存在、且两者相等。左右极限都等于 $f(x_0)$ 即为左右连续，连续 $\\Leftrightarrow$ 左连续且右连续。",
      tags: ["连续", "定义", "极限"]
    },
    {
      id: "calc-limit-def-discontinuity-types",
      chapterId: "limit",
      type: "definition",
      title: "间断点的分类",
      statement: "设 $x_0$ 是 $f(x)$ 的间断点。<ul><li><strong>第一类间断点：</strong>$f(x_0^-)$、$f(x_0^+)$ 都存在。其中两者相等（但不等于 $f(x_0)$ 或 $f(x_0)$ 无定义）称为<strong>可去间断点</strong>，两者不等称为<strong>跳跃间断点</strong>。</li><li><strong>第二类间断点：</strong>$f(x_0^-)$、$f(x_0^+)$ 至少一个不存在（如为 $\\infty$ 或振荡）。</li></ul>",
      explanation: "<strong>记忆</strong>：第一类看\"左右极限是否都存在\"，第二类是\"至少一侧极限不存在\"。常见第二类间断点例子：$\\frac{1}{x}$ 在 $x=0$（无穷间断点）、$\\sin\\frac{1}{x}$ 在 $x=0$（振荡间断点）。",
      tags: ["连续", "间断点", "分类"]
    },
    {
      id: "calc-limit-thm-intermediate-value",
      chapterId: "limit",
      type: "theorem",
      title: "介值定理与零点定理",
      statement: "设 $f(x)$ 在闭区间 $[a,b]$ 上连续，且 $f(a)\\neq f(b)$，则对介于 $f(a)$ 与 $f(b)$ 之间的任意 $\\mu$，至少存在一点 $\\xi\\in(a,b)$，使得 $f(\\xi)=\\mu$（<strong>介值定理</strong>）。特别地，若 $f(a)\\cdot f(b)<0$，则至少存在一点 $\\xi\\in(a,b)$，使 $f(\\xi)=0$（<strong>零点定理</strong>/根的存在定理）。",
      explanation: "零点定理是介值定理在 $\\mu=0$ 时的特例，是证明方程根存在性的<strong>核心工具</strong>：构造辅助函数、验证端点异号即可。前提<strong>闭区间上连续</strong>不可省略。",
      tags: ["连续", "介值定理", "零点定理"]
    },
    {
      id: "calc-limit-thm-extreme-value",
      chapterId: "limit",
      type: "theorem",
      title: "最值定理与有界性定理",
      statement: "若函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，则 $f(x)$ 在 $[a,b]$ 上必有最大值和最小值（<strong>最值定理</strong>），且 $f(x)$ 在 $[a,b]$ 上必有界（<strong>有界性定理</strong>，是最值定理的推论）。",
      explanation: "条件<strong>闭区间+连续</strong>缺一不可，如 $f(x)=\\frac{1}{x}$ 在开区间 $(0,1)$ 连续但无界无最值。这是证明存在性问题（如构造辅助函数求最值点）的基础定理。",
      tags: ["连续", "最值定理", "有界性"]
    },
    {
      id: "calc-limit-def-infinitesimal-order",
      chapterId: "limit",
      type: "definition",
      title: "无穷小的阶",
      statement: "设 $\\alpha,\\beta$ 是自变量同一变化过程中的无穷小，且 $\\alpha\\neq 0$。<ul><li><strong>高阶无穷小：</strong>若 $\\lim\\dfrac{\\beta}{\\alpha}=0$，称 $\\beta$ 是比 $\\alpha$ 高阶的无穷小，记 $\\beta=o(\\alpha)$。</li><li><strong>同阶无穷小：</strong>若 $\\lim\\dfrac{\\beta}{\\alpha}=c\\neq 0$（$c$ 为常数），称 $\\beta$ 与 $\\alpha$ 是同阶无穷小。</li><li><strong>$k$ 阶无穷小：</strong>若 $\\lim\\dfrac{\\beta}{\\alpha^{k}}=c\\neq 0$，称 $\\beta$ 是关于 $\\alpha$ 的 $k$ 阶无穷小。</li><li><strong>等价无穷小：</strong>若 $\\lim\\dfrac{\\beta}{\\alpha}=1$，称 $\\beta$ 与 $\\alpha$ 是等价无穷小，记 $\\alpha\\sim\\beta$。</li></ul>",
      explanation: "判断无穷小的阶常用<strong>泰勒展开取主项</strong>。等价无穷小是同阶无穷小的特例（$c=1$）。这是比较无穷小/无穷大\"快慢\"、求极限时确定主部的基础概念。",
      tags: ["极限", "无穷小", "阶"]
    },
    {
      id: "calc-limit-thm-heine",
      chapterId: "limit",
      type: "theorem",
      title: "数列极限与函数极限的关系（归结原则）",
      statement: "$\\lim\\limits_{x\\to x_0}f(x)=A$ 的<strong>充要条件</strong>是：对任意以 $x_0$ 为极限且各项不等于 $x_0$ 的数列 $\\{x_n\\}$，都有 $\\lim\\limits_{n\\to\\infty}f(x_n)=A$。",
      explanation: "常用于<strong>证明极限不存在</strong>：只需找到两个趋于 $x_0$ 的数列使 $f(x_n)$ 趋于不同的值，或找一个数列使 $f(x_n)$ 极限不存在。典型例子：$f(x)=\\sin\\frac{1}{x}$ 在 $x\\to 0$ 时极限不存在。",
      tags: ["极限", "归结原则", "海涅定理"]
    },
    {
      id: "calc-limit-thm-squeeze",
      chapterId: "limit",
      type: "theorem",
      title: "夹逼准则",
      statement: "若存在 $N_0$（或去心邻域），当 $n>N_0$（或 $x$ 在该邻域内）时有 $g(x)\\leqslant f(x)\\leqslant h(x)$，且 $\\lim g(x)=\\lim h(x)=A$，则 $\\lim f(x)=A$。",
      explanation: "又称夹逼定理/两边夹准则，常用于求含 $\\sin$、$[\\,\\cdot\\,]$（取整）等难以直接求极限的表达式，关键是<strong>构造合适的上下界函数</strong>。",
      tags: ["极限", "夹逼准则", "求极限"]
    },
    {
      id: "calc-limit-thm-monotone-bounded",
      chapterId: "limit",
      type: "theorem",
      title: "单调有界准则",
      statement: "<strong>单调递增（递减）且有上界（下界）</strong>的数列必收敛。",
      explanation: "是证明递推数列 $x_{n+1}=f(x_n)$ 极限存在性的核心方法：先证单调性（常用归纳法或比较相邻项），再证有界性，最后对递推式两边取极限解出极限值。这是判定收敛性时<u>唯一不需先知道极限值的方法</u>。",
      tags: ["极限", "单调有界准则", "递推数列"]
    },
    {
      id: "calc-deriv-def-derivative",
      chapterId: "derivative",
      type: "definition",
      title: "导数的定义",
      statement: "设函数 $y=f(x)$ 在点 $x_0$ 的某邻域内有定义，若极限 $\\lim\\limits_{\\Delta x\\to 0}\\dfrac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}$ 存在，则称 $f(x)$ 在点 $x_0$ 处<strong>可导</strong>，此极限值称为 $f(x)$ 在 $x_0$ 处的<strong>导数</strong>，记作 $f'(x_0)$，也可写成 $\\lim\\limits_{x\\to x_0}\\dfrac{f(x)-f(x_0)}{x-x_0}$。",
      explanation: "导数是函数增量与自变量增量之比的极限，<strong>几何意义</strong>是曲线在该点切线的斜率，<strong>物理意义</strong>是瞬时变化率。左右导数分别令 $\\Delta x\\to 0^-,0^+$，可导 $\\Leftrightarrow$ 左右导数都存在且相等。",
      diagram: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="170" x2="300" y2="170" stroke="currentColor" stroke-width="1.5"/>
        <line x1="30" y1="170" x2="30" y2="20" stroke="currentColor" stroke-width="1.5"/>
        <path d="M50,150 Q140,40 280,35" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.55"/>
        <line x1="50" y1="130" x2="250" y2="20" stroke="#b5490f" stroke-width="2"/>
        <line x1="110" y1="97" x2="205" y2="47" stroke="#3b82f6" stroke-width="1.4" stroke-dasharray="4 3"/>
        <circle cx="110" cy="97" r="3.5" fill="#3b82f6"/>
        <circle cx="205" cy="47" r="3.5" fill="#3b82f6"/>
        <line x1="110" y1="97" x2="205" y2="97" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.5"/>
        <line x1="205" y1="97" x2="205" y2="47" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.5"/>
        <text x="150" y="112" font-size="11" fill="currentColor" opacity="0.75">Δx</text>
        <text x="212" y="75" font-size="11" fill="currentColor" opacity="0.75">Δy</text>
        <text x="98" y="113" font-size="11" fill="currentColor">P</text>
        <text x="210" y="42" font-size="11" fill="currentColor">Q</text>
      </svg>`,
      diagramCaption: "割线 PQ 的斜率是 Δy/Δx，当 Δx→0 时割线趋于 P 点处的切线（橙色），其斜率即为 f′(x₀)",
      tags: ["导数", "定义", "极限"]
    },
    {
      id: "calc-deriv-thm-differentiable-continuous",
      chapterId: "derivative",
      type: "theorem",
      title: "可导与连续的关系",
      statement: "若函数 $f(x)$ 在点 $x_0$ 处可导，则 $f(x)$ 在 $x_0$ 处必连续；反之不一定成立。",
      explanation: "即<strong>可导 $\\Rightarrow$ 连续</strong>，但<strong>连续 $\\not\\Rightarrow$ 可导</strong>。经典反例：$f(x)=|x|$ 在 $x=0$ 连续但不可导（左右导数不相等）。判断分段函数在分段点的可导性时要先保证连续，否则一定不可导。",
      tags: ["导数", "连续", "可导性"]
    },
    {
      id: "calc-deriv-def-differential",
      chapterId: "derivative",
      type: "definition",
      title: "微分的定义",
      statement: "设函数 $y=f(x)$ 在点 $x_0$ 的某邻域内有定义，若函数的增量 $\\Delta y=f(x_0+\\Delta x)-f(x_0)$ 可表示为 $\\Delta y=A\\Delta x+o(\\Delta x)$（$\\Delta x\\to 0$），其中 $A$ 与 $\\Delta x$ 无关，则称 $f(x)$ 在 $x_0$ 处<strong>可微</strong>，$A\\Delta x$ 称为 $f(x)$ 在 $x_0$ 处的<strong>微分</strong>，记作 $\\mathrm{d}y=A\\Delta x$。可以证明 $A=f'(x_0)$，故 $\\mathrm{d}y=f'(x_0)\\Delta x=f'(x_0)\\mathrm{d}x$。",
      explanation: "一元函数中<strong>\"可微\"与\"可导\"等价</strong>，这是与多元函数的重要区别（多元函数可微比偏导数存在更强）。微分的几何意义是用切线的增量近似曲线的增量，是局部线性近似的基础。",
      tags: ["微分", "定义", "可微"]
    },
    {
      id: "calc-deriv-thm-rolle",
      chapterId: "derivative",
      type: "theorem",
      title: "罗尔定理",
      statement: "若函数 $f(x)$ 满足：<ul><li>在闭区间 $[a,b]$ 上连续；</li><li>在开区间 $(a,b)$ 内可导；</li><li>$f(a)=f(b)$；</li></ul>则至少存在一点 $\\xi\\in(a,b)$，使得 $f'(\\xi)=0$。",
      explanation: "<strong>几何意义</strong>：两端点函数值相等的光滑曲线，中间必有一点切线水平。是拉格朗日中值定理、柯西中值定理的基础，也是证明\"至少存在一点使某导数表达式为零\"类问题的核心工具，常需<strong>构造辅助函数</strong>。",
      tags: ["中值定理", "罗尔定理", "导数"]
    },
    {
      id: "calc-deriv-thm-lagrange",
      chapterId: "derivative",
      type: "theorem",
      title: "拉格朗日中值定理",
      statement: "若函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，在开区间 $(a,b)$ 内可导，则至少存在一点 $\\xi\\in(a,b)$，使得 $f(b)-f(a)=f'(\\xi)(b-a)$。",
      explanation: "是罗尔定理的推广（去掉了 $f(a)=f(b)$ 的限制）。<strong>几何意义</strong>：曲线上至少有一点的切线平行于连接端点的弦。<strong>推论</strong>：若 $f'(x)\\equiv 0$ 于区间 $I$ 上，则 $f(x)$ 在 $I$ 上恒为常数，这是证明恒等式的重要方法。",
      diagram: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="160" x2="300" y2="160" stroke="currentColor" stroke-width="1.5"/>
        <path d="M50,140 C110,20 190,150 270,40" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.55"/>
        <line x1="50" y1="140" x2="270" y2="40" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4 3"/>
        <circle cx="50" cy="140" r="3.5" fill="#3b82f6"/>
        <circle cx="270" cy="40" r="3.5" fill="#3b82f6"/>
        <line x1="118" y1="118" x2="222" y2="70" stroke="#b5490f" stroke-width="2"/>
        <circle cx="170" cy="94" r="3" fill="#b5490f"/>
        <line x1="170" y1="94" x2="170" y2="160" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
        <text x="44" y="158" font-size="11" fill="currentColor">a</text>
        <text x="264" y="158" font-size="11" fill="currentColor">b</text>
        <text x="166" y="176" font-size="11" fill="currentColor">ξ</text>
      </svg>`,
      diagramCaption: "弦 ab（蓝色虚线）与曲线上 ξ 点处的切线（橙色）平行，此即中值定理的几何意义",
      tags: ["中值定理", "拉格朗日中值定理", "导数"]
    },
    {
      id: "calc-deriv-thm-cauchy",
      chapterId: "derivative",
      type: "theorem",
      title: "柯西中值定理",
      statement: "若函数 $f(x),g(x)$ 都在闭区间 $[a,b]$ 上连续，在开区间 $(a,b)$ 内可导，且 $g'(x)\\neq 0$（$x\\in(a,b)$），则至少存在一点 $\\xi\\in(a,b)$，使得 $\\dfrac{f(b)-f(a)}{g(b)-g(a)}=\\dfrac{f'(\\xi)}{g'(\\xi)}$。",
      explanation: "取 $g(x)=x$ 即退化为拉格朗日中值定理，是拉格朗日中值定理的<strong>进一步推广</strong>。常用于证明含两个函数、需要联系两者导数比值的等式类命题，也是洛必达法则证明的基础。",
      tags: ["中值定理", "柯西中值定理", "导数"]
    },
    {
      id: "calc-deriv-thm-taylor",
      chapterId: "derivative",
      type: "theorem",
      title: "泰勒公式（带拉格朗日余项）",
      statement: "若函数 $f(x)$ 在 $x_0$ 的某邻域内具有 $n+1$ 阶导数，则对该邻域内任一点 $x$，有 $f(x)=f(x_0)+f'(x_0)(x-x_0)+\\dfrac{f''(x_0)}{2!}(x-x_0)^2+\\cdots+\\dfrac{f^{(n)}(x_0)}{n!}(x-x_0)^n+R_n(x)$，其中拉格朗日余项 $R_n(x)=\\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}(x-x_0)^{n+1}$，$\\xi$ 介于 $x_0$ 与 $x$ 之间；当 $x_0=0$ 时称为麦克劳林公式。",
      explanation: "余项也可写成<strong>佩亚诺余项</strong> $o((x-x_0)^n)$（仅用于求极限，不需高阶可导条件），<strong>拉格朗日余项</strong>则常用于估计误差、证明不等式。常用麦克劳林展开：$e^x,\\sin x,\\cos x,\\ln(1+x),(1+x)^\\alpha$ <strong>需熟记</strong>。",
      diagram: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="160" x2="300" y2="160" stroke="currentColor" stroke-width="1.5"/>
        <line x1="160" y1="160" x2="160" y2="20" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
        <path d="M40,70 C90,140 140,100 160,95 C180,90 230,60 290,150" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.6"/>
        <path d="M40,130 C90,100 140,96 160,95 C180,94 230,120 290,40" fill="none" stroke="#3b82f6" stroke-width="1.8" stroke-dasharray="5 3"/>
        <circle cx="160" cy="95" r="3.5" fill="#b5490f"/>
        <text x="150" y="176" font-size="11" fill="currentColor">x₀</text>
        <text x="255" y="35" font-size="11" fill="#3b82f6">泰勒多项式</text>
        <text x="255" y="165" font-size="11" fill="currentColor" opacity="0.7">f(x)</text>
      </svg>`,
      diagramCaption: "泰勒多项式（蓝色虚线）在 x₀ 附近与原函数（灰色实线）高度吻合，离 x₀ 越远误差越大",
      tags: ["泰勒公式", "中值定理", "麦克劳林公式"]
    },
    {
      id: "calc-deriv-prop-rules",
      chapterId: "derivative",
      type: "property",
      title: "导数的四则运算法则",
      statement: "设 $u(x),v(x)$ 可导，则 $(u\\pm v)'=u'\\pm v'$；$(uv)'=u'v+uv'$；$\\left(\\dfrac{u}{v}\\right)'=\\dfrac{u'v-uv'}{v^2}$（$v\\neq 0$）。",
      explanation: "乘积求导法则可推广到多个函数：$(uvw)'=u'vw+uv'w+uvw'$。商的求导公式<strong>分子顺序不能颠倒</strong>（$u'v-uv'$），这是最容易记错符号的地方。",
      tags: ["导数", "求导法则", "四则运算"]
    },
    {
      id: "calc-deriv-prop-chain-rule",
      chapterId: "derivative",
      type: "property",
      title: "复合函数求导法则（链式法则）",
      statement: "设 $y=f(u)$，$u=g(x)$，若 $g(x)$ 在 $x$ 处可导，$f(u)$ 在对应的 $u=g(x)$ 处可导，则复合函数 $y=f(g(x))$ 在 $x$ 处可导，且 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}=f'(u)\\cdot g'(x)$。",
      explanation: "俗称\"链式法则\"，多层复合时<strong>逐层向内求导相乘</strong>，如 $y=f(g(h(x)))$ 则 $y'=f'(g(h(x)))\\cdot g'(h(x))\\cdot h'(x)$。是求导数中使用频率最高的法则，隐函数、参数方程求导都以此为基础。",
      tags: ["导数", "链式法则", "复合函数"]
    },
    {
      id: "calc-deriv-prop-inverse-func",
      chapterId: "derivative",
      type: "property",
      title: "反函数求导法则",
      statement: "设 $y=f(x)$ 在某区间内单调可导，且 $f'(x)\\neq 0$，则其反函数 $x=f^{-1}(y)$ 在对应区间内也可导，且 $[f^{-1}(y)]'=\\dfrac{1}{f'(x)}$，即 $\\dfrac{\\mathrm{d}x}{\\mathrm{d}y}=\\dfrac{1}{\\mathrm{d}y/\\mathrm{d}x}$。",
      explanation: "反函数的导数<strong>等于原函数导数的倒数</strong>，这是推导反三角函数、对数函数导数公式的依据。使用前提是原函数在该区间<strong>单调</strong>（保证反函数存在）且导数<strong>不为零</strong>。",
      tags: ["导数", "反函数", "求导法则"]
    },
    {
      id: "calc-deriv-prop-implicit-parametric",
      chapterId: "derivative",
      type: "property",
      title: "隐函数与参数方程求导",
      statement: "<ul><li><strong>隐函数 $F(x,y)=0$ 求导：</strong>方程两边同时对 $x$ 求导，将 $y$ 看作 $x$ 的函数，用链式法则处理含 $y$ 的项，再解出 $y'$。</li><li><strong>参数方程求导：</strong>$\\begin{cases}x=\\varphi(t)\\\\y=\\psi(t)\\end{cases}$（$\\varphi'(t)\\neq 0$）确定的函数，其导数为 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}=\\dfrac{\\psi'(t)}{\\varphi'(t)}$，二阶导数 $\\dfrac{\\mathrm{d}^2y}{\\mathrm{d}x^2}=\\dfrac{\\left(\\frac{\\psi'(t)}{\\varphi'(t)}\\right)'_t}{\\varphi'(t)}$。</li></ul>",
      explanation: "隐函数求导的关键是把 $y$ 当作 $x$ 的函数用链式法则处理；参数方程二阶导数<u>不能直接对 $t$ 求两次导再相除</u>，必须先求出 $y'_x$ 再对该式关于 $t$ 求导后除以 $\\varphi'(t)$。",
      tags: ["导数", "隐函数", "参数方程"]
    },
    {
      id: "calc-deriv-thm-fermat",
      chapterId: "derivative",
      type: "theorem",
      title: "费马引理（极值必要条件）",
      statement: "设函数 $f(x)$ 在点 $x_0$ 处可导，且 $x_0$ 是 $f(x)$ 的极值点，则 $f'(x_0)=0$（称 $x_0$ 为<strong>驻点</strong>/稳定点）。",
      explanation: "这是可导函数取极值的<strong>必要条件而非充分条件</strong>，如 $f(x)=x^3$ 在 $x=0$ 处导数为零但不是极值点。极值点只能在驻点或导数不存在的点（不可导点）中产生，判断需结合一阶导数符号变化或二阶导数判别法。",
      tags: ["极值", "费马引理", "驻点"]
    },
    {
      id: "calc-deriv-thm-monotonicity",
      chapterId: "derivative",
      type: "theorem",
      title: "函数单调性的判别法",
      statement: "设函数 $f(x)$ 在区间 $I$ 上可导。若在 $I$ 内 $f'(x)>0$（$f'(x)<0$），则 $f(x)$ 在 $I$ 上<strong>单调增加</strong>（<strong>单调减少</strong>）；若 $f'(x)\\geqslant 0$ 且等号只在有限个点成立，$f(x)$ 仍严格单调增加。",
      explanation: "用一阶导数符号判断单调区间是研究函数性态、证明不等式的基础方法。判断单调性时要注意定义域，先求导、令导数为零或不存在的点划分区间，再逐区间判号。",
      tags: ["单调性", "导数", "判别法"]
    },
    {
      id: "calc-deriv-thm-extremum-second-derivative",
      chapterId: "derivative",
      type: "theorem",
      title: "极值的第二充分条件",
      statement: "设函数 $f(x)$ 在点 $x_0$ 处具有二阶导数，且 $f'(x_0)=0$，$f''(x_0)\\neq 0$。<ul><li>若 $f''(x_0)<0$，则 $f(x)$ 在 $x_0$ 处取得<strong>极大值</strong>；</li><li>若 $f''(x_0)>0$，则取得<strong>极小值</strong>。</li></ul>",
      explanation: "当 $f''(x_0)=0$ 时该判别法<strong>失效</strong>，需改用一阶导数在 $x_0$ 两侧的符号变化（第一充分条件）或更高阶导数判别。第一充分条件适用范围更广（不要求二阶可导），第二充分条件计算更简便。",
      tags: ["极值", "二阶导数", "判别法"]
    },
    {
      id: "calc-deriv-def-convexity",
      chapterId: "derivative",
      type: "definition",
      title: "凹凸性的定义与判别",
      statement: "设 $f(x)$ 在区间 $I$ 上连续，若对 $I$ 上任意两点 $x_1\\neq x_2$ 恒有 $f\\left(\\dfrac{x_1+x_2}{2}\\right)<\\dfrac{f(x_1)+f(x_2)}{2}$，称曲线在 $I$ 上是<strong>凹的</strong>（下凸）；不等号反向则为<strong>凸的</strong>（上凸）。若 $f(x)$ 在 $I$ 内具有二阶导数，则 $f''(x)>0$ 时曲线在 $I$ 上是凹的，$f''(x)<0$ 时是凸的。使 $f''(x)$ 变号的点 $(x_0,f(x_0))$ 称为<strong>拐点</strong>。",
      explanation: "国内教材（同济版）\"凹\"对应 $f''>0$（开口向上，如 $y=x^2$），与部分英文教材\"concave/convex\"叫法相反，需以<u>\"$f''$ 符号\"为准记忆</u>。判断拐点需验证 $f''(x_0)=0$ 且两侧异号（或 $f''$ 不存在但变号）。",
      tags: ["凹凸性", "拐点", "二阶导数"]
    },
    {
      id: "calc-deriv-prop-nth-derivative-leibniz",
      chapterId: "derivative",
      type: "property",
      title: "高阶导数的莱布尼茨公式",
      statement: "设函数 $u(x),v(x)$ 都具有 $n$ 阶导数，则 $(uv)^{(n)}=\\displaystyle\\sum_{k=0}^{n}C_n^{k}u^{(k)}v^{(n-k)}=u^{(n)}v+nu^{(n-1)}v'+\\dfrac{n(n-1)}{2!}u^{(n-2)}v''+\\cdots+uv^{(n)}$。",
      explanation: "形式类似二项式定理展开，故常称莱布尼茨公式。应用时通常<strong>选取其中一个因子（如多项式）使其高阶导数为零</strong>，从而只需展开有限项，大幅简化计算 $(uv)^{(n)}$ 的过程。",
      tags: ["高阶导数", "莱布尼茨公式", "求导"]
    },
    {
      id: "calc-deriv-thm-asymptote",
      chapterId: "derivative",
      type: "definition",
      title: "曲线的渐近线",
      statement: "<ul><li><strong>水平渐近线：</strong>若 $\\lim\\limits_{x\\to\\infty}f(x)=b$（或单侧），则 $y=b$ 为水平渐近线。</li><li><strong>铅直渐近线：</strong>若 $\\lim\\limits_{x\\to x_0}f(x)=\\infty$（或单侧），则 $x=x_0$ 为铅直渐近线。</li><li><strong>斜渐近线：</strong>若 $\\lim\\limits_{x\\to\\infty}\\dfrac{f(x)}{x}=a\\neq 0$ 且 $\\lim\\limits_{x\\to\\infty}[f(x)-ax]=b$ 都存在，则 $y=ax+b$ 为斜渐近线。</li></ul>",
      explanation: "求水平/斜渐近线一般在 $x\\to+\\infty$ 与 $x\\to-\\infty$ <strong>分别讨论</strong>，铅直渐近线一般在无定义点、分母为零点处考察。这是描绘函数图形、研究函数在无穷远处性态的重要工具。",
      diagram: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="160" x2="300" y2="160" stroke="currentColor" stroke-width="1.5"/>
        <line x1="40" y1="170" x2="40" y2="20" stroke="currentColor" stroke-width="1.5"/>
        <line x1="40" y1="60" x2="300" y2="60" stroke="#3b82f6" stroke-width="1.3" stroke-dasharray="4 3"/>
        <line x1="220" y1="20" x2="220" y2="170" stroke="#3b82f6" stroke-width="1.3" stroke-dasharray="4 3"/>
        <path d="M50,150 C100,155 150,140 190,90 C205,68 208,60 210,55" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.7"/>
        <path d="M232,170 C238,120 245,80 260,68 C275,63 285,61 295,60.3" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.7"/>
        <text x="242" y="55" font-size="11" fill="#3b82f6">y=b</text>
        <text x="224" y="30" font-size="11" fill="#3b82f6">x=x₀</text>
      </svg>`,
      diagramCaption: "曲线在 x→x₀ 附近趋向无穷（铅直渐近线），在 x→∞ 时趋向水平线 y=b（水平渐近线）",
      tags: ["渐近线", "函数图形", "极限"]
    },
    {
      id: "calc-deriv-prop-basic-derivatives",
      chapterId: "derivative",
      type: "property",
      title: "基本初等函数导数公式",
      statement: "$(x^{\\mu})'=\\mu x^{\\mu-1}$；$(\\sin x)'=\\cos x$，$(\\cos x)'=-\\sin x$；$(\\tan x)'=\\sec^2 x$，$(\\cot x)'=-\\csc^2 x$；$(e^x)'=e^x$，$(a^x)'=a^x\\ln a$；$(\\ln x)'=\\dfrac{1}{x}$，$(\\log_a x)'=\\dfrac{1}{x\\ln a}$；$(\\arcsin x)'=\\dfrac{1}{\\sqrt{1-x^2}}$，$(\\arctan x)'=\\dfrac{1}{1+x^2}$。",
      explanation: "这是求导运算的基础，<strong>必须熟记</strong>。注意 $(\\arccos x)'=-\\dfrac{1}{\\sqrt{1-x^2}}$，$(\\text{arccot}\\,x)'=-\\dfrac{1}{1+x^2}$，恰与对应余函数相差负号；反三角函数导数<strong>不含反三角符号本身</strong>，是重要特征。",
      tags: ["导数", "基本公式", "求导"]
    },
    {
      id: "calc-deriv-def-curvature",
      chapterId: "derivative",
      type: "definition",
      title: "曲率的定义与计算公式",
      statement: "设曲线 $y=f(x)$ 二阶可导，<strong>曲率</strong>定义为弧长变化时切线转角的变化率 $K=\\left|\\dfrac{\\mathrm{d}\\alpha}{\\mathrm{d}s}\\right|$，计算公式为 $K=\\dfrac{|y''|}{(1+y'^2)^{3/2}}$。<strong>曲率半径</strong> $R=\\dfrac{1}{K}$（$K\\neq 0$）。",
      explanation: "曲率反映曲线弯曲的程度，直线曲率恒为零。参数方程 $x=\\varphi(t),y=\\psi(t)$ 下曲率公式为 $K=\\dfrac{|\\varphi'\\psi''-\\psi'\\varphi''|}{(\\varphi'^2+\\psi'^2)^{3/2}}$，是导数在几何中的典型应用（数一/数二部分省份考纲要求）。",
      tags: ["曲率", "曲率半径", "几何应用"]
    },
    {
      id: "calc-int-def-antiderivative",
      chapterId: "integral",
      type: "definition",
      title: "原函数与不定积分的定义",
      statement: "设函数 $f(x)$ 在区间 $I$ 上有定义，若存在函数 $F(x)$，使得对 $I$ 内任一点都有 $F'(x)=f(x)$（或 $\\mathrm{d}F(x)=f(x)\\mathrm{d}x$），则称 $F(x)$ 为 $f(x)$ 在 $I$ 上的一个<strong>原函数</strong>。$f(x)$ 的全体原函数 $F(x)+C$（$C$ 为任意常数）称为 $f(x)$ 在 $I$ 上的<strong>不定积分</strong>，记作 $\\displaystyle\\int f(x)\\mathrm{d}x=F(x)+C$。",
      explanation: "连续函数一定存在原函数（后续由变限积分定理保证）。同一函数的任意两个原函数只相差一个常数，因此不定积分结果<u>必须加 \"$+C$\"</u>，这是最容易被忽略的采分点。",
      tags: ["不定积分", "原函数", "定义"]
    },
    {
      id: "calc-int-def-definite-integral",
      chapterId: "integral",
      type: "definition",
      title: "定积分的定义（黎曼和的极限）",
      statement: "设函数 $f(x)$ 在 $[a,b]$ 上有界，将 $[a,b]$ 任意分成 $n$ 个小区间，第 $i$ 个小区间长度为 $\\Delta x_i$，在其上任取一点 $\\xi_i$，作和式 $\\displaystyle\\sum_{i=1}^{n}f(\\xi_i)\\Delta x_i$，记 $\\lambda=\\max\\{\\Delta x_i\\}$。若 $\\lim\\limits_{\\lambda\\to 0}\\displaystyle\\sum_{i=1}^{n}f(\\xi_i)\\Delta x_i$ 存在且与区间分法、$\\xi_i$ 取法无关，则称此极限为 $f(x)$ 在 $[a,b]$ 上的定积分，记作 $\\displaystyle\\int_a^b f(x)\\mathrm{d}x$。",
      explanation: "定积分本质是<strong>\"分割、近似、求和、取极限\"</strong>（黎曼和）的极限，几何意义是曲边梯形的面积（$f(x)\\geqslant 0$ 时）。这是把实际问题（面积、弧长、功等）转化为定积分的理论依据，也是常考的\"和式极限化定积分\"题型的基础。",
      diagram: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="160" x2="300" y2="160" stroke="currentColor" stroke-width="1.5"/>
        <line x1="20" y1="160" x2="20" y2="20" stroke="currentColor" stroke-width="1.5"/>
        <path d="M60,140 Q160,20 260,90 L260,160 L60,160 Z" fill="#3b82f6" opacity="0.18"/>
        <path d="M60,140 Q160,20 260,90" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.7"/>
        <line x1="60" y1="160" x2="60" y2="140" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.5"/>
        <line x1="260" y1="160" x2="260" y2="90" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.5"/>
        <text x="55" y="176" font-size="11" fill="currentColor">a</text>
        <text x="256" y="176" font-size="11" fill="currentColor">b</text>
        <text x="130" y="115" font-size="12" fill="#3b82f6">∫ₐᵇ f(x)dx</text>
      </svg>`,
      diagramCaption: "f(x)⩾0 时，定积分的几何意义就是曲边梯形（阴影部分）的面积",
      tags: ["定积分", "定义", "黎曼和"]
    },
    {
      id: "calc-int-thm-newton-leibniz",
      chapterId: "integral",
      type: "theorem",
      title: "牛顿-莱布尼茨公式",
      statement: "设函数 $f(x)$ 在 $[a,b]$ 上连续，$F(x)$ 是 $f(x)$ 在 $[a,b]$ 上的一个原函数，则 $\\displaystyle\\int_a^b f(x)\\mathrm{d}x=F(b)-F(a)=F(x)\\Big|_a^b$。",
      explanation: "该公式建立了<strong>定积分与不定积分（原函数）之间的桥梁</strong>，把定积分的计算转化为求原函数再代入端点，是微积分基本定理的核心内容，也是定积分计算的根本方法。",
      tags: ["定积分", "牛顿-莱布尼茨公式", "微积分基本定理"]
    },
    {
      id: "calc-int-thm-variable-limit",
      chapterId: "integral",
      type: "theorem",
      title: "变上限积分函数的求导定理",
      statement: "设函数 $f(x)$ 在 $[a,b]$ 上连续，则变上限积分函数 $\\Phi(x)=\\displaystyle\\int_a^x f(t)\\mathrm{d}t$ 在 $[a,b]$ 上可导，且 $\\Phi'(x)=f(x)$。更一般地，若上下限为可导函数 $\\varphi(x),\\psi(x)$，则 $\\dfrac{\\mathrm{d}}{\\mathrm{d}x}\\displaystyle\\int_{\\psi(x)}^{\\varphi(x)}f(t)\\mathrm{d}t=f(\\varphi(x))\\varphi'(x)-f(\\psi(x))\\psi'(x)$。",
      explanation: "这条定理说明<strong>连续函数必存在原函数</strong>（$\\Phi(x)$ 即是一个），是微积分基本定理的另一半。变限积分求导是高频考点，本质是链式法则的应用，务必注意<u>上下限同时变化时要分别求导再相减</u>。",
      tags: ["变限积分", "求导", "微积分基本定理"]
    },
    {
      id: "calc-int-thm-mean-value",
      chapterId: "integral",
      type: "theorem",
      title: "积分中值定理",
      statement: "若函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，则至少存在一点 $\\xi\\in[a,b]$，使得 $\\displaystyle\\int_a^b f(x)\\mathrm{d}x=f(\\xi)(b-a)$。",
      explanation: "<strong>几何意义</strong>：曲边梯形的面积等于以区间长度为底、以 $f(\\xi)$ 为高的矩形面积。称 $\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\mathrm{d}x$ 为 $f(x)$ 在 $[a,b]$ 上的<strong>平均值</strong>。是证明含定积分等式命题的常用工具，常与介值定理、罗尔定理配合使用。",
      tags: ["定积分", "积分中值定理", "中值定理"]
    },
    {
      id: "calc-int-prop-linearity-additivity",
      chapterId: "integral",
      type: "property",
      title: "定积分的线性性与区间可加性",
      statement: "<ul><li><strong>线性性：</strong>$\\displaystyle\\int_a^b [k_1f(x)+k_2g(x)]\\mathrm{d}x=k_1\\displaystyle\\int_a^b f(x)\\mathrm{d}x+k_2\\displaystyle\\int_a^b g(x)\\mathrm{d}x$。</li><li><strong>区间可加性：</strong>对任意常数 $c$，$\\displaystyle\\int_a^b f(x)\\mathrm{d}x=\\displaystyle\\int_a^c f(x)\\mathrm{d}x+\\displaystyle\\int_c^b f(x)\\mathrm{d}x$（不要求 $c$ 在 $[a,b]$ 之间也成立）。</li></ul>",
      explanation: "此外还规定 $\\int_a^a f(x)\\mathrm{d}x=0$，$\\int_a^b f(x)\\mathrm{d}x=-\\int_b^a f(x)\\mathrm{d}x$。这些是定积分运算最基础的性质，分段函数、含绝对值函数积分<strong>必须用区间可加性拆开处理</strong>。",
      tags: ["定积分", "线性性", "可加性"]
    },
    {
      id: "calc-int-prop-comparison",
      chapterId: "integral",
      type: "property",
      title: "定积分的比较性质与估值性质",
      statement: "设 $f(x)\\leqslant g(x)$ 在 $[a,b]$ 上恒成立，则 $\\displaystyle\\int_a^b f(x)\\mathrm{d}x\\leqslant\\displaystyle\\int_a^b g(x)\\mathrm{d}x$（$a<b$）；又 $\\left|\\displaystyle\\int_a^b f(x)\\mathrm{d}x\\right|\\leqslant\\displaystyle\\int_a^b |f(x)|\\mathrm{d}x$；若 $m\\leqslant f(x)\\leqslant M$，则 $m(b-a)\\leqslant\\displaystyle\\int_a^b f(x)\\mathrm{d}x\\leqslant M(b-a)$（估值定理）。",
      explanation: "比较性质<strong>要求 $a<b$</strong>，否则不等号可能反向，做题时需先确认积分上下限大小。估值定理常用于证明积分不等式或估计积分值的范围，是构造辅助函数法之外的重要证明手段。",
      tags: ["定积分", "比较性质", "估值定理"]
    },
    {
      id: "calc-int-prop-parity-periodicity",
      chapterId: "integral",
      type: "property",
      title: "对称区间上定积分的奇偶性与周期性",
      statement: "设 $f(x)$ 在 $[-a,a]$ 上连续：<ul><li>若 $f(x)$ 为<strong>奇函数</strong>，则 $\\displaystyle\\int_{-a}^{a}f(x)\\mathrm{d}x=0$；</li><li>若为<strong>偶函数</strong>，则 $\\displaystyle\\int_{-a}^{a}f(x)\\mathrm{d}x=2\\displaystyle\\int_0^{a}f(x)\\mathrm{d}x$。</li></ul>若 $f(x)$ 是以 $T$ 为<strong>周期</strong>的连续函数，则 $\\displaystyle\\int_a^{a+T}f(x)\\mathrm{d}x=\\displaystyle\\int_0^T f(x)\\mathrm{d}x$（与 $a$ 无关）。",
      explanation: "这是简化定积分计算<strong>最常用的技巧之一</strong>，做题时要养成先观察被积函数奇偶性/周期性、积分区间是否对称的习惯，能大幅减少计算量，尤其在含三角函数、绝对值的积分中效果显著。",
      tags: ["定积分", "奇偶性", "周期性"]
    },
    {
      id: "calc-int-prop-integration-by-parts",
      chapterId: "integral",
      type: "property",
      title: "分部积分法",
      statement: "<strong>不定积分形式：</strong>$\\displaystyle\\int u\\,\\mathrm{d}v=uv-\\displaystyle\\int v\\,\\mathrm{d}u$；<strong>定积分形式：</strong>$\\displaystyle\\int_a^b u\\,\\mathrm{d}v=[uv]_a^b-\\displaystyle\\int_a^b v\\,\\mathrm{d}u$。",
      explanation: "选取 $u,v$ 的口诀<strong>\"反对幂三指\"</strong>（反三角、对数、幂函数、三角函数、指数函数）：排序靠前的优先选作 $u$。适用于被积函数是两类不同函数乘积的情形，如 $\\int x^n e^x\\mathrm{d}x$、$\\int x\\ln x\\,\\mathrm{d}x$、$\\int e^x\\sin x\\,\\mathrm{d}x$ 等。",
      tags: ["不定积分", "定积分", "分部积分法"]
    },
    {
      id: "calc-int-prop-substitution",
      chapterId: "integral",
      type: "property",
      title: "换元积分法",
      statement: "<ul><li><strong>第一类换元法（凑微分）：</strong>$\\displaystyle\\int f(\\varphi(x))\\varphi'(x)\\mathrm{d}x=\\displaystyle\\int f(u)\\mathrm{d}u\\Big|_{u=\\varphi(x)}$。</li><li><strong>第二类换元法：</strong>令 $x=\\varphi(t)$（$\\varphi$ 单调可导且 $\\varphi'(t)\\neq 0$），则 $\\displaystyle\\int f(x)\\mathrm{d}x=\\displaystyle\\int f(\\varphi(t))\\varphi'(t)\\mathrm{d}t$，求出后代回 $t=\\varphi^{-1}(x)$。</li></ul>定积分换元时上下限要同步换成新变量对应的值（<strong>\"换元必换限\"</strong>），最终不必代回原变量。",
      explanation: "第一类换元（凑微分）用于识别复合函数结构；第二类换元常用于消去根号，如三角代换（$\\sqrt{a^2-x^2}$ 令 $x=a\\sin t$）、根式代换等。定积分换元时<u>忘记同步换限是最常见的失分点</u>。",
      tags: ["不定积分", "定积分", "换元积分法"]
    },
    {
      id: "calc-int-prop-rational-function",
      chapterId: "integral",
      type: "property",
      title: "有理函数积分法（部分分式法）",
      statement: "有理真分式 $\\dfrac{P(x)}{Q(x)}$（分子次数低于分母次数）可分解为若干个形如 $\\dfrac{A}{(x-a)^k}$ 与 $\\dfrac{Mx+N}{(x^2+px+q)^k}$（$p^2-4q<0$）的部分分式之和，再逐项积分；若分子次数不低于分母次数，需先做多项式除法化为多项式加真分式。",
      explanation: "任何有理函数的不定积分都可积出初等函数，这是有理函数积分<strong>\"总能积出来\"</strong>的理论依据。三角函数有理式积分常通过<strong>万能代换</strong> $t=\\tan\\frac{x}{2}$ 化为有理函数积分。",
      tags: ["不定积分", "有理函数", "部分分式"]
    },
    {
      id: "calc-int-def-improper-infinite",
      chapterId: "integral",
      type: "definition",
      title: "无穷区间上的反常积分",
      statement: "设 $f(x)$ 在 $[a,+\\infty)$ 上连续，定义 $\\displaystyle\\int_a^{+\\infty}f(x)\\mathrm{d}x=\\lim\\limits_{b\\to+\\infty}\\displaystyle\\int_a^{b}f(x)\\mathrm{d}x$。若右边极限存在，称反常积分收敛，否则称发散。类似地可定义 $\\displaystyle\\int_{-\\infty}^{b}f(x)\\mathrm{d}x$ 及 $\\displaystyle\\int_{-\\infty}^{+\\infty}f(x)\\mathrm{d}x$（后者需拆成两个都收敛才收敛）。",
      explanation: "反常积分本质是用普通定积分取极限来定义，判断收敛性时先看是否能求出原函数直接取极限，不能求出时用<strong>比较判别法</strong>（与 $\\int_1^{+\\infty}\\frac{1}{x^p}\\mathrm{d}x$ 比较，$p>1$ 收敛，$p\\leqslant 1$ 发散）。",
      tags: ["反常积分", "无穷区间", "收敛性"]
    },
    {
      id: "calc-int-def-improper-unbounded",
      chapterId: "integral",
      type: "definition",
      title: "无界函数的反常积分（瑕积分）",
      statement: "设 $f(x)$ 在 $(a,b]$ 上连续，$\\lim\\limits_{x\\to a^+}f(x)=\\infty$（$a$ 为<strong>瑕点</strong>），定义 $\\displaystyle\\int_a^{b}f(x)\\mathrm{d}x=\\lim\\limits_{\\varepsilon\\to 0^+}\\displaystyle\\int_{a+\\varepsilon}^{b}f(x)\\mathrm{d}x$，极限存在则称该反常积分收敛，否则发散。瑕点在其他位置（$b$ 或区间内部）时类似处理。",
      explanation: "常见判别参照：$\\int_a^b \\frac{1}{(x-a)^p}\\mathrm{d}x$（$a$ 为瑕点）当 $p<1$ 收敛，$p\\geqslant 1$ 发散。做题时首先要能<strong>识别瑕点</strong>（被积函数无界的点），<u>瑕点可能隐藏在区间内部而非仅在端点</u>。",
      tags: ["反常积分", "瑕积分", "无界函数"]
    },
    {
      id: "calc-int-prop-arc-length",
      chapterId: "integral",
      type: "property",
      title: "定积分的几何应用：平面图形面积与旋转体体积",
      statement: "<ul><li><strong>平面图形面积：</strong>由曲线 $y=f(x)$（$f(x)\\geqslant 0$）与 $x=a,x=b,y=0$ 围成的平面图形面积 $A=\\displaystyle\\int_a^b f(x)\\mathrm{d}x$。</li><li><strong>旋转体体积：</strong>绕 $x$ 轴旋转一周所得旋转体体积 $V_x=\\pi\\displaystyle\\int_a^b [f(x)]^2\\mathrm{d}x$。</li><li><strong>极坐标曲边扇形面积：</strong>用极坐标 $r=r(\\theta)$ 表示的曲边扇形面积 $A=\\dfrac{1}{2}\\displaystyle\\int_\\alpha^\\beta [r(\\theta)]^2\\mathrm{d}\\theta$。</li></ul>",
      explanation: "这是定积分<strong>\"微元法\"</strong>思想最典型的应用：先取微元 $\\mathrm{d}A$ 或 $\\mathrm{d}V$，再积分求和。绕 $y$ 轴旋转常用\"<strong>柱壳法</strong>\" $V_y=2\\pi\\displaystyle\\int_a^b x f(x)\\mathrm{d}x$（$x\\geqslant 0$）。",
      tags: ["定积分", "几何应用", "旋转体体积"]
    },
    {
      id: "calc-int-prop-arc-length-formula",
      chapterId: "integral",
      type: "property",
      title: "弧长与旋转曲面面积公式",
      statement: "<ul><li><strong>直角坐标弧长：</strong>曲线 $y=f(x)$（$a\\leqslant x\\leqslant b$）的弧长 $s=\\displaystyle\\int_a^b\\sqrt{1+[f'(x)]^2}\\,\\mathrm{d}x$。</li><li><strong>参数方程弧长：</strong>$x=\\varphi(t),y=\\psi(t)$（$\\alpha\\leqslant t\\leqslant\\beta$）的弧长 $s=\\displaystyle\\int_\\alpha^\\beta\\sqrt{[\\varphi'(t)]^2+[\\psi'(t)]^2}\\,\\mathrm{d}t$。</li><li><strong>旋转曲面面积：</strong>曲线 $y=f(x)\\geqslant 0$ 绕 $x$ 轴旋转所得旋转曲面的面积 $S=2\\pi\\displaystyle\\int_a^b f(x)\\sqrt{1+[f'(x)]^2}\\,\\mathrm{d}x$。</li></ul>",
      explanation: "弧长公式源于弧微分 $\\mathrm{d}s=\\sqrt{1+y'^2}\\,\\mathrm{d}x$（微元法的直接体现），是曲线积分、曲率计算共用的基本量。旋转曲面面积公式中被积函数是<strong>\"半径 $\\times$ 弧微分\"</strong>，对应侧面积微元 $2\\pi f(x)\\mathrm{d}s$。",
      tags: ["定积分", "弧长", "旋转曲面"]
    },
    {
      id: "calc-int-prop-physical-application",
      chapterId: "integral",
      type: "property",
      title: "定积分的物理应用（变力做功、液体压力）",
      statement: "变力 $F(x)$ 沿 $x$ 轴方向使物体从 $x=a$ 移动到 $x=b$ 所做的功 $W=\\displaystyle\\int_a^b F(x)\\mathrm{d}x$；深度为 $h$ 处、宽度为 $l(h)$ 的薄片所受液体压力微元 $\\mathrm{d}P=\\rho g\\,h\\,l(h)\\,\\mathrm{d}h$，总压力 $P=\\displaystyle\\int \\rho g\\,h\\,l(h)\\,\\mathrm{d}h$（$\\rho$ 为液体密度）。",
      explanation: "都是\"微元法\"的典型应用：先分析局部微元（微功、微压力），写出微元表达式，再积分求整体量。这类应用题的关键是<strong>正确建立坐标系并写出变化量关于积分变量的函数关系式</strong>。",
      tags: ["定积分", "物理应用", "微元法"]
    },
    {
      id: "calc-int-thm-wallis",
      chapterId: "integral",
      type: "theorem",
      title: "华里士（Wallis）公式（点火公式）",
      statement: "设 $I_n=\\displaystyle\\int_0^{\\pi/2}\\sin^n x\\,\\mathrm{d}x=\\displaystyle\\int_0^{\\pi/2}\\cos^n x\\,\\mathrm{d}x$，则当 $n$ 为正偶数时 $I_n=\\dfrac{(n-1)!!}{n!!}\\cdot\\dfrac{\\pi}{2}$；当 $n$ 为大于1的正奇数时 $I_n=\\dfrac{(n-1)!!}{n!!}$。",
      explanation: "俗称\"点火公式\"，用于快速计算 $[0,\\pi/2]$ 上正弦、余弦幂函数的定积分，是重要的计算捷径。注意奇数、偶数结果形式的区别：<u>偶数最后要多乘 $\\frac{\\pi}{2}$</u>。",
      tags: ["定积分", "华里士公式", "点火公式"]
    },
    {
      id: "calc-vec-def-dot-product",
      chapterId: "vector-geometry",
      type: "definition",
      title: "向量的数量积（点积）",
      statement: "两向量 $\\vec{a},\\vec{b}$ 的数量积定义为 $\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta$（$\\theta$ 为两向量夹角）。坐标形式：若 $\\vec{a}=(a_1,a_2,a_3)$，$\\vec{b}=(b_1,b_2,b_3)$，则 $\\vec{a}\\cdot\\vec{b}=a_1b_1+a_2b_2+a_3b_3$。",
      explanation: "数量积结果是一个<strong>标量</strong>。$\\vec{a}\\perp\\vec{b}\\Leftrightarrow \\vec{a}\\cdot\\vec{b}=0$（<strong>非零向量</strong>）。可用于求两向量夹角 $\\cos\\theta=\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$，以及向量在另一向量方向上的投影 $\\text{Prj}_{\\vec{b}}\\vec{a}=\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}$。",
      tags: ["向量", "数量积", "点积"]
    },
    {
      id: "calc-vec-def-cross-product",
      chapterId: "vector-geometry",
      type: "definition",
      title: "向量的向量积（叉积）",
      statement: "两向量 $\\vec{a},\\vec{b}$ 的向量积 $\\vec{a}\\times\\vec{b}$ 是一个向量，其模 $|\\vec{a}\\times\\vec{b}|=|\\vec{a}||\\vec{b}|\\sin\\theta$，方向垂直于 $\\vec{a},\\vec{b}$ 所在平面且符合右手法则。坐标形式：$\\vec{a}\\times\\vec{b}=\\begin{vmatrix}\\vec{i}&\\vec{j}&\\vec{k}\\\\a_1&a_2&a_3\\\\b_1&b_2&b_3\\end{vmatrix}$。",
      explanation: "向量积结果是<strong>向量</strong>，且 $\\vec{a}\\times\\vec{b}=-\\vec{b}\\times\\vec{a}$（<strong>不满足交换律</strong>）。$\\vec{a}\\parallel\\vec{b}\\Leftrightarrow\\vec{a}\\times\\vec{b}=\\vec{0}$（非零向量）。$|\\vec{a}\\times\\vec{b}|$ 的几何意义是以 $\\vec{a},\\vec{b}$ 为邻边的<strong>平行四边形面积</strong>。",
      tags: ["向量", "向量积", "叉积"]
    },
    {
      id: "calc-vec-def-scalar-triple-product",
      chapterId: "vector-geometry",
      type: "definition",
      title: "向量的混合积",
      statement: "三个向量 $\\vec{a},\\vec{b},\\vec{c}$ 的混合积定义为 $[\\vec{a}\\,\\vec{b}\\,\\vec{c}]=(\\vec{a}\\times\\vec{b})\\cdot\\vec{c}$，坐标形式为 $[\\vec{a}\\,\\vec{b}\\,\\vec{c}]=\\begin{vmatrix}a_1&a_2&a_3\\\\b_1&b_2&b_3\\\\c_1&c_2&c_3\\end{vmatrix}$。",
      explanation: "混合积的绝对值 $|[\\vec{a}\\,\\vec{b}\\,\\vec{c}]|$ 等于以 $\\vec{a},\\vec{b},\\vec{c}$ 为棱的<strong>平行六面体的体积</strong>。$\\vec{a},\\vec{b},\\vec{c}$ <strong>共面</strong> $\\Leftrightarrow [\\vec{a}\\,\\vec{b}\\,\\vec{c}]=0$，可用于判断三向量是否共面/三点是否共线等问题。",
      tags: ["向量", "混合积", "共面"]
    },
    {
      id: "calc-vec-prop-plane-equation",
      chapterId: "vector-geometry",
      type: "property",
      title: "平面方程",
      statement: "过点 $M_0(x_0,y_0,z_0)$、以 $\\vec{n}=(A,B,C)$ 为<strong>法向量</strong>的平面的<strong>点法式方程</strong>为 $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$，<strong>一般式</strong>为 $Ax+By+Cz+D=0$。<strong>截距式</strong>（在三轴截距分别为 $a,b,c$）：$\\dfrac{x}{a}+\\dfrac{y}{b}+\\dfrac{z}{c}=1$。",
      explanation: "法向量 $\\vec{n}=(A,B,C)$ 是平面方程中<u>最核心的量</u>，一般式方程中 $x,y,z$ 的系数即为法向量的坐标。求平面方程的关键往往是先求出法向量（可用向量积求两个已知方向向量的公垂方向）。",
      tags: ["平面方程", "法向量", "解析几何"]
    },
    {
      id: "calc-vec-prop-line-equation",
      chapterId: "vector-geometry",
      type: "property",
      title: "空间直线方程",
      statement: "过点 $M_0(x_0,y_0,z_0)$、<strong>方向向量</strong>为 $\\vec{s}=(l,m,n)$ 的直线的<strong>对称式（点向式）</strong>方程为 $\\dfrac{x-x_0}{l}=\\dfrac{y-y_0}{m}=\\dfrac{z-z_0}{n}$；<strong>参数式</strong>方程为 $x=x_0+lt,\\ y=y_0+mt,\\ z=z_0+nt$；<strong>一般式</strong>为两平面的交线 $\\begin{cases}A_1x+B_1y+C_1z+D_1=0\\\\A_2x+B_2y+C_2z+D_2=0\\end{cases}$。",
      explanation: "方向向量 $\\vec{s}=(l,m,n)$ 是直线方程的核心，由一般式化为点向式时，方向向量可取两平面法向量的向量积 <u>$\\vec{s}=\\vec{n_1}\\times\\vec{n_2}$</u>。这是空间直线问题中最常用的转化技巧。",
      tags: ["直线方程", "方向向量", "解析几何"]
    },
    {
      id: "calc-vec-prop-line-plane-relation",
      chapterId: "vector-geometry",
      type: "property",
      title: "平面与直线的位置关系判定",
      statement: "设平面法向量为 $\\vec{n}$，直线方向向量为 $\\vec{s}$。<ul><li><strong>两平面：</strong>$\\vec{n_1}\\parallel\\vec{n_2}\\Leftrightarrow$ 两平面平行；$\\vec{n_1}\\cdot\\vec{n_2}=0\\Leftrightarrow$ 两平面垂直。</li><li><strong>两直线：</strong>$\\vec{s_1}\\parallel\\vec{s_2}\\Leftrightarrow$ 两直线平行；$\\vec{s_1}\\cdot\\vec{s_2}=0\\Leftrightarrow$ 两直线垂直。</li><li><strong>直线与平面：</strong>$\\vec{s}\\parallel\\vec{n}\\Leftrightarrow$ 直线垂直于平面；$\\vec{s}\\cdot\\vec{n}=0\\Leftrightarrow$ 直线平行于平面（或直线在平面内）。</li></ul>",
      explanation: "核心是把\"面面/线线/线面\"的位置关系转化为对应法向量/方向向量之间的<strong>平行或垂直关系</strong>，再用坐标是否成比例（平行）或数量积是否为零（垂直）判定，是解析几何计算题的基本套路。",
      tags: ["平面", "直线", "位置关系"]
    },
    {
      id: "calc-vec-prop-distance-point-plane",
      chapterId: "vector-geometry",
      type: "property",
      title: "点到平面的距离公式",
      statement: "点 $M_0(x_0,y_0,z_0)$ 到平面 $Ax+By+Cz+D=0$ 的距离为 $d=\\dfrac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$。",
      explanation: "该公式是二维中点到直线距离公式在三维空间中的自然推广，<strong>分子</strong>为将点坐标代入平面方程左边取绝对值，<strong>分母</strong>为法向量的模。是求点面距离、两平行平面间距离（转化为点到面距离）的标准公式。",
      tags: ["距离公式", "点到平面", "解析几何"]
    },
    {
      id: "calc-vec-def-quadric-surfaces",
      chapterId: "vector-geometry",
      type: "definition",
      title: "常见二次曲面方程",
      statement: "<ul><li><strong>球面：</strong>$(x-x_0)^2+(y-y_0)^2+(z-z_0)^2=R^2$</li><li><strong>椭球面：</strong>$\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}+\\dfrac{z^2}{c^2}=1$</li><li><strong>椭圆抛物面：</strong>$z=\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}$</li><li><strong>单叶双曲面：</strong>$\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}-\\dfrac{z^2}{c^2}=1$</li><li><strong>双叶双曲面：</strong>$\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}-\\dfrac{z^2}{c^2}=-1$</li><li><strong>圆锥面：</strong>$z^2=a^2(x^2+y^2)$</li></ul>",
      explanation: "判断二次曲面类型的常用方法是<strong>\"截痕法\"</strong>：用坐标面或平行于坐标面的平面截曲面，观察截线形状（椭圆、双曲线、抛物线）。重积分、曲面积分中确定积分区域/曲面时需要熟练识别这些标准曲面。",
      tags: ["二次曲面", "空间曲面", "解析几何"]
    },
    {
      id: "calc-vec-def-cylinder-surface",
      chapterId: "vector-geometry",
      type: "definition",
      title: "柱面与旋转曲面方程",
      statement: "只含 $x,y$ 而缺 $z$ 的方程 $F(x,y)=0$ 在空间中表示母线平行于 $z$ 轴的柱面（同理缺 $x$、缺 $y$ 类推）。曲线 $C:\\begin{cases}f(y,z)=0\\\\x=0\\end{cases}$ 绕 $z$ 轴旋转一周所得旋转曲面方程为 $f(\\pm\\sqrt{x^2+y^2},z)=0$（将 $y$ 替换为 $\\pm\\sqrt{x^2+y^2}$，保留 $z$）。",
      explanation: "判断柱面的关键：<strong>方程中缺少的变量对应母线方向</strong>。求旋转曲面方程的口诀\"<strong>绕谁谁不变，另一变量配方开根号代入</strong>\"。这是空间曲线与曲面互化、确定重积分/曲面积分区域边界的基础工具。",
      tags: ["柱面", "旋转曲面", "空间曲线"]
    },
    {
      id: "calc-vec-prop-vector-magnitude-direction",
      chapterId: "vector-geometry",
      type: "property",
      title: "向量的模、方向余弦与投影",
      statement: "向量 $\\vec{a}=(a_1,a_2,a_3)$ 的模 $|\\vec{a}|=\\sqrt{a_1^2+a_2^2+a_3^2}$；方向余弦 $\\cos\\alpha=\\dfrac{a_1}{|\\vec{a}|},\\cos\\beta=\\dfrac{a_2}{|\\vec{a}|},\\cos\\gamma=\\dfrac{a_3}{|\\vec{a}|}$，满足 $\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma=1$；与 $\\vec{a}$ 同方向的单位向量 $\\vec{a}^0=\\dfrac{\\vec{a}}{|\\vec{a}|}$。",
      explanation: "方向余弦本质就是单位向量的坐标分量，<u>三个方向余弦的平方和恒为 1</u>，可用于检验计算结果。这是空间向量方向描述最基本的量化工具。",
      tags: ["向量", "方向余弦", "单位向量"]
    },
    {
      id: "calc-vec-prop-angle-two-planes",
      chapterId: "vector-geometry",
      type: "property",
      title: "两平面夹角与直线与平面夹角公式",
      statement: "两平面法向量分别为 $\\vec{n_1},\\vec{n_2}$，夹角 $\\theta$ 满足 $\\cos\\theta=\\dfrac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}||\\vec{n_2}|}$；直线方向向量 $\\vec{s}$ 与平面法向量 $\\vec{n}$ 的夹角为 $\\varphi$（直线与平面夹角，规定 $0\\leqslant\\varphi\\leqslant\\frac{\\pi}{2}$），满足 $\\sin\\varphi=\\dfrac{|\\vec{s}\\cdot\\vec{n}|}{|\\vec{s}||\\vec{n}|}$。",
      explanation: "两平面夹角公式用<strong>余弦</strong>、线面夹角公式用<strong>正弦</strong>，是因为线面夹角定义为直线与其在平面上投影的夹角（与方向向量、法向量夹角互余），做题时要分清用 $\\cos$ 还是 $\\sin$。公式中都取绝对值以保证夹角落在 $[0,\\pi/2]$。",
      tags: ["夹角公式", "平面", "直线"]
    },
    {
      id: "calc-vec-prop-distance-skew-lines",
      chapterId: "vector-geometry",
      type: "property",
      title: "两异面直线间的距离",
      statement: "设两条异面直线的方向向量分别为 $\\vec{s_1},\\vec{s_2}$，在两直线上各取一点 $M_1,M_2$，记 $\\vec{M_1M_2}$，则两异面直线间的距离为 $d=\\dfrac{|[\\vec{M_1M_2}\\,\\vec{s_1}\\,\\vec{s_2}]|}{|\\vec{s_1}\\times\\vec{s_2}|}$（分子为混合积绝对值，分母为向量积的模）。",
      explanation: "公式的推导思路：$|\\vec{s_1}\\times\\vec{s_2}|$ 为以两方向向量为边的平行四边形面积，混合积的绝对值为以 $\\vec{M_1M_2},\\vec{s_1},\\vec{s_2}$ 为棱的平行六面体体积，<u>体积除以底面积即为高</u>（也就是两异面直线间的距离）。",
      tags: ["异面直线", "距离公式", "混合积"]
    },
    {
      id: "calc-vec-def-cylindrical-spherical",
      chapterId: "vector-geometry",
      type: "definition",
      title: "柱面坐标与球面坐标",
      statement: "<ul><li><strong>柱面坐标</strong> $(\\rho,\\theta,z)$ 与直角坐标的关系：$x=\\rho\\cos\\theta,\\ y=\\rho\\sin\\theta,\\ z=z$（$\\rho\\geqslant 0,0\\leqslant\\theta<2\\pi$）。</li><li><strong>球面坐标</strong> $(r,\\varphi,\\theta)$ 与直角坐标的关系：$x=r\\sin\\varphi\\cos\\theta,\\ y=r\\sin\\varphi\\sin\\theta,\\ z=r\\cos\\varphi$（$r\\geqslant 0,0\\leqslant\\varphi\\leqslant\\pi,0\\leqslant\\theta<2\\pi$）。</li></ul>",
      explanation: "柱面坐标是极坐标加上 $z$ 轴，适合处理含 $x^2+y^2$ 结构（圆柱、旋转曲面）的三重积分；球面坐标中 $\\varphi$ 是与正 $z$ 轴的夹角、$\\theta$ 是方位角，适合处理含 $x^2+y^2+z^2$（球体、球面）结构的三重积分，是三重积分换元最重要的<strong>两套坐标系</strong>。",
      tags: ["柱面坐标", "球面坐标", "坐标系"]
    },
    {
      id: "calc-mv-def-partial-derivative",
      chapterId: "multivar-derivative",
      type: "definition",
      title: "偏导数的定义",
      statement: "设函数 $z=f(x,y)$ 在点 $(x_0,y_0)$ 的某邻域内有定义，若极限 $\\lim\\limits_{\\Delta x\\to 0}\\dfrac{f(x_0+\\Delta x,y_0)-f(x_0,y_0)}{\\Delta x}$ 存在，则称此极限为 $f(x,y)$ 在点 $(x_0,y_0)$ 处对 $x$ 的<strong>偏导数</strong>，记作 $f_x(x_0,y_0)$ 或 $\\dfrac{\\partial z}{\\partial x}\\Big|_{(x_0,y_0)}$。类似定义对 $y$ 的偏导数 $f_y(x_0,y_0)$。",
      explanation: "求偏导数时把其余自变量看作<strong>常数</strong>，用一元函数求导法则逐个变量求导即可。<u>偏导数存在只反映沿坐标轴方向的变化率，不能推出函数连续</u>（这是多元函数与一元函数的重要区别）。",
      tags: ["偏导数", "多元函数", "定义"]
    },
    {
      id: "calc-mv-def-differentiability",
      chapterId: "multivar-derivative",
      type: "definition",
      title: "多元函数可微的定义",
      statement: "设函数 $z=f(x,y)$ 在点 $(x_0,y_0)$ 的某邻域内有定义，若全增量 $\\Delta z=f(x_0+\\Delta x,y_0+\\Delta y)-f(x_0,y_0)$ 可表示为 $\\Delta z=A\\Delta x+B\\Delta y+o(\\rho)$（$\\rho=\\sqrt{(\\Delta x)^2+(\\Delta y)^2}\\to 0$），其中 $A,B$ 与 $\\Delta x,\\Delta y$ 无关，则称 $f(x,y)$ 在 $(x_0,y_0)$ 处可微，全微分 $\\mathrm{d}z=A\\Delta x+B\\Delta y$，可证明 $A=f_x(x_0,y_0)$，$B=f_y(x_0,y_0)$，即 $\\mathrm{d}z=f_x\\mathrm{d}x+f_y\\mathrm{d}y$。",
      explanation: "多元函数<strong>\"可微\"比\"偏导数存在\"更强</strong>（与一元函数不同）：可微 $\\Rightarrow$ 偏导数存在且连续于该点，但偏导数存在不能推出可微，甚至不能推出连续。这是多元微分学中最容易考查概念辨析的地方。",
      tags: ["全微分", "可微", "多元函数"]
    },
    {
      id: "calc-mv-thm-differentiability-relations",
      chapterId: "multivar-derivative",
      type: "theorem",
      title: "可微、偏导数存在、连续三者关系",
      statement: "<ul><li>可微 $\\Rightarrow$ 连续；</li><li>可微 $\\Rightarrow$ 偏导数存在；</li><li>偏导数连续 $\\Rightarrow$ 可微（<strong>充分条件</strong>）。</li></ul>但偏导数存在 $\\not\\Rightarrow$ 连续，偏导数存在 $\\not\\Rightarrow$ 可微，连续 $\\not\\Rightarrow$ 偏导数存在。",
      explanation: "记忆图示：\"偏导数连续\" $\\Rightarrow$ \"可微\" $\\Rightarrow$ \"连续\"且\"可微\" $\\Rightarrow$ \"偏导数存在\"，其余箭头一般不成立。经典反例 $f(x,y)=\\dfrac{xy}{x^2+y^2}$（补充 $f(0,0)=0$）在原点偏导数存在但不连续、不可微，是<u>必背反例</u>。",
      tags: ["可微", "连续", "偏导数"]
    },
    {
      id: "calc-mv-prop-chain-rule-multivar",
      chapterId: "multivar-derivative",
      type: "property",
      title: "多元复合函数求导法则（链式法则）",
      statement: "设 $z=f(u,v)$ 可微，$u=\\varphi(x,y),v=\\psi(x,y)$ 偏导数存在，则复合函数 $z=f(\\varphi(x,y),\\psi(x,y))$ 的偏导数为 $\\dfrac{\\partial z}{\\partial x}=\\dfrac{\\partial f}{\\partial u}\\dfrac{\\partial u}{\\partial x}+\\dfrac{\\partial f}{\\partial v}\\dfrac{\\partial v}{\\partial x}$，$\\dfrac{\\partial z}{\\partial y}=\\dfrac{\\partial f}{\\partial u}\\dfrac{\\partial u}{\\partial y}+\\dfrac{\\partial f}{\\partial v}\\dfrac{\\partial v}{\\partial y}$。",
      explanation: "俗称\"链式法则/树形图法则\"：画出复合关系的树形图，从因变量到自变量的每条路径上偏导数相乘，多条路径的结果相加（<strong>\"连线相乘，分线相加\"</strong>）。是多元函数求导（尤其是抽象复合函数）的核心工具。",
      tags: ["偏导数", "链式法则", "复合函数"]
    },
    {
      id: "calc-mv-def-total-differential-invariance",
      chapterId: "multivar-derivative",
      type: "property",
      title: "全微分形式不变性",
      statement: "无论 $u,v$ 是自变量还是中间变量（即另一多元函数的因变量），函数 $z=f(u,v)$ 的全微分都保持<strong>同一形式</strong>：$\\mathrm{d}z=\\dfrac{\\partial z}{\\partial u}\\mathrm{d}u+\\dfrac{\\partial z}{\\partial v}\\mathrm{d}v$。",
      explanation: "这是一元函数微分形式不变性在多元情形的推广，利用它可以不必区分中间变量与自变量，直接对复合函数整体求全微分再\"凑\"出所需偏导数，是求较复杂复合函数偏导数的高效方法。",
      tags: ["全微分", "形式不变性", "多元函数"]
    },
    {
      id: "calc-mv-prop-implicit-function-derivative",
      chapterId: "multivar-derivative",
      type: "property",
      title: "隐函数求导公式",
      statement: "<ul><li>设方程 $F(x,y)=0$ 确定隐函数 $y=y(x)$，且 $F$ 具有连续偏导数，$F_y\\neq 0$，则 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}=-\\dfrac{F_x}{F_y}$。</li><li>设方程 $F(x,y,z)=0$ 确定隐函数 $z=z(x,y)$，$F_z\\neq 0$，则 $\\dfrac{\\partial z}{\\partial x}=-\\dfrac{F_x}{F_z}$，$\\dfrac{\\partial z}{\\partial y}=-\\dfrac{F_y}{F_z}$。</li></ul>",
      explanation: "该公式由隐函数存在定理给出，本质是对 $F(x,y)=0$（或 $F(x,y,z)=0$）两边求全微分再解出所需偏导数。对于方程组确定的隐函数，需联立对各方程求微分后解线性方程组求偏导数。",
      tags: ["隐函数", "偏导数", "求导公式"]
    },
    {
      id: "calc-mv-def-directional-derivative-gradient",
      chapterId: "multivar-derivative",
      type: "definition",
      title: "方向导数与梯度",
      statement: "函数 $f(x,y)$ 在点 $(x_0,y_0)$ 沿方向 $\\vec{l}=(\\cos\\alpha,\\cos\\beta)$（单位向量）的<strong>方向导数</strong>为 $\\dfrac{\\partial f}{\\partial l}\\Big|_{(x_0,y_0)}=f_x(x_0,y_0)\\cos\\alpha+f_y(x_0,y_0)\\cos\\beta$（$f$ 在该点可微时成立）。<strong>梯度</strong>定义为向量 $\\text{grad}\\,f(x_0,y_0)=(f_x(x_0,y_0),f_y(x_0,y_0))$。",
      explanation: "方向导数等于梯度与方向单位向量的数量积：$\\dfrac{\\partial f}{\\partial l}=\\text{grad}\\,f\\cdot\\vec{l}$。<u>梯度方向是函数在该点方向导数取得最大值的方向</u>，最大值即为 $|\\text{grad}\\,f|$，梯度垂直于该点所在的等值线（面）。",
      tags: ["方向导数", "梯度", "多元函数"]
    },
    {
      id: "calc-mv-thm-extremum-necessary",
      chapterId: "multivar-derivative",
      type: "theorem",
      title: "多元函数极值的必要条件",
      statement: "设函数 $z=f(x,y)$ 在点 $(x_0,y_0)$ 处存在偏导数，且在该点取得极值，则必有 $f_x(x_0,y_0)=0$，$f_y(x_0,y_0)=0$（称 $(x_0,y_0)$ 为<strong>驻点</strong>）。",
      explanation: "与一元函数类似，这只是<strong>必要条件</strong>，驻点不一定是极值点。极值点也可能出现在偏导数不存在的点。求极值的一般步骤：先解方程组 $f_x=0,f_y=0$ 求出所有驻点，再用充分条件逐一判别。",
      tags: ["极值", "多元函数", "驻点"]
    },
    {
      id: "calc-mv-thm-extremum-sufficient",
      chapterId: "multivar-derivative",
      type: "theorem",
      title: "多元函数极值的充分条件（判别式法）",
      statement: "设 $z=f(x,y)$ 在驻点 $(x_0,y_0)$ 的某邻域内具有二阶连续偏导数，记 $A=f_{xx}(x_0,y_0)$，$B=f_{xy}(x_0,y_0)$，$C=f_{yy}(x_0,y_0)$，$D=AC-B^2$。<ul><li>$D>0$ 且 $A<0$ 时取<strong>极大值</strong>；</li><li>$D>0$ 且 $A>0$ 时取<strong>极小值</strong>；</li><li>$D<0$ 时<strong>不是极值点</strong>；</li><li>$D=0$ 时不能确定，需另行讨论。</li></ul>",
      explanation: "该判别式常记作 $D=AC-B^2$（或用 Hesse 矩阵行列式表示），是二元函数极值判别的标准方法。求条件极值（约束条件下求极值）则用<strong>拉格朗日乘数法</strong>。",
      tags: ["极值", "判别式", "二阶偏导数"]
    },
    {
      id: "calc-mv-thm-lagrange-multiplier",
      chapterId: "multivar-derivative",
      type: "theorem",
      title: "拉格朗日乘数法",
      statement: "求函数 $z=f(x,y)$ 在约束条件 $\\varphi(x,y)=0$ 下的极值，构造拉格朗日函数 $L(x,y,\\lambda)=f(x,y)+\\lambda\\varphi(x,y)$，令 $\\begin{cases}L_x=f_x+\\lambda\\varphi_x=0\\\\L_y=f_y+\\lambda\\varphi_y=0\\\\L_\\lambda=\\varphi(x,y)=0\\end{cases}$，解出的 $(x,y)$ 即为可能的条件极值点。可推广到多个自变量、多个约束条件的情形。",
      explanation: "拉格朗日乘数法是求解条件极值（约束优化）问题的<strong>通用方法</strong>，几何意义是在极值点处目标函数的梯度与约束曲线的梯度共线（即 $\\text{grad}\\,f=-\\lambda\\,\\text{grad}\\,\\varphi$）。求出驻点后<u>还需结合实际背景或比较函数值判断是最大值还是最小值</u>。",
      tags: ["条件极值", "拉格朗日乘数法", "最优化"]
    },
    {
      id: "calc-mv-prop-tangent-plane",
      chapterId: "multivar-derivative",
      type: "property",
      title: "曲面的切平面与法线方程",
      statement: "曲面 $F(x,y,z)=0$ 在点 $M_0(x_0,y_0,z_0)$ 处（$F$ 偏导数不全为零）的法向量为 $\\vec{n}=(F_x,F_y,F_z)\\Big|_{M_0}$。切平面方程：$F_x(x-x_0)+F_y(y-y_0)+F_z(z-z_0)=0$；法线方程：$\\dfrac{x-x_0}{F_x}=\\dfrac{y-y_0}{F_y}=\\dfrac{z-z_0}{F_z}$（在 $M_0$ 处取值）。若曲面为 $z=f(x,y)$，可令 $F=f(x,y)-z$ 化为上述形式。",
      explanation: "曲面在一点处的法向量就是该点处 $F$ 的梯度 $\\text{grad}\\,F$，这是梯度概念在几何中最直接的应用。求曲线在一点的切线/法平面时，若曲线是两曲面的交线，切向量可取<strong>两曲面法向量的向量积</strong>。",
      tags: ["切平面", "法线", "梯度"]
    },
    {
      id: "calc-mv-prop-basic-partial-rules",
      chapterId: "multivar-derivative",
      type: "property",
      title: "高阶偏导数与混合偏导数的可交换性",
      statement: "若函数 $z=f(x,y)$ 的两个混合偏导数 $\\dfrac{\\partial^2 z}{\\partial x\\partial y}$ 与 $\\dfrac{\\partial^2 z}{\\partial y\\partial x}$ 在区域 $D$ 内连续，则在该区域内 $\\dfrac{\\partial^2 z}{\\partial x\\partial y}=\\dfrac{\\partial^2 z}{\\partial y\\partial x}$（即求导次序可交换）。",
      explanation: "该定理保证了在通常光滑性假设下混合偏导数<strong>与求导顺序无关</strong>，考研中绝大多数函数都满足该条件，可直接认为二阶混合偏导数相等，从而简化高阶偏导数的计算。",
      tags: ["高阶偏导数", "混合偏导数", "定理"]
    },
    {
      id: "calc-mv-def-multivar-limit-continuity",
      chapterId: "multivar-derivative",
      type: "definition",
      title: "二元函数的极限与连续",
      statement: "设函数 $f(x,y)$ 在点 $P_0(x_0,y_0)$ 的某去心邻域内有定义，若存在常数 $A$，对任意 $\\varepsilon>0$，存在 $\\delta>0$，使得当点 $P(x,y)$ 满足 $0<|PP_0|<\\delta$ 时恒有 $|f(x,y)-A|<\\varepsilon$，则称 $\\lim\\limits_{(x,y)\\to(x_0,y_0)}f(x,y)=A$。若 $\\lim\\limits_{(x,y)\\to(x_0,y_0)}f(x,y)=f(x_0,y_0)$，则称 $f(x,y)$ 在 $(x_0,y_0)$ 处连续。",
      explanation: "二元函数极限要求点 $P$ <strong>以任意方式（任意路径）</strong>趋于 $P_0$ 时函数值都趋于同一个 $A$，比一元函数极限严格得多。判断极限不存在的常用方法：<u>取不同路径（如 $y=kx$、$y=kx^2$）代入若得到不同结果，则极限不存在</u>。",
      tags: ["二元函数", "极限", "连续"]
    },
    {
      id: "calc-mi-def-double-integral",
      chapterId: "multiple-integral",
      type: "definition",
      title: "二重积分的定义",
      statement: "设 $f(x,y)$ 在有界闭区域 $D$ 上有界，将 $D$ 任意分成 $n$ 个小闭区域 $\\Delta\\sigma_i$（面积记为 $\\Delta\\sigma_i$），在每个 $\\Delta\\sigma_i$ 上任取一点 $(\\xi_i,\\eta_i)$，作和式 $\\displaystyle\\sum_{i=1}^{n}f(\\xi_i,\\eta_i)\\Delta\\sigma_i$，记各小区域直径的最大值为 $\\lambda$。若 $\\lim\\limits_{\\lambda\\to 0}\\displaystyle\\sum_{i=1}^{n}f(\\xi_i,\\eta_i)\\Delta\\sigma_i$ 存在且与分法、取点无关，则称此极限为 $f(x,y)$ 在 $D$ 上的二重积分，记作 $\\displaystyle\\iint_D f(x,y)\\,\\mathrm{d}\\sigma$。",
      explanation: "二重积分是定积分\"分割-近似-求和-取极限\"思想在二维区域上的推广，<strong>几何意义</strong>是当 $f(x,y)\\geqslant 0$ 时表示以 $D$ 为底、以曲面 $z=f(x,y)$ 为顶的<strong>曲顶柱体体积</strong>。三重积分定义类似，将平面区域换成空间区域、面积元换成体积元。",
      tags: ["二重积分", "定义", "曲顶柱体"]
    },
    {
      id: "calc-mi-prop-linearity-additivity",
      chapterId: "multiple-integral",
      type: "property",
      title: "重积分的基本性质",
      statement: "<ul><li><strong>线性性：</strong>$\\displaystyle\\iint_D[k_1f+k_2g]\\,\\mathrm{d}\\sigma=k_1\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma+k_2\\displaystyle\\iint_D g\\,\\mathrm{d}\\sigma$。</li><li><strong>区域可加性：</strong>$D=D_1\\cup D_2$（无重叠部分）时 $\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma=\\displaystyle\\iint_{D_1}f\\,\\mathrm{d}\\sigma+\\displaystyle\\iint_{D_2}f\\,\\mathrm{d}\\sigma$。</li><li><strong>比较性质：</strong>$f\\leqslant g$ 于 $D$ 上时 $\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma\\leqslant\\displaystyle\\iint_D g\\,\\mathrm{d}\\sigma$；特别地 $\\displaystyle\\iint_D 1\\,\\mathrm{d}\\sigma=D$ 的面积。</li></ul>",
      explanation: "这些性质与定积分的性质完全类似，是重积分计算与估值的基础。三重积分也有完全平行的性质，如 $\\iiint_\\Omega 1\\,\\mathrm{d}v=\\Omega$ 的体积。",
      tags: ["二重积分", "三重积分", "性质"]
    },
    {
      id: "calc-mi-prop-cartesian-iterated",
      chapterId: "multiple-integral",
      type: "property",
      title: "直角坐标系下二重积分化为累次积分",
      statement: "<ul><li><strong>X-型区域：</strong>若 $D=\\{(x,y)\\mid a\\leqslant x\\leqslant b,\\varphi_1(x)\\leqslant y\\leqslant\\varphi_2(x)\\}$，则 $\\displaystyle\\iint_D f(x,y)\\,\\mathrm{d}\\sigma=\\displaystyle\\int_a^b\\mathrm{d}x\\displaystyle\\int_{\\varphi_1(x)}^{\\varphi_2(x)}f(x,y)\\,\\mathrm{d}y$。</li><li><strong>Y-型区域：</strong>若 $D=\\{(x,y)\\mid c\\leqslant y\\leqslant d,\\psi_1(y)\\leqslant x\\leqslant\\psi_2(y)\\}$，则 $\\displaystyle\\iint_D f(x,y)\\,\\mathrm{d}\\sigma=\\displaystyle\\int_c^d\\mathrm{d}y\\displaystyle\\int_{\\psi_1(y)}^{\\psi_2(y)}f(x,y)\\,\\mathrm{d}x$。</li></ul>",
      explanation: "俗称<strong>\"先内后外\"、\"穿线法\"</strong>确定积分限：固定外层变量，看穿过区域的直线与边界的交点确定内层积分限。当交换积分次序或某一次序计算困难时，改用另一种次序，是二重积分计算最核心的技巧。",
      tags: ["二重积分", "累次积分", "积分次序"]
    },
    {
      id: "calc-mi-prop-polar-coordinates",
      chapterId: "multiple-integral",
      type: "property",
      title: "极坐标系下二重积分的计算",
      statement: "在极坐标变换 $x=r\\cos\\theta,\\ y=r\\sin\\theta$ 下，$\\displaystyle\\iint_D f(x,y)\\,\\mathrm{d}\\sigma=\\displaystyle\\iint_{D'} f(r\\cos\\theta,r\\sin\\theta)\\,r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta$，若 $D=\\{(r,\\theta)\\mid \\alpha\\leqslant\\theta\\leqslant\\beta,\\ r_1(\\theta)\\leqslant r\\leqslant r_2(\\theta)\\}$，则化为累次积分 $\\displaystyle\\int_\\alpha^\\beta\\mathrm{d}\\theta\\displaystyle\\int_{r_1(\\theta)}^{r_2(\\theta)}f(r\\cos\\theta,r\\sin\\theta)\\,r\\,\\mathrm{d}r$。",
      explanation: "面积元 $\\mathrm{d}\\sigma=r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta$ 中的 <u>$r$ 极易被遗漏，是最常见的失分点</u>。当积分区域是圆域、扇形域，或被积函数含 $x^2+y^2$ 结构时，优先考虑用极坐标简化计算。",
      tags: ["二重积分", "极坐标", "面积元"]
    },
    {
      id: "calc-mi-prop-cylindrical-spherical",
      chapterId: "multiple-integral",
      type: "property",
      title: "三重积分在柱面坐标、球面坐标下的计算",
      statement: "<ul><li><strong>柱面坐标下：</strong>$\\displaystyle\\iiint_\\Omega f(x,y,z)\\,\\mathrm{d}v=\\displaystyle\\iiint_{\\Omega'} f(\\rho\\cos\\theta,\\rho\\sin\\theta,z)\\,\\rho\\,\\mathrm{d}\\rho\\,\\mathrm{d}\\theta\\,\\mathrm{d}z$。</li><li><strong>球面坐标下：</strong>$\\displaystyle\\iiint_\\Omega f(x,y,z)\\,\\mathrm{d}v=\\displaystyle\\iiint_{\\Omega'} f(r\\sin\\varphi\\cos\\theta,r\\sin\\varphi\\sin\\theta,r\\cos\\varphi)\\,r^2\\sin\\varphi\\,\\mathrm{d}r\\,\\mathrm{d}\\varphi\\,\\mathrm{d}\\theta$。</li></ul>",
      explanation: "体积元分别为柱坐标 $\\mathrm{d}v=\\rho\\,\\mathrm{d}\\rho\\,\\mathrm{d}\\theta\\,\\mathrm{d}z$、球坐标 $\\mathrm{d}v=r^2\\sin\\varphi\\,\\mathrm{d}r\\,\\mathrm{d}\\varphi\\,\\mathrm{d}\\theta$，<u>务必牢记附加的雅可比因子</u>（$\\rho$ 或 $r^2\\sin\\varphi$）。当积分区域是球体、圆柱、圆锥等旋转体，或被积函数含 $x^2+y^2+z^2$、$x^2+y^2$ 结构时，优先选用对应坐标系。",
      tags: ["三重积分", "柱面坐标", "球面坐标"]
    },
    {
      id: "calc-mi-prop-symmetry",
      chapterId: "multiple-integral",
      type: "property",
      title: "重积分的对称性技巧（奇偶对称与轮换对称）",
      statement: "<ul><li><strong>奇偶对称：</strong>若积分区域 $D$ 关于 $y$ 轴对称，被积函数 $f(x,y)$ 关于 $x$ 为奇函数时 $\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma=0$，为偶函数时等于 $2$ 倍 $x\\geqslant 0$ 部分的积分（关于 $x$ 轴对称同理）。</li><li><strong>轮换对称：</strong>若区域 $D$ 关于直线 $y=x$ 对称，则 $\\displaystyle\\iint_D f(x,y)\\,\\mathrm{d}\\sigma=\\displaystyle\\iint_D f(y,x)\\,\\mathrm{d}\\sigma$。</li></ul>三重积分有完全类似的对称性质。",
      explanation: "利用区域的对称性与被积函数的奇偶性/轮换对称性可大幅简化计算，是重积分计算中<strong>除坐标变换外最重要的技巧</strong>，做题时应养成先观察区域与被积函数对称性的习惯。",
      tags: ["重积分", "对称性", "轮换对称"]
    },
    {
      id: "calc-mi-prop-order-exchange",
      chapterId: "multiple-integral",
      type: "property",
      title: "交换二重积分的积分次序",
      statement: "将累次积分 $\\displaystyle\\int_a^b\\mathrm{d}x\\displaystyle\\int_{\\varphi_1(x)}^{\\varphi_2(x)}f(x,y)\\,\\mathrm{d}y$ 化为先对 $x$ 后对 $y$ 的累次积分时，需先根据原积分限还原出平面区域 $D$ 的图形，再按 Y-型区域重新写出 $x$ 关于 $y$ 的上下限。",
      explanation: "交换积分次序的关键步骤是<strong>\"画出区域图形\"</strong>，切忌直接在符号上颠倒积分限。常用于被积函数原次序下没有初等原函数（如 $\\int\\frac{\\sin x}{x}\\mathrm{d}x$ 型）而交换次序后可积的情形。",
      tags: ["二重积分", "积分次序", "换序"]
    },
    {
      id: "calc-mi-thm-mean-value-double",
      chapterId: "multiple-integral",
      type: "theorem",
      title: "二重积分的中值定理",
      statement: "设函数 $f(x,y)$ 在有界闭区域 $D$ 上连续，$\\sigma$ 为 $D$ 的面积，则至少存在一点 $(\\xi,\\eta)\\in D$，使得 $\\displaystyle\\iint_D f(x,y)\\,\\mathrm{d}\\sigma=f(\\xi,\\eta)\\cdot\\sigma$。",
      explanation: "是一元函数积分中值定理在二重积分上的推广，$f(\\xi,\\eta)=\\dfrac{1}{\\sigma}\\displaystyle\\iint_D f\\,\\mathrm{d}\\sigma$ 称为 $f$ 在 $D$ 上的<strong>平均值</strong>。常用于估计重积分的值域或证明含二重积分的存在性命题。",
      tags: ["二重积分", "中值定理", "平均值"]
    },
    {
      id: "calc-mi-prop-applications",
      chapterId: "multiple-integral",
      type: "property",
      title: "重积分的几何与物理应用",
      statement: "<ul><li><strong>体积：</strong>空间立体体积 $V=\\displaystyle\\iiint_\\Omega \\mathrm{d}v$。</li><li><strong>曲面面积：</strong>曲面 $z=f(x,y)$（$(x,y)\\in D$）的面积 $S=\\displaystyle\\iint_D\\sqrt{1+f_x^2+f_y^2}\\,\\mathrm{d}\\sigma$。</li><li><strong>质量与质心：</strong>平面薄片（面密度 $\\mu(x,y)$）的质量 $M=\\displaystyle\\iint_D \\mu(x,y)\\,\\mathrm{d}\\sigma$，质心坐标 $\\bar{x}=\\dfrac{1}{M}\\displaystyle\\iint_D x\\mu(x,y)\\,\\mathrm{d}\\sigma$，$\\bar{y}=\\dfrac{1}{M}\\displaystyle\\iint_D y\\mu(x,y)\\,\\mathrm{d}\\sigma$。</li></ul>",
      explanation: "都是二重（三重）积分\"微元法\"思想的直接应用：先写出微元（质量微元 $\\mathrm{d}M=\\mu\\,\\mathrm{d}\\sigma$、面积微元等），再积分求整体量。质心公式的<strong>分子分母结构（矩除以质量）</strong>也用于求转动惯量等物理量。",
      tags: ["重积分", "几何应用", "质心"]
    },
    {
      id: "calc-mi-prop-fubini-triple",
      chapterId: "multiple-integral",
      type: "property",
      title: "三重积分化为累次积分（先一后二 / 先二后一）",
      statement: "<ul><li><strong>先一后二法（投影法）：</strong>$\\displaystyle\\iiint_\\Omega f(x,y,z)\\,\\mathrm{d}v=\\displaystyle\\iint_{D_z}\\left[\\displaystyle\\int_{z_1(x,y)}^{z_2(x,y)}f(x,y,z)\\,\\mathrm{d}z\\right]\\mathrm{d}x\\,\\mathrm{d}y$（先对 $z$ 积分，再在投影区域 $D_z$ 上算二重积分）。</li><li><strong>先二后一法（截面法）：</strong>$\\displaystyle\\iiint_\\Omega f(x,y,z)\\,\\mathrm{d}v=\\displaystyle\\int_{c}^{d}\\left[\\displaystyle\\iint_{D_z} f(x,y,z)\\,\\mathrm{d}x\\,\\mathrm{d}y\\right]\\mathrm{d}z$（先固定 $z$ 求截面上的二重积分，再对 $z$ 积分）。</li></ul>",
      explanation: "\"先一后二\"适合 $\\Omega$ 在 $xOy$ 面上投影区域简单、穿过 $\\Omega$ 平行于 $z$ 轴的直线与边界至多两个交点的情形；\"先二后一\"（截面法）适合被积函数只含 $z$（如 $f(z)$）或截面 $D_z$ 面积易求（如球、旋转体）的情形，<strong>二者要根据区域与被积函数特点灵活选择</strong>。",
      tags: ["三重积分", "累次积分", "截面法"]
    },
    {
      id: "calc-mi-def-region-types",
      chapterId: "multiple-integral",
      type: "definition",
      title: "X-型区域与Y-型区域",
      statement: "平面区域 $D$ 若可表示为 $\\{(x,y)\\mid a\\leqslant x\\leqslant b,\\ \\varphi_1(x)\\leqslant y\\leqslant \\varphi_2(x)\\}$（其中 $\\varphi_1,\\varphi_2$ 在 $[a,b]$ 上连续），称为 X-型区域（穿过区域内部平行于 $y$ 轴的直线与边界至多两个交点）；类似地可定义 Y-型区域。若区域既非 X-型也非 Y-型，需分割成若干个 X-型或 Y-型子区域后分别计算再相加。",
      explanation: "判断区域类型、正确写出内层积分的上下限，是把二重积分化为累次积分的第一步，也是<strong>最容易出错的环节</strong>，建议先画出区域草图，确定区域是简单区域还是需要分割的复合区域。",
      tags: ["二重积分", "积分区域", "X型区域"]
    },
    {
      id: "calc-mi-prop-moment-of-inertia",
      chapterId: "multiple-integral",
      type: "property",
      title: "转动惯量的重积分表达式",
      statement: "面密度为 $\\mu(x,y)$ 的平面薄片 $D$ 对 $x$ 轴、$y$ 轴、原点的转动惯量分别为 $I_x=\\displaystyle\\iint_D y^2\\mu(x,y)\\,\\mathrm{d}\\sigma$，$I_y=\\displaystyle\\iint_D x^2\\mu(x,y)\\,\\mathrm{d}\\sigma$，$I_O=I_x+I_y=\\displaystyle\\iint_D (x^2+y^2)\\mu\\,\\mathrm{d}\\sigma$；密度为 $\\mu(x,y,z)$ 的空间立体对 $z$ 轴的转动惯量为 $I_z=\\displaystyle\\iiint_\\Omega (x^2+y^2)\\mu\\,\\mathrm{d}v$。",
      explanation: "转动惯量的被积函数是<strong>\"密度乘以到轴（点）距离的平方\"</strong>，与质心公式（密度乘以坐标的一次方）结构相似但幂次不同，是重积分物理应用中的高频考点，常结合极坐标或对称性简化计算。",
      tags: ["重积分", "转动惯量", "物理应用"]
    },
    {
      id: "calc-ls-def-line-integral-first",
      chapterId: "line-surface-integral",
      type: "definition",
      title: "对弧长的曲线积分（第一类曲线积分）的定义",
      statement: "设 $L$ 为平面内一条光滑曲线弧，$f(x,y)$ 在 $L$ 上有界。将 $L$ 任意分成 $n$ 段，第 $i$ 段弧长为 $\\Delta s_i$，在其上任取一点 $(\\xi_i,\\eta_i)$，作和式 $\\displaystyle\\sum_{i=1}^n f(\\xi_i,\\eta_i)\\Delta s_i$。若当各小段长度的最大值 $\\lambda\\to 0$ 时该和式的极限存在且与分法、取点无关，则称此极限为 $f(x,y)$ 沿 $L$ 对弧长的曲线积分，记作 $\\displaystyle\\int_L f(x,y)\\,\\mathrm{d}s$。",
      explanation: "第一类曲线积分<strong>与路径的方向无关</strong>（$\\int_L=\\int_{L^-}$），可理解为线密度为 $f$ 的曲线形构件的质量。计算时化为定积分：若 $L: x=x(t),y=y(t)\\ (\\alpha\\leqslant t\\leqslant\\beta)$，则 $\\int_L f\\,\\mathrm{d}s=\\int_\\alpha^\\beta f(x(t),y(t))\\sqrt{x'^2(t)+y'^2(t)}\\,\\mathrm{d}t$（下限对应曲线起点，<u>恒有 $\\alpha<\\beta$</u>）。",
      tags: ["曲线积分", "第一类曲线积分", "定义"]
    },
    {
      id: "calc-ls-def-line-integral-second",
      chapterId: "line-surface-integral",
      type: "definition",
      title: "对坐标的曲线积分（第二类曲线积分）的定义与计算",
      statement: "设有向曲线弧 $L$ 由 $x=x(t),y=y(t)$ 从 $t=\\alpha$（起点）变化到 $t=\\beta$（终点）给出，向量值函数 $(P(x,y),Q(x,y))$ 沿 $L$ 的第二类曲线积分定义为 $\\displaystyle\\int_L P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y$，计算公式为 $\\displaystyle\\int_L P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y=\\displaystyle\\int_\\alpha^\\beta \\left[P(x(t),y(t))x'(t)+Q(x(t),y(t))y'(t)\\right]\\mathrm{d}t$。",
      explanation: "第二类曲线积分<strong>与路径方向有关</strong>：$\\int_{L^-}P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y=-\\int_L P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y$。物理意义是变力 $\\vec{F}=(P,Q)$ 沿曲线 $L$ 从起点到终点所做的功。计算时参数 $t$ 的积分限严格按<strong>\"起点对应下限，终点对应上限\"</strong>排列，不能像第一类那样任意调整大小。",
      tags: ["曲线积分", "第二类曲线积分", "变力做功"]
    },
    {
      id: "calc-ls-thm-green-formula",
      chapterId: "line-surface-integral",
      type: "theorem",
      title: "格林公式",
      statement: "设闭区域 $D$ 由分段光滑曲线 $L$ 围成，函数 $P(x,y),Q(x,y)$ 在 $D$ 上具有一阶连续偏导数，则 $\\displaystyle\\oint_L P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y=\\displaystyle\\iint_D\\left(\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}\\right)\\mathrm{d}x\\,\\mathrm{d}y$，其中 $L$ 取<strong>正方向</strong>（沿 $L$ 前进时 $D$ 的部分总在左侧，即逆时针为正）。",
      explanation: "建立了平面闭曲线上第二类曲线积分与其所围区域二重积分之间的联系，是曲线积分计算的核心工具：当曲线不封闭或计算困难时，常通过<strong>\"补线\"</strong>化为封闭曲线再用格林公式；也用于判断平面上曲线积分与路径无关。",
      tags: ["格林公式", "曲线积分", "定理"]
    },
    {
      id: "calc-ls-thm-path-independence",
      chapterId: "line-surface-integral",
      type: "theorem",
      title: "平面曲线积分与路径无关的等价条件",
      statement: "设 $P,Q$ 在单连通区域 $D$ 内具有一阶连续偏导数，则以下条件等价：<ul><li>$\\displaystyle\\int_L P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y$ 在 $D$ 内<strong>与路径无关</strong>（只与起点、终点有关）；</li><li>沿 $D$ 内任意分段光滑闭曲线 $\\displaystyle\\oint_L P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y=0$；</li><li>在 $D$ 内处处有 $\\dfrac{\\partial P}{\\partial y}=\\dfrac{\\partial Q}{\\partial x}$；</li><li>存在函数 $u(x,y)$ 使 $\\mathrm{d}u=P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y$（即 $P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y$ 是某函数的<strong>全微分</strong>）。</li></ul>",
      explanation: "<strong>\"单连通区域\"的条件不可省略</strong>（有洞的区域上 $\\frac{\\partial P}{\\partial y}=\\frac{\\partial Q}{\\partial x}$ 不能保证与路径无关，如平面上绕原点一周的经典反例）。若与路径无关，计算时可选择最方便的路径（如折线路径）或求出原函数 $u$ 直接用 $u(B)-u(A)$ 计算。",
      tags: ["曲线积分", "路径无关", "全微分"]
    },
    {
      id: "calc-ls-def-surface-integral-first",
      chapterId: "line-surface-integral",
      type: "definition",
      title: "对面积的曲面积分（第一类曲面积分）的计算",
      statement: "设光滑曲面 $\\Sigma: z=z(x,y)$，$(x,y)\\in D_{xy}$（$D_{xy}$ 为 $\\Sigma$ 在 $xOy$ 面上的投影区域），$f(x,y,z)$ 在 $\\Sigma$ 上连续，则 $\\displaystyle\\iint_\\Sigma f(x,y,z)\\,\\mathrm{d}S=\\displaystyle\\iint_{D_{xy}} f(x,y,z(x,y))\\sqrt{1+z_x^2+z_y^2}\\,\\mathrm{d}x\\,\\mathrm{d}y$。",
      explanation: "第一类曲面积分<strong>与曲面的定向（法向量指向）无关</strong>，可理解为面密度为 $f$ 的曲面形薄壳的质量。计算的关键是<strong>\"一投二代三换\"</strong>：将曲面投影到坐标面、代入曲面方程消去 $z$、面积元换为 $\\sqrt{1+z_x^2+z_y^2}\\,\\mathrm{d}x\\mathrm{d}y$。",
      tags: ["曲面积分", "第一类曲面积分", "计算"]
    },
    {
      id: "calc-ls-def-surface-integral-second",
      chapterId: "line-surface-integral",
      type: "definition",
      title: "对坐标的曲面积分（第二类曲面积分）的计算",
      statement: "设有向光滑曲面 $\\Sigma: z=z(x,y)$ 取上侧（法向量与 $z$ 轴正向夹角为锐角），$R(x,y,z)$ 在 $\\Sigma$ 上连续，则 $\\displaystyle\\iint_\\Sigma R(x,y,z)\\,\\mathrm{d}x\\,\\mathrm{d}y=\\displaystyle\\iint_{D_{xy}} R(x,y,z(x,y))\\,\\mathrm{d}x\\,\\mathrm{d}y$（取下侧时取负号）；$P\\,\\mathrm{d}y\\mathrm{d}z$、$Q\\,\\mathrm{d}z\\mathrm{d}x$ 型积分同理分别向 $yOz$、$zOx$ 面投影计算。三者之和 $\\displaystyle\\iint_\\Sigma P\\,\\mathrm{d}y\\mathrm{d}z+Q\\,\\mathrm{d}z\\mathrm{d}x+R\\,\\mathrm{d}x\\mathrm{d}y$ 为流量型曲面积分。",
      explanation: "第二类曲面积分<strong>与曲面所取的侧（定向）有关</strong>，侧反向则积分变号。物理意义是向量场 $\\vec{F}=(P,Q,R)$ 穿过曲面 $\\Sigma$ 某一侧的<strong>通量</strong>。判断\"侧\"时要看曲面方程解出的法向量与投影轴正向的夹角是锐角还是钝角，决定投影后是否需要添加负号。",
      tags: ["曲面积分", "第二类曲面积分", "通量"]
    },
    {
      id: "calc-ls-thm-gauss-formula",
      chapterId: "line-surface-integral",
      type: "theorem",
      title: "高斯公式",
      statement: "设空间闭区域 $\\Omega$ 由分片光滑的闭曲面 $\\Sigma$ 围成，函数 $P,Q,R$ 在 $\\Omega$ 上具有一阶连续偏导数，则 $\\displaystyle\\oiint_\\Sigma P\\,\\mathrm{d}y\\mathrm{d}z+Q\\,\\mathrm{d}z\\mathrm{d}x+R\\,\\mathrm{d}x\\mathrm{d}y=\\displaystyle\\iiint_\\Omega\\left(\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}\\right)\\mathrm{d}v$，其中 $\\Sigma$ 取外侧。",
      explanation: "建立了空间闭曲面上第二类曲面积分与其所围空间区域三重积分之间的联系，是格林公式在三维空间的推广。当曲面不封闭时，常用<strong>\"补面\"</strong>技巧化为封闭曲面再用高斯公式计算，右边被积函数 $\\text{div}\\vec{F}=P_x+Q_y+R_z$ 称为向量场 $\\vec{F}$ 的<strong>散度</strong>。",
      tags: ["高斯公式", "曲面积分", "散度"]
    },
    {
      id: "calc-ls-thm-stokes-formula",
      chapterId: "line-surface-integral",
      type: "theorem",
      title: "斯托克斯公式",
      statement: "设 $\\Gamma$ 为分段光滑的空间有向闭曲线，$\\Sigma$ 是以 $\\Gamma$ 为边界的分片光滑有向曲面，$\\Sigma$ 的侧与 $\\Gamma$ 的方向符合右手法则，$P,Q,R$ 在 $\\Sigma$（连同边界）上具有一阶连续偏导数，则 $\\displaystyle\\oint_\\Gamma P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y+R\\,\\mathrm{d}z=\\displaystyle\\iint_\\Sigma\\begin{vmatrix}\\mathrm{d}y\\mathrm{d}z&\\mathrm{d}z\\mathrm{d}x&\\mathrm{d}x\\mathrm{d}y\\\\\\frac{\\partial}{\\partial x}&\\frac{\\partial}{\\partial y}&\\frac{\\partial}{\\partial z}\\\\P&Q&R\\end{vmatrix}$。",
      explanation: "是<strong>格林公式在空间中的推广</strong>：当 $\\Sigma$ 取 $xOy$ 平面上的区域（$z\\equiv 0$）时，斯托克斯公式退化为格林公式。行列式形式的被积表达式展开后即为 $\\left(\\frac{\\partial R}{\\partial y}-\\frac{\\partial Q}{\\partial z}\\right)\\mathrm{d}y\\mathrm{d}z+\\left(\\frac{\\partial P}{\\partial z}-\\frac{\\partial R}{\\partial x}\\right)\\mathrm{d}z\\mathrm{d}x+\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)\\mathrm{d}x\\mathrm{d}y$，用于计算空间闭曲线上的第二类曲线积分（数一考纲要求）。",
      tags: ["斯托克斯公式", "曲线积分", "曲面积分"]
    },
    {
      id: "calc-ls-prop-two-types-relation-line",
      chapterId: "line-surface-integral",
      type: "property",
      title: "两类曲线积分之间的联系",
      statement: "设有向曲线 $L$ 上点 $(x,y)$ 处的单位切向量为 $(\\cos\\alpha,\\cos\\beta)$（与 $L$ 方向一致），则 $\\displaystyle\\int_L P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y=\\displaystyle\\int_L (P\\cos\\alpha+Q\\cos\\beta)\\,\\mathrm{d}s$。",
      explanation: "该公式把<strong>与方向有关的第二类曲线积分</strong>转化为<strong>与方向无关的第一类曲线积分</strong>，本质是 $\\mathrm{d}x=\\cos\\alpha\\,\\mathrm{d}s$，$\\mathrm{d}y=\\cos\\beta\\,\\mathrm{d}s$。空间曲线上类似地有 $\\int_\\Gamma P\\mathrm{d}x+Q\\mathrm{d}y+R\\mathrm{d}z=\\int_\\Gamma(P\\cos\\alpha+Q\\cos\\beta+R\\cos\\gamma)\\mathrm{d}s$。",
      tags: ["曲线积分", "两类积分关系", "切向量"]
    },
    {
      id: "calc-ls-prop-two-types-relation-surface",
      chapterId: "line-surface-integral",
      type: "property",
      title: "两类曲面积分之间的联系",
      statement: "设有向曲面 $\\Sigma$ 上点处的单位法向量为 $(\\cos\\alpha,\\cos\\beta,\\cos\\gamma)$（与 $\\Sigma$ 所取的侧一致），则 $\\displaystyle\\iint_\\Sigma P\\,\\mathrm{d}y\\mathrm{d}z+Q\\,\\mathrm{d}z\\mathrm{d}x+R\\,\\mathrm{d}x\\mathrm{d}y=\\displaystyle\\iint_\\Sigma (P\\cos\\alpha+Q\\cos\\beta+R\\cos\\gamma)\\,\\mathrm{d}S$。",
      explanation: "该公式把<strong>与曲面定向有关的第二类曲面积分</strong>转化为<strong>与定向无关的第一类曲面积分</strong>，本质是 $\\mathrm{d}y\\mathrm{d}z=\\cos\\alpha\\,\\mathrm{d}S$ 等。是理解通量概念、在两类曲面积分间灵活转换计算的重要桥梁。",
      tags: ["曲面积分", "两类积分关系", "法向量"]
    },
    {
      id: "calc-ls-prop-mass-of-wire",
      chapterId: "line-surface-integral",
      type: "property",
      title: "曲线形、曲面形构件的质量与质心",
      statement: "<ul><li><strong>曲线形构件：</strong>线密度为 $\\rho(x,y,z)$ 的空间曲线 $\\Gamma$ 的质量 $M=\\displaystyle\\int_\\Gamma \\rho(x,y,z)\\,\\mathrm{d}s$，质心坐标 $\\bar{x}=\\dfrac{1}{M}\\displaystyle\\int_\\Gamma x\\rho\\,\\mathrm{d}s$（$\\bar y,\\bar z$ 同理）。</li><li><strong>曲面形构件：</strong>面密度为 $\\rho(x,y,z)$ 的曲面 $\\Sigma$ 的质量 $M=\\displaystyle\\iint_\\Sigma \\rho(x,y,z)\\,\\mathrm{d}S$，质心坐标类似用第一类曲面积分表示。</li></ul>",
      explanation: "都是第一类曲线积分/曲面积分\"微元法\"的直接应用（质量微元 $\\mathrm{d}M=\\rho\\,\\mathrm{d}s$ 或 $\\rho\\,\\mathrm{d}S$），与重积分求质量、质心的公式结构完全一致，只是把面积元/体积元换成弧长元/曲面面积元。",
      tags: ["曲线积分", "曲面积分", "质心"]
    },
    {
      id: "calc-series-def-convergence",
      chapterId: "series",
      type: "definition",
      title: "数项级数收敛与发散的定义",
      statement: "设数列 $\\{u_n\\}$，称 $\\displaystyle\\sum_{n=1}^{\\infty}u_n=u_1+u_2+\\cdots+u_n+\\cdots$ 为（常数项）级数，其前 $n$ 项和 $S_n=u_1+u_2+\\cdots+u_n$ 称为<strong>部分和</strong>。若 $\\lim\\limits_{n\\to\\infty}S_n=S$ 存在，则称级数<strong>收敛</strong>，$S$ 称为级数的和，记 $\\sum_{n=1}^{\\infty}u_n=S$；若 $\\lim\\limits_{n\\to\\infty}S_n$ 不存在，则称级数<strong>发散</strong>。",
      explanation: "级数收敛性的本质是研究部分和数列 $\\{S_n\\}$ 的极限是否存在，这把级数问题<strong>转化为数列极限问题</strong>。判断/计算级数敛散性与和的最基本方法就是先求出 $S_n$ 的表达式（如裂项相消）再取极限。",
      tags: ["级数", "收敛", "定义"]
    },
    {
      id: "calc-series-thm-necessary-condition",
      chapterId: "series",
      type: "theorem",
      title: "级数收敛的必要条件",
      statement: "若级数 $\\displaystyle\\sum_{n=1}^{\\infty}u_n$ 收敛，则 $\\lim\\limits_{n\\to\\infty}u_n=0$。",
      explanation: "这只是<strong>必要条件而非充分条件</strong>：一般项趋于零的级数不一定收敛，经典反例是调和级数 $\\sum\\frac{1}{n}$（$u_n=\\frac1n\\to 0$ 但级数发散）。该定理常用于<u>反向判断级数发散</u>：若 $\\lim u_n\\neq 0$ 或不存在，级数必发散。",
      tags: ["级数", "必要条件", "调和级数"]
    },
    {
      id: "calc-series-thm-geometric-p-series",
      chapterId: "series",
      type: "theorem",
      title: "等比级数与 p-级数的敛散性",
      statement: "<ul><li><strong>等比级数：</strong>$\\displaystyle\\sum_{n=0}^{\\infty}aq^n$（$a\\neq 0$）当 $|q|<1$ 时收敛，和为 $\\dfrac{a}{1-q}$；当 $|q|\\geqslant 1$ 时发散。</li><li><strong>$p$-级数：</strong>$\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{1}{n^p}$ 当 $p>1$ 时收敛，当 $p\\leqslant 1$ 时发散（$p=1$ 时即调和级数）。</li></ul>",
      explanation: "这两类级数是比较判别法中最常用的<strong>\"参照级数\"</strong>，几乎所有正项级数敛散性判断题都要与它们之一作比较，必须牢记结论及<u>临界值（$|q|=1$、$p=1$）</u>。",
      tags: ["级数", "等比级数", "p级数"]
    },
    {
      id: "calc-series-thm-comparison-test",
      chapterId: "series",
      type: "theorem",
      title: "正项级数的比较判别法",
      statement: "设 $\\displaystyle\\sum u_n$ 与 $\\displaystyle\\sum v_n$ 都是正项级数，且 $u_n\\leqslant v_n$（$n$ 充分大后成立）。<strong>基本形式：</strong>若 $\\displaystyle\\sum v_n$ 收敛，则 $\\displaystyle\\sum u_n$ 收敛；若 $\\displaystyle\\sum u_n$ 发散，则 $\\displaystyle\\sum v_n$ 发散。<strong>极限形式：</strong>若 $\\lim\\limits_{n\\to\\infty}\\dfrac{u_n}{v_n}=l$（$0<l<+\\infty$），则 $\\displaystyle\\sum u_n$ 与 $\\displaystyle\\sum v_n$ 同敛散。",
      explanation: "极限形式的比较判别法更常用，做题时常取 $v_n$ 为 $n\\to\\infty$ 时与 $u_n$ 等价的简单级数（如 $p$-级数），只需分析 $u_n$ 的<strong>主部（分子分母最高阶）</strong>即可判断敛散性。",
      tags: ["级数", "比较判别法", "正项级数"]
    },
    {
      id: "calc-series-thm-ratio-root-test",
      chapterId: "series",
      type: "theorem",
      title: "正项级数的比值判别法与根值判别法",
      statement: "<ul><li><strong>比值判别法（达朗贝尔判别法）：</strong>设 $\\displaystyle\\sum u_n$ 为正项级数，$\\lim\\limits_{n\\to\\infty}\\dfrac{u_{n+1}}{u_n}=\\rho$，则 $\\rho<1$ 时收敛，$\\rho>1$（含 $+\\infty$）时发散，$\\rho=1$ 时判别法失效。</li><li><strong>根值判别法（柯西判别法）：</strong>$\\lim\\limits_{n\\to\\infty}\\sqrt[n]{u_n}=\\rho$，则 $\\rho<1$ 时收敛，$\\rho>1$ 时发散，$\\rho=1$ 时失效。</li></ul>",
      explanation: "比值判别法适合通项含阶乘、指数结构（如 $n!$、$a^n$）的级数；根值判别法适合通项为 $n$ 次幂结构（如 $\\left(\\frac{n}{n+1}\\right)^{n^2}$）的级数。两者 <u>$\\rho=1$ 时都需换用其他方法（如比较判别法）判断</u>。",
      tags: ["级数", "比值判别法", "根值判别法"]
    },
    {
      id: "calc-series-thm-leibniz-test",
      chapterId: "series",
      type: "theorem",
      title: "交错级数的莱布尼茨判别法",
      statement: "设交错级数 $\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n-1}u_n$（$u_n>0$）满足：<ul><li>$u_n\\geqslant u_{n+1}$（单调不增，$n$ 充分大后成立即可）；</li><li>$\\lim\\limits_{n\\to\\infty}u_n=0$；</li></ul>则该级数收敛，其和 $S\\leqslant u_1$，余项 $|R_n|\\leqslant u_{n+1}$。",
      explanation: "这是判断交错级数收敛最主要的方法，<strong>两个条件（单调递减、趋于零）缺一不可</strong>。余项估计式 $|R_n|\\leqslant u_{n+1}$ 在数值近似计算中很有用：用有限项和近似级数和时，误差不超过截断后第一项。",
      tags: ["级数", "交错级数", "莱布尼茨判别法"]
    },
    {
      id: "calc-series-def-absolute-conditional",
      chapterId: "series",
      type: "definition",
      title: "绝对收敛与条件收敛",
      statement: "若级数 $\\displaystyle\\sum_{n=1}^{\\infty}|u_n|$ 收敛，则称 $\\displaystyle\\sum_{n=1}^{\\infty}u_n$ <strong>绝对收敛</strong>；若 $\\displaystyle\\sum u_n$ 收敛但 $\\displaystyle\\sum |u_n|$ 发散，则称 $\\displaystyle\\sum u_n$ <strong>条件收敛</strong>。",
      explanation: "<u>绝对收敛的级数一定收敛（反之不成立）</u>。判断一般项级数敛散性的常规步骤：先对 $\\sum|u_n|$（正项级数）用比较、比值、根值判别法判断是否绝对收敛；若发散，再看原级数（常为交错级数）是否用莱布尼茨判别法条件收敛。",
      tags: ["级数", "绝对收敛", "条件收敛"]
    },
    {
      id: "calc-series-def-power-series",
      chapterId: "series",
      type: "definition",
      title: "幂级数及其收敛半径、收敛区间",
      statement: "形如 $\\displaystyle\\sum_{n=0}^{\\infty}a_n(x-x_0)^n$ 的级数称为<strong>幂级数</strong>。由阿贝尔定理可知，存在 $R\\geqslant 0$（$R$ 可为 $+\\infty$），使得当 $|x-x_0|<R$ 时幂级数绝对收敛，当 $|x-x_0|>R$ 时发散，$R$ 称为<strong>收敛半径</strong>。$(x_0-R,x_0+R)$ 称为<strong>收敛区间</strong>，端点 $x=x_0\\pm R$ 处需单独代入原级数判断敛散性，收敛区间连同收敛的端点一起构成<strong>收敛域</strong>。",
      explanation: "求收敛半径常用比值法或根值法：$R=\\lim\\limits_{n\\to\\infty}\\left|\\dfrac{a_n}{a_{n+1}}\\right|$（或 $R=\\lim\\dfrac{1}{\\sqrt[n]{|a_n|}}$）。<u>端点处的敛散性必须单独代入原级数用数项级数判别法逐一判断</u>，不能想当然地认为端点也收敛或发散。",
      tags: ["幂级数", "收敛半径", "收敛域"]
    },
    {
      id: "calc-series-thm-abel",
      chapterId: "series",
      type: "theorem",
      title: "阿贝尔定理",
      statement: "若幂级数 $\\displaystyle\\sum_{n=0}^{\\infty}a_nx^n$ 在 $x=x_0\\neq 0$ 处收敛，则对满足 $|x|<|x_0|$ 的一切 $x$，该幂级数绝对收敛；若在 $x=x_0$ 处发散，则对满足 $|x|>|x_0|$ 的一切 $x$，该幂级数发散。",
      explanation: "阿贝尔定理是幂级数存在唯一收敛半径 $R$、收敛域呈对称区间形状的理论依据。它说明幂级数的敛散性关于原点具有<strong>\"由近及远\"</strong>的传递性：某点收敛则更靠近中心的点必绝对收敛。",
      tags: ["幂级数", "阿贝尔定理", "收敛性"]
    },
    {
      id: "calc-series-prop-power-series-operations",
      chapterId: "series",
      type: "property",
      title: "幂级数的运算性质（逐项求导、逐项积分）",
      statement: "设幂级数 $\\displaystyle\\sum_{n=0}^{\\infty}a_nx^n$ 的收敛半径为 $R>0$，其和函数 $S(x)$ 在收敛区间 $(-R,R)$ 内连续、可导、可积，且可逐项求导、逐项积分：$S'(x)=\\displaystyle\\sum_{n=1}^{\\infty}na_nx^{n-1}$，$\\displaystyle\\int_0^x S(t)\\,\\mathrm{d}t=\\displaystyle\\sum_{n=0}^{\\infty}\\dfrac{a_n}{n+1}x^{n+1}$，逐项求导、逐项积分后所得幂级数的收敛半径不变（仍为 $R$，但端点敛散性可能改变）。",
      explanation: "这是求幂级数和函数<strong>最核心的方法</strong>：通过对已知求和公式（如 $\\sum x^n=\\frac{1}{1-x}$）逐项求导或逐项积分，将待求级数转化为已知结果。做题时常先将级数变形为可用这两种运算处理的\"标准形式\"。",
      tags: ["幂级数", "和函数", "逐项求导"]
    },
    {
      id: "calc-series-prop-common-maclaurin-series",
      chapterId: "series",
      type: "property",
      title: "常用函数的麦克劳林级数展开",
      statement: "$e^x=\\displaystyle\\sum_{n=0}^{\\infty}\\dfrac{x^n}{n!}$（$-\\infty<x<+\\infty$）；$\\sin x=\\displaystyle\\sum_{n=0}^{\\infty}\\dfrac{(-1)^n}{(2n+1)!}x^{2n+1}$，$\\cos x=\\displaystyle\\sum_{n=0}^{\\infty}\\dfrac{(-1)^n}{(2n)!}x^{2n}$（$-\\infty<x<+\\infty$）；$\\dfrac{1}{1-x}=\\displaystyle\\sum_{n=0}^{\\infty}x^n$（$-1<x<1$）；$\\ln(1+x)=\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{(-1)^{n-1}}{n}x^n$（$-1<x\\leqslant 1$）；$(1+x)^\\alpha=1+\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{\\alpha(\\alpha-1)\\cdots(\\alpha-n+1)}{n!}x^n$（$-1<x<1$）。",
      explanation: "这些是函数展开成幂级数、求特定级数的和最重要的\"母函数\"，<u>必须熟记（含收敛域）</u>。展开其他函数常通过代换（如把 $x$ 换成 $-x^2$）、四则运算、逐项求导积分等方式，转化为这些标准展开式的组合。",
      tags: ["幂级数", "麦克劳林级数", "泰勒展开"]
    },
    {
      id: "calc-series-def-fourier-series",
      chapterId: "series",
      type: "definition",
      title: "傅里叶级数与狄利克雷收敛定理",
      statement: "设 $f(x)$ 是以 $2\\pi$ 为周期的函数，其傅里叶系数为 $a_n=\\dfrac{1}{\\pi}\\displaystyle\\int_{-\\pi}^{\\pi}f(x)\\cos nx\\,\\mathrm{d}x$（$n=0,1,2,\\cdots$），$b_n=\\dfrac{1}{\\pi}\\displaystyle\\int_{-\\pi}^{\\pi}f(x)\\sin nx\\,\\mathrm{d}x$（$n=1,2,\\cdots$），对应的傅里叶级数为 $\\dfrac{a_0}{2}+\\displaystyle\\sum_{n=1}^{\\infty}(a_n\\cos nx+b_n\\sin nx)$。狄利克雷收敛定理：若 $f(x)$ 在一个周期内满足狄利克雷条件（连续或只有有限个第一类间断点，且只有有限个极值点），则其傅里叶级数在 $f$ 的连续点处收敛于 $f(x)$，在间断点 $x_0$ 处收敛于 $\\dfrac{f(x_0^-)+f(x_0^+)}{2}$。",
      explanation: "傅里叶级数把周期函数分解为三角函数的叠加。<strong>偶函数</strong>展开为余弦级数（$b_n=0$），<strong>奇函数</strong>展开为正弦级数（$a_n=0$）。<u>间断点处傅里叶级数收敛于左右极限的平均值而非函数值本身</u>，这是与幂级数在收敛点直接等于函数值的重要区别（数一考纲要求）。",
      tags: ["傅里叶级数", "狄利克雷定理", "周期函数"]
    },
    {
      id: "calc-series-prop-sine-cosine-series",
      chapterId: "series",
      type: "property",
      title: "函数展开为正弦级数与余弦级数（周期延拓）",
      statement: "设 $f(x)$ 定义在 $[0,\\pi]$ 上，满足狄利克雷条件。<ul><li><strong>正弦级数：</strong>若将其作奇延拓后再以 $2\\pi$ 为周期延拓，展开得到正弦级数 $\\displaystyle\\sum_{n=1}^{\\infty}b_n\\sin nx$，其中 $b_n=\\dfrac{2}{\\pi}\\displaystyle\\int_0^\\pi f(x)\\sin nx\\,\\mathrm{d}x$。</li><li><strong>余弦级数：</strong>若作偶延拓后展开得到余弦级数 $\\dfrac{a_0}{2}+\\displaystyle\\sum_{n=1}^{\\infty}a_n\\cos nx$，其中 $a_n=\\dfrac{2}{\\pi}\\displaystyle\\int_0^\\pi f(x)\\cos nx\\,\\mathrm{d}x$。</li></ul>",
      explanation: "这是考研中\"将 $[0,\\pi]$ 上函数展开为正弦级数/余弦级数\"题型的标准方法：先按要求奇（偶）延拓到 $[-\\pi,\\pi]$，再按周期 $2\\pi$ 延拓到整个数轴，然后计算相应的傅里叶系数。<strong>奇延拓保证 $a_n=0$，偶延拓保证 $b_n=0$</strong>，从而只需计算另一组系数。",
      tags: ["傅里叶级数", "正弦级数", "余弦级数"]
    },
    {
      id: "calc-series-thm-absolute-convergence-implies",
      chapterId: "series",
      type: "theorem",
      title: "绝对收敛级数的性质",
      statement: "若级数 $\\displaystyle\\sum u_n$ 绝对收敛，则任意交换其各项次序所得的级数仍绝对收敛，且和不变（可任意加括号求和，也可与另一绝对收敛级数逐项相乘后按任意方式重排求和）。",
      explanation: "这是绝对收敛级数区别于条件收敛级数的重要性质：<u>条件收敛级数改变求和次序可能改变级数的和甚至由收敛变为发散</u>（黎曼重排定理），而绝对收敛级数则不受求和顺序影响，运算性质更接近有限项求和。",
      tags: ["级数", "绝对收敛", "性质"]
    },
    {
      id: "calc-series-prop-series-operations",
      chapterId: "series",
      type: "property",
      title: "收敛级数的基本运算性质",
      statement: "<ul><li>若 $\\displaystyle\\sum u_n=A$，$\\displaystyle\\sum v_n=B$ 都收敛，则 $\\displaystyle\\sum(u_n\\pm v_n)=A\\pm B$；</li><li>级数的每一项同乘<strong>非零常数</strong> $k$，敛散性不变，且 $\\displaystyle\\sum ku_n=kA$；</li><li>在级数前面加上或去掉<strong>有限项</strong>，不改变级数的敛散性（但和会相应改变）；</li><li>收敛级数任意加括号后所成的级数仍收敛且和不变（反之不成立）。</li></ul>",
      explanation: "<strong>\"加括号后仍收敛\"不能反推\"去括号后原级数收敛\"</strong>，例如 $(1-1)+(1-1)+\\cdots=0$ 收敛，但 $1-1+1-1+\\cdots$ 发散，这是级数运算中的常见易错点。",
      tags: ["级数", "运算性质", "收敛级数"]
    },
    {
      id: "calc-ode-def-basic-concepts",
      chapterId: "ode",
      type: "definition",
      title: "微分方程的阶、解、通解与特解",
      statement: "含有未知函数的导数（或微分）的方程称为<strong>微分方程</strong>，方程中出现的未知函数最高阶导数的阶数称为微分方程的<strong>阶</strong>。使方程两边恒等的函数称为微分方程的<strong>解</strong>。若解中所含独立的任意常数的个数与方程的阶数相同，称为<strong>通解</strong>；不含任意常数（或已根据初值确定常数）的解称为<strong>特解</strong>。用于确定通解中任意常数的条件称为<strong>初值条件</strong>。",
      explanation: "<strong>\"独立的任意常数个数等于阶数\"</strong>是判断通解的关键标准（例如两个常数若能合并为一个则不算通解）。求特解的一般流程是先求出通解，再代入初值条件解出常数的具体值。",
      tags: ["微分方程", "通解", "特解"]
    },
    {
      id: "calc-ode-prop-separable-variables",
      chapterId: "ode",
      type: "property",
      title: "可分离变量的微分方程",
      statement: "形如 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}=f(x)g(y)$ 的方程称为可分离变量方程。当 $g(y)\\neq 0$ 时，分离变量得 $\\dfrac{\\mathrm{d}y}{g(y)}=f(x)\\,\\mathrm{d}x$，两边同时积分 $\\displaystyle\\int\\dfrac{\\mathrm{d}y}{g(y)}=\\displaystyle\\int f(x)\\,\\mathrm{d}x$ 即得隐式通解。",
      explanation: "这是求解一阶微分方程<strong>最基本的方法</strong>，很多其他类型的方程（齐次方程、某些可化为分离变量的方程）都是通过换元转化为这一类型求解的。注意 <u>$g(y)=0$ 对应的常数解也可能是方程的解，不要遗漏</u>。",
      tags: ["微分方程", "可分离变量", "一阶方程"]
    },
    {
      id: "calc-ode-prop-homogeneous-equation",
      chapterId: "ode",
      type: "property",
      title: "齐次方程的解法",
      statement: "形如 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}=\\varphi\\left(\\dfrac{y}{x}\\right)$ 的方程称为齐次方程。作代换 $u=\\dfrac{y}{x}$（即 $y=ux$），则 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}=u+x\\dfrac{\\mathrm{d}u}{\\mathrm{d}x}$，代入原方程化为可分离变量方程 $x\\dfrac{\\mathrm{d}u}{\\mathrm{d}x}=\\varphi(u)-u$，求解后代回 $u=\\dfrac{y}{x}$ 即得原方程的通解。",
      explanation: "识别齐次方程的关键是判断方程右边是否可写成 $\\frac{y}{x}$ 的函数。这是求解一阶方程中\"换元法\"最典型的应用，掌握代换 <strong>$y=ux$</strong> 是解决这类方程的核心技巧。",
      tags: ["微分方程", "齐次方程", "换元法"]
    },
    {
      id: "calc-ode-thm-linear-first-order",
      chapterId: "ode",
      type: "theorem",
      title: "一阶线性微分方程的通解公式",
      statement: "一阶线性微分方程 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}+P(x)y=Q(x)$ 的通解为 $y=e^{-\\int P(x)\\mathrm{d}x}\\left(\\displaystyle\\int Q(x)e^{\\int P(x)\\mathrm{d}x}\\,\\mathrm{d}x+C\\right)$。当 $Q(x)\\equiv 0$ 时称为<strong>一阶线性齐次方程</strong>，通解为 $y=Ce^{-\\int P(x)\\mathrm{d}x}$；$Q(x)\\not\\equiv 0$ 时称为<strong>非齐次方程</strong>。",
      explanation: "该公式可用<strong>常数变易法</strong>推导：先求出对应齐次方程的通解 $y=Ce^{-\\int P\\mathrm{d}x}$，再将 $C$ 换成待定函数 $C(x)$ 代入原方程求出 $C(x)$。公式必须熟记，是一阶线性方程（含伯努利方程化简后）的标准解法。",
      tags: ["微分方程", "一阶线性方程", "通解公式"]
    },
    {
      id: "calc-ode-prop-bernoulli-equation",
      chapterId: "ode",
      type: "property",
      title: "伯努利方程的解法",
      statement: "形如 $\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}+P(x)y=Q(x)y^n$（$n\\neq 0,1$）的方程称为伯努利方程。两边除以 $y^n$ 并令 $z=y^{1-n}$，可化为关于 $z$ 的一阶线性方程 $\\dfrac{\\mathrm{d}z}{\\mathrm{d}x}+(1-n)P(x)z=(1-n)Q(x)$，用一阶线性方程通解公式求出 $z$ 后代回 $z=y^{1-n}$ 即得原方程的解。",
      explanation: "伯努利方程是一阶线性方程的推广，求解的核心是通过除以 $y^n$、代换 <strong>$z=y^{1-n}$</strong> 把非线性方程转化为线性方程，这种\"降幂代换\"思想在处理非线性方程时具有代表性。",
      tags: ["微分方程", "伯努利方程", "换元法"]
    },
    {
      id: "calc-ode-thm-solution-structure-linear",
      chapterId: "ode",
      type: "theorem",
      title: "线性微分方程解的结构定理",
      statement: "<ul><li><strong>齐次方程：</strong>对于 $n$ 阶线性齐次方程 $y^{(n)}+a_1(x)y^{(n-1)}+\\cdots+a_n(x)y=0$，若 $y_1,y_2,\\cdots,y_n$ 是其 $n$ 个线性无关的解，则通解为 $y=C_1y_1+C_2y_2+\\cdots+C_ny_n$。</li><li><strong>非齐次方程：</strong>对于对应的非齐次方程 $y^{(n)}+a_1(x)y^{(n-1)}+\\cdots+a_n(x)y=f(x)$，若 $Y$ 为齐次方程的通解，$y^*$ 为非齐次方程的一个特解，则非齐次方程的通解为 $y=Y+y^*$。</li><li><strong>叠加原理：</strong>若 $y_1^*,y_2^*$ 分别是 $f(x)=f_1(x)$ 与 $f(x)=f_2(x)$ 对应非齐次方程的特解，则 $y_1^*+y_2^*$ 是 $f(x)=f_1(x)+f_2(x)$ 对应方程的特解。</li></ul>",
      explanation: "这是线性微分方程理论的核心框架，与线性代数中<strong>\"非齐次线性方程组通解=齐次通解+特解\"</strong>高度类似。二阶常系数线性方程正是该结构定理在具体方程上的应用，叠加原理常用于自由项 $f(x)$ 是几种简单函数之和的情形，分别求特解再相加。",
      tags: ["微分方程", "线性方程", "解的结构"]
    },
    {
      id: "calc-ode-def-wronskian-independence",
      chapterId: "ode",
      type: "definition",
      title: "函数组线性相关与线性无关",
      statement: "设函数 $y_1(x),y_2(x),\\cdots,y_n(x)$ 定义在区间 $I$ 上，若存在<strong>不全为零</strong>的常数 $k_1,k_2,\\cdots,k_n$，使得 $k_1y_1+k_2y_2+\\cdots+k_ny_n\\equiv 0$ 在 $I$ 上恒成立，则称这组函数在 $I$ 上<strong>线性相关</strong>，否则称<strong>线性无关</strong>。对两个函数 $y_1,y_2$，$\\dfrac{y_1}{y_2}$ 在 $I$ 上不恒为常数 $\\Leftrightarrow y_1,y_2$ 线性无关。",
      explanation: "<u>判断两个函数线性无关最简便的方法就是看它们的比值是否为常数</u>（比值恒为常数则线性相关）。这一概念是线性微分方程解的结构定理中\"$n$ 个线性无关的解\"的理论基础，决定了通解中任意常数的个数是否等于方程的阶数。",
      tags: ["微分方程", "线性相关", "线性无关"]
    },
    {
      id: "calc-ode-thm-second-order-constant-homogeneous",
      chapterId: "ode",
      type: "theorem",
      title: "二阶常系数齐次线性微分方程的通解",
      statement: "对于方程 $y''+py'+qy=0$（$p,q$ 为常数），写出<strong>特征方程</strong> $r^2+pr+q=0$，设其两根为 $r_1,r_2$。<ul><li>若 $r_1\\neq r_2$ 为<strong>不相等实根</strong>，通解为 $y=C_1e^{r_1x}+C_2e^{r_2x}$；</li><li>若 $r_1=r_2=r$ 为<strong>二重实根</strong>，通解为 $y=(C_1+C_2x)e^{rx}$；</li><li>若 $r_{1,2}=\\alpha\\pm\\mathrm{i}\\beta$ 为一对<strong>共轭复根</strong>，通解为 $y=e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)$。</li></ul>",
      explanation: "求解的核心是把微分方程问题转化为求特征方程的代数根的问题（<strong>特征方程法</strong>）。三种情形对应特征方程判别式 $\\Delta=p^2-4q$ 大于、等于、小于零，是二阶常系数线性方程必考的基础解法，也可推广到更高阶常系数齐次方程。",
      tags: ["微分方程", "二阶常系数", "特征方程"]
    },
    {
      id: "calc-ode-prop-particular-solution-exponential",
      chapterId: "ode",
      type: "property",
      title: "二阶常系数非齐次方程特解形式（自由项为 $e^{\\lambda x}P_m(x)$ 型）",
      statement: "对方程 $y''+py'+qy=e^{\\lambda x}P_m(x)$（$P_m(x)$ 为 $m$ 次多项式），设特解为 $y^*=x^k e^{\\lambda x}Q_m(x)$，其中 $Q_m(x)$ 是与 $P_m(x)$ 同次的待定多项式，$k$ 按 $\\lambda$ <strong>不是</strong>特征方程的根、是特征方程的<strong>单根</strong>、是特征方程的<strong>重根</strong>分别取 $0,1,2$。",
      explanation: "$k$ 的取值口诀<strong>\"不是根取0，是单根取1，是重根取2\"</strong>，本质是为了避免设的特解形式与齐次通解中的项重复（共振现象）。确定 $k$ 后代入原方程比较系数解出 $Q_m(x)$ 的各项系数即得特解。",
      tags: ["微分方程", "特解", "待定系数法"]
    },
    {
      id: "calc-ode-prop-particular-solution-trig",
      chapterId: "ode",
      type: "property",
      title: "二阶常系数非齐次方程特解形式（自由项为 $e^{\\lambda x}[P_l\\cos\\omega x+P_n\\sin\\omega x]$ 型）",
      statement: "对方程 $y''+py'+qy=e^{\\lambda x}[P_l(x)\\cos\\omega x+P_n(x)\\sin\\omega x]$，设特解为 $y^*=x^k e^{\\lambda x}[R_m^{(1)}(x)\\cos\\omega x+R_m^{(2)}(x)\\sin\\omega x]$，其中 $m=\\max\\{l,n\\}$，$R_m^{(1)},R_m^{(2)}$ 为 $m$ 次待定多项式，$k$ 按 $\\lambda+\\mathrm{i}\\omega$（或 $\\lambda-\\mathrm{i}\\omega$）不是特征方程的根取 $0$、是特征方程的根取 $1$。",
      explanation: "<u>即使原方程中只出现 $\\cos\\omega x$ 或只出现 $\\sin\\omega x$ 其中一项，设特解时也必须同时包含 $\\cos\\omega x$ 与 $\\sin\\omega x$ 两项</u>（因为求导会使两者相互转化），这是最容易遗漏的地方。",
      tags: ["微分方程", "特解", "三角函数型自由项"]
    },
    {
      id: "calc-ode-def-euler-equation",
      chapterId: "ode",
      type: "definition",
      title: "欧拉方程及其解法",
      statement: "形如 $x^2y''+pxy'+qy=f(x)$（$p,q$ 为常数）的方程称为欧拉方程。作代换 $x=e^t$（即 $t=\\ln x$，$x>0$），并记 $D=\\dfrac{\\mathrm{d}}{\\mathrm{d}t}$，则 $x\\dfrac{\\mathrm{d}y}{\\mathrm{d}x}=Dy$，$x^2\\dfrac{\\mathrm{d}^2y}{\\mathrm{d}x^2}=D(D-1)y$，代入后原方程化为以 $t$ 为自变量的常系数线性微分方程，求出通解后代回 $t=\\ln x$ 即得原方程的通解。",
      explanation: "欧拉方程的特征是<strong>各项 $x^k y^{(k)}$ 的幂次与求导阶数相同</strong>，识别出这一结构后通过 $x=e^t$ 换元即可化为常系数线性方程标准解法（数一考纲要求）。也可直接尝试 $y=x^r$ 代入求出特征方程 $r(r-1)+pr+q=0$ 的根来构造通解。",
      tags: ["微分方程", "欧拉方程", "变量代换"]
    },
    {
      id: "calc-ode-prop-reducible-second-order",
      chapterId: "ode",
      type: "property",
      title: "可降阶的高阶微分方程",
      statement: "<ul><li><strong>类型一 $y^{(n)}=f(x)$：</strong>直接连续积分 $n$ 次即得通解。</li><li><strong>类型二 $y''=f(x,y')$</strong>（不显含 $y$）：令 $p=y'$，化为一阶方程 $p'=f(x,p)$，求出 $p(x)$ 后再积分得 $y$。</li><li><strong>类型三 $y''=f(y,y')$</strong>（不显含 $x$）：令 $p=y'$，并把 $y$ 看作自变量，$y''=p\\dfrac{\\mathrm{d}p}{\\mathrm{d}y}$，化为一阶方程 $p\\dfrac{\\mathrm{d}p}{\\mathrm{d}y}=f(y,p)$ 求解。</li></ul>",
      explanation: "三种类型的判别依据是<strong>方程中缺少哪个变量</strong>：缺 $y,y'$（只含 $x$）直接积分；缺 $y$ 用 $p=y'$ 降阶（对 $x$ 求导）；缺 $x$ 用 $p=y'$ 且以 $y$ 为自变量降阶（$y''=p\\,\\mathrm{d}p/\\mathrm{d}y$ 是关键公式）。",
      tags: ["微分方程", "可降阶方程", "高阶方程"]
    },
    {
      id: "calc-ode-thm-existence-uniqueness",
      chapterId: "ode",
      type: "theorem",
      title: "一阶微分方程解的存在唯一性定理",
      statement: "设方程 $y'=f(x,y)$ 中 $f(x,y)$ 及 $\\dfrac{\\partial f}{\\partial y}$ 在矩形区域 $R=\\{(x,y)\\mid |x-x_0|\\leqslant a, |y-y_0|\\leqslant b\\}$ 上连续，则初值问题 $y'=f(x,y)$，$y(x_0)=y_0$ 在 $x_0$ 的某邻域内存在唯一解。",
      explanation: "该定理保证了在较弱的条件（$f$ 及其对 $y$ 的偏导连续）下初值问题解的<strong>存在性与唯一性</strong>，是研究微分方程解的性质（如判断两条积分曲线是否相交）的理论基础。数一部分省份考纲会涉及该定理的条件辨析。",
      tags: ["微分方程", "存在唯一性", "初值问题"]
    },
    {
      id: "calc-ode-thm-exact-equation",
      chapterId: "ode",
      type: "theorem",
      title: "全微分方程（恰当方程）",
      statement: "形如 $P(x,y)\\,\\mathrm{d}x+Q(x,y)\\,\\mathrm{d}y=0$ 的方程，若左端恰为某函数 $u(x,y)$ 的全微分，即 $\\mathrm{d}u=P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y$，则称为<strong>全微分方程</strong>，其通解为 $u(x,y)=C$。<u>判别条件（充要）：在单连通区域内 $P,Q$ 有连续偏导时，方程为全微分方程 $\\Leftrightarrow \\dfrac{\\partial P}{\\partial y}=\\dfrac{\\partial Q}{\\partial x}$。</u>求 $u$ 可用曲线积分 $u(x,y)=\\displaystyle\\int_{x_0}^{x}P(t,y_0)\\,\\mathrm{d}t+\\int_{y_0}^{y}Q(x,t)\\,\\mathrm{d}t$。",
      explanation: "判别口诀：<strong>「$P$ 对 $y$ 偏导 = $Q$ 对 $x$ 偏导」</strong>。这与曲线积分中\"与路径无关\"的条件完全一致，本质是同一件事。若不满足该条件，有时可乘一个<strong>积分因子</strong> $\\mu(x,y)$ 使其变成全微分方程（常见的 $\\mu$ 只含 $x$ 或只含 $y$）。求出 $u$ 后别忘了通解是 $u=C$ 而不是 $u=0$。",
      tags: ["微分方程", "全微分方程", "恰当方程", "积分因子"]
    },
    {
      id: "calc-vec-prop-space-curve-projection",
      chapterId: "vector-geometry",
      type: "property",
      title: "空间曲线在坐标面上的投影",
      statement: "设空间曲线 $\\Gamma:\\begin{cases}F(x,y,z)=0\\\\ G(x,y,z)=0\\end{cases}$。从这两个方程中<strong>消去 $z$</strong> 得 $H(x,y)=0$，它表示以 $\\Gamma$ 为准线、母线平行于 $z$ 轴的<strong>投影柱面</strong>；于是 $\\Gamma$ 在 $xOy$ 面上的<strong>投影曲线</strong>为 $\\begin{cases}H(x,y)=0\\\\ z=0\\end{cases}$。同理消去 $x$（或 $y$）可得在 $yOz$（或 $zOx$）面上的投影。",
      explanation: "关键动作是<strong>消元</strong>：投影到哪个坐标面，就消去哪个坐标轴对应的变量。<u>写投影曲线时必须补上该坐标面的方程（如 $z=0$），只写 $H(x,y)=0$ 得到的是柱面而不是曲线。</u>这是重积分、曲线曲面积分中确定积分区域的常用第一步。",
      tags: ["空间解析几何", "投影柱面", "投影曲线"]
    },
    {
      id: "calc-mv-prop-space-curve-tangent",
      chapterId: "multivar-derivative",
      type: "property",
      title: "空间曲线的切线与法平面",
      statement: "设曲线 $\\Gamma$ 的参数方程为 $x=\\varphi(t),\\,y=\\psi(t),\\,z=\\omega(t)$，在 $t=t_0$ 对应点 $M_0(x_0,y_0,z_0)$ 处导数不全为零，则<strong>切向量</strong>为 $\\vec{T}=(\\varphi'(t_0),\\psi'(t_0),\\omega'(t_0))$，于是：<ul><li><strong>切线方程：</strong>$\\dfrac{x-x_0}{\\varphi'(t_0)}=\\dfrac{y-y_0}{\\psi'(t_0)}=\\dfrac{z-z_0}{\\omega'(t_0)}$</li><li><strong>法平面方程：</strong>$\\varphi'(t_0)(x-x_0)+\\psi'(t_0)(y-y_0)+\\omega'(t_0)(z-z_0)=0$（过 $M_0$ 且与切线垂直的平面）</li></ul>",
      explanation: "切线与法平面互为<strong>方向向量与法向量的关系</strong>：同一个 $\\vec T$，做切线时当方向向量，做法平面时当法向量。<u>若曲线由两曲面交线给出 $\\begin{cases}F=0\\\\ G=0\\end{cases}$，则切向量取 $\\vec T=\\nabla F\\times\\nabla G$</u>（两法向量的叉积），这是最常考的变形。",
      tags: ["多元微分", "切线", "法平面", "空间曲线"]
    },
    {
      id: "calc-mi-thm-change-of-variables",
      chapterId: "multiple-integral",
      type: "theorem",
      title: "二重积分的换元法与雅可比行列式",
      statement: "设变换 $T:x=x(u,v),\\,y=y(u,v)$ 将 $uv$ 平面上的闭区域 $D'$ 一对一地映成 $xy$ 平面上的 $D$，且 $x,y$ 有连续偏导、<strong>雅可比行列式</strong> $J(u,v)=\\dfrac{\\partial(x,y)}{\\partial(u,v)}=\\begin{vmatrix}x_u & x_v\\\\ y_u & y_v\\end{vmatrix}\\neq 0$，则 $$\\iint_D f(x,y)\\,\\mathrm{d}x\\,\\mathrm{d}y=\\iint_{D'} f\\big(x(u,v),y(u,v)\\big)\\,|J(u,v)|\\,\\mathrm{d}u\\,\\mathrm{d}v.$$",
      explanation: "三个易错点：<strong>① 必须取绝对值 $|J|$</strong>（面积不能为负）；<strong>② $J$ 是新变量到旧变量的偏导</strong>，方向别弄反，若算出的是 $\\partial(u,v)/\\partial(x,y)$ 需取倒数；<strong>③ 积分区域要同步换成 $D'$</strong>。<u>极坐标变换正是本定理的特例：$x=r\\cos\\theta,y=r\\sin\\theta$ 时 $J=r$，所以 $\\mathrm{d}x\\mathrm{d}y=r\\,\\mathrm{d}r\\mathrm{d}\\theta$。</u>",
      tags: ["重积分", "换元法", "雅可比行列式"]
    },
    {
      id: "calc-lsi-def-divergence-curl",
      chapterId: "line-surface-integral",
      type: "definition",
      title: "散度与旋度",
      statement: "设向量场 $\\vec{A}=(P,Q,R)$，其中 $P,Q,R$ 有连续偏导数，则：<ul><li><strong>散度（标量）：</strong>$\\operatorname{div}\\vec{A}=\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}$</li><li><strong>旋度（向量）：</strong>$\\operatorname{rot}\\vec{A}=\\begin{vmatrix}\\vec{i} & \\vec{j} & \\vec{k}\\\\[2pt] \\dfrac{\\partial}{\\partial x} & \\dfrac{\\partial}{\\partial y} & \\dfrac{\\partial}{\\partial z}\\\\[2pt] P & Q & R\\end{vmatrix}$</li></ul>",
      explanation: "记忆方式：<strong>散度是「点乘」，旋度是「叉乘」</strong>，都可借助算子 $\\nabla=\\left(\\dfrac{\\partial}{\\partial x},\\dfrac{\\partial}{\\partial y},\\dfrac{\\partial}{\\partial z}\\right)$ 写成 $\\operatorname{div}\\vec A=\\nabla\\cdot\\vec A$、$\\operatorname{rot}\\vec A=\\nabla\\times\\vec A$。<u>散度是标量（衡量该点是「源」还是「汇」），旋度是向量（衡量该点的旋转趋势）</u>。两个重要结论：$\\operatorname{div}(\\operatorname{rot}\\vec A)=0$，$\\operatorname{rot}(\\operatorname{grad}u)=\\vec 0$。高斯公式即 $\\oiint_\\Sigma \\vec A\\cdot\\mathrm{d}\\vec S=\\iiint_\\Omega \\operatorname{div}\\vec A\\,\\mathrm{d}V$，斯托克斯公式即 $\\oint_\\Gamma \\vec A\\cdot\\mathrm{d}\\vec r=\\iint_\\Sigma \\operatorname{rot}\\vec A\\cdot\\mathrm{d}\\vec S$。",
      tags: ["曲面积分", "散度", "旋度", "向量场"]
    }
  ]
});
