# 高数第 7 章合并为超级卡：结构改动（v1）

对应草稿：
- 教材全文：`drafts/calculus-line-surface-integral-card1-book-v1.md`；
- 笔记：`drafts/calculus-line-surface-integral-card1-note-v1.md`；
- 决策流：`drafts/calculus-line-surface-integral-flow-v1.md`；
- 本章总结：`drafts/calculus-line-surface-integral-summary-v1.md`；
- 思维导图：`drafts/calculus-line-surface-integral-mindmap-v1.webp`（由 `drafts/calculus-line-surface-integral-mindmap-v1.cjs` 经 `tools/mindmap.cjs` 导出）。

这一章不写逐条迁移表；本文件只列结构改动，是给 Codex 执行的计划，不写进网站。

## 结构改动

- **保留** `calc-ls-line-first`（模块 1，卡 ①），教材换成草稿全文。
  - `title`：`把重积分搬到弯的线和面上，再把边界换成里面（第一类积分 → 第二类曲线积分 → 格林公式 → 与路径无关 → 第二类曲面积分 → 高斯、斯托克斯）`
  - `type`：`definition`；`types`：`["definition","property"]`
  - `tags`：`["第一类曲线积分","对弧长的曲线积分","弧长元","弧长","第一类曲面积分","对面积的曲面积分","曲面面积元","先代入方程","对称性","轮换对称性","曲线形构件","曲面形构件","质量","质心","形心","转动惯量","引力","第二类曲线积分","对坐标的曲线积分","有向曲线","变力做功","功","两类曲线积分的联系","单位切向量","交线的参数式","格林公式","单连通区域","复连通区域","正向边界","用曲线积分求面积","补线法","挖去奇点","法向形式","外法线","路径无关","全微分","原函数","求原函数","双侧曲面","有向曲面","第二类曲面积分","对坐标的曲面积分","通量","流量","两类曲面积分的联系","分面投影法","合一投影法","高斯公式","散度","补面法","用曲面积分求体积","斯托克斯公式","环流量","旋度","右手法则","空间曲线积分与路径无关","梯度"]`
- **删除** 7 张卡（先存档）：`calc-ls-line-second`、`calc-ls-green`、`calc-ls-path-independence`、`calc-ls-surface-first`、`calc-ls-surface-second`、`calc-ls-gauss-stokes`、`calc-ls-symmetry-applications`。
- **章节** `line-surface-integral`：
  - 注释改为：`// 第7章按「一条主线」组织：一张超级卡，分三层六站（不分方向：弯的线、弯的面上怎么求总量；沿着曲线：沿着路走，力做了多少功 → 绕一圈的积分，换成里面的二重积分 → 什么时候只看起点和终点；穿过曲面：流过一张曲面的量 → 闭曲面和空间曲线）。`
  - `modules` 改为一项：`{ no: "一", name: "一条主线", brief: "把重积分搬到弯的线和面上，再把边界换成里面：第一类积分 → 第二类曲线积分 → 格林 → 路径无关 → 第二类曲面积分 → 高斯、斯托克斯" }`
- **笔记**：新增 `calc-ls-line-first`，内容用 `drafts/calculus-line-surface-integral-card1-note-v1.md`（这张卡原来没有笔记）。
- **决策流**：新增 `flow:calculus/line-surface-integral`，内容用 `drafts/calculus-line-surface-integral-flow-v1.md`。
- **本章总结**：新增 `ch:calculus/line-surface-integral`，内容用 `drafts/calculus-line-surface-integral-summary-v1.md`。
- **思维导图**：新增 `map:calculus/line-surface-integral`，图片用 `drafts/calculus-line-surface-integral-mindmap-v1.webp`（按 AGENTS.md 流程 D 的命名放进 `assets/images/mindmaps/`）。
- 高数第 7 章原来的 8 张卡都没有笔记，删除的 7 张只需存档教材。
