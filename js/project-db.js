/**
 * project-db.js — 멀티 프로젝트 IndexedDB 저장소
 */

const DB_NAME = 'ProductPageEditor';
const DB_VERSION = 2;
const PROJECTS_STORE = 'projects';

let _db = null;

function openProjectDB() {
  return new Promise((resolve, reject) => {
    if (_db) { resolve(_db); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      // 구버전 단일 프로젝트 스토어 제거
      if (db.objectStoreNames.contains('project')) {
        db.deleteObjectStore('project');
      }
      if (!db.objectStoreNames.contains(PROJECTS_STORE)) {
        const store = db.createObjectStore(PROJECTS_STORE, { keyPath: 'id' });
        store.createIndex('savedAt', 'savedAt');
      }
    };
    req.onsuccess = (e) => { _db = e.target.result; resolve(_db); };
    req.onerror = (e) => { console.error('DB 오픈 실패:', req.error); reject(req.error); };
    req.onblocked = () => { console.warn('DB 업그레이드 차단됨 — 다른 탭을 닫아주세요'); };
  });
}

window.ProjectDB = {
  save(project) {
    return openProjectDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(PROJECTS_STORE, 'readwrite');
      tx.objectStore(PROJECTS_STORE).put(project);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    }));
  },

  get(id) {
    return openProjectDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(PROJECTS_STORE, 'readonly');
      const req = tx.objectStore(PROJECTS_STORE).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    }));
  },

  getAll() {
    return openProjectDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(PROJECTS_STORE, 'readonly');
      const req = tx.objectStore(PROJECTS_STORE).getAll();
      req.onsuccess = () => resolve((req.result || []).sort((a, b) => b.savedAt - a.savedAt));
      req.onerror = () => reject(req.error);
    }));
  },

  delete(id) {
    return openProjectDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(PROJECTS_STORE, 'readwrite');
      tx.objectStore(PROJECTS_STORE).delete(id);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    }));
  },

  newId() {
    return 'proj_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  },
};
