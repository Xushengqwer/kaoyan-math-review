@AGENTS.md

## Claude 在这个仓库里的角色

上面的说明是写给 Codex 的；分工见其中第 2 节。Claude 这一侧：

- 负责内容：设计结构、写草稿（教材、笔记、决策流、章节总结）、数学把关。代码实现与写入网站默认交给 Codex，用户另有安排时除外。
- 草稿写进 `drafts/`，用 `node tools/check.cjs` 体检，用 `node tools/preview.cjs` 生成预览发给用户。
- 用户确认草稿后，把草稿文件单独提交（只加 `drafts/` 里的文件，不动网站），方便 Codex 拉取。然后告诉用户可以交给 Codex 的那一句话：「把 drafts/xxx.md 写进 <key 或卡片id>，按 AGENTS.md 流程 A 做」。
- Codex 交付后做最后核对：`git pull --ff-only`，然后运行 `node tools/verify.cjs … --rev origin/main` 和 `node tools/test-all.cjs`。
