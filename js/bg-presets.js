/**
 * bg-presets.js — 블록 배경 디자인 프리셋
 * canvas로 패턴 타일을 직접 그려 fabric.Pattern으로 적용
 */

window.BgDesigns = [
  // ── 수채화 번짐 (blob) ───────────────────────────────────────────────────
  {
    id: 'blob-pink', label: '수채 핑크', pat: 'blob', bg: '#fff5f7', ts: 160,
    blobs: [
      { cx: 0.25, cy: 0.30, r: 0.42, c: 'rgba(255,140,170,0.20)' },
      { cx: 0.72, cy: 0.55, r: 0.38, c: 'rgba(255,100,140,0.14)' },
      { cx: 0.10, cy: 0.80, r: 0.30, c: 'rgba(255,180,200,0.16)' },
      { cx: 0.85, cy: 0.15, r: 0.28, c: 'rgba(255,160,190,0.12)' },
    ],
  },
  {
    id: 'blob-mint', label: '수채 민트', pat: 'blob', bg: '#f0faf7', ts: 160,
    blobs: [
      { cx: 0.30, cy: 0.25, r: 0.40, c: 'rgba(50,190,150,0.18)' },
      { cx: 0.75, cy: 0.60, r: 0.38, c: 'rgba(30,170,130,0.13)' },
      { cx: 0.15, cy: 0.75, r: 0.32, c: 'rgba(80,210,170,0.15)' },
      { cx: 0.80, cy: 0.15, r: 0.26, c: 'rgba(40,180,140,0.11)' },
    ],
  },
  {
    id: 'blob-lavender', label: '수채 라벤더', pat: 'blob', bg: '#f6f3ff', ts: 160,
    blobs: [
      { cx: 0.28, cy: 0.32, r: 0.42, c: 'rgba(130,90,220,0.16)' },
      { cx: 0.70, cy: 0.58, r: 0.36, c: 'rgba(100,70,200,0.12)' },
      { cx: 0.12, cy: 0.78, r: 0.30, c: 'rgba(160,120,240,0.14)' },
      { cx: 0.82, cy: 0.18, r: 0.28, c: 'rgba(140,100,230,0.10)' },
    ],
  },
  {
    id: 'blob-peach', label: '수채 피치', pat: 'blob', bg: '#fff8f3', ts: 160,
    blobs: [
      { cx: 0.22, cy: 0.28, r: 0.44, c: 'rgba(255,160,100,0.18)' },
      { cx: 0.68, cy: 0.62, r: 0.38, c: 'rgba(240,130,80,0.14)' },
      { cx: 0.10, cy: 0.82, r: 0.30, c: 'rgba(255,180,120,0.16)' },
      { cx: 0.80, cy: 0.12, r: 0.26, c: 'rgba(250,150,90,0.11)' },
    ],
  },
  {
    id: 'blob-sky', label: '수채 스카이', pat: 'blob', bg: '#f0f7ff', ts: 160,
    blobs: [
      { cx: 0.30, cy: 0.28, r: 0.42, c: 'rgba(60,140,255,0.16)' },
      { cx: 0.72, cy: 0.60, r: 0.38, c: 'rgba(40,120,240,0.12)' },
      { cx: 0.12, cy: 0.80, r: 0.30, c: 'rgba(80,160,255,0.14)' },
      { cx: 0.82, cy: 0.16, r: 0.26, c: 'rgba(50,130,250,0.10)' },
    ],
  },
  // ── 쉐브론 (chevron) ────────────────────────────────────────────────────
  {
    id: 'chevron-white', label: '쉐브론', pat: 'chevron',
    bg: '#ffffff', pc: 'rgba(0,0,0,0.08)', ts: 32, lw: 1.8,
  },
  {
    id: 'chevron-cream', label: '쉐브론 크림', pat: 'chevron',
    bg: '#fdf8f0', pc: 'rgba(0,0,0,0.07)', ts: 32, lw: 1.8,
  },
  {
    id: 'chevron-pink', label: '쉐브론 핑크', pat: 'chevron',
    bg: '#fff5f7', pc: 'rgba(220,80,120,0.14)', ts: 32, lw: 1.8,
  },
  // ── 다이아몬드 격자 (diamond) ─────────────────────────────────────────────
  {
    id: 'diamond-white', label: '다이아몬드', pat: 'diamond',
    bg: '#ffffff', pc: 'rgba(0,0,0,0.08)', ts: 36, lw: 1,
  },
  {
    id: 'diamond-cream', label: '다이아몬드 크림', pat: 'diamond',
    bg: '#fdf8f0', pc: 'rgba(0,0,0,0.07)', ts: 36, lw: 1,
  },
  {
    id: 'diamond-sky', label: '다이아몬드 스카이', pat: 'diamond',
    bg: '#f0f7ff', pc: 'rgba(40,100,220,0.12)', ts: 36, lw: 1,
  },
  // ── 아르데코 팬 (fan) ────────────────────────────────────────────────────
  {
    id: 'fan-white', label: '아르데코', pat: 'fan',
    bg: '#fafaf8', pc: 'rgba(0,0,0,0.07)', ts: 64, lw: 0.8,
  },
  {
    id: 'fan-cream', label: '아르데코 크림', pat: 'fan',
    bg: '#fdf8f0', pc: 'rgba(0,0,0,0.06)', ts: 64, lw: 0.8,
  },
  // ── 레이스 십자 (lace) ───────────────────────────────────────────────────
  {
    id: 'lace-white', label: '레이스', pat: 'lace',
    bg: '#ffffff', pc: 'rgba(0,0,0,0.09)', ts: 40, lw: 1,
  },
  {
    id: 'lace-pink', label: '레이스 핑크', pat: 'lace',
    bg: '#fff5f7', pc: 'rgba(220,80,120,0.16)', ts: 40, lw: 1,
  },
  {
    id: 'lace-lavender', label: '레이스 라벤더', pat: 'lace',
    bg: '#f6f3ff', pc: 'rgba(120,80,220,0.16)', ts: 40, lw: 1,
  },
];

// ── 타일 캔버스 생성 ──────────────────────────────────────────────────────
function _mkTile(d) {
  const ts = d.ts;
  const c = document.createElement('canvas');
  c.width = ts; c.height = ts;
  const ctx = c.getContext('2d');

  // 배경
  ctx.fillStyle = d.bg;
  ctx.fillRect(0, 0, ts, ts);

  if (d.pat === 'blob') {
    // 수채화 번짐: 방사형 그라디언트 여러 개 겹치기
    d.blobs.forEach(b => {
      const grd = ctx.createRadialGradient(
        b.cx * ts, b.cy * ts, 0,
        b.cx * ts, b.cy * ts, b.r * ts
      );
      grd.addColorStop(0, b.c);
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, ts, ts);
    });

  } else if (d.pat === 'chevron') {
    // 쉐브론: V자 꺾인 선
    ctx.strokeStyle = d.pc;
    ctx.lineWidth = d.lw;
    ctx.lineJoin = 'miter';
    ctx.beginPath();
    ctx.moveTo(0, ts * 0.75);
    ctx.lineTo(ts * 0.5, ts * 0.25);
    ctx.lineTo(ts, ts * 0.75);
    ctx.stroke();

  } else if (d.pat === 'diamond') {
    // 다이아몬드: 45° 회전 정사각형 격자
    ctx.strokeStyle = d.pc;
    ctx.lineWidth = d.lw;
    const h = ts / 2;
    ctx.beginPath();
    // 대각선 두 방향
    ctx.moveTo(0, 0); ctx.lineTo(ts, ts);
    ctx.moveTo(ts, 0); ctx.lineTo(0, ts);
    // 중앙 십자
    ctx.moveTo(h, 0); ctx.lineTo(ts, h);
    ctx.moveTo(ts, h); ctx.lineTo(h, ts);
    ctx.moveTo(h, 0); ctx.lineTo(0, h);
    ctx.moveTo(0, h); ctx.lineTo(h, ts);
    ctx.stroke();

  } else if (d.pat === 'fan') {
    // 아르데코 팬: 네 모서리에서 부채꼴 방사선
    ctx.strokeStyle = d.pc;
    ctx.lineWidth = d.lw;
    const corners = [[0, 0], [ts, 0], [0, ts], [ts, ts]];
    const numLines = 10;
    corners.forEach(([ox, oy]) => {
      for (let i = 0; i <= numLines; i++) {
        const angle = (Math.PI / 2) * (i / numLines);
        // 각 꼭짓점을 기준으로 방향 결정
        const sx = ox === 0 ? 1 : -1;
        const sy = oy === 0 ? 1 : -1;
        const ex = ox + Math.cos(angle) * ts * 0.7 * sx;
        const ey = oy + Math.sin(angle) * ts * 0.7 * sy;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
    });

  } else if (d.pat === 'lace') {
    // 레이스 십자: 십자 선 + 끝점 원 + 모서리 원
    ctx.strokeStyle = d.pc;
    ctx.fillStyle = d.pc;
    ctx.lineWidth = d.lw;
    const cx = ts / 2, cy = ts / 2;
    const arm = ts * 0.28;
    const dotR = 2;
    // 십자 선
    ctx.beginPath();
    ctx.moveTo(cx - arm, cy); ctx.lineTo(cx + arm, cy);
    ctx.moveTo(cx, cy - arm); ctx.lineTo(cx, cy + arm);
    ctx.stroke();
    // 팔 끝 원
    [[cx - arm, cy], [cx + arm, cy], [cx, cy - arm], [cx, cy + arm]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, dotR, 0, Math.PI * 2); ctx.fill();
    });
    // 모서리 반 원 (인접 타일과 합쳐져 전체 원)
    [[0, 0], [ts, 0], [0, ts], [ts, ts]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, dotR, 0, Math.PI * 2); ctx.fill();
    });
    // 중앙 작은 원
    ctx.beginPath(); ctx.arc(cx, cy, dotR * 0.8, 0, Math.PI * 2); ctx.fill();
  }

  return c;
}

// ── 외부 API ─────────────────────────────────────────────────────────────
window.BgDesignUtils = {

  mkFill(design) {
    const tile = _mkTile(design);
    return new fabric.Pattern({ source: tile, repeat: 'repeat' });
  },

  mkThumbUrl(design, w, h) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = design.bg;
    ctx.fillRect(0, 0, w, h);
    const tile = _mkTile(design);
    const pat = ctx.createPattern(tile, 'repeat');
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, w, h);
    return c.toDataURL();
  },
};
