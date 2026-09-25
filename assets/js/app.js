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
    .replace(/==/g, "")
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
    .replace(/==/g, "")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// 教材内容和笔记（Markdown）的显示。数据里存的是原文，这里只负责渲染，一个字不改。
//
// 写法约定（教材和笔记通用）：
// - 「### 〔定义〕名字」小标题按〔〕里的字上色：
//   定义 蓝 / 定理、推论 橙 / 性质 绿 / 方法 红 / 例题 青 / 提示 紫
// - ==重点== 显示为下划线（Markdown 本身没有下划线，这是本站约定），公式也能划
// 教材额外一条：「### 〔提示〕」那一节放进卡片底部的提示区（笔记里留在原位）。
// 公式先挖出来再交给 Markdown，保护流水线只有这一份。
const TERM_KINDS = "定义|定理|性质|推论|方法|例题|意义|提示";
const BOOK_HEAD = new RegExp("^#{1,6}[ \\t]*(〔(" + TERM_KINDS + ")〕.*?)[ \\t]*$");
const BOOK_CLASS = { 定义: "def", 定理: "thm", 推论: "thm", 性质: "prp", 方法: "method", 例题: "ex", 意义: "meaning", 提示: "tip" };

// ==重点== 划到公式上：KaTeX 排出来的公式是 inline-block，外层 <u> 的下划线画不进去。
// 所以被 ==…== 包住的公式、公式里面写的 ==…==，显示时都换成 KaTeX 自己的 \underline{}（原文不动）。
const UL_RE = /==((?:(?!==)[^\n])+?)==/g;

function mathForDisplay(src, underlined) {
  const d = src.slice(0, 2) === "$$" ? "$$" : "$";
  let body = src.slice(d.length, src.length - d.length)
    .replace(/==((?:(?!==)[\s\S])+?)==/g, "\\underline{$1}");
  if (underlined && !/\\tag\b/.test(body)) body = "\\underline{" + body + "}";
  return d + body + d;
}

// ==…== 换成 <u>，记下哪些公式在 <u> 里；再把占位符换回公式（公式里的 < > & 转实体）
function underlineAndUnmask(html, store) {
  const NUL = String.fromCharCode(0);
  const TOKEN = new RegExp(NUL + "(\\d+)" + NUL, "g");
  const under = new Set();
  html = html.replace(UL_RE, (m, inner) => {
    (inner.match(TOKEN) || []).forEach((t) => under.add(Number(t.slice(1, -1))));
    return "<u>" + inner + "</u>";
  });
  return html.replace(TOKEN, (m, k) => escapeHtml(mathForDisplay(store[Number(k)], under.has(Number(k)))));
}

// 分隔线 ---：教材的小节之间本来就有细线，开头、结尾的分隔线也没有意义，显示时略过（原文不动）。
// 只去「前面是空行」的那种；紧贴在一段文字下面的 --- 是 Markdown 的标题写法，不碰。
const HR_LINE = /^ {0,3}(?:(?:-[ \t]*){3,}|(?:\*[ \t]*){3,}|(?:_[ \t]*){3,})$/;

function trimRules(text) {
  const lines = String(text == null ? "" : text).split("\n");
  const blank = (l) => l === undefined || !l.trim();
  while (lines.length && (blank(lines[0]) || HR_LINE.test(lines[0]))) lines.shift();
  while (lines.length) {
    const last = lines[lines.length - 1];
    if (blank(last) || (HR_LINE.test(last) && blank(lines[lines.length - 2]))) lines.pop();
    else break;
  }
  return lines.join("\n");
}

function mdHtml(text, inline) {
  const NUL = String.fromCharCode(0);
  const store = [];
  const masked = String(text == null ? "" : text).split(App.MATH_RE()).map((part, i) => {
    if (!(i % 2)) return part;
    store.push(part);
    return NUL + (store.length - 1) + NUL;
  }).join("");
  // 加粗：CommonMark 的规则遇到中文标点经常失效（「**甲）**乙」不加粗，星号原样露出来），
  // 教材统一按「同一行里成对的 ** 就加粗」处理：先换成私用区字符躲过 Markdown，渲染完再换回 <strong>
  const B1 = String.fromCharCode(0xE000), B2 = String.fromCharCode(0xE001);
  const safe = masked.split("<").join("&lt;").replace(/\*\*([^*\n]+?)\*\*/g, B1 + "$1" + B2);
  let html = inline
    ? marked.parseInline(safe, { gfm: true })
    : marked.parse(safe, { gfm: true, breaks: false });
  html = html.split(B1).join("<strong>").split(B2).join("</strong>");
  return underlineAndUnmask(html, store);
}

// 只给 Markdown 标题上色：保留原文字、公式和层级，也兼容未加〔〕的例题及小题。
const NOTE_TERM_HEAD = new RegExp("^〔(" + TERM_KINDS + ")〕");

function noteMdHtml(text) {
  return mdHtml(trimRules(text)).replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (m, level, head) => {
    const title = head.replace(HTML_TAG, "").trim()
      .replace(/^(?:[一二三四五六七八九十]+、|\d+[.、．])[ \t]*/, "");
    const term = title.match(NOTE_TERM_HEAD);
    let cls = term ? BOOK_CLASS[term[1]] : "";
    if (!cls && /^例题(?=$|[\s:：0-9一二三四五六七八九十（(])/.test(title)) cls = "ex";
    if (!cls && /^(?:【|〔)?小题\s*[0-9一二三四五六七八九十]+(?=$|[\s】〕:：、.．（(])/.test(title)) cls = "subquestion";
    return cls ? '<h' + level + ' class="term-head ' + cls + '">' + head + '</h' + level + '>' : m;
  });
}

// → { main: 正文 HTML（一个〔〕小节一个 .term）, tip: 提示 HTML }
function bookParts(md) {
  const sections = [{ label: null, kind: null, lines: [] }];
  String(md == null ? "" : md).split("\n").forEach((line) => {
    const m = line.match(BOOK_HEAD);
    const meaning = line.match(/^#{1,6}[ \t]*意义(?:[ \t]*[:：][ \t]*(.*?))?[ \t]*$/);
    if (m) sections.push({ label: m[1], kind: m[2], lines: [] });
    else if (meaning) sections.push({ label: "〔意义〕" + (meaning[1] || ""), kind: "意义", lines: [] });
    else sections[sections.length - 1].lines.push(line);
  });
  let main = "";
  let tip = "";
  sections.forEach((s) => {
    const body = trimRules(s.lines.join("\n"));
    if (s.kind === "提示") {
      // 提示放到卡片底部的提示区；「### 〔提示〕名字」和「〔定义〕名字」一样，名字跟在同一行
      const name = s.label.replace(/^〔提示〕/, "").trim();
      if (name || body.trim()) {
        tip += '<div class="note-label">' + mdHtml(s.label, true) + '</div><div class="note-body">' + mdHtml(body) + "</div>";
      }
    } else if (!s.label) {
      if (body.trim()) main += '<div class="term-md">' + mdHtml(body) + "</div>";
    } else {
      main += '<div class="term"><div class="term-label ' + BOOK_CLASS[s.kind] + '">' +
        mdHtml(s.label, true) + '</div><div class="term-md">' + mdHtml(body) + "</div></div>";
    }
  });
  return { main, tip };
}

// 搜索、摘要用的教材原文（本机改过的优先）
function bookText(it) {
  return BookEdits.get(it.id);
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
    const collapseBtn = document.getElementById("sidebar-collapse");
    const reopenBtn = document.getElementById("sidebar-reopen");
    const backdrop = document.getElementById("sidebar-backdrop");
    const sidebar = document.getElementById("sidebar");
    const shell = document.querySelector(".app-shell");
    const open = () => { sidebar.classList.add("open"); backdrop.classList.add("show"); };
    const close = () => { sidebar.classList.remove("open"); backdrop.classList.remove("show"); };
    if (menuBtn) menuBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
    if (collapseBtn) collapseBtn.addEventListener("click", () => shell.classList.add("sidebar-collapsed"));
    if (reopenBtn) reopenBtn.addEventListener("click", () => shell.classList.remove("sidebar-collapsed"));
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
    const num = document.getElementById("side-pending-n");
    const textPending = Notes.pendingIds().length + BookEdits.pendingIds().length;
    const update = (n) => { box.hidden = n === 0; if (num) num.textContent = n; };
    update(textPending);
    MindMaps.pendingCount().then((count) => update(textPending + count)).catch(() => {});
  },

  // 把所有「还没进仓库」的笔记和教材改动打包成一个 .md：每条都带完整出处和 id，
  // 正文夹在起止注释之间逐字节原样。文件本身就是 Markdown，
  // 直接丢进任何预览器（或交给我）都能正常看，也能原样提交进仓库。
  async exportPending() {
    const ids = Notes.pendingIds();
    const bookIds = BookEdits.pendingIds();
    let imageEntries;
    try { imageEntries = await MindMaps.pendingEntries(); }
    catch (error) { alert("读取思维导图失败：" + error.message); return; }
    const total = ids.length + bookIds.length + imageEntries.length;
    if (total === 0) { alert("所有笔记、教材和思维导图都已经在仓库里了。"); return; }
    // 极端情况：正文里如果自己带了结束标记，切分就会错位，先拦下来。
    const clash = ids.filter((id) => Notes.get(id).indexOf(this.bodyClose(id)) >= 0)
      .concat(bookIds.filter((id) => BookEdits.get(id).indexOf(this.bodyClose("book:" + id)) >= 0).map((id) => "book:" + id));
    if (clash.length) {
      alert("这几条的正文里出现了导出用的结束标记，导出会切错：\n" + clash.join("\n"));
      return;
    }
    const date = new Date().toISOString().slice(0, 10);
    const kind = imageEntries.length
      ? (ids.length || bookIds.length ? "笔记教材与思维导图" : "思维导图")
      : ids.length && bookIds.length ? "笔记与教材" : bookIds.length ? "教材" : "笔记";
    const parts = [
      "# 待提交" + kind + " · " + date,
      "",
      "共 " + total + " 条" + (imageEntries.length ? "（笔记 " + ids.length + " 条、教材 " + bookIds.length + " 条、思维导图 " + imageEntries.length + " 张）" : ids.length && bookIds.length ? "（笔记 " + ids.length + " 条、教材 " + bookIds.length + " 条）" : "") +
        "。每条正文夹在 `正文开始` / `正文结束` 两行注释之间，" +
        "**与网页里输入的内容逐字节相同**，导出没有做任何转换。思维导图原图使用 Base64 编码，另附 SHA-256 校验值。",
      "",
    ];
    const texts = ids.map((id) => this.buildNoteText(id))
      .concat(bookIds.map((id) => this.buildBookText(id)))
      .concat(imageEntries.map((record) => this.buildImageText(record)));
    texts.forEach((text, i) => {
      parts.push("---");
      parts.push("");
      parts.push("<!-- 第 " + (i + 1) + " / " + total + " 条 -->");
      parts.push(text);
    });
    const blob = new Blob([parts.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "待提交" + kind + "-" + date + ".md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  buildImageText(record) {
    const [subjectId, chapterId] = record.id.slice(4).split("/");
    const subject = KaoyanData.subject(subjectId);
    const chapter = KaoyanData.chapter(subjectId, chapterId);
    const imageId = "image:" + record.id;
    return [
      "> **" + subject.name + " · 第" + chapter.order + "章 " + chapter.name + " · 思维导图**",
      "> " + record.name + "　·　`" + imageId + "`　·　" + record.type + "　·　" + record.size + " 字节　·　SHA-256: " + record.sha256,
      "",
      "<!-- ↓ 图片 Base64 开始 · 原图逐字节编码，请勿修改 -->",
      "",
      MindMaps.base64(record),
      "",
      "<!-- ↑ 图片 Base64 结束 · " + imageId + " -->",
    ].join("\n");
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
    this.clearSearchHighlight();
    const r = this.parseHash();
    this.current = r;
    if (r.subjectId) this.openSubjects.add(r.subjectId);
    if (r.type === "chapter") Progress.rememberVisit(r.subjectId, r.chapterId);
    this.chapterQuery = "";
    this.chapterTypeFilter = "all";
    this.renderSidebar();
    this.renderContent();
    if (this._closeMobileSidebar) this._closeMobileSidebar();

    // 搜索结果携带命中来源；卡片渲染完后再找正文中的词，停在该词处。
    const jump = this._pendingSearchJump;
    this._pendingSearchJump = null;
    const node = jump && document.getElementById("item-" + jump.id);
    if (node) {
      requestAnimationFrame(() => {
        if (!node.isConnected) return;
        const match = this.highlightSearchTerm(node, jump.query, jump.source);
        this.scrollToItem(match || node);
        node.classList.add("flash");
        setTimeout(() => node.classList.remove("flash"), 1800);
      });
    } else {
      window.scrollTo(0, 0);
    }
  },

  clearSearchHighlight() {
    if (window.CSS && CSS.highlights) CSS.highlights.delete("search-arrival");
    document.querySelectorAll("mark.search-arrival").forEach((mark) => mark.replaceWith(mark.textContent));
  },

  // 在实际渲染后的可见文字中定位。跨 <strong>/<u> 等标签的词也能作为一段 Range 标亮，
  // 不改笔记、教材原文，离开本页时清掉临时高亮。
  highlightSearchTerm(card, query, source) {
    const selectors = source === "title" ? [".entry-title, .chapter-summary-head"]
      : source === "book" ? [".entry-statement, .entry-note"]
      : source === "note" ? [".mynote-slot"] : [];
    selectors.push(".entry-title, .entry-statement, .entry-note, .mynote-slot, .chapter-summary-head");
    const needle = String(query || "").trim().toLowerCase();
    if (!needle) return null;
    for (const selector of selectors) {
      for (const area of card.querySelectorAll(selector)) {
        const walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let current;
        while ((current = walker.nextNode())) {
          if (!current.textContent || current.parentElement.closest("button, textarea, input, script, style, .katex-mathml, [hidden]")) continue;
          nodes.push(current);
        }
        const all = nodes.map((n) => n.textContent).join("");
        const at = all.toLowerCase().indexOf(needle);
        if (at < 0) continue;
        let offset = 0, start, end;
        for (const textNode of nodes) {
          const next = offset + textNode.length;
          if (!start && at < next) start = [textNode, at - offset];
          if (start && at + needle.length <= next) { end = [textNode, at + needle.length - offset]; break; }
          offset = next;
        }
        if (!start || !end) continue;
        const range = document.createRange();
        range.setStart(...start);
        range.setEnd(...end);
        if (window.CSS && CSS.highlights && window.Highlight) {
          CSS.highlights.set("search-arrival", new Highlight(range));
          return range;
        }
        // 旧浏览器降级：至少把起始文字标亮，并准确滚到该词开头。
        const first = document.createRange();
        first.setStart(...start);
        first.setEnd(start[0], Math.min(start[0].length, start[1] + needle.length));
        const mark = document.createElement("mark");
        mark.className = "search-arrival";
        first.surroundContents(mark);
        return mark;
      }
    }
    return null;
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
    el.querySelectorAll(".mindmap-slot[data-preview-url]").forEach((slot) => {
      URL.revokeObjectURL(slot.dataset.previewUrl);
    });
    const r = this.current;
    if (r.type === "search") {
      this.hideRail();
      el.innerHTML = this.searchViewHtml(this.globalQuery);
      renderMath(el);
      el.querySelectorAll(".result").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          this._pendingSearchJump = { id: a.dataset.item, query: this.globalQuery, source: a.dataset.matchSource };
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
      this.bindNoteEditors(el); // 章末笔记的编辑器（知识点的已在上面绑好）
      this.bindMindMaps(el);
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
    const stamp = Notes.stamp + ":" + BookEdits.stamp;
    if (this._index && this._indexStamp === stamp) return this._index;
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
            bookText(it) + " " + (it.tags || []).join(" ")
          ),
          note: searchText(Notes.get(it.id)),
        });
      });
      // 章末固定卡只有自己的内容，不计入知识点条数。
      KaoyanData.chapters(s.id).forEach((c) => {
        rows.push({
          summary: true, image: true, label: "思维导图",
          subject: s, chapter: c, noteId: this.chapterMapId(s.id, c.id),
          title: searchText("思维导图 " + c.name), body: "", note: "",
        });
        this.chapterExtras(s.id, c.id).forEach((extra) => {
          if (extra.imageId) return;
          if (!Notes.has(extra.noteId)) return;
          rows.push({
            summary: true,
            label: extra.label,
            subject: s,
            chapter: c,
            noteId: extra.noteId,
            title: searchText(extra.label + " " + c.name),
            body: "",
            note: searchText(Notes.get(extra.noteId)),
          });
        });
      });
    });
    this._index = rows;
    this._indexStamp = stamp;
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
      const source = r.title.includes(q) ? "title" : r.body.includes(q) ? "book" : "note";
      const fromNote = h.fromNote || (r.summary && !r.image);
      const snippet = r.image ? "" : fromNote
        ? `<span class="result-snippet"><span class="snippet-from">笔记</span>${this.textSnippet(Notes.get(r.noteId), query)}</span>`
        : `<span class="result-snippet">${this.snippet(r.item, query)}</span>`;

      if (r.summary) {
        return `
      <a class="result" href="#${r.subject.id}/${r.chapter.id}" data-item="${r.noteId}" data-match-source="${source}">
        <span class="result-type summary">${r.label}</span>
        <span class="result-body">
          <span class="result-title">${this.mark(r.label + "：" + r.chapter.name, query)}</span>
          <span class="result-where">${where}</span>
          ${snippet}
        </span>
      </a>`;
      }
      const item = r.item;
      return `
      <a class="result" href="#${r.subject.id}/${r.chapter.id}" data-item="${item.id}" data-match-source="${source}">
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
    return this.textSnippet(bookText(item), query);
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
      <p class="page-sub">共 ${items.length} 条 · ${TYPE_ORDER.filter((t) => items.some((i) => this.itemTypes(i).includes(t))).map((t) => `${TYPE_LABEL[t]} ${items.filter((i) => this.itemTypes(i).includes(t)).length}`).join(" · ")}</p>

      <div class="toolbar">
        <div class="search-bar">
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input type="text" id="chapter-search" placeholder="在本章内搜索（含笔记）…" aria-label="在本章内搜索，包含笔记" />
        </div>
        <div class="chip-row" id="chapter-type-filter">
          <button class="chip active" data-type="all">全部</button>
          ${TYPE_ORDER.map((t) => {
            const n = items.filter((i) => this.itemTypes(i).includes(t)).length;
            return n ? `<button class="chip" data-type="${t}">${TYPE_LABEL[t]}</button>` : "";
          }).join("")}
        </div>
      </div>

      <p class="chapter-hits" id="chapter-hits" hidden></p>
      <div id="chapter-item-groups"></div>
      ${this.chapterFlowHtml(subjectId, chapterId)}
      ${this.chapterMapHtml(subjectId, chapterId)}
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
    document.querySelectorAll("section.card-book[data-book]").forEach((sec) => {
      if (sec.querySelector(".book-editing")) {
        sec.innerHTML = this.bookCardInner(sec.dataset.book);
        renderMath(sec);
      }
    });
    document.querySelectorAll("details.toc").forEach((d) => { d.open = true; });
    setTimeout(() => window.print(), 60);
  },

  // 章末固定卡：顺序固定，不属于模块，也不占知识点卡号。
  chapterExtras(subjectId, chapterId) {
    return [
      { noteId: this.chapterFlowId(subjectId, chapterId), title: "决策流", label: "决策流", cls: "chapter-flow", sub: "从题目条件出发，找到解题路径" },
      { imageId: this.chapterMapId(subjectId, chapterId), title: "思维导图", label: "思维导图", cls: "chapter-map", sub: "用一张图看清本章知识结构" },
      { noteId: this.chapterNoteId(subjectId, chapterId), title: "本章笔记总结", label: "本章总结", cls: "", sub: "用自己的话把整章串一遍" },
    ];
  },

  chapterFlowHtml(subjectId, chapterId) {
    return this.chapterExtraHtml(subjectId, chapterId, this.chapterExtras(subjectId, chapterId)[0]);
  },

  chapterMapHtml(subjectId, chapterId) {
    return this.chapterExtraHtml(subjectId, chapterId, this.chapterExtras(subjectId, chapterId)[1]);
  },

  chapterSummaryHtml(subjectId, chapterId) {
    return this.chapterExtraHtml(subjectId, chapterId, this.chapterExtras(subjectId, chapterId)[2]);
  },

  chapterExtraHtml(subjectId, chapterId, extra) {
    const c = KaoyanData.chapter(subjectId, chapterId);
    return `
      <section class="chapter-summary${extra.cls ? " " + extra.cls : ""}" id="item-${extra.imageId || extra.noteId}">
        <header class="chapter-summary-head">
          <h3>${extra.title}</h3>
          <span class="chapter-summary-sub">第${c.order}章 ${escapeHtml(c.name)} · ${extra.sub}</span>
        </header>
        ${extra.imageId ? this.mindMapHtml(extra.imageId) : `<div class="mynote-slot" data-note="${extra.noteId}">${this.myNoteHtml(extra.noteId)}</div>`}
      </section>`;
  },

  chapterExtraTocHtml(subjectId, chapterId) {
    return this.chapterExtras(subjectId, chapterId).map(({ noteId, imageId, title }) => `
      <a class="toc-foot" href="#item-${imageId || noteId}" data-goto="${imageId || noteId}">
        <span class="toc-foot-name">${title}</span>
        <span class="toc-foot-state${!imageId && Notes.has(noteId) ? " done" : ""}">${
          imageId ? "还没上传" : Notes.has(noteId) ? (Notes.isPending(noteId) ? "已写 · 未进仓库" : "已写") : "还没写"
        }</span>
      </a>`).join("");
  },

  mindMapHtml(id) {
    return `
      <div class="mindmap-slot" data-map="${id}">
        <input class="mindmap-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden />
        <div class="mindmap-content">正在读取图片…</div>
      </div>`;
  },

  async refreshMindMapSlot(slot) {
    const id = slot.dataset.map;
    const view = await MindMaps.get(id);
    if (!slot.isConnected) return;
    if (slot.dataset.previewUrl) URL.revokeObjectURL(slot.dataset.previewUrl);
    delete slot.dataset.previewUrl;
    const content = slot.querySelector(".mindmap-content");
    if (!view) {
      content.innerHTML = `
        <button class="mindmap-upload" data-map-action="choose">＋ 上传思维导图</button>
        <p class="mindmap-hint">支持 PNG、JPEG、WebP、GIF，保留原图；每张最多 20 MB。</p>`;
    } else {
      const src = view.source === "local" ? URL.createObjectURL(MindMaps.blob(view)) : view.path;
      if (view.source === "local") slot.dataset.previewUrl = src;
      content.innerHTML = `
        <div class="mindmap-meta">
          <span class="mindmap-name">${escapeHtml(view.name)}</span>
          <span class="mynote-flag ${view.pending ? "pending" : "saved"}">${view.pending ? "未进仓库" : "已进仓库"}</span>
        </div>
        <a class="mindmap-open" href="${escapeHtml(src)}" target="_blank" rel="noopener" title="点击查看原图">
          <img class="mindmap-image" src="${escapeHtml(src)}" alt="${escapeHtml(view.name)}" />
        </a>
        <div class="mindmap-actions">
          <button data-map-action="choose">更换图片</button>
          <button data-map-action="download">下载原图</button>
          ${view.pending ? `<button class="mindmap-remove" data-map-action="remove">${MindMaps.seed(id) ? "恢复仓库版" : "删除图片"}</button>` : ""}
        </div>`;
    }
    this.refreshMindMapToc(id, view);
  },

  refreshMindMapToc(id, view) {
    document.querySelectorAll('[data-goto="' + id + '"] .toc-foot-state').forEach((status) => {
      status.textContent = view ? (view.pending ? "已上传 · 未进仓库" : "已进仓库") : "还没上传";
      status.classList.toggle("done", !!view && !view.pending);
      status.classList.toggle("pending", !!view && view.pending);
    });
  },

  bindMindMaps(scope) {
    scope.querySelectorAll(".mindmap-slot").forEach((slot) => {
      if (slot.dataset.bound) return;
      slot.dataset.bound = "1";
      const id = slot.dataset.map;
      const show = async () => {
        try { await this.refreshMindMapSlot(slot); }
        catch (error) { slot.querySelector(".mindmap-content").textContent = "图片读取失败：" + error.message; }
      };
      slot.addEventListener("click", async (event) => {
        const button = event.target.closest("[data-map-action]");
        if (!button) return;
        if (button.dataset.mapAction === "choose") {
          slot.querySelector(".mindmap-file").click();
        } else if (button.dataset.mapAction === "download") {
          const view = await MindMaps.get(id);
          if (!view) return;
          const a = document.createElement("a");
          a.href = view.source === "local" ? slot.dataset.previewUrl : view.path;
          a.download = view.name;
          document.body.appendChild(a); a.click(); a.remove();
        } else if (button.dataset.mapAction === "remove") {
          const message = MindMaps.seed(id)
            ? "放弃本设备上的图片，恢复仓库中的版本？"
            : "删除本设备保存的图片？如果尚未打包备份，将无法恢复。";
          if (!confirm(message)) return;
          try { await MindMaps.removeLocal(id); await show(); this.refreshNoteCount(); }
          catch (error) { alert("删除失败：" + error.message); }
        }
      });
      slot.querySelector(".mindmap-file").addEventListener("change", async (event) => {
        const file = event.target.files && event.target.files[0];
        event.target.value = "";
        if (!file) return;
        try {
          if (!MindMaps.allowedTypes.includes(file.type) || !file.size || file.size > MindMaps.maxBytes) {
            throw new Error("请选择 20 MB 以内的 PNG、JPEG、WebP 或 GIF 图片");
          }
          const url = URL.createObjectURL(file);
          try {
            await new Promise((resolve, reject) => {
              const image = new Image();
              image.onload = resolve;
              image.onerror = () => reject(new Error("图片无法打开，请检查文件"));
              image.src = url;
            });
          } finally { URL.revokeObjectURL(url); }
          const current = await MindMaps.get(id);
          if (current && current.pending && !confirm("用新图片替换本设备上尚未提交的图片？")) return;
          await MindMaps.save(id, file);
          await show();
          this.refreshNoteCount();
        } catch (error) { alert("上传失败：" + error.message); }
      });
      show();
    });
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
    this.bindBookEditors(wrap);
    this.bindToc(wrap);
  },

  // 搜索时把正文以外的东西收起来：本章总结会作为一条结果出现在列表里，
  // 导出条和上下章翻页跟结果列表摆在一起没有意义。
  chapterSearchMode(on) {
    [".chapter-summary", ".export-bar", ".pager"].forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => { el.hidden = on; });
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
          bookText(it) + " " + (it.tags || []).join(" ")
        ).includes(q);
        const inNote = searchText(Notes.get(it.id)).includes(q);
        return inTitle || inBook || inNote ? { it, inTitle, inBook, inNote } : null;
      })
      .filter(Boolean);

    // 决策流和总结也一起搜，按页面顺序放在知识点后面。
    const extraHits = this.chapterExtras(subjectId, chapterId).filter((extra) =>
      extra.imageId
        ? searchText(extra.label).includes(q)
        : Notes.has(extra.noteId) && searchText(c.name + " " + extra.label + " " + Notes.get(extra.noteId)).includes(q));

    this.chapterSearchMode(true);
    this.renderChapterHits(hits, extraHits, KaoyanData.itemsByChapter(subjectId, chapterId).length, raw);

    if (!hits.length && !extraHits.length) {
      wrap.innerHTML = `<div class="empty-state">本章的知识点和笔记里都没有「${escapeHtml(raw)}」</div>`;
      renderMath(wrap);
      return;
    }

    const rows = hits.map(({ it, inTitle, inBook, inNote }) => {
      const parts = [];
      if (inBook || inTitle) {
        parts.push(
          `<span class="result-snippet">${this.textSnippet(bookText(it), raw)}</span>`
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
      <a class="result" href="#${subjectId}/${chapterId}" data-item="${it.id}" data-match-source="${inTitle ? "title" : inBook ? "book" : "note"}">
        <span class="result-type ${badge}">${TYPE_LABEL[badge]}</span>
        <span class="result-body">
          <span class="result-title"><span class="result-no">${nos[it.id]}</span>${this.mark(it.title, raw)}</span>
          <span class="result-where">${escapeHtml(whereOf[it.id] || "")}</span>
          ${parts.join("")}
        </span>
      </a>`;
    });

    extraHits.forEach((extra) => {
      rows.push(`
      <a class="result" href="#${subjectId}/${chapterId}" data-item="${extra.imageId || extra.noteId}" data-match-source="${extra.imageId || searchText(extra.label).includes(q) ? "title" : "note"}">
        <span class="result-type summary">${extra.label}</span>
        <span class="result-body">
          <span class="result-title">${this.mark(extra.title, raw)}</span>
          <span class="result-where">${extra.sub}</span>
          ${extra.imageId ? "" : `<span class="result-snippet"><span class="snippet-from">笔记</span>${this.textSnippet(Notes.get(extra.noteId), raw)}</span>`}
        </span>
      </a>`);
    });

    wrap.innerHTML = `<div class="result-list">${rows.join("")}</div>`;
    renderMath(wrap);

    // 点结果：清掉搜索、整章复原，再滚到那一条闪一下。
    // hash 没变，所以直接重走一遍 route()。
    wrap.querySelectorAll(".result").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this._pendingSearchJump = { id: link.dataset.item, query: raw, source: link.dataset.matchSource };
        this.route();
      });
    });
  },

  // 搜索框下面那行：命中几条、分布在哪儿
  renderChapterHits(hits, extraHits, total, raw) {
    const bar = document.getElementById("chapter-hits");
    if (!bar) return;
    const noteOnly = hits.filter((h) => !h.inTitle && !h.inBook && h.inNote).length;
    if (!hits.length && !extraHits.length) {
      bar.hidden = false;
      bar.innerHTML = `「${escapeHtml(raw)}」在本章没有出现`;
      return;
    }
    const parts = [`本章 ${total} 条里命中 <b>${hits.length}</b> 条`];
    if (noteOnly) parts.push(`其中 <b>${noteOnly}</b> 条只写在笔记里`);
    extraHits.forEach((extra) => parts.push(extra.label + "也命中"));
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

    const foot = this.chapterExtraTocHtml(subjectId, chapterId);

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
    const foot = this.chapterExtraTocHtml(subjectId, chapterId);

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

  // 跳到某张卡：让卡片顶部（标题）停在吸顶栏下方。
  // 原来用 scrollIntoView 把整张卡居中——卡片比一屏高时，
  // 屏幕中间落在下面的笔记上，标题和教材反而被滚出屏幕。
  scrollToItem(node) {
    // 吸顶的只有手机顶栏和章节工具栏；按「吸住的位置 + 自身高度」算出会挡住多少
    let covered = 0;
    document.querySelectorAll(".mobile-topbar, .toolbar").forEach((el) => {
      const cs = getComputedStyle(el);
      if (!el.offsetHeight || cs.display === "none" || cs.position !== "sticky") return;
      covered = Math.max(covered, (parseFloat(cs.top) || 0) + el.offsetHeight);
    });
    const top = node.getBoundingClientRect().top + window.scrollY - covered - 12;
    window.scrollTo({ top: Math.max(0, top) });
  },

  bindToc(scope) {
    scope.querySelectorAll("[data-goto]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const node = document.getElementById("item-" + a.dataset.goto);
        if (!node) return;
        this.scrollToItem(node);
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
          <section class="card card-book" data-book="${item.id}">${this.bookCardInner(item.id)}
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

  // ---------------- 教材内容：显示与编辑（只收 Markdown） ----------------
  // 仓库版在数据文件的 md 字段里；网页上改过、还没进仓库的存在本机（BookEdits），
  // 和笔记一样打包成 .md 交给我提交。

  bookCardInner(itemId) {
    const it = KaoyanData.find(itemId);
    const book = bookParts(BookEdits.get(itemId));
    const pending = BookEdits.isPending(itemId);
    return `
            <div class="card-book-head">
              <span class="card-book-label">教材内容</span>
              ${pending ? `<span class="mynote-flag pending" title="这台设备上改过，和仓库里的那一版不一样。打包成 .md 交给我提交才算进仓库。">本地已改</span>
              <button class="mynote-restore" data-book-action="restore" title="丢掉本机这一版，改用仓库里的那一版">用仓库版</button>` : ""}
              <button class="mynote-edit" data-book-action="edit">编辑</button>
            </div>
            <div class="entry-statement">${book.main}</div>
            ${it && it.diagram ? `<figure class="entry-figure">${it.diagram}${it.diagramCaption ? `<figcaption>${escapeHtml(it.diagramCaption)}</figcaption>` : ""}</figure>` : ""}
            ${book.tip ? `<div class="entry-note">${book.tip}</div>` : ""}`;
  },

  bookEditorHtml() {
    return `
            <div class="mynote mynote-editing book-editing">
              <div class="mynote-head">
                <span class="card-book-label">教材内容 · 编辑</span>
                <button class="mynote-md-btn" data-book-action="import-md" title="读取一个 .md 文件，原样填进来">导入 .md</button>
                <button class="mynote-preview-btn" data-book-action="preview">预览</button>
                <button class="mynote-zoom-btn" data-book-action="zoom" title="全屏编辑（Esc 退出）">放大</button>
              </div>
              <div class="mynote-warn"></div>
              <textarea class="mynote-input" rows="14" spellcheck="false"></textarea>
              <div class="mynote-preview book-preview" hidden></div>
              <input type="file" class="mynote-md-file" accept=".md,.markdown,.txt,text/markdown,text/plain" hidden />
              <div class="mynote-actions">
                <button class="mynote-save" data-book-action="save">保存</button>
                <button class="mynote-cancel" data-book-action="cancel">取消</button>
              </div>
            </div>`;
  },

  // 体检：标题有没有按〔〕写（没按的不会上色）、有没有缩进被当成代码块
  bookIssues(md) {
    const text = String(md == null ? "" : md);
    const lines = text.split("\n");
    const heads = [];
    const code = [];
    let fence = false;
    lines.forEach((l, i) => {
      if (/^\s*```/.test(l)) fence = !fence;
      if (!fence && /^#{1,6}\s/.test(l) && !BOOK_HEAD.test(l)) heads.push(i + 1);
    });
    const parts = bookParts(text);
    if (/<pre/.test(parts.main + parts.tip)) {
      lines.forEach((l, i) => {
        if (/^ {4,}\S/.test(l) && !/^\s*([-*+]|\d+\.)\s/.test(l)) code.push(i + 1);
      });
    }
    return { heads, code, empty: !text.trim() };
  },

  refreshBookWarn(section) {
    const box = section.querySelector(".mynote-warn");
    const ta = section.querySelector(".mynote-input");
    if (!box || !ta) return;
    const is = this.bookIssues(ta.value);
    const list = (arr) => arr.slice(0, 6).join("、") + (arr.length > 6 ? " …" : "");
    const bits = [
      '<span class="mynote-fmt md">Markdown</span>',
      '<span class="mynote-fmt-why">「### 〔定义〕名字」开一个小节，按〔〕里的字自动上色 · 「### 〔提示〕」放提示 · ==重点== 显示下划线</span>',
    ];
    if (is.heads.length) bits.push('<span class="mynote-codewarn">⚠ 第 ' + list(is.heads) + " 行的标题没按〔定义〕这类写法，不会上色</span>");
    if (is.code.length) bits.push('<span class="mynote-codewarn">⚠ 第 ' + list(is.code) + " 行会显示成代码块</span>");
    box.innerHTML = bits.join("");
  },

  bindBookEditors(scope) {
    scope.querySelectorAll("section.card-book[data-book]").forEach((section) => {
      if (section.dataset.bound) return;
      section.dataset.bound = "1";
      const id = section.dataset.book;
      const show = (html) => { section.innerHTML = html; renderMath(section); };
      const fit = (ta) => { ta.style.height = Math.min(ta.scrollHeight + 4, 640) + "px"; };

      section.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-book-action]");
        if (!btn) return;
        const action = btn.dataset.bookAction;

        if (action === "edit") {
          show(this.bookEditorHtml());
          const ta = section.querySelector(".mynote-input");
          // 直接赋值而不是写进 HTML：textarea 会吞掉开头的换行，赋值才能逐字节原样
          ta.value = BookEdits.get(id);
          fit(ta);
          this.refreshBookWarn(section);
          ta.addEventListener("input", () => {
            clearTimeout(this._bookWarnTimer);
            this._bookWarnTimer = setTimeout(() => this.refreshBookWarn(section), 400);
          });
          this.bindBookMdFile(section);
          ta.focus();
        } else if (action === "zoom") {
          this.toggleZoom(section, btn);
        } else if (action === "preview") {
          // 只换显示方式，不动输入框里的任何字符
          const ta = section.querySelector(".mynote-input");
          const pv = section.querySelector(".book-preview");
          const toPreview = !ta.hidden;
          ta.hidden = toPreview;
          pv.hidden = !toPreview;
          btn.textContent = toPreview ? "回到编辑" : "预览";
          if (toPreview) {
            const b = bookParts(ta.value);
            pv.innerHTML = `<div class="entry-statement">${b.main}</div>` +
              (b.tip ? `<div class="entry-note">${b.tip}</div>` : "");
            renderMath(pv);
          }
        } else if (action === "import-md") {
          section.querySelector(".mynote-md-file").click();
        } else if (action === "save") {
          const val = section.querySelector(".mynote-input").value;
          const is = this.bookIssues(val);
          if (is.empty && !confirm("教材内容是空的，保存后这张卡只剩标题。确定吗？")) return;
          if (is.code.length && !confirm("第 " + is.code.slice(0, 8).join("、") + " 行的缩进会显示成代码块。内容不会丢，要继续保存吗？")) return;
          if (!BookEdits.set(id, val)) {
            alert("保存失败：浏览器存储空间不足或被禁用。");
            return;
          }
          this.exitZoom();
          show(this.bookCardInner(id));
          this.refreshNoteCount();
        } else if (action === "cancel") {
          const ta = section.querySelector(".mynote-input");
          if (ta && ta.value !== BookEdits.get(id) && !confirm("改动还没保存，确定放弃吗？")) return;
          this.exitZoom();
          show(this.bookCardInner(id));
        } else if (action === "restore") {
          if (!confirm("用仓库里的那一版覆盖本机改过的教材内容？\n本机这一版会被清掉，无法撤销。")) return;
          BookEdits.reset(id);
          show(this.bookCardInner(id));
          this.refreshNoteCount();
        }
      });
    });
  },

  // 选一个 .md 文件，原样填进输入框（不解析、不转换、不清洗）
  bindBookMdFile(section) {
    const input = section.querySelector(".mynote-md-file");
    if (!input) return;
    input.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!file) return;
      const ta = section.querySelector(".mynote-input");
      if (ta.value.trim() && !confirm("输入框里已经有内容，用文件内容覆盖掉？")) return;
      const reader = new FileReader();
      reader.onload = () => {
        ta.value = String(reader.result);
        ta.style.height = Math.min(ta.scrollHeight + 4, 640) + "px";
        this.refreshBookWarn(section);
        ta.focus();
      };
      reader.readAsText(file, "utf-8");
    });
  },

  // 导出用：和笔记同一种起止标记，id 前加 book: 区分
  buildBookText(itemId) {
    const p = this.locate(itemId);
    const nid = "book:" + itemId;
    const where = p
      ? p.subject.name + " · 第" + p.chapter.order + "章 " + p.chapter.name + " · " + this.noteSlotLabel(p) + " · 教材内容"
      : "教材内容";
    return [
      "> **" + where + "**",
      "> " + (p ? p.title : itemId) + "　·　`" + nid + "`　·　教材 Markdown",
      "",
      this.BODY_OPEN,
      "",
      BookEdits.get(itemId),
      "",
      this.bodyClose(nid),
      "",
    ].join("\n");
  },

  // 公式段的正则：$$...$$（可跨行）或 $...$（不跨行）
  MATH_RE() {
    return new RegExp("(\\$\\$[\\s\\S]*?\\$\\$|\\$[^$\\n]*\\$)");
  },

  // 笔记正文的显示：一律按 Markdown，和教材同一个函数（mdHtml）——
  // 公式先挖出来保护、〔〕小标题上色、==重点== 下划线；存储和导出的原文一个字不动。
  // （以前还有按内容自动判定、可手动切换的「纯文本」显示模式，已统一去掉。）
  noteBodyHtml(text) {
    return noteMdHtml(text);
  },

  // 体检：Markdown 里最容易踩的坑是「缩进被当成代码块」。
  // 渲染完数一下 <pre>，多于原文的 ``` 围栏就说明有意外代码块。
  codeBlockCheck(text) {
    if (typeof marked === "undefined") return null;
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
    const label = this.noteLabel(noteId);
    if (!text) {
      return `<button class="mynote-add" data-action="edit">＋ ${label === "决策流" ? "写一份决策流" : "写一段" + label}</button>`;
    }
    return `<div class="mynote${Notes.isPending(noteId) ? " is-pending" : ""}">
      <div class="mynote-head">
        <span class="mynote-label">${label}</span>
        ${this.noteFlagHtml(noteId)}
        ${
          Notes.isPending(noteId) && this.hasSeed(noteId)
            ? `<button class="mynote-restore" data-action="restore" title="丢掉本地这一版，改用仓库里的那一版">用仓库版</button>`
            : ""
        }
        <button class="mynote-edit" data-action="edit">编辑</button>
      </div>
      <div class="mynote-body md">${this.noteBodyHtml(text, noteId)}</div>
    </div>`;
  },

  editorHtml(noteId) {
    const text = Notes.get(noteId);
    const label = this.noteLabel(noteId);
    const isCh = noteId.indexOf("ch:") === 0;
    const isFlow = noteId.indexOf("flow:") === 0;
    const placeholder = isFlow
      ? "从题目条件出发，写下你的判断顺序，比如：&#10;&#10;先看要求什么：…&#10;再看给了什么条件：…&#10;满足条件 A → 用方法 A&#10;否则 → 继续判断条件 B&#10;最后检查：…"
      : isCh
      ? "把整章串成一条线，比如：&#10;&#10;这一章在讲什么：…&#10;几个概念怎么串起来：…&#10;考试会怎么考：…&#10;我最容易错的地方：…&#10;&#10;公式用 $ 包起来会渲染，例如 $A\\vec{v}=\\lambda\\vec{v}$"
      : "用你自己的话写一遍，比如：&#10;&#10;对象：…&#10;规则：…&#10;意义：…&#10;&#10;公式用 $ 包起来会渲染，例如 $A\\vec{v}=\\lambda\\vec{v}$";
    return `<div class="mynote mynote-editing">
      <div class="mynote-head">
        <span class="mynote-label">${label}</span>
        <button class="mynote-md-btn" data-action="import-md" title="读取一个 .md 文件，原样填进来">导入 .md</button>
        <button class="mynote-preview-btn" data-action="preview">预览</button>
        <button class="mynote-zoom-btn" data-action="zoom" title="全屏编辑（Esc 退出）">放大</button>
      </div>
      <textarea class="mynote-input" rows="${isCh || isFlow ? 14 : 9}" placeholder="${placeholder}">${escapeHtml(text)}</textarea>
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
            pv.className = "mynote-preview md";
            pv.innerHTML = ta.value.trim() ? this.noteBodyHtml(ta.value, id) : "还没写内容";
            renderMath(pv);
          }
          this.refreshEditorWarn(slot, id);
        } else if (action === "import-md") {
          slot.querySelector(".mynote-md-file").click();
        } else if (action === "save") {
          const val = slot.querySelector(".mynote-input").value;
          const chk = this.codeBlockCheck(val);
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

  chapterFlowId(subjectId, chapterId) {
    return "flow:" + subjectId + "/" + chapterId;
  },

  chapterMapId(subjectId, chapterId) {
    return "map:" + subjectId + "/" + chapterId;
  },

  noteLabel(noteId) {
    if (noteId.indexOf("flow:") === 0) return "决策流";
    return noteId.indexOf("ch:") === 0 ? "本章总结" : "笔记";
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

  // 编辑器顶部的状态条：写法提示 + 有没有意外代码块
  refreshEditorWarn(slot) {
    const box = slot.querySelector(".mynote-warn");
    const ta = slot.querySelector(".mynote-input");
    if (!box || !ta) return;
    const chk = this.codeBlockCheck(ta.value);
    const bits = [
      '<span class="mynote-fmt md">Markdown</span>',
      '<span class="mynote-fmt-why">「### 〔定义〕名字」小标题按〔〕里的字自动上色 · ==重点== 显示下划线</span>',
    ];
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
    if (noteId.indexOf("ch:") === 0 || noteId.indexOf("flow:") === 0) {
      const [subjectId, chapterId] = noteId.slice(noteId.indexOf(":") + 1).split("/");
      const s = KaoyanData.subject(subjectId);
      const c = s && KaoyanData.chapter(subjectId, chapterId);
      if (!c) return null;
      return {
        subject: s, chapter: c, item: null, isChapter: true,
        typeLabel: this.noteLabel(noteId), index: 0, title: c.name,
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
    if (p.isChapter) return p.typeLabel;
    if (p.item && p.item.card) return "卡" + p.item.card;
    return p.typeLabel + String(p.index).padStart(2, "0");
  },

  // 笔记一律是 Markdown，导出 .md。
  // 文件名：线性代数-第3章-卡③-线性表示：点与组的关系（能否拼出目标向量）.md
  noteFileExt() {
    return ".md";
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
    const fmt = "Markdown";
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
