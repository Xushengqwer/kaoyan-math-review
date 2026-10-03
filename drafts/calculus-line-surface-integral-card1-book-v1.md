### 〔定义〕

**本卡主线**：把「切细、求和、取极限」搬到弯的线和弯的面上：先求不分方向的总量，再求带方向的功和流量，最后把边界上的积分换成里面的积分。整张卡分三层、六站，每一站由上一站引出（只有 ⑤ 例外，它与 ② 平行）：
* **不分方向**：
  * **① 弯的线、弯的面上怎么求总量**：切成小段（小块），每段上密度当常数，乘弧长（面积），加起来，再取极限；与方向、侧无关；
* **沿着曲线**：
  * **② 沿着路走，力做了多少功**：每一小段上力与位移作数量积；路的方向一反，积分变号；
  * **③ 绕一圈的积分，换成里面的二重积分**：区域切成小块，每块各绕一圈，公共边抵消，只剩外圈，这是格林公式；
  * **④ 什么时候只看起点和终点**：区域里没有洞、处处 $\dfrac{\partial Q}{\partial x} = \dfrac{\partial P}{\partial y}$ 时，绕哪一圈都是 $0$，积分等于原函数在终点与起点的差；
* **穿过曲面**：
  * **⑤ 流过一张曲面的量**：先定哪一侧为正，每一小块流过「流速的法向分量 $\times$ 面积」；换一侧，变号；
  * **⑥ 闭曲面和空间曲线**：格林公式在空间的两个推广，闭曲面上的流出量换成散度的三重积分（高斯），闭曲线上的积分换成旋度穿过曲面的量（斯托克斯）；
* **依赖**：弧微分（第 2 章）；定积分、变力沿直线做功（第 3 章）；数量积、向量积、方向余弦、投影区域（第 4 章）；全微分、混合偏导数相等的条件、隐函数求偏导、方向导数、梯度（第 5 章）；二重积分、三重积分、曲面面积元、重积分的对称性、质心、转动惯量、引力（第 6 章）。

**① 弯的线、弯的面上怎么求总量**

一根铁丝弯成曲线 $L$，各处的线密度不同，它有多重？办法和重积分一样：把 $L$ 切成小段，每一小段上密度变化不大，就当它不变，用密度乘这一段的弧长，加起来，再让小段越切越细，取极限，这就是第一类曲线积分。一张曲面形状的薄壳，把小段换成小块、弧长换成面积，就是第一类曲面积分。弧长和面积都是正的，所以第一类积分与曲线走的方向、曲面取哪一侧都无关。新东西在算法上：积分的点不在一块区域里，而是被限制在曲线、曲面上，满足它的方程。所以先把方程代进被积函数，常常一下子就成了常数；再把 $\mathrm{d}s$ 写成参数的微分，把 $\mathrm{d}S$ 写成投影上的面积元，化成定积分、二重积分。重积分里的对称、轮换和权，都原样搬过来。

#### 1. 第一类曲线积分
设 $L$ 为 $xOy$ 面内的光滑曲线弧，$f(x, y)$ 在 $L$ 上有界：
1. **分割**：把 $L$ 任意分成 $n$ 小段，第 $i$ 小段的长度记为 $\Delta s_i$，记 $\lambda$ 为各小段长度的最大值；
2. **求和**：在第 $i$ 小段上任取一点 $(\xi_i, \eta_i)$，作和 $\displaystyle\sum_{i=1}^{n} f(\xi_i, \eta_i)\Delta s_i$；
3. **取极限**：若不论怎样分割、怎样取点，极限
   $$\lim\limits_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i, \eta_i)\Delta s_i$$
   总存在且相等，则称此极限为 $f(x, y)$ 在 $L$ 上==对弧长的曲线积分==（==第一类曲线积分==），记作 $\displaystyle\int_L f(x, y)\,\mathrm{d}s$。

* **名称**：$L$ 称为积分弧段，$\mathrm{d}s$ 称为==弧长元==；
* **光滑**：曲线上每一点都有切线，且切线随点连续转动；
* **闭曲线**：$L$ 是闭曲线时，记作 $\displaystyle\oint_L f(x, y)\,\mathrm{d}s$；
* **空间曲线**：空间曲线弧 $\Gamma$ 上的 $\displaystyle\int_\Gamma f(x, y, z)\,\mathrm{d}s$ 同理；
* **存在**：$f$ 在光滑曲线弧 $L$ 上连续时，第一类曲线积分必存在。

#### 2. 第一类曲面积分
设 $\Sigma$ 为光滑曲面，$f(x, y, z)$ 在 $\Sigma$ 上有界。把 $\Sigma$ 任意分成 $n$ 小块 $\Delta S_i$（$\Delta S_i$ 也表示其面积），记 $\lambda$ 为各小块直径的最大值，任取 $(\xi_i, \eta_i, \zeta_i) \in \Delta S_i$。若不论怎样分割、怎样取点，极限
$$\iint_\Sigma f(x, y, z)\,\mathrm{d}S = \lim\limits_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i, \eta_i, \zeta_i)\Delta S_i$$

总存在且相等，则称它为 $f$ 在 $\Sigma$ 上==对面积的曲面积分==（==第一类曲面积分==）。
* **光滑**：曲面上每一点都有切平面，且切平面随点连续转动；
* **闭曲面**：$\Sigma$ 是闭曲面时，记作 $\displaystyle\oiint_\Sigma f(x, y, z)\,\mathrm{d}S$。

**② 沿着路走，力做了多少功**

第 3 章算过变力沿直线做的功，那时力和位移在同一条直线上。现在力 $\boldsymbol{F} = (P, Q)$ 随位置变，方向也在变，物体沿一条弯路 $L$ 从 $A$ 走到 $B$。还是切成小段：每一小段近似一条直线段，位移是 $(\Delta x, \Delta y)$，力当常数，做的功是两者的数量积 $P\Delta x + Q\Delta y$；加起来，取极限，就是第二类曲线积分。和第一类不同，这里的 $\Delta x$、$\Delta y$ 有正有负：往右走，$\Delta x > 0$；往左走，$\Delta x < 0$。所以路的方向一反，积分就变号；算的时候下限对应起点、上限对应终点，下限可以比上限大。两类之间也能互换：$\mathrm{d}x$、$\mathrm{d}y$ 是弧长元 $\mathrm{d}s$ 乘单位切向量的两个分量，所以功等于力的切向分量对弧长的积分。

#### 1. 有向曲线
规定了走向的曲线称为==有向曲线==。从 $A$ 到 $B$ 的有向曲线记作 $L$ 时，同一条曲线从 $B$ 到 $A$ 记作 $L^-$。

#### 2. 第二类曲线积分
设 $L$ 为从 $A$ 到 $B$ 的有向光滑曲线弧，$P(x, y)$、$Q(x, y)$ 在 $L$ 上有界：
1. **分割**：沿 $L$ 的方向依次取分点 $A = M_0, M_1, \cdots, M_n = B$，$M_i$ 的坐标为 $(x_i, y_i)$，记 $\Delta x_i = x_i - x_{i-1}$，$\Delta y_i = y_i - y_{i-1}$，$\lambda$ 为各小弧段长度的最大值；
2. **求和**：在小弧段 $M_{i-1}M_i$ 上任取一点 $(\xi_i, \eta_i)$，作和 $\displaystyle\sum_{i=1}^{n} [P(\xi_i, \eta_i)\Delta x_i + Q(\xi_i, \eta_i)\Delta y_i]$；
3. **取极限**：若不论怎样分割、怎样取点，$\lambda \to 0$ 时和的极限总存在且相等，则称此极限为 $P$、$Q$ 在 $L$ 上==对坐标的曲线积分==（==第二类曲线积分==），记作
   $$\int_L P(x, y)\,\mathrm{d}x + Q(x, y)\,\mathrm{d}y$$

* **向量形式**：记 $\boldsymbol{F} = (P, Q)$，$\mathrm{d}\boldsymbol{r} = (\mathrm{d}x, \mathrm{d}y)$，积分写作 $\displaystyle\int_L \boldsymbol{F} \cdot \mathrm{d}\boldsymbol{r}$；
* **空间曲线**：有向曲线弧 $\Gamma$ 上的 $\displaystyle\int_\Gamma P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z$ 同理；
* **闭曲线**：$L$ 是闭曲线时，记作 $\displaystyle\oint_L P\,\mathrm{d}x + Q\,\mathrm{d}y$。

**③ 绕一圈的积分，换成里面的二重积分**

沿闭曲线的积分，参数化常常很繁。能不能用它围住的区域来算？把区域 $D$ 切成小矩形，每个小矩形都逆时针绕一圈。相邻两个小矩形的公共边被走了两次，方向相反，积分抵消；加起来只剩最外面一圈，就是 $D$ 的边界。所以只要算一个小矩形绕一圈的积分：下边和上边合起来约为 $-\dfrac{\partial P}{\partial y}\Delta x\Delta y$，右边和左边合起来约为 $\dfrac{\partial Q}{\partial x}\Delta x\Delta y$。这就是格林公式。用它要查三件事：曲线闭不闭；方向是不是正向；$P$、$Q$ 在区域里有没有偏导数不连续的点。不闭，就补一段线，算完再减掉；区域里有这样的点（奇点），就用一条小曲线把它挖掉，换成绕小曲线的积分。

#### 1. 单连通区域与复连通区域
设 $D$ 为平面区域：
* **单连通区域**：$D$ 内任一闭曲线所围的部分都属于 $D$，即 $D$ 里没有洞；
* **复连通区域**：不是单连通的区域；如圆环 $1 < x^2 + y^2 < 4$，去掉原点的平面。

#### 2. 边界曲线的正向
沿 $D$ 的边界曲线 $L$ 行走时，$D$ 总在行走者的==左侧==，这个方向称为 $L$ 的正向：
* **单连通区域**：边界的正向是逆时针；
* **复连通区域**：外边界逆时针，内边界顺时针。

**④ 什么时候只看起点和终点**

② 里有这样的现象：$\displaystyle\int_L 2xy\,\mathrm{d}x + x^2\,\mathrm{d}y$ 从 $(0, 0)$ 到 $(1, 1)$，沿直线、沿抛物线、沿折线，结果都是 $1$。什么时候会这样？从 $A$ 到 $B$ 的两条路，一条正着走、一条反着走，拼成一条闭曲线；两条路的积分相等，就是绕这一圈的积分为 $0$。由格林公式，只要区域里处处 $\dfrac{\partial Q}{\partial x} = \dfrac{\partial P}{\partial y}$，而且区域里没有洞，绕哪一圈都是 $0$，积分就只看起点和终点。这时固定起点，让终点 $(x, y)$ 动，积分就是终点的函数 $u(x, y)$，它的全微分正是 $P\,\mathrm{d}x + Q\,\mathrm{d}y$；积分等于 $u$ 在终点和起点的差，和牛顿-莱布尼茨公式一样。重力做功只看高度差，就是这个道理。

#### 1. 与路径无关
设 $G$ 是平面区域，$P(x, y)$、$Q(x, y)$ 在 $G$ 内有一阶连续偏导数。若对 $G$ 内任意两点 $A$、$B$，以及 $G$ 内从 $A$ 到 $B$ 的任意两条曲线 $L_1$、$L_2$，恒有
$$\int_{L_1} P\,\mathrm{d}x + Q\,\mathrm{d}y = \int_{L_2} P\,\mathrm{d}x + Q\,\mathrm{d}y$$

则称曲线积分在 $G$ 内==与路径无关==，这时也记作 $\displaystyle\int_A^B P\,\mathrm{d}x + Q\,\mathrm{d}y$。

#### 2. 原函数
若存在函数 $u(x, y)$，使 $\mathrm{d}u = P\,\mathrm{d}x + Q\,\mathrm{d}y$，则称 $u$ 为 $P\,\mathrm{d}x + Q\,\mathrm{d}y$ 的一个==原函数==。

**⑤ 流过一张曲面的量**

曲线这一层到 ④ 走完了，曲面上有平行的一层：⑤ 对着 ②，② 问力沿曲线做的功，⑤ 问水流穿过曲面的流量。设流速是 $\boldsymbol{v} = (P, Q, R)$，一小块曲面近似一小块平面，面积 $\Delta S$，单位法向量 $\boldsymbol{n}$。单位时间穿过它的水是一个斜柱体，体积是流速的法向分量乘面积，即 $\boldsymbol{v} \cdot \boldsymbol{n}\,\Delta S$；加起来取极限，就是流量。法向量有两个，指向相反，所以先要定哪一侧为正，这就是有向曲面；换一侧，流量变号。把 $\boldsymbol{v} \cdot \boldsymbol{n}$ 展开，$\cos\gamma\,\Delta S$ 是小块在 $xOy$ 面上的投影，带正负号，记作 $\mathrm{d}x\,\mathrm{d}y$，流量就写成三项之和，这是第二类曲面积分。

#### 1. 双侧曲面与有向曲面
* **双侧曲面**：曲面上一点的法向量，沿曲面上任一条不越过边界的闭曲线连续移动一圈，回到原处时方向不变，这样的曲面称为==双侧曲面==；本章的曲面都是双侧曲面；
* **有向曲面**：选定了法向量的指向（即选定了侧）的双侧曲面，称为==有向曲面==；
* **常用的侧**：
  * $z = z(x, y)$：法向量与 $z$ 轴正向的夹角为锐角时取==上侧==，为钝角时取下侧；
  * $x = x(y, z)$：与 $x$ 轴正向夹锐角取==前侧==，否则取后侧；
  * $y = y(z, x)$：与 $y$ 轴正向夹锐角取==右侧==，否则取左侧；
  * 闭曲面：法向量指向外部取==外侧==，指向内部取内侧。

#### 2. 有向曲面在坐标面上的投影
在有向曲面 $\Sigma$ 上取一小块 $\Delta S$，它在 $xOy$ 面上的投影区域的面积记为 $(\Delta\sigma)_{xy}$，设这一小块上各点法向量与 $z$ 轴正向夹角 $\gamma$ 的余弦同号，规定
$$(\Delta S)_{xy} = \begin{cases} (\Delta\sigma)_{xy}, & \cos\gamma > 0 \\ -(\Delta\sigma)_{xy}, & \cos\gamma < 0 \\ 0, & \cos\gamma \equiv 0 \end{cases}$$

在 $yOz$ 面、$zOx$ 面上的投影 $(\Delta S)_{yz}$、$(\Delta S)_{zx}$ 同理，分别看 $\cos\alpha$、$\cos\beta$ 的符号。

#### 3. 第二类曲面积分
设 $\Sigma$ 为有向光滑曲面，$R(x, y, z)$ 在 $\Sigma$ 上有界。把 $\Sigma$ 任意分成 $n$ 小块 $\Delta S_i$，记 $\lambda$ 为各小块直径的最大值，任取 $(\xi_i, \eta_i, \zeta_i) \in \Delta S_i$。若不论怎样分割、怎样取点，极限
$$\lim\limits_{\lambda \to 0} \sum_{i=1}^{n} R(\xi_i, \eta_i, \zeta_i)(\Delta S_i)_{xy}$$

总存在且相等，则称它为 $R$ 在 $\Sigma$ 上对坐标 $x$、$y$ 的曲面积分，记作 $\displaystyle\iint_\Sigma R(x, y, z)\,\mathrm{d}x\,\mathrm{d}y$。
* **另两项**：$\displaystyle\iint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z$、$\displaystyle\iint_\Sigma Q\,\mathrm{d}z\,\mathrm{d}x$ 把 $(\Delta S_i)_{xy}$ 换成 $(\Delta S_i)_{yz}$、$(\Delta S_i)_{zx}$，同理定义；
* **合写**：三项之和记作
  $$\iint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z + Q\,\mathrm{d}z\,\mathrm{d}x + R\,\mathrm{d}x\,\mathrm{d}y$$
  统称==对坐标的曲面积分==（==第二类曲面积分==）；
* **闭曲面**：$\Sigma$ 是闭曲面时，记作 $\displaystyle\oiint_\Sigma$。

#### 4. 通量
设向量场 $\boldsymbol{A} = (P, Q, R)$，$\boldsymbol{n}$ 为有向曲面 $\Sigma$ 上与所取侧一致的单位法向量，称
$$\Phi = \iint_\Sigma \boldsymbol{A} \cdot \boldsymbol{n}\,\mathrm{d}S$$

为 $\boldsymbol{A}$ 通过 $\Sigma$ 指定一侧的==通量==；$\boldsymbol{A}$ 是流速时，通量就是单位时间流过的流量。

**⑥ 闭曲面和空间曲线**

格林公式把平面上绕一圈的积分换成了里面的积分。到了空间，「一圈」有两种：一张闭曲面，一条闭曲线。先看闭曲面：把立体切成小方块，每块各算流出量；相邻两块的公共面，一块流出多少，另一块就流入多少，抵消，加起来只剩外表面。一个小方块的流出量，前后两个面合起来约为 $\dfrac{\partial P}{\partial x}\Delta v$，另两对面同理，共 $\left(\dfrac{\partial P}{\partial x} + \dfrac{\partial Q}{\partial y} + \dfrac{\partial R}{\partial z}\right)\Delta v$。括号里的量叫散度：小方块缩成一点时，流出量除以体积的极限，就是这一点每单位体积往外冒的量。这是高斯公式。再看空间闭曲线：曲面切成小块，每块各绕一圈，公共边抵消，只剩边界；每一小块绕一圈的积分，约等于旋度在这块法向上的分量乘面积。旋度的三个分量，就是三个坐标面上各自的格林公式里的那个「$\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y}$」。这是斯托克斯公式；曲面是 $xOy$ 面上的平面区域时，它就是格林公式。

#### 1. 散度
设向量场 $\boldsymbol{A} = (P, Q, R)$，$P$、$Q$、$R$ 有一阶连续偏导数，称
$$\operatorname{div}\boldsymbol{A} = \dfrac{\partial P}{\partial x} + \dfrac{\partial Q}{\partial y} + \dfrac{\partial R}{\partial z}$$

为 $\boldsymbol{A}$ 的==散度==；它是一个数量。

#### 2. 环流量
$\displaystyle\oint_\Gamma P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z = \oint_\Gamma \boldsymbol{A} \cdot \mathrm{d}\boldsymbol{r}$ 称为 $\boldsymbol{A}$ 沿有向闭曲线 $\Gamma$ 的==环流量==。

#### 3. 旋度
$$\operatorname{rot}\boldsymbol{A} = \begin{vmatrix} \boldsymbol{i} & \boldsymbol{j} & \boldsymbol{k} \\ \dfrac{\partial}{\partial x} & \dfrac{\partial}{\partial y} & \dfrac{\partial}{\partial z} \\ P & Q & R \end{vmatrix}$$

称为 $\boldsymbol{A}$ 的==旋度==，即 $\operatorname{rot}\boldsymbol{A} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y)$；它是一个向量。

#### 4. 右手法则
设有向曲面 $\Sigma$ 的边界是闭曲线 $\Gamma$：右手四指沿 $\Gamma$ 的方向弯曲时，拇指所指的方向与 $\Sigma$ 上法向量的指向相同，称 $\Gamma$ 的方向与 $\Sigma$ 的侧符合==右手法则==。
* **例**：$\Sigma$ 取上侧，$\Gamma$ 的方向就是从 $z$ 轴正向往下看去的逆时针。

---

### 〔性质〕

**① 弯的线、弯的面上怎么求总量**

**第一类曲线积分**

#### 1. 基本性质
- **与方向无关**：$\displaystyle\int_{\widehat{AB}} f\,\mathrm{d}s = \int_{\widehat{BA}} f\,\mathrm{d}s$；
- **线性**：$\displaystyle\int_L [\alpha f + \beta g]\,\mathrm{d}s = \alpha\int_L f\,\mathrm{d}s + \beta\int_L g\,\mathrm{d}s$；
- **可加**：$L$ 由 $L_1$、$L_2$ 首尾相接组成时，$\displaystyle\int_L f\,\mathrm{d}s = \int_{L_1} f\,\mathrm{d}s + \int_{L_2} f\,\mathrm{d}s$；
- **比较**：在 $L$ 上 $f \le g$ 时，$\displaystyle\int_L f\,\mathrm{d}s \le \int_L g\,\mathrm{d}s$；
- **弧长**：$\displaystyle\int_L 1\,\mathrm{d}s$ 等于 $L$ 的弧长。

#### 2. 化为定积分
用弧微分（第 2 章）把 $\mathrm{d}s$ 写成参数的微分，==下限必须小于上限==：
- **参数方程** $x = \varphi(t)$，$y = \psi(t)$，$\alpha \le t \le \beta$：
  $$\begin{aligned} & \int_L f(x, y)\,\mathrm{d}s \\ = {} & \int_\alpha^\beta f[\varphi(t), \psi(t)]\sqrt{\varphi'^2(t) + \psi'^2(t)}\,\mathrm{d}t \end{aligned}$$
- **直角坐标** $y = y(x)$，$a \le x \le b$：$\mathrm{d}s = \sqrt{1 + y'^2}\,\mathrm{d}x$；
- **极坐标** $r = r(\theta)$，$\alpha \le \theta \le \beta$：$\mathrm{d}s = \sqrt{r^2 + r'^2}\,\mathrm{d}\theta$，被积函数里 $x = r(\theta)\cos\theta$，$y = r(\theta)\sin\theta$；
- **空间曲线** $x = x(t)$，$y = y(t)$，$z = z(t)$，$\alpha \le t \le \beta$：$\mathrm{d}s = \sqrt{x'^2 + y'^2 + z'^2}\,\mathrm{d}t$；
- **依据**：$\Delta s_i > 0$，参数沿增加的方向取时 $\mathrm{d}t > 0$，弧长元才是正的。

#### 3. 先用曲线方程化简
积分的点都在曲线上，满足曲线的方程，所以可以先把方程代入被积函数。
* **例**：在圆周 $L: x^2 + y^2 = a^2$ 上，$\displaystyle\oint_L (x^2 + y^2)\,\mathrm{d}s = \oint_L a^2\,\mathrm{d}s = 2\pi a^3$。

**第一类曲面积分**

#### 1. 基本性质
- **与侧无关**：积分值与曲面取哪一侧无关；
- **线性与可加**：与重积分相同；
- **面积**：$\displaystyle\iint_\Sigma 1\,\mathrm{d}S$ 等于 $\Sigma$ 的面积。

#### 2. 化为二重积分
设 $\Sigma: z = z(x, y)$，$\Sigma$ 在 $xOy$ 面上的投影区域为 $D_{xy}$，$z(x, y)$ 有连续偏导数，用曲面面积元（第 6 章）：
$$\begin{aligned} & \iint_\Sigma f(x, y, z)\,\mathrm{d}S \\ = {} & \iint_{D_{xy}} f[x, y, z(x, y)]\sqrt{1 + z_x^2 + z_y^2}\,\mathrm{d}x\,\mathrm{d}y \end{aligned}$$

- **向其他坐标面投影**：$\Sigma$ 为 $x = x(y, z)$ 或 $y = y(z, x)$ 时，同理向 $yOz$ 面或 $zOx$ 面投影；
- **曲面是 $F(x, y, z) = 0$**：$\mathrm{d}S = \dfrac{\sqrt{F_x^2 + F_y^2 + F_z^2}}{|F_z|}\,\mathrm{d}x\,\mathrm{d}y$（$F_z \ne 0$）；
- **球面**：$x^2 + y^2 + z^2 = a^2$ 上，$\mathrm{d}S = \dfrac{a}{|z|}\,\mathrm{d}x\,\mathrm{d}y$；
- **依据**：$z_x = -\dfrac{F_x}{F_z}$，$z_y = -\dfrac{F_y}{F_z}$（第 5 章），代入 $\sqrt{1 + z_x^2 + z_y^2}$。

#### 3. 先用曲面方程化简
积分的点都在曲面上，可以先把曲面方程代入被积函数。
* **例**：在球面 $\Sigma: x^2 + y^2 + z^2 = a^2$ 上，$\displaystyle\oiint_\Sigma (x^2 + y^2 + z^2)\,\mathrm{d}S = a^2 \cdot 4\pi a^2 = 4\pi a^4$。

**对称与应用**

#### 1. 对称性
与重积分的对称性（第 6 章）相同：
- **奇偶对称**：$L$ 关于 $y$ 轴对称时，$f$ 关于 $x$ 是奇函数，$\displaystyle\int_L f\,\mathrm{d}s = 0$；是偶函数，等于 $x \ge 0$ 那一半上积分的 $2$ 倍；关于 $x$ 轴对称看 $y$；曲面关于坐标面对称同理；
- **轮换对称**：曲线（曲面）的方程在 $x, y$ 互换后不变时，被积函数中 $x, y$ 可以互换；例如在球面 $x^2 + y^2 + z^2 = R^2$ 上
  $$\oiint_\Sigma x^2\,\mathrm{d}S = \oiint_\Sigma y^2\,\mathrm{d}S = \oiint_\Sigma z^2\,\mathrm{d}S$$
  三者都等于 $\dfrac{1}{3}\displaystyle\oiint_\Sigma R^2\,\mathrm{d}S = \dfrac{4\pi R^4}{3}$。

#### 2. 质量、质心与转动惯量
公式与重积分相同（第 6 章），把 $\mathrm{d}\sigma$、$\mathrm{d}v$ 换成弧长元 $\mathrm{d}s$ 或曲面面积元 $\mathrm{d}S$：
- **曲线形构件**（线密度 $\rho$）：
  - 质量 $M = \displaystyle\int_\Gamma \rho\,\mathrm{d}s$；
  - 质心 $\bar{x} = \dfrac{1}{M}\displaystyle\int_\Gamma x\rho\,\mathrm{d}s$，$\bar{y}$、$\bar{z}$ 同理；
  - 转动惯量 $I_z = \displaystyle\int_\Gamma (x^2 + y^2)\rho\,\mathrm{d}s$；
- **曲面形构件**（面密度 $\rho$）：
  - 质量 $M = \displaystyle\iint_\Sigma \rho\,\mathrm{d}S$；
  - 质心 $\bar{x} = \dfrac{1}{M}\displaystyle\iint_\Sigma x\rho\,\mathrm{d}S$，$\bar{y}$、$\bar{z}$ 同理；
  - 转动惯量 $I_z = \displaystyle\iint_\Sigma (x^2 + y^2)\rho\,\mathrm{d}S$；
- **形心**：$\rho$ 为常数时的质心；如曲线的形心 $\bar{x} = \dfrac{1}{l}\displaystyle\int_\Gamma x\,\mathrm{d}s$，$l$ 为弧长。

#### 3. 引力
线密度为 $\rho$ 的曲线形构件 $\Gamma$，对位于 $P_0(x_0, y_0, z_0)$、质量为 $m$ 的质点的引力 $\boldsymbol{F} = (F_x, F_y, F_z)$：
$$F_x = Gm\int_\Gamma \dfrac{\rho\,(x - x_0)}{r^3}\,\mathrm{d}s$$

$F_y$、$F_z$ 把 $x - x_0$ 换成 $y - y_0$、$z - z_0$；其中 $r = \sqrt{(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2}$。曲面形构件把 $\mathrm{d}s$ 换成 $\mathrm{d}S$。

**② 沿着路走，力做了多少功**

#### 1. 物理意义
变力 $\boldsymbol{F} = (P, Q)$ 把质点沿有向曲线 $L$ 从 $A$ 移到 $B$，所做的功为
$$W = \int_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \int_L \boldsymbol{F} \cdot \mathrm{d}\boldsymbol{r}$$

#### 2. 基本性质
- **与方向有关**：$\displaystyle\int_{L^-} P\,\mathrm{d}x + Q\,\mathrm{d}y = -\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y$；
- **线性与可加**：与定积分相同；$L$ 由 $L_1$、$L_2$ 首尾相接、方向一致时，$\displaystyle\int_L = \int_{L_1} + \int_{L_2}$。

#### 3. 化为定积分
==下限对应起点，上限对应终点==（下限不一定小于上限）：
- **参数方程** $x = \varphi(t)$，$y = \psi(t)$，$t$ 从 $\alpha$（起点）变到 $\beta$（终点）：
  $$\begin{aligned} & \int_L P\,\mathrm{d}x + Q\,\mathrm{d}y \\ = {} & \int_\alpha^\beta [P\varphi'(t) + Q\psi'(t)]\,\mathrm{d}t \end{aligned}$$
  其中 $P, Q$ 取在点 $(\varphi(t), \psi(t))$ 处；
- **直角坐标** $y = y(x)$，$x$ 从 $a$ 变到 $b$：$\displaystyle\int_a^b \{P[x, y(x)] + Q[x, y(x)]y'(x)\}\,\mathrm{d}x$；$x = x(y)$ 时以 $y$ 为参数，同理；
- **空间曲线**：$t$ 从 $\alpha$ 变到 $\beta$，$\displaystyle\int_\Gamma P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z = \int_\alpha^\beta (Px' + Qy' + Rz')\,\mathrm{d}t$；
- **依据**：$\Delta x_i = \varphi(t_i) - \varphi(t_{i-1})$，分点按 $L$ 的方向排，$t$ 从起点的值走到终点的值。

#### 4. 两类曲线积分的联系
设 $(\cos\alpha, \cos\beta)$ 为 $L$ 上点 $(x, y)$ 处与 $L$ 方向一致的单位切向量，则
$$\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \int_L (P\cos\alpha + Q\cos\beta)\,\mathrm{d}s$$

空间曲线同理：$\displaystyle\int_\Gamma P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z = \int_\Gamma (P\cos\alpha + Q\cos\beta + R\cos\gamma)\,\mathrm{d}s$。
* **依据**：$\mathrm{d}x = \cos\alpha\,\mathrm{d}s$，$\mathrm{d}y = \cos\beta\,\mathrm{d}s$，即位移 $\mathrm{d}\boldsymbol{r}$ 等于弧长元乘单位切向量；
* **这里的 $\alpha$、$\beta$**：是切向量的方向角，不是参数的上下限。

#### 5. 交线的参数式
空间曲线 $\Gamma$ 是两张曲面的交线时，先写成参数式：
* **办法**：把 $\Gamma$ 投到某个坐标面上，投影常是圆或椭圆，写出它的参数式，再由另一个方程解出第三个坐标；
* **例**：$\Gamma: x^2 + y^2 = 1$，$x + z = 1$，可取 $x = \cos t$，$y = \sin t$，$z = 1 - \cos t$；
* **方向**：「从 $z$ 轴正向往下看去逆时针」时，$t$ 从 $0$ 增加到 $2\pi$。

**③ 绕一圈的积分，换成里面的二重积分**

#### 1. 格林公式
设闭区域 $D$ 由分段光滑的曲线 $L$ 围成，$P(x, y)$、$Q(x, y)$ 在 $D$ 上具有一阶连续偏导数，则
$$\oint_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \iint_D \left(\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y}\right)\mathrm{d}x\,\mathrm{d}y$$

其中 $L$ 是 $D$ 的==取正向的边界曲线==；复连通区域时 $L$ 是全部边界，外边界逆时针、内边界顺时针。
* **依据**：小矩形 $[x, x + \Delta x] \times [y, y + \Delta y]$ 逆时针绕一圈：下边和上边合起来约为 $[P(x, y) - P(x, y + \Delta y)]\Delta x \approx -\dfrac{\partial P}{\partial y}\Delta x\Delta y$，右边和左边合起来约为 $\dfrac{\partial Q}{\partial x}\Delta x\Delta y$；相邻小矩形的公共边方向相反，抵消。

#### 2. 用曲线积分求面积
取 $P = -y$，$Q = x$，得 $D$ 的面积
$$A = \dfrac{1}{2}\oint_L x\,\mathrm{d}y - y\,\mathrm{d}x$$

也可以用 $A = \displaystyle\oint_L x\,\mathrm{d}y = -\oint_L y\,\mathrm{d}x$。

#### 3. 补线
$L$ 不封闭时，添加辅助曲线 $L_1$，使 $L + L_1$ 成为闭曲线：
$$\int_L = \oint_{L + L_1} - \int_{L_1}$$

对 $\displaystyle\oint_{L + L_1}$ 用格林公式，注意它是正向还是负向；$L_1$ 常取平行于坐标轴的线段，那里 $\mathrm{d}y = 0$ 或 $\mathrm{d}x = 0$。

#### 4. 挖去奇点
设 $L$ 为围住点 $M_0$ 的正向闭曲线，$P, Q$ 在 $M_0$ 处不满足条件（如无定义），但在其余点处有连续偏导数且 $\dfrac{\partial Q}{\partial x} = \dfrac{\partial P}{\partial y}$。作含在 $L$ 内、围住 $M_0$ 的正向小闭曲线 $l$，则
$$\oint_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \oint_l P\,\mathrm{d}x + Q\,\mathrm{d}y$$

* **依据**：$L$ 与 $l$ 之间是复连通区域，它的正向边界是 $L$ 逆时针、$l$ 顺时针，在上面用格林公式，二重积分为 $0$；
* **$l$ 的形状**：按分母选，让分母在 $l$ 上是常数；分母是 $x^2 + y^2$ 取圆 $x^2 + y^2 = \varepsilon^2$，分母是 $4x^2 + y^2$ 取椭圆 $4x^2 + y^2 = \varepsilon^2$；
* **不围住奇点**：$L$ 所围区域里没有奇点时，直接用格林公式，积分为 $0$。

#### 5. 法向形式（边界）
设 $\boldsymbol{n} = (n_1, n_2)$ 是正向边界 $L$ 上的单位外法向量（指向 $D$ 的外部），则
$$\oint_L (Pn_1 + Qn_2)\,\mathrm{d}s = \iint_D \left(\dfrac{\partial P}{\partial x} + \dfrac{\partial Q}{\partial y}\right)\mathrm{d}\sigma$$

* **依据**：沿正向走时，单位切向量是 $\left(\dfrac{\mathrm{d}x}{\mathrm{d}s}, \dfrac{\mathrm{d}y}{\mathrm{d}s}\right)$，把它顺时针转 $90^\circ$ 就是外法向量 $\boldsymbol{n} = \left(\dfrac{\mathrm{d}y}{\mathrm{d}s}, -\dfrac{\mathrm{d}x}{\mathrm{d}s}\right)$，左边成了 $\displaystyle\oint_L -Q\,\mathrm{d}x + P\,\mathrm{d}y$，再用格林公式；
* **方向导数**：$\dfrac{\partial u}{\partial \boldsymbol{n}} = u_xn_1 + u_yn_2$（第 5 章），所以 $\displaystyle\oint_L \dfrac{\partial u}{\partial \boldsymbol{n}}\,\mathrm{d}s = \iint_D (u_{xx} + u_{yy})\,\mathrm{d}\sigma$。

**④ 什么时候只看起点和终点**

#### 1. 与路径无关的四个等价条件
设 $G$ 是==单连通区域==，$P(x, y)$、$Q(x, y)$ 在 $G$ 内具有一阶连续偏导数，则以下四条等价：
1. **路径无关**：$\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y$ 在 $G$ 内与路径无关，只与起点、终点有关；
2. **闭路积分为零**：沿 $G$ 内任一分段光滑闭曲线 $C$，$\displaystyle\oint_C P\,\mathrm{d}x + Q\,\mathrm{d}y = 0$；
3. **偏导相等**：在 $G$ 内处处有 $\dfrac{\partial P}{\partial y} = \dfrac{\partial Q}{\partial x}$；
4. **全微分**：存在 $u(x, y)$，使 $\mathrm{d}u = P\,\mathrm{d}x + Q\,\mathrm{d}y$。

* **依据**：
  * 1 与 2：从 $A$ 到 $B$ 的两条路，一条反过来接上另一条，就是一条闭曲线；
  * 3 推出 2：在闭曲线所围区域上用格林公式，这一步要求没有洞；
  * 1 推出 4：固定起点，$u(x, y) = \displaystyle\int_{(x_0, y_0)}^{(x, y)} P\,\mathrm{d}x + Q\,\mathrm{d}y$，可验证 $u_x = P$，$u_y = Q$；
  * 4 推出 3：$\dfrac{\partial P}{\partial y} = u_{xy}$，$\dfrac{\partial Q}{\partial x} = u_{yx}$，二者连续时相等（第 5 章）。

#### 2. 求原函数
条件满足时：
- **沿折线**：取定点 $(x_0, y_0) \in G$，先沿水平线、再沿竖直线积分：
  $$u(x, y) = \int_{x_0}^{x} P(x, y_0)\,\mathrm{d}x + \int_{y_0}^{y} Q(x, y)\,\mathrm{d}y$$
- **偏积分**：由 $u_x = P$ 对 $x$ 积分得 $u = \displaystyle\int P\,\mathrm{d}x + \varphi(y)$，再由 $u_y = Q$ 确定 $\varphi(y)$；
- **凑微分**：把 $P\,\mathrm{d}x + Q\,\mathrm{d}y$ 分组，认出常见的全微分：$y\,\mathrm{d}x + x\,\mathrm{d}y = \mathrm{d}(xy)$，$x\,\mathrm{d}x + y\,\mathrm{d}y = \mathrm{d}\dfrac{x^2 + y^2}{2}$，$\dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2} = \mathrm{d}\dfrac{y}{x}$；
- **不唯一**：两个原函数相差一个常数。

#### 3. 与路径无关时的计算
$$\int_{(x_1, y_1)}^{(x_2, y_2)} P\,\mathrm{d}x + Q\,\mathrm{d}y = u(x_2, y_2) - u(x_1, y_1)$$

也可改走任何方便的路径（如平行于坐标轴的折线）计算。

#### 4. 区域有洞（边界）
$G$ 是复连通区域时，3 推不出 1、2。设 $P, Q$ 除点 $M_0$ 外有连续偏导数，且 $\dfrac{\partial P}{\partial y} = \dfrac{\partial Q}{\partial x}$：
* **绕洞的闭曲线**：同向绕 $M_0$ 一圈的闭曲线，积分都相等（由 ③ 挖去奇点）；
* **不绕洞的闭曲线**：积分为 $0$；
* **例**：$\dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2 + y^2}$ 在原点以外偏导相等，逆时针绕原点一圈的积分是 $2\pi$；
* **去掉洞以后**：在不含 $M_0$ 的单连通区域里（如右半平面 $x > 0$），四条等价照样成立。

**⑤ 流过一张曲面的量**

#### 1. 物理意义
流速场 $\boldsymbol{v} = (P, Q, R)$ 单位时间内流向 $\Sigma$ 指定一侧的流量为
$$\Phi = \iint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z + Q\,\mathrm{d}z\,\mathrm{d}x + R\,\mathrm{d}x\,\mathrm{d}y$$

#### 2. 基本性质
- **与侧有关**：$\displaystyle\iint_{\Sigma^-} = -\iint_\Sigma$（$\Sigma^-$ 为 $\Sigma$ 取相反侧）；
- **线性与可加**：与重积分相同。

#### 3. 两类曲面积分的联系
设 $(\cos\alpha, \cos\beta, \cos\gamma)$ 为 $\Sigma$ 上与所取侧一致的单位法向量，则
$$\begin{aligned} & \iint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z + Q\,\mathrm{d}z\,\mathrm{d}x + R\,\mathrm{d}x\,\mathrm{d}y \\ = {} & \iint_\Sigma (P\cos\alpha + Q\cos\beta + R\cos\gamma)\,\mathrm{d}S \end{aligned}$$

* **依据**：小块 $\Delta S$ 在 $xOy$ 面上带符号的投影 $(\Delta S)_{xy} \approx \cos\gamma\,\Delta S$，即 $\mathrm{d}x\,\mathrm{d}y = \cos\gamma\,\mathrm{d}S$；另两项同理；
* **即通量**：右端就是 $\displaystyle\iint_\Sigma \boldsymbol{A} \cdot \boldsymbol{n}\,\mathrm{d}S$，$\boldsymbol{A} = (P, Q, R)$。

#### 4. 分面投影
以 $\displaystyle\iint_\Sigma R\,\mathrm{d}x\,\mathrm{d}y$ 为例，$\Sigma: z = z(x, y)$，投影区域 $D_{xy}$：
$$\iint_\Sigma R\,\mathrm{d}x\,\mathrm{d}y = \pm\iint_{D_{xy}} R[x, y, z(x, y)]\,\mathrm{d}x\,\mathrm{d}y$$

- **定号**：上侧取正，下侧取负；$P\,\mathrm{d}y\,\mathrm{d}z$ 向 $yOz$ 面投影，前侧取正；$Q\,\mathrm{d}z\,\mathrm{d}x$ 向 $zOx$ 面投影，右侧取正；
- **垂直的曲面**：$\Sigma$ 垂直于 $xOy$ 面（如母线平行于 $z$ 轴的柱面）时，$\displaystyle\iint_\Sigma R\,\mathrm{d}x\,\mathrm{d}y = 0$。

#### 5. 合一投影
设 $\Sigma: z = z(x, y)$，$(x, y) \in D_{xy}$，取上侧，则三项可一起投影到 $xOy$ 面：
$$\begin{aligned} & \iint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z + Q\,\mathrm{d}z\,\mathrm{d}x + R\,\mathrm{d}x\,\mathrm{d}y \\ = {} & \iint_{D_{xy}} (-Pz_x - Qz_y + R)\,\mathrm{d}x\,\mathrm{d}y \end{aligned}$$

其中 $P, Q, R$ 中的 $z$ 用 $z(x, y)$ 代入；取下侧时右端加负号。
* **依据**：上侧的法向量是 $(-z_x, -z_y, 1)$，所以 $\cos\alpha : \cos\beta : \cos\gamma = (-z_x) : (-z_y) : 1$，$\mathrm{d}y\,\mathrm{d}z = -z_x\,\mathrm{d}x\,\mathrm{d}y$，$\mathrm{d}z\,\mathrm{d}x = -z_y\,\mathrm{d}x\,\mathrm{d}y$。

#### 6. 对称性
设 $\Sigma$ 关于 $xOy$ 面对称，且对称的两部分所取的侧相反（如闭曲面的外侧），$\Sigma_1$ 为 $z \ge 0$ 的部分：
- **$R$ 关于 $z$ 为偶函数**：$\displaystyle\iint_\Sigma R\,\mathrm{d}x\,\mathrm{d}y = 0$；
- **$R$ 关于 $z$ 为奇函数**：$\displaystyle\iint_\Sigma R\,\mathrm{d}x\,\mathrm{d}y = 2\iint_{\Sigma_1} R\,\mathrm{d}x\,\mathrm{d}y$。

结论与第一类（奇零偶倍）==正好相反==：两半的 $\mathrm{d}x\,\mathrm{d}y$ 符号相反；$P\,\mathrm{d}y\,\mathrm{d}z$、$Q\,\mathrm{d}z\,\mathrm{d}x$ 分别对 $yOz$ 面、$zOx$ 面同理。

**⑥ 闭曲面和空间曲线**

**高斯公式**

#### 1. 高斯公式
设空间闭区域 $\Omega$ 由分片光滑的闭曲面 $\Sigma$ 围成，$P, Q, R$ 在 $\Omega$ 上具有一阶连续偏导数，则
$$\begin{aligned} & \oiint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z + Q\,\mathrm{d}z\,\mathrm{d}x + R\,\mathrm{d}x\,\mathrm{d}y \\ = {} & \iiint_\Omega \left(\dfrac{\partial P}{\partial x} + \dfrac{\partial Q}{\partial y} + \dfrac{\partial R}{\partial z}\right)\mathrm{d}v \end{aligned}$$

其中 $\Sigma$ 取==外侧==；取内侧时右端加负号。
* **依据**：小方块 $[x, x + \Delta x] \times [y, y + \Delta y] \times [z, z + \Delta z]$ 的前后两个面，流出量合起来约为 $[P(x + \Delta x, y, z) - P(x, y, z)]\Delta y\Delta z \approx \dfrac{\partial P}{\partial x}\Delta v$，另两对面同理；相邻小方块的公共面一出一进，抵消。

#### 2. 通量与散度
高斯公式即
$$\oiint_\Sigma \boldsymbol{A} \cdot \boldsymbol{n}\,\mathrm{d}S = \iiint_\Omega \operatorname{div}\boldsymbol{A}\,\mathrm{d}v$$

* **散度的意思**：设 $\Omega$ 收缩到点 $M$，体积为 $V$，则 $\operatorname{div}\boldsymbol{A}(M) = \lim\limits_{\Omega \to M}\dfrac{1}{V}\displaystyle\oiint_\Sigma \boldsymbol{A} \cdot \boldsymbol{n}\,\mathrm{d}S$，是 $M$ 处每单位体积往外流出的量；$\operatorname{div}\boldsymbol{A} > 0$ 的点是源，$< 0$ 的点是汇。

#### 3. 补面
$\Sigma$ 不封闭时，添加辅助曲面 $\Sigma_1$（常取平行于坐标面的平面）使 $\Sigma + \Sigma_1$ 封闭，并取合适的侧：
$$\iint_\Sigma = \oiint_{\Sigma + \Sigma_1} - \iint_{\Sigma_1}$$

对 $\displaystyle\oiint_{\Sigma + \Sigma_1}$ 用高斯公式（取内侧时加负号）。

#### 4. 挖去奇点
设 $P, Q, R$ 在点 $M_0$ 处无定义，在其余点处有连续偏导数且 $\operatorname{div}\boldsymbol{A} = 0$，闭曲面 $\Sigma$（外侧）围住 $M_0$。作含在 $\Sigma$ 内、围住 $M_0$ 的小闭曲面 $\Sigma_\varepsilon$（外侧），则
$$\oiint_\Sigma \boldsymbol{A} \cdot \boldsymbol{n}\,\mathrm{d}S = \oiint_{\Sigma_\varepsilon} \boldsymbol{A} \cdot \boldsymbol{n}\,\mathrm{d}S$$

* **依据**：在 $\Sigma$ 与 $\Sigma_\varepsilon$ 之间的立体上用高斯公式，它的外侧是 $\Sigma$ 的外侧加 $\Sigma_\varepsilon$ 的内侧；
* **常见**：$\boldsymbol{A} = \dfrac{(x, y, z)}{(x^2 + y^2 + z^2)^{\frac{3}{2}}}$，原点以外 $\operatorname{div}\boldsymbol{A} = 0$；穿出任一围住原点的闭曲面的通量都是 $4\pi$，不围住原点的为 $0$。

#### 5. 用曲面积分求体积
取 $P = x$，$Q = y$，$R = z$，得 $\Omega$ 的体积
$$V = \dfrac{1}{3}\oiint_\Sigma x\,\mathrm{d}y\,\mathrm{d}z + y\,\mathrm{d}z\,\mathrm{d}x + z\,\mathrm{d}x\,\mathrm{d}y$$

其中 $\Sigma$ 取外侧；也可以用 $V = \displaystyle\oiint_\Sigma z\,\mathrm{d}x\,\mathrm{d}y$。

**斯托克斯公式**

#### 1. 斯托克斯公式
设 $\Gamma$ 为分段光滑的空间有向闭曲线，$\Sigma$ 是以 $\Gamma$ 为边界的分片光滑有向曲面，$\Gamma$ 的方向与 $\Sigma$ 的侧符合==右手法则==，$P, Q, R$ 在包含 $\Sigma$ 的空间区域内具有一阶连续偏导数，则
$$\begin{aligned} & \oint_\Gamma P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z \\ = {} & \iint_\Sigma \begin{vmatrix} \mathrm{d}y\,\mathrm{d}z & \mathrm{d}z\,\mathrm{d}x & \mathrm{d}x\,\mathrm{d}y \\ \dfrac{\partial}{\partial x} & \dfrac{\partial}{\partial y} & \dfrac{\partial}{\partial z} \\ P & Q & R \end{vmatrix} \end{aligned}$$

- **展开式**：右端 $= \displaystyle\iint_\Sigma (R_y - Q_z)\,\mathrm{d}y\,\mathrm{d}z + (P_z - R_x)\,\mathrm{d}z\,\mathrm{d}x + (Q_x - P_y)\,\mathrm{d}x\,\mathrm{d}y$；
- **第一类形式**：把行列式第一行换成 $\cos\alpha, \cos\beta, \cos\gamma$，并乘 $\mathrm{d}S$；$\Sigma$ 是平面时，$(\cos\alpha, \cos\beta, \cos\gamma)$ 是常向量。

#### 2. 环流量与旋度
斯托克斯公式即
$$\oint_\Gamma \boldsymbol{A} \cdot \mathrm{d}\boldsymbol{r} = \iint_\Sigma \operatorname{rot}\boldsymbol{A} \cdot \boldsymbol{n}\,\mathrm{d}S$$

* **旋度的意思**：过点 $M$ 取以 $\boldsymbol{n}$ 为法向量的小平面块，面积为 $S$，边界按右手法则定向，则 $\operatorname{rot}\boldsymbol{A}(M) \cdot \boldsymbol{n} = \lim\limits_{S \to 0}\dfrac{1}{S}\displaystyle\oint \boldsymbol{A} \cdot \mathrm{d}\boldsymbol{r}$，是绕 $\boldsymbol{n}$ 每单位面积的环流量。

#### 3. 格林公式是特例
$\Sigma$ 是 $xOy$ 面上的闭区域 $D$、取上侧时，$\mathrm{d}y\,\mathrm{d}z = \mathrm{d}z\,\mathrm{d}x = 0$，$\mathrm{d}z = 0$，斯托克斯公式就是格林公式。

#### 4. 空间曲线积分与路径无关（边界）
设 $G$ 是空间区域，$G$ 内任一闭曲线都能张成一张完全在 $G$ 内的曲面（如整个空间、球体），$P, Q, R$ 在 $G$ 内有一阶连续偏导数，则以下三条等价：
1. **路径无关**：$\displaystyle\int_\Gamma P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z$ 在 $G$ 内与路径无关；
2. **旋度为零**：在 $G$ 内处处 $\operatorname{rot}\boldsymbol{A} = \boldsymbol{0}$；
3. **全微分**：存在 $u(x, y, z)$，使 $\mathrm{d}u = P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z$。

* **求 $u$**：沿平行于坐标轴的三段折线，
  $$\begin{aligned} u = {} & \int_{x_0}^{x} P(x, y_0, z_0)\,\mathrm{d}x \\ & + \int_{y_0}^{y} Q(x, y, z_0)\,\mathrm{d}y \\ & + \int_{z_0}^{z} R(x, y, z)\,\mathrm{d}z \end{aligned}$$

**梯度、散度、旋度**

#### 1. 两个恒等式
设函数具有二阶连续偏导数，则：
- **梯度无旋**：$\operatorname{rot}(\operatorname{grad} u) = \boldsymbol{0}$；
- **旋度无源**：$\operatorname{div}(\operatorname{rot}\boldsymbol{A}) = 0$。

* **依据**：展开后各项成对出现，如 $\operatorname{rot}(\operatorname{grad} u)$ 的第一个分量是 $u_{zy} - u_{yz} = 0$；
* **梯度**：$\operatorname{grad} u = (u_x, u_y, u_z)$（第 5 章）；第一条说明 $\boldsymbol{A} = \operatorname{grad} u$ 时，曲线积分与路径无关。

---

### 意义

本卡在做题时专门用于解决以下 20 类确定性目标，按站排列：

**① 弯的线、弯的面上怎么求总量**

* **1. 算第一类曲线积分**
  * **问题**：求 $\displaystyle\int_L f\,\mathrm{d}s$、$\displaystyle\oint_\Gamma f\,\mathrm{d}s$。
  * **目标**：先用方程和对称化简被积函数，再写出 $\mathrm{d}s$，化成下限小于上限的定积分。
  * **调用**：
    * 先用曲线方程化简；对称性；
    * 参数式 $\mathrm{d}s = \sqrt{\varphi'^2(t) + \psi'^2(t)}\,\mathrm{d}t$，直角坐标 $\mathrm{d}s = \sqrt{1 + y'^2}\,\mathrm{d}x$。
  * **行动**：
    1. 代入、对称；如 $L: x^2 + y^2 = a^2$，求 $\displaystyle\oint_L (x + y^2)\,\mathrm{d}s$：圆关于 $y$ 轴对称，$x$ 的积分为 $0$；轮换，$\displaystyle\oint_L y^2\,\mathrm{d}s = \dfrac{1}{2}\oint_L (x^2 + y^2)\,\mathrm{d}s = \dfrac{1}{2}a^2 \cdot 2\pi a = \pi a^3$；
    2. 化成定积分；如 $L: y = x^2$，$0 \le x \le 1$，求 $\displaystyle\int_L x\,\mathrm{d}s$：$\mathrm{d}s = \sqrt{1 + 4x^2}\,\mathrm{d}x$，$\displaystyle\int_0^1 x\sqrt{1 + 4x^2}\,\mathrm{d}x = \dfrac{5\sqrt{5} - 1}{12}$；
    3. 空间交线，先代方程；如 $\Gamma: x^2 + y^2 + z^2 = a^2$，$x + y + z = 0$，求 $\displaystyle\oint_\Gamma (xy + yz + zx)\,\mathrm{d}s$：由 $(x + y + z)^2 = 0$ 得 $xy + yz + zx = -\dfrac{a^2}{2}$；$\Gamma$ 是过球心的平面截出的大圆，长 $2\pi a$，结果 $-\pi a^3$。
* **2. 算第一类曲面积分**
  * **问题**：求 $\displaystyle\iint_\Sigma f\,\mathrm{d}S$。
  * **目标**：先用方程和对称化简，再写成 $z = z(x, y)$，投影到 $xOy$ 面。
  * **调用**：$\mathrm{d}S = \sqrt{1 + z_x^2 + z_y^2}\,\mathrm{d}x\,\mathrm{d}y$；球面 $\mathrm{d}S = \dfrac{a}{|z|}\,\mathrm{d}x\,\mathrm{d}y$；对称性。
  * **行动**：
    1. 投影；如锥面 $\Sigma: z = \sqrt{x^2 + y^2}$，$0 \le z \le 1$，求 $\displaystyle\iint_\Sigma (x^2 + y^2)\,\mathrm{d}S$：$z_x^2 + z_y^2 = 1$，$\mathrm{d}S = \sqrt{2}\,\mathrm{d}x\,\mathrm{d}y$，投影是单位圆；
    2. 计算：$\sqrt{2}\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^1 r^2 \cdot r\,\mathrm{d}r = \dfrac{\sqrt{2}\pi}{2}$；
    3. 球面上，面积元和被积函数一起化简；如上半球面 $z = \sqrt{a^2 - x^2 - y^2}$ 上 $\displaystyle\iint_\Sigma z\,\mathrm{d}S = \iint_{x^2 + y^2 \le a^2} z \cdot \dfrac{a}{z}\,\mathrm{d}x\,\mathrm{d}y = \pi a^3$；
    4. 曲面由几片组成，或上下两片投影重合：分片计算再相加。
* **3. 求曲线、曲面形构件的质量、质心、转动惯量、引力**
  * **问题**：求铁丝、薄壳的质量、质心、形心、转动惯量；求它对一个质点的引力。
  * **目标**：写出权，先用对称定出质心的部分坐标、引力为 $0$ 的分量。
  * **调用**：质心 $\bar{x} = \dfrac{1}{M}\displaystyle\int_\Gamma x\rho\,\mathrm{d}s$；引力 $F_x = Gm\displaystyle\int_\Gamma \dfrac{\rho\,(x - x_0)}{r^3}\,\mathrm{d}s$。
  * **行动**：
    1. 形心，先看对称；如均匀半圆弧 $x^2 + y^2 = R^2$，$y \ge 0$：关于 $y$ 轴对称，$\bar{x} = 0$；参数 $x = R\cos\theta$，$y = R\sin\theta$，$\mathrm{d}s = R\,\mathrm{d}\theta$，$\bar{y} = \dfrac{1}{\pi R}\displaystyle\int_0^{\pi} R\sin\theta \cdot R\,\mathrm{d}\theta = \dfrac{2R}{\pi}$；
    2. 引力；同一段半圆弧，线密度 $\mu$，对圆心处质量为 $m$ 的质点：$r = R$，$F_x = 0$，$F_y = \dfrac{Gm\mu}{R^3}\displaystyle\int_0^{\pi} R\sin\theta \cdot R\,\mathrm{d}\theta = \dfrac{2Gm\mu}{R}$，指向弧；
    3. 曲面的质心；如均匀上半球面 $x^2 + y^2 + z^2 = R^2$，$z \ge 0$：$\bar{x} = \bar{y} = 0$，$\bar{z} = \dfrac{1}{2\pi R^2}\displaystyle\iint_\Sigma z\,\mathrm{d}S = \dfrac{\pi R^3}{2\pi R^2} = \dfrac{R}{2}$。

**② 沿着路走，力做了多少功**

* **4. 算平面曲线上的第二类曲线积分**
  * **问题**：求 $\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y$，$L$ 不闭；求变力沿曲线做的功。
  * **目标**：写出参数式，起点的参数值放下限，终点的放上限。
  * **调用**：$\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \int_\alpha^\beta [P\varphi'(t) + Q\psi'(t)]\,\mathrm{d}t$。
  * **行动**：
    1. 写参数，定上下限；如 $\displaystyle\int_L (x^2 - y)\,\mathrm{d}x + (y^2 + x)\,\mathrm{d}y$，$L$ 是抛物线 $y = x^2$ 从 $(1, 1)$ 到 $(0, 0)$：以 $x$ 为参数，$x$ 从 $1$ 变到 $0$；
    2. 代入：$\mathrm{d}y = 2x\,\mathrm{d}x$，被积式为 $(x^2 - x^2) + (x^4 + x) \cdot 2x = 2x^5 + 2x^2$；
    3. 计算：$\displaystyle\int_1^0 (2x^5 + 2x^2)\,\mathrm{d}x = -\left(\dfrac{1}{3} + \dfrac{2}{3}\right) = -1$；
    4. 折线：分段，各段单独写参数；平行于 $x$ 轴的一段上 $\mathrm{d}y = 0$。
* **5. 算空间曲线上的第二类曲线积分**
  * **问题**：求 $\displaystyle\oint_\Gamma P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z$，$\Gamma$ 是两张曲面的交线。
  * **目标**：把交线写成参数式，按题目给的方向定出参数的起止。
  * **调用**：交线的参数式；$\displaystyle\int_\alpha^\beta (Px' + Qy' + Rz')\,\mathrm{d}t$。
  * **行动**：
    1. 写参数；如 $\Gamma: x^2 + y^2 = 1$，$x + z = 1$，从 $z$ 轴正向看去逆时针，求 $\displaystyle\oint_\Gamma (y - z)\,\mathrm{d}x + (z - x)\,\mathrm{d}y + (x - y)\,\mathrm{d}z$：$x = \cos t$，$y = \sin t$，$z = 1 - \cos t$，$t$ 从 $0$ 到 $2\pi$；
    2. 代入：$\mathrm{d}x = -\sin t\,\mathrm{d}t$，$\mathrm{d}y = \cos t\,\mathrm{d}t$，$\mathrm{d}z = \sin t\,\mathrm{d}t$，被积式化为 $(\sin t + \cos t - 2)\,\mathrm{d}t$；
    3. 计算：$\displaystyle\int_0^{2\pi} (\sin t + \cos t - 2)\,\mathrm{d}t = -4\pi$；第 19 类用斯托克斯公式核对。
* **6. 两类曲线积分互化**
  * **问题**：把 $\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y$ 化成对弧长的曲线积分。
  * **目标**：求出与 $L$ 方向一致的单位切向量。
  * **调用**：$\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \int_L (P\cos\alpha + Q\cos\beta)\,\mathrm{d}s$。
  * **行动**：
    1. 求切向量；如 $L$ 是 $y = x^2$ 从 $(0, 0)$ 到 $(1, 1)$：$x$ 增加的方向，切向量 $(1, 2x)$；
    2. 单位化：$\cos\alpha = \dfrac{1}{\sqrt{1 + 4x^2}}$，$\cos\beta = \dfrac{2x}{\sqrt{1 + 4x^2}}$；
    3. 写出：$\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \int_L \dfrac{P + 2xQ}{\sqrt{1 + 4x^2}}\,\mathrm{d}s$；方向反过来，切向量取 $(-1, -2x)$。

**③ 绕一圈的积分，换成里面的二重积分**

* **7. 用格林公式算闭曲线上的积分**
  * **问题**：求 $\displaystyle\oint_L P\,\mathrm{d}x + Q\,\mathrm{d}y$，$L$ 是闭曲线；用曲线积分求面积。
  * **目标**：查三件事，再把 $\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y}$ 在区域上积分。
  * **调用**：格林公式；面积 $A = \dfrac{1}{2}\displaystyle\oint_L x\,\mathrm{d}y - y\,\mathrm{d}x$。
  * **行动**：
    1. 查三件事；如 $\displaystyle\oint_L (2xy - x^2)\,\mathrm{d}x + (x + y^2)\,\mathrm{d}y$，$L$ 是 $y = x^2$ 与 $y^2 = x$ 所围区域的正向边界：闭、正向、多项式处处可导；
    2. 算被积函数：$\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y} = 1 - 2x$；
    3. 二重积分：$\displaystyle\int_0^1 \mathrm{d}x\int_{x^2}^{\sqrt{x}} (1 - 2x)\,\mathrm{d}y = \dfrac{1}{3} - \dfrac{3}{10} = \dfrac{1}{30}$；
    4. 面积；如椭圆 $x = a\cos t$，$y = b\sin t$：$x\,\mathrm{d}y - y\,\mathrm{d}x = ab\,\mathrm{d}t$，$A = \dfrac{1}{2}\displaystyle\int_0^{2\pi} ab\,\mathrm{d}t = \pi ab$。
* **8. 补线**
  * **问题**：$L$ 不闭，直接参数化很繁，$\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y}$ 却很简单。
  * **目标**：补一段好算的线，凑成闭曲线，用格林公式，再减掉补的那段。
  * **调用**：$\displaystyle\int_L = \oint_{L + L_1} - \int_{L_1}$。
  * **行动**：
    1. 补线；如 $\displaystyle\int_L (e^x\sin y - my)\,\mathrm{d}x + (e^x\cos y - m)\,\mathrm{d}y$，$L$ 是上半圆周 $x^2 + y^2 = ax$（$a > 0$）从 $A(a, 0)$ 到 $O(0, 0)$：补 $x$ 轴上从 $O$ 到 $A$ 的线段 $L_1$，$L + L_1$ 是半圆盘的正向边界；
    2. 格林：$\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y} = e^x\cos y - (e^x\cos y - m) = m$，$\displaystyle\oint_{L + L_1} = m \cdot \dfrac{1}{2}\pi\left(\dfrac{a}{2}\right)^2 = \dfrac{\pi ma^2}{8}$；
    3. 补的那段：$L_1$ 上 $y = 0$，$\mathrm{d}y = 0$，$P = 0$，积分为 $0$；
    4. 结果：$\displaystyle\int_L = \dfrac{\pi ma^2}{8} - 0 = \dfrac{\pi ma^2}{8}$。
* **9. 挖去奇点**
  * **问题**：被积函数在区域里某点无定义（分母为 $0$），求绕这一点的闭曲线积分。
  * **目标**：先看曲线围不围住奇点；围住时，换成绕一条小曲线的积分，在小曲线上把分母代掉。
  * **调用**：挖去奇点 $\displaystyle\oint_L = \oint_l$；面积 $\displaystyle\oint_l x\,\mathrm{d}y - y\,\mathrm{d}x = 2 \times$ $l$ 所围的面积。
  * **行动**：
    1. 验偏导；如 $\displaystyle\oint_L \dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{4x^2 + y^2}$，$L$ 是圆周 $(x - 1)^2 + y^2 = R^2$（$R \ne 1$），逆时针：原点以外 $\dfrac{\partial Q}{\partial x} = \dfrac{\partial P}{\partial y} = \dfrac{y^2 - 4x^2}{(4x^2 + y^2)^2}$；
    2. 不围住：$R < 1$ 时原点在圆外，积分为 $0$；
    3. 围住：$R > 1$ 时，取小椭圆 $l: 4x^2 + y^2 = \varepsilon^2$（逆时针），在 $l$ 上分母是 $\varepsilon^2$；
    4. 计算：$\dfrac{1}{\varepsilon^2}\displaystyle\oint_l x\,\mathrm{d}y - y\,\mathrm{d}x = \dfrac{1}{\varepsilon^2} \cdot 2 \cdot \pi \cdot \dfrac{\varepsilon}{2} \cdot \varepsilon = \pi$。
* **10. 沿外法线方向的积分（边界）**
  * **问题**：求 $\displaystyle\oint_L \dfrac{\partial u}{\partial \boldsymbol{n}}\,\mathrm{d}s$，或 $\displaystyle\oint_L (Pn_1 + Qn_2)\,\mathrm{d}s$，$\boldsymbol{n}$ 是外法向量。
  * **目标**：换成区域上的二重积分。
  * **调用**：$\displaystyle\oint_L (Pn_1 + Qn_2)\,\mathrm{d}s = \iint_D (P_x + Q_y)\,\mathrm{d}\sigma$。
  * **行动**：
    1. 认出 $P$、$Q$；如 $u = x^2 + y^2$，$L: x^2 + y^2 = 1$，求 $\displaystyle\oint_L \dfrac{\partial u}{\partial \boldsymbol{n}}\,\mathrm{d}s$：$P = u_x = 2x$，$Q = u_y = 2y$；
    2. 换成二重积分：$\displaystyle\iint_{x^2 + y^2 \le 1} (2 + 2)\,\mathrm{d}\sigma = 4\pi$；
    3. 直接算核对：圆上外法向量就是 $(x, y)$，$\dfrac{\partial u}{\partial \boldsymbol{n}} = 2x^2 + 2y^2 = 2$，积分 $2 \cdot 2\pi = 4\pi$。

**④ 什么时候只看起点和终点**

* **11. 判断与路径无关，并换路径计算**
  * **问题**：$L$ 是一条难以参数化的曲线，求 $\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y$。
  * **目标**：验证与路径无关，改走平行于坐标轴的折线。
  * **调用**：单连通区域内 $\dfrac{\partial P}{\partial y} = \dfrac{\partial Q}{\partial x}$ $\iff$ 与路径无关。
  * **行动**：
    1. 验证；如 $\displaystyle\int_L (x^2 + 2xy)\,\mathrm{d}x + (x^2 + y^4)\,\mathrm{d}y$，$L$ 是 $y = \sin\dfrac{\pi x}{2}$ 从 $(0, 0)$ 到 $(1, 1)$：$\dfrac{\partial P}{\partial y} = 2x = \dfrac{\partial Q}{\partial x}$，整个平面单连通；
    2. 换路径：先沿 $x$ 轴从 $(0, 0)$ 到 $(1, 0)$，$y = 0$，积 $\displaystyle\int_0^1 x^2\,\mathrm{d}x = \dfrac{1}{3}$；再沿 $x = 1$ 从 $(1, 0)$ 到 $(1, 1)$，积 $\displaystyle\int_0^1 (1 + y^4)\,\mathrm{d}y = \dfrac{6}{5}$；
    3. 结果：$\dfrac{1}{3} + \dfrac{6}{5} = \dfrac{23}{15}$。
* **12. 求原函数**
  * **问题**：验证 $P\,\mathrm{d}x + Q\,\mathrm{d}y$ 是某个函数的全微分，并求这个函数。
  * **目标**：先验 $\dfrac{\partial P}{\partial y} = \dfrac{\partial Q}{\partial x}$，再沿折线积分或偏积分。
  * **调用**：求原函数的三种办法。
  * **行动**：
    1. 验证；如 $(2x\cos y + y^2\cos x)\,\mathrm{d}x + (2y\sin x - x^2\sin y)\,\mathrm{d}y$：$\dfrac{\partial P}{\partial y} = -2x\sin y + 2y\cos x = \dfrac{\partial Q}{\partial x}$；
    2. 沿折线，从原点出发：$\displaystyle\int_0^x 2x\,\mathrm{d}x + \int_0^y (2y\sin x - x^2\sin y)\,\mathrm{d}y = x^2 + y^2\sin x + x^2\cos y - x^2$；
    3. 结果：$u = x^2\cos y + y^2\sin x + C$；
    4. 偏积分核对：$\displaystyle\int P\,\mathrm{d}x = x^2\cos y + y^2\sin x + \varphi(y)$，对 $y$ 求导与 $Q$ 比较，$\varphi'(y) = 0$。
* **13. 已知与路径无关，求未知函数**
  * **问题**：$P$ 或 $Q$ 里含未知函数 $\varphi$，已知积分与路径无关，求 $\varphi$，再求积分。
  * **目标**：把与路径无关翻译成偏导相等，解出 $\varphi$。
  * **调用**：$\dfrac{\partial P}{\partial y} = \dfrac{\partial Q}{\partial x}$；与路径无关时的计算。
  * **行动**：
    1. 列方程；如 $\displaystyle\int_L xy^2\,\mathrm{d}x + y\varphi(x)\,\mathrm{d}y$ 与路径无关，$\varphi$ 有连续导数，$\varphi(0) = 0$：$\dfrac{\partial P}{\partial y} = 2xy$，$\dfrac{\partial Q}{\partial x} = y\varphi'(x)$，所以 $\varphi'(x) = 2x$；
    2. 解出：$\varphi(x) = x^2 + C$，由 $\varphi(0) = 0$ 得 $\varphi(x) = x^2$；
    3. 求积分；如从 $(0, 0)$ 到 $(1, 1)$：$xy^2\,\mathrm{d}x + x^2y\,\mathrm{d}y = \mathrm{d}\dfrac{x^2y^2}{2}$，结果 $\dfrac{1}{2}$；
    4. 偏导相等的方程里含 $\varphi$ 和 $\varphi'$ 时，是一个微分方程，先解出它，再用初始条件定常数。
* **14. 绕奇点的闭曲线积分都相同**
  * **问题**：已知沿任意绕原点一圈的闭曲线，积分都等于同一个常数，求其中的未知函数或这个常数。
  * **目标**：在不含原点的单连通区域（如右半平面）里，积分与路径无关，所以偏导相等。
  * **调用**：区域有洞时的结论；四个等价条件。
  * **行动**：
    1. 偏导相等；如 $\displaystyle\oint_C \dfrac{\varphi(y)\,\mathrm{d}x + 2xy\,\mathrm{d}y}{2x^2 + y^4}$ 沿任意绕原点一圈的闭曲线都为同一常数，$\varphi$ 有连续导数：右半平面里的闭曲线，可以由两条绕原点一圈的闭曲线相减得到，所以沿它的积分为 $0$；右半平面单连通，由四个等价条件得 $\dfrac{\partial P}{\partial y} = \dfrac{\partial Q}{\partial x}$；
    2. 比较分子：$\varphi'(y)(2x^2 + y^4) - 4y^3\varphi(y) = 2y^5 - 4x^2y$，比较 $x^2$ 的系数得 $\varphi'(y) = -2y$，再比较其余项得 $\varphi(y) = -y^2$；
    3. 求常数：取 $C: 2x^2 + y^4 = 1$，分母是 $1$，$\displaystyle\oint_C -y^2\,\mathrm{d}x + 2xy\,\mathrm{d}y = \iint_{2x^2 + y^4 \le 1} 4y\,\mathrm{d}\sigma = 0$（区域关于 $x$ 轴对称）。

**⑤ 流过一张曲面的量**

* **15. 分面投影**
  * **问题**：求 $\displaystyle\iint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z + Q\,\mathrm{d}z\,\mathrm{d}x + R\,\mathrm{d}x\,\mathrm{d}y$，$\Sigma$ 不闭，或闭但不便用高斯公式。
  * **目标**：每一项投到对应的坐标面，按侧定正负号。
  * **调用**：分面投影；垂直的曲面为 $0$；对称性。
  * **行动**：
    1. 分片定侧；如 $\displaystyle\oiint_\Sigma z\,\mathrm{d}x\,\mathrm{d}y$，$\Sigma$ 是球面 $x^2 + y^2 + z^2 = a^2$ 的外侧：上半球面取上侧，下半球面取下侧；
    2. 上半：$\displaystyle\iint_{x^2 + y^2 \le a^2}\sqrt{a^2 - x^2 - y^2}\,\mathrm{d}x\,\mathrm{d}y = \dfrac{2}{3}\pi a^3$；
    3. 下半：$z = -\sqrt{a^2 - x^2 - y^2}$，下侧取负号，$-\displaystyle\iint \left(-\sqrt{a^2 - x^2 - y^2}\right)\mathrm{d}x\,\mathrm{d}y = \dfrac{2}{3}\pi a^3$；
    4. 相加：$\dfrac{4}{3}\pi a^3$；$R = z$ 关于 $z$ 是奇函数，两半相等，正是加倍。
* **16. 合一投影、两类曲面积分互化**
  * **问题**：$\Sigma: z = z(x, y)$ 上的三项一起出现；或要求化成对面积的曲面积分。
  * **目标**：用法向量把三项合到 $xOy$ 面上。
  * **调用**：合一投影；两类曲面积分的联系。
  * **行动**：
    1. 合一；如 $\displaystyle\iint_\Sigma (z^2 + x)\,\mathrm{d}y\,\mathrm{d}z - z\,\mathrm{d}x\,\mathrm{d}y$，$\Sigma: z = \dfrac{x^2 + y^2}{2}$，$0 \le z \le 2$，取下侧：$z_x = x$，下侧加负号，原式 $= -\displaystyle\iint_{D_{xy}} [-(z^2 + x)x - z]\,\mathrm{d}x\,\mathrm{d}y$，$D_{xy}: x^2 + y^2 \le 4$；
    2. 对称：$xz^2$ 关于 $x$ 是奇函数，积分为 $0$；剩 $\displaystyle\iint_{D_{xy}} \left(x^2 + \dfrac{x^2 + y^2}{2}\right)\mathrm{d}x\,\mathrm{d}y = 4\pi + 4\pi = 8\pi$；
    3. 互化；如 $\Sigma$ 是平面 $3x + 2y + 2\sqrt{3}z = 6$ 在第一卦限的部分，取上侧：法向量 $(3, 2, 2\sqrt{3})$ 的模是 $5$，原积分 $= \displaystyle\iint_\Sigma \left(\dfrac{3}{5}P + \dfrac{2}{5}Q + \dfrac{2\sqrt{3}}{5}R\right)\mathrm{d}S$。

**⑥ 闭曲面和空间曲线**

* **17. 用高斯公式算闭曲面上的积分；补面**
  * **问题**：求闭曲面上的第二类曲面积分；曲面不闭，但散度简单。
  * **目标**：闭的直接换成三重积分；不闭的补平面再减掉。
  * **调用**：高斯公式；补面；用曲面积分求体积。
  * **行动**：
    1. 闭曲面；如球面 $x^2 + y^2 + z^2 = a^2$ 外侧上的 $\displaystyle\oiint_\Sigma x\,\mathrm{d}y\,\mathrm{d}z + y\,\mathrm{d}z\,\mathrm{d}x + z\,\mathrm{d}x\,\mathrm{d}y$：散度为 $3$，结果 $3 \cdot \dfrac{4}{3}\pi a^3 = 4\pi a^3$；
    2. 补面；如 $\displaystyle\iint_\Sigma (x^2\cos\alpha + y^2\cos\beta + z^2\cos\gamma)\,\mathrm{d}S$，$\Sigma$ 是锥面 $x^2 + y^2 = z^2$ 介于 $z = 0$ 与 $z = h$ 之间的部分，法向量朝下：补顶面 $\Sigma_1: z = h$（$x^2 + y^2 \le h^2$），取上侧，合成闭曲面的外侧；
    3. 三重积分：散度 $2(x + y + z)$，对称后剩 $\displaystyle\iiint_\Omega 2z\,\mathrm{d}v = 2\int_0^h z \cdot \pi z^2\,\mathrm{d}z = \dfrac{\pi h^4}{2}$；
    4. 减去顶面：$\Sigma_1$ 上 $\cos\gamma = 1$，$\displaystyle\iint_{\Sigma_1} h^2\,\mathrm{d}S = \pi h^4$，结果 $\dfrac{\pi h^4}{2} - \pi h^4 = -\dfrac{\pi h^4}{2}$。
* **18. 高斯公式挖去奇点**
  * **问题**：被积函数的分母是 $(x^2 + y^2 + z^2)^{\frac{3}{2}}$ 这类，闭曲面围住原点。
  * **目标**：原点以外散度为 $0$，换成穿出小球面的通量，在小球面上把分母代掉。
  * **调用**：挖去奇点；小球面上分母是常数。
  * **行动**：
    1. 验散度；如 $\displaystyle\oiint_\Sigma \dfrac{x\,\mathrm{d}y\,\mathrm{d}z + y\,\mathrm{d}z\,\mathrm{d}x + z\,\mathrm{d}x\,\mathrm{d}y}{(x^2 + y^2 + z^2)^{\frac{3}{2}}}$，$\Sigma$ 是椭球面 $\dfrac{x^2}{4} + y^2 + z^2 = 1$ 的外侧：原点以外散度为 $0$；
    2. 换成小球面 $\Sigma_\varepsilon: x^2 + y^2 + z^2 = \varepsilon^2$（外侧），分母是 $\varepsilon^3$；
    3. 再用高斯公式：$\dfrac{1}{\varepsilon^3}\displaystyle\oiint_{\Sigma_\varepsilon} x\,\mathrm{d}y\,\mathrm{d}z + y\,\mathrm{d}z\,\mathrm{d}x + z\,\mathrm{d}x\,\mathrm{d}y = \dfrac{1}{\varepsilon^3} \cdot 3 \cdot \dfrac{4}{3}\pi\varepsilon^3 = 4\pi$；
    4. 不围住原点：直接用高斯公式，结果为 $0$。
* **19. 用斯托克斯公式算空间闭曲线上的积分**
  * **问题**：求 $\displaystyle\oint_\Gamma P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z$，$\Gamma$ 是平面与曲面的交线、折线围成的三角形等。
  * **目标**：取 $\Gamma$ 所在的平面作 $\Sigma$，按右手法则定侧，用第一类形式。
  * **调用**：斯托克斯公式；$\operatorname{rot}\boldsymbol{A} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y)$。
  * **行动**：
    1. 求旋度；如 $\displaystyle\oint_\Gamma z\,\mathrm{d}x + x\,\mathrm{d}y + y\,\mathrm{d}z$，$\Gamma$ 是平面 $x + y + z = 1$ 被三个坐标面截成的三角形的边界，从 $z$ 轴正向看去逆时针：$\operatorname{rot}\boldsymbol{A} = (1, 1, 1)$；
    2. 取侧：$\Sigma$ 取上侧，单位法向量 $\boldsymbol{n} = \dfrac{1}{\sqrt{3}}(1, 1, 1)$，$\operatorname{rot}\boldsymbol{A} \cdot \boldsymbol{n} = \sqrt{3}$；
    3. 计算：三角形边长 $\sqrt{2}$，面积 $\dfrac{\sqrt{3}}{2}$，结果 $\sqrt{3} \cdot \dfrac{\sqrt{3}}{2} = \dfrac{3}{2}$；
    4. 核对第 5 类：$\operatorname{rot}\boldsymbol{A} = (-2, -2, -2)$，平面 $x + z = 1$ 上侧 $\boldsymbol{n} = \dfrac{1}{\sqrt{2}}(1, 0, 1)$，$\operatorname{rot}\boldsymbol{A} \cdot \boldsymbol{n} = -2\sqrt{2}$；截出的椭圆面积是投影面积 $\pi$ 除以 $\cos\gamma = \dfrac{1}{\sqrt{2}}$，即 $\sqrt{2}\pi$；结果 $-2\sqrt{2} \cdot \sqrt{2}\pi = -4\pi$，与参数化的结果相同。
* **20. 求散度、旋度；空间曲线积分与路径无关**
  * **问题**：求向量场的散度、旋度；判断空间曲线积分与路径无关，求 $u(x, y, z)$。
  * **目标**：按定义求偏导；路径无关时沿折线求 $u$。
  * **调用**：$\operatorname{div}\boldsymbol{A} = P_x + Q_y + R_z$；旋度的行列式；$\operatorname{rot}\boldsymbol{A} = \boldsymbol{0}$ 时与路径无关。
  * **行动**：
    1. 散度、旋度；如 $\boldsymbol{A} = (xy, yz, zx)$：$\operatorname{div}\boldsymbol{A} = y + z + x$，$\operatorname{rot}\boldsymbol{A} = (0 - y,\ 0 - z,\ 0 - x) = (-y, -z, -x)$；
    2. 路径无关；如 $\displaystyle\int_\Gamma yz\,\mathrm{d}x + zx\,\mathrm{d}y + xy\,\mathrm{d}z$ 从 $(0, 0, 0)$ 到 $(1, 2, 3)$：$\operatorname{rot}\boldsymbol{A} = (x - x,\ y - y,\ z - z) = \boldsymbol{0}$；
    3. 求 $u$：被积式是 $\mathrm{d}(xyz)$，结果 $1 \cdot 2 \cdot 3 - 0 = 6$。
