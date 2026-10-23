# 内容流水线：Gemini 写、Claude 审、Antigravity 上线

要查流水线细节时读这份：镜像和 `共同维护/` 怎么同步、AI Studio 的开场白和素材包怎么打包、`publish.cjs` 每一步做什么（用户转来 publish 报错时）、方向文件、给 Gemini 的开场白和素材包、读用户的 Gemini 对话、画章节路线图。审稿步骤和我管的事在 `CLAUDE.md`；Gemini 那边的规矩在 `docs/mirror-gemini.md`（镜像的 `GEMINI.md`）。

（2026-10-23 从原 `CLAUDE.md`「Claude 在这个仓库里的角色」「Gemini 写稿、我审稿」「其他」和原 `AGENTS.md`「分工」搬来，原文没改。）

## 分工是怎么变过来的（历史）

原 `CLAUDE.md`（2026-10-14 起）：

> AGENTS.md 原本写给 Codex。Codex 从 2026-10-09 起不用了，其中的工具、流程（A～F）、铁律照样适用，执行的人换成 Claude。现在的分工：
>
> - **内容由 Gemini 写**（Gemini 4）。10-17 起在 Antigravity 里读镜像写，见下面「Gemini 写稿、我审稿」；10-19 起 Antigravity 里的 Gemini 4 额度用完，改在 Google AI Studio 写、Antigravity 只存档（见下面「写稿在 AI Studio」）；之前在网页版：用户和它逐站推敲到看懂，把成品贴进网站、导出「待提交笔记与教材-日期.md」给 Claude。
> - **Claude 负责审稿和代码**：审稿只提会让用户做错题的问题（漏条件、结论错、逻辑反了），文风不挑；网站功能、排版、结构改动、测试、处理上线报错。**内容上线**（2026-10-20 起）由 Antigravity 里的模型跑 `tools/publish.cjs`，不用我（见下面「上线」）。
> - 先读：`docs/learning-method.md`（用户的学习方法，给 Gemini 的提示词也在里面）、`docs/status.md`（进度）、`docs/prompts.md`（用户写过的提示词）。

原 `AGENTS.md`「分工」（2026-10-14 那一版）：

| 谁 | 做什么 |
|---|---|
| 用户 | 和 Gemini 推敲内容，贴进网站后导出；决定改不改、提交不提交 |
| Gemini（网页版） | 写内容：教材、笔记、意义、例题（2026-10-14 起） |
| Claude | 代码实现与审稿：提交用户导出、整理排版、网站功能与样式、测试、上线；审稿只提会让人做错题的问题 |

（Codex 2026-10-09 起不再参与。）

## Gemini 写稿、我审稿（2026-10-17 起；上线 10-20 起交给 Antigravity）

Gemini 4 在 Antigravity 里读镜像写稿（它额度够），规矩在镜像根目录的 `GEMINI.md`（Antigravity 每个对话自动读）；**审稿是我**（10-17 晚起：Antigravity 里的 Claude 额度只够几次对话），**上线由 Antigravity 跑 `tools/publish.cjs`**（10-20 起，见下面「上线」）。稿子、意见都走文件：Gemini 把稿写进 `待提交/`，我把意见写进镜像的 `审稿意见/`（和稿子同名），用户告诉 Gemini 去读、它改文件（写稿在 AI Studio 时，见下面「写稿在 AI Studio」）。不让用户复制长稿——复制会截断一行，改稿后我也没法只看改动；意见也不让用户从对话里复制（10-18：公式一复制就乱码）。

- **镜像** `E:\AI_lunwen\kaoyan-mirror`：`node tools/mirror.cjs` 从 HEAD 生成——`GEMINI.md`（写稿守则，正本 `docs/mirror-gemini.md`，我维护）、全部章节的可读 markdown（记号行保留）、只读的 `规矩/`（学习方法、网站排版规则 `docs/site-format.md`、内容组织原则、进度）。**每次推送后都要重新生成**；`待提交/`、`共同维护/`、`审稿意见/` 从不删。网站显示规则变了就改 `docs/site-format.md`，GEMINI.md「格式规矩」的摘要跟着改。
- **共同维护**（镜像里的 `共同维护/设计口味.md`、`写作格式要求.md`）：**正本在镜像里**，用户和 Gemini 直接改；`mirror.cjs` 发现和仓库的 `docs/reviewer-taste.md`、`docs/gemini-kickoff.md` 不一样就抄回仓库（会打印「要提交」），跟下一次提交一起存档。我要改这两份时也改镜像里的，别直接改仓库那份（下次生成会被镜像版盖掉）。
- **一份稿子的流程**（Gemini 那边的几步写在 GEMINI.md）：Gemini 和用户推敲完 → 自查 → 写进 `待提交/`（草稿箱）→ 用户来找我审 → 我写进 `审稿意见/`，用户叫 Gemini 去读、改 → 审过的由用户叫 Antigravity 跑 publish.cjs 上线。用户直接把 Gemini 原文贴给我也行：我照交稿格式存进 `待提交/`，后面一样。
- **写稿在 AI Studio**（10-19 起，第 5 章〔意义〕〔例题〕开始）：Google AI Studio 的 Gemini 4 额度无限，但读不到镜像、不读 GEMINI.md，所以它要的东西打包成两份文件给用户上传（第 5 章的在 Downloads：「给Gemini的开场白-高等数学第5章-意义例题（AI Studio）.md」「Gemini素材-高等数学第5章-意义例题.md」）。
  - 开场白 = `docs/gemini-kickoff.md` 第二段为底 + `learning-method.md` 两段「给 AI 的版本」原样 + 怎么做（先等用户主线草稿 → 定方向、方向存成 `共同维护/<章>-意义例题方向.md` → 一次一个方向）+「定稿的样子」（代码块外写文件名、说明两行，意义、例题各一个代码块，不带文件头和分段行）+ GEMINI.md 的格式规矩、内容规矩（去掉只管〔定义〕〔性质〕那条）、交稿前自查、踩过的坑 + `设计口味.md` 全文。素材 `pack.cjs --only 定义,性质,意义,例题 --deps none`，再在开头和旧〔意义〕〔例题〕前标明哪些是旧版。第 5 章这两份是临时脚本拼的，下一章要用时再做进 `tools/kickoff.cjs`。
  - 定稿由用户贴给 Antigravity 里不限额的模型，它只照 GEMINI.md「写稿在 AI Studio 时」存档：在 `待提交/` 建文件，加 `卡片:`、`操作: 追加意义例题`、`说明:` 开头和 `<!-- 意义 -->`/`<!-- 例题 -->` 分段行，正文一字不改；改稿覆盖同名文件，「Gemini 回复」写进审稿意见那一轮。
  - 审稿照旧：意见写进镜像 `审稿意见/<稿子同名>.md`，用户把这份文件上传给 AI Studio。审稿时新记的「踩过的坑」AI Studio 那边看不到，同时写进这一轮意见里。
- **审稿**：步骤在 `CLAUDE.md`「审稿」。
- **上线**（2026-10-20 起由 Antigravity 跑 `tools/publish.cjs`，不用我）：Antigravity 照 GEMINI.md「上线」只跑 `node E:\AI_lunwen\kaoyan-math-review\tools\publish.cjs`（预览），用户同意后才跑 `--go` / `--undo`；不改仓库文件、不跑 git 和别的工具，报错就停、把最后几行原样给用户。
  - `--go` 一次跑完：开工检查（main、已跟踪文件没改动、走代理 pull、`待提交/` 按文件名排在前面、`drafts/审过/` 一字不差、没有（待写）的才上）→ 存档 + `apply-handoff --write` → `supersede` → `bump-sw` → `test-all` → 只提交数据文件、`superseded.js`、`sw.js`（和 mirror 抄回的共同维护）→ 走代理推送 → `wait-live` → `mirror` → 方向文件「**进度**」补一句。推送前任何一步失败：恢复原样、交稿挪回 `待提交/`；推送后失败只报告。`--undo` 撤销最近一次 publish 提交（数据文件回到上线前，缓存照样 +1）。
  - 我管的、测试不写死当前内容：见 `CLAUDE.md`「上线出事时」。
- 删卡、整节删掉旧版〔意义〕〔例题〕〔提示〕也走交稿（操作 `删卡`、`删旧版`，格式见 GEMINI.md「交稿格式」，照样审过再上）；重写站要改站名写开头 `站名:`。合卡、改站的划分这类结构改动不走交稿，用户直接找我。

## 其他

- 给 Gemini 的开场白（网页版用；Antigravity 里直接用镜像的 `共同维护/写作格式要求.md`，规矩由 GEMINI.md 自动带上；AI Studio 用的见上面「写稿在 AI Studio」）：`node tools/kickoff.cjs <卡片id>` → Downloads/给Gemini的开场白-高等数学第N章.md（模板 `docs/gemini-kickoff.md`，分〔定义〕〔性质〕和〔意义〕〔例题〕两段；学习方法从 learning-method.md 原样抽，不手抄）。
- 给 Gemini 的素材包：`node tools/pack.cjs <卡片id> [输出] --only 定义,性质 --deps 1,2`（`--deps` 只带依赖章，Gemini 网页版长文件会被截断；同一个对话里补发某几个小节用 `--deps none`，不重复带前面几章）。
- 用户的 Gemini / AI Studio 对话可以用 Claude in Chrome 读（只读，不替用户发消息；历史列表里别的对话不打开、不提）。
- 章节路线图（思维导图）由 Claude 画：`drafts/<科目>-<章>-mindmap-v<N>.cjs` + `node tools/mindmap.cjs`。
