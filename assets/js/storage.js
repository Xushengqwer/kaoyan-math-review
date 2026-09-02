// 只记一件事："上次学习到哪一章"，保存在浏览器 localStorage，不上传任何服务器。
const LAST_VISIT_KEY = "kaoyan_last_visit_v1";

const Progress = {
  rememberVisit(subjectId, chapterId) {
    try {
      localStorage.setItem(LAST_VISIT_KEY, JSON.stringify({ subjectId, chapterId }));
    } catch (e) {
      /* ignore */
    }
  },

  lastVisit() {
    try {
      const raw = localStorage.getItem(LAST_VISIT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
};
