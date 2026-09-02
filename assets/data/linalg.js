registerSubject({
  id: "linalg",
  name: "线性代数",
  color: "#7c4a6e",
  chapters: [
    { id: "determinant", name: "行列式", order: 1 },
    { id: "matrix", name: "矩阵及其运算", order: 2 },
    { id: "vector-space", name: "向量组的线性相关性与秩", order: 3 },
    { id: "linear-equations", name: "线性方程组", order: 4 },
    { id: "eigen", name: "特征值、特征向量与相似对角化", order: 5 },
    { id: "quadratic-form", name: "二次型", order: 6 }
  ],
  items: [
    {
      id: "la-det-def-n-order",
      chapterId: "determinant",
      type: "definition",
      title: "n 阶行列式的定义",
      statement: "$n$ 阶行列式 $D=\\begin{vmatrix}a_{11}&a_{12}&\\cdots&a_{1n}\\\\a_{21}&a_{22}&\\cdots&a_{2n}\\\\\\vdots&\\vdots&&\\vdots\\\\a_{n1}&a_{n2}&\\cdots&a_{nn}\\end{vmatrix}=\\sum_{}(-1)^{\\tau(p_1p_2\\cdots p_n)}a_{1p_1}a_{2p_2}\\cdots a_{np_n}$，其中求和遍历 $1,2,\\cdots,n$ 的所有排列 $p_1p_2\\cdots p_n$，$\\tau(p_1p_2\\cdots p_n)$ 为该排列的<strong>逆序数</strong>。",
      explanation: "共有 $n!$ 项，每项是取自不同行不同列的 $n$ 个元素之积，符号由排列的逆序数奇偶性决定：<strong>逆序数为偶数取正号，奇数取负号</strong>。二、三阶行列式的对角线法则是此定义在 $n=2,3$ 时的特例。",
      tags: ["行列式", "定义", "逆序数"]
    },
    {
      id: "la-det-prop-transpose",
      chapterId: "determinant",
      type: "property",
      title: "行列式的转置性质",
      statement: "行列式与它的<strong>转置行列式</strong>相等，即 $D=D^{T}$。",
      explanation: "这条性质说明行列式中<strong>行与列的地位是对称的</strong>，凡是对行成立的性质，对列也同样成立（如按行展开与按列展开等价）。",
      tags: ["行列式", "转置", "性质"]
    },
    {
      id: "la-det-prop-swap-rows",
      chapterId: "determinant",
      type: "property",
      title: "互换两行（列）行列式变号",
      statement: "<ul><li><strong>互换两行（列）：</strong>行列式变号。</li><li><strong>两行（列）完全相同：</strong>行列式等于零。</li></ul>",
      explanation: "推论：若某两行<strong>成比例</strong>，则行列式为零。这是判断行列式为零的常用捷径，也是后续证明向量组线性相关的行列式判据的基础。",
      tags: ["行列式", "性质", "换行变号"]
    },
    {
      id: "la-det-prop-scalar",
      chapterId: "determinant",
      type: "property",
      title: "行列式的数乘性质",
      statement: "<ul><li><strong>单行（列）提取公因子：</strong>用数 $k$ 乘行列式某一行（列）的所有元素，等于用 $k$ 乘此行列式，即公因子可以提到行列式符号外面。</li><li><strong>整体数乘：</strong>行列式的每一行（列）都乘同一个数 $k$，等于用 $k^n$ 乘此行列式（$n$ 为阶数）。</li></ul>",
      explanation: "<strong>易错点</strong>：$|kA|=k^n|A|$ 而不是 $k|A|$，因为 $n$ 行都要各提出一个 $k$。这是数乘矩阵行列式公式的来源。",
      tags: ["行列式", "性质", "数乘"]
    },
    {
      id: "la-det-prop-additive-row",
      chapterId: "determinant",
      type: "property",
      title: "行列式按行（列）可加性",
      statement: "若行列式某一行（列）的元素都是<strong>两数之和</strong>，例如第 $i$ 行为 $a_{i1}+a_{i1}',\\ a_{i2}+a_{i2}',\\ \\cdots$，则该行列式等于<strong>两个行列式之和</strong>，这两个行列式分别以 $a_{i1},a_{i2},\\cdots$ 和 $a_{i1}',a_{i2}',\\cdots$ 为第 $i$ 行，其余各行与原行列式相同。",
      explanation: "注意这是<strong>逐行（列）可加</strong>，而不是整体可加，即一般 $|A+B|\\neq|A|+|B|$。常用于把行列式拆成若干个简单行列式之和求解。",
      tags: ["行列式", "性质", "可加性"]
    },
    {
      id: "la-det-prop-add-multiple",
      chapterId: "determinant",
      type: "property",
      title: "倍加行（列）行列式不变",
      statement: "把行列式的某一行（列）的各元素乘以同一数 $k$ 加到另一行（列）对应的元素上去，<strong>行列式的值不变</strong>。",
      explanation: "这是化行列式为上（下）三角形从而利用对角线乘积求值的核心工具，与矩阵<strong>初等行变换中的第三种变换</strong>完全对应。",
      tags: ["行列式", "性质", "倍加变换"]
    },
    {
      id: "la-det-def-minor-cofactor",
      chapterId: "determinant",
      type: "definition",
      title: "余子式与代数余子式",
      statement: "在 $n$ 阶行列式中，划去元素 $a_{ij}$ 所在的第 $i$ 行和第 $j$ 列后，余下的 $n-1$ 阶行列式称为 $a_{ij}$ 的<strong>余子式</strong>，记作 $M_{ij}$；称 $A_{ij}=(-1)^{i+j}M_{ij}$ 为 $a_{ij}$ 的<strong>代数余子式</strong>。",
      explanation: "代数余子式只比余子式多一个符号因子 $(-1)^{i+j}$，符号取决于<strong>$i+j$ 的奇偶性</strong>。伴随矩阵、行列式按行展开定理都建立在代数余子式基础上。",
      tags: ["行列式", "余子式", "代数余子式"]
    },
    {
      id: "la-det-thm-expansion",
      chapterId: "determinant",
      type: "theorem",
      title: "行列式按行（列）展开定理",
      statement: "行列式等于它的任一行（列）的各元素与其对应的<strong>代数余子式乘积之和</strong>，即 $D=a_{i1}A_{i1}+a_{i2}A_{i2}+\\cdots+a_{in}A_{in}$（按第 $i$ 行展开），或 $D=a_{1j}A_{1j}+a_{2j}A_{2j}+\\cdots+a_{nj}A_{nj}$（按第 $j$ 列展开）。",
      explanation: "常用于含较多零元素的行列式降阶计算，应选取<strong>零元素最多的行（列）</strong>展开以简化计算。这是计算高阶行列式的基本方法之一。",
      tags: ["行列式", "定理", "展开"]
    },
    {
      id: "la-det-prop-zero-sum",
      chapterId: "determinant",
      type: "property",
      title: "异行异列展开式的性质",
      statement: "行列式某一行（列）的元素与另一行（列）对应元素的代数余子式乘积之和<strong>等于零</strong>，即 $a_{i1}A_{j1}+a_{i2}A_{j2}+\\cdots+a_{in}A_{jn}=0\\ (i\\neq j)$。",
      explanation: "结合展开定理可统一写成 $\\sum_{k=1}^{n}a_{ik}A_{jk}=D\\delta_{ij}$（$\\delta_{ij}$ 为克罗内克记号），这是证明 $A A^{*}=A^{*}A=|A|E$ 的<strong>关键依据</strong>。",
      tags: ["行列式", "性质", "代数余子式"]
    },
    {
      id: "la-det-thm-cramer",
      chapterId: "determinant",
      type: "theorem",
      title: "克拉默法则",
      statement: "若线性方程组 $Ax=b$ 的系数行列式 $D=|A|\\neq 0$，则该方程组有<strong>唯一解</strong>，且 $x_j=\\dfrac{D_j}{D}\\ (j=1,2,\\cdots,n)$，其中 $D_j$ 是把系数行列式 $D$ 中第 $j$ 列元素替换为常数项 $b$ 所得到的行列式。",
      explanation: "<ul><li><strong>适用条件：</strong>仅适用于方程个数等于未知量个数（系数矩阵为方阵）且 $D\\neq0$ 的情形。</li><li><strong>$D=0$ 时：</strong>方程组要么无解要么有无穷多解，此时不能用克拉默法则求解。</li><li><strong>齐次方程组：</strong>$Ax=0$ 只有零解当且仅当 $D\\neq0$。</li></ul>",
      tags: ["行列式", "定理", "克拉默法则", "线性方程组"]
    },
    {
      id: "la-det-prop-block-diag",
      chapterId: "determinant",
      type: "property",
      title: "分块（准）对角行列式的乘法",
      statement: "设 $D=\\begin{vmatrix}A&O\\\\O&B\\end{vmatrix}$，其中 $A,B$ 分别为 $k$ 阶、$n-k$ 阶方阵，则 <strong>$D=|A|\\cdot|B|$</strong>；对 $D=\\begin{vmatrix}A&O\\\\C&B\\end{vmatrix}$ 或 $\\begin{vmatrix}A&C\\\\O&B\\end{vmatrix}$ 同样有 $D=|A|\\cdot|B|$。",
      explanation: "此性质是分块矩阵求行列式的常用工具，尤其在求由若干小矩阵拼成的大矩阵的行列式时非常高效，可<strong>大幅降阶</strong>。",
      tags: ["行列式", "分块矩阵", "性质"]
    },
    {
      id: "la-det-prop-vandermonde",
      chapterId: "determinant",
      type: "property",
      title: "范德蒙德行列式",
      statement: "$V_n=\\begin{vmatrix}1&1&\\cdots&1\\\\x_1&x_2&\\cdots&x_n\\\\x_1^2&x_2^2&\\cdots&x_n^2\\\\\\vdots&\\vdots&&\\vdots\\\\x_1^{n-1}&x_2^{n-1}&\\cdots&x_n^{n-1}\\end{vmatrix}=\\prod_{1\\le j<i\\le n}(x_i-x_j)$。",
      explanation: "范德蒙德行列式等于所有下标差 $(x_i-x_j)$（$i>j$）的连乘积。它<strong>为零当且仅当 $x_1,x_2,\\cdots,x_n$ 中至少有两个相等</strong>，是考研中判断特征值互异、矩阵可对角化等问题的常用工具。",
      tags: ["行列式", "范德蒙德", "性质"]
    },
    {
      id: "la-det-prop-det-mult",
      chapterId: "determinant",
      type: "property",
      title: "行列式乘法定理",
      statement: "设 $A,B$ 都是 $n$ 阶方阵，则 <strong>$|AB|=|A|\\cdot|B|$</strong>。",
      explanation: "由此可推出 $|A^k|=|A|^k$，$|A^{-1}|=|A|^{-1}$（$A$ 可逆时）。<strong>注意</strong>一般情况下 $|A+B|\\neq|A|+|B|$，加法没有类似的简单公式。",
      tags: ["行列式", "性质", "乘法定理"]
    },
    {
      id: "la-det-prop-triangular",
      chapterId: "determinant",
      type: "property",
      title: "上（下）三角行列式的值",
      statement: "上三角行列式、下三角行列式以及对角行列式的值都等于<strong>主对角线上各元素的乘积</strong>，即 $\\begin{vmatrix}a_{11}&&&\\\\a_{21}&a_{22}&&\\\\\\vdots&\\vdots&\\ddots&\\\\a_{n1}&a_{n2}&\\cdots&a_{nn}\\end{vmatrix}=a_{11}a_{22}\\cdots a_{nn}$。",
      explanation: "这是行列式计算的最终目标形式：通过倍加行变换把行列式化为<strong>上三角形</strong>，再直接取对角线元素乘积，是计算数值行列式最常用的方法。",
      tags: ["行列式", "三角行列式", "性质"]
    },
    {
      id: "la-det-def-adjoint",
      chapterId: "determinant",
      type: "definition",
      title: "伴随矩阵的定义",
      statement: "设 $A=(a_{ij})$ 为 $n$ 阶方阵，$A_{ij}$ 为 $a_{ij}$ 的代数余子式，则矩阵 $A^{*}=\\begin{pmatrix}A_{11}&A_{21}&\\cdots&A_{n1}\\\\A_{12}&A_{22}&\\cdots&A_{n2}\\\\\\vdots&\\vdots&&\\vdots\\\\A_{1n}&A_{2n}&\\cdots&A_{nn}\\end{pmatrix}$ 称为 $A$ 的<strong>伴随矩阵</strong>。",
      explanation: "<strong>易错点</strong>：伴随矩阵是代数余子式按行排列后再转置，即 $(A^{*})_{ij}=A_{ji}$（下标是对换的）。它满足 $AA^{*}=A^{*}A=|A|E$，是求逆矩阵公式的核心构件。",
      tags: ["行列式", "伴随矩阵", "定义"]
    },
    {
      id: "la-det-thm-A-Astar",
      chapterId: "determinant",
      type: "theorem",
      title: "A 与伴随矩阵的基本关系式",
      statement: "对任意 $n$ 阶方阵 $A$，恒有 <u>$AA^{*}=A^{*}A=|A|E$</u>。",
      explanation: "这是行列式按行（列）展开定理与异行异列展开式性质的矩阵形式统一表达。由此可得：当 $|A|\\neq0$ 时，<strong>$A^{-1}=\\dfrac{1}{|A|}A^{*}$</strong>，$|A^{*}|=|A|^{n-1}$（$n\\ge2$）。",
      tags: ["行列式", "伴随矩阵", "定理"]
    },
    {
      id: "la-det-prop-adjoint-rank",
      chapterId: "determinant",
      type: "property",
      title: "伴随矩阵的秩",
      statement: "设 $A$ 为 $n$ 阶方阵，则 $r(A^{*})=\\begin{cases}n, & r(A)=n\\\\1, & r(A)=n-1\\\\0, & r(A)<n-1\\end{cases}$。",
      explanation: "记忆要点：<ul><li><strong>$r(A)=n$（满秩）：</strong>伴随矩阵也满秩。</li><li><strong>$r(A)=n-1$：</strong>即 $|A|=0$ 但存在非零的 $n-1$ 阶子式，此时伴随矩阵秩为 1。</li><li><strong>$r(A)<n-1$：</strong>所有 $n-1$ 阶子式都为零，伴随矩阵为零矩阵。</li></ul>这是考研高频考点。",
      tags: ["行列式", "伴随矩阵", "秩"]
    },
    {
      id: "la-det-prop-block-swap",
      chapterId: "determinant",
      type: "property",
      title: "分块矩阵行列式的换块公式",
      statement: "设 $A$ 为 $m$ 阶方阵，$B$ 为 $n$ 阶方阵，则 <strong>$\\begin{vmatrix}O&A\\\\B&O\\end{vmatrix}=(-1)^{mn}|A||B|$</strong>。",
      explanation: "可以通过反复交换行（每次交换相邻两行使正负号变化，共需交换 $mn$ 次相邻对换）严格证明该公式，是分块行列式计算中的常考公式，需要结合具体的 $m,n$ <strong>判断符号</strong>。",
      tags: ["行列式", "分块矩阵", "性质"]
    },
    {
      id: "la-det-def-inversion-number",
      chapterId: "determinant",
      type: "definition",
      title: "排列的逆序数",
      statement: "对 $1,2,\\cdots,n$ 的一个排列 $p_1p_2\\cdots p_n$，若前面某数大于后面某数，即 $p_i>p_j$ 但 $i<j$，则称这两个数构成一个<strong>逆序</strong>。一个排列中逆序的总数称为该排列的<strong>逆序数</strong>，记作 $\\tau(p_1p_2\\cdots p_n)$。",
      explanation: "逆序数为偶数的排列称为<strong>偶排列</strong>，为奇数的称为<strong>奇排列</strong>。行列式展开式中每一项的符号由对应排列的奇偶性决定，这是理解 $n$ 阶行列式定义的基础概念。",
      tags: ["行列式", "排列", "逆序数"]
    },
    {
      id: "la-det-prop-diag-multiply",
      chapterId: "determinant",
      type: "property",
      title: "行列式主对角元与代数余子式的加权和",
      statement: "$n$ 阶行列式 $D$ 中所有元素的代数余子式之和等于把 $D$ 中每个元素都换成 $1$ 后所得行列式，特别地<strong>各行元素与自身代数余子式乘积之和均等于 $D$</strong>：$\\sum_{k=1}^n a_{ik}A_{ik}=D$（对任意固定的 $i$）。",
      explanation: "这条与“异行异列展开式为零”的性质<strong>相互补充</strong>，是按行/列展开定理的另一表述角度，常在证明题中配合克罗内克记号统一使用：$\\sum_k a_{ik}A_{jk}=D\\delta_{ij}$。",
      tags: ["行列式", "展开定理", "性质"]
    },
    {
      id: "la-mat-def-matrix",
      chapterId: "matrix",
      type: "definition",
      title: "矩阵的定义",
      statement: "由 $m\\times n$ 个数 $a_{ij}\\ (i=1,\\cdots,m;\\ j=1,\\cdots,n)$ 排成的 $m$ 行 $n$ 列的数表 $A=\\begin{pmatrix}a_{11}&a_{12}&\\cdots&a_{1n}\\\\a_{21}&a_{22}&\\cdots&a_{2n}\\\\\\vdots&\\vdots&&\\vdots\\\\a_{m1}&a_{m2}&\\cdots&a_{mn}\\end{pmatrix}$ 称为 <strong>$m\\times n$ 矩阵</strong>，简记为 $A=(a_{ij})_{m\\times n}$。",
      explanation: "当 $m=n$ 时称为 $n$ 阶方阵。矩阵与行列式的本质区别：<strong>矩阵是数表，行列式是一个数（值）</strong>，只有方阵才能取行列式。",
      tags: ["矩阵", "定义", "基本概念"]
    },
    {
      id: "la-mat-def-special",
      chapterId: "matrix",
      type: "definition",
      title: "几类特殊矩阵",
      statement: "<ul><li><strong>零矩阵：</strong>元素全为零的矩阵，记作 $O$。</li><li><strong>单位矩阵：</strong>主对角线元素为 $1$、其余元素为 $0$ 的 $n$ 阶方阵，记作 $E$（或 $I$）。</li><li><strong>对角矩阵：</strong>主对角线以外元素全为零的方阵，记作 $\\mathrm{diag}(\\lambda_1,\\lambda_2,\\cdots,\\lambda_n)$。</li><li><strong>对称矩阵与反对称矩阵：</strong>满足 $A^{T}=A$ 的方阵称为对称矩阵，满足 $A^{T}=-A$ 的方阵称为反对称矩阵。</li></ul>",
      explanation: "单位矩阵在矩阵乘法中的作用类似数 $1$：$AE=EA=A$。<strong>反对称矩阵主对角线元素必为 $0$</strong>（因为 $a_{ii}=-a_{ii}$）。这些特殊矩阵在考研题目条件设置中出现频率极高。",
      tags: ["矩阵", "特殊矩阵", "定义"]
    },
    {
      id: "la-mat-prop-operations",
      chapterId: "matrix",
      type: "property",
      title: "矩阵加法与数乘的运算律",
      statement: "矩阵加法满足<strong>交换律</strong> $A+B=B+A$ 和<strong>结合律</strong> $(A+B)+C=A+(B+C)$；数乘满足 $k(A+B)=kA+kB$，$(k+l)A=kA+lA$，$(kl)A=k(lA)$，$1\\cdot A=A$（$A,B,C$ 为同型矩阵，$k,l$ 为数）。",
      explanation: "矩阵加法、数乘的运算律与向量的线性运算完全类似，这也是全体 $m\\times n$ 矩阵构成一个<strong>线性空间</strong>的代数基础。",
      tags: ["矩阵", "加法", "数乘", "性质"]
    },
    {
      id: "la-mat-prop-multiply-noncommute",
      chapterId: "matrix",
      type: "property",
      title: "矩阵乘法的运算律与不可交换性",
      statement: "矩阵乘法满足<strong>结合律</strong> $(AB)C=A(BC)$ 和<strong>分配律</strong> $A(B+C)=AB+AC$，$(B+C)A=BA+CA$，但要特别注意几条“不成立”：<ul><li><strong>不满足交换律：</strong>通常 $AB\\neq BA$。</li><li><strong>没有零因子律：</strong>由 $AB=O$ 一般不能推出 $A=O$ 或 $B=O$。</li><li><strong>没有消去律：</strong>由 $AB=AC$ 且 $A\\neq O$ 一般也不能推出 $B=C$（除非 $A$ 可逆）。</li></ul>",
      explanation: "这是考研中最容易踩坑的一组结论：矩阵乘法没有交换律、没有消去律，零因子存在（可能 $AB=O$ 但 $A,B$ 均非零）。做题时凡涉及矩阵方程化简，<strong>必须先判断矩阵是否可逆再决定能否两边消去</strong>。",
      tags: ["矩阵", "乘法", "性质", "易错点"]
    },
    {
      id: "la-mat-prop-transpose",
      chapterId: "matrix",
      type: "property",
      title: "矩阵转置的运算律",
      statement: "<ul><li>$(A^{T})^{T}=A$</li><li>$(A+B)^{T}=A^{T}+B^{T}$</li><li>$(kA)^{T}=kA^{T}$</li><li><strong>$(AB)^{T}=B^{T}A^{T}$</strong>（乘积转置要反序）</li></ul>",
      explanation: "重点记忆乘积转置要“<strong>反序</strong>”：$(AB)^{T}=B^{T}A^{T}$，多个矩阵相乘时同理，如 $(ABC)^{T}=C^{T}B^{T}A^{T}$。这一反序规律与逆矩阵、伴随矩阵的乘积公式规律一致，便于统一记忆。",
      tags: ["矩阵", "转置", "性质"]
    },
    {
      id: "la-mat-def-invertible",
      chapterId: "matrix",
      type: "definition",
      title: "可逆矩阵的定义",
      statement: "设 $A$ 为 $n$ 阶方阵，若存在 $n$ 阶方阵 $B$，使得 $AB=BA=E$，则称 $A$ 是<strong>可逆矩阵</strong>（非奇异矩阵），并称 $B$ 为 $A$ 的<strong>逆矩阵</strong>，记作 $A^{-1}$。",
      explanation: "逆矩阵若存在则<strong>唯一</strong>。只有方阵才可能可逆，非方阵不存在逆矩阵的概念。判断可逆性最常用的等价条件是 <strong>$|A|\\neq0$</strong>。",
      tags: ["矩阵", "逆矩阵", "定义"]
    },
    {
      id: "la-mat-thm-invertible-iff",
      chapterId: "matrix",
      type: "theorem",
      title: "矩阵可逆的充要条件与求逆公式",
      statement: "$n$ 阶方阵 $A$ 可逆的<strong>充要条件</strong>是 $|A|\\neq0$（此时也称 $A$ 为满秩矩阵），且 $A^{-1}=\\dfrac{1}{|A|}A^{*}$，其中 $A^{*}$ 为 $A$ 的伴随矩阵。",
      explanation: "该充要条件是判断可逆性最基本、最直接的方法。与之等价的条件还包括：<ul><li>$r(A)=n$（满秩）</li><li>$A$ 的行（列）向量组线性无关</li><li>齐次方程组 $Ax=0$ 只有零解</li><li>$0$ 不是 $A$ 的特征值</li></ul>这些等价条件贯穿线代各章，是考研的高频考点串联点。",
      tags: ["矩阵", "逆矩阵", "定理", "可逆"]
    },
    {
      id: "la-mat-prop-inverse-ops",
      chapterId: "matrix",
      type: "property",
      title: "逆矩阵的运算性质",
      statement: "设 $A,B$ 为同阶可逆矩阵，$k\\neq0$，则：<ul><li>$A^{-1}$ 可逆，且 $(A^{-1})^{-1}=A$</li><li>$AB$ 可逆，且 <strong>$(AB)^{-1}=B^{-1}A^{-1}$</strong></li><li>$kA$ 可逆，且 $(kA)^{-1}=\\dfrac1k A^{-1}$</li><li>$A^{T}$ 可逆，且 $(A^{T})^{-1}=(A^{-1})^{T}$</li><li>$|A^{-1}|=|A|^{-1}$</li></ul>",
      explanation: "同样注意“<strong>反序</strong>”规律：$(AB)^{-1}=B^{-1}A^{-1}$，与转置、伴随的乘积公式保持一致的记忆方式：转置、求逆、伴随对乘积都要反序。",
      tags: ["矩阵", "逆矩阵", "性质"]
    },
    {
      id: "la-mat-def-elementary-transform",
      chapterId: "matrix",
      type: "definition",
      title: "矩阵的初等变换",
      statement: "下列三种变换称为矩阵的<strong>初等行（列）变换</strong>：<ul><li>对调两行（列）</li><li>以非零常数 $k$ 乘某一行（列）的所有元素</li><li>把某一行（列）的所有元素乘以数 $k$ 加到另一行（列）对应元素上去</li></ul>",
      explanation: "初等变换是求矩阵的秩、判断线性相关性、解线性方程组、求逆矩阵的通用底层工具。对矩阵作初等行变换<strong>不改变方程组的解，也不改变矩阵的秩</strong>。",
      tags: ["矩阵", "初等变换", "定义"]
    },
    {
      id: "la-mat-def-elementary-matrix",
      chapterId: "matrix",
      type: "definition",
      title: "初等矩阵",
      statement: "由单位矩阵 $E$ 经过一次初等变换得到的矩阵称为<strong>初等矩阵</strong>。三种初等变换对应三种初等矩阵：<strong>倍乘初等矩阵</strong>、<strong>对换初等矩阵</strong>、<strong>倍加初等矩阵</strong>。",
      explanation: "<ul><li><strong>初等行变换：</strong>相当于在 $A$ 的左边乘以相应的初等矩阵。</li><li><strong>初等列变换：</strong>相当于在 $A$ 的右边乘以相应的初等矩阵。</li></ul>初等矩阵都可逆，且其逆仍是同类型的初等矩阵。",
      tags: ["矩阵", "初等矩阵", "定义"]
    },
    {
      id: "la-mat-thm-inverse-by-elementary",
      chapterId: "matrix",
      type: "theorem",
      title: "用初等行变换求逆矩阵",
      statement: "若 $A$ 可逆，则存在有限个初等矩阵 $P_1,P_2,\\cdots,P_s$，使 $P_s\\cdots P_2P_1A=E$；对分块矩阵 $(A\\ \\vdots\\ E)$ 施以一系列初等行变换，当左半部分化为 $E$ 时，右半部分就化为 $A^{-1}$，即 <strong>$(A\\ \\vdots\\ E)\\to(E\\ \\vdots\\ A^{-1})$</strong>。",
      explanation: "这是求数值矩阵逆矩阵<strong>最常用、最高效的方法</strong>，尤其适合阶数较高（$\\ge3$ 阶）的矩阵，比伴随矩阵法计算量小得多。",
      tags: ["矩阵", "初等变换", "逆矩阵", "定理"]
    },
    {
      id: "la-mat-def-rank",
      chapterId: "matrix",
      type: "definition",
      title: "矩阵秩的定义",
      statement: "在 $m\\times n$ 矩阵 $A$ 中，若存在某个 $r$ 阶子式不为零，而所有 $r+1$ 阶子式（如果存在）全为零，则称 $r$ 为矩阵 $A$ 的<strong>秩</strong>，记作 $r(A)$。规定零矩阵的秩为 $0$。",
      explanation: "矩阵的秩是刻画矩阵“有效行/列数”的核心不变量，$0\\le r(A)\\le\\min(m,n)$。矩阵的秩<strong>在初等变换下保持不变</strong>，这是通过化阶梯形求秩的理论依据。",
      tags: ["矩阵", "秩", "定义"]
    },
    {
      id: "la-mat-thm-rank-elementary-invariant",
      chapterId: "matrix",
      type: "theorem",
      title: "矩阵的秩在初等变换下不变",
      statement: "初等变换不改变矩阵的秩；任意矩阵 $A$ 都可经过有限次初等行变换化为行阶梯形矩阵，<strong>非零行的行数就等于 $r(A)$</strong>。",
      explanation: "这是求矩阵秩的标准方法：<strong>把矩阵化为行阶梯形，数一数非零行的个数即为秩</strong>。同时也是求向量组秩、极大无关组、判定线性方程组解的存在性的通用计算手段。",
      tags: ["矩阵", "秩", "初等变换", "定理"]
    },
    {
      id: "la-mat-prop-rank-inequalities",
      chapterId: "matrix",
      type: "property",
      title: "矩阵秩的常用不等式",
      statement: "<ul><li>$0\\le r(A)\\le\\min(m,n)$</li><li>$r(A^{T})=r(A)$</li><li>$r(A+B)\\le r(A)+r(B)$</li><li><strong>$r(AB)\\le\\min\\{r(A),r(B)\\}$</strong></li><li>若 $A$ 为 $m\\times n$ 矩阵，$P,Q$ 分别为 $m,n$ 阶可逆矩阵，则 $r(PAQ)=r(A)$</li></ul>",
      explanation: "此外还有<strong>西尔维斯特（Sylvester）不等式</strong>：若 $AB=O$（$A$ 为 $m\\times n$，$B$ 为 $n\\times s$），则 $r(A)+r(B)\\le n$。这些不等式是证明题中估计秩的取值范围的核心工具，考研中常结合具体矩阵方程综合考查。",
      tags: ["矩阵", "秩", "不等式", "性质"]
    },
    {
      id: "la-mat-def-block-matrix",
      chapterId: "matrix",
      type: "definition",
      title: "分块矩阵及其运算",
      statement: "用若干条纵线和横线把一个矩阵分成若干个小矩阵，每个小矩阵称为该矩阵的<strong>子块</strong>，以子块为元素的形式上的矩阵称为<strong>分块矩阵</strong>。分块矩阵的加法、数乘、乘法在分块方式相容的前提下，与普通矩阵运算规则完全一致（把子块当作元素运算）。",
      explanation: "分块矩阵乘法要求前一个矩阵的列分块方式与后一个矩阵的行分块方式<strong>一致（“对齐”）</strong>，否则子块无法相乘。分块技巧是处理高阶矩阵、抽象矩阵证明题的重要工具。",
      tags: ["矩阵", "分块矩阵", "定义"]
    },
    {
      id: "la-mat-prop-block-diag-inverse",
      chapterId: "matrix",
      type: "property",
      title: "分块对角矩阵的逆矩阵",
      statement: "设 $A=\\begin{pmatrix}A_1&&\\\\&A_2&\\\\&&\\ddots\\\\&&&A_s\\end{pmatrix}$ 为分块对角矩阵，其中各 $A_i$ 均为可逆方阵，则 <strong>$A$ 可逆</strong>，且 $A^{-1}=\\begin{pmatrix}A_1^{-1}&&\\\\&A_2^{-1}&\\\\&&\\ddots\\\\&&&A_s^{-1}\\end{pmatrix}$。",
      explanation: "分块对角矩阵的行列式等于各子块行列式之积：$|A|=|A_1||A_2|\\cdots|A_s|$；求逆时<strong>只需对每个子块分别求逆</strong>，再按原位置排列，极大简化了高阶“分块对角型”矩阵的求逆计算。",
      tags: ["矩阵", "分块矩阵", "逆矩阵", "性质"]
    },
    {
      id: "la-mat-prop-power-symmetric",
      chapterId: "matrix",
      type: "property",
      title: "对称矩阵与矩阵方幂的性质",
      statement: "<ul><li><strong>两对称矩阵之积：</strong>若 $A,B$ 均为 $n$ 阶对称矩阵，则 $AB$ 是对称矩阵的充要条件是 $AB=BA$。</li><li><strong>$AA^{T}$ 与 $A^{T}A$：</strong>对任意矩阵 $A$，$AA^{T}$ 与 $A^{T}A$ 都是对称矩阵。</li><li><strong>方幂：</strong>单位矩阵满足 $E^k=E$，对角矩阵的方幂等于各对角元分别取方幂。</li></ul>",
      explanation: "$AA^T$、$A^TA$ 恒为对称矩阵这一结论在二次型、正交对角化等章节中被频繁使用（如实对称化、协方差矩阵构造）。判断两个对称矩阵乘积是否对称，<strong>只需检验是否可交换</strong>。",
      tags: ["矩阵", "对称矩阵", "性质"]
    },
    {
      id: "la-mat-prop-elementary-not-change-rank",
      chapterId: "matrix",
      type: "property",
      title: "可逆矩阵与秩、线性方程组同解的关系",
      statement: "设 $A$ 为 $m\\times n$ 矩阵，$P$ 为 $m$ 阶可逆矩阵，$Q$ 为 $n$ 阶可逆矩阵，则：<strong>$r(PA)=r(A)$，$r(AQ)=r(A)$</strong>；方程组 $Ax=b$ 与 $PAx=Pb$ <strong>同解</strong>。",
      explanation: "这说明用初等行变换（左乘可逆矩阵）解方程组、化简矩阵<strong>不会改变解集</strong>，是高斯消元法求解线性方程组合法性的理论基础。",
      tags: ["矩阵", "秩", "可逆矩阵", "性质"]
    },
    {
      id: "la-vec-def-linear-combination",
      chapterId: "vector-space",
      type: "definition",
      title: "线性组合与线性表示",
      statement: "给定向量组 $A:\\alpha_1,\\alpha_2,\\cdots,\\alpha_m$，若存在一组数 $k_1,k_2,\\cdots,k_m$，使 $\\beta=k_1\\alpha_1+k_2\\alpha_2+\\cdots+k_m\\alpha_m$，则称 $\\beta$ 是向量组 $A$ 的一个<strong>线性组合</strong>，也称 $\\beta$ 可由向量组 $A$ <strong>线性表示</strong>。",
      explanation: "$\\beta$ 能由 $A$ 线性表示的<strong>充要条件</strong>是方程组 $x_1\\alpha_1+\\cdots+x_m\\alpha_m=\\beta$ 有解，等价于矩阵 $(\\alpha_1,\\cdots,\\alpha_m)$ 的秩等于矩阵 $(\\alpha_1,\\cdots,\\alpha_m,\\beta)$ 的秩。",
      tags: ["向量组", "线性表示", "定义"]
    },
    {
      id: "la-vec-def-linear-dependence",
      chapterId: "vector-space",
      type: "definition",
      title: "向量组线性相关与线性无关的定义",
      statement: "给定向量组 $A:\\alpha_1,\\alpha_2,\\cdots,\\alpha_m$，如果存在<strong>不全为零</strong>的数 $k_1,k_2,\\cdots,k_m$，使得 $k_1\\alpha_1+k_2\\alpha_2+\\cdots+k_m\\alpha_m=0$，则称向量组 $A$ <strong>线性相关</strong>；否则（即只有当 $k_1=k_2=\\cdots=k_m=0$ 时上式才成立），称向量组 $A$ <strong>线性无关</strong>。",
      explanation: "记忆要点：判断线性相关性本质是看齐次方程组 $x_1\\alpha_1+\\cdots+x_m\\alpha_m=0$ 是否有非零解。<ul><li>含零向量的向量组一定线性相关。</li><li>单个非零向量线性无关。</li><li>两个向量线性相关等价于对应分量成比例（共线）。</li></ul>",
      diagram: `<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="120" r="2" fill="currentColor" opacity="0.5"/>
        <line x1="60" y1="120" x2="100" y2="70" stroke="currentColor" stroke-width="2"/>
        <polygon points="100,70 90,74 95,63" fill="currentColor"/>
        <line x1="60" y1="120" x2="130" y2="35" stroke="#3b82f6" stroke-width="2"/>
        <polygon points="130,35 118,41 123,29" fill="#3b82f6"/>
        <text x="55" y="140" font-size="11" fill="currentColor" opacity="0.75">线性相关（共线）</text>

        <circle cx="230" cy="120" r="2" fill="currentColor" opacity="0.5"/>
        <line x1="230" y1="120" x2="270" y2="60" stroke="currentColor" stroke-width="2"/>
        <polygon points="270,60 259,64 264,52" fill="currentColor"/>
        <line x1="230" y1="120" x2="300" y2="95" stroke="#3b82f6" stroke-width="2"/>
        <polygon points="300,95 287,92 291,82" fill="#3b82f6"/>
        <text x="232" y="140" font-size="11" fill="currentColor" opacity="0.75">线性无关</text>
      </svg>`,
      diagramCaption: "两个向量线性相关 ⟺ 共线（左）；不共线则线性无关（右）——低维情形的直观图像",
      tags: ["向量组", "线性相关", "线性无关", "定义"]
    },
    {
      id: "la-vec-thm-dependence-rank",
      chapterId: "vector-space",
      type: "theorem",
      title: "线性相关性与矩阵秩的关系",
      statement: "向量组 $\\alpha_1,\\alpha_2,\\cdots,\\alpha_m$ 线性相关的充要条件是由这些向量为列构成的矩阵 $A=(\\alpha_1,\\alpha_2,\\cdots,\\alpha_m)$ 的秩 <strong>$r(A)<m$</strong>；线性无关的充要条件是 <strong>$r(A)=m$</strong>。特别地，当 $m=n$（向量个数等于维数）时，$\\alpha_1,\\cdots,\\alpha_n$ 线性无关的充要条件是 $|A|\\neq0$。",
      explanation: "这是判断线性相关性的核心计算方法：<strong>把向量组按列（或行）排成矩阵，通过初等变换求秩，与向量个数比较</strong>。这一定理把“线性相关性”这一代数概念转化为可直接计算的“矩阵秩”问题。",
      tags: ["向量组", "线性相关", "秩", "定理"]
    },
    {
      id: "la-vec-thm-more-vectors-dependent",
      chapterId: "vector-space",
      type: "theorem",
      title: "向量个数超过维数必相关",
      statement: "若向量组 $\\alpha_1,\\alpha_2,\\cdots,\\alpha_m$ 中每个向量都是 $n$ 维向量，且 $m>n$，则该向量组<strong>必线性相关</strong>。特别地，$n+1$ 个 $n$ 维向量一定线性相关。",
      explanation: "这是因为 $r(A)\\le n<m$，秩必小于向量个数。此结论常用于快速判断“<strong>个数大于维数</strong>”的向量组一定相关，无需具体计算。",
      tags: ["向量组", "线性相关", "定理"]
    },
    {
      id: "la-vec-thm-partial-whole",
      chapterId: "vector-space",
      type: "theorem",
      title: "部分相关则整体相关；整体无关则部分无关",
      statement: "<ul><li><strong>部分相关 ⟹ 整体相关：</strong>若向量组的一个部分组线性相关，则整个向量组线性相关。</li><li><strong>整体无关 ⟹ 部分无关：</strong>若整个向量组线性无关，则它的任何部分组都线性无关。</li><li><strong>无关组增加分量：</strong>若向量组线性无关，把每个向量都增加若干个分量后得到的新向量组仍线性无关。</li><li><strong>相关组减少分量：</strong>若向量组线性相关，去掉某些分量后得到的向量组不一定相关。</li></ul>",
      explanation: "这组结论常用于证明题中的“化简”：要证明整体线性无关，只需说明其任意部分组线性无关不够，但要证明整体相关，<strong>只需找出其中一个相关的部分组即可</strong>。",
      tags: ["向量组", "线性相关", "定理"]
    },
    {
      id: "la-vec-def-max-independent-set",
      chapterId: "vector-space",
      type: "definition",
      title: "极大线性无关组的定义",
      statement: "设向量组 $A$ 中有一个部分组 $A_0:\\alpha_{i_1},\\alpha_{i_2},\\cdots,\\alpha_{i_r}$ 满足：<ul><li>$A_0$ <strong>线性无关</strong>；</li><li>向量组 $A$ 中任意一个向量都可由 $A_0$ 线性表示（等价地，向量组 $A$ 中再任取一个向量加入 $A_0$ 都线性相关）；</li></ul>则称 $A_0$ 是向量组 $A$ 的一个<strong>极大线性无关组</strong>。",
      explanation: "极大无关组不唯一，但其中所含向量的<strong>个数是唯一确定的</strong>，这个个数就是向量组的秩。极大无关组与原向量组等价（可以相互线性表示），这是“用少数向量代表整个向量组”的核心思想。",
      tags: ["向量组", "极大无关组", "定义"]
    },
    {
      id: "la-vec-def-vector-group-rank",
      chapterId: "vector-space",
      type: "definition",
      title: "向量组的秩",
      statement: "向量组的极大线性无关组所含向量的个数，称为该向量组的<strong>秩</strong>，记作 $r(\\alpha_1,\\alpha_2,\\cdots,\\alpha_m)$。规定：仅含零向量的向量组的秩为 $0$。",
      explanation: "向量组的秩等于以这些向量为行（或列）构成的矩阵的秩，二者数值相等，这是连接“向量组”与“矩阵”两个角度的桥梁：<strong>矩阵的秩既是行向量组的秩，也是列向量组的秩</strong>。",
      tags: ["向量组", "秩", "定义"]
    },
    {
      id: "la-vec-thm-equivalence-rank",
      chapterId: "vector-space",
      type: "theorem",
      title: "等价向量组的秩相等",
      statement: "若向量组 $B$ 可由向量组 $A$ 线性表示，则 <strong>$r(B)\\le r(A)$</strong>；若向量组 $A$ 与向量组 $B$ <strong>等价</strong>（即可以相互线性表示），则 <strong>$r(A)=r(B)$</strong>。",
      explanation: "该定理常用来证明维数、秩方面的不等式，例如证明矩阵乘积的秩不超过任一因子的秩：$r(AB)\\le\\min\\{r(A),r(B)\\}$ 的证明就<strong>依赖于这一结论</strong>。",
      tags: ["向量组", "等价", "秩", "定理"]
    },
    {
      id: "la-vec-def-vector-space",
      chapterId: "vector-space",
      type: "definition",
      title: "向量空间、基、维数的定义",
      statement: "设 $V$ 是 $n$ 维向量的非空集合，如果 $V$ 对向量的加法和数乘运算<strong>封闭</strong>（即 $\\forall \\alpha,\\beta\\in V$ 有 $\\alpha+\\beta\\in V$，$\\forall k\\in\\mathbb{R}, \\alpha\\in V$ 有 $k\\alpha\\in V$），则称 $V$ 为<strong>向量空间</strong>。若向量空间 $V$ 中的向量组 $\\alpha_1,\\cdots,\\alpha_r$ 满足：$\\alpha_1,\\cdots,\\alpha_r$ 线性无关，且 $V$ 中任一向量都可由它们线性表示，则称 $\\alpha_1,\\cdots,\\alpha_r$ 为 $V$ 的一个<strong>基</strong>，$r$ 称为 $V$ 的<strong>维数</strong>，记 $\\dim V=r$。",
      explanation: "向量空间的基类似于向量组的极大无关组，维数类似于向量组的秩。基不唯一，但<strong>维数唯一确定</strong>。齐次线性方程组的解集就是一个向量空间，称为<strong>解空间</strong>，其维数为 $n-r(A)$。",
      tags: ["向量空间", "基", "维数", "定义"]
    },
    {
      id: "la-vec-def-coordinates",
      chapterId: "vector-space",
      type: "definition",
      title: "向量在基下的坐标",
      statement: "设 $\\alpha_1,\\alpha_2,\\cdots,\\alpha_r$ 是向量空间 $V$ 的一个基，对任意 $\\xi\\in V$，都存在<strong>唯一</strong>一组数 $x_1,x_2,\\cdots,x_r$，使 $\\xi=x_1\\alpha_1+x_2\\alpha_2+\\cdots+x_r\\alpha_r$，则称有序数组 $(x_1,x_2,\\cdots,x_r)$ 为向量 $\\xi$ 在基 $\\alpha_1,\\cdots,\\alpha_r$ 下的<strong>坐标</strong>。",
      explanation: "坐标的存在性由“可以线性表示”保证，唯一性由基的线性无关性保证（若有两种表示相减即得线性无关向量组的非零组合等于零，矛盾）。不同基下同一向量的坐标一般不同，二者之间通过<strong>过渡矩阵</strong>联系。",
      tags: ["向量空间", "坐标", "定义"]
    },
    {
      id: "la-vec-thm-orthogonal-basis-schmidt",
      chapterId: "vector-space",
      type: "theorem",
      title: "施密特正交化方法",
      statement: "设 $\\alpha_1,\\alpha_2,\\cdots,\\alpha_r$ 线性无关，令 $\\beta_1=\\alpha_1$，$\\beta_2=\\alpha_2-\\dfrac{(\\alpha_2,\\beta_1)}{(\\beta_1,\\beta_1)}\\beta_1$，$\\beta_3=\\alpha_3-\\dfrac{(\\alpha_3,\\beta_1)}{(\\beta_1,\\beta_1)}\\beta_1-\\dfrac{(\\alpha_3,\\beta_2)}{(\\beta_2,\\beta_2)}\\beta_2$，依此类推，则 $\\beta_1,\\beta_2,\\cdots,\\beta_r$ <strong>两两正交</strong>，且与原向量组等价；再将各 $\\beta_i$ 单位化 $e_i=\\dfrac{\\beta_i}{|\\beta_i|}$，即得到一个<strong>标准正交向量组</strong>。",
      explanation: "施密特正交化是把一般基化为标准正交基的标准算法，是实对称矩阵正交对角化中“求正交矩阵 $Q$”这一步骤的核心工具，务必记住递推公式的结构（<strong>每一步减去在前面已正交化向量上的投影</strong>）。",
      tags: ["向量空间", "正交化", "施密特", "定理"]
    },
    {
      id: "la-vec-def-orthogonal-vector",
      chapterId: "vector-space",
      type: "definition",
      title: "向量的内积、长度与正交",
      statement: "设 $\\alpha=(a_1,\\cdots,a_n)^{T}$，$\\beta=(b_1,\\cdots,b_n)^{T}$，规定<strong>内积</strong> $(\\alpha,\\beta)=\\alpha^{T}\\beta=a_1b_1+\\cdots+a_nb_n$；向量的<strong>长度（范数）</strong>$|\\alpha|=\\sqrt{(\\alpha,\\alpha)}$；当 $(\\alpha,\\beta)=0$ 时，称 $\\alpha$ 与 $\\beta$ <strong>正交</strong>。长度为 $1$ 的向量称为<strong>单位向量</strong>。",
      explanation: "内积满足对称性 $(\\alpha,\\beta)=(\\beta,\\alpha)$、线性性等基本运算律。<strong>两两正交且都是非零向量的向量组必线性无关</strong>，这是判断线性无关性的一条捷径。",
      tags: ["向量空间", "内积", "正交", "定义"]
    },
    {
      id: "la-vec-prop-rank-relation-AB",
      chapterId: "vector-space",
      type: "property",
      title: "向量组秩与矩阵秩的等价刻画",
      statement: "矩阵 $A$ 的秩 $r(A)$ 等于 $A$ 的行向量组的秩，也等于 $A$ 的列向量组的秩（<strong>行秩＝列秩＝矩阵的秩</strong>）。",
      explanation: "这一结论说明矩阵的秩不依赖于按行还是按列来考察，是矩阵理论中的核心定理之一，也是求向量组的秩时“<strong>把向量按列排成矩阵求秩</strong>”这一操作合法性的依据。",
      tags: ["向量组", "矩阵", "秩", "性质"]
    },
    {
      id: "la-vec-thm-representation-criterion",
      chapterId: "vector-space",
      type: "theorem",
      title: "向量能由向量组线性表示的判定定理",
      statement: "向量 $\\beta$ 能由向量组 $A:\\alpha_1,\\alpha_2,\\cdots,\\alpha_m$ 线性表示的<strong>充要条件</strong>是矩阵 $A=(\\alpha_1,\\cdots,\\alpha_m)$ 的秩等于矩阵 $(A,\\beta)=(\\alpha_1,\\cdots,\\alpha_m,\\beta)$ 的秩，即 <strong>$r(A)=r(A,\\beta)$</strong>；且表示法<strong>唯一</strong>的充要条件是进一步有 $r(A)=m$。",
      explanation: "这一判定定理把“线性表示”问题<strong>转化为矩阵求秩问题</strong>，与非齐次线性方程组有解的判定定理本质相同（因为 $\\beta=x_1\\alpha_1+\\cdots+x_m\\alpha_m$ 本身就是一个线性方程组）。",
      tags: ["向量组", "线性表示", "定理"]
    },
    {
      id: "la-vec-def-equivalent-groups",
      chapterId: "vector-space",
      type: "definition",
      title: "向量组的等价",
      statement: "设有两个向量组 $A$ 与 $B$，若 $A$ 中每个向量都能由向量组 $B$ 线性表示，且 $B$ 中每个向量也都能由向量组 $A$ 线性表示，则称向量组 $A$ 与向量组 $B$ <strong>等价</strong>。",
      explanation: "向量组等价满足自反性、对称性、传递性。任一向量组都与它自身的极大线性无关组等价，这是“用极大无关组代表整个向量组”的理论依据。注意：<strong>等价向量组秩相等，但秩相等的向量组不一定等价</strong>。",
      tags: ["向量组", "等价", "定义"]
    },
    {
      id: "la-vec-def-transition-matrix",
      chapterId: "vector-space",
      type: "definition",
      title: "基变换公式与过渡矩阵",
      statement: "设 $\\alpha_1,\\cdots,\\alpha_n$ 与 $\\beta_1,\\cdots,\\beta_n$ 是向量空间 $V$ 的两个基，若 $(\\beta_1,\\beta_2,\\cdots,\\beta_n)=(\\alpha_1,\\alpha_2,\\cdots,\\alpha_n)C$，则称 $C$ 为由基 $\\alpha_1,\\cdots,\\alpha_n$ 到基 $\\beta_1,\\cdots,\\beta_n$ 的<strong>过渡矩阵</strong>，$C$ 必为可逆矩阵。若向量 $\\xi$ 在两个基下的坐标分别为 $x$ 和 $y$，则坐标变换公式为 <strong>$x=Cy$</strong>。",
      explanation: "过渡矩阵的各列就是新基中每个向量在旧基下的坐标。求过渡矩阵、坐标变换是向量空间部分的常见计算题型，注意坐标变换公式中 $x=Cy$ 的<strong>方向不要与基变换公式的方向搞反</strong>。",
      tags: ["向量空间", "基变换", "过渡矩阵", "定义"]
    },
    {
      id: "la-le-def-solution-types",
      chapterId: "linear-equations",
      type: "definition",
      title: "齐次与非齐次线性方程组",
      statement: "形如 $Ax=0$（常数项全为零）的线性方程组称为<strong>齐次线性方程组</strong>；形如 $Ax=b$（$b\\neq0$）的线性方程组称为<strong>非齐次线性方程组</strong>。齐次方程组必有零解 $x=0$（称为平凡解），若还有非零解，则称有<strong>非零解</strong>。",
      explanation: "非齐次方程组 $Ax=b$ 对应的齐次方程组 $Ax=0$ 称为其<strong>导出组</strong>。非齐次方程组解的结构必须依托其导出组的解来描述，这是理解通解结构定理的前提。",
      tags: ["线性方程组", "齐次", "非齐次", "定义"]
    },
    {
      id: "la-le-thm-homogeneous-existence",
      chapterId: "linear-equations",
      type: "theorem",
      title: "齐次线性方程组解的判定定理",
      statement: "设 $A$ 为 $m\\times n$ 矩阵，则：<ul><li><strong>只有零解</strong>的充要条件是 $r(A)=n$（系数矩阵列满秩）。</li><li><strong>有非零解</strong>的充要条件是 $r(A)<n$。</li><li>当 $m=n$ 时，有非零解的充要条件是 <strong>$|A|=0$</strong>。</li></ul>",
      explanation: "这是判断齐次方程组解的情况的核心定理：<strong>未知数个数 $n$ 与系数矩阵秩 $r(A)$ 的比较直接决定解的情况</strong>，与方程个数 $m$ 无直接关系（多余方程可能是冗余的）。",
      tags: ["线性方程组", "齐次", "定理"]
    },
    {
      id: "la-le-thm-nonhomogeneous-existence",
      chapterId: "linear-equations",
      type: "theorem",
      title: "非齐次线性方程组解的判定定理",
      statement: "非齐次线性方程组 $Ax=b$ <strong>有解</strong>的充要条件是系数矩阵的秩等于增广矩阵的秩，即 <strong>$r(A)=r(A,b)$</strong>。在有解的前提下：<ul><li>若 $r(A)=n$（未知数个数），则有<strong>唯一解</strong>。</li><li>若 $r(A)<n$，则有<strong>无穷多解</strong>。</li><li>当 $r(A)\\neq r(A,b)$ 时，方程组<strong>无解</strong>。</li></ul>",
      explanation: "这是线性方程组解的存在性与唯一性判定的核心定理，考研中几乎每年都会考查。记忆口诀：<strong>“秩相等有解，秩等于未知数个数则唯一，小于则无穷多”</strong>。",
      tags: ["线性方程组", "非齐次", "定理"]
    },
    {
      id: "la-le-def-general-solution-structure",
      chapterId: "linear-equations",
      type: "definition",
      title: "基础解系的定义",
      statement: "设齐次线性方程组 $Ax=0$ 的解集为 $S$，若 $\\xi_1,\\xi_2,\\cdots,\\xi_t\\in S$ 满足：<ul><li>$\\xi_1,\\cdots,\\xi_t$ <strong>线性无关</strong>；</li><li>$Ax=0$ 的任一解都可由 $\\xi_1,\\cdots,\\xi_t$ 线性表示；</li></ul>则称 $\\xi_1,\\cdots,\\xi_t$ 为 $Ax=0$ 的一个<strong>基础解系</strong>。",
      explanation: "基础解系是齐次方程组解空间的一个基，其所含向量个数 <strong>$t=n-r(A)$</strong>（$n$ 为未知数个数）恒定不变，虽然基础解系本身不唯一。",
      tags: ["线性方程组", "基础解系", "定义"]
    },
    {
      id: "la-le-thm-homogeneous-general-solution",
      chapterId: "linear-equations",
      type: "theorem",
      title: "齐次线性方程组的通解结构",
      statement: "设 $A$ 为 $m\\times n$ 矩阵，$r(A)=r<n$，则 $Ax=0$ 的基础解系含 <strong>$n-r$ 个</strong>线性无关的解向量 $\\xi_1,\\xi_2,\\cdots,\\xi_{n-r}$，其<strong>通解</strong>为 $x=k_1\\xi_1+k_2\\xi_2+\\cdots+k_{n-r}\\xi_{n-r}$，其中 $k_1,\\cdots,k_{n-r}$ 为任意常数。解空间的维数为 $n-r(A)$。",
      explanation: "解空间维数 $n-r(A)$ 是考研高频考点，常需<strong>先求 $r(A)$ 再确定基础解系所含向量个数</strong>。当 $r(A)=n$ 时基础解系为空集，此时只有零解。",
      tags: ["线性方程组", "齐次", "通解", "定理"]
    },
    {
      id: "la-le-thm-nonhomogeneous-general-solution",
      chapterId: "linear-equations",
      type: "theorem",
      title: "非齐次线性方程组的通解结构",
      statement: "设 $\\eta^{*}$ 是非齐次线性方程组 $Ax=b$ 的一个<strong>特解</strong>，$\\xi_1,\\xi_2,\\cdots,\\xi_{n-r}$ 是其导出组 $Ax=0$ 的一个<strong>基础解系</strong>（$r=r(A)$），则 $Ax=b$ 的<strong>通解</strong>为 $x=\\eta^{*}+k_1\\xi_1+k_2\\xi_2+\\cdots+k_{n-r}\\xi_{n-r}$，其中 $k_1,\\cdots,k_{n-r}$ 为任意常数。",
      explanation: "记忆核心：<u>非齐次方程组通解 ＝ 特解 ＋ 导出组通解</u>。这一结构与常微分方程中“非齐次线性方程通解＝特解＋齐次通解”完全类比，帮助理解和记忆。任意两个特解之差必是导出组的解。",
      tags: ["线性方程组", "非齐次", "通解", "定理"]
    },
    {
      id: "la-le-prop-solution-combination",
      chapterId: "linear-equations",
      type: "property",
      title: "线性方程组解的组合性质",
      statement: "<ul><li><strong>齐次解的线性组合：</strong>设 $\\xi_1,\\xi_2$ 都是 $Ax=0$ 的解，则 $k_1\\xi_1+k_2\\xi_2$ 仍是 $Ax=0$ 的解（任意线性组合都是解）。</li><li><strong>两特解之差：</strong>设 $\\eta_1,\\eta_2$ 都是 $Ax=b$ 的解，则 $\\eta_1-\\eta_2$ 是 $Ax=0$ 的解。</li><li><strong>系数和为 1 的组合：</strong>若 $\\eta_1,\\eta_2$ 是 $Ax=b$ 的解，则 $k\\eta_1+(1-k)\\eta_2$（$k$ 为任意常数）仍是 $Ax=b$ 的解，特别地当 $k_1+k_2=1$ 时 $k_1\\eta_1+k_2\\eta_2$ 仍是 $Ax=b$ 的解。</li></ul>",
      explanation: "齐次方程组解集对线性运算封闭（构成向量空间），非齐次方程组解集不封闭，但满足“<strong>系数和为 1 的线性组合仍是解</strong>”这一仿射性质，这是构造特解、验证解的常用技巧。",
      tags: ["线性方程组", "解的性质", "property"]
    },
    {
      id: "la-le-thm-common-solution",
      chapterId: "linear-equations",
      type: "theorem",
      title: "两个方程组同解与公共解",
      statement: "两个齐次线性方程组 $Ax=0$ 与 $Bx=0$ <strong>同解</strong>的充要条件是它们的系数矩阵满足 $r(A)=r(B)=r\\begin{pmatrix}A\\\\B\\end{pmatrix}$；求两方程组的<strong>公共解</strong>，等价于求由两组方程联立后所成新方程组的解。",
      explanation: "这是同解方程组问题的判定标准，常用于抽象矩阵方程与具体方程组结合的证明题，需要把两个系数矩阵<strong>按行拼接后统一求秩比较</strong>。",
      tags: ["线性方程组", "同解", "公共解", "定理"]
    },
    {
      id: "la-le-prop-rank-A-Ab",
      chapterId: "linear-equations",
      type: "property",
      title: "增广矩阵与系数矩阵秩的关系",
      statement: "对方程组 $Ax=b$，恒有 $r(A)\\le r(A,b)\\le r(A)+1$。<ul><li>当 $b$ <strong>不能</strong>由 $A$ 的列向量组线性表示时，$r(A,b)=r(A)+1$，方程组<strong>无解</strong>。</li><li>当 $b$ <strong>能</strong>由 $A$ 的列向量组线性表示时，$r(A,b)=r(A)$，方程组<strong>有解</strong>。</li></ul>",
      explanation: "这一性质从“$b$ 能否被列向量组线性表示”的角度重新解释了非齐次方程组有解的判定定理，把方程组是否有解和向量组的线性表示问题<strong>统一起来</strong>。",
      tags: ["线性方程组", "秩", "增广矩阵", "性质"]
    },
    {
      id: "la-le-thm-gauss-elimination",
      chapterId: "linear-equations",
      type: "theorem",
      title: "高斯消元法求解线性方程组",
      statement: "对增广矩阵 $(A\\ \\vdots\\ b)$ 施以初等行变换化为<strong>行阶梯形</strong>（进一步化为<strong>行最简形</strong>），根据非零行数与未知数个数的关系判断解的情况；若有解，令自由未知量取特定值（如令为 $0$）求得一个特解，令自由未知量分别取标准基向量得基础解系，从而写出通解。",
      explanation: "这是求解一般线性方程组的通用算法：<ul><li>消元</li><li>判断解的情况</li><li>（若有无穷多解）确定自由未知量</li><li>求特解与基础解系</li><li>写出通解表达式</li></ul>这是线性代数计算题中最常规且高频的解题流程。",
      tags: ["线性方程组", "高斯消元", "定理"]
    },
    {
      id: "la-le-def-augmented-matrix",
      chapterId: "linear-equations",
      type: "definition",
      title: "增广矩阵的定义",
      statement: "对线性方程组 $Ax=b$，把系数矩阵 $A$ 与常数项列向量 $b$ 拼接在一起所成的矩阵 $\\bar{A}=(A\\ \\vdots\\ b)$ 称为该方程组的<strong>增广矩阵</strong>。",
      explanation: "增广矩阵完整记录了方程组的全部信息，对增广矩阵作初等行变换等价于对方程组同时进行<strong>同解变形</strong>，是高斯消元法的操作对象。",
      tags: ["线性方程组", "增广矩阵", "定义"]
    },
    {
      id: "la-le-thm-vector-form-equation",
      chapterId: "linear-equations",
      type: "theorem",
      title: "线性方程组的向量形式",
      statement: "设 $A=(\\alpha_1,\\alpha_2,\\cdots,\\alpha_n)$ 按列分块，则线性方程组 $Ax=b$ 可等价地写成<strong>向量形式</strong> $x_1\\alpha_1+x_2\\alpha_2+\\cdots+x_n\\alpha_n=b$；方程组有解当且仅当 $b$ 可由 $A$ 的列向量组 $\\alpha_1,\\cdots,\\alpha_n$ <strong>线性表示</strong>。",
      explanation: "这一形式把“解线性方程组”与“向量的线性表示”两个问题<strong>统一起来</strong>：方程组的解 $(x_1,\\cdots,x_n)^T$ 就是把 $b$ 表示成列向量组线性组合时所用的系数。",
      tags: ["线性方程组", "向量形式", "定理"]
    },
    {
      id: "la-le-prop-free-variables",
      chapterId: "linear-equations",
      type: "property",
      title: "自由未知量的选取",
      statement: "设 $r(A)=r<n$，将增广矩阵化为行阶梯形后，选取 $r$ 个非零首元所在的列对应的未知量为<strong>约束未知量</strong>，其余 $n-r$ 个未知量为<strong>自由未知量</strong>；自由未知量可任意取值，约束未知量由自由未知量唯一线性表出。",
      explanation: "自由未知量的选取不唯一（依赖于所选的 $r$ 阶非零子式），但<strong>个数 $n-r$ 是唯一确定的</strong>。令各自由未知量依次取标准基向量 $(1,0,\\cdots,0),(0,1,\\cdots,0),\\cdots$ 即可得到一个基础解系。",
      tags: ["线性方程组", "自由未知量", "性质"]
    },
    {
      id: "la-le-def-equivalent-system",
      chapterId: "linear-equations",
      type: "definition",
      title: "同解方程组的定义",
      statement: "若两个线性方程组（未知量个数相同）的解集完全相同，则称这两个方程组是<strong>同解方程组</strong>；若方程组 $Bx=0$ 可由方程组 $Ax=0$ 中的方程通过线性组合（初等变换）得到，反之亦然，则二者同解。",
      explanation: "判断两个齐次方程组同解，等价于判断其系数矩阵满足 $r(A)=r(B)=r\\binom{A}{B}$（见相关定理）。<strong>对方程组作初等行变换前后必为同解方程组</strong>，这是消元法求解的合法性保证。",
      tags: ["线性方程组", "同解", "定义"]
    },
    {
      id: "la-le-prop-contradiction-row",
      chapterId: "linear-equations",
      type: "property",
      title: "矛盾方程与无解的快速识别",
      statement: "对增广矩阵 $(A\\ \\vdots\\ b)$ 作初等行变换化为行阶梯形后，若出现形如 $(0,0,\\cdots,0\\ \\vdots\\ d)$ 且 $d\\neq0$ 的行（该行对应<strong>矛盾方程</strong> $0=d$），则原方程组<strong>无解</strong>，此时必有 $r(A)<r(A,b)$。",
      explanation: "这是高斯消元过程中判断方程组无解<strong>最直观的标志</strong>，比单独计算比较 $r(A)$ 与 $r(A,b)$ 更便于在具体运算中即时发现，是解方程组类计算题的常规检查手段。",
      tags: ["线性方程组", "无解", "性质"]
    },
    {
      id: "la-eig-def-eigen",
      chapterId: "eigen",
      type: "definition",
      title: "特征值与特征向量的定义",
      statement: "设 $A$ 是 $n$ 阶方阵，如果数 $\\lambda$ 和 $n$ 维非零列向量 $\\xi$ 满足 $A\\xi=\\lambda\\xi$，则称 $\\lambda$ 为 $A$ 的一个<strong>特征值</strong>，非零向量 $\\xi$ 称为 $A$ 的对应于特征值 $\\lambda$ 的<strong>特征向量</strong>。",
      explanation: "<strong>特征向量必须是非零向量</strong>，但特征值可以为零。特征方程 $|A-\\lambda E|=0$ 的根就是矩阵 $A$ 的全部特征值，对应齐次方程组 $(A-\\lambda E)x=0$ 的非零解就是对应的特征向量。",
      diagram: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
        <line x1="150" y1="150" x2="150" y2="20" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.3"/>
        <line x1="20" y1="150" x2="280" y2="150" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.3"/>
        <line x1="150" y1="150" x2="220" y2="90" stroke="currentColor" stroke-width="2"/>
        <polygon points="220,90 208,92 214,80" fill="currentColor"/>
        <text x="224" y="90" font-size="11" fill="currentColor">ξ</text>
        <line x1="150" y1="150" x2="255" y2="60" stroke="#3b82f6" stroke-width="2"/>
        <polygon points="255,60 241,60 248,47" fill="#3b82f6"/>
        <text x="258" y="58" font-size="11" fill="#3b82f6">Aξ = λξ</text>
      </svg>`,
      diagramCaption: "Aξ 与 ξ 方向相同（共线），只是长度被缩放了 λ 倍——这正是特征向量的几何意义",
      tags: ["特征值", "特征向量", "定义"]
    },
    {
      id: "la-eig-def-char-polynomial",
      chapterId: "eigen",
      type: "definition",
      title: "特征多项式与特征方程",
      statement: "设 $A$ 为 $n$ 阶方阵，$|A-\\lambda E|$ 称为 $A$ 的<strong>特征多项式</strong>，是关于 $\\lambda$ 的 $n$ 次多项式；方程 $|A-\\lambda E|=0$ 称为 $A$ 的<strong>特征方程</strong>，其在复数域内恰有 $n$ 个根（重根按重数计算），即为 $A$ 的 $n$ 个特征值。",
      explanation: "求特征值的标准流程：<strong>先写出特征多项式 $|A-\\lambda E|$，展开求根即得全部特征值</strong>；再对每个特征值 $\\lambda_i$ 代入 $(A-\\lambda_i E)x=0$ 求基础解系即得对应特征向量。",
      tags: ["特征值", "特征多项式", "定义"]
    },
    {
      id: "la-eig-prop-sum-product",
      chapterId: "eigen",
      type: "property",
      title: "特征值的和与积",
      statement: "设 $n$ 阶方阵 $A$ 的 $n$ 个特征值为 $\\lambda_1,\\lambda_2,\\cdots,\\lambda_n$（含重根），则 <strong>$\\displaystyle\\sum_{i=1}^n\\lambda_i=\\sum_{i=1}^n a_{ii}=\\mathrm{tr}(A)$</strong>（矩阵的迹），且 <strong>$\\displaystyle\\prod_{i=1}^n\\lambda_i=|A|$</strong>。",
      explanation: "这是快速验证特征值求解是否正确的重要工具：求出特征值后，检验其和是否等于矩阵主对角元之和、其积是否等于矩阵行列式。由此还可得出：$A$ 可逆的充要条件是<strong>所有特征值都不为零</strong>。",
      tags: ["特征值", "迹", "行列式", "性质"]
    },
    {
      id: "la-eig-prop-function-eigenvalue",
      chapterId: "eigen",
      type: "property",
      title: "矩阵多项式与特征值的对应关系",
      statement: "设 $\\lambda$ 是 $A$ 的特征值，$\\xi$ 是对应的特征向量，则：<ul><li>$k\\lambda$ 是 $kA$ 的特征值</li><li>$\\lambda^m$ 是 $A^m$ 的特征值</li><li>$\\varphi(\\lambda)=a_0+a_1\\lambda+\\cdots+a_m\\lambda^m$ 是 $\\varphi(A)=a_0E+a_1A+\\cdots+a_mA^m$ 的特征值</li><li>当 $A$ 可逆时，$\\lambda^{-1}$ 是 $A^{-1}$ 的特征值，$\\dfrac{|A|}{\\lambda}$ 是 $A^{*}$ 的特征值</li></ul>以上情形对应的特征向量都仍是 $\\xi$。",
      explanation: "此性质是求 $A^m$、$A^{-1}$、$A^{*}$、$\\varphi(A)$ 等矩阵多项式的特征值的关键工具，<strong>特征向量在这些变换下保持不变</strong>，只有特征值按对应函数关系变化。",
      tags: ["特征值", "特征向量", "矩阵多项式", "性质"]
    },
    {
      id: "la-eig-thm-distinct-independent",
      chapterId: "eigen",
      type: "theorem",
      title: "不同特征值对应特征向量线性无关",
      statement: "设 $\\lambda_1,\\lambda_2,\\cdots,\\lambda_m$ 是方阵 $A$ 的 $m$ 个<strong>互不相同</strong>的特征值，$\\xi_1,\\xi_2,\\cdots,\\xi_m$ 依次是对应的特征向量，则 $\\xi_1,\\xi_2,\\cdots,\\xi_m$ <strong>线性无关</strong>。",
      explanation: "更一般地，属于不同特征值的特征向量组，把各自对应的线性无关的特征向量合并在一起，<strong>整体仍线性无关</strong>。这是判断矩阵能否相似对角化的重要基础定理。",
      tags: ["特征值", "特征向量", "线性无关", "定理"]
    },
    {
      id: "la-eig-def-similar",
      chapterId: "eigen",
      type: "definition",
      title: "相似矩阵的定义",
      statement: "设 $A,B$ 都是 $n$ 阶方阵，若存在可逆矩阵 $P$，使得 $P^{-1}AP=B$，则称矩阵 $A$ 与 $B$ <strong>相似</strong>，记作 $A\\sim B$，$P$ 称为把 $A$ 变成 $B$ 的相似变换矩阵。",
      explanation: "相似是一种等价关系（满足自反性、对称性、传递性）。相似矩阵有相同的特征多项式，从而有相同的特征值、相同的迹、相同的行列式，但<strong>特征向量一般不同</strong>（需通过 $P$ 变换）。",
      tags: ["相似矩阵", "定义"]
    },
    {
      id: "la-eig-prop-similar-invariants",
      chapterId: "eigen",
      type: "property",
      title: "相似矩阵的不变量",
      statement: "若 $A\\sim B$，则：<ul><li>$A$ 与 $B$ 有相同的特征多项式，从而有相同的特征值</li><li>$|A|=|B|$，$\\mathrm{tr}(A)=\\mathrm{tr}(B)$</li><li>$r(A)=r(B)$</li><li>若 $A$ 可逆，则 $B$ 也可逆，且 $A^{-1}\\sim B^{-1}$</li><li>$A^m\\sim B^m$</li></ul>",
      explanation: "反之，<strong>特征值相同的两个矩阵不一定相似</strong>（相似是比“特征值相同”更强的条件）。判断两矩阵是否相似的常用方法：先比较特征值、迹、行列式、秩是否都相等，若某一不变量不等则一定不相似。",
      tags: ["相似矩阵", "特征值", "性质"]
    },
    {
      id: "la-eig-thm-diagonalizable-iff",
      chapterId: "eigen",
      type: "theorem",
      title: "矩阵可相似对角化的充要条件",
      statement: "$n$ 阶方阵 $A$ 能够相似对角化（即存在可逆矩阵 $P$ 使 $P^{-1}AP=\\Lambda$ 为对角矩阵）的充要条件是 $A$ 有<strong>$n$ 个线性无关的特征向量</strong>；等价地，对 $A$ 的每一个特征值 $\\lambda_i$（设其重数为 $k_i$），都有 $n-r(A-\\lambda_i E)=k_i$，即该特征值的<strong>几何重数等于代数重数</strong>。",
      explanation: "重要推论：若 $A$ 的 $n$ 个特征值互不相同，则 $A$ 必可相似对角化（充分不必要条件）。对角化后 $\\Lambda=\\mathrm{diag}(\\lambda_1,\\cdots,\\lambda_n)$ 的对角元就是 $A$ 的全部特征值，$P$ 的各列就是对应的线性无关特征向量，且<strong>顺序要与 $\\Lambda$ 中特征值的排列顺序一致</strong>。",
      tags: ["相似对角化", "特征值", "定理"]
    },
    {
      id: "la-eig-def-orthogonal-matrix",
      chapterId: "eigen",
      type: "definition",
      title: "正交矩阵的定义",
      statement: "若 $n$ 阶方阵 $Q$ 满足 $Q^{T}Q=QQ^{T}=E$（即 $Q^{-1}=Q^{T}$），则称 $Q$ 为<strong>正交矩阵</strong>。",
      explanation: "正交矩阵的等价刻画：$Q$ 的列向量组是两两正交的单位向量组（标准正交基），行向量组亦然。正交矩阵对应的线性变换（正交变换）<strong>保持向量的内积、长度和向量间夹角不变</strong>，是实对称矩阵对角化中过渡矩阵的标准选取。",
      tags: ["正交矩阵", "定义"]
    },
    {
      id: "la-eig-thm-real-symmetric-eigen",
      chapterId: "eigen",
      type: "theorem",
      title: "实对称矩阵特征值与特征向量的性质",
      statement: "设 $A$ 为 $n$ 阶实对称矩阵，则：<ul><li>$A$ 的特征值都是<strong>实数</strong></li><li>$A$ 的属于不同特征值的特征向量必<strong>正交</strong></li><li>对于 $k$ 重特征值 $\\lambda_0$，矩阵 $A-\\lambda_0E$ 的秩必为 $n-k$，即恰有 $k$ 个线性无关的特征向量与之对应（<strong>几何重数等于代数重数</strong>）</li></ul>",
      explanation: "这三条性质保证了实对称矩阵<strong>一定可以相似对角化，且可以用正交矩阵实现对角化</strong>，是本章的核心考点。性质(2)是施密特正交化只需在同一特征值内部进行的原因——不同特征值的特征向量天然正交，无需额外正交化。",
      tags: ["实对称矩阵", "特征值", "定理"]
    },
    {
      id: "la-eig-thm-orthogonal-diagonalization",
      chapterId: "eigen",
      type: "theorem",
      title: "实对称矩阵的正交相似对角化定理",
      statement: "对任意 $n$ 阶实对称矩阵 $A$，都<strong>存在正交矩阵 $Q$</strong>，使得 $Q^{-1}AQ=Q^{T}AQ=\\Lambda$ 为对角矩阵，其中 $\\Lambda$ 的对角元恰为 $A$ 的 $n$ 个特征值（含重数）。",
      explanation: "求正交对角化的标准步骤：<ul><li>求出 $A$ 的全部特征值</li><li>对每个特征值求出对应的线性无关特征向量</li><li>对同一特征值对应的多个特征向量施密特正交化，不同特征值的特征向量自动正交</li><li>把所有特征向量单位化后按列排成正交矩阵 $Q$</li></ul>这是考研线代压轴计算题的典型考法。",
      tags: ["实对称矩阵", "正交对角化", "定理"]
    },
    {
      id: "la-eig-prop-eigenvector-linear-combo",
      chapterId: "eigen",
      type: "property",
      title: "同一特征值对应特征向量的线性组合",
      statement: "设 $\\xi_1,\\xi_2$ 都是方阵 $A$ 属于同一特征值 $\\lambda_0$ 的特征向量，则当 $k_1\\xi_1+k_2\\xi_2\\neq0$ 时，$k_1\\xi_1+k_2\\xi_2$ <strong>仍是 $A$ 属于 $\\lambda_0$ 的特征向量</strong>。",
      explanation: "这说明属于同一特征值 $\\lambda_0$ 的全部特征向量再添上零向量，构成一个向量空间，即齐次方程组 $(A-\\lambda_0E)x=0$ 的解空间（称为 $\\lambda_0$ 的<strong>特征子空间</strong>）。但<strong>不同特征值对应的特征向量之和一般不再是特征向量</strong>。",
      tags: ["特征值", "特征向量", "性质"]
    },
    {
      id: "la-eig-prop-AB-BA-eigenvalue",
      chapterId: "eigen",
      type: "property",
      title: "AB 与 BA 特征值的关系",
      statement: "设 $A$ 为 $m\\times n$ 矩阵，$B$ 为 $n\\times m$ 矩阵，则 $AB$（$m$ 阶方阵）与 $BA$（$n$ 阶方阵）有<strong>相同的非零特征值</strong>（重数也相同）。特别地，当 $m=n$ 时，$AB$ 与 $BA$ 的特征多项式相同。",
      explanation: "此性质常用于求形如 $\\alpha\\beta^{T}$（秩为 1 的矩阵）的特征值：因为 $\\beta^{T}\\alpha$ 是一个数，<strong>$\\alpha\\beta^{T}$ 的非零特征值就等于这个数 $\\beta^{T}\\alpha$</strong>，其余特征值都为零，是考研中处理秩 1 矩阵特征值问题的经典技巧。",
      tags: ["特征值", "矩阵乘法", "性质"]
    },
    {
      id: "la-eig-def-multiplicity",
      chapterId: "eigen",
      type: "definition",
      title: "特征值的代数重数与几何重数",
      statement: "特征值 $\\lambda_0$ 作为特征方程 $|A-\\lambda E|=0$ 的根的重数，称为 $\\lambda_0$ 的<strong>代数重数</strong>；$\\lambda_0$ 对应的线性无关特征向量的最大个数，即 $n-r(A-\\lambda_0E)$，称为 $\\lambda_0$ 的<strong>几何重数</strong>。",
      explanation: "几何重数就是对应齐次方程组 $(A-\\lambda_0E)x=0$ 解空间的维数。代数重数与几何重数是理解“何时可对角化”问题的两把标尺，<strong>二者相等是可对角化的关键</strong>。",
      tags: ["特征值", "重数", "定义"]
    },
    {
      id: "la-eig-prop-geometric-le-algebraic",
      chapterId: "eigen",
      type: "property",
      title: "几何重数不超过代数重数",
      statement: "对任意 $n$ 阶方阵 $A$ 的任一特征值 $\\lambda_0$，其<strong>几何重数不超过代数重数</strong>，即 $n-r(A-\\lambda_0E)\\le k_0$，其中 $k_0$ 为 $\\lambda_0$ 的代数重数。",
      explanation: "这一不等式解释了为何一般矩阵未必可对角化：只有当<strong>每个特征值的几何重数都恰好等于代数重数</strong>（即不等式取等号）时，才能凑够 $n$ 个线性无关的特征向量实现对角化。",
      tags: ["特征值", "重数", "性质"]
    },
    {
      id: "la-eig-thm-power-via-diagonalization",
      chapterId: "eigen",
      type: "theorem",
      title: "利用相似对角化计算矩阵的幂",
      statement: "若 $n$ 阶方阵 $A$ 可相似对角化，即存在可逆矩阵 $P$ 使 $P^{-1}AP=\\Lambda=\\mathrm{diag}(\\lambda_1,\\cdots,\\lambda_n)$，则 $A=P\\Lambda P^{-1}$，从而对任意正整数 $k$ 有 <strong>$A^{k}=P\\Lambda^{k}P^{-1}=P\\,\\mathrm{diag}(\\lambda_1^{k},\\cdots,\\lambda_n^{k})\\,P^{-1}$</strong>。",
      explanation: "这是求矩阵高次幂 $A^k$ 最重要的应用之一：直接计算 $A^k$ 通常很繁琐，而<strong>对角矩阵的幂只需把对角元分别取幂</strong>，再用 $P$、$P^{-1}$ 还原即可，是考研计算题的常规套路（常与数列递推、差分方程结合考查）。",
      tags: ["相似对角化", "矩阵的幂", "定理"]
    },
    {
      id: "la-qf-def-quadratic-form",
      chapterId: "quadratic-form",
      type: "definition",
      title: "二次型及其矩阵表示",
      statement: "含 $n$ 个变量 $x_1,x_2,\\cdots,x_n$ 的二次齐次多项式 $f(x_1,\\cdots,x_n)=\\displaystyle\\sum_{i=1}^n\\sum_{j=1}^n a_{ij}x_ix_j$（其中 $a_{ij}=a_{ji}$）称为一个<strong>二次型</strong>。二次型可写成矩阵形式 $f=x^{T}Ax$，其中 $x=(x_1,\\cdots,x_n)^{T}$，$A=(a_{ij})$ 是唯一确定的<strong>对称矩阵</strong>，称为二次型 $f$ 的矩阵，$r(A)$ 称为二次型的<strong>秩</strong>。",
      explanation: "关键约定：二次型矩阵必须取对称矩阵，交叉项 $x_ix_j$（$i\\neq j$）的<strong>系数要平分给 $a_{ij}$ 和 $a_{ji}$</strong>，即 $a_{ij}=a_{ji}=\\frac12\\times(x_ix_j\\text{的系数})$。二次型与其对称矩阵是一一对应的关系。",
      tags: ["二次型", "矩阵表示", "定义"]
    },
    {
      id: "la-qf-def-standard-form",
      chapterId: "quadratic-form",
      type: "definition",
      title: "二次型的标准形与规范形",
      statement: "只含平方项、不含交叉项的二次型 $f=k_1y_1^2+k_2y_2^2+\\cdots+k_ny_n^2$ 称为二次型的<strong>标准形</strong>。若标准形中系数只取 $1,-1,0$，即 $f=z_1^2+\\cdots+z_p^2-z_{p+1}^2-\\cdots-z_r^2$，则称为二次型的<strong>规范形</strong>，其中 $p$ 为<strong>正惯性指数</strong>，$r-p$ 为<strong>负惯性指数</strong>，$r$ 为二次型的秩。",
      explanation: "任何二次型都可以通过可逆线性变换化为标准形，标准形不唯一，但<strong>规范形是唯一的</strong>（由惯性定理保证）。化标准形常用的方法有配方法（拉格朗日配方法）和正交变换法。",
      tags: ["二次型", "标准形", "规范形", "定义"]
    },
    {
      id: "la-qf-thm-orthogonal-transform-standard",
      chapterId: "quadratic-form",
      type: "theorem",
      title: "用正交变换化二次型为标准形",
      statement: "对任意二次型 $f=x^{T}Ax$（$A$ 为实对称矩阵），都<strong>存在正交变换 $x=Qy$</strong>，使得 $f=\\lambda_1y_1^2+\\lambda_2y_2^2+\\cdots+\\lambda_ny_n^2$，其中 $\\lambda_1,\\lambda_2,\\cdots,\\lambda_n$ 为 $A$ 的 $n$ 个特征值，$Q$ 是使 $Q^{T}AQ=\\mathrm{diag}(\\lambda_1,\\cdots,\\lambda_n)$ 成立的正交矩阵。",
      explanation: "该定理把二次型化标准形问题<strong>完全转化为求实对称矩阵特征值和正交对角化的问题</strong>，是本章与特征值一章的核心衔接点。正交变换的几何意义是保持图形的形状不变（只是坐标轴的旋转），故标准形中的平方和系数直接反映二次曲面的几何性质。",
      tags: ["二次型", "正交变换", "标准形", "定理"]
    },
    {
      id: "la-qf-thm-inertia-law",
      chapterId: "quadratic-form",
      type: "theorem",
      title: "惯性定理",
      statement: "二次型的秩 $r$ 以及正惯性指数 $p$（标准形中正系数的个数）是<strong>唯一确定的，与所用的可逆线性变换无关</strong>；即不论采用配方法还是正交变换法，只要化成标准形，正系数个数、负系数个数、零系数个数都是唯一确定的。",
      explanation: "惯性定理保证了二次型的规范形是唯一的，这是判断两个二次型是否等价（可通过可逆线性变换互相转化）的理论基础：两个实二次型等价的充要条件是它们的<strong>秩相等且正惯性指数相等</strong>。",
      tags: ["二次型", "惯性定理", "定理"]
    },
    {
      id: "la-qf-def-positive-definite",
      chapterId: "quadratic-form",
      type: "definition",
      title: "正定二次型（正定矩阵）的定义",
      statement: "设二次型 $f=x^{T}Ax$（$A$ 为实对称矩阵），若对任意<strong>非零向量</strong> $x$ 都有 $f(x)=x^{T}Ax>0$，则称 $f$ 为<strong>正定二次型</strong>，称 $A$ 为<strong>正定矩阵</strong>。类似地可定义：<ul><li><strong>负定：</strong>恒 $<0$</li><li><strong>半正定：</strong>恒 $\\ge0$</li><li><strong>半负定：</strong>恒 $\\le0$</li><li><strong>不定：</strong>可正可负</li></ul>",
      explanation: "正定性是二次型最重要的性质之一，在最优化（判断极值点是否为极小值点，即黑塞矩阵正定）等应用中极为关键。判断正定性<strong>不能只代入个别数值</strong>，需要用后面的判定定理系统检验。",
      tags: ["二次型", "正定", "定义"]
    },
    {
      id: "la-qf-thm-positive-definite-eigenvalue",
      chapterId: "quadratic-form",
      type: "theorem",
      title: "正定的特征值判别法",
      statement: "实对称矩阵 $A$ <strong>正定</strong>的充要条件是 $A$ 的<strong>所有特征值都大于零</strong>。",
      explanation: "这是判断正定性<strong>最本质的方法</strong>：因为标准形系数就是特征值，所有系数为正当然等价于所有特征值为正。相应地，$A$ 负定的充要条件是所有特征值都小于零。",
      tags: ["二次型", "正定", "特征值", "定理"]
    },
    {
      id: "la-qf-thm-positive-definite-principal-minor",
      chapterId: "quadratic-form",
      type: "theorem",
      title: "正定的顺序主子式判别法",
      statement: "实对称矩阵 $A=(a_{ij})_{n\\times n}$ <strong>正定</strong>的充要条件是 $A$ 的<strong>各阶顺序主子式都大于零</strong>，即 $a_{11}>0,\\ \\begin{vmatrix}a_{11}&a_{12}\\\\a_{21}&a_{22}\\end{vmatrix}>0,\\ \\cdots,\\ |A|>0$。$A$ <strong>负定</strong>的充要条件是奇数阶顺序主子式为负、偶数阶顺序主子式为正，即<strong>顺序主子式正负相间且 $a_{11}<0$</strong>。",
      explanation: "这是霍尔维茨（Hurwitz）判别法，是考研计算题中判断具体数值矩阵正定性最常用的方法，<strong>不需要求特征值，只需逐阶计算顺序主子式的行列式值</strong>。注意负定的符号规律是“正负相间，从负开始”。",
      tags: ["二次型", "正定", "顺序主子式", "定理"]
    },
    {
      id: "la-qf-prop-positive-definite-necessary",
      chapterId: "quadratic-form",
      type: "property",
      title: "正定矩阵的必要条件与常用性质",
      statement: "若 $A$ 正定，则：<ul><li>$a_{ii}>0$（主对角元全为正）</li><li>$|A|>0$</li><li>$A$ 可逆，且 $A^{-1}$ 也正定</li><li>对任意可逆矩阵 $C$，$C^{T}AC$ 也正定（<strong>合同变换保持正定性</strong>）</li><li>$A$ 的正惯性指数等于 $n$（即秩为 $n$ 且规范形为 $E$）</li></ul>",
      explanation: "<strong>快速排除法</strong>：若矩阵主对角线上出现非正元素或行列式非正，可直接判断不正定，无需再计算顺序主子式。性质(4)说明正定性是合同不变量，这与相似对角化中特征值是相似不变量的角度不同，注意二者的区别：<strong>二次型化标准形研究的是合同关系（$C^TAC$），而相似对角化研究的是相似关系（$P^{-1}AP$）</strong>。",
      tags: ["二次型", "正定", "性质"]
    },
    {
      id: "la-qf-def-congruent",
      chapterId: "quadratic-form",
      type: "definition",
      title: "矩阵合同的定义",
      statement: "设 $A,B$ 都是 $n$ 阶方阵，若存在可逆矩阵 $C$，使得 $C^{T}AC=B$，则称矩阵 $A$ 与 $B$ <strong>合同</strong>。",
      explanation: "合同关系描述的是同一个二次型在不同可逆线性变换下矩阵的变化规律（区别于相似关系 $P^{-1}AP$ 描述的是同一线性变换在不同基下的矩阵）。两个实对称矩阵合同的充要条件是它们有<strong>相同的正、负惯性指数</strong>（即秩和正惯性指数分别相等）。",
      tags: ["二次型", "合同", "定义"]
    },
    {
      id: "la-qf-thm-congruent-real-symmetric",
      chapterId: "quadratic-form",
      type: "theorem",
      title: "实对称矩阵合同的判定定理",
      statement: "两个 $n$ 阶实对称矩阵 $A$ 与 $B$ <strong>合同</strong>的充要条件是它们的<strong>秩相等且正惯性指数相等</strong>（等价地，正、负惯性指数分别相等）。特别地，任一 $n$ 阶实对称矩阵都与唯一确定的规范形 $\\begin{pmatrix}E_p&&\\\\&-E_{r-p}&\\\\&&O\\end{pmatrix}$ 合同。",
      explanation: "该定理是惯性定理的直接推论，把矩阵合同这一抽象关系<strong>转化为比较两个具体数字（秩、正惯性指数）是否相等</strong>，是判断两个二次型能否通过可逆线性变换互相转化的标准方法。",
      tags: ["二次型", "合同", "实对称矩阵", "定理"]
    },
    {
      id: "la-qf-def-invertible-transform",
      chapterId: "quadratic-form",
      type: "definition",
      title: "二次型的可逆线性变换",
      statement: "设 $f=x^{T}Ax$ 是一个二次型，令 $x=Cy$（$C$ 为可逆矩阵）为<strong>可逆线性变换</strong>，代入后得 $f=y^{T}(C^{T}AC)y$，新二次型的矩阵为 $C^{T}AC$，它与原矩阵 $A$ <strong>合同</strong>。",
      explanation: "可逆线性变换是把一般二次型化为标准形的操作手段：无论是配方法还是正交变换法，本质上都是在<strong>寻找合适的可逆矩阵 $C$，使 $C^{T}AC$ 成为对角矩阵</strong>。",
      tags: ["二次型", "可逆线性变换", "定义"]
    },
    {
      id: "la-qf-prop-congruent-rank-invariant",
      chapterId: "quadratic-form",
      type: "property",
      title: "合同变换保持矩阵的秩不变",
      statement: "若 $n$ 阶矩阵 $A$ 与 $B$ <strong>合同</strong>，即存在可逆矩阵 $C$ 使 $C^{T}AC=B$，则 <strong>$r(A)=r(B)$</strong>。",
      explanation: "这是因为可逆矩阵不改变矩阵的秩（见矩阵章节 $r(PAQ)=r(A)$ 的结论，$C^T,C$ 均可逆）。二次型的<strong>秩在任何可逆线性变换下保持不变</strong>，这正是“标准形中非零平方项个数恒等于原二次型的秩”的原因。",
      tags: ["二次型", "合同", "秩", "性质"]
    },
    {
      id: "la-qf-thm-lagrange-method",
      chapterId: "quadratic-form",
      type: "theorem",
      title: "配方法（拉格朗日配方法）化二次型为标准形",
      statement: "对任意二次型 $f=x^{T}Ax$，可通过反复配完全平方的方法，构造可逆线性变换 $x=Cy$，将其化为标准形 $f=d_1y_1^2+d_2y_2^2+\\cdots+d_ny_n^2$：<ul><li><strong>某平方项系数 $a_{ii}\\neq0$：</strong>先集中含 $x_i$ 的项配方消去交叉项。</li><li><strong>所有平方项系数都为零但存在交叉项 $a_{ij}x_ix_j\\ (i\\neq j)$：</strong>先作变换 $x_i=z_i+z_j,\\ x_j=z_i-z_j$ 构造出平方项，再继续配方。</li></ul>",
      explanation: "配方法是<strong>不依赖特征值计算</strong>、纯代数运算即可将二次型化为标准形的方法，计算量通常小于正交变换法，但所得标准形的可逆变换矩阵 $C$ 一般不是正交矩阵，几何意义不如正交变换法直观。",
      tags: ["二次型", "配方法", "标准形", "定理"]
    },
    {
      id: "la-qf-thm-semi-positive-definite",
      chapterId: "quadratic-form",
      type: "theorem",
      title: "半正定二次型的判别法",
      statement: "实对称矩阵 $A$ <strong>半正定</strong>的充要条件是下列任一条成立：<ul><li>$A$ 的所有特征值都大于等于零</li><li><strong>$A$ 的所有主子式</strong>（不仅是顺序主子式）都大于等于零</li><li>存在可逆矩阵 $C$，使 $A=C^{T}\\begin{pmatrix}E_r&O\\\\O&O\\end{pmatrix}C$（$r=r(A)$）</li><li>正惯性指数等于秩，即 $p=r(A)$</li></ul>",
      explanation: "<strong>易错点</strong>：判断半正定不能只检验顺序主子式非负，<strong>必须检验全部 $k$ 阶主子式</strong>（共 $\\binom{n}{k}$ 个）都非负，这与判断正定只需顺序主子式非负是本章最容易混淆的一点。",
      tags: ["二次型", "半正定", "定理"]
    },
    {
      id: "la-qf-thm-positive-definite-congruent-E",
      chapterId: "quadratic-form",
      type: "theorem",
      title: "正定与合同于单位矩阵的等价性",
      statement: "实对称矩阵 $A$ <strong>正定</strong>的充要条件是 $A$ 与单位矩阵 $E$ <strong>合同</strong>，即存在可逆矩阵 $C$，使 <strong>$A=C^{T}C$</strong>（等价地 $A=C^TEC$）。",
      explanation: "这一判别角度说明正定矩阵本质上就是“<strong>可以写成某个可逆矩阵与其转置之积</strong>”的矩阵，是理解正定二次型规范形恒为 $z_1^2+z_2^2+\\cdots+z_n^2$（即 $p=n$）的根本原因，也是证明题中构造性证明正定性的常用手法。",
      tags: ["二次型", "正定", "合同", "定理"]
    },
    {
      id: "la-qf-def-principal-minor",
      chapterId: "quadratic-form",
      type: "definition",
      title: "主子式与顺序主子式",
      statement: "在 $n$ 阶方阵 $A$ 中任取 $k$ 个下标 $1\\le i_1<i_2<\\cdots<i_k\\le n$，保留这些下标对应的行与列所成的 $k$ 阶行列式，称为 $A$ 的一个 $k$ 阶<strong>主子式</strong>；特别地，取下标为 $1,2,\\cdots,k$（即左上角 $k\\times k$ 部分）所得的主子式称为 $k$ 阶<strong>顺序主子式</strong>。",
      explanation: "$n$ 阶方阵的 $k$ 阶主子式共有 $\\binom{n}{k}$ 个，而 $k$ 阶顺序主子式只有唯一的一个。正定判别只需检验顺序主子式（共 $n$ 个），而半正定判别需要检验全部主子式，<strong>二者不能混用</strong>，是本章重要的辨析点。",
      tags: ["二次型", "主子式", "定义"]
    }
  ]
});
