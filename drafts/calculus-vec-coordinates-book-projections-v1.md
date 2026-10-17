<!-- section:定义 -->

### 〔定义〕

**本卡主线**：为多元微积分，描述空间里的图形。整张卡分三层、六站，每一站由上一站引出：
* **工具**：
  * **① 空间里的长度和方向**：用三个坐标表示一个向量，长度和方向都从坐标算出；
  * **② 向量的三种乘法**：数量积管夹角、垂直，向量积管垂直方向、面积，混合积管共面、体积；
* **平的图形**：
  * **③ 平面和直线**：都由一个点加一个向量确定：平面用法向量 $\boldsymbol{n}$，直线用方向向量 $\boldsymbol{s}$；
  * **④ 两个图形摆在一起**：平行、垂直、夹角只比较两个向量，需要时再代一个点；距离分别用三种乘法算；
* **弯的图形**：
  * **⑤ 曲面长什么样**：从方程看形状：缺一个变量是柱面，$x^2 + y^2$ 整体出现是旋转曲面，其余用截痕法；
  * **⑥ 压到坐标面上**：空间曲线是两张曲面的交线，消去 $z$，得到它在 $xOy$ 面上的投影；立体的投影区域由此定出；
* **依赖**：三阶行列式（线性代数第 1 章）。

<!-- station:① -->

**① 空间里的长度和方向**

> 💡 **本站定位**：第 5—7 章研究空间曲面与重积分，先要用代数描述空间里的几何量。把向量的起点移到原点，往 $x$、$y$、$z$ 三个方向各走多少——**三个数一定，向量的长度和方向就完全定了**。

<!-- card:tyal -->

#### 1. 向量与坐标

##### 向量
* **定义**：既有大小又有方向的量称为==向量==；向量的大小称为它的==模==，记作 $|\boldsymbol{a}|$。
  * **单位向量**：模为 $1$ 的向量；
  * **零向量**：模为 $0$ 的向量，记作 $\boldsymbol{0}$，方向任意；
  * **相等**：大小相等、方向相同的两个向量相等——与起点无关，可自由平移。

##### 向量的坐标
* **定义**：设 $\boldsymbol{i}, \boldsymbol{j}, \boldsymbol{k}$ 为 $x$、$y$、$z$ 轴正向的单位向量，任一向量 $\boldsymbol{a}$ 唯一表示为
  $$\boldsymbol{a} = a_1\boldsymbol{i} + a_2\boldsymbol{j} + a_3\boldsymbol{k} = (a_1, a_2, a_3)$$
  有序数组 $(a_1, a_2, a_3)$ 称为 $\boldsymbol{a}$ 的==坐标==。
  * **两点确定的向量**：起点 $M_1(x_1, y_1, z_1)$ 到终点 $M_2(x_2, y_2, z_2)$，坐标为**终点减起点**：
    $$\overrightarrow{M_1M_2} = (x_2 - x_1,\ y_2 - y_1,\ z_2 - z_1)$$

<!-- card:it92 -->

#### 2. 方向怎么量：夹角、投影与方向角

##### 两向量的夹角
* **定义**：两个非零向量 $\boldsymbol{a}, \boldsymbol{b}$ 共起点，不超过 $\pi$ 的角 $\theta$（$0 \le \theta \le \pi$）称为==夹角==。
  * **垂直**：$\theta = \dfrac{\pi}{2}$ 时，称 $\boldsymbol{a} \perp \boldsymbol{b}$；
  * **平行**：$\theta = 0$ 或 $\pi$ 时，称 $\boldsymbol{a} \parallel \boldsymbol{b}$；
  * ⚠️ **零向量（边界）**：规定零向量与任何向量==既平行又垂直==。

##### 向量的投影
* **定义**：设 $\boldsymbol{b} \neq \boldsymbol{0}$，$\boldsymbol{a}$ 与 $\boldsymbol{b}$ 的夹角为 $\theta$，称
  $$\operatorname{Prj}_{\boldsymbol{b}}\boldsymbol{a} = |\boldsymbol{a}|\cos\theta$$
  为 $\boldsymbol{a}$ 在 $\boldsymbol{b}$ 上的==投影==。
  * **投影是一个数**：带正负号，$\theta > \dfrac{\pi}{2}$ 时为负；
  * **坐标就是投影**：$a_1, a_2, a_3$ 分别是 $\boldsymbol{a}$ 在 $x$、$y$、$z$ 轴上的投影。

##### 方向角与方向余弦
* **方向角**：非零向量 $\boldsymbol{a}$ 与 $x$、$y$、$z$ 轴正向的夹角 $\alpha, \beta, \gamma$（$0 \le \alpha, \beta, \gamma \le \pi$）。
  * **方向余弦**：方向角的余弦 $\cos\alpha, \cos\beta, \cos\gamma$。

<!-- station:② -->

**② 向量的三种乘法**

> 💡 **本站定位**：有了坐标，几个向量摆在一起时，最常问的是夹角多大、是否垂直或平行、怎样造出同时垂直于两个已知方向的向量。三种乘法各管一类：数量积管**夹角与垂直**，向量积造**公垂向量、管面积与平行**，混合积管**体积与共面**。

<!-- card:h1zn -->

#### 1. 数量积
* **定义**：设两个向量 $\boldsymbol{a}, \boldsymbol{b}$ 的夹角为 $\theta$（$0 \le \theta \le \pi$），称
  $$\boldsymbol{a} \cdot \boldsymbol{b} = |\boldsymbol{a}||\boldsymbol{b}|\cos\theta$$
  为 $\boldsymbol{a}$ 与 $\boldsymbol{b}$ 的==数量积==（点积）；结果是一个==数==。
  * **与投影的关系**：当 $\boldsymbol{b} \neq \boldsymbol{0}$ 时，$\boldsymbol{a} \cdot \boldsymbol{b} = |\boldsymbol{b}|\operatorname{Prj}_{\boldsymbol{b}}\boldsymbol{a}$；
  * **物理原型**：力 $\boldsymbol{F}$ 使物体产生位移 $\boldsymbol{s}$ 所做的功 $W = |\boldsymbol{F}||\boldsymbol{s}|\cos\theta = \boldsymbol{F} \cdot \boldsymbol{s}$。

<!-- card:fvp6 -->

#### 2. 向量积
* **定义**：$\boldsymbol{a} \times \boldsymbol{b}$ 是一个==向量==，称为 $\boldsymbol{a}$ 与 $\boldsymbol{b}$ 的==向量积==（叉积）：
  * **模**：$|\boldsymbol{a} \times \boldsymbol{b}| = |\boldsymbol{a}||\boldsymbol{b}|\sin\theta$；
  * **方向**：同时垂直于 $\boldsymbol{a}$ 与 $\boldsymbol{b}$，且 $\boldsymbol{a}, \boldsymbol{b}, \boldsymbol{a} \times \boldsymbol{b}$ 符合**右手法则**——右手四指从 $\boldsymbol{a}$ 转向 $\boldsymbol{b}$（转角不超过 $\pi$），拇指所指方向即为 $\boldsymbol{a} \times \boldsymbol{b}$ 的方向。

<!-- card:r1ws -->

#### 3. 混合积
* **定义**：称先叉乘、再点乘的运算
  $$[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}] = (\boldsymbol{a} \times \boldsymbol{b}) \cdot \boldsymbol{c}$$
  为三个向量 $\boldsymbol{a}, \boldsymbol{b}, \boldsymbol{c}$ 的==混合积==；结果是一个==数==。

---

<!-- section:性质 -->

### 〔性质〕

<!-- station:① -->

**① 空间里的长度和方向**

<!-- card:tgkt -->

#### 1. 坐标运算与长度

##### 线性运算
* **法则**：设 $\boldsymbol{a} = (a_1, a_2, a_3)$，$\boldsymbol{b} = (b_1, b_2, b_3)$，则
  * **加减**：$\boldsymbol{a} \pm \boldsymbol{b} = (a_1 \pm b_1,\ a_2 \pm b_2,\ a_3 \pm b_3)$；
  * **数乘**：$\lambda\boldsymbol{a} = (\lambda a_1,\ \lambda a_2,\ \lambda a_3)$。

##### 模与两点间的距离
* **向量的模**：
  $$|\boldsymbol{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$$
  * **两点间的距离**：
    $$|M_1M_2| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$

<!-- card:ty41 -->

#### 2. 方向与平行

##### 方向余弦与单位向量
* **方向余弦**：设 $\boldsymbol{a} \neq \boldsymbol{0}$，则
  $$\cos\alpha = \dfrac{a_1}{|\boldsymbol{a}|}, \quad \cos\beta = \dfrac{a_2}{|\boldsymbol{a}|}, \quad \cos\gamma = \dfrac{a_3}{|\boldsymbol{a}|}$$
  * **平方和为 $1$**：$\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$；
  * **单位向量**：与 $\boldsymbol{a}$ 同向的单位向量为
    $$\boldsymbol{e}_a = \dfrac{\boldsymbol{a}}{|\boldsymbol{a}|} = (\cos\alpha, \cos\beta, \cos\gamma)$$

##### 两向量平行的条件
* **充要条件**：设 $\boldsymbol{a} \neq \boldsymbol{0}$，则
  $$\boldsymbol{b} \parallel \boldsymbol{a} \iff \boldsymbol{b} = \lambda\boldsymbol{a} \iff \dfrac{b_1}{a_1} = \dfrac{b_2}{a_2} = \dfrac{b_3}{a_3}$$
  * ⚠️ **分母为零（边界）**：比例式中分母为 $0$，理解为对应的分子也为 $0$；如 $\dfrac{b_1}{0} = \dfrac{b_2}{1} = \dfrac{b_3}{2}$ 表示 $b_1 = 0$ 且 $b_3 = 2b_2$。

<!-- station:② -->

**② 向量的三种乘法**

<!-- card:f54p -->

#### 1. 数量积（得一个数）

##### 坐标计算与运算律
* **坐标公式**：设 $\boldsymbol{a} = (a_1, a_2, a_3)$，$\boldsymbol{b} = (b_1, b_2, b_3)$，则
  $$\boldsymbol{a} \cdot \boldsymbol{b} = a_1b_1 + a_2b_2 + a_3b_3$$
* **运算律**：
  * **交换律**：$\boldsymbol{a} \cdot \boldsymbol{b} = \boldsymbol{b} \cdot \boldsymbol{a}$；
  * **分配律**：$(\boldsymbol{a} + \boldsymbol{b}) \cdot \boldsymbol{c} = \boldsymbol{a} \cdot \boldsymbol{c} + \boldsymbol{b} \cdot \boldsymbol{c}$；
  * **数乘结合**：$(\lambda\boldsymbol{a}) \cdot \boldsymbol{b} = \lambda(\boldsymbol{a} \cdot \boldsymbol{b})$；
  * **与模的关系**：$\boldsymbol{a} \cdot \boldsymbol{a} = |\boldsymbol{a}|^2$，故 $|\boldsymbol{a} \pm \boldsymbol{b}|^2 = |\boldsymbol{a}|^2 \pm 2\boldsymbol{a} \cdot \boldsymbol{b} + |\boldsymbol{b}|^2$；
  * ⚠️ **没有消去律（边界）**：当 $\boldsymbol{a} \neq \boldsymbol{0}$ 时，$\boldsymbol{a} \cdot \boldsymbol{b} = \boldsymbol{a} \cdot \boldsymbol{c}$ 推不出 $\boldsymbol{b} = \boldsymbol{c}$，只能推出 $\boldsymbol{a} \perp (\boldsymbol{b} - \boldsymbol{c})$。

<!-- card:urmg -->

#### 2. 向量积（得一个向量）

##### 坐标计算与运算律
* **行列式公式**：
  $$\boldsymbol{a} \times \boldsymbol{b} = \begin{vmatrix} \boldsymbol{i} & \boldsymbol{j} & \boldsymbol{k} \\ a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \end{vmatrix} = (a_2b_3 - a_3b_2,\ a_3b_1 - a_1b_3,\ a_1b_2 - a_2b_1)$$
* **运算律**：
  * **反交换律**：$\boldsymbol{a} \times \boldsymbol{b} = -\boldsymbol{b} \times \boldsymbol{a}$，故 $\boldsymbol{a} \times \boldsymbol{a} = \boldsymbol{0}$；
  * **分配律**：$(\boldsymbol{a} + \boldsymbol{b}) \times \boldsymbol{c} = \boldsymbol{a} \times \boldsymbol{c} + \boldsymbol{b} \times \boldsymbol{c}$；
  * **数乘结合**：$(\lambda\boldsymbol{a}) \times \boldsymbol{b} = \boldsymbol{a} \times (\lambda\boldsymbol{b}) = \lambda(\boldsymbol{a} \times \boldsymbol{b})$；
  * ⚠️ **无交换律与结合律（边界）**：一般 $\boldsymbol{a} \times \boldsymbol{b} \neq \boldsymbol{b} \times \boldsymbol{a}$，$(\boldsymbol{a} \times \boldsymbol{b}) \times \boldsymbol{c} \neq \boldsymbol{a} \times (\boldsymbol{b} \times \boldsymbol{c})$。

<!-- card:pn0n -->

#### 3. 混合积（得一个数）

##### 坐标计算与轮换对称
* **坐标公式**：设 $\boldsymbol{a} = (a_1, a_2, a_3)$，$\boldsymbol{b} = (b_1, b_2, b_3)$，$\boldsymbol{c} = (c_1, c_2, c_3)$，则
  $$[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}] = (\boldsymbol{a} \times \boldsymbol{b}) \cdot \boldsymbol{c} = \begin{vmatrix} a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \\ c_1 & c_2 & c_3 \end{vmatrix}$$
  * **按第一行展开**：
    $$\begin{aligned} [\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}] = \ & a_1(b_2c_3 - b_3c_2) \\ & - a_2(b_1c_3 - b_3c_1) \\ & + a_3(b_1c_2 - b_2c_1) \end{aligned}$$
* **轮换**：三个向量依次往前移动一个位置，最前面的放到最后，如 $\boldsymbol{a}\,\boldsymbol{b}\,\boldsymbol{c} \to \boldsymbol{b}\,\boldsymbol{c}\,\boldsymbol{a} \to \boldsymbol{c}\,\boldsymbol{a}\,\boldsymbol{b}$。轮换不变：
  $$[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}] = [\boldsymbol{b}\ \boldsymbol{c}\ \boldsymbol{a}] = [\boldsymbol{c}\ \boldsymbol{a}\ \boldsymbol{b}]$$
  故 $(\boldsymbol{a} \times \boldsymbol{b}) \cdot \boldsymbol{c} = \boldsymbol{a} \cdot (\boldsymbol{b} \times \boldsymbol{c})$。
* **对换**：任意两个向量交换位置，剩下一个不动。对换变号：
  $$[\boldsymbol{b}\ \boldsymbol{a}\ \boldsymbol{c}] = [\boldsymbol{c}\ \boldsymbol{b}\ \boldsymbol{a}] = [\boldsymbol{a}\ \boldsymbol{c}\ \boldsymbol{b}] = -[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}]$$

<!-- station:③ -->

**③ 平面和直线**

> 💡 **本站定位**：直线、平面都由「一个点 + 一个方向向量」确定——直线用它自己走的方向 $\boldsymbol{s}$；平面里的方向有无数个，只能用它唯一不走的方向，即垂直方向 $\boldsymbol{n}$。

<!-- card:drzj -->

#### 1. 直线：一个点 + 方向向量
* **方向向量**：平行于直线的非零向量 $\boldsymbol{s} = (m, n, p)$，坐标称为==方向数==；乘任意非零常数仍是方向向量。
* **对称式**：
  $$\dfrac{x - x_0}{m} = \dfrac{y - y_0}{n} = \dfrac{z - z_0}{p}$$
* **参数式**：
  $$\begin{cases} x = x_0 + mt \\ y = y_0 + nt \\ z = z_0 + pt \end{cases}$$

<!-- card:oyub -->

#### 2. 平面：一个点 + 法向量
* **法向量**：垂直于平面的非零向量 $\boldsymbol{n} = (A, B, C)$；乘任意非零常数仍是法向量。
* **点法式**：
  $$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$$
* **一般式**（$A, B, C$ 不全为 $0$）：
  $$Ax + By + Cz + D = 0$$
* **截距式**（$a, b, c$ 都不为 $0$）：
  $$\dfrac{x}{a} + \dfrac{y}{b} + \dfrac{z}{c} = 1$$

<!-- card:see6 -->

#### 3. 两平面相交：交线与平面束
* **交线（直线的一般式）**（两平面不平行）：
  $$\begin{cases} A_1x + B_1y + C_1z + D_1 = 0 \\ A_2x + B_2y + C_2z + D_2 = 0 \end{cases}$$
* **平面束**：过交线 $L$ 的全体平面，称为==平面束==；除 $\pi_2$ 本身外都可写成
  $$\begin{aligned} &(A_1x + B_1y + C_1z + D_1) \\ &+ \lambda(A_2x + B_2y + C_2z + D_2) = 0 \end{aligned}$$

<!-- station:④ -->

**④ 两个图形摆在一起**

> 💡 **本站定位**：平面由 $(M_0, \boldsymbol{n})$ 确定，直线由 $(M_0, \boldsymbol{s})$ 确定。两个图形摆在一起，只问三件事：**位置关系、夹角、距离**——只看方向时比较两个向量，涉及位置和距离时再从两个图形上各取一点连成向量 $\overrightarrow{M_1M_2}$。

<!-- card:f6no -->

#### 1. 位置关系：先比向量，再看点

##### 两平面（比 $\boldsymbol{n}_1, \boldsymbol{n}_2$）
* **垂直**：$\boldsymbol{n}_1 \cdot \boldsymbol{n}_2 = 0$
* **平行或重合**：$\boldsymbol{n}_1 \parallel \boldsymbol{n}_2$
* **相交**：$\boldsymbol{n}_1 \nparallel \boldsymbol{n}_2$

##### 两直线（比 $\boldsymbol{s}_1, \boldsymbol{s}_2$）
* **垂直**：$\boldsymbol{s}_1 \cdot \boldsymbol{s}_2 = 0$
* **平行或重合**：$\boldsymbol{s}_1 \parallel \boldsymbol{s}_2$
* **共面**：$[\overrightarrow{M_1M_2}\ \boldsymbol{s}_1\ \boldsymbol{s}_2] = 0$；不为 $0$ 则为==异面直线==（既不平行、也不相交）

##### 直线与平面（比 $\boldsymbol{s}, \boldsymbol{n}$）
* **线垂直于面**：$\boldsymbol{s} \parallel \boldsymbol{n}$
* **线平行于面或在面内**：$\boldsymbol{s} \cdot \boldsymbol{n} = 0$
* **相交**：$\boldsymbol{s} \cdot \boldsymbol{n} \neq 0$

<!-- card:nnk8 -->

#### 2. 夹角：一律取 $\left[0, \dfrac{\pi}{2}\right]$
* **两平面**：法向量夹角中不超过 $\dfrac{\pi}{2}$ 的那个：
  $$\cos\theta = \dfrac{|\boldsymbol{n}_1 \cdot \boldsymbol{n}_2|}{|\boldsymbol{n}_1||\boldsymbol{n}_2|}$$
* **两直线**：方向向量夹角中不超过 $\dfrac{\pi}{2}$ 的那个：
  $$\cos\varphi = \dfrac{|\boldsymbol{s}_1 \cdot \boldsymbol{s}_2|}{|\boldsymbol{s}_1||\boldsymbol{s}_2|}$$
* **直线与平面**：直线与它在平面上的投影直线的夹角（直线垂直于平面时规定为 $\dfrac{\pi}{2}$）：
  $$\sin\varphi = \dfrac{|\boldsymbol{s} \cdot \boldsymbol{n}|}{|\boldsymbol{s}||\boldsymbol{n}|}$$
* **投影直线**：直线 $L$ 不垂直于平面 $\pi$ 时，过 $L$ 作垂直于 $\pi$ 的平面（==投影平面==），它与 $\pi$ 的交线称为 $L$ 在 $\pi$ 上的==投影直线==。

<!-- card:lxxr -->

#### 3. 距离：连一条斜线，剥出高
* **点到平面**：
  $$d = \dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}$$
* **两平行平面**（$A, B, C$ 先化成相同）：
  $$d = \dfrac{|D_1 - D_2|}{\sqrt{A^2 + B^2 + C^2}}$$
* **点到直线**：
  $$d = \dfrac{|\overrightarrow{M_1M_0} \times \boldsymbol{s}|}{|\boldsymbol{s}|}$$
* **两异面直线**：与两直线都垂直相交的直线称为==公垂线==，它夹在两直线间的线段长就是距离：
  $$d = \dfrac{|[\overrightarrow{M_1M_2}\ \boldsymbol{s}_1\ \boldsymbol{s}_2]|}{|\boldsymbol{s}_1 \times \boldsymbol{s}_2|}$$

<!-- station:⑤ -->

**⑤ 曲面长什么样**

> 💡 **本站定位**：若曲面 $S$ 上任一点的坐标都满足方程 $F(x, y, z) = 0$，不在 $S$ 上的点的坐标都不满足，则称 $F(x, y, z) = 0$ 为曲面 $S$ 的==方程==。方程不再是一次时，图形就弯了：缺一个变量是**柱面**，$x, y$ 只以 $x^2 + y^2$ 整体出现是**旋转曲面**，其余三元二次方程是**二次曲面**。

<!-- card:h9xu -->

#### 1. 柱面
* **定义**：平行于定直线、并沿定曲线 $C$ 移动的直线 $L$ 所形成的曲面称为==柱面==；$C$ 称为==准线==，$L$ 称为==母线==。
* **母线平行于 $z$ 轴**：$F(x, y) = 0$（母线平行于 $x$ 轴为 $F(y, z) = 0$，平行于 $y$ 轴为 $F(x, z) = 0$）
* **圆柱面**：$x^2 + y^2 = R^2$
* **椭圆柱面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$

![椭圆柱面](assets/images/surfaces/cylinder-elliptic.svg)

* **双曲柱面**：$\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$

![双曲柱面](assets/images/surfaces/cylinder-hyperbolic.svg)

* **抛物柱面**：$x^2 = 2py$

![抛物柱面](assets/images/surfaces/cylinder-parabolic.svg)

<!-- card:b0jw -->

#### 2. 旋转曲面
* **定义**：平面曲线绕该平面上一条定直线旋转一周所成的曲面称为==旋转曲面==；原曲线称为==母线==，定直线称为==旋转轴==。
* **$yOz$ 面曲线 $f(y, z) = 0$ 绕 $z$ 轴**：$f\left(\pm\sqrt{x^2 + y^2},\ z\right) = 0$

![旋转曲面：高度不变、到轴距离不变](assets/images/surfaces/revolution-generic.svg)

![圆环面：同一高度两个圆](assets/images/surfaces/torus.svg)

* **$yOz$ 面曲线 $f(y, z) = 0$ 绕 $y$ 轴**：$f\left(y,\ \pm\sqrt{x^2 + z^2}\right) = 0$
* **空间曲线 $x = x(t),\ y = y(t),\ z = z(t)$ 绕 $z$ 轴**：$z = z(t),\ x^2 + y^2 = x^2(t) + y^2(t)$（消去 $t$）

![直线与轴异面：单叶双曲面](assets/images/surfaces/line-skew-hyperboloid.svg)

* **空间曲线 $x = x(t),\ y = y(t),\ z = z(t)$ 绕 $x$ 轴**：$x = x(t),\ y^2 + z^2 = y^2(t) + z^2(t)$（消去 $t$）

<!-- card:n3yr -->

#### 3. 二次曲面
* **定义**：三元二次方程所表示的曲面称为==二次曲面==；用平行于坐标面的平面去截曲面，由截出的曲线（==截痕==）拼出曲面形状的方法称为==截痕法==。
* **球面**：$(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$

![球面](assets/images/surfaces/sphere.svg)

* **椭球面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$

![椭球面](assets/images/surfaces/ellipsoid.svg)

* **椭圆锥面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = z^2$

![椭圆锥面](assets/images/surfaces/elliptic-cone.svg)

* **单叶双曲面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} - \dfrac{z^2}{c^2} = 1$

![单叶双曲面](assets/images/surfaces/hyperboloid-one-sheet.svg)

* **双叶双曲面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} - \dfrac{z^2}{c^2} = -1$

![双叶双曲面](assets/images/surfaces/hyperboloid-two-sheets.svg)

* **椭圆抛物面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = z$

![椭圆抛物面](assets/images/surfaces/elliptic-paraboloid.svg)

* **双曲抛物面（马鞍面）**：$\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = z$

##### 第 6、7 章最常见的几张曲面
* **上半球面**：$z = \sqrt{R^2 - x^2 - y^2}$
* **圆锥面（上半）**：$z = \sqrt{x^2 + y^2}$
* **旋转抛物面**：$z = x^2 + y^2$
* **圆柱面与偏心圆柱面**：$x^2 + y^2 = R^2$，$x^2 + y^2 = 2Rx\text{（即 }(x - R)^2 + y^2 = R^2\text{）}$

<!-- station:⑥ -->

**⑥ 压到坐标面上**

> 💡 **本站定位**：第 6 章算三重积分、第 7 章算曲面积分，都要先把空间里的曲线或立体压到坐标面上，定出 $x, y$ 的积分范围。空间曲线是两张曲面的交线；消去 $z$ 得到**投影柱面**，再与 $z = 0$ 联立就是 $xOy$ 面上的**投影曲线**。

<!-- card:lpua -->

#### 1. 空间曲线
* **一般方程（两曲面的交线）**：$\begin{cases} F(x, y, z) = 0 \\ G(x, y, z) = 0 \end{cases}$

![两曲面相交成空间曲线](assets/images/surfaces/proj-intersection-curve.svg)

* **参数方程**：$x = x(t),\ y = y(t),\ z = z(t)$

<!-- card:wago -->

#### 2. 曲线的投影
* **定义**：以空间曲线 $C$ 为准线、母线平行于 $z$ 轴的柱面称为 $C$ 关于 $xOy$ 面的==投影柱面==；投影柱面与 $xOy$ 面的交线称为 $C$ 在 $xOy$ 面上的==投影曲线==。
* **关于 $xOy$ 面的投影柱面**：从曲线一般方程中消去 $z$，得 $H(x, y) = 0$
* **在 $xOy$ 面上的投影曲线**：$\begin{cases} H(x, y) = 0 \\ z = 0 \end{cases}$（必要时补上 $x, y$ 的范围）

![投影柱面与投影曲线](assets/images/surfaces/proj-cylinder-and-curve.svg)

* **在 $yOz$ 面上的投影曲线**：消去 $x$，得 $\begin{cases} H_1(y, z) = 0 \\ x = 0 \end{cases}$
* **在 $zOx$ 面上的投影曲线**：消去 $y$，得 $\begin{cases} H_2(x, z) = 0 \\ y = 0 \end{cases}$

<!-- card:bgto -->

#### 3. 立体的投影区域
* **定义**：空间立体 $\Omega$ 中所有点在 $xOy$ 面上的投影组成的平面区域，称为 $\Omega$ 在 $xOy$ 面上的==投影区域==，记作 $D_{xy}$。
* **上下两张曲面 $z = z_1(x, y)$ 与 $z = z_2(x, y)$ 围成**：消去 $z$ 得交线投影 $z_1(x, y) = z_2(x, y)$，其所围平面区域即为 $D_{xy}$

![锥面与上半球面围成的立体](assets/images/surfaces/proj-cone-hemisphere.svg)

* **侧面为母线平行于 $z$ 轴的柱面 $H(x, y) = 0$**：柱面准线 $H(x, y) = 0$ 所围平面区域即为 $D_{xy}$

![侧面是柱面的立体](assets/images/surfaces/proj-cylinder-solid.svg)

* **球体 $x^2 + y^2 + z^2 \le R^2$ 的投影区域**：$D_{xy}: x^2 + y^2 \le R^2$（边界来自赤道轮廓线 $z = 0$）

---

<!-- section:意义 -->

### 意义

本卡在做题时专门用于解决以下 15 类确定性目标，按站排列：



* **1. 由条件求向量**
  * **问题**：已知向量的模、方向角或与某些向量的关系，求这个向量；如求与三条坐标轴夹角都相等的单位向量。
  * **目标**：把条件写成坐标的方程。
  * **调用**：
    * 模：$|\boldsymbol{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$；
    * 方向余弦：$\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$，单位向量 $\boldsymbol{e}_a = (\cos\alpha, \cos\beta, \cos\gamma)$；
    * 平行：$\boldsymbol{b} = \lambda\boldsymbol{a}$。
  * **行动**：
    1. 设出坐标 $(x, y, z)$，或由平行设成 $\lambda\boldsymbol{a}$；
    2. 每个条件写成一个方程；如三个夹角相等：$3\cos^2\alpha = 1$，$\cos\alpha = \pm\dfrac{1}{\sqrt{3}}$，所求单位向量为 $\pm\dfrac{1}{\sqrt{3}}(1, 1, 1)$；
    3. 开方得到 $\pm$ 两组时，看题目有没有限定方向（如与某轴成锐角）。



* **2. 算模、夹角、投影**
  * **问题**：已知 $|\boldsymbol{a}|$、$|\boldsymbol{b}|$ 和夹角，求 $|\boldsymbol{a} + \boldsymbol{b}|$、$|\boldsymbol{a} \times \boldsymbol{b}|$；求两向量的夹角、一个向量在另一个上的投影。
  * **目标**：模用数量积平方展开；有坐标就直接代坐标公式。
  * **调用**：
    * $|\boldsymbol{a} \pm \boldsymbol{b}|^2 = |\boldsymbol{a}|^2 \pm 2\boldsymbol{a} \cdot \boldsymbol{b} + |\boldsymbol{b}|^2$；
    * $\cos\theta = \dfrac{\boldsymbol{a} \cdot \boldsymbol{b}}{|\boldsymbol{a}||\boldsymbol{b}|}$，$\operatorname{Prj}_{\boldsymbol{b}}\boldsymbol{a} = \dfrac{\boldsymbol{a} \cdot \boldsymbol{b}}{|\boldsymbol{b}|}$；
    * $|\boldsymbol{a} \times \boldsymbol{b}| = |\boldsymbol{a}||\boldsymbol{b}|\sin\theta$。
  * **行动**：
    1. 没有坐标：如 $|\boldsymbol{a}| = 2$，$|\boldsymbol{b}| = 3$，夹角 $\dfrac{\pi}{3}$：$\boldsymbol{a} \cdot \boldsymbol{b} = 3$，$|\boldsymbol{a} + \boldsymbol{b}|^2 = 4 + 6 + 9 = 19$，$|\boldsymbol{a} + \boldsymbol{b}| = \sqrt{19}$；$|\boldsymbol{a} \times \boldsymbol{b}| = 6\sin\dfrac{\pi}{3} = 3\sqrt{3}$；
    2. 有坐标：直接用坐标算点积、叉积和模；
    3. 向量是别的向量的组合，如 $(\boldsymbol{a} + \boldsymbol{b}) \times (\boldsymbol{a} - \boldsymbol{b})$：按分配律展开，用 $\boldsymbol{a} \times \boldsymbol{a} = \boldsymbol{0}$ 和反交换化简，得 $-2\boldsymbol{a} \times \boldsymbol{b}$。
* **3. 求面积、体积；判断共面**
  * **问题**：求三角形面积、四面体体积；判断三个向量或四个点是否共面。
  * **目标**：面积用叉积的模，体积和共面用混合积。
  * **调用**：
    * 三角形面积 $\dfrac{1}{2}|\overrightarrow{AB} \times \overrightarrow{AC}|$；
    * 四面体体积 $\dfrac{1}{6}\left|[\overrightarrow{AB}\ \overrightarrow{AC}\ \overrightarrow{AD}]\right|$；
    * 共面 $\iff$ 混合积为 $0$。
  * **行动**：
    1. 从同一个点出发写出各边向量；
    2. 面积：如 $A(1, 0, 0)$，$B(0, 1, 0)$，$C(0, 0, 1)$：$\overrightarrow{AB} \times \overrightarrow{AC} = (1, 1, 1)$，面积为 $\dfrac{\sqrt{3}}{2}$；
    3. 体积、共面：把三个向量排成三阶行列式计算；如再取 $D(1, 1, -1)$，$\overrightarrow{AD} = (0, 1, -1)$，行列式为 $0$，四点共面。



* **4. 求平面方程**
  * **问题**：按给定条件求平面：过三点；过一点且平行于两个向量；过一点且垂直于一条直线；过一条直线且满足另一个条件。
  * **目标**：找一个点和一个法向量；过已知直线时用平面束。
  * **调用**：
    * 点法式：$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$；
    * 法向量同时垂直于两个向量时：$\boldsymbol{n} = \boldsymbol{a} \times \boldsymbol{b}$；
    * 平面束：$\pi_1 + \lambda\pi_2 = 0$。
  * **行动**：
    1. 找法向量：
       * 平面平行于两个不平行的向量（或包含两条相交直线）：取它们的叉积；如过 $M_0(1, 0, -1)$ 且平行于 $(2, 1, 1)$、$(1, -1, 0)$：$\boldsymbol{n} = (1, 1, -3)$，平面为 $x + y - 3z - 4 = 0$；
       * 平面垂直于一条直线：直线的方向向量就是法向量；
       * 平面与某平面平行：沿用那个平面的法向量；
    2. 平面过一条已知直线：先把直线写成一般式，用平面束，再由另一个条件定 $\lambda$；
    3. 写方程，代入题中的点检验。
* **5. 求直线方程**
  * **问题**：按给定条件求直线：过两点；过一点且垂直于一个平面；过一点且与两个向量都垂直；把一般式化为对称式。
  * **目标**：找一个点和一个方向向量。
  * **调用**：
    * 对称式：$\dfrac{x - x_0}{m} = \dfrac{y - y_0}{n} = \dfrac{z - z_0}{p}$；
    * 方向向量同时垂直于两个向量时：$\boldsymbol{s} = \boldsymbol{a} \times \boldsymbol{b}$；一般式的方向向量 $\boldsymbol{s} = \boldsymbol{n}_1 \times \boldsymbol{n}_2$。
  * **行动**：
    1. 找方向向量：过两点，取两点连线；垂直于平面，取平面的法向量；与两个向量都垂直，取叉积；
    2. 一般式化为对称式：如 $\begin{cases} x + y + z = 1 \\ 2x - y + 3z = 4 \end{cases}$：$\boldsymbol{s} = (1, 1, 1) \times (2, -1, 3) = (4, -1, -3)$；令 $y = 0$ 解得点 $(-1, 0, 2)$，直线为 $\dfrac{x + 1}{4} = \dfrac{y}{-1} = \dfrac{z - 2}{-3}$；
    3. 直线过已知点 $M_0$，且与已知直线 $L$ 相交：所求直线在过 $M_0$ 和 $L$ 的平面内，先求出这个平面，再与其他条件联立。



* **6. 判断位置关系**
  * **问题**：判断两平面、两直线、直线与平面的位置关系（平行、重合、垂直、相交、异面、直线在平面内）。
  * **目标**：先比较两个向量，再代一个点。
  * **调用**：
    * 向量垂直 $\iff$ 点积为 $0$；向量平行 $\iff$ 叉积为 $\boldsymbol{0}$（坐标成比例）；
    * 线 $\perp$ 面 $\iff \boldsymbol{s} \parallel \boldsymbol{n}$；线 $\parallel$ 面或在面内 $\iff \boldsymbol{s} \cdot \boldsymbol{n} = 0$；
    * 两直线共面 $\iff [\overrightarrow{M_1M_2}\ \boldsymbol{s}_1\ \boldsymbol{s}_2] = 0$。
  * **行动**：
    1. 写出两个图形的法向量或方向向量；
    2. 比较向量：成比例，平行；点积为 $0$，垂直；线面要翻译；
    3. 向量平行（线面是向量垂直）时，代一个点，区分平行与重合（在面内）；如直线 $\dfrac{x - 1}{2} = \dfrac{y}{1} = \dfrac{z + 1}{-1}$ 与平面 $x - y + z = 0$：$\boldsymbol{s} \cdot \boldsymbol{n} = 2 - 1 - 1 = 0$，点 $(1, 0, -1)$ 满足平面方程，直线在平面内；
    4. 两直线不平行时，算混合积：为 $0$ 相交，不为 $0$ 异面。
* **7. 求夹角**
  * **问题**：求两平面、两直线、直线与平面的夹角。
  * **目标**：化成两个向量的夹角，取不超过 $\dfrac{\pi}{2}$ 的那个。
  * **调用**：
    * 面面：$\cos\theta = \dfrac{|\boldsymbol{n}_1 \cdot \boldsymbol{n}_2|}{|\boldsymbol{n}_1||\boldsymbol{n}_2|}$；线线把 $\boldsymbol{n}$ 换成 $\boldsymbol{s}$；
    * 线面：$\sin\varphi = \dfrac{|\boldsymbol{s} \cdot \boldsymbol{n}|}{|\boldsymbol{s}||\boldsymbol{n}|}$。
  * **行动**：
    1. 写出两个向量（直线是一般式时，先求 $\boldsymbol{s} = \boldsymbol{n}_1 \times \boldsymbol{n}_2$）；
    2. 面面、线线：分子取绝对值，算余弦；
    3. 线面：算的是正弦，不是余弦。
* **8. 求距离**
  * **问题**：求点到平面、点到直线、两平行平面、两异面直线的距离。
  * **目标**：在一个图形上取一点，写出连线向量，按图形选乘法。
  * **调用**：
    * 点到平面：$d = \dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}$；
    * 点到直线：$d = \dfrac{|\overrightarrow{M_1M_0} \times \boldsymbol{s}|}{|\boldsymbol{s}|}$；
    * 异面直线：$d = \dfrac{|[\overrightarrow{M_1M_2}\ \boldsymbol{s}_1\ \boldsymbol{s}_2]|}{|\boldsymbol{s}_1 \times \boldsymbol{s}_2|}$。
  * **行动**：
    1. 点到平面：直接代公式；如 $(1, 2, 3)$ 到 $2x - 2y + z - 4 = 0$：$d = \dfrac{|2 - 4 + 3 - 4|}{3} = 1$；
    2. 点到直线：在直线上取一点 $M_1$，算叉积；如 $(1, 0, 0)$ 到过原点、方向 $(1, 1, 1)$ 的直线：叉积为 $(0, -1, 1)$，$d = \dfrac{\sqrt{2}}{\sqrt{3}} = \dfrac{\sqrt{6}}{3}$；
    3. 两平行平面、直线与平行平面：在一个图形上取一点，化成点到平面；
    4. 异面直线：在两直线上各取一点，算混合积与叉积。
* **9. 求垂足、对称点、交点**
  * **问题**：求点在平面或直线上的垂足（投影点）；求点关于平面的对称点；求直线与平面的交点；求过一点且与已知直线垂直相交的直线。
  * **目标**：过已知点作垂线（或垂面），与已知图形求交点。
  * **调用**：参数式代入平面方程求 $t$；点到平面的垂足 $t_0 = -\dfrac{Ax_0 + By_0 + Cz_0 + D}{A^2 + B^2 + C^2}$，对称点取 $2t_0$。
  * **行动**：
    1. 点到平面：过点沿 $\boldsymbol{n}$ 作直线，代入平面方程；如 $M_0(1, 2, 3)$ 与平面 $x + y + z = 0$：$t_0 = -2$，垂足 $(-1, 0, 1)$，对称点 $(-3, -2, -1)$；
    2. 点到直线：过点作垂直于直线的平面，求它与直线的交点；
    3. 过点且与直线垂直相交的直线：连接已知点与第 2 步的垂足；
    4. 直线与平面的交点：直线写成参数式，代入平面方程。
* **10. 求直线在平面上的投影直线**
  * **问题**：求直线 $L$ 在平面 $\pi$ 上的投影直线。
  * **目标**：求出过 $L$ 且垂直于 $\pi$ 的投影平面，再与 $\pi$ 联立。
  * **调用**：平面束 $\pi_1 + \lambda\pi_2 = 0$；两平面垂直 $\iff \boldsymbol{n}_1 \cdot \boldsymbol{n}_2 = 0$。
  * **行动**：
    1. 把 $L$ 写成一般式，作平面束；
    2. 平面束的法向量与 $\pi$ 的法向量点积为 $0$，定出 $\lambda$；如 $L: \begin{cases} x + y - z - 1 = 0 \\ x - y + z + 1 = 0 \end{cases}$，$\pi: x + y + z = 0$：法向量 $(1 + \lambda, 1 - \lambda, -1 + \lambda)$，点积 $1 + \lambda = 0$，$\lambda = -1$，投影平面为 $y - z - 1 = 0$；
    3. 投影直线为 $\begin{cases} y - z - 1 = 0 \\ x + y + z = 0 \end{cases}$；
    4. $L$ 给的是对称式：投影平面的法向量取 $\boldsymbol{s} \times \boldsymbol{n}$，过 $L$ 上一点写点法式。



* **11. 求旋转曲面的方程**
  * **问题**：求坐标面上的曲线、或空间直线绕坐标轴旋转一周所得曲面的方程；如求过 $A(1, 0, 0)$、$B(0, 1, 1)$ 的直线绕 $z$ 轴旋转所得曲面。
  * **目标**：用「高度不变，到轴的距离不变」写出方程。
  * **调用**：
    * 平面曲线：绕哪个轴，那个坐标不动，另一个换成 $\pm$ 到轴的距离；
    * 空间曲线绕 $z$ 轴：$x^2 + y^2 = x^2(t) + y^2(t)$，$z = z(t)$。
  * **行动**：
    1. 平面曲线：如 $yOz$ 面上的 $z = y^2$ 绕 $z$ 轴，$y$ 换成 $\pm\sqrt{x^2 + y^2}$，得 $z = x^2 + y^2$；绕 $y$ 轴，$z$ 换成 $\pm\sqrt{x^2 + z^2}$，得 $x^2 + z^2 = y^4$；
    2. 空间直线：写成参数式 $x = 1 - t$，$y = t$，$z = t$，则 $x^2 + y^2 = (1 - z)^2 + z^2$，即 $x^2 + y^2 = 2z^2 - 2z + 1$；
    3. 后续求这个曲面围成的立体的体积：用 $z = h$ 截，截面是半径为 $\sqrt{x^2 + y^2}$ 的圆，用已知平行截面面积的立体体积（第 3 章）。
* **12. 认出曲面**
  * **问题**：给出方程，说出它表示什么曲面；或判断方程表示的是旋转曲面还是柱面。
  * **目标**：先看缺不缺变量，再看是否有平方和，最后用截痕。
  * **调用**：缺一个变量是柱面；$x^2 + y^2$ 整体出现是绕 $z$ 轴的旋转曲面；常见二次曲面表；截痕法。
  * **行动**：
    1. 缺变量：如 $x^2 + y^2 = 2x$，配方得 $(x - 1)^2 + y^2 = 1$，母线平行于 $z$ 轴的圆柱面；
    2. 有平方和：如 $z = 2 - x^2 - y^2$，开口向下的旋转抛物面；$z^2 = x^2 + y^2$，圆锥面；
    3. 其余：移项、配方化成标准形，对照二次曲面表；如 $x^2 - y^2 - z^2 = 1$ 即 $y^2 + z^2 - x^2 = -1$，绕 $x$ 轴的双叶双曲面；
    4. 分不清单叶、双叶时，用截痕：垂直于轴的平面都能截出椭圆，是单叶。



* **13. 求空间曲线在坐标面上的投影**
  * **问题**：求曲线 $\begin{cases} F = 0 \\ G = 0 \end{cases}$ 在 $xOy$ 面（或其他坐标面）上的投影曲线方程。
  * **目标**：消去投影方向的那个变量。
  * **调用**：消去 $z$ 得投影柱面 $H(x, y) = 0$；投影曲线 $\begin{cases} H(x, y) = 0 \\ z = 0 \end{cases}$。
  * **行动**：
    1. 从两个方程中消去 $z$；如 $\begin{cases} x^2 + y^2 + z^2 = 1 \\ x + z = 1 \end{cases}$：$z = 1 - x$ 代入，得 $2x^2 - 2x + y^2 = 0$；
    2. 投影曲线为 $\begin{cases} 2x^2 - 2x + y^2 = 0 \\ z = 0 \end{cases}$；
    3. 消元时用过开方，或曲面只取一部分：补上 $x, y$ 的范围。
* **14. 求立体在坐标面上的投影区域**
  * **问题**：为三重积分、曲面积分定积分区域，求立体或曲面在 $xOy$ 面上的投影区域 $D_{xy}$。
  * **目标**：找到投影区域的边界曲线，投下来。
  * **调用**：两曲面的交线消去 $z$；柱面的准线；轮廓线。
  * **行动**：
    1. 上、下两张曲面围成：求交线；如 $z = \sqrt{x^2 + y^2}$ 与 $z = \sqrt{2 - x^2 - y^2}$：令两式相等得 $x^2 + y^2 = 1$，所以 $D_{xy}: x^2 + y^2 \le 1$；
    2. 侧面是母线平行于 $z$ 轴的柱面：柱面的准线就是边界；
    3. 曲面在侧面折回（如球面）：边界取轮廓线；
    4. 画出 $D_{xy}$，为后面定 $x, y$ 的上下限做准备。
* **15. 把曲线写成参数方程**
  * **问题**：为第 7 章的曲线积分，把一般方程给出的空间曲线写成参数方程；如 $\begin{cases} x^2 + y^2 = 1 \\ x + z = 1 \end{cases}$。
  * **目标**：给投影曲线取参数，再解出第三个坐标。
  * **调用**：两种方程互化。
  * **行动**：
    1. 求投影曲线：这里已经是 $x^2 + y^2 = 1$；
    2. 投影曲线取参数：$x = \cos t$，$y = \sin t$；
    3. 由另一个方程解出 $z$：$z = 1 - \cos t$，$t$ 从 $0$ 到 $2\pi$；
    4. 曲线有方向时，看 $t$ 增加的方向是否与题目规定的方向一致。