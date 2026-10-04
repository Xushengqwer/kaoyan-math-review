# 高数第 9 章合并为超级卡：结构改动（v1）

对应草稿：
- 教材全文：`drafts/calculus-ode-card1-book-v1.md`；
- 笔记：`drafts/calculus-ode-card1-note-v1.md`；
- 决策流：`drafts/calculus-ode-flow-v1.md`；
- 本章总结：`drafts/calculus-ode-summary-v1.md`；
- 思维导图：`drafts/calculus-ode-mindmap-v1.webp`（由 `drafts/calculus-ode-mindmap-v1.cjs` 经 `tools/mindmap.cjs` 导出）。

这一章不写逐条迁移表；本文件只列结构改动，是给 Codex 执行的计划，不写进网站。

## 结构改动

- **保留** `calc-ode-concepts`（模块 1，卡 ①），教材换成草稿全文。
  - `title`：`只知道变化规律，反过来求函数（列方程 → 一阶方程 → 降阶 → 线性方程解的结构 → 常系数齐次 → 常系数非齐次与欧拉方程）`
  - `type`：`definition`；`types`：`["definition","property"]`
  - `tags`：`["微分方程","常微分方程","阶","解","通解","特解","初始条件","初值问题","存在唯一性定理","列方程","几何应用","物理应用","积分方程","可分离变量方程","分离变量法","齐次方程","变量代换","一阶线性微分方程","通解公式","常数变易法","以x为未知函数","伯努利方程","全微分方程","积分因子","可降阶方程","降阶法","线性微分方程","自由项","线性相关","线性无关","解的结构","叠加原理","常系数线性微分方程","特征方程","特征根","待定系数法","欧拉方程","由解反求方程"]`
- **删除** 7 张卡（先存档）：`calc-ode-separable-homogeneous`、`calc-ode-linear-first`、`calc-ode-exact`、`calc-ode-reducible`、`calc-ode-linear-structure`、`calc-ode-constant-coefficient`、`calc-ode-euler`。
- **章节** `ode`：
  - 注释改为：`// 第9章按「一条主线」组织：一张超级卡，分三层六站（列方程：怎么列方程，解是什么；一阶方程：一阶方程怎么积出来；高阶方程：高阶方程怎么降阶 → 线性方程的解的结构 → 常系数齐次怎么解 → 常系数非齐次怎么解）。`
  - `modules` 改为一项：`{ no: "一", name: "一条主线", brief: "只知道变化规律，反过来求函数：列方程 → 一阶方程 → 降阶 → 解的结构 → 常系数齐次 → 常系数非齐次" }`
- **笔记**：新增 `calc-ode-concepts`，内容用 `drafts/calculus-ode-card1-note-v1.md`（这张卡原来没有笔记）。
- **决策流**：新增 `flow:calculus/ode`，内容用 `drafts/calculus-ode-flow-v1.md`。
- **本章总结**：新增 `ch:calculus/ode`，内容用 `drafts/calculus-ode-summary-v1.md`。
- **思维导图**：新增 `map:calculus/ode`，图片用 `drafts/calculus-ode-mindmap-v1.webp`（按 AGENTS.md 流程 D 的命名放进 `assets/images/mindmaps/`）。
- 高数第 9 章原来的 8 张卡都没有笔记，删除的 7 张只需存档教材。
