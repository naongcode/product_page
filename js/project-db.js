/**
 * project-db.js — Supabase 기반 프로젝트 저장소
 * API 프록시: /api/supabase?action=...
 */

async function _call(action, params = {}, body = null) {
  const url = new URL('/api/supabase', location.origin);
  url.searchParams.set('action', action);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const options = {
    method: body ? 'POST' : 'GET',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(url.toString(), options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API 오류 (${res.status})`);
  }
  return res.json();
}

window.ProjectDB = {
  save(project) {
    return _call('save', {}, project);
  },

  get(id) {
    return _call('get', { id });
  },

  getAll() {
    return _call('getAll');
  },

  delete(id) {
    return _call('delete', { id });
  },

  newId() {
    return 'proj_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  },
};
