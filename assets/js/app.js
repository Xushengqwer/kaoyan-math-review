const TYPE_LABEL = { definition: "定义", theorem: "定理", property: "性质" };
const TYPE_ORDER = ["definition", "theorem", "property"];
const SUBJECT_SEAL = { calculus: "微", linalg: "代", probability: "概" };

// 去 HTML 标签。必须认准「<」后面紧跟字母才算标签 —— 数学里 r(A) < n … > 0 这种
// 写法会被 /<[^>]+>/ 当成一个大标签整段吃掉，中间的字就再也搜不到了。
const HTML_TAG = /<\/?[a-zA-Z][a-zA-Z0-9-]*(?:\s[^<>]*)?>/g;

// 搜索用的纯文本。笔记是 Markdown，「**零因子**陷阱」按原文是搜不到「零因子陷阱」的，
// 所以匹配之前把会夹在词中间的那三个记号（* ` ~）去掉，只去这三个：
// # > | 只出现在行首或表格分隔处，从不夹断词，去了白去；
// $ _ 是公式写法的一部分，去掉会让「$A$」「|A|」都退化成搜「a」，满页都是。
function searchText(raw) {
  return String(raw || "")
    .replace(HTML_TAG, " ")
    .replace(/[*`~]/g, "")
    .toLowerCase();
}

// 摘要用的纯文本：公式整个折成 ▫，免得搜索结果里塞满 LaTeX；
// Markdown 记号一并去掉，高亮才能落在词上。
function plainText(raw) {
  return String(raw || "")
    .replace(HTML_TAG, " ")
    .replace(/\$\$?[^$]*\$\$?/g, " ▫ ")
    .replace(/^[ \t]*(?:[-*+]|\d+\.)\s+/gm, " ")
    .replace(/^[ \t]*#{1,6}\s*/gm, " ")
    .replace(/[*`~]/g, "")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// 课本正文与提示的分点排版（只改显示，数据文件里的原文一个字不动）。
//
// 一段话按最外层的「。」拆成句、按「；」拆成分句，一个点一行；
// 「总述：甲；乙；丙。」冒号前做引子，后面分点；
// 开头一句不带小标题的总述、后面还有两点以上时，它单独做引子。
// 公式 $…$、括号引号、<strong> 这类行内标签里面的标点一律不碰；
// 以「即 / 其中 / 称为」开头的是上一句的尾巴，不单独成点。
// 已有的列表、表格、公式块、〔定义〕标签原样保留，只处理它们之间的文字。
const PTS_BLOCK_TAG = /^<\/?(ul|ol|li|table|thead|tbody|tr|td|th|div|p|figure|figcaption|h[1-6]|pre|blockquote|hr|br)\b/i;
const PTS_LIST_TAG = /^<(\/?)(ul|ol)\b/i;
const PTS_OPEN = "（([「“《【‘";
const PTS_CLOSE = "）)]」”》】’";
const PTS_SENT_END = "。！？";
const PTS_LABEL_HEAD = /^\s*<strong>[^<]{1,24}<\/strong>\s*[：:]|^\s*<strong>[^<]{1,24}[：:]<\/strong>/;
const PTS_CONT_HEAD = /^(即(?!使|便)|其中|称为|叫做|也称)/;

function bulletize(html) {
  const src = String(html || "");
  const toks = [];
  const re = /\$\$[\s\S]*?\$\$|\$[^$\n]*\$|<[^>]+>/g;
  let last = 0;
  let m;
  while ((m = re.exec(src))) {
    for (const ch of src.slice(last, m.index)) toks.push({ t: "c", v: ch });
    toks.push({ t: m[0][0] === "<" ? "tag" : "math", v: m[0] });
    last = m.index + m[0].length;
  }
  for (const ch of src.slice(last)) toks.push({ t: "c", v: ch });

  // 按块级标签切成一段段文字；已有列表里面的文字不动
  let out = "";
  let run = [];
  let listDepth = 0;
  const flush = () => {
    out += listDepth > 0 ? run.map((x) => x.v).join("") : bulletRun(run);
    run = [];
  };
  for (const tk of toks) {
    if (tk.t === "tag" && PTS_BLOCK_TAG.test(tk.v)) {
      flush();
      const lm = tk.v.match(PTS_LIST_TAG);
      if (lm) listDepth += lm[1] ? -1 : 1;
      out += tk.v;
    } else {
      run.push(tk);
    }
  }
  flush();
  return out;
}

// 一段连续的行内内容 → 原样，或「引子 + 分点」
function bulletRun(run) {
  const whole = run.map((x) => x.v).join("");
  if (!whole.trim()) return whole;

  // 1) 断句：只在最外层（不在行内标签、括号、公式里）断
  const sentences = [];
  let clauses = [];
  let cur = [];
  let tagDepth = 0;
  let brDepth = 0;
  let colonAt = -1;
  const endClause = () => {
    clauses.push({ toks: cur, colonAt });
    cur = [];
    colonAt = -1;
  };
  const endSentence = () => {
    if (cur.length) endClause();
    if (clauses.length) sentences.push(clauses);
    clauses = [];
  };
  for (const tk of run) {
    cur.push(tk);
    if (tk.t === "tag") {
      if (/^<\//.test(tk.v)) tagDepth = Math.max(0, tagDepth - 1);
      else if (!/\/>$/.test(tk.v)) tagDepth++;
      continue;
    }
    if (tk.t !== "c") continue;
    if (PTS_OPEN.includes(tk.v)) brDepth++;
    else if (PTS_CLOSE.includes(tk.v)) brDepth = Math.max(0, brDepth - 1);
    if (tagDepth || brDepth) continue;
    if (PTS_SENT_END.includes(tk.v)) endSentence();
    else if (tk.v === "；") endClause();
    else if (tk.v === "：" && colonAt < 0 && clauses.length === 0) colonAt = cur.length - 1;
  }
  endSentence();

  const H = (ts) => ts.map((x) => x.v).join("");
  const T = (ts) => H(ts).trim();
  const vis = (ts) => H(ts).replace(/<[^>]+>/g, "").replace(/\$[^$]*\$/g, "式").replace(/[\s。；，、：]/g, "");
  const head = (ts) => H(ts).replace(/<[^>]+>/g, "").replace(/^\s+/, "");
  const appendTo = (it, ts) => {
    if (it.kind === "group") it.items[it.items.length - 1] = it.items[it.items.length - 1].concat(ts);
    else it.toks = it.toks.concat(ts);
  };

  // 2) 句子 → 条目
  const items = [];
  let forcedLead = false;
  for (const cl of sentences) {
    const allToks = cl.reduce((a, c) => a.concat(c.toks), []);
    if (!vis(allToks)) {
      if (items.length) appendTo(items[items.length - 1], allToks);
      continue;
    }
    // 句内：空分句、以「即 / 其中」开头的分句，并回前一个分句
    const ps = [];
    cl.forEach((p) => {
      if (ps.length && (!vis(p.toks) || PTS_CONT_HEAD.test(head(p.toks)))) {
        ps[ps.length - 1].toks = ps[ps.length - 1].toks.concat(p.toks);
      } else {
        ps.push({ toks: p.toks.slice(), colonAt: p.colonAt });
      }
    });
    // 句首就是「即 / 其中 / 称为」：整句是上一句的尾巴
    if (PTS_CONT_HEAD.test(head(ps[0].toks))) {
      if (items.length) {
        appendTo(items[items.length - 1], allToks);
      } else {
        items.push({ kind: "item", toks: allToks, whole: true });
        forcedLead = true;
      }
      continue;
    }
    if (ps.length === 1) {
      items.push({ kind: "item", toks: ps[0].toks, whole: true });
      continue;
    }
    const f = ps[0];
    if (f.colonAt >= 0) {
      const lead = f.toks.slice(0, f.colonAt + 1);
      const rest = f.toks.slice(f.colonAt + 1);
      if (vis(lead) && vis(rest)) {
        items.push({ kind: "group", lead, items: [rest].concat(ps.slice(1).map((p) => p.toks)) });
        continue;
      }
    }
    ps.forEach((p) => items.push({ kind: "item", toks: p.toks, whole: false }));
  }
  if (!items.length) return whole;

  // 3) 排版
  const ul = (arr) => '<ul class="pts">' + arr.map((x) => "<li>" + x + "</li>").join("") + "</ul>";
  const liOf = (it) => (it.kind === "group" ? T(it.lead) + ul(it.items.map(T)) : T(it.toks));
  const points = (arr) => arr.reduce((n, it) => n + (it.kind === "group" ? it.items.length : 1), 0);

  let lead = "";
  let rest = items;
  const first = items[0];
  const canLead = first.kind === "item" && first.whole && (forcedLead || !PTS_LABEL_HEAD.test(T(first.toks)));
  if (canLead && points(items.slice(1)) >= 2) {
    lead = T(first.toks);
    rest = items.slice(1);
  }
  if (forcedLead && !lead) return whole;           // 紧跟公式的那句，后面不够两点：保持原样
  if (rest.length === 1 && rest[0].kind === "item") return whole;
  if (rest.length === 1) return lead + T(rest[0].lead) + ul(rest[0].items.map(T));
  return lead + ul(rest.map(liOf));
}

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
    const pendingBtn = document.getElementById("notes-pending-export");
    if (exportBtn) exportBtn.addEventListener("click", () => this.exportNotes());
    if (pendingBtn) pendingBtn.addEventListener("click", () => this.exportPending());
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

    // Esc 退出全屏编辑（保存弹窗自己有一套 Esc，两者不会同时出现）
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (document.body.classList.contains("mynote-zoomed")) this.exitZoom();
      else this.closeRail();
    });

    this.refreshNoteCount();
  },

  refreshNoteCount() {
    const el = document.getElementById("notes-count");
    if (el) el.textContent = Notes.count();

    // 「还没进仓库」提醒
    const box = document.getElementById("side-pending");
    if (!box) return;
    const n = Notes.pendingIds().length;
    box.hidden = n === 0;
    const num = document.getElementById("side-pending-n");
    if (num) num.textContent = n;
  },

  // 把所有「还没进仓库」的笔记打包成一个 .md：每条都带完整出处和 id，
  // 正文夹在起止注释之间逐字节原样。文件本身就是 Markdown，
  // 直接丢进任何预览器（或交给我）都能正常看，也能原样提交进仓库。
  exportPending() {
    const ids = Notes.pendingIds();
    if (ids.length === 0) { alert("所有笔记都已经在仓库里了。"); return; }
    // 极端情况：正文里如果自己带了结束标记，切分就会错位，先拦下来。
    const clash = ids.filter((id) => Notes.get(id).indexOf(this.bodyClose(id)) >= 0);
    if (clash.length) {
      alert("这几条笔记的正文里出现了导出用的结束标记，导出会切错：\n" + clash.join("\n"));
      return;
    }
    const date = new Date().toISOString().slice(0, 10);
    const parts = [
      "# 待提交笔记 · " + date,
      "",
      "共 " + ids.length + " 条。每条正文夹在 `正文开始` / `正文结束` 两行注释之间，" +
        "**与网页里输入的内容逐字节相同**，导出没有做任何转换。",
      "",
    ];
    ids.forEach((id, i) => {
      parts.push("---");
      parts.push("");
      parts.push("<!-- 第 " + (i + 1) + " / " + ids.length + " 条 -->");
      parts.push(this.buildNoteText(id));
    });
    const blob = new Blob([parts.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "待提交笔记-" + date + ".md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
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
      this.hideRail();
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
      this.renderRail(r.subjectId, r.chapterId);
      this.bindChapterControls(r.subjectId, r.chapterId);
      this.bindNoteEditors(el); // 章末总结的编辑器（知识点的已在上面绑好）
      const pdfBtn = document.getElementById("chapter-pdf");
      if (pdfBtn) pdfBtn.addEventListener("click", () => this.printChapter(r.subjectId, r.chapterId));
    } else if (r.type === "subject") {
      this.hideRail();
      el.innerHTML = this.subjectViewHtml(r.subjectId);
    } else {
      this.hideRail();
      el.innerHTML = this.overviewHtml();
    }
    renderMath(el);
  },

  // ---------------- 全局搜索 ----------------
  // 搜索范围：知识点标题 / 课本正文 / 标签 / 我自己写的笔记 / 章末总结。
  // 题库在运行期不变，只有自己改笔记时会变，所以按 Notes.stamp 缓存索引，
  // 每次敲键盘不必把三十万字重新归一化一遍。
  _index: null,
  _indexStamp: -1,

  searchIndex() {
    if (this._index && this._indexStamp === Notes.stamp) return this._index;
    const rows = [];
    this.subjects.forEach((s) => {
      KaoyanData.items(s.id).forEach((it) => {
        rows.push({
          item: it,
          subject: s,
          chapter: KaoyanData.chapter(s.id, it.chapterId),
          noteId: it.id,
          title: searchText(it.title),
          body: searchText(
            it.statement + " " + (it.explanation || "") + " " + (it.tags || []).join(" ")
          ),
          note: searchText(Notes.get(it.id)),
        });
      });
      // 章末的本章总结只有笔记，没有课本正文
      KaoyanData.chapters(s.id).forEach((c) => {
        const nid = this.chapterNoteId(s.id, c.id);
        if (!Notes.has(nid)) return;
        rows.push({
          summary: true,
          subject: s,
          chapter: c,
          noteId: nid,
          title: searchText("本章总结 " + c.name),
          body: "",
          note: searchText(Notes.get(nid)),
        });
      });
    });
    this._index = rows;
    this._indexStamp = Notes.stamp;
    return rows;
  },

  searchViewHtml(query) {
    const q = searchText(query);
    const hits = [];
    if (q) {
      this.searchIndex().forEach((r) => {
        const inTitle = r.title.includes(q);
        const inBody = r.body.includes(q);
        const inNote = r.note.includes(q);
        if (!inTitle && !inBody && !inNote) return;
        // 命中在课本正文还是在笔记里，决定下面那段摘要从哪儿取
        hits.push({ row: r, score: inTitle ? 0 : inBody ? 1 : 2, fromNote: !inBody && inNote });
      });
    }
    hits.sort((a, b) => a.score - b.score);
    const noteHits = hits.filter((h) => h.fromNote).length;

    if (hits.length === 0) {
      return `
        <h1 class="page-title">搜索「${escapeHtml(query)}」</h1>
        <p class="page-sub">在 ${KaoyanData.allItems().length} 条知识点和 ${Notes.count()} 篇笔记里都没有找到</p>
        <div class="empty-state">换个关键词试试，比如「施密特」「中值定理」「置信区间」</div>`;
    }

    const rows = hits.slice(0, 60).map((h) => {
      const r = h.row;
      const where = `${escapeHtml(r.subject.name)} · ${r.chapter.order}. ${escapeHtml(r.chapter.name)}`;
      const fromNote = h.fromNote || r.summary;
      const snippet = fromNote
        ? `<span class="result-snippet"><span class="snippet-from">笔记</span>${this.textSnippet(Notes.get(r.noteId), query)}</span>`
        : `<span class="result-snippet">${this.snippet(r.item, query)}</span>`;

      if (r.summary) {
        return `
      <a class="result" href="#${r.subject.id}/${r.chapter.id}" data-item="${r.noteId}">
        <span class="result-type summary">总结</span>
        <span class="result-body">
          <span class="result-title">${this.mark("本章总结：" + r.chapter.name, query)}</span>
          <span class="result-where">${where}</span>
          ${snippet}
        </span>
      </a>`;
      }
      const item = r.item;
      return `
      <a class="result" href="#${r.subject.id}/${r.chapter.id}" data-item="${item.id}">
        <span class="result-type ${item.type}">${TYPE_LABEL[item.type]}</span>
        <span class="result-body">
          <span class="result-title">${this.mark(item.title, query)}</span>
          <span class="result-where">${where}</span>
          ${snippet}
          ${!fromNote && Notes.has(item.id) ? `<span class="result-hasnote">有笔记</span>` : ""}
        </span>
      </a>`;
    }).join("");

    return `
      <h1 class="page-title">搜索「${escapeHtml(query)}」</h1>
      <p class="page-sub">找到 ${hits.length} 条${noteHits ? `，其中 ${noteHits} 条命中在笔记里` : ""}${hits.length > 60 ? "，显示前 60 条" : ""}</p>
      <div class="result-list">${rows}</div>`;
  },

  // 取一段包含关键词的纯文本摘要（去掉 HTML 和公式，避免搜索结果里塞满 LaTeX）
  snippet(item, query) {
    return this.textSnippet(item.statement + " " + (item.explanation || ""), query);
  },

  textSnippet(raw, query) {
    const plain = plainText(raw);
    const q = (query || "").trim().toLowerCase();
    // 先按原样找；找不到再按去掉记号的版本找（位置只差几个被删掉的符号，够定位这 110 字的窗口）
    let i = plain.toLowerCase().indexOf(q);
    if (i < 0 && q) i = searchText(plain).indexOf(searchText(query));
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
          <input type="text" id="chapter-search" placeholder="在本章内搜索（含笔记）…" aria-label="在本章内搜索，包含笔记" />
        </div>
        <div class="chip-row" id="chapter-type-filter">
          <button class="chip active" data-type="all">全部</button>
          ${TYPE_ORDER.map((t) => {
            const n = items.filter((i) => i.type === t).length;
            return n ? `<button class="chip" data-type="${t}">${TYPE_LABEL[t]}</button>` : "";
          }).join("")}
        </div>
      </div>

      <p class="chapter-hits" id="chapter-hits" hidden></p>
      <div id="chapter-item-groups"></div>
      ${this.chapterSummaryHtml(subjectId, chapterId)}
      ${this.exportBarHtml()}
      ${this.pagerHtml(subjectId, chapterId)}
    `;
  },

  // 导出本章 PDF：走浏览器自带的打印，目标选「另存为 PDF」。
  // 不引第三方库——公式是矢量的、中文不会乱码，也不依赖任何外部资源。
  exportBarHtml() {
    return `
      <div class="export-bar">
        <button class="export-btn" id="chapter-pdf">导出本章 PDF</button>
        <span class="export-hint">会打开系统打印窗口，把「目标 / 打印机」选成<strong>另存为 PDF</strong>即可；手机上从分享菜单里选「打印」。</span>
      </div>`;
  },

  // 打印前把页面整理成完整的一章：清掉筛选、展开目录、收起正在编辑的笔记
  printChapter(subjectId, chapterId) {
    this.exitZoom();
    this.closeRail();
    const needsReset = this.chapterQuery || (this.chapterTypeFilter && this.chapterTypeFilter !== "all");
    if (needsReset) {
      this.chapterQuery = "";
      this.chapterTypeFilter = "all";
      const si = document.getElementById("chapter-search");
      if (si) si.value = "";
      document.querySelectorAll("#chapter-type-filter .chip").forEach((c) => {
        c.classList.toggle("active", c.dataset.type === "all");
      });
      this.renderChapterGroups(subjectId, chapterId);
    }
    // 编辑中的笔记先还原成展示态，否则打印出来是个文本框
    document.querySelectorAll(".mynote-slot").forEach((slot) => {
      if (slot.querySelector(".mynote-editing")) {
        slot.innerHTML = this.myNoteHtml(slot.dataset.note);
        renderMath(slot);
      }
    });
    document.querySelectorAll("details.toc").forEach((d) => { d.open = true; });
    setTimeout(() => window.print(), 60);
  },

  // 章末的「本章笔记总结」：整章读完之后自己串一遍
  // 放在筛选容器外面，所以搜索/类型筛选不会把它藏起来
  chapterSummaryHtml(subjectId, chapterId) {
    const noteId = this.chapterNoteId(subjectId, chapterId);
    const c = KaoyanData.chapter(subjectId, chapterId);
    return `
      <section class="chapter-summary" id="item-${noteId}">
        <header class="chapter-summary-head">
          <h3>本章笔记总结</h3>
          <span class="chapter-summary-sub">第${c.order}章 ${escapeHtml(c.name)} · 用自己的话把整章串一遍</span>
        </header>
        <div class="mynote-slot" data-note="${noteId}">${this.myNoteHtml(noteId)}</div>
      </section>`;
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

  // 章节内怎么分组。定义了 modules 的章节按「模块」排，其余章节仍按定义/定理/性质排。
  // 正文、顶部目录、右侧导轨三处共用这一个结果，保证三者永远一致。
  // 返回 [{ cls, label, brief, note, items }]。
  // 一张卡可以同时挂几个类型（伴随矩阵那张定义、定理、性质都占），
  // 按类型筛选时三栏里都应该出现它。没写 types 的就是单类型。
  itemTypes(it) {
    return it.types && it.types.length ? it.types : [it.type];
  },

  chapterGroups(subjectId, chapterId, items) {
    const byType = (list, extra) =>
      TYPE_ORDER.map((type) => ({
        cls: type + (extra ? " " + extra : ""),
        label: TYPE_LABEL[type],
        items: list.filter((it) => this.itemTypes(it).includes(type)),
      })).filter((g) => g.items.length);

    const c = KaoyanData.chapter(subjectId, chapterId);
    if (!c || !c.modules || !c.modules.length) return byType(items, "");

    const groups = c.modules
      .map((m, k) => ({
        cls: "module",
        label: "模块" + m.no + "　" + m.name,
        brief: m.brief || "",
        items: items.filter((it) => it.module === k + 1),
      }))
      .filter((g) => g.items.length);

    // 还没归入模块的条目照旧按类型排，并明确标出来，免得看着以为漏了
    const rest = byType(items.filter((it) => !it.module), "unsorted");
    if (rest.length) rest[0].note = "以下条目尚未并入模块，仍按定义 / 定理 / 性质排列";
    return groups.concat(rest);
  },

  // 每条知识点的显示编号：并入模块的用卡号（①②…），其余用「该类型在本章里的第几条」。
  // 按整章算，不受搜索和类型筛选影响 —— 筛选后编号还会跳的话就没法当索引用了。
  chapterNos(subjectId, chapterId) {
    const all = KaoyanData.itemsByChapter(subjectId, chapterId);
    const seen = {};
    const map = {};
    all.forEach((it) => {
      seen[it.type] = (seen[it.type] || 0) + 1;
      map[it.id] = it.card || String(seen[it.type]).padStart(2, "0");
    });
    return map;
  },

  renderChapterGroups(subjectId, chapterId) {
    const items = KaoyanData.itemsByChapter(subjectId, chapterId);
    const typeFilter = this.chapterTypeFilter || "all";
    const filtered = items.filter(
      (it) => typeFilter === "all" || App.itemTypes(it).includes(typeFilter)
    );
    const wrap = document.getElementById("chapter-item-groups");

    // 一开始搜索就换成结果列表：先给预览，看清楚命中在哪几张卡、正文里还是笔记里，
    // 点了再跳回正文。原来那种「就地筛选 + 标黄」看不出分布。
    if (searchText(this.chapterQuery)) {
      this.renderChapterResults(subjectId, chapterId, filtered, wrap);
      return;
    }
    this.chapterSearchMode(false);

    if (filtered.length === 0) {
      wrap.innerHTML = `<div class="empty-state">本章没有这一类知识点</div>`;
      renderMath(wrap);
      return;
    }

    const groups = this.chapterGroups(subjectId, chapterId, filtered);
    const nos = this.chapterNos(subjectId, chapterId);

    let html = this.tocHtml(groups, nos, subjectId, chapterId);
    groups.forEach((g) => {
      html += `
        <section class="type-group ${g.cls}">
          ${g.note ? `<p class="group-note">${escapeHtml(g.note)}</p>` : ""}
          <h3 class="type-group-title">
            <span class="type-group-dot" aria-hidden="true"></span>
            <span class="type-group-name">${escapeHtml(g.label)}</span>
            <span class="type-group-count">${g.items.length}</span>
            ${g.brief ? `<span class="type-group-brief">${escapeHtml(g.brief)}</span>` : ""}
          </h3>
          ${g.items.map((it) => this.entryHtml(it, nos[it.id])).join("")}
        </section>`;
    });
    wrap.innerHTML = html;
    renderMath(wrap);
    this.bindNoteEditors(wrap);
    this.bindToc(wrap);
  },

  // 搜索时把正文以外的东西收起来：本章总结会作为一条结果出现在列表里，
  // 导出条和上下章翻页跟结果列表摆在一起没有意义。
  chapterSearchMode(on) {
    [".chapter-summary", ".export-bar", ".pager"].forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) el.hidden = on;
    });
    // 退出搜索时把战果行也收起来；进入搜索时由 renderChapterHits 填内容再显示
    const bar = document.getElementById("chapter-hits");
    if (bar && !on) bar.hidden = true;
  },

  // 章内搜索结果：和全局搜索同一套结果卡，只是范围缩到本章，
  // 「在哪儿」显示的是模块和卡号，好一眼看出关键词散落在哪几个模块。
  // 按本章顺序排（不按相关度），这样读出来就是一张分布图。
  renderChapterResults(subjectId, chapterId, items, wrap) {
    const raw = (this.chapterQuery || "").trim();
    const q = searchText(raw);
    const c = KaoyanData.chapter(subjectId, chapterId);
    const nos = this.chapterNos(subjectId, chapterId);

    // 每张卡属于哪个模块（没分模块的章节这里就是「定义 / 定理 / 性质」）
    const whereOf = {};
    this.chapterGroups(subjectId, chapterId, KaoyanData.itemsByChapter(subjectId, chapterId))
      .forEach((g) => g.items.forEach((it) => { whereOf[it.id] = g.label; }));

    const hits = items
      .map((it) => {
        const inTitle = searchText(it.title).includes(q);
        const inBook = searchText(
          it.statement + " " + (it.explanation || "") + " " + (it.tags || []).join(" ")
        ).includes(q);
        const inNote = searchText(Notes.get(it.id)).includes(q);
        return inTitle || inBook || inNote ? { it, inTitle, inBook, inNote } : null;
      })
      .filter(Boolean);

    // 本章总结也是本章的一部分，一起搜，排在最后
    const chNote = this.chapterNoteId(subjectId, chapterId);
    const summaryHit =
      Notes.has(chNote) && searchText(c.name + " 本章总结 " + Notes.get(chNote)).includes(q);

    this.chapterSearchMode(true);
    this.renderChapterHits(hits, summaryHit, KaoyanData.itemsByChapter(subjectId, chapterId).length, raw);

    if (!hits.length && !summaryHit) {
      wrap.innerHTML = `<div class="empty-state">本章的知识点和笔记里都没有「${escapeHtml(raw)}」</div>`;
      renderMath(wrap);
      return;
    }

    const rows = hits.map(({ it, inTitle, inBook, inNote }) => {
      const parts = [];
      if (inBook || inTitle) {
        parts.push(
          `<span class="result-snippet">${this.textSnippet(it.statement + " " + (it.explanation || ""), raw)}</span>`
        );
      }
      if (inNote) {
        parts.push(
          `<span class="result-snippet"><span class="snippet-from">笔记</span>${this.textSnippet(Notes.get(it.id), raw)}</span>`
        );
      }
      // 一张卡挂几个类型时（伴随矩阵那张定义、定理、性质都占），
      // 正在按某个类型筛就显示那个类型的标，免得筛「定义」却看见「定理」的标
      const tf = this.chapterTypeFilter || "all";
      const badge = tf !== "all" && this.itemTypes(it).includes(tf) ? tf : it.type;
      return `
      <a class="result" href="#${subjectId}/${chapterId}" data-item="${it.id}">
        <span class="result-type ${badge}">${TYPE_LABEL[badge]}</span>
        <span class="result-body">
          <span class="result-title"><span class="result-no">${nos[it.id]}</span>${this.mark(it.title, raw)}</span>
          <span class="result-where">${escapeHtml(whereOf[it.id] || "")}</span>
          ${parts.join("")}
        </span>
      </a>`;
    });

    if (summaryHit) {
      rows.push(`
      <a class="result" href="#${subjectId}/${chapterId}" data-item="${chNote}">
        <span class="result-type summary">总结</span>
        <span class="result-body">
          <span class="result-title">${this.mark("本章笔记总结", raw)}</span>
          <span class="result-where">整章串一遍</span>
          <span class="result-snippet"><span class="snippet-from">笔记</span>${this.textSnippet(Notes.get(chNote), raw)}</span>
        </span>
      </a>`);
    }

    wrap.innerHTML = `<div class="result-list">${rows.join("")}</div>`;
    renderMath(wrap);

    // 点结果：清掉搜索、整章复原，再滚到那一条闪一下。
    // hash 没变，所以直接重走一遍 route()。
    wrap.querySelectorAll(".result").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this._pendingHighlight = link.dataset.item;
        this.route();
      });
    });
  },

  // 搜索框下面那行：命中几条、分布在哪儿
  renderChapterHits(hits, summaryHit, total, raw) {
    const bar = document.getElementById("chapter-hits");
    if (!bar) return;
    const noteOnly = hits.filter((h) => !h.inTitle && !h.inBook && h.inNote).length;
    if (!hits.length && !summaryHit) {
      bar.hidden = false;
      bar.innerHTML = `「${escapeHtml(raw)}」在本章没有出现`;
      return;
    }
    const parts = [`本章 ${total} 条里命中 <b>${hits.length}</b> 条`];
    if (noteOnly) parts.push(`其中 <b>${noteOnly}</b> 条只写在笔记里`);
    if (summaryHit) parts.push("本章总结也命中");
    parts.push("点结果跳到正文");
    bar.hidden = false;
    bar.innerHTML = `「${escapeHtml(raw)}」　${parts.join("　·　")}`;
  },

  // ---------- 右侧「本章目录」导轨 ----------
  // 页面顶部那份目录一往下滚就看不见了，所以在右边缘常驻一条：
  // 鼠标移上去弹出，移开收起；触屏没有 hover，点一下钉住。
  renderRail(subjectId, chapterId) {
    const rail = document.getElementById("chapter-rail");
    if (!rail) return;
    const c = KaoyanData.chapter(subjectId, chapterId);
    const items = KaoyanData.itemsByChapter(subjectId, chapterId);
    if (!c || !items.length) { this.hideRail(); return; }

    const groups = this.chapterGroups(subjectId, chapterId, items);
    const nos = this.chapterNos(subjectId, chapterId);

    const cols = groups
      .map(
        ({ cls, label, items: list }) => `
        <div class="rail-group ${cls}">
          <div class="rail-group-head">
            <span class="toc-dot" aria-hidden="true"></span>
            <span class="rail-group-name">${escapeHtml(label)}</span>
            <span class="rail-group-count">${list.length}</span>
          </div>
          <ol class="rail-list">
            ${list
              .map(
                (it) => `<li>
                  <a href="#item-${it.id}" data-goto="${it.id}">
                    <span class="toc-no">${nos[it.id]}</span>
                    <span class="toc-title">${escapeHtml(it.title)}</span>
                    ${this.noteDotHtml(it.id)}
                  </a>
                </li>`
              )
              .join("")}
          </ol>
        </div>`
      )
      .join("");

    const chNote = this.chapterNoteId(subjectId, chapterId);
    const foot = `
      <a class="toc-foot" href="#item-${chNote}" data-goto="${chNote}">
        <span class="toc-foot-name">本章笔记总结</span>
        <span class="toc-foot-state${Notes.has(chNote) ? " done" : ""}">${
          Notes.has(chNote) ? (Notes.isPending(chNote) ? "已写 · 未进仓库" : "已写") : "还没写"
        }</span>
      </a>`;

    rail.innerHTML = `
      <button class="rail-tab" id="rail-tab" aria-expanded="false" aria-controls="rail-panel">本章目录</button>
      <div class="rail-panel" id="rail-panel">
        <div class="rail-inner">
          <div class="rail-head">
            <span class="rail-head-no">${String(c.order).padStart(2, "0")}</span>
            <span class="rail-head-name">${escapeHtml(c.name)}</span>
            <span class="rail-head-count">${items.length} 条</span>
          </div>
          <div class="rail-body">${cols}${foot}</div>
        </div>
      </div>`;
    rail.hidden = false;
    rail.classList.remove("open");

    const tab = document.getElementById("rail-tab");
    tab.addEventListener("click", () => {
      const on = !rail.classList.contains("open");
      rail.classList.toggle("open", on);
      tab.setAttribute("aria-expanded", String(on));
    });
    this.bindToc(rail);
    // 点了条目就收起（触屏钉住的情况下尤其需要）
    rail.querySelectorAll("[data-goto]").forEach((a) => {
      a.addEventListener("click", () => this.closeRail());
    });
  },

  hideRail() {
    const rail = document.getElementById("chapter-rail");
    if (!rail) return;
    rail.hidden = true;
    rail.classList.remove("open");
    rail.innerHTML = "";
  },

  closeRail() {
    const rail = document.getElementById("chapter-rail");
    if (!rail) return;
    rail.classList.remove("open");
    const tab = document.getElementById("rail-tab");
    if (tab) tab.setAttribute("aria-expanded", "false");
  },

  // 目录条目后面那个小圆点：写过笔记就点亮，还没进仓库的是橙色
  noteDotHtml(itemId) {
    if (!Notes.has(itemId)) return "";
    const pending = Notes.isPending(itemId);
    return `<span class="toc-noted${pending ? " pending" : ""}" title="${
      pending ? "已写笔记，但还没进仓库" : "已写笔记"
    }">●</span>`;
  },

  // 章节开头的目录：按类型分栏，点条目滚到对应位置
  tocHtml(groups, nos, subjectId, chapterId) {
    const total = groups.reduce((n, g) => n + g.items.length, 0);
    if (!total) return "";
    const cols = groups
      .map(
        ({ cls, label, items }) => `
        <div class="toc-col ${cls}">
          <div class="toc-col-head">
            <span class="toc-dot" aria-hidden="true"></span>
            <span class="toc-col-name">${escapeHtml(label)}</span>
            <span class="toc-col-count">${items.length}</span>
          </div>
          <ol class="toc-list">
            ${items
              .map(
                (it) => `<li>
                  <a href="#item-${it.id}" data-goto="${it.id}">
                    <span class="toc-no">${nos[it.id]}</span>
                    <span class="toc-title">${escapeHtml(it.title)}</span>
                    ${this.noteDotHtml(it.id)}
                  </a>
                </li>`
              )
              .join("")}
          </ol>
        </div>`
      )
      .join("");
    const chNote = this.chapterNoteId(subjectId, chapterId);
    const foot = `
      <a class="toc-foot" href="#item-${chNote}" data-goto="${chNote}">
        <span class="toc-foot-name">本章笔记总结</span>
        <span class="toc-foot-state${Notes.has(chNote) ? " done" : ""}">${
          Notes.has(chNote) ? (Notes.isPending(chNote) ? "已写 · 未进仓库" : "已写") : "还没写"
        }</span>
      </a>`;

    return `
      <details class="toc" open>
        <summary class="toc-summary">本章目录<span class="toc-total">${total} 条</span></summary>
        <div class="toc-cols">${cols}</div>
        ${foot}
      </details>`;
  },

  // 存完之后只更新目录里那一行的标记，不整块重渲染（避免页面跳动）
  refreshTocState(noteId) {
    const has = Notes.has(noteId);
    const pending = Notes.isPending(noteId);
    // 页面顶部的目录和右侧导轨里都有同一条，一起更新
    document.querySelectorAll('[data-goto="' + noteId.replace(/"/g, '\\"') + '"]').forEach((link) => {
      const foot = link.querySelector(".toc-foot-state");
      if (foot) {
        foot.textContent = has ? (pending ? "已写 · 未进仓库" : "已写") : "还没写";
        foot.classList.toggle("done", has);
        return;
      }
      let dot = link.querySelector(".toc-noted");
      if (!has) { if (dot) dot.remove(); return; }
      if (!dot) {
        dot = document.createElement("span");
        dot.className = "toc-noted";
        dot.textContent = "●";
        link.appendChild(dot);
      }
      dot.classList.toggle("pending", pending);
      dot.title = pending ? "已写笔记，但还没进仓库" : "已写笔记";
    });
  },

  bindToc(scope) {
    scope.querySelectorAll("[data-goto]").forEach((a) => {
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
        <div class="entry-no" aria-hidden="true">${index}</div>
        <div class="entry-main">
          <h4 class="entry-title">${escapeHtml(item.title)}</h4>
          <!-- 两张卡：上面这张是教材内容（正文 + 提示），下面那张是自己写的笔记 -->
          <section class="card card-book">
            <div class="card-book-head"><span class="card-book-label">教材内容</span></div>
            <div class="entry-statement">${bulletize(item.statement)}</div>
            ${item.diagram ? `<figure class="entry-figure">${item.diagram}${item.diagramCaption ? `<figcaption>${escapeHtml(item.diagramCaption)}</figcaption>` : ""}</figure>` : ""}
            <div class="entry-note"><div class="note-label">〔提示〕</div><div class="note-body">${bulletize(item.explanation)}</div></div>
          </section>
          <div class="mynote-slot" data-note="${item.id}">${this.myNoteHtml(item.id)}</div>
          ${
            item.tags && item.tags.length
              ? `<div class="entry-tags">${item.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>`
              : ""
          }
        </div>
      </article>`;
  },

  // 公式段的正则：$$...$$（可跨行）或 $...$（不跨行）
  MATH_RE() {
    return new RegExp("(\\$\\$[\\s\\S]*?\\$\\$|\\$[^$\\n]*\\$)");
  },

  // 这条笔记按不按 Markdown 显示。
  // 判定只看内容本身（所以跟着笔记走，换设备一样），并允许手动覆盖。
  // 现有的纯文本笔记一条都不含下面这些记号，所以不会被影响。
  looksLikeMarkdown(text) {
    const body = String(text || "").split(this.MATH_RE()).filter((_, i) => !(i % 2)).join(" ");
    return body.split(String.fromCharCode(10)).some((l) =>
      /^#{1,6}\s/.test(l) ||          // # 标题
      /^\s*```/.test(l) ||            // 代码围栏
      /^\s*\|.*\|/.test(l) ||          // | 表格 |
      /^>\s/.test(l) ||               // > 引用
      /^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(l)   // --- 分隔线
    );
  },

  noteFormat(noteId, text) {
    const forced = NoteFormat.get(noteId);
    if (forced) return forced;
    return this.looksLikeMarkdown(text) ? "md" : "text";
  },

  // 笔记正文的显示。四步流水线，存储和导出的原文一个字不动：
  //   ① 把 $...$ / $$...$$ 挖出来换成占位符（公式先保护起来）
  //   ② 剩下的交给 Markdown 渲染（或纯文本模式下只认 **加粗**）
  //   ③ 占位符换回公式，公式里的 < > & 转成实体，浏览器解码回真字符
  //   ④ 交给 KaTeX（由调用方的 renderMath 完成）
  noteBodyHtml(text, noteId) {
    const NUL = String.fromCharCode(0);
    const store = [];
    // ① 一律先从「原文」里挖公式段，先不转义。
    //    （早先纯文本那条路是先 escapeHtml 再挖，公式会被转义两次，
    //      $r(A) < n-1$ 就显示成字面的 &lt;。）
    const masked = String(text == null ? "" : text).split(this.MATH_RE()).map((part, i) => {
      if (!(i % 2)) return part;
      store.push(part);
      return NUL + (store.length - 1) + NUL;
    }).join("");
    // ③ 还原时才转义公式：浏览器解码回真的 < > &，KaTeX 照常识别
    const unmask = (html) => html.replace(new RegExp(NUL + "(\\d+)" + NUL, "g"),
      (m, k) => escapeHtml(store[Number(k)]));

    const asMd = noteId !== undefined
      ? this.noteFormat(noteId, text) === "md"
      : this.looksLikeMarkdown(text);

    // ② 公式之外的部分
    if (asMd && typeof marked !== "undefined") {
      // 只把 < 换成 &lt; 挡住原始 HTML 标签；& 一律不动，
      // 这样 AI 常用的 &emsp; &nbsp; 这类实体还能正常生效。
      return unmask(marked.parse(masked.split("<").join("&lt;"), { gfm: true, breaks: false }));
    }
    // 纯文本模式：维持原样，只认 **加粗**
    const BOLD = new RegExp("\\*\\*([^*\\n]+?)\\*\\*", "g");
    return unmask(escapeHtml(masked).replace(BOLD, "<strong>$1</strong>"));
  },

  // 体检：Markdown 里最容易踩的坑是「缩进被当成代码块」。
  // 渲染完数一下 <pre>，多于原文的 ``` 围栏就说明有意外代码块。
  codeBlockCheck(text) {
    if (!this.looksLikeMarkdown(text) || typeof marked === "undefined") return null;
    const html = this.noteBodyHtml(text);
    const got = (html.match(/<pre/g) || []).length;
    const want = Math.floor((text.match(/^\s*```/gm) || []).length / 2);
    if (got <= want) return null;
    const lines = [];
    text.split(String.fromCharCode(10)).forEach((l, i) => {
      if (/^ {4,}\S/.test(l) && !/^\s*([-*+]|\d+\.)\s/.test(l)) lines.push(i + 1);
    });
    return { got, want, lines };
  },

  // 仓库里有没有这条笔记
  hasSeed(noteId) {
    return !!(window.__KAOYAN_SEED_NOTES__[noteId] || "").trim();
  },

  // 一眼看出这条笔记是不是已经跟着仓库走了
  noteFlagHtml(noteId) {
    if (!Notes.isPending(noteId)) {
      return `<span class="mynote-flag saved" title="已经写进仓库文件，有 Git 历史，换任何设备打开都能看到">已进仓库</span>`;
    }
    if (this.hasSeed(noteId)) {
      return `<span class="mynote-flag pending" title="这台设备上的版本和仓库里的那一版不一样（可能是你后来改过，也可能是仓库那版重新排过版）。点「用仓库版」可以丢掉本地这一版。">本地已改</span>`;
    }
    return `<span class="mynote-flag pending" title="只存在这台设备的浏览器里。清缓存、换设备、iOS Safari 七天没打开都可能丢失。导出成文件交给我提交进仓库才算安全。">未进仓库</span>`;
  },

  // 「笔记」区块：有内容就展示，没有就显示一个添加按钮
  myNoteHtml(noteId) {
    const text = Notes.get(noteId);
    const isCh = noteId.indexOf("ch:") === 0;
    if (!text) {
      return `<button class="mynote-add" data-action="edit">＋ ${isCh ? "写一段本章总结" : "写一段笔记"}</button>`;
    }
    return `<div class="mynote${Notes.isPending(noteId) ? " is-pending" : ""}">
      <div class="mynote-head">
        <span class="mynote-label">${isCh ? "本章总结" : "笔记"}</span>
        ${this.noteFlagHtml(noteId)}
        ${
          Notes.isPending(noteId) && this.hasSeed(noteId)
            ? `<button class="mynote-restore" data-action="restore" title="丢掉本地这一版，改用仓库里的那一版">用仓库版</button>`
            : ""
        }
        <button class="mynote-edit" data-action="edit">编辑</button>
      </div>
      <div class="mynote-body${this.noteFormat(noteId, text) === "md" ? " md" : ""}">${this.noteBodyHtml(text, noteId)}</div>
    </div>`;
  },

  editorHtml(noteId) {
    const text = Notes.get(noteId);
    const isCh = noteId.indexOf("ch:") === 0;
    const placeholder = isCh
      ? "把整章串成一条线，比如：&#10;&#10;这一章在讲什么：…&#10;几个概念怎么串起来：…&#10;考试会怎么考：…&#10;我最容易错的地方：…&#10;&#10;公式用 $ 包起来会渲染，例如 $A\\vec{v}=\\lambda\\vec{v}$"
      : "用你自己的话写一遍，比如：&#10;&#10;对象：…&#10;规则：…&#10;意义：…&#10;&#10;公式用 $ 包起来会渲染，例如 $A\\vec{v}=\\lambda\\vec{v}$";
    return `<div class="mynote mynote-editing">
      <div class="mynote-head">
        <span class="mynote-label">${isCh ? "本章总结" : "笔记"}</span>
        <button class="mynote-md-btn" data-action="import-md" title="读取一个 .md 文件，原样填进来">导入 .md</button>
        <button class="mynote-preview-btn" data-action="preview">预览</button>
        <button class="mynote-zoom-btn" data-action="zoom" title="全屏编辑（Esc 退出）">放大</button>
      </div>
      <textarea class="mynote-input" rows="${isCh ? 14 : 9}" placeholder="${placeholder}">${escapeHtml(text)}</textarea>
      <div class="mynote-warn" hidden></div>
      <div class="mynote-preview" hidden></div>
      <input type="file" class="mynote-md-file" accept=".md,.markdown,.txt,text/markdown,text/plain" hidden />
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
          // 已有内容的话，先把输入框撑到刚好放下（最高 560px），省得一上来就在小窗里翻
          if (ta.value) ta.style.height = Math.min(ta.scrollHeight + 4, 560) + "px";
          this.bindMdFile(slot, id);
          this.refreshEditorWarn(slot, id);
          ta.addEventListener("input", () => {
            clearTimeout(this._warnTimer);
            this._warnTimer = setTimeout(() => this.refreshEditorWarn(slot, id), 400);
          });
          ta.focus();
          ta.setSelectionRange(ta.value.length, ta.value.length);
        } else if (action === "zoom") {
          this.toggleZoom(slot, btn);
        } else if (action === "restore") {
          if (!confirm("用仓库里的那一版覆盖本地这一版？\n本地这一版会被清掉，无法撤销。")) return;
          Notes.set(id, "");
          show(this.myNoteHtml(id));
          this.refreshNoteCount();
          this.refreshTocState(id);
        } else if (action === "preview") {
          // 只是换个显示方式，不动 textarea 里的任何字符
          const ta = slot.querySelector(".mynote-input");
          const pv = slot.querySelector(".mynote-preview");
          const toPreview = ta.hidden === false;
          ta.hidden = toPreview;
          pv.hidden = !toPreview;
          btn.textContent = toPreview ? "回到编辑" : "预览";
          if (toPreview) {
            const fmt = this.noteFormat(id, ta.value);
            pv.className = "mynote-preview" + (fmt === "md" ? " md" : "");
            pv.innerHTML = ta.value.trim() ? this.noteBodyHtml(ta.value, id) : "还没写内容";
            renderMath(pv);
          }
          this.refreshEditorWarn(slot, id);
        } else if (action === "import-md") {
          slot.querySelector(".mynote-md-file").click();
        } else if (action === "toggle-fmt") {
          // 手动切换显示模式（只影响这一条，且只存在本机）
          const ta = slot.querySelector(".mynote-input");
          const now = this.noteFormat(id, ta.value);
          NoteFormat.set(id, now === "md" ? "text" : "md");
          this.refreshEditorWarn(slot, id);
          const pv = slot.querySelector(".mynote-preview");
          if (!pv.hidden) {
            const fmt = this.noteFormat(id, ta.value);
            pv.className = "mynote-preview" + (fmt === "md" ? " md" : "");
            pv.innerHTML = ta.value.trim() ? this.noteBodyHtml(ta.value, id) : "还没写内容";
            renderMath(pv);
          }
        } else if (action === "save") {
          const val = slot.querySelector(".mynote-input").value;
          const chk = this.noteFormat(id, val) === "md" ? this.codeBlockCheck(val) : null;
          if (chk && !confirm(
            "体检发现 " + chk.lines.length + " 行缩进被当成了代码块（第 " +
            chk.lines.slice(0, 8).join("、") + (chk.lines.length > 8 ? " …" : "") + " 行）。" +
            String.fromCharCode(10) + String.fromCharCode(10) +
            "内容不会丢，只是会显示成灰底等宽。要继续保存吗？"
          )) return;
          const had = Notes.has(id);
          if (!Notes.set(id, val)) {
            alert("保存失败：浏览器存储空间不足或被禁用。");
            return;
          }
          this.exitZoom();
          show(this.myNoteHtml(id));
          this.refreshNoteCount();
          this.refreshTocState(id);
          if (val.trim()) this.askDownload(id);
        } else if (action === "cancel") {
          this.exitZoom();
          show(this.myNoteHtml(id));
        } else if (action === "delete") {
          Notes.set(id, "");
          this.exitZoom();
          show(this.myNoteHtml(id));
          this.refreshNoteCount();
          this.refreshTocState(id);
        }
      });
    });
  },

  // 章节总结用的笔记 id，和知识点 id 区分开
  chapterNoteId(subjectId, chapterId) {
    return "ch:" + subjectId + "/" + chapterId;
  },

  // 选一个 .md 文件，把内容原样填进输入框（只读文件，不做任何转换）
  bindMdFile(slot, noteId) {
    const input = slot.querySelector(".mynote-md-file");
    if (!input || input.dataset.bound) return;
    input.dataset.bound = "1";
    input.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!file) return;
      const ta = slot.querySelector(".mynote-input");
      if (ta.value.trim() && !confirm("输入框里已经有内容，用文件内容覆盖掉？")) return;
      const reader = new FileReader();
      reader.onload = () => {
        // 只做一件事：原样放进去。不解析、不转换、不清洗，连换行符都不归一化。
        ta.value = String(reader.result);
        ta.style.height = Math.min(ta.scrollHeight + 4, 560) + "px";
        this.refreshEditorWarn(slot, noteId);
        ta.focus();
      };
      reader.readAsText(file, "utf-8");
    });
  },

  // 编辑器顶部的状态条：当前按什么显示、能不能切、有没有意外代码块
  refreshEditorWarn(slot, noteId) {
    const box = slot.querySelector(".mynote-warn");
    const ta = slot.querySelector(".mynote-input");
    if (!box || !ta) return;
    const fmt = this.noteFormat(noteId, ta.value);
    const forced = NoteFormat.get(noteId);
    const chk = fmt === "md" ? this.codeBlockCheck(ta.value) : null;
    const bits = [];
    bits.push('<span class="mynote-fmt ' + fmt + '">' +
      (fmt === "md" ? "Markdown" : "纯文本") + "</span>");
    bits.push('<span class="mynote-fmt-why">' +
      (forced ? "（手动指定）" : "（按内容自动判定）") + "</span>");
    bits.push('<button class="mynote-fmt-btn" data-action="toggle-fmt">改成' +
      (fmt === "md" ? "纯文本" : "Markdown") + "</button>");
    if (chk) {
      bits.push('<span class="mynote-codewarn">⚠ 第 ' +
        chk.lines.slice(0, 6).join("、") + (chk.lines.length > 6 ? " …" : "") +
        " 行会显示成代码块</span>");
    }
    box.innerHTML = bits.join("");
    box.hidden = false;
  },

  // 全屏编辑：只是给编辑框加一个 class，DOM 不搬家，原来的事件绑定照常有效
  toggleZoom(slot, btn) {
    const box = slot.querySelector(".mynote-editing");
    if (!box) return;
    const on = !box.classList.contains("fullscreen");
    box.classList.toggle("fullscreen", on);
    document.body.classList.toggle("mynote-zoomed", on);
    btn.textContent = on ? "还原" : "放大";
    const ta = box.querySelector(".mynote-input");
    if (ta) {
      if (on) ta.style.height = "";           // 交给 flex 撑满
      else ta.style.height = Math.min(ta.scrollHeight + 4, 560) + "px";
      if (!ta.hidden) ta.focus();
    }
  },

  exitZoom() {
    const box = document.querySelector(".mynote-editing.fullscreen");
    if (box) {
      box.classList.remove("fullscreen");
      const b = box.querySelector('[data-action="zoom"]');
      if (b) b.textContent = "放大";
    }
    document.body.classList.remove("mynote-zoomed");
  },

  // 定位一条笔记：属于哪个学科、第几章；知识点还要给出在本章同类里排第几
  locate(noteId) {
    if (noteId.indexOf("ch:") === 0) {
      const [subjectId, chapterId] = noteId.slice(3).split("/");
      const s = KaoyanData.subject(subjectId);
      const c = s && KaoyanData.chapter(subjectId, chapterId);
      if (!c) return null;
      return {
        subject: s, chapter: c, item: null, isChapter: true,
        typeLabel: "本章总结", index: 0, title: c.name,
      };
    }
    for (const s of this.subjects) {
      const it = KaoyanData.items(s.id).find((x) => x.id === noteId);
      if (!it) continue;
      const c = KaoyanData.chapter(s.id, it.chapterId);
      const sameType = KaoyanData.itemsByChapter(s.id, it.chapterId).filter((x) => x.type === it.type);
      const idx = sameType.findIndex((x) => x.id === noteId) + 1;
      return {
        subject: s, chapter: c, item: it, isChapter: false,
        typeLabel: TYPE_LABEL[it.type], index: idx, title: it.title,
      };
    }
    return null;
  },

  // 一条笔记在章内的位置标签：定义05 / 本章总结
  noteSlotLabel(p) {
    if (p.isChapter) return "本章总结";
    if (p.item && p.item.card) return "卡" + p.item.card;
    return p.typeLabel + String(p.index).padStart(2, "0");
  },

  // 后缀跟着内容走：Markdown 的笔记导出 .md，纯文本的仍是 .txt。
  // 文件名：线性代数-第3章-定义05-向量空间、基、维数的定义.md
  //         线性代数-第5章-本章总结-特征值与特征向量.txt
  noteFileExt(noteId) {
    return this.noteFormat(noteId, Notes.get(noteId)) === "md" ? ".md" : ".txt";
  },

  noteFileName(noteId) {
    const p = this.locate(noteId);
    const ext = this.noteFileExt(noteId);
    if (!p) return "笔记" + ext;
    const raw = [
      p.subject.name.replace(/（.*?）/g, ""),
      "第" + p.chapter.order + "章",
      this.noteSlotLabel(p),
      p.title,
    ].join("-");
    // 去掉文件名里不能用的字符
    return raw.replace(/[\\/:*?"<>|]/g, "_") + ext;
  },

  // 正文的起止标记。用 HTML 注释：Markdown 预览时它是隐形的，
  // 但边界又绝对明确 —— 拿到文件就能一个字符不差地切出正文。
  BODY_OPEN: "<!-- ↓ 正文开始 · 到「正文结束」为止逐字节原样，请勿改动 -->",
  bodyClose(noteId) {
    return "<!-- ↑ 正文结束 · " + noteId + " -->";
  },

  // 文件内容：头部写清出处和 id，正文夹在起止标记之间，逐字节原样（不 trim）。
  // 标记与正文之间各垫一个空行，保证任何 Markdown 渲染器都把注释和正文当成两个块；
  // 反过来切正文时，去掉这一前一后各一个空行即可还原。
  buildNoteText(noteId) {
    const p = this.locate(noteId);
    const body = Notes.get(noteId);
    if (!p) return body;
    const where = p.subject.name + " · 第" + p.chapter.order + "章 " + p.chapter.name +
      " · " + this.noteSlotLabel(p);
    const fmt = this.noteFormat(noteId, body) === "md" ? "Markdown" : "纯文本";
    return [
      "> **" + where + "**",
      "> " + p.title + "　·　`" + noteId + "`　·　" + fmt,
      "",
      this.BODY_OPEN,
      "",
      body,
      "",
      this.bodyClose(noteId),
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
      ? p.subject.name + " · 第" + p.chapter.order + "章 · " +
        this.noteSlotLabel(p)
      : "";
    document.getElementById("save-modal-file").textContent = this.noteFileName(itemId);
    const dl = document.getElementById("save-download");
    if (dl) dl.textContent = "下载 " + this.noteFileExt(itemId);
    modal.hidden = false;
  },

  downloadNote(itemId) {
    const mime = this.noteFileExt(itemId) === ".md" ? "text/markdown" : "text/plain";
    const blob = new Blob([this.buildNoteText(itemId)], { type: mime + ";charset=utf-8" });
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
