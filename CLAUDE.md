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
5. 推送后 `HTTPS_PROXY=http://127.0.0.1:7897 node tools/wait-live.cjs` 确认上线，再 `node tools/mirror.cjs` 更新只读镜像（见下面「Antigravity 交稿」）。
6. 我自己的数据修正（补条件、改错字），要等用户把这张卡的导出提交之后再做：用户浏览器里正在编辑的本机副本一导出，就会把我先改的冲掉（2026-10-14 分部积分那条就丢过一次）。还没做的写进 status.md 待办。

## 用户直接贴 Gemini 原文（2026-10-15 起，意义、例题都这么交）

网页里贴新卡容易出错（⋯「在下面加一张」的格子里，记号行和标题粘成一行，整条就看不见了），所以意义、例题由用户把 Gemini 的原文贴在对话里，我来接：

1. 先审稿：数学、前提条件、旧版要点有没有压丢，只提会让用户做错题的问题；改不改由用户定（转给 Gemini，或交给我改几个字）。
2. 原文原样落成文件，接在这一节末尾：意义接在〔意义〕最后，例题接在〔例题〕最后，`#### n.` 和 `#### 例题 n：` 前面各加一行同一个新 id 的 `<!-- card:xxxx -->`（照第 2、3 章的样子，后面空一行）。
3. 删掉 Gemini 引用附件留下的 `[cite: 1]` 标记（网站上会原样显示），其他一字不改，提交说明里写删了几处。
4. `check` → `archive` → `write.cjs` → `card-markers.cjs` 核对 → 改测试里的数字（`tests/station-cards.cjs`、`tests/detached-applications.cjs`、`tests/dual-track.cjs`；第 3 章还有 `tests/app-stack.cjs` 的顺序）→ `supersede` → `bump-sw` → `test-all` → 提交、推送、`wait-live`。
5. 用户先在网站上本地保存看效果、再把原文贴给我时，我提交的版本只要和那份本机副本不一字相同（改了字、重排了卡），本机副本就会一直盖住仓库版。省事的清法（2026-10-17 用过）：请用户点「导出」，比对导出里有没有仓库没有的内容（只差第⑤站旧结构和一句已改的话）→ 导出原样提交一次 → 立刻用 write.cjs 写回仓库版、`supersede`（核对 isSuperseded 为 true）→ 两次一起推送，用户刷新后本机副本自动清掉。
6. 用户浏览器里如果还留着贴坏的本机副本，会盖住仓库版。整卡「用仓库版」那一栏是用户要求隐藏的（10-06），找不到入口时：先逐行比本机和仓库版，确认没有仓库里没有的内容，问过用户、得到同意后，在用户的 Chrome 里运行 `BookEdits.reset(id); Notes.set(id, "")`，再刷新。

## Antigravity 交稿（2026-10-17 起）

写稿、审稿都在 Antigravity 里做（Gemini 写，单独一个 Claude 对话审），我只管落地和代码。

- **镜像** `E:\AI_lunwen\kaoyan-mirror`：`node tools/mirror.cjs` 从 HEAD 生成——全部章节的可读 markdown（记号行保留）、只读的 `规矩/`（学习方法、网站排版规则 `docs/site-format.md`、内容组织原则、进度）、给 Antigravity 的 README（`docs/mirror-readme.md`）。**每次推送后都要重新生成**；`待提交/`、`共同维护/` 从不删。网站显示规则变了就改 `docs/site-format.md`。
- **共同维护**（镜像里的 `共同维护/设计口味.md`、`写作格式要求.md`）：**正本在镜像里**，用户和 Antigravity 直接改；`mirror.cjs` 发现和仓库的 `docs/reviewer-taste.md`、`docs/gemini-kickoff.md` 不一样就抄回仓库（会打印「要提交」），跟下一次提交一起存档。我要改这两份时也改镜像里的，别直接改仓库那份（下次生成会被镜像版盖掉）。
- **交稿**：Antigravity 把定稿放进 `待提交/`，开头写 卡片、操作（`追加意义例题` / `替换卡` + 记号）。用户说「提交待提交里的 ××」或「提交待提交」时：
  1. `node tools/apply-handoff.cjs <文件或 待提交 目录>` 预览：给目录就接里面所有 .md（按文件名排序），先全部体检（记号行、反引号、HTML、[cite]、KaTeX、$ 成对、标题格式、⚠️ 前的 ---），有 ✗ 就一份都不写，告诉用户哪里要改。
  2. `--write`：每张卡存档一次（Downloads）、生成新记号、依次接到〔意义〕/〔例题〕末尾（〔提示〕前的 --- 之前）或换掉那张卡，用 write.cjs 写入，交稿文件挪进 `待提交/已提交/`。
  3. 追加了几对就改测试条数（`tests/station-cards.cjs`、`detached-applications.cjs`、`dual-track.cjs`，第 4 章还有 `app-stack.cjs` 的目录断言）→ `supersede` → `bump-sw` → `test-all` → 提交推送 → `wait-live` → `mirror`。
- 交稿说「已审」时，我不再逐步重算数学，只看工具查出来的；读到明显不对的地方照样说。删卡、合卡、整节换掉这类结构改动不走交稿，用户直接找我。
- **省额度**：用户可以在 Antigravity 攒几份一起交，一次提交；接稿最好在新开的会话里做（规矩都在这里和记忆里，不用带着很长的历史）。

## 两栏长度要对齐（用户的固定要求，只管〔定义〕〔性质〕）

意义、例题从 2026-10-15 起不分两栏：意义 n 在上、例题 n 在下，各占满格（`.dual-row.is-stack`），长度不用对齐。

- 每次提交后量一遍：在用户的 Chrome（Claude in Chrome）打开线上网站，刷新两三次越过离线缓存，注入 `.dual-row{grid-template-columns:380px 704px!important}` 模拟桌面两栏，取每个 `.dual-cell` 里最低元素的底部当内容高度。
- 笔记明显比教材长（差距明显超过一个横幅约 360px）时，把笔记里的一段演示 / 对照表挪到教材这张卡末尾，前面单独一行 `###### 🧮 推导演示：……（和右边笔记对称）`（六级标题由 CSS 显示成大留白 + 三支向下箭头的过渡横幅）。只去掉挪走小节的编号、顺延笔记里后面的编号，文字不改。每张卡挑一段让两边最接近的。

## 其他

- 给 Gemini 的开场白：`node tools/kickoff.cjs <卡片id>` → Downloads/给Gemini的开场白-高等数学第N章.md（模板 `docs/gemini-kickoff.md`，分〔定义〕〔性质〕和〔意义〕〔例题〕两段；学习方法从 learning-method.md 原样抽，不手抄）。
- 给 Gemini 的素材包：`node tools/pack.cjs <卡片id> [输出] --only 定义,性质 --deps 1,2`（`--deps` 只带依赖章，Gemini 网页版长文件会被截断；同一个对话里补发某几个小节用 `--deps none`，不重复带前面几章）。
- 用户的 Gemini / AI Studio 对话可以用 Claude in Chrome 读（只读，不替用户发消息；历史列表里别的对话不打开、不提）。
- 章节路线图（思维导图）由 Claude 画：`drafts/<科目>-<章>-mindmap-v<N>.cjs` + `node tools/mindmap.cjs`。
