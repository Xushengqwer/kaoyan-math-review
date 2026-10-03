# 第 7 章 曲线积分与曲面积分

**一条主线**：把「切细、求和、取极限」搬到弯的线和弯的面上：先求不分方向的总量，再求带方向的功和流量，最后把边界上的积分换成里面的积分。分三层、六站：

不分方向：弯的线、弯的面上怎么求总量；沿着曲线：沿着路走，力做了多少功 → 绕一圈的积分，换成里面的二重积分 → 什么时候只看起点和终点；穿过曲面：流过一张曲面的量 → 闭曲面和空间曲线

每一站由上一站引出，只有一处接缝：⑤ 不是由 ④ 引出的。曲线这一层走完，曲面上有平行的一层，⑤ 对着 ②，⑥ 对着 ③。

**一段话说完**：第 6 章把「切细、求和、取极限」用到了平面区域和立体上。可有些量分布在弯的东西上：一根弯的铁丝各处密度不同，它有多重？一张曲面形状的薄壳呢？定义没有新东西，小段的长度换成弧长，小块的面积换成曲面的面积，就是第一类曲线积分、曲面积分。新的是算法：积分的点都在曲线、曲面上，所以先把方程代进被积函数，再把弧长元、面积元写成参数或投影的微分，化回定积分、二重积分。接着是带方向的量。一个力推着物体沿一条弯路走，做了多少功？每一小段上，力和位移作数量积，积的是 $P\,\mathrm{d}x + Q\,\mathrm{d}y$；路反过来走，功变号，这是第二类曲线积分。沿闭曲线绕一圈的积分，我们换成它围住的区域上的二重积分：把区域切成小块，每块各绕一圈，相邻两块的公共边一来一回，正好抵消，只剩外圈，这是格林公式。反过来看，如果 $\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y}$ 处处为 $0$，区域里又没有洞，绕哪一圈都是 $0$，从起点到终点走哪条路都一样；这时 $P\,\mathrm{d}x + Q\,\mathrm{d}y$ 是某个函数 $u$ 的全微分，积分就是 $u$ 在终点与起点的差。曲线这一层到这里走完，曲面上有平行的一层：水流穿过一张曲面，单位时间流过多少？先要说定哪一侧算正，积的是流速在法向上的分量，这是第二类曲面积分。最后，格林公式在空间里有两个推广：从闭曲面流出的总量，等于里面各点往外冒的量加起来，这是高斯公式；沿空间闭曲线绕一圈的积分，等于它张成的曲面上各点转动的量加起来，这是斯托克斯公式。

---

## ① 弯的线、弯的面上怎么求总量

一根铁丝弯成曲线 $L$，各处的线密度不同，它有多重？办法和重积分一样：把 $L$ 切成小段，每一小段上密度变化不大，就当它不变，用密度乘这一段的弧长，加起来，再让小段越切越细，取极限，这就是第一类曲线积分。一张曲面形状的薄壳，把小段换成小块、弧长换成面积，就是第一类曲面积分。弧长和面积都是正的，所以第一类积分与曲线走的方向、曲面取哪一侧都无关。新东西在算法上：积分的点不在一块区域里，而是被限制在曲线、曲面上，满足它的方程。所以我们先把方程代进被积函数，常常一下子就成了常数；再把 $\mathrm{d}s$ 写成参数的微分，用第 2 章的弧微分，把 $\mathrm{d}S$ 写成投影上的面积元，用第 6 章的曲面面积元，化成定积分、二重积分。重积分里的对称、轮换和权，都原样搬过来：权取 $1$ 是弧长、面积，取密度是质量，再乘坐标是静矩，乘到轴距离的平方是转动惯量；引力还是按分量各积一次。

* 第一类曲线积分：$\displaystyle\int_L f\,\mathrm{d}s = \int_\alpha^\beta f[\varphi(t), \psi(t)]\sqrt{\varphi'^2(t) + \psi'^2(t)}\,\mathrm{d}t$，下限小于上限；
* 第一类曲面积分：$\displaystyle\iint_\Sigma f\,\mathrm{d}S = \iint_{D_{xy}} f[x, y, z(x, y)]\sqrt{1 + z_x^2 + z_y^2}\,\mathrm{d}x\,\mathrm{d}y$；
* 先代入方程：在圆周 $x^2 + y^2 = a^2$ 上，$\displaystyle\oint_L (x^2 + y^2)\,\mathrm{d}s = a^2 \cdot 2\pi a = 2\pi a^3$；
* 轮换：在球面 $x^2 + y^2 + z^2 = a^2$ 与平面 $x + y + z = 0$ 的交线 $\Gamma$ 上，$\displaystyle\oint_\Gamma x^2\,\mathrm{d}s = \dfrac{1}{3}\oint_\Gamma a^2\,\mathrm{d}s = \dfrac{2\pi a^3}{3}$。

---

## ② 沿着路走，力做了多少功

第 3 章算过变力沿直线做的功，那时力和位移在同一条直线上。现在力 $\boldsymbol{F} = (P, Q)$ 随位置变，方向也在变，物体沿一条弯路 $L$ 从 $A$ 走到 $B$。还是切成小段：每一小段近似一条直线段，位移是 $(\Delta x, \Delta y)$，力当常数，做的功是两者的数量积 $P\Delta x + Q\Delta y$；加起来，取极限，就是第二类曲线积分。和第一类不同，这里的 $\Delta x$、$\Delta y$ 有正有负：往右走，$\Delta x > 0$；往左走，$\Delta x < 0$。所以路的方向一反，积分就变号；算的时候下限对应起点、上限对应终点，下限可以比上限大。两类之间也能互换：$\mathrm{d}x$、$\mathrm{d}y$ 是弧长元 $\mathrm{d}s$ 乘单位切向量的两个分量，所以功等于力的切向分量对弧长的积分。

* 参数式：$\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \int_\alpha^\beta [P\varphi'(t) + Q\psi'(t)]\,\mathrm{d}t$，$\alpha$ 对应起点，$\beta$ 对应终点；
* 反向变号：$\displaystyle\int_{L^-} P\,\mathrm{d}x + Q\,\mathrm{d}y = -\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y$；
* 两类的联系：$\displaystyle\int_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \int_L (P\cos\alpha + Q\cos\beta)\,\mathrm{d}s$，这里的 $\alpha$、$\beta$ 是沿 $L$ 方向的切向量的方向角；
* 空间曲线多一项 $R\,\mathrm{d}z$；两张曲面的交线，先写成参数式。

---

## ③ 绕一圈的积分，换成里面的二重积分

沿闭曲线的积分，参数化常常很繁。能不能用它围住的区域来算？我们把区域 $D$ 切成小矩形，每个小矩形都逆时针绕一圈。相邻两个小矩形的公共边被走了两次，方向相反，积分抵消；加起来只剩最外面一圈，就是 $D$ 的边界。所以只要算一个小矩形绕一圈的积分：下边和上边合起来约为 $-\dfrac{\partial P}{\partial y}\Delta x\Delta y$，右边和左边合起来约为 $\dfrac{\partial Q}{\partial x}\Delta x\Delta y$，加起来是 $\left(\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y}\right)\Delta x\Delta y$。这就是格林公式。用它要查三件事：曲线闭不闭；方向是不是正向，即走的时候区域在左边；$P$、$Q$ 在区域里有没有偏导数不连续的点。不闭，就补一段线，常补平行于坐标轴的线段，那里 $\mathrm{d}y$ 或 $\mathrm{d}x$ 为 $0$，算完再减掉；区域里有这样的点（奇点），就用一个小圆把它挖掉，换成绕小圆的积分。

* 格林公式：$\displaystyle\oint_L P\,\mathrm{d}x + Q\,\mathrm{d}y = \iint_D \left(\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y}\right)\mathrm{d}x\,\mathrm{d}y$，$L$ 取正向；
* 面积：$A = \dfrac{1}{2}\displaystyle\oint_L x\,\mathrm{d}y - y\,\mathrm{d}x$；椭圆 $x = a\cos t$，$y = b\sin t$ 的面积是 $\pi ab$；
* 补线：$\displaystyle\int_L = \oint_{L + L_1} - \int_{L_1}$；
* 挖奇点：$\displaystyle\oint_L \dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2 + y^2}$，$L$ 逆时针绕原点一圈时为 $2\pi$，不绕原点时为 $0$。

---

## ④ 什么时候只看起点和终点

② 里有这样的现象：$\displaystyle\int_L 2xy\,\mathrm{d}x + x^2\,\mathrm{d}y$ 从 $(0, 0)$ 到 $(1, 1)$，沿直线、沿抛物线、沿折线，结果都是 $1$。什么时候会这样？从 $A$ 到 $B$ 的两条路，一条正着走、一条反着走，拼成一条闭曲线；两条路的积分相等，就是绕这一圈的积分为 $0$。由格林公式，只要区域里处处 $\dfrac{\partial Q}{\partial x} = \dfrac{\partial P}{\partial y}$，而且区域里没有洞，绕哪一圈都是 $0$，积分就只看起点和终点。这时固定起点，让终点 $(x, y)$ 动，积分就是终点的函数 $u(x, y)$，它的全微分正是 $P\,\mathrm{d}x + Q\,\mathrm{d}y$；积分等于 $u$ 在终点和起点的差，和牛顿-莱布尼茨公式一样。重力做功只看高度差，就是这个道理。区域里有洞时要小心：$\dfrac{x\,\mathrm{d}y - y\,\mathrm{d}x}{x^2 + y^2}$ 在原点以外处处满足偏导相等，绕原点一圈却是 $2\pi$，因为原点这个洞不能用格林公式填上。

* 单连通区域内四条等价：路径无关；闭路积分为 $0$；$\dfrac{\partial P}{\partial y} = \dfrac{\partial Q}{\partial x}$；$P\,\mathrm{d}x + Q\,\mathrm{d}y$ 是某个 $u$ 的全微分；
* 求 $u$：沿折线，$u(x, y) = \displaystyle\int_{x_0}^{x} P(x, y_0)\,\mathrm{d}x + \int_{y_0}^{y} Q(x, y)\,\mathrm{d}y$；或先对 $x$ 积分，再定出 $\varphi(y)$；
* 计算：$\displaystyle\int_A^B P\,\mathrm{d}x + Q\,\mathrm{d}y = u(B) - u(A)$，或改走平行于坐标轴的折线；
* 已知路径无关，求未知函数：由 $\dfrac{\partial P}{\partial y} = \dfrac{\partial Q}{\partial x}$ 列方程。

---

## ⑤ 流过一张曲面的量

曲线这一层到 ④ 走完了。⑤ 对着 ②：② 问力沿曲线做的功，⑤ 问水流穿过曲面的流量。设流速是 $\boldsymbol{v} = (P, Q, R)$，一小块曲面近似一小块平面，面积 $\Delta S$，单位法向量 $\boldsymbol{n}$。单位时间穿过它的水是一个斜柱体，体积是流速的法向分量乘面积，即 $\boldsymbol{v} \cdot \boldsymbol{n}\,\Delta S$；加起来取极限，就是流量。法向量有两个，指向相反，所以先要定哪一侧为正，这就是有向曲面；换一侧，流量变号。把 $\boldsymbol{v} \cdot \boldsymbol{n}$ 展开，$\cos\gamma\,\mathrm{d}S$ 是小块在 $xOy$ 面上的投影，带正负号，记作 $\mathrm{d}x\,\mathrm{d}y$，流量就写成 $\displaystyle\iint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z + Q\,\mathrm{d}z\,\mathrm{d}x + R\,\mathrm{d}x\,\mathrm{d}y$，这是第二类曲面积分。算法是投影：$\displaystyle\iint_\Sigma R\,\mathrm{d}x\,\mathrm{d}y$ 投到 $xOy$ 面，$z$ 用曲面方程代入，上侧取正号、下侧取负号；另外两项投到另外两个坐标面。也可以借法向量，把三项合到同一个坐标面上一起算。对称要反过来看：曲面关于 $xOy$ 面对称、两半取相反的侧时，两半的 $\mathrm{d}x\,\mathrm{d}y$ 符号相反，所以 $R$ 关于 $z$ 是偶函数时抵消，是奇函数时加倍。

* 两类的联系：$\displaystyle\iint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z + Q\,\mathrm{d}z\,\mathrm{d}x + R\,\mathrm{d}x\,\mathrm{d}y = \iint_\Sigma (P\cos\alpha + Q\cos\beta + R\cos\gamma)\,\mathrm{d}S$；
* 投影：$\displaystyle\iint_\Sigma R\,\mathrm{d}x\,\mathrm{d}y = \pm\iint_{D_{xy}} R[x, y, z(x, y)]\,\mathrm{d}x\,\mathrm{d}y$，上侧取正，下侧取负；曲面垂直于 $xOy$ 面时为 $0$；
* 合一投影：$\Sigma: z = z(x, y)$ 取上侧时，三项合成 $\displaystyle\iint_{D_{xy}} (-Pz_x - Qz_y + R)\,\mathrm{d}x\,\mathrm{d}y$；
* 对称：与第一类相反，偶函数抵消，奇函数加倍。

---

## ⑥ 闭曲面和空间曲线

格林公式把平面上绕一圈的积分换成了里面的积分。到了空间，「一圈」有两种：一张闭曲面，一条闭曲线。先看闭曲面：从它流出的总量，换成里面的三重积分。把立体切成小方块，每块各算流出量；相邻两块的公共面，一块流出多少，另一块就流入多少，抵消，加起来只剩外表面。一个小方块的流出量：前后两个面合起来约为 $\dfrac{\partial P}{\partial x}\Delta v$，另两对面同理，共 $\left(\dfrac{\partial P}{\partial x} + \dfrac{\partial Q}{\partial y} + \dfrac{\partial R}{\partial z}\right)\Delta v$。括号里的量叫散度：小方块缩成一点时，流出量除以体积的极限，就是这一点每单位体积往外冒的量。这是高斯公式。再看空间闭曲线：沿它绕一圈的积分，换成它张成的曲面上的积分。曲面切成小块，每块各绕一圈，公共边抵消，只剩边界；每一小块绕一圈的积分，约等于旋度在这块法向上的分量乘面积。旋度的三个分量，就是三个坐标面上各自的格林公式里的那个「$\dfrac{\partial Q}{\partial x} - \dfrac{\partial P}{\partial y}$」。这是斯托克斯公式；曲面是 $xOy$ 面上的平面区域时，它就是格林公式。平面上的办法都搬过来：不闭就补面，里面有奇点就挖掉；旋度处处为 $\boldsymbol{0}$ 时，空间里的曲线积分也只看起点和终点。

* 高斯公式：$\displaystyle\oiint_\Sigma P\,\mathrm{d}y\,\mathrm{d}z + Q\,\mathrm{d}z\,\mathrm{d}x + R\,\mathrm{d}x\,\mathrm{d}y = \iiint_\Omega \left(\dfrac{\partial P}{\partial x} + \dfrac{\partial Q}{\partial y} + \dfrac{\partial R}{\partial z}\right)\mathrm{d}v$，$\Sigma$ 取外侧；
* 散度 $\operatorname{div}\boldsymbol{A} = P_x + Q_y + R_z$；旋度 $\operatorname{rot}\boldsymbol{A} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y)$；
* 斯托克斯公式：$\displaystyle\oint_\Gamma P\,\mathrm{d}x + Q\,\mathrm{d}y + R\,\mathrm{d}z = \iint_\Sigma \operatorname{rot}\boldsymbol{A} \cdot \boldsymbol{n}\,\mathrm{d}S$，$\Gamma$ 的方向与 $\Sigma$ 的侧符合右手法则；
* 补面：$\displaystyle\iint_\Sigma = \oiint_{\Sigma + \Sigma_1} - \iint_{\Sigma_1}$，常补平行于坐标面的平面；
* 挖奇点：$\boldsymbol{A} = \dfrac{(x, y, z)}{(x^2 + y^2 + z^2)^{\frac{3}{2}}}$ 在原点以外散度为 $0$，穿出任一包围原点的闭曲面的通量都是 $4\pi$。
