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
// - ==重点== 文字显示为荧光笔底，公式仍使用下划线（本站约定）
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
// deco(html, 小节)：可选，给每个〔〕小节渲染好的正文再加工一次（站牌用，见 App.stationDeco）
function bookParts(md, deco) {
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
      const html = mdHtml(body);
      main += '<div class="term"><div class="term-label ' + BOOK_CLASS[s.kind] + '">' +
        mdHtml(s.label, true) + '</div><div class="term-md">' + (deco ? deco(html, s.kind) : html) + "</div></div>";
    }
  });
  return { main, tip };
}

// 目录里每张卡下面的小节：「教材 / 笔记」两行，后面列出这一部分实际有的「定义 性质 意义…」。
// 从原文的小节标题读出来（不写死），同一类只列一次，点了跳到第一个。
// 标题的认法和上色一致：去掉「四、」「1.」这类编号后以〔定义〕等开头；笔记里没加〔〕的「例题」也算。
function sectionKind(title) {
  const t = String(title).replace(/\*\*/g, "").trim()
    .replace(/^(?:[一二三四五六七八九十]+、|\d+[.、．])[ \t]*/, "");
  const term = t.match(NOTE_TERM_HEAD);
  if (term) return term[1];
  return /^例题(?=$|[\s:：（(])/.test(t) ? "例题" : null;
}

function bookHeadKind(line) {
  const m = line.match(BOOK_HEAD);
  return m ? m[2] : /^#{1,6}[ \t]*意义(?:[ \t]*[:：].*)?[ \t]*$/.test(line) ? "意义" : null;
}

function bookSections(md) {
  const kinds = [];
  String(md == null ? "" : md).split("\n").forEach((line) => {
    const kind = bookHeadKind(line);
    if (kind && !kinds.includes(kind)) kinds.push(kind);
  });
  return kinds;
}

// 一张卡按「站」往下走时（第4章超级卡：① 出发点 → … → ⑥ 读出符号），每个小节里都有站名行：
// 单独一行、整行加粗、以圈号开头，如「**⑤′ 另一种换法：配方法**」。
// 按小节列出其中的站：{ 小节: [{ mark: "⑤′", name: "⑤′ 另一种换法：配方法" }] }；同一小节同一站只列一次。
// 小节的认法与 bookSections / noteSections 相同（笔记只认最外层一级标题，代码块里的不算）。
const STATION_LINE = /^\*\*(([①-⑳]′?)[ \t]*[^*]*?)\*\*[ \t]*$/;

function sectionStations(text, part) {
  const src = String(text == null ? "" : text);
  const level = part === "note" ? noteSections(src).level : 0;
  const out = {};
  let cur = null, fence = false;
  src.split("\n").forEach((line) => {
    if (part === "note") {
      if (/^\s*```/.test(line)) { fence = !fence; return; }
      if (fence) return;
      const h = line.match(/^(#{1,6})[ \t]+(.*?)[ \t]*$/);
      if (h && h[1].length <= level) { cur = sectionKind(h[2]); return; }
    } else {
      const kind = bookHeadKind(line);
      if (kind) { cur = kind; return; }
    }
    const s = cur && line.match(STATION_LINE);
    if (!s) return;
    const list = out[cur] || (out[cur] = []);
    if (!list.some((x) => x.mark === s[2])) list.push({ mark: s[2], name: s[1] });
  });
  return out;
}

// 一张卡的骨架：按站（没有站就整张卡一块）列出教材〔定义〕〔性质〕「意义」和笔记〔例题〕〔提示〕里每一条的标题，
// 站卡上的小标题、右侧目录的条数、章节头的统计都从这里来。认法与对照视图相同：站名行要独立成段；分组行是整行加粗、后面（隔空行）紧跟「#### n.」的一行。
// 条目：〔定义〕〔性质〕〔提示〕是「#### n. 标题」，意义是顶格的「* **n. 标题**」，例题是「#### 例题 n：标题」。
// ord：这一条在「这一节的这一站」里排第几（从 0 起），点站卡上的小标题时按它在页面上数到那张卡片（App.stationChipTarget）。
// → { structured: 有站或有分组（都没有就不用大纲）, blocks: [{ mark, name, rows: { 部分+小节: { part, sec, items: [{ title, num, ord, group }] } } }] }
const OUTLINE_SECS = [["book", "定义"], ["book", "性质"], ["book", "意义"], ["note", "例题"], ["note", "提示"]];

function cardOutline(book, note) {
  const blocks = [];
  let structured = false;
  const block = (mark, name) => {
    let b = blocks.find((x) => x.mark === mark);
    if (!b) blocks.push((b = { mark, name, rows: {} }));
    return b;
  };
  const scan = (raw, part) => {
    const src = String(raw == null ? "" : raw);
    const lines = src.split("\n").map((l) => l.replace(/\r$/, ""));
    const level = part === "note" ? noteSections(src).level : 0;
    const counts = {};
    let sec = null, station = "", group = "", fence = false;
    lines.forEach((line, i) => {
      if (/^\s*(```|~~~)/.test(line)) { fence = !fence; return; }
      if (fence) return;
      if (part === "book") {
        const k = bookHeadKind(line);
        if (k) { sec = k; station = group = ""; return; }
      } else {
        const h = line.match(/^(#{1,6})[ \t]+(.*?)[ \t]*$/);
        if (h && h[1].length <= level) { sec = sectionKind(h[2]); station = group = ""; return; }
      }
      // 笔记的〔定义〕〔性质〕和教材一一对应，也记下标题（rows 里的 note定义 / note性质）
      const noteDef = part === "note" && (sec === "定义" || sec === "性质");
      if (!noteDef && !OUTLINE_SECS.some(([p, s]) => p === part && s === sec)) return;
      const independent = i === 0 || !lines[i - 1].trim() || /^#{1,6}[ \t]/.test(lines[i - 1]);
      const st = independent && line.match(STATION_LINE);
      if (st) { station = st[2]; group = ""; structured = true; block(station, st[1]); return; }
      let m = null;
      // 题型写法的〔意义〕和〔定义〕〔性质〕一样：「#### n. 题型名」，可用整行加粗分组
      if (sec === "定义" || sec === "性质" || (sec === "意义" && !station)) {
        const bold = independent && line.match(/^\*\*([^*]+)\*\*[ \t]*$/);
        if (bold) {
          let j = i + 1;
          while (j < lines.length && !lines[j].trim()) j++;
          if (j < lines.length && /^####[ \t]+\d+\./.test(lines[j])) { group = bold[1]; structured = true; return; }
        }
        m = line.match(/^####[ \t]+(\d+)\.[ \t]*(.*?)[ \t]*$/);
        if (!m && sec === "意义") m = line.match(/^[*-][ \t]+\*\*(\d+)\.[ \t]*(.*?)\*\*/);
      } else if (sec === "意义") m = line.match(/^[*-][ \t]+\*\*(\d+)\.[ \t]*(.*?)\*\*/);
      // 「例题 1-2」是题型 1 的第 2 道，编号仍记 1
      else if (sec === "例题") m = line.match(/^#{2,6}[ \t]+例题[ \t]*(\d+)(?:-\d+)?(?![\d.])[ \t]*[：:]?[ \t]*(.*?)[ \t]*$/);
      else m = line.match(/^#{2,6}[ \t]+(\d+)\.[ \t]*(.*?)[ \t]*$/);
      if (!m) return;
      const rows = block(station, "").rows;
      const row = rows[part + sec] || (rows[part + sec] = { part, sec, items: [] });
      const n = counts[sec + station] || 0;
      counts[sec + station] = n + 1;
      row.items.push({ title: m[2], num: m[1], ord: n, group: sec === "定义" || sec === "性质" || sec === "意义" ? group : "" });
    });
  };
  scan(book, "book");
  scan(note, "note");
  return { structured, blocks: blocks.filter((b) => b.mark || Object.keys(b.rows).length) };
}

// 「本卡主线」那一段：开头一句（lead，章节标题下面用）和每一站的一句话（st，站卡上用）。没有就是空的。
// 两种写法都认：「**本卡主线**：……」「* **① 站名**：一句话」，
// 以及「**本卡主线：……**」「- **① 问句** $\to$ **答案**：一句话」（后者站卡上显示问句和后面整句）。
function cardStory(book) {
  const out = { lead: "", st: {} };
  String(book == null ? "" : book).split("\n").forEach((raw) => {
    const l = raw.replace(/\r$/, "");
    const lead = l.match(/^\*\*本卡主线\*\*[：:][ \t]*(.*)$/) || l.match(/^\*\*本卡主线[：:][ \t]*(.*?)\*\*[ \t]*$/);
    if (lead && !out.lead) out.lead = lead[1].replace(/[ \t]*整张卡.*$/, "").trim();
    const m = l.match(/^[*-][ \t]+\*\*([①-⑳]′?)[ \t]*[^*]*?\*\*[：:][ \t]*(.*)$/);
    const arrow = !m && l.match(/^[*-][ \t]+\*\*([①-⑳]′?)[ \t]*([^*]*?)\*\*[ \t]*((?:\$\\to\$|→)[ \t]*\S.*)$/);
    if (m && !(m[1] in out.st)) out.st[m[1]] = m[2].trim();
    if (arrow && !(arrow[1] in out.st)) out.st[arrow[1]] = (arrow[2].trim() + " " + arrow[3].trim()).trim();
  });
  return out;
}

// 单张小卡片编辑：一格对应原文里 [start, end) 这一段。前面的空行（lead）和末尾的空白（tail）原样保留，
// 只把中间的正文（core）交给用户改，拼回去时下一个标题不会粘上来。core 不改就原样拼回，和原文一字不差。
function cellSource(full, start, end) {
  const piece = String(full).slice(start, end);
  const lead = piece.match(/^(?:[ \t]*\r?\n)*/)[0];
  const core = piece.slice(lead.length).replace(/\s+$/, "");
  return { lead, core, tail: piece.slice(lead.length + core.length) };
}

function cellSplice(full, start, end, val) {
  const { lead, tail } = cellSource(full, start, end);
  const v = String(val).replace(/^(?:[ \t]*\r?\n)*/, "").replace(/\s+$/, "");
  return String(full).slice(0, start) + lead + v + tail + String(full).slice(end);
}

// 站牌：站名行渲染后是「<p><strong>⑥ 读出符号</strong></p>」，显示时换成醒目的一块：
// 圈号 + 站名，左边线用所在小节的颜色；下面一行链接跳到同一站在其他小节里的位置
// （这一节高亮，没有这一站的小节灰掉）。只改显示，原文一个字不动，块里的文字仍是原来那一行。
// map：这张卡教材、笔记各有哪些小节、每节有哪些站（App.stationMap）。
const STATION_P = /<p><strong>(([①-⑳]′?)[ \t]*[^<]*?)<\/strong><\/p>/g;

function stationBarHtml(itemId, part, sec, mark, name, map, bothCurrent) {
  const attr = (s) => s.replace(/"/g, "&quot;");
  const group = (p, label) => {
    const g = map[p];
    if (!g || !g.kinds.length) return "";
    return `<span class="station-part">${label}</span>` + g.kinds.map((k) => {
      const cls = "station-link " + (BOOK_CLASS[k] || "");
      if ((p === part && k === sec) || (bothCurrent && k === (bothCurrent[p] || sec))) return `<span class="${cls} current">${k}</span>`;
      return (g.st[k] || []).some((s) => s.mark === mark)
        ? `<a class="${cls}" href="#item-${itemId}" data-goto="${itemId}" data-part="${p}" data-sec="${k}" data-station="${attr(mark)}">${k}</a>`
        : `<span class="${cls} missing">${k}</span>`;
    }).join("");
  };
  const tail = name.slice(mark.length);
  const gap = tail.match(/^[ \t]*/)[0];
  return `<div class="station ${BOOK_CLASS[sec] || ""}" data-part="${part}" data-sec="${sec}" data-station="${attr(mark)}">` +
    `<div class="station-head"><span class="station-no">${mark}</span>${gap}<span class="station-name">${tail.slice(gap.length)}</span></div>` +
    `<div class="station-links">${group("book", "教材")}${group("note", "笔记")}</div></div>`;
}

// 笔记只认最外层那一级小节标题：「### 〔例题〕」算，它下面的「#### 例题 1」「##### 【小题 1】」不算
function noteSections(text) {
  const found = [];
  let fence = false;
  String(text == null ? "" : text).split("\n").forEach((line) => {
    if (/^\s*```/.test(line)) { fence = !fence; return; }
    const h = !fence && line.match(/^(#{1,6})[ \t]+(.*?)[ \t]*$/);
    const kind = h && sectionKind(h[2]);
    if (kind) found.push({ level: h[1].length, kind });
  });
  if (!found.length) return { level: 0, kinds: [] };
  const level = Math.min(...found.map((f) => f.level));
  const kinds = [];
  found.forEach((f) => { if (f.level === level && !kinds.includes(f.kind)) kinds.push(f.kind); });
  return { level, kinds };
}

// 搜索、摘要用的教材原文（本机改过的优先）
function bookText(it) {
  return BookEdits.get(it.id);
}

function subjectSeal(s) {
  const ch = SUBJECT_SEAL[s.id] || s.name.charAt(0);
  return `<span class="seal">${ch}</span>`;
}

// 对照只组织显示：源文与整块渲染的 HTML 分别保存字符区间。
// 不重渲染 Markdown 片段，也不通过 DOM 序列化改变实体、空白或标签。
function dualHtmlBlocks(html, start = 0, end = html.length) {
  const tags = /<!--[\s\S]*?-->|<\/?[a-zA-Z][a-zA-Z0-9:-]*(?:\s(?:[^>"']|"[^"]*"|'[^']*')*)?\s*\/?>/g;
  const voids = /^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
  const blocks = [], stack = [];
  tags.lastIndex = start;
  let m;
  while ((m = tags.exec(html)) && m.index < end) {
    if (m[0].startsWith("<!--")) continue;
    const tag = m[0].match(/^<\/?([\w:-]+)/)[1].toLowerCase();
    if (m[0].startsWith("</")) {
      const node = stack.pop();
      if (!node || node.tag !== tag) throw new Error("对照 HTML 块不完整");
      node.innerEnd = m.index;
      node.end = tags.lastIndex;
      if (!stack.length) blocks.push(node);
    } else {
      const node = { tag, start: m.index, innerStart: tags.lastIndex, open: m[0] };
      if (voids.test(tag) || /\/>$/.test(m[0])) {
        node.innerEnd = node.innerStart;
        node.end = tags.lastIndex;
        if (!stack.length) blocks.push(node);
      } else stack.push(node);
    }
  }
  if (stack.length) throw new Error("对照 HTML 块未闭合");
  return blocks;
}

// 题型写法：教材〔意义〕里每个题型是「#### n. 题型名」（不挂站，可用整行加粗分组），笔记〔例题〕是「#### 例题 n：…」，
// 同一题型的第二道写「例题 n-2」。这样的卡，意义 n 和例题 n 在对照里并排；旧写法（意义是列表、按站排）照旧。
const APP_ENTRY = /^####[ \t]+(\d+)\.[ \t]*(.*?)[ \t]*$/;
const EX_ENTRY = /^####[ \t]+例题[ \t]*(\d+)(?:-\d+)?(?![\d.])[ \t]*[：:]?[ \t]*(.*?)[ \t]*$/;
function appByType(book) {
  const t = String(book == null ? "" : book).replace(/\r/g, "");
  const i = t.search(/^### 意义[ \t]*$/m);
  if (i < 0) return false;
  const rest = t.slice(i).split("\n").slice(1);
  const end = rest.findIndex((l) => /^### /.test(l));
  return (end < 0 ? rest : rest.slice(0, end)).some((l) => APP_ENTRY.test(l));
}

function dualSource(raw, part, byType) {
  const lines = [], re = /[^\n]*(?:\n|$)/g;
  let m;
  while ((m = re.exec(raw)) && m[0]) lines.push({ start: m.index, end: re.lastIndex, line: m[0].replace(/\r?\n$/, "") });
  const level = part === "note" ? noteSections(raw).level : 0;
  let sec = "", station = "", group = "", fence = "";
  const records = [];
  const make = (start, kind, line = "", num = "", title = "") => {
    const canonical = sec === "意义" || sec === "例题" ? "application" : sec;
    const key = JSON.stringify([canonical, station, group, kind, num]);
    records.push({ start, kind, line, title, num, sec, station, group,
      key: sec === "提示" ? part + key : key, sourcePieces: [], htmlPieces: [], html: "" });
  };
  make(0, "content");
  lines.forEach((l, i) => {
    const fm = l.line.match(/^\s*(`{3,}|~{3,})/);
    if (fm) { if (!fence) fence = fm[1][0]; else if (fm[1][0] === fence) fence = ""; return; }
    if (fence) return;
    const h = l.line.match(/^(#{1,6})[ \t]+(.*?)[ \t]*$/);
    const kind = part === "book" ? bookHeadKind(l.line) : h && h[1].length === level && sectionKind(h[2]);
    if (kind) {
      sec = kind; station = group = "";
      make(l.start, "section", l.line);
      make(l.end, "content");
      return;
    }
    const numbered = (sec === "定义" || sec === "性质" || (byType && sec === "意义" && !station)) && l.line.match(APP_ENTRY);
    if (numbered) { make(l.start, "entry", l.line, numbered[1], numbered[2]); return; }
    const ex = byType && sec === "例题" && !station && l.line.match(EX_ENTRY);
    if (ex) {
      // 「例题 n-2」接在同一题型那一格里，不另起一格
      const prev = records[records.length - 1];
      if (!(prev && prev.kind === "entry" && prev.sec === "例题" && prev.num === ex[1])) make(l.start, "entry", l.line, ex[1], ex[2]);
      return;
    }
    if (!sec || sec === "提示") return;
    // 独立段落才能成为标题边界；紧贴上一段的加粗仍属于原段落。
    const independent = i === 0 || !lines[i - 1].line.trim() || /^#{1,6}[ \t]/.test(lines[i - 1].line);
    const st = l.line.match(STATION_LINE);
    if (st && independent) {
      station = st[2]; group = "";
      make(l.start, "station", l.line, "", st[1]);
      make(l.end, "content");
      return;
    }
    const bold = l.line.match(/^\*\*([^*]+)\*\*[ \t]*$/);
    let j = i + 1;
    while (j < lines.length && !lines[j].line.trim()) j++;
    const nextEntry = j < lines.length && (/^####[ \t]+\d+\./.test(lines[j].line) || (byType && EX_ENTRY.test(lines[j].line)));
    const groupSec = sec === "定义" || sec === "性质" || (byType && (sec === "意义" || sec === "例题"));
    if (bold && !st && independent && groupSec && nextEntry) {
      group = bold[1];
      make(l.start, "group", l.line, "", group); make(l.end, "content");
    }
  });
  // 消除同位置的空开头；除此之外，包括空行在内都进入实际行模型。
  const distinct = records.filter((r, i) => i === records.length - 1 || r.start !== records[i + 1].start);
  distinct.forEach((r, i) => {
    const end = i + 1 < distinct.length ? distinct[i + 1].start : raw.length;
    r.sourcePieces.push({ start: r.start, end, text: raw.slice(r.start, end) });
  });
  return distinct;
}

function dualSide(raw, html, part, byType) {
  const segments = dualSource(raw, part, byType);
  const leaves = [];
  dualHtmlBlocks(html).forEach((n) => {
    if (part === "book" && /class="(?:term|term-md|note-body)"/.test(n.open)) {
      if (/class="term"/.test(n.open)) {
        dualHtmlBlocks(html, n.innerStart, n.innerEnd).forEach((c) => {
          if (/class="term-md"/.test(c.open)) leaves.push(...dualHtmlBlocks(html, c.innerStart, c.innerEnd));
          else leaves.push(c);
        });
      } else leaves.push(...dualHtmlBlocks(html, n.innerStart, n.innerEnd));
    } else leaves.push(n);
  });
  const matches = new Map();
  let after = -1;
  const isMatch = (s, n) => {
    const text = html.slice(n.start, n.end);
    if (s.kind === "section") {
      if (part === "book") return /class="(?:term-label|note-label)\b/.test(n.open) && text.includes("〔" + s.sec + "〕");
      const h = text.match(/^<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>$/);
      return h && +h[1] === noteSections(raw).level && sectionKind(h[2].replace(HTML_TAG, "")) === s.sec;
    }
    if (s.kind === "station") return /class="station\b/.test(n.open) && text.includes('data-station="' + s.station + '"');
    if (s.kind === "group") return text === mdHtml(s.line).trim();
    if (s.kind === "entry") {
      const h = text.match(/^<h4\b[^>]*>([\s\S]*?)<\/h4>$/);
      return h && h[1] === mdHtml(s.sec === "例题" ? s.line.replace(/^####[ 	]+/, "").trim() : s.num + ". " + s.title, true);
    }
    return false;
  };
  segments.forEach((s, i) => {
    if (s.kind === "content") return;
    const at = leaves.findIndex((n, j) => j > after && isMatch(s, n));
    if (at < 0) { s.kind = "content"; s.key = part + ":opaque:" + s.start; return; }
    matches.set(at, i); after = at;
  });
  let active = 0, cursor = 0;
  const htmlPieces = [];
  const add = (s, start, end, visible) => {
    if (end <= start) return;
    const piece = { start, end, text: html.slice(start, end) };
    htmlPieces.push(piece); s.htmlPieces.push(piece);
    if (visible) s.html += piece.text;
  };
  leaves.forEach((n, i) => {
    if (matches.has(i)) active = matches.get(i);
    const s = segments[active];
    add(s, cursor, n.start, !html.slice(cursor, n.start).includes("<"));
    add(s, n.start, n.end, true);
    cursor = n.end;
    if (s.kind !== "entry" && matches.has(i) && segments[active + 1] && segments[active + 1].kind === "content") active++;
  });
  add(segments[active], cursor, html.length, !html.slice(cursor).includes("<"));
  return { raw, html, segments, sourcePieces: segments.flatMap((s) => s.sourcePieces), htmlPieces };
}

function dualRows(book, note) {
  const a = book.segments, b = note.segments;
  const count = (xs) => { const m = new Map(); xs.forEach((s) => m.set(s.key, (m.get(s.key) || 0) + 1)); return m; };
  const ca = count(a), cb = count(b);
  const equal = (x, y) => x.key === y.key && ca.get(x.key) === 1 && cb.get(y.key) === 1;
  // LCS preserves both original orders. Crossing or duplicate keys stay single-sided.
  const dp = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--)
    dp[i][j] = equal(a[i], b[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const rows = [];
  let i = 0, j = 0;
  const push = (book, note) => rows.push({ kind: (book || note).kind, book, note,
    merged: !!(book && note && /^(section|station|group)$/.test(book.kind) && book.line === note.line) });
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && equal(a[i], b[j])) push(a[i++], b[j++]);
    else if (i < a.length && (j === b.length || dp[i + 1][j] >= dp[i][j + 1])) push(a[i++], null);
    else push(null, b[j++]);
  }
  return rows;
}

const App = {
  openSubjects: new Set(),

  dualTrackModel(id, bookRaw, noteRaw) {
    const texts = { book: String(bookRaw || ""), note: String(noteRaw || "") };
    const parts = bookParts(texts.book, this.stationDeco(id, texts));
    const byType = appByType(texts.book);
    const book = dualSide(texts.book, parts.main + parts.tip, "book", byType);
    const note = dualSide(texts.note, this.stationizeNote(noteMdHtml(texts.note), texts.note, id, texts), "note", byType);
    const rows = dualRows(book, note);
    const pairs = rows.filter((r) => r.book && r.note && r.kind === "entry");
    // 按站或分组组织的卡（重构过的）按「小节 + 站 + 分组 + 编号」配对就可靠：本机改了某条标题、两边标题不再相同，
    // 也照样对照，每张小卡片的「编辑」都还在。旧卡没有站和分组，编号可能对错位，仍要求每一对标题对得上。
    const titled = (r) => r.note.title === r.book.title || r.note.title.startsWith(r.book.title + "：");
    const enabled = pairs.length > 0 && (cardOutline(texts.book, texts.note).structured || pairs.every(titled));
    rows.filter((r) => r.merged).forEach((r) => {
      // 站名取已经渲染、转义的内容，不能把原文里的 < 或 & 当作新 HTML 插回去。
      const head = r.kind === "station" && r.book.html.match(/<span class="station-no">[^<]*<\/span>([ \t]*)<span class="station-name">([\s\S]*?)<\/span><\/div>/);
      const name = head ? r.book.station + head[1] + head[2] : escapeHtml(r.book.title);
      r.html = r.kind === "station"
        ? stationBarHtml(id, "book", r.book.sec, r.book.station, name, this.stationMap(id, texts), { book: r.book.sec, note: r.note.sec })
        : r.book.html;
    });
    return { enabled, pairs, rows, book, note };
  },

  dualTrackHtml(model) {
    const attrs = (s, part) => `data-part="${part}" data-sec="${escapeHtml(s.sec)}" data-station="${escapeHtml(s.station)}"`;
    const cell = (s, part, numbered) => {
      if (!s) return numbered ? `<div class="dual-cell dual-${part} dual-missing">${part === "book" ? "教材" : "笔记"}没有这一条</div>`
        : `<div class="dual-cell dual-${part} dual-empty" aria-hidden="true"></div>`;
      const body = part === "book" ? "entry-statement" : "mynote-body md";
      const src = s.sourcePieces.length ? ` data-src="${s.sourcePieces[0].start}-${s.sourcePieces[s.sourcePieces.length - 1].end}"` : "";
      return `<div class="dual-cell dual-${part}" ${attrs(s, part)}${src}>` +
        (part === "note" ? '<span class="dual-label">笔记</span>' : "") +
        `<div class="${body}">${part === "book" ? '<div class="term-md">' + s.html + '</div>' : s.html}</div></div>`;
    };
    return '<div class="dual-track"><div class="dual-columns"><span>教材</span><span>笔记</span></div>' + model.rows.map((r) => {
      const hasBook = !!(r.book && r.book.html.trim()), hasNote = !!(r.note && r.note.html.trim());
      if (!hasBook && !hasNote) return "";
      const s = hasBook ? r.book : r.note;
      const wide = (!hasBook || !hasNote) && (r.kind === "content" || s.sec === "提示");
      const cls = "dual-row kind-" + r.kind + (r.merged ? " is-merged" : wide ? " is-wide" : "");
      if (r.merged) return `<div class="${cls}" data-sec="${escapeHtml(s.sec)}" data-station="${escapeHtml(s.station)}">` +
        `<div class="dual-shared" data-book-sec="${escapeHtml(r.book.sec)}" data-note-sec="${escapeHtml(r.note.sec)}" data-station="${escapeHtml(s.station)}">${r.html}</div></div>`;
      return `<div class="${cls}">` + (wide ? cell(s, hasBook ? "book" : "note") : cell(r.book, "book", r.kind === "entry") + cell(r.note, "note", r.kind === "entry")) + "</div>";
    }).join("") + "</div>";
  },

  ensureEntryOriginal(entry) {
    if (!entry || !entry.classList.contains("is-dual")) return;
    const id = entry.id.slice(5);
    const section = entry.querySelector("section.card-book");
    const slot = entry.querySelector(".mynote-slot");
    const controls = entry.querySelector(".dual-controls");
    controls.before(section, slot);
    controls.remove();
    entry.querySelector(".dual-track").remove();
    section.innerHTML = this.bookCardInner(id);
    slot.innerHTML = this.myNoteHtml(id);
    entry.classList.remove("is-dual");
    renderMath(entry);
  },

  maybeApplyDual(entry) {
    if (!entry || entry.querySelector(".mynote-editing, .cell-editing")) return;
    this.ensureEntryOriginal(entry);
    if (this._printing) return;
    const id = entry.id.slice(5);
    if (!Notes.has(id)) return;
    const model = this.dualTrackModel(id, BookEdits.get(id), Notes.get(id));
    if (!model.enabled) return;
    const section = entry.querySelector("section.card-book");
    const slot = entry.querySelector(".mynote-slot");
    const head = section.querySelector(".card-book-head");
    const noteHead = slot.querySelector(".mynote-head");
    const figure = section.querySelector(".entry-figure");
    section.replaceChildren(head);
    slot.replaceChildren(noteHead);
    const controls = document.createElement("div");
    controls.className = "dual-controls";
    section.before(controls);
    controls.append(section, slot);
    const projection = document.createElement("div");
    projection.innerHTML = this.dualTrackHtml(model);
    const track = projection.firstElementChild;
    controls.after(track);
    this.decorateStations(track, id);
    this.decorateCells(track, entry, id);
    if (figure) {
      const row = document.createElement("div"); row.className = "dual-row is-wide";
      const cell = document.createElement("div"); cell.className = "dual-cell dual-book";
      cell.dataset.part = "book"; cell.append(figure); row.append(cell);
      const tip = [...track.querySelectorAll(".dual-cell[data-sec='提示']")].find((c) => c.dataset.part === "book");
      if (tip) tip.closest(".dual-row").before(row); else track.append(row);
    }
    entry.classList.add("is-dual");
    renderMath(track);
  },

  // 站卡：站名下面是「本卡主线」里这一站的那句话（每站只在第一次出现时加），再下面是这一站这一节的小标题，
  // 点一个跳到那张卡片。意义那一行和笔记的例题同在一张站卡上，两组各占一行。
  // 没有站、按分组组织的卡（第 3 章卡②），小标题放在分组那一行。只加显示，原文不动。
  decorateStations(track, id) {
    const book = BookEdits.get(id);
    const o = cardOutline(book, Notes.has(id) ? Notes.get(id) : "");
    const story = cardStory(book).st, seen = new Set();
    const attr = (v) => escapeHtml(v).replace(/"/g, "&quot;");
    const chips = (lists, station) => {
      if (!lists.length) return "";
      const label = lists.length > 1;
      return `<div class="st-titles">` + lists.map((l) => {
        let group = "";
        const items = l.items.map((it, k) => {
          const g = it.group && it.group !== group && !l.inGroup ? `<span class="st-grp">${mdHtml(it.group, true)}</span>` : "";
          group = it.group;
          return g + `<button type="button" class="st-chip" data-part="${l.part}" data-sec="${l.sec}" data-station="${attr(station)}" data-ord="${l.inGroup ? k : it.ord}">${mdHtml(it.title, true)}</button>`;
        }).join("");
        return `<div class="st-line" data-sec="${l.sec}">${label ? `<span class="st-label ${BOOK_CLASS[l.sec]}">${l.sec}</span>` : ""}${items}</div>`;
      }).join("") + `</div>`;
    };
    const listsFor = (b, secs) => {
      const lists = [];
      [...new Set(secs)].forEach((sec) => {
        const part = sec === "例题" || sec === "提示" ? "note" : "book";
        const r = b && b.rows[part + sec];
        if (r && r.items.length) lists.push({ part, sec, items: r.items });
      });
      return lists;
    };
    const stationRows = track.querySelectorAll(".dual-row.kind-station");
    stationRows.forEach((row) => {
      row.querySelectorAll(".station").forEach((bar) => {
        const mark = bar.dataset.station;
        const shared = bar.closest(".dual-shared");
        const secs = shared ? [shared.dataset.bookSec, shared.dataset.noteSec] : [bar.closest(".dual-cell").dataset.sec];
        let html = "";
        if (!seen.has(mark) && story[mark]) {
          seen.add(mark);
          html += `<div class="station-story">${mdHtml(story[mark], true)}</div>`;
        }
        html += chips(listsFor(o.blocks.find((x) => x.mark === mark), secs), mark);
        if (html) bar.insertAdjacentHTML("beforeend", html);
      });
    });
    if (stationRows.length) return;
    track.querySelectorAll(".dual-row.kind-group").forEach((row) => {
      const head = row.querySelector(".dual-shared") || row.querySelector(".dual-cell");
      const sec = row.dataset.sec || (head && head.dataset.sec);
      const name = head && head.textContent.trim();
      const b = o.blocks.find((x) => x.mark === (row.dataset.station || ""));
      const r = b && b.rows["book" + sec];
      const items = r ? r.items.filter((it) => it.group && mdHtml(it.group, true).replace(HTML_TAG, "").trim() === name) : [];
      if (head && items.length) head.insertAdjacentHTML("beforeend", chips([{ part: "book", sec, items, inGroup: true }], ""));
    });
  },

  // 每张小卡片右上角：一个状态（仓库版 / 本地版 · 待提交）和「编辑」（只改这一格对应的那段原文，editCell）。
  // 状态按这一格的原文和仓库里「同一位置」那一格比：同一位置 = 同一个配对键（小节、站、分组、编号）的第几次出现，教材、笔记各自比。
  // 改动都落在某张卡片上时，顶上那一栏不再重复显示状态；改的是卡片以外的地方（比如站名行）才留着。
  decorateCells(track, entry, id) {
    const texts = { book: BookEdits.get(id), note: Notes.get(id) };
    const repo = { book: BookEdits.seed(id), note: window.__KAOYAN_SEED_NOTES__[id] || "" };
    const pending = { book: BookEdits.isPending(id), note: Notes.isPending(id) };
    const index = (raw, part, byType) => {
      const seen = {}, byStart = new Map(), byKey = new Map();
      dualSource(raw, part, byType).forEach((r) => {
        const first = r.sourcePieces[0], last = r.sourcePieces[r.sourcePieces.length - 1];
        if (!first) return;
        const k = r.key + "#" + (seen[r.key] = (seen[r.key] || 0) + 1);
        const core = cellSource(raw, first.start, last.end).core;
        byStart.set(first.start, { k, core });
        byKey.set(k, core);
      });
      return { byStart, byKey };
    };
    const now = {}, base = {}, local = { book: 0, note: 0 };
    ["book", "note"].forEach((p) => { if (pending[p]) { now[p] = index(texts[p], p, appByType(texts.book)); base[p] = index(repo[p], p, appByType(repo.book)); } });
    this._cellRepo = {};
    track.querySelectorAll(".dual-row.kind-entry > .dual-cell[data-src], .dual-row.kind-content > .dual-cell[data-src]").forEach((cell) => {
      const p = cell.dataset.part, start = +cell.dataset.src.split("-")[0];
      let state = "repo";
      if (pending[p]) {
        const me = now[p].byStart.get(start);
        const was = me ? base[p].byKey.get(me.k) : undefined;
        if (!me || was !== me.core) { state = "local"; local[p]++; }
        this._cellRepo[id + "|" + p + "|" + start] = was;
      }
      cell.dataset.state = state;
      cell.insertAdjacentHTML("afterbegin", `<div class="cell-tools"><span class="cell-state ${state}" title="${state === "local"
        ? "这一张在这台设备上改过，导出待提交文件交给 Claude 提交" : "和仓库里的一样"}">${state === "local" ? "本地版 · 待提交" : "仓库版"}</span>` +
        `<button type="button" class="cell-edit" title="只改这一张卡片">编辑</button></div>`);
      // 只挪显示 DOM：笔记徽标与状态、编辑同排，双轨 HTML 和原文定位不变。
      const label = cell.querySelector(":scope > .dual-label");
      if (label) cell.querySelector(":scope > .cell-tools").prepend(label);
    });
    const section = entry.querySelector(".dual-controls > section.card-book");
    const slot = entry.querySelector(".dual-controls > .mynote-slot");
    if (section) section.classList.toggle("flags-in-cells", !pending.book || local.book > 0);
    if (slot) slot.classList.toggle("flags-in-cells", !pending.note || local.note > 0);
  },

  // 站卡上的小标题对应的那张卡片：从站卡（或分组行）往下，到下一站、下一节之前，按同样的规则数到第 ord 张
  stationChipTarget(chip) {
    const start = chip.closest(".dual-row");
    if (!start) return null;
    const { part, sec } = chip.dataset;
    const ord = +chip.dataset.ord;
    const rows = [];
    for (let r = start.nextElementSibling; r; r = r.nextElementSibling) {
      if (r.classList.contains("kind-station") || r.classList.contains("kind-section")) break;
      if (start.classList.contains("kind-group") && r.classList.contains("kind-group")) break;
      rows.push(r);
    }
    if (sec === "定义" || sec === "性质") return rows.filter((r) => r.classList.contains("kind-entry"))[ord] || null;
    const cells = rows.map((r) => r.querySelector('.dual-cell[data-part="' + part + '"]')).filter(Boolean);
    const items = sec === "意义"
      ? cells.flatMap((c) => [...c.querySelectorAll(".term-md > ul > li, .term-md > ol > li")].filter((li) =>
        li.firstElementChild && li.firstElementChild.tagName === "STRONG" && /^\d+\./.test(li.firstElementChild.textContent.trim())))
      : cells.flatMap((c) => [...c.querySelectorAll("h2, h3, h4, h5, h6")].filter((h) => /^例题\s*\d+(?![\d.])/.test(h.textContent.trim())));
    return items[ord] || null;
  },

  // 单张小卡片的编辑：只改这一格对应的那段原文（教材或笔记），拼回整张卡的原文存在本机，
  // 和整卡编辑一样标成「本地已改」，导出待提交文件交给 Claude 提交。前后的空行原样保留，免得把下一个标题粘上来。
  editCell(cell) {
    const entry = cell && cell.closest(".entry");
    if (!entry || !cell.dataset.src || entry.querySelector(".cell-editing, .mynote-editing")) return;
    const id = entry.id.slice(5), part = cell.dataset.part;
    const full = part === "book" ? BookEdits.get(id) : Notes.get(id);
    const [start, end] = cell.dataset.src.split("-").map(Number);
    const { core } = cellSource(full, start, end);
    const repo = this._cellRepo ? this._cellRepo[id + "|" + part + "|" + start] : undefined;
    const entryCard = cell.closest(".dual-row").classList.contains("kind-entry");
    this._cellEdit = { id, part, full, start, end, core, repo, entryCard, html: cell.innerHTML };
    cell.classList.add("cell-editing");
    cell.innerHTML = `<div class="cell-editor">
      <div class="cell-editor-head">${part === "book" ? "教材" : "笔记"} · 只改这一张</div>
      <textarea class="mynote-input cell-input" spellcheck="false"></textarea>
      <div class="cell-preview" hidden></div>
      <div class="mynote-actions">
        <button class="mynote-save" data-cell-action="save">保存</button>
        <button class="mynote-preview-btn" data-cell-action="preview">预览</button>
        <button class="mynote-cancel" data-cell-action="cancel">取消</button>
        ${cell.dataset.state === "local" && repo != null ? `<button class="mynote-restore" data-cell-action="restore" title="丢掉本机对这一张的改动">改回仓库版</button>` : ""}
      </div>
    </div>`;
    const ta = cell.querySelector(".cell-input");
    ta.value = core;
    const fit = () => { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight + 4, 640) + "px"; };
    ta.addEventListener("input", fit);
    fit();
    ta.focus();
  },

  cellAction(btn) {
    const cell = btn.closest(".dual-cell");
    const ed = this._cellEdit;
    const entry = cell && cell.closest(".entry");
    if (!ed || !entry || entry.id !== "item-" + ed.id) return;
    const ta = cell.querySelector(".cell-input");
    const close = () => { cell.classList.remove("cell-editing"); cell.innerHTML = ed.html; this._cellEdit = null; };
    const act = btn.dataset.cellAction;
    let val = ta.value.replace(/^(?:[ \t]*\r?\n)*/, "").replace(/\s+$/, "");
    if (act === "preview") {
      // 预览：用和卡片显示一样的渲染，看完点「继续改」回到输入框
      const pv = cell.querySelector(".cell-preview");
      if (!pv.hidden) { pv.hidden = true; ta.hidden = false; btn.textContent = "预览"; ta.focus(); return; }
      pv.innerHTML = ed.part === "book" ? `<div class="entry-statement">${bookParts(ta.value).main}</div>`
        : `<div class="mynote-body md">${noteMdHtml(ta.value)}</div>`;
      renderMath(pv);
      pv.hidden = false; ta.hidden = true; btn.textContent = "继续改";
      return;
    }
    if (act === "cancel") {
      if (val !== ed.core && !confirm("改动还没保存，确定放弃吗？")) return;
      close();
      return;
    }
    if (act === "restore") {
      if (!confirm("把这一张改回仓库里的那一版？本机对这一张的改动会丢掉。")) return;
      val = ed.repo;
    } else if (ed.entryCard && /^#{4}[ \t]+\d+\./.test(ed.core) && !/^#{4}[ \t]+\d+\./.test(val) &&
      !confirm("这一张第一行原来是「#### 编号. 标题」，现在不是了。保存后它会和另一边的卡片对不上，要继续保存吗？")) return;
    if (val === ed.core) { close(); return; }
    if ((ed.part === "book" ? BookEdits.get(ed.id) : Notes.get(ed.id)) !== ed.full) {
      alert("这张卡的原文在别处改过了，刷新页面后再改。");
      return;
    }
    if (!val && !confirm("这一张清空以后，这段原文就没有了。确定吗？")) return;
    const chk = this.codeBlockCheck(val);
    if (chk && !confirm("第 " + chk.lines.slice(0, 8).join("、") + " 行的缩进会显示成代码块。内容不会丢，要继续保存吗？")) return;
    const next = cellSplice(ed.full, ed.start, ed.end, val);
    if (!(ed.part === "book" ? BookEdits.set(ed.id, next) : Notes.set(ed.id, next))) {
      alert("保存失败：浏览器存储空间不足或被禁用。");
      return;
    }
    const at = [...entry.querySelectorAll(".dual-row")].indexOf(cell.closest(".dual-row"));
    this._cellEdit = null;
    cell.classList.remove("cell-editing");
    this.maybeApplyDual(entry);
    this.refreshDualLayout();
    this.refreshNoteCount();
    this.refreshTocSub(ed.id);
    if (ed.part === "note") this.refreshTocState(ed.id);
    const row = entry.querySelectorAll(".dual-row")[at];
    const back = row || entry;
    this.scrollToItem(back);
    back.classList.add("toc-flash");
    setTimeout(() => back.classList.remove("toc-flash"), 1800);
    if (ed.part === "note") this.askDownload(ed.id);
  },

  // 一章只有一张按站组织的超级卡：章节头、右侧目录都按站来
  superCard(subjectId, chapterId) {
    const items = KaoyanData.itemsByChapter(subjectId, chapterId);
    if (items.length !== 1) return null;
    return cardOutline(BookEdits.get(items[0].id), "").blocks.some((b) => b.mark) ? items[0] : null;
  },

  refreshDualLayout() {
    const pane = document.getElementById("content-pane");
    if (!pane) return;
    (pane.closest(".content") || pane).classList.toggle("is-compare", !!pane.querySelector(".dual-track"));
    const measure = () => {
      const toolbar = pane.querySelector(".toolbar");
      const mobile = document.querySelector(".mobile-topbar");
      const mobileHeight = mobile && getComputedStyle(mobile).display !== "none" ? mobile.offsetHeight : 0;
      pane.style.setProperty("--dual-sticky-top", (mobileHeight + (toolbar ? toolbar.offsetHeight : 0) + 24) + "px");
      this.updateHere();
    };
    if (this._dualResize) this._dualResize.disconnect();
    if (typeof ResizeObserver !== "undefined") {
      this._dualResize = new ResizeObserver(measure);
      const toolbar = pane.querySelector(".toolbar");
      if (toolbar) this._dualResize.observe(toolbar);
    }
    this._measureDual = measure;
    measure();
  },

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

    // 站牌上的链接、顶部位置条都跟着页面内容重画，所以点击挂在 document 上
    document.addEventListener("click", (e) => {
      const el = e.target.closest && e.target.closest(".station-links a[data-goto], #chapter-here");
      // 目录是点开的：点目录以外的地方就收起
      const rail = document.getElementById("chapter-rail");
      if (!el && rail && rail.classList.contains("open") && !(e.target.closest && e.target.closest("#chapter-rail"))) this.closeRail();
      if (!el) return;
      e.preventDefault();
      if (el.id === "chapter-here") this.openRail();
      else this.gotoLink(el);
    });
    // 站卡上的小标题：点了跳到那张卡片；小卡片右上角的「编辑」和它的保存 / 取消（卡片会重画，挂在 document 上）
    document.addEventListener("click", (e) => {
      const t = e.target.closest && e.target.closest(".st-chip, .cell-edit, [data-cell-action]");
      if (!t) return;
      if (t.classList.contains("st-chip")) {
        const target = this.stationChipTarget(t);
        if (!target) return;
        this.scrollToItem(target);
        target.classList.add("toc-flash");
        setTimeout(() => target.classList.remove("toc-flash"), 1800);
      } else if (t.classList.contains("cell-edit")) this.editCell(t.closest(".dual-cell"));
      else this.cellAction(t);
    });
    let hereQueued = false;
    const here = () => {
      if (hereQueued) return;
      hereQueued = true;
      requestAnimationFrame(() => { hereQueued = false; this.updateHere(); });
    };
    window.addEventListener("scroll", here, { passive: true });
    window.addEventListener("resize", () => { if (this._measureDual) this._measureDual(); here(); });
    window.addEventListener("beforeprint", () => this.preparePrint());
    window.addEventListener("afterprint", () => this.finishPrint());

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
      : source === "book" ? [".entry-statement, .entry-note, .dual-shared[data-book-sec]"]
      : source === "note" ? [".dual-note .mynote-body, .dual-shared[data-note-sec], .mynote-slot"] : [];
    selectors.push(".entry-title, .entry-statement, .entry-note, .dual-note .mynote-body, .dual-shared, .mynote-slot, .chapter-summary-head");
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
    (el.closest(".content") || el).classList.remove("is-compare");
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
        <h1>定义 · 性质<br />每天读一点</h1>
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
    // 一张超级卡的章：统计按站和各节条数，「本卡主线」放在标题下面，不要「全部 / 定义 / 性质」筛选
    const sup = this.superCard(subjectId, chapterId);
    const supBook = sup ? BookEdits.get(sup.id) : "";
    const supOutline = sup ? cardOutline(supBook, Notes.has(sup.id) ? Notes.get(sup.id) : "") : null;
    const lead = sup ? cardStory(supBook).lead : "";
    const supStats = sup ? ["1 张超级卡", supOutline.blocks.filter((b) => b.mark && !b.mark.includes("′")).length + " 站"]
      .concat(OUTLINE_SECS.map(([p, sec]) => [sec, supOutline.blocks.reduce((n, b) => n + (b.rows[p + sec] || { items: [] }).items.length, 0)])
        .filter((x) => x[1]).map(([sec, n]) => sec + " " + n)).join(" · ") : "";

    return `
      <nav class="breadcrumb">
        <a href="#overview">总览</a>
        <span class="sep">/</span>
        <a href="#${subjectId}">${escapeHtml(s.name)}</a>
      </nav>
      <h1 class="page-title"><span class="page-title-no">${String(c.order).padStart(2, "0")}</span>${escapeHtml(c.name)}</h1>
      <p class="page-sub">${sup ? supStats : `共 ${items.length} 条 · ${TYPE_ORDER.filter((t) => items.some((i) => this.itemTypes(i).includes(t))).map((t) => `${TYPE_LABEL[t]} ${items.filter((i) => this.itemTypes(i).includes(t)).length}`).join(" · ")}`}</p>
      ${lead ? `<p class="page-lead"><b>本卡主线</b>${mdHtml(lead, true)}</p>` : ""}

      <div class="toolbar">
        <div class="search-bar">
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input type="text" id="chapter-search" placeholder="在本章内搜索（含笔记）…" aria-label="在本章内搜索，包含笔记" />
        </div>
        ${sup ? "" : `<div class="chip-row" id="chapter-type-filter">
          <button class="chip active" data-type="all">全部</button>
          ${TYPE_ORDER.map((t) => {
            const n = items.filter((i) => this.itemTypes(i).includes(t)).length;
            return n ? `<button class="chip" data-type="${t}">${TYPE_LABEL[t]}</button>` : "";
          }).join("")}
        </div>`}
        <button class="here" id="chapter-here" type="button" hidden></button>
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

  // 打印临时原样，不改显示偏好或保存原文。未保存草稿单独快照，打印后重开编辑器。
  preparePrint() {
    if (this._printing) return;
    const drafts = [];
    document.querySelectorAll("section.card-book[data-book], .mynote-slot").forEach((box) => {
      const ta = box.querySelector(".mynote-input");
      if (!ta) return;
      drafts.push({ part: box.dataset.book ? "book" : "note", id: box.dataset.book || box.dataset.note,
        value: ta.value, start: ta.selectionStart, end: ta.selectionEnd, scroll: ta.scrollTop,
        preview: ta.hidden, focused: document.activeElement === ta,
        zoomed: !!box.querySelector(".fullscreen") });
    });
    this._printState = { drafts, query: this.chapterQuery, type: this.chapterTypeFilter, scroll: window.scrollY };
    this._printing = true;
    this.exitZoom();
    this.closeRail();
    const needsReset = this.chapterQuery || (this.chapterTypeFilter && this.chapterTypeFilter !== "all");
    if (needsReset && this.current && this.current.type === "chapter") {
      this.chapterQuery = "";
      this.chapterTypeFilter = "all";
      const si = document.getElementById("chapter-search");
      if (si) si.value = "";
      document.querySelectorAll("#chapter-type-filter .chip").forEach((c) => {
        c.classList.toggle("active", c.dataset.type === "all");
      });
      this.renderChapterGroups(this.current.subjectId, this.current.chapterId);
    }
    document.querySelectorAll("#chapter-item-groups .entry").forEach((entry) => this.ensureEntryOriginal(entry));
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
    this.refreshDualLayout();
  },

  finishPrint() {
    const state = this._printState;
    if (!state) return;
    this._printing = false; this._printState = null;
    this.chapterQuery = state.query; this.chapterTypeFilter = state.type;
    if (this.current && this.current.type === "chapter" && (state.query || state.type && state.type !== "all")) {
      this.renderChapterGroups(this.current.subjectId, this.current.chapterId);
      const search = document.getElementById("chapter-search");
      if (search) search.value = state.query || "";
      document.querySelectorAll("#chapter-type-filter .chip").forEach((c) => c.classList.toggle("active", c.dataset.type === (state.type || "all")));
    } else document.querySelectorAll("#chapter-item-groups .entry").forEach((entry) => this.maybeApplyDual(entry));
    state.drafts.forEach((d) => {
      const selector = d.part === "book" ? "section.card-book[data-book]" : ".mynote-slot";
      const box = [...document.querySelectorAll(selector)].find((el) => (el.dataset.book || el.dataset.note) === d.id);
      if (!box) return;
      const edit = box.querySelector(d.part === "book" ? '[data-book-action="edit"]' : '[data-action="edit"]');
      if (!edit) return;
      edit.click();
      const ta = box.querySelector(".mynote-input");
      ta.value = d.value;
      ta.setSelectionRange(d.start, d.end);
      ta.scrollTop = d.scroll;
      if (d.part === "book") this.refreshBookWarn(box); else this.refreshEditorWarn(box);
      const action = d.part === "book" ? "data-book-action" : "data-action";
      if (d.preview) box.querySelector('[' + action + '="preview"]').click();
      if (d.zoomed) box.querySelector('[' + action + '="zoom"]').click();
      if (d.focused && !d.preview) ta.focus({ preventScroll: true });
    });
    this.refreshDualLayout();
    window.scrollTo(0, state.scroll);
  },

  printChapter() {
    this.preparePrint();
    setTimeout(() => {
      try { window.print(); } catch (e) { this.finishPrint(); throw e; }
    }, 60);
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

    let html = this.superCard(subjectId, chapterId) ? "" : this.tocHtml(groups, nos, subjectId, chapterId);
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
    // 一张超级卡的章：模块标题、卡号、卡片标题和「本卡主线」重复，卡号的 ① 还会和第 ① 站混在一起，都不显示
    wrap.classList.toggle("is-super", !!this.superCard(subjectId, chapterId));
    wrap.querySelectorAll(".entry").forEach((entry) => this.maybeApplyDual(entry));
    renderMath(wrap);
    this.bindNoteEditors(wrap);
    this.bindBookEditors(wrap);
    this.bindToc(wrap);
    this.refreshDualLayout();
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
  // 点把手打开，点目录以外的地方、按 Esc 或点了条目就收起（鼠标经过不再弹出，免得挡住正在读的内容）。
  renderRail(subjectId, chapterId) {
    const rail = document.getElementById("chapter-rail");
    if (!rail) return;
    const c = KaoyanData.chapter(subjectId, chapterId);
    const items = KaoyanData.itemsByChapter(subjectId, chapterId);
    if (!c || !items.length) { this.hideRail(); return; }

    const sup = this.superCard(subjectId, chapterId);
    const groups = this.chapterGroups(subjectId, chapterId, items);
    const nos = this.chapterNos(subjectId, chapterId);

    const cols = sup ? "" : groups
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
                  ${this.tocSubHtml(it.id)}
                </li>`
              )
              .join("")}
          </ol>
        </div>`
      )
      .join("");

    // 一张超级卡的章：目录只列各站，正在读的那一站下面是五个小节的入口；其余的章照旧
    const st = sup ? this.stationRailHtml(sup, subjectId, chapterId) : null;
    const foot = sup ? st.body : this.chapterExtraTocHtml(subjectId, chapterId);

    rail.innerHTML = `
      <button class="rail-tab" id="rail-tab" aria-expanded="false" aria-controls="rail-panel">本章目录</button>
      <div class="rail-panel" id="rail-panel">
        <div class="rail-inner">
          <div class="rail-head">
            <span class="rail-head-no">${String(c.order).padStart(2, "0")}</span>
            <span class="rail-head-name">${escapeHtml(c.name)}</span>
            <span class="rail-head-count">${sup ? st.count + " 站" : items.length + " 条"}</span>
            ${sup ? `<button type="button" class="rail-all" aria-pressed="false">全部展开</button>` : ""}
          </div>
          <div class="rail-body">${cols}${foot}</div>
        </div>
      </div>`;
    rail.hidden = false;
    rail.classList.remove("open");
    rail.classList.toggle("is-stations", !!sup);
    rail.dataset.here = "";
    renderMath(rail);
    this.updateHere();

    const tab = document.getElementById("rail-tab");
    tab.addEventListener("click", () => {
      if (rail.classList.contains("open")) this.closeRail();
      else this.openRail();
    });
    // 「全部展开」：每一站都列出定义、性质的小标题，方便整章一起看；开关记在本机
    const all = rail.querySelector(".rail-all");
    if (all) {
      const set = (on) => { rail.classList.toggle("all-open", on); all.setAttribute("aria-pressed", String(on)); all.textContent = on ? "只看当前站" : "全部展开"; };
      let saved = false;
      try { saved = localStorage.getItem("kaoyan-rail-all") === "1"; } catch (e) {}
      set(saved);
      all.addEventListener("click", () => {
        const on = !rail.classList.contains("all-open");
        set(on);
        try { localStorage.setItem("kaoyan-rail-all", on ? "1" : "0"); } catch (e) {}
      });
    }
    this.bindToc(rail);
    // 点了条目就收起（触屏钉住的情况下尤其需要）
    rail.querySelectorAll("[data-goto]").forEach((a) => {
      a.addEventListener("click", () => this.closeRail());
    });
  },

  // 按站的目录：一站一行，右边是这一站定义、性质的条数；展开的站（正在读的那一站，或「全部展开」时每一站）
  // 列出定义、性质的每个小标题，点一个跳到那张小卡片；意义、例题、提示只给条数。最下面是本章三件
  stationRailHtml(it, subjectId, chapterId) {
    const id = it.id;
    const o = cardOutline(BookEdits.get(id), Notes.has(id) ? Notes.get(id) : "");
    const attr = (v) => escapeHtml(v).replace(/"/g, "&quot;");
    const link = (cls, part, sec, mark, html, ord) =>
      `<a class="${cls}" href="#item-${id}" data-goto="${id}" data-part="${part}" data-sec="${sec}" data-station="${attr(mark)}"${ord == null ? "" : ` data-ord="${ord}"`}>${html}</a>`;
    const sts = o.blocks.filter((b) => b.mark);
    const rows = sts.map((b) => {
      const first = OUTLINE_SECS.find(([p, sec]) => b.rows[p + sec]) || ["book", "定义"];
      const n = (p, sec) => (b.rows[p + sec] || { items: [] }).items.length;
      const sum = ["定义", "性质"].filter((sec) => n("book", sec))
        .map((sec) => `<span class="${BOOK_CLASS[sec]}">${sec} ${n("book", sec)}</span>`).join("");
      const list = (sec) => {
        const r = b.rows["book" + sec];
        if (!r || !r.items.length) return "";
        let group = "";
        const lis = r.items.map((x) => {
          const g = x.group && x.group !== group ? `<li class="rl-grp">${mdHtml(x.group, true)}</li>` : "";
          group = x.group;
          return g + `<li>${link("rl-item", "book", sec, b.mark, mdHtml(x.title, true), x.ord)}</li>`;
        }).join("");
        return `<div class="rl-sec ${BOOK_CLASS[sec]}">${link("rl-sec-head", "book", sec, b.mark, `${sec}<b>${r.items.length}</b>`)}<ol class="rl-items">${lis}</ol></div>`;
      };
      const minis = [["book", "意义"], ["note", "例题"], ["note", "提示"]]
        .map(([p, sec]) => n(p, sec) ? link("rl-mini " + BOOK_CLASS[sec], p, sec, b.mark, `${sec}<b>${n(p, sec)}</b>`) : "").join("");
      return `<div class="rl-st" data-station="${attr(b.mark)}">` +
        link("rl-name", first[0], first[1], b.mark, `<span class="rl-no">${escapeHtml(b.mark)}</span><span class="rl-label">${mdHtml(b.name.slice(b.mark.length).trim(), true)}</span><span class="rl-sum">${sum}</span>`) +
        `<div class="rl-detail">${list("定义")}${list("性质")}${minis ? `<div class="rl-minis">${minis}</div>` : ""}</div></div>`;
    }).join("");
    // 题型写法的卡：意义 + 例题不挂站，六站后面单独一组「题型」，按分组列出题型名；读到意义时它展开
    const app = o.blocks.find((b) => !b.mark && b.rows.book意义);
    let types = "";
    if (app) {
      const its = app.rows.book意义.items;
      const short = (g) => g.replace(/^[一二三四五六七八九十]+、/, "").split(/[：:]/)[0];
      const groups = [...new Set(its.map((x) => x.group).filter(Boolean))];
      const sum = groups.map((g) => `<span>${escapeHtml(short(g))} ${its.filter((x) => x.group === g).length}</span>`).join("");
      let group = "";
      const lis = its.map((x) => {
        const g = x.group && x.group !== group ? `<li class="rl-grp">${mdHtml(x.group, true)}</li>` : "";
        group = x.group;
        return g + `<li>${link("rl-item", "book", "意义", "", `<span class="rl-tno">${escapeHtml(x.num)}</span>${mdHtml(x.title, true)}`, x.ord)}</li>`;
      }).join("");
      types = `<div class="rl-cap">题型 · ${its.length}</div><div class="rl-st rl-types" data-station="题型">` +
        link("rl-name", "book", "意义", "", `<span class="rl-no">题</span><span class="rl-label">意义与例题</span><span class="rl-sum">${sum}</span>`) +
        `<div class="rl-detail"><ol class="rl-items">${lis}</ol></div></div>`;
    }
    const extras = this.chapterExtras(subjectId, chapterId).map(({ noteId, imageId, title, label }) =>
      `<a class="rl-extra" href="#item-${imageId || noteId}" data-goto="${imageId || noteId}">${escapeHtml(label || title)}</a>`).join("");
    const count = sts.filter((b) => !b.mark.includes("′")).length;
    return { count, body: `<div class="rl-cap">主线 · ${count} 站</div>${rows}${types}<div class="rl-cap">本章</div><div class="rl-extras">${extras}</div>` };
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

  // 卡片条目下面的两行：「教材」「笔记」各自跳到那一块，后面的「定义 性质 …」跳到那一节。
  // 教材每张卡都有；笔记写了才出现。
  // 按「站」组织的卡（见 sectionStations）：先一行「主线」列出各站全名（跳到教材里该站第一次出现处），
  // 「教材」「笔记」下面每个小节各占一行，后面是这一节里有的站（圈号，悬停看全名），点了跳到这一节里的这一站。
  tocSubHtml(itemId) {
    const attr = (s) => escapeHtml(s).replace(/"/g, "&quot;");
    const link = (cls, part, sec, st, text, title) =>
      `<a class="${cls}" href="#item-${itemId}" data-goto="${itemId}" data-part="${part}"${sec ? ` data-sec="${sec}"` : ""}${
        st ? ` data-station="${attr(st)}"` : ""}${title ? ` title="${attr(title)}"` : ""}>${escapeHtml(text)}</a>`;
    const secLink = (part, k) => link(`toc-sub-sec ${BOOK_CLASS[k] || ""}`, part, k, "", k);
    const row = (part, label, kinds, text) => {
      const st = sectionStations(text, part);
      if (!kinds.some((k) => st[k])) return `
                    <div class="toc-sub-row">
                      ${link("toc-sub-part", part, "", "", label)}
                      ${kinds.map((k) => secLink(part, k)).join("")}
                    </div>`;
      // 各行的圈号按列对齐：这一节没有的站留空位
      const cols = [];
      kinds.forEach((k) => (st[k] || []).forEach((s) => { if (!cols.includes(s.mark)) cols.push(s.mark); }));
      return `
                    <div class="toc-sub-row">${link("toc-sub-part", part, "", "", label)}</div>
                    ${kinds
                      .map((k) => `<div class="toc-sub-row toc-sub-stations">${secLink(part, k)}${cols
                        .map((m) => {
                          const s = (st[k] || []).find((x) => x.mark === m);
                          return s ? link("toc-sub-st", part, k, s.mark, s.mark, s.name) : `<span class="toc-sub-st"></span>`;
                        })
                        .join("")}</div>`)
                      .join("")}`;
    };
    const book = BookEdits.get(itemId);
    const bookKinds = bookSections(book);
    const bookSt = sectionStations(book, "book");
    const main = [];
    bookKinds.forEach((k) => (bookSt[k] || []).forEach((s) => {
      if (!main.some((m) => m.s.mark === s.mark)) main.push({ k, s });
    }));
    const mainRow = main.length ? `
                    <div class="toc-sub-row toc-sub-main"><span class="toc-sub-label">主线</span>${main
                      .map(({ k, s }) => link("toc-sub-st", "book", k, s.mark, s.name))
                      .join("")}</div>` : "";
    const note = Notes.has(itemId) ? row("note", "笔记", noteSections(Notes.get(itemId)).kinds, Notes.get(itemId)) : "";
    return `<div class="toc-sub" data-sub="${itemId}">${mainRow}${row("book", "教材", bookKinds, book)}${note}
                  </div>`;
  },

  // 右侧目录里标出正在读的那一站（顶部位置条算出来的），这一站下面的五个入口跟着出现
  // 正在读的那张定义、性质小卡片（cell = 「定义|2」这样的 小节|第几张）在展开的站里高亮
  markRailHere(itemId, station, cell) {
    const rail = document.getElementById("chapter-rail");
    if (!rail) return;
    // 意义、例题不挂站：读到它们时展开「题型」那一组
    const st = station || (/^(意义|例题)\|/.test(cell || "") ? "题型" : "");
    const key = itemId && st ? itemId + "|" + st + "|" + (cell || "") : "";
    if (rail.dataset.here === key) return;
    rail.dataset.here = key;
    rail.querySelectorAll(".rl-st.open").forEach((b) => b.classList.remove("open"));
    rail.querySelectorAll(".rl-item.is-here").forEach((a) => a.classList.remove("is-here"));
    const b = key && [...rail.querySelectorAll(".rl-st")].find((x) => x.dataset.station === st);
    if (!b) return;
    b.classList.add("open");
    const [sec, ord] = (cell || "").split("|");
    const a = sec && [...b.querySelectorAll(".rl-item")].find((x) => x.dataset.sec === sec && x.dataset.ord === ord);
    if (a) a.classList.add("is-here");
  },

  // 站牌要用：这张卡教材、笔记各有哪些小节，每节里有哪些站。编辑预览时传正在编辑的原文（texts.book / texts.note）。
  stationMap(itemId, texts) {
    const t = texts || {};
    const book = t.book != null ? t.book : BookEdits.get(itemId);
    const note = t.note != null ? t.note : Notes.has(itemId) ? Notes.get(itemId) : "";
    return {
      book: { kinds: bookSections(book), st: sectionStations(book, "book") },
      note: { kinds: noteSections(note).kinds, st: sectionStations(note, "note") },
    };
  },

  // 教材：交给 bookParts 的 deco，逐个〔〕小节把站名行换成站牌
  stationDeco(itemId, texts) {
    let map = null;
    return (html, kind) => html.replace(STATION_P, (m, name, mark) => {
      map = map || this.stationMap(itemId, texts);
      return stationBarHtml(itemId, "book", kind, mark, name, map);
    });
  },

  // 笔记：小节按最外层标题认，第一个小节之前的不算（与 sectionStations 一致）
  stationizeNote(html, text, itemId, texts) {
    const level = noteSections(text).level;
    let cur = null, map = null;
    return html.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>|<p><strong>(([①-⑳]′?)[ \t]*[^<]*?)<\/strong><\/p>/g, (m, lv, head, name, mark) => {
      if (lv) {
        if (+lv <= level) cur = sectionKind(head.replace(HTML_TAG, ""));
        return m;
      }
      if (!cur) return m;
      map = map || this.stationMap(itemId, Object.assign({}, texts, { note: text }));
      return stationBarHtml(itemId, "note", cur, mark, name, map);
    });
  },

  // 顶部位置条：滚到按站组织的卡里时，在工具条下沿显示「教材〔性质〕⑥ 读出符号」，点了打开右侧本章目录
  updateHere() {
    const pill = document.getElementById("chapter-here");
    if (!pill) return;
    const columns = document.querySelector(".dual-columns");
    let line = pill.parentElement.getBoundingClientRect().bottom + 30;
    if (columns && columns.offsetHeight) {
      const cs = getComputedStyle(columns);
      line = Math.max(line, (parseFloat(cs.top) || 0) + columns.offsetHeight + 18);
    }
    let hit = null;
    let dual = null;
    let hereId = "";
    document.querySelectorAll("#chapter-item-groups .entry").forEach((entry) => {
      if (hit || dual) return;
      const r = entry.getBoundingClientRect();
      if (r.top > line || r.bottom < line) return;
      hereId = entry.id.slice(5);
      if (entry.classList.contains("is-dual")) {
        let row = null;
        for (const el of entry.querySelectorAll(".dual-row")) {
          if (el.getBoundingClientRect().top > line) break;
          row = el;
        }
        const cell = row && row.querySelector(".dual-shared, .dual-cell[data-sec]");
        if (cell) {
          const sec = cell.dataset.bookSec || cell.dataset.sec;
          const station = cell.dataset.station || "";
          const bar = [...entry.querySelectorAll(".station")].find((s) => s.dataset.station === station && s.dataset.sec === sec);
          // 正在读的是定义、性质的哪一张小卡片：从它往上数到站卡（与 railItemTarget 同一规则）
          let ord = -1;
          if (row.classList.contains("kind-entry")) {
            ord = 0;
            for (let r = row.previousElementSibling; r && !r.classList.contains("kind-station") && !r.classList.contains("kind-section"); r = r.previousElementSibling)
              if (r.classList.contains("kind-entry")) ord++;
          }
          dual = { sec, station, ord, name: bar && bar.querySelector(".station-name").innerHTML,
            part: row.querySelector(".dual-book") && row.querySelector(".dual-note") || cell.classList.contains("dual-shared") ? "" : cell.dataset.part === "book" ? "教材" : "笔记" };
        }
        return;
      }
      if (!entry.querySelector(".station")) return;
      const body = entry.querySelector(".mynote-body");
      const heads = body ? [...body.children].filter((h) => /^H[1-6]$/.test(h.tagName)) : [];
      const kinded = heads.filter((h) => sectionKind(h.textContent));
      const top = kinded.length ? Math.min(...kinded.map((h) => +h.tagName.charAt(1))) : 0;
      const marks = [...entry.querySelectorAll("section.card-book .term-label, .station")]
        .concat(heads.filter((h) => +h.tagName.charAt(1) <= top))
        .filter((m) => m.getClientRects().length)
        .sort((a, b) => (a.compareDocumentPosition(b) & 4 ? -1 : 1));
      let cur = null;
      for (const m of marks) {
        if (m.getBoundingClientRect().top > line) break;
        cur = m;
      }
      if (cur) hit = cur;
    });
    const st = hit && hit.classList.contains("station");
    const sec = dual ? dual.sec : hit && (st ? hit.dataset.sec : sectionKind(hit.textContent));
    this.markRailHere(hereId, dual ? dual.station : st ? hit.dataset.station : "", dual ? dual.sec + "|" + dual.ord : "");
    if (!sec) { pill.hidden = true; pill.dataset.key = ""; return; }
    const part = dual ? dual.part : hit.closest("section.card-book") ? "教材" : "笔记";
    const no = dual ? dual.station : st ? hit.querySelector(".station-no").textContent : "";
    const key = part + sec + no;
    if (pill.dataset.key !== key) {
      pill.dataset.key = key;
      pill.innerHTML = (part ? `<span class="here-part">${part}</span>` : "") + `<span class="here-sec ${BOOK_CLASS[sec] || ""}">〔${sec}〕</span>` +
        (no ? `<span class="here-no">${no}</span><span class="here-name">${dual ? dual.name || "" : hit.querySelector(".station-name").innerHTML}</span>` : "");
      pill.title = "打开本章目录";
    }
    pill.hidden = false;
  },

  openRail() {
    const rail = document.getElementById("chapter-rail");
    if (!rail || rail.hidden) return;
    rail.classList.add("open");
    const tab = document.getElementById("rail-tab");
    if (tab) tab.setAttribute("aria-expanded", "true");
    // 打开时把正在读的那一站滚到目录顶上，正在读的那张若还在下面看不见，再往下滚到露出来；只滚目录自己，不动页面
    const body = rail.querySelector(".rail-body");
    const st = rail.querySelector(".rl-st.open"), item = rail.querySelector(".rl-item.is-here");
    if (body && st) {
      body.scrollTop += st.getBoundingClientRect().top - body.getBoundingClientRect().top - 8;
      const over = item ? item.getBoundingClientRect().bottom - body.getBoundingClientRect().bottom + 12 : 0;
      if (over > 0) body.scrollTop += over;
    }
  },

  // 教材或笔记改完后，只重画目录里这张卡的两行（页面顶部和右侧导轨各一份）
  refreshTocSub(itemId) {
    document.querySelectorAll('.toc-sub[data-sub="' + itemId.replace(/"/g, '\\"') + '"]').forEach((old) => {
      const box = document.createElement("div");
      box.innerHTML = this.tocSubHtml(itemId);
      const fresh = box.firstElementChild;
      old.replaceWith(fresh);
      this.bindToc(fresh);
      if (fresh.closest("#chapter-rail")) {
        fresh.querySelectorAll("[data-goto]").forEach((a) => a.addEventListener("click", () => this.closeRail()));
      }
    });
    // 按站的右侧目录：条数可能变了，整个重画
    const rail = document.getElementById("chapter-rail");
    if (rail && rail.classList.contains("is-stations") && this.current && this.current.type === "chapter") {
      this.renderRail(this.current.subjectId, this.current.chapterId);
    }
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
                  ${this.tocSubHtml(it.id)}
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
    // 页面顶部的目录和右侧导轨里都有同一条，一起更新（卡片下面「教材 / 笔记」那两行另外重画）
    this.refreshTocSub(noteId);
    document.querySelectorAll('[data-goto="' + noteId.replace(/"/g, '\\"') + '"]:not([data-part])').forEach((link) => {
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
    const host = node.closest ? node : node.commonAncestorContainer && (node.commonAncestorContainer.nodeType === 1 ? node.commonAncestorContainer : node.commonAncestorContainer.parentElement);
    const entry = host && host.closest(".entry");
    const covers = [...document.querySelectorAll(".mobile-topbar, .toolbar")];
    if (entry) covers.push(...entry.querySelectorAll(".dual-columns"));
    covers.forEach((el) => {
      const cs = getComputedStyle(el);
      if (!el.offsetHeight || cs.display === "none" || cs.position !== "sticky") return;
      covered = Math.max(covered, (parseFloat(cs.top) || 0) + el.offsetHeight);
    });
    const top = node.getBoundingClientRect().top + window.scrollY - covered - 12;
    window.scrollTo({ top: Math.max(0, top) });
  },

  bindToc(scope) {
    scope.querySelectorAll("[data-goto]").forEach((a) => {
      if (a.closest(".station-links")) return; // 站牌由 document 委托，避免重复跳转
      a.addEventListener("click", (e) => {
        e.preventDefault();
        this.gotoLink(a);
      });
    });
  },

  // 按链接上的 data-goto / data-part / data-sec / data-station 跳过去并闪一下（目录和站牌共用）
  gotoLink(a) {
    const node = document.getElementById("item-" + a.dataset.goto);
    if (!node) return;
    const target = (a.dataset.ord != null && this.railItemTarget(node, a.dataset.sec, a.dataset.station, +a.dataset.ord)) ||
      this.tocTarget(node, a.dataset.part, a.dataset.sec, a.dataset.station);
    this.scrollToItem(target || node);
    const cls = target ? "toc-flash" : "flash";
    (target || node).classList.add(cls);
    setTimeout(() => (target || node).classList.remove(cls), 1800);
  },

  // 右侧目录里定义、性质的一个小标题对应的那张小卡片：从这一节这一站的站卡往下，数到第 ord 张（与站卡小标题同一规则）
  // 题型（意义，不挂站）：从〔意义〕这一节的开头往下数，分组行不算
  railItemTarget(node, sec, station, ord) {
    if (sec !== "定义" && sec !== "性质" && sec !== "意义") return null;
    const head = this.tocTarget(node, "book", sec, station);
    if (!head || !(head.classList.contains("kind-station") || (sec === "意义" && head.classList.contains("kind-section")))) return null;
    let k = 0;
    for (let r = head.nextElementSibling; r; r = r.nextElementSibling) {
      if (r.classList.contains("kind-station") || r.classList.contains("kind-section")) break;
      if (r.classList.contains("kind-entry") && k++ === ord) return r;
    }
    return null;
  },

  // 目录里「教材 / 笔记」和其下小节对应的位置；找不到（比如正在编辑）就退回那一块，再不行退回整张卡。
  // 带站（station）时再往下找这一节里的站名行，找不到就停在这一节。
  tocTarget(node, part, sec, station) {
    if (!part) return null;
    const box = node.querySelector(part === "book" ? "section.card-book" : ".mynote-slot");
    if (!box || !sec) return box;
    const track = node.querySelector(".dual-track");
    if (track) {
      const targets = [...track.querySelectorAll(".dual-shared, .dual-cell[data-sec]")].filter((el) =>
        (el.classList.contains("dual-shared") ? el.dataset[part + "Sec"] : el.dataset.part === part && el.dataset.sec) === sec);
      const stationHead = station && targets.find((el) => el.dataset.station === station && el.closest(".kind-station"));
      if (stationHead) return stationHead.closest(".dual-row");
      const head = targets.find((el) => el.closest(".kind-section")) || targets[0];
      if (head) return head.classList.contains("dual-shared") ? head.closest(".dual-row") : head;
      return box;
    }
    // 站名行显示成站牌（.station）；万一没换成站牌，就认只含一个 <strong> 的 <p>。「⑤」不能认成「⑤′」
    const isStation = (p) => {
      if (p.classList.contains("station")) return p.dataset.station === station;
      const t = p.textContent.trim();
      return p.tagName === "P" && p.children.length === 1 && p.firstElementChild.tagName === "STRONG" &&
        t === p.firstElementChild.textContent.trim() && t.startsWith(station) && t.charAt(station.length) !== "′";
    };
    if (part === "book") {
      if (sec === "提示") return box.querySelector(".entry-note") || box;
      const terms = [...box.querySelectorAll(".term-label")]
        .filter((l) => l.textContent.trim().startsWith("〔" + sec + "〕"))
        .map((l) => l.closest(".term") || l);
      if (!terms.length) return box;
      const hit = station && terms.map((t) => [...t.querySelectorAll(".station, p")].find(isStation)).find(Boolean);
      return hit || terms[0];
    }
    const heads = [...box.querySelectorAll(".mynote-body h1, .mynote-body h2, .mynote-body h3, .mynote-body h4, .mynote-body h5, .mynote-body h6")]
      .filter((h) => sectionKind(h.textContent) === sec);
    if (!heads.length) return box;
    const top = Math.min(...heads.map((h) => +h.tagName.charAt(1)));
    const head = heads.find((h) => +h.tagName.charAt(1) === top);
    if (!station) return head;
    for (let el = head.nextElementSibling; el; el = el.nextElementSibling) {
      if (/^H[1-6]$/.test(el.tagName) && +el.tagName.charAt(1) <= top) break;
      if (isStation(el)) return el;
    }
    return head;
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
    const book = bookParts(BookEdits.get(itemId), this.stationDeco(itemId));
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
      '<span class="mynote-fmt-why">「### 〔定义〕名字」开一个小节，按〔〕里的字自动上色 · 「### 〔提示〕」放提示 · ==重点== 文字显示荧光底，公式保持下划线</span>',
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
      const show = (html) => {
        section.innerHTML = html; renderMath(section);
        this.maybeApplyDual(section.closest(".entry"));
        this.refreshDualLayout();
      };
      const fit = (ta) => { ta.style.height = Math.min(ta.scrollHeight + 4, 640) + "px"; };

      section.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-book-action]");
        if (!btn) return;
        const action = btn.dataset.bookAction;

        if (action === "edit") {
          this.ensureEntryOriginal(section.closest(".entry"));
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
            const b = bookParts(ta.value, this.stationDeco(id, { book: ta.value }));
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
          this.refreshTocSub(id);
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
          this.refreshTocSub(id);
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
  // 显示卡片笔记时（带 noteId）把站名行换成站牌；章节笔记、体检不换
  noteBodyHtml(text, noteId) {
    const html = noteMdHtml(text);
    return noteId && KaoyanData.find(noteId) ? this.stationizeNote(html, text, noteId) : html;
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
      const show = (html) => {
        slot.innerHTML = html; renderMath(slot);
        this.maybeApplyDual(slot.closest(".entry"));
        this.refreshDualLayout();
      };

      slot.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.dataset.action;

        if (action === "edit") {
          this.ensureEntryOriginal(slot.closest(".entry"));
          show(this.editorHtml(id));
          const ta = slot.querySelector(".mynote-input");
          ta.value = Notes.get(id);
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
      '<span class="mynote-fmt-why">「### 〔定义〕名字」小标题按〔〕里的字自动上色 · ==重点== 文字显示荧光底，公式保持下划线</span>',
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
