const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { build, write } = require('../tools/mirror.cjs');

// 只读镜像（tools/mirror.cjs，2026-10-17）：每章一个文件、规矩文档齐全；重新生成不动 待提交/；不是镜像的目录不碰
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kaoyan-mirror-'));
try {
  const { files, hash } = build(dir, 'work');
  write(dir, files, hash);
  const chapters = files.filter(([rel]) => /^章节[\\/].+[\\/]第\d\d章-/.test(rel));
  assert.equal(chapters.length, 9 + 4 + 8, '三科每章一个文件');
  const ch4 = fs.readFileSync(path.join(dir, '章节', '高等数学', '第04章-向量代数与空间解析几何.md'), 'utf8');
  assert.match(ch4, /<!-- card:f6rk -->/, '卡片记号保留');
  assert.match(ch4, /#### 例题 1：向量的度量/, '笔记里的例题在');
  for (const name of ['学习方法', '设计口味', '网站排版规则', '内容组织原则', '写作格式要求', '进度'])
    assert(fs.existsSync(path.join(dir, '规矩', name + '.md')), '规矩：' + name);
  const readme = fs.readFileSync(path.join(dir, 'README.md'), 'utf8');
  assert(!readme.includes('{生成说明}') && readme.includes('生成自仓库'), 'README 填上了生成说明');
  assert(!files.some(([, t]) => t.includes('\r')), '一律 LF');

  fs.writeFileSync(path.join(dir, '待提交', '方向2.md'), '交稿');
  fs.writeFileSync(path.join(dir, '章节', '多余.md'), '旧的');
  write(dir, files, hash);
  assert.equal(fs.readFileSync(path.join(dir, '待提交', '方向2.md'), 'utf8'), '交稿', '重新生成不动待提交');
  assert(!fs.existsSync(path.join(dir, '章节', '多余.md')), '章节/ 整个重写');

  const other = fs.mkdtempSync(path.join(os.tmpdir(), 'not-mirror-'));
  fs.writeFileSync(path.join(other, '别人的.md'), 'x');
  assert.throws(() => write(other, files, hash), /不是镜像/);
  assert(fs.existsSync(path.join(other, '别人的.md')));
  fs.rmSync(other, { recursive: true, force: true });
} finally {
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log('mirror ok');
