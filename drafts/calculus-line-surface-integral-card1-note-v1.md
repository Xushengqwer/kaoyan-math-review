### 〔定义〕

**① 弯的线、弯的面上怎么求总量**

#### 1. 第一类曲线积分：铁丝的质量
* **和定积分对照**：定积分切的是 $x$ 轴上的区间，小段长 $\Delta x_i$；这里切的是一条弯的曲线，小段长是弧长 $\Delta s_i$；分割、求和、取极限三步一样。
* **例**：$f = 1$ 时，和式恒等于各小段弧长之和，所以 $\displaystyle\int_L 1\,\mathrm{d}s$ 就是 $L$ 的长度。
* **为什么要光滑**：有切线，弧长才能用 $\mathrm{d}s = \sqrt{\varphi'^2(t) + \psi'^2(t)}\,\mathrm{d}t$ 算出来。
* **空间曲线**：螺旋线这类不在一个平面里的曲线，定义一字不改。

#### 2. 第一类曲面积分：薄壳的质量
* **和二重积分对照**：二重积分切的是平面区域，小块面积 $\Delta\sigma_i$；这里切的是一张曲面，小块是曲面上的面积 $\Delta S_i$。
* **例**：$f = 1$ 时就是曲面的面积；球面 $x^2 + y^2 + z^2 = a^2$ 上 $\displaystyle\oiint_\Sigma 1\,\mathrm{d}S = 4\pi a^2$。
* **$\mathrm{d}S$ 和 $\mathrm{d}\sigma$ 不同**：曲面倾斜时，一小片 $\Delta S$ 比它在 $xOy$ 面上的投影大。

**② 沿着路走，力做了多少功**

#### 1. 有向曲线：同一条曲线，两种走法
* **例**：从 $(1, 0)$ 沿上半个单位圆走到 $(-1, 0)$ 是 $L$；沿同一个上半圆从 $(-1, 0)$ 走回 $(1, 0)$ 是 $L^-$；沿下半圆走，是另一条曲线。
* **闭曲线**：没有起点和终点，方向说成逆时针、顺时针。
* **第一类为什么不用定方向**：$\Delta s_i$ 总是正的，走向不影响和式。

#### 2. 第二类曲线积分：力乘位移，带正负
* **和第一类对照**：第一类乘的是 $\Delta s_i$，是正数；第二类乘的是 $\Delta x_i$、$\Delta y_i$，按走向有正有负。
* **例**：$\boldsymbol{F} = (1, 0)$ 是向右的恒力，沿 $x$ 轴从 $(0, 0)$ 走到 $(3, 0)$，功 $\displaystyle\int_0^3 1\,\mathrm{d}x = 3$；反过来走，功是 $-3$。
* **向量形式怎么读**：$\boldsymbol{F} \cdot \mathrm{d}\boldsymbol{r} = P\,\mathrm{d}x + Q\,\mathrm{d}y$，就是数量积（第 4 章）。
* **只有一项**：$\displaystyle\int_L P\,\mathrm{d}x$ 也是第二类曲线积分，就是 $Q = 0$ 的情形。

**③ 绕一圈的积分，换成里面的二重积分**

#### 1. 单连通区域与复连通区域：有没有洞
* **画面**：在区域里放一个橡皮筋圈，不离开区域能把它收成一点，就是单连通；圈套在洞上，就收不回来。
* **例**：圆盘、上半平面是单连通；圆环、去掉一点的圆盘是复连通。
* **为什么要分**：格林公式要对所围的整块区域积分；洞里的点不在区域里，被积函数在那里可能没有定义。

#### 2. 边界曲线的正向：区域在左边
* **例**：圆盘的边界逆时针走，圆盘在左边。
* **圆环的内边界**：沿内圆顺时针走，圆环才在左边。
* **为什么这样规定**：小矩形都逆时针绕时，公共边抵消后剩下的外圈，恰好是这个方向。

**④ 什么时候只看起点和终点**

#### 1. 与路径无关：只看两端
* **例**：重力 $\boldsymbol{F} = (0, -mg)$ 从 $A$ 到 $B$ 做的功是 $-mg(y_B - y_A)$，不管走哪条路。
* **反例**：摩擦力做功与路径有关，路越长，做的负功越多。
* **记号**：只有与路径无关时，才能写成 $\displaystyle\int_A^B$；不写路径也不会有歧义。

#### 2. 原函数：二元的「不定积分」
* **和一元对照**：一元里 $F'(x) = f(x)$，$F$ 是 $f$ 的原函数；这里 $u$ 的两个偏导数分别是 $P$ 和 $Q$。
* **例**：$u = x^2y$ 时 $\mathrm{d}u = 2xy\,\mathrm{d}x + x^2\,\mathrm{d}y$，所以 $x^2y$ 是 $2xy\,\mathrm{d}x + x^2\,\mathrm{d}y$ 的一个原函数。
* **不是每个都有**：$y\,\mathrm{d}x - x\,\mathrm{d}y$ 没有原函数，因为 $P_y = 1$，$Q_x = -1$，不相等。

**⑤ 流过一张曲面的量**

#### 1. 双侧曲面与有向曲面：先说定哪一面算正
* **例**：一张纸有正反两面；蚂蚁在一面上爬，不翻过纸边，到不了另一面，这是双侧曲面。
* **单侧曲面**：纸条扭半圈再粘成的环（莫比乌斯带）只有一面，本章不讨论。
* **球面的外侧**：在上半球面是上侧，在下半球面是下侧。

#### 2. 有向曲面在坐标面上的投影：带符号的面积
* **为什么带符号**：法向量朝下的一小块，投影面积记成负的，水从下往上穿过和从上往下穿过就分开了。
* **例**：平面 $z = 1$ 上的单位正方形，取上侧，$(\Delta S)_{xy} = 1$；取下侧，$(\Delta S)_{xy} = -1$。
* **竖直的曲面**：法向量水平，$\cos\gamma = 0$，投到 $xOy$ 面上只是一条线，记为 $0$。

#### 3. 第二类曲面积分：流量拆成三个方向
* **和第二类曲线积分对照**：曲线上乘的是带符号的 $\Delta x_i$、$\Delta y_i$；曲面上乘的是带符号的投影面积。
* **例**：$R = 1$ 时，$\displaystyle\iint_\Sigma \mathrm{d}x\,\mathrm{d}y$ 是带符号的投影面积；上半球面 $z = \sqrt{a^2 - x^2 - y^2}$ 取上侧，结果是 $\pi a^2$。
* **三项各管一个方向**：$R\,\mathrm{d}x\,\mathrm{d}y$ 是沿 $z$ 方向穿过的部分，$P\,\mathrm{d}y\,\mathrm{d}z$、$Q\,\mathrm{d}z\,\mathrm{d}x$ 是沿 $x$、$y$ 方向的部分。

#### 4. 通量：单位时间穿过的量
* **例**：水以 $\boldsymbol{v} = (0, 0, 2)$ 竖直向上流，穿过平面 $z = 0$ 上面积为 $3$ 的一块（上侧），通量 $2 \times 3 = 6$；取下侧，是 $-6$。
* **斜着穿**：流速与法向量夹角为 $\theta$ 时，只有 $|\boldsymbol{v}|\cos\theta$ 那部分穿过去，所以是数量积 $\boldsymbol{v} \cdot \boldsymbol{n}$。

**⑥ 闭曲面和空间曲线**

#### 1. 散度：一点往外冒的强度
* **例**：$\boldsymbol{A} = (x, y, z)$ 的散度是 $3$，处处往外冒；$\boldsymbol{A} = (-y, x, 0)$ 绕 $z$ 轴转圈，散度是 $0$。
* **符号**：散度为正的点往外冒（源），为负的点往里吸（汇）。

#### 2. 环流量：绕一圈推着走的总量
* **例**：$\boldsymbol{A} = (-y, x, 0)$ 沿 $xOy$ 面上的单位圆逆时针走：$\boldsymbol{A}$ 处处与走向相同、大小为 $1$，环流量是 $2\pi$。
* **和功对照**：环流量就是力沿闭曲线做的功。

#### 3. 旋度：一点处转动的强度和转轴
* **例**：$\boldsymbol{A} = (-y, x, 0)$ 是绕 $z$ 轴、角速度为 $1$ 的转动，旋度是 $(0, 0, 2)$：方向是转轴，大小是角速度的 $2$ 倍。
* **记法**：和向量积的行列式一样（第 4 章），第二行换成求偏导的符号。
* **和格林对照**：$z$ 分量 $Q_x - P_y$ 正是格林公式里的被积函数。

#### 4. 右手法则：方向和侧要配对
* **例**：$\Sigma$ 是上半球面、取上侧，它的边界是 $xOy$ 面上的圆，方向是从 $z$ 轴正向往下看逆时针。
* **和格林对照**：格林公式的「区域在左边」，就是 $\Sigma$ 平放在 $xOy$ 面上、取上侧时的右手法则。

---

### 〔性质〕

**① 弯的线、弯的面上怎么求总量**

**第一类曲线积分**

#### 1. 基本性质：和定积分一样，只是不分方向
* **与方向无关的原因**：$\Delta s_i$ 是长度，从哪头切起都是正数。
* **例**：一根铁丝从左往右称和从右往左称，质量一样。
* **可加的用法**：折线、分段给出的曲线，各段分开算再相加。

#### 2. 化为定积分：$\mathrm{d}s$ 换成参数的微分
* **为什么下限小于上限**：$\mathrm{d}s > 0$；上限比下限小时 $\mathrm{d}t < 0$，算出来的弧长元是负的。
* **例**：圆 $x = a\cos t$，$y = a\sin t$：$\mathrm{d}s = a\,\mathrm{d}t$，周长 $\displaystyle\int_0^{2\pi} a\,\mathrm{d}t = 2\pi a$。
* **极坐标多一项**：$\mathrm{d}s = \sqrt{r^2 + r'^2}\,\mathrm{d}\theta$，不是 $r\,\mathrm{d}\theta$；只有 $r$ 是常数时才是 $r\,\mathrm{d}\theta$。
* **空间的例**：螺旋线 $x = \cos t$，$y = \sin t$，$z = t$：$\mathrm{d}s = \sqrt{2}\,\mathrm{d}t$。

#### 3. 先用曲线方程化简：点在曲线上
* **例**：$L: x^2 + y^2 = 1$ 上 $\displaystyle\oint_L \dfrac{\mathrm{d}s}{x^2 + y^2} = \oint_L 1\,\mathrm{d}s = 2\pi$。
* **只在曲线上能代**：$\displaystyle\int_L$ 里的点满足方程；用格林公式换成区域上的二重积分以后，就不能再代了。

**第一类曲面积分**

#### 1. 基本性质：与侧无关
* **原因**：$\Delta S_i$ 是面积，是正数。
* **可加的用法**：曲面由几片拼成（如圆柱面加上下底），各片分开算再相加。

#### 2. 化为二重积分：$\mathrm{d}S$ 换成投影上的面积元
* **放大倍数**：曲面上的一小片比它的投影大，倍数是 $\sqrt{1 + z_x^2 + z_y^2}$，就是第 6 章的曲面面积元。
* **例**：平面 $z = 1 - x - y$：$z_x = z_y = -1$，$\mathrm{d}S = \sqrt{3}\,\mathrm{d}x\,\mathrm{d}y$。
* **球面公式的推法**：$F = x^2 + y^2 + z^2 - a^2$，$\sqrt{F_x^2 + F_y^2 + F_z^2} = 2a$，$|F_z| = 2|z|$，相除得 $\dfrac{a}{|z|}$。
* **投到哪个面**：曲面写成哪两个变量的函数，就向这两个变量的坐标面投影；圆柱面 $x^2 + y^2 = 1$ 投到 $xOy$ 面只是一条圆周，要投到 $yOz$ 面或直接用参数。

#### 3. 先用曲面方程化简
* **例**：球面上 $\displaystyle\oiint_\Sigma \sqrt{x^2 + y^2 + z^2}\,\mathrm{d}S = a \cdot 4\pi a^2 = 4\pi a^3$。
* **和面积元配合**：上半球面上 $z\,\mathrm{d}S = z \cdot \dfrac{a}{z}\,\mathrm{d}x\,\mathrm{d}y = a\,\mathrm{d}x\,\mathrm{d}y$，$z$ 约掉了。

**对称与应用**

#### 1. 对称性：照搬重积分
* **配对的规则**：曲线关于 $y$ 轴对称，看 $f$ 关于 $x$ 的奇偶，和第 6 章一样。
* **轮换的例**：圆周 $x^2 + y^2 = a^2$ 上 $\displaystyle\oint x^2\,\mathrm{d}s = \oint y^2\,\mathrm{d}s = \dfrac{1}{2}\oint a^2\,\mathrm{d}s = \pi a^3$。
* **空间里的轮换**：球面与平面 $x + y + z = 0$ 的交线，$x, y, z$ 任意互换，曲线都不变。

#### 2. 质量、质心与转动惯量：权不变，元换掉
* **例**：均匀圆周铁丝 $x^2 + y^2 = R^2$（线密度 $\rho$）对 $z$ 轴的转动惯量 $\displaystyle\oint R^2\rho\,\mathrm{d}s = 2\pi R^3\rho = MR^2$，质量全在半径 $R$ 处。
* **形心**：半圆弧的形心离圆心 $\dfrac{2R}{\pi} \approx 0.64R$，半圆片是 $\dfrac{4R}{3\pi} \approx 0.42R$；弧的质量全在边上，所以更远。

#### 3. 引力：按分量积，分母是 $r^3$
* **和第 6 章对照**：把体积元换成弧长元，公式不变。
* **对称**：均匀圆周铁丝对圆心的引力为 $0$，各方向两两抵消。

**② 沿着路走，力做了多少功**

#### 1. 物理意义：功
* **例**：$\boldsymbol{F} = (0, -1)$，从 $(0, 1)$ 沿任意路径到 $(2, 0)$：$W = \displaystyle\int_1^0 (-1)\,\mathrm{d}y = 1$，往下走，重力做正功。
* **力垂直于路径时不做功**：沿圆周运动，力指向圆心，$\boldsymbol{F} \cdot \mathrm{d}\boldsymbol{r} = 0$。

#### 2. 基本性质：反向变号
* **例**：向右的恒力 $(1, 0)$，从 $(0, 0)$ 到 $(3, 0)$ 做功 $3$，反过来是 $-3$。
* **可加的要求**：两段首尾相接、方向一致，才能直接相加。

#### 3. 化为定积分：下限是起点
* **为什么下限可以大**：$\mathrm{d}x = \varphi'(t)\,\mathrm{d}t$ 自带符号；$t$ 从大往小走，正好表示往回走。
* **例**：$L$ 是 $y = x^2$ 从 $(1, 1)$ 到 $(0, 0)$：$\displaystyle\int_L x\,\mathrm{d}x = \int_1^0 x\,\mathrm{d}x = -\dfrac{1}{2}$。
* **以 $x$ 为参数的条件**：曲线能写成 $y = y(x)$；竖直的线段不行，要以 $y$ 为参数。

#### 4. 两类曲线积分的联系：$\mathrm{d}x = \cos\alpha\,\mathrm{d}s$
* **例**：直线 $y = x$ 从 $(0, 0)$ 到 $(1, 1)$：单位切向量是 $\left(\dfrac{1}{\sqrt{2}}, \dfrac{1}{\sqrt{2}}\right)$，$\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \int_L \dfrac{P + Q}{\sqrt{2}}\,\mathrm{d}s$。
* **方向去哪了**：第一类不分方向，方向藏进了切向量；反过来走，切向量变号。

#### 5. 交线的参数式：先投到坐标面
* **例**：$\Gamma: x^2 + y^2 + z^2 = 2$，$z = 1$：投到 $xOy$ 面是 $x^2 + y^2 = 1$，取 $x = \cos t$，$y = \sin t$，$z = 1$。
* **方向怎么定**：从 $z$ 轴正向往下看，$t$ 增加是逆时针；要顺时针，$t$ 从 $2\pi$ 走到 $0$。

**③ 绕一圈的积分，换成里面的二重积分**

#### 1. 格林公式：小矩形的抵消
* **为什么是 $Q_x - P_y$**：小矩形绕一圈，左右两边比较的是 $Q$ 沿 $x$ 的变化；上下两边比较的是 $P$ 沿 $y$ 的变化，上边是往左走的，所以带负号。
* **例**：$P = -y$，$Q = x$：$Q_x - P_y = 2$，绕单位圆一圈 $\displaystyle\oint = 2\pi$。
* **条件不能少**：$P$、$Q$ 在 $D$ 里每一点都要有连续偏导数；有一点没有定义（如原点），就不能直接用。

#### 2. 用曲线积分求面积：让被积函数是 $1$
* **为什么**：$P = -\dfrac{y}{2}$，$Q = \dfrac{x}{2}$ 时 $Q_x - P_y = 1$，二重积分就是面积。
* **例**：单位圆 $x = \cos t$，$y = \sin t$：$\dfrac{1}{2}\displaystyle\int_0^{2\pi} (\cos^2 t + \sin^2 t)\,\mathrm{d}t = \pi$。

#### 3. 补线：凑成闭的
* **补什么**：补的线要好算，常用平行于坐标轴的线段，那里 $\mathrm{d}y = 0$ 或 $\mathrm{d}x = 0$。
* **方向**：$L + L_1$ 首尾相接，绕一圈；看它是逆时针还是顺时针，顺时针要加负号。

#### 4. 挖去奇点：只看绕没绕、绕的方向
* **为什么能换**：$L$ 和 $l$ 之间的环形区域里没有奇点，格林公式成立，被积函数 $Q_x - P_y = 0$。
* **为什么 $l$ 跟着分母选**：$l$ 上分母是常数，可以提到积分号外，剩下的分子是多项式，再用格林公式。
* **例**：$\displaystyle\oint \dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2 + y^2}$ 逆时针绕原点：取 $l: x^2 + y^2 = \varepsilon^2$，$= \dfrac{1}{\varepsilon^2} \cdot 2 \cdot \pi\varepsilon^2 = 2\pi$。

#### 5. 法向形式（边界）：流出边界的量
* **画面**：把 $(P, Q)$ 看成平面上的流速，左边是从 $D$ 的边界流出去的量，$P_x + Q_y$ 是每一点往外冒的量；它是 ⑥ 高斯公式的平面版本。
* **例**：$P = x$，$Q = y$，单位圆：外法向量是 $(x, y)$，左边 $\displaystyle\oint (x^2 + y^2)\,\mathrm{d}s = 2\pi$；右边 $\displaystyle\iint 2\,\mathrm{d}\sigma = 2\pi$。

**④ 什么时候只看起点和终点**

#### 1. 与路径无关的四个等价条件：一个闭路，一个偏导，一个原函数
* **最常用的是第 3 条**：只要求两个偏导数，最好算；用它判断，再用第 1、4 条计算。
* **单连通不能少**：$\dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2 + y^2}$ 在去掉原点的平面上偏导相等，绕原点一圈却是 $2\pi$。
* **例**：$2xy\,\mathrm{d}x + x^2\,\mathrm{d}y$：$P_y = 2x = Q_x$，整个平面单连通，与路径无关。

#### 2. 求原函数：三种办法
* **折线为什么先横后竖**：横着走 $y = y_0$ 固定、$\mathrm{d}y = 0$，只剩 $P(x, y_0)$；竖着走 $x$ 固定、$\mathrm{d}x = 0$，只剩 $Q(x, y)$。
* **例**：$2xy\,\mathrm{d}x + x^2\,\mathrm{d}y$，从原点出发：$\displaystyle\int_0^x 0\,\mathrm{d}x + \int_0^y x^2\,\mathrm{d}y = x^2y$。
* **起点避开奇点**：$P$、$Q$ 在原点没有定义时，从 $(1, 0)$ 这类点出发。

#### 3. 与路径无关时的计算：两端相减
* **例**：$\displaystyle\int_{(0, 0)}^{(1, 1)} 2xy\,\mathrm{d}x + x^2\,\mathrm{d}y = u(1, 1) - u(0, 0) = 1$。
* **和牛顿-莱布尼茨对照**：一元 $\displaystyle\int_a^b f\,\mathrm{d}x = F(b) - F(a)$；这里只是把区间换成了两点之间的任意路径。

#### 4. 区域有洞（边界）：绕洞一圈的量
* **例**：$\displaystyle\oint \dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2 + y^2}$，逆时针绕原点两圈是 $4\pi$，顺时针绕一圈是 $-2\pi$。
* **右半平面里**：$u = \arctan\dfrac{y}{x}$ 是原函数，积分就是终点与起点的极角之差。

**⑤ 流过一张曲面的量**

#### 1. 物理意义：流量
* **例**：$\boldsymbol{v} = (0, 0, 1)$ 竖直向上，穿过上半球面 $x^2 + y^2 + z^2 = 1$（上侧）的流量是 $\pi$，等于它在 $xOy$ 面上投影的面积。
* **为什么只看投影**：竖直的水流，穿过曲面的量只看曲面挡住了多大的水平截面。

#### 2. 基本性质：换侧变号
* **例**：上例改取下侧，流量是 $-\pi$。
* **闭曲面**：外侧的通量为正，表示流出多于流入。

#### 3. 两类曲面积分的联系：$\mathrm{d}x\,\mathrm{d}y = \cos\gamma\,\mathrm{d}S$
* **例**：平面 $x + y + z = 1$ 取上侧：单位法向量是 $\dfrac{1}{\sqrt{3}}(1, 1, 1)$，$\displaystyle\iint_\Sigma R\,\mathrm{d}x\,\mathrm{d}y = \iint_\Sigma \dfrac{R}{\sqrt{3}}\,\mathrm{d}S$。
* **侧去哪了**：第一类不分侧；第二类的侧，体现在 $\cos\alpha$、$\cos\beta$、$\cos\gamma$ 的符号上。

#### 4. 分面投影：一项投一个面
* **为什么下侧取负**：下侧的 $\cos\gamma < 0$，带符号的投影面积是负的。
* **例**：平面 $z = 2$ 上的圆盘 $x^2 + y^2 \le 1$，取上侧：$\displaystyle\iint z\,\mathrm{d}x\,\mathrm{d}y = 2\pi$；取下侧：$-2\pi$。
* **垂直的曲面**：圆柱面 $x^2 + y^2 = 1$ 在 $xOy$ 面上的投影是一条圆周，面积为 $0$。

#### 5. 合一投影：用法向量把三项换到一个面
* **为什么可以**：同一小块的三个投影，比例就是法向量三个分量之比，所以 $\mathrm{d}y\,\mathrm{d}z = -z_x\,\mathrm{d}x\,\mathrm{d}y$。
* **例**：平面 $z = 1 - x - y$ 取上侧：$z_x = z_y = -1$，三项合成 $\displaystyle\iint_{D_{xy}} (P + Q + R)\,\mathrm{d}x\,\mathrm{d}y$。
* **适用条件**：曲面能写成 $z = z(x, y)$，投影不重叠；上下两片重叠时，分开投。

#### 6. 对称性：和第一类相反
* **为什么相反**：上下对称的两小块，$R$ 是偶函数时值相同，可上半取上侧、下半取下侧，投影面积一正一负，抵消。
* **例**：球面外侧上 $\displaystyle\oiint z^2\,\mathrm{d}x\,\mathrm{d}y = 0$（偶）；$\displaystyle\oiint z\,\mathrm{d}x\,\mathrm{d}y = \dfrac{4}{3}\pi a^3$（奇，加倍）。

**⑥ 闭曲面和空间曲线**

**高斯公式**

#### 1. 高斯公式：小方块的流出量相加
* **和格林对照**：格林是小矩形各绕一圈，高斯是小方块各算流出；公共的边、公共的面都抵消。
* **例**：$\boldsymbol{A} = (x, y, z)$，单位球面外侧：散度是 $3$，$\displaystyle\oiint = 3 \cdot \dfrac{4\pi}{3} = 4\pi$。
* **条件**：闭曲面、外侧、$P, Q, R$ 在立体里每一点都有连续偏导数。

#### 2. 通量与散度：缩成一点
* **例**：$\boldsymbol{A} = (x, y, z)$，半径 $\varepsilon$ 的小球面外侧，通量是 $\varepsilon \cdot 4\pi\varepsilon^2$，除以体积 $\dfrac{4}{3}\pi\varepsilon^3$ 得 $3$，就是散度。
* **和第 6 章对照**：中值定理里，区域上的积分除以面积，缩成一点时趋于这一点的值；这里是同一个想法。

#### 3. 补面：凑成闭的
* **补什么**：常补平行于坐标面的平面，那里只剩一项，如 $z = h$ 上 $\mathrm{d}y\,\mathrm{d}z = \mathrm{d}z\,\mathrm{d}x = 0$。
* **侧**：补上的面和原曲面一起，要组成闭曲面的外侧（或都取内侧）。

#### 4. 挖去奇点：换成小球面
* **为什么都是 $4\pi$**：小球面上 $\dfrac{(x, y, z)}{r^3}$ 的大小是 $\dfrac{1}{\varepsilon^2}$，方向就是外法向，通量 $\dfrac{1}{\varepsilon^2} \cdot 4\pi\varepsilon^2 = 4\pi$。
* **和格林对照**：③ 里绕原点一圈得 $2\pi$；这里穿出围住原点的闭曲面得 $4\pi$。

#### 5. 用曲面积分求体积：让散度是 $1$
* **例**：单位球面外侧，$\displaystyle\oiint z\,\mathrm{d}x\,\mathrm{d}y = \dfrac{4\pi}{3}$，就是球的体积。

**斯托克斯公式**

#### 1. 斯托克斯公式：曲面上的小块各绕一圈
* **行列式怎么记**：和旋度的行列式一样，只是第一行换成三个投影 $\mathrm{d}y\,\mathrm{d}z$、$\mathrm{d}z\,\mathrm{d}x$、$\mathrm{d}x\,\mathrm{d}y$。
* **曲面怎么选**：只要以 $\Gamma$ 为边界、侧符合右手法则，结果都相同；选平面最省事。
* **例**：$\Gamma$ 是 $xOy$ 面上的单位圆（逆时针），$\boldsymbol{A} = (-y, x, 0)$：$\operatorname{rot}\boldsymbol{A} = (0, 0, 2)$，取圆盘上侧，$\displaystyle\iint 2\,\mathrm{d}S = 2\pi$，与环流量相同。

#### 2. 环流量与旋度：缩成一点
* **例**：$\boldsymbol{A} = (-y, x, 0)$，半径 $\varepsilon$ 的小圆（法向量 $\boldsymbol{k}$，逆时针）上环流量是 $2\pi\varepsilon^2$，除以面积 $\pi\varepsilon^2$ 得 $2$，就是旋度的 $z$ 分量。

#### 3. 格林公式是特例：曲面平放
* **例**：$\Sigma$ 是 $xOy$ 面上的 $D$、取上侧：$\boldsymbol{n} = (0, 0, 1)$，$\operatorname{rot}\boldsymbol{A} \cdot \boldsymbol{n} = Q_x - P_y$。

#### 4. 空间曲线积分与路径无关（边界）：旋度为零
* **和 ④ 对照**：平面上要 $Q_x - P_y = 0$；空间里旋度的三个分量都为 $0$，即三个坐标面上格林公式的被积函数都为 $0$。
* **例**：$\boldsymbol{A} = (yz, zx, xy)$ 是 $xyz$ 的梯度，$\operatorname{rot}\boldsymbol{A} = \boldsymbol{0}$。

**梯度、散度、旋度**

#### 1. 两个恒等式：两次求导抵消
* **梯度无旋的意思**：梯度场（如重力场）沿闭曲线做功为 $0$，和 ④ 对得上。
* **例**：$u = x^2yz$：$\operatorname{grad} u = (2xyz, x^2z, x^2y)$，旋度的第一个分量 $\dfrac{\partial(x^2y)}{\partial y} - \dfrac{\partial(x^2z)}{\partial z} = x^2 - x^2 = 0$。

---

### 〔例题〕

**① 弯的线、弯的面上怎么求总量**

#### 例题 1：三条曲线，三种写法

**题目**：
1. $L: x^2 + y^2 = 4$，求 $\displaystyle\oint_L (x^2 + 3y^2 + 2x)\,\mathrm{d}s$；
2. $L$ 是圆周 $x^2 + y^2 = 2x$，求 $\displaystyle\oint_L \sqrt{x^2 + y^2}\,\mathrm{d}s$；
3. $\Gamma$ 是螺旋线 $x = \cos t$，$y = \sin t$，$z = t$（$0 \le t \le 2\pi$），求 $\displaystyle\int_\Gamma (x^2 + y^2 + z^2)\,\mathrm{d}s$。
##### 【小题 1】对称和轮换
* $2x$ 关于 $x$ 是奇函数，圆关于 $y$ 轴对称，积分为 $0$；
* 轮换：$\displaystyle\oint x^2\,\mathrm{d}s = \oint y^2\,\mathrm{d}s = \dfrac{1}{2}\oint 4\,\mathrm{d}s = 2 \cdot 4\pi = 8\pi$；
* 原式 $= 8\pi + 3 \cdot 8\pi = 32\pi$。
* **细节**：$\displaystyle\oint 4\,\mathrm{d}s$ 是 $4$ 乘周长 $4\pi$，等于 $16\pi$，一半是 $8\pi$。
##### 【小题 2】极坐标
* 圆 $x^2 + y^2 = 2x$ 化成 $r = 2\cos\theta$，$-\dfrac{\pi}{2} \le \theta \le \dfrac{\pi}{2}$；
* $\mathrm{d}s = \sqrt{r^2 + r'^2}\,\mathrm{d}\theta = \sqrt{4\cos^2\theta + 4\sin^2\theta}\,\mathrm{d}\theta = 2\,\mathrm{d}\theta$；
* 原式 $= \displaystyle\int_{-\frac{\pi}{2}}^{\frac{\pi}{2}} 2\cos\theta \cdot 2\,\mathrm{d}\theta = 8$。
* **细节**：被积函数 $\sqrt{x^2 + y^2}$ 就是 $r$，在曲线上等于 $2\cos\theta$；$\mathrm{d}s$ 不是 $r\,\mathrm{d}\theta$。
##### 【小题 3】空间曲线
* $\mathrm{d}s = \sqrt{\sin^2 t + \cos^2 t + 1}\,\mathrm{d}t = \sqrt{2}\,\mathrm{d}t$，$x^2 + y^2 + z^2 = 1 + t^2$；
* 原式 $= \sqrt{2}\displaystyle\int_0^{2\pi}(1 + t^2)\,\mathrm{d}t = \sqrt{2}\left(2\pi + \dfrac{8\pi^3}{3}\right)$。
* **细节**：$x^2 + y^2 = 1$ 先代掉，只剩 $t^2$ 要积。

#### 例题 2：几张曲面，以及薄壳的转动惯量

**题目**：
1. $\Sigma$ 是球面 $x^2 + y^2 + z^2 = 4$，求 $\displaystyle\oiint_\Sigma (x^2 + y^2)\,\mathrm{d}S$；
2. $\Sigma$ 是平面 $x + y + z = 1$ 在第一卦限的部分，求 $\displaystyle\iint_\Sigma z\,\mathrm{d}S$；
3. $\Sigma$ 是圆柱面 $x^2 + y^2 = 1$ 介于 $z = 0$ 与 $z = 2$ 之间的部分，求 $\displaystyle\iint_\Sigma (x^2 + z)\,\mathrm{d}S$；
4. 小题 1 的球面是面密度为 $\rho$ 的均匀薄壳，求它对 $z$ 轴的转动惯量。
##### 【小题 1】轮换
* $\displaystyle\oiint x^2\,\mathrm{d}S = \oiint y^2\,\mathrm{d}S = \oiint z^2\,\mathrm{d}S = \dfrac{1}{3}\oiint 4\,\mathrm{d}S = \dfrac{1}{3} \cdot 4 \cdot 16\pi = \dfrac{64\pi}{3}$；
* 原式 $= \dfrac{128\pi}{3}$。
* **细节**：球面面积 $4\pi \cdot 2^2 = 16\pi$。
##### 【小题 2】投影，再用轮换核对
* $z = 1 - x - y$，$\mathrm{d}S = \sqrt{3}\,\mathrm{d}x\,\mathrm{d}y$，投影是三角形 $x \ge 0$，$y \ge 0$，$x + y \le 1$；
* 原式 $= \sqrt{3}\displaystyle\iint_{D_{xy}}(1 - x - y)\,\mathrm{d}x\,\mathrm{d}y = \sqrt{3} \cdot \dfrac{1}{6} = \dfrac{\sqrt{3}}{6}$；
* 核对：$x, y, z$ 互换平面不变，$\displaystyle\iint z\,\mathrm{d}S = \dfrac{1}{3}\iint (x + y + z)\,\mathrm{d}S = \dfrac{1}{3}\iint 1\,\mathrm{d}S = \dfrac{1}{3} \cdot \dfrac{\sqrt{3}}{2} = \dfrac{\sqrt{3}}{6}$。
* **细节**：$\displaystyle\iint_{D_{xy}}(1 - x - y)\,\mathrm{d}x\,\mathrm{d}y$ 是四面体的体积 $\dfrac{1}{6}$；三角形的面积是 $\dfrac{\sqrt{3}}{2}$（边长 $\sqrt{2}$ 的正三角形）。
##### 【小题 3】曲面竖着，不能投到 $xOy$ 面
* 用参数 $x = \cos\theta$，$y = \sin\theta$，$z = z$：小块是边长 $\mathrm{d}\theta$ 与 $\mathrm{d}z$ 的小矩形，$\mathrm{d}S = \mathrm{d}\theta\,\mathrm{d}z$；
* $\displaystyle\iint x^2\,\mathrm{d}S = \int_0^{2\pi}\cos^2\theta\,\mathrm{d}\theta \cdot \int_0^2 \mathrm{d}z = 2\pi$，$\displaystyle\iint z\,\mathrm{d}S = 2\pi \cdot \int_0^2 z\,\mathrm{d}z = 4\pi$；
* 原式 $= 6\pi$。
* **细节**：若要投影，就投到 $yOz$ 面，分 $x = \pm\sqrt{1 - y^2}$ 前后两片，每片 $\mathrm{d}S = \dfrac{\mathrm{d}y\,\mathrm{d}z}{\sqrt{1 - y^2}}$；参数法省掉了分片。
##### 【小题 4】权换成到轴距离的平方
* $I_z = \displaystyle\oiint_\Sigma (x^2 + y^2)\rho\,\mathrm{d}S = \dfrac{128\pi\rho}{3}$；
* 质量 $M = 16\pi\rho$，所以 $I_z = \dfrac{2}{3}M \cdot 2^2$，即 $\dfrac{2}{3}MR^2$。
* **细节**：到 $z$ 轴的距离平方是 $x^2 + y^2$，正是小题 1 的被积函数。

---

**② 沿着路走，力做了多少功**

#### 例题 3：一个力，三条路

**题目**：力 $\boldsymbol{F} = (x^2, xy)$，质点从 $O(0, 0)$ 移到 $A(1, 1)$。
1. 沿直线 $y = x$，求功；
2. 沿抛物线 $y = x^2$，求功；
3. 沿折线 $O \to (1, 0) \to A$，求功；
4. 沿抛物线从 $A$ 回到 $O$，求功；
5. 把沿直线的功写成对弧长的曲线积分，再算一次。
##### 【小题 1】直线
* $x = y = t$，$t$ 从 $0$ 到 $1$：$\displaystyle\int_0^1 (t^2 + t \cdot t)\,\mathrm{d}t = \dfrac{2}{3}$。
##### 【小题 2】抛物线
* $x = t$，$y = t^2$，$\mathrm{d}y = 2t\,\mathrm{d}t$：$\displaystyle\int_0^1 (t^2 + t \cdot t^2 \cdot 2t)\,\mathrm{d}t = \dfrac{1}{3} + \dfrac{2}{5} = \dfrac{11}{15}$。
##### 【小题 3】折线
* 第一段 $y = 0$，$\mathrm{d}y = 0$：$\displaystyle\int_0^1 x^2\,\mathrm{d}x = \dfrac{1}{3}$；
* 第二段 $x = 1$，$\mathrm{d}x = 0$：$\displaystyle\int_0^1 y\,\mathrm{d}y = \dfrac{1}{2}$；
* 合计 $\dfrac{5}{6}$。
* **细节**：三条路结果不同，因为 $P_y = 0$，$Q_x = y$，不相等；④ 讲什么时候会相同。
##### 【小题 4】反过来走
* 参数还是 $x = t$，$y = t^2$，$t$ 从 $1$ 到 $0$：结果 $-\dfrac{11}{15}$。
* **细节**：下限 $1$ 比上限 $0$ 大，不用调换；调换就成了正着走。
##### 【小题 5】化成第一类
* 单位切向量 $\left(\dfrac{1}{\sqrt{2}}, \dfrac{1}{\sqrt{2}}\right)$：功 $= \displaystyle\int_L \dfrac{x^2 + xy}{\sqrt{2}}\,\mathrm{d}s$；
* $x = y = t$，$\mathrm{d}s = \sqrt{2}\,\mathrm{d}t$：$\displaystyle\int_0^1 \dfrac{2t^2}{\sqrt{2}} \cdot \sqrt{2}\,\mathrm{d}t = \dfrac{2}{3}$，与小题 1 相同。
* **细节**：化成第一类以后，下限必须小于上限，方向已经放进切向量里了。

#### 例题 4：空间曲线上的功

**题目**：
1. $\Gamma$ 是螺旋线 $x = \cos t$，$y = \sin t$，$z = t$，从 $t = 0$ 到 $t = 2\pi$，求 $\displaystyle\int_\Gamma z\,\mathrm{d}x + x\,\mathrm{d}y + y\,\mathrm{d}z$；
2. $\Gamma$ 是圆柱面 $x^2 + y^2 = 1$ 与平面 $x - y + z = 2$ 的交线，从 $z$ 轴正向看去为顺时针，求 $\displaystyle\oint_\Gamma (z - y)\,\mathrm{d}x + (x - z)\,\mathrm{d}y + (x - y)\,\mathrm{d}z$。
##### 【小题 1】直接代
* $\mathrm{d}x = -\sin t\,\mathrm{d}t$，$\mathrm{d}y = \cos t\,\mathrm{d}t$，$\mathrm{d}z = \mathrm{d}t$；
* 原式 $= \displaystyle\int_0^{2\pi}(-t\sin t + \cos^2 t + \sin t)\,\mathrm{d}t = 2\pi + \pi + 0 = 3\pi$。
* **细节**：$\displaystyle\int_0^{2\pi} t\sin t\,\mathrm{d}t = -2\pi$（分部），前面有负号，得 $2\pi$。
##### 【小题 2】交线，先写参数，再定方向
* 投到 $xOy$ 面是单位圆：$x = \cos t$，$y = \sin t$，$z = 2 - \cos t + \sin t$；
* 顺时针：$t$ 从 $2\pi$ 到 $0$；
* 代入：$P = 2 - \cos t$，$Q = 2\cos t - 2 - \sin t$，$R = \cos t - \sin t$，$\mathrm{d}z = (\sin t + \cos t)\,\mathrm{d}t$；
* 被积式化为 $(3\cos^2 t - \sin^2 t - 2\cos t - 2\sin t)\,\mathrm{d}t = (1 + 2\cos 2t - 2\cos t - 2\sin t)\,\mathrm{d}t$；
* 原式 $= \displaystyle\int_{2\pi}^{0}(1 + 2\cos 2t - 2\cos t - 2\sin t)\,\mathrm{d}t = -2\pi$。
* **细节**：$3\cos^2 t - \sin^2 t = 1 + 2\cos 2t$，只有常数项 $1$ 积分不为 $0$；方向反了，结果就差一个负号。例题 10 用斯托克斯公式核对。

---

**③ 绕一圈的积分，换成里面的二重积分**

#### 例题 5：格林公式的四种用法

**题目**：
1. $L$ 是矩形 $0 \le x \le 1$，$0 \le y \le 2$ 的正向边界，求 $\displaystyle\oint_L (x^2y - 2y)\,\mathrm{d}x + \left(\dfrac{x^3}{3} - x\right)\mathrm{d}y$；
2. $L$ 是上半圆周 $x^2 + y^2 = 1$ 从 $A(1, 0)$ 到 $B(-1, 0)$，求 $\displaystyle\int_L (x^2y + 3y)\,\mathrm{d}x + \left(\dfrac{x^3}{3} + y^3\right)\mathrm{d}y$；
3. $L$ 是不经过原点的光滑闭曲线，逆时针，求 $\displaystyle\oint_L \dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2 + y^2}$；
4. 求星形线 $x = \cos^3 t$，$y = \sin^3 t$ 所围的面积。
##### 【小题 1】被积函数复杂，差是常数
* $Q_x - P_y = (x^2 - 1) - (x^2 - 2) = 1$；
* 原式 $= \displaystyle\iint_D 1\,\mathrm{d}\sigma = 2$。
* **细节**：直接沿四条边算要分四段；格林公式把它变成矩形的面积。
##### 【小题 2】补线
* 补 $L_1$：$x$ 轴上从 $B(-1, 0)$ 到 $A(1, 0)$；$L + L_1$ 逆时针围成上半圆盘；
* $Q_x - P_y = x^2 - (x^2 + 3) = -3$，$\displaystyle\oint_{L + L_1} = -3 \cdot \dfrac{\pi}{2} = -\dfrac{3\pi}{2}$；
* $L_1$ 上 $y = 0$，$\mathrm{d}y = 0$，$P = 0$，积分为 $0$；
* 原式 $= -\dfrac{3\pi}{2}$。
* **细节**：从 $A$ 沿上半圆到 $B$ 是逆时针；若题目给的是从 $B$ 到 $A$，$L + L_1$ 是顺时针，结果变号。
##### 【小题 3】分两种情形
* 原点以外 $P_y = Q_x = \dfrac{y^2 - x^2}{(x^2 + y^2)^2}$；
* **若 $L$ 不围住原点**：$L$ 所围区域里没有奇点，用格林公式，原式 $= 0$；
* **若 $L$ 围住原点**：在 $L$ 里面取小圆 $l: x^2 + y^2 = \varepsilon^2$（逆时针），原式 $= \dfrac{1}{\varepsilon^2}\displaystyle\oint_l x\,\mathrm{d}y - y\,\mathrm{d}x = \dfrac{1}{\varepsilon^2} \cdot 2\pi\varepsilon^2 = 2\pi$。
* **细节**：在 $l$ 上先把分母换成 $\varepsilon^2$，才能用格林公式；直接对原式用格林公式会得 $0$，是错的。
##### 【小题 4】面积
* $x\,\mathrm{d}y - y\,\mathrm{d}x = [\cos^3 t \cdot 3\sin^2 t\cos t + \sin^3 t \cdot 3\cos^2 t\sin t]\,\mathrm{d}t = 3\sin^2 t\cos^2 t\,\mathrm{d}t$；
* $A = \dfrac{1}{2}\displaystyle\int_0^{2\pi} 3\sin^2 t\cos^2 t\,\mathrm{d}t = \dfrac{3}{2} \cdot \dfrac{\pi}{4} = \dfrac{3\pi}{8}$。
* **细节**：$\sin^2 t\cos^2 t = \dfrac{\sin^2 2t}{4}$，在 $[0, 2\pi]$ 上积分是 $\dfrac{\pi}{4}$。

---

**④ 什么时候只看起点和终点**

#### 例题 6：一个全微分，四种问法

**题目**：
1. 求 $a$，使 $\displaystyle\int_L (x^4 + 4xy^a)\,\mathrm{d}x + (6x^{a-1}y^2 - 5y^4)\,\mathrm{d}y$ 与路径无关；
2. 对这个 $a$，求原函数 $u$，并求从 $(0, 0)$ 到 $(1, 2)$ 的积分；
3. 不求 $u$，改走折线核对小题 2；
4. 求 $\displaystyle\int \dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2 + y^2}$ 从 $(1, 0)$ 到 $(1, 1)$ 的值，路径不经过原点。
##### 【小题 1】偏导相等，比较次数和系数
* $P_y = 4axy^{a-1}$，$Q_x = 6(a - 1)x^{a-2}y^2$；
* 对所有 $x, y$ 相等：$y$ 的次数 $a - 1 = 2$，$x$ 的次数 $a - 2 = 1$，系数 $4a = 6(a - 1)$，都给出 $a = 3$。
* **细节**：三个条件要同时成立；只比一个可能得到假答案。
##### 【小题 2】偏积分
* $u = \displaystyle\int (x^4 + 4xy^3)\,\mathrm{d}x = \dfrac{x^5}{5} + 2x^2y^3 + \varphi(y)$；
* $u_y = 6x^2y^2 + \varphi'(y) = 6x^2y^2 - 5y^4$，$\varphi(y) = -y^5$；
* $u = \dfrac{x^5}{5} + 2x^2y^3 - y^5$，积分 $= u(1, 2) - u(0, 0) = \dfrac{1}{5} + 16 - 32 = -\dfrac{79}{5}$。
##### 【小题 3】折线
* $(0, 0) \to (1, 0)$：$y = 0$，$\displaystyle\int_0^1 x^4\,\mathrm{d}x = \dfrac{1}{5}$；
* $(1, 0) \to (1, 2)$：$x = 1$，$\displaystyle\int_0^2 (6y^2 - 5y^4)\,\mathrm{d}y = 16 - 32 = -16$；
* 合计 $-\dfrac{79}{5}$，相同。
##### 【小题 4】区域有洞，分两种情形
* 原点以外偏导相等；在右半平面 $x > 0$ 里，$u = \arctan\dfrac{y}{x}$ 是原函数；
* **若路径留在右半平面里**：积分 $= \arctan 1 - \arctan 0 = \dfrac{\pi}{4}$；
* **若路径先逆时针绕原点一圈**：多出绕原点一圈的 $2\pi$，积分 $= \dfrac{\pi}{4} + 2\pi$。
* **细节**：$\arctan\dfrac{y}{x}$ 在 $y$ 轴上没有定义，只能在右半平面里当原函数；整个去掉原点的平面上没有原函数。

---

**⑤ 流过一张曲面的量**

#### 例题 7：一个碗，两种投影

**题目**：$\Sigma$ 是旋转抛物面 $z = x^2 + y^2$（$0 \le z \le 1$），取下侧。
1. 求 $\displaystyle\iint_\Sigma z\,\mathrm{d}x\,\mathrm{d}y$；
2. 用分面投影求 $\displaystyle\iint_\Sigma x\,\mathrm{d}y\,\mathrm{d}z$；
3. 用合一投影求同一个积分，并求 $\displaystyle\iint_\Sigma x\,\mathrm{d}y\,\mathrm{d}z + y\,\mathrm{d}z\,\mathrm{d}x + z\,\mathrm{d}x\,\mathrm{d}y$；
4. 改取上侧，小题 3 的结果是多少。
##### 【小题 1】投到 $xOy$ 面
* 下侧取负号，$z$ 用 $x^2 + y^2$ 代入：$-\displaystyle\iint_{x^2 + y^2 \le 1}(x^2 + y^2)\,\mathrm{d}x\,\mathrm{d}y = -2\pi \cdot \dfrac{1}{4} = -\dfrac{\pi}{2}$。
##### 【小题 2】投到 $yOz$ 面，分前后两片
* 前片 $x = \sqrt{z - y^2}$：下侧的法向量 $(2x, 2y, -1)$，在前片上 $x$ 分量为正，是前侧，取正号；
* 后片 $x = -\sqrt{z - y^2}$：$x$ 分量为负，是后侧，取负号；
* 原式 $= \displaystyle\iint_{D_{yz}}\sqrt{z - y^2}\,\mathrm{d}y\,\mathrm{d}z - \iint_{D_{yz}}\left(-\sqrt{z - y^2}\right)\mathrm{d}y\,\mathrm{d}z = 2\iint_{D_{yz}}\sqrt{z - y^2}\,\mathrm{d}y\,\mathrm{d}z$，$D_{yz}: y^2 \le z \le 1$；
* $= 2\displaystyle\int_{-1}^{1}\dfrac{2}{3}(1 - y^2)^{\frac{3}{2}}\,\mathrm{d}y = \dfrac{4}{3} \cdot \dfrac{3\pi}{8} = \dfrac{\pi}{2}$。
* **细节**：两片的侧不同，正负号也不同；被积函数 $x$ 在两片上也一正一负，乘起来都是正的。
##### 【小题 3】合一投影
* 合一投影按上侧写成 $-Pz_x - Qz_y + R$，取下侧整体加负号；$z_x = 2x$，$z_y = 2y$；
* 只看 $x\,\mathrm{d}y\,\mathrm{d}z$：$-\displaystyle\iint_{D_{xy}}(-x \cdot 2x)\,\mathrm{d}x\,\mathrm{d}y = 2\iint_{D_{xy}} x^2\,\mathrm{d}x\,\mathrm{d}y = 2 \cdot \dfrac{\pi}{4} = \dfrac{\pi}{2}$，与小题 2 相同；
* 三项一起：$-\displaystyle\iint_{D_{xy}}(-x \cdot 2x - y \cdot 2y + x^2 + y^2)\,\mathrm{d}x\,\mathrm{d}y = \iint_{D_{xy}}(x^2 + y^2)\,\mathrm{d}x\,\mathrm{d}y = \dfrac{\pi}{2}$。
* **细节**：$R = z$ 也要用 $x^2 + y^2$ 代入；三项分开算是 $\dfrac{\pi}{2} + \dfrac{\pi}{2} - \dfrac{\pi}{2}$。
##### 【小题 4】换侧
* 改取上侧，结果变号：$-\dfrac{\pi}{2}$。

#### 例题 8：圆柱面上的对称

**题目**：$\Sigma$ 是圆柱面 $x^2 + y^2 = 1$ 介于 $z = 0$ 与 $z = 3$ 之间的部分，取外侧。
1. 求 $\displaystyle\iint_\Sigma z\,\mathrm{d}x\,\mathrm{d}y$；
2. 求 $\displaystyle\iint_\Sigma x\,\mathrm{d}y\,\mathrm{d}z$；
3. 求 $\displaystyle\iint_\Sigma x^2\,\mathrm{d}y\,\mathrm{d}z$。
##### 【小题 1】垂直于 $xOy$ 面
* 圆柱面的法向量水平，$\cos\gamma = 0$，原式 $= 0$。
##### 【小题 2】奇函数，加倍
* 前片 $x = \sqrt{1 - y^2}$ 取前侧（外侧），后片 $x = -\sqrt{1 - y^2}$ 取后侧；
* 原式 $= 2\displaystyle\iint_{D_{yz}}\sqrt{1 - y^2}\,\mathrm{d}y\,\mathrm{d}z = 2 \cdot 3 \cdot \dfrac{\pi}{2} = 3\pi$，$D_{yz}: -1 \le y \le 1$，$0 \le z \le 3$。
* **细节**：$\displaystyle\int_{-1}^{1}\sqrt{1 - y^2}\,\mathrm{d}y = \dfrac{\pi}{2}$，是半个单位圆的面积。
##### 【小题 3】偶函数，抵消
* 两片关于 $yOz$ 面对称，侧相反；$x^2$ 关于 $x$ 是偶函数，两片的积分一正一负，原式 $= 0$。
* **细节**：第一类积分里偶函数要加倍；第二类正好相反。

---

**⑥ 闭曲面和空间曲线**

#### 例题 9：高斯公式：闭的、不闭的、有奇点的

**题目**：
1. $\Sigma$ 是立方体 $0 \le x, y, z \le 1$ 的表面外侧，求 $\displaystyle\oiint_\Sigma x^2\,\mathrm{d}y\,\mathrm{d}z + y^2\,\mathrm{d}z\,\mathrm{d}x + z^2\,\mathrm{d}x\,\mathrm{d}y$；
2. 用补面核对例题 7 小题 3 的结果 $\dfrac{\pi}{2}$；
3. $\Sigma$ 是不经过原点的光滑闭曲面，外侧，求 $\displaystyle\oiint_\Sigma \dfrac{x\,\mathrm{d}y\,\mathrm{d}z + y\,\mathrm{d}z\,\mathrm{d}x + z\,\mathrm{d}x\,\mathrm{d}y}{(x^2 + y^2 + z^2)^{\frac{3}{2}}}$。
##### 【小题 1】闭曲面，直接用
* 散度 $2x + 2y + 2z$；
* 原式 $= \displaystyle\iiint_\Omega 2(x + y + z)\,\mathrm{d}v = 2 \cdot 3 \cdot \dfrac{1}{2} = 3$。
* **细节**：$\displaystyle\iiint_\Omega x\,\mathrm{d}v = \dfrac{1}{2}$（形心在 $x = \dfrac{1}{2}$，体积 $1$），轮换得三项相等。
##### 【小题 2】补面
* 补顶面 $\Sigma_1: z = 1$（$x^2 + y^2 \le 1$），取上侧；$\Sigma$（下侧）加 $\Sigma_1$（上侧）是碗形立体表面的外侧；
* 散度 $3$，碗的体积 $\displaystyle\int_0^1 \pi z\,\mathrm{d}z = \dfrac{\pi}{2}$，闭曲面上的积分 $= \dfrac{3\pi}{2}$；
* 顶面上 $\mathrm{d}y\,\mathrm{d}z = \mathrm{d}z\,\mathrm{d}x = 0$，只剩 $\displaystyle\iint_{\Sigma_1} z\,\mathrm{d}x\,\mathrm{d}y = 1 \cdot \pi = \pi$；
* 结果 $\dfrac{3\pi}{2} - \pi = \dfrac{\pi}{2}$，与例题 7 相同。
* **细节**：碗的高度 $z$ 处截面是半径 $\sqrt{z}$ 的圆，面积 $\pi z$。
##### 【小题 3】分两种情形
* 原点以外散度为 $0$；
* **若 $\Sigma$ 不围住原点**：用高斯公式，原式 $= 0$；
* **若 $\Sigma$ 围住原点**：在里面取小球面 $x^2 + y^2 + z^2 = \varepsilon^2$（外侧），分母是 $\varepsilon^3$，原式 $= \dfrac{1}{\varepsilon^3} \cdot 3 \cdot \dfrac{4}{3}\pi\varepsilon^3 = 4\pi$。
* **细节**：$\Sigma$ 本身就是球面 $x^2 + y^2 + z^2 = R^2$ 时，可以直接把分母代成 $R^3$，不必再挖。

#### 例题 10：斯托克斯公式

**题目**：
1. 用斯托克斯公式核对例题 4 小题 2；
2. $\Gamma$ 是球面 $x^2 + y^2 + z^2 = 1$ 与平面 $x + y + z = 0$ 的交线，从 $z$ 轴正向看去为逆时针，求 $\displaystyle\oint_\Gamma y\,\mathrm{d}x + z\,\mathrm{d}y + x\,\mathrm{d}z$；
3. $\boldsymbol{A} = (2xy + z^3,\ x^2,\ 3xz^2)$，判断 $\displaystyle\int_\Gamma \boldsymbol{A} \cdot \mathrm{d}\boldsymbol{r}$ 是否与路径无关，求从 $(0, 0, 0)$ 到 $(1, 1, 1)$ 的值。
##### 【小题 1】平面作曲面
* $\operatorname{rot}\boldsymbol{A} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y) = (-1 + 1,\ 1 - 1,\ 1 + 1) = (0, 0, 2)$；
* 从上往下看顺时针，按右手法则 $\Sigma$ 取平面 $x - y + z = 2$ 的下侧；
* 原式 $= \displaystyle\iint_\Sigma 2\,\mathrm{d}x\,\mathrm{d}y = -2 \cdot \pi = -2\pi$。
* **细节**：与例题 4 直接参数化的结果 $-2\pi$ 相同；这里不用写交线的参数式，只用到投影面积 $\pi$。
##### 【小题 2】大圆盘
* $\operatorname{rot}\boldsymbol{A} = (0 - 1,\ 0 - 1,\ 0 - 1) = (-1, -1, -1)$；
* $\Sigma$ 取平面 $x + y + z = 0$ 被球面截下的圆盘，上侧，$\boldsymbol{n} = \dfrac{1}{\sqrt{3}}(1, 1, 1)$，$\operatorname{rot}\boldsymbol{A} \cdot \boldsymbol{n} = -\sqrt{3}$；
* 圆盘过球心，半径 $1$，面积 $\pi$，原式 $= -\sqrt{3}\pi$。
##### 【小题 3】旋度为零
* $\operatorname{rot}\boldsymbol{A} = (0 - 0,\ 3z^2 - 3z^2,\ 2x - 2x) = \boldsymbol{0}$，整个空间里与路径无关；
* $u = x^2y + xz^3$（$u_x = 2xy + z^3$，$u_y = x^2$，$u_z = 3xz^2$）；
* 值 $= u(1, 1, 1) - u(0, 0, 0) = 2$。

---

### 〔提示〕

**① 弯的线、弯的面上怎么求总量**

#### 1. 第一类积分的下限小于上限
* 曲线从右往左给出，也要从小的参数值积到大的。

#### 2. $\mathrm{d}S$ 不是 $\mathrm{d}x\,\mathrm{d}y$
* 要乘 $\sqrt{1 + z_x^2 + z_y^2}$；只有水平的平面上两者相等。

#### 3. 竖直的曲面不能投到 $xOy$ 面
* 圆柱面 $x^2 + y^2 = 1$ 投到 $xOy$ 面是一条线；改投 $yOz$ 面，或用参数 $(\theta, z)$。

**② 沿着路走，力做了多少功**

#### 1. 下限对应起点，不要调换
* 从 $(1, 1)$ 到 $(0, 0)$，就写 $\displaystyle\int_1^0$。

#### 2. 交线的方向
* 「从 $z$ 轴正向看去顺时针」，参数 $t$ 要从 $2\pi$ 走到 $0$。

#### 3. 对称不要照搬第一类
* 第二类曲线积分带方向，奇偶对称的结论不能直接套；拿不准就参数化，或用格林公式。

**③ 绕一圈的积分，换成里面的二重积分**

#### 1. 是 $Q_x - P_y$，不是 $P_y - Q_x$
* 记法：$Q$ 跟 $\mathrm{d}y$，对 $x$ 求导，放在前面。

#### 2. 顺时针加负号
* 格林公式默认正向；曲线顺时针时，结果取相反数。

#### 3. 有奇点时，先代分母再用格林
* $\displaystyle\oint \dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2 + y^2}$ 绕原点：直接用格林得 $0$，是错的；正确的是 $2\pi$。

#### 4. 补的线要减掉
* $\displaystyle\int_L = \oint_{L + L_1} - \int_{L_1}$，补的那段常为 $0$，但要算一下确认。

**④ 什么时候只看起点和终点**

#### 1. 偏导相等还要单连通
* 区域里有洞（奇点）时，偏导相等推不出与路径无关。

#### 2. 原函数加常数
* $u$ 不唯一；求积分时用两端相减，常数消掉。

**⑤ 流过一张曲面的量**

#### 1. 第二类的对称和第一类相反
* 两半侧相反时：偶函数抵消，奇函数加倍。

#### 2. 投影时代入方程、定好正负
* $\displaystyle\iint R\,\mathrm{d}x\,\mathrm{d}y$ 里的 $z$ 换成 $z(x, y)$；下侧、后侧、左侧取负号。

#### 3. 曲面分片时，每片单独定侧
* 抛物面投到 $yOz$ 面分前后两片，一片取正、一片取负。

**⑥ 闭曲面和空间曲线**

#### 1. 高斯公式默认外侧
* 内侧加负号；不闭先补面，补的面要减掉。

#### 2. 斯托克斯的方向用右手法则
* 从上往下看逆时针，曲面取上侧；顺时针，取下侧。

#### 3. 散度是数，旋度是向量
* $\operatorname{div}\boldsymbol{A} = P_x + Q_y + R_z$；$\operatorname{rot}\boldsymbol{A}$ 有三个分量。
