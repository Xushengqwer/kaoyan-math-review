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
    window.scrollTo(0, 0);
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
  },

  entryHtml(item, index) {
    return `
      <article class="entry">
        <div class="entry-no" aria-hidden="true">${String(index).padStart(2, "0")}</div>
        <div class="entry-main">
          <h4 class="entry-title">${escapeHtml(item.title)}</h4>
          <div class="entry-statement">${item.statement}</div>
          ${item.diagram ? `<figure class="entry-figure">${item.diagram}${item.diagramCaption ? `<figcaption>${escapeHtml(item.diagramCaption)}</figcaption>` : ""}</figure>` : ""}
          <div class="entry-note"><span class="note-label">提示</span>${item.explanation}</div>
          ${
            item.tags && item.tags.length
              ? `<div class="entry-tags">${item.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>`
              : ""
          }
        </div>
      </article>`;
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
