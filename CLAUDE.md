@AGENTS.md

## Claude 在这个仓库里的角色（2026-10-14 起）

AGENTS.md 原本写给 Codex。Codex 从 2026-10-09 起不用了，其中的工具、流程（A～F）、铁律照样适用，执行的人换成 Claude。现在的分工：

- **内容由 Gemini 写**（Gemini 网页版，Gemini 4）。用户和它逐站推敲到看懂，把成品贴进网站、导出「待提交笔记与教材-日期.md」给 Claude。
- **Claude 负责落地和代码**：提交导出、整理排版、网站功能、测试、上线；审稿只提会让用户做错题的问题（漏条件、结论错、逻辑反了），文风不挑。
- 先读：`docs/learning-method.md`（用户的学习方法，给 Gemini 的提示词也在里面）、`docs/status.md`（进度）、`docs/prompts.md`（用户写过的提示词）。

## 提交导出的固定步骤

1. `git -c http.proxy=http://127.0.0.1:7897 pull --ff-only`（git 走代理才连得上 GitHub）。
2. 先看导出改了哪些卡（按 `<!-- card:… -->` 切开比），并查每行 `$` 是否成对——用户从 Gemini 复制时偶尔会截断一行（表格行、公式到一半），截断会让后面的公式错位。
3. `node tools/archive.cjs` 存档 → `node tools/apply-export.cjs <文件> --write` → **导出原样单独提交一次**（流程 B 第 4 条）。
4. 有需要再做自己的改动（补截断行、删用户点名的内容、挪演示），然后 `supersede` → `bump-sw` → `test-all`；卡片数变了就改 `tests/station-cards.cjs`、`tests/dual-track.cjs` 里的数字。
5. 推送后 `HTTPS_PROXY=http://127.0.0.1:7897 node tools/wait-live.cjs` 确认上线。

## 两栏长度要对齐（用户的固定要求）

- 每次提交后量一遍：在用户的 Chrome（Claude in Chrome）打开线上网站，刷新两三次越过离线缓存，注入 `.dual-row{grid-template-columns:380px 704px!important}` 模拟桌面两栏，取每个 `.dual-cell` 里最低元素的底部当内容高度。
- 笔记明显比教材长（差距明显超过一个横幅约 360px）时，把笔记里的一段演示 / 对照表挪到教材这张卡末尾，前面单独一行 `###### 🧮 推导演示：……（和右边笔记对称）`（六级标题由 CSS 显示成大留白 + 三支向下箭头的过渡横幅）。只去掉挪走小节的编号、顺延笔记里后面的编号，文字不改。每张卡挑一段让两边最接近的。

## 其他

- 给 Gemini 的素材包：`node tools/pack.cjs <卡片id> [输出] --only 定义,性质 --deps 1,2`（`--deps` 只带依赖章，Gemini 网页版长文件会被截断；同一个对话里补发某几个小节用 `--deps none`，不重复带前面几章）。
- 用户的 Gemini / AI Studio 对话可以用 Claude in Chrome 读（只读，不替用户发消息；历史列表里别的对话不打开、不提）。
- 章节路线图（思维导图）由 Claude 画：`drafts/<科目>-<章>-mindmap-v<N>.cjs` + `node tools/mindmap.cjs`。
