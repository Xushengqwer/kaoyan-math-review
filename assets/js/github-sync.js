// 把大白话笔记同步到 GitHub 仓库（浏览器直连 GitHub REST API）。
//
// 安全说明：
//   本项目是纯静态站，没有后端，所以令牌只能保存在你自己浏览器的 localStorage 里。
//   令牌永远不会被写进仓库、不会随代码提交、不会发给除 api.github.com 以外的任何地方。
//   建议使用「细粒度个人访问令牌」，仅授权本仓库、仅给 Contents: Read and write 权限，并设置过期时间。

const GitHubSync = {
  CFG_KEY: "kaoyan_gh_cfg_v1",
  TOKEN_KEY: "kaoyan_gh_token_v1",
  PATH: "assets/data/notes.js",

  // 部署在 <用户名>.github.io/<仓库名>/ 上时自动推断出仓库信息
  guessConfig() {
    const saved = this.getConfig();
    if (saved.owner && saved.repo) return saved;
    const m = location.hostname.match(/^([^.]+)\.github\.io$/i);
    if (m) {
      const seg = location.pathname.split("/").filter(Boolean)[0];
      return { owner: m[1], repo: seg || m[1] + ".github.io", branch: saved.branch || "main" };
    }
    return { owner: saved.owner || "", repo: saved.repo || "", branch: saved.branch || "main" };
  },

  getConfig() {
    try {
      return JSON.parse(localStorage.getItem(this.CFG_KEY)) || {};
    } catch (e) {
      return {};
    }
  },

  setConfig(cfg) {
    try { localStorage.setItem(this.CFG_KEY, JSON.stringify(cfg)); } catch (e) {}
  },

  getToken() {
    try { return localStorage.getItem(this.TOKEN_KEY) || ""; } catch (e) { return ""; }
  },

  setToken(t) {
    try {
      if (t) localStorage.setItem(this.TOKEN_KEY, t);
      else localStorage.removeItem(this.TOKEN_KEY);
    } catch (e) {}
  },

  hasToken() { return !!this.getToken(); },

  // ---- UTF-8 安全的 base64（btoa 不支持中文，必须先转字节） ----
  b64encode(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    bytes.forEach((b) => { bin += String.fromCharCode(b); });
    return btoa(bin);
  },

  b64decode(b64) {
    const bin = atob((b64 || "").replace(/\s/g, ""));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  },

  // 把笔记对象渲染成一个合法的 notes.js 文件
  renderFile(notesObj) {
    return (
      "// 大白话笔记 —— 由网页端「同步到 GitHub」自动生成，可直接手改。\n" +
      "// 格式： \"知识点 id\": \"你的大白话\"\n\n" +
      "registerNotes(" + JSON.stringify(notesObj, null, 2) + ");\n"
    );
  },

  // 从 notes.js 文本里把对象抠出来（用于「拉取」）
  parseFile(text) {
    const i = text.indexOf("registerNotes(");
    if (i === -1) throw new Error("文件格式不对，找不到 registerNotes(");
    const start = text.indexOf("{", i);
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end < start) throw new Error("文件格式不对");
    return JSON.parse(text.slice(start, end + 1));
  },

  async api(path, options) {
    const token = this.getToken();
    const res = await fetch("https://api.github.com" + path, {
      ...options,
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(token ? { Authorization: "Bearer " + token } : {}),
        ...((options && options.headers) || {}),
      },
    });
    if (res.status === 401) throw new Error("令牌无效或已过期（401）。请到 GitHub 重新生成。");
    if (res.status === 403) throw new Error("没有权限（403）。请确认令牌勾选了 Contents: Read and write，且授权范围包含该仓库。");
    if (res.status === 404) throw new Error("仓库或文件不存在（404）。请检查用户名 / 仓库名 / 分支是否填对，以及令牌是否有权访问。");
    if (res.status === 409) throw new Error("分支冲突（409）。远端可能是空仓库或分支名不对。");
    if (!res.ok) {
      let msg = "";
      try { msg = (await res.json()).message || ""; } catch (e) {}
      throw new Error("GitHub 返回 " + res.status + (msg ? "：" + msg : ""));
    }
    return res.status === 204 ? null : res.json();
  },

  fileUrl(cfg) {
    return "/repos/" + encodeURIComponent(cfg.owner) + "/" + encodeURIComponent(cfg.repo) +
           "/contents/" + this.PATH;
  },

  // 读取远端文件（返回 {sha, notes} ；文件不存在返回 {sha:null, notes:{}}）
  async fetchRemote(cfg) {
    try {
      const data = await this.api(this.fileUrl(cfg) + "?ref=" + encodeURIComponent(cfg.branch), { method: "GET" });
      const text = this.b64decode(data.content);
      return { sha: data.sha, notes: this.parseFile(text) };
    } catch (e) {
      if (/404/.test(e.message)) return { sha: null, notes: {} };
      throw e;
    }
  },

  // 推送：本地（含内置）笔记 → 仓库
  async push(cfg) {
    const remote = await this.fetchRemote(cfg);
    const merged = { ...remote.notes, ...Notes.exportAll() };
    const content = this.renderFile(merged);

    const body = {
      message: "notes: 更新大白话笔记（" + Object.keys(merged).length + " 条）",
      content: this.b64encode(content),
      branch: cfg.branch,
    };
    if (remote.sha) body.sha = remote.sha;

    await this.api(this.fileUrl(cfg), { method: "PUT", body: JSON.stringify(body) });
    return Object.keys(merged).length;
  },

  // 拉取：仓库 → 本地（同 id 以远端为准）
  async pull(cfg) {
    const remote = await this.fetchRemote(cfg);
    const n = Notes.importAll(remote.notes);
    return n;
  },
};
