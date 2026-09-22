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
    },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
