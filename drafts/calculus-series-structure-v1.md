# 高数第 8 章合并为超级卡：结构改动（v1）

对应草稿：
- 教材全文：`drafts/calculus-series-card1-book-v1.md`；
- 笔记：`drafts/calculus-series-card1-note-v1.md`；
- 决策流：`drafts/calculus-series-flow-v1.md`；
- 本章总结：`drafts/calculus-series-summary-v1.md`；
- 思维导图：`drafts/calculus-series-mindmap-v1.webp`（由 `drafts/calculus-series-mindmap-v1.cjs` 经 `tools/mindmap.cjs` 导出）。

这一章不写逐条迁移表；本文件只列结构改动，是给 Codex 执行的计划，不写进网站。

## 结构改动

- **保留** `calc-ser-convergence`（模块 1，卡 ①），教材换成草稿全文。
  - `title`：`把无穷多个数、函数加起来，再用它表示函数（级数的收敛 → 正项级数 → 任意项级数 → 幂级数的收敛域 → 和函数与展开 → 傅里叶级数）`
  - `type`：`definition`；`types`：`["definition","property"]`
  - `tags`：`["常数项级数","一般项","部分和","收敛","发散","级数的和","余项","基本性质","加括号","必要条件","等比级数","调和级数","裂项相消","数列与级数互化","正项级数","p级数","比较判别法","比较判别法的极限形式","比值判别法","根值判别法","积分判别法","增长快慢","交错级数","莱布尼茨判别法","绝对收敛","条件收敛","交错p级数","敛散性的运算","反例","重排","柯西乘积","函数项级数","收敛域","和函数","幂级数","阿贝尔定理","收敛半径","收敛区间","缺项幂级数","逐项求导","逐项积分","求和函数","数项级数求和","泰勒级数","麦克劳林级数","展开的充要条件","展开式的唯一性","常用展开式","间接展开法","高阶导数","三角函数系","正交性","傅里叶系数","傅里叶级数","狄利克雷收敛定理","正弦级数","余弦级数","周期延拓","奇延拓","偶延拓","周期为2l的傅里叶级数"]`
- **删除** 6 张卡（先存档）：`calc-ser-positive`、`calc-ser-alternating-absolute`、`calc-ser-power-domain`、`calc-ser-power-sum`、`calc-ser-taylor-expansion`、`calc-ser-fourier`。
- **章节** `series`：
  - 注释改为：`// 第8章按「一条主线」组织：一张超级卡，分三层六站（数项级数：无穷多个数怎么相加 → 全是正项，收不收敛 → 有正有负，收不收敛；幂级数：幂级数在哪些点收敛 → 幂级数与函数来回换；傅里叶级数：用正弦余弦来展开）。`
  - `modules` 改为一项：`{ no: "一", name: "一条主线", brief: "把无穷多个数、函数加起来，再用它表示函数：收敛 → 正项级数 → 任意项级数 → 收敛域 → 和函数与展开 → 傅里叶级数" }`
- **笔记**：新增 `calc-ser-convergence`，内容用 `drafts/calculus-series-card1-note-v1.md`（这张卡原来没有笔记）。
- **决策流**：新增 `flow:calculus/series`，内容用 `drafts/calculus-series-flow-v1.md`。
- **本章总结**：新增 `ch:calculus/series`，内容用 `drafts/calculus-series-summary-v1.md`。
- **思维导图**：新增 `map:calculus/series`，图片用 `drafts/calculus-series-mindmap-v1.webp`（按 AGENTS.md 流程 D 的命名放进 `assets/images/mindmaps/`）。
- 高数第 8 章原来的 7 张卡都没有笔记，删除的 6 张只需存档教材。
