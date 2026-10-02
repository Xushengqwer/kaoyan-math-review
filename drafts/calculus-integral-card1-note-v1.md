### 〔定义〕

**① 曲边的面积怎么算**

#### 1. 定积分：切细、加起来、取极限
* **用路程来想**：速度 $v(t) = t$，从 $t = 0$ 走到 $t = 1$：
  * 切成 $n$ 段，每段长 $\dfrac{1}{n}$，每段用右端点的速度 $\dfrac{i}{n}$ 当作这一段的速度；
  * 路程约为 $\displaystyle\sum_{i=1}^{n} \dfrac{i}{n} \cdot \dfrac{1}{n} = \dfrac{n + 1}{2n}$；
  * $n = 10$ 时是 $0.55$，$n = 100$ 时是 $0.505$，越来越接近 $\dfrac{1}{2}$——这就是 $\displaystyle\int_0^1 t\,\mathrm{d}t$。
* **「不论怎样分、怎样取点」**：上面改用左端点，得 $\dfrac{n - 1}{2n}$，也趋于 $\dfrac{1}{2}$；定义要求所有取法的极限都相同。
* **是 $\lambda \to 0$，不是 $n \to \infty$**：分点再多，只要有一段始终不变窄，那一段的矩形就始终是粗糙的近似；要的是每一段都变窄。
* **字母无关**：$\displaystyle\int_0^1 x^2\,\mathrm{d}x$ 和 $\displaystyle\int_0^1 t^2\,\mathrm{d}t$ 都是 $\dfrac{1}{3}$；积分变量只在积分号里面有意义，积完就没有了。

#### 2. 两个规定：上下限相同为 0，上下限交换变号
* **为什么这样规定**：想让区间可加 $\displaystyle\int_a^b = \int_a^c + \int_c^b$ 对任意 $c$ 都成立：
  * 取 $c = a$，得 $\displaystyle\int_a^a = 0$；
  * 取 $b = a$，得 $0 = \displaystyle\int_a^c + \int_c^a$，即交换上下限变号。
* **用路程来想**：倒着走，走过的路程记成负的。

#### 3. 函数的平均值：总量除以区间长度
* **用速度来想**：$2$ 小时走了 $120$ 公里，平均速度是 $60$；$\bar{v} = \dfrac{1}{b - a}\displaystyle\int_a^b v(t)\,\mathrm{d}t$ 是同一件事。
* **例**：$\sin x$ 在 $[0, \pi]$ 上，$\displaystyle\int_0^{\pi} \sin x\,\mathrm{d}x = 2$，平均值 $\dfrac{2}{\pi} \approx 0.64$，介于最小值 $0$ 与最大值 $1$ 之间。
* **几何**：以平均值为高、$[a, b]$ 为底的长方形，面积和曲边梯形一样。

**② 面积怎么随右端变**

#### 1. 变上限积分：右端点在动，面积跟着变
* **例**：$\Phi(x) = \displaystyle\int_0^x 2t\,\mathrm{d}t = x^2$：右端点在 $1$，面积是 $1$；右端点在 $2$，面积是 $4$——面积成了 $x$ 的函数。
* **用路程来想**：速度是 $v(t)$，$\displaystyle\int_0^x v(t)\,\mathrm{d}t$ 就是到时刻 $x$ 为止走过的路程。
* **两个字母不能混**：$x$ 是右端点，$t$ 在 $a$ 与 $x$ 之间跑；写成 $\displaystyle\int_a^x f(x)\,\mathrm{d}x$，同一个 $x$ 既当端点又当积分变量，就分不清了。

#### 2. 原函数：导数等于 f 的函数
* **倒过来问**：第 2 章是给出 $F$，求 $F'$；这里是给出 $f$，问谁的导数是它。
* **例**：$\cos x$ 的原函数有 $\sin x$、$\sin x + 1$、$\sin x - 5$……
* **用速度来想**：知道每一刻的速度，倒推位置；不知道起点，位置就只能定到差一个常数。

#### 3. 不定积分：全体原函数，写成 F + C
* **为什么只差常数**：$F$、$G$ 都是原函数，$(F - G)' = 0$，区间上导数恒为 $0$ 的函数是常数。
* **「区间上」不能少**：$\dfrac{1}{x}$ 的定义域被 $0$ 断开，两段上的常数可以不同：$x > 0$ 时 $\ln x + C_1$，$x < 0$ 时 $\ln(-x) + C_2$。
* **一个是一族函数，一个是一个数**：不定积分是一族函数；定积分是一个数。

**③ 原函数怎么找**

#### 1. 有理函数：两个多项式相除
* **例**：$\dfrac{x^3}{x^2 + 1}$ 是假分式，除一次：$x^3 = x(x^2 + 1) - x$，得 $x - \dfrac{x}{x^2 + 1}$。
* **为什么分真假**：部分分式只拆真分式；假分式先把多项式部分除出来。

#### 2. 三角函数有理式：只用 sin x、cos x 做四则运算
* **例**：$\dfrac{1}{2 + \sin x}$、$\dfrac{\sin x}{1 + \cos x}$ 是；$x\sin x$、$\sin\sqrt{x}$ 不是——里面单独出现了 $x$、$\sqrt{x}$。
* **为什么单独起名**：令 $t = \tan\dfrac{x}{2}$，$\sin x$、$\cos x$、$\mathrm{d}x$ 都变成 $t$ 的有理式，这一整类都能化成有理函数。

**④ 定积分怎么算更省事**

#### 1. 双阶乘：隔一个乘一个
* **例**：$7!! = 7 \cdot 5 \cdot 3 \cdot 1 = 105$，$8!! = 8 \cdot 6 \cdot 4 \cdot 2 = 384$。
* **不是阶乘的阶乘**：$3!! = 3$，而 $(3!)! = 6! = 720$。
* **和阶乘的关系**：$n! = n!! \cdot (n - 1)!!$，如 $6! = 48 \times 15 = 720$。

**⑤ 区间无穷、函数无界**

#### 1. 无穷区间上的反常积分：先积到 t，再让 t 趋于无穷
* **例**：
  * $\displaystyle\int_1^t \dfrac{\mathrm{d}x}{x^2} = 1 - \dfrac{1}{t} \to 1$，收敛；
  * $\displaystyle\int_1^t \dfrac{\mathrm{d}x}{x} = \ln t \to +\infty$，发散。
* **画面**：$\dfrac{1}{x^2}$ 下方的区域无限长，面积却是有限的 $1$。
* **两端无穷要拆开**：$\displaystyle\int_{-\infty}^{+\infty} \dfrac{x}{1 + x^2}\,\mathrm{d}x$ 的每一半都是无穷，所以发散；若对称地取 $\displaystyle\int_{-t}^{t}$ 再令 $t \to +\infty$，会得到 $0$，但定义不是这样取的。

#### 2. 无界函数的反常积分（瑕积分）：在瑕点处留一小段，再让它缩到 0
* **例**：
  * $\displaystyle\int_t^1 \dfrac{\mathrm{d}x}{\sqrt{x}} = 2 - 2\sqrt{t} \to 2$，收敛；
  * $\displaystyle\int_t^1 \dfrac{\mathrm{d}x}{x} = -\ln t \to +\infty$，发散。
* **怎么找瑕点**：看分母为 $0$ 的点、$\ln$ 的真数为 $0$ 的点，被积函数在那里是否趋于 $\infty$；$\dfrac{\sin x}{x}$ 在 $0$ 处的极限是 $1$，不是瑕点。
* **瑕点在中间也要拆开**：$\displaystyle\int_{-1}^{1} \dfrac{\mathrm{d}x}{x^2}$ 的瑕点是 $0$，拆成两段，每一段都发散。

**⑥ 什么量能用积分算**

#### 1. 微元法：先写一小段，再加起来
* **例：圆的面积**：半径 $R$ 的圆，切成一圈一圈的细环：
  * 半径 $r$ 处、宽 $\mathrm{d}r$ 的细环，拉直近似一个长 $2\pi r$、宽 $\mathrm{d}r$ 的长条；
  * $\mathrm{d}A = 2\pi r\,\mathrm{d}r$，$A = \displaystyle\int_0^R 2\pi r\,\mathrm{d}r = \pi R^2$。
* **为什么误差要比 $\mathrm{d}r$ 高阶**：
  * 细环的真实面积是 $\pi(r + \mathrm{d}r)^2 - \pi r^2 = 2\pi r\,\mathrm{d}r + \pi(\mathrm{d}r)^2$；
  * 多出的 $\pi(\mathrm{d}r)^2$ 比 $\mathrm{d}r$ 高阶，$n$ 段加起来约 $n \cdot \dfrac{1}{n^2}$，趋于 $0$；
  * 若每段的误差和 $\mathrm{d}r$ 同阶，$n$ 段加起来不会趋于 $0$。
* **写微元时**：取 $[x, x + \mathrm{d}x]$ 一小段，把这一段上的量当成不变。

---

### 〔性质〕

**① 曲边的面积怎么算**

**定积分是什么**

#### 1. 几何意义：x 轴上方算正，下方算负
* **例**：$\displaystyle\int_0^{2\pi} \sin x\,\mathrm{d}x = 0$：上方一块面积 $2$，下方一块面积 $2$，正负抵消。
* **直接读数**：
  * $\displaystyle\int_0^a \sqrt{a^2 - x^2}\,\mathrm{d}x$ 是四分之一个圆，等于 $\dfrac{\pi a^2}{4}$；
  * $\displaystyle\int_{-1}^{1} |x|\,\mathrm{d}x$ 是两个三角形，等于 $1$。
* **要的是面积**：对 $|f(x)|$ 积分，如 $\displaystyle\int_0^{2\pi} |\sin x|\,\mathrm{d}x = 4$。

**有什么性质**

#### 1. 线性与区间可加：可以拆开，也可以拼起来
* **区间可加的用处**：被积函数分段、含 $|x - c|$，就在分段点 $c$ 处拆开。
* **$c$ 不在中间也成立**：$\displaystyle\int_0^1 = \int_0^2 + \int_2^1$，靠的是两个规定。
* **线性只管加减和常数倍**：$\displaystyle\int_0^1 x \cdot x\,\mathrm{d}x = \dfrac{1}{3}$，而 $\displaystyle\int_0^1 x\,\mathrm{d}x \cdot \int_0^1 x\,\mathrm{d}x = \dfrac{1}{4}$，乘积不能拆开积。

#### 2. 保号性、比较与估值：不算积分，也能比大小
* **比较的例**：在 $[0, 1]$ 上 $x^2 \le x$，所以 $\displaystyle\int_0^1 x^2\,\mathrm{d}x \le \int_0^1 x\,\mathrm{d}x$（$\dfrac{1}{3} \le \dfrac{1}{2}$）；在 $[1, 2]$ 上大小反过来。
* **估值的例**：$\displaystyle\int_0^1 e^{x^2}\,\mathrm{d}x$：$1 \le e^{x^2} \le e$，所以积分在 $1$ 和 $e$ 之间（真实值约 $1.46$）。
* **严格不等号要连续**：$f$ 只在 $x = 0$ 处等于 $1$、其余为 $0$，它非负、不恒为 $0$，积分却是 $0$；连续才保证附近一小段都大于 $0$。
* **绝对值**：先取绝对值再积分，就没有正负抵消，所以只会更大。

#### 3. 积分中值定理：平均值一定取得到
* **用速度来想**：平均速度 $60$，途中一定有某一刻的速度正好是 $60$——速度连续变化，不会跳过 $60$。
* **和拉格朗日中值定理是同一件事**：对路程 $\Phi(x) = \displaystyle\int_a^x f(t)\,\mathrm{d}t$ 用拉格朗日，$\Phi'(\xi)$ 就是 $f(\xi)$。
* **例**：$\displaystyle\int_0^{\pi} \sin x\,\mathrm{d}x = 2 = \pi\sin\xi$，$\sin\xi = \dfrac{2}{\pi}$，$\xi \approx 0.69$ 或 $\pi - 0.69$。
* **连续不能少**：$f(x) = 0$（$0 \le x < 1$）、$f(x) = 1$（$1 \le x \le 2$），平均值 $\dfrac{1}{2}$，但 $f$ 只取 $0$ 和 $1$。
* **用处**：$f$ 连续时，$\lim\limits_{x \to 0} \dfrac{1}{x}\displaystyle\int_0^x f(t)\,\mathrm{d}t = \lim\limits_{x \to 0} f(\xi) = f(0)$，$\xi$ 在 $0$ 与 $x$ 之间。

**反过来用定义**

#### 1. 和式的极限化为定积分：把 n 项和认成 n 个细条的面积
* **怎么认**：$\dfrac{1}{n}$ 是每个细条的宽，$\dfrac{i}{n}$ 是第 $i$ 个分点，$f\left(\dfrac{i}{n}\right)$ 是第 $i$ 个细条的高。
* **例**：$\dfrac{1}{n}\displaystyle\sum_{i=1}^{n} \left(\dfrac{i}{n}\right)^2 \to \int_0^1 x^2\,\mathrm{d}x = \dfrac{1}{3}$；直接算是 $\dfrac{(n + 1)(2n + 1)}{6n^2}$，也趋于 $\dfrac{1}{3}$。
* **区间不一定是 $[0, 1]$**：
  * $\dfrac{1}{n}\displaystyle\sum_{i=1}^{n} f\left(1 + \dfrac{i}{n}\right) \to \int_1^2 f(x)\,\mathrm{d}x$；
  * $\dfrac{2}{n}\displaystyle\sum_{i=1}^{n} f\left(\dfrac{2i}{n}\right) \to \int_0^2 f(x)\,\mathrm{d}x$。

**什么函数能积（边界）**

#### 1. 可积的条件：有界是门槛，连续、单调是保证
* **为什么必须有界**：无界时，某个细条里的 $f(\xi_i)$ 可以取得任意大，和式没有极限；无界函数要积分，只能走反常积分。
* **有限个间断点不要紧**：一个点上的值，只影响一个细条；细条变窄时，这一块趋于 $0$。
* **有界也可能不可积**：有理数处为 $1$、无理数处为 $0$ 的函数——每个细条里都取有理点，和为 $1$；都取无理点，和为 $0$。

**② 面积怎么随右端变**

**$\Phi$ 的导数**

#### 1. 变上限积分的导数：面积的变化率，就是右端的高
* **例**：$\Phi(x) = \displaystyle\int_0^x 2t\,\mathrm{d}t = x^2$，$\Phi'(x) = 2x$，正好是被积函数在右端的值。
* **画面**：右端挪 $\Delta x$，多出一个细条，面积 $\approx f(x)\Delta x$；除以 $\Delta x$，就是 $f(x)$。
* **用速度来想**：「到时刻 $x$ 为止的路程」对 $x$ 求导，就是时刻 $x$ 的速度。

#### 2. 一般形式：上下限都在动，各乘一次链式法则
* **例**：$\dfrac{\mathrm{d}}{\mathrm{d}x}\displaystyle\int_x^{x^2} e^{t^2}\,\mathrm{d}t = e^{x^4} \cdot 2x - e^{x^2}$。
* **为什么乘 $\varphi'(x)$**：$\displaystyle\int_a^{\varphi(x)} f(t)\,\mathrm{d}t$ 是 $\Phi(u)$ 与 $u = \varphi(x)$ 的复合，求导得 $\Phi'(u)\varphi'(x) = f[\varphi(x)]\varphi'(x)$。
* **下限为什么是减**：下限往右挪，面积变小。
* **被积函数里含 $x$**：$\dfrac{\mathrm{d}}{\mathrm{d}x}\displaystyle\int_0^x xt\,\mathrm{d}t$：
  * 先提出 $x$：$x\displaystyle\int_0^x t\,\mathrm{d}t = \dfrac{x^3}{2}$，导数是 $\dfrac{3x^2}{2}$；
  * 直接套公式，得 $x \cdot x = x^2$，少了一项。

#### 3. 原函数存在定理：连续函数一定有原函数
* **意思**：$e^{-x^2}$ 的原函数写不成初等函数，但原函数存在，就是 $\displaystyle\int_0^x e^{-t^2}\,\mathrm{d}t$。
* **连续只是充分条件**：$x^2\sin\dfrac{1}{x}$（补充 $0$ 处的值为 $0$）的导数在 $0$ 处不连续，它却是这个导数的原函数。

#### 4. 牛顿-莱布尼茨公式：面积等于原函数在两端的差
* **用速度来想**：路程 = 终点的位置 − 起点的位置；用哪一个原函数都行，常数在相减时抵消。
* **例**：$\displaystyle\int_0^1 x^2\,\mathrm{d}x = \dfrac{x^3}{3}\Big|_0^1 = \dfrac{1}{3}$，不用再求平方和。
* **条件**：$f$ 在 $[a, b]$ 上连续；区间里有瑕点时不能直接用。

#### 5. 不定积分与求导互逆：先积后导回到原样，先导后积多一个 C
* **例**：$\displaystyle\int (\sin x)'\,\mathrm{d}x = \sin x + C$；$\left(\displaystyle\int \sin x\,\mathrm{d}x\right)' = \sin x$。
* **和变上限积分对照**：$\dfrac{\mathrm{d}}{\mathrm{d}x}\displaystyle\int_a^x f(t)\,\mathrm{d}t = f(x)$；$\displaystyle\int_a^x F'(t)\,\mathrm{d}t = F(x) - F(a)$，这里的常数就是 $-F(a)$。

**$\Phi$ 作为一个函数**

#### 1. 连续与可导：f 好一级，Φ 就再好一级
* **规律**：$f$ 可积（可以有跳跃），$\Phi$ 就连续；$f$ 连续，$\Phi$ 就可导。积分让函数变光滑。
* **为什么可积就连续**：$f$ 有界，$|f| \le M$，所以 $|\Phi(x + \Delta x) - \Phi(x)| \le M|\Delta x| \to 0$。

#### 2. 在 $f$ 的间断点处：跳跃变成尖角，可去照样光滑
* **跳跃的例**：$f(x) = 1$（$x < 0$）、$f(x) = 2$（$x \ge 0$），$\Phi(x) = \displaystyle\int_0^x f(t)\,\mathrm{d}t$：
  * $x < 0$ 时 $\Phi(x) = x$，斜率 $1$；$x \ge 0$ 时 $\Phi(x) = 2x$，斜率 $2$；
  * 在 $0$ 处连续，但左右斜率不同，是一个尖角，不可导。
* **可去的情形**：只改一个点的值，面积不变；$\Phi$ 看不到这个点，照样可导，导数是 $f$ 在这点的极限，而不是 $f(x_0)$。

#### 3. 奇偶性：奇函数的面积函数是偶函数
* **画面**：$f$ 是奇函数，$[0, x]$ 与 $[-x, 0]$ 上的两块面积大小相等、一正一负；从 $0$ 往左积到 $-x$，再按方向记一次负号，结果和往右积到 $x$ 相同。
* **例**：
  * $\displaystyle\int_0^x t\,\mathrm{d}t = \dfrac{x^2}{2}$，偶函数；
  * $\displaystyle\int_0^x t^2\,\mathrm{d}t = \dfrac{x^3}{3}$，奇函数；
  * $\displaystyle\int_1^x t^2\,\mathrm{d}t = \dfrac{x^3 - 1}{3}$，不是奇函数——下限不是 $0$。
* **和第 2 章对照**：可导的奇函数，导数是偶函数；这一条是它倒过来。

#### 4. 周期性：每个周期的面积为 0，面积函数才会回到原处
* **例**：
  * $f = \sin x$：$\displaystyle\int_0^{2\pi} \sin x\,\mathrm{d}x = 0$，$\Phi(x) = 1 - \cos x$，以 $2\pi$ 为周期；
  * $f = 1 + \sin x$：每个周期多出 $2\pi$，$\Phi(x) = x + 1 - \cos x$ 一直增长，不是周期函数。
* **用速度来想**：速度是周期的，每一圈的净路程是 $\displaystyle\int_0^T f$；净路程为 $0$，位置才会周期地回来。

#### 5. 等价无穷小：被积函数几阶，积出来就高一阶
* **例**：$\displaystyle\int_0^x \sin t\,\mathrm{d}t = 1 - \cos x \sim \dfrac{x^2}{2}$：被积函数 $\sin t \sim t$ 是 $1$ 阶，积出来是 $2$ 阶。
* **为什么高一阶**：$\displaystyle\int_0^x t^k\,\mathrm{d}t = \dfrac{x^{k+1}}{k + 1}$，积一次，次数加 $1$。
* **上限是 $x^2$**：$\displaystyle\int_0^{x^2} \sin t\,\mathrm{d}t \sim \dfrac{(x^2)^2}{2} = \dfrac{x^4}{2}$。

**什么时候没有原函数（边界）**

#### 1. 有原函数的必要条件：导函数不会跳
* **意思**：$F$ 处处可导时，$F'$ 在一点的左右极限若存在，就必须等于这一点的导数值；所以 $F'$ 不会有跳跃、可去这样的断口。
* **例**：$\operatorname{sgn} x$ 在 $(-1, 1)$ 上没有原函数：
  * 若 $F' = \operatorname{sgn} x$，则 $x > 0$ 时 $F = x + C_1$，$x < 0$ 时 $F = -x + C_2$；
  * $F$ 可导必连续，所以 $C_1 = C_2$，$F = |x| + C$；
  * $|x|$ 在 $0$ 处不可导，矛盾。
* **振荡间断点**：$x^2\sin\dfrac{1}{x}$ 的导数在 $0$ 附近来回振荡，没有左右极限，上面的推理用不上，所以它可以有原函数。

#### 2. 可积与有原函数：两个条件，谁也推不出谁
* **可积看的是面积**：有界、断点少就行，跳跃不要紧。
* **有原函数看的是导数**：不能跳，但可以无界，如 $x^2\sin\dfrac{1}{x^2}$ 的导数。
* **做选择题时**：问有没有原函数，先找第一类间断点和无穷间断点；问可不可积，先看有没有界。

**③ 原函数怎么找**

**把求导倒过来**

#### 1. 基本积分公式（查表）：每一条都能求导验证
* **记法**：求导表倒过来读；记不清时，对右边求导，看能不能回到左边。
* **例**：$\left(\ln|\sec x + \tan x|\right)' = \dfrac{\sec x\tan x + \sec^2 x}{\sec x + \tan x} = \sec x$。
* **不在求导表里的几条**：$\displaystyle\int \tan x\,\mathrm{d}x$、$\displaystyle\int \sec x\,\mathrm{d}x$ 要靠变形得到，如 $\displaystyle\int \tan x\,\mathrm{d}x = \int \dfrac{\sin x}{\cos x}\,\mathrm{d}x = -\int \dfrac{\mathrm{d}(\cos x)}{\cos x}$。

#### 2. 线性：拆开积，常数提出来
* **例**：$\displaystyle\int \dfrac{(1 + x)^2}{x}\,\mathrm{d}x = \int \left(\dfrac{1}{x} + 2 + x\right)\mathrm{d}x = \ln|x| + 2x + \dfrac{x^2}{2} + C$。
* **只管加减**：乘积、商不能这样拆，要用分部积分或换元。

#### 3. 第一类换元法（凑微分法）：看见一个函数和它的导数
* **思路**：被积函数里有一部分是 $\varphi(x)$，旁边又乘着 $\varphi'(x)$，就把 $\varphi'(x)\,\mathrm{d}x$ 写成 $\mathrm{d}\varphi(x)$。
* **例**：
  * $\displaystyle\int 2x\cos x^2\,\mathrm{d}x$：$2x\,\mathrm{d}x = \mathrm{d}(x^2)$，得 $\sin x^2 + C$；
  * $\displaystyle\int \cos 3x\,\mathrm{d}x = \dfrac{1}{3}\int \cos 3x\,\mathrm{d}(3x) = \dfrac{1}{3}\sin 3x + C$——系数要补齐。
* **和第 2 章的关系**：一阶微分形式不变性 $\mathrm{d}u = u'\,\mathrm{d}x$，凑微分就是把这一步倒过来。

#### 4. 分部积分法：把导数从一个因子挪到另一个
* **思路**：$\displaystyle\int u\,\mathrm{d}v$ 不会算，换成 $\displaystyle\int v\,\mathrm{d}u$；选 $u$ 的标准是求导后变简单。
* **为什么是「反对幂指三」**：$\arctan x$、$\ln x$ 求导后变成有理函数，变简单了，适合作 $u$；$e^x$、$\sin x$ 求导后不变简单，适合放进 $\mathrm{d}v$。
* **例**：$\displaystyle\int xe^x\,\mathrm{d}x$：
  * 取 $u = x$：$= xe^x - \displaystyle\int e^x\,\mathrm{d}x = (x - 1)e^x + C$；
  * 取 $u = e^x$：$= \dfrac{x^2}{2}e^x - \displaystyle\int \dfrac{x^2}{2}e^x\,\mathrm{d}x$，越积越复杂。
* **循环**：$e^x$ 与 $\sin x$、$\cos x$ 相乘，分部两次又回到自己，移项解出。

**化成能积的形式**

#### 1. 第二类换元法：根号去不掉，就换一个变量
* **三角代换从哪来**：$1 - \sin^2 t = \cos^2 t$，$1 + \tan^2 t = \sec^2 t$，$\sec^2 t - 1 = \tan^2 t$——正好把 $a^2 - x^2$、$a^2 + x^2$、$x^2 - a^2$ 变成平方。
* **画三角形换回来**：$x = a\sin t$ 时，画斜边 $a$、对边 $x$ 的直角三角形，邻边是 $\sqrt{a^2 - x^2}$，$\cos t$、$\tan t$ 都能直接读出来。
* **两个根号一起去**：$\sqrt{x}$、$\sqrt[3]{x}$ 同时出现，令 $t = \sqrt[6]{x}$。
* **和凑微分的区别**：凑微分把 $\varphi(x)$ 看成新变量；第二类换元把 $x$ 写成新变量的函数 $x = \psi(t)$，积完要换回 $x$。

#### 2. 有理函数的积分（部分分式法）：拆成几个最简单的分式
* **为什么一定积得出来**：拆完只剩 $\dfrac{A}{(x - a)^k}$ 和 $\dfrac{Mx + N}{(x^2 + px + q)^j}$ 两种，每一种都有现成的积法。
* **求系数的快法**：$\dfrac{1}{(x - 1)(x - 2)} = \dfrac{A}{x - 1} + \dfrac{B}{x - 2}$，两边乘 $(x - 1)(x - 2)$：
  * 令 $x = 1$，得 $A = -1$；
  * 令 $x = 2$，得 $B = 1$。
* **重因式要写全**：$(x - 1)^2$ 对应 $\dfrac{A_1}{x - 1} + \dfrac{A_2}{(x - 1)^2}$ 两项；漏掉一项，系数就解不出来。

#### 3. 三角函数有理式的积分（万能代换）：总能用，但最繁
* **从哪来**：倍角公式 $\sin x = \dfrac{2\tan\frac{x}{2}}{1 + \tan^2\frac{x}{2}}$，$\cos x = \dfrac{1 - \tan^2\frac{x}{2}}{1 + \tan^2\frac{x}{2}}$。
* **先试别的**：$\displaystyle\int \dfrac{\mathrm{d}x}{1 + \cos x}$：$1 + \cos x = 2\cos^2\dfrac{x}{2}$，直接得 $\tan\dfrac{x}{2} + C$，不必用万能代换。

**④ 定积分怎么算更省事**

**怎么用公式**

#### 1. 定积分的换元法：换元就换限，不用换回
* **例**：$\displaystyle\int_0^1 \sqrt{1 - x^2}\,\mathrm{d}x$，令 $x = \sin t$：
  * $x$ 从 $0$ 到 $1$，$t$ 从 $0$ 到 $\dfrac{\pi}{2}$；
  * $= \displaystyle\int_0^{\frac{\pi}{2}} \cos^2 t\,\mathrm{d}t = \dfrac{\pi}{4}$，正是四分之一个单位圆的面积。
* **为什么不用换回**：定积分是一个数，用 $x$ 算和用 $t$ 算，是同一个数。
* **凑微分不用写换限**：$\displaystyle\int_0^1 xe^{x^2}\,\mathrm{d}x = \dfrac{1}{2}e^{x^2}\Big|_0^1 = \dfrac{e - 1}{2}$；没写出新变量，限也就不用换。

#### 2. 定积分的分部积分法：边界项先算成数
* **例**：$\displaystyle\int_0^1 xe^x\,\mathrm{d}x = xe^x\Big|_0^1 - \int_0^1 e^x\,\mathrm{d}x = e - (e - 1) = 1$。
* **选 $v$ 让边界项消失**：$\mathrm{d}v = \mathrm{d}x$ 时，$v$ 可以取 $x$，也可以取 $x - a$ 或 $x - b$；选一个让某一端的边界项为 $0$。

**借区间省事**

#### 1. 奇偶性：对称区间上，奇函数的面积正负抵消
* **画面**：奇函数关于原点对称，左右两块一上一下，面积相等。
* **例**：
  * $\displaystyle\int_{-1}^{1} x^3\cos x\,\mathrm{d}x = 0$；
  * $\displaystyle\int_{-1}^{1} (x + 1)^2\,\mathrm{d}x = \int_{-1}^{1} (x^2 + 1)\,\mathrm{d}x + \int_{-1}^{1} 2x\,\mathrm{d}x = \dfrac{8}{3} + 0$。
* **一般函数也能用**：拆成奇的部分和偶的部分，奇的部分直接为 $0$。

#### 2. 周期性：每个周期的面积都一样
* **例**：$\displaystyle\int_0^{n\pi} |\sin x|\,\mathrm{d}x$：$|\sin x|$ 以 $\pi$ 为周期，每个周期面积 $2$，共 $2n$。
* **起点随便选**：$\displaystyle\int_a^{a+T} f(x)\,\mathrm{d}x$ 与 $a$ 无关，可以挑一个好算的周期，如把 $\left[\dfrac{\pi}{2}, \dfrac{5\pi}{2}\right]$ 换成 $[0, 2\pi]$。

#### 3. 区间再现：把区间左右翻过来，积分不变
* **画面**：$x \mapsto a + b - x$ 把区间左右翻转；翻过来的图形，面积不变。
* **例**：$\displaystyle\int_0^{\frac{\pi}{2}} \dfrac{\sin x}{\sin x + \cos x}\,\mathrm{d}x$：
  * 翻过来，被积函数变成 $\dfrac{\cos x}{\cos x + \sin x}$，积分不变；
  * 两式相加，被积函数是 $1$，和为 $\dfrac{\pi}{2}$，所以原式 $= \dfrac{\pi}{4}$。
* **「提出 $x$」从哪来**：$\displaystyle\int_0^{\pi} xf(\sin x)\,\mathrm{d}x$ 翻过来是 $\displaystyle\int_0^{\pi} (\pi - x)f(\sin x)\,\mathrm{d}x$，两式相加，$x$ 消掉了。

**点火公式（查表）**

#### 1. 华里士公式（点火公式）：从 n 开始，隔一个往下乘
* **怎么写**：$I_6 = \dfrac{5}{6} \cdot \dfrac{3}{4} \cdot \dfrac{1}{2} \cdot \dfrac{\pi}{2} = \dfrac{5\pi}{32}$：分子从 $n - 1$ 开始，分母从 $n$ 开始，每次各减 $2$；$n$ 是偶数，最后乘 $\dfrac{\pi}{2}$，奇数不乘。
* **递推从哪来**：$I_n = \displaystyle\int_0^{\frac{\pi}{2}} \sin^{n-1}x \cdot \sin x\,\mathrm{d}x$，分部一次，出现 $\cos^2 x = 1 - \sin^2 x$，得 $I_n = (n - 1)(I_{n-2} - I_n)$，移项。
* **只在 $\left[0, \dfrac{\pi}{2}\right]$ 上成立**：其他区间，先用对称性化过来。

**⑤ 区间无穷、函数无界**

**怎么算**

#### 1. 牛顿-莱布尼茨公式照用：端点处取极限
* **例**：$\displaystyle\int_0^{+\infty} e^{-x}\,\mathrm{d}x = -e^{-x}\Big|_0^{+\infty} = 0 - (-1) = 1$。
* **$F(+\infty)$ 不存在，就是发散**：$\displaystyle\int_0^{+\infty} \cos x\,\mathrm{d}x = \sin x\Big|_0^{+\infty}$，$\sin x$ 在无穷远处没有极限，发散。

**怎么判敛散**

#### 1. 两个基本的反常积分（$p$ 积分）：趋于 0 要快，趋于 ∞ 要慢
* **算一遍**：$p \ne 1$ 时，$\displaystyle\int_1^t \dfrac{\mathrm{d}x}{x^p} = \dfrac{t^{1-p} - 1}{1 - p}$：
  * $p > 1$：$t^{1-p} \to 0$，收敛于 $\dfrac{1}{p - 1}$；
  * $p < 1$：$t^{1-p} \to +\infty$，发散。
* **两个方向正好相反**：无穷远处要 $p > 1$，瑕点处要 $p < 1$；$p = 1$ 两头都发散。
* **例**：$\dfrac{1}{\sqrt{x}}$ 在 $[1, +\infty)$ 上发散，在 $(0, 1]$ 上收敛。

#### 2. 比较判别法：不算积分，拿去和 p 积分比
* **思路**：非负函数，小的跟着大的走：大的收敛，小的也收敛；小的发散，大的也发散。
* **极限形式的意思**：$\dfrac{f}{g} \to l$（$0 < l < +\infty$），说明在问题点附近 $f$ 约是 $g$ 的 $l$ 倍，收敛性相同；这和第 1 章的等价无穷小是一回事。
* **例**：$\displaystyle\int_1^{+\infty} \dfrac{\mathrm{d}x}{\sqrt{x^3 + 1}}$：$x \to +\infty$ 时被积函数 $\sim \dfrac{1}{x^{3/2}}$，$p = \dfrac{3}{2} > 1$，收敛。
* **非负不能少**：有正有负的函数，先看它的绝对值。

#### 3. 极限形式的两端（边界）：比出 0 或 ∞，只能推一个方向
* **$l = 0$**：$f$ 比 $g$ 小得多；大的 $g$ 收敛，小的 $f$ 才跟着收敛。
* **$l = +\infty$**：$f$ 比 $g$ 大得多；小的 $g$ 发散，大的 $f$ 才跟着发散。
* **含 $\ln x$ 时就要用它**：
  * $\dfrac{\ln x}{x^2}$ 和 $\dfrac{1}{x^2}$ 比，$l = +\infty$，而 $\dfrac{1}{x^2}$ 收敛——推不出；
  * 改和 $\dfrac{1}{x^{3/2}}$ 比，$l = 0$，而 $\dfrac{1}{x^{3/2}}$ 收敛，所以收敛。

**⑥ 什么量能用积分算**

**几何量（查表）**

#### 1. 平面图形的面积：上减下，或右减左
* **竖着切还是横着切**：$y^2 = x$ 与 $y = x - 2$ 围成的图形：
  * 竖着切，左边一段的上下边界和右边一段不同，要分两段；
  * 横着切，右边界都是 $x = y + 2$，左边界都是 $x = y^2$，$\displaystyle\int_{-1}^{2} \left[(y + 2) - y^2\right]\mathrm{d}y = \dfrac{9}{2}$，一次算完。
* **极坐标为什么是 $\dfrac{1}{2}r^2\,\mathrm{d}\theta$**：细扇形近似一个半径 $r$、圆心角 $\mathrm{d}\theta$ 的扇形，面积 $\dfrac{1}{2}r^2\,\mathrm{d}\theta$。
* **参数方程**：把 $\displaystyle\int y\,\mathrm{d}x$ 里的 $y$、$\mathrm{d}x$ 都换成 $t$ 的式子；如摆线 $x = a(t - \sin t)$，$y = a(1 - \cos t)$ 的一拱与 $x$ 轴围成的面积 $\displaystyle\int_0^{2\pi} a^2(1 - \cos t)^2\,\mathrm{d}t = 3\pi a^2$。

#### 2. 立体的体积：圆片、柱壳、截面
* **圆片**：绕 $x$ 轴，在 $x$ 处切一片，是半径 $|f(x)|$、厚 $\mathrm{d}x$ 的圆片，$\mathrm{d}V = \pi f^2(x)\,\mathrm{d}x$。
* **柱壳**：绕 $y$ 轴，$x$ 处一条竖的细条转一圈，是半径 $x$、高 $|f(x)|$、厚 $\mathrm{d}x$ 的薄圆筒；剪开摊平，近似一块薄板，$\mathrm{d}V = 2\pi x|f(x)|\,\mathrm{d}x$。
* **例：球的体积**：$y = \sqrt{R^2 - x^2}$ 绕 $x$ 轴，$\pi\displaystyle\int_{-R}^{R} (R^2 - x^2)\,\mathrm{d}x = \dfrac{4}{3}\pi R^3$。
* **截面已知**：圆片是它的特例，截面面积 $A(x) = \pi f^2(x)$。

#### 3. 平面曲线的弧长：一小段弧，近似成斜边
* **从哪来**：$\mathrm{d}s = \sqrt{(\mathrm{d}x)^2 + (\mathrm{d}y)^2}$；提出 $\mathrm{d}x$，得 $\sqrt{1 + y'^2}\,\mathrm{d}x$；参数方程提出 $\mathrm{d}t$；极坐标代入 $x = r\cos\theta$、$y = r\sin\theta$。
* **例**：圆 $x = R\cos t$，$y = R\sin t$：$\displaystyle\int_0^{2\pi} \sqrt{R^2\sin^2 t + R^2\cos^2 t}\,\mathrm{d}t = 2\pi R$。

#### 4. 旋转曲面的面积：一小段弧转一圈，是一条细带
* **从哪来**：长 $\mathrm{d}s$ 的一小段弧绕 $x$ 轴转一圈，是周长 $2\pi|y|$、宽 $\mathrm{d}s$ 的细带，$\mathrm{d}S = 2\pi|y|\,\mathrm{d}s$。
* **例：球面**：$y = \sqrt{R^2 - x^2}$，$\mathrm{d}s = \dfrac{R}{\sqrt{R^2 - x^2}}\,\mathrm{d}x$，$S = \displaystyle\int_{-R}^{R} 2\pi R\,\mathrm{d}x = 4\pi R^2$。

**物理量（查表）**

#### 1. 变力沿直线做功：力乘距离，力在变就切细
* **例：弹簧**：$F = kx$，从 $0$ 拉到 $l$，$W = \displaystyle\int_0^l kx\,\mathrm{d}x = \dfrac{1}{2}kl^2$。
* **抽水为什么要切成薄层**：每一层要提升的距离不同；深度 $x$ 的那一层提到液面，提升 $x$，重 $\rho gA(x)\,\mathrm{d}x$。

#### 2. 液体的静压力：压强随深度变，所以横着切
* **从哪来**：压强 $= \rho gx$，同一深度处处相同；深度 $x$ 处宽 $l(x)$、高 $\mathrm{d}x$ 的横条，压力 $\rho gx\,l(x)\,\mathrm{d}x$。
* **不能直接用压强乘面积**：压强随深度变，不是一个数。

---

### 〔例题〕

**① 曲边的面积怎么算**

#### 例题 1：不算积分，比较、估值、认和式

**题目**：
1. 比较 $I_1 = \displaystyle\int_0^1 \ln(1 + x)\,\mathrm{d}x$、$I_2 = \displaystyle\int_0^1 x\,\mathrm{d}x$、$I_3 = \displaystyle\int_0^1 \dfrac{x}{1 + x}\,\mathrm{d}x$ 的大小；
2. 估计 $\displaystyle\int_0^2 e^{x^2 - x}\,\mathrm{d}x$ 的范围；
3. 求 $\lim\limits_{n \to \infty} \displaystyle\sum_{i=1}^{n} \dfrac{n}{n^2 + i^2}$；
4. 求 $\lim\limits_{n \to \infty} \displaystyle\sum_{i=1}^{n} \dfrac{\sin\frac{i\pi}{n}}{n + \frac{1}{i}}$。
##### 【小题 1】比较被积函数
* 三个积分区间相同，只比被积函数；
* $x \ge 0$ 时 $\dfrac{x}{1 + x} \le \ln(1 + x) \le x$，在 $(0, 1]$ 上严格成立；
* 所以 $I_3 < I_1 < I_2$。
* **细节**：
  * 两个不等式都可以作差求导证明：$x - \ln(1 + x)$ 与 $\ln(1 + x) - \dfrac{x}{1 + x}$ 都在 $0$ 处为 $0$，导数都 $\ge 0$；
  * 被积函数连续、不恒相等，积分才是严格不等号。
##### 【小题 2】估值
* 求 $f(x) = e^{x^2 - x}$ 在 $[0, 2]$ 上的最值：指数 $x^2 - x$ 在 $x = \dfrac{1}{2}$ 处最小，为 $-\dfrac{1}{4}$；在端点 $x = 2$ 处最大，为 $2$；
* 区间长 $2$，所以 $2e^{-\frac{1}{4}} \le \displaystyle\int_0^2 e^{x^2 - x}\,\mathrm{d}x \le 2e^2$。
* **细节**：最值要把驻点和两个端点放在一起比；$x = 0$ 处指数为 $0$，比 $x = 2$ 处小。
##### 【小题 3】认出 f(i/n)
* 提出 $\dfrac{1}{n}$：$\dfrac{n}{n^2 + i^2} = \dfrac{1}{n} \cdot \dfrac{1}{1 + \left(\frac{i}{n}\right)^2}$；
* 所以极限为 $\displaystyle\int_0^1 \dfrac{\mathrm{d}x}{1 + x^2} = \dfrac{\pi}{4}$。
* **细节**：分子分母同除以 $n^2$，让 $i$ 只以 $\dfrac{i}{n}$ 的样子出现。
##### 【小题 4】写不成 f(i/n)，先夹逼
* 分母里的 $\dfrac{1}{i}$ 让它写不成 $\dfrac{1}{n}f\left(\dfrac{i}{n}\right)$；
* 放缩：$n < n + \dfrac{1}{i} \le n + 1$，而 $\sin\dfrac{i\pi}{n} \ge 0$，所以
  $$\dfrac{1}{n + 1}\sum_{i=1}^{n} \sin\dfrac{i\pi}{n} \le \text{原式} \le \dfrac{1}{n}\sum_{i=1}^{n} \sin\dfrac{i\pi}{n}$$
* 右边 $\to \displaystyle\int_0^1 \sin\pi x\,\mathrm{d}x = \dfrac{2}{\pi}$；左边是右边乘 $\dfrac{n}{n + 1}$，也 $\to \dfrac{2}{\pi}$；
* 原式 $= \dfrac{2}{\pi}$。
* **细节**：放缩时只动「碍事」的那一点，保留 $\sin\dfrac{i\pi}{n}$ 不动，两边才都能写成和式的极限。

---

**② 面积怎么随右端变**

#### 例题 2：一个变限积分，四个问题

**题目**：设 $G(x) = \displaystyle\int_0^x (x - t)\sin t\,\mathrm{d}t$。
1. 求 $G'(x)$、$G''(x)$；
2. 求 $\lim\limits_{x \to 0} \dfrac{G(x)}{x^3}$；
3. 判断 $G(x)$ 的奇偶性；
4. 判断 $G(x)$ 的单调性，有没有极值。
##### 【小题 1】先把 x 移出积分号
* 拆开：$G(x) = x\displaystyle\int_0^x \sin t\,\mathrm{d}t - \int_0^x t\sin t\,\mathrm{d}t$；
* 求导：$G'(x) = \displaystyle\int_0^x \sin t\,\mathrm{d}t + x\sin x - x\sin x = \int_0^x \sin t\,\mathrm{d}t = 1 - \cos x$；
* $G''(x) = \sin x$。
* **细节**：第一项是乘积，求导得两项；其中 $x\sin x$ 正好和第二项的导数抵消。
##### 【小题 2】等价无穷小
* $G'(x) = 1 - \cos x \sim \dfrac{x^2}{2}$，而 $G(0) = 0$，所以 $G(x) = \displaystyle\int_0^x G'(s)\,\mathrm{d}s \sim \dfrac{x^3}{6}$；
* 极限为 $\dfrac{1}{6}$。
* **细节**：
  * 用洛必达也行：$\dfrac{G}{x^3} \to \dfrac{G'}{3x^2} = \dfrac{1 - \cos x}{3x^2} \to \dfrac{1}{6}$；
  * 直接算出 $G(x) = x - \sin x$，也得 $\dfrac{1}{6}$；三种做法互相验证。
##### 【小题 3】奇偶性用两次
* $G''(x) = \sin x$ 是奇函数，所以 $G'(x) = \displaystyle\int_0^x \sin t\,\mathrm{d}t$ 是偶函数；
* $G'(x)$ 是偶函数，且 $G(0) = 0$，$G(x) = \displaystyle\int_0^x G'(s)\,\mathrm{d}s$，下限为 $0$，所以 $G$ 是奇函数。
* **细节**：偶函数积分得奇函数，要求下限是 $0$；这里 $G(0) = 0$ 正好满足。
##### 【小题 4】看导数的符号
* $G'(x) = 1 - \cos x \ge 0$，只在 $x = 2k\pi$ 处等于 $0$；
* 所以 $G$ 在 $(-\infty, +\infty)$ 上单调增加，没有极值。
* **细节**：导数等于 $0$ 的点，导数在两侧不变号，就不是极值点；这些点只是孤立的点，不影响单调增加。

#### 例题 3：间断点处的原函数与变限积分

**题目**：设 $f(x) = \begin{cases} e^x, & x < 0 \\ x + b, & x \ge 0 \end{cases}$，$\Phi(x) = \displaystyle\int_0^x f(t)\,\mathrm{d}t$。
1. 讨论 $f(x)$ 在 $(-1, 1)$ 上有没有原函数；
2. 讨论 $\Phi(x)$ 在 $x = 0$ 处的可导性；
3. 当 $b = 1$ 时，求 $\displaystyle\int f(x)\,\mathrm{d}x$；
4. 当 $b = 1$，但把 $f(0)$ 改成 $2$ 时，重新回答 1、2。
##### 【小题 1】先看 0 处的间断类型
* $f(0^-) = 1$，$f(0^+) = f(0) = b$；
* **若 $b = 1$**：$f$ 在 $0$ 处连续，在 $(-1, 1)$ 上处处连续，有原函数；
* **若 $b \ne 1$**：$0$ 是跳跃间断点，没有原函数。
* **细节**：判断有没有原函数，只需找第一类间断点和无穷间断点，不必真的去求。
##### 【小题 2】左右导数
* $x < 0$：$\Phi(x) = \displaystyle\int_0^x e^t\,\mathrm{d}t = e^x - 1$，$\Phi'_-(0) = 1$；
* $x \ge 0$：$\Phi(x) = \displaystyle\int_0^x (t + b)\,\mathrm{d}t = \dfrac{x^2}{2} + bx$，$\Phi'_+(0) = b$；
* **若 $b = 1$**：左右导数都是 $1$，$\Phi$ 在 $0$ 处可导，$\Phi'(0) = 1 = f(0)$；
* **若 $b \ne 1$**：$\Phi$ 在 $0$ 处连续，但左右导数不等，不可导。
* **细节**：$x < 0$ 时积分从 $0$ 积到 $x$，上限比下限小，照样按牛顿-莱布尼茨公式算：$e^x - e^0$。
##### 【小题 3】分段积分，再接上
* $x < 0$：$\displaystyle\int e^x\,\mathrm{d}x = e^x + C_1$；$x > 0$：$\displaystyle\int (x + 1)\,\mathrm{d}x = \dfrac{x^2}{2} + x + C_2$；
* 原函数必须连续：在 $0$ 处 $1 + C_1 = C_2$；
* 取 $C_1 = C$：$\displaystyle\int f(x)\,\mathrm{d}x = \begin{cases} e^x + C, & x < 0 \\ \dfrac{x^2}{2} + x + 1 + C, & x \ge 0 \end{cases}$。
* **细节**：两段的常数不能各取各的；接上以后只剩一个任意常数 $C$。
##### 【小题 4】改一个点的值
* $f(0) = 2$，而 $f(0^-) = f(0^+) = 1$，$0$ 变成可去间断点；
* 有没有原函数：有可去间断点，没有；
* $\Phi$ 的可导性：改一个点的值，积分不变，$\Phi$ 与 $b = 1$ 时完全相同，在 $0$ 处可导，$\Phi'(0) = 1$；但 $\Phi'(0) \ne f(0) = 2$，所以 $\Phi$ 不是 $f$ 的原函数。
* **细节**：$\Phi$ 可导，不等于 $\Phi$ 是原函数；还要每一点都有 $\Phi' = f$。

#### 例题 4：含积分的方程与不等式

**题目**：
1. $f(x)$ 连续，且 $f(x) = x^2 + x\displaystyle\int_0^1 f(t)\,\mathrm{d}t$，求 $f(x)$；
2. $f(x)$ 连续，且 $f(x) = 2 + \displaystyle\int_0^x tf(t)\,\mathrm{d}t$，求 $f(x)$；
3. $f(x)$ 在 $[0, 1]$ 上连续、单调减少，$0 < a < 1$，证明 $\displaystyle\int_0^a f(x)\,\mathrm{d}x \ge a\int_0^1 f(x)\,\mathrm{d}x$。
##### 【小题 1】定积分是一个数
* 设 $A = \displaystyle\int_0^1 f(t)\,\mathrm{d}t$，则 $f(x) = x^2 + Ax$；
* 两边在 $[0, 1]$ 上积分：$A = \dfrac{1}{3} + \dfrac{A}{2}$，$A = \dfrac{2}{3}$；
* $f(x) = x^2 + \dfrac{2}{3}x$。
* **细节**：$\displaystyle\int_0^1 f(t)\,\mathrm{d}t$ 里的 $t$ 积完就没有了，它不随 $x$ 变，是常数。
##### 【小题 2】变限积分，求导化成微分方程
* 两边求导：$f'(x) = xf(x)$；
* 初始条件：令 $x = 0$，积分为 $0$，$f(0) = 2$；
* 分离变量：$\dfrac{f'}{f} = x$，$\ln|f| = \dfrac{x^2}{2} + C$，代入 $f(0) = 2$，得 $f(x) = 2e^{\frac{x^2}{2}}$。
* **细节**：求导会丢掉常数，初始条件要回到原方程里找；令 $x$ 等于积分下限，积分就消失了。
##### 【小题 3】两段的平均值
* 要证的式子两边除以 $a$：$\dfrac{1}{a}\displaystyle\int_0^a f(x)\,\mathrm{d}x \ge \int_0^1 f(x)\,\mathrm{d}x$——前一段的平均值，不小于整段的平均值；
* 令 $\varphi(x) = \dfrac{1}{x}\displaystyle\int_0^x f(t)\,\mathrm{d}t$（$0 < x \le 1$），它是 $[0, x]$ 上的平均值；
* 求导：$\varphi'(x) = \dfrac{xf(x) - \int_0^x f(t)\,\mathrm{d}t}{x^2} = \dfrac{1}{x^2}\displaystyle\int_0^x [f(x) - f(t)]\,\mathrm{d}t \le 0$（$f$ 单调减少，$t \le x$ 时 $f(t) \ge f(x)$）；
* $\varphi$ 单调不增，$\varphi(a) \ge \varphi(1)$，即得结论。
* **细节**：
  * 用速度来想：速度越来越慢，前一段的平均速度当然不小于全程的平均速度；
  * $xf(x)$ 写成 $\displaystyle\int_0^x f(x)\,\mathrm{d}t$，两个积分才能合并成一个。

---

**③ 原函数怎么找**

#### 例题 5：把求导倒过来

**题目**：求
1. $\displaystyle\int \dfrac{\mathrm{d}x}{x(1 + \ln^2 x)}$；
2. $\displaystyle\int \dfrac{\sin x\cos x}{1 + \sin^4 x}\,\mathrm{d}x$；
3. $\displaystyle\int x\arctan x\,\mathrm{d}x$；
4. $\displaystyle\int e^x\cos x\,\mathrm{d}x$。
##### 【小题 1】凑出 ln x
* $\dfrac{\mathrm{d}x}{x} = \mathrm{d}(\ln x)$；
* 原式 $= \displaystyle\int \dfrac{\mathrm{d}(\ln x)}{1 + (\ln x)^2} = \arctan(\ln x) + C$。
* **细节**：看到 $\dfrac{1}{x}$ 和 $\ln x$ 同时出现，先试 $\mathrm{d}(\ln x)$。
##### 【小题 2】凑两次
* $\sin x\cos x\,\mathrm{d}x = \sin x\,\mathrm{d}(\sin x) = \dfrac{1}{2}\mathrm{d}(\sin^2 x)$；
* 令 $u = \sin^2 x$：原式 $= \dfrac{1}{2}\displaystyle\int \dfrac{\mathrm{d}u}{1 + u^2} = \dfrac{1}{2}\arctan(\sin^2 x) + C$。
* **细节**：分母是 $\sin^4 x = (\sin^2 x)^2$，所以要凑的是 $\sin^2 x$，不是 $\sin x$。
##### 【小题 3】反三角作 u
* 按「反对幂指三」，$u = \arctan x$，$\mathrm{d}v = x\,\mathrm{d}x$，取 $v = \dfrac{x^2 + 1}{2}$；
* 原式 $= \dfrac{x^2 + 1}{2}\arctan x - \displaystyle\int \dfrac{x^2 + 1}{2} \cdot \dfrac{1}{1 + x^2}\,\mathrm{d}x = \dfrac{x^2 + 1}{2}\arctan x - \dfrac{x}{2} + C$。
* **细节**：$v$ 可以加任意常数；取 $\dfrac{x^2 + 1}{2}$ 而不是 $\dfrac{x^2}{2}$，正好和 $\dfrac{1}{1 + x^2}$ 约掉。
##### 【小题 4】循环，移项
* 记 $I = \displaystyle\int e^x\cos x\,\mathrm{d}x$；
* 分部一次：$I = e^x\cos x + \displaystyle\int e^x\sin x\,\mathrm{d}x$；再分部：$\displaystyle\int e^x\sin x\,\mathrm{d}x = e^x\sin x - I$；
* 所以 $I = e^x\cos x + e^x\sin x - I$，$I = \dfrac{e^x(\sin x + \cos x)}{2} + C$。
* **细节**：两次分部要让同一类函数作 $u$（都让 $e^x$ 进 $\mathrm{d}v$）；第二次换了，就会退回原式，得到恒等式 $I = I$。

#### 例题 6：化成能积的形式

**题目**：求
1. $\displaystyle\int \dfrac{\mathrm{d}x}{(1 + x^2)^{3/2}}$；
2. $\displaystyle\int \dfrac{\mathrm{d}x}{1 + \sqrt{x}}$；
3. $\displaystyle\int \dfrac{\mathrm{d}x}{x(x^2 + 1)}$；
4. $\displaystyle\int \dfrac{\mathrm{d}x}{2 + \sin x}$。
##### 【小题 1】三角代换
* 含 $1 + x^2$，令 $x = \tan t$，$\mathrm{d}x = \sec^2 t\,\mathrm{d}t$，$(1 + x^2)^{3/2} = \sec^3 t$；
* 原式 $= \displaystyle\int \cos t\,\mathrm{d}t = \sin t + C$；
* 画三角形：对边 $x$、邻边 $1$、斜边 $\sqrt{1 + x^2}$，$\sin t = \dfrac{x}{\sqrt{1 + x^2}}$；原式 $= \dfrac{x}{\sqrt{1 + x^2}} + C$。
* **细节**：不定积分最后要换回 $x$；用三角形读，比用反三角函数硬算快。
##### 【小题 2】根式代换
* 令 $t = \sqrt{x}$，$x = t^2$，$\mathrm{d}x = 2t\,\mathrm{d}t$；
* 原式 $= \displaystyle\int \dfrac{2t}{1 + t}\,\mathrm{d}t = \int \left(2 - \dfrac{2}{1 + t}\right)\mathrm{d}t = 2t - 2\ln(1 + t) + C = 2\sqrt{x} - 2\ln(1 + \sqrt{x}) + C$。
* **细节**：换元后是假分式，先除出多项式部分。
##### 【小题 3】二次因式那一项
* 拆：$\dfrac{1}{x(x^2 + 1)} = \dfrac{A}{x} + \dfrac{Mx + N}{x^2 + 1}$；令 $x = 0$ 得 $A = 1$；比较系数得 $M = -1$，$N = 0$；
* 原式 $= \displaystyle\int \left(\dfrac{1}{x} - \dfrac{x}{x^2 + 1}\right)\mathrm{d}x = \ln|x| - \dfrac{1}{2}\ln(x^2 + 1) + C$。
* **细节**：$\dfrac{x}{x^2 + 1}$ 的分子正好是分母导数的一半，凑微分得 $\ln$；若分子还有常数项，那一部分积出 $\arctan$。
##### 【小题 4】先试恒等变形，不行再用万能代换
* **若能用倍角公式化简**（如 $\displaystyle\int \dfrac{\mathrm{d}x}{1 + \cos x}$）：$1 + \cos x = 2\cos^2\dfrac{x}{2}$，得 $\tan\dfrac{x}{2} + C$；
* **若不能**（本题 $2 + \sin x$）：令 $t = \tan\dfrac{x}{2}$，$\sin x = \dfrac{2t}{1 + t^2}$，$\mathrm{d}x = \dfrac{2\,\mathrm{d}t}{1 + t^2}$：
  * 原式 $= \displaystyle\int \dfrac{2\,\mathrm{d}t}{2(1 + t^2) + 2t} = \int \dfrac{\mathrm{d}t}{t^2 + t + 1}$；
  * 配方 $t^2 + t + 1 = \left(t + \dfrac{1}{2}\right)^2 + \dfrac{3}{4}$，得 $\dfrac{2}{\sqrt{3}}\arctan\dfrac{2t + 1}{\sqrt{3}} + C$；
  * 换回：原式 $= \dfrac{2}{\sqrt{3}}\arctan\dfrac{2\tan\frac{x}{2} + 1}{\sqrt{3}} + C$。
* **细节**：万能代换后分母的 $1 + t^2$ 要通分消掉；剩下的二次式配方，积出 $\arctan$。

---

**④ 定积分怎么算更省事**

#### 例题 7：借区间省事

**题目**：求
1. $\displaystyle\int_{-1}^{1} \dfrac{x^3 + |x|}{1 + x^2}\,\mathrm{d}x$；
2. $\displaystyle\int_0^{\frac{\pi}{2}} \sin^5 x\cos^2 x\,\mathrm{d}x$；
3. $\displaystyle\int_0^{n\pi} x|\sin x|\,\mathrm{d}x$（$n$ 为正整数）；
4. $\displaystyle\int_0^1 \dfrac{\ln(1 + x)}{1 + x^2}\,\mathrm{d}x$。
##### 【小题 1】拆成奇、偶两部分
* $\dfrac{x^3}{1 + x^2}$ 是奇函数，积分为 $0$；
* $\dfrac{|x|}{1 + x^2}$ 是偶函数：$2\displaystyle\int_0^1 \dfrac{x}{1 + x^2}\,\mathrm{d}x = \ln(1 + x^2)\Big|_0^1 = \ln 2$；
* 原式 $= \ln 2$。
* **细节**：化成 $[0, 1]$ 后，$|x| = x$，绝对值自然去掉了。
##### 【小题 2】化成点火公式
* $\cos^2 x = 1 - \sin^2 x$：原式 $= I_5 - I_7$；
* $I_5 = \dfrac{4}{5} \cdot \dfrac{2}{3} = \dfrac{8}{15}$，$I_7 = \dfrac{6}{7}I_5 = \dfrac{16}{35}$；
* 原式 $= \dfrac{8}{15} - \dfrac{16}{35} = \dfrac{8}{105}$。
* **细节**：$n$ 是奇数，最后不乘 $\dfrac{\pi}{2}$。
##### 【小题 3】先拆周期，再提出 x
* 按周期拆开：第 $k$ 段（$k = 0, 1, \dots, n - 1$）令 $x = t + k\pi$：
  $$\int_{k\pi}^{(k+1)\pi} x|\sin x|\,\mathrm{d}x = \int_0^{\pi} (t + k\pi)\sin t\,\mathrm{d}t$$
* 「提出 $x$」：$\displaystyle\int_0^{\pi} t\sin t\,\mathrm{d}t = \dfrac{\pi}{2}\int_0^{\pi} \sin t\,\mathrm{d}t = \pi$；所以第 $k$ 段 $= \pi + 2k\pi = (2k + 1)\pi$；
* 求和：$\pi\displaystyle\sum_{k=0}^{n-1} (2k + 1) = n^2\pi$。
* **细节**：$x|\sin x|$ 不是周期函数（多了因子 $x$），不能直接乘 $n$；要逐段平移，多出的 $k\pi$ 单独积。
##### 【小题 4】换元后区间再现
* 令 $x = \tan t$：$x$ 从 $0$ 到 $1$，$t$ 从 $0$ 到 $\dfrac{\pi}{4}$；$\dfrac{\mathrm{d}x}{1 + x^2} = \mathrm{d}t$，原式 $= \displaystyle\int_0^{\frac{\pi}{4}} \ln(1 + \tan t)\,\mathrm{d}t$；
* 区间再现，$t$ 换成 $\dfrac{\pi}{4} - t$：$1 + \tan\left(\dfrac{\pi}{4} - t\right) = \dfrac{2}{1 + \tan t}$；
* 所以原式 $= \displaystyle\int_0^{\frac{\pi}{4}} \left[\ln 2 - \ln(1 + \tan t)\right]\mathrm{d}t = \dfrac{\pi}{4}\ln 2 - \text{原式}$，原式 $= \dfrac{\pi}{8}\ln 2$。
* **细节**：$\ln(1 + \tan t)$ 没有初等的原函数也没关系；区间再现以后，它和自己抵消了。

#### 例题 8：换元换限、绝对值、变限积分在被积函数里

**题目**：
1. 求 $\displaystyle\int_0^{\ln 2} \sqrt{e^x - 1}\,\mathrm{d}x$；
2. 求 $\displaystyle\int_0^2 x|x - 1|\,\mathrm{d}x$；
3. $f''(x)$ 连续，$f(0) = 1$，$f(1) = 2$，$f'(1) = 3$，求 $\displaystyle\int_0^1 xf''(x)\,\mathrm{d}x$；
4. 设 $f(x) = \displaystyle\int_0^x \dfrac{\sin t}{\pi - t}\,\mathrm{d}t$，求 $\displaystyle\int_0^{\pi} f(x)\,\mathrm{d}x$。
##### 【小题 1】换元同时换限
* 令 $t = \sqrt{e^x - 1}$，$x = \ln(1 + t^2)$，$\mathrm{d}x = \dfrac{2t}{1 + t^2}\,\mathrm{d}t$；$x$ 从 $0$ 到 $\ln 2$，$t$ 从 $0$ 到 $1$；
* 原式 $= \displaystyle\int_0^1 \dfrac{2t^2}{1 + t^2}\,\mathrm{d}t = \int_0^1 \left(2 - \dfrac{2}{1 + t^2}\right)\mathrm{d}t = 2 - \dfrac{\pi}{2}$。
* **细节**：上限 $x = \ln 2$ 对应 $t = \sqrt{2 - 1} = 1$；算完直接是数，不用换回 $x$。
##### 【小题 2】在 1 处拆开
* $\displaystyle\int_0^1 x(1 - x)\,\mathrm{d}x = \dfrac{1}{6}$，$\displaystyle\int_1^2 x(x - 1)\,\mathrm{d}x = \dfrac{5}{6}$；
* 原式 $= 1$。
* **细节**：绝对值里的式子在哪里变号，就在哪里拆开。
##### 【小题 3】分部，把导数转走
* $\displaystyle\int_0^1 xf''(x)\,\mathrm{d}x = xf'(x)\Big|_0^1 - \int_0^1 f'(x)\,\mathrm{d}x = f'(1) - [f(1) - f(0)]$；
* $= 3 - (2 - 1) = 2$。
* **细节**：$f$ 不知道，就让导数落在已知的函数上：$x$ 求导变成 $1$，剩下 $f'$ 的积分就是 $f$ 的增量。
##### 【小题 4】变限积分作 u，选 v 让边界项消失
* $u = f(x)$，$\mathrm{d}v = \mathrm{d}x$，取 $v = x - \pi$：
  $$\begin{aligned} &\int_0^{\pi} f(x)\,\mathrm{d}x \\ = {} &(x - \pi)f(x)\Big|_0^{\pi} - \int_0^{\pi} (x - \pi)\dfrac{\sin x}{\pi - x}\,\mathrm{d}x \end{aligned}$$
* 边界项：$x = \pi$ 时 $x - \pi = 0$，$x = 0$ 时 $f(0) = 0$，都为 $0$；
* 剩下 $\displaystyle\int_0^{\pi} \sin x\,\mathrm{d}x = 2$。
* **细节**：$f(x)$ 本身写不出来，但 $f'(x) = \dfrac{\sin x}{\pi - x}$ 写得出来；分部让它出现，$\pi - x$ 正好约掉。

---

**⑤ 区间无穷、函数无界**

#### 例题 9：计算与判断敛散

**题目**：
1. 求 $\displaystyle\int_1^{+\infty} \dfrac{\mathrm{d}x}{x(1 + x)}$；
2. 计算 $\displaystyle\int_0^2 \dfrac{\mathrm{d}x}{(x - 1)^2}$；
3. 讨论 $\displaystyle\int_0^{+\infty} \dfrac{\ln(1 + x)}{x^p}\,\mathrm{d}x$ 的敛散性；
4. 判断 $\displaystyle\int_{-\infty}^{+\infty} \dfrac{x}{1 + x^2}\,\mathrm{d}x$ 是否收敛。
##### 【小题 1】先求原函数，再取极限
* $\dfrac{1}{x(1 + x)} = \dfrac{1}{x} - \dfrac{1}{1 + x}$，原函数 $\ln\dfrac{x}{1 + x}$；
* $x \to +\infty$ 时 $\ln\dfrac{x}{1 + x} \to 0$，所以原式 $= 0 - \ln\dfrac{1}{2} = \ln 2$。
* **细节**：$\displaystyle\int_1^{+\infty} \dfrac{\mathrm{d}x}{x}$ 和 $\displaystyle\int_1^{+\infty} \dfrac{\mathrm{d}x}{1 + x}$ 都发散，不能拆成两个积分分别算；要合成 $\ln\dfrac{x}{1 + x}$ 再取极限。
##### 【小题 2】先找瑕点
* $x = 1$ 在区间内部，被积函数在那里趋于 $+\infty$，是瑕点；拆成 $[0, 1]$、$[1, 2]$；
* $\displaystyle\int_0^1 \dfrac{\mathrm{d}x}{(x - 1)^2}$：$p = 2 \ge 1$，发散；所以原式发散。
* **细节**：直接套公式得 $-\dfrac{1}{x - 1}\Big|_0^2 = -2$，被积函数是正的，积分却是负的，说明出错了。
##### 【小题 3】两个问题点，分别比
* 拆成 $(0, 1]$ 与 $[1, +\infty)$；
* **在 $0$ 附近**：$\ln(1 + x) \sim x$，被积函数 $\sim \dfrac{1}{x^{p-1}}$，收敛要求 $p - 1 < 1$，即 $p < 2$；
* **在 $+\infty$ 附近**：
  * 若 $p > 1$：取 $q$ 满足 $1 < q < p$，$\dfrac{\ln(1 + x)/x^p}{1/x^q} = \dfrac{\ln(1 + x)}{x^{p-q}} \to 0$，而 $\displaystyle\int_1^{+\infty} \dfrac{\mathrm{d}x}{x^q}$ 收敛，所以收敛；
  * 若 $p \le 1$：$x \ge 2$ 时 $\ln(1 + x) > 1$，被积函数 $> \dfrac{1}{x^p}$，而 $\displaystyle\int_2^{+\infty} \dfrac{\mathrm{d}x}{x^p}$ 发散，所以发散；
* 两段都收敛：$1 < p < 2$ 时收敛，其余发散。
* **细节**：$\ln$ 比任何正次幂都慢，所以拿一个夹在中间的 $q$ 去比；$p \le 1$ 时直接放缩更快。
##### 【小题 4】两端无穷，各算各的
* $\displaystyle\int_0^{+\infty} \dfrac{x}{1 + x^2}\,\mathrm{d}x = \dfrac{1}{2}\ln(1 + x^2)\Big|_0^{+\infty} = +\infty$，发散；
* 有一半发散，整个就发散。
* **细节**：被积函数是奇函数，但不能说积分为 $0$；奇函数积分为 $0$ 的前提是积分收敛。

---

**⑥ 什么量能用积分算**

#### 例题 10：一块区域，四种体积和面积

**题目**：$D$ 是 $y = x^2$ 与 $y = x$ 围成的区域。
1. 求 $D$ 的面积；
2. 求 $D$ 绕 $x$ 轴旋转所得立体的体积；
3. 求 $D$ 绕 $y$ 轴旋转所得立体的体积；
4. 求 $D$ 绕直线 $y = -1$ 旋转所得立体的体积。
##### 【小题 1】上减下
* 交点 $x = 0$、$x = 1$；在 $[0, 1]$ 上 $x \ge x^2$；
* $A = \displaystyle\int_0^1 (x - x^2)\,\mathrm{d}x = \dfrac{1}{6}$。
* **细节**：先比出谁在上面，被积函数才是正的。
##### 【小题 2】中间空心，外圆减内圆
* $x$ 处的截面是圆环，外半径 $x$，内半径 $x^2$；
* $V = \pi\displaystyle\int_0^1 (x^2 - x^4)\,\mathrm{d}x = \pi\left(\dfrac{1}{3} - \dfrac{1}{5}\right) = \dfrac{2\pi}{15}$。
* **细节**：是 $\pi(x^2 - x^4)$，不是 $\pi(x - x^2)^2$——先各自平方再相减。
##### 【小题 3】柱壳，再用圆片验算
* 柱壳：$x$ 处竖条高 $x - x^2$，半径 $x$：$V = 2\pi\displaystyle\int_0^1 x(x - x^2)\,\mathrm{d}x = 2\pi\left(\dfrac{1}{3} - \dfrac{1}{4}\right) = \dfrac{\pi}{6}$；
* 圆片验算：横着切，$y$ 处外半径 $\sqrt{y}$，内半径 $y$：$\pi\displaystyle\int_0^1 (y - y^2)\,\mathrm{d}y = \dfrac{\pi}{6}$，一致。
* **细节**：两种切法都能做；柱壳不用把 $x$ 解成 $y$ 的函数。
##### 【小题 4】半径是到旋转轴的距离
* 轴是 $y = -1$：外半径 $x - (-1) = x + 1$，内半径 $x^2 + 1$；
* $V = \pi\displaystyle\int_0^1 \left[(x + 1)^2 - (x^2 + 1)^2\right]\mathrm{d}x = \pi\int_0^1 (2x - x^2 - x^4)\,\mathrm{d}x = \pi\left(1 - \dfrac{1}{3} - \dfrac{1}{5}\right) = \dfrac{7\pi}{15}$。
* **细节**：轴不是 $x$ 轴时，半径不再是 $y$ 本身，而是 $y$ 到轴的距离。

#### 例题 11：弧长、极坐标、抽水、压力

**题目**：
1. 求曲线 $y = \dfrac{2}{3}x^{3/2}$（$0 \le x \le 3$）的弧长；
2. 求心形线 $r = a(1 + \cos\theta)$（$a > 0$）围成的面积和全长；
3. 半径为 $R$ 的半球形水池装满水，把水全部抽到池口，求所做的功（水的密度 $\rho$，重力加速度 $g$）；
4. 半径为 $R$ 的半圆形平板铅直放入水中，直径与水面重合，求平板一侧受到的压力。
##### 【小题 1】根号下凑完全平方
* $y' = x^{1/2}$，$\sqrt{1 + y'^2} = \sqrt{1 + x}$；
* $s = \displaystyle\int_0^3 \sqrt{1 + x}\,\mathrm{d}x = \dfrac{2}{3}(1 + x)^{3/2}\Big|_0^3 = \dfrac{2}{3}(8 - 1) = \dfrac{14}{3}$。
* **细节**：弧长题的曲线常被设计成 $1 + y'^2$ 好开方的样子；开不出来，先检查 $y'$ 有没有算错。
##### 【小题 2】极坐标：先定 θ 的范围
* 面积：$\theta$ 从 $0$ 到 $2\pi$，$A = \dfrac{1}{2}\displaystyle\int_0^{2\pi} a^2(1 + \cos\theta)^2\,\mathrm{d}\theta = \dfrac{a^2}{2}(2\pi + 0 + \pi) = \dfrac{3\pi a^2}{2}$；
* 全长：$r^2 + r'^2 = a^2(1 + \cos\theta)^2 + a^2\sin^2\theta = 2a^2(1 + \cos\theta) = 4a^2\cos^2\dfrac{\theta}{2}$；
  $$s = \int_0^{2\pi} 2a\left|\cos\dfrac{\theta}{2}\right|\mathrm{d}\theta = 8a$$
* **细节**：开方得 $\left|\cos\dfrac{\theta}{2}\right|$，绝对值不能丢；也可以只算上半 $[0, \pi]$ 再乘 $2$，那里 $\cos\dfrac{\theta}{2} \ge 0$。
##### 【小题 3】抽水：一层一层地提
* 建坐标：$x$ 轴竖直向下，原点在池口（水面）；
* 深度 $x$ 处的水层是半径 $\sqrt{R^2 - x^2}$ 的薄圆片，重 $\rho g\pi(R^2 - x^2)\,\mathrm{d}x$，提升 $x$；
* $W = \rho g\pi\displaystyle\int_0^R (R^2 - x^2)x\,\mathrm{d}x = \rho g\pi\left(\dfrac{R^4}{2} - \dfrac{R^4}{4}\right) = \dfrac{\pi\rho gR^4}{4}$。
* **细节**：截面半径由球面 $x^2 + r^2 = R^2$ 得出；原点放在水面，提升距离正好是 $x$。
##### 【小题 4】压力：横着切
* 建坐标：$x$ 轴竖直向下，原点在水面的直径中点；深度 $x$ 处平板宽 $2\sqrt{R^2 - x^2}$；
* $P = \rho g\displaystyle\int_0^R x \cdot 2\sqrt{R^2 - x^2}\,\mathrm{d}x = \rho g\left[-\dfrac{2}{3}(R^2 - x^2)^{3/2}\right]_0^R = \dfrac{2}{3}\rho gR^3$。
* **细节**：被积函数里的 $x$ 是深度，也就是压强 $\rho gx$ 里的那个 $x$；$2\sqrt{R^2 - x^2}$ 是这一深度的宽。

---

### 〔提示〕

**① 曲边的面积怎么算**

#### 1. 定积分是一个数，对 x 求导得 0
* $\dfrac{\mathrm{d}}{\mathrm{d}x}\displaystyle\int_0^1 f(x)\,\mathrm{d}x = 0$，不是 $f(x)$；只有积分限里有 $x$，求导才有东西。

#### 2. 保号、比较都要下限小于上限
* $a > b$ 时，$f \ge 0$ 推出的是 $\displaystyle\int_a^b f(x)\,\mathrm{d}x \le 0$；先把积分限换成从小到大。

**② 面积怎么随右端变**

#### 1. 被积函数里有 x，不能直接套求导公式
* $\dfrac{\mathrm{d}}{\mathrm{d}x}\displaystyle\int_0^x xf(t)\,\mathrm{d}t \ne xf(x)$；先提出 $x$，或换元把 $x$ 移到积分限上。

#### 2. 分段求原函数，常数不能各取各的
* 原函数必须连续；各段的常数要在分段点接上，最后只剩一个 $C$。

**③ 原函数怎么找**

#### 1. ∫dx/x = ln|x| + C，绝对值不能丢
* $x < 0$ 时 $\ln x$ 没有意义；$(\ln|x|)' = \dfrac{1}{x}$ 对 $x > 0$、$x < 0$ 都成立。

#### 2. 两种方法结果不同，不一定有错
* $\displaystyle\int \sin x\cos x\,\mathrm{d}x$ 可以得 $\dfrac{\sin^2 x}{2} + C$，也可以得 $-\dfrac{\cos^2 x}{2} + C$；两者只差常数 $\dfrac{1}{2}$。核对的办法是求导。

#### 3. 第二类换元，结果要换回 x
* 不定积分最后要写成 $x$ 的函数；定积分换了限，才不用换回。

**④ 定积分怎么算更省事**

#### 1. 换元要在整个区间上连续可导
* $\displaystyle\int_{-1}^{1} \dfrac{\mathrm{d}x}{1 + x^2}$ 用 $x = \dfrac{1}{t}$，会算出 $-\dfrac{\pi}{2}$；真值是 $\dfrac{\pi}{2}$。原因：$x$ 经过 $0$ 时 $t$ 要跑到无穷，$x = \dfrac{1}{t}$ 在 $[-1, 1]$ 上不连续。

#### 2. 换了变量，积分限一定要换
* 换元后还用原来的上下限，结果就错了；凑微分不写出新变量，才不用换限。

**⑤ 区间无穷、函数无界**

#### 1. 区间里藏着瑕点，不能直接用牛顿-莱布尼茨公式
* $\displaystyle\int_{-1}^{1} \dfrac{\mathrm{d}x}{x^2}$ 直接套公式得 $-2$；被积函数为正，积分不可能为负——它其实发散。

#### 2. 发散的反常积分，不能用奇偶性说它是 0
* $\displaystyle\int_{-\infty}^{+\infty} \dfrac{x}{1 + x^2}\,\mathrm{d}x$ 发散；先判断收敛，收敛了才能用奇偶性。

#### 3. p 积分的两个方向相反
* 无穷远处 $p > 1$ 收敛，瑕点处 $p < 1$ 收敛；记反了，结论正好相反。

**⑥ 什么量能用积分算**

#### 1. 旋转半径是到旋转轴的距离
* 绕 $y = c$ 旋转，半径是 $|f(x) - c|$；绕 $x = c$ 用柱壳，半径是 $|x - c|$。

#### 2. 极坐标弧长是 √(r² + r′²)，不是 √(1 + r′²)
* $\sqrt{1 + y'^2}$ 是直角坐标里的写法；极坐标里多出的 $r^2$ 来自 $\theta$ 变化时点绕原点转动。

#### 3. 旋转曲面要用 ds，不能用 dx
* 用 $\mathrm{d}x$ 算球面，得 $\displaystyle\int_{-R}^{R} 2\pi\sqrt{R^2 - x^2}\,\mathrm{d}x = \pi^2R^2$；正确的是 $4\pi R^2$。细带是斜的，宽是 $\mathrm{d}s$。
