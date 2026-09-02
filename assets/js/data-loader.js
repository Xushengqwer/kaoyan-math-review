// 收集各学科数据文件（calculus.js / linalg.js / probability.js）通过 registerSubject() 注册的内容。
window.__KAOYAN_SUBJECTS__ = [];

function registerSubject(data) {
  window.__KAOYAN_SUBJECTS__.push(data);
}

const KaoyanData = {
  subjects() {
    return window.__KAOYAN_SUBJECTS__;
  },
  subject(id) {
    return window.__KAOYAN_SUBJECTS__.find((s) => s.id === id);
  },
  chapters(subjectId) {
    const s = this.subject(subjectId);
    if (!s) return [];
    return [...s.chapters].sort((a, b) => a.order - b.order);
  },
  chapter(subjectId, chapterId) {
    const s = this.subject(subjectId);
    if (!s) return null;
    return s.chapters.find((c) => c.id === chapterId) || null;
  },
  items(subjectId) {
    const s = this.subject(subjectId);
    return s ? s.items : [];
  },
  allItems() {
    return this.subjects().flatMap((s) =>
      s.items.map((it) => ({ ...it, subjectId: s.id }))
    );
  },
  itemsByChapter(subjectId, chapterId) {
    return this.items(subjectId).filter((it) => it.chapterId === chapterId);
  },
  find(itemId) {
    for (const s of this.subjects()) {
      const it = s.items.find((i) => i.id === itemId);
      if (it) return { ...it, subjectId: s.id };
    }
    return null;
  },
};
