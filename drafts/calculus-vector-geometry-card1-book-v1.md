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

**① 空间里的长度和方向**

第 5—7 章研究多元函数：$z = f(x, y)$ 的图像是空间里的曲面，重积分要在空间立体上切块求和。所以先要会描述空间里的东西。最基本的是既有长度、又有方向的量，比如位移、力、速度。在空间直角坐标系里，一个这样的量往 $x$、$y$、$z$ 三个方向各走了多少，三个数一定，它就完全定了。于是长度、方向、加减，都能从这三个数算出来。

#### 1. 向量
既有大小又有方向的量称为==向量==；向量的大小称为它的==模==，记作 $|\boldsymbol{a}|$。
* **单位向量**：模为 $1$ 的向量；
* **零向量**：模为 $0$ 的向量，记作 $\boldsymbol{0}$，方向任意；
* **相等**：大小相等、方向相同的两个向量相等，与起点在哪里无关，所以向量可以平移。

#### 2. 向量的坐标
设 $\boldsymbol{i}, \boldsymbol{j}, \boldsymbol{k}$ 分别是 $x$、$y$、$z$ 轴正向的单位向量，则任一向量可唯一写成
$$\boldsymbol{a} = a_x\boldsymbol{i} + a_y\boldsymbol{j} + a_z\boldsymbol{k} = (a_x, a_y, a_z)$$

$(a_x, a_y, a_z)$ 称为 $\boldsymbol{a}$ 的==坐标==。
* **两点确定的向量**：$\overrightarrow{M_1M_2} = (x_2 - x_1,\ y_2 - y_1,\ z_2 - z_1)$，终点坐标减起点坐标。

#### 3. 两向量的夹角
把两个非零向量 $\boldsymbol{a}, \boldsymbol{b}$ 的起点放在一起，它们之间不超过 $\pi$ 的角 $\theta$（$0 \le \theta \le \pi$）称为 $\boldsymbol{a}$ 与 $\boldsymbol{b}$ 的==夹角==。
* **垂直**：$\theta = \dfrac{\pi}{2}$ 时称 $\boldsymbol{a} \perp \boldsymbol{b}$；
* **平行**：$\theta = 0$ 或 $\pi$ 时称 $\boldsymbol{a} \parallel \boldsymbol{b}$；
* **零向量**：规定零向量与任何向量既平行又垂直。

#### 4. 方向角与方向余弦
非零向量 $\boldsymbol{a}$ 与 $x$、$y$、$z$ 轴正向的夹角 $\alpha, \beta, \gamma$ 称为 $\boldsymbol{a}$ 的==方向角==，$\cos\alpha, \cos\beta, \cos\gamma$ 称为 $\boldsymbol{a}$ 的==方向余弦==。

#### 5. 向量的投影
设 $\boldsymbol{b} \neq \boldsymbol{0}$，$\boldsymbol{a}$ 与 $\boldsymbol{b}$ 的夹角为 $\theta$，称
$$\operatorname{Prj}_{\boldsymbol{b}}\boldsymbol{a} = |\boldsymbol{a}|\cos\theta$$

为 $\boldsymbol{a}$ 在 $\boldsymbol{b}$ 上的==投影==。
* **投影是一个数**：$\theta > \dfrac{\pi}{2}$ 时为负；
* **坐标就是投影**：$a_x, a_y, a_z$ 分别是 $\boldsymbol{a}$ 在 $x$、$y$、$z$ 轴上的投影。

**② 向量的三种乘法**

有了坐标，两个向量放在一起时，最常问的是：夹角多大，是否垂直，是否平行。后面写平面时，还要找一个同时垂直于两个已知方向的向量。三种乘法各管一类：数量积从坐标算出夹角；向量积造出同时垂直于两者的向量，它的长度正好是两者张成的平行四边形的面积；三个向量的混合积是它们张成的平行六面体的体积，体积为 $0$，说明三个向量共面。

#### 1. 数量积
$$\boldsymbol{a} \cdot \boldsymbol{b} = |\boldsymbol{a}||\boldsymbol{b}|\cos\theta$$

称为 $\boldsymbol{a}$ 与 $\boldsymbol{b}$ 的==数量积==（点积），其中 $\theta$ 为两者的夹角；结果是一个==数==。
* **用功来想**：力 $\boldsymbol{F}$ 使物体位移 $\boldsymbol{s}$，做的功 $W = |\boldsymbol{F}||\boldsymbol{s}|\cos\theta = \boldsymbol{F} \cdot \boldsymbol{s}$。

#### 2. 向量积
$\boldsymbol{a} \times \boldsymbol{b}$ 是一个==向量==，称为 $\boldsymbol{a}$ 与 $\boldsymbol{b}$ 的==向量积==（叉积）：
* **模**：$|\boldsymbol{a} \times \boldsymbol{b}| = |\boldsymbol{a}||\boldsymbol{b}|\sin\theta$；
* **方向**：同时垂直于 $\boldsymbol{a}$ 与 $\boldsymbol{b}$，且 $\boldsymbol{a}, \boldsymbol{b}, \boldsymbol{a} \times \boldsymbol{b}$ 符合右手法则：右手四指从 $\boldsymbol{a}$ 转向 $\boldsymbol{b}$，拇指指向 $\boldsymbol{a} \times \boldsymbol{b}$。

#### 3. 混合积
$$[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}] = (\boldsymbol{a} \times \boldsymbol{b}) \cdot \boldsymbol{c}$$

称为 $\boldsymbol{a}, \boldsymbol{b}, \boldsymbol{c}$ 的==混合积==；结果是一个==数==。

**③ 平面和直线**

平面和直线是空间里最简单的图形。用最少的条件，怎样把它们定下来？过一个点、和一个方向垂直的平面只有一个；过一个点、沿一个方向走的直线也只有一个。所以两者都由「一个点 + 一个向量」确定：平面用垂直于它的向量，直线用平行于它的向量。点 $M$ 在平面上，就是 $\overrightarrow{M_0M}$ 与法向量垂直，用数量积写出来就是平面方程；点 $M$ 在直线上，就是 $\overrightarrow{M_0M}$ 与方向向量平行，坐标成比例就是直线方程。

#### 1. 法向量
垂直于平面的非零向量，称为该平面的==法向量==，记作 $\boldsymbol{n}$。
* **不唯一**：法向量乘以任意非零常数，仍是法向量。

#### 2. 方向向量
平行于直线的非零向量，称为该直线的==方向向量==，记作 $\boldsymbol{s}$；它的坐标 $(m, n, p)$ 称为直线的一组==方向数==。

#### 3. 平面束
通过同一条直线 $L$ 的全体平面，称为过 $L$ 的==平面束==。

**④ 两个图形摆在一起**

平面、直线都写成了「点 + 向量」，两个图形之间的问题就有了统一的办法。平行、垂直、夹角只与方向有关，所以只比较两个向量：点积为 $0$ 是垂直，叉积为 $\boldsymbol{0}$ 是平行。但方向平行的两个平面，可能重合，也可能隔开；这时再代一个点进去。距离要用到位置：在一个图形上取一点，连到另一个图形上的点，得到一条连线向量，再用三种乘法之一把距离读出来。

#### 1. 两平面的夹角
两平面的法向量的夹角中，不超过 $\dfrac{\pi}{2}$ 的那个，称为==两平面的夹角==。

#### 2. 两直线的夹角
两直线的方向向量的夹角中，不超过 $\dfrac{\pi}{2}$ 的那个，称为==两直线的夹角==。

#### 3. 直线与平面的夹角
直线不垂直于平面时，直线与它在平面上的投影直线的夹角 $\varphi$（$0 \le \varphi < \dfrac{\pi}{2}$），称为==直线与平面的夹角==；直线垂直于平面时，规定 $\varphi = \dfrac{\pi}{2}$。

#### 4. 异面直线
既不平行、也不相交的两条直线，称为==异面直线==。
* **公垂线**：与两条异面直线都垂直相交的直线；夹在两直线之间的线段长，就是两异面直线的==距离==。

#### 5. 直线在平面上的投影直线
设直线 $L$ 不垂直于平面 $\pi$。过 $L$ 作垂直于 $\pi$ 的平面（==投影平面==），它与 $\pi$ 的交线称为 $L$ 在 $\pi$ 上的==投影直线==。

**⑤ 曲面长什么样**

平面和直线的方程都是一次的。方程不是一次的时候，图形就弯了，也不再由一个点和一个向量确定。这时反过来，从方程看形状。最常见的有三类。方程里缺 $z$：点上下移动，不影响方程是否成立，所以图形由一族竖直的直线组成，这是柱面。$x$ 和 $y$ 只以 $x^2 + y^2$ 的形式出现：方程只关心点到 $z$ 轴的距离，图形绕 $z$ 轴转动后不变，这是旋转曲面。其余的二次方程，用平行于坐标面的平面去切，看切出的曲线，拼出形状。

#### 1. 曲面的方程
若曲面 $S$ 上任一点的坐标都满足方程 $F(x, y, z) = 0$，不在 $S$ 上的点的坐标都不满足，则称 $F(x, y, z) = 0$ 为曲面 $S$ 的==方程==。

#### 2. 柱面
平行于定直线、并沿定曲线 $C$ 移动的直线 $L$ 所形成的曲面，称为==柱面==；$C$ 称为柱面的==准线==，$L$ 称为柱面的==母线==。

#### 3. 旋转曲面
平面曲线绕该平面上一条定直线旋转一周所成的曲面，称为==旋转曲面==；曲线称为旋转曲面的==母线==，定直线称为==旋转轴==。

#### 4. 二次曲面与截痕法
* **二次曲面**：三元二次方程所表示的曲面；
* **截痕法**：用坐标面和平行于坐标面的平面去截曲面，考察截出的曲线（==截痕==），由各截痕拼出曲面的形状。

**⑥ 压到坐标面上**

第 6 章算三重积分、第 7 章算曲面积分，都要先把空间里的东西压到坐标面上：立体在 $xOy$ 面上的影子，决定 $x$、$y$ 的积分范围。空间里的曲线，常常是两张曲面的交线。从两个方程中消去 $z$，剩下一个只含 $x$、$y$ 的方程；曲线正下方、正上方的点都满足它，所以它是一个柱面。再和 $z = 0$ 联立，就是曲线在 $xOy$ 面上的影子。

#### 1. 空间曲线的方程
* **一般方程**：两曲面的交线
  $$\begin{cases} F(x, y, z) = 0 \\ G(x, y, z) = 0 \end{cases}$$
* **参数方程**：$x = x(t)$，$y = y(t)$，$z = z(t)$。

#### 2. 投影柱面与投影曲线
设空间曲线为 $C$：
* **投影柱面**：以 $C$ 为准线、母线平行于 $z$ 轴的柱面，称为 $C$ 关于 $xOy$ 面的==投影柱面==；
* **投影曲线**：投影柱面与 $xOy$ 面的交线，称为 $C$ 在 $xOy$ 面上的==投影曲线==。

#### 3. 立体的投影区域
空间立体 $\Omega$ 中所有点在 $xOy$ 面上的投影组成的平面区域，称为 $\Omega$ 在 $xOy$ 面上的==投影区域==，记作 $D_{xy}$。

---

### 〔性质〕

**① 空间里的长度和方向**

**向量的坐标**

#### 1. 线性运算
设 $\boldsymbol{a} = (a_x, a_y, a_z)$，$\boldsymbol{b} = (b_x, b_y, b_z)$，则
* **加减**：$\boldsymbol{a} \pm \boldsymbol{b} = (a_x \pm b_x,\ a_y \pm b_y,\ a_z \pm b_z)$；
* **数乘**：$\lambda\boldsymbol{a} = (\lambda a_x,\ \lambda a_y,\ \lambda a_z)$。

**长度和方向**

#### 1. 模与两点间的距离
* **模**：$|\boldsymbol{a}| = \sqrt{a_x^2 + a_y^2 + a_z^2}$；
* **两点间的距离**：
  $|M_1M_2| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$

#### 2. 方向余弦
设 $\boldsymbol{a} \neq \boldsymbol{0}$：
$\cos\alpha = \dfrac{a_x}{|\boldsymbol{a}|}, \ \ \cos\beta = \dfrac{a_y}{|\boldsymbol{a}|}, \ \ \cos\gamma = \dfrac{a_z}{|\boldsymbol{a}|}$

* **平方和为 $1$**：$\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$；
* **单位向量**：与 $\boldsymbol{a}$ 同向的单位向量 $\boldsymbol{e}_a = \dfrac{\boldsymbol{a}}{|\boldsymbol{a}|} = (\cos\alpha, \cos\beta, \cos\gamma)$。

**平行**

#### 1. 两向量平行的条件
设 $\boldsymbol{a} \neq \boldsymbol{0}$，则
$\begin{aligned} \boldsymbol{b} \parallel \boldsymbol{a} & \iff \boldsymbol{b} = \lambda\boldsymbol{a} \\ & \iff \dfrac{b_x}{a_x} = \dfrac{b_y}{a_y} = \dfrac{b_z}{a_z} \end{aligned}$

* **分母为零（边界）**：理解为对应的分子也为零；如 $\dfrac{b_x}{0} = \dfrac{b_y}{1} = \dfrac{b_z}{2}$ 表示 $b_x = 0$ 且 $b_z = 2b_y$。

**② 向量的三种乘法**

**数量积（得一个数）**

#### 1. 坐标计算
$$\boldsymbol{a} \cdot \boldsymbol{b} = a_xb_x + a_yb_y + a_zb_z$$

* **依据**：$\boldsymbol{i} \cdot \boldsymbol{i} = \boldsymbol{j} \cdot \boldsymbol{j} = \boldsymbol{k} \cdot \boldsymbol{k} = 1$，$\boldsymbol{i} \cdot \boldsymbol{j} = \boldsymbol{j} \cdot \boldsymbol{k} = \boldsymbol{k} \cdot \boldsymbol{i} = 0$，再按分配律展开。

#### 2. 运算律
* **交换**：$\boldsymbol{a} \cdot \boldsymbol{b} = \boldsymbol{b} \cdot \boldsymbol{a}$；
* **分配**：$(\boldsymbol{a} + \boldsymbol{b}) \cdot \boldsymbol{c} = \boldsymbol{a} \cdot \boldsymbol{c} + \boldsymbol{b} \cdot \boldsymbol{c}$；
* **数乘**：$(\lambda\boldsymbol{a}) \cdot \boldsymbol{b} = \lambda(\boldsymbol{a} \cdot \boldsymbol{b})$；
* **模**：$\boldsymbol{a} \cdot \boldsymbol{a} = |\boldsymbol{a}|^2$；所以 $|\boldsymbol{a} \pm \boldsymbol{b}|^2 = |\boldsymbol{a}|^2 \pm 2\boldsymbol{a} \cdot \boldsymbol{b} + |\boldsymbol{b}|^2$。

#### 3. 垂直
$$\boldsymbol{a} \perp \boldsymbol{b} \iff \boldsymbol{a} \cdot \boldsymbol{b} = 0$$

#### 4. 夹角与投影
设 $\boldsymbol{a}, \boldsymbol{b}$ 都不是零向量：
* **夹角**：$\cos\theta = \dfrac{\boldsymbol{a} \cdot \boldsymbol{b}}{|\boldsymbol{a}||\boldsymbol{b}|}$；
* **投影**：$\operatorname{Prj}_{\boldsymbol{b}}\boldsymbol{a} = \dfrac{\boldsymbol{a} \cdot \boldsymbol{b}}{|\boldsymbol{b}|}$，即 $\boldsymbol{a} \cdot \boldsymbol{b} = |\boldsymbol{b}|\operatorname{Prj}_{\boldsymbol{b}}\boldsymbol{a}$。

**向量积（得一个向量）**

#### 1. 坐标计算
$$\boldsymbol{a} \times \boldsymbol{b} = \begin{vmatrix} \boldsymbol{i} & \boldsymbol{j} & \boldsymbol{k} \\ a_x & a_y & a_z \\ b_x & b_y & b_z \end{vmatrix}$$

* **展开**：
  $\boldsymbol{a} \times \boldsymbol{b} = (a_yb_z - a_zb_y,\ a_zb_x - a_xb_z,\ a_xb_y - a_yb_x)$

#### 2. 运算律
* **反交换**：$\boldsymbol{a} \times \boldsymbol{b} = -\boldsymbol{b} \times \boldsymbol{a}$，所以 $\boldsymbol{a} \times \boldsymbol{a} = \boldsymbol{0}$；
* **分配**：$(\boldsymbol{a} + \boldsymbol{b}) \times \boldsymbol{c} = \boldsymbol{a} \times \boldsymbol{c} + \boldsymbol{b} \times \boldsymbol{c}$；
* **数乘**：$(\lambda\boldsymbol{a}) \times \boldsymbol{b} = \boldsymbol{a} \times (\lambda\boldsymbol{b}) = \lambda(\boldsymbol{a} \times \boldsymbol{b})$；
* **没有交换律、结合律（边界）**：一般 $\boldsymbol{a} \times \boldsymbol{b} \neq \boldsymbol{b} \times \boldsymbol{a}$，$(\boldsymbol{a} \times \boldsymbol{b}) \times \boldsymbol{c} \neq \boldsymbol{a} \times (\boldsymbol{b} \times \boldsymbol{c})$。

#### 3. 平行
$$\boldsymbol{a} \parallel \boldsymbol{b} \iff \boldsymbol{a} \times \boldsymbol{b} = \boldsymbol{0}$$

#### 4. 面积
* **平行四边形**：以 $\boldsymbol{a}, \boldsymbol{b}$ 为邻边的平行四边形面积为 $|\boldsymbol{a} \times \boldsymbol{b}|$；
* **三角形**：$\triangle ABC$ 的面积为 $\dfrac{1}{2}|\overrightarrow{AB} \times \overrightarrow{AC}|$。

**混合积（得一个数）**

#### 1. 坐标计算
$$[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}] = \begin{vmatrix} a_x & a_y & a_z \\ b_x & b_y & b_z \\ c_x & c_y & c_z \end{vmatrix}$$

#### 2. 轮换与对换
* **轮换不变**：$[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}] = [\boldsymbol{b}\ \boldsymbol{c}\ \boldsymbol{a}] = [\boldsymbol{c}\ \boldsymbol{a}\ \boldsymbol{b}]$；
* **对换变号**：交换任意两个向量，混合积变号，如 $[\boldsymbol{b}\ \boldsymbol{a}\ \boldsymbol{c}] = -[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}]$。
* **依据**：行列式交换两行变号；轮换一次是交换两次。

#### 3. 体积
* **平行六面体**：以 $\boldsymbol{a}, \boldsymbol{b}, \boldsymbol{c}$ 为棱的平行六面体体积为 $|[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}]|$；
* **四面体**：四面体 $ABCD$ 的体积为 $\dfrac{1}{6}\left|[\overrightarrow{AB}\ \overrightarrow{AC}\ \overrightarrow{AD}]\right|$；
* **依据**：底面积 $|\boldsymbol{a} \times \boldsymbol{b}|$，高是 $\boldsymbol{c}$ 在 $\boldsymbol{a} \times \boldsymbol{b}$ 方向上投影的绝对值，相乘即得 $|(\boldsymbol{a} \times \boldsymbol{b}) \cdot \boldsymbol{c}|$。

#### 4. 共面
$$\boldsymbol{a}, \boldsymbol{b}, \boldsymbol{c} \text{ 共面} \iff [\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}] = 0$$

* **四点共面**：$A, B, C, D$ 共面 $\iff [\overrightarrow{AB}\ \overrightarrow{AC}\ \overrightarrow{AD}] = 0$。

**③ 平面和直线**

**平面**

#### 1. 点法式方程
过点 $M_0(x_0, y_0, z_0)$、法向量为 $\boldsymbol{n} = (A, B, C)$ 的平面方程为
$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$$

* **依据**：点 $M(x, y, z)$ 在平面上 $\iff \overrightarrow{M_0M} \perp \boldsymbol{n} \iff \boldsymbol{n} \cdot \overrightarrow{M_0M} = 0$。

#### 2. 一般式方程
$Ax + By + Cz + D = 0$

（$A, B, C$ 不全为零）表示一个平面，$\boldsymbol{n} = (A, B, C)$ 是它的法向量。特殊位置：
* **过原点**：$D = 0$；
* **缺一个变量**：如 $A = 0$，即 $By + Cz + D = 0$：$\boldsymbol{n} \perp x$ 轴，平面平行于 $x$ 轴；$D$ 也为 $0$ 时，平面包含 $x$ 轴；
* **缺两个变量**：如 $A = B = 0$，即 $Cz + D = 0$：平面平行于 $xOy$ 面（$D = 0$ 时就是 $xOy$ 面）。

#### 3. 截距式方程（查表）
在 $x$、$y$、$z$ 轴上的截距分别为 $a, b, c$（都不为零）的平面：
$$\dfrac{x}{a} + \dfrac{y}{b} + \dfrac{z}{c} = 1$$

#### 4. 过三点的平面（查表）
过不共线的三点 $M_1, M_2, M_3$ 的平面：
* **法向量**：$\boldsymbol{n} = \overrightarrow{M_1M_2} \times \overrightarrow{M_1M_3}$，再用点法式；
* **行列式形式**：
  $$\begin{vmatrix} x - x_1 & y - y_1 & z - z_1 \\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1 \end{vmatrix} = 0$$
* **依据**：$M$ 在平面上 $\iff \overrightarrow{M_1M}, \overrightarrow{M_1M_2}, \overrightarrow{M_1M_3}$ 共面 $\iff$ 混合积为 $0$。

**直线**

#### 1. 对称式（点向式）方程
过点 $M_0(x_0, y_0, z_0)$、方向向量为 $\boldsymbol{s} = (m, n, p)$ 的直线方程为
$$\dfrac{x - x_0}{m} = \dfrac{y - y_0}{n} = \dfrac{z - z_0}{p}$$

* **依据**：点 $M$ 在直线上 $\iff \overrightarrow{M_0M} \parallel \boldsymbol{s} \iff$ 坐标成比例；
* **分母为零（边界）**：理解为对应的分子也为零；如 $m = 0$ 时，直线为 $x = x_0$ 且 $\dfrac{y - y_0}{n} = \dfrac{z - z_0}{p}$。

#### 2. 参数式方程
令对称式的比值为 $t$：
$\begin{cases} x = x_0 + mt \\ y = y_0 + nt \\ z = z_0 + pt \end{cases}$

* **用处**：求直线与平面的交点时，代入平面方程，解出 $t$。

#### 3. 一般式方程
两个不平行平面的交线：
$$\begin{cases} A_1x + B_1y + C_1z + D_1 = 0 \\ A_2x + B_2y + C_2z + D_2 = 0 \end{cases}$$

#### 4. 一般式化为对称式
1. **方向向量**：$\boldsymbol{s} = \boldsymbol{n}_1 \times \boldsymbol{n}_2$，其中 $\boldsymbol{n}_1 = (A_1, B_1, C_1)$，$\boldsymbol{n}_2 = (A_2, B_2, C_2)$；
2. **一个点**：给某个变量取定一个值（如 $z = 0$），解出另外两个；解不出时换一个变量；
3. **写方程**：代入对称式。

* **依据**：直线同时在两个平面内，所以 $\boldsymbol{s}$ 同时垂直于 $\boldsymbol{n}_1$ 和 $\boldsymbol{n}_2$。

**平面束**

#### 1. 平面束方程
设直线 $L$ 是两个不平行平面 $\pi_1: A_1x + B_1y + C_1z + D_1 = 0$ 与 $\pi_2: A_2x + B_2y + C_2z + D_2 = 0$ 的交线，则
$$\begin{aligned} & (A_1x + B_1y + C_1z + D_1) \\ & + \lambda(A_2x + B_2y + C_2z + D_2) = 0 \end{aligned}$$

表示过 $L$ 的所有平面，只缺 $\pi_2$ 本身。简记为 $\pi_1 + \lambda\pi_2 = 0$，$\pi_i$ 指平面方程的左边。
* **依据**：$L$ 上的点使两个括号都为 $0$，所以都满足方程；$\boldsymbol{n}_1$ 与 $\boldsymbol{n}_2$ 不平行，$\boldsymbol{n}_1 + \lambda\boldsymbol{n}_2 \neq \boldsymbol{0}$，方程确实是平面；
* **用法**：再给一个条件（过某点、与某平面垂直或平行），定出 $\lambda$；
* **漏掉 $\pi_2$（边界）**：定不出 $\lambda$ 时，检查 $\pi_2$ 本身是否满足条件。

**④ 两个图形摆在一起**

**位置关系**

#### 1. 两平面
设两平面的法向量为 $\boldsymbol{n}_1, \boldsymbol{n}_2$：
* **垂直**：$\boldsymbol{n}_1 \cdot \boldsymbol{n}_2 = 0$；
* **平行或重合**：$\boldsymbol{n}_1 \parallel \boldsymbol{n}_2$，即 $A, B, C$ 对应成比例；连 $D$ 也成比例时重合，否则平行；
* **相交**：$\boldsymbol{n}_1$ 与 $\boldsymbol{n}_2$ 不平行。

#### 2. 两直线
设两直线分别过点 $M_1, M_2$，方向向量为 $\boldsymbol{s}_1, \boldsymbol{s}_2$：
* **垂直**：$\boldsymbol{s}_1 \cdot \boldsymbol{s}_2 = 0$（可能相交，也可能异面）；
* **平行或重合**：$\boldsymbol{s}_1 \parallel \boldsymbol{s}_2$；$M_1$ 在第二条直线上时重合，否则平行；
* **共面与异面**：两直线共面 $\iff [\overrightarrow{M_1M_2}\ \boldsymbol{s}_1\ \boldsymbol{s}_2] = 0$；共面且不平行时相交；混合积不为 $0$ 时异面。

#### 3. 直线与平面
设直线过点 $M_0$，方向向量为 $\boldsymbol{s}$，平面法向量为 $\boldsymbol{n}$：
* **线垂直于面**：$\boldsymbol{s} \parallel \boldsymbol{n}$；
* **线平行于面或在面内**：$\boldsymbol{s} \perp \boldsymbol{n}$，即 $\boldsymbol{s} \cdot \boldsymbol{n} = 0$；$M_0$ 满足平面方程时直线在面内，否则平行；
* **相交**：$\boldsymbol{s} \cdot \boldsymbol{n} \neq 0$；交点：把参数式代入平面方程，解出 $t$。
* **线面要翻译（边界）**：线 $\perp$ 面对应的是向量平行，线 $\parallel$ 面对应的是向量垂直，与面面、线线正好相反。

**夹角**

#### 1. 两平面、两直线
* **两平面**：$\cos\theta = \dfrac{|\boldsymbol{n}_1 \cdot \boldsymbol{n}_2|}{|\boldsymbol{n}_1||\boldsymbol{n}_2|}$；
* **两直线**：$\cos\varphi = \dfrac{|\boldsymbol{s}_1 \cdot \boldsymbol{s}_2|}{|\boldsymbol{s}_1||\boldsymbol{s}_2|}$；
* **取绝对值**：夹角规定不超过 $\dfrac{\pi}{2}$，余弦不能为负。

#### 2. 直线与平面
$$\sin\varphi = \dfrac{|\boldsymbol{s} \cdot \boldsymbol{n}|}{|\boldsymbol{s}||\boldsymbol{n}|}$$

* **依据**：$\varphi$ 与 $\boldsymbol{s}, \boldsymbol{n}$ 所夹的锐角互余，所以余弦换成正弦。

**距离**

#### 1. 点到平面：投影长
点 $M_0(x_0, y_0, z_0)$ 到平面 $Ax + By + Cz + D = 0$ 的距离：
$$d = \dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}$$

* **依据**：在平面上任取一点 $M_1$，$d$ 是 $\overrightarrow{M_1M_0}$ 在 $\boldsymbol{n}$ 上投影的绝对值：$d = \dfrac{|\overrightarrow{M_1M_0} \cdot \boldsymbol{n}|}{|\boldsymbol{n}|}$；展开时用 $Ax_1 + By_1 + Cz_1 = -D$。
* **两平行平面**：$Ax + By + Cz + D_1 = 0$ 与 $Ax + By + Cz + D_2 = 0$ 的距离为 $\dfrac{|D_1 - D_2|}{\sqrt{A^2 + B^2 + C^2}}$；两个方程的 $A, B, C$ 要先化成相同。

#### 2. 点到直线：面积除以底
设直线过点 $M_1$、方向向量为 $\boldsymbol{s}$，则点 $M_0$ 到直线的距离：
$$d = \dfrac{|\overrightarrow{M_1M_0} \times \boldsymbol{s}|}{|\boldsymbol{s}|}$$

* **依据**：以 $\overrightarrow{M_1M_0}$、$\boldsymbol{s}$ 为邻边的平行四边形，面积是 $|\overrightarrow{M_1M_0} \times \boldsymbol{s}|$，底是 $|\boldsymbol{s}|$，高就是 $d$。

#### 3. 两异面直线：体积除以底面积
设两直线分别过点 $M_1, M_2$，方向向量为 $\boldsymbol{s}_1, \boldsymbol{s}_2$：
$$d = \dfrac{|[\overrightarrow{M_1M_2}\ \boldsymbol{s}_1\ \boldsymbol{s}_2]|}{|\boldsymbol{s}_1 \times \boldsymbol{s}_2|}$$

* **依据**：以 $\overrightarrow{M_1M_2}, \boldsymbol{s}_1, \boldsymbol{s}_2$ 为棱的平行六面体，体积除以底面积 $|\boldsymbol{s}_1 \times \boldsymbol{s}_2|$ 得高；高的方向 $\boldsymbol{s}_1 \times \boldsymbol{s}_2$ 同时垂直于两直线，就是公垂线的方向。
* **直线与平行于它的平面**：距离等于直线上任一点到平面的距离。

**常见操作**

#### 1. 垂足与对称点
* **点到平面的垂足**：过 $M_0$ 作直线 $x = x_0 + At$，$y = y_0 + Bt$，$z = z_0 + Ct$（方向为 $\boldsymbol{n}$），代入平面方程，得
  $$t_0 = -\dfrac{Ax_0 + By_0 + Cz_0 + D}{A^2 + B^2 + C^2}$$
  $t = t_0$ 对应的点就是垂足 $N$；
* **关于平面的对称点**：$t = 2t_0$ 对应的点，即从 $M_0$ 出发，沿垂线走到 $N$ 的两倍远；
* **点到直线的垂足**：过 $M_0$ 作垂直于直线的平面 $\boldsymbol{s} \cdot \overrightarrow{M_0M} = 0$，它与直线的交点就是垂足；连接 $M_0$ 与垂足，得过 $M_0$ 且与直线垂直相交的直线。

#### 2. 直线在平面上的投影直线
设 $L$ 是 $\pi_1 = 0$ 与 $\pi_2 = 0$ 的交线，要求它在平面 $\pi$ 上的投影直线：
1. **投影平面**：在平面束 $\pi_1 + \lambda\pi_2 = 0$ 中，由法向量与 $\pi$ 的法向量垂直，定出 $\lambda$；
2. **联立**：投影平面的方程与 $\pi$ 的方程联立，就是投影直线。

* **$L$ 给的是对称式**：投影平面的法向量取 $\boldsymbol{s} \times \boldsymbol{n}$，再过 $L$ 上一点用点法式。

**⑤ 曲面长什么样**

**柱面**

#### 1. 缺一个变量的方程
在空间中，只含 $x, y$ 的方程 $F(x, y) = 0$ 表示母线平行于 $z$ 轴的柱面，准线是 $xOy$ 面上的曲线 $F(x, y) = 0$。缺 $x$、缺 $y$ 同理。
* **依据**：$z$ 不出现在方程里，点上下移动不影响方程是否成立；准线上一点所在的竖直直线，整条都在曲面上。
* **常见柱面（查表）**：圆柱面 $x^2 + y^2 = R^2$，椭圆柱面 $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$，双曲柱面 $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$，抛物柱面 $x^2 = 2py$。
* **平面里和空间里（边界）**：同一个方程，在平面上和空间里表示的东西不同：$x^2 + y^2 = 1$ 在 $xOy$ 平面上是圆，在空间里是圆柱面；空间里的这个圆要写成 $\begin{cases} x^2 + y^2 = 1 \\ z = 0 \end{cases}$。

**旋转曲面**

#### 1. 规则：高度不变，到轴的距离不变
绕 $z$ 轴旋转一周时，曲线上每一点的高度 $z$ 不变，到 $z$ 轴的距离 $\sqrt{x^2 + y^2}$ 不变；绕其他轴同理。下面两条都由这一条推出。

#### 2. 平面曲线绕坐标轴
设 $yOz$ 面上的曲线 $C: f(y, z) = 0$：
* **绕 $z$ 轴**：$f\left(\pm\sqrt{x^2 + y^2},\ z\right) = 0$；
* **绕 $y$ 轴**：$f\left(y,\ \pm\sqrt{x^2 + z^2}\right) = 0$；
* **记法**：绕哪个轴，那个坐标不动；另一个坐标换成「到该轴的距离」的 $\pm$。其他坐标面上的曲线同理。
* **依据**：$C$ 上的点 $(0, y_1, z_1)$ 绕 $z$ 轴转到 $(x, y, z)$ 时，$z = z_1$，$\sqrt{x^2 + y^2} = |y_1|$，代入 $f(y_1, z_1) = 0$。

#### 3. 空间曲线绕坐标轴
设曲线 $x = x(t)$，$y = y(t)$，$z = z(t)$ 绕 $z$ 轴旋转一周，所得曲面上的点满足
$$x^2 + y^2 = x^2(t) + y^2(t), \quad z = z(t)$$

消去 $t$，即得曲面方程。
* **常考直线**：如 $x = 1$，$y = t$，$z = t$ 绕 $z$ 轴，得 $x^2 + y^2 = 1 + z^2$（单叶双曲面）；
* **绕 $x$ 轴**：$x = x(t)$，$y^2 + z^2 = y^2(t) + z^2(t)$；绕 $y$ 轴同理。

**二次曲面（查表）**

#### 1. 常见二次曲面
* **球面**：$(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$；
* **椭球面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$；
* **椭圆锥面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = z^2$；
* **单叶双曲面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} - \dfrac{z^2}{c^2} = 1$；
* **双叶双曲面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} - \dfrac{z^2}{c^2} = -1$；
* **椭圆抛物面**：$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = z$；
* **双曲抛物面（马鞍面）**：$\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = z$。

#### 2. 第 6、7 章最常见的几张曲面
* **上半球面**：$z = \sqrt{R^2 - x^2 - y^2}$；
* **圆锥面（上半）**：$z = \sqrt{x^2 + y^2}$；
* **旋转抛物面**：$z = x^2 + y^2$；
* **圆柱面**：$x^2 + y^2 = R^2$，$x^2 + y^2 = 2Rx$（即 $(x - R)^2 + y^2 = R^2$）。

#### 3. 用截痕认形状
* **单叶与双叶**：用 $z = h$ 截：单叶双曲面对任意 $h$ 都截出椭圆，所以连成一片；双叶双曲面只在 $|h| \ge c$ 时有截痕，所以分成上下两叶；
* **马鞍面**：用 $z = h$ 截得双曲线；用 $x = 0$ 截得开口向下的抛物线 $z = -\dfrac{y^2}{b^2}$，用 $y = 0$ 截得开口向上的抛物线 $z = \dfrac{x^2}{a^2}$。

**⑥ 压到坐标面上**

**空间曲线**

#### 1. 两种方程互化
* **参数方程化为一般方程**：消去 $t$；
* **一般方程化为参数方程**：先求在坐标面上的投影曲线，给投影曲线取参数（如投影为 $x^2 + y^2 = R^2$，令 $x = R\cos t$，$y = R\sin t$），再由一个方程解出 $z$。

**曲线的投影**

#### 1. 投影柱面
从曲线 $C$ 的一般方程中消去 $z$，得 $H(x, y) = 0$，它是包含 $C$ 且母线平行于 $z$ 轴的柱面。
* **依据**：$C$ 上的点满足两个方程，所以满足由它们消去 $z$ 得到的 $H(x, y) = 0$；缺 $z$ 的方程表示母线平行于 $z$ 轴的柱面。

#### 2. 投影曲线
$C$ 在 $xOy$ 面上的投影曲线包含于
$$\begin{cases} H(x, y) = 0 \\ z = 0 \end{cases}$$

* **其他坐标面**：向 $yOz$ 面投影消去 $x$，向 $zOx$ 面投影消去 $y$；
* **范围（边界）**：消元时用过开方、或曲线本身有范围限制（如只取上半球面）时，$H(x, y) = 0$ 可能比真正的投影多出一段，要补上 $x, y$ 的范围。

**立体的投影区域**

#### 1. 求投影区域
1. **找边界曲线**：立体由上、下两张曲面围成时，求两曲面的交线；
2. **投影**：消去 $z$，得交线在 $xOy$ 面上的投影曲线；
3. **定区域**：投影曲线所围的平面区域就是 $D_{xy}$。

* **侧面是柱面**：立体的侧面是母线平行于 $z$ 轴的柱面时，柱面的准线就是 $D_{xy}$ 的边界；
* **轮廓线（边界）**：曲面在侧面「折回」时，边界来自轮廓线，不一定来自交线；如球体 $x^2 + y^2 + z^2 \le R^2$ 的投影区域是 $x^2 + y^2 \le R^2$，边界是 $z = 0$ 那一圈。

---

### 意义

本卡在做题时专门用于解决以下 15 类确定性目标，按站排列：

**① 空间里的长度和方向**

* **1. 由条件求向量**
  * **问题**：已知向量的模、方向角或与某些向量的关系，求这个向量；如求与三条坐标轴夹角都相等的单位向量。
  * **目标**：把条件写成坐标的方程。
  * **调用**：
    * 模：$|\boldsymbol{a}| = \sqrt{a_x^2 + a_y^2 + a_z^2}$；
    * 方向余弦：$\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$，单位向量 $\boldsymbol{e}_a = (\cos\alpha, \cos\beta, \cos\gamma)$；
    * 平行：$\boldsymbol{b} = \lambda\boldsymbol{a}$。
  * **行动**：
    1. 设出坐标 $(x, y, z)$，或由平行设成 $\lambda\boldsymbol{a}$；
    2. 每个条件写成一个方程；如三个夹角相等：$3\cos^2\alpha = 1$，$\cos\alpha = \pm\dfrac{1}{\sqrt{3}}$，所求单位向量为 $\pm\dfrac{1}{\sqrt{3}}(1, 1, 1)$；
    3. 开方得到 $\pm$ 两组时，看题目有没有限定方向（如与某轴成锐角）。

**② 向量的三种乘法**

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

**③ 平面和直线**

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

**④ 两个图形摆在一起**

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

**⑤ 曲面长什么样**

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

**⑥ 压到坐标面上**

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
