# 高数第 4 章合并为超级卡：结构改动（v1）

对应草稿：
- 教材全文：`drafts/calculus-vector-geometry-card1-book-v1.md`；
- 决策流：`drafts/calculus-vector-geometry-flow-v1.md`；
- 思维导图：`drafts/calculus-vector-geometry-mindmap-v1.webp`（由 `drafts/calculus-vector-geometry-mindmap-v1.cjs` 经 `tools/mindmap.cjs` 导出）。

这一章不写逐条迁移表；本文件只列结构改动，是给 Codex 执行的计划，不写进网站。

## 结构改动

- **保留** `calc-vec-coordinates`（模块 1，卡 ①），教材换成草稿全文。
  - `title`：`为多元微积分，描述空间里的图形（向量 → 三种乘法 → 平面和直线 → 位置、夹角、距离 → 曲面 → 投影）`
  - `type`：`definition`；`types`：`["definition","property"]`
  - `tags`：`["向量","坐标","线性运算","模","单位向量","方向角","方向余弦","夹角","投影","数量积","点积","向量积","叉积","混合积","右手法则","垂直","平行","共面","平行四边形面积","三角形面积","四面体体积","平面","法向量","点法式","一般式","截距式","三点式","平面束","直线","方向向量","对称式","点向式","参数式","一般式化对称式","两平面夹角","两直线夹角","直线与平面夹角","位置关系","异面直线","公垂线","点到平面的距离","点到直线的距离","平行平面间距离","异面直线的距离","垂足","对称点","交点","投影直线","投影平面","曲面方程","柱面","准线","母线","旋转曲面","旋转轴","空间直线旋转","二次曲面","截痕法","球面","椭球面","锥面","单叶双曲面","双叶双曲面","椭圆抛物面","马鞍面","旋转抛物面","空间曲线","一般方程","参数方程","投影柱面","投影曲线","投影区域"]`
- **删除** 6 张卡（先存档）：`calc-vec-products`、`calc-vec-plane`、`calc-vec-line`、`calc-vec-relations`、`calc-vec-surfaces`、`calc-vec-space-curves`。
- **章节** `vector-geometry`：
  - 注释改为：`// 第4章按「一条主线」组织：一张超级卡，分三层六站（工具：空间里的长度和方向 → 向量的三种乘法；平的图形：平面和直线 → 两个图形摆在一起；弯的图形：曲面长什么样 → 压到坐标面上）。`
  - `modules` 改为一项：`{ no: "一", name: "一条主线", brief: "为多元微积分，描述空间里的图形：向量 → 三种乘法 → 平面和直线 → 位置、夹角、距离 → 曲面 → 投影" }`
- **决策流**：新增 `flow:calculus/vector-geometry`，内容用 `drafts/calculus-vector-geometry-flow-v1.md`。
- **思维导图**：新增 `map:calculus/vector-geometry`，图片用 `drafts/calculus-vector-geometry-mindmap-v1.webp`（按 AGENTS.md 流程 D 的命名放进 `assets/images/mindmaps/`）。
- 高数第 4 章没有笔记、本章总结，本次不涉及。
