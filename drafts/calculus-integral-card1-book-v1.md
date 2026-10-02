### 〔定义〕

**本卡主线**：从变化率倒回去，求整段的总量。整张卡是一条线，分六站，每一站由上一站引出：
* **① 曲边的面积怎么算**：切成细条，每条当矩形，加起来，再取极限，就是定积分；
* **② 面积怎么随右端变**：把右端点换成变量 $x$，面积 $\Phi(x)$ 的导数就是 $f(x)$——面积是 $f$ 的原函数，于是定积分等于原函数之差 $F(b) - F(a)$；
* **③ 原函数怎么找**：把求导的公式和法则倒过来用：链式法则倒过来是换元，乘积法则倒过来是分部；
* **④ 定积分怎么算更省事**：换元时同时换积分限；再借区间的对称、周期，或把 $x$ 换成 $a + b - x$，省去一部分计算；
* **⑤ 区间无穷、函数无界**：定积分要求区间有限、函数有界；不满足时，先积能积的一段，再取一次极限；
* **⑥ 什么量能用积分算**：能切成小段、每段近似为 $f(x)\,\mathrm{d}x$、总量等于各段之和的量，都能写成定积分；
* **依赖**：极限（第 1 章）；闭区间上连续函数的最值定理与介值定理（第 1 章）；求导公式与法则、拉格朗日中值定理、洛必达法则、弧微分（第 2 章）。

**① 曲边的面积怎么算**

长方形的面积是底乘高；高一直在变，就不能直接乘。变速运动也一样：速度一直在变，路程就不能用速度乘时间。办法是切细：每一条细条上，高变化不大，当成矩形；把所有矩形加起来，再让细条越来越窄，取极限。

#### 1. 定积分
设 $f(x)$ 在 $[a, b]$ 上有界：
1. **分割**：任取分点 $a = x_0 < x_1 < \cdots < x_n = b$，记 $\Delta x_i = x_i - x_{i-1}$，$\lambda = \max\limits_{1 \le i \le n} \Delta x_i$；
2. **求和**：任取 $\xi_i \in [x_{i-1}, x_i]$，作和 $\displaystyle\sum_{i=1}^{n} f(\xi_i)\Delta x_i$；
3. **取极限**：若不论怎样分割、怎样取点，极限
   $$\lim\limits_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i)\Delta x_i$$
   总存在且相等，则称此极限为 $f(x)$ 在 $[a, b]$ 上的==定积分==，记作 $\displaystyle\int_a^b f(x)\,\mathrm{d}x$，并称 $f(x)$ 在 $[a, b]$ 上==可积==。

* **定积分是一个数**：只与被积函数和积分区间有关，与积分变量用什么字母无关：$\displaystyle\int_a^b f(x)\,\mathrm{d}x = \int_a^b f(t)\,\mathrm{d}t$。

#### 2. 两个规定
* **上下限相同**：$\displaystyle\int_a^a f(x)\,\mathrm{d}x = 0$；
* **上下限交换**：$\displaystyle\int_a^b f(x)\,\mathrm{d}x = -\int_b^a f(x)\,\mathrm{d}x$。

有了这两条，上限小于下限时，积分也有意义。

#### 3. 函数的平均值
$$\bar{f} = \dfrac{1}{b - a}\int_a^b f(x)\,\mathrm{d}x$$

称为 $f(x)$ 在 $[a, b]$ 上的==平均值==。
* **用速度来想**：总路程除以总时间，就是平均速度。

**② 面积怎么随右端变**

按定义算，连 $\displaystyle\int_0^1 x^2\,\mathrm{d}x$ 都要先求 $\sum i^2$，再取极限。换个看法：把右端点做成变量 $x$，看面积怎么随 $x$ 变。右端往右挪 $\Delta x$，面积多出一条宽 $\Delta x$、高约 $f(x)$ 的细条，所以面积的变化率就是 $f(x)$。用路程来想：从出发到时刻 $x$ 走过的路程，对时间求导，就是此刻的速度。

#### 1. 变上限积分
设 $f(x)$ 在 $[a, b]$ 上可积，称
$$\Phi(x) = \int_a^x f(t)\,\mathrm{d}t, \quad x \in [a, b]$$

为==变上限积分==（积分上限函数）。
* **两个字母分开**：上限的 $x$ 是 $\Phi$ 的自变量；被积函数里的 $t$ 只是积分变量，积完就没有了。

#### 2. 原函数
若在区间 $I$ 上 $F'(x) = f(x)$（或 $\mathrm{d}F(x) = f(x)\,\mathrm{d}x$），则称 $F(x)$ 为 $f(x)$ 在 $I$ 上的一个==原函数==。

#### 3. 不定积分
$f(x)$ 在区间 $I$ 上的全体原函数，称为 $f(x)$ 在 $I$ 上的==不定积分==，记作
$$\int f(x)\,\mathrm{d}x = F(x) + C$$

* **全体原函数**：若 $F(x)$ 是 $f(x)$ 的一个原函数，则全体原函数为 $F(x) + C$（$C$ 为任意常数）；依据：两个原函数之差的导数为 $0$，由拉格朗日中值定理（第 2 章），差是常数。

**③ 原函数怎么找**

求导有公式和法则，可以机械地求；反过来找原函数，没有统一的办法。能做的，是把求导倒过来读：每一条求导公式倒过来，是一条积分公式；链式法则倒过来，是换元；乘积法则倒过来，是分部。式子不是现成的样子时，先换元或拆开，化成能积的形式。

#### 1. 有理函数
两个多项式之商 $\dfrac{P(x)}{Q(x)}$ 称为==有理函数==：
* **真分式**：分子的次数低于分母的次数；
* **假分式**：分子的次数不低于分母的次数。

#### 2. 三角函数有理式
由 $\sin x$、$\cos x$ 和常数经过有限次四则运算构成的式子，称为==三角函数有理式==，记作 $R(\sin x, \cos x)$。

**④ 定积分怎么算更省事**

有了牛顿-莱布尼茨公式，定积分等于 $F(b) - F(a)$，计算落到找原函数上。可定积分比不定积分多了上下限：换元时可以连积分限一起换，不必换回；区间关于原点对称、区间长度是周期、或者把 $x$ 换成 $a + b - x$，都能直接省去一部分计算。有的积分找原函数很难，靠区间反而算得出。

#### 1. 双阶乘
$n!! = n(n - 2)(n - 4)\cdots$，乘到 $2$ 或 $1$ 为止，称为 $n$ 的==双阶乘==；如 $5!! = 5 \cdot 3 \cdot 1 = 15$，$6!! = 6 \cdot 4 \cdot 2 = 48$。

**⑤ 区间无穷、函数无界**

定积分的定义要求区间有限、函数有界（可积必有界）。$\displaystyle\int_1^{+\infty} \dfrac{\mathrm{d}x}{x^2}$ 的区间无限长，$\displaystyle\int_0^1 \dfrac{\mathrm{d}x}{\sqrt{x}}$ 的被积函数在 $0$ 附近无界，都不是定积分。办法是再取一次极限：先在能积的一段 $[1, t]$ 或 $[t, 1]$ 上积分，再让 $t$ 趋于 $+\infty$ 或 $0^+$。极限存在，就说这个积分收敛。

#### 1. 无穷区间上的反常积分
设 $f(x)$ 在 $[a, +\infty)$ 上连续：
$$\int_a^{+\infty} f(x)\,\mathrm{d}x = \lim\limits_{t \to +\infty}\int_a^t f(x)\,\mathrm{d}x$$

极限存在，称该反常积分==收敛==，否则称==发散==。
* **下限无穷**：$\displaystyle\int_{-\infty}^{b} f(x)\,\mathrm{d}x = \lim\limits_{t \to -\infty}\int_t^b f(x)\,\mathrm{d}x$；
* **两端无穷**：$\displaystyle\int_{-\infty}^{+\infty} f(x)\,\mathrm{d}x = \int_{-\infty}^{c} f(x)\,\mathrm{d}x + \int_c^{+\infty} f(x)\,\mathrm{d}x$，右边==两个都收敛==时才收敛。

#### 2. 无界函数的反常积分（瑕积分）
若 $f(x)$ 在点 $a$ 的任一右邻域内无界，则 $a$ 称为 $f(x)$ 的==瑕点==。设 $f(x)$ 在 $(a, b]$ 上连续，$a$ 为瑕点：
$$\int_a^b f(x)\,\mathrm{d}x = \lim\limits_{t \to a^+}\int_t^b f(x)\,\mathrm{d}x$$

* **瑕点在右端**：$\displaystyle\int_a^b f(x)\,\mathrm{d}x = \lim\limits_{t \to b^-}\int_a^t f(x)\,\mathrm{d}x$；
* **瑕点 $c$ 在内部**：$\displaystyle\int_a^b = \int_a^c + \int_c^b$，右边==两个都收敛==时才收敛。

**⑥ 什么量能用积分算**

定积分是为面积而来的。回头看，面积能这样算，靠的是两点：总量能按区间切成小段，再加起来；每一小段的量，能近似写成 $f(x)\,\mathrm{d}x$。体积、弧长、功、压力都有这两点，所以都能写成定积分。

#### 1. 微元法
所求量 $U$ 对区间 $[a, b]$ 具有可加性时：
1. **取微元**：在 $[x, x + \mathrm{d}x]$ 上求出部分量的近似值 $\mathrm{d}U = f(x)\,\mathrm{d}x$；
2. **积分**：$U = \displaystyle\int_a^b f(x)\,\mathrm{d}x$。

* **两个条件**：总量等于各小段之和（可加）；每一小段的量与 $f(x)\,\mathrm{d}x$ 只差一个比 $\mathrm{d}x$ 高阶的无穷小（近似）。

---

### 〔性质〕

**① 曲边的面积怎么算**

**定积分是什么**

#### 1. 几何意义
* **$f(x) \ge 0$**：$\displaystyle\int_a^b f(x)\,\mathrm{d}x$ 等于曲线 $y = f(x)$、直线 $x = a$、$x = b$ 与 $x$ 轴围成的曲边梯形的面积；
* **一般情形**：等于 $x$ 轴上方部分的面积，减去下方部分的面积。

**有什么性质**

#### 1. 线性与区间可加
* **线性**：$\displaystyle\int_a^b [k_1 f(x) + k_2 g(x)]\,\mathrm{d}x = k_1\int_a^b f(x)\,\mathrm{d}x + k_2\int_a^b g(x)\,\mathrm{d}x$；
* **区间可加**：对任意 $c$（不论 $c$ 是否在 $a$、$b$ 之间），$\displaystyle\int_a^b f(x)\,\mathrm{d}x = \int_a^c f(x)\,\mathrm{d}x + \int_c^b f(x)\,\mathrm{d}x$；
* **常数 $1$**：$\displaystyle\int_a^b 1\,\mathrm{d}x = b - a$。

#### 2. 保号性、比较与估值
设 $a < b$：
* **保号性**：若在 $[a, b]$ 上 $f(x) \ge 0$，则 $\displaystyle\int_a^b f(x)\,\mathrm{d}x \ge 0$；若 $f(x)$ 还连续且不恒为零，则积分 $> 0$；
* **比较**：若在 $[a, b]$ 上 $f(x) \le g(x)$，则 $\displaystyle\int_a^b f(x)\,\mathrm{d}x \le \int_a^b g(x)\,\mathrm{d}x$；
* **绝对值**：$\left|\displaystyle\int_a^b f(x)\,\mathrm{d}x\right| \le \int_a^b |f(x)|\,\mathrm{d}x$；
* **估值**：若在 $[a, b]$ 上 $m \le f(x) \le M$，则 $m(b - a) \le \displaystyle\int_a^b f(x)\,\mathrm{d}x \le M(b - a)$。

#### 3. 积分中值定理
若 $f(x)$ 在 $[a, b]$ 上连续，则至少存在一点 $\xi \in [a, b]$，使
$$\int_a^b f(x)\,\mathrm{d}x = f(\xi)(b - a)$$

* **依据**：$f$ 在 $[a, b]$ 上取得最小值 $m$、最大值 $M$；由估值，平均值 $\dfrac{1}{b - a}\displaystyle\int_a^b f(x)\,\mathrm{d}x$ 介于 $m$ 与 $M$ 之间；由介值定理（第 1 章），它等于某个 $f(\xi)$。
* **平均值取得到**：连续函数的平均值 $\bar{f}$，一定等于区间上某一点的函数值。
* **$\xi$ 可取在开区间 $(a, b)$ 内**：对 $\Phi(x) = \displaystyle\int_a^x f(t)\,\mathrm{d}t$ 用拉格朗日中值定理（第 2 章）：$\displaystyle\int_a^b f(x)\,\mathrm{d}x = \Phi(b) - \Phi(a) = \Phi'(\xi)(b - a) = f(\xi)(b - a)$。

**反过来用定义**

#### 1. 和式的极限化为定积分
设 $f(x)$ 在 $[a, b]$ 上可积，把 $[a, b]$ 等分为 $n$ 份并取右端点，则
$$\begin{aligned} &\lim\limits_{n \to \infty} \dfrac{b - a}{n}\sum_{i=1}^{n} f\left(a + \dfrac{i(b - a)}{n}\right) \\ = {} &\int_a^b f(x)\,\mathrm{d}x \end{aligned}$$

* **最常用**：$\lim\limits_{n \to \infty} \dfrac{1}{n}\displaystyle\sum_{i=1}^{n} f\left(\dfrac{i}{n}\right) = \int_0^1 f(x)\,\mathrm{d}x$；
* **取点**：可积时，取左端点 $f\left(\dfrac{i - 1}{n}\right)$ 结果相同。

**什么函数能积（边界）**

#### 1. 可积的条件
* **必要条件**：若 $f(x)$ 在 $[a, b]$ 上可积，则 $f(x)$ 在 $[a, b]$ 上有界；
* **充分条件一**：$f(x)$ 在 $[a, b]$ 上连续；
* **充分条件二**：$f(x)$ 在 $[a, b]$ 上有界，且只有有限个间断点；
* **充分条件三**：$f(x)$ 在 $[a, b]$ 上单调。

**② 面积怎么随右端变**

**$\Phi$ 的导数**

#### 1. 变上限积分的导数
若 $f(x)$ 在 $[a, b]$ 上连续，则 $\Phi(x)$ 在 $[a, b]$ 上可导，且
$$\Phi'(x) = \dfrac{\mathrm{d}}{\mathrm{d}x}\int_a^x f(t)\,\mathrm{d}t = f(x)$$

* **依据**：$\Phi(x + \Delta x) - \Phi(x) = \displaystyle\int_x^{x + \Delta x} f(t)\,\mathrm{d}t = f(\xi)\Delta x$（积分中值定理），$\xi$ 在 $x$ 与 $x + \Delta x$ 之间；$\Delta x \to 0$ 时 $f(\xi) \to f(x)$。

#### 2. 一般形式
若 $f$ 连续，$\varphi(x)$、$\psi(x)$ 可导，则
$$\begin{aligned} & \dfrac{\mathrm{d}}{\mathrm{d}x}\int_{\psi(x)}^{\varphi(x)} f(t)\,\mathrm{d}t \\ = {} & f[\varphi(x)]\varphi'(x) - f[\psi(x)]\psi'(x) \end{aligned}$$

* **依据**：拆成 $\displaystyle\int_a^{\varphi(x)} - \int_a^{\psi(x)}$，各用链式法则；
* **被积函数里含 $x$**：先让 $x$ 只出现在积分限上：
  * 能提出来的，提到积分号外：$\displaystyle\int_0^x x f(t)\,\mathrm{d}t = x\int_0^x f(t)\,\mathrm{d}t$，再用乘积法则；
  * 提不出来的，换元：$\displaystyle\int_0^x f(x - t)\,\mathrm{d}t$ 令 $u = x - t$，化成 $\displaystyle\int_0^x f(u)\,\mathrm{d}u$。

#### 3. 原函数存在定理
若 $f(x)$ 在区间 $I$ 上==连续==，则 $\Phi(x) = \displaystyle\int_a^x f(t)\,\mathrm{d}t$（$a \in I$）就是 $f(x)$ 在 $I$ 上的一个原函数。

#### 4. 牛顿-莱布尼茨公式
若 $f(x)$ 在 $[a, b]$ 上连续，$F(x)$ 是 $f(x)$ 在 $[a, b]$ 上的一个原函数，则
$$\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a) = F(x)\Big|_a^b$$

* **依据**：$F(x)$ 与 $\Phi(x)$ 都是 $f$ 的原函数，差是常数：$F(x) = \Phi(x) + C$；令 $x = a$ 得 $C = F(a)$，再令 $x = b$。

#### 5. 不定积分与求导互逆
* **先积后导**：$\left[\displaystyle\int f(x)\,\mathrm{d}x\right]' = f(x)$，$\mathrm{d}\displaystyle\int f(x)\,\mathrm{d}x = f(x)\,\mathrm{d}x$；
* **先导后积**：$\displaystyle\int F'(x)\,\mathrm{d}x = F(x) + C$，$\displaystyle\int \mathrm{d}F(x) = F(x) + C$——多出一个常数 $C$。

**$\Phi$ 作为一个函数**

#### 1. 连续与可导
* **$f$ 可积**：$\Phi(x)$ 在 $[a, b]$ 上连续；
* **$f$ 连续**：$\Phi(x)$ 在 $[a, b]$ 上可导，$\Phi'(x) = f(x)$。

#### 2. 在 $f$ 的间断点处
设 $f(x)$ 在 $[a, b]$ 上可积，在 $x_0$ 的去心邻域内连续：
* **可去间断点**：$\Phi(x)$ 在 $x_0$ 可导，$\Phi'(x_0) = \lim\limits_{x \to x_0} f(x)$，不等于 $f(x_0)$；
* **跳跃间断点**：$\Phi(x)$ 在 $x_0$ 连续但不可导，$\Phi'_-(x_0) = f(x_0^-)$，$\Phi'_+(x_0) = f(x_0^+)$；
* **依据**：$\dfrac{\Phi(x_0 + \Delta x) - \Phi(x_0)}{\Delta x}$ 是 $f$ 在 $x_0$ 与 $x_0 + \Delta x$ 之间的平均值，$\Delta x \to 0^+$ 时趋于 $f(x_0^+)$，$\Delta x \to 0^-$ 时趋于 $f(x_0^-)$。

#### 3. 奇偶性
设 $f(x)$ 连续：
* **$f$ 是奇函数**：$\displaystyle\int_a^x f(t)\,\mathrm{d}t$ 是偶函数（$a$ 任意），所以 $f$ 的全体原函数都是偶函数；
* **$f$ 是偶函数**：$\displaystyle\int_0^x f(t)\,\mathrm{d}t$ 是奇函数；其余原函数 $\displaystyle\int_0^x f(t)\,\mathrm{d}t + C$（$C \neq 0$）不是奇函数；
* **依据**：令 $t = -u$，$\displaystyle\int_0^{-x} f(t)\,\mathrm{d}t = -\int_0^x f(-u)\,\mathrm{d}u$。

#### 4. 周期性
设 $f(x)$ 连续，以 $T$ 为周期，则 $\Phi(x) = \displaystyle\int_0^x f(t)\,\mathrm{d}t$ 也以 $T$ 为周期的==充要条件==是 $\displaystyle\int_0^T f(t)\,\mathrm{d}t = 0$。
* **依据**：$\Phi(x + T) - \Phi(x)$ 对 $x$ 的导数为 $f(x + T) - f(x) = 0$，所以它是常数；令 $x = 0$，这个常数等于 $\displaystyle\int_0^T f(t)\,\mathrm{d}t$。

#### 5. 等价无穷小
设 $f(t)$ 在 $0$ 附近连续，$t \to 0$ 时 $f(t) \sim At^k$（$A \neq 0$，$k \ge 0$），则 $x \to 0$ 时
$$\int_0^x f(t)\,\mathrm{d}t \sim \dfrac{A}{k + 1}x^{k + 1}$$

* **阶数加 $1$**：被积函数是 $k$ 阶无穷小，变上限积分是 $k + 1$ 阶；
* **依据**：两边相除，用洛必达法则（第 2 章），分子求导得 $f(x)$；
* **上限是 $\varphi(x) \to 0$**：把结论里的 $x$ 换成 $\varphi(x)$。

**什么时候没有原函数（边界）**

#### 1. 有原函数的必要条件
若 $f(x)$ 在区间 $I$ 上有原函数，则 $f(x)$ 在 $I$ 上==没有可去间断点、跳跃间断点、无穷间断点==。
* **依据**：设 $F' = f$，$x_0 \in I$；在 $x_0$ 与 $x$ 之间对 $F$ 用拉格朗日中值定理（第 2 章）：$\dfrac{F(x) - F(x_0)}{x - x_0} = f(\xi)$；若 $f(x_0^+)$ 存在，令 $x \to x_0^+$，得 $f(x_0) = F'_+(x_0) = f(x_0^+)$，左侧同理；若 $f(x_0^+) = \infty$，则 $F'_+(x_0)$ 不是有限数，矛盾；
* **振荡间断点可能有原函数**：$F(x) = x^2\sin\dfrac{1}{x}$（$x \neq 0$），$F(0) = 0$，处处可导（第 2 章），它的导数在 $x = 0$ 处是振荡间断点，却有原函数 $F$。

#### 2. 可积与有原函数
两者谁也推不出谁：
* **可积，没有原函数**：$\operatorname{sgn} x$ 在 $[-1, 1]$ 上有界、只有一个间断点，可积；但 $x = 0$ 是跳跃间断点，没有原函数；
* **有原函数，不可积**：$F(x) = x^2\sin\dfrac{1}{x^2}$（$x \neq 0$），$F(0) = 0$，处处可导；$F'(x)$ 在 $0$ 附近无界，在 $[-1, 1]$ 上不可积；
* **都有**：$f(x)$ 在 $[a, b]$ 上连续。

**③ 原函数怎么找**

**把求导倒过来**

#### 1. 基本积分公式（查表）
每一条都是一条求导公式倒过来读：
- **幂与指数**：
  - $\displaystyle\int x^\mu\,\mathrm{d}x = \dfrac{x^{\mu+1}}{\mu+1} + C\ \ (\mu \neq -1)$，$\displaystyle\int \dfrac{\mathrm{d}x}{x} = \ln|x| + C$；
  - $\displaystyle\int a^x\,\mathrm{d}x = \dfrac{a^x}{\ln a} + C$，$\displaystyle\int e^x\,\mathrm{d}x = e^x + C$；
- **三角**：
  - $\displaystyle\int \sin x\,\mathrm{d}x = -\cos x + C$，$\displaystyle\int \cos x\,\mathrm{d}x = \sin x + C$；
  - $\displaystyle\int \sec^2 x\,\mathrm{d}x = \tan x + C$，$\displaystyle\int \csc^2 x\,\mathrm{d}x = -\cot x + C$；
  - $\displaystyle\int \sec x\tan x\,\mathrm{d}x = \sec x + C$，$\displaystyle\int \csc x\cot x\,\mathrm{d}x = -\csc x + C$；
  - $\displaystyle\int \tan x\,\mathrm{d}x = -\ln|\cos x| + C$，$\displaystyle\int \cot x\,\mathrm{d}x = \ln|\sin x| + C$；
  - $\displaystyle\int \sec x\,\mathrm{d}x = \ln|\sec x + \tan x| + C$，$\displaystyle\int \csc x\,\mathrm{d}x = \ln|\csc x - \cot x| + C$；
- **有理与根式**（$a > 0$）：
  - $\displaystyle\int \dfrac{\mathrm{d}x}{a^2 + x^2} = \dfrac{1}{a}\arctan\dfrac{x}{a} + C$；
  - $\displaystyle\int \dfrac{\mathrm{d}x}{x^2 - a^2} = \dfrac{1}{2a}\ln\left|\dfrac{x - a}{x + a}\right| + C$；
  - $\displaystyle\int \dfrac{\mathrm{d}x}{\sqrt{a^2 - x^2}} = \arcsin\dfrac{x}{a} + C$；
  - $\displaystyle\int \dfrac{\mathrm{d}x}{\sqrt{x^2 \pm a^2}} = \ln\left|x + \sqrt{x^2 \pm a^2}\right| + C$；
  - $\displaystyle\int \sqrt{a^2 - x^2}\,\mathrm{d}x$：
    $$= \dfrac{x}{2}\sqrt{a^2 - x^2} + \dfrac{a^2}{2}\arcsin\dfrac{x}{a} + C$$

#### 2. 线性
$\displaystyle\int [k_1 f(x) + k_2 g(x)]\,\mathrm{d}x = k_1\int f(x)\,\mathrm{d}x + k_2\int g(x)\,\mathrm{d}x$（$k_1$、$k_2$ 不同时为零）。

#### 3. 第一类换元法（凑微分法）
设 $\displaystyle\int f(u)\,\mathrm{d}u = F(u) + C$，$u = \varphi(x)$ 可导，则
$$\begin{aligned} \int f[\varphi(x)]\varphi'(x)\,\mathrm{d}x &= \int f(u)\,\mathrm{d}u\,\Big|_{u = \varphi(x)} \\ &= F[\varphi(x)] + C \end{aligned}$$

* **依据**：链式法则 $\{F[\varphi(x)]\}' = f[\varphi(x)]\varphi'(x)$ 倒过来读；
* **常见的凑法**：
  * $\mathrm{d}x = \dfrac{1}{a}\,\mathrm{d}(ax + b)$，$x^{n-1}\,\mathrm{d}x = \dfrac{1}{n}\,\mathrm{d}(x^n)$，$\dfrac{\mathrm{d}x}{\sqrt{x}} = 2\,\mathrm{d}(\sqrt{x})$；
  * $\dfrac{\mathrm{d}x}{x} = \mathrm{d}(\ln x)$，$e^x\,\mathrm{d}x = \mathrm{d}(e^x)$；
  * $\cos x\,\mathrm{d}x = \mathrm{d}(\sin x)$，$\sin x\,\mathrm{d}x = -\mathrm{d}(\cos x)$，$\sec^2 x\,\mathrm{d}x = \mathrm{d}(\tan x)$；
  * $\dfrac{\mathrm{d}x}{1 + x^2} = \mathrm{d}(\arctan x)$，$\dfrac{\mathrm{d}x}{\sqrt{1 - x^2}} = \mathrm{d}(\arcsin x)$。

#### 4. 分部积分法
设 $u = u(x)$，$v = v(x)$ 具有连续导数，则
$$\int u\,\mathrm{d}v = uv - \int v\,\mathrm{d}u$$

即 $\displaystyle\int uv'\,\mathrm{d}x = uv - \int u'v\,\mathrm{d}x$。
* **依据**：乘积法则 $(uv)' = u'v + uv'$ 两边积分，移项；
* **选谁作 $u$**：按反三角函数、对数函数、幂函数、指数函数、三角函数的顺序（「反对幂指三」），排在前面的作 $u$；
* **又出现原积分**：如 $\displaystyle\int e^x\sin x\,\mathrm{d}x$ 分部两次后又出现它自己，移项解出。

**化成能积的形式**

#### 1. 第二类换元法
设 $x = \psi(t)$ 单调、可导且 $\psi'(t) \neq 0$，则
$$\int f(x)\,\mathrm{d}x = \left[\int f[\psi(t)]\psi'(t)\,\mathrm{d}t\right]_{t = \psi^{-1}(x)}$$

常用代换（$a > 0$）：
- **三角代换**：
  - 含 $\sqrt{a^2 - x^2}$：令 $x = a\sin t$；
  - 含 $\sqrt{a^2 + x^2}$：令 $x = a\tan t$；
  - 含 $\sqrt{x^2 - a^2}$：令 $x = a\sec t$；
- **根式代换**：含 $\sqrt[n]{ax + b}$ 或 $\sqrt[n]{\dfrac{ax + b}{cx + d}}$ 时，令该根式为 $t$，化成 $t$ 的有理函数；
- **倒代换**：分母次数较高时令 $x = \dfrac{1}{t}$。

#### 2. 有理函数的积分（部分分式法）
对有理函数 $\dfrac{P(x)}{Q(x)}$：
1. **化为真分式**：若是假分式，先作多项式除法，化为多项式与真分式之和；
2. **分母因式分解**：把 $Q(x)$ 分解为一次因式 $(x - a)^k$ 与不可约二次因式 $(x^2 + px + q)^l$（$p^2 - 4q < 0$）之积；
3. **拆成部分分式**：
   - 因式 $(x - a)^k$ 对应 $\dfrac{A_1}{x - a} + \dfrac{A_2}{(x - a)^2} + \cdots + \dfrac{A_k}{(x - a)^k}$；
   - 因式 $(x^2 + px + q)^l$ 对应 $\displaystyle\sum_{j=1}^{l} \dfrac{M_j x + N_j}{(x^2 + px + q)^j}$；
4. **逐项积分**：待定系数求出后，逐项积分。

* **一定积得出来**：有理函数的原函数都是初等函数；
* **二次因式那一项**：分子凑出分母的导数，积出 $\ln$；剩下的常数项对分母配方，积出 $\arctan$。

#### 3. 三角函数有理式的积分（万能代换）
对 $\displaystyle\int R(\sin x, \cos x)\,\mathrm{d}x$，令 $t = \tan\dfrac{x}{2}$，则：
- **正弦余弦**：$\sin x = \dfrac{2t}{1 + t^2}$，$\cos x = \dfrac{1 - t^2}{1 + t^2}$；
- **微分**：$\mathrm{d}x = \dfrac{2}{1 + t^2}\,\mathrm{d}t$。

积分化为 $t$ 的有理函数的积分。
* **最后才用**：万能代换总能化成有理函数，但式子常很繁；先试凑微分、三角恒等变形；只含 $\sin^2 x$、$\cos^2 x$、$\tan x$ 时，令 $t = \tan x$ 更简单。

**④ 定积分怎么算更省事**

**怎么用公式**

#### 1. 定积分的换元法
设 $f(x)$ 在 $[a, b]$ 上连续，$x = \varphi(t)$ 满足：
- **端点对应**：$\varphi(\alpha) = a$，$\varphi(\beta) = b$；
- **光滑**：$\varphi(t)$ 在 $[\alpha, \beta]$（或 $[\beta, \alpha]$）上有连续导数，且值域不越出 $[a, b]$；

则
$$\int_a^b f(x)\,\mathrm{d}x = \int_\alpha^\beta f[\varphi(t)]\varphi'(t)\,\mathrm{d}t$$

换元的同时==换积分限==，求出后不必代回原变量。

#### 2. 定积分的分部积分法
设 $u(x)$、$v(x)$ 在 $[a, b]$ 上有连续导数，则
$$\int_a^b u\,\mathrm{d}v = uv\Big|_a^b - \int_a^b v\,\mathrm{d}u$$

**借区间省事**

#### 1. 奇偶性
设 $f(x)$ 在 $[-a, a]$ 上连续：
* **奇函数**：$\displaystyle\int_{-a}^{a} f(x)\,\mathrm{d}x = 0$；
* **偶函数**：$\displaystyle\int_{-a}^{a} f(x)\,\mathrm{d}x = 2\int_0^a f(x)\,\mathrm{d}x$；
* **依据**：$\displaystyle\int_{-a}^{0}$ 部分令 $x = -t$，化成 $\displaystyle\int_0^a f(-t)\,\mathrm{d}t$；
* **一般函数**：$f(x) = \dfrac{f(x) + f(-x)}{2} + \dfrac{f(x) - f(-x)}{2}$，拆成偶、奇两部分，奇的部分积分为 $0$。

#### 2. 周期性
设 $f(x)$ 是以 $T$ 为周期的连续函数：
* **与起点无关**：$\displaystyle\int_a^{a+T} f(x)\,\mathrm{d}x = \int_0^T f(x)\,\mathrm{d}x$；
* **整数个周期**：$\displaystyle\int_0^{nT} f(x)\,\mathrm{d}x = n\int_0^T f(x)\,\mathrm{d}x$（$n$ 为正整数）；
* **依据**：$\displaystyle\int_a^{a+T} f(x)\,\mathrm{d}x$ 对 $a$ 的导数为 $f(a + T) - f(a) = 0$。

#### 3. 区间再现
设 $f(x)$ 在 $[a, b]$ 上连续，则
$$\int_a^b f(x)\,\mathrm{d}x = \int_a^b f(a + b - x)\,\mathrm{d}x$$

* **依据**：令 $x = a + b - t$，积分限 $a$、$b$ 互换，再交换回来；
* **用法**：两式相加，$\displaystyle\int_a^b f(x)\,\mathrm{d}x = \dfrac{1}{2}\int_a^b [f(x) + f(a + b - x)]\,\mathrm{d}x$，常能消去难积的部分；
* **正弦余弦互换**（$f$ 在 $[0, 1]$ 上连续）：$\displaystyle\int_0^{\frac{\pi}{2}} f(\sin x)\,\mathrm{d}x = \int_0^{\frac{\pi}{2}} f(\cos x)\,\mathrm{d}x$，令 $x = \dfrac{\pi}{2} - t$；
* **提出 $x$**（$f$ 在 $[0, 1]$ 上连续）：$\displaystyle\int_0^{\pi} x f(\sin x)\,\mathrm{d}x = \dfrac{\pi}{2}\int_0^{\pi} f(\sin x)\,\mathrm{d}x$，令 $x = \pi - t$，两式相加。

**点火公式（查表）**

#### 1. 华里士公式（点火公式）
$$I_n = \int_0^{\frac{\pi}{2}} \sin^n x\,\mathrm{d}x = \int_0^{\frac{\pi}{2}} \cos^n x\,\mathrm{d}x$$

- **$n$ 为正偶数**：$I_n = \dfrac{(n-1)!!}{n!!} \cdot \dfrac{\pi}{2}$；
- **$n$ 为大于 1 的奇数**：$I_n = \dfrac{(n-1)!!}{n!!}$；
- **递推式**：$I_n = \dfrac{n - 1}{n}I_{n-2}$，$I_0 = \dfrac{\pi}{2}$，$I_1 = 1$；递推式由分部积分得到；
- **区间换成 $[0, \pi]$**：$\displaystyle\int_0^{\pi} \sin^n x\,\mathrm{d}x = 2I_n$（$\sin x$ 关于 $x = \dfrac{\pi}{2}$ 对称）。

**⑤ 区间无穷、函数无界**

**怎么算**

#### 1. 牛顿-莱布尼茨公式照用
设 $F(x)$ 是 $f(x)$ 的原函数：
* **无穷区间**：$\displaystyle\int_a^{+\infty} f(x)\,\mathrm{d}x = F(+\infty) - F(a)$，其中 $F(+\infty) = \lim\limits_{x \to +\infty} F(x)$；
* **瑕积分**：$a$ 为瑕点时，$\displaystyle\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a^+)$，其中 $F(a^+) = \lim\limits_{x \to a^+} F(x)$；
* **换元、分部**：照常使用，端点处的值都理解为极限。

**怎么判敛散**

#### 1. 两个基本的反常积分（$p$ 积分）
* **无穷限**（$a > 0$）：$\displaystyle\int_a^{+\infty} \dfrac{\mathrm{d}x}{x^p}$ 当 $p > 1$ 时收敛，当 $p \le 1$ 时发散；
* **瑕积分**（$b > a$）：$\displaystyle\int_a^b \dfrac{\mathrm{d}x}{(x - a)^p}$ 当 $p < 1$ 时收敛，当 $p \ge 1$ 时发散；
* **记法**：在无穷远处，被积函数要趋于 $0$ 得足够快（$p > 1$）；在瑕点处，被积函数要趋于 $\infty$ 得足够慢（$p < 1$）；$p = 1$ 两边都发散。

#### 2. 比较判别法
设 $f(x)$、$g(x)$ 在 $[a, +\infty)$ 上连续且非负：
* **比较形式**：若 $f(x) \le g(x)$，则 $\displaystyle\int_a^{+\infty} g\,\mathrm{d}x$ 收敛 $\implies \int_a^{+\infty} f\,\mathrm{d}x$ 收敛；$\displaystyle\int_a^{+\infty} f\,\mathrm{d}x$ 发散 $\implies \int_a^{+\infty} g\,\mathrm{d}x$ 发散；
* **极限形式**：若 $\lim\limits_{x \to +\infty} \dfrac{f(x)}{g(x)} = l\ (0 < l < +\infty)$，则两个反常积分==同敛散==。

瑕积分有相同的比较判别法（极限取在瑕点处）。

#### 3. 极限形式的两端（边界）
条件同上，$l = \lim\limits_{x \to +\infty} \dfrac{f(x)}{g(x)}$：
* **$l = 0$**：$f$ 比 $g$ 小得多；$\displaystyle\int_a^{+\infty} g\,\mathrm{d}x$ 收敛 $\implies \int_a^{+\infty} f\,\mathrm{d}x$ 收敛；
* **$l = +\infty$**：$f$ 比 $g$ 大得多；$\displaystyle\int_a^{+\infty} g\,\mathrm{d}x$ 发散 $\implies \int_a^{+\infty} f\,\mathrm{d}x$ 发散；
* **另外两种推不出**：$l = 0$ 而 $g$ 的积分发散，或 $l = +\infty$ 而 $g$ 的积分收敛，都判断不了 $f$；
* **例**：$\displaystyle\int_1^{+\infty} \dfrac{\ln x}{x^2}\,\mathrm{d}x$ 与 $\dfrac{1}{x^{3/2}}$ 比，$l = \lim\limits_{x \to +\infty} \dfrac{\ln x}{\sqrt{x}} = 0$，而 $p = \dfrac{3}{2} > 1$ 收敛，所以收敛。

**⑥ 什么量能用积分算**

**几何量（查表）**

#### 1. 平面图形的面积
- **直角坐标**：由 $y = f(x)$、$y = g(x)$、$x = a$、$x = b$ 围成：
  $$A = \int_a^b |f(x) - g(x)|\,\mathrm{d}x$$
- **参数方程**：曲线 $x = \varphi(t)$，$y = \psi(t) \ge 0$ 与 $x$ 轴围成（$t$ 由 $\alpha$ 变到 $\beta$ 时 $x$ 由 $a$ 单调变到 $b$）：
  $$A = \int_\alpha^\beta \psi(t)\varphi'(t)\,\mathrm{d}t$$
- **极坐标**：由 $r = r(\theta)$、$\theta = \alpha$、$\theta = \beta$ 围成的曲边扇形：
  $$A = \dfrac{1}{2}\int_\alpha^\beta r^2(\theta)\,\mathrm{d}\theta$$

#### 2. 立体的体积
设 $f(x)$ 在 $[a, b]$ 上连续：
- **绕 $x$ 轴旋转**：曲边梯形 $0 \le y \le |f(x)|$，$a \le x \le b$ 绕 $x$ 轴旋转一周：
  $$V_x = \pi\int_a^b f^2(x)\,\mathrm{d}x$$
- **中间空心**：$0 \le g(x) \le y \le f(x)$ 绕 $x$ 轴旋转：$V = \pi\displaystyle\int_a^b [f^2(x) - g^2(x)]\,\mathrm{d}x$；
- **绕 $y$ 轴旋转**（$0 \le a < b$，柱壳法）：
  $$V_y = 2\pi\int_a^b x|f(x)|\,\mathrm{d}x$$
- **平行截面面积已知**：垂直于 $x$ 轴的截面面积为 $A(x)$：
  $$V = \int_a^b A(x)\,\mathrm{d}x$$

#### 3. 平面曲线的弧长
由弧微分 $\mathrm{d}s = \sqrt{1 + y'^2}\,\mathrm{d}x$（第 2 章）积分得到：
- **直角坐标** $y = f(x)$，$a \le x \le b$：$s = \displaystyle\int_a^b \sqrt{1 + f'^2(x)}\,\mathrm{d}x$；
- **参数方程** $x = \varphi(t)$，$y = \psi(t)$，$\alpha \le t \le \beta$：$s = \displaystyle\int_\alpha^\beta \sqrt{\varphi'^2(t) + \psi'^2(t)}\,\mathrm{d}t$；
- **极坐标** $r = r(\theta)$，$\alpha \le \theta \le \beta$：$s = \displaystyle\int_\alpha^\beta \sqrt{r^2(\theta) + r'^2(\theta)}\,\mathrm{d}\theta$。

#### 4. 旋转曲面的面积
曲线 $y = f(x)$（$a \le x \le b$）绕 $x$ 轴旋转一周所得旋转曲面的面积：
$$S = 2\pi\int_a^b |f(x)|\sqrt{1 + f'^2(x)}\,\mathrm{d}x$$

- **参数方程**：$S = 2\pi\displaystyle\int_\alpha^\beta |\psi(t)|\sqrt{\varphi'^2(t) + \psi'^2(t)}\,\mathrm{d}t$。

**物理量（查表）**

#### 1. 变力沿直线做功
物体在变力 $F(x)$ 作用下沿 $x$ 轴从 $a$ 移动到 $b$（力的方向与 $x$ 轴一致），所做的功为
$$W = \int_a^b F(x)\,\mathrm{d}x$$

- **抽水做功**：把深度 $x$ 处厚度为 $\mathrm{d}x$ 的一层液体提到液面，功的微元为 $\mathrm{d}W = \rho g\,A(x)\,x\,\mathrm{d}x$（$A(x)$ 为该层的截面积，$\rho$ 为液体密度）。

#### 2. 液体的静压力
平板铅直放入液体中，深度 $x$ 处平板的宽度为 $l(x)$，平板位于深度 $a$ 到 $b$ 之间，则平板一侧所受的压力为
$$P = \int_a^b \rho g\,x\,l(x)\,\mathrm{d}x$$

---

### 意义

本卡在做题时专门用于解决以下 18 类确定性目标，按站排列：

**① 曲边的面积怎么算**

* **1. 比较定积分的大小、估值**
  * **问题**：比较两个定积分的大小；估计一个定积分的范围；求 $\lim\limits_{n \to \infty}\displaystyle\int_0^1 \dfrac{x^n}{1 + x}\,\mathrm{d}x$ 这类积分的极限。
  * **目标**：不算出积分，比较或放缩被积函数。
  * **调用**：
    * 比较：$f \le g \implies \displaystyle\int_a^b f\,\mathrm{d}x \le \int_a^b g\,\mathrm{d}x$；
    * 估值：$m(b - a) \le \displaystyle\int_a^b f(x)\,\mathrm{d}x \le M(b - a)$；积分中值定理。
  * **行动**：
    1. 化成同一区间：换元，或用奇偶性、周期性；
    2. 比较被积函数：作差或作商，看符号；
    3. 估值：求被积函数在区间上的最大值、最小值，各乘区间长度；
    4. 积分的极限：把被积函数放缩成能积的式子，再夹逼；如 $0 \le \dfrac{x^n}{1 + x} \le x^n$，而 $\displaystyle\int_0^1 x^n\,\mathrm{d}x = \dfrac{1}{n + 1} \to 0$，所以极限为 $0$。
* **2. 求和式的极限**
  * **问题**：求 $\lim\limits_{n \to \infty}\displaystyle\sum_{i=1}^{n} \dfrac{1}{n + i}$ 这类 $n$ 项和的极限。
  * **目标**：认出 $\dfrac{1}{n}\sum f\left(\dfrac{i}{n}\right)$，写成定积分。
  * **调用**：
    * 和式的极限化为定积分：$\lim\limits_{n \to \infty} \dfrac{1}{n}\displaystyle\sum_{i=1}^{n} f\left(\dfrac{i}{n}\right) = \int_0^1 f(x)\,\mathrm{d}x$；
    * 夹逼准则（第 1 章）。
  * **行动**：
    1. 提出 $\dfrac{1}{n}$，把第 $i$ 项写成 $\dfrac{i}{n}$ 的函数：$\dfrac{1}{n + i} = \dfrac{1}{n} \cdot \dfrac{1}{1 + \frac{i}{n}}$，所以极限为 $\displaystyle\int_0^1 \dfrac{\mathrm{d}x}{1 + x} = \ln 2$；
    2. 第 $i$ 项写不成 $f\left(\dfrac{i}{n}\right)$ 的样子：先放缩成两个能写成的和式，再夹逼；
    3. 连乘的极限：取对数，化成和式。

**② 面积怎么随右端变**

* **3. 变限积分求导**
  * **问题**：求 $\dfrac{\mathrm{d}}{\mathrm{d}x}\displaystyle\int_{x^2}^{\sin x} f(t)\,\mathrm{d}t$；被积函数里含 $x$，如 $\displaystyle\int_0^x (x - t)f(t)\,\mathrm{d}t$、$\displaystyle\int_0^x f(x - t)\,\mathrm{d}t$。
  * **目标**：让 $x$ 只出现在积分限上，再套公式。
  * **调用**：变上限积分的导数及一般形式：上限代入乘上限的导数，减下限代入乘下限的导数。
  * **行动**：
    1. $x$ 能提出来：$\displaystyle\int_0^x (x - t)f(t)\,\mathrm{d}t = x\int_0^x f(t)\,\mathrm{d}t - \int_0^x tf(t)\,\mathrm{d}t$，用乘积法则求导，得 $\displaystyle\int_0^x f(t)\,\mathrm{d}t$；
    2. $x$ 提不出来：换元，如 $\displaystyle\int_0^x f(x - t)\,\mathrm{d}t$ 令 $u = x - t$，化成 $\displaystyle\int_0^x f(u)\,\mathrm{d}u$，导数为 $f(x)$；
    3. 上下限都含 $x$：按一般形式，两项都要乘各自积分限的导数。
* **4. 含变限积分的极限**
  * **问题**：求 $\lim\limits_{x \to 0} \dfrac{1}{x^4}\displaystyle\int_0^{x^2} \sin t\,\mathrm{d}t$ 这类极限。
  * **目标**：去掉积分号。
  * **调用**：
    * 变限积分的等价无穷小：$f(t) \sim At^k \implies \displaystyle\int_0^{\varphi(x)} f(t)\,\mathrm{d}t \sim \dfrac{A}{k + 1}\varphi(x)^{k + 1}$；
    * 洛必达法则（第 2 章）；变上限积分的导数。
  * **行动**：
    1. 先看能不能直接换等价：$\sin t \sim t$，所以分子 $\sim \dfrac{(x^2)^2}{2} = \dfrac{x^4}{2}$，极限为 $\dfrac{1}{2}$；
    2. 不能直接换时，用洛必达法则，每求一次导，去掉一层积分号；
    3. 被积函数里含 $x$：先把 $x$ 提出积分号或换元，再求导。
* **5. 判断变限积分的性质**
  * **问题**：给出 $f(x)$ 的表达式或图形，判断 $\Phi(x) = \displaystyle\int_a^x f(t)\,\mathrm{d}t$ 的连续性、可导性、奇偶性、周期性、单调性与极值。
  * **目标**：由 $f$ 读出 $\Phi$。
  * **调用**：
    * $f$ 可积 $\implies \Phi$ 连续；$f$ 连续 $\implies \Phi' = f$；
    * 在 $f$ 的间断点处：可去，则 $\Phi$ 可导；跳跃，则 $\Phi$ 连续但不可导；
    * 奇偶性：$f$ 奇 $\implies \Phi$ 偶；$f$ 偶 $\implies \displaystyle\int_0^x f(t)\,\mathrm{d}t$ 奇；
    * 周期性：$\displaystyle\int_0^x f(t)\,\mathrm{d}t$ 以 $T$ 为周期 $\iff \displaystyle\int_0^T f(t)\,\mathrm{d}t = 0$。
  * **行动**：
    1. 连续、可导：先找 $f$ 的间断点，判断类型；
    2. 单调、极值：$\Phi' = f$，看 $f$ 的符号；$f$ 变号的点是 $\Phi$ 的极值点；
    3. 奇偶：先看 $f$ 的奇偶；$f$ 是偶函数时，再看下限是不是 $0$；
    4. 周期：先算 $\displaystyle\int_0^T f(t)\,\mathrm{d}t$ 是否为 $0$；
    5. 由 $f$ 的图形读 $\Phi$ 的值：$\Phi(x)$ 是从 $a$ 到 $x$ 的面积，$x$ 轴上方为正、下方为负。
* **6. 有没有原函数；求分段函数的原函数**
  * **问题**：判断 $f(x)$ 在某区间上有没有原函数；求分段函数的不定积分或某一个原函数。
  * **目标**：先查间断点；分段求出原函数后，在分段点拼成一个连续的函数。
  * **调用**：
    * 原函数存在定理：连续 $\implies$ 有原函数；
    * 有原函数的必要条件：没有可去、跳跃、无穷间断点；
    * 原函数可导，所以连续。
  * **行动**：
    1. 有没有原函数：区间上连续，有；有可去、跳跃、无穷间断点，没有；
    2. 分段函数：各段分别求原函数，各带一个常数；
    3. 在分段点令左、右两段的值相等，只留一个常数 $C$；如 $f(x) = 2(x - 1)$（$x < 1$）、$f(x) = \ln x$（$x \ge 1$）：左段取 $(x - 1)^2$，右段 $x(\ln x - 1) + C_2$，在 $x = 1$ 处令两段相等得 $C_2 = 1$；
    4. 分段点是 $f$ 的跳跃间断点时，$f$ 没有原函数；题目问的通常是 $\displaystyle\int_a^x f(t)\,\mathrm{d}t$，按区间可加分段写出。
* **7. 证明积分不等式**
  * **问题**：证明含定积分的不等式，如 $f(x)$ 在 $[a, b]$ 上连续且单调增加，证明 $\displaystyle\int_a^b xf(x)\,\mathrm{d}x \ge \dfrac{a + b}{2}\int_a^b f(x)\,\mathrm{d}x$。
  * **目标**：把上限 $b$ 换成 $x$，两边作差得到一个函数，看它的单调性。
  * **调用**：变上限积分的导数；用导数的符号判断单调（第 2 章）。
  * **行动**：
    1. 令 $F(x) = \displaystyle\int_a^x tf(t)\,\mathrm{d}t - \dfrac{a + x}{2}\int_a^x f(t)\,\mathrm{d}t$，则 $F(a) = 0$；
    2. 求导并化简：$F'(x) = \dfrac{x - a}{2}f(x) - \dfrac{1}{2}\displaystyle\int_a^x f(t)\,\mathrm{d}t = \dfrac{1}{2}\int_a^x [f(x) - f(t)]\,\mathrm{d}t$；
    3. $f$ 单调增加，$t \le x$ 时 $f(x) - f(t) \ge 0$，所以 $F'(x) \ge 0$；
    4. $F$ 单调不减，$F(b) \ge F(a) = 0$，即得结论。
* **8. 解含积分的方程**
  * **问题**：$f(x)$ 满足 $f(x) = x + 2\displaystyle\int_0^1 f(t)\,\mathrm{d}t$，或 $f(x) = e^x + \displaystyle\int_0^x f(t)\,\mathrm{d}t$，求 $f(x)$。
  * **目标**：定积分是一个常数，把它设出来；变限积分求导，化成微分方程。
  * **调用**：定积分是一个数；变上限积分的导数；一阶线性微分方程（第 9 章）。
  * **行动**：
    1. 含定积分：设 $A = \displaystyle\int_0^1 f(t)\,\mathrm{d}t$，则 $f(x) = x + 2A$；两边在 $[0, 1]$ 上积分，$A = \dfrac{1}{2} + 2A$，得 $A = -\dfrac{1}{2}$，$f(x) = x - 1$；
    2. 含变限积分：两边求导，$f'(x) = e^x + f(x)$；
    3. 初始条件：在原式中令 $x$ 等于积分下限，得 $f(0) = 1$；
    4. 解微分方程：$f(x) = (x + 1)e^x$。

**③ 原函数怎么找**

* **9. 求不定积分：选方法**
  * **问题**：求 $\displaystyle\int f(x)\,\mathrm{d}x$。
  * **目标**：化成基本积分公式里的样子。
  * **调用**：基本积分公式；线性；凑微分；第二类换元；分部积分。
  * **行动**（按顺序试）：
    1. 化简：拆项，分子凑出分母，三角恒等变形（降幂、积化和差）；
    2. 凑微分：被积函数里有一部分正好是另一部分的导数，如 $\displaystyle\int \dfrac{\ln x}{x}\,\mathrm{d}x = \int \ln x\,\mathrm{d}(\ln x) = \dfrac{1}{2}\ln^2 x + C$；
    3. 含根式：按根式的样子，选三角代换或根式代换，去掉根号；
    4. 两类函数相乘：分部，按「反对幂指三」选 $u$；分部后又出现原积分，就移项解出；
    5. 有理函数、三角函数有理式：拆成部分分式，逐项积分。
* **10. 有理函数与三角函数有理式的积分**
  * **问题**：求 $\displaystyle\int \dfrac{P(x)}{Q(x)}\,\mathrm{d}x$；求 $\displaystyle\int R(\sin x, \cos x)\,\mathrm{d}x$。
  * **目标**：拆成几个简单分式，逐项积分。
  * **调用**：部分分式法；$\displaystyle\int \dfrac{\mathrm{d}x}{x - a} = \ln|x - a| + C$，$\displaystyle\int \dfrac{\mathrm{d}x}{a^2 + x^2} = \dfrac{1}{a}\arctan\dfrac{x}{a} + C$；万能代换。
  * **行动**：
    1. 假分式：先作多项式除法；
    2. 分母因式分解，按每个因式写出部分分式；求系数用待定系数，或代入分母的零点；
    3. 一次因式那一项积出 $\ln$ 或幂；二次因式那一项：分子凑出分母的导数，积出 $\ln$，剩下的配方，积出 $\arctan$；
    4. 三角函数有理式：先试凑微分；只含 $\sin^2 x$、$\cos^2 x$、$\tan x$ 时令 $t = \tan x$；都不行，再令 $t = \tan\dfrac{x}{2}$。

**④ 定积分怎么算更省事**

* **11. 求定积分：先借区间**
  * **问题**：求对称区间上、周期函数在整数个周期上、$[0, \frac{\pi}{2}]$ 或 $[0, \pi]$ 上含三角函数的定积分。
  * **目标**：先用区间的性质化简，再找原函数。
  * **调用**：奇偶性；周期性；区间再现；点火公式；牛顿-莱布尼茨公式。
  * **行动**：
    1. 对称区间：拆成奇、偶两部分，奇的部分为 $0$，偶的部分化成 $2\displaystyle\int_0^a$；
    2. 周期函数：区间长度是周期的整数倍时，化成 $n\displaystyle\int_0^T$；
    3. $\sin^n x$、$\cos^n x$ 在 $[0, \frac{\pi}{2}]$ 上：点火公式；$\sin^n x$ 在 $[0, \pi]$ 上：$2I_n$；
    4. 原函数难找：试区间再现，两式相加；如 $\displaystyle\int_0^{\pi} \dfrac{x\sin x}{1 + \cos^2 x}\,\mathrm{d}x = \dfrac{\pi}{2}\int_0^{\pi} \dfrac{\sin x}{1 + \cos^2 x}\,\mathrm{d}x = \dfrac{\pi^2}{4}$；
    5. 换元：积分限跟着换成新变量的值，算完不换回。
* **12. 含绝对值、分段或抽象函数的定积分**
  * **问题**：被积函数含 $|x - a|$、$\max$、分段表达式；被积函数含未知的 $f'(x)$、$f''(x)$，或含变限积分。
  * **目标**：按分段点拆开区间；或用分部积分把导数转走。
  * **调用**：区间可加；定积分的分部积分法；变上限积分的导数。
  * **行动**：
    1. 绝对值、$\max$、分段：求出分段点，按区间可加拆开；
    2. 含 $f'(x)$、$f''(x)$：分部，如 $\displaystyle\int_0^1 xf''(x)\,\mathrm{d}x = xf'(x)\Big|_0^1 - \int_0^1 f'(x)\,\mathrm{d}x = f'(1) - f(1) + f(0)$；
    3. 被积函数是 $\Phi(x) = \displaystyle\int_0^x f(t)\,\mathrm{d}t$：分部，取 $u = \Phi(x)$、$v = x$，得 $\displaystyle\int_0^1 \Phi(x)\,\mathrm{d}x = \Phi(1) - \int_0^1 xf(x)\,\mathrm{d}x$。

**⑤ 区间无穷、函数无界**

* **13. 计算反常积分**
  * **问题**：求 $\displaystyle\int_0^{+\infty} xe^{-x}\,\mathrm{d}x$、$\displaystyle\int_0^1 \ln x\,\mathrm{d}x$ 这类积分。
  * **目标**：按定积分算，在问题点处取极限。
  * **调用**：反常积分的牛顿-莱布尼茨公式；换元、分部照用。
  * **行动**：
    1. 找出所有问题点：无穷端点、区间端点和内部的瑕点；
    2. 有几个问题点，就拆成几段，每段只含一个；
    3. 求原函数，在问题点处取极限；如 $\displaystyle\int_0^{+\infty} xe^{-x}\,\mathrm{d}x = -(x + 1)e^{-x}\Big|_0^{+\infty} = 1$，$\displaystyle\int_0^1 \ln x\,\mathrm{d}x = (x\ln x - x)\Big|_{0^+}^1 = -1$；
    4. 有一段发散，整个发散；不能让两段正负抵消。
* **14. 判断反常积分的敛散**
  * **问题**：判断 $\displaystyle\int_1^{+\infty} \dfrac{\ln x}{x^2}\,\mathrm{d}x$ 是否收敛；求使 $\displaystyle\int_0^{+\infty} \dfrac{\mathrm{d}x}{x^p(1 + x)}$ 收敛的 $p$。
  * **目标**：在每个问题点附近，把被积函数和 $\dfrac{1}{x^p}$ 比。
  * **调用**：$p$ 积分；比较判别法（极限形式；$l = 0$、$l = +\infty$ 两端）。
  * **行动**：
    1. 拆开，每段只含一个问题点；
    2. 在问题点附近找等价的 $\dfrac{C}{x^p}$（瑕点 $a$ 处为 $\dfrac{C}{(x - a)^p}$），读出 $p$：无穷远处 $p > 1$ 收敛，瑕点处 $p < 1$ 收敛；
    3. 含 $\ln x$：$\ln x$ 比任何正次幂都慢，取一个略大或略小的 $p$ 再比；如 $\dfrac{\ln x}{x^2}$ 与 $\dfrac{1}{x^{3/2}}$ 比，极限为 $0$，后者收敛，所以收敛；
    4. 含参数：每段各得一个范围，取交集；如 $0$ 附近 $\sim \dfrac{1}{x^p}$，要 $p < 1$；无穷远处 $\sim \dfrac{1}{x^{p + 1}}$，要 $p + 1 > 1$；所以 $0 < p < 1$。

**⑥ 什么量能用积分算**

* **15. 求平面图形的面积**
  * **问题**：求两条曲线围成的面积；参数方程、极坐标曲线围成的面积。
  * **目标**：定出积分区间，写出面积微元。
  * **调用**：直角坐标 $\displaystyle\int_a^b |f - g|\,\mathrm{d}x$；参数方程 $\displaystyle\int_\alpha^\beta \psi(t)\varphi'(t)\,\mathrm{d}t$；极坐标 $\dfrac{1}{2}\displaystyle\int_\alpha^\beta r^2\,\mathrm{d}\theta$。
  * **行动**：
    1. 画图，求交点；
    2. 选竖着切（对 $x$ 积分）或横着切（对 $y$ 积分），选不用分段的那一种：面积 $= \displaystyle\int (\text{上} - \text{下})\,\mathrm{d}x$ 或 $\displaystyle\int (\text{右} - \text{左})\,\mathrm{d}y$；
    3. 极坐标：先定出 $\theta$ 的范围；图形对称时，算一部分再乘倍数；
    4. 参数方程：$x$、$\mathrm{d}x$ 都用 $t$ 表示，积分限换成 $t$ 的值。
* **16. 求旋转体的体积**
  * **问题**：平面图形绕 $x$ 轴、$y$ 轴或直线 $y = c$、$x = c$ 旋转，求所得立体的体积。
  * **目标**：选圆片或柱壳，写出体积微元。
  * **调用**：$V_x = \pi\displaystyle\int_a^b f^2(x)\,\mathrm{d}x$；中间空心时 $\pi\displaystyle\int_a^b (f^2 - g^2)\,\mathrm{d}x$；$V_y = 2\pi\displaystyle\int_a^b x|f(x)|\,\mathrm{d}x$；截面面积已知时 $\displaystyle\int_a^b A(x)\,\mathrm{d}x$。
  * **行动**：
    1. 绕 $x$ 轴：竖着切成圆片，$\mathrm{d}V = \pi f^2(x)\,\mathrm{d}x$；中间空心时用外圆减内圆；
    2. 绕 $y$ 轴：竖着切后用柱壳，$\mathrm{d}V = 2\pi x|f(x)|\,\mathrm{d}x$；也可以横着切成圆片，对 $y$ 积分；
    3. 绕直线 $y = c$：圆片的半径换成 $|f(x) - c|$；绕直线 $x = c$：柱壳的半径换成 $|x - c|$；
    4. 截面面积已知：$\mathrm{d}V = A(x)\,\mathrm{d}x$。
* **17. 求弧长、旋转曲面的面积**
  * **问题**：求一段曲线的长度；曲线绕 $x$ 轴旋转所得曲面的面积。
  * **目标**：写出弧微分 $\mathrm{d}s$。
  * **调用**：$\mathrm{d}s = \sqrt{1 + y'^2}\,\mathrm{d}x = \sqrt{\varphi'^2 + \psi'^2}\,\mathrm{d}t = \sqrt{r^2 + r'^2}\,\mathrm{d}\theta$；旋转曲面 $S = 2\pi\displaystyle\int |y|\,\mathrm{d}s$。
  * **行动**：
    1. 按曲线的给法，选 $\mathrm{d}s$ 的形式；
    2. 根号下常能凑成完全平方，先化简再积分；
    3. 旋转曲面：$\mathrm{d}S = 2\pi|y|\,\mathrm{d}s$，$|y|$ 是曲线上的点到旋转轴的距离。
* **18. 求功、液体压力**
  * **问题**：把容器里的水抽出所做的功；变力做功；平板一侧受到的液体压力。
  * **目标**：建坐标，找出深度为 $x$ 的那一层，写出微元。
  * **调用**：$W = \displaystyle\int_a^b F(x)\,\mathrm{d}x$；抽水 $\mathrm{d}W = \rho g\,A(x)\,x\,\mathrm{d}x$；压力 $\mathrm{d}P = \rho g\,x\,l(x)\,\mathrm{d}x$。
  * **行动**：
    1. 建坐标：$x$ 轴竖直向下，原点放在液面；
    2. 抽水：深度 $x$ 处的薄层，体积 $A(x)\,\mathrm{d}x$，重 $\rho gA(x)\,\mathrm{d}x$，提升的距离是这一层到出水口的高度；
    3. 压力：深度 $x$ 处的窄条，面积 $l(x)\,\mathrm{d}x$，压强 $\rho gx$；
    4. 积分区间是液体所在的深度范围。
