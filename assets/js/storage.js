// 本地状态：上次学习到哪一章 + 自己写的笔记，都存在浏览器 localStorage。
const LAST_VISIT_KEY = "kaoyan_last_visit_v1";
const NOTES_KEY = "kaoyan_notes_v1";

// 仓库里 assets/data/notes.js 提供的"内置笔记"（所有设备共享）
window.__KAOYAN_SEED_NOTES__ = {};
function registerNotes(map) {
  Object.assign(window.__KAOYAN_SEED_NOTES__, map || {});
}

// 进过仓库、后来仓库里又改过的旧版本的指纹（assets/data/superseded.js 登记）。
// 本机存的副本如果正好是其中一版，说明它早就在 Git 历史里了：打开网页时清掉，
// 免得旧副本盖住仓库里的新版、还误报「本地已改」。自己改过、没交的内容指纹对不上，不会被动。
window.__KAOYAN_SUPERSEDED__ = { notes: {}, book: {} };
function registerSuperseded(map) {
  ["notes", "book"].forEach((kind) => {
    const all = window.__KAOYAN_SUPERSEDED__[kind];
    Object.keys((map && map[kind]) || {}).forEach((id) => {
      all[id] = (all[id] || []).concat(map[kind][id]);
    });
  });
}

// 53 位文本指纹（cyrb53），只用来认「是不是同一版」
function textFingerprint(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

function isSuperseded(kind, id, text) {
  const list = window.__KAOYAN_SUPERSEDED__[kind][id];
  return !!list && list.indexOf(textFingerprint(text)) >= 0;
}

const Notes = {
  _cache: null,

  // 笔记的版本号：自己改一次笔记就 +1。搜索索引靠它判断要不要重建。
  stamp: 0,

  _local() {
    if (this._cache) return this._cache;
    try {
      const raw = localStorage.getItem(NOTES_KEY);
      this._cache = raw ? JSON.parse(raw) : {};
    } catch (e) {
      this._cache = {};
    }
    // 和仓库版是同一份（多半是交给我提交过了），或者是仓库历史上的某一版：清掉本机副本。
    // 「同一份」沿用 _norm 的口径，和 get / isPending 的判断一致。
    const stale = Object.keys(this._cache).filter((k) => {
      const mine = this._norm(this._cache[k]);
      const seed = window.__KAOYAN_SEED_NOTES__[k];
      return (!!seed && mine === this._norm(seed)) || isSuperseded("notes", k, mine);
    });
    if (stale.length) {
      stale.forEach((k) => delete this._cache[k]);
      this._save();
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

  // 原样保存：不做 trim、不做任何归一化。
  // 只有「整段都是空白」才当成删除，其余一个字节都不动，
  // 保证上传的 .md 与存进来的内容逐字节相同。
  set(itemId, text) {
    const local = this._local();
    const raw = text == null ? "" : String(text);
    if (!raw.trim()) delete local[itemId];
    else local[itemId] = raw;
    this.stamp++;
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
    this.stamp++;
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

// 教材内容的本地修改（Markdown 原文）。
// 仓库里的那一版在各学科数据文件的 md 字段里；这里只存「在网页上改过、还没进仓库」的卡。
// 和笔记一样原样保存：不 trim、不归一化，导出时逐字节带出去。
const BOOK_KEY = "kaoyan_book_v1";

const BookEdits = {
  _cache: null,
  stamp: 0, // 改一次 +1，搜索索引靠它判断要不要重建

  _local() {
    if (this._cache) return this._cache;
    try {
      const raw = localStorage.getItem(BOOK_KEY);
      this._cache = raw ? JSON.parse(raw) : {};
    } catch (e) {
      this._cache = {};
    }
    // 已经和仓库版逐字相同的（多半是交给我提交过了），或者是仓库历史上的某一版，清掉，免得被旧副本盖住
    const stale = Object.keys(this._cache).filter((k) =>
      this._cache[k] === this.seed(k) || isSuperseded("book", k, this._cache[k]));
    if (stale.length) {
      stale.forEach((k) => delete this._cache[k]);
      this._save();
    }
    return this._cache;
  },

  _save() {
    try {
      localStorage.setItem(BOOK_KEY, JSON.stringify(this._cache));
      return true;
    } catch (e) {
      return false;
    }
  },

  // 仓库版
  seed(itemId) {
    const it = KaoyanData.find(itemId);
    return it && it.md != null ? it.md : "";
  },

  get(itemId) {
    const local = this._local();
    return Object.prototype.hasOwnProperty.call(local, itemId) ? local[itemId] : this.seed(itemId);
  },

  isPending(itemId) {
    const local = this._local();
    return Object.prototype.hasOwnProperty.call(local, itemId) && local[itemId] !== this.seed(itemId);
  },

  pendingIds() {
    return Object.keys(this._local()).filter((k) => this.isPending(k));
  },

  // 改回和仓库版一字不差时，不留本地副本
  set(itemId, text) {
    const local = this._local();
    const raw = text == null ? "" : String(text);
    if (raw === this.seed(itemId)) delete local[itemId];
    else local[itemId] = raw;
    this.stamp++;
    return this._save();
  },

  reset(itemId) {
    delete this._local()[itemId];
    this.stamp++;
    return this._save();
  },
};
