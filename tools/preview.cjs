// 草稿预览页：用网站自己的渲染函数渲染 Markdown，公式预先排好、KaTeX 字体内嵌，
// 生成一个单独的 .html，不需要联网、不需要脚本，直接双击打开或发给用户看。
//
// 用法：
//   node tools/preview.cjs <输出.html> "<页面标题>" note|book <草稿.md> "<小标题>" [note|book <草稿.md> "<小标题>" ...]
//   例：node tools/preview.cjs drafts/preview.html "第4章决策流草稿" note drafts/flow-v2.md "新草稿" note drafts/flow-v1.md "对照：旧版"
const fs = require("fs");
const { main, must, abs, read, readDraft, loadSite, loadKatex } = require("./lib.cjs");

main(() => {
  const [out, title, ...rest] = process.argv.slice(2);
  must(out && title && rest.length && rest.length % 3 === 0, "用法：node tools/preview.cjs <输出.html> \"<标题>\" note|book <草稿.md> \"<小标题>\" ...");
  const site = loadSite();
  const { katex, macros } = loadKatex();
  const V = "assets/vendor/katex/";
  const kcss = read(V + "katex.min.css").replace(/src:url\(fonts\/([^)]+?)\.woff2\)[^;}]*/g, (m, name) =>
    "src:url(data:font/woff2;base64," + fs.readFileSync(abs(V + "fonts/" + name + ".woff2")).toString("base64") + ") format(\"woff2\")");
  const unesc = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
  let ok = 0, bad = 0, sections = "", toc = "";
  for (let i = 0; i < rest.length; i += 3) {
    const [kind, file, name] = rest.slice(i, i + 3);
    must(kind === "note" || kind === "book", "每组的第一个参数是 note 或 book：" + kind);
    const { text } = readDraft(file);
    let html;
    if (kind === "book") { const b = site.bookParts(text); html = b.main + (b.tip ? '<div class="entry-note">' + b.tip + "</div>" : ""); }
    else html = site.noteMdHtml(text);
    html = html.replace(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g, (m, d, s) => {
      try {
        const r = katex.renderToString(unesc(d || s), { displayMode: !!d, throwOnError: true, strict: false, output: "html", macros: { ...macros } });
        ok++; return r;
      } catch (e) { bad++; return m; }
    });
    const n = i / 3 + 1;
    toc += `<li><a href="#c${n}">${name}</a></li>`;
    sections += `<h2 id="c${n}" class="pv-card">${name}</h2>\n` + (kind === "note"
      ? `<section class="card"><div class="mynote"><div class="mynote-body md">${html}</div></div></section>`
      : `<section class="card"><div class="card-book"><div class="entry-statement">${html}</div></div></section>`);
  }
  const page = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>${kcss}</style>
<style>${read("assets/css/style.css")}
body{padding:16px} .preview{max-width:760px;margin:0 auto}
.preview h1{font-size:20px;margin:0 0 8px} .pv-toc{margin:0 0 20px;padding-left:20px}
.pv-card{font-size:18px;margin:32px 0 10px;padding-top:12px;border-top:2px solid currentColor}</style></head>
<body><main class="preview"><h1>${title}</h1><ol class="pv-toc">${toc}</ol>
${sections}</main></body></html>`;
  fs.writeFileSync(out, page, "utf8");
  console.log((bad ? "✗" : "✓") + " 预览：" + out + "（公式 " + ok + " 个，失败 " + bad + "，" + Math.round(page.length / 1024) + " KB）");
  if (bad) process.exit(1);
});
