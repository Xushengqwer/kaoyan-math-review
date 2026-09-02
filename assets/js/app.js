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
        if (this._pendingDownloadId) this.downloadNote(this._pendingDownloadId);
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

    // 按类型分组，同一类型内从 01 开始编号
    const groups = TYPE_ORDER.map((type) => ({
      type,
      items: filtered.filter((it) => it.type === type),
    })).filter((g) => g.items.length);

    let html = this.tocHtml(groups);
    groups.forEach(({ type, items: groupItems }) => {
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
    this.bindToc(wrap);
  },

  // 章节开头的目录：按类型分栏，点条目滚到对应位置
  tocHtml(groups) {
    const total = groups.reduce((n, g) => n + g.items.length, 0);
    if (!total) return "";
    const cols = groups
      .map(
        ({ type, items }) => `
        <div class="toc-col ${type}">
          <div class="toc-col-head">
            <span class="toc-dot" aria-hidden="true"></span>
            <span class="toc-col-name">${TYPE_LABEL[type]}</span>
            <span class="toc-col-count">${items.length}</span>
          </div>
          <ol class="toc-list">
            ${items
              .map(
                (it, i) => `<li>
                  <a href="#item-${it.id}" data-goto="${it.id}">
                    <span class="toc-no">${String(i + 1).padStart(2, "0")}</span>
                    <span class="toc-title">${escapeHtml(it.title)}</span>
                    ${Notes.has(it.id) ? `<span class="toc-noted" title="已写大白话">●</span>` : ""}
                  </a>
                </li>`
              )
              .join("")}
          </ol>
        </div>`
      )
      .join("");
    return `
      <details class="toc" open>
        <summary class="toc-summary">本章目录<span class="toc-total">${total} 条</span></summary>
        <div class="toc-cols">${cols}</div>
      </details>`;
  },

  bindToc(scope) {
    scope.querySelectorAll(".toc a[data-goto]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const node = document.getElementById("item-" + a.dataset.goto);
        if (!node) return;
        node.scrollIntoView({ block: "center" });
        node.classList.add("flash");
        setTimeout(() => node.classList.remove("flash"), 1800);
      });
    });
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
      <div class="mynote-body">${escapeHtml(text)}</div>
    </div>`;
  },

  editorHtml(itemId) {
    const text = Notes.get(itemId);
    return `<div class="mynote mynote-editing">
      <div class="mynote-head"><span class="mynote-label">大白话</span></div>
      <textarea class="mynote-input" rows="9" placeholder="用你自己的话写一遍，比如：&#10;&#10;对象：…&#10;规则：…&#10;意义：…">${escapeHtml(text)}</textarea>
      <div class="mynote-actions">
        <button class="mynote-save" data-action="save">保存</button>
        <button class="mynote-cancel" data-action="cancel">取消</button>
        ${text ? `<button class="mynote-delete" data-action="delete">删除</button>` : ""}
      </div>
    </div>`;
  },

  bindNoteEditors(scope) {
    scope.querySelectorAll(".mynote-slot").forEach((slot) => {
      if (slot.dataset.bound) return;
      slot.dataset.bound = "1";
      const id = slot.dataset.note;
      const show = (html) => { slot.innerHTML = html; renderMath(slot); };

      slot.addEventListener("click", (e) => {
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
          if (val.trim()) this.askDownload(id);
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

  // 定位一条知识点：属于哪个学科、第几章、在本章同类里排第几
  locate(itemId) {
    for (const s of this.subjects) {
      const it = KaoyanData.items(s.id).find((x) => x.id === itemId);
      if (!it) continue;
      const c = KaoyanData.chapter(s.id, it.chapterId);
      const sameType = KaoyanData.itemsByChapter(s.id, it.chapterId).filter((x) => x.type === it.type);
      const idx = sameType.findIndex((x) => x.id === itemId) + 1;
      return { subject: s, chapter: c, item: it, typeLabel: TYPE_LABEL[it.type], index: idx };
    }
    return null;
  },

  // 文件名：线性代数-第3章-定义05-向量空间、基、维数的定义.txt
  noteFileName(itemId) {
    const p = this.locate(itemId);
    if (!p) return "大白话笔记.txt";
    const raw = [
      p.subject.name.replace(/（.*?）/g, ""),
      "第" + p.chapter.order + "章",
      p.typeLabel + String(p.index).padStart(2, "0"),
      p.item.title,
    ].join("-");
    // 去掉文件名里不能用的字符
    return raw.replace(/[\\/:*?"<>|]/g, "_") + ".txt";
  },

  // 文件内容：头部写清出处和 id，正文是原样纯文本
  buildNoteText(itemId) {
    const p = this.locate(itemId);
    const body = Notes.get(itemId).trim();
    if (!p) return body;
    return [
      p.subject.name + " / 第" + p.chapter.order + "章 " + p.chapter.name +
        " / " + p.typeLabel + " " + String(p.index).padStart(2, "0"),
      p.item.title,
      "id: " + itemId,
      "",
      "----------------------------------------",
      "",
      body,
      "",
    ].join("\n");
  },

  // 保存后提醒：要不要顺手存一份本地 txt
  askDownload(itemId) {
    const modal = document.getElementById("save-modal");
    if (!modal) return;
    this._pendingDownloadId = itemId;
    const p = this.locate(itemId);
    document.getElementById("save-modal-where").textContent = p
      ? p.subject.name + " · 第" + p.chapter.order + "章 · " + p.typeLabel + " " + String(p.index).padStart(2, "0")
      : "";
    document.getElementById("save-modal-file").textContent = this.noteFileName(itemId);
    modal.hidden = false;
  },

  downloadNote(itemId) {
    const blob = new Blob([this.buildNoteText(itemId)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = this.noteFileName(itemId);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
