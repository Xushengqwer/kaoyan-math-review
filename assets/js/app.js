const TYPE_LABEL = { definition: "定义", theorem: "定理", property: "性质" };
const TYPE_ORDER = ["definition", "theorem", "property"];
const SUBJECT_SEAL = { calculus: "微", linalg: "代", probability: "概" };

function subjectSeal(s) {
  const ch = SUBJECT_SEAL[s.id] || s.name.charAt(0);
  return `<span class="seal">${ch}</span>`;
}

const App = {
  openSubjects: new Set(),

  init() {
    const subjects = KaoyanData.subjects().slice().sort((a, b) => a.id.localeCompare(b.id));
    this.subjects = subjects;
    this.renderSidebar();
    this.bindChrome();
    window.addEventListener("hashchange", () => this.route());
    this.route();
  },

  bindChrome() {
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("sidebar-close");
    const backdrop = document.getElementById("sidebar-backdrop");
    const sidebar = document.getElementById("sidebar");
    const open = () => { sidebar.classList.add("open"); backdrop.classList.add("show"); };
    const close = () => { sidebar.classList.remove("open"); backdrop.classList.remove("show"); };
    if (menuBtn) menuBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
    this._closeMobileSidebar = close;

    const toTop = document.getElementById("to-top");
    if (toTop) {
      toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
      window.addEventListener("scroll", () => {
        toTop.classList.toggle("show", window.scrollY > 600);
      }, { passive: true });
    }

    // 全局搜索
    const gs = document.getElementById("global-search");
    const gsClear = document.getElementById("global-search-clear");
    if (gs) {
      let timer = null;
      gs.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.globalQuery = gs.value.trim();
          gsClear.classList.toggle("show", !!this.globalQuery);
          if (this.globalQuery) {
            this.current = { type: "search" };
            this.renderContent();
            if (this._closeMobileSidebar) this._closeMobileSidebar();
          } else {
            this.route();
          }
        }, 140);
      });
      gs.addEventListener("keydown", (e) => {
        if (e.key === "Escape") { gs.value = ""; gs.dispatchEvent(new Event("input")); gs.blur(); }
      });
      gsClear.addEventListener("click", () => {
        gs.value = "";
        gs.dispatchEvent(new Event("input"));
        gs.focus();
      });
    }

    // 笔记导入 / 导出
    const exportBtn = document.getElementById("notes-export");
    const importBtn = document.getElementById("notes-import");
    const importFile = document.getElementById("notes-import-file");
    if (exportBtn) exportBtn.addEventListener("click", () => this.exportNotes());
    if (importBtn) importBtn.addEventListener("click", () => importFile.click());
    if (importFile) {
      importFile.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const n = Notes.importAll(JSON.parse(reader.result));
            alert("已导入 " + n + " 条笔记。");
            this.renderContent();
            this.refreshNoteCount();
          } catch (err) {
            alert("导入失败：文件不是合法的 JSON。");
          }
        };
        reader.readAsText(file);
        e.target.value = "";
      });
    }
    // 保存笔记后的「要不要下载备份」提示
    const saveModal = document.getElementById("save-modal");
    if (saveModal) {
      const closeSave = () => { saveModal.hidden = true; };
      document.getElementById("save-skip").addEventListener("click", closeSave);
      document.getElementById("save-download").addEventListener("click", () => {
        this.downloadMarkdown();
        closeSave();
      });
      saveModal.addEventListener("click", (e) => { if (e.target === saveModal) closeSave(); });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !saveModal.hidden) closeSave();
      });
    }

    this.refreshNoteCount();
  },

  refreshNoteCount() {
    const el = document.getElementById("notes-count");
    if (el) el.textContent = Notes.count();
  },

  exportNotes() {
    const data = Notes.exportAll();
    if (Object.keys(data).length === 0) { alert("还没有任何笔记。"); return; }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kaoyan-notes-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  // 把所有学科的章节拉平成一条线性阅读顺序，用于上一章/下一章导航
  flatChapters() {
    if (this._flat) return this._flat;
    const out = [];
    this.subjects.forEach((s) => {
      KaoyanData.chapters(s.id).forEach((c) => out.push({ subject: s, chapter: c }));
    });
    this._flat = out;
    return out;
  },

  parseHash() {
    const raw = location.hash.replace(/^#/, "");
    if (!raw || raw === "overview") return { type: "overview" };
    const [subjectId, chapterId] = raw.split("/");
    if (!KaoyanData.subject(subjectId)) return { type: "overview" };
    if (chapterId && KaoyanData.chapter(subjectId, chapterId)) {
      return { type: "chapter", subjectId, chapterId };
    }
    return { type: "subject", subjectId };
  },

  route() {
    const r = this.parseHash();
    this.current = r;
    if (r.subjectId) this.openSubjects.add(r.subjectId);
    if (r.type === "chapter") Progress.rememberVisit(r.subjectId, r.chapterId);
    this.chapterQuery = "";
    this.chapterTypeFilter = "all";
    this.renderSidebar();
    this.renderContent();
    if (this._closeMobileSidebar) this._closeMobileSidebar();

    // 从搜索结果跳过来时，滚到那一条并闪一下；否则回到顶部
    const target = this._pendingHighlight;
    this._pendingHighlight = null;
    const node = target && document.getElementById("item-" + target);
    if (node) {
      node.scrollIntoView({ block: "center" });
      node.classList.add("flash");
      setTimeout(() => node.classList.remove("flash"), 1800);
    } else {
      window.scrollTo(0, 0);
    }
  },

  // ---------------- sidebar ----------------
  renderSidebar() {
    const nav = document.getElementById("subject-nav");
    const overviewLink = document.getElementById("nav-overview-link");
    overviewLink.classList.toggle("active", this.current && this.current.type === "overview");

    nav.innerHTML = this.subjects
      .map((s) => {
        const chapters = KaoyanData.chapters(s.id);
        const isOpen = this.openSubjects.has(s.id);
        const chapterHtml = chapters
          .map((c) => {
            const n = KaoyanData.itemsByChapter(s.id, c.id).length;
            const active = this.current && this.current.subjectId === s.id && this.current.chapterId === c.id;
            return `
              <a class="nav-chapter ${active ? "active" : ""}" href="#${s.id}/${c.id}">
                <span class="n">${c.order}. ${escapeHtml(c.name)}</span>
                <span class="badge">${n}</span>
              </a>`;
          })
          .join("");

        return `
          <div class="nav-subject ${isOpen ? "open" : ""}" data-subject="${s.id}">
            <div class="nav-subject-head" data-toggle="${s.id}">
              ${subjectSeal(s)}
              <span class="name">${escapeHtml(s.name)}</span>
              <span class="chevron">▶</span>
            </div>
            <div class="nav-chapters">${chapterHtml}</div>
          </div>`;
      })
      .join("");

    nav.querySelectorAll(".nav-subject-head").forEach((head) => {
      head.addEventListener("click", () => {
        const id = head.dataset.toggle;
        if (this.openSubjects.has(id)) this.openSubjects.delete(id);
        else this.openSubjects.add(id);
        this.renderSidebar();
      });
    });
  },

  // ---------------- content ----------------
  renderContent() {
    const el = document.getElementById("content-pane");
    const r = this.current;
    if (r.type === "search") {
      el.innerHTML = this.searchViewHtml(this.globalQuery);
      renderMath(el);
      el.querySelectorAll(".result").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          this._pendingHighlight = a.dataset.item;
          const gs = document.getElementById("global-search");
          if (gs) gs.value = "";
          this.globalQuery = "";
          const clear = document.getElementById("global-search-clear");
          if (clear) clear.classList.remove("show");
          const target = a.getAttribute("href").slice(1);
          if (location.hash.slice(1) === target) this.route();
          else location.hash = target;
        });
      });
      return;
    }
    if (r.type === "chapter") {
      el.innerHTML = this.chapterViewHtml(r.subjectId, r.chapterId);
      this.bindChapterControls(r.subjectId, r.chapterId);
    } else if (r.type === "subject") {
      el.innerHTML = this.subjectViewHtml(r.subjectId);
    } else {
      el.innerHTML = this.overviewHtml();
    }
    renderMath(el);
  },

  // ---------------- 全局搜索 ----------------
  searchViewHtml(query) {
    const q = (query || "").toLowerCase();
    const hits = [];
    this.subjects.forEach((s) => {
      KaoyanData.items(s.id).forEach((it) => {
        const note = Notes.get(it.id);
        const hay = (
          it.title + " " + it.statement + " " + it.explanation + " " +
          (it.tags || []).join(" ") + " " + note
        ).toLowerCase();
        if (!hay.includes(q)) return;
        const chapter = KaoyanData.chapter(s.id, it.chapterId);
        // 标题命中排在前面
        const score = it.title.toLowerCase().includes(q) ? 0 : (note.toLowerCase().includes(q) ? 1 : 2);
        hits.push({ item: it, subject: s, chapter, score });
      });
    });
    hits.sort((a, b) => a.score - b.score);

    if (hits.length === 0) {
      return `
        <h1 class="page-title">搜索「${escapeHtml(query)}」</h1>
        <p class="page-sub">在全部 ${KaoyanData.allItems().length} 条知识点中没有找到匹配内容</p>
        <div class="empty-state">换个关键词试试，比如「施密特」「中值定理」「置信区间」</div>`;
    }

    const rows = hits.slice(0, 60).map(({ item, subject, chapter }) => `
      <a class="result" href="#${subject.id}/${chapter.id}" data-item="${item.id}">
        <span class="result-type ${item.type}">${TYPE_LABEL[item.type]}</span>
        <span class="result-body">
          <span class="result-title">${this.mark(item.title, query)}</span>
          <span class="result-where">${escapeHtml(subject.name)} · ${chapter.order}. ${escapeHtml(chapter.name)}</span>
          <span class="result-snippet">${this.snippet(item, query)}</span>
          ${Notes.has(item.id) ? `<span class="result-hasnote">有大白话笔记</span>` : ""}
        </span>
      </a>`).join("");

    return `
      <h1 class="page-title">搜索「${escapeHtml(query)}」</h1>
      <p class="page-sub">找到 ${hits.length} 条${hits.length > 60 ? "，显示前 60 条" : ""}</p>
      <div class="result-list">${rows}</div>`;
  },

  // 取一段包含关键词的纯文本摘要（去掉 HTML 和公式，避免搜索结果里塞满 LaTeX）
  snippet(item, query) {
    const plain = (item.statement + " " + item.explanation)
      .replace(/<[^>]+>/g, "")
      .replace(/\$\$?[^$]*\$\$?/g, " ▫ ")
      .replace(/\s+/g, " ")
      .trim();
    const q = (query || "").toLowerCase();
    const i = plain.toLowerCase().indexOf(q);
    const start = i < 0 ? 0 : Math.max(0, i - 24);
    const text = (start > 0 ? "…" : "") + plain.slice(start, start + 110) + (plain.length > start + 110 ? "…" : "");
    return this.mark(text, query);
  },

  // 高亮关键词（先转义再插标签，避免 XSS）
  mark(text, query) {
    const safe = escapeHtml(text);
    const q = (query || "").trim();
    if (!q) return safe;
    const esc = escapeHtml(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return safe.replace(new RegExp(esc, "gi"), (m) => `<mark>${m}</mark>`);
  },

  chapterCardHtml(subjectId, c) {
    const n = KaoyanData.itemsByChapter(subjectId, c.id).length;
    return `
      <a class="chapter-card" href="#${subjectId}/${c.id}">
        <span class="chapter-card-no">${String(c.order).padStart(2, "0")}</span>
        <span class="chapter-card-name">${escapeHtml(c.name)}</span>
        <span class="chapter-card-meta">${n} 条</span>
      </a>`;
  },

  overviewHtml() {
    const allItems = KaoyanData.allItems();

    const lastVisit = Progress.lastVisit();
    let continueHtml = "";
    if (lastVisit && KaoyanData.chapter(lastVisit.subjectId, lastVisit.chapterId)) {
      const s = KaoyanData.subject(lastVisit.subjectId);
      const c = KaoyanData.chapter(lastVisit.subjectId, lastVisit.chapterId);
      continueHtml = `
        <a class="continue-card" href="#${s.id}/${c.id}">
          <span class="continue-text">
            <span class="continue-label">继续上次学习</span>
            <span class="continue-target">${escapeHtml(s.name)} · ${escapeHtml(c.name)}</span>
          </span>
          <span class="continue-arrow" aria-hidden="true">→</span>
        </a>`;
    }

    const blocks = this.subjects
      .map((s) => {
        const items = KaoyanData.items(s.id);
        const chapters = KaoyanData.chapters(s.id);
        return `
          <section class="subject-block">
            <header class="subject-block-head">
              ${subjectSeal(s)}
              <h2>${escapeHtml(s.name)}</h2>
              <span class="subject-block-meta">${chapters.length} 章 · ${items.length} 条</span>
            </header>
            <div class="chapter-grid">
              ${chapters.map((c) => this.chapterCardHtml(s.id, c)).join("")}
            </div>
          </section>`;
      })
      .join("");

    const chapterCount = this.flatChapters().length;

    return `
      <header class="hero">
        <p class="hero-eyebrow">考研数学一</p>
        <h1>定义 · 定理 · 性质<br />每天读一点</h1>
        <p class="hero-sub">高等数学、线性代数、概率论与数理统计的核心考点，分类清晰，图文并茂。</p>
        <dl class="hero-stats">
          <div class="stat"><dt>学科</dt><dd>${this.subjects.length}</dd></div>
          <div class="stat"><dt>章节</dt><dd>${chapterCount}</dd></div>
          <div class="stat"><dt>知识点</dt><dd>${allItems.length}</dd></div>
        </dl>
      </header>
      ${continueHtml}
      ${blocks}
    `;
  },

  subjectViewHtml(subjectId) {
    const s = KaoyanData.subject(subjectId);
    const chapters = KaoyanData.chapters(subjectId);
    const items = KaoyanData.items(subjectId);
    return `
      <nav class="breadcrumb"><a href="#overview">总览</a><span class="sep">/</span>${escapeHtml(s.name)}</nav>
      <h1 class="page-title">${subjectSeal(s)}${escapeHtml(s.name)}</h1>
      <p class="page-sub">${chapters.length} 章 · 共 ${items.length} 条知识点</p>
      <div class="chapter-grid" style="margin-top:28px">
        ${chapters.map((c) => this.chapterCardHtml(subjectId, c)).join("")}
      </div>
    `;
  },

  chapterViewHtml(subjectId, chapterId) {
    const s = KaoyanData.subject(subjectId);
    const c = KaoyanData.chapter(subjectId, chapterId);
    const items = KaoyanData.itemsByChapter(subjectId, chapterId);

    return `
      <nav class="breadcrumb">
        <a href="#overview">总览</a>
        <span class="sep">/</span>
        <a href="#${subjectId}">${escapeHtml(s.name)}</a>
      </nav>
      <h1 class="page-title"><span class="page-title-no">${String(c.order).padStart(2, "0")}</span>${escapeHtml(c.name)}</h1>
      <p class="page-sub">共 ${items.length} 条 · ${TYPE_ORDER.filter((t) => items.some((i) => i.type === t)).map((t) => `${TYPE_LABEL[t]} ${items.filter((i) => i.type === t).length}`).join(" · ")}</p>

      <div class="toolbar">
        <div class="search-bar">
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input type="text" id="chapter-search" placeholder="在本章内搜索…" aria-label="在本章内搜索" />
        </div>
        <div class="chip-row" id="chapter-type-filter">
          <button class="chip active" data-type="all">全部</button>
          ${TYPE_ORDER.map((t) => {
            const n = items.filter((i) => i.type === t).length;
            return n ? `<button class="chip" data-type="${t}">${TYPE_LABEL[t]}</button>` : "";
          }).join("")}
        </div>
      </div>

      <div id="chapter-item-groups"></div>
      ${this.pagerHtml(subjectId, chapterId)}
    `;
  },

  pagerHtml(subjectId, chapterId) {
    const flat = this.flatChapters();
    const i = flat.findIndex((f) => f.subject.id === subjectId && f.chapter.id === chapterId);
    if (i === -1) return "";
    const prev = flat[i - 1];
    const next = flat[i + 1];
    const link = (entry, dir) => {
      if (!entry) return `<span class="pager-item pager-empty"></span>`;
      const label = dir === "prev" ? "← 上一章" : "下一章 →";
      return `
        <a class="pager-item ${dir}" href="#${entry.subject.id}/${entry.chapter.id}">
          <span class="pager-dir">${label}</span>
          <span class="pager-name">${escapeHtml(entry.chapter.name)}</span>
          <span class="pager-subject">${escapeHtml(entry.subject.name)}</span>
        </a>`;
    };
    return `<nav class="pager">${link(prev, "prev")}${link(next, "next")}</nav>`;
  },

  bindChapterControls(subjectId, chapterId) {
    const searchInput = document.getElementById("chapter-search");
    searchInput.addEventListener("input", (e) => {
      this.chapterQuery = e.target.value.trim();
      this.renderChapterGroups(subjectId, chapterId);
    });
    document.querySelectorAll("#chapter-type-filter .chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        this.chapterTypeFilter = chip.dataset.type;
        document.querySelectorAll("#chapter-type-filter .chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        this.renderChapterGroups(subjectId, chapterId);
      });
    });
    this.renderChapterGroups(subjectId, chapterId);
  },

  renderChapterGroups(subjectId, chapterId) {
    const items = KaoyanData.itemsByChapter(subjectId, chapterId);
    const q = (this.chapterQuery || "").toLowerCase();
    const typeFilter = this.chapterTypeFilter || "all";

    const filtered = items.filter((it) => {
      if (typeFilter !== "all" && it.type !== typeFilter) return false;
      if (!q) return true;
      const hay = (it.title + " " + it.statement + " " + (it.tags || []).join(" ")).toLowerCase();
      return hay.includes(q);
    });

    const wrap = document.getElementById("chapter-item-groups");
    if (filtered.length === 0) {
      wrap.innerHTML = `<div class="empty-state">没有匹配的知识点，换个关键词试试</div>`;
      renderMath(wrap);
      return;
    }

    let html = "";
    TYPE_ORDER.forEach((type) => {
      const groupItems = filtered.filter((it) => it.type === type);
      if (groupItems.length === 0) return;
      html += `
        <section class="type-group ${type}">
          <h3 class="type-group-title">
            <span class="type-group-dot" aria-hidden="true"></span>
            <span class="type-group-name">${TYPE_LABEL[type]}</span>
            <span class="type-group-count">${groupItems.length}</span>
          </h3>
          ${groupItems.map((it, i) => this.entryHtml(it, i + 1)).join("")}
        </section>`;
    });
    wrap.innerHTML = html;
    renderMath(wrap);
    this.bindNoteEditors(wrap);
  },

  entryHtml(item, index) {
    return `
      <article class="entry" id="item-${item.id}">
        <div class="entry-no" aria-hidden="true">${String(index).padStart(2, "0")}</div>
        <div class="entry-main">
          <h4 class="entry-title">${escapeHtml(item.title)}</h4>
          <div class="entry-statement">${item.statement}</div>
          ${item.diagram ? `<figure class="entry-figure">${item.diagram}${item.diagramCaption ? `<figcaption>${escapeHtml(item.diagramCaption)}</figcaption>` : ""}</figure>` : ""}
          <div class="entry-note"><span class="note-label">提示</span>${item.explanation}</div>
          <div class="mynote-slot" data-note="${item.id}">${this.myNoteHtml(item.id)}</div>
          ${
            item.tags && item.tags.length
              ? `<div class="entry-tags">${item.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>`
              : ""
          }
        </div>
      </article>`;
  },

  // 「大白话」区块：有内容就展示，没有就显示一个添加按钮
  myNoteHtml(itemId) {
    const text = Notes.get(itemId);
    if (!text) {
      return `<button class="mynote-add" data-action="edit">＋ 用大白话写一遍</button>`;
    }
    return `<div class="mynote">
      <div class="mynote-head">
        <span class="mynote-label">大白话${Notes.isSeed(itemId) ? "（仓库内置）" : ""}</span>
        <button class="mynote-edit" data-action="edit">编辑</button>
      </div>
      <div class="mynote-body">${renderMarkdown(text)}</div>
    </div>`;
  },

  // 工具栏：[按钮文字, 提示, 前缀, 后缀, 是否整行生效]
  TOOLS: [
    ["B", "加粗", "**", "**", false],
    ["I", "斜体", "*", "*", false],
    ["H", "小标题", "## ", "", true],
    ["•", "无序列表", "- ", "", true],
    ["1.", "有序列表", "1. ", "", true],
    ["❝", "引用", "> ", "", true],
    ["<>", "行内代码", "`", "`", false],
    ["∑", "数学公式", "$", "$", false],
    ["—", "分隔线", "\n---\n", "", true],
  ],

  editorHtml(itemId) {
    const text = Notes.get(itemId);
    const tools = this.TOOLS.map(
      (t, i) => `<button class="md-tool" type="button" data-tool="${i}" title="${t[1]}">${escapeHtml(t[0])}</button>`
    ).join("");
    return `<div class="mynote mynote-editing">
      <div class="mynote-head">
        <span class="mynote-label">大白话</span>
        <div class="mynote-tabs">
          <button class="md-tab active" data-tab="write">编辑</button>
          <button class="md-tab" data-tab="preview">预览</button>
        </div>
      </div>
      <div class="md-toolbar">${tools}</div>
      <textarea class="mynote-input" rows="9" placeholder="用你自己的话写一遍，支持 Markdown：&#10;&#10;**对象**：…&#10;**动作**：…&#10;**意义**：&#10;- 第一点&#10;- 第二点&#10;&#10;公式直接写 $\\lim_{x\\to 0}$ 就能渲染">${escapeHtml(text)}</textarea>
      <div class="md-preview" hidden></div>
      <div class="mynote-actions">
        <button class="mynote-save" data-action="save">保存</button>
        <button class="mynote-cancel" data-action="cancel">取消</button>
        ${text ? `<button class="mynote-delete" data-action="delete">删除</button>` : ""}
      </div>
    </div>`;
  },

  // 在光标处插入 Markdown 标记
  applyTool(ta, tool) {
    const [, , before, after, lineMode] = tool;
    const { selectionStart: s, selectionEnd: e, value: v } = ta;

    if (lineMode) {
      const lineStart = v.lastIndexOf("\n", s - 1) + 1;
      let lineEnd = v.indexOf("\n", e);
      if (lineEnd === -1) lineEnd = v.length;
      const block = v.slice(lineStart, lineEnd);
      const marked = block
        .split("\n")
        .map((l, i) => (before === "\n---\n" ? l : before.replace(/^1\. $/, () => i + 1 + ". ") + l))
        .join("\n");
      const insert = before === "\n---\n" ? block + "\n\n---\n" : marked;
      ta.value = v.slice(0, lineStart) + insert + v.slice(lineEnd);
      ta.selectionStart = ta.selectionEnd = lineStart + insert.length;
    } else {
      const sel = v.slice(s, e) || "";
      ta.value = v.slice(0, s) + before + sel + after + v.slice(e);
      if (sel) {
        ta.selectionStart = s + before.length;
        ta.selectionEnd = s + before.length + sel.length;
      } else {
        ta.selectionStart = ta.selectionEnd = s + before.length;
      }
    }
    ta.focus();
  },

  bindNoteEditors(scope) {
    scope.querySelectorAll(".mynote-slot").forEach((slot) => {
      if (slot.dataset.bound) return;
      slot.dataset.bound = "1";
      const id = slot.dataset.note;
      const show = (html) => { slot.innerHTML = html; renderMath(slot); };

      slot.addEventListener("click", (e) => {
        const tool = e.target.closest("[data-tool]");
        if (tool) {
          this.applyTool(slot.querySelector(".mynote-input"), this.TOOLS[Number(tool.dataset.tool)]);
          return;
        }

        const tab = e.target.closest("[data-tab]");
        if (tab) {
          const ta = slot.querySelector(".mynote-input");
          const pv = slot.querySelector(".md-preview");
          const toWrite = tab.dataset.tab === "write";
          slot.querySelectorAll(".md-tab").forEach((b) => b.classList.toggle("active", b === tab));
          slot.querySelector(".md-toolbar").hidden = !toWrite;
          ta.hidden = !toWrite;
          pv.hidden = toWrite;
          if (!toWrite) {
            pv.innerHTML = ta.value.trim() ? renderMarkdown(ta.value) : `<p class="md-empty">还没写内容</p>`;
            renderMath(pv);
          }
          return;
        }

        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.dataset.action;

        if (action === "edit") {
          show(this.editorHtml(id));
          const ta = slot.querySelector(".mynote-input");
          ta.focus();
          ta.setSelectionRange(ta.value.length, ta.value.length);
        } else if (action === "save") {
          const val = slot.querySelector(".mynote-input").value;
          const had = Notes.has(id);
          if (!Notes.set(id, val)) {
            alert("保存失败：浏览器存储空间不足或被禁用。");
            return;
          }
          show(this.myNoteHtml(id));
          this.refreshNoteCount();
          if (val.trim() && !(had && !val.trim())) this.askDownload();
        } else if (action === "cancel") {
          show(this.myNoteHtml(id));
        } else if (action === "delete") {
          Notes.set(id, "");
          show(this.myNoteHtml(id));
          this.refreshNoteCount();
        }
      });
    });
  },

  // 保存后提醒：要不要顺手存一份本地 Markdown
  askDownload() {
    const modal = document.getElementById("save-modal");
    if (!modal) return;
    document.getElementById("save-modal-count").textContent = Notes.count();
    modal.hidden = false;
  },

  // 把所有笔记拼成一份 Markdown 文档
  buildMarkdown() {
    const all = Notes.exportAll();
    const lines = [
      "# 我的大白话笔记",
      "",
      "> 导出时间：" + new Date().toLocaleString("zh-CN", { hour12: false }),
      "> 共 " + Object.keys(all).length + " 条",
      "",
    ];
    this.subjects.forEach((s) => {
      const chapters = KaoyanData.chapters(s.id);
      const subjectHas = KaoyanData.items(s.id).some((it) => all[it.id]);
      if (!subjectHas) return;
      lines.push("", "## " + s.name, "");
      chapters.forEach((c) => {
        const items = KaoyanData.itemsByChapter(s.id, c.id).filter((it) => all[it.id]);
        if (!items.length) return;
        lines.push("### " + c.order + ". " + c.name, "");
        items.forEach((it) => {
          // 笔记里自己写的标题要降级，才能挂在「#### 知识点」下面而不是顶破文档层级
          const body = all[it.id]
            .trim()
            .split("\n")
            .map((l) => l.replace(/^(#{1,6})\s/, (m, h) => "#".repeat(Math.min(6, h.length + 4)) + " "))
            .join("\n");
          lines.push("#### " + it.title, "", body, "");
        });
      });
    });
    return lines.join("\n");
  },

  downloadMarkdown() {
    const text = this.buildMarkdown();
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "我的大白话笔记-" + new Date().toISOString().slice(0, 10) + ".md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
