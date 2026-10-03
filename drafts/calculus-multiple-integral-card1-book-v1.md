### 〔定义〕

**本卡主线**：把定积分「切细、求和、取极限」的办法搬到平面区域和空间立体上，再化回定积分来算。整张卡分六站，每一站由上一站引出：
* **① 曲顶柱体的体积怎么算**：切成小块，每块当平顶柱体，加起来，再取极限；区域换成立体，就是三重积分；
* **② 怎么化成两次定积分**：用垂直于 $x$ 轴的平面去切，截面面积是一个定积分，再对 $x$ 积分；
* **③ 区域是圆的怎么办**：按圆来切，小块是扇环，面积元是 $r\,\mathrm{d}r\,\mathrm{d}\theta$；
* **④ 三重积分怎么算**：竖着切先积 $z$，横着切先积截面；圆柱、球也按形状切；
* **⑤ 重积分怎么算更省事**：动手之前先看对称，奇函数两半抵消，$x, y$ 互换区域不变，积分也不变；
* **⑥ 什么量能用重积分算**：能切成小块、每块近似「权 $\times$ 面积元」的量；引力是向量，按分量各积一次；
* **依赖**：定积分及其计算、截面面积已知的立体体积、变限积分求导（第 3 章）；洛必达（第 2 章）；投影区域（第 4 章）；切平面的法向量、雅可比行列式（第 5 章）。

**① 曲顶柱体的体积怎么算**

柱体的体积是底面积乘高，可曲顶柱体的顶是曲面 $z = f(x, y)$，各处高度不同；一块薄板各处密度不同，求它的质量，也是这个问题。办法照搬第 3 章的定积分：把底面 $D$ 切成小块，每一小块上高度变化不大，就当它不变，用高乘这一小块的面积，加起来，再让小块越切越细，取极限，这就是二重积分。区域换成立体 $\Omega$，面积换成体积，就是三重积分。定积分的性质都原样搬过来；中值定理也一样：把柱体里的沙子推平，推平后的高度是平均高度，顶上一定有一点原来就是这个高度。

#### 1. 二重积分
设 $f(x, y)$ 在有界闭区域 $D$ 上有界：
1. **分割**：把 $D$ 任意分成 $n$ 个小闭区域 $\Delta\sigma_1, \cdots, \Delta\sigma_n$（$\Delta\sigma_i$ 也表示其面积），记 $\lambda$ 为各小区域直径的最大值；
2. **求和**：任取 $(\xi_i, \eta_i) \in \Delta\sigma_i$，作和 $\displaystyle\sum_{i=1}^{n} f(\xi_i, \eta_i)\Delta\sigma_i$；
3. **取极限**：若不论怎样分割、怎样取点，极限
   $$\lim\limits_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i, \eta_i)\Delta\sigma_i$$
   总存在且相等，则称此极限为 $f(x, y)$ 在 $D$ 上的==二重积分==，记作 $\displaystyle\iint_D f(x, y)\,\mathrm{d}\sigma$。

* **名称**：$D$ 称为==积分区域==，$\mathrm{d}\sigma$ 称为==面积元==；
* **存在**：$f(x, y)$ 在有界闭区域 $D$ 上连续时，二重积分必存在。

#### 2. 三重积分
把二重积分定义中的平面区域 $D$ 换成空间有界闭区域 $\Omega$，面积元换成==体积元== $\mathrm{d}v$，得到 $f(x, y, z)$ 在 $\Omega$ 上的==三重积分==
$$\iiint_\Omega f(x, y, z)\,\mathrm{d}v = \lim\limits_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i, \eta_i, \zeta_i)\Delta v_i$$

#### 3. 平均值
设 $\sigma$ 为 $D$ 的面积，称 $\dfrac{1}{\sigma}\displaystyle\iint_D f(x, y)\,\mathrm{d}\sigma$ 为 $f$ 在 $D$ 上的==平均值==。
* **看成高度**：把曲顶柱体推平成同底的平顶柱体，平顶的高度就是平均值。

**② 怎么化成两次定积分**

定义照搬了，可区域上没有原函数，牛顿-莱布尼茨公式用不上。我们回到体积：第 3 章算过截面面积已知的立体，体积是 $\int_a^b A(x)\,\mathrm{d}x$。用垂直于 $x$ 轴的平面去切曲顶柱体，位置 $x$ 处的截面是一块曲边梯形：底是这条竖线落在 $D$ 里的一段，从 $y = \varphi_1(x)$ 到 $y = \varphi_2(x)$，高是 $f(x, y)$。它的面积 $A(x)$ 是对 $y$ 的定积分，这时 $x$ 当常数；再对 $x$ 积分，二重积分就成了两次定积分。所以第一步总是看区域：竖线穿过它时，从哪条边界进、从哪条边界出。也可以横着切，先对 $x$ 积分；两种次序结果相同，难易可能差很多。

#### 1. X 型区域与 Y 型区域
* **X 型区域**：$D = \{(x, y) \mid a \le x \le b,\ \varphi_1(x) \le y \le \varphi_2(x)\}$，穿过 $D$ 内部且平行于 $y$ 轴的直线与 $D$ 的边界至多交于两点；
* **Y 型区域**：$D = \{(x, y) \mid c \le y \le d,\ \psi_1(y) \le x \le \psi_2(y)\}$，穿过 $D$ 内部且平行于 $x$ 轴的直线与边界至多交于两点。

#### 2. 累次积分
$\displaystyle\int_a^b \mathrm{d}x\int_{\varphi_1(x)}^{\varphi_2(x)} f(x, y)\,\mathrm{d}y$ 表示先把 $x$ 当常数，对 $y$ 积分，得到 $x$ 的函数，再对 $x$ 积分，称为==累次积分==（二次积分）。
* **上下限**：内层的上下限可以含外层的变量；外层的上下限是常数。

**③ 区域是圆的怎么办**

直角坐标切出来的是矩形条，和圆不合：圆的边界写成 $y = \pm\sqrt{1 - x^2}$，上下限带根号。区域是圆、被积函数里有 $x^2 + y^2$ 时，我们改成按圆来切：沿射线切，再沿圆周切，切出的小块是一段扇环，两条边是 $\mathrm{d}r$ 和 $r\,\mathrm{d}\theta$，所以面积元是 $r\,\mathrm{d}r\,\mathrm{d}\theta$。这个多出来的 $r$ 常常正好帮了忙：$\int e^{-x^2}\,\mathrm{d}x$ 的原函数不是初等函数，可在圆上积 $e^{-(x^2 + y^2)}$，换成极坐标是 $\int e^{-r^2}r\,\mathrm{d}r$，$r$ 正好凑出微分。定限的办法和直角坐标一样：先定 $\theta$ 的范围，再看射线从哪进、从哪出。更一般的换元，面积放大的倍数是雅可比行列式的绝对值。

#### 1. 极坐标
平面上点 $M$ 到原点的距离 $r$，以及 $\overrightarrow{OM}$ 与 $x$ 轴正向的夹角 $\theta$，称为点 $M$ 的==极坐标==：
$$x = r\cos\theta, \quad y = r\sin\theta$$

其中 $r \ge 0$，$\theta$ 一般取 $[0, 2\pi]$ 或 $[-\pi, \pi]$。
* **坐标曲线**：$r = $ 常数是以原点为心的圆；$\theta = $ 常数是从原点出发的射线。

**④ 三重积分怎么算**

三重积分是同样的事再做一次。二重积分里，被积函数可以画成高度；三重积分的三个自变量已经占满了空间，被积函数没处画了，我们改用质量来想，有两种切法。一种是竖着切：在投影区域里取一点，沿 $z$ 方向穿过立体，这根细柱从下曲面进、从上曲面出，先把细柱的质量加起来，是对 $z$ 的定积分；再把所有细柱加起来，是投影区域上的二重积分，这叫先一后二。另一种是横着切：一层一层地切，先求一层薄片的质量，是截面上的二重积分；再把各层加起来，对 $z$ 积分，这叫先二后一。立体是圆的，也按 ③ 的办法切：圆柱、旋转抛物面在 $xOy$ 面上用极坐标、$z$ 不动，就是柱面坐标；球和圆锥用球面坐标，小块的三条边是 $\mathrm{d}r$、$r\,\mathrm{d}\varphi$、$r\sin\varphi\,\mathrm{d}\theta$。

#### 1. 投影区域与截面
* **投影区域**：$\Omega$ 在 $xOy$ 面上的投影，记作 $D_{xy}$（求法见第 4 章）；
* **截面**：用平面 $Z = z$ 截 $\Omega$ 所得的平面区域，记作 $D_z$，它的面积记作 $S(z)$。

#### 2. 柱面坐标
点 $M(x, y, z)$ 的柱面坐标 $(\rho, \theta, z)$ 与直角坐标的关系：
$$\begin{cases} x = \rho\cos\theta \\ y = \rho\sin\theta \\ z = z \end{cases}$$

其中 $0 \le \rho < +\infty$，$0 \le \theta \le 2\pi$，$-\infty < z < +\infty$，即 $xOy$ 面上用极坐标。

#### 3. 球面坐标
点 $M(x, y, z)$ 的球面坐标 $(r, \varphi, \theta)$ 与直角坐标的关系：
$$\begin{cases} x = r\sin\varphi\cos\theta \\ y = r\sin\varphi\sin\theta \\ z = r\cos\varphi \end{cases}$$

* **$r$**：点 $M$ 到原点的距离，$0 \le r < +\infty$；
* **$\varphi$**：$\overrightarrow{OM}$ 与 $z$ 轴正向的夹角，$0 \le \varphi \le \pi$；
* **$\theta$**：$\overrightarrow{OM}$ 在 $xOy$ 面上的投影与 $x$ 轴正向的夹角，$0 \le \theta \le 2\pi$。

**⑤ 重积分怎么算更省事**

到这里，每个重积分都能化成定积分，可每化一次都要画图、定限、积两三次。区域对称时，这些工作能省掉一半，甚至全部，所以拿到题第一步先看对称。第 3 章里，奇函数在对称区间上积分为 $0$；重积分也一样：区域关于 $y$ 轴对称，被积函数关于 $x$ 是奇函数，左右两半正好抵消；是偶函数，就算一半再乘 $2$。还有一种对称是 $x, y$ 地位相同：积分和变量用什么字母无关，把 $x, y$ 互换只是改了名字，只要区域互换后不变，积分就不变。把两种写法加起来除以 $2$，常能凑出 $x^2 + y^2$。三重积分同理，对称面换成坐标面。

#### 1. 区域的对称
* **关于 $y$ 轴对称**：$(x, y) \in D \implies (-x, y) \in D$；
* **关于 $x$ 轴对称**：$(x, y) \in D \implies (x, -y) \in D$；
* **关于原点对称**：$(x, y) \in D \implies (-x, -y) \in D$；
* **关于直线 $y = x$ 对称**：$(x, y) \in D \implies (y, x) \in D$，即把 $x, y$ 互换后 $D$ 不变；
* **空间**：$\Omega$ 关于 $xOy$ 面对称，即 $(x, y, z) \in \Omega \implies (x, y, -z) \in \Omega$；关于另两个坐标面同理。

#### 2. 关于某个变量的奇偶
若 $f(-x, y) = -f(x, y)$，称 $f$ 关于 $x$ 是==奇函数==；若 $f(-x, y) = f(x, y)$，称 $f$ 关于 $x$ 是==偶函数==；关于 $y$、$z$ 同理。

**⑥ 什么量能用重积分算**

回到开头：能切成小块、每一小块近似是「某个量乘面积元或体积元」、总量等于各块相加的，都能写成重积分，和第 3 章的微元法一样。乘在面积元前面的那个量，叫它权：权取 $1$，二重积分是面积，三重积分是体积；权取密度，是质量；权取坐标乘密度，是静矩，再除以质量就是质心，密度均匀时叫形心；权取到轴距离的平方乘密度，是转动惯量。曲面面积要多想一步：曲面上的一小片，近似是切平面上的一小片，它投到 $xOy$ 面上是 $\mathrm{d}\sigma$。切平面越斜，这一小片比 $\mathrm{d}\sigma$ 大得越多，放大的倍数是法向量与 $z$ 轴夹角余弦的倒数。引力也能这样算，只是它是向量：各小块对质点的引力方向不同，大小不能直接相加，要按三个分量各积一次。

#### 1. 质心与静矩
$n$ 个质点，质量为 $m_i$，位于 $(x_i, y_i)$：
* **静矩**：$\sum m_ix_i$ 称为对 $y$ 轴的==静矩==，$\sum m_iy_i$ 称为对 $x$ 轴的静矩；
* **质心**：$\bar{x} = \dfrac{\sum m_ix_i}{\sum m_i}$，$\bar{y} = \dfrac{\sum m_iy_i}{\sum m_i}$，即按质量加权的平均位置，称为==质心==。

#### 2. 形心
密度为常数时的质心称为==形心==，它只与形状有关。

#### 3. 转动惯量
质量为 $m$ 的质点到轴 $l$ 的距离为 $d$，称 $I = md^2$ 为它对 $l$ 的==转动惯量==；质点系对 $l$ 的转动惯量是各质点的转动惯量之和。

#### 4. 引力
质量为 $m_1$、$m_2$ 的两个质点相距 $r$，它们之间的==引力==大小为 $F = \dfrac{Gm_1m_2}{r^2}$（$G$ 为引力常数），方向沿两点的连线，互相吸引。

---

### 〔性质〕

**① 曲顶柱体的体积怎么算**

**二重积分**

#### 1. 几何意义
* **$f \ge 0$**：$\displaystyle\iint_D f(x, y)\,\mathrm{d}\sigma$ 等于以 $D$ 为底、以曲面 $z = f(x, y)$ 为顶的==曲顶柱体的体积==；
* **$f$ 有正有负**：$xOy$ 面上方的体积减去下方的体积；
* **$f = 1$**：$\displaystyle\iint_D 1\,\mathrm{d}\sigma = \sigma$，即 $D$ 的面积。

#### 2. 基本性质
与定积分的性质一一对应（第 3 章），设 $\sigma$ 为 $D$ 的面积：
- **线性**：$\displaystyle\iint_D [\alpha f + \beta g]\,\mathrm{d}\sigma = \alpha\iint_D f\,\mathrm{d}\sigma + \beta\iint_D g\,\mathrm{d}\sigma$；
- **区域可加**：$D = D_1 \cup D_2$ 且 $D_1, D_2$ 无公共内点时，$\displaystyle\iint_D f\,\mathrm{d}\sigma = \iint_{D_1} f\,\mathrm{d}\sigma + \iint_{D_2} f\,\mathrm{d}\sigma$；
- **比较**：在 $D$ 上 $f \le g$ 时，$\displaystyle\iint_D f\,\mathrm{d}\sigma \le \iint_D g\,\mathrm{d}\sigma$；且 $\left|\displaystyle\iint_D f\,\mathrm{d}\sigma\right| \le \iint_D |f|\,\mathrm{d}\sigma$；
- **估值**：在 $D$ 上 $m \le f \le M$ 时，$m\sigma \le \displaystyle\iint_D f\,\mathrm{d}\sigma \le M\sigma$。

#### 3. 中值定理
设 $f(x, y)$ 在有界闭区域 $D$ 上连续，$\sigma$ 为 $D$ 的面积，则至少存在一点 $(\xi, \eta) \in D$，使
$$\iint_D f(x, y)\,\mathrm{d}\sigma = f(\xi, \eta)\,\sigma$$

* **含义**：连续函数在 $D$ 上的平均值，一定在 $D$ 的某一点取到；
* **缩成一点**：$f$ 在 $(x_0, y_0)$ 附近连续，$D_r$ 是以 $(x_0, y_0)$ 为心、$r$ 为半径的圆，则
  $$\lim\limits_{r \to 0^+} \dfrac{1}{\pi r^2}\iint_{D_r} f\,\mathrm{d}\sigma = f(x_0, y_0)$$
* **依据**：中值定理给出 $(\xi, \eta) \in D_r$，$r \to 0^+$ 时 $(\xi, \eta) \to (x_0, y_0)$，再用连续。

#### 4. 二重积分是一个数
* **与积分变量的字母无关**：$\displaystyle\iint_D f(x, y)\,\mathrm{d}x\,\mathrm{d}y = \iint_D f(u, v)\,\mathrm{d}u\,\mathrm{d}v$；
* **当常数用**：式子里出现 $\displaystyle\iint_D f\,\mathrm{d}\sigma$ 时，它是一个常数。

**三重积分**

#### 1. 性质
与二重积分的性质相同，中值定理也一样成立：
* **体积**：$\displaystyle\iiint_\Omega 1\,\mathrm{d}v$ 等于 $\Omega$ 的体积；
* **物理意义**：$f \ge 0$ 表示密度时，三重积分是物体的质量。

**反过来用定义**

#### 1. 双重和式的极限
$f(x, y)$ 在正方形 $[0, 1] \times [0, 1]$ 上连续时：
$$\begin{aligned} & \lim\limits_{n \to \infty} \dfrac{1}{n^2}\sum_{i=1}^{n}\sum_{j=1}^{n} f\left(\dfrac{i}{n}, \dfrac{j}{n}\right) \\ = {} & \iint_{[0, 1] \times [0, 1]} f(x, y)\,\mathrm{d}\sigma \end{aligned}$$

* **依据**：把正方形等分成 $n^2$ 个小正方形，每个面积为 $\dfrac{1}{n^2}$，在每个小正方形的右上角取值，就是二重积分定义里的和。

**② 怎么化成两次定积分**

#### 1. 化二重积分为累次积分
直角坐标下面积元 $\mathrm{d}\sigma = \mathrm{d}x\,\mathrm{d}y$：
- **X 型区域（先 $y$ 后 $x$）**：
  $$\iint_D f\,\mathrm{d}\sigma = \int_a^b \mathrm{d}x\int_{\varphi_1(x)}^{\varphi_2(x)} f(x, y)\,\mathrm{d}y$$
- **Y 型区域（先 $x$ 后 $y$）**：
  $$\iint_D f\,\mathrm{d}\sigma = \int_c^d \mathrm{d}y\int_{\psi_1(y)}^{\psi_2(y)} f(x, y)\,\mathrm{d}x$$
- **依据**：位置 $x$ 处的截面面积 $A(x) = \displaystyle\int_{\varphi_1(x)}^{\varphi_2(x)} f(x, y)\,\mathrm{d}y$，再用 $V = \displaystyle\int_a^b A(x)\,\mathrm{d}x$（第 3 章）。

#### 2. 分块
* **两型都不是**：把 $D$ 分成若干个 X 型或 Y 型区域，再用区域可加性；
* **被积函数分段**：含绝对值、$\max$、$\min$、符号函数时，用使里面等于 $0$ 的曲线（或使两者相等的曲线）把 $D$ 分开，每块上被积函数是一个式子。

#### 3. 矩形区域上变量分离
$$\begin{aligned} & \iint_{[a, b] \times [c, d]} g(x)h(y)\,\mathrm{d}\sigma \\ = {} & \int_a^b g(x)\,\mathrm{d}x \cdot \int_c^d h(y)\,\mathrm{d}y \end{aligned}$$

#### 4. 交换积分次序
1. **还原区域**：由所给累次积分的上下限写出区域 $D$ 的不等式表示；
2. **画出区域**：画出 $D$ 的图形；
3. **换型重写**：把 $D$ 改写为另一型区域（必要时分块），写出新的累次积分。

* **两个累次积分相加**：先把两块区域拼起来，常能拼成一个另一型的区域。

#### 5. 原函数不是初等函数（边界）
$e^{x^2}$、$e^{-x^2}$、$\dfrac{\sin x}{x}$、$\dfrac{\cos x}{x}$、$\sin x^2$、$\cos x^2$、$\dfrac{1}{\ln x}$ 的原函数都不是初等函数。累次积分的内层遇到它们，只能交换次序，先对另一个变量积分。

**③ 区域是圆的怎么办**

#### 1. 极坐标下的二重积分
令 $x = r\cos\theta$，$y = r\sin\theta$，面积元 $\mathrm{d}\sigma = r\,\mathrm{d}r\,\mathrm{d}\theta$，则
$$\begin{aligned} & \iint_D f(x, y)\,\mathrm{d}\sigma \\ = {} & \iint_D f(r\cos\theta, r\sin\theta)\,r\,\mathrm{d}r\,\mathrm{d}\theta \end{aligned}$$

* **依据**：$r$ 到 $r + \Delta r$、$\theta$ 到 $\theta + \Delta\theta$ 围成的扇环，面积为 $\dfrac{1}{2}[(r + \Delta r)^2 - r^2]\Delta\theta = r\Delta r\Delta\theta + \dfrac{1}{2}(\Delta r)^2\Delta\theta$，略去高阶项是 $r\Delta r\Delta\theta$。

#### 2. 极坐标下化为累次积分
- **极点在 $D$ 外**：$D = \{(r, \theta) \mid \alpha \le \theta \le \beta,\ r_1(\theta) \le r \le r_2(\theta)\}$，化为
  $$\int_\alpha^\beta \mathrm{d}\theta\int_{r_1(\theta)}^{r_2(\theta)} f(r\cos\theta, r\sin\theta)\,r\,\mathrm{d}r$$
- **极点在 $D$ 的边界上**：$D = \{(r, \theta) \mid \alpha \le \theta \le \beta,\ 0 \le r \le r(\theta)\}$，内层积分下限为 $0$；
- **极点在 $D$ 内部**：$D = \{(r, \theta) \mid 0 \le \theta \le 2\pi,\ 0 \le r \le r(\theta)\}$。

#### 3. 常见边界的极坐标方程（查表）
* **圆**：$x^2 + y^2 = R^2$ 是 $r = R$；$x^2 + y^2 = 2ax$（$a > 0$）是 $r = 2a\cos\theta$，$-\dfrac{\pi}{2} \le \theta \le \dfrac{\pi}{2}$；$x^2 + y^2 = 2ay$（$a > 0$）是 $r = 2a\sin\theta$，$0 \le \theta \le \pi$；
* **直线**：$x = a$ 是 $r = \dfrac{a}{\cos\theta}$；$y = b$ 是 $r = \dfrac{b}{\sin\theta}$；$x + y = 1$ 是 $r = \dfrac{1}{\cos\theta + \sin\theta}$；过原点的 $y = kx$ 是 $\theta = \arctan k$。

#### 4. 圆上只含 $x^2 + y^2$ 的被积函数
$$\iint_{x^2 + y^2 \le t^2} f(x^2 + y^2)\,\mathrm{d}\sigma = 2\pi\int_0^t f(r^2)\,r\,\mathrm{d}r$$

* **变成变限积分**：右边是 $t$ 的变限积分，$f$ 连续时，对 $t$ 的导数是 $2\pi tf(t^2)$（第 3 章）。

#### 5. 泊松积分
$$\int_0^{+\infty} e^{-x^2}\,\mathrm{d}x = \dfrac{\sqrt{\pi}}{2}$$

* **依据**：记这个积分为 $I$，则 $I^2$ 是 $e^{-(x^2 + y^2)}$ 在第一象限上的积分；换成极坐标，$\displaystyle\int_0^{\frac{\pi}{2}}\mathrm{d}\theta\int_0^{+\infty} e^{-r^2}r\,\mathrm{d}r = \dfrac{\pi}{4}$，所以 $I = \dfrac{\sqrt{\pi}}{2}$（严格的推导是把正方形夹在两个四分之一圆之间，再取极限）。

#### 6. 二重积分的换元法
设变换 $x = x(u, v)$，$y = y(u, v)$ 把 $uv$ 平面上的闭区域 $D'$ 一对一地变为 $xy$ 平面上的 $D$，$x(u, v)$、$y(u, v)$ 在 $D'$ 上有连续偏导数，且雅可比行列式（第 5 章）
$$J(u, v) = \dfrac{\partial(x, y)}{\partial(u, v)} = \begin{vmatrix} x_u & x_v \\ y_u & y_v \end{vmatrix} \neq 0$$

则
$$\begin{aligned} & \iint_D f(x, y)\,\mathrm{d}x\,\mathrm{d}y \\ = {} & \iint_{D'} f[x(u, v), y(u, v)]\,|J(u, v)|\,\mathrm{d}u\,\mathrm{d}v \end{aligned}$$

- **极坐标是特例**：$x = r\cos\theta$，$y = r\sin\theta$ 时 $J = r$。

**④ 三重积分怎么算**

#### 1. 投影法（先一后二）
若 $\Omega = \{(x, y, z) \mid (x, y) \in D_{xy},\ z_1(x, y) \le z \le z_2(x, y)\}$，则
$$\iiint_\Omega f\,\mathrm{d}v = \iint_{D_{xy}} \mathrm{d}x\,\mathrm{d}y\int_{z_1(x, y)}^{z_2(x, y)} f(x, y, z)\,\mathrm{d}z$$

* **上下限**：过 $D_{xy}$ 内一点作平行于 $z$ 轴的直线，从下曲面 $z_1$ 进入 $\Omega$，从上曲面 $z_2$ 穿出。

#### 2. 截面法（先二后一）
若 $\Omega = \{(x, y, z) \mid c_1 \le z \le c_2,\ (x, y) \in D_z\}$，则
$$\iiint_\Omega f\,\mathrm{d}v = \int_{c_1}^{c_2} \mathrm{d}z\iint_{D_z} f(x, y, z)\,\mathrm{d}x\,\mathrm{d}y$$

* **被积函数只含 $z$**：截面上的二重积分就是 $f(z)S(z)$，
  $$\iiint_\Omega f(z)\,\mathrm{d}v = \int_{c_1}^{c_2} f(z)S(z)\,\mathrm{d}z$$

#### 3. 柱面坐标下的三重积分
体积元 $\mathrm{d}v = \rho\,\mathrm{d}\rho\,\mathrm{d}\theta\,\mathrm{d}z$，
$$\begin{aligned} & \iiint_\Omega f\,\mathrm{d}v \\ = {} & \iiint_\Omega f(\rho\cos\theta, \rho\sin\theta, z)\,\rho\,\mathrm{d}\rho\,\mathrm{d}\theta\,\mathrm{d}z \end{aligned}$$

* **什么时候用**：$\Omega$ 由圆柱面、旋转抛物面、圆锥面围成，或被积函数含 $x^2 + y^2$；
* **常见曲面**：$x^2 + y^2 = R^2$ 是 $\rho = R$；$z = x^2 + y^2$ 是 $z = \rho^2$；$z = \sqrt{x^2 + y^2}$ 是 $z = \rho$。

#### 4. 球面坐标下的三重积分
体积元 $\mathrm{d}v = r^2\sin\varphi\,\mathrm{d}r\,\mathrm{d}\varphi\,\mathrm{d}\theta$，
$$\iiint_\Omega f\,\mathrm{d}v = \iiint_\Omega F(r, \varphi, \theta)\,r^2\sin\varphi\,\mathrm{d}r\,\mathrm{d}\varphi\,\mathrm{d}\theta$$

其中 $F(r, \varphi, \theta) = f(r\sin\varphi\cos\theta,\ r\sin\varphi\sin\theta,\ r\cos\varphi)$。
* **依据**：小块的三条边是 $\mathrm{d}r$、$r\,\mathrm{d}\varphi$、$r\sin\varphi\,\mathrm{d}\theta$（纬线圆的半径是 $r\sin\varphi$），相乘得体积元；
* **什么时候用**：$\Omega$ 由球面、圆锥面围成，或被积函数含 $x^2 + y^2 + z^2$；
* **常见曲面**：$x^2 + y^2 + z^2 = R^2$ 是 $r = R$；$x^2 + y^2 + z^2 = 2az$ 是 $r = 2a\cos\varphi$；$z = \sqrt{x^2 + y^2}$ 是 $\varphi = \dfrac{\pi}{4}$。

**⑤ 重积分怎么算更省事**

#### 1. 二重积分的奇偶对称
设 $f(x, y)$ 在 $D$ 上连续：
- **$D$ 关于 $y$ 轴对称**（$D_1$ 为 $D$ 中 $x \ge 0$ 的部分）：
  - $f$ 关于 $x$ 是奇函数时，$\displaystyle\iint_D f\,\mathrm{d}\sigma = 0$；
  - $f$ 关于 $x$ 是偶函数时，$\displaystyle\iint_D f\,\mathrm{d}\sigma = 2\iint_{D_1} f\,\mathrm{d}\sigma$；
- **$D$ 关于 $x$ 轴对称**：看 $f$ 关于 $y$ 的奇偶性，结论同上；
- **$D$ 关于原点对称**（$D_1$ 为 $D$ 的一半，且 $D$ 由 $D_1$ 与它关于原点的对称区域组成）：
  - $f(-x, -y) = -f(x, y)$ 时，积分为 $0$；
  - $f(-x, -y) = f(x, y)$ 时，积分为 $2\displaystyle\iint_{D_1} f\,\mathrm{d}\sigma$。
- **依据**：在左半边作代换 $x \to -x$，它变成右半边；被积函数是奇函数时，两半的积分互为相反数。

#### 2. 二重积分的轮换对称
若 $D$ 关于直线 $y = x$ 对称，则
$$\begin{aligned} \iint_D f(x, y)\,\mathrm{d}\sigma &= \iint_D f(y, x)\,\mathrm{d}\sigma \\ &= \dfrac{1}{2}\iint_D [f(x, y) + f(y, x)]\,\mathrm{d}\sigma \end{aligned}$$

* **依据**：积分与变量用什么字母无关；把 $x, y$ 互换，区域不变；
* **常用**：$\displaystyle\iint_D x^2\,\mathrm{d}\sigma = \iint_D y^2\,\mathrm{d}\sigma = \dfrac{1}{2}\iint_D (x^2 + y^2)\,\mathrm{d}\sigma$；
* **常用**：$f(x) + f(y) \neq 0$ 时，$\displaystyle\iint_D \dfrac{af(x) + bf(y)}{f(x) + f(y)}\,\mathrm{d}\sigma = \dfrac{a + b}{2}\sigma$。

#### 3. 三重积分的对称性
设 $f(x, y, z)$ 在 $\Omega$ 上连续：
- **奇偶对称**：若 $\Omega$ 关于 $xOy$ 面对称（$\Omega_1$ 为 $\Omega$ 中 $z \ge 0$ 的部分）：
  - $f$ 关于 $z$ 为奇函数时，$\displaystyle\iiint_\Omega f\,\mathrm{d}v = 0$；
  - $f$ 关于 $z$ 为偶函数时，$\displaystyle\iiint_\Omega f\,\mathrm{d}v = 2\iiint_{\Omega_1} f\,\mathrm{d}v$；
  - 关于 $yOz$ 面、$zOx$ 面对称时，分别看 $f$ 关于 $x$、$y$ 的奇偶性；
- **轮换对称**：若把 $x$ 与 $y$ 互换后 $\Omega$ 不变，则 $\displaystyle\iiint_\Omega f(x, y, z)\,\mathrm{d}v = \iiint_\Omega f(y, x, z)\,\mathrm{d}v$；若 $x, y, z$ 任意互换后 $\Omega$ 都不变，则
  $$\begin{aligned} \iiint_\Omega x^2\,\mathrm{d}v &= \iiint_\Omega y^2\,\mathrm{d}v = \iiint_\Omega z^2\,\mathrm{d}v \\ &= \dfrac{1}{3}\iiint_\Omega (x^2 + y^2 + z^2)\,\mathrm{d}v \end{aligned}$$

**⑥ 什么量能用重积分算**

#### 1. 用权统一
下面各个量都是 $\displaystyle\iint_D (\text{权})\,\mathrm{d}\sigma$，空间里换成 $\displaystyle\iiint_\Omega (\text{权})\,\mathrm{d}v$：
* **权为 $1$**：面积（空间里是体积）；
* **权为密度 $\mu$**：质量；
* **权为 $x\mu$**：对 $y$ 轴的静矩，除以质量得 $\bar{x}$；
* **权为 $d^2\mu$**：转动惯量，$d$ 是到轴的距离；
* **引力**：是向量，三个分量各是一个重积分，$x$ 分量的权为 $\dfrac{Gm\rho\,(x - x_0)}{r^3}$。
* **依据**：每一小块近似一个质点，把各质点的质量、静矩、转动惯量相加，再取极限（微元法，第 3 章）。

#### 2. 立体的体积
- **三重积分**：$V = \displaystyle\iiint_\Omega \mathrm{d}v$；
- **二重积分**：$\Omega = \{(x, y, z) \mid (x, y) \in D,\ g(x, y) \le z \le f(x, y)\}$ 时，
  $$V = \iint_D [f(x, y) - g(x, y)]\,\mathrm{d}\sigma$$
  其中 $D$ 由两曲面交线的投影围成。

#### 3. 曲面的面积
设曲面 $\Sigma: z = f(x, y)$，$(x, y) \in D_{xy}$，$f$ 有连续偏导数：
- **曲面面积元**：
  $$\mathrm{d}S = \sqrt{1 + f_x^2 + f_y^2}\,\mathrm{d}x\,\mathrm{d}y$$
- **曲面面积**：
  $$A = \iint_{D_{xy}} \sqrt{1 + f_x^2 + f_y^2}\,\mathrm{d}x\,\mathrm{d}y$$
- **依据**：曲面上的一小片近似切平面上的一小片，它投到 $xOy$ 面上是 $\mathrm{d}\sigma$，所以 $\mathrm{d}S = \dfrac{\mathrm{d}\sigma}{|\cos\gamma|}$，$\gamma$ 是法向量与 $z$ 轴的夹角；法向量 $\boldsymbol{n} = (f_x, f_y, -1)$（第 5 章），$|\cos\gamma| = \dfrac{1}{\sqrt{1 + f_x^2 + f_y^2}}$。

曲面为 $x = g(y, z)$ 或 $y = h(z, x)$ 时，向 $yOz$ 面或 $zOx$ 面投影，公式同理。

#### 4. 质量与质心
- **平面薄片**（面密度 $\mu(x, y)$，占有区域 $D$）：
  - 质量 $M = \displaystyle\iint_D \mu(x, y)\,\mathrm{d}\sigma$；
  - 质心 $\bar{x} = \dfrac{1}{M}\displaystyle\iint_D x\,\mu(x, y)\,\mathrm{d}\sigma$，$\bar{y} = \dfrac{1}{M}\displaystyle\iint_D y\,\mu(x, y)\,\mathrm{d}\sigma$；
- **空间物体**（密度 $\rho(x, y, z)$，占有区域 $\Omega$）：
  - 质量 $M = \displaystyle\iiint_\Omega \rho\,\mathrm{d}v$；
  - 质心 $\bar{x} = \dfrac{1}{M}\displaystyle\iiint_\Omega x\rho\,\mathrm{d}v$，$\bar{y}$、$\bar{z}$ 同理；
- **对称**：区域和密度都关于某条直线（某个平面）对称时，质心在这条直线（这个平面）上。

#### 5. 形心
平面区域 $D$ 的形心 $\bar{x} = \dfrac{1}{\sigma}\displaystyle\iint_D x\,\mathrm{d}\sigma$，$\bar{y} = \dfrac{1}{\sigma}\displaystyle\iint_D y\,\mathrm{d}\sigma$（$\sigma$ 为 $D$ 的面积）。
* **反过来用**：$\displaystyle\iint_D x\,\mathrm{d}\sigma = \bar{x}\sigma$；圆、矩形、三角形等区域的形心能直接写出时，不必积分；
* **一次式**：$\displaystyle\iint_D (ax + by + c)\,\mathrm{d}\sigma = (a\bar{x} + b\bar{y} + c)\sigma$。

#### 6. 转动惯量
- **平面薄片**（对 $x$ 轴、$y$ 轴、原点）：
  - $I_x = \displaystyle\iint_D y^2\mu\,\mathrm{d}\sigma$，$I_y = \displaystyle\iint_D x^2\mu\,\mathrm{d}\sigma$；
  - $I_O = \displaystyle\iint_D (x^2 + y^2)\mu\,\mathrm{d}\sigma$；
- **空间物体**（对三坐标轴）：
  - $I_x = \displaystyle\iiint_\Omega (y^2 + z^2)\rho\,\mathrm{d}v$；
  - $I_y = \displaystyle\iiint_\Omega (z^2 + x^2)\rho\,\mathrm{d}v$；
  - $I_z = \displaystyle\iiint_\Omega (x^2 + y^2)\rho\,\mathrm{d}v$。

即被积函数为「密度 $\times$ 到轴（点）距离的平方」。

#### 7. 引力
占有区域 $\Omega$、密度为 $\rho(x, y, z)$ 的物体，对位于 $P_0(x_0, y_0, z_0)$、质量为 $m$ 的质点（$P_0$ 不在 $\Omega$ 上）的引力 $\boldsymbol{F} = (F_x, F_y, F_z)$：
$$F_x = Gm\iiint_\Omega \dfrac{\rho\,(x - x_0)}{r^3}\,\mathrm{d}v$$

$F_y$、$F_z$ 同理，把 $x - x_0$ 换成 $y - y_0$、$z - z_0$；其中 $r = \sqrt{(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2}$。
* **依据**：小块 $\mathrm{d}v$ 的质量为 $\rho\,\mathrm{d}v$，对质点的引力大小为 $\dfrac{Gm\rho\,\mathrm{d}v}{r^2}$，方向是从 $P_0$ 指向小块的单位向量 $\left(\dfrac{x - x_0}{r}, \dfrac{y - y_0}{r}, \dfrac{z - z_0}{r}\right)$；各小块的方向不同，只能按分量相加，所以分母是 $r^3$；
* **平面薄片**：薄片在 $xOy$ 面上占有区域 $D$，面密度 $\mu(x, y)$，质点在 $(0, 0, a)$ 处（$a > 0$）时，
  $$F_z = -Gma\iint_D \dfrac{\mu}{(x^2 + y^2 + a^2)^{\frac{3}{2}}}\,\mathrm{d}\sigma$$
  $F_x = Gm\displaystyle\iint_D \dfrac{\mu x}{(x^2 + y^2 + a^2)^{\frac{3}{2}}}\,\mathrm{d}\sigma$，$F_y$ 把分子里的 $x$ 换成 $y$；
* **对称**：物体和密度关于过 $P_0$ 的某条直线对称时，引力沿这条直线，垂直于它的分量为 $0$。

---

### 意义

本卡在做题时专门用于解决以下 18 类确定性目标，按站排列：

**① 曲顶柱体的体积怎么算**

* **1. 比较大小、估值**
  * **问题**：比较两个重积分的大小；估计一个重积分的范围。
  * **目标**：区域相同时，找被积函数之间的不等号；估值时求被积函数在区域上的最值。
  * **调用**：
    * 比较：$f \le g \implies \displaystyle\iint_D f\,\mathrm{d}\sigma \le \iint_D g\,\mathrm{d}\sigma$；
    * 估值：$m\sigma \le \displaystyle\iint_D f\,\mathrm{d}\sigma \le M\sigma$。
  * **行动**：
    1. 找区域上的不等号；如 $D: (x - 2)^2 + (y - 1)^2 \le 2$，比较 $I_1 = \displaystyle\iint_D (x + y)^2\,\mathrm{d}\sigma$ 与 $I_2 = \displaystyle\iint_D (x + y)^3\,\mathrm{d}\sigma$：圆心 $(2, 1)$ 到直线 $x + y = 1$ 的距离 $\dfrac{|2 + 1 - 1|}{\sqrt{2}} = \sqrt{2}$，等于半径，直线与圆相切，$D$ 在 $x + y \ge 1$ 一侧；
    2. 由不等号得结论：$D$ 上 $(x + y)^3 \ge (x + y)^2$，只在切点处相等，所以 $I_1 < I_2$；
    3. 估值：如 $D: x^2 + y^2 \le 4$，$f = x^2 + 4y^2 + 9$：$D$ 上 $9 \le f \le 4(x^2 + y^2) + 9 \le 25$，$\sigma = 4\pi$，所以 $36\pi \le \displaystyle\iint_D f\,\mathrm{d}\sigma \le 100\pi$；
    4. 不好直接比：作差，看差在区域上的符号。
* **2. 求双重和式的极限**
  * **问题**：求 $\lim\limits_{n \to \infty}\displaystyle\sum_{i=1}^{n}\sum_{j=1}^{n}(\cdots)$。
  * **目标**：提出 $\dfrac{1}{n^2}$，认出被积函数，化成正方形上的二重积分。
  * **调用**：
    * 双重和式的极限 $= \displaystyle\iint_{[0, 1] \times [0, 1]} f\,\mathrm{d}\sigma$；
    * 矩形区域上变量分离。
  * **行动**：
    1. 提出 $\dfrac{1}{n^2}$；如 $\displaystyle\sum_{i=1}^{n}\sum_{j=1}^{n}\dfrac{n}{(n + i)(n^2 + j^2)}$，每一项是 $\dfrac{1}{n^2} \cdot \dfrac{1}{\left(1 + \frac{i}{n}\right)\left(1 + \frac{j^2}{n^2}\right)}$；
    2. 认出 $f(x, y) = \dfrac{1}{(1 + x)(1 + y^2)}$，区域是 $[0, 1] \times [0, 1]$；
    3. 变量分离：$\displaystyle\int_0^1 \dfrac{\mathrm{d}x}{1 + x} \cdot \int_0^1 \dfrac{\mathrm{d}y}{1 + y^2} = \dfrac{\pi}{4}\ln 2$；
    4. 只有一个求和号、提出的是 $\dfrac{1}{n}$：是定积分（第 3 章）。
* **3. 求区域缩成一点时的极限**
  * **问题**：求 $\lim\limits_{r \to 0^+}\dfrac{1}{\pi r^2}\displaystyle\iint_{x^2 + y^2 \le r^2} f\,\mathrm{d}\sigma$ 这类极限。
  * **目标**：分母恰好是区域面积时，用中值定理，不必算出积分。
  * **调用**：中值定理；缩成一点的极限 $= f(x_0, y_0)$。
  * **行动**：
    1. 看分母是不是区域的面积；如 $\lim\limits_{r \to 0^+}\dfrac{1}{\pi r^2}\displaystyle\iint_{x^2 + y^2 \le r^2} e^{x^2 - y^2}\cos(x + y)\,\mathrm{d}\sigma$，分母是圆的面积；
    2. 是：极限等于圆心处的值，$e^0\cos 0 = 1$；
    3. 分母的阶更高（圆心处的值为 $0$）：被积函数只含 $x^2 + y^2$ 时，按第 11 类化成变限积分，再用洛必达。
* **4. 解含积分本身的方程**
  * **问题**：$f(x, y)$ 的表达式里含 $\displaystyle\iint_D f\,\mathrm{d}\sigma$，求 $f$。
  * **目标**：把这个积分当作未知常数解出来。
  * **调用**：二重积分是一个数；积分变量的字母可以换。
  * **行动**：
    1. 设 $A = \displaystyle\iint_D f(u, v)\,\mathrm{d}u\,\mathrm{d}v$；如 $f(x, y) = xy + \displaystyle\iint_D f(u, v)\,\mathrm{d}u\,\mathrm{d}v$，$D$ 由 $y = 0$、$y = x^2$、$x = 1$ 围成：$f = xy + A$；
    2. 两边在 $D$ 上积分：$A = \displaystyle\iint_D xy\,\mathrm{d}\sigma + A\sigma$；$\sigma = \displaystyle\int_0^1 x^2\,\mathrm{d}x = \dfrac{1}{3}$，$\displaystyle\iint_D xy\,\mathrm{d}\sigma = \int_0^1 x\,\mathrm{d}x\int_0^{x^2} y\,\mathrm{d}y = \dfrac{1}{12}$；
    3. 解出：$A = \dfrac{1}{12} + \dfrac{A}{3}$，$A = \dfrac{1}{8}$，所以 $f(x, y) = xy + \dfrac{1}{8}$。

**② 怎么化成两次定积分**

* **5. 在直角坐标下算二重积分**
  * **问题**：区域由直线、抛物线等围成，求二重积分。
  * **目标**：画图，选一种不用分块（或分块最少）的次序。
  * **调用**：X 型、Y 型化累次积分；区域可加。
  * **行动**：
    1. 画图，求交点；如 $\displaystyle\iint_D xy\,\mathrm{d}\sigma$，$D$ 由 $y^2 = x$ 与 $y = x - 2$ 围成，交点 $(1, -1)$、$(4, 2)$；
    2. 选次序：竖着切，下边界在 $x = 1$ 处由 $y = -\sqrt{x}$ 换成 $y = x - 2$，要分两块；横着切，左边界始终是 $x = y^2$，右边界始终是 $x = y + 2$，一条式子到底；
    3. 计算：$\displaystyle\int_{-1}^{2}\mathrm{d}y\int_{y^2}^{y + 2} xy\,\mathrm{d}x = \dfrac{1}{2}\int_{-1}^{2} y[(y + 2)^2 - y^4]\,\mathrm{d}y = \dfrac{45}{8}$；
    4. 先看对称：区域对称时，先按第 15 类消去奇的部分。
* **6. 被积函数含绝对值、$\max$、$\min$**
  * **问题**：求 $\displaystyle\iint_D |g(x, y)|\,\mathrm{d}\sigma$、$\displaystyle\iint_D f(\max\{x, y\})\,\mathrm{d}\sigma$ 这类积分。
  * **目标**：用分界线把区域分块，每块上去掉绝对值、$\max$。
  * **调用**：分块；区域可加。
  * **行动**：
    1. 找分界线；如 $\displaystyle\iint_D |y - x^2|\,\mathrm{d}\sigma$，$D: -1 \le x \le 1,\ 0 \le y \le 1$，分界线是 $y = x^2$；
    2. 上块 $x^2 \le y \le 1$：$\displaystyle\int_{-1}^{1}\mathrm{d}x\int_{x^2}^{1}(y - x^2)\,\mathrm{d}y = \dfrac{8}{15}$；
    3. 下块 $0 \le y \le x^2$：$\displaystyle\int_{-1}^{1}\mathrm{d}x\int_0^{x^2}(x^2 - y)\,\mathrm{d}y = \dfrac{1}{5}$；
    4. 相加：$\dfrac{8}{15} + \dfrac{1}{5} = \dfrac{11}{15}$；
    5. $\max\{x, y\}$ 用 $y = x$ 分开；如 $\displaystyle\iint_{[0, 1] \times [0, 1]} e^{\max\{x^2, y^2\}}\,\mathrm{d}\sigma$，两块关于 $y = x$ 对称，$= 2\displaystyle\int_0^1\mathrm{d}x\int_0^x e^{x^2}\,\mathrm{d}y = 2\int_0^1 xe^{x^2}\,\mathrm{d}x = e - 1$。
* **7. 交换积分次序**
  * **问题**：交换累次积分的次序；累次积分的内层积不出；两个累次积分相加。
  * **目标**：由上下限还原区域，按另一型重写。
  * **调用**：交换积分次序；原函数不是初等函数的几类。
  * **行动**：
    1. 写出区域；如 $\displaystyle\int_0^1\mathrm{d}y\int_y^1 \dfrac{\sin x}{x}\,\mathrm{d}x$，内层积不出，区域 $D: 0 \le y \le 1,\ y \le x \le 1$；
    2. 画图换型：$D$ 也是 $0 \le x \le 1,\ 0 \le y \le x$；
    3. 重写计算：$\displaystyle\int_0^1 \dfrac{\sin x}{x}\,\mathrm{d}x\int_0^x \mathrm{d}y = \int_0^1 \sin x\,\mathrm{d}x = 1 - \cos 1$；
    4. 两个累次积分相加，先拼区域；如 $\displaystyle\int_0^1\mathrm{d}x\int_0^x f\,\mathrm{d}y + \int_1^2\mathrm{d}x\int_0^{2 - x} f\,\mathrm{d}y$，两块拼成以 $(0, 0)$、$(2, 0)$、$(1, 1)$ 为顶点的三角形，$= \displaystyle\int_0^1\mathrm{d}y\int_y^{2 - y} f\,\mathrm{d}x$。
* **8. 定积分的被积函数是变限积分**
  * **问题**：求 $\displaystyle\int_a^b g(x)F(x)\,\mathrm{d}x$，其中 $F(x)$ 是变限积分，被积函数的原函数积不出。
  * **目标**：写成二重积分，交换次序。
  * **调用**：交换积分次序；也可用分部积分（第 3 章）。
  * **行动**：
    1. 写成二重积分；如 $F(x) = \displaystyle\int_1^{x^2}\dfrac{\sin t}{t}\,\mathrm{d}t$，求 $\displaystyle\int_0^1 xF(x)\,\mathrm{d}x$：$\displaystyle\int_0^1 xF(x)\,\mathrm{d}x = -\int_0^1 x\,\mathrm{d}x\int_{x^2}^{1}\dfrac{\sin t}{t}\,\mathrm{d}t$；
    2. 换次序：区域 $0 \le x \le 1,\ x^2 \le t \le 1$，即 $0 \le t \le 1,\ 0 \le x \le \sqrt{t}$；
    3. 计算：$-\displaystyle\int_0^1 \dfrac{\sin t}{t}\,\mathrm{d}t\int_0^{\sqrt{t}} x\,\mathrm{d}x = -\dfrac{1}{2}\int_0^1 \sin t\,\mathrm{d}t = \dfrac{\cos 1 - 1}{2}$。

**③ 区域是圆的怎么办**

* **9. 在极坐标下算二重积分**
  * **问题**：区域是圆、扇形、圆环，或被积函数含 $x^2 + y^2$，求二重积分。
  * **目标**：化成 $\theta$ 在外、$r$ 在内的累次积分。
  * **调用**：$\mathrm{d}\sigma = r\,\mathrm{d}r\,\mathrm{d}\theta$；常见边界的极坐标方程。
  * **行动**：
    1. 边界化成极坐标；如 $\displaystyle\iint_D \sqrt{x^2 + y^2}\,\mathrm{d}\sigma$，$D: x^2 + y^2 \le 2x$，边界是 $r = 2\cos\theta$，$-\dfrac{\pi}{2} \le \theta \le \dfrac{\pi}{2}$；
    2. 定限：极点在边界上，内层从 $0$ 到 $2\cos\theta$；
    3. 计算，别漏乘 $r$：$\displaystyle\int_{-\frac{\pi}{2}}^{\frac{\pi}{2}}\mathrm{d}\theta\int_0^{2\cos\theta} r \cdot r\,\mathrm{d}r = \dfrac{8}{3}\int_{-\frac{\pi}{2}}^{\frac{\pi}{2}}\cos^3\theta\,\mathrm{d}\theta = \dfrac{32}{9}$；
    4. 被积函数里的 $r$ 能凑微分；如 $\displaystyle\iint_{x^2 + y^2 \le 1} e^{-(x^2 + y^2)}\,\mathrm{d}\sigma = 2\pi\int_0^1 e^{-r^2}r\,\mathrm{d}r = \pi(1 - e^{-1})$。
* **10. 直角坐标与极坐标互化**
  * **问题**：把累次积分从一种坐标改写成另一种（常见于选择题）。
  * **目标**：先由上下限画出区域，再按另一种坐标重写。
  * **调用**：$x = r\cos\theta$，$y = r\sin\theta$，$\mathrm{d}\sigma = r\,\mathrm{d}r\,\mathrm{d}\theta$；常见边界的极坐标方程。
  * **行动**：
    1. 极坐标化直角坐标；如 $\displaystyle\int_0^{\frac{\pi}{2}}\mathrm{d}\theta\int_0^{\cos\theta} f(r\cos\theta, r\sin\theta)\,r\,\mathrm{d}r$：$r \le \cos\theta$ 即 $x^2 + y^2 \le x$，$0 \le \theta \le \dfrac{\pi}{2}$ 即 $y \ge 0$，区域是以 $\left(\dfrac{1}{2}, 0\right)$ 为心、$\dfrac{1}{2}$ 为半径的上半圆；
    2. 按直角坐标重写：$\displaystyle\int_0^1\mathrm{d}x\int_0^{\sqrt{x - x^2}} f(x, y)\,\mathrm{d}y$；
    3. 直角坐标化极坐标；如 $\displaystyle\int_0^1\mathrm{d}x\int_0^x f\left(\sqrt{x^2 + y^2}\right)\mathrm{d}y$：区域是 $0 \le y \le x \le 1$ 的三角形，$0 \le \theta \le \dfrac{\pi}{4}$，直线 $x = 1$ 是 $r = \dfrac{1}{\cos\theta}$，$= \displaystyle\int_0^{\frac{\pi}{4}}\mathrm{d}\theta\int_0^{\frac{1}{\cos\theta}} f(r)\,r\,\mathrm{d}r$。
* **11. 圆上的积分求导、求极限**
  * **问题**：$F(t) = \displaystyle\iint_{x^2 + y^2 \le t^2} f(x^2 + y^2)\,\mathrm{d}\sigma$，求 $F'(t)$，或求含 $F(t)$ 的极限。
  * **目标**：用极坐标化成一元的变限积分。
  * **调用**：
    * $\displaystyle\iint_{x^2 + y^2 \le t^2} f(x^2 + y^2)\,\mathrm{d}\sigma = 2\pi\int_0^t f(r^2)\,r\,\mathrm{d}r$；
    * 变限积分求导（第 3 章）；洛必达（第 2 章）。
  * **行动**：
    1. 化成变限积分：$F(t) = 2\pi\displaystyle\int_0^t f(r^2)\,r\,\mathrm{d}r$；
    2. 求导：$F'(t) = 2\pi tf(t^2)$；
    3. 求极限；如 $\lim\limits_{t \to 0^+}\dfrac{1}{t^6}\displaystyle\iint_{x^2 + y^2 \le t^2}[1 - \cos(x^2 + y^2)]\,\mathrm{d}\sigma$：分子是 $2\pi\displaystyle\int_0^t (1 - \cos r^2)\,r\,\mathrm{d}r$，洛必达后为 $\dfrac{2\pi t(1 - \cos t^2)}{6t^5}$，用 $1 - \cos t^2 \sim \dfrac{t^4}{2}$，极限为 $\dfrac{\pi}{6}$。
* **12. 一般换元**
  * **问题**：区域由 $x + y = $ 常数、$y - x = $ 常数这类直线围成，被积函数里有 $x + y$、$y - x$ 这类组合。
  * **目标**：选新变量，让区域和被积函数同时变简单。
  * **调用**：$\mathrm{d}x\,\mathrm{d}y = |J|\,\mathrm{d}u\,\mathrm{d}v$，$J = \dfrac{\partial(x, y)}{\partial(u, v)}$。
  * **行动**：
    1. 选新变量；如 $\displaystyle\iint_D e^{\frac{y - x}{y + x}}\,\mathrm{d}\sigma$，$D$ 由 $x + y = 2$、$x = 0$、$y = 0$ 围成：令 $u = y - x$，$v = y + x$；
    2. 求 $J$：$x = \dfrac{v - u}{2}$，$y = \dfrac{v + u}{2}$，$x_u = -\dfrac{1}{2}$，$x_v = \dfrac{1}{2}$，$y_u = y_v = \dfrac{1}{2}$，$J = x_uy_v - x_vy_u = -\dfrac{1}{2}$，$|J| = \dfrac{1}{2}$；
    3. 新区域：$x = 0$ 变成 $u = v$，$y = 0$ 变成 $u = -v$，$x + y = 2$ 变成 $v = 2$，所以 $0 \le v \le 2$，$-v \le u \le v$；
    4. 计算：$\dfrac{1}{2}\displaystyle\int_0^2\mathrm{d}v\int_{-v}^{v} e^{\frac{u}{v}}\,\mathrm{d}u = \dfrac{1}{2}\int_0^2 v\left(e - e^{-1}\right)\mathrm{d}v = e - e^{-1}$。

**④ 三重积分怎么算**

* **13. 在直角坐标下算三重积分**
  * **问题**：立体由平面、曲面围成，求三重积分。
  * **目标**：被积函数一般时用投影；只含 $z$、截面面积好算时用截面。
  * **调用**：投影法；截面法；$\displaystyle\iiint_\Omega f(z)\,\mathrm{d}v = \int_{c_1}^{c_2} f(z)S(z)\,\mathrm{d}z$。
  * **行动**：
    1. 投影；如 $\displaystyle\iiint_\Omega x\,\mathrm{d}v$，$\Omega$ 由 $x + 2y + z = 1$ 与三个坐标面围成：$D_{xy}$ 是 $x \ge 0,\ y \ge 0,\ x + 2y \le 1$，$z$ 从 $0$ 到 $1 - x - 2y$；
    2. 计算：$\displaystyle\int_0^1 x\,\mathrm{d}x\int_0^{\frac{1 - x}{2}}(1 - x - 2y)\,\mathrm{d}y = \int_0^1 \dfrac{x(1 - x)^2}{4}\,\mathrm{d}x = \dfrac{1}{48}$；
    3. 截面；如 $\displaystyle\iiint_\Omega z^2\,\mathrm{d}v$，$\Omega: \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} \le 1$：高度 $z$ 处的截面是椭圆，$S(z) = \pi ab\left(1 - \dfrac{z^2}{c^2}\right)$；
    4. 计算：$\displaystyle\int_{-c}^{c} z^2 \cdot \pi ab\left(1 - \dfrac{z^2}{c^2}\right)\mathrm{d}z = \dfrac{4}{15}\pi abc^3$。
* **14. 用柱面坐标、球面坐标算三重积分**
  * **问题**：立体由圆柱面、旋转抛物面、球面、圆锥面围成，或被积函数含 $x^2 + y^2$、$x^2 + y^2 + z^2$。
  * **目标**：选和形状相合的坐标，写出上下限。
  * **调用**：$\mathrm{d}v = \rho\,\mathrm{d}\rho\,\mathrm{d}\theta\,\mathrm{d}z$；$\mathrm{d}v = r^2\sin\varphi\,\mathrm{d}r\,\mathrm{d}\varphi\,\mathrm{d}\theta$；常见曲面的柱面、球面坐标方程。
  * **行动**：
    1. 柱面坐标；如 $\displaystyle\iiint_\Omega z\,\mathrm{d}v$，$\Omega$ 由 $z = x^2 + y^2$ 与 $z = 4$ 围成：投影是 $\rho \le 2$，$z$ 从 $\rho^2$ 到 $4$，$\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^2 \rho\,\mathrm{d}\rho\int_{\rho^2}^{4} z\,\mathrm{d}z = \dfrac{64\pi}{3}$；
    2. 同一题用截面核对：高度 $z$ 处是半径 $\sqrt{z}$ 的圆，$\displaystyle\int_0^4 z \cdot \pi z\,\mathrm{d}z = \dfrac{64\pi}{3}$，结果相同；
    3. 球面坐标；如 $\Omega: \sqrt{x^2 + y^2} \le z \le \sqrt{1 - x^2 - y^2}$，求 $\displaystyle\iiint_\Omega z\,\mathrm{d}v$：锥面是 $\varphi = \dfrac{\pi}{4}$，球面是 $r = 1$，$\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^{\frac{\pi}{4}}\sin\varphi\cos\varphi\,\mathrm{d}\varphi\int_0^1 r^3\,\mathrm{d}r = \dfrac{\pi}{8}$。

**⑤ 重积分怎么算更省事**

* **15. 用对称化简**
  * **问题**：区域关于坐标轴、原点、直线 $y = x$ 对称；或区域能分成对称的几块。
  * **目标**：先消去奇的部分，再用轮换凑出好算的式子。
  * **调用**：奇偶对称；轮换对称。
  * **行动**：
    1. 展开、拆项；如 $\displaystyle\iint_{x^2 + y^2 \le 1}(x + 2y)^2\,\mathrm{d}\sigma = \iint (x^2 + 4xy + 4y^2)\,\mathrm{d}\sigma$；
    2. 奇的部分为 $0$：区域关于 $y$ 轴对称，$4xy$ 关于 $x$ 是奇函数，积分为 $0$；
    3. 轮换：$\displaystyle\iint x^2\,\mathrm{d}\sigma = \iint y^2\,\mathrm{d}\sigma = \dfrac{1}{2}\iint (x^2 + y^2)\,\mathrm{d}\sigma = \dfrac{\pi}{4}$，原式 $= 5 \cdot \dfrac{\pi}{4} = \dfrac{5\pi}{4}$；
    4. 区域本身不对称，用曲线分成对称的几块；如 $D$ 由 $y = x^3$、$y = 1$、$x = -1$ 围成，求 $\displaystyle\iint_D (1 + xy)\,\mathrm{d}\sigma$：曲线 $y = -x^3$ 把 $D$ 分成两块，上块 $|x|^3 \le y \le 1$ 关于 $y$ 轴对称，下块（$x \le 0$，$x^3 \le y \le -x^3$）关于 $x$ 轴对称，$xy$ 在两块上的积分都为 $0$；
    5. 剩下面积：$\displaystyle\iint_D 1\,\mathrm{d}\sigma = \int_{-1}^{1}(1 - x^3)\,\mathrm{d}x = 2$。

**⑥ 什么量能用重积分算**

* **16. 求体积、曲面面积**
  * **问题**：求两曲面围成的立体的体积；求曲面被截下部分的面积。
  * **目标**：体积用上曲面减下曲面；面积先写成 $z = f(x, y)$，再求投影。
  * **调用**：$V = \displaystyle\iint_D (f - g)\,\mathrm{d}\sigma$；$\mathrm{d}S = \sqrt{1 + f_x^2 + f_y^2}\,\mathrm{d}\sigma$。
  * **行动**：
    1. 体积；如 $z = x^2 + y^2$ 与 $z = 2 - x^2 - y^2$ 围成的立体：交线投影是 $x^2 + y^2 = 1$，$V = \displaystyle\iint_{x^2 + y^2 \le 1}(2 - 2x^2 - 2y^2)\,\mathrm{d}\sigma = 2\pi\int_0^1 (2 - 2r^2)\,r\,\mathrm{d}r = \pi$；
    2. 曲面面积；如圆锥面 $z = \sqrt{x^2 + y^2}$ 被圆柱面 $x^2 + y^2 = 2x$ 截下的部分：$f_x^2 + f_y^2 = \dfrac{x^2 + y^2}{x^2 + y^2} = 1$，$\mathrm{d}S = \sqrt{2}\,\mathrm{d}\sigma$，投影是半径为 $1$ 的圆，面积 $A = \sqrt{2}\pi$；
    3. 写不成 $z = f(x, y)$：向 $yOz$ 面或 $zOx$ 面投影。
* **17. 求质量、质心、形心、转动惯量**
  * **问题**：求薄片或物体的质量、质心、转动惯量；用形心算 $\displaystyle\iint_D x\,\mathrm{d}\sigma$。
  * **目标**：写出权再积分；先用对称定出质心的部分坐标。
  * **调用**：质心；形心；转动惯量 $=$ 密度 $\times$ 到轴距离的平方。
  * **行动**：
    1. 质心，先看对称；如均匀半圆片 $x^2 + y^2 \le R^2$，$y \ge 0$：关于 $y$ 轴对称，$\bar{x} = 0$；$\bar{y} = \dfrac{2}{\pi R^2}\displaystyle\int_0^{\pi}\sin\theta\,\mathrm{d}\theta\int_0^R r^2\,\mathrm{d}r = \dfrac{4R}{3\pi}$；
    2. 形心反过来用；如 $\displaystyle\iint_{(x - 1)^2 + y^2 \le 1}(x + y)\,\mathrm{d}\sigma$：形心 $(1, 0)$，面积 $\pi$，原式 $= (1 + 0) \cdot \pi = \pi$；
    3. 转动惯量；如面密度为 $\mu$ 的均匀圆片 $x^2 + y^2 \le R^2$ 对原点：$I_O = \mu\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^R r^2 \cdot r\,\mathrm{d}r = \dfrac{\pi\mu R^4}{2}$，即 $\dfrac{1}{2}MR^2$；
    4. 到轴的距离：对 $x$ 轴，平面上是 $|y|$，空间里是 $\sqrt{y^2 + z^2}$，别写成 $x$。
* **18. 求引力**
  * **问题**：求物体或薄片对一个质点的引力。
  * **目标**：先用对称定出哪些分量为 $0$，剩下的分量各积一次。
  * **调用**：$F_x = Gm\displaystyle\iiint_\Omega \dfrac{\rho\,(x - x_0)}{r^3}\,\mathrm{d}v$；平面薄片 $F_z = -Gma\displaystyle\iint_D \dfrac{\mu}{(x^2 + y^2 + a^2)^{\frac{3}{2}}}\,\mathrm{d}\sigma$。
  * **行动**：
    1. 用对称；如面密度为 $\mu$ 的均匀圆片 $x^2 + y^2 \le R^2$，对 $(0, 0, a)$（$a > 0$）处质量为 $m$ 的质点：圆片关于 $z$ 轴对称，$F_x = F_y = 0$；
    2. 写出剩下的分量，换极坐标：$F_z = -Gm\mu a\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^R \dfrac{r}{(r^2 + a^2)^{\frac{3}{2}}}\,\mathrm{d}r$；
    3. 计算：$\displaystyle\int_0^R \dfrac{r\,\mathrm{d}r}{(r^2 + a^2)^{\frac{3}{2}}} = \dfrac{1}{a} - \dfrac{1}{\sqrt{R^2 + a^2}}$，所以 $F_z = -2\pi Gm\mu\left(1 - \dfrac{a}{\sqrt{R^2 + a^2}}\right)$；
    4. 读结论：负号表示指向圆片；分量的分母是 $r^3$，不是 $r^2$。
