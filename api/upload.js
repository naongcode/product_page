export const config = {
  api: { bodyParser: { sizeLimit: '20mb' } },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { dataUrl, filename, projectId } = req.body;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase 환경변수 미설정' });
  }

  try {
    const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) return res.status(400).json({ error: '잘못된 이미지 형식' });

    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg';
    const folder = projectId || 'shared';
    const path = `${folder}/${filename || Date.now()}.${ext}`;

    const r = await fetch(
      `${SUPABASE_URL}/storage/v1/object/images/${path}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': mimeType,
          'x-upsert': 'true',
        },
        body: buffer,
      }
    );

    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/images/${path}`;
    return res.status(200).json({ url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
