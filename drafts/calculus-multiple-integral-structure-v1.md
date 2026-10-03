# 高数第 6 章合并为超级卡：结构改动（v1）

对应草稿：
- 教材全文：`drafts/calculus-multiple-integral-card1-book-v1.md`；
- 决策流：`drafts/calculus-multiple-integral-flow-v2.md`；
- 本章总结：`drafts/calculus-multiple-integral-summary-v3.md`；
- 思维导图：`drafts/calculus-multiple-integral-mindmap-v2.webp`（由 `drafts/calculus-multiple-integral-mindmap-v2.cjs` 经 `tools/mindmap.cjs` 导出）。

这一章不写逐条迁移表；本文件只列结构改动，是给 Codex 执行的计划，不写进网站。

## 结构改动

- **保留** `calc-mi-double-def`（模块 1，卡 ①），教材换成草稿全文。
  - `title`：`把定积分搬到区域和立体上，再化回定积分（二重积分 → 累次积分 → 极坐标 → 三重积分 → 对称性 → 应用）`
  - `type`：`definition`；`types`：`["definition","property"]`
  - `tags`：`["二重积分","曲顶柱体","积分区域","面积元","有界闭区域","二重积分的性质","估值","中值定理","平均值","三重积分","体积元","双重和式的极限","积分方程","X型区域","Y型区域","累次积分","二次积分","分块","变量分离","交换积分次序","原函数不是初等函数","极坐标","扇环","极坐标方程","变限积分","泊松积分","雅可比行列式","二重积分换元法","投影区域","截面","投影法","先一后二","截面法","先二后一","柱面坐标","球面坐标","三重积分换元","对称性","奇偶性","轮换对称性","权","体积","曲面面积","曲面面积元","质量","静矩","质心","形心","转动惯量","引力","密度"]`
- **删除** 6 张卡（先存档）：`calc-mi-cartesian`、`calc-mi-polar`、`calc-mi-triple`、`calc-mi-cylindrical-spherical`、`calc-mi-symmetry`、`calc-mi-applications`。
- **章节** `multiple-integral`：
  - 注释改为：`// 第6章按「一条主线」组织：一张超级卡，分六站（曲顶柱体的体积怎么算 → 怎么化成两次定积分 → 区域是圆的怎么办 → 三重积分怎么算 → 重积分怎么算更省事 → 什么量能用重积分算）。`
  - `modules` 改为一项：`{ no: "一", name: "一条主线", brief: "把定积分搬到区域和立体上，再化回定积分：二重积分 → 累次积分 → 极坐标 → 三重积分 → 对称 → 应用" }`
- **决策流**：新增 `flow:calculus/multiple-integral`，内容用 `drafts/calculus-multiple-integral-flow-v2.md`。
- **本章总结**：新增 `ch:calculus/multiple-integral`，内容用 `drafts/calculus-multiple-integral-summary-v3.md`。
- **思维导图**：新增 `map:calculus/multiple-integral`，图片用 `drafts/calculus-multiple-integral-mindmap-v2.webp`（按 AGENTS.md 流程 D 的命名放进 `assets/images/mindmaps/`）。
- 高数第 6 章原来没有笔记，本次不涉及。
