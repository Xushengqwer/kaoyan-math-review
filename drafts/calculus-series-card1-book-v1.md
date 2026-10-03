### 〔定义〕

**本卡主线**：把无穷多个数、无穷多个函数加起来：先说清什么叫有和，再判断收不收敛，最后用它来表示函数。整张卡分三层、六站，每一站由上一站引出：
* **数项级数**：
  * **① 无穷多个数怎么相加**：部分和有极限就收敛，极限就是和；收敛的级数，一般项一定趋于 $0$；
  * **② 全是正项，收不收敛**：部分和单调增加，有界就收敛，所以和 $p$ 级数、等比级数比大小；
  * **③ 有正有负，收不收敛**：取绝对值后收敛，就是绝对收敛；绝对值发散时，交错级数看正负能不能抵消；
* **幂级数**：
  * **④ 幂级数在哪些点收敛**：对一般项取绝对值用比值法，收敛的点是一个区间，端点单独判；
  * **⑤ 幂级数与函数来回换**：逐项求导、逐项积分，与几个已知展开式来回换：求和函数，把函数展开；
* **傅里叶级数**：
  * **⑥ 用正弦余弦来展开**：周期函数用 $\cos nx$、$\sin nx$ 展开，系数由正交性求出，间断点收敛到左右极限的平均；
* **依赖**：数列极限、单调有界准则、等价无穷小（第 1 章）；泰勒公式、用导数判单调（第 2 章）；反常积分的敛散、分部积分、对称区间上奇偶函数的积分（第 3 章）。

**① 无穷多个数怎么相加**

有限个数相加，交换律、结合律随便用；无穷多个数就不行了：$1 - 1 + 1 - 1 + \cdots$，两两加括号得 $0$，错开一项再加括号得 $1$。所以先要规定无穷和是什么：一项一项往上加，得到部分和 $S_n$，看 $S_n$ 有没有极限。有极限就叫收敛，极限就是和；没有就叫发散。这样，级数就是数列 $\{S_n\}$，第 1 章的极限都能用。收敛的级数，一般项一定趋于 $0$，因为 $u_n = S_n - S_{n-1}$，两个部分和趋于同一个数；反过来不对，调和级数的一般项趋于 $0$，却是发散的。能直接求出部分和的只有少数几种：等比级数，以及能裂项相消的。

#### 1. 级数
给定数列 $u_1, u_2, \cdots, u_n, \cdots$，称
$$\sum_{n=1}^{\infty} u_n = u_1 + u_2 + \cdots + u_n + \cdots$$

为（常数项）==无穷级数==，简称级数，$u_n$ 称为它的==一般项==。

#### 2. 部分和、收敛与发散
* **部分和**：$S_n = u_1 + u_2 + \cdots + u_n$ 称为级数的==部分和==；
* **收敛**：若 $\lim\limits_{n \to \infty} S_n = S$ 存在，称级数==收敛==，$S$ 称为级数的==和==，记作 $\displaystyle\sum_{n=1}^{\infty} u_n = S$；
* **发散**：若 $\lim\limits_{n \to \infty} S_n$ 不存在，称级数==发散==。

#### 3. 余项
级数收敛时，$r_n = S - S_n = u_{n+1} + u_{n+2} + \cdots$ 称为==余项==，且 $\lim\limits_{n \to \infty} r_n = 0$。

#### 4. 等比级数与调和级数
* **等比级数**：$\displaystyle\sum_{n=0}^{\infty} aq^n = a + aq + aq^2 + \cdots$（$a \neq 0$）称为==等比级数==（几何级数），$q$ 称为公比；
* **调和级数**：$\displaystyle\sum_{n=1}^{\infty}\dfrac{1}{n} = 1 + \dfrac{1}{2} + \dfrac{1}{3} + \cdots$ 称为==调和级数==。

**② 全是正项，收不收敛**

部分和大多求不出，我们换个问题：不求和，只判断收不收敛。先看最简单的情形：每一项都非负。这时部分和一直增大，第 1 章的单调有界准则说，只要部分和有上界，就收敛。所以判断正项级数，就是估部分和有没有界，办法是和一个已知敛散的级数比大小。最常用的尺子有两把：一把是 $p$ 级数，和它比用比较判别法，常用极限形式，借第 1 章的等价无穷小定出一般项是 $\dfrac{1}{n}$ 的几阶；另一把是等比级数，和它比就是比值、根值判别法：相邻两项之比趋于 $\rho < 1$，后面的项就像公比小于 $1$ 的等比级数一样往下掉。一般项是一个函数在整数点的值、这个函数又单调减少时，还能和反常积分比。

#### 1. 正项级数
各项 $u_n \ge 0$ 的级数称为==正项级数==。

#### 2. $p$ 级数
$$\sum_{n=1}^{\infty}\dfrac{1}{n^p} = 1 + \dfrac{1}{2^p} + \dfrac{1}{3^p} + \cdots$$

称为==$p$ 级数==（$p$ 为常数）；$p = 1$ 时就是调和级数。

**③ 有正有负，收不收敛**

各项有正有负时，部分和不再单调，② 的办法不能直接用。先把每一项取绝对值，变成正项级数：如果 $\sum |u_n|$ 收敛，原级数也收敛，这叫绝对收敛。如果 $\sum |u_n|$ 发散，原级数还可能靠正负抵消而收敛，这叫条件收敛。最常见的是正负相间的交错级数：一般项的绝对值单调减小、趋于 $0$ 时，部分和像钟摆一样左右摆动，摆幅越来越小，最后停在一点，这是莱布尼茨判别法。绝对收敛的级数像有限和一样，可以随意交换次序；条件收敛的不行。

#### 1. 交错级数
各项正负相间的级数称为==交错级数==，写成
$$\sum_{n=1}^{\infty}(-1)^{n-1}u_n = u_1 - u_2 + u_3 - \cdots$$

其中 $u_n > 0$。

#### 2. 绝对收敛与条件收敛
对任意项级数 $\displaystyle\sum u_n$：
- **绝对收敛**：$\displaystyle\sum |u_n|$ 收敛；
- **条件收敛**：$\displaystyle\sum u_n$ 收敛，而 $\displaystyle\sum |u_n|$ 发散。

**④ 幂级数在哪些点收敛**

前三站加的是数。让每一项带上 $x$，就成了函数项级数：每固定一个 $x$，它就是一个数项级数；收敛的 $x$ 组成收敛域，在收敛域上，和是 $x$ 的函数。最常用的是幂级数 $\sum a_nx^n$，它像一个无穷长的多项式。对它取绝对值，用比值判别法：$\left|\dfrac{a_{n+1}x^{n+1}}{a_nx^n}\right| \to \rho|x|$，$\rho|x| < 1$ 时绝对收敛，$\rho|x| > 1$ 时发散，所以收敛的点是以原点为中心的一个区间，半径 $R = \dfrac{1}{\rho}$。阿贝尔定理说的是同一件事：在某一点收敛，离中心更近的点都绝对收敛；在某一点发散，离中心更远的点都发散。只有两个端点处比值是 $1$，判别法失效，要把端点代进去，按 ②③ 单独判断。

#### 1. 函数项级数
设 $u_n(x)$（$n = 1, 2, \cdots$）都在区间 $I$ 上有定义，称 $\displaystyle\sum_{n=1}^{\infty} u_n(x)$ 为==函数项级数==：
* **收敛点、发散点**：$x_0 \in I$ 使数项级数 $\displaystyle\sum u_n(x_0)$ 收敛，称 $x_0$ 为收敛点，否则为发散点；
* **收敛域**：收敛点的全体称为==收敛域==；
* **和函数**：在收敛域上，$S(x) = \displaystyle\sum_{n=1}^{\infty} u_n(x)$ 称为==和函数==。

#### 2. 幂级数
形如
$$\begin{aligned} & \sum_{n=0}^{\infty} a_n(x - x_0)^n \\ = {} & a_0 + a_1(x - x_0) + a_2(x - x_0)^2 + \cdots \end{aligned}$$

的函数项级数称为==幂级数==，$a_n$ 称为系数，$x_0$ 称为中心。令 $t = x - x_0$ 可化为 $\displaystyle\sum a_nt^n$ 的形式，以下多以 $x_0 = 0$ 叙述。

#### 3. 收敛半径、收敛区间与收敛域
对幂级数 $\displaystyle\sum a_nx^n$，总存在 $R$（$0 \le R \le +\infty$，由阿贝尔定理），使：
- **$|x| < R$**：幂级数绝对收敛；
- **$|x| > R$**：幂级数发散；
- **$x = \pm R$**：可能收敛，也可能发散。

$R$ 称为==收敛半径==，开区间 $(-R, R)$ 称为==收敛区间==，收敛区间加上收敛的端点称为==收敛域==。中心为 $x_0$ 时，收敛区间是 $(x_0 - R, x_0 + R)$。

**⑤ 幂级数与函数来回换**

在收敛区间里，幂级数的和是一个函数，而且能像多项式一样逐项求导、逐项积分，收敛半径不变。这给了我们两个方向。一个方向是求和函数：手里只有几个知道和的级数，最基本的是 $\sum x^n = \dfrac{1}{1 - x}$，于是用逐项求导、逐项积分、乘除 $x$ 的幂，把所给的级数变成它们，算出和，再反向运算回来；让 $x$ 取一个具体的值，还能求出一些数项级数的和。另一个方向是把函数展开：如果函数能写成幂级数，逐项求导再令 $x = x_0$，系数只能是 $\dfrac{f^{(n)}(x_0)}{n!}$，这就是泰勒级数；它真的等于函数，要求泰勒公式的余项趋于 $0$。实际展开很少直接求导，而是从几个已知展开式出发，经过代换、逐项求导或积分得到。

#### 1. 泰勒级数
设 $f(x)$ 在 $x_0$ 的某邻域内具有任意阶导数，称
$$\sum_{n=0}^{\infty}\dfrac{f^{(n)}(x_0)}{n!}(x - x_0)^n$$

为 $f(x)$ 在 $x_0$ 处的==泰勒级数==；$x_0 = 0$ 时称为==麦克劳林级数==。

#### 2. 展开成幂级数
若在某个区间内 $f(x) = \displaystyle\sum_{n=0}^{\infty} a_n(x - x_0)^n$ 成立，称 $f(x)$ 在这个区间内==能展开成 $x - x_0$ 的幂级数==，右端称为 $f(x)$ 的==展开式==。

**⑥ 用正弦余弦来展开**

幂级数的和在收敛区间里任意阶可导，一个有跳跃的方波，怎么也展不成幂级数。周期函数改用一组周期函数来展开：$1, \cos x, \sin x, \cos 2x, \sin 2x, \cdots$。这组函数有个好性质：任意两个不同的相乘，在一个周期上积分为 $0$，叫正交性。所以要求 $\cos nx$ 前面的系数，就把等式两边同乘 $\cos nx$ 再积分，其余各项都消失了，只剩这一项，这就是傅里叶系数的公式。展开后的级数收敛到什么，由狄利克雷定理回答：连续点收敛到函数值，间断点收敛到左右极限的平均值。只在一段区间上给出的函数，先延拓成周期函数，再展开。

#### 1. 三角函数系与三角级数
* **三角函数系**：$1$，$\cos x$，$\sin x$，$\cos 2x$，$\sin 2x$，$\cdots$，$\cos nx$，$\sin nx$，$\cdots$；
* **三角级数**：形如 $\dfrac{a_0}{2} + \displaystyle\sum_{n=1}^{\infty}(a_n\cos nx + b_n\sin nx)$ 的级数（$a_n$、$b_n$ 为常数）。

#### 2. 傅里叶系数与傅里叶级数
设 $f(x)$ 以 $2\pi$ 为周期，在 $[-\pi, \pi]$ 上可积：
- **傅里叶系数**：
  $$a_n = \dfrac{1}{\pi}\int_{-\pi}^{\pi} f(x)\cos nx\,\mathrm{d}x$$
  $$b_n = \dfrac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin nx\,\mathrm{d}x$$
  其中 $a_n$ 的 $n = 0, 1, 2, \cdots$，$b_n$ 的 $n = 1, 2, \cdots$；
- **傅里叶级数**：以这些系数作成的三角级数
  $$\dfrac{a_0}{2} + \sum_{n=1}^{\infty}(a_n\cos nx + b_n\sin nx)$$
  称为 $f(x)$ 的==傅里叶级数==，记作 $f(x) \sim$ 右端（是否相等，看收敛定理）。

#### 3. 周期延拓、奇延拓与偶延拓
* **周期延拓**：只在 $[-\pi, \pi)$ 上给出的 $f(x)$，按周期 $2\pi$ 在整个数轴上重复，称为==周期延拓==；
* **奇延拓**：在 $(0, \pi]$ 上给出的 $f(x)$，补充 $(-\pi, 0)$ 上的定义 $f(x) = -f(-x)$（并令 $f(0) = 0$），得到 $(-\pi, \pi]$ 上的奇函数；
* **偶延拓**：补充 $[-\pi, 0)$ 上的定义 $f(x) = f(-x)$，得到 $[-\pi, \pi]$ 上的偶函数。

---

### 〔性质〕

**① 无穷多个数怎么相加**

#### 1. 基本性质
1. **数乘**：级数各项乘以非零常数 $k$，敛散性不变；收敛时 $\displaystyle\sum ku_n = k\sum u_n$；
2. **加减**：若 $\displaystyle\sum u_n = S$，$\displaystyle\sum v_n = \sigma$，则 $\displaystyle\sum (u_n \pm v_n) = S \pm \sigma$；
3. **有限项**：去掉、加上或改变有限项，不改变级数的敛散性（收敛时和可能改变）；
4. **加括号**：收敛级数任意加括号后所成的级数仍收敛，且和不变；
   - 推论：加括号后的级数发散，则原级数发散；
   - 加括号后收敛，原级数未必收敛：$(1 - 1) + (1 - 1) + \cdots$ 收敛，而 $1 - 1 + 1 - 1 + \cdots$ 发散。

#### 2. 级数收敛的必要条件
$$\sum_{n=1}^{\infty} u_n \text{ 收敛} \implies \lim\limits_{n \to \infty} u_n = 0$$

- **逆否**：若 $\lim\limits_{n \to \infty} u_n \neq 0$ 或不存在，则级数==发散==；
- **依据**：$u_n = S_n - S_{n-1}$，两者都趋于 $S$；
- **不是充分条件**：调和级数 $\displaystyle\sum_{n=1}^{\infty}\dfrac{1}{n}$ 的一般项趋于零，但发散。

#### 3. 等比级数的敛散
$$\sum_{n=0}^{\infty} aq^n = a + aq + aq^2 + \cdots \quad (a \neq 0)$$

- **$|q| < 1$**：收敛，和为 $\dfrac{a}{1 - q}$；
- **$|q| \ge 1$**：发散；
- **依据**：$q \neq 1$ 时 $S_n = \dfrac{a(1 - q^{n+1})}{1 - q}$，$|q| < 1$ 时 $q^{n+1} \to 0$；$|q| \ge 1$ 时一般项不趋于 $0$。

#### 4. 裂项相消
若 $u_n = b_n - b_{n+1}$，则 $S_n = b_1 - b_{n+1}$，所以
$$\sum_{n=1}^{\infty} u_n \text{ 收敛} \iff \lim\limits_{n \to \infty} b_n \text{ 存在}$$

收敛时和为 $b_1 - \lim\limits_{n \to \infty} b_n$。
* **例**：$\dfrac{1}{n(n + 1)} = \dfrac{1}{n} - \dfrac{1}{n + 1}$，$\displaystyle\sum_{n=1}^{\infty}\dfrac{1}{n(n + 1)} = 1$。

#### 5. 数列与级数互化（边界）
数列 $\{a_n\}$ 收敛 $\iff$ 级数 $\displaystyle\sum_{n=1}^{\infty}(a_{n+1} - a_n)$ 收敛。
* **依据**：这个级数的部分和是 $a_{n+1} - a_1$；
* **用法**：要证数列收敛，可以改证这个级数收敛，常用比较判别法证它绝对收敛。

**② 全是正项，收不收敛**

#### 1. 正项级数收敛的充要条件
正项级数的部分和数列单调增加，所以
$$\sum_{n=1}^{\infty} u_n \text{ 收敛} \iff \{S_n\} \text{ 有界}$$

#### 2. $p$ 级数的敛散
- **$p > 1$**：收敛；
- **$p \le 1$**：发散（$p = 1$ 时为调和级数）；
- **依据**：用积分判别法，与反常积分 $\displaystyle\int_1^{+\infty}\dfrac{\mathrm{d}x}{x^p}$ 同敛散（第 3 章）。

#### 3. 比较判别法
设 $\displaystyle\sum u_n$、$\displaystyle\sum v_n$ 都是正项级数，且从某项起 $u_n \le v_n$：
- **大的收敛，小的收敛**：$\displaystyle\sum v_n$ 收敛 $\implies \sum u_n$ 收敛；
- **小的发散，大的发散**：$\displaystyle\sum u_n$ 发散 $\implies \sum v_n$ 发散。

#### 4. 比较判别法的极限形式
设 $\displaystyle\sum u_n$、$\displaystyle\sum v_n$ 都是正项级数（$v_n > 0$），$\lim\limits_{n \to \infty}\dfrac{u_n}{v_n} = l$：
- **$0 < l < +\infty$**：两级数==同敛散==；
- **$l = 0$**：$\displaystyle\sum v_n$ 收敛 $\implies \sum u_n$ 收敛；
- **$l = +\infty$**：$\displaystyle\sum v_n$ 发散 $\implies \sum u_n$ 发散。

* **用法**：取 $v_n = \dfrac{1}{n^p}$；用等价无穷小（第 1 章）求出 $u_n \sim \dfrac{C}{n^p}$，就和 $p$ 级数同敛散。

#### 5. 比值判别法（达朗贝尔判别法）
设 $\displaystyle\sum u_n$ 为正项级数（$u_n > 0$），$\lim\limits_{n \to \infty}\dfrac{u_{n+1}}{u_n} = \rho$：
- **$\rho < 1$**：收敛；
- **$\rho > 1$（或 $\rho = +\infty$）**：发散；
- **$\rho = 1$**：不能判定；$p$ 级数对任何 $p$ 都是 $\rho = 1$。

* **依据**：$\rho < 1$ 时取 $\rho < r < 1$，从某项起 $u_{n+1} < ru_n$，各项小于一个公比为 $r$ 的等比级数；$\rho > 1$ 时从某项起 $u_n$ 增大，不趋于 $0$。

#### 6. 根值判别法（柯西判别法）
设 $\displaystyle\sum u_n$ 为正项级数，$\lim\limits_{n \to \infty}\sqrt[n]{u_n} = \rho$，则 $\rho < 1$ 时收敛，$\rho > 1$（或 $\rho = +\infty$）时发散，$\rho = 1$ 时不能判定。

#### 7. 积分判别法
设 $f(x)$ 在 $[1, +\infty)$ 上非负、连续、单调减少，$u_n = f(n)$，则
$$\sum_{n=1}^{\infty} u_n \text{ 与 } \int_1^{+\infty} f(x)\,\mathrm{d}x \text{ 同敛散}$$

* **依据**：$f$ 单调减少，所以 $u_{k+1} \le \displaystyle\int_k^{k+1} f(x)\,\mathrm{d}x \le u_k$，部分和被积分夹住；
* **常用**：$\displaystyle\sum_{n=2}^{\infty}\dfrac{1}{n\ln^p n}$，$p > 1$ 收敛，$p \le 1$ 发散。

#### 8. 增长快慢（查表）
$n \to \infty$ 时，下面每一个都比后一个慢得多（$\alpha > 0$，$\beta > 0$，$a > 1$）：
$$\ln^\alpha n \ll n^\beta \ll a^n \ll n! \ll n^n$$

* **用法**：一般项的分子、分母各取最快的一项比较；含 $n!$、$n^n$ 的用比值判别法。

**③ 有正有负，收不收敛**

#### 1. 莱布尼茨判别法
设交错级数 $\displaystyle\sum_{n=1}^{\infty}(-1)^{n-1}u_n$（$u_n > 0$）满足：
1. **单调不增**：$u_n \ge u_{n+1}$（$n = 1, 2, \cdots$）；
2. **趋于零**：$\lim\limits_{n \to \infty} u_n = 0$；

则该级数收敛，其和 $S \le u_1$，余项 $|r_n| \le u_{n+1}$。
* **依据**：$S_{2n} = (u_1 - u_2) + (u_3 - u_4) + \cdots$ 单调增加，$S_{2n} = u_1 - (u_2 - u_3) - \cdots - u_{2n} \le u_1$ 有上界，所以有极限；$S_{2n+1} = S_{2n} + u_{2n+1}$ 趋于同一个极限；
* **验单调**：设 $u_n = f(n)$，在 $x$ 充分大时 $f'(x) < 0$ 即可（第 2 章）；条件只要从某项起成立。

#### 2. 绝对收敛与收敛的关系
- **绝对收敛必收敛**：若 $\displaystyle\sum |u_n|$ 收敛，则 $\displaystyle\sum u_n$ 收敛；
- **比值、根值法判出发散**：若用比值法或根值法判定 $\displaystyle\sum |u_n|$ 的 $\rho > 1$，则 $u_n \not\to 0$，$\displaystyle\sum u_n$ 发散；
- **依据**：$0 \le u_n + |u_n| \le 2|u_n|$，由比较判别法 $\sum (u_n + |u_n|)$ 收敛，再减去 $\sum |u_n|$。

#### 3. 交错 $p$ 级数
$$\sum_{n=1}^{\infty}\dfrac{(-1)^{n-1}}{n^p}$$

- **$p > 1$**：绝对收敛；
- **$0 < p \le 1$**：条件收敛；
- **$p \le 0$**：发散（一般项不趋于 $0$）。

#### 4. 敛散性的运算（查表）
- **收敛 $\pm$ 收敛**：收敛；
- **收敛 $\pm$ 发散**：发散；
- **发散 $\pm$ 发散**：不一定，如 $\sum \dfrac{1}{n}$ 与 $\sum \left(-\dfrac{1}{n}\right)$ 相加是收敛的 $0$；
- **绝对收敛 $\pm$ 条件收敛**：条件收敛；
- **绝对收敛 $\pm$ 绝对收敛**：绝对收敛。

#### 5. 常用结论与反例（查表）
设 $\displaystyle\sum u_n$ 收敛（不要求正项）：
* **$\sum u_n^2$ 不一定收敛**：$u_n = \dfrac{(-1)^n}{\sqrt{n}}$；正项级数 $\sum u_n$ 收敛时，$\sum u_n^2$ 一定收敛；
* **$\sum |u_n|$ 不一定收敛**：$u_n = \dfrac{(-1)^n}{n}$；
* **$\sum (u_n + u_{n+1})$ 一定收敛**：它是两个收敛级数之和；
* **$\sum u_{2n}$ 不一定收敛**：$u_n = \dfrac{(-1)^n}{n}$ 时 $\sum u_{2n} = \sum \dfrac{1}{2n}$ 发散；
* **两个平方和收敛**：$\sum u_n^2$、$\sum v_n^2$ 收敛 $\implies \sum u_nv_n$ 绝对收敛，因为 $|u_nv_n| \le \dfrac{u_n^2 + v_n^2}{2}$；
* **夹在中间**：$u_n \le w_n \le v_n$，$\sum u_n$、$\sum v_n$ 都收敛 $\implies \sum w_n$ 收敛，因为 $0 \le w_n - u_n \le v_n - u_n$。

#### 6. 绝对收敛级数的性质（边界）
- **重排不变**：绝对收敛级数任意交换各项次序后仍绝对收敛，且和不变；
- **乘积**：两个绝对收敛级数 $\displaystyle\sum u_n = S$、$\displaystyle\sum v_n = \sigma$ 的柯西乘积也绝对收敛，且和为 $S\sigma$；
- **条件收敛的不行**：条件收敛级数重排后，可以收敛到任意指定的数，也可以发散（黎曼定理）。

**④ 幂级数在哪些点收敛**

#### 1. 阿贝尔定理
- **收敛点向内**：若 $\displaystyle\sum a_nx^n$ 在 $x = x_1$（$x_1 \neq 0$）处收敛，则当 $|x| < |x_1|$ 时它==绝对收敛==；
- **发散点向外**：若它在 $x = x_2$ 处发散，则当 $|x| > |x_2|$ 时它发散；
- **依据**：$\sum a_nx_1^n$ 收敛，一般项有界，$|a_nx_1^n| \le M$，于是 $|a_nx^n| \le M\left|\dfrac{x}{x_1}\right|^n$，与公比小于 $1$ 的等比级数比较。

#### 2. 收敛半径的求法
若 $\lim\limits_{n \to \infty}\left|\dfrac{a_{n+1}}{a_n}\right| = \rho$（或 $\lim\limits_{n \to \infty}\sqrt[n]{|a_n|} = \rho$），则
$$R = \begin{cases} \dfrac{1}{\rho}, & 0 < \rho < +\infty \\ +\infty, & \rho = 0 \\ 0, & \rho = +\infty \end{cases}$$

* **依据**：对 $\sum |a_nx^n|$ 用比值判别法，$\left|\dfrac{a_{n+1}x^{n+1}}{a_nx^n}\right| \to \rho|x|$，$\rho|x| < 1$ 时收敛，$\rho|x| > 1$ 时发散；
* **适用范围**：系数相邻两项都不为 $0$，即不缺项。

#### 3. 缺项与中心不在原点
- **缺项**：对 $\displaystyle\sum a_nx^{2n}$ 这类缺项的级数，不能直接用上面的公式，而是对一般项 $u_n(x)$ 用比值法：
  1. **求极限**：$\lim\limits_{n \to \infty}\left|\dfrac{u_{n+1}(x)}{u_n(x)}\right| = \rho(x)$；
  2. **定范围**：由 $\rho(x) < 1$ 解出 $x$ 的范围，得收敛区间；端点另行判断；
- **中心在 $x_0$**：$\displaystyle\sum a_n(x - x_0)^n$ 的收敛半径与 $\sum a_nt^n$ 相同，收敛区间是 $(x_0 - R, x_0 + R)$。

#### 4. 由一点的敛散定半径
设 $\displaystyle\sum a_n(x - x_0)^n$ 的收敛半径为 $R$：
- **在 $x_1$ 处收敛**：$R \ge |x_1 - x_0|$；
- **在 $x_2$ 处发散**：$R \le |x_2 - x_0|$；
- **在 $x_1$ 处条件收敛**：$R = |x_1 - x_0|$，$x_1$ 是收敛区间的端点；
- **依据**：收敛区间内部处处绝对收敛，外部处处发散，只有端点处可能条件收敛。

**⑤ 幂级数与函数来回换**

**和函数**

#### 1. 四则运算
设 $\displaystyle\sum a_nx^n$、$\displaystyle\sum b_nx^n$ 的收敛半径分别为 $R_1$、$R_2$，则在 $|x| < R = \min\{R_1, R_2\}$ 内：
- **加减**：$\displaystyle\sum a_nx^n \pm \sum b_nx^n = \sum (a_n \pm b_n)x^n$；
- **乘积**：$\left(\displaystyle\sum a_nx^n\right)\left(\displaystyle\sum b_nx^n\right) = \displaystyle\sum_{n=0}^{\infty} c_nx^n$，$c_n = a_0b_n + a_1b_{n-1} + \cdots + a_nb_0$。

#### 2. 和函数的分析性质
设 $\displaystyle\sum a_nx^n$ 的收敛半径 $R > 0$，和函数为 $S(x)$：
- **连续**：$S(x)$ 在收敛域上连续；
- **逐项求导**：在 $(-R, R)$ 内 $S'(x) = \displaystyle\sum_{n=1}^{\infty} na_nx^{n-1}$；
- **逐项积分**：在 $(-R, R)$ 内 $\displaystyle\int_0^x S(t)\,\mathrm{d}t = \sum_{n=0}^{\infty}\dfrac{a_n}{n + 1}x^{n+1}$；
- **半径不变**：逐项求导、逐项积分后收敛半径仍为 $R$，但端点处的敛散性可能改变；
- **端点**：级数在端点 $x = R$ 处收敛时，和函数在这一点左连续，$S(R) = \lim\limits_{x \to R^-} S(x)$。

#### 3. 求幂级数的和函数
1. **求收敛域**；
2. **化为已知级数**：通过逐项求导、逐项积分、提出或乘以 $x$ 的幂、拆项等，化为已知和的级数（如 $\displaystyle\sum_{n=0}^{\infty} x^n = \dfrac{1}{1 - x}$，$|x| < 1$）；
3. **还原**：对所得结果作相反的运算（积分或求导），注意用 $S(0)$ 确定积分常数；
4. **注明范围**：写出和函数成立的区间（端点处用连续性）。

* **$n$ 在分子**：$\displaystyle\sum_{n=1}^{\infty} nx^{n-1} = \left(\sum_{n=0}^{\infty} x^n\right)' = \dfrac{1}{(1 - x)^2}$，$|x| < 1$；
* **$n$ 在分母**：$\displaystyle\sum_{n=1}^{\infty}\dfrac{x^n}{n} = \int_0^x \dfrac{\mathrm{d}t}{1 - t} = -\ln(1 - x)$，$-1 \le x < 1$。

#### 4. 求数项级数的和
数项级数 $\displaystyle\sum a_nx_1^n$ 是幂级数 $\displaystyle\sum a_nx^n$ 在 $x = x_1$ 处的值：求出和函数 $S(x)$，$x_1$ 在收敛域内时，和为 $S(x_1)$。
* **例**：$\displaystyle\sum_{n=1}^{\infty}\dfrac{(-1)^{n-1}}{n} = \ln 2$，是 $\ln(1 + x)$ 的展开式在 $x = 1$ 处的值。

**函数展开**

#### 1. 展开成泰勒级数的充要条件
设 $f(x)$ 在 $x_0$ 的某邻域 $U(x_0)$ 内具有任意阶导数，则 $f(x)$ 在 $U(x_0)$ 内能展开成泰勒级数 $\iff$ 在 $U(x_0)$ 内它的泰勒公式（第 2 章）的余项满足
$$\lim\limits_{n \to \infty} R_n(x) = 0$$

* **依据**：泰勒级数的部分和就是 $n$ 次泰勒多项式 $P_n(x)$，$f(x) - P_n(x) = R_n(x)$。

#### 2. 展开式的唯一性
若 $f(x)$ 在 $x_0$ 的某邻域内能展开成 $x - x_0$ 的幂级数，则展开式==唯一==，就是 $f(x)$ 的泰勒级数。
* **依据**：对 $f(x) = \sum a_n(x - x_0)^n$ 逐项求 $n$ 阶导数，再令 $x = x_0$，得 $f^{(n)}(x_0) = n!\,a_n$；
* **用法**：用任何办法得到的展开式，系数都是 $\dfrac{f^{(n)}(x_0)}{n!}$，所以可以反过来求高阶导数：$f^{(n)}(x_0) = n!\,a_n$。

#### 3. 常用函数的麦克劳林展开式
有限项的泰勒公式在第 2 章，这里是级数形式与成立范围：
- $e^x = \displaystyle\sum_{n=0}^{\infty}\dfrac{x^n}{n!}$，$x \in (-\infty, +\infty)$；
- $\sin x = \displaystyle\sum_{n=0}^{\infty}\dfrac{(-1)^nx^{2n+1}}{(2n + 1)!}$，$\cos x = \displaystyle\sum_{n=0}^{\infty}\dfrac{(-1)^nx^{2n}}{(2n)!}$，$x \in (-\infty, +\infty)$；
- $\dfrac{1}{1 - x} = \displaystyle\sum_{n=0}^{\infty} x^n$，$\dfrac{1}{1 + x} = \displaystyle\sum_{n=0}^{\infty}(-1)^nx^n$，$x \in (-1, 1)$；
- $\ln(1 + x) = \displaystyle\sum_{n=1}^{\infty}\dfrac{(-1)^{n-1}x^n}{n}$，$x \in (-1, 1]$；
- $\arctan x = \displaystyle\sum_{n=0}^{\infty}\dfrac{(-1)^nx^{2n+1}}{2n + 1}$，$x \in [-1, 1]$；
- $(1 + x)^\alpha = 1 + \displaystyle\sum_{n=1}^{\infty}\dfrac{\alpha(\alpha - 1)\cdots(\alpha - n + 1)}{n!}x^n$，$x \in (-1, 1)$（端点处的敛散性依 $\alpha$ 而定）。

#### 4. 间接展开法
利用已知展开式，通过变量代换（如把 $x$ 换成 $-x^2$）、四则运算、逐项求导、逐项积分得到所求展开式，并写出成立的范围。
* **在 $x_0$ 处展开**：令 $t = x - x_0$，把 $f$ 写成 $t$ 的函数，再用已知展开式；
* **有理分式**：先拆成部分分式，每一项化成 $\dfrac{1}{1 - u}$ 的形式；
* **范围**：几个展开式相加，取各自范围的公共部分；逐项积分后，端点要重新判断。

**⑥ 用正弦余弦来展开**

#### 1. 三角函数系的正交性
三角函数系中任意两个不同函数的乘积在 $[-\pi, \pi]$ 上的积分都为零（$k, n$ 为正整数）：
$$\int_{-\pi}^{\pi}\cos kx\cos nx\,\mathrm{d}x = 0 \quad (k \neq n)$$
$$\int_{-\pi}^{\pi}\sin kx\sin nx\,\mathrm{d}x = 0 \quad (k \neq n)$$
$$\int_{-\pi}^{\pi}\sin kx\cos nx\,\mathrm{d}x = 0$$

且 $\displaystyle\int_{-\pi}^{\pi}\cos nx\,\mathrm{d}x = \int_{-\pi}^{\pi}\sin nx\,\mathrm{d}x = 0$，$\displaystyle\int_{-\pi}^{\pi}\cos^2 nx\,\mathrm{d}x = \int_{-\pi}^{\pi}\sin^2 nx\,\mathrm{d}x = \pi$。
* **系数公式的由来**：设 $f(x) = \dfrac{a_0}{2} + \sum (a_k\cos kx + b_k\sin kx)$ 可以逐项积分，两边乘 $\cos nx$ 在 $[-\pi, \pi]$ 上积分，右边只剩 $a_n\pi$，得 $a_n$ 的公式；$b_n$ 同理；常数项写成 $\dfrac{a_0}{2}$，是为了 $a_0$ 也能套 $a_n$ 的公式。

#### 2. 狄利克雷收敛定理
设 $f(x)$ 以 $2\pi$ 为周期，且在一个周期内：
1. **连续或只有有限个第一类间断点**；
2. **至多只有有限个极值点**；

则 $f(x)$ 的傅里叶级数收敛，且：
- **连续点**：收敛于 $f(x)$；
- **间断点**：收敛于 $\dfrac{f(x^-) + f(x^+)}{2}$。

* **和函数**：傅里叶级数的和 $S(x)$ 是周期为 $2\pi$ 的函数，在一个周期内按上面两条写出；$[-\pi, \pi]$ 上的函数作周期延拓后，端点 $x = \pm\pi$ 处 $S = \dfrac{f(-\pi^+) + f(\pi^-)}{2}$。

#### 3. 奇函数与偶函数的傅里叶级数
设 $f(x)$ 以 $2\pi$ 为周期：
- **奇函数**：$a_n = 0$，$b_n = \dfrac{2}{\pi}\displaystyle\int_0^{\pi} f(x)\sin nx\,\mathrm{d}x$，傅里叶级数为==正弦级数== $\displaystyle\sum_{n=1}^{\infty} b_n\sin nx$；
- **偶函数**：$b_n = 0$，$a_n = \dfrac{2}{\pi}\displaystyle\int_0^{\pi} f(x)\cos nx\,\mathrm{d}x$，傅里叶级数为==余弦级数== $\dfrac{a_0}{2} + \displaystyle\sum_{n=1}^{\infty} a_n\cos nx$；
- **依据**：对称区间上奇函数的积分为 $0$，偶函数的积分是一半的 $2$ 倍（第 3 章）。

#### 4. $[0, \pi]$ 上的函数展开成正弦或余弦级数
1. **延拓**：
   - 展开成正弦级数：作==奇延拓==，得 $(-\pi, \pi]$ 上的奇函数；
   - 展开成余弦级数：作==偶延拓==，得 $[-\pi, \pi]$ 上的偶函数；
2. **求系数**：按上面奇、偶函数的公式计算 $b_n$ 或 $a_n$，只用到 $f$ 在 $[0, \pi]$ 上的值；
3. **定收敛范围**：用狄利克雷收敛定理确定级数在 $[0, \pi]$ 上各点的和，如正弦级数在 $x = 0$、$x = \pi$ 处收敛于 $0$。

#### 5. 周期为 $2l$ 的傅里叶级数
设 $f(x)$ 以 $2l$ 为周期，满足收敛定理的条件，则
$$\begin{aligned} f(x) \sim {} & \dfrac{a_0}{2} \\ & + \sum_{n=1}^{\infty}\left(a_n\cos\dfrac{n\pi x}{l} + b_n\sin\dfrac{n\pi x}{l}\right) \end{aligned}$$

其中
$$a_n = \dfrac{1}{l}\int_{-l}^{l} f(x)\cos\dfrac{n\pi x}{l}\,\mathrm{d}x$$
$$b_n = \dfrac{1}{l}\int_{-l}^{l} f(x)\sin\dfrac{n\pi x}{l}\,\mathrm{d}x$$

$a_n$ 的 $n = 0, 1, 2, \cdots$，$b_n$ 的 $n = 1, 2, \cdots$。收敛情况与周期 $2\pi$ 时相同；$[-l, l]$ 上的函数先作周期延拓；$[0, l]$ 上的函数同样可作奇、偶延拓，系数为 $\dfrac{2}{l}\displaystyle\int_0^l$ 的形式。
* **依据**：令 $x = \dfrac{lt}{\pi}$，周期 $2l$ 的 $f(x)$ 成了 $t$ 的周期 $2\pi$ 的函数。

---

### 意义

本卡在做题时专门用于解决以下 19 类确定性目标，按站排列：

**① 无穷多个数怎么相加**

* **1. 用部分和求和；用必要条件判发散**
  * **问题**：求级数的和；判断一般项不趋于 $0$ 的级数的敛散。
  * **目标**：写出部分和再求极限；一般项不趋于 $0$ 就直接判发散。
  * **调用**：裂项相消；等比级数的和 $\dfrac{a}{1 - q}$；收敛的必要条件。
  * **行动**：
    1. 裂项；如 $\displaystyle\sum_{n=1}^{\infty}\dfrac{1}{n(n + 2)}$：$\dfrac{1}{n(n + 2)} = \dfrac{1}{2}\left(\dfrac{1}{n} - \dfrac{1}{n + 2}\right)$，相消后剩前两项和最后两项，和为 $\dfrac{1}{2}\left(1 + \dfrac{1}{2}\right) = \dfrac{3}{4}$；
    2. 等比；如 $\displaystyle\sum_{n=1}^{\infty}\left(\dfrac{1}{2^n} + \dfrac{1}{3^n}\right) = 1 + \dfrac{1}{2} = \dfrac{3}{2}$；
    3. 判发散；如 $\displaystyle\sum n\sin\dfrac{1}{n}$：一般项趋于 $1 \ne 0$，发散。
* **2. 借级数证数列收敛（边界）**
  * **问题**：证明数列 $\{a_n\}$ 收敛，而它不单调或不好夹逼。
  * **目标**：改证 $\sum (a_{n+1} - a_n)$ 收敛。
  * **调用**：数列与级数互化；比较判别法的极限形式。
  * **行动**：
    1. 写出差；如 $a_n = 1 + \dfrac{1}{2} + \cdots + \dfrac{1}{n} - \ln n$：$a_{n+1} - a_n = \dfrac{1}{n + 1} - \ln\left(1 + \dfrac{1}{n}\right)$；
    2. 求阶：用泰勒展开，$\dfrac{1}{n + 1} = \dfrac{1}{n} - \dfrac{1}{n^2} + o\left(\dfrac{1}{n^2}\right)$，$\ln\left(1 + \dfrac{1}{n}\right) = \dfrac{1}{n} - \dfrac{1}{2n^2} + o\left(\dfrac{1}{n^2}\right)$，差 $\sim -\dfrac{1}{2n^2}$；
    3. 结论：$\sum |a_{n+1} - a_n|$ 收敛，所以 $\{a_n\}$ 收敛。

**② 全是正项，收不收敛**

* **3. 选判别法判正项级数**
  * **问题**：判断正项级数的敛散。
  * **目标**：按一般项的样子选判别法。
  * **调用**：比较判别法及其极限形式；比值、根值、积分判别法；$p$ 级数。
  * **行动**：
    1. 含 $n!$、$n^n$，用比值；如 $\displaystyle\sum\dfrac{n!}{n^n}$：$\dfrac{u_{n+1}}{u_n} = \left(\dfrac{n}{n + 1}\right)^n \to \dfrac{1}{e} < 1$，收敛；
    2. 整个是 $n$ 次方，用根值；如 $\displaystyle\sum\left(\dfrac{n}{2n + 1}\right)^n$：$\sqrt[n]{u_n} = \dfrac{n}{2n + 1} \to \dfrac{1}{2}$，收敛；
    3. 能求出阶，用极限形式；如 $\displaystyle\sum\left(1 - \cos\dfrac{1}{n}\right)$：$1 - \cos\dfrac{1}{n} \sim \dfrac{1}{2n^2}$，收敛；$\displaystyle\sum\ln\left(1 + \dfrac{1}{n}\right)$：$\sim \dfrac{1}{n}$，发散；
    4. 含 $\ln n$ 的幂，用积分；如 $\displaystyle\sum_{n=2}^{\infty}\dfrac{1}{n\ln n}$：$\displaystyle\int_2^{+\infty}\dfrac{\mathrm{d}x}{x\ln x} = \ln\ln x\Big|_2^{+\infty} = +\infty$，发散。
* **4. 含参数的正项级数**
  * **问题**：讨论 $\displaystyle\sum\dfrac{a^n}{n^p}$（$a > 0$）这类含参数的级数的敛散。
  * **目标**：先用比值或根值定出大的分界，$\rho = 1$ 的参数值单独判。
  * **调用**：比值判别法；$p$ 级数。
  * **行动**：
    1. 比值：$\dfrac{u_{n+1}}{u_n} = a\left(\dfrac{n}{n + 1}\right)^p \to a$；
    2. 分情形：$0 < a < 1$ 收敛；$a > 1$ 发散；
    3. $a = 1$：比值失效，级数是 $p$ 级数，$p > 1$ 收敛，$p \le 1$ 发散。
* **5. 一般项由积分或递推给出**
  * **问题**：$a_n$ 是一个含 $n$ 的积分，判断 $\sum a_n$ 或 $\sum\dfrac{a_n}{n^\lambda}$ 的敛散，或求和。
  * **目标**：先找出 $a_n$ 的递推关系或上下界。
  * **调用**：比较判别法；裂项相消。
  * **行动**：
    1. 递推；如 $a_n = \displaystyle\int_0^{\frac{\pi}{4}}\tan^n x\,\mathrm{d}x$：$a_n + a_{n+2} = \displaystyle\int_0^{\frac{\pi}{4}}\tan^n x\sec^2 x\,\mathrm{d}x = \dfrac{1}{n + 1}$；
    2. 求和：$\displaystyle\sum_{n=1}^{\infty}\dfrac{a_n + a_{n+2}}{n} = \sum_{n=1}^{\infty}\dfrac{1}{n(n + 1)} = 1$；
    3. 上界：$a_{n+2} > 0$，所以 $a_n < \dfrac{1}{n + 1} < \dfrac{1}{n}$；对任意 $\lambda > 0$，$\dfrac{a_n}{n^\lambda} < \dfrac{1}{n^{1 + \lambda}}$，$\displaystyle\sum\dfrac{a_n}{n^\lambda}$ 收敛。

**③ 有正有负，收不收敛**

* **6. 交错级数**
  * **问题**：判断 $\sum (-1)^{n-1}u_n$ 的敛散。
  * **目标**：验莱布尼茨的两个条件；单调性用导数。
  * **调用**：莱布尼茨判别法。
  * **行动**：
    1. 趋于零；如 $\displaystyle\sum_{n=1}^{\infty}(-1)^{n-1}\dfrac{\ln n}{n}$：$\dfrac{\ln n}{n} \to 0$；
    2. 单调：设 $f(x) = \dfrac{\ln x}{x}$，$f'(x) = \dfrac{1 - \ln x}{x^2} < 0$（$x > e$），所以从 $n = 3$ 起单调减少；
    3. 结论：收敛。
* **7. 判断绝对收敛还是条件收敛**
  * **问题**：判断任意项级数是绝对收敛、条件收敛还是发散。
  * **目标**：先判绝对值级数；发散时再判原级数。
  * **调用**：绝对收敛必收敛；交错 $p$ 级数；比较判别法。
  * **行动**：
    1. 先看绝对值；如 $\displaystyle\sum\dfrac{\sin n\alpha}{n^2}$：$\left|\dfrac{\sin n\alpha}{n^2}\right| \le \dfrac{1}{n^2}$，绝对收敛；
    2. 绝对值发散，原级数收敛；如第 6 类的 $\displaystyle\sum(-1)^{n-1}\dfrac{\ln n}{n}$：$n \ge 3$ 时 $\dfrac{\ln n}{n} > \dfrac{1}{n}$，绝对值级数发散，所以条件收敛；
    3. 一般项不趋于 $0$；如 $\displaystyle\sum(-1)^n\dfrac{n}{n + 1}$：发散。
* **8. 由已知级数推另一个级数的敛散**
  * **问题**：已知 $\sum u_n$ 收敛（或绝对收敛），判断由它构造的级数的敛散（常见于选择题）。
  * **目标**：能证的用运算规律，不能证的找反例。
  * **调用**：敛散性的运算；常用结论与反例。
  * **行动**：
    1. 列出选项；如已知 $\sum u_n$ 收敛，问 $\sum u_n^2$、$\sum (-1)^nu_n$、$\sum (u_{2n-1} - u_{2n})$、$\sum (u_n + u_{n+1})$ 哪个一定收敛；
    2. 找反例：$u_n = \dfrac{(-1)^n}{\sqrt{n}}$ 时 $\sum u_n^2 = \sum\dfrac{1}{n}$ 发散；$u_n = \dfrac{(-1)^n}{n}$ 时 $\sum (-1)^nu_n = \sum\dfrac{1}{n}$ 发散，$\sum (u_{2n-1} - u_{2n}) = -\sum\left(\dfrac{1}{2n - 1} + \dfrac{1}{2n}\right)$ 发散；
    3. 证明：$\sum (u_n + u_{n+1})$ 是两个收敛级数之和，一定收敛。

**④ 幂级数在哪些点收敛**

* **9. 求收敛半径与收敛域**
  * **问题**：求 $\sum a_nx^n$ 的收敛半径、收敛区间、收敛域。
  * **目标**：先求半径，再把两个端点代入判断。
  * **调用**：$R = \dfrac{1}{\rho}$；端点处按 ②③ 判断。
  * **行动**：
    1. 求半径；如 $\displaystyle\sum_{n=1}^{\infty}\dfrac{x^n}{n \cdot 2^n}$：$\left|\dfrac{a_{n+1}}{a_n}\right| = \dfrac{n}{2(n + 1)} \to \dfrac{1}{2}$，$R = 2$；
    2. 右端点 $x = 2$：$\displaystyle\sum\dfrac{1}{n}$，发散；
    3. 左端点 $x = -2$：$\displaystyle\sum\dfrac{(-1)^n}{n}$，收敛；
    4. 收敛域 $[-2, 2)$。
* **10. 缺项、中心不在原点**
  * **问题**：幂级数只含偶次（或奇次）幂；或是 $(x - x_0)$ 的幂级数。
  * **目标**：对整个一般项用比值法；中心不在原点时，区间以 $x_0$ 为中心。
  * **调用**：缺项与中心不在原点。
  * **行动**：
    1. 缺项；如 $\displaystyle\sum_{n=1}^{\infty}\dfrac{x^{2n}}{n \cdot 4^n}$：$\left|\dfrac{u_{n+1}}{u_n}\right| \to \dfrac{x^2}{4} < 1$，$|x| < 2$；$x = \pm 2$ 时是 $\sum\dfrac{1}{n}$，发散；收敛域 $(-2, 2)$；
    2. 平移；如 $\displaystyle\sum_{n=1}^{\infty}\dfrac{(x - 1)^n}{n \cdot 3^n}$：$R = 3$，收敛区间 $(-2, 4)$；$x = 4$ 发散，$x = -2$ 收敛；收敛域 $[-2, 4)$。
* **11. 由一点的敛散推半径**
  * **问题**：已知幂级数在某一点收敛、发散或条件收敛，求半径或判断另一点的敛散。
  * **目标**：用阿贝尔定理定出半径的范围。
  * **调用**：由一点的敛散定半径；逐项求导、逐项积分后半径不变。
  * **行动**：
    1. 条件收敛点是端点；如 $\displaystyle\sum a_n(x - 1)^n$ 在 $x = -1$ 处条件收敛：$R = |-1 - 1| = 2$；
    2. 判断另一点：$x = 2$ 离中心 $1$，在区间内，绝对收敛；$x = 4$ 离中心 $3 > 2$，发散；
    3. 求导以后；如 $\displaystyle\sum na_n(x - 1)^{n-1}$：半径仍是 $2$，收敛区间 $(-1, 3)$。

**⑤ 幂级数与函数来回换**

* **12. 求和函数**
  * **问题**：求幂级数在收敛域上的和函数。
  * **目标**：用逐项求导或积分消掉系数里的 $n$，化成已知的和，再反向运算。
  * **调用**：和函数的分析性质；常用展开式。
  * **行动**：
    1. $n$ 在分子，先积分（或提出 $x$ 再积分）；如 $\displaystyle\sum_{n=1}^{\infty} nx^n = x\sum_{n=1}^{\infty} nx^{n-1} = x\left(\sum_{n=0}^{\infty} x^n\right)' = \dfrac{x}{(1 - x)^2}$，$|x| < 1$；
    2. $n$ 在分母，先求导；如 $S(x) = \displaystyle\sum_{n=1}^{\infty}\dfrac{x^{n+1}}{n(n + 1)}$：$S''(x) = \displaystyle\sum_{n=1}^{\infty} x^{n-1} = \dfrac{1}{1 - x}$；
    3. 积分回来：$S'(0) = 0$，$S'(x) = -\ln(1 - x)$；$S(0) = 0$，$S(x) = (1 - x)\ln(1 - x) + x$，$x \in [-1, 1)$；
    4. 端点 $x = 1$：级数收敛，和函数左连续，$S(1) = \lim\limits_{x \to 1^-} S(x) = 1$。
* **13. 求数项级数的和**
  * **问题**：求 $\displaystyle\sum\dfrac{n}{2^n}$、$\displaystyle\sum\dfrac{n + 1}{n!}$ 这类级数的和。
  * **目标**：找一个幂级数，使所给级数是它在某一点的值。
  * **调用**：求数项级数的和；常用展开式。
  * **行动**：
    1. 构造幂级数；如 $\displaystyle\sum_{n=1}^{\infty}\dfrac{n}{2^n}$ 是 $\displaystyle\sum nx^n$ 在 $x = \dfrac{1}{2}$ 处的值；
    2. 代入第 12 类的和函数：$\dfrac{1/2}{(1 - 1/2)^2} = 2$；
    3. 分母是 $n!$，往 $e^x$ 上凑；如 $\displaystyle\sum_{n=0}^{\infty}\dfrac{(n + 1)x^n}{n!} = \sum_{n=1}^{\infty}\dfrac{x^n}{(n - 1)!} + \sum_{n=0}^{\infty}\dfrac{x^n}{n!} = (x + 1)e^x$，令 $x = 1$，$\displaystyle\sum_{n=0}^{\infty}\dfrac{n + 1}{n!} = 2e$。
* **14. 把函数展开成麦克劳林级数**
  * **问题**：把给定函数展开成 $x$ 的幂级数，并写出成立范围。
  * **目标**：拆成几个已知展开式能处理的部分。
  * **调用**：常用展开式；间接展开法。
  * **行动**：
    1. 有理分式拆项；如 $\dfrac{1}{x^2 - 3x + 2} = \dfrac{1}{1 - x} - \dfrac{1}{2 - x}$；
    2. 各自展开：$\dfrac{1}{1 - x} = \displaystyle\sum x^n$（$|x| < 1$），$\dfrac{1}{2 - x} = \dfrac{1}{2} \cdot \dfrac{1}{1 - x/2} = \displaystyle\sum\dfrac{x^n}{2^{n+1}}$（$|x| < 2$）；
    3. 相减，范围取公共部分：$\displaystyle\sum_{n=0}^{\infty}\left(1 - \dfrac{1}{2^{n+1}}\right)x^n$，$|x| < 1$；
    4. 对数拆成和；如 $\ln(1 + x - 2x^2) = \ln(1 + 2x) + \ln(1 - x)$，各用 $\ln(1 + u)$ 的展开式，范围 $\left(-\dfrac{1}{2}, \dfrac{1}{2}\right]$。
* **15. 在 $x_0$ 处展开**
  * **问题**：把函数展开成 $x - x_0$ 的幂级数。
  * **目标**：令 $t = x - x_0$，化成 $t$ 的已知展开式。
  * **调用**：间接展开法。
  * **行动**：
    1. 代换；如 $\dfrac{1}{x}$ 在 $x_0 = 3$ 处：$\dfrac{1}{x} = \dfrac{1}{3 + (x - 3)} = \dfrac{1}{3} \cdot \dfrac{1}{1 + \frac{x - 3}{3}}$；
    2. 展开：$\dfrac{1}{x} = \displaystyle\sum_{n=0}^{\infty}\dfrac{(-1)^n(x - 3)^n}{3^{n+1}}$；
    3. 范围：$\left|\dfrac{x - 3}{3}\right| < 1$，即 $0 < x < 6$。
* **16. 用展开式求高阶导数**
  * **问题**：求 $f^{(n)}(0)$，$f$ 是乘积或复合，直接求导很繁。
  * **目标**：先展开，读出 $x^n$ 的系数。
  * **调用**：展开式的唯一性，$f^{(n)}(0) = n!\,a_n$。
  * **行动**：
    1. 展开；如 $f(x) = x^2\ln(1 + x)$：$f(x) = \displaystyle\sum_{k=1}^{\infty}\dfrac{(-1)^{k-1}x^{k+2}}{k}$；
    2. 读系数：$x^n$ 对应 $k = n - 2$，$a_n = \dfrac{(-1)^{n-3}}{n - 2}$（$n \ge 3$）；
    3. 结果：$f^{(n)}(0) = \dfrac{(-1)^{n-1}n!}{n - 2}$（$n \ge 3$）。

**⑥ 用正弦余弦来展开**

* **17. 求傅里叶级数，写出和函数**
  * **问题**：把周期为 $2\pi$（或定义在 $[-\pi, \pi)$ 上）的函数展开成傅里叶级数，并写出和函数。
  * **目标**：先看奇偶，再求系数，最后用狄利克雷定理写和函数。
  * **调用**：傅里叶系数；狄利克雷收敛定理。
  * **行动**：
    1. 求系数；如 $f(x) = 0$（$-\pi \le x < 0$），$f(x) = x$（$0 \le x < \pi$）：$a_0 = \dfrac{1}{\pi}\displaystyle\int_0^{\pi} x\,\mathrm{d}x = \dfrac{\pi}{2}$；
    2. 分部积分：$a_n = \dfrac{1}{\pi}\displaystyle\int_0^{\pi} x\cos nx\,\mathrm{d}x = \dfrac{(-1)^n - 1}{n^2\pi}$，$b_n = \dfrac{1}{\pi}\displaystyle\int_0^{\pi} x\sin nx\,\mathrm{d}x = \dfrac{(-1)^{n+1}}{n}$；
    3. 写出级数：$\dfrac{\pi}{4} + \displaystyle\sum_{n=1}^{\infty}\dfrac{(-1)^n - 1}{n^2\pi}\cos nx + \sum_{n=1}^{\infty}\dfrac{(-1)^{n+1}}{n}\sin nx$；
    4. 和函数：在 $(-\pi, \pi)$ 内处处连续，$S(x) = f(x)$；端点 $x = \pm\pi$ 处是跳跃点，$S(\pm\pi) = \dfrac{0 + \pi}{2} = \dfrac{\pi}{2}$；再按周期 $2\pi$ 延拓。
* **18. $[0, \pi]$（或 $[0, l]$）上展开成正弦级数、余弦级数**
  * **问题**：把 $[0, \pi]$ 上的函数展开成正弦级数或余弦级数。
  * **目标**：正弦级数作奇延拓，余弦级数作偶延拓，只积 $[0, \pi]$。
  * **调用**：$b_n = \dfrac{2}{\pi}\displaystyle\int_0^{\pi} f(x)\sin nx\,\mathrm{d}x$；$a_n = \dfrac{2}{\pi}\displaystyle\int_0^{\pi} f(x)\cos nx\,\mathrm{d}x$。
  * **行动**：
    1. 正弦级数；如 $f(x) = x + 1$（$0 \le x \le \pi$）：$b_n = \dfrac{2}{n\pi}\left[1 - (\pi + 1)(-1)^n\right]$；
    2. 端点：奇延拓后 $x = 0$ 处左右极限是 $-1$ 与 $1$，级数收敛于 $0$，不等于 $f(0) = 1$；$x = \pi$ 处也收敛于 $0$；
    3. 余弦级数：$a_0 = \dfrac{2}{\pi}\displaystyle\int_0^{\pi}(x + 1)\,\mathrm{d}x = \pi + 2$，$a_n = \dfrac{2}{\pi} \cdot \dfrac{(-1)^n - 1}{n^2}$；偶延拓后连续，在 $[0, \pi]$ 上处处收敛于 $x + 1$；
    4. 区间是 $[0, l]$ 时：$nx$ 换成 $\dfrac{n\pi x}{l}$，$\dfrac{2}{\pi}\displaystyle\int_0^{\pi}$ 换成 $\dfrac{2}{l}\displaystyle\int_0^{l}$。
* **19. 用傅里叶级数求数项级数的和**
  * **问题**：求 $\displaystyle\sum\dfrac{1}{n^2}$、$\displaystyle\sum\dfrac{1}{(2n - 1)^2}$ 这类级数的和。
  * **目标**：在一个已知的傅里叶展开式里，令 $x$ 取特殊值。
  * **调用**：狄利克雷收敛定理。
  * **行动**：
    1. 选展开式和点；如第 17 类的展开式在 $x = 0$ 处连续，和等于 $f(0) = 0$；
    2. 代入：$\sin 0 = 0$，$\cos 0 = 1$，$0 = \dfrac{\pi}{4} + \displaystyle\sum_{n=1}^{\infty}\dfrac{(-1)^n - 1}{n^2\pi}$；
    3. 化简：$n$ 为偶数时这一项为 $0$，奇数时为 $-\dfrac{2}{n^2\pi}$，所以 $\displaystyle\sum_{k=1}^{\infty}\dfrac{1}{(2k - 1)^2} = \dfrac{\pi^2}{8}$；
    4. 再用 $\displaystyle\sum\dfrac{1}{n^2} = \sum\dfrac{1}{(2k - 1)^2} + \dfrac{1}{4}\sum\dfrac{1}{n^2}$，得 $\displaystyle\sum_{n=1}^{\infty}\dfrac{1}{n^2} = \dfrac{4}{3} \cdot \dfrac{\pi^2}{8} = \dfrac{\pi^2}{6}$。
