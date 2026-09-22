const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

let options;
const context = vm.createContext({
  document: { compatMode: 'CSS1Compat' },
  renderMathInElement(container, opts) { options = opts; },
});
vm.runInContext(fs.readFileSync('assets/vendor/katex/katex.min.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('assets/js/katex-init.js', 'utf8'), context);
vm.runInContext('renderMath({})', context);
context.options = options;
context.formula = String.raw`\begin{vmatrix}0 & a_1 \\ a_2 & \iddots\end{vmatrix}`;
const html = vm.runInContext('katex.renderToString(formula, { ...options, displayMode: true, throwOnError: true })', context);
assert(html.includes('class="katex"'));
assert(!html.includes('katex-error'));
assert(options.macros['\\iddots'].includes('raisebox'));
console.log('PASS: reverse diagonal dots render through the production math options.');
