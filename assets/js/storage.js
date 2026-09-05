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

  // 比较「本地版和仓库版是不是同一份内容」时用的归一化。
  // 笔记进仓库时唯一做过的改动就是给公式补上 $ 定界符（正文逐字未动），
  // 所以比较时忽略 $，否则已经提交过的笔记会被误报成「还没进仓库」。
  _norm(s) {
    return String(s || "").replace(/\r\n/g, "\n").split("$").join("").trim();
  },

  // 本地写的优先于仓库内置的；两边其实是同一份内容时用仓库版（公式能正常渲染）
  get(itemId) {
    const local = this._local();
    const seed = window.__KAOYAN_SEED_NOTES__[itemId] || "";
    if (!Object.prototype.hasOwnProperty.call(local, itemId)) return seed;
    const mine = local[itemId] || "";
    if (seed && this._norm(mine) === this._norm(seed)) return seed;
    return mine;
  },

  has(itemId) {
    return !!this.get(itemId).trim();
  },

  // 「还没进仓库」：只存在这台设备的浏览器里，或者本地改过、和仓库版本不一样。
  // 清缓存 / 换设备 / iOS Safari 七天不访问 都可能让这类笔记消失，所以要显式标出来。
  isPending(itemId) {
    const local = this._local();
    if (!Object.prototype.hasOwnProperty.call(local, itemId)) return false;
    const mine = (local[itemId] || "").trim();
    if (!mine) return false;
    return this._norm(mine) !== this._norm(window.__KAOYAN_SEED_NOTES__[itemId]);
  },

  pendingIds() {
    return Object.keys(this._local()).filter((k) => this.isPending(k));
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
