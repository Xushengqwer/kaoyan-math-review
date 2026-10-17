<!-- section:定义 -->

### 〔定义〕

<!-- station:① -->

**① 空间里的长度和方向**

<!-- card:tyal -->

#### 1. 向量与坐标

##### 向量：只认大小和方向，不认起点
* 🎯 **点是死位置，向量是活位移**
  * **为什么能平移**：向量只看往哪走、走多远 $\to$ 起点挪去哪，还是同一个向量。
  * **平移的作用**：所有向量都能统一把起点拎到原点去比、去算。

##### 向量的坐标：起点挪到原点，终点坐标即向量坐标
* 🎯 **拆成分向量，几何就变成代数**
  * **为什么拆成 $a_1\boldsymbol{i} + a_2\boldsymbol{j} + a_3\boldsymbol{k}$**：向量的加减和数乘，直接变成==合并同类项==。
  * **为什么是终点减起点**：从 $M_1$ 走到 $M_2$ 满足 $\overrightarrow{OM_1} + \overrightarrow{M_1M_2} = \overrightarrow{OM_2}$ $\to$ 移项即得 $\overrightarrow{OM_2} - \overrightarrow{OM_1}$。

<!-- card:it92 -->

#### 2. 方向怎么量：夹角、投影与方向角

##### 两向量的夹角：为什么规定零向量既平行又垂直
* 🎯 **为了后面的充要条件零例外**
  * **原因**：零向量长度为 $0$，没有方向，量不出夹角。
  * **作用**：硬规定它与任何向量==既平行又垂直== $\to$ 后面「点积为 $0 \iff$ 垂直」「叉积为 $\boldsymbol{0} \iff$ 平行」彻底等价，不用单独排除 $\boldsymbol{0}$。

##### 向量的投影：为什么坐标就是投影
* 🎯 **起点放原点，坐标就是三轴投影**
  * **怎么投**：从 $\boldsymbol{a}$ 两端往 $\boldsymbol{b}$ 所在直线作垂线，截出的有向长度 $|\boldsymbol{a}|\cos\theta$ 就是投影。
  * **为什么是 $a_1$**：终点 $(a_1, a_2, a_3)$ 往 $x$ 轴作垂线，垂足正是 $(a_1, 0, 0)$ $\to$ 在 $x$ 轴上的投影就是 $a_1$（$y, z$ 轴同理）。

##### 方向角与方向余弦：坐标 = 模 × 方向余弦
* 🔑 **核心关系**：$a_1 = |\boldsymbol{a}|\cos\alpha,\quad a_2 = |\boldsymbol{a}|\cos\beta,\quad a_3 = |\boldsymbol{a}|\cos\gamma$
  * **怎么推**：$\boldsymbol{a}$ 与三轴夹角是 $\alpha, \beta, \gamma$，在三轴上的投影又是 $a_1, a_2, a_3$ $\to$ 代入投影公式即得（==锐角、钝角都成立==）。
  * **结论**：三个坐标里，同时锁死了**大小**（模）和**方向**（方向余弦）。
  * 🚧 **本站边界**：一般两向量的夹角和投影，这里只有定义、没坐标公式 $\to$ 留给**第 ② 站数量积**。

<!-- station:② -->

**② 向量的三种乘法**

<!-- card:h1zn -->

#### 1. 数量积
* 🎯 **核心：用点积的符号直接读出两向量的夹角关系**
  * **正（$\boldsymbol{a} \cdot \boldsymbol{b} > 0$）**：$\cos\theta > 0$，夹角为**锐角或同向**（$0 \le \theta < \dfrac{\pi}{2}$）；
  * **零（$\boldsymbol{a} \cdot \boldsymbol{b} = 0$）**：$\cos\theta = 0$，两向量**垂直**（$\theta = \dfrac{\pi}{2}$）；
  * **负（$\boldsymbol{a} \cdot \boldsymbol{b} < 0$）**：$\cos\theta < 0$，夹角为**钝角或反向**（$\dfrac{\pi}{2} < \theta \le \pi$）。

<!-- card:fvp6 -->

#### 2. 向量积
* 🎯 **核心：叉乘得到一个同时垂直于两者的新向量**
  * **模长是面积**：$|\boldsymbol{a} \times \boldsymbol{b}|$ 是以 $\boldsymbol{a}, \boldsymbol{b}$ 为邻边的平行四边形面积；
  * **为什么是 $\sin\theta$**：平行四边形的底为 $|\boldsymbol{a}|$，高为 $|\boldsymbol{b}|\sin\theta$，底乘高即 $|\boldsymbol{a}||\boldsymbol{b}|\sin\theta$；
  * **顺序不能反**：方向由右手法则定，对调 $\boldsymbol{a}, \boldsymbol{b}$ 则四指转向相反，拇指指向完全相反（$\boldsymbol{b} \times \boldsymbol{a} = -\boldsymbol{a} \times \boldsymbol{b}$）。

<!-- card:r1ws -->

#### 3. 混合积
* 🎯 **核心：顺序锁死为「先叉乘、再点乘」，结果是底面积乘有向高**
  * **只叉乘一次**：先把前两个向量叉乘得向量 $\boldsymbol{a} \times \boldsymbol{b}$，再与第三个向量 $\boldsymbol{c}$ 点乘得数（不是两次叉乘）。
  * **为什么「法向量点乘第三个向量」就是体积**：
    1. $\boldsymbol{a} \times \boldsymbol{b}$ 的长度 $|\boldsymbol{a} \times \boldsymbol{b}|$ 是**底面积**，方向是**底面的法向**；
    2. $\boldsymbol{c}$ 在这个法向上的投影长，正好是平行六面体的**高**；
    3. 点积 $(\boldsymbol{a} \times \boldsymbol{b}) \cdot \boldsymbol{c} = |\boldsymbol{a} \times \boldsymbol{b}| \times (\boldsymbol{c} \text{ 在法向上的投影})$，绝对值就是**底面积 $\times$ 高**。

<!-- station:⑥ -->

**⑥ 压到坐标面上**

<!-- card:jvaz -->

#### 1. 空间曲线的方程：一个方程不够，要两个
* **为什么要两个**：空间里一个方程通常是一张曲面；两张曲面相交，才得到一条曲线。
* **例**：球面 $x^2 + y^2 + z^2 = 1$ 与平面 $z = 0$ 的交线，是 $xOy$ 面上的单位圆。
* **参数方程的例**：$x = \cos t$，$y = \sin t$，$z = t$：一边绕 $z$ 轴转圈，一边往上升，是螺旋线。

<!-- card:isl9 -->

#### 2. 投影柱面与投影曲线：曲线的影子
* **画面**：灯在正上方，曲线在地面上的影子就是投影曲线；曲线上每一点竖直往下画线，这些线组成投影柱面。
* **两者的区别**：投影柱面是空间里的一张曲面，方程只有一个 $H(x, y) = 0$；投影曲线是 $xOy$ 面上的一条曲线，要再加上 $z = 0$。

<!-- card:ycrn -->

#### 3. 立体的投影区域：立体的影子
* **例**：倒放的冰淇淋筒（下面是锥面、上面是球面），从正上方看是一个圆盘。
* **为什么要它**：第 6 章算三重积分，先对 $z$ 积分，剩下 $x, y$ 的范围就是 $D_{xy}$。

---

<!-- section:性质 -->

### 〔性质〕

<!-- station:① -->

**① 空间里的长度和方向**

<!-- card:tgkt -->

#### 1. 坐标运算与长度

##### 线性运算：合并同类项，各算各的分量
* 🎯 **把 $\boldsymbol{i}, \boldsymbol{j}, \boldsymbol{k}$ 当公因式合并**
  * **为什么能按坐标算**：把 $\boldsymbol{a}, \boldsymbol{b}$ 写成 $a_1\boldsymbol{i} + a_2\boldsymbol{j} + a_3\boldsymbol{k}$ 的形式 $\to$ 加减和数乘直接变成合并 $\boldsymbol{i}, \boldsymbol{j}, \boldsymbol{k}$ 前面的系数。

##### 模与两点间的距离：勾股定理用两次
* 🎯 **先算水平对角线，再算空间斜边**
  * **怎么推**：先在 $xOy$ 面内用勾股定理算出水平长 $\sqrt{a_1^2 + a_2^2}$ $\to$ 再与竖直高 $a_3$ 组成直角三角形，用第二次勾股定理得斜边 $|\boldsymbol{a}|$。
  * **两点距离**：就是向量 $\overrightarrow{M_1M_2}$（终点减起点）的模。
  * **模的局限**：三个数压成了一个数（如 $(1,2,3)$ 与 $(3,2,1)$ 模相同、方向不同）$\to$ ==模只给出大小，丢了方向==。

<!-- card:ty41 -->

#### 2. 方向与平行

##### 方向余弦与单位向量：除掉模，剩下的就是纯方向
* 🔑 **核心拆解**：$\boldsymbol{a} = (a_1, a_2, a_3) = |\boldsymbol{a}|(\cos\alpha, \cos\beta, \cos\gamma)$
  * **怎么剥出方向**：由〔定义〕知 $a_1 = |\boldsymbol{a}|\cos\alpha$，两边同除以 $|\boldsymbol{a}|$（$\boldsymbol{a} \ne \boldsymbol{0}$）$\to$ 抹掉长度，剩下的单位向量 $\boldsymbol{e}_a = (\cos\alpha, \cos\beta, \cos\gamma)$ 就是纯方向。
  * **为什么平方和为 $1$**：单位向量的模为 $1$，即 $|\boldsymbol{e}_a|^2 = \cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$ $\to$ **三个方向角不能随便给**，定下两个，第三个角的余弦绝对值就锁死了。

##### 两向量平行的条件：方向相同或相反，只差伸缩倍数
* 🎯 **纯方向相同或相反 $\iff$ 坐标成比例**
  * **为什么差一个 $\lambda$**：$\boldsymbol{a} \ne \boldsymbol{0}$ 时，$\boldsymbol{b} \parallel \boldsymbol{a}$ 说明两者只差长度倍数和正反号（$\lambda > 0$ 同向，$\lambda < 0$ 反向，$\lambda = 0$ 时 $\boldsymbol{b} = \boldsymbol{0}$）$\to$ 三个坐标同乘 $\lambda$，即对应成比例。
  * ⚠️ **为什么必须 $\boldsymbol{a} \ne \boldsymbol{0}$**：若 $\boldsymbol{a} = \boldsymbol{0}$ 而 $\boldsymbol{b} \ne \boldsymbol{0}$，两者虽平行，但无论 $\lambda$ 取多少都写不出 $\boldsymbol{b} = \lambda\boldsymbol{a}$。

<!-- station:② -->

**② 向量的三种乘法**

<!-- card:f54p -->

#### 1. 数量积（得一个数）

##### 坐标计算与运算律
* 🔑 **连接几何与代数**：$|\boldsymbol{a}||\boldsymbol{b}|\cos\theta = a_1b_1 + a_2b_2 + a_3b_3$
  * **意义**：左边是长度和夹角，右边是纯坐标运算；这一个等式把几何上的「角」变成了能从坐标直接算出来的数。

##### 垂直的判定
* 🎯 **点积为 $0 \iff$ 垂直**
  * $\boldsymbol{a} \cdot \boldsymbol{b} = a_1b_1 + a_2b_2 + a_3b_3 = 0$ 时两向量垂直，零向量也包含在内。

##### 夹角与投影
* 🎯 **把核心等式遮住一部分反推**
  * **算夹角 $\cos\theta$**：等式两边同除以 $|\boldsymbol{a}||\boldsymbol{b}|$（$\boldsymbol{a}, \boldsymbol{b}$ 都不是零向量），得 $\cos\theta = \dfrac{\boldsymbol{a} \cdot \boldsymbol{b}}{|\boldsymbol{a}||\boldsymbol{b}|}$；
  * **算投影 $|\boldsymbol{a}|\cos\theta$**：等式两边只除以 $|\boldsymbol{b}|$（$\boldsymbol{b} \neq \boldsymbol{0}$），得 $\operatorname{Prj}_{\boldsymbol{b}}\boldsymbol{a} = \dfrac{\boldsymbol{a} \cdot \boldsymbol{b}}{|\boldsymbol{b}|}$。

<!-- card:urmg -->

#### 2. 向量积（得一个向量）

##### 坐标计算与运算律
* 🎯 **行列式展开与垂直验算**
  * **算例**：$(1, 2, 3) \times (4, 5, 6)$ 按第一行展开，中间 $\boldsymbol{j}$ 那一项前面带负号：
    $$\begin{aligned} &\begin{vmatrix} \boldsymbol{i} & \boldsymbol{j} & \boldsymbol{k} \\ 1 & 2 & 3 \\ 4 & 5 & 6 \end{vmatrix} \\ =\ &\boldsymbol{i}\begin{vmatrix} 2 & 3 \\ 5 & 6 \end{vmatrix} - \boldsymbol{j}\begin{vmatrix} 1 & 3 \\ 4 & 6 \end{vmatrix} + \boldsymbol{k}\begin{vmatrix} 1 & 2 \\ 4 & 5 \end{vmatrix} \\ =\ &-3\boldsymbol{i} + 6\boldsymbol{j} - 3\boldsymbol{k} = (-3, 6, -3) \end{aligned}$$
  * **验算**：结果与两个原向量点乘都为 $0$：$(-3, 6, -3) \cdot (1, 2, 3) = -3 + 12 - 9 = 0$，$(-3, 6, -3) \cdot (4, 5, 6) = -12 + 30 - 18 = 0$。

##### 平行的判定
* 🎯 **平行四边形压成一条线，面积为 0**
  * $|\boldsymbol{a} \times \boldsymbol{b}| = |\boldsymbol{a}||\boldsymbol{b}|\sin\theta = 0 \iff \sin\theta = 0 \iff \theta = 0 \text{ 或 } \pi$，即两向量平行（对应坐标成比例）。

##### 面积计算
* 🎯 **先叉乘算出向量，再求模长**
  * $\boldsymbol{a} \times \boldsymbol{b}$ 算出来是向量，取模 $|\boldsymbol{a} \times \boldsymbol{b}|$ 才是平行四边形面积；三角形面积取一半：$S_{\triangle ABC} = \dfrac{1}{2}|\overrightarrow{AB} \times \overrightarrow{AC}|$。

<!-- card:pn0n -->

#### 3. 混合积（得一个数）

##### 坐标计算与轮换对称
* 🎯 **行列式就是撑起来的体积，顺序只管正负号**
  * **为什么是行列式**：行列式的绝对值，就是它的行向量撑起来的空间的大小——二阶是平行四边形面积，三阶就是平行六面体体积。混合积算的正是 $\boldsymbol{a}, \boldsymbol{b}, \boldsymbol{c}$ 撑起来的体积，所以写成三阶行列式。
  * **为什么对换变号**：
    * **先看混合积是什么**：先叉乘、后点乘。叉乘得法向量 $\boldsymbol{a} \times \boldsymbol{b}$，模长是底面积；再点乘 $\boldsymbol{c}$，就是底面积乘 $\boldsymbol{c}$ 在法向上的投影（高，带正负），得平行六面体的体积。
    * **交换前两个**：叉乘反交换，法向量掉头，高变号，混合积变号。
    * **交换的两个里有 $\boldsymbol{c}$**（如 $\boldsymbol{a}, \boldsymbol{c}$ 互换）：不是叉乘内部的交换，看行列式——交换两行，行列式变号。
  * **为什么轮换不变**：
    * **绝对值**：还是同一个平行六面体，只是翻了个身，体积不变。
    * **正负号**：一次轮换等于两次对换（$\boldsymbol{a}\,\boldsymbol{b}\,\boldsymbol{c} \to \boldsymbol{b}\,\boldsymbol{a}\,\boldsymbol{c} \to \boldsymbol{b}\,\boldsymbol{c}\,\boldsymbol{a}$），变号两次又变回来。
  * **任选两个先叉乘都行**：$(\boldsymbol{a} \times \boldsymbol{b}) \cdot \boldsymbol{c} = (\boldsymbol{b} \times \boldsymbol{c}) \cdot \boldsymbol{a} = (\boldsymbol{c} \times \boldsymbol{a}) \cdot \boldsymbol{b}$，反序只差一个负号，**求体积、判共面不受影响**。

##### 共面的判定
* 🎯 **体积为 0，就是平行六面体被压扁了**
  * 三个向量躺在同一个平面里，高为 $0 \iff$ 体积 $|[\boldsymbol{a}\ \boldsymbol{b}\ \boldsymbol{c}]| = 0 \iff$ 三阶行列式为 $0$。
  * **四点共面**：$A, B, C, D$ 共面 $\iff$ 从 $A$ 出发的三条边向量共面 $\iff [\overrightarrow{AB}\ \overrightarrow{AC}\ \overrightarrow{AD}] = 0$。

##### 体积计算
* 🎯 **平行六面体取绝对值，四面体乘 1/6**
  * 四面体体积是同底同高三棱柱的 $\dfrac{1}{3}$，三棱柱又是平行六面体的一半，故乘 $\dfrac{1}{6}$：$V_{ABCD} = \dfrac{1}{6}\left|[\overrightarrow{AB}\ \overrightarrow{AC}\ \overrightarrow{AD}]\right|$。

<!-- station:③ -->

**③ 平面和直线**

<!-- card:drzj -->

#### 1. 直线：一个点 + 方向向量
* 🔑 **点 $M_0$ + 方向 $\boldsymbol{s}$ → 对称式**：$\overrightarrow{M_0M} \parallel \boldsymbol{s}$，坐标成比例。

| 题目给了 / 要做 | 怎么办 |
| :--- | :--- |
| 一个点 + 方向（或两点） | 写**对称式**；给两点就取 $\boldsymbol{s} = \overrightarrow{M_1M_2}$ |
| 求直线与平面的交点 | 比值记作 $t$，写成**参数式**，代入平面方程解出 $t$ |

* ⚠️ **分母为 $0$**：如 $m = 0$，读成 $x = x_0$，另外两项照样成比例。

<!-- card:oyub -->

#### 2. 平面：一个点 + 法向量
* 🔑 **点 $M_0$ + 法向量 $\boldsymbol{n}$ → 点法式**：$\overrightarrow{M_0M} \perp \boldsymbol{n}$，点积为 $0$。

| 题目给了 | 怎么办 |
| :--- | :--- |
| 一个点 + 法向量 | 写**点法式** |
| 一般式 | 法向量就是系数 $(A, B, C)$ |
| 三个非零截距 | 写**截距式** |
| 不共线三点 $M_1, M_2, M_3$ | $\boldsymbol{n} = \overrightarrow{M_1M_2} \times \overrightarrow{M_1M_3}$，再写**点法式** |
| 过某条已知直线 | 用第 3 张的**平面束** |

* 💡 **一般式一眼看位置**：$D = 0$ 过原点；缺哪个变量就平行于哪个轴（再加 $D = 0$ 就包含该轴）；缺两个变量平行于坐标面（如 $Cz + D = 0$ 平行于 $xOy$ 面）。

<!-- card:see6 -->

#### 3. 两平面相交：交线与平面束
* 🔑 **两个平面方程联立 = 一条直线；加权相加 = 过这条直线的所有平面。**

| 要做什么 | 怎么办 |
| :--- | :--- |
| 交线化成对称式 | 方向 $\boldsymbol{s} = \boldsymbol{n}_1 \times \boldsymbol{n}_2$；令 $z = 0$ 解出一个点（解不出说明直线平行于 $xOy$ 面，换一个变量） |
| 求过交线、满足某条件的平面 | 设平面束，代入条件解出 $\lambda$ |

* ⚠️ **平面束漏掉 $\pi_2$**：解不出 $\lambda$ 时，检查 $\pi_2 = 0$：它满足条件，答案就是它。

<!-- station:④ -->

**④ 两个图形摆在一起**

<!-- card:f6no -->

#### 1. 位置关系：先比向量，再看点
* 🔑 **先比两个向量定方向 → 方向分不清的，再取一个点。**

| 分不清的 | 怎么办 |
| :--- | :--- |
| 平行还是重合（线平行于面还是在面内） | 取一个图形上的一点，代入另一个的方程：满足就是重合（在面内） |
| 两直线方向不平行：相交还是异面 | 算混合积 $[\overrightarrow{M_1M_2}\ \boldsymbol{s}_1\ \boldsymbol{s}_2]$：为 $0$ 相交，不为 $0$ 异面 |

* ⚠️ **线面要反过来**：线 $\perp$ 面 $\iff \boldsymbol{s} \parallel \boldsymbol{n}$；线 $\parallel$ 面 $\iff \boldsymbol{s} \perp \boldsymbol{n}$，和面面、线线正好相反。
* ⚠️ **线线垂直不一定相交**：$\boldsymbol{s}_1 \cdot \boldsymbol{s}_2 = 0$ 只说明方向垂直，两直线可能异面垂直。

<!-- card:nnk8 -->

#### 2. 夹角：一律取 $\left[0, \dfrac{\pi}{2}\right]$
* 🔑 **面面：锁定 $\boldsymbol{n}_1, \boldsymbol{n}_2$ → 点积 → $\cos\theta$**
* 🔑 **线线：锁定 $\boldsymbol{s}_1, \boldsymbol{s}_2$ → 点积 → $\cos\varphi$**
* 🔑 **线面：锁定 $\boldsymbol{s}, \boldsymbol{n}$ → 点积 → $\sin\varphi$**（$\varphi$ 与 $\boldsymbol{s}, \boldsymbol{n}$ 的夹角互余，余弦换正弦）
* ⚠️ **分子都加绝对值**：夹角不超过 $\dfrac{\pi}{2}$，余弦、正弦都不能为负。

<!-- card:lxxr -->

#### 3. 距离：连一条斜线，剥出高
* 🔑 **两个图形上各取一点连成斜线，用三种乘法把高剥出来。**

| 距离 | 怎么剥出高 |
| :--- | :--- |
| 点到平面 | 斜线在 $\boldsymbol{n}$ 上的投影长（点积）：$\dfrac{|\overrightarrow{M_1M_0} \cdot \boldsymbol{n}|}{|\boldsymbol{n}|}$ |
| 点到直线 | 平行四边形面积 ÷ 底（叉积） |
| 两异面直线 | 平行六面体体积 ÷ 底面积（混合积）；公垂线方向是 $\boldsymbol{s}_1 \times \boldsymbol{s}_2$ |

* 💡 **转成点到…**：直线与平行于它的平面 → 线上取一点到平面；两平行直线 → 一条线上取一点到另一条线（平行时 $\boldsymbol{s}_1 \times \boldsymbol{s}_2 = \boldsymbol{0}$，异面公式不能用）。
* ⚠️ **两平行平面**：用 $\dfrac{|D_1 - D_2|}{\sqrt{A^2 + B^2 + C^2}}$ 前，两个方程的 $A, B, C$ 必须先化成完全相同。

<!-- station:⑤ -->

**⑤ 曲面长什么样**

<!-- card:h9xu -->

#### 1. 柱面
* 🔑 **缺哪个变量 → 点沿该方向随便移动不影响方程 → 母线平行于哪个轴的柱面**

| 看到什么 | 是什么 / 怎么看 |
| :--- | :--- |
| $F(x, y) = 0$（缺 $z$） | 母线 $\parallel z$ 轴，准线是 $xOy$ 面上的曲线 $F(x, y) = 0$ |
| $F(y, z) = 0$（缺 $x$） | 母线 $\parallel x$ 轴，准线是 $yOz$ 面上的曲线 $F(y, z) = 0$ |
| $F(x, z) = 0$（缺 $y$） | 母线 $\parallel y$ 轴，准线是 $zOx$ 面上的曲线 $F(x, z) = 0$ |

![柱面：准线与母线](assets/images/surfaces/cylinder-generic.svg)

* ⚠️ **平面里和空间里（边界）**：$x^2 + y^2 = 1$ 在二维 $xOy$ 平面上是圆，在三维空间里（缺 $z$）是**圆柱面**；空间里的这个圆必须写成 $\begin{cases} x^2 + y^2 = 1 \\ z = 0 \end{cases}$。

![圆柱面](assets/images/surfaces/cylinder-circular.svg)

<!-- card:b0jw -->

#### 2. 旋转曲面
* 🔑 **绕轴转动 → 每个点的高度不变、到旋转轴的距离不变 → 同一高度上的截面是以轴为圆心的圆（可能不止一个）**

| 看到 / 要写什么 | 怎么写 / 是什么 |
| :--- | :--- |
| 坐标面曲线绕坐标轴（如 $f(y, z) = 0$ 绕 $z$ 轴） | **绕哪个轴，那个坐标不动**（$z$ 不动）；另一个坐标换成「到该轴距离的 $\pm$」（$y \to \pm\sqrt{x^2 + y^2}$） |
| 空间曲线 $(x(t), y(t), z(t))$ 绕 $z$ 轴 | 不在坐标面内，直接列 $z = z(t)$ 与 $x^2 + y^2 = x^2(t) + y^2(t)$，消去 $t$ |
| 方程里 $x, y$ 只以 $x^2 + y^2$ 整体出现 | 绕 $z$ 轴的旋转曲面（含 $y^2 + z^2$ 是绕 $x$ 轴，含 $x^2 + z^2$ 是绕 $y$ 轴） |
| 空间直线绕旋转轴转一周 | 直线与轴**平行** $\to$ 圆柱面；与轴**相交** $\to$ 圆锥面；与轴**异面** $\to$ 单叶双曲面 |

![直线与轴平行：圆柱面](assets/images/surfaces/line-parallel-cylinder.svg)

![直线与轴相交：圆锥面](assets/images/surfaces/line-intersect-cone.svg)

* ⚠️ **为什么带 $\pm$**：距离 $\sqrt{x^2 + y^2} \ge 0$，而原曲线上的 $y$ 可正可负（平方后 $\pm$ 自动合并）。

<!-- card:n3yr -->

#### 3. 二次曲面
* 🔑 **化标准形 → 看平方项个数（3 个 vs 2 个加 1 个一次项）→ 看正负号 → 看右边常数（1, −1, 0）**

| 平方项与一次项 | 平方项符号与右边 | 是什么 / 截痕特征 |
| :--- | :--- | :--- |
| 3 个平方项（无一次项） | 三正，右边 $= 1$ | **椭球面**（三半轴相等即**球面**） |
| 3 个平方项（无一次项） | 两正一负，右边 $= 1$ | **单叶双曲面**（任意 $z = h$ 都截出椭圆，连成一片） |
| 3 个平方项（无一次项） | 两正一负，右边 $= -1$ | **双叶双曲面**（仅 $|h| \ge c$ 有椭圆截痕，分成上下两叶） |
| 3 个平方项（无一次项） | 两正一负，右边 $= 0$ | **椭圆锥面**（$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = z^2$，顶点在原点） |
| 3 个平方项（无一次项） | **一正两负** | 方程两边**同乘 $-1$**，化成「两正一负」再查上三行 |
| 2 个平方项 + 1 个一次项 $z$ | 两平方项**同号** | **椭圆抛物面**（碗状，$z = x^2 + y^2$ 为旋转抛物面） |
| 2 个平方项 + 1 个一次项 $z$ | 两平方项**异号** | **双曲抛物面（马鞍面）**（$z = h$ 截得双曲线，$x = 0$ 与 $y = 0$ 截得反向抛物线） |

![旋转抛物面](assets/images/surfaces/paraboloid-of-revolution.svg)

![马鞍面](assets/images/surfaces/saddle.svg)

* ⚠️ **开根号只取一半（边界）**：$z = \sqrt{R^2 - x^2 - y^2}$ 和 $z = \sqrt{x^2 + y^2}$ 默认 $z \ge 0$，分别只表示**上半**球面和**上半**圆锥面；$x^2 + y^2 = 2Rx$ 配方为 $(x - R)^2 + y^2 = R^2$，是过 $z$ 轴的偏心圆柱面。

![上半球面](assets/images/surfaces/upper-hemisphere.svg)

![上半圆锥面](assets/images/surfaces/upper-cone.svg)

![偏心圆柱面](assets/images/surfaces/cylinder-offset.svg)

<!-- station:⑥ -->

**⑥ 压到坐标面上**

<!-- group:zelf -->

**空间曲线**

<!-- card:lpua -->

#### 1. 两种方程互化
* **参数化为一般**：螺旋线 $x = \cos t$，$y = \sin t$，$z = t$，消去 $t$：$x = \cos z$，$y = \sin z$。
* **一般化为参数**：$\begin{cases} x^2 + y^2 + z^2 = 4 \\ z = 1 \end{cases}$：投影是 $x^2 + y^2 = 3$，取 $x = \sqrt{3}\cos t$，$y = \sqrt{3}\sin t$，$z = 1$。

<!-- group:vq3j -->

**曲线的投影**

<!-- card:wago -->

#### 1. 投影柱面
* **例**：$\begin{cases} x^2 + y^2 + z^2 = 2 \\ z = x^2 + y^2 \end{cases}$：把 $x^2 + y^2$ 换成 $z$，得 $z + z^2 = 2$，$z = 1$（$z = -2$ 舍去，因为 $z = x^2 + y^2 \ge 0$）；再代回，$x^2 + y^2 = 1$。
* **消元的顺序可以灵活**：这里先求出 $z$，比直接消去 $z$ 更快；目的是得到一个不含 $z$ 的方程。

<!-- card:go36 -->

#### 2. 投影曲线
* **例**：上面曲线的投影曲线是 $\begin{cases} x^2 + y^2 = 1 \\ z = 0 \end{cases}$。
* **范围的例**：$\begin{cases} x^2 + y^2 + z^2 = 1 \\ x = z^2 \end{cases}$ 消去 $z$，得 $x^2 + x + y^2 = 1$；但 $x = z^2 \ge 0$，投影只是这个圆在 $x \ge 0$ 的那一段。

<!-- group:ep9o -->

**立体的投影区域**

<!-- card:bgto -->

#### 1. 求投影区域
* **交线的例**：$z = x^2 + y^2$ 与 $z = 2 - x^2 - y^2$ 围成的立体：交线处 $x^2 + y^2 = 2 - x^2 - y^2$，即 $x^2 + y^2 = 1$，$D_{xy}: x^2 + y^2 \le 1$。
* **柱面的例**：圆柱 $x^2 + y^2 \le 1$ 被 $z = 0$ 与 $z = 2 - x$ 截下的部分：侧面是柱面，$D_{xy}$ 就是 $x^2 + y^2 \le 1$。
* **轮廓线的例**：球体 $x^2 + y^2 + z^2 \le R^2$ 只有一张曲面，没有交线；从上往下看，最外圈是赤道 $z = 0$ 那一圈，$D_{xy}: x^2 + y^2 \le R^2$。

---

<!-- section:例题 -->

### 〔例题〕



#### 例题 1：从坐标读出长度和方向

**题目**：设 $A(1, 2, 0)$，$B(2, 3, \sqrt{2})$。
1. 求 $\overrightarrow{AB}$ 的模、方向余弦和方向角；
2. 求与 $\overrightarrow{AB}$ 同方向、长度为 $6$ 的向量；
3. 向量 $\boldsymbol{c}$ 与 $x$ 轴、$y$ 轴的夹角都是 $\dfrac{\pi}{3}$，且 $|\boldsymbol{c}| = 2$，求 $\boldsymbol{c}$。
##### 【小题 1】终点减起点，再除以模
* $\overrightarrow{AB} = (1, 1, \sqrt{2})$，$|\overrightarrow{AB}| = \sqrt{1 + 1 + 2} = 2$；
* $\cos\alpha = \dfrac{1}{2}$，$\cos\beta = \dfrac{1}{2}$，$\cos\gamma = \dfrac{\sqrt{2}}{2}$；
* $\alpha = \beta = \dfrac{\pi}{3}$，$\gamma = \dfrac{\pi}{4}$。
* **细节**：验算平方和：$\dfrac{1}{4} + \dfrac{1}{4} + \dfrac{1}{2} = 1$。
##### 【小题 2】单位向量乘长度
* 单位向量 $\boldsymbol{e} = \left(\dfrac{1}{2}, \dfrac{1}{2}, \dfrac{\sqrt{2}}{2}\right)$；
* 所求向量 $6\boldsymbol{e} = (3, 3, 3\sqrt{2})$。
* **细节**：「同方向」取 $+6\boldsymbol{e}$；「平行」则 $\pm 6\boldsymbol{e}$ 都算。
##### 【小题 3】第三个方向角由平方和定
* $\cos^2\gamma = 1 - \dfrac{1}{4} - \dfrac{1}{4} = \dfrac{1}{2}$，$\cos\gamma = \pm\dfrac{\sqrt{2}}{2}$；
* $\boldsymbol{c} = 2(\cos\alpha, \cos\beta, \cos\gamma) = (1, 1, \pm\sqrt{2})$。
* **若题目要求 $\boldsymbol{c}$ 与 $z$ 轴成锐角**：取 $\boldsymbol{c} = (1, 1, \sqrt{2})$。
* **细节**：开方出现 $\pm$，两个都是答案，除非题目限定了方向。

---



#### 例题 2：没有坐标，只有长度和夹角

**题目**：设 $|\boldsymbol{a}| = 2$，$|\boldsymbol{b}| = 1$，$\boldsymbol{a}$ 与 $\boldsymbol{b}$ 的夹角为 $\dfrac{\pi}{3}$。
1. 求 $|\boldsymbol{a} - 2\boldsymbol{b}|$；
2. 求 $\boldsymbol{a} + \boldsymbol{b}$ 与 $\boldsymbol{a} - \boldsymbol{b}$ 夹角的余弦；
3. 求以 $\boldsymbol{a} + \boldsymbol{b}$、$\boldsymbol{a} - \boldsymbol{b}$ 为邻边的平行四边形的面积；
4. $\lambda$ 为何值时，$\lambda\boldsymbol{a} + \boldsymbol{b}$ 与 $\boldsymbol{b}$ 垂直。
##### 【小题 1】模先平方
* 先算 $\boldsymbol{a} \cdot \boldsymbol{b} = 2 \cdot 1 \cdot \cos\dfrac{\pi}{3} = 1$；
* $|\boldsymbol{a} - 2\boldsymbol{b}|^2 = |\boldsymbol{a}|^2 - 4\boldsymbol{a} \cdot \boldsymbol{b} + 4|\boldsymbol{b}|^2 = 4 - 4 + 4 = 4$；
* $|\boldsymbol{a} - 2\boldsymbol{b}| = 2$。
* **细节**：没有坐标时，模只能平方后用点积展开；$\boldsymbol{a} \cdot \boldsymbol{b}$ 先算出来，后面几题都要用。
##### 【小题 2】夹角：分子分母分别算
* 分子：$(\boldsymbol{a} + \boldsymbol{b}) \cdot (\boldsymbol{a} - \boldsymbol{b}) = |\boldsymbol{a}|^2 - |\boldsymbol{b}|^2 = 3$；
* 分母：$|\boldsymbol{a} + \boldsymbol{b}|^2 = 4 + 2 + 1 = 7$，$|\boldsymbol{a} - \boldsymbol{b}|^2 = 4 - 2 + 1 = 3$；
* $\cos\theta = \dfrac{3}{\sqrt{7} \cdot \sqrt{3}} = \dfrac{\sqrt{21}}{7}$。
* **细节**：$(\boldsymbol{a} + \boldsymbol{b}) \cdot (\boldsymbol{a} - \boldsymbol{b})$ 展开时，$-\boldsymbol{a} \cdot \boldsymbol{b}$ 与 $\boldsymbol{b} \cdot \boldsymbol{a}$ 抵消，因为点积可以交换。
##### 【小题 3】叉积展开
* $(\boldsymbol{a} + \boldsymbol{b}) \times (\boldsymbol{a} - \boldsymbol{b}) = \boldsymbol{a} \times \boldsymbol{a} - \boldsymbol{a} \times \boldsymbol{b} + \boldsymbol{b} \times \boldsymbol{a} - \boldsymbol{b} \times \boldsymbol{b} = -2\boldsymbol{a} \times \boldsymbol{b}$；
* 面积 $= 2|\boldsymbol{a} \times \boldsymbol{b}| = 2 \cdot 2 \cdot 1 \cdot \sin\dfrac{\pi}{3} = 2\sqrt{3}$。
* **细节**：叉积这里不能抵消，$\boldsymbol{b} \times \boldsymbol{a} = -\boldsymbol{a} \times \boldsymbol{b}$，两项是叠加；和小题 2 正好对照。
##### 【小题 4】垂直就是点积为 0
* $(\lambda\boldsymbol{a} + \boldsymbol{b}) \cdot \boldsymbol{b} = \lambda\boldsymbol{a} \cdot \boldsymbol{b} + |\boldsymbol{b}|^2 = \lambda + 1 = 0$；
* $\lambda = -1$。
* **细节**：把「垂直」翻译成方程，未知数只在系数里，一次方程直接解。

#### 例题 3：有坐标的四个点

**题目**：设 $A(1, 0, 0)$，$B(0, 2, 0)$，$C(0, 0, 3)$，$D(1, 1, \lambda)$。
1. 求 $\triangle ABC$ 的面积；
2. 求四面体 $ABCD$ 的体积；
3. $\lambda$ 为何值时，四点共面；
4. 当 $\lambda = 0$ 时，求 $D$ 到平面 $ABC$ 的距离。
##### 【小题 1】叉积的长度
* $\overrightarrow{AB} = (-1, 2, 0)$，$\overrightarrow{AC} = (-1, 0, 3)$；
* $\overrightarrow{AB} \times \overrightarrow{AC} = (6, 3, 2)$，长度 $\sqrt{36 + 9 + 4} = 7$；
* 面积 $= \dfrac{7}{2}$。
* **细节**：两条边要从同一个顶点出发；验算 $(6, 3, 2) \cdot (-1, 2, 0) = 0$，$(6, 3, 2) \cdot (-1, 0, 3) = 0$。
##### 【小题 2】混合积
* $\overrightarrow{AD} = (0, 1, \lambda)$；
* $[\overrightarrow{AB}\ \overrightarrow{AC}\ \overrightarrow{AD}] = (\overrightarrow{AB} \times \overrightarrow{AC}) \cdot \overrightarrow{AD} = 3 + 2\lambda$；
* 体积 $= \dfrac{|3 + 2\lambda|}{6}$。
* **细节**：小题 1 的叉积已经算好，混合积只差一次点乘，不必再展开三阶行列式。
##### 【小题 3】体积为 0
* $3 + 2\lambda = 0$，$\lambda = -\dfrac{3}{2}$。
* **验算**：平面 $ABC$ 的法向量是 $(6, 3, 2)$，过 $A$，方程 $6x + 3y + 2z = 6$；$D\left(1, 1, -\dfrac{3}{2}\right)$ 代入：$6 + 3 - 3 = 6$，在平面上。
* **细节**：平面方程两边除以 $6$，就是截距式 $\dfrac{x}{1} + \dfrac{y}{2} + \dfrac{z}{3} = 1$，截距正好是 $A, B, C$ 的坐标。
##### 【小题 4】两种算法互相验证
* 公式：$d = \dfrac{|6 + 3 + 0 - 6|}{7} = \dfrac{3}{7}$；
* 用体积：$\lambda = 0$ 时 $V = \dfrac{1}{2}$，$V = \dfrac{1}{3} \times$ 底面积 $\times$ 高，所以高 $= \dfrac{3V}{\text{面积}} = \dfrac{3/2}{7/2} = \dfrac{3}{7}$。
* **细节**：两种算法结果一致；考场上用一种算，另一种可以拿来验算。

---



#### 例题 4：一个点、一条直线、一个平面

**题目**：设点 $M_0(1, 0, 2)$，直线 $L: \dfrac{x - 1}{2} = \dfrac{y + 1}{1} = \dfrac{z}{-1}$，平面 $\pi: x + y + z = 0$。
1. 求过 $M_0$ 且垂直于 $L$ 的平面；
2. 求过 $M_0$ 且包含 $L$ 的平面；
3. 求过 $M_0$、平行于 $\pi$ 且与 $L$ 垂直的直线；
4. 求 $L$ 与 $\pi$ 的交点和夹角。
##### 【小题 1】法向量现成
* 平面垂直于 $L$，$L$ 的方向向量就是法向量：$\boldsymbol{n} = \boldsymbol{s} = (2, 1, -1)$；
* $2(x - 1) + y - (z - 2) = 0$，即 $2x + y - z = 0$。
* **细节**：「平面垂直于直线」翻译成「法向量平行于方向向量」，不用再算。
##### 【小题 2】法向量要叉乘
* $L$ 过 $P(1, -1, 0)$，$\overrightarrow{PM_0} = (0, 1, 2)$；平面里有 $\boldsymbol{s}$ 和 $\overrightarrow{PM_0}$ 两个方向；
* $\boldsymbol{n} = \boldsymbol{s} \times \overrightarrow{PM_0} = (3, -4, 2)$；
* $3(x - 1) - 4y + 2(z - 2) = 0$，即 $3x - 4y + 2z - 7 = 0$。
* **细节**：
  * 验算：$P$ 代入 $3 + 4 + 0 - 7 = 0$；$\boldsymbol{n} \cdot \boldsymbol{s} = 6 - 4 - 2 = 0$；
  * **若 $L$ 给的是一般式**：直接用平面束，代入 $M_0$ 定 $\lambda$，不用找 $P$。
##### 【小题 3】方向要同时垂直于两个向量
* 直线平行于 $\pi$：$\boldsymbol{s}' \perp \boldsymbol{n}_\pi$；与 $L$ 垂直：$\boldsymbol{s}' \perp \boldsymbol{s}$；
* $\boldsymbol{s}' = \boldsymbol{n}_\pi \times \boldsymbol{s} = (1, 1, 1) \times (2, 1, -1) = (-2, 3, -1)$；
* 直线：$\dfrac{x - 1}{-2} = \dfrac{y}{3} = \dfrac{z - 2}{-1}$。
* **细节**：「直线平行于平面」翻译成「方向向量垂直于法向量」，这里最容易套反。
##### 【小题 4】参数式代入
* $L$ 写成 $x = 1 + 2t$，$y = -1 + t$，$z = -t$，代入 $\pi$：$2t = 0$，$t = 0$，交点 $(1, -1, 0)$；
* $\sin\varphi = \dfrac{|\boldsymbol{s} \cdot \boldsymbol{n}|}{|\boldsymbol{s}||\boldsymbol{n}|} = \dfrac{|2 + 1 - 1|}{\sqrt{6} \cdot \sqrt{3}} = \dfrac{\sqrt{2}}{3}$。
* **细节**：线面夹角是 $\arcsin\dfrac{\sqrt{2}}{3}$，用的是正弦。

---



#### 例题 5：两条直线，带一个参数

**题目**：设直线 $L_1: x = y = z$，$L_2: \dfrac{x - 1}{1} = \dfrac{y}{-1} = \dfrac{z - \lambda}{0}$。
1. 求 $L_1$ 与 $L_2$ 的夹角；
2. 讨论 $\lambda$ 取何值时两直线相交、何时异面；
3. 相交时求交点，异面时求距离；
4. 求过 $L_1$ 且平行于 $L_2$ 的平面，并说明它和小题 3 的关系。
##### 【小题 1】方向向量点积
* $\boldsymbol{s}_1 = (1, 1, 1)$，$\boldsymbol{s}_2 = (1, -1, 0)$，$\boldsymbol{s}_1 \cdot \boldsymbol{s}_2 = 0$；
* 夹角为 $\dfrac{\pi}{2}$，不论 $\lambda$ 取什么。
* **细节**：两直线垂直，不说明它们相交；还要看小题 2。
##### 【小题 2】混合积定共面
* $M_1 = O$，$M_2 = (1, 0, \lambda)$，$\overrightarrow{M_1M_2} = (1, 0, \lambda)$；
* $[\overrightarrow{M_1M_2}\ \boldsymbol{s}_1\ \boldsymbol{s}_2] = \begin{vmatrix} 1 & 0 & \lambda \\ 1 & 1 & 1 \\ 1 & -1 & 0 \end{vmatrix} = 1 - 2\lambda$；
* **若 $\lambda = \dfrac{1}{2}$**：共面，方向不平行，两直线相交；
* **若 $\lambda \ne \dfrac{1}{2}$**：异面。
* **细节**：先确认方向向量不平行，混合积为 $0$ 才能说「相交」；方向平行时，混合积为 $0$ 只说明平行或重合。
##### 【小题 3】按两支分别算
* **若 $\lambda = \dfrac{1}{2}$**：$L_1$ 上的点 $(t, t, t)$，$L_2$ 上的点 $\left(1 + u, -u, \dfrac{1}{2}\right)$；由 $z$ 得 $t = \dfrac{1}{2}$，再由 $x, y$ 得 $u = -\dfrac{1}{2}$，交点 $\left(\dfrac{1}{2}, \dfrac{1}{2}, \dfrac{1}{2}\right)$；
* **若 $\lambda \ne \dfrac{1}{2}$**：$\boldsymbol{s}_1 \times \boldsymbol{s}_2 = (1, 1, -2)$，长度 $\sqrt{6}$，$d = \dfrac{|1 - 2\lambda|}{\sqrt{6}}$。
* **细节**：两条直线用两个不同的参数 $t, u$；用同一个参数，就等于要求两个点「同时」到达同一处，会解错。
##### 【小题 4】异面直线距离的另一种看法
* 平面过 $L_1$（过原点），且平行于 $\boldsymbol{s}_1$、$\boldsymbol{s}_2$：法向量 $\boldsymbol{s}_1 \times \boldsymbol{s}_2 = (1, 1, -2)$，平面 $x + y - 2z = 0$；
* $L_2$ 上的点 $M_2(1, 0, \lambda)$ 到它的距离：$\dfrac{|1 + 0 - 2\lambda|}{\sqrt{6}}$，和小题 3 相同。
* **细节**：$L_2$ 平行于这个平面，上面每一点到平面的距离都一样；所以异面直线的距离，就是一个点到一个平面的距离。

#### 例题 6：垂足、对称点、投影直线

**题目**：设点 $M_0(2, 1, 0)$，平面 $\pi: x + y + z = 1$，直线 $L: \dfrac{x - 1}{1} = \dfrac{y}{2} = \dfrac{z}{-1}$。
1. 求 $M_0$ 在 $\pi$ 上的垂足，以及 $M_0$ 关于 $\pi$ 的对称点；
2. 求 $L$ 在 $\pi$ 上的投影直线；
3. 求 $M_0$ 到 $L$ 的距离和垂足。
##### 【小题 1】沿法向量走
* 垂线 $x = 2 + t$，$y = 1 + t$，$z = t$，代入 $\pi$：$3 + 3t = 1$，$t_0 = -\dfrac{2}{3}$；
* 垂足 $N\left(\dfrac{4}{3}, \dfrac{1}{3}, -\dfrac{2}{3}\right)$；对称点取 $t = -\dfrac{4}{3}$：$\left(\dfrac{2}{3}, -\dfrac{1}{3}, -\dfrac{4}{3}\right)$。
* **细节**：验算——$N$ 代入 $\pi$：$\dfrac{4}{3} + \dfrac{1}{3} - \dfrac{2}{3} = 1$；$M_0$ 与对称点的中点正是 $N$。
##### 【小题 2】投影平面的法向量
* $L$ 过 $P(1, 0, 0)$，$\boldsymbol{s} = (1, 2, -1)$；$\boldsymbol{s} \cdot \boldsymbol{n} = 2 \ne 0$，$L$ 与 $\pi$ 相交，投影是一条直线；
* 投影平面的法向量 $\boldsymbol{s} \times \boldsymbol{n} = (1, 2, -1) \times (1, 1, 1) = (3, -2, -1)$，过 $P$：$3x - 2y - z - 3 = 0$；
* 投影直线：$\begin{cases} 3x - 2y - z - 3 = 0 \\ x + y + z = 1 \end{cases}$。
* **细节**：
  * 验算方向：投影直线的方向 $(3, -2, -1) \times (1, 1, 1) = (-1, -4, 5)$，与 $\boldsymbol{s}$ 去掉法向分量后的 $\left(\dfrac{1}{3}, \dfrac{4}{3}, -\dfrac{5}{3}\right)$ 平行；
  * **若 $\boldsymbol{s} \parallel \boldsymbol{n}$**：$L$ 垂直于 $\pi$，投影缩成一个点，就是交点。
##### 【小题 3】作垂直于 L 的平面
* 距离：$\overrightarrow{PM_0} = (1, 1, 0)$，$\overrightarrow{PM_0} \times \boldsymbol{s} = (-1, 1, 1)$，$d = \dfrac{\sqrt{3}}{\sqrt{6}} = \dfrac{\sqrt{2}}{2}$；
* 垂足：过 $M_0$、垂直于 $L$ 的平面 $(x - 2) + 2(y - 1) - z = 0$；把 $L$ 的参数式 $(1 + t, 2t, -t)$ 代入，得 $6t - 3 = 0$，$t = \dfrac{1}{2}$，垂足 $\left(\dfrac{3}{2}, 1, -\dfrac{1}{2}\right)$。
* **细节**：$M_0$ 到垂足的距离 $\sqrt{\dfrac{1}{4} + 0 + \dfrac{1}{4}} = \dfrac{\sqrt{2}}{2}$，和公式一致。

---



#### 例题 7：转出来的曲面，和认出来的曲面

**题目**：
1. 求 $yOz$ 面上的直线 $z = 2y$ 分别绕 $z$ 轴、$y$ 轴旋转所得的曲面；
2. 过 $A(1, 0, 0)$、$B(1, 1, 1)$ 的直线绕 $z$ 轴旋转一周得曲面 $\Sigma$，求 $\Sigma$ 的方程，以及 $\Sigma$ 与平面 $z = 0$、$z = 1$ 围成的立体的体积；
3. 说出下列方程表示的曲面：$x^2 + y^2 = z$；$y^2 = z$；$4x^2 + y^2 - z^2 = 4$；
4. 讨论 $x^2 + y^2 - z^2 = k$ 随 $k$ 的变化表示什么曲面。
##### 【小题 1】绕哪个轴，哪个坐标不动
* 绕 $z$ 轴：$z$ 不动，$y$ 换成 $\pm\sqrt{x^2 + y^2}$：$z^2 = 4(x^2 + y^2)$；
* 绕 $y$ 轴：$y$ 不动，$z$ 换成 $\pm\sqrt{x^2 + z^2}$：$x^2 + z^2 = 4y^2$；
* 两个都是圆锥面，轴不同。
* **细节**：换的是「不动的那个之外」的坐标，换成到轴的距离，不是换成别的字母。
##### 【小题 2】空间直线：高度不变、到轴的距离不变
* 直线方向 $\overrightarrow{AB} = (0, 1, 1)$，参数式 $x = 1$，$y = t$，$z = t$；
* 转的时候：$z = t$ 不变，$x^2 + y^2 = 1 + t^2$ 不变；消去 $t$：$\Sigma: x^2 + y^2 = 1 + z^2$；
* 体积：用 $z = h$ 截，截面是半径 $\sqrt{1 + h^2}$ 的圆，面积 $\pi(1 + h^2)$；
  $$V = \int_0^1 \pi(1 + z^2)\,\mathrm{d}z = \dfrac{4\pi}{3}$$
* **细节**：
  * 截面面积乘 $\mathrm{d}z$ 再积分，是已知平行截面面积的立体体积（第 3 章）；
  * 检验方程：取直线上的 $B(1, 1, 1)$，$1 + 1 = 1 + 1$，满足。
##### 【小题 3】先看缺不缺变量，再看平方和
* $x^2 + y^2 = z$：$x^2 + y^2$ 整体出现，绕 $z$ 轴的旋转抛物面；
* $y^2 = z$：缺 $x$，母线平行于 $x$ 轴的抛物柱面；
* $4x^2 + y^2 - z^2 = 4$：除以 $4$，$x^2 + \dfrac{y^2}{4} - \dfrac{z^2}{4} = 1$，两正一负等于 $1$，单叶双曲面；$x^2$ 与 $y^2$ 的系数不同，不是旋转曲面。
* **细节**：判断旋转曲面，要看两个平方项的系数是否相同；只看「有平方和」不够。
##### 【小题 4】按 k 的符号分三支
* **若 $k > 0$**：两正一负等于正数，单叶双曲面；
* **若 $k = 0$**：$z^2 = x^2 + y^2$，圆锥面；
* **若 $k < 0$**：两正一负等于负数，双叶双曲面。
* **细节**：用截痕看过渡：$z = h$ 截得 $x^2 + y^2 = k + h^2$；$k$ 从正变到负，「腰」从一个圆缩成一个点（锥顶），再断开成两叶。

---



#### 例题 8：一个立体，三种投影

**题目**：设立体 $\Omega$ 由旋转抛物面 $z = x^2 + y^2$ 与平面 $z = 2x$ 围成，$C$ 是两者的交线。
1. 求 $C$ 在 $xOy$ 面上的投影曲线；
2. 求 $\Omega$ 在 $xOy$ 面上的投影区域；
3. 把 $C$ 写成参数方程；
4. 求 $\Omega$ 在 $xOz$ 面上的投影区域。
##### 【小题 1】消去 z
* $x^2 + y^2 = 2x$，即 $(x - 1)^2 + y^2 = 1$；
* 投影曲线：$\begin{cases} (x - 1)^2 + y^2 = 1 \\ z = 0 \end{cases}$。
* **细节**：只写 $(x - 1)^2 + y^2 = 1$，在空间里是一个圆柱面，不是曲线。
##### 【小题 2】交线投下来围成区域
* $\Omega$ 夹在抛物面（下）与平面（上）之间，边界是交线 $C$；
* $D_{xy}: (x - 1)^2 + y^2 \le 1$。
* **细节**：哪个在上，取区域内一点比较：$(1, 0)$ 处抛物面 $z = 1$，平面 $z = 2$，平面在上。
##### 【小题 3】给投影曲线取参数
* 投影是圆心 $(1, 0)$、半径 $1$ 的圆：$x = 1 + \cos t$，$y = \sin t$；
* 由 $z = 2x$：$z = 2 + 2\cos t$，$0 \le t \le 2\pi$。
* **细节**：验算：$x^2 + y^2 = 2 + 2\cos t = z$，点确实在抛物面上。
##### 【小题 4】换个方向看：轮廓线
* $\Omega$ 中的点满足 $x^2 + y^2 \le z \le 2x$；投到 $xOz$ 面，问哪些 $(x, z)$ 能找到 $y$；
* $y = 0$ 时条件最宽：$x^2 \le z \le 2x$；所以 $D_{xz}: x^2 \le z \le 2x$，$0 \le x \le 2$，夹在抛物线 $z = x^2$ 与直线 $z = 2x$ 之间；
* 边界的抛物线 $z = x^2$ 不是交线 $C$ 的投影，而是抛物面在 $y = 0$ 处的轮廓。
* **细节**：交线 $C$ 投到 $xOz$ 面上，只是线段 $z = 2x$（$0 \le x \le 2$）；只投交线，就会漏掉下面的抛物线边界。

---

<!-- section:提示 -->

### 〔提示〕

**① 空间里的长度和方向**

#### 1. 投影是数，不是向量
* $\operatorname{Prj}_{\boldsymbol{b}}\boldsymbol{a}$ 是一个可正可负的数；要投影向量，还得乘上 $\boldsymbol{b}$ 方向的单位向量。

#### 2. 三个方向角不能随便给
* 平方和必须为 $1$；已知两个，第三个的余弦只能差一个正负号。

**② 向量的三种乘法**

#### 1. 点积不能约
* $\boldsymbol{a} \cdot \boldsymbol{b} = \boldsymbol{a} \cdot \boldsymbol{c}$ 推不出 $\boldsymbol{b} = \boldsymbol{c}$；$\boldsymbol{a} \times \boldsymbol{b} = \boldsymbol{a} \times \boldsymbol{c}$ 也推不出。

#### 2. 叉积的第二个分量
* 按行列式展开，$\boldsymbol{j}$ 前面是负号；算完与两个因子各点乘一次，都为 $0$ 才对。

#### 3. 叉积不能交换顺序
* 只要法向量时，方向反了不要紧；判断右手系、混合积的正负时，顺序决定符号。

**③ 平面和直线**

#### 1. 法向量看系数，不看常数项
* $2x - y + 3z = 5$ 的法向量是 $(2, -1, 3)$，与 $5$ 无关。

#### 2. 平面束会漏掉 π2
* $\pi_1 + \lambda\pi_2 = 0$ 写不出 $\pi_2$ 本身；解不出 $\lambda$ 时，检查 $\pi_2$ 是否就是答案。

#### 3. 对称式分母为 0，不能约、不能乘过去
* $\dfrac{x - 1}{0}$ 读成 $x - 1 = 0$；把它当普通分数交叉相乘，会丢掉这个条件。

**④ 两个图形摆在一起**

#### 1. 线面的垂直、平行别套反
* 线 $\perp$ 面 $\iff \boldsymbol{s} \parallel \boldsymbol{n}$；线 $\parallel$ 面 $\iff \boldsymbol{s} \perp \boldsymbol{n}$。

#### 2. 线面夹角用正弦
* $\dfrac{|\boldsymbol{s} \cdot \boldsymbol{n}|}{|\boldsymbol{s}||\boldsymbol{n}|}$ 是 $\sin\varphi$；按余弦算，得到的是它的余角。

#### 3. 两平行平面的距离，先把系数化成相同
* $2x + 2y + z = 1$ 与 $4x + 4y + 2z = 5$：先把第一个写成 $4x + 4y + 2z = 2$，$d = \dfrac{|5 - 2|}{6} = \dfrac{1}{2}$；直接拿 $1$ 和 $5$ 相减就错了。

#### 4. 方向垂直的两条直线，可能不相交
* 方向向量点积为 $0$ 只说明夹角是 $\dfrac{\pi}{2}$；是否相交，要看混合积。

**⑤ 曲面长什么样**

#### 1. 同一个方程，平面上和空间里不一样
* $x^2 + y^2 = 1$ 在空间里是圆柱面；要表示圆，得加上 $z = 0$（或别的平面）。

#### 2. 空间直线旋转，不能只换一个坐标
* $x = 1$，$y = t$，$z = t$ 绕 $z$ 轴：若只看 $y = z$、把 $y$ 换成 $\pm\sqrt{x^2 + y^2}$，得到圆锥面 $x^2 + y^2 = z^2$，丢了 $x = 1$ 这一项；正确的是 $x^2 + y^2 = 1 + z^2$。

#### 3. 两个平方项系数不同，不是旋转曲面
* $4x^2 + y^2 = z$ 是椭圆抛物面，不是绕 $z$ 轴转出来的；只有 $x^2, y^2$ 的系数相同，才是 $x^2 + y^2$ 整体出现。

**⑥ 压到坐标面上**

#### 1. 投影曲线要带上 z = 0
* 只写 $H(x, y) = 0$，表示的是投影柱面。

#### 2. 消元会丢掉范围
* 用过 $z^2 = \cdots$、$z = \sqrt{\cdots}$ 消元时，回头检查 $x, y$ 有没有范围限制。

#### 3. 投影区域的边界，不一定是交线的投影
* 侧面是柱面时，边界是柱面的准线；曲面在侧面折回时，边界是轮廓线。