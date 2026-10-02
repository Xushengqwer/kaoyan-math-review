# 高数第 3 章合并为超级卡：结构改动（v1）

对应草稿：
- 教材全文：`drafts/calculus-integral-card1-book-v1.md`；
- 决策流：`drafts/calculus-integral-flow-v1.md`；
- 思维导图：`drafts/calculus-integral-mindmap-v1.webp`（由 `drafts/calculus-integral-mindmap-v1.cjs` 经 `tools/mindmap.cjs` 导出）。

用户确认这一章不写逐条迁移表；本文件只列结构改动，是给 Codex 执行的计划，不写进网站。

## 结构改动

- **保留** `calc-int-antiderivative`（模块 1，卡 ①），教材换成草稿全文。
  - `title`：`从变化率倒回去，求整段的总量（定积分 → 基本定理 → 原函数 → 定积分的计算 → 反常积分 → 微元法）`
  - `type`：`definition`；`types`：`["definition","property"]`
  - `tags`：`["定积分","黎曼和","可积","可积的条件","几何意义","线性性","区间可加性","保号性","估值定理","积分中值定理","平均值","和式极限","变上限积分","变限积分求导","微积分基本定理","原函数","不定积分","原函数存在定理","原函数存在的必要条件","可积与原函数","牛顿-莱布尼茨公式","变限积分的奇偶性","变限积分的周期性","变限积分的等价无穷小","积分不等式","积分方程","基本积分公式","第一类换元法","凑微分","分部积分法","第二类换元法","三角代换","根式代换","有理函数","部分分式","三角函数有理式","万能代换","定积分换元法","定积分分部积分法","奇偶性","周期性","区间再现","双阶乘","华里士公式","点火公式","反常积分","无穷限积分","瑕积分","瑕点","p积分","比较判别法","敛散性","微元法","平面图形面积","旋转体体积","柱壳法","平行截面","弧长","旋转曲面面积","变力做功","抽水做功","液体压力"]`
- **删除** 7 张卡（先存档）：`calc-int-substitution-parts`、`calc-int-rational`、`calc-int-definite`、`calc-int-fundamental`、`calc-int-definite-computation`、`calc-int-improper`、`calc-int-applications`。
- **章节** `integral`：
  - 注释改为：`// 第3章按「一条主线」组织：一张超级卡，分六站（曲边的面积怎么算 → 面积怎么随右端变 → 原函数怎么找 → 定积分怎么算更省事 → 区间无穷、函数无界 → 什么量能用积分算）。`
  - `modules` 改为一项：`{ no: "一", name: "一条主线", brief: "从变化率倒回去，求整段的总量：定积分 → 基本定理 → 原函数 → 定积分的计算 → 反常积分 → 微元法" }`
- **决策流**：新增 `flow:calculus/integral`，内容用 `drafts/calculus-integral-flow-v1.md`。
- **思维导图**：新增 `map:calculus/integral`，图片用 `drafts/calculus-integral-mindmap-v1.webp`（按 AGENTS.md 流程 D 的命名放进 `assets/images/mindmaps/`）。
- 高数第 3 章没有笔记、本章总结，本次不涉及。
