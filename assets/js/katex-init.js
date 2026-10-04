// 在给定容器内渲染 KaTeX 公式（本地资源，不走任何外部 CDN）。
function renderMath(container) {
  if (!container || typeof renderMathInElement !== "function") return;
  renderMathInElement(container, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
    // 反向斜省略号：仅补充显示宏，教材和笔记中的 LaTeX 原文保持不变。
    macros: {
      "\\iddots": "\\mathinner{\\mkern1mu\\raisebox{0.1em}{.}\\mkern2mu\\raisebox{0.4em}{.}\\mkern2mu\\raisebox{0.7em}{.}\\mkern1mu}",
      // 新笔记沿用 LaTeX 的 \centernot\implies；显示时交给 KaTeX 的 \not，原文不动。
      "\\centernot": "\\not",
    },
  });
  formatBookSentences(container);
}

// 中文断句只用于教材显示；公式由 KaTeX 先渲染成完整节点，原文和双轨分段模型不动。
function bookSentenceBreaks(text) {
  const ends = [];
  const punctuation = /[。；！？]+[”’」』）》】〕）"')\]]*/gu;
  for (const match of text.matchAll(punctuation)) {
    const end = match.index + match[0].length;
    // U+0000 是已有换行/块边界；Markdown 文本里的软换行仍需要主动断行。
    if (!/^[ \t\r\n]*(?:\u0000|$)/.test(text.slice(end))) ends.push(end);
  }
  return ends;
}

function formatBookSentences(container) {
  if (!container || typeof container.querySelectorAll !== "function") return;
  const selector = ".entry-statement p, .entry-statement li, .entry-note .note-body p, .entry-note .note-body li";
  const blocks = [...container.querySelectorAll(selector)];
  if (container.matches && container.matches(selector)) blocks.unshift(container);
  // 重绘或再次渲染公式时先撤掉展示换行，避免叠加；不移除原本的 br。
  container.querySelectorAll("br.book-sentence-break").forEach((br) => br.remove());
  for (const block of blocks) {
    if (block.closest(".mynote-body, table, pre, code, .katex, .katex-error")) continue;
    const nodes = [];
    let text = "";
    const collect = (node) => {
      if (node.nodeType === 3) {
        nodes.push({ node, start: text.length, length: node.data.length });
        text += node.data;
        return;
      }
      if (node.nodeType !== 1) return;
      if (node !== block && node.matches("br, p, li, ul, ol, .katex-display")) {
        text += "\u0000";
        return;
      }
      if (node.matches(".katex, .katex-error, code, pre, table, button, svg, textarea, input")) {
        // 行内公式/代码也算后续内容，但不读取或拆分它的内部文字。
        text += "\uFFFC";
        return;
      }
      [...node.childNodes].forEach(collect);
    };
    collect(block);
    const ends = bookSentenceBreaks(text);
    for (const { node, start, length } of nodes) {
      const offsets = ends.filter((end) => end > start && end <= start + length).map((end) => end - start);
      for (const offset of offsets.reverse()) {
        const br = block.ownerDocument.createElement("br");
        br.className = "book-sentence-break";
        if (offset === node.data.length) node.after(br);
        else node.splitText(offset).before(br);
      }
    }
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
