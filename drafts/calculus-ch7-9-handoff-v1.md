# 高数第 7、8、9 章：一起交给 Codex 的说明（v1）

用户已确认第 7、8、9 章的草稿不再逐份审阅，三章一起写进网站。本文件只是给 Codex 的执行说明，不写进网站。

## 顺序与依据

按章依次做，每章一个提交，写完直接提交：

1. 第 7 章：按 `drafts/calculus-line-surface-integral-structure-v1.md` 做（流程 C + A + D）；
2. 第 8 章：按 `drafts/calculus-series-structure-v1.md` 做（流程 C + A + D）；
3. 第 9 章：按 `drafts/calculus-ode-structure-v1.md` 做（流程 C + A + D）。

每个结构文件里列了：保留的卡与它的 `title`、`type`、`types`、`tags`；要删的卡；章节注释与 `modules`；教材、笔记、决策流、本章总结、思维导图各用哪个草稿。三章原来都没有笔记，删除的卡只需存档教材。

## 测试要跟着更新

三张超级卡写入笔记后，对照视图会自动启用，下面两个测试里列出的卡需要加上这三张（数字由网站自己的 `cardOutline` 和 `App.dualTrackModel` 对草稿算出；同样的办法算第 6 章，结果与测试里现有的数字一致）：

- `tests/dual-track.cjs` 的 `expected`：
  - `calc-ls-line-first`：`55`
  - `calc-ser-convergence`：`52`
  - `calc-ode-concepts`：`44`
  - 末尾断言里的「eight reconstructed cards」随之改成十一张。
- `tests/station-cards.cjs` 的 `expected`（块数、教材定义、教材性质、教材意义、笔记例题、笔记提示）：
  - `calc-ls-line-first`：`[6, 16, 39, 20, 10, 18]`
  - `calc-ser-convergence`：`[6, 16, 36, 19, 10, 18]`
  - `calc-ode-concepts`：`[6, 15, 29, 17, 8, 15]`

## 完成后

- `docs/status.md`：高数第 7、8、9 章改为已合并为超级卡，并有笔记、决策流、本章总结、路线图。
- Claude 做最后核对：`verify`（教材、笔记、决策流、本章总结各一次）、结构对照、路线图字节、`test-all`。
