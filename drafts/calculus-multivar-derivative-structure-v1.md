# 高数第 5 章合并为超级卡：结构改动（v1）

对应草稿：
- 教材全文：`drafts/calculus-multivar-derivative-card1-book-v1.md`；
- 决策流：`drafts/calculus-multivar-derivative-flow-v1.md`；
- 思维导图：`drafts/calculus-multivar-derivative-mindmap-v1.webp`（由 `drafts/calculus-multivar-derivative-mindmap-v1.cjs` 经 `tools/mindmap.cjs` 导出）。

这一章不写逐条迁移表；本文件只列结构改动，是给 Codex 执行的计划，不写进网站。

## 结构改动

- **保留** `calc-mvd-limit-continuity`（模块 1，卡 ①），教材换成草稿全文。
  - `title`：`站在曲面上一点，往四周走，高度怎么变（二重极限 → 偏导数与可微 → 求偏导 → 方向导数与梯度 → 切平面与切线 → 极值）`
  - `type`：`definition`；`types`：`["definition","property"]`
  - `tags`：`["二元函数","邻域","去心邻域","二重极限","任意路径","夹逼","极坐标","连续","多元初等函数","偏导数","偏导数的几何意义","可微","全微分","必要条件","充分条件","用定义判断可微","偏导数存在","偏导数连续","四个概念的关系","反例","高阶偏导数","混合偏导数","求导次序","链式法则","多元复合函数","变量关系图","全导数","抽象函数","二阶偏导数","隐函数","隐函数存在定理","隐函数求导","隐函数的二阶偏导数","方程组确定的隐函数","雅可比行列式","全微分形式不变性","全微分法","变量代换","方向导数","单侧极限","梯度","方向导数的最大值","最大变化率","等值线","等值面","切线","法平面","切向量","切平面","法线","法向量","显式曲面","交线","极值","无条件极值","驻点","二阶泰勒公式","二次型","由方程确定的函数的极值","最值","有界闭区域","介值","实际问题","条件极值","拉格朗日乘数法","拉格朗日函数","约束条件","距离的最值"]`
- **删除** 6 张卡（先存档）：`calc-mvd-partial`、`calc-mvd-chain-rule`、`calc-mvd-implicit`、`calc-mvd-gradient`、`calc-mvd-geometry`、`calc-mvd-extremum`。
- **章节** `multivar-derivative`：
  - 注释改为：`// 第5章按「一条主线」组织：一张超级卡，分三层六站（变化率：从四面八方靠近 → 变化有多快 → 怎么求偏导；方向：往哪个方向升得最快 → 切平面和切线；极值：最高点和最低点）。`
  - `modules` 改为一项：`{ no: "一", name: "一条主线", brief: "站在曲面上一点，往四周走，高度怎么变：二重极限 → 偏导数与可微 → 求偏导 → 梯度 → 切平面 → 极值" }`
- **决策流**：新增 `flow:calculus/multivar-derivative`，内容用 `drafts/calculus-multivar-derivative-flow-v1.md`。
- **思维导图**：新增 `map:calculus/multivar-derivative`，图片用 `drafts/calculus-multivar-derivative-mindmap-v1.webp`（按 AGENTS.md 流程 D 的命名放进 `assets/images/mindmaps/`）。
- 高数第 5 章没有笔记、本章总结，本次不涉及。
