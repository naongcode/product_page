export const config = {
  api: { bodyParser: { sizeLimit: '50mb' } },
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function headers() {
  return {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
  };
}

export default async function handler(req, res) {
  const { action } = req.query;

  try {
    switch (action) {
      case 'getAll': {
        // 갤러리용 — data 제외한 메타데이터만 조회
        const r = await fetch(
          `${SUPABASE_URL}/rest/v1/projects?select=id,name,thumbnail,saved_at&order=saved_at.desc`,
          { headers: headers() }
        );
        const rows = await r.json();
        // saved_at → savedAt 변환
        const result = rows.map(row => ({ ...row, savedAt: row.saved_at }));
        return res.status(r.status).json(result);
      }

      case 'get': {
        const { id } = req.query;
        const r = await fetch(
          `${SUPABASE_URL}/rest/v1/projects?id=eq.${id}&select=*`,
          { headers: headers() }
        );
        const rows = await r.json();
        if (!rows[0]) return res.status(404).json(null);
        // data 컬럼의 내용을 꺼내 반환 (editor.js가 기대하는 구조)
        const { data, saved_at, ...meta } = rows[0];
        return res.status(200).json({ ...data, ...meta, savedAt: saved_at });
      }

      case 'save': {
        const project = req.body;
        const { id, name, thumbnail, savedAt, ...rest } = project;
        const row = {
          id,
          name,
          thumbnail: thumbnail || null,
          saved_at: savedAt,
          data: rest,
        };
        const r = await fetch(
          `${SUPABASE_URL}/rest/v1/projects`,
          {
            method: 'POST',
            headers: { ...headers(), 'Prefer': 'resolution=merge-duplicates' },
            body: JSON.stringify(row),
          }
        );
        if (!r.ok) {
          const err = await r.json().catch(() => ({}));
          return res.status(400).json({ error: err.message || 'Save failed' });
        }
        return res.status(200).json({ ok: true });
      }

      case 'delete': {
        const { id } = req.query;
        const r = await fetch(
          `${SUPABASE_URL}/rest/v1/projects?id=eq.${id}`,
          { method: 'DELETE', headers: headers() }
        );
        if (!r.ok) {
          const err = await r.json().catch(() => ({}));
          return res.status(400).json({ error: err.message || 'Delete failed' });
        }
        return res.status(200).json({ ok: true });
      }

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
