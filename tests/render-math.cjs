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
context.formula = String.raw`r(A)=r(B) \centernot\implies A\cong B`;
const implication = vm.runInContext('katex.renderToString(formula, { ...options, throwOnError: true })', context);
assert(implication.includes('class="katex"'));
assert(!implication.includes('katex-error'));
console.log('PASS: reverse diagonal dots and non-implication render through production math options.');
