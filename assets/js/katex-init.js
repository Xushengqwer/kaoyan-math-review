// 在给定容器内渲染 KaTeX 公式（本地资源，不走任何外部 CDN）。
function renderMath(container) {
  if (!container || typeof renderMathInElement !== "function") return;
  renderMathInElement(container, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
