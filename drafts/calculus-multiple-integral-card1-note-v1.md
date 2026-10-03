### 〔定义〕

**① 曲顶柱体的体积怎么算**

#### 1. 二重积分：切成小块，每块当平顶，再加起来
* **和定积分对照**：定积分把区间切成小段，每段长 $\Delta x_i$；二重积分把区域切成小块，每块面积 $\Delta\sigma_i$；分割、求和、取极限三步一样。
* **$\lambda$ 为什么用直径**：小块可能是细长条，面积很小，长度却不小；直径是小块里两点间的最远距离，$\lambda \to 0$ 才保证每一块往各个方向都缩小。
* **例**：$f = 1$ 时，和式恒等于 $\sum \Delta\sigma_i$，就是 $D$ 的面积，所以 $\displaystyle\iint_D 1\,\mathrm{d}\sigma = \sigma$。
* **两个字母别混**：$\mathrm{d}\sigma$ 是面积元，$\sigma$ 是面积。

#### 2. 三重积分：区域换成立体，面积换成体积
* **画不出来**：二重积分可以画成曲顶柱体；三重积分的三个自变量已经占满了空间，被积函数没有地方画成高度。
* **用质量来想**：$\rho(x, y, z)$ 是物体各点的密度，三重积分就是物体的质量。
* **例**：$\rho = 1$ 时，三重积分就是 $\Omega$ 的体积。

#### 3. 平均值：推平以后的高度
* **和一元对照**：定积分里 $\dfrac{1}{b - a}\displaystyle\int_a^b f\,\mathrm{d}x$ 是平均值；二重积分把区间长 $b - a$ 换成面积 $\sigma$。
* **例**：$x^2 + y^2$ 在单位圆上的积分是 $\dfrac{\pi}{2}$，面积是 $\pi$，平均值是 $\dfrac{1}{2}$。
* **为什么叫平均**：把区域等分成 $n$ 块，各取一点的函数值求平均，$n \to \infty$ 时就是它。

**② 怎么化成两次定积分**

#### 1. X 型区域与 Y 型区域：竖线（横线）只穿进穿出一次
* **X 型**：竖线穿过区域，只从下边界进、从上边界出；上下边界各是一个 $y = \varphi(x)$。
* **例**：$y = x^2$ 与 $y = x$ 围成的区域：竖线从 $y = x^2$ 进、从 $y = x$ 出，是 X 型；横线从 $x = y$ 进、从 $x = \sqrt{y}$ 出，也是 Y 型。
* **都不是的例**：圆环 $1 \le x^2 + y^2 \le 4$，靠近 $y$ 轴的竖线进出各两次。
* **名字怎么记**：X 型的外层变量是 $x$，外层的上下限是常数 $a, b$。

#### 2. 累次积分：先积里面，再积外面
* **读法**：$\displaystyle\int_a^b \mathrm{d}x\int_{\varphi_1(x)}^{\varphi_2(x)} f\,\mathrm{d}y$ 是 $\displaystyle\int_a^b \left[\int_{\varphi_1(x)}^{\varphi_2(x)} f\,\mathrm{d}y\right]\mathrm{d}x$ 的简写；$\mathrm{d}x$ 写在前面，是为了看清外层的上下限属于 $x$。
* **例**：$\displaystyle\int_0^1 \mathrm{d}x\int_0^x xy\,\mathrm{d}y$：里面是 $\dfrac{x^3}{2}$，外面 $\displaystyle\int_0^1 \dfrac{x^3}{2}\,\mathrm{d}x = \dfrac{1}{8}$。
* **外层为什么只能是常数**：外层算完要得到一个数；外层上下限里有变量，结果就不是数了。

**③ 区域是圆的怎么办**

#### 1. 极坐标：用到原点的距离和转过的角度定位
* **例**：点 $(1, 1)$ 的极坐标是 $r = \sqrt{2}$，$\theta = \dfrac{\pi}{4}$；点 $(0, -2)$ 是 $r = 2$，$\theta = \dfrac{3\pi}{2}$（或 $-\dfrac{\pi}{2}$）。
* **$r$ 不取负**：重积分里 $r$ 是距离；所以 $r = 2\cos\theta$ 只在 $\cos\theta \ge 0$ 的 $\theta$ 上有意义。
* **为什么适合圆**：以原点为心的圆，在极坐标里是 $r = $ 常数，像矩形的一条边一样整齐。

**④ 三重积分怎么算**

#### 1. 投影区域与截面：一个往下压，一个横着切
* **投影区域**：立体在 $xOy$ 面上的影子；先一后二的外层，就在它上面做二重积分。
* **截面**：立体在高度 $z$ 处的一层，像切面包时切下的一片；先二后一的内层，就在它上面做二重积分。
* **例**：球 $x^2 + y^2 + z^2 \le 1$：投影是单位圆；高度 $z$ 处的截面是半径 $\sqrt{1 - z^2}$ 的圆，$S(z) = \pi(1 - z^2)$。

#### 2. 柱面坐标：$xOy$ 面上用极坐标，$z$ 不动
* **坐标面**：$\rho = $ 常数是以 $z$ 轴为轴的圆柱面；$\theta = $ 常数是过 $z$ 轴的半平面；$z = $ 常数是水平面。
* **例**：旋转抛物面 $z = x^2 + y^2$ 写成 $z = \rho^2$；圆柱面 $x^2 + y^2 = 4$ 写成 $\rho = 2$。

#### 3. 球面坐标：到原点的距离，加两个角
* **用地球来想**：$\theta$ 像经度，绕 $z$ 轴转；$\varphi$ 从北极量起，北极 $\varphi = 0$，赤道 $\varphi = \dfrac{\pi}{2}$，南极 $\varphi = \pi$。
* **$\varphi$ 不是纬度**：地理上的纬度从赤道量起；这里的 $\varphi$ 从 $z$ 轴正向量起。
* **坐标面**：$r = $ 常数是球面；$\varphi = $ 常数是以 $z$ 轴为轴的圆锥面；$\theta = $ 常数是过 $z$ 轴的半平面。
* **例**：点 $(0, 0, 2)$ 是 $r = 2$，$\varphi = 0$（$\theta$ 任意）；点 $(1, 0, 0)$ 是 $r = 1$，$\varphi = \dfrac{\pi}{2}$，$\theta = 0$。

**⑤ 重积分怎么算更省事**

#### 1. 区域的对称：对称点也在区域里
* **例**：圆 $x^2 + y^2 \le 1$ 关于两条坐标轴、原点、直线 $y = x$ 都对称；圆 $x^2 + y^2 \le 2x$ 的圆心在 $(1, 0)$，只关于 $x$ 轴对称。
* **三角形的例**：$0 \le y \le x \le 1$ 不关于 $y = x$ 对称；把 $x, y$ 互换，得到 $0 \le x \le y \le 1$，是正方形的另一半。
* **关于 $y = x$ 对称的画面**：沿直线 $y = x$ 对折，两半重合。

#### 2. 关于某个变量的奇偶：只让这一个变量变号
* **例**：$f = xy^2$ 关于 $x$ 是奇函数（$x$ 变号，值变号），关于 $y$ 是偶函数。
* **例**：$f = x + y$ 关于 $x$ 既不是奇函数也不是偶函数；但拆开后，$x$ 这一项关于 $x$ 是奇的。
* **和一元对照**：一元的奇函数是 $f(-x) = -f(x)$；这里另一个变量 $y$ 保持不动。

**⑥ 什么量能用重积分算**

#### 1. 质心与静矩：按质量加权的平均位置
* **例**：质量 $1$ 的质点在 $x = 0$，质量 $3$ 的在 $x = 4$：$\bar{x} = \dfrac{1 \cdot 0 + 3 \cdot 4}{4} = 3$，偏向重的一边。
* **用杠杆来想**：支点放在 $y$ 轴上，各质点对 $y$ 轴的静矩加起来为 $0$，杠杆就平衡；支点放在质心处，杠杆总是平衡的。
* **为什么叫对 $y$ 轴**：$x_i$ 是质点到 $y$ 轴的有向距离。

#### 2. 形心：只看形状的质心
* **例**：圆的形心是圆心，矩形的形心是对角线的交点，三角形的形心是三条中线的交点，坐标是三个顶点坐标的平均。
* **和质心的区别**：密度不均匀时，质心偏向密的一边，形心不动。

#### 3. 转动惯量：离轴越远，越难转动
* **用推门来想**：同样重的门，质量集中在门轴附近好推，集中在门边难推。
* **为什么是平方**：绕轴转动时，离轴 $d$ 处的点速度与 $d$ 成正比，动能与速度的平方成正比。
* **例**：质量 $2$ 的质点离轴 $3$，$I = 2 \times 3^2 = 18$。

#### 4. 引力：两个质点互相吸引
* **大小**：与两个质量的乘积成正比，与距离的平方成反比。
* **方向**：沿两点的连线，指向对方；引力是向量。
* **为什么重积分要分量**：物体的各小块对质点的引力，方向各不相同，大小不能直接相加。

---

### 〔性质〕

**① 曲顶柱体的体积怎么算**

**二重积分**

#### 1. 几何意义：$f \ge 0$ 时是曲顶柱体的体积
* **例**：$\displaystyle\iint_{x^2 + y^2 \le R^2} \sqrt{R^2 - x^2 - y^2}\,\mathrm{d}\sigma$ 是上半球的体积 $\dfrac{2}{3}\pi R^3$，不用算。
* **有正有负**：$\displaystyle\iint_{x^2 + y^2 \le 1} x\,\mathrm{d}\sigma = 0$：右半边在 $xOy$ 面上方的体积，与左半边在下方的体积相等。
* **面积**：$f = 1$ 时柱体高为 $1$，体积在数值上等于底面积。

#### 2. 基本性质：和定积分一条一条对应
* **区域可加用在哪**：分块计算；区域里挖去一块时，用整体减去挖掉的部分。
* **比较的用法**：同一区域上比较两个积分，只比被积函数。
* **例**：单位圆上 $0 \le x^2 + y^2 \le 1$，所以 $(x^2 + y^2)^2 \le x^2 + y^2$，积分也是前者小。
* **估值的 $m, M$**：被积函数在整个 $D$ 上（包括边界）的最小值、最大值。

#### 3. 中值定理：平均值一定取得到
* **为什么要连续**：正方形左半边 $f = 0$、右半边 $f = 1$，平均值是 $\dfrac{1}{2}$，哪一点都取不到。
* **缩成一点**：圆越小，圆上各点的值越接近圆心处的值，平均值也就趋于圆心处的值。
* **例**：$\lim\limits_{r \to 0^+}\dfrac{1}{\pi r^2}\displaystyle\iint_{x^2 + y^2 \le r^2} e^{x + y}\,\mathrm{d}\sigma = e^0 = 1$。

#### 4. 二重积分是一个数：和积分变量的字母无关
* **例**：$\displaystyle\iint_{[0, 1] \times [0, 1]} xy\,\mathrm{d}x\,\mathrm{d}y = \iint_{[0, 1] \times [0, 1]} uv\,\mathrm{d}u\,\mathrm{d}v = \dfrac{1}{4}$。
* **题目为什么换字母**：$f(x, y) = xy + \displaystyle\iint_D f(u, v)\,\mathrm{d}u\,\mathrm{d}v$ 里，若写成 $\displaystyle\iint_D f(x, y)\,\mathrm{d}\sigma$，容易误以为它随 $x, y$ 变。

**三重积分**

#### 1. 性质：与二重积分相同
* **例**：$\displaystyle\iiint_{x^2 + y^2 + z^2 \le R^2} 1\,\mathrm{d}v = \dfrac{4}{3}\pi R^3$。
* **中值定理**：连续函数在立体上的平均值，一定在立体内某一点取到。

**反过来用定义**

#### 1. 双重和式的极限：认出被积函数和区域
* **怎么认**：每一项写成 $\dfrac{1}{n^2}f\left(\dfrac{i}{n}, \dfrac{j}{n}\right)$；$\dfrac{i}{n}$ 换成 $x$，$\dfrac{j}{n}$ 换成 $y$，$\dfrac{1}{n^2}$ 换成 $\mathrm{d}\sigma$。
* **例**：$\lim\limits_{n \to \infty}\dfrac{1}{n^2}\displaystyle\sum_{i=1}^{n}\sum_{j=1}^{n}\dfrac{i}{n} \cdot \dfrac{j}{n} = \iint_{[0, 1] \times [0, 1]} xy\,\mathrm{d}\sigma = \dfrac{1}{4}$。
* **和一元对照**：一个求和号、提出 $\dfrac{1}{n}$，是定积分；两个求和号、提出 $\dfrac{1}{n^2}$，是二重积分。

**② 怎么化成两次定积分**

#### 1. 化二重积分为累次积分：截面面积再积分
* **内层在算什么**：固定 $x$，$\displaystyle\int f(x, y)\,\mathrm{d}y$ 是位置 $x$ 处截面（一块曲边梯形）的面积 $A(x)$。
* **两种次序算的是同一个体积**：一个竖着切，一个横着切，切法不同，体积不变。
* **例**：$\displaystyle\iint_{[0, 1] \times [0, 2]} (x + y)\,\mathrm{d}\sigma$：先 $y$，$\displaystyle\int_0^1 (2x + 2)\,\mathrm{d}x = 3$；先 $x$，$\displaystyle\int_0^2 \left(\dfrac{1}{2} + y\right)\mathrm{d}y = 3$。

#### 2. 分块：一个式子写不下，就分开写
* **两型都不是**：如圆环，可用竖线 $x = -1$、$x = 1$ 切成四块；更好的办法是换极坐标。
* **被积函数分段**：$|y - x^2|$ 在 $y = x^2$ 两侧是两个式子；$\max\{x, y\}$ 在 $y = x$ 两侧是两个式子。
* **分界线怎么找**：令绝对值里面等于 $0$，或令 $\max$ 里的两者相等。

#### 3. 矩形区域上变量分离：两个定积分相乘
* **两个条件**：区域是矩形（四个上下限都是常数）；被积函数是 $g(x)h(y)$ 的乘积。缺一个都不行。
* **例**：$\displaystyle\iint_{[0, 1] \times [0, \pi]} x\sin y\,\mathrm{d}\sigma = \int_0^1 x\,\mathrm{d}x \cdot \int_0^{\pi}\sin y\,\mathrm{d}y = \dfrac{1}{2} \cdot 2 = 1$。
* **反例**：三角形 $0 \le y \le x \le 1$ 上 $\displaystyle\iint xy\,\mathrm{d}\sigma = \dfrac{1}{8}$，不等于 $\displaystyle\int_0^1 x\,\mathrm{d}x \cdot \int_0^1 y\,\mathrm{d}y = \dfrac{1}{4}$。

#### 4. 交换积分次序：先画图，再换着读
* **为什么要画图**：上下限是区域的一种读法；换次序是换一种读法，图是两种读法之间的桥。
* **例**：$\displaystyle\int_0^1 \mathrm{d}x\int_{x^2}^{x} f\,\mathrm{d}y$：区域在 $y = x^2$ 与 $y = x$ 之间；横着读，$y$ 从 $0$ 到 $1$，$x$ 从 $y$ 到 $\sqrt{y}$，得 $\displaystyle\int_0^1 \mathrm{d}y\int_y^{\sqrt{y}} f\,\mathrm{d}x$。
* **两个累次积分相加**：它们往往是同一个区域被竖线切开的两块；换成横着切，可能一个式子就够。

#### 5. 原函数不是初等函数（边界）：内层积不出，就换次序
* **意思**：这些函数有原函数，只是写不成有限个初等函数的组合；$\displaystyle\int_0^1 e^{x^2}\,\mathrm{d}x$ 是一个确定的数，只是不能用牛顿-莱布尼茨公式算。
* **换次序为什么能救**：换次序后，内层变成对另一个变量积分，常常多出一个因子，正好凑出微分；如 $\displaystyle\int_0^1 \mathrm{d}x\int_x^1 e^{y^2}\,\mathrm{d}y$ 换序后多出 $y$。
* **认出提示**：题目给的累次积分，内层是 $e^{y^2}$、$\dfrac{\sin y}{y}$ 这类，就是在提示换次序。

**③ 区域是圆的怎么办**

#### 1. 极坐标下的二重积分：多一个 $r$
* **为什么多 $r$**：同样的 $\Delta\theta$，越往外张开的弧越长；扇环的面积约为 $r\Delta r\Delta\theta$，离原点越远越大。
* **例**：单位圆的面积 $\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^1 r\,\mathrm{d}r = \pi$；漏了 $r$，会算成 $2\pi$。
* **被积函数也要换**：$x$ 换成 $r\cos\theta$，$y$ 换成 $r\sin\theta$，$x^2 + y^2$ 换成 $r^2$。

#### 2. 极坐标下化为累次积分：先定角，再看射线
* **先定 $\theta$**：从原点看区域，区域夹在两条射线之间，这两条射线的角度就是 $\theta$ 的范围。
* **再定 $r$**：沿角度为 $\theta$ 的射线，看它从哪条曲线进入区域、从哪条曲线离开。
* **例**：圆环 $1 \le x^2 + y^2 \le 4$：极点在环中间的洞里，不在区域内；$\theta$ 从 $0$ 到 $2\pi$，$r$ 从 $1$ 到 $2$。

#### 3. 常见边界的极坐标方程（查表）：代入以后自己推
* **怎么推**：$x^2 + y^2 = 2ax$ 代入 $x = r\cos\theta$，得 $r^2 = 2ar\cos\theta$，约去 $r$，得 $r = 2a\cos\theta$。
* **$\theta$ 的范围看图**：圆 $x^2 + y^2 = 2ax$ 在 $y$ 轴右边，与 $y$ 轴相切于原点，所以 $\theta$ 从 $-\dfrac{\pi}{2}$ 到 $\dfrac{\pi}{2}$。
* **直线**：$x = a$ 代入得 $r\cos\theta = a$，即 $r = \dfrac{a}{\cos\theta}$。

#### 4. 圆上只含 $x^2 + y^2$ 的被积函数：一重积分就够
* **为什么**：被积函数只和到原点的距离有关，对 $\theta$ 积分只是乘 $2\pi$。
* **例**：$\displaystyle\iint_{x^2 + y^2 \le 1}(x^2 + y^2)\,\mathrm{d}\sigma = 2\pi\int_0^1 r^2 \cdot r\,\mathrm{d}r = \dfrac{\pi}{2}$。
* **用在变限积分**：半径换成 $t$，就是 $t$ 的变限积分，可以求导、求极限。

#### 5. 泊松积分：一维积不出，平方以后用极坐标
* **为什么要平方**：$I^2 = \displaystyle\int_0^{+\infty} e^{-x^2}\,\mathrm{d}x \cdot \int_0^{+\infty} e^{-y^2}\,\mathrm{d}y$，两个定积分合成一个二重积分，被积函数变成 $e^{-(x^2 + y^2)}$，只含 $x^2 + y^2$。
* **积分区域**：$x \ge 0$，$y \ge 0$ 是第一象限，$\theta$ 从 $0$ 到 $\dfrac{\pi}{2}$。
* **常用的变形**：$\displaystyle\int_{-\infty}^{+\infty} e^{-x^2}\,\mathrm{d}x = \sqrt{\pi}$（偶函数）；$\displaystyle\int_{-\infty}^{+\infty} e^{-\frac{x^2}{2}}\,\mathrm{d}x = \sqrt{2\pi}$，概率论的正态分布要用。

#### 6. 二重积分的换元法：面积放大 $|J|$ 倍
* **$J$ 的意思**：$uv$ 平面上的一个小方块，变到 $xy$ 平面上是一个小平行四边形，面积放大 $|J|$ 倍。
* **为什么取绝对值**：$J$ 可能为负（如把 $u, v$ 的次序对调），面积不能为负。
* **$J$ 的方向**：$J = \dfrac{\partial(x, y)}{\partial(u, v)}$ 是旧变量对新变量；题目给的是 $u = u(x, y)$ 时，先求 $\dfrac{\partial(u, v)}{\partial(x, y)}$，再取倒数。
* **例**：$u = x + y$，$v = x - y$：$\dfrac{\partial(u, v)}{\partial(x, y)} = 1 \cdot (-1) - 1 \cdot 1 = -2$，所以 $J = -\dfrac{1}{2}$，$|J| = \dfrac{1}{2}$。

**④ 三重积分怎么算**

#### 1. 投影法（先一后二）：竖着穿一根针
* **内层**：固定 $(x, y)$，沿竖线从下曲面积到上曲面，结果是 $x, y$ 的函数。
* **外层**：在投影区域上做二重积分，这时还可以再选直角坐标或极坐标。
* **例**：四面体 $0 \le z \le 1 - x - y$，$x, y \ge 0$ 的体积：$\displaystyle\iint_{D_{xy}}(1 - x - y)\,\mathrm{d}\sigma = \int_0^1 \dfrac{(1 - x)^2}{2}\,\mathrm{d}x = \dfrac{1}{6}$。
* **上下曲面要分清**：竖线先碰到的是下曲面；两张曲面在投影区域内交叉，要分块。

#### 2. 截面法（先二后一）：横着切成一层一层
* **什么时候好用**：被积函数只含 $z$，截面是圆、椭圆、三角形这类面积好算的图形。
* **例**：$\displaystyle\iiint_{x^2 + y^2 + z^2 \le 1} z^2\,\mathrm{d}v = \int_{-1}^{1} z^2 \cdot \pi(1 - z^2)\,\mathrm{d}z = \dfrac{4\pi}{15}$。
* **被积函数含 $x, y$ 时**：截面上的二重积分要真算，常常不如投影法。

#### 3. 柱面坐标下的三重积分：底面换极坐标
* **多一个 $\rho$**：和极坐标多一个 $r$ 是同一个原因；竖直方向的边长 $\mathrm{d}z$ 不变。
* **例**：圆柱 $x^2 + y^2 \le 1$，$0 \le z \le 2$ 的体积：$\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^1 \rho\,\mathrm{d}\rho\int_0^2 \mathrm{d}z = 2\pi$。
* **定限顺序**：先看投影定 $\theta$、$\rho$，再看竖线从哪进、从哪出定 $z$。

#### 4. 球面坐标下的三重积分：多 $r^2\sin\varphi$
* **为什么是 $r\sin\varphi$**：点 $M$ 绕 $z$ 轴转一圈画出的纬线圆，半径是 $M$ 到 $z$ 轴的距离 $r\sin\varphi$；$\theta$ 变 $\mathrm{d}\theta$，在这个圆上走过 $r\sin\varphi\,\mathrm{d}\theta$。
* **例**：球的体积 $\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^{\pi}\sin\varphi\,\mathrm{d}\varphi\int_0^R r^2\,\mathrm{d}r = 2\pi \cdot 2 \cdot \dfrac{R^3}{3} = \dfrac{4}{3}\pi R^3$。
* **$\varphi$ 的范围**：整个球，$\varphi$ 从 $0$ 到 $\pi$；圆锥面 $z = \sqrt{x^2 + y^2}$ 以内的部分，$\varphi$ 从 $0$ 到 $\dfrac{\pi}{4}$。

**⑤ 重积分怎么算更省事**

#### 1. 二重积分的奇偶对称：两半抵消
* **配对的规则**：区域关于 $y$ 轴对称，对称点是 $x$ 变号；所以看 $f$ 关于 $x$ 的奇偶。
* **例**：$\displaystyle\iint_{x^2 + y^2 \le 1}(x^3 + xy^2)\,\mathrm{d}\sigma = 0$：区域关于 $y$ 轴对称，被积函数关于 $x$ 是奇函数。
* **区域不对称就不能用**：$x^2 + y^2 \le 2x$ 上 $\displaystyle\iint x\,\mathrm{d}\sigma = \pi \ne 0$；$x$ 是奇函数，但区域不关于 $y$ 轴对称。

#### 2. 二重积分的轮换对称：$x, y$ 换个名字
* **为什么成立**：把积分里的字母 $x$ 改叫 $y$、$y$ 改叫 $x$，积分不变；区域关于 $y = x$ 对称，按新名字写出来还是 $D$。
* **例**：单位圆上 $\displaystyle\iint x^2\,\mathrm{d}\sigma = \iint y^2\,\mathrm{d}\sigma$，两者之和是 $\displaystyle\iint (x^2 + y^2)\,\mathrm{d}\sigma = \dfrac{\pi}{2}$，所以各为 $\dfrac{\pi}{4}$。
* **分式的例**：$\dfrac{af(x) + bf(y)}{f(x) + f(y)}$ 与互换后的式子相加，分子是 $(a + b)[f(x) + f(y)]$，与分母约掉，剩 $a + b$。

#### 3. 三重积分的对称性：对称面换成坐标面
* **配对的规则**：关于 $xOy$ 面对称，对称点是 $z$ 变号，看 $f$ 关于 $z$ 的奇偶。
* **例**：单位球上 $\displaystyle\iiint z\,\mathrm{d}v = 0$；$\displaystyle\iiint z^2\,\mathrm{d}v = \dfrac{1}{3}\iiint (x^2 + y^2 + z^2)\,\mathrm{d}v = \dfrac{1}{3} \cdot \dfrac{4\pi}{5} = \dfrac{4\pi}{15}$，与截面法的结果相同。
* **只能换两个时**：圆柱 $x^2 + y^2 \le 1$，$0 \le z \le 1$ 上，只有 $x, y$ 能互换；$\displaystyle\iiint x^2\,\mathrm{d}v = \iiint y^2\,\mathrm{d}v$，但不等于 $\displaystyle\iiint z^2\,\mathrm{d}v$。

**⑥ 什么量能用重积分算**

#### 1. 用权统一：换一个权，换一个量
* **例**：同一块薄片 $D$：权取 $1$ 得面积，取 $\mu$ 得质量，取 $x\mu$ 得对 $y$ 轴的静矩，取 $(x^2 + y^2)\mu$ 得对原点的转动惯量。
* **一个思路管一类**：只要写得出「每一小块的这个量」，总量就是积分；不用分别背公式。

#### 2. 立体的体积：上面减下面
* **例**：$z = 1 - x^2 - y^2$ 与 $xOy$ 面围成的立体：$V = \displaystyle\iint_{x^2 + y^2 \le 1}(1 - x^2 - y^2)\,\mathrm{d}\sigma = \dfrac{\pi}{2}$。
* **$D$ 怎么定**：两张曲面的交线投到 $xOy$ 面上围成 $D$；在 $D$ 上，上曲面始终在下曲面之上。

#### 3. 曲面的面积：越斜，放大得越多
* **平面的例**：平面 $z = x$ 在正方形 $[0, 1] \times [0, 1]$ 上方的部分：$f_x = 1$，$f_y = 0$，面积 $\sqrt{2}$；它是边长 $1$ 和 $\sqrt{2}$ 的矩形，面积确实是 $\sqrt{2}$。
* **水平时**：$f_x = f_y = 0$，$\mathrm{d}S = \mathrm{d}\sigma$，曲面面积等于投影面积。
* **球面的例**：上半球面 $z = \sqrt{R^2 - x^2 - y^2}$ 的面积 $\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^R \dfrac{Rr}{\sqrt{R^2 - r^2}}\,\mathrm{d}r = 2\pi R^2$。

#### 4. 质量与质心：密度加权的平均位置
* **例**：正方形薄片 $[0, 2] \times [0, 2]$，密度均匀时质心在中心 $(1, 1)$；密度 $\mu = x$ 时右边更重，$\bar{x} = \dfrac{\iint x^2\,\mathrm{d}\sigma}{\iint x\,\mathrm{d}\sigma} = \dfrac{16/3}{4} = \dfrac{4}{3}$。
* **对称**：区域和密度都关于直线 $x = 1$ 对称时，$\bar{x} = 1$；只有区域对称、密度不对称，不能这样定。

#### 5. 形心：反过来用，省掉积分
* **例**：三角形 $(0, 0)$、$(2, 0)$、$(0, 2)$ 的形心是 $\left(\dfrac{2}{3}, \dfrac{2}{3}\right)$，面积 $2$，所以 $\displaystyle\iint_D x\,\mathrm{d}\sigma = \dfrac{4}{3}$。
* **一次式的例**：同一个三角形上 $\displaystyle\iint_D (2x - y + 1)\,\mathrm{d}\sigma = \left(2 \cdot \dfrac{2}{3} - \dfrac{2}{3} + 1\right) \cdot 2 = \dfrac{10}{3}$。

#### 6. 转动惯量：到轴距离的平方
* **对 $x$ 轴为什么是 $y^2$**：平面上点 $(x, y)$ 到 $x$ 轴的距离是 $|y|$。
* **空间里**：点 $(x, y, z)$ 到 $z$ 轴的距离是 $\sqrt{x^2 + y^2}$，所以 $I_z$ 的被积函数是 $(x^2 + y^2)\rho$。
* **平面薄片的关系**：$I_O = I_x + I_y$，因为 $x^2 + y^2 = y^2 + x^2$。

#### 7. 引力：按分量各积一次
* **为什么分母是 $r^3$**：大小里有 $\dfrac{1}{r^2}$，方向的单位向量 $\dfrac{x - x_0}{r}$ 里又有一个 $\dfrac{1}{r}$。
* **对称**：均匀圆片对它轴线上的点，水平方向的分量两两抵消，只剩竖直分量。
* **符号**：某个分量为负，说明这个方向上的引力指向坐标减小的一侧。

---

### 〔例题〕

**① 曲顶柱体的体积怎么算**

#### 例题 1：一个圆，四种问法

**题目**：设 $D: x^2 + y^2 \le 1$。
1. 用几何意义求 $\displaystyle\iint_D \sqrt{1 - x^2 - y^2}\,\mathrm{d}\sigma$；
2. 估计 $\displaystyle\iint_D e^{x^2 + y^2}\,\mathrm{d}\sigma$ 的范围；
3. 比较 $I_1 = \displaystyle\iint_D (x^2 + y^2)\,\mathrm{d}\sigma$ 与 $I_2 = \displaystyle\iint_D (x^2 + y^2)^2\,\mathrm{d}\sigma$；
4. 求 $\lim\limits_{r \to 0^+}\dfrac{1}{r^2}\displaystyle\iint_{x^2 + y^2 \le r^2} e^x\cos y\,\mathrm{d}\sigma$。
##### 【小题 1】看成体积
* $z = \sqrt{1 - x^2 - y^2}$ 是上半个单位球面，积分是上半球的体积；
* 结果是 $\dfrac{1}{2} \cdot \dfrac{4}{3}\pi = \dfrac{2\pi}{3}$。
* **细节**：被积函数非负，才能直接说是体积；这里根号保证了非负。
##### 【小题 2】求区域上的最值
* $D$ 上 $0 \le x^2 + y^2 \le 1$，所以 $1 \le e^{x^2 + y^2} \le e$；$\sigma = \pi$；
* $\pi \le \displaystyle\iint_D e^{x^2 + y^2}\,\mathrm{d}\sigma \le e\pi$。
* **细节**：真实值是 $2\pi\displaystyle\int_0^1 e^{r^2}r\,\mathrm{d}r = \pi(e - 1) \approx 5.40$，确实在 $\pi \approx 3.14$ 与 $e\pi \approx 8.54$ 之间。
##### 【小题 3】比被积函数
* $D$ 上 $0 \le x^2 + y^2 \le 1$，所以 $(x^2 + y^2)^2 \le x^2 + y^2$，$I_2 \le I_1$；
* 实际 $I_1 = \dfrac{\pi}{2}$，$I_2 = \dfrac{\pi}{3}$。
* **细节**：$t^2 \le t$ 只在 $0 \le t \le 1$ 时成立；区域换成 $x^2 + y^2 \le 4$，结论就不对了。
##### 【小题 4】分母差一个 $\pi$
* 中值定理：积分 $= e^{\xi}\cos\eta \cdot \pi r^2$，$(\xi, \eta)$ 在小圆内；
* 原式 $= \lim\limits_{r \to 0^+}\pi e^{\xi}\cos\eta = \pi \cdot e^0\cos 0 = \pi$。
* **细节**：分母是 $r^2$，不是面积 $\pi r^2$，结果多一个 $\pi$；分母的阶更高时，中值定理不够，要按 ③ 化成变限积分。

#### 例题 2：和式与积分方程

**题目**：
1. 求 $\lim\limits_{n \to \infty}\displaystyle\sum_{i=1}^{n}\sum_{j=1}^{n}\dfrac{i + j}{n^3}$；
2. 求 $\lim\limits_{n \to \infty}\displaystyle\sum_{i=1}^{n}\sum_{j=1}^{n}\dfrac{n^2}{(n^2 + i^2)(n^2 + j^2)}$；
3. 设 $D$ 是三角形 $0 \le y \le x \le 1$，$f(x, y) = x + y + \displaystyle\iint_D f(u, v)\,\mathrm{d}u\,\mathrm{d}v$，求 $f$。
##### 【小题 1】凑出 $\dfrac{1}{n^2}$
* $\dfrac{i + j}{n^3} = \dfrac{1}{n^2}\left(\dfrac{i}{n} + \dfrac{j}{n}\right)$；
* 极限 $= \displaystyle\iint_{[0, 1] \times [0, 1]}(x + y)\,\mathrm{d}\sigma = \dfrac{1}{2} + \dfrac{1}{2} = 1$。
* **细节**：$n^3$ 拆成 $n^2 \cdot n$：$n^2$ 给 $\dfrac{1}{n^2}$，剩下的 $n$ 分给 $i$ 和 $j$。
##### 【小题 2】变量分离
* 每一项 $= \dfrac{1}{n^2} \cdot \dfrac{1}{1 + \left(\frac{i}{n}\right)^2} \cdot \dfrac{1}{1 + \left(\frac{j}{n}\right)^2}$；
* 极限 $= \displaystyle\int_0^1 \dfrac{\mathrm{d}x}{1 + x^2} \cdot \int_0^1 \dfrac{\mathrm{d}y}{1 + y^2} = \left(\dfrac{\pi}{4}\right)^2 = \dfrac{\pi^2}{16}$。
* **细节**：两个因子一个只含 $i$、一个只含 $j$，区域又是正方形，才能拆成两个定积分相乘。
##### 【小题 3】设常数，两边积分
* 设 $A = \displaystyle\iint_D f(u, v)\,\mathrm{d}u\,\mathrm{d}v$，则 $f(x, y) = x + y + A$；
* 两边在 $D$ 上积分：$A = \displaystyle\iint_D (x + y)\,\mathrm{d}\sigma + A\sigma$；$\sigma = \dfrac{1}{2}$，$\displaystyle\iint_D (x + y)\,\mathrm{d}\sigma = \int_0^1 \mathrm{d}x\int_0^x (x + y)\,\mathrm{d}y = \int_0^1 \dfrac{3x^2}{2}\,\mathrm{d}x = \dfrac{1}{2}$；
* $A = \dfrac{1}{2} + \dfrac{A}{2}$，$A = 1$，所以 $f(x, y) = x + y + 1$。
* **细节**：能解出 $A$，要求 $\sigma \ne 1$；$\sigma = 1$ 时方程变成 $A = \displaystyle\iint_D (x + y)\,\mathrm{d}\sigma + A$，要么无解，要么 $A$ 任意。

---

**② 怎么化成两次定积分**

#### 例题 3：交换次序的三种情形

**题目**：
1. 交换 $\displaystyle\int_0^2 \mathrm{d}x\int_x^{2x} f(x, y)\,\mathrm{d}y$ 的次序；
2. 计算 $\displaystyle\int_0^1 \mathrm{d}y\int_{\sqrt{y}}^{1}\sqrt{x^3 + 1}\,\mathrm{d}x$；
3. 计算 $\displaystyle\int_0^1 \mathrm{d}x\int_x^{\sqrt{x}}\dfrac{\sin y}{y}\,\mathrm{d}y$。
##### 【小题 1】换序后要分块
* 区域：$0 \le x \le 2$，$x \le y \le 2x$，是 $y = x$、$y = 2x$、$x = 2$ 围成的三角形，顶点 $(0, 0)$、$(2, 2)$、$(2, 4)$；
* 横着切：左边界始终是 $x = \dfrac{y}{2}$；右边界在 $y = 2$ 处由 $x = y$ 换成 $x = 2$；
* 结果 $\displaystyle\int_0^2 \mathrm{d}y\int_{\frac{y}{2}}^{y} f\,\mathrm{d}x + \int_2^4 \mathrm{d}y\int_{\frac{y}{2}}^{2} f\,\mathrm{d}x$。
* **细节**：原来一块，换序后两块；分界线是过顶点 $(2, 2)$ 的水平线 $y = 2$。
##### 【小题 2】内层积不出
* 区域：$0 \le y \le 1$，$\sqrt{y} \le x \le 1$，即 $0 \le x \le 1$，$0 \le y \le x^2$；
* 原式 $= \displaystyle\int_0^1 \sqrt{x^3 + 1}\,\mathrm{d}x\int_0^{x^2}\mathrm{d}y = \int_0^1 x^2\sqrt{x^3 + 1}\,\mathrm{d}x = \dfrac{2}{9}(2\sqrt{2} - 1)$。
* **细节**：换序后内层积出 $x^2$，正好是 $x^3 + 1$ 的导数的 $\dfrac{1}{3}$。
##### 【小题 3】区域夹在直线和抛物线之间
* 区域：$0 \le x \le 1$，$x \le y \le \sqrt{x}$，即 $0 \le y \le 1$，$y^2 \le x \le y$；
* 原式 $= \displaystyle\int_0^1 \dfrac{\sin y}{y}(y - y^2)\,\mathrm{d}y = \int_0^1 (1 - y)\sin y\,\mathrm{d}y = 1 - \sin 1$。
* **细节**：$\displaystyle\int_0^1 \sin y\,\mathrm{d}y = 1 - \cos 1$，$\displaystyle\int_0^1 y\sin y\,\mathrm{d}y$ 用分部，等于 $\sin 1 - \cos 1$，相减得 $1 - \sin 1$。

#### 例题 4：选次序、变量分离、分块

**题目**：
1. 求 $\displaystyle\iint_D xy\,\mathrm{d}\sigma$，$D$ 由 $y = x$ 与 $y = x^2$ 围成；
2. 求 $\displaystyle\iint_{[0, 1] \times [0, 1]} xy^2e^{x^2}\,\mathrm{d}\sigma$；
3. 求 $\displaystyle\iint_{[0, 1] \times [-1, 0]} xe^{xy}\,\mathrm{d}\sigma$；
4. 求 $\displaystyle\iint_{[0, 1] \times [0, 1]}\max\{x, y\}\,\mathrm{d}\sigma$。
##### 【小题 1】两种次序都行
* X 型：$\displaystyle\int_0^1 x\,\mathrm{d}x\int_{x^2}^{x} y\,\mathrm{d}y = \int_0^1 \dfrac{x^3 - x^5}{2}\,\mathrm{d}x = \dfrac{1}{24}$；
* Y 型核对：$\displaystyle\int_0^1 y\,\mathrm{d}y\int_y^{\sqrt{y}} x\,\mathrm{d}x = \int_0^1 \dfrac{y^2 - y^3}{2}\,\mathrm{d}y = \dfrac{1}{24}$。
* **细节**：交点 $(0, 0)$、$(1, 1)$；在 $[0, 1]$ 上 $x^2 \le x$，所以 $y = x^2$ 是下边界。
##### 【小题 2】矩形加乘积，拆开
* 原式 $= \displaystyle\int_0^1 xe^{x^2}\,\mathrm{d}x \cdot \int_0^1 y^2\,\mathrm{d}y = \dfrac{e - 1}{2} \cdot \dfrac{1}{3} = \dfrac{e - 1}{6}$。
##### 【小题 3】先对 $y$ 积分
* 先对 $y$：$\displaystyle\int_{-1}^{0} xe^{xy}\,\mathrm{d}y = e^{xy}\Big|_{y=-1}^{0} = 1 - e^{-x}$；
* 再对 $x$：$\displaystyle\int_0^1 (1 - e^{-x})\,\mathrm{d}x = e^{-1}$。
* **细节**：被积函数不能分离；先对 $x$ 积要分部，先对 $y$ 积时，$x$ 正好是 $e^{xy}$ 对 $y$ 求导多出的因子。
##### 【小题 4】$\max$ 用 $y = x$ 分开
* $y \le x$ 的一半上 $\max = x$，$y \ge x$ 的一半上 $\max = y$；两块关于 $y = x$ 对称，积分相等；
* 原式 $= 2\displaystyle\int_0^1 \mathrm{d}x\int_0^x x\,\mathrm{d}y = 2\int_0^1 x^2\,\mathrm{d}x = \dfrac{2}{3}$。
* **细节**：分界线由「两者相等」定出；轮换对称让两块只算一块。

---

**③ 区域是圆的怎么办**

#### 例题 5：极点在外、在边界、在里面

**题目**：
1. $D: 1 \le x^2 + y^2 \le 4$，求 $\displaystyle\iint_D \ln(x^2 + y^2)\,\mathrm{d}\sigma$；
2. $D: x^2 + y^2 \le 2y$，求 $\displaystyle\iint_D (x^2 + y^2)\,\mathrm{d}\sigma$；
3. $D: x^2 + y^2 \le 1$，$x + y \ge 1$，求 $\displaystyle\iint_D \dfrac{x + y}{x^2 + y^2}\,\mathrm{d}\sigma$；
4. $D: 0 \le x \le 1$，$0 \le y \le 1$，求 $\displaystyle\iint_D |x^2 + y^2 - 1|\,\mathrm{d}\sigma$。
##### 【小题 1】圆环：上下限都是常数
* $\theta$ 从 $0$ 到 $2\pi$，$r$ 从 $1$ 到 $2$；$\ln(x^2 + y^2) = 2\ln r$；
* 原式 $= 2\pi\displaystyle\int_1^2 2r\ln r\,\mathrm{d}r = 4\pi\left(2\ln 2 - \dfrac{3}{4}\right) = 8\pi\ln 2 - 3\pi$。
* **细节**：$\displaystyle\int r\ln r\,\mathrm{d}r = \dfrac{r^2}{2}\ln r - \dfrac{r^2}{4}$（分部）；极点在环中间的洞里，内层下限是 $1$，不是 $0$。
##### 【小题 2】极点在边界上
* 边界 $r = 2\sin\theta$，$\theta$ 从 $0$ 到 $\pi$；
* 原式 $= \displaystyle\int_0^{\pi}\mathrm{d}\theta\int_0^{2\sin\theta} r^2 \cdot r\,\mathrm{d}r = \int_0^{\pi} 4\sin^4\theta\,\mathrm{d}\theta = \dfrac{3\pi}{2}$。
* **细节**：$\displaystyle\int_0^{\pi}\sin^4\theta\,\mathrm{d}\theta = 2\int_0^{\frac{\pi}{2}}\sin^4\theta\,\mathrm{d}\theta = 2 \cdot \dfrac{3}{4} \cdot \dfrac{1}{2} \cdot \dfrac{\pi}{2} = \dfrac{3\pi}{8}$，用点火公式（第 3 章）。
##### 【小题 3】极点在区域外
* $\theta$ 从 $0$ 到 $\dfrac{\pi}{2}$；射线从直线 $r = \dfrac{1}{\cos\theta + \sin\theta}$ 进、从圆 $r = 1$ 出；
* 被积函数 $\dfrac{r(\cos\theta + \sin\theta)}{r^2}$ 乘面积元里的 $r$，得 $\cos\theta + \sin\theta$；
* 原式 $= \displaystyle\int_0^{\frac{\pi}{2}}(\cos\theta + \sin\theta)\left(1 - \dfrac{1}{\cos\theta + \sin\theta}\right)\mathrm{d}\theta = \int_0^{\frac{\pi}{2}}(\cos\theta + \sin\theta - 1)\,\mathrm{d}\theta = 2 - \dfrac{\pi}{2}$。
* **细节**：内层下限不是 $0$；被积函数分母的 $r^2$ 和面积元的 $r$ 约掉一个 $r$。
##### 【小题 4】分块，再用整体减
* 分界线是圆弧 $x^2 + y^2 = 1$；圆内的部分 $D_1$ 是四分之一圆：$\displaystyle\iint_{D_1}(1 - x^2 - y^2)\,\mathrm{d}\sigma = \dfrac{\pi}{2}\int_0^1 (1 - r^2)r\,\mathrm{d}r = \dfrac{\pi}{8}$；
* 圆外的部分 $D_2$ 是正方形减去 $D_1$：$\displaystyle\iint_{D_2}(x^2 + y^2 - 1)\,\mathrm{d}\sigma = \iint_D (x^2 + y^2 - 1)\,\mathrm{d}\sigma - \iint_{D_1}(x^2 + y^2 - 1)\,\mathrm{d}\sigma = -\dfrac{1}{3} + \dfrac{\pi}{8}$；
* 相加：$\dfrac{\pi}{4} - \dfrac{1}{3}$。
* **细节**：$D_2$ 的边界一部分是直线、一部分是圆弧，直接算很繁；用「整体减去 $D_1$」，两块都好算。

#### 例题 6：泊松积分、变限积分和换元

**题目**：
1. 求 $\displaystyle\int_{-\infty}^{+\infty} e^{-\frac{x^2}{2}}\,\mathrm{d}x$；
2. 求 $\displaystyle\int_0^{+\infty} x^2e^{-x^2}\,\mathrm{d}x$；
3. 设 $f$ 连续，$f(0) = 0$，$f'(0) = 1$，求 $\lim\limits_{t \to 0^+}\dfrac{1}{t^3}\displaystyle\iint_{x^2 + y^2 \le t^2} f\left(\sqrt{x^2 + y^2}\right)\mathrm{d}\sigma$；
4. $D: |x| + |y| \le 1$，求 $\displaystyle\iint_D (x + y)^2\,\mathrm{d}\sigma$。
##### 【小题 1】换元，用泊松积分
* 令 $x = \sqrt{2}u$：原式 $= \sqrt{2}\displaystyle\int_{-\infty}^{+\infty} e^{-u^2}\,\mathrm{d}u = \sqrt{2} \cdot \sqrt{\pi} = \sqrt{2\pi}$。
* **细节**：$\displaystyle\int_{-\infty}^{+\infty} e^{-u^2}\,\mathrm{d}u = 2 \cdot \dfrac{\sqrt{\pi}}{2} = \sqrt{\pi}$，用了偶函数。
##### 【小题 2】分部，再用泊松积分
* $x^2e^{-x^2} = x \cdot xe^{-x^2}$，而 $xe^{-x^2}\,\mathrm{d}x = \mathrm{d}\left(-\dfrac{1}{2}e^{-x^2}\right)$；
* 原式 $= \left[-\dfrac{x}{2}e^{-x^2}\right]_0^{+\infty} + \dfrac{1}{2}\displaystyle\int_0^{+\infty} e^{-x^2}\,\mathrm{d}x = 0 + \dfrac{1}{2} \cdot \dfrac{\sqrt{\pi}}{2} = \dfrac{\sqrt{\pi}}{4}$。
* **细节**：$x \to +\infty$ 时 $xe^{-x^2} \to 0$，边界项为 $0$。
##### 【小题 3】化成变限积分，再洛必达
* 积分 $= 2\pi\displaystyle\int_0^t f(r)\,r\,\mathrm{d}r$；
* 洛必达：$\lim\limits_{t \to 0^+}\dfrac{2\pi tf(t)}{3t^2} = \dfrac{2\pi}{3}\lim\limits_{t \to 0^+}\dfrac{f(t)}{t} = \dfrac{2\pi}{3}f'(0) = \dfrac{2\pi}{3}$。
* **细节**：最后一步用导数的定义，$\dfrac{f(t)}{t} = \dfrac{f(t) - f(0)}{t} \to f'(0)$；题目只给了 $f'(0)$，不能再洛必达一次。
##### 【小题 4】换元：菱形变正方形
* 令 $u = x + y$，$v = x - y$；$|x| + |y| \le 1$ 变成 $|u| \le 1$，$|v| \le 1$；$|J| = \dfrac{1}{2}$；
* 原式 $= \displaystyle\iint_{|u| \le 1,\ |v| \le 1} u^2 \cdot \dfrac{1}{2}\,\mathrm{d}u\,\mathrm{d}v = \dfrac{1}{2} \cdot \dfrac{2}{3} \cdot 2 = \dfrac{2}{3}$。
* **核对**：用对称，$2xy$ 的积分为 $0$；$\displaystyle\iint_D (x^2 + y^2)\,\mathrm{d}\sigma = 2\iint_D x^2\,\mathrm{d}\sigma = 2 \cdot 4\int_0^1 x^2(1 - x)\,\mathrm{d}x = \dfrac{2}{3}$。
* **细节**：$|x| + |y| = \max\{|x + y|, |x - y|\}$，所以菱形在 $u, v$ 下是正方形。

---

**④ 三重积分怎么算**

#### 例题 7：一个碗，三种算法

**题目**：$\Omega$ 由旋转抛物面 $z = x^2 + y^2$ 与平面 $z = 1$ 围成。
1. 求 $\Omega$ 的体积；
2. 求 $\displaystyle\iiint_\Omega z\,\mathrm{d}v$；
3. 求 $\displaystyle\iiint_\Omega (x^2 + y^2)\,\mathrm{d}v$；
4. 求 $\displaystyle\iiint_\Omega x^2\,\mathrm{d}v$。
##### 【小题 1】截面法
* 高度 $z$ 处的截面是半径 $\sqrt{z}$ 的圆，$S(z) = \pi z$；
* $V = \displaystyle\int_0^1 \pi z\,\mathrm{d}z = \dfrac{\pi}{2}$。
* **核对**：投影法 $\displaystyle\iint_{x^2 + y^2 \le 1}(1 - x^2 - y^2)\,\mathrm{d}\sigma = \dfrac{\pi}{2}$，结果相同。
##### 【小题 2】只含 $z$，截面法
* $\displaystyle\iiint_\Omega z\,\mathrm{d}v = \int_0^1 z \cdot \pi z\,\mathrm{d}z = \dfrac{\pi}{3}$。
* **细节**：质心的 $\bar{z} = \dfrac{\pi/3}{\pi/2} = \dfrac{2}{3}$，比半高 $\dfrac{1}{2}$ 靠上，因为碗口宽、碗底窄。
##### 【小题 3】含 $x^2 + y^2$，柱面坐标
* 投影 $\rho \le 1$；竖线从 $z = \rho^2$ 进、从 $z = 1$ 出；
* 原式 $= \displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^1 \rho^2 \cdot \rho\,\mathrm{d}\rho\int_{\rho^2}^{1}\mathrm{d}z = 2\pi\int_0^1 \rho^3(1 - \rho^2)\,\mathrm{d}\rho = \dfrac{\pi}{6}$。
* **细节**：被积函数里的 $\rho^2$ 和体积元里的 $\rho$ 是两回事，相乘得 $\rho^3$。
##### 【小题 4】轮换
* $\Omega$ 把 $x, y$ 互换后不变，$\displaystyle\iiint_\Omega x^2\,\mathrm{d}v = \iiint_\Omega y^2\,\mathrm{d}v = \dfrac{1}{2}\iiint_\Omega (x^2 + y^2)\,\mathrm{d}v = \dfrac{\pi}{12}$。
* **细节**：$z$ 不能参与轮换：把 $x$ 与 $z$ 互换，$\Omega$ 就变了。

#### 例题 8：球和圆锥

**题目**：
1. $\Omega: x^2 + y^2 + z^2 \le 2z$，求 $\displaystyle\iiint_\Omega (x^2 + y^2 + z^2)\,\mathrm{d}v$；
2. 求圆锥面 $z = \sqrt{x^2 + y^2}$ 与球面 $x^2 + y^2 + z^2 = 4$ 所围的、在圆锥面以内的立体的体积；
3. 用两种方法求 $\displaystyle\iiint_{x^2 + y^2 + z^2 \le R^2} z^2\,\mathrm{d}v$。
##### 【小题 1】球不以原点为心
* 球面 $x^2 + y^2 + z^2 = 2z$ 化成 $r = 2\cos\varphi$，$\varphi$ 从 $0$ 到 $\dfrac{\pi}{2}$；
* 原式 $= \displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^{\frac{\pi}{2}}\sin\varphi\,\mathrm{d}\varphi\int_0^{2\cos\varphi} r^4\,\mathrm{d}r = 2\pi\int_0^{\frac{\pi}{2}}\dfrac{32}{5}\cos^5\varphi\sin\varphi\,\mathrm{d}\varphi = \dfrac{32\pi}{15}$。
* **核对**：令 $z = 1 + w$，原式 $= \displaystyle\iiint_{\text{单位球}}(x^2 + y^2 + w^2 + 2w + 1)\,\mathrm{d}v = \dfrac{4\pi}{5} + 0 + \dfrac{4\pi}{3} = \dfrac{32\pi}{15}$。
* **细节**：原点在球面上，$r$ 从 $0$ 开始；球在 $xOy$ 面上方，$\varphi$ 只到 $\dfrac{\pi}{2}$。
##### 【小题 2】锥加球
* 锥面是 $\varphi = \dfrac{\pi}{4}$，球面是 $r = 2$；
* $V = \displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^{\frac{\pi}{4}}\sin\varphi\,\mathrm{d}\varphi\int_0^2 r^2\,\mathrm{d}r = 2\pi\left(1 - \dfrac{\sqrt{2}}{2}\right) \cdot \dfrac{8}{3} = \dfrac{8\pi}{3}(2 - \sqrt{2})$。
* **细节**：$\displaystyle\int_0^{\frac{\pi}{4}}\sin\varphi\,\mathrm{d}\varphi = 1 - \cos\dfrac{\pi}{4}$。
##### 【小题 3】截面法与轮换
* 截面法：$\displaystyle\int_{-R}^{R} z^2 \cdot \pi(R^2 - z^2)\,\mathrm{d}z = \dfrac{4\pi R^5}{15}$；
* 轮换：$\displaystyle\iiint z^2\,\mathrm{d}v = \dfrac{1}{3}\iiint (x^2 + y^2 + z^2)\,\mathrm{d}v = \dfrac{1}{3} \cdot \dfrac{4\pi R^5}{5} = \dfrac{4\pi R^5}{15}$。
* **细节**：$\displaystyle\iiint (x^2 + y^2 + z^2)\,\mathrm{d}v$ 用球面坐标，被积函数 $r^2$ 乘体积元的 $r^2$，内层是 $\displaystyle\int_0^R r^4\,\mathrm{d}r$。

---

**⑤ 重积分怎么算更省事**

#### 例题 9：对称的五种用法

**题目**：
1. $D: |x| + |y| \le 1$，求 $\displaystyle\iint_D (x^3y^2 + y + 1)\,\mathrm{d}\sigma$；
2. 求 $\displaystyle\iint_{x^2 + y^2 \le R^2}\left(\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2}\right)\mathrm{d}\sigma$；
3. $D: x^2 + y^2 \le 1$，$x \ge 0$，$y \ge 0$，求 $\displaystyle\iint_D \dfrac{2e^x + 3e^y}{e^x + e^y}\,\mathrm{d}\sigma$；
4. 求 $\displaystyle\iiint_{x^2 + y^2 + z^2 \le 1}(x + y + z)^2\,\mathrm{d}v$；
5. $D: x^2 + y^2 \le 2y$，求 $\displaystyle\iint_D xy\,\mathrm{d}\sigma$ 与 $\displaystyle\iint_D y\,\mathrm{d}\sigma$。
##### 【小题 1】奇的部分为 $0$
* 菱形关于两条坐标轴都对称；$x^3y^2$ 关于 $x$ 是奇函数，$y$ 关于 $y$ 是奇函数，积分都是 $0$；
* 剩 $\displaystyle\iint_D 1\,\mathrm{d}\sigma$，就是菱形的面积 $2$。
* **细节**：拆成三项分别判断，每一项找自己的对称轴。
##### 【小题 2】轮换
* $\displaystyle\iint x^2\,\mathrm{d}\sigma = \iint y^2\,\mathrm{d}\sigma = \dfrac{1}{2}\iint (x^2 + y^2)\,\mathrm{d}\sigma = \dfrac{1}{2} \cdot 2\pi \cdot \dfrac{R^4}{4} = \dfrac{\pi R^4}{4}$；
* 原式 $= \left(\dfrac{1}{a^2} + \dfrac{1}{b^2}\right)\dfrac{\pi R^4}{4}$。
##### 【小题 3】轮换的分式
* 四分之一圆关于 $y = x$ 对称；与互换后的式子相加，分子 $5(e^x + e^y)$ 与分母约掉；
* 原式 $= \dfrac{5}{2}\sigma = \dfrac{5}{2} \cdot \dfrac{\pi}{4} = \dfrac{5\pi}{8}$。
##### 【小题 4】三重：交叉项为 $0$
* 展开为 $x^2 + y^2 + z^2 + 2(xy + yz + zx)$；球关于每个坐标面对称，$xy$ 关于 $x$ 是奇函数，积分为 $0$，$yz$、$zx$ 同理；
* 原式 $= \displaystyle\iiint (x^2 + y^2 + z^2)\,\mathrm{d}v = \dfrac{4\pi}{5}$。
##### 【小题 5】看清区域对哪条轴对称
* 圆心 $(0, 1)$，区域只关于 $y$ 轴对称；
* $xy$ 关于 $x$ 是奇函数，$\displaystyle\iint_D xy\,\mathrm{d}\sigma = 0$；
* $y$ 关于 $x$ 是偶函数，不能用对称得 $0$；用形心：圆心 $(0, 1)$，面积 $\pi$，$\displaystyle\iint_D y\,\mathrm{d}\sigma = 1 \cdot \pi = \pi$。
* **细节**：区域不关于 $x$ 轴对称，「$y$ 关于 $y$ 是奇函数」这一条用不上。

---

**⑥ 什么量能用重积分算**

#### 例题 10：一块圆片，换几个权

**题目**：薄片占有区域 $D: x^2 + y^2 \le 2x$。
1. 面密度 $\mu = 1$，求形心，以及对 $y$ 轴、对原点的转动惯量；
2. 面密度 $\mu = x$，求质量和质心。
##### 【小题 1】形心直接写，转动惯量用极坐标
* 形心是圆心 $(1, 0)$；
* $I_y = \displaystyle\iint_D x^2\,\mathrm{d}\sigma$：令 $x = 1 + u$，$= \displaystyle\iint_{u^2 + y^2 \le 1}(1 + 2u + u^2)\,\mathrm{d}u\,\mathrm{d}y = \pi + 0 + \dfrac{\pi}{4} = \dfrac{5\pi}{4}$；
* $I_O = \displaystyle\iint_D (x^2 + y^2)\,\mathrm{d}\sigma = \int_{-\frac{\pi}{2}}^{\frac{\pi}{2}}\mathrm{d}\theta\int_0^{2\cos\theta} r^3\,\mathrm{d}r = \int_{-\frac{\pi}{2}}^{\frac{\pi}{2}} 4\cos^4\theta\,\mathrm{d}\theta = \dfrac{3\pi}{2}$。
* **细节**：平移到圆心算 $\displaystyle\iint x^2\,\mathrm{d}\sigma$ 最省事；$I_x = I_O - I_y = \dfrac{\pi}{4}$，正好是单位圆上的 $\displaystyle\iint y^2\,\mathrm{d}\sigma$。
##### 【小题 2】权换成 $\mu = x$
* 质量 $M = \displaystyle\iint_D x\,\mathrm{d}\sigma = 1 \cdot \pi = \pi$（形心反过来用）；
* 静矩 $\displaystyle\iint_D x \cdot x\,\mathrm{d}\sigma = \dfrac{5\pi}{4}$（小题 1 已算）；
* 质心 $\bar{x} = \dfrac{5\pi/4}{\pi} = \dfrac{5}{4}$，$\bar{y} = 0$。
* **细节**：密度往右越来越大，质心比形心 $1$ 更靠右；$\bar{y} = 0$，因为区域和密度都关于 $x$ 轴对称。

#### 例题 11：球被圆柱截下的部分，和半球的引力

**题目**：
1. 求球面 $x^2 + y^2 + z^2 = a^2$ 被圆柱面 $x^2 + y^2 = ax$（$a > 0$）截下的、在圆柱面以内的部分的面积；
2. 求球体 $x^2 + y^2 + z^2 \le a^2$ 在圆柱 $x^2 + y^2 \le ax$ 以内部分的体积；
3. 均匀的上半球体 $x^2 + y^2 + z^2 \le R^2$，$z \ge 0$（密度 $\rho$），求它对球心处质量为 $m$ 的质点的引力。
##### 【小题 1】曲面面积：对称后乘 $4$
* 上半球面 $z = \sqrt{a^2 - x^2 - y^2}$，$\sqrt{1 + z_x^2 + z_y^2} = \dfrac{a}{\sqrt{a^2 - x^2 - y^2}}$；
* 曲面关于 $xOy$ 面、$xOz$ 面对称，算第一卦限再乘 $4$：$A = 4\displaystyle\int_0^{\frac{\pi}{2}}\mathrm{d}\theta\int_0^{a\cos\theta}\dfrac{ar}{\sqrt{a^2 - r^2}}\,\mathrm{d}r = 4a\int_0^{\frac{\pi}{2}}(a - a\sin\theta)\,\mathrm{d}\theta = 2a^2(\pi - 2)$。
* **细节**：$\displaystyle\int_0^{a\cos\theta}\dfrac{r}{\sqrt{a^2 - r^2}}\,\mathrm{d}r = a - \sqrt{a^2 - a^2\cos^2\theta} = a - a\sin\theta$，这一步要求 $\sin\theta \ge 0$，所以只算 $\theta \in \left[0, \dfrac{\pi}{2}\right]$ 再利用对称。
##### 【小题 2】体积：上面减下面
* 上下曲面是 $z = \pm\sqrt{a^2 - x^2 - y^2}$，投影是 $x^2 + y^2 \le ax$；
* $V = 4\displaystyle\int_0^{\frac{\pi}{2}}\mathrm{d}\theta\int_0^{a\cos\theta}\sqrt{a^2 - r^2}\,r\,\mathrm{d}r = \dfrac{4a^3}{3}\int_0^{\frac{\pi}{2}}(1 - \sin^3\theta)\,\mathrm{d}\theta = \dfrac{4a^3}{3}\left(\dfrac{\pi}{2} - \dfrac{2}{3}\right) = \dfrac{2a^3}{9}(3\pi - 4)$。
* **细节**：$4$ 来自两处对称：上下两半各一份，$\theta$ 正负两半各一份。
##### 【小题 3】引力：对称后只剩 $z$ 分量
* 半球关于 $z$ 轴对称，$F_x = F_y = 0$；
* $F_z = Gm\rho\displaystyle\iiint_\Omega \dfrac{z}{r^3}\,\mathrm{d}v$，球面坐标里 $z = r\cos\varphi$：$F_z = Gm\rho\displaystyle\int_0^{2\pi}\mathrm{d}\theta\int_0^{\frac{\pi}{2}}\cos\varphi\sin\varphi\,\mathrm{d}\varphi\int_0^R \mathrm{d}r = Gm\rho \cdot 2\pi \cdot \dfrac{1}{2} \cdot R = \pi Gm\rho R$。
* **细节**：被积函数在球心附近无界，但体积元的 $r^2$ 与 $\dfrac{r}{r^3}$ 相乘后 $r$ 全部约掉，积分有限；$F_z > 0$，指向半球。

---

### 〔提示〕

**① 曲顶柱体的体积怎么算**

#### 1. 二重积分是一个数
* 积分号外不能再出现积分变量；$\displaystyle\iint_D f(u, v)\,\mathrm{d}u\,\mathrm{d}v$ 与 $x, y$ 无关。

#### 2. 估值用整个区域上的最值
* 包括区域内部的最值点，不能只看边界。

#### 3. 缩成一点的极限，看分母是不是面积
* 分母是 $\pi r^2$，极限是中心处的值；分母是 $r^2$，多一个 $\pi$。

**② 怎么化成两次定积分**

#### 1. 外层的上下限必须是常数
* 内层的上下限可以含外层变量，反过来不行。

#### 2. 换次序不能直接对调上下限
* 先由上下限画出区域，再按另一个方向重新读。

#### 3. 边界中途换式子就要分块
* 竖线（横线）穿过时，进出的边界在某处换了式子，就从那里分开。

**③ 区域是圆的怎么办**

#### 1. 别漏乘 $r$
* $\mathrm{d}\sigma = r\,\mathrm{d}r\,\mathrm{d}\theta$；单位圆漏了 $r$，面积会算成 $2\pi$。

#### 2. $\theta$ 的范围看图，不要默认 $0$ 到 $2\pi$
* $x^2 + y^2 \le 2x$ 的 $\theta$ 是 $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$；$x^2 + y^2 \le 2y$ 是 $[0, \pi]$。

#### 3. 换元的 $J$ 是旧变量对新变量
* 给的是 $u = u(x, y)$ 时，先算 $\dfrac{\partial(u, v)}{\partial(x, y)}$ 再取倒数，最后取绝对值。

**④ 三重积分怎么算**

#### 1. 先一后二的外层是投影区域
* 不是上曲面或下曲面本身；投影要按第 4 章的办法求。

#### 2. 截面随高度变
* 先二后一时，$S(z)$ 是 $z$ 的函数；$z$ 的范围是立体的最低处到最高处。

#### 3. 体积元别漏因子
* 柱面坐标乘 $\rho$，球面坐标乘 $r^2\sin\varphi$；$\varphi$ 从 $z$ 轴正向量起，范围是 $[0, \pi]$。

**⑤ 重积分怎么算更省事**

#### 1. 对称轴和变量要配对
* 区域关于 $y$ 轴对称，看 $x$ 的奇偶；关于 $x$ 轴对称，看 $y$ 的奇偶。

#### 2. 被积函数是奇函数还不够
* 区域也必须对称；$x^2 + y^2 \le 2x$ 上 $\displaystyle\iint x\,\mathrm{d}\sigma = \pi$，不是 $0$。

#### 3. 轮换要求区域关于 $y = x$ 对称
* 三角形 $0 \le y \le x \le 1$ 上 $\displaystyle\iint x\,\mathrm{d}\sigma = \dfrac{1}{3}$，$\displaystyle\iint y\,\mathrm{d}\sigma = \dfrac{1}{6}$，不相等。

**⑥ 什么量能用重积分算**

#### 1. 质心除以质量
* 密度不均匀时，除以 $\displaystyle\iint \mu\,\mathrm{d}\sigma$，不是除以面积。

#### 2. 转动惯量用到轴距离的平方
* 对 $x$ 轴：平面上是 $y^2$，空间里是 $y^2 + z^2$，不是 $x^2$。

#### 3. 曲面面积的面积元不是 $\mathrm{d}\sigma$
* 要乘 $\sqrt{1 + f_x^2 + f_y^2}$；曲面分上下两片时，两片都要算。

#### 4. 引力按分量算，分母是 $r^3$
* 大小不能直接相加；先用对称去掉为 $0$ 的分量。
