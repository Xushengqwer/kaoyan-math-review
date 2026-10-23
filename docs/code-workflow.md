# 写代码、手工写数据：仓库地图、工具、流程 A～F

写网站代码、改样式，或要手工往数据文件里写内容（提交用户导出、写草稿、删卡合卡、换思维导图、清用户浏览器里的本机副本）时读这份。铁律、分工、审稿在 `CLAUDE.md`。

（2026-10-23 从原 `AGENTS.md`（2026-09-29 写给 Codex，10-09 起执行的人换成 Claude）和原 `CLAUDE.md` 搬来，原文没改，只改了互相引用的节号。下文写「你」的地方，指现在写网站的 Claude。）

## 1. 这是什么

- 考研数学一复习网站，纯静态（HTML + JS，没有构建步骤），GitHub Pages 自动部署 `main` 分支。
  - 仓库：https://github.com/Xushengqwer/kaoyan-math-review
  - 网址：https://xushengqwer.github.io/kaoyan-math-review/
- 三科：高等数学、线性代数、概率论与数理统计。每章若干张卡；每张卡有两块内容：
  - **教材内容**：数据文件里卡片的 `md` 字段；
  - **笔记**：`assets/data/notes.js` 里以卡片 id 为 key 的一条。
- 每章另有三件「章级产物」：决策流（`flow:<科目>/<章>`）、思维导图（`map:<科目>/<章>`，图片）、本章总结（`ch:<科目>/<章>`）。
- 用户是考研学生。网站上的笔记和总结大量是**用户自己的文字**，这是整个项目最重要的资产。

要动内容结构（合并、拆分、删卡）时，再读 `docs/architecture.md`（用户定的内容组织原则）。当前进度和待办见 `docs/status.md`。

## 2. 仓库地图

| 路径 | 内容 |
|---|---|
| `index.html`、`manifest.json` | 页面骨架 |
| `sw.js` | 离线缓存；`CACHE_NAME` 里的版本号每次发布都要 +1（`tools/bump-sw.cjs`） |
| `assets/js/app.js` | 全部界面与渲染（路由、章节页、目录、卡片、笔记编辑、站牌、位置条……） |
| `assets/js/katex-init.js` | 公式渲染与自定义宏（`\iddots`、`\centernot`） |
| `assets/js/storage.js` | 浏览器本地笔记；旧版本指纹比对 |
| `assets/css/style.css` | 样式（颜色变量在 `:root`，有深色模式） |
| `assets/data/{calculus,linalg,probability}.js` | `registerSubject({ id, name, chapters, items })` |
| `assets/data/notes.js` | `registerNotes({ key: 文本 })`，一行一条 |
| `assets/data/mindmaps.js` | 思维导图：`map:<科目>/<章>` → `{ path, name, type, size, sha256 }`；图片在 `assets/images/mindmaps/` |
| `assets/data/superseded.js` | 旧版本指纹，**由 `tools/supersede.cjs` 维护，不手改** |
| `tests/*.cjs` | node 测试，每个文件独立运行 |
| `tools/` | 写入、核对、体检工具（第 3 节） |
| `drafts/` | 待写入的草稿（见 `drafts/README.md`） |
| `docs/architecture.md` | 用户写的内容组织原则 |
| `docs/status.md` | 进度与待办 |
| `README.md`、`CONTENT_SCHEMA.md` | 早期文档，部分过时（如 `statement` 字段已改为 `md`），以本文件为准 |

数据细节：

- 章节：`{ id, name, order, modules: [{ no, name, brief }] }`。
- 卡片：`{ id, chapterId, type, types, module, card, title, md, tags }`；`md` 在数据文件里是单独一行 `      md: "…",`（JSON 字符串）。
- `notes.js` 的 key：卡片 id（卡片笔记）、`flow:<科目>/<章>`（决策流）、`ch:<科目>/<章>`（本章总结）。
- Markdown 约定（渲染在 `app.js` 的 `mdHtml` / `bookParts` / `noteMdHtml`）：
  - `### 〔定义〕`、`〔性质〕`、`〔例题〕`、`〔提示〕`、`### 意义` 是小节标题，自动上色；教材里的〔提示〕会移到卡片底部的提示区；
  - `==文字==` 显示为下划线（重点）；同一行里成对的 `**` 就加粗；
  - 单独一行、整行加粗、以圈号开头的行（如 `**⑤′ 另一种换法：配方法**`）是「站名行」，显示成站牌，目录里列出各站（第 4 章超级卡用）；
  - 列表外行首缩进 4 格会变成代码块（体检会报）。
- **卡片格子的记号**（2026-10-07 起，开了对照的 11 张超级卡）：教材和笔记原文里有看不见的记号行 `<!-- section:定义 -->`、`<!-- station:① -->`、`<!-- group:<id> -->`、`<!-- card:<id> -->`，单独一行、后面空一行。
  - 小节、站、分组、卡片的边界和对照配对**只认记号**（同一个 id = 同一张卡的教材、笔记两半）；卡片里写 `###`、`#### 2.`、`**① …**` 都只是排版。卡片编号按位置自动算，原文里的数字不用管、不要改。
  - 写这些卡的草稿（整段原文）必须原样保留记号行，不要改 id、不要自己编 id；`node tools/check.cjs` 和 `node tools/card-markers.cjs` 会查记号是否完整。
  - 用户在网站上用卡片右上角的「⋯」上移、下移、加卡、复制、删除，导出后照常走流程 B。

## 3. 工具

所有命令在仓库根目录运行，每个工具文件开头都有详细用法。出错时打印一行原因，退出码为 1。

| 命令 | 做什么 |
|---|---|
| `node tools/check.cjs` | 全站体检：KaTeX 严格解析、漏出的 `**` / `==` / `$`、意外代码块 |
| `node tools/check.cjs note\|book <草稿.md>` | 体检一份草稿 |
| `node tools/write.cjs note <key> <草稿.md>` | 把草稿逐字写进一条笔记（没有就新增），读回核对 |
| `node tools/write.cjs book <卡片id> <草稿.md>` | 把草稿逐字写进一张卡的教材，读回核对 |
| `node tools/verify.cjs note\|book <id> <草稿.md> [--rev HEAD]` | 逐字核对网站里的这一条和草稿是否完全相同 |
| `node tools/archive.cjs <输出.md> "<标题>" <条目>...` | 存档（取 git HEAD 版本，网站导出格式）；教材条目写 `book:<卡片id>`。HEAD 与 `origin/main` 不同（没拉取或有没推送的提交）时会拒绝 |
| `node tools/remove.cjs note\|item <id> --archived <存档.md>` | 删除一条笔记或一整张卡（先查存档） |
| `node tools/apply-export.cjs <导出文件.md> [--write]` | 提交用户从网站导出的修改；不加 `--write` 只预览 |
| `node tools/supersede.cjs` | 登记旧版本指纹（笔记、教材、思维导图），提交前必跑 |
| `node tools/card-markers.cjs [migrate [--write] <id>...]` | 卡片格子的记号：不带参数是核对；`migrate` 给对照卡加记号（逐卡核对显示不变，`--write` 才写入） |
| `node tools/bump-sw.cjs` | 缓存版本号 +1 |
| `node tools/test-all.cjs` | 全部测试（`tests/*.cjs`）+ 全站体检，提交前必跑 |
| `node tools/wait-live.cjs` | 推送后等到线上缓存版本号等于本地的，确认已上线 |
| `node tools/preview.cjs <输出.html> "<标题>" note\|book <草稿.md> "<小标题>" ...` | 生成草稿预览页（公式预渲染，可离线打开） |
| `node tools/mirror.cjs [镜像目录] [--rev HEAD\|work]` | 生成给 Antigravity 的只读镜像（默认 `E:\AI_lunwen\kaoyan-mirror`），推送后跑 |
| `node tools/apply-handoff.cjs <交稿.md \| 待提交目录>... [--write] [--id xxxx]` | 接 Antigravity 的交稿（追加意义例题 / 替换卡 / 重写站 / 替换本卡主线 / 删卡 / 删旧版），可一次接多份：查格式、存档、接到正确位置、写入；不加 `--write` 只预览 |
| `node tools/publish.cjs [--go \| --undo]` | 内容上线一条命令（2026-10-20 起由 Antigravity 跑）：接镜像 `待提交/` 里审过的稿 → supersede → bump-sw → test-all → 提交推送 → wait-live → mirror；不加参数只预览，失败就恢复原样；`--undo` 撤销最近一次 |
| `node tools/mindmap.cjs <内容.cjs> <输出.webp>` | 章节路线图（思维导图）由 Claude 用它画：内容文件在 `drafts/`，本机 Edge 截图、ffmpeg 转 webp |

草稿读入时只做三件事：去 BOM、CRLF 统一成 LF、去掉末尾空白。

## 4. 标准流程

### A. 把一份确认过的草稿写进网站（最常见）

用户会说：「把 `drafts/xxx.md` 写进 `<key 或卡片id>`」。

```bash
git pull --ff-only
node tools/check.cjs note drafts/xxx.md            # 教材用 book；有问题就停，报告用户
node tools/archive.cjs "C:\Users\许志火\Downloads\<科目>-<内容>存档（<原因>前）-<日期>.md" "<存档标题>" <key>   # 替换时才需要
node tools/write.cjs note <key> drafts/xxx.md      # 教材：node tools/write.cjs book <卡片id> drafts/xxx.md
node tools/supersede.cjs
node tools/bump-sw.cjs
node tools/test-all.cjs                            # 全部测试 + 全站体检
node tools/verify.cjs note <key> drafts/xxx.md
```

然后按第 5 节汇报；用户确认后提交（第 6 节）。

### B. 提交用户从网站导出的「待提交笔记 / 教材」文件

用户在网站上编辑后，会导出一个文件（在 Downloads 里，名字像「待提交笔记-日期.md」）。

1. `node tools/apply-export.cjs <文件>`：先预览，把每一条是「新增 / 替换 / 没变化」告诉用户。
2. 对要替换的条目先存档，再 `--write`。
3. `supersede` → `bump-sw` → `test-all`。体检报的格式问题只报告，不改用户的字。
4. **导出之外还要再改（删卡、改字、按用户要求删掉一部分）时，导出原文必须先单独提交一次。** 用户浏览器里存着和导出一字不差的本机副本；`supersede` 只登记 git HEAD 里出现过的版本。如果直接把「导出 + 你的改动」一起写进去，导出原文从没进过 HEAD，指纹就没登记，本机副本清不掉，用户刷新多少次看到的都是自己那份旧的（2026-10-09 `5e0fa2f` 就是这样）。正确顺序：
   - `apply-export --write` → `git commit`（只提交数据文件，不跑 supersede，不推送）；
   - 再做你的改动 → `supersede`（这时登记的就是导出原文）→ `bump-sw` → `test-all` → 提交；
   - 两次提交一起推送。
   - 核对：用 `storage.js` 的 `isSuperseded` 检查导出正文（笔记先 `Notes._norm`）返回 `true`。

#### 提交导出的固定步骤（原 CLAUDE.md）

1. `git -c http.proxy=http://127.0.0.1:7897 pull --ff-only`（git 走代理才连得上 GitHub）。
2. 先看导出改了哪些卡（按 `<!-- card:… -->` 切开比），并查每行 `$` 是否成对——用户从 Gemini 复制时偶尔会截断一行（表格行、公式到一半），截断会让后面的公式错位。
3. `node tools/archive.cjs` 存档 → `node tools/apply-export.cjs <文件> --write` → **导出原样单独提交一次**（流程 B 第 4 条）。
4. 有需要再做自己的改动（补截断行、删用户点名的内容、挪演示），然后 `supersede` → `bump-sw` → `test-all`。测试不写死当前内容的条数（10-20 起：具体条数只对钉住的那一版查，见 `tools/lib.cjs` 的 `PINNED`），内容变了不用改测试。
5. 推送后 `HTTPS_PROXY=http://127.0.0.1:7897 node tools/wait-live.cjs` 确认上线，再 `node tools/mirror.cjs` 更新只读镜像（见 `docs/content-pipeline.md`「镜像」）。
6. 我自己的数据修正（补条件、改错字），要等用户把这张卡的导出提交之后再做：用户浏览器里正在编辑的本机副本一导出，就会把我先改的冲掉（2026-10-14 分部积分那条就丢过一次）。还没做的写进 status.md 待办。

#### 用户直接贴 Gemini 原文（2026-10-15～17 意义、例题这么交；现在走草稿箱，见 `docs/content-pipeline.md`）

网页里贴新卡容易出错（⋯「在下面加一张」的格子里，记号行和标题粘成一行，整条就看不见了），所以意义、例题由用户把 Gemini 的原文贴在对话里，我来接：

1. 先审稿：数学、前提条件、旧版要点有没有压丢，只提会让用户做错题的问题；改不改由用户定（转给 Gemini，或交给我改几个字）。
2. 原文原样落成文件，接在这一节末尾：意义接在〔意义〕最后，例题接在〔例题〕最后，`#### n.` 和 `#### 例题 n：` 前面各加一行同一个新 id 的 `<!-- card:xxxx -->`（照第 2、3 章的样子，后面空一行）。
3. 删掉 Gemini 引用附件留下的 `[cite: 1]` 标记（网站上会原样显示），其他一字不改，提交说明里写删了几处。
4. `check` → `archive` → `write.cjs` → `card-markers.cjs` 核对 → `supersede` → `bump-sw` → `test-all` → 提交、推送、`wait-live`。
5. 用户先在网站上本地保存看效果、再把原文贴给我时，我提交的版本只要和那份本机副本不一字相同（改了字、重排了卡），本机副本就会一直盖住仓库版。省事的清法（2026-10-17 用过）：请用户点「导出」，比对导出里有没有仓库没有的内容（只差第⑤站旧结构和一句已改的话）→ 导出原样提交一次 → 立刻用 write.cjs 写回仓库版、`supersede`（核对 isSuperseded 为 true）→ 两次一起推送，用户刷新后本机副本自动清掉。
6. 用户浏览器里如果还留着贴坏的本机副本，会盖住仓库版。整卡「用仓库版」那一栏是用户要求隐藏的（10-06），找不到入口时：先逐行比本机和仓库版，确认没有仓库里没有的内容，问过用户、得到同意后，在用户的 Chrome 里运行 `BookEdits.reset(id); Notes.set(id, "")`，再刷新。

### C. 删卡、合并卡（结构调整）

只按用户确认过的迁移表做（迁移表由 Claude 出，见 `docs/architecture.md` §4）。

1. 存档所有要删或要替换的条目：教材写 `book:<id>`，笔记写 key。
2. 用 `remove.cjs` 删除，用 `write.cjs` 写入新内容。
3. 章节名、模块名（`chapters[].modules`）的改动只动那一行，改完用 `node -e` 读回核对。
4. `supersede` → `bump-sw` → `test-all`。有测试断言卡片数量的，只在用户确认结构改动后才更新测试。

### D. 换思维导图

1. 新图片放到 `assets/images/mindmaps/<科目>-<章>-<sha256 前 12 位>.<扩展名>`。
2. 在 `mindmaps.js` 里只改这一条的 `{ path, name, type, size, sha256 }`。
3. `git rm` 旧图片。
4. `supersede`（会登记旧图的 sha256）→ `bump-sw`。
5. 图上的错字要报告用户，不要自己在图上改。

### E. 网站功能、排版（写代码）

1. 先报计划：改哪些文件、界面长什么样。等用户说「开始」。（用户指出的 bug、几行的小修复不走这里，走 F。）
2. 主要改 `assets/js`、`assets/css`、`index.html`；配套可以改：`tests/`（新增或更新测试）、`sw.js`（只用 `bump-sw` 升版本号）、`docs/status.md`（更新进度）。**不动数据文件的内容**（`assets/data/*.js`）。
3. 仿照 `tests/` 里的写法加测试；显示层的改动要有「原文不变」的测试（例：`tests/station-bars.cjs`）。
4. 自检：
   - 桌面宽度，以及手机宽度 375px 下没有横向溢出；
   - 深色模式；
   - 浏览器控制台无报错；
   - 其他章节不受影响。
5. `bump-sw`。

### F. 小修直通（用户说清楚了要改什么的小修复）

用户嫌慢：一个删 3 个空格、改 3 行跳转代码的修复，等计划、等确认，从开工到上线拖了半天（2026-10-10）。小修复以快为先，事后发现问题再修。

- **适用**：用户点名的具体问题、改法明确。例：右侧目录点了不跳转、标题显示出多余的 `####`、几行代码的 bug、只改格式不改字的数据修正（删行首多余空格、修 `$$`）。
- **不适用**（照常先报计划）：新功能、界面改版、内容结构调整（删卡、合并、重排）、改用户的字。

做法：

1. 不报计划，直接做。动数据文件的照常先存档、只用工具写入（铁律 1、6 不变）。
2. 能加测试就加一个能复现问题的测试。
3. 自检只看受影响的地方；改了布局或样式才查 375px 手机和深色模式。
4. `bump-sw` → `test-all` 全部通过 → 直接提交、推送、`wait-live` 确认上线 → 按第 5 节汇报。
5. 够用就行：不要为一个小修复调用一整套方法（系统排查、头脑风暴、测试驱动开发……）。

**所有流程（A 到 F）提交前都要跑 `node tools/test-all.cjs`，全部通过才能提交。**

### 两栏长度要对齐（用户的固定要求，只管〔定义〕〔性质〕）

意义、例题从 2026-10-15 起不分两栏：意义 n 在上、例题 n 在下，各占满格（`.dual-row.is-stack`），长度不用对齐。

- 每次提交后量一遍：在用户的 Chrome（Claude in Chrome）打开线上网站，刷新两三次越过离线缓存，注入 `.dual-row{grid-template-columns:380px 704px!important}` 模拟桌面两栏，取每个 `.dual-cell` 里最低元素的底部当内容高度。
- 笔记明显比教材长（差距明显超过一个横幅约 360px）时，把笔记里的一段演示 / 对照表挪到教材这张卡末尾，前面单独一行 `###### 🧮 推导演示：……（和右边笔记对称）`（六级标题由 CSS 显示成大留白 + 三支向下箭头的过渡横幅）。只去掉挪走小节的编号、顺延笔记里后面的编号，文字不改。每张卡挑一段让两边最接近的。

## 5. 汇报格式

写给用户看，用中文，简洁：

- 做了什么：改了哪些文件、哪些条目；
- 核对：`verify` 的结果（逐字一致 / 不一致在哪）、测试、全站体检；
- 存档放在哪；
- 缓存版本号；
- 没解决的问题、需要用户决定的事。

## 6. 提交与上线

```bash
git pull --ff-only
git add <本次改动的文件>
git commit -m "<中文一句话概括>" -m "- 要点 1
- 要点 2"
git push
```

推送后 GitHub Pages 大约 1 分钟更新。用 `node tools/wait-live.cjs` 确认上线：它会等到线上的缓存版本号等于刚升的那个。之后用户在手机上刷新一两次就能看到。

## 7. 本地预览

```bash
npx http-server . -p 5175 -c-1
```

打开 http://localhost:5175/#linalg/eigen（`#科目/章`）。网站有离线缓存（service worker），本地调试看不到新改动时，在浏览器开发者工具里注销 service worker，或用无痕窗口。
