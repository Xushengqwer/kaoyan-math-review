const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { build, write, syncShared } = require('../tools/mirror.cjs');
const { PINNED } = require('../tools/lib.cjs');

// 只读镜像（tools/mirror.cjs，2026-10-17）：每章一个文件、规矩文档齐全；重新生成不动 待提交/；不是镜像的目录不碰
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kaoyan-mirror-'));
try {
  const { files, hash } = build(dir, 'work');
  write(dir, files, hash);
  const chapters = files.filter(([rel]) => /^章节[\\/].+[\\/]第\d\d章-/.test(rel));
  assert.equal(chapters.length, 9 + 4 + 8, '三科每章一个文件');
  // 具体内容对着钉住的那一版（tools/lib.cjs 的 PINNED）查，以后上线不用改这里
  const ch4 = build(dir, PINNED).files.find(([rel]) => rel === path.join('章节', '高等数学', '第04章-向量代数与空间解析几何.md'))[1];
  assert.match(ch4, /<!-- card:f6rk -->/, '卡片记号保留');
  assert.match(ch4, /#### 例题 1：向量的度量/, '笔记里的例题在');
  for (const name of ['学习方法', '网站排版规则', '内容组织原则', '进度'])
    assert(fs.existsSync(path.join(dir, '规矩', name + '.md')), '规矩：' + name);
  const rules = fs.readFileSync(path.join(dir, 'GEMINI.md'), 'utf8');
  assert(!rules.includes('{生成说明}') && rules.includes('生成自仓库'), 'GEMINI.md 填上了生成说明');
  assert(rules.includes('## 踩过的坑') && rules.includes('## 交稿格式'), 'GEMINI.md 是写稿守则');
  assert(!fs.existsSync(path.join(dir, 'README.md')), '不再生成 README.md');
  assert(!files.some(([, t]) => t.includes('\r')), '一律 LF');

  fs.writeFileSync(path.join(dir, '待提交', '方向2.md'), '交稿');
  fs.writeFileSync(path.join(dir, '审稿意见', '方向2.md'), '意见');
  fs.writeFileSync(path.join(dir, '章节', '多余.md'), '旧的');
  fs.writeFileSync(path.join(dir, 'README.md'), '旧版的说明');
  write(dir, files, hash);
  assert.equal(fs.readFileSync(path.join(dir, '待提交', '方向2.md'), 'utf8'), '交稿', '重新生成不动待提交');
  assert.equal(fs.readFileSync(path.join(dir, '审稿意见', '方向2.md'), 'utf8'), '意见', '重新生成不动审稿意见');
  assert(!fs.existsSync(path.join(dir, '章节', '多余.md')), '章节/ 整个重写');
  assert(!fs.existsSync(path.join(dir, 'README.md')), '旧版的 README.md 删掉');

  // 共同维护：镜像里没有就从仓库抄；镜像里改了就抄回仓库（保持仓库原来的换行符）；重新生成不删
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'fake-repo-'));
  fs.mkdirSync(path.join(repo, 'docs'));
  fs.writeFileSync(path.join(repo, 'docs', 'reviewer-taste.md'), '# 设计口味\r\n\r\n1. 甲\r\n');
  fs.writeFileSync(path.join(repo, 'docs', 'gemini-kickoff.md'), '# 开场白\n');
  assert.deepEqual(syncShared(dir, repo), ['新建 共同维护/设计口味.md', '新建 共同维护/写作格式要求.md']);
  assert.equal(fs.readFileSync(path.join(dir, '共同维护', '设计口味.md'), 'utf8'), '# 设计口味\n\n1. 甲\n', '镜像里一律 LF');
  assert.deepEqual(syncShared(dir, repo), [], '没改就不动');
  fs.writeFileSync(path.join(dir, '共同维护', '设计口味.md'), '# 设计口味\n\n1. 甲\n2. 乙（和 Antigravity 磨合出来的）\n');
  assert.deepEqual(syncShared(dir, repo), ['共同维护/设计口味.md 有改动，已抄回 docs/reviewer-taste.md（要提交）']);
  assert.equal(fs.readFileSync(path.join(repo, 'docs', 'reviewer-taste.md'), 'utf8'), '# 设计口味\r\n\r\n1. 甲\r\n2. 乙（和 Antigravity 磨合出来的）\r\n', '抄回仓库保持 CRLF');
  write(dir, files, hash);
  assert(fs.readFileSync(path.join(dir, '共同维护', '设计口味.md'), 'utf8').includes('2. 乙'), '重新生成不动共同维护');
  fs.rmSync(repo, { recursive: true, force: true });

  const other = fs.mkdtempSync(path.join(os.tmpdir(), 'not-mirror-'));
  fs.writeFileSync(path.join(other, '别人的.md'), 'x');
  assert.throws(() => write(other, files, hash), /不是镜像/);
  assert(fs.existsSync(path.join(other, '别人的.md')));
  fs.rmSync(other, { recursive: true, force: true });
} finally {
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log('mirror ok');
