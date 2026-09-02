// 本地状态：上次学习到哪一章 + 自己写的大白话笔记，都存在浏览器 localStorage。
const LAST_VISIT_KEY = "kaoyan_last_visit_v1";
const NOTES_KEY = "kaoyan_notes_v1";

// 仓库里 assets/data/notes.js 提供的"内置笔记"（所有设备共享）
window.__KAOYAN_SEED_NOTES__ = {};
function registerNotes(map) {
  Object.assign(window.__KAOYAN_SEED_NOTES__, map || {});
}

const Notes = {
  _cache: null,

  _local() {
    if (this._cache) return this._cache;
    try {
      const raw = localStorage.getItem(NOTES_KEY);
      this._cache = raw ? JSON.parse(raw) : {};
    } catch (e) {
      this._cache = {};
    }
    return this._cache;
  },

  _save() {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(this._cache));
      return true;
    } catch (e) {
      return false;
    }
  },

  // 本地写的优先于仓库内置的
  get(itemId) {
    const local = this._local();
    if (Object.prototype.hasOwnProperty.call(local, itemId)) return local[itemId];
    return window.__KAOYAN_SEED_NOTES__[itemId] || "";
  },

  has(itemId) {
    return !!this.get(itemId).trim();
  },

  // 这条笔记是不是仓库自带的（本地没改过）
  isSeed(itemId) {
    return (
      !Object.prototype.hasOwnProperty.call(this._local(), itemId) &&
      !!window.__KAOYAN_SEED_NOTES__[itemId]
    );
  },

  set(itemId, text) {
    const local = this._local();
    const t = (text || "").trim();
    if (!t) delete local[itemId];
    else local[itemId] = t;
    return this._save();
  },

  count() {
    const merged = { ...window.__KAOYAN_SEED_NOTES__, ...this._local() };
    return Object.keys(merged).filter((k) => (merged[k] || "").trim()).length;
  },

  // 导出：合并内置 + 本地，方便直接粘回 notes.js 或备份
  exportAll() {
    const merged = { ...window.__KAOYAN_SEED_NOTES__, ...this._local() };
    Object.keys(merged).forEach((k) => {
      if (!(merged[k] || "").trim()) delete merged[k];
    });
    return merged;
  },

  // 导入：合并进本地（同 id 以导入的为准）
  importAll(obj) {
    if (!obj || typeof obj !== "object") return 0;
    const local = this._local();
    let n = 0;
    Object.keys(obj).forEach((k) => {
      const v = obj[k];
      if (typeof v === "string" && v.trim()) {
        local[k] = v.trim();
        n++;
      }
    });
    this._save();
    return n;
  },
};

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
