# 工作说明（给 Codex）

开工前读完本文件。要动内容结构（合并、拆分、删卡）时，再读 `docs/architecture.md`（用户定的内容组织原则）。当前进度和待办见 `docs/status.md`。

## 1. 这是什么

- 考研数学一复习网站，纯静态（HTML + JS，没有构建步骤），GitHub Pages 自动部署 `main` 分支。
  - 仓库：https://github.com/Xushengqwer/kaoyan-math-review
  - 网址：https://xushengqwer.github.io/kaoyan-math-review/
- 三科：高等数学、线性代数、概率论与数理统计。每章若干张卡；每张卡有两块内容：
  - **教材内容**：数据文件里卡片的 `md` 字段；
  - **笔记**：`assets/data/notes.js` 里以卡片 id 为 key 的一条。
- 每章另有三件「章级产物」：决策流（`flow:<科目>/<章>`）、思维导图（`map:<科目>/<章>`，图片）、本章总结（`ch:<科目>/<章>`）。
- 用户是考研学生。网站上的笔记和总结大量是**用户自己的文字**，这是整个项目最重要的资产。

## 2. 分工

| 谁 | 做什么 |
|---|---|
| 用户 | 确认每一份草稿；决定改不改、提交不提交 |
| Claude（另一个 AI） | 设计内容结构，写草稿（教材、笔记、决策流、章节总结），数学把关；交付前用 `tools/verify.cjs` 做最后的逐字核对 |
| Codex（你） | 把用户确认过的草稿写进网站；删卡、合并卡；换思维导图；提交用户从网站导出的修改；网站功能与排版代码；跑检查、提交、推送 |

**你不写、不改任何数学内容和用户的文字。** 草稿或导出文件里发现问题（错字、公式报错、漏出的 `**`），只报告，由用户决定怎么改。

## 3. 铁律

1. **逐字一致**：写进网站的文字必须与用户确认过的文件逐字相同。只用 `tools/write.cjs` / `tools/apply-export.cjs` 写入，**不要手工编辑数据文件里的正文**，也不要用任何方式整体重写数据文件。
2. **编码**：一律 UTF-8、无 BOM。数据文件的换行符有 CRLF 也有 LF，工具会保持原样。不要用会改编码或换行的命令写文件（例如 PowerShell 的 `Set-Content`、`Out-File` 默认编码）。看到乱码或 `U+FFFD`，立刻停下报告。
3. **大文件不整读**：`assets/data/*.js`（尤其 `notes.js`、`linalg.js`）不要整文件读进上下文，用 `grep`，或用 `node -e` 配合 `tools/lib.cjs` 按 id 取。
4. **先报计划，后动手**：任务不是「把某个已确认的文件写进去」这种明确操作时，先报计划，等用户回复「开始」。
5. **先汇报，后提交**：改完先自检、先汇报，等用户确认再提交；除非用户在任务里明确说「写完直接提交」。
6. **先存档，后替换或删除**：替换或删除任何笔记、教材之前，用 `tools/archive.cjs` 存档；删除只用 `tools/remove.cjs`（没有存档它会拒绝）。
7. **先拉取**：开工前、提交前都 `git pull --ff-only`。Claude 也往这个仓库提交；只在 `main` 上工作，除非用户另说。
   - 如果工作区有未提交的改动，挡住了拉取：不要 `stash`、`reset`、`checkout` 丢弃它。先把改动的内容备份到仓库外的文件并逐字核对，然后报告用户是哪些改动、备份在哪，等用户同意后再撤下。
8. **一次提交只做一件事**，只 `git add` 本次改动的文件。

## 4. 仓库地图

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
| `tools/` | 写入、核对、体检工具（第 5 节） |
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

## 5. 工具

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
| `node tools/bump-sw.cjs` | 缓存版本号 +1 |
| `node tools/test-all.cjs` | 全部测试（`tests/*.cjs`）+ 全站体检，提交前必跑 |
| `node tools/wait-live.cjs` | 推送后等到线上缓存版本号等于本地的，确认已上线 |
| `node tools/preview.cjs <输出.html> "<标题>" note\|book <草稿.md> "<小标题>" ...` | 生成草稿预览页（公式预渲染，可离线打开） |
| `node tools/mindmap.cjs <内容.cjs> <输出.webp>` | 章节路线图（思维导图）由 Claude 用它画：内容文件在 `drafts/`，本机 Edge 截图、ffmpeg 转 webp |

草稿读入时只做三件事：去 BOM、CRLF 统一成 LF、去掉末尾空白。

## 6. 标准流程

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

然后按第 7 节汇报；用户确认后提交（第 8 节）。

### B. 提交用户从网站导出的「待提交笔记 / 教材」文件

用户在网站上编辑后，会导出一个文件（在 Downloads 里，名字像「待提交笔记-日期.md」）。

1. `node tools/apply-export.cjs <文件>`：先预览，把每一条是「新增 / 替换 / 没变化」告诉用户。
2. 对要替换的条目先存档，再 `--write`。
3. `supersede` → `bump-sw` → `test-all`。体检报的格式问题只报告，不改用户的字。

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

1. 先报计划：改哪些文件、界面长什么样。等用户说「开始」。
2. 主要改 `assets/js`、`assets/css`、`index.html`；配套可以改：`tests/`（新增或更新测试）、`sw.js`（只用 `bump-sw` 升版本号）、`docs/status.md`（更新进度）。**不动数据文件的内容**（`assets/data/*.js`）。
3. 仿照 `tests/` 里的写法加测试；显示层的改动要有「原文不变」的测试（例：`tests/station-bars.cjs`）。
4. 自检：
   - 桌面宽度，以及手机宽度 375px 下没有横向溢出；
   - 深色模式；
   - 浏览器控制台无报错；
   - 其他章节不受影响。
5. `bump-sw`。

**所有流程（A 到 E）提交前都要跑 `node tools/test-all.cjs`，全部通过才汇报、才提交。**

## 7. 汇报格式

写给用户看，用中文，简洁：

- 做了什么：改了哪些文件、哪些条目；
- 核对：`verify` 的结果（逐字一致 / 不一致在哪）、测试、全站体检；
- 存档放在哪；
- 缓存版本号；
- 没解决的问题、需要用户决定的事。

## 8. 提交与上线

```bash
git pull --ff-only
git add <本次改动的文件>
git commit -m "<中文一句话概括>" -m "- 要点 1
- 要点 2"
git push
```

推送后 GitHub Pages 大约 1 分钟更新。用 `node tools/wait-live.cjs` 确认上线：它会等到线上的缓存版本号等于刚升的那个。之后用户在手机上刷新一两次就能看到。

## 9. 本地预览

```bash
npx http-server . -p 5175 -c-1
```

打开 http://localhost:5175/#linalg/eigen（`#科目/章`）。网站有离线缓存（service worker），本地调试看不到新改动时，在浏览器开发者工具里注销 service worker，或用无痕窗口。
