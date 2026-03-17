/**
 * blocks.js — 블록 라이브러리 정의 및 캔버스 삽입
 * 각 블록은 Fabric.js 오브젝트 배열로 구성됨
 */

let ARTBOARD_W = 1200;
const BLOCK_PADDING = 80;      // 블록 내부 수평 패딩
let CONTENT_W = ARTBOARD_W - BLOCK_PADDING * 2;  // 콘텐츠 폭 = 1040

// ===== 블록 라이브러리 정의 =====
window.BlockLibrary = [
  { id: 'b01-main-banner',   name: '메인 배너',      desc: '배경색 + 제목 + 부제목' },
  { id: 'b02-img-left',      name: '좌이미지 우텍스트', desc: '이미지 50% / 설명 50%' },
  { id: 'b03-img-right',     name: '우이미지 좌텍스트', desc: '설명 50% / 이미지 50%' },
  { id: 'b04-feature-2col',  name: '특징 2단',       desc: '아이콘+텍스트 2열' },
  { id: 'b05-feature-3col',  name: '특징 3단',       desc: '아이콘+텍스트 3열' },
  { id: 'b06-full-image',    name: '전체 이미지',     desc: '이미지 100% 폭' },
  { id: 'b07-spec-table',    name: '스펙 표',        desc: '항목/값 2열 표' },
  { id: 'b08-gallery-2col',  name: '갤러리 2열',     desc: '이미지 2개 나란히' },
  { id: 'b09-gallery-3col',  name: '갤러리 3열',     desc: '이미지 3개 나란히' },
  { id: 'b10-text-center',   name: '텍스트 중심',    desc: '제목 + 본문 텍스트' },
  { id: 'b11-caution',       name: '주의사항',       desc: '경고 아이콘 + 텍스트 리스트' },
  { id: 'b12-brand-banner',  name: '브랜드 배너',    desc: '브랜드명 + 슬로건' },
  { id: 'b13-how-to-use',    name: '사용 방법',      desc: '번호 + 단계별 안내 3단' },
  { id: 'b14-review',        name: '고객 후기',      desc: '별점 + 리뷰 카드 3열' },
  { id: 'b15-cta',           name: '구매 유도 배너', desc: '강조 문구 + 행동 유도' },
  { id: 'b16-delivery',      name: '배송 안내',      desc: '배송방법/기간/비용/반품 안내' },
  { id: 'b17-stat-highlight', name: '숫자 강조',      desc: '임팩트 있는 대형 수치 3개 (다크 배경)' },
  { id: 'b18-quote-band',    name: '인용구 밴드',    desc: '풀 와이드 다크 배경에 핵심 카피 한 줄' },
  { id: 'b19-journey',       name: '제품 여정',      desc: '5단계 원형 흐름 — 생산/과정/사용법 등' },
  { id: 'b20-comparison',    name: '전후 비교',      desc: 'Before / After 이미지 2개 나란히' },
  { id: 'b21-benefit-4col',  name: '혜택 4단',       desc: '대형 번호 + 제목 + 설명 카드 4열' },
  { id: 'b22-testimonial',   name: '고객 추천사',    desc: '대형 따옴표 강조형 단일 후기' },
  { id: 'b23-timeline',      name: '수직 타임라인',  desc: '연도/단계별 타임라인 3항목' },
  { id: 'b24-split-screen',  name: '좌우 분할',      desc: '이미지 50% | 텍스트 50% 화면 분할' },
  { id: 'b25-stats',         name: '수치 인포그래픽', desc: '대형 숫자 통계 3단 — 임팩트 강조' },
  { id: 'b26-manifesto',     name: '브랜드 선언',    desc: '굵은 선언문 + 본문 + 강조 태그라인' },
  { id: 'b27-ugc-grid',      name: '고객 사진 그리드', desc: '5컷 SNS스타일 포토 그리드 + 캡션' },
  { id: 'b28-faq',           name: 'FAQ',            desc: '자주 묻는 질문 Q&A 4세트' },
  { id: 'b29-img-overlay',   name: '이미지+오버랩 카드', desc: '풀이미지 위 플로팅 텍스트 카드' },
  { id: 'b30-process-num',   name: '번호 프로세스',  desc: '대형 번호 + 제목 + 설명 세로 3단계' },
  { id: 'b31-staggered',     name: '엇갈린 레이아웃', desc: '이미지+텍스트 좌우 교차 2세트' },
  { id: 'b32-ingredient',    name: '재료/성분 그리드', desc: '중앙 메인 + 주변 서브 재료 4개' },
  { id: 'b33-creator-story', name: '제작자 스토리',  desc: '인물 사진 + 추천 인용구 + 이름/직함' },
  { id: 'b34-magazine',         name: '매거진 레이아웃',         desc: '비대칭 그리드 — 대형 이미지 + 텍스트' },
  { id: 'b35-skincare-hero',    name: '스킨케어 히어로',         desc: '크림 베이지 배경 · 중앙 제품 이미지 · 세리프 제품명' },
  { id: 'b36-dark-overlay-hero',name: '다크 이미지 텍스트 오버레이', desc: '풀블리드 다크 사진 위 텍스트 직접 오버레이' },
  { id: 'b37-bold-product-banner', name: '볼드 제품 배너',      desc: '강렬한 컬러 배경 · 좌측 제품명 · 우측 이미지' },
  { id: 'b38-cosmetic-hero',    name: '코스메틱 그라디언트 히어로', desc: '소프트 핑크 배경 · 배지 · 해시태그 · 모델 이미지' },
  { id: 'b39-minimal-hero',     name: '미니멀 에디토리얼 히어로', desc: '순백 배경 · 얇은 라인 · 세리프 대형 제목 · 여백 극대화' },
];

// ===== 블록 생성 함수 =====
// 각 함수는 { objects: FabricObject[], height: number } 반환

const BlockBuilders = {

  // 단일행 텍스트 기준 높이: fontSize * 1.2 (lineHeight:1.2 사용)
  // 다행 텍스트: fontSize * lineHeight * 줄수

  'b01-main-banner': (yOffset, theme, content) => {
    const c = theme?.colors || { bg: '#1a1a1a', text: '#ffffff', subtext: '#aaaaaa', accent: '#ffffff' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '900';
    const title    = content?.title    || '상품명을 입력하세요';
    const subtitle = content?.subtitle || '핵심 특징을 한 줄로 설명하세요';
    const layout   = content?.layout   || 'center';   // 'center' | 'split' | 'minimal' | 'left'

    const bgColor   = c.hero || c.bg;
    const isLightBg = _isLightColor(bgColor);
    const titleColor = isLightBg ? (_isLightColor(c.text)    ? '#111111' : c.text)    : '#ffffff';
    const subColor   = isLightBg ? (_isLightColor(c.subtext) ? '#555555' : c.subtext) : 'rgba(255,255,255,0.72)';
    const accentColor = isLightBg ? c.accent : (c.accent2 || '#ffffff');

    // ── split: 좌텍스트 우이미지 (스킨케어·식품 감성형) ──────────────────
    if (layout === 'split') {
      const h = 780;
      const textAreaW = 580;
      const imgX = textAreaW;
      const textX = BLOCK_PADDING;
      const textW = textAreaW - BLOCK_PADDING - 40;
      const labelY = yOffset + 180;
      const titleY = labelY + 52;
      const divY   = titleY + Math.ceil(title.split('\n').length * 68 * 1.3) + 24;
      const subY   = divY + 20;
      return {
        height: h,
        objects: [
          mkRect(0, yOffset, ARTBOARD_W, h, bgColor, 'left', '_isHero'),
          mkPlaceholder(imgX, yOffset, ARTBOARD_W - imgX, h, '이미지 영역\n더블클릭하여 업로드', 0),
          // 브랜드 라벨
          mkText(content?.label || '', textX, labelY, {
            fontSize: 22, fontFamily: f.body, fontWeight: '400', charSpacing: 200,
            fill: subColor, textAlign: 'left', originX: 'left', _isHeroText: true, width: textW,
            _contentKey: 'label',
          }),
          // 제품명
          mkText(title, textX, titleY, {
            fontSize: 68, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.3,
            fill: titleColor, textAlign: 'left', originX: 'left', _isHeading: true, _isHeroText: true, width: textW,
            _contentKey: 'title',
          }),
          // 구분선
          mkRect(textX, divY, 48, 2, accentColor, 'left', '_isHeroDivider'),
          // 부제목
          mkText(subtitle, textX, subY, {
            fontSize: 26, fontFamily: f.body, fontWeight: '400', lineHeight: 1.6,
            fill: subColor, textAlign: 'left', originX: 'left', _isHeroText: true, width: textW,
            _contentKey: 'subtitle',
          }),
        ],
      };
    }

    // ── minimal: 화이트 미니멀 (라이프스타일·공방) ──────────────────────
    if (layout === 'minimal') {
      const h = 760;
      const cx = ARTBOARD_W / 2;
      return {
        height: h,
        objects: [
          mkRect(0, yOffset, ARTBOARD_W, h, bgColor, 'left', '_isHero'),
          // 얇은 상단 라인
          mkRect(cx - 60, yOffset + 120, 120, 1, accentColor, 'left', '_isHeroDivider'),
          // 소제목 라벨
          mkText(content?.label || '', cx, yOffset + 140, {
            fontSize: 20, fontFamily: f.body, fontWeight: '400', charSpacing: 240,
            fill: subColor, textAlign: 'center', originX: 'center', _isHeroText: true,
            _contentKey: 'label',
          }),
          // 메인 타이틀 — 크고 얇게
          mkText(title, cx, yOffset + 280, {
            fontSize: 82, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.2,
            fill: titleColor, textAlign: 'center', originX: 'center', _isHeading: true, _isHeroText: true, width: 960,
            _contentKey: 'title',
          }),
          // 얇은 하단 라인
          mkRect(cx - 30, yOffset + 560, 60, 1, accentColor, 'left', '_isHeroDivider'),
          // 부제목
          mkText(subtitle, cx, yOffset + 590, {
            fontSize: 26, fontFamily: f.body, fontWeight: '300', lineHeight: 1.6,
            fill: subColor, textAlign: 'center', originX: 'center', _isHeroText: true, width: 800,
            _contentKey: 'subtitle',
          }),
        ],
      };
    }

    // ── left: 좌측 정렬 텍스트 (코스메틱·뷰티) ──────────────────────────
    if (layout === 'left') {
      const h = 720;
      const textX = BLOCK_PADDING;
      const textW  = 680;
      const decorFill = isLightBg ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)';
      return {
        height: h,
        objects: [
          mkGradientRect(0, yOffset, ARTBOARD_W, h, bgColor, _darkenHex(bgColor, 24), '_isGradientHero'),
          // 배경 원형 장식 (우측)
          new fabric.Circle({
            left: Math.round(ARTBOARD_W * 0.78), top: yOffset - Math.round(h * 0.18),
            radius: Math.round(h * 0.58),
            fill: decorFill, selectable: false, evented: false, hoverCursor: 'default',
            stroke: 'transparent', strokeWidth: 0,
          }),
          // 배지/라벨
          mkText(content?.label || '', textX, yOffset + 180, {
            fontSize: 22, fontFamily: f.body, fontWeight: '400', charSpacing: 180,
            fill: subColor, textAlign: 'left', originX: 'left', _isHeroText: true,
            _contentKey: 'label',
          }),
          // 메인 타이틀
          mkText(title, textX, yOffset + 220, {
            fontSize: 84, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.2,
            fill: titleColor, textAlign: 'left', originX: 'left', _isHeading: true, _isHeroText: true, width: textW,
            _contentKey: 'title',
          }),
          // 구분선
          mkRect(textX, yOffset + 490, 56, 3, accentColor, 'left', '_isHeroDivider'),
          // 부제목
          mkText(subtitle, textX, yOffset + 516, {
            fontSize: 28, fontFamily: f.body, fontWeight: '400', lineHeight: 1.5,
            fill: subColor, textAlign: 'left', originX: 'left', _isHeroText: true, width: textW,
            _contentKey: 'subtitle',
          }),
        ],
      };
    }

    // ── center: 기본 중앙 정렬 (default) ─────────────────────────────────
    const titleFontSize = parseInt(hw) <= 700 ? 78 : 90;
    const titleH  = Math.ceil(title.split('\n').length * titleFontSize * 1.25);
    const dividerY  = yOffset + 232 + titleH + 36;
    const subtitleY = dividerY + 3 + 26;
    const h = Math.max(680, (subtitleY - yOffset) + Math.ceil(38 * 1.2) + 150);
    const decorAlpha = isLightBg ? 0.05 : 0.08;
    const decorFill  = isLightBg ? `rgba(0,0,0,${decorAlpha})` : `rgba(255,255,255,${decorAlpha})`;
    return {
      height: h,
      objects: [
        mkGradientRect(0, yOffset, ARTBOARD_W, h, bgColor, _darkenHex(bgColor, 32), '_isGradientHero'),
        new fabric.Circle({
          left: Math.round(ARTBOARD_W * 0.76), top: yOffset - Math.round(h * 0.20),
          radius: Math.round(h * 0.56),
          fill: decorFill, selectable: false, evented: false,
          hoverCursor: 'default', stroke: 'transparent', strokeWidth: 0,
        }),
        new fabric.Circle({
          left: Math.round(ARTBOARD_W * 0.08), top: yOffset + Math.round(h * 0.65),
          radius: Math.round(h * 0.21),
          fill: decorFill, selectable: false, evented: false,
          hoverCursor: 'default', stroke: 'transparent', strokeWidth: 0,
        }),
        mkText(title, ARTBOARD_W / 2, yOffset + 232, {
          fontSize: titleFontSize, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.25,
          fill: titleColor, textAlign: 'center', originX: 'center', _isHeading: true, _isHeroText: true, width: 960,
          _contentKey: 'title',
        }),
        mkRect(ARTBOARD_W / 2 - 30, dividerY, 60, 3, accentColor, 'center', '_isHeroDivider'),
        mkText(subtitle, ARTBOARD_W / 2, subtitleY, {
          fontSize: 34, fontFamily: f.body, fontWeight: '400', lineHeight: 1.3,
          fill: subColor, textAlign: 'center', originX: 'center', _isHeroText: true, width: 960,
          _contentKey: 'subtitle',
        }),
      ],
    };
  },

  'b02-img-left': (yOffset, theme, content) => {
    const h = 720;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '800';
    const imgW = ARTBOARD_W / 2;
    const textX = imgW + BLOCK_PADDING;          // 좌측 여백 포함 텍스트 시작 X
    const textW = ARTBOARD_W / 2 - BLOCK_PADDING - 40;  // 우측 40px 여백
    const title = content?.title || '특징 제목';
    const desc = content?.desc || '상품의 특징을 자세히 설명하세요.\n여러 줄로 작성하면 더욱 효과적입니다.\n구체적인 수치나 장점을 강조해보세요.';
    return {
      height: h,
      objects: [
        mkGradientRect(0, yOffset, ARTBOARD_W, h, _lightenHex(c.bg, 24), _darkenHex(c.bg, 16), '_isGradientBg'),
        mkGradientRect(imgW, yOffset, ARTBOARD_W / 2, h, _lightenHex(c.surface || c.bg, 10), _darkenHex(c.surface || c.bg, 20), '_isGradientSurface'),
        mkPlaceholder(0, yOffset, imgW, h, '이미지 영역\n더블클릭하여 업로드', 0),
        mkRect(textX, yOffset + 120, 44, 2, c.accent, 'left', '_isAccent'),
        mkText(title, textX, yOffset + 140, {
          fontSize: 58, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.2,
          fill: c.text, textAlign: 'left', originX: 'left', _isHeading: true, width: textW,
          _contentKey: 'title',
        }),
        mkText(desc, textX, yOffset + 310, {
          fontSize: 32, fontFamily: f.body, fontWeight: '300',
          fill: c.subtext, lineHeight: 1.9, textAlign: 'left', originX: 'left', width: textW,
          _contentKey: 'desc',
        }),
      ]
    };
  },

  'b03-img-right': (yOffset, theme, content) => {
    const h = 720;
    const c = theme?.colors || { bg: '#f8f9fa', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '800';
    const imgX = ARTBOARD_W / 2;
    const textX = BLOCK_PADDING;                          // 텍스트 시작 X
    const textW = ARTBOARD_W / 2 - BLOCK_PADDING - 40;   // 우측 40px 여백 (이미지 경계 전)
    const title = content?.title || '특징 제목';
    const desc = content?.desc || '상품의 특징을 자세히 설명하세요.\n여러 줄로 작성하면 더욱 효과적입니다.\n구체적인 수치나 장점을 강조해보세요.';
    return {
      height: h,
      objects: [
        mkGradientRect(0, yOffset, ARTBOARD_W, h, _darkenHex(c.surface || c.bg, 18), _lightenHex(c.surface || c.bg, 12), '_isGradientSurface'),
        mkGradientRect(0, yOffset, ARTBOARD_W / 2, h, _darkenHex(c.bg, 10), _lightenHex(c.bg, 28), '_isGradientBg'),
        mkPlaceholder(imgX, yOffset, ARTBOARD_W / 2, h, '이미지 영역\n더블클릭하여 업로드', 0),
        mkRect(textX, yOffset + 110, 44, 2, c.accent, 'left', '_isAccent'),
        mkText(title, textX, yOffset + 130, {
          fontSize: 68, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.2,
          fill: c.text, textAlign: 'left', originX: 'left', _isHeading: true, width: textW,
          _contentKey: 'title',
        }),
        mkText(desc, textX, yOffset + 330, {
          fontSize: 31, fontFamily: f.body, fontWeight: '300',
          fill: c.subtext, lineHeight: 1.9, textAlign: 'left', originX: 'left', width: textW,
          _contentKey: 'desc',
        }),
      ]
    };
  },

  'b04-feature-2col': (yOffset, theme, content) => {
    const h = 620;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const colW = (CONTENT_W - 40) / 2;
    const cx1 = BLOCK_PADDING + colW / 2;
    const cx2 = BLOCK_PADDING + colW + 40 + colW / 2;
    const defaults = [
      { title: '특징 01', desc: '특징에 대한 설명을\n두 줄 정도로 작성하세요.' },
      { title: '특징 02', desc: '특징에 대한 설명을\n두 줄 정도로 작성하세요.' },
    ];
    const items = content?.items || defaults;
    const txtW = Math.floor(colW * 0.88);
    const txtOpts = (isHead) => ({
      textAlign: 'center', originX: 'center', width: txtW,
      ...(isHead ? { fontSize: 50, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2, fill: c.text, _isHeading: true }
                 : { fontSize: 30, fontFamily: f.body, fill: c.subtext, lineHeight: 1.7 })
    });
    return {
      height: h,
      objects: [
        mkGradientRect(0, yOffset, ARTBOARD_W, h, _lightenHex(c.bg, 20), _darkenHex(c.bg, 12), '_isGradientBg'),
        mkCircle(cx1, yOffset + 190, 30, c.accent, '_isAccent'),
        mkText(items[0]?.title || defaults[0].title, cx1, yOffset + 258, { ...txtOpts(true),  _contentKey: 'items[0].title' }),
        mkText(items[0]?.desc  || defaults[0].desc,  cx1, yOffset + 410, { ...txtOpts(false), _contentKey: 'items[0].desc'  }),
        mkCircle(cx2, yOffset + 190, 30, c.accent2 || c.accent, '_isAccent2'),
        mkText(items[1]?.title || defaults[1].title, cx2, yOffset + 258, { ...txtOpts(true),  _contentKey: 'items[1].title' }),
        mkText(items[1]?.desc  || defaults[1].desc,  cx2, yOffset + 410, { ...txtOpts(false), _contentKey: 'items[1].desc'  }),
      ]
    };
  },

  'b05-feature-3col': (yOffset, theme, content) => {
    const h = 540;
    const c = theme?.colors || { bg: '#f8f9fa', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const colW = (CONTENT_W - 40) / 3;
    const cxs = [
      BLOCK_PADDING + colW / 2,
      BLOCK_PADDING + colW + 20 + colW / 2,
      BLOCK_PADDING + (colW + 20) * 2 + colW / 2,
    ];
    const defaults = [
      { title: '특징 01', desc: '특징 설명을\n여기에 작성하세요.' },
      { title: '특징 02', desc: '특징 설명을\n여기에 작성하세요.' },
      { title: '특징 03', desc: '특징 설명을\n여기에 작성하세요.' },
    ];
    const items = content?.items || defaults;
    const circleAccents = [c.accent, c.accent2 || c.accent, c.accent];
    const circleFlags3 = ['_isAccent', '_isAccent2', '_isAccent'];
    const featureCardShadow = new fabric.Shadow({ color: 'rgba(0,0,0,0.09)', blur: 24, offsetX: 0, offsetY: 6 });
    const objs = [mkGradientRect(0, yOffset, ARTBOARD_W, h, _lightenHex(c.surface || c.bg, 26), _darkenHex(c.surface || c.bg, 10), '_isGradientSurface')];
    cxs.forEach((cx, i) => {
      const cardX = BLOCK_PADDING + i * (colW + 20);
      objs.push(new fabric.Rect({
        left: cardX, top: yOffset + 60, width: colW, height: h - 100,
        fill: c.bg, shadow: featureCardShadow,
        selectable: true, stroke: 'transparent', strokeWidth: 0, _isBg: true,
      }));
      objs.push(
        mkCircle(cx, yOffset + 180, 28, circleAccents[i], circleFlags3[i]),
        mkText(items[i]?.title || defaults[i].title, cx, yOffset + 242, {
          fontSize: 42, fontFamily: f.body, fontWeight: '700', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: Math.floor(colW * 0.84),
          _contentKey: `items[${i}].title`,
        }),
        mkText(items[i]?.desc || defaults[i].desc, cx, yOffset + 312, {
          fontSize: 28, fontFamily: f.body, fill: c.subtext, lineHeight: 1.7,
          textAlign: 'center', originX: 'center', width: Math.floor(colW * 0.84),
          _contentKey: `items[${i}].desc`,
        })
      );
    });
    return { height: h, objects: objs };
  },

  'b06-full-image': (yOffset, theme) => {
    const h = 820;
    return {
      height: h,
      objects: [
        mkPlaceholder(0, yOffset, ARTBOARD_W, h, '이미지 영역\n더블클릭하여 업로드', 0),
      ]
    };
  },

  'b07-spec-table': (yOffset, theme, content) => {
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const defaultRows = [
      ['제품명', '내용을 입력하세요'],
      ['용량/중량', '내용을 입력하세요'],
      ['원산지', '내용을 입력하세요'],
      ['유통기한', '내용을 입력하세요'],
      ['보관방법', '내용을 입력하세요'],
    ];
    const rows = content?.rows || defaultRows;
    const sectionTitle = content?.title || '상품 정보';
    const rowH = 76;
    const headerH = 130;
    const h = headerH + rows.length * rowH + 76;
    const tableY = yOffset + headerH;
    const labelW = 220;
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
      mkText(sectionTitle, ARTBOARD_W / 2, yOffset + (headerH - 46) / 2, {
        fontSize: 44, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        _contentKey: 'title',
      }),
    ];
    rows.forEach(([label, value], i) => {
      const rowY = tableY + i * rowH;
      const isEven = i % 2 === 0;
      objs.push(
        mkRect(BLOCK_PADDING, rowY, CONTENT_W, rowH, isEven ? c.surface || '#f8f9fa' : c.bg, 'left', isEven ? '_isSurface' : '_isBg'),
        mkRect(BLOCK_PADDING, rowY, labelW, rowH, isEven ? c.bg : c.surface || '#f8f9fa', 'left', isEven ? '_isBg' : '_isSurface'),
        mkText(label, BLOCK_PADDING + 24, rowY + rowH / 2, {
          fontSize: 26, fontFamily: f.body, fontWeight: '700', fill: c.text, originY: 'center',
          width: labelW - 30, _contentKey: `rows[${i}][0]`,
        }),
        mkText(value, BLOCK_PADDING + labelW + 24, rowY + rowH / 2, {
          fontSize: 26, fontFamily: f.body, fill: c.subtext, originY: 'center',
          width: CONTENT_W - labelW - 48, _contentKey: `rows[${i}][1]`,
        })
      );
    });
    return { height: h, objects: objs };
  },

  'b08-gallery-2col': (yOffset, theme) => {
    const h = 640;
    const gap = 16;
    const imgW = (ARTBOARD_W - gap) / 2;
    return {
      height: h,
      objects: [
        mkPlaceholder(0, yOffset, imgW, h, '이미지 1\n더블클릭하여 업로드', 0),
        mkPlaceholder(imgW + gap, yOffset, imgW, h, '이미지 2\n더블클릭하여 업로드', 1),
      ]
    };
  },

  'b09-gallery-3col': (yOffset, theme) => {
    const h = 560;
    const gap = 12;
    const imgW = (ARTBOARD_W - gap * 2) / 3;
    return {
      height: h,
      objects: [
        mkPlaceholder(0, yOffset, imgW, h, '이미지 1\n더블클릭하여 업로드', 0),
        mkPlaceholder(imgW + gap, yOffset, imgW, h, '이미지 2\n더블클릭하여 업로드', 1),
        mkPlaceholder((imgW + gap) * 2, yOffset, imgW, h, '이미지 3\n더블클릭하여 업로드', 2),
      ]
    };
  },

  'b10-text-center': (yOffset, theme, content) => {
    const h = 700;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '800';
    const title = content?.title || '섹션 제목';
    const body = content?.body || '여기에 본문 내용을 입력하세요. 상품의 스토리나 브랜드 철학,\n사용 방법 등을 자세히 설명할 수 있습니다.';
    const bgIsLight = _isLightColor(c.bg);
    const decorFill = bgIsLight ? 'rgba(0,0,0,0.038)' : 'rgba(255,255,255,0.05)';
    const titleFontSize = parseInt(hw) <= 700 ? 64 : 72;
    return {
      height: h,
      objects: [
        (() => {
          const grad = new fabric.Gradient({
            type: 'linear', gradientUnits: 'pixels',
            coords: { x1: ARTBOARD_W, y1: 0, x2: 0, y2: h },
            colorStops: [
              { offset: 0, color: _lightenHex(c.bg, 30) },
              { offset: 1, color: _darkenHex(c.bg, 18) },
            ],
          });
          return new fabric.Rect({ left: 0, top: yOffset, width: ARTBOARD_W, height: h, fill: grad, selectable: true, stroke: 'transparent', strokeWidth: 0, lockMovementX: true, lockMovementY: true, lockScalingX: true, lockScalingY: true, lockRotation: true, hasControls: false, _isGradientBg: true });
        })(),
        new fabric.IText('\u201C', {
          left: ARTBOARD_W / 2, top: yOffset + h / 2 - 60,
          fontSize: 420, fontFamily: f.heading, fontWeight: '900',
          fill: decorFill, textAlign: 'center', originX: 'center', originY: 'center',
          selectable: false, evented: false, hoverCursor: 'default',
          _isDecor: true,
        }),
        mkText(title, ARTBOARD_W / 2, yOffset + 166, {
          fontSize: titleFontSize, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.3,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: 880,
          _contentKey: 'title',
        }),
        mkRect(ARTBOARD_W / 2 - 30, yOffset + 380, 60, 3, c.accent, 'center', '_isAccent'),
        mkText(body, ARTBOARD_W / 2, yOffset + 416, {
          fontSize: 30, fontFamily: f.body, fontWeight: '400',
          fill: c.subtext, textAlign: 'center', originX: 'center', lineHeight: 1.85, width: 860,
          _contentKey: 'body',
        }),
      ]
    };
  },

  'b11-caution': (yOffset, theme, content) => {
    const c = theme?.colors || { bg: '#fff9f0', text: '#111111', subtext: '#6b7280', accent: '#E9A800' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const items = content?.items || ['주의사항 1을 입력하세요', '주의사항 2를 입력하세요', '주의사항 3을 입력하세요'];
    const rowH = 72;
    const topPad = 70;
    const itemsStart = topPad + 74; // 74 = 제목 높이(~50) + 간격(24)
    const h = itemsStart + Math.max(0, items.length - 1) * rowH + 36 + topPad;
    const objs = [
      (() => {
        const grad = new fabric.Gradient({
          type: 'linear', gradientUnits: 'pixels',
          coords: { x1: 0, y1: 0, x2: ARTBOARD_W, y2: 0 },
          colorStops: [
            { offset: 0, color: _darkenHex(c.bg, 14) },
            { offset: 1, color: _lightenHex(c.bg, 22) },
          ],
        });
        return new fabric.Rect({ left: 0, top: yOffset, width: ARTBOARD_W, height: h, fill: grad, selectable: true, stroke: 'transparent', strokeWidth: 0, lockMovementX: true, lockMovementY: true, lockScalingX: true, lockScalingY: true, lockRotation: true, hasControls: false, _isGradientBg: true });
      })(),
      mkText('⚠ 주의사항', BLOCK_PADDING, yOffset + topPad, {
        fontSize: 42, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
        fill: c.accent, _isHeading: true,
      }),
    ];
    items.forEach((txt, i) => {
      objs.push(
        mkText('•  ' + txt, BLOCK_PADDING, yOffset + itemsStart + i * rowH, {
          fontSize: 29, fontFamily: f.body, fill: c.subtext, lineHeight: 1.4, width: CONTENT_W,
          _contentKey: `items[${i}]`,
        })
      );
    });
    return { height: h, objects: objs };
  },

  'b12-brand-banner': (yOffset, theme, content) => {
    const h = 440;
    const c = theme?.colors || { bg: '#111111', text: '#ffffff', subtext: 'rgba(255,255,255,0.6)', accent: '#ffffff' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '900';
    const name = content?.name || '브랜드명';
    const slogan = content?.slogan || '브랜드 슬로건을 여기에 입력하세요';
    const heroBg = c.hero || c.bg;
    const isLightHero = _isLightColor(heroBg);
    const nameColor = isLightHero ? (_isLightColor(c.text) ? '#111111' : c.text) : '#ffffff';
    const sloganColor = isLightHero ? (_isLightColor(c.subtext) ? '#444444' : c.subtext) : 'rgba(255,255,255,0.65)';
    const brandDecorFill = isLightHero ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.07)';
    const nameFontSize = parseInt(hw) <= 700 ? 62 : 74;
    return {
      height: h,
      objects: [
        mkGradientRect(0, yOffset, ARTBOARD_W, h, heroBg, _darkenHex(heroBg, 30), '_isGradientHero'),
        new fabric.Circle({
          left: Math.round(ARTBOARD_W * 0.82), top: yOffset - Math.round(h * 0.25),
          radius: Math.round(h * 0.60),
          fill: brandDecorFill, selectable: false, evented: false,
          hoverCursor: 'default', stroke: 'transparent', strokeWidth: 0,
        }),
        mkText(name, ARTBOARD_W / 2, yOffset + 130, {
          fontSize: nameFontSize, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.3,
          fill: nameColor, textAlign: 'center', originX: 'center', _isHeading: true, _isHeroText: true,
          _contentKey: 'name',
        }),
        mkText(slogan, ARTBOARD_W / 2, yOffset + 276, {
          fontSize: 30, fontFamily: f.body, fontWeight: '300', lineHeight: 1.4,
          fill: sloganColor, textAlign: 'center', originX: 'center', _isHeroText: true,
          _contentKey: 'slogan',
        }),
      ]
    };
  },

  // ─── b13: 사용 방법 (3단계 번호형) ───────────────────────────────────────
  'b13-how-to-use': (yOffset, theme, content) => {
    const h = 750;
    const c = theme?.colors || { bg: '#f8f9fa', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const colW = (CONTENT_W - 40) / 3;
    const xs = [BLOCK_PADDING, BLOCK_PADDING + colW + 20, BLOCK_PADDING + (colW + 20) * 2];
    const defaults = [
      { step: '01', title: '1단계', desc: '첫 번째 단계를\n간단하게 설명하세요.' },
      { step: '02', title: '2단계', desc: '두 번째 단계를\n간단하게 설명하세요.' },
      { step: '03', title: '3단계', desc: '마지막 단계를\n간단하게 설명하세요.' },
    ];
    const items = content?.items || defaults;
    const circleY = yOffset + 320;
    const circleR = 38;
    const stepAccents = [c.accent, c.accent2 || c.accent, c.accent];
    const stepFlags = ['_isAccent', '_isAccent2', '_isAccent'];
    const connLineColor = _isLightColor(c.surface || c.bg) ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.18)';
    const cx0 = xs[0] + colW / 2;
    const cx2 = xs[2] + colW / 2;
    const objs = [
      mkGradientRect(0, yOffset, ARTBOARD_W, h, _darkenHex(c.surface || c.bg, 12), _lightenHex(c.surface || c.bg, 18), '_isGradientSurface'),
      mkText('사용 방법', ARTBOARD_W / 2, yOffset + 100, {
        fontSize: 44, fontFamily: f.heading, fontWeight: '800',
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
      }),
      mkRect(cx0 + circleR, circleY - 1, cx2 - cx0 - circleR * 2, 2, connLineColor, 'left'),
    ];
    xs.forEach((x, i) => {
      const item = items[i] || defaults[i];
      const cx = x + colW / 2;
      const stepFill = stepAccents[i];
      const inCircleColor = _isLightColor(stepFill) ? c.text : '#ffffff';
      objs.push(
        mkCircle(cx, circleY, circleR, stepFill, stepFlags[i]),
        mkText(item.step, cx, circleY, {
          fontSize: 30, fontFamily: f.heading, fontWeight: '800',
          fill: inCircleColor, textAlign: 'center', originX: 'center', originY: 'center',
          _contentKey: `items[${i}].step`,
        }),
        mkText(item.title, cx, yOffset + 414, {
          fontSize: 34, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: Math.floor(colW * 0.84),
          _contentKey: `items[${i}].title`,
        }),
        mkText(item.desc, cx, yOffset + 490, {
          fontSize: 26, fontFamily: f.body, fill: c.subtext, lineHeight: 1.7,
          textAlign: 'center', originX: 'center', width: Math.floor(colW * 0.84),
          _contentKey: `items[${i}].desc`,
        })
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b14: 고객 후기 (3열 카드) ─────────────────────────────────────────
  'b14-review': (yOffset, theme, content) => {
    const h = 610;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const gap = 24;
    const cardW = (CONTENT_W - gap * 2) / 3;
    const cardH = 390;
    const cardTop = yOffset + 159;
    const xs = [BLOCK_PADDING, BLOCK_PADDING + cardW + gap, BLOCK_PADDING + (cardW + gap) * 2];
    const defaults = [
      { stars: '★★★★★', text: '정말 만족스러운 제품이에요.\n품질도 좋고 배송도 빨랐습니다.', name: '구매자 A' },
      { stars: '★★★★★', text: '재구매 의사 100%입니다.\n주변에도 적극 추천하고 있어요.', name: '구매자 B' },
      { stars: '★★★★☆', text: '가격 대비 정말 훌륭합니다.\n사용 후 효과를 바로 느꼈어요.', name: '구매자 C' },
    ];
    const items = content?.items || defaults;
    const cardShadow = new fabric.Shadow({ color: 'rgba(0,0,0,0.10)', blur: 28, offsetX: 0, offsetY: 6 });
    const objs = [
      mkGradientRect(0, yOffset, ARTBOARD_W, h, c.bg, _darkenHex(c.bg, 16), '_isGradientBg'),
      mkText('고객 후기', ARTBOARD_W / 2, yOffset + 61, {
        fontSize: 44, fontFamily: f.heading, fontWeight: '800',
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
      }),
    ];
    xs.forEach((x, i) => {
      const item = items[i] || defaults[i];
      // 카드 본체 (섀도우)
      objs.push(new fabric.Rect({
        left: x, top: cardTop, width: cardW, height: cardH,
        fill: c.surface || '#f8f9fa', shadow: cardShadow,
        selectable: true, stroke: 'transparent', strokeWidth: 0, _isSurface: true,
      }));
      // 상단 액센트 컬러 바
      objs.push(new fabric.Rect({
        left: x, top: cardTop, width: cardW, height: 5,
        fill: c.accent, selectable: true, stroke: 'transparent', strokeWidth: 0, _isAccent: true,
      }));
      objs.push(
        mkText(item.stars, x + 26, cardTop + 32, {
          fontSize: 26, fontFamily: f.body, fill: c.accent, _isAccentText: true,
          _contentKey: `items[${i}].stars`,
        }),
        mkText(item.text, x + 26, cardTop + 90, {
          fontSize: 25, fontFamily: f.body, fill: c.subtext, lineHeight: 1.75, width: cardW - 52,
          _contentKey: `items[${i}].text`,
        }),
        mkText('— ' + item.name, x + 26, cardTop + cardH - 54, {
          fontSize: 25, fontFamily: f.body, fontWeight: '700', fill: c.text, width: cardW - 52,
          _contentKey: `items[${i}].name`,
        }),
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b16: 배송 안내 ────────────────────────────────────────────────────
  'b16-delivery': (yOffset, theme, content) => {
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const sectionTitle = content?.title || '배송 안내';
    const defaultRows = [
      ['배송방법', '택배 (CJ대한통운)'],
      ['배송비', '무료배송 (50,000원 미만 주문 시 3,000원)'],
      ['배송기간', '결제 완료 후 1~3 영업일 이내 출고'],
      ['도서·산간', '추가 배송비 발생 (3,000~6,000원)'],
      ['반품 주소', '주소를 입력하세요'],
      ['반품 배송비', '최초 배송비 무료 시 반품 편도 3,000원'],
      ['교환 배송비', '왕복 6,000원'],
    ];
    const rows = content?.rows || defaultRows;
    const rowH = 76;
    const headerH = 130;
    const accentBarH = 4;
    const h = headerH + rows.length * rowH + 76;
    const tableY = yOffset + headerH;
    const labelW = 240;
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
      mkText(sectionTitle, ARTBOARD_W / 2, yOffset + (headerH - 46) / 2, {
        fontSize: 44, fontFamily: f.body, fontWeight: '700', lineHeight: 1.2,
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        _contentKey: 'title',
      }),
      mkRect(ARTBOARD_W / 2 - 24, yOffset + (headerH - 46) / 2 + 52, 48, accentBarH, c.accent, 'left', '_isAccent'),
    ];
    rows.forEach(([label, value], i) => {
      const rowY = tableY + i * rowH;
      const isEven = i % 2 === 0;
      objs.push(
        mkRect(BLOCK_PADDING, rowY, CONTENT_W, rowH, isEven ? c.surface || '#f8f9fa' : c.bg, 'left', isEven ? '_isSurface' : '_isBg'),
        mkRect(BLOCK_PADDING, rowY, labelW, rowH, c.surface || '#f0f4f8', 'left', '_isSurface'),
        mkText(label, BLOCK_PADDING + 24, rowY + rowH / 2, {
          fontSize: 26, fontFamily: f.body, fontWeight: '700', fill: c.text, originY: 'center',
          width: labelW - 30, _contentKey: `rows[${i}][0]`,
        }),
        mkText(value, BLOCK_PADDING + labelW + 24, rowY + rowH / 2, {
          fontSize: 26, fontFamily: f.body, fill: c.subtext, originY: 'center',
          width: CONTENT_W - labelW - 48, _contentKey: `rows[${i}][1]`,
        })
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b15: 구매 유도 배너 (CTA) ─────────────────────────────────────────
  'b15-cta': (yOffset, theme, content) => {
    const h = 480;
    const c = theme?.colors || { bg: '#111111', text: '#ffffff', subtext: '#aaaaaa', accent: '#ffffff' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '900';
    const headline = content?.headline || '지금 바로 경험해보세요';
    const sub = content?.sub || '첫 구매 고객을 위한 특별 혜택이 준비되어 있습니다';
    const heroBg = c.hero || c.bg;
    const isLight = _isLightColor(heroBg);
    const headColor = isLight ? (_isLightColor(c.text) ? '#111111' : c.text) : '#ffffff';
    const subColor = isLight ? (_isLightColor(c.subtext) ? '#444444' : c.subtext) : 'rgba(255,255,255,0.65)';
    const lineColor = isLight ? c.accent : (c.accent2 || '#ffffff');
    const ctaDecorFill = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.07)';
    const headFontSize = parseInt(hw) <= 700 ? 64 : 74;
    return {
      height: h,
      objects: [
        mkGradientRect(0, yOffset, ARTBOARD_W, h, heroBg, _darkenHex(heroBg, 36), '_isGradientHero'),
        new fabric.Circle({
          left: Math.round(ARTBOARD_W * 0.9), top: yOffset - Math.round(h * 0.15),
          radius: Math.round(h * 0.55),
          fill: ctaDecorFill, selectable: false, evented: false,
          hoverCursor: 'default', stroke: 'transparent', strokeWidth: 0,
        }),
        new fabric.Circle({
          left: Math.round(ARTBOARD_W * 0.04), top: yOffset + Math.round(h * 0.6),
          radius: Math.round(h * 0.22),
          fill: ctaDecorFill, selectable: false, evented: false,
          hoverCursor: 'default', stroke: 'transparent', strokeWidth: 0,
        }),
        mkRect(ARTBOARD_W / 2 - 30, yOffset + 92, 60, 3, lineColor, 'center', '_isHeroDivider'),
        mkText(headline, ARTBOARD_W / 2, yOffset + 130, {
          fontSize: headFontSize, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.3,
          fill: headColor, textAlign: 'center', originX: 'center', _isHeading: true, _isHeroText: true, width: 960,
          _contentKey: 'headline',
        }),
        mkText(sub, ARTBOARD_W / 2, yOffset + 330, {
          fontSize: 34, fontFamily: f.body, fontWeight: '300', lineHeight: 1.6,
          fill: subColor, textAlign: 'center', originX: 'center', _isHeroText: true, width: 960,
          _contentKey: 'sub',
        }),
      ]
    };
  },

  // ─── b17: 숫자 강조 섹션 ──────────────────────────────────────────────────
  'b17-stat-highlight': (yOffset, theme, content) => {
    const h = 480;
    const c = theme?.colors || { hero: '#1a1a1a', accent: '#EAB308', subtext: '#aaaaaa' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const heroBg = c.hero || c.bg;
    const isLight = _isLightColor(heroBg);
    const labelColor = isLight ? c.subtext : 'rgba(255,255,255,0.72)';
    const divColor  = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.14)';
    const defaults = [
      { num: '100%',  label: '제주산 원료' },
      { num: '3개월+', label: '저온 숙성' },
      { num: '0가지',  label: '합성 첨가물' },
    ];
    const items = content?.items || defaults;
    const colW = ARTBOARD_W / 3;
    const cxs  = [colW * 0.5, colW * 1.5, colW * 2.5];
    const objs = [
      mkGradientRect(0, yOffset, ARTBOARD_W, h, heroBg, _darkenHex(heroBg, 35), '_isGradientHero'),
      new fabric.Circle({
        left: Math.round(ARTBOARD_W * 0.88), top: yOffset + Math.round(h * 0.5),
        radius: 200,
        fill: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)',
        selectable: false, evented: false, hoverCursor: 'default', stroke: 'transparent', strokeWidth: 0,
      }),
      mkRect(colW,     yOffset + 120, 1, 240, divColor, 'left'),
      mkRect(colW * 2, yOffset + 120, 1, 240, divColor, 'left'),
    ];
    cxs.forEach((cx, i) => {
      const item = items[i] || defaults[i];
      objs.push(
        mkText(item.num, cx, yOffset + 200, {
          fontSize: 104, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.0,
          fill: c.accent, textAlign: 'center', originX: 'center', originY: 'center',
          _isHeading: true, _isAccentText: true,
          _contentKey: `items[${i}].num`,
        }),
        mkText(item.label, cx, yOffset + 326, {
          fontSize: 28, fontFamily: f.body, fontWeight: '400', lineHeight: 1.4,
          fill: labelColor, textAlign: 'center', originX: 'center',
          _isHeroText: true,
          _contentKey: `items[${i}].label`,
        }),
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b19: 제품 여정 (5단계 수평 흐름) ───────────────────────────────────
  'b19-journey': (yOffset, theme, content) => {
    const h = 400;
    const c = theme?.colors || { bg: '#ffffff', bgAlt: '#f8fafc', surface: '#f3f4f6', border: '#e5e7eb', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const sectionLabel = content?.label || '제품 여정';
    const defaults = [
      { step: '01', title: '원료 수급', desc: '엄선된 원료\n선별 및 수급' },
      { step: '02', title: '연구 개발', desc: '전문 연구진\n성분 배합' },
      { step: '03', title: '품질 검사', desc: '엄격한 기준\n품질 테스트' },
      { step: '04', title: '생산 완료', desc: '최적 공정\n제품 완성' },
      { step: '05', title: '고객 배송', desc: '안전 포장\n신속 배송' },
    ];
    const items = content?.items || defaults;
    const colW = CONTENT_W / 5;
    const cxs = items.map((_, i) => BLOCK_PADDING + colW * i + colW / 2);
    const circleY = yOffset + 210;
    const circleR = 38;
    const connColor = _isLightColor(c.bgAlt || c.bg) ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.18)';
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bgAlt || c.surface || '#f8fafc', 'left', '_isBg'),
      mkText(sectionLabel, ARTBOARD_W / 2, yOffset + 62, {
        fontSize: 20, fontFamily: f.body, fontWeight: '700',
        fill: c.subtext, textAlign: 'center', originX: 'center', charSpacing: 240,
        _contentKey: 'label',
      }),
      // 연결선
      mkRect(cxs[0] + circleR, circleY, cxs[4] - cxs[0] - circleR * 2, 2, connColor, 'left'),
    ];
    items.forEach((item, i) => {
      const cx = cxs[i];
      const isCenter = i === 2;
      const circleFill = isCenter ? (c.accent || '#2563eb') : (c.surface || '#ffffff');
      const circleBorder = isCenter ? 0 : 2;
      const numColor = isCenter ? '#ffffff' : (c.accent || '#2563eb');
      objs.push(
        new fabric.Circle({
          left: cx, top: circleY, radius: circleR, originX: 'center', originY: 'center',
          fill: circleFill, stroke: isCenter ? 'transparent' : (c.accent || '#2563eb'),
          strokeWidth: circleBorder, selectable: true,
        }),
        mkText(item.step, cx, circleY, {
          fontSize: 24, fontFamily: f.heading, fontWeight: '900',
          fill: numColor, textAlign: 'center', originX: 'center', originY: 'center',
          _contentKey: `items[${i}].step`,
        }),
        mkText(item.title, cx, yOffset + 278, {
          fontSize: 26, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: Math.floor(colW * 0.88),
          _contentKey: `items[${i}].title`,
        }),
        mkText(item.desc, cx, yOffset + 322, {
          fontSize: 22, fontFamily: f.body, lineHeight: 1.6,
          fill: c.subtext, textAlign: 'center', originX: 'center', width: Math.floor(colW * 0.88),
          _contentKey: `items[${i}].desc`,
        })
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b20: 전후 비교 (Before / After) ────────────────────────────────────
  'b20-comparison': (yOffset, theme, content) => {
    const h = 600;
    const c = theme?.colors || { bg: '#ffffff', text: '#111827', subtext: '#6b7280', accent: '#2563eb', border: '#e5e7eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const title = content?.title || '사용 전후 비교';
    const beforeLabel = content?.beforeLabel || 'BEFORE';
    const afterLabel  = content?.afterLabel  || 'AFTER';
    const imgW = (CONTENT_W - 20) / 2;  // 510
    const leftX  = BLOCK_PADDING;
    const rightX = BLOCK_PADDING + imgW + 20;
    const imgTop = yOffset + 180;
    const imgH   = 360;
    const lCx = leftX  + imgW / 2;
    const rCx = rightX + imgW / 2;
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
        mkText(title, ARTBOARD_W / 2, yOffset + 64, {
          fontSize: 46, fontFamily: f.heading, fontWeight: '800',
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
          _contentKey: 'title',
        }),
        // 구분선
        mkRect(ARTBOARD_W / 2, imgTop - 20, 1, imgH + 40, c.border || '#e5e7eb', 'left'),
        // BEFORE 라벨
        mkText(beforeLabel, lCx, yOffset + 148, {
          fontSize: 20, fontFamily: f.body, fontWeight: '700',
          fill: c.subtext, textAlign: 'center', originX: 'center', charSpacing: 200,
          _contentKey: 'beforeLabel',
        }),
        // AFTER 라벨
        mkText(afterLabel, rCx, yOffset + 148, {
          fontSize: 20, fontFamily: f.body, fontWeight: '700',
          fill: c.accent, textAlign: 'center', originX: 'center', charSpacing: 200,
          _isAccentText: true, _contentKey: 'afterLabel',
        }),
        // 이미지 플레이스홀더
        ...mkPlaceholder(leftX,  imgTop, imgW, imgH, '이미지 영역\n더블클릭하여 업로드', 0),
        ...mkPlaceholder(rightX, imgTop, imgW, imgH, '이미지 영역\n더블클릭하여 업로드', 1),
      ]
    };
  },

  // ─── b21: 혜택 4단 카드 ─────────────────────────────────────────────────
  'b21-benefit-4col': (yOffset, theme, content) => {
    const h = 480;
    const c = theme?.colors || { bg: '#ffffff', bgAlt: '#f8fafc', surface: '#f3f4f6', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const colW = CONTENT_W / 4;  // 260
    const cardPad = 10;
    const defaults = [
      { num: '01', title: '혜택 제목', desc: '이 혜택에 대한\n간결한 설명' },
      { num: '02', title: '혜택 제목', desc: '이 혜택에 대한\n간결한 설명' },
      { num: '03', title: '혜택 제목', desc: '이 혜택에 대한\n간결한 설명' },
      { num: '04', title: '혜택 제목', desc: '이 혜택에 대한\n간결한 설명' },
    ];
    const items = content?.items || defaults;
    const cardShadow = new fabric.Shadow({ color: 'rgba(0,0,0,0.07)', blur: 20, offsetX: 0, offsetY: 4 });
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bgAlt || c.surface || '#f8fafc', 'left', '_isBg'),
    ];
    items.forEach((item, i) => {
      const cardX = BLOCK_PADDING + colW * i + cardPad;
      const cardW = colW - cardPad * 2;
      const cx = BLOCK_PADDING + colW * i + colW / 2;
      objs.push(
        new fabric.Rect({
          left: cardX, top: yOffset + 50, width: cardW, height: h - 80,
          fill: c.bg || '#ffffff', shadow: cardShadow,
          selectable: true, stroke: 'transparent', strokeWidth: 0, _isSurface: true,
        }),
        mkText(item.num, cx, yOffset + 118, {
          fontSize: 64, fontFamily: f.heading, fontWeight: '900',
          fill: c.accent, textAlign: 'center', originX: 'center', _isAccentText: true,
          _contentKey: `items[${i}].num`,
        }),
        mkRect(cx - 16, yOffset + 210, 32, 3, c.accent, 'center', '_isAccent'),
        mkText(item.title, cx, yOffset + 236, {
          fontSize: 28, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: cardW - 30,
          _contentKey: `items[${i}].title`,
        }),
        mkText(item.desc, cx, yOffset + 306, {
          fontSize: 22, fontFamily: f.body, lineHeight: 1.7,
          fill: c.subtext, textAlign: 'center', originX: 'center', width: cardW - 30,
          _contentKey: `items[${i}].desc`,
        })
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b22: 대형 인용구 추천사 ─────────────────────────────────────────────
  'b22-testimonial': (yOffset, theme, content) => {
    const h = 460;
    const c = theme?.colors || { bg: '#ffffff', surface: '#f8fafc', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const quote  = content?.quote || '이 제품을 사용한 후 삶이 달라졌습니다.\n진심으로 주변 모든 분께 추천하고 싶어요.';
    const name   = content?.name   || '— 김○○ 구매자';
    const stars  = content?.stars  || '★★★★★';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.surface || c.bg, 'left', '_isBg'),
        // 장식용 대형 따옴표
        mkText('\u201C', 160, yOffset + 90, {
          fontSize: 200, fontFamily: f.heading, fontWeight: '900',
          fill: c.accent, textAlign: 'left', originX: 'center', _isAccentText: true,
        }),
        // 별점
        mkText(stars, ARTBOARD_W / 2, yOffset + 100, {
          fontSize: 32, fontFamily: f.body,
          fill: '#f59e0b', textAlign: 'center', originX: 'center',
          _contentKey: 'stars',
        }),
        // 인용문
        mkText(quote, ARTBOARD_W / 2, yOffset + 160, {
          fontSize: 36, fontFamily: f.heading, fontWeight: '700', lineHeight: 1.7,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: 820,
          _contentKey: 'quote',
        }),
        // 구분선
        mkRect(ARTBOARD_W / 2 - 24, yOffset + 378, 48, 2, c.accent, 'center', '_isAccent'),
        // 이름
        mkText(name, ARTBOARD_W / 2, yOffset + 400, {
          fontSize: 24, fontFamily: f.body, fontWeight: '400',
          fill: c.subtext, textAlign: 'center', originX: 'center',
          _contentKey: 'name',
        }),
      ]
    };
  },

  // ─── b23: 수직 타임라인 ──────────────────────────────────────────────────
  'b23-timeline': (yOffset, theme, content) => {
    const h = 660;
    const c = theme?.colors || { bg: '#ffffff', text: '#111827', subtext: '#6b7280', accent: '#2563eb', border: '#e5e7eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const lineX = 220;
    const dotR = 16;
    const defaults = [
      { year: '2020', title: '브랜드의 시작', desc: '작은 아이디어 하나로\n새로운 여정이 시작되었습니다.' },
      { year: '2022', title: '첫 제품 출시', desc: '수많은 연구와 개선을 거쳐\n첫 번째 제품이 탄생했습니다.' },
      { year: '2025', title: '지금 이 순간', desc: '여러분의 성원 덕분에\n더 나은 제품으로 보답합니다.' },
    ];
    const items = content?.items || defaults;
    const itemYs = [yOffset + 100, yOffset + 300, yOffset + 500];
    const connColor = _isLightColor(c.bg) ? (c.border || '#e5e7eb') : 'rgba(255,255,255,0.2)';
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
      mkRect(lineX, yOffset + 80, 2, h - 140, connColor, 'left'),
    ];
    items.forEach((item, i) => {
      const iy = itemYs[i];
      objs.push(
        mkCircle(lineX, iy + 20, dotR, c.accent, '_isAccent'),
        mkText(item.year || item.step || String(i + 1), lineX - dotR - 16, iy, {
          fontSize: 30, fontFamily: f.heading, fontWeight: '900',
          fill: c.accent, textAlign: 'right', originX: 'right', _isAccentText: true,
          _contentKey: `items[${i}].year`,
        }),
        mkText(item.title, lineX + dotR + 24, iy, {
          fontSize: 36, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, _isHeading: true, width: ARTBOARD_W - lineX - dotR - 24 - BLOCK_PADDING,
          _contentKey: `items[${i}].title`,
        }),
        mkText(item.desc, lineX + dotR + 24, iy + 52, {
          fontSize: 24, fontFamily: f.body, lineHeight: 1.65,
          fill: c.subtext, width: ARTBOARD_W - lineX - dotR - 24 - BLOCK_PADDING,
          _contentKey: `items[${i}].desc`,
        }),
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b24: 좌우 분할 ──────────────────────────────────────────────────────
  'b24-split-screen': (yOffset, theme, content) => {
    const h = 600;
    const c = theme?.colors || { bg: '#ffffff', bgAlt: '#f8fafc', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const halfW = ARTBOARD_W / 2;
    const cx = halfW + halfW / 2;
    const label = content?.label || 'FOR YOU';
    const title = content?.title || '새로운 관점';
    const desc = content?.desc || '혁신적인 접근 방식으로\n당신의 일상을 바꿉니다.\n지금 바로 경험해보세요.';
    return {
      height: h,
      objects: [
        ...mkPlaceholder(0, yOffset, halfW, h, '이미지 영역\n더블클릭하여 업로드', 0),
        mkRect(halfW, yOffset, halfW, h, c.bgAlt || c.surface || '#f8fafc', 'left', '_isBg'),
        mkText(label, cx, yOffset + 140, {
          fontSize: 18, fontFamily: f.body, fontWeight: '700',
          fill: c.accent, textAlign: 'center', originX: 'center', charSpacing: 320, _isAccentText: true,
          _contentKey: 'label',
        }),
        mkRect(cx - 20, yOffset + 174, 40, 3, c.accent, 'left', '_isAccent'),
        mkText(title, cx, yOffset + 196, {
          fontSize: 56, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: halfW - 80,
          _contentKey: 'title',
        }),
        mkText(desc, cx, yOffset + 370, {
          fontSize: 28, fontFamily: f.body, lineHeight: 1.75,
          fill: c.subtext, textAlign: 'center', originX: 'center', width: halfW - 80,
          _contentKey: 'desc',
        }),
      ]
    };
  },

  // ─── b25: 수치 인포그래픽 ────────────────────────────────────────────────
  'b25-stats': (yOffset, theme, content) => {
    const h = 340;
    const c = theme?.colors || { hero: '#1a1a1a', accent: '#ffffff', text: '#111827', subtext: '#6b7280' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const bgColor = c.hero || c.bg;
    const isLight = _isLightColor(bgColor);
    const numColor = isLight ? c.accent : (c.accent2 || '#ffffff');
    const labelColor = isLight ? c.subtext : 'rgba(255,255,255,0.65)';
    const divColor = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.15)';
    const defaults = [
      { value: '99%', label: '고객 만족도' },
      { value: '50만+', label: '누적 판매량' },
      { value: '5년', label: '연속 수상' },
    ];
    const items = content?.items || defaults;
    const colW = ARTBOARD_W / 3;
    const objs = [
      mkGradientRect(0, yOffset, ARTBOARD_W, h, bgColor, _darkenHex(bgColor, 28), '_isGradientHero'),
      mkRect(colW,     yOffset + 80, 1, h - 160, divColor, 'left'),
      mkRect(colW * 2, yOffset + 80, 1, h - 160, divColor, 'left'),
    ];
    items.forEach((item, i) => {
      const cx = colW * i + colW / 2;
      objs.push(
        mkText(item.value, cx, yOffset + 80, {
          fontSize: 88, fontFamily: f.heading, fontWeight: '900',
          fill: numColor, textAlign: 'center', originX: 'center', _isAccentText: true,
          _contentKey: `items[${i}].value`,
        }),
        mkText(item.label, cx, yOffset + 230, {
          fontSize: 26, fontFamily: f.body,
          fill: labelColor, textAlign: 'center', originX: 'center', width: colW - 40,
          _contentKey: `items[${i}].label`,
        }),
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b26: 브랜드 선언 ────────────────────────────────────────────────────
  'b26-manifesto': (yOffset, theme, content) => {
    const h = 480;
    const c = theme?.colors || { bg: '#ffffff', bgAlt: '#f8fafc', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const heading = content?.heading || '우리는 제품을 만들지 않습니다.';
    const body = content?.body || '우리는 경험을 만듭니다. 시간이 지나도 변치 않는 가치,\n지속 가능한 아름다움, 그리고 당신의 일상에 스며드는 편안함.\n이것이 우리가 추구하는 핵심입니다.';
    const tagline = content?.tagline || '품질로 말하다. 진심으로 전하다.';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bgAlt || c.surface || '#f8fafc', 'left', '_isBg'),
        mkRect(ARTBOARD_W / 2 - 30, yOffset + 64, 60, 3, c.accent, 'left', '_isAccent'),
        mkText(heading, ARTBOARD_W / 2, yOffset + 90, {
          fontSize: 54, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.3,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: 900,
          _contentKey: 'heading',
        }),
        mkText(body, ARTBOARD_W / 2, yOffset + 226, {
          fontSize: 26, fontFamily: f.body, lineHeight: 1.85,
          fill: c.subtext, textAlign: 'center', originX: 'center', width: 860,
          _contentKey: 'body',
        }),
        mkRect(ARTBOARD_W / 2 - 240, yOffset + 400, 480, 1, c.accent, 'left', '_isAccent'),
        mkText(tagline, ARTBOARD_W / 2, yOffset + 418, {
          fontSize: 28, fontFamily: f.heading, fontWeight: '700',
          fill: c.accent, textAlign: 'center', originX: 'center', _isAccentText: true,
          _contentKey: 'tagline',
        }),
      ]
    };
  },

  // ─── b27: 고객 사진 그리드 (UGC) ────────────────────────────────────────
  'b27-ugc-grid': (yOffset, theme, content) => {
    const h = 600;
    const c = theme?.colors || { bg: '#ffffff', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const label = content?.label || '고객 사진';
    const captions = content?.captions || ['@customer1', '@customer2', '@customer3', '@customer4', '@customer5'];
    const gap = 8;
    const largeW = Math.floor(CONTENT_W * 0.42);
    const smallW = Math.floor((CONTENT_W - largeW - gap * 2) / 2) - gap;
    const largeH = h - 140;
    const smallH = Math.floor((largeH - gap) / 2);
    const gridX = BLOCK_PADDING + largeW + gap * 2;
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
      mkText(label, ARTBOARD_W / 2, yOffset + 28, {
        fontSize: 22, fontFamily: f.body, fontWeight: '700',
        fill: c.accent, textAlign: 'center', originX: 'center', charSpacing: 280, _isAccentText: true,
        _contentKey: 'label',
      }),
      ...mkPlaceholder(BLOCK_PADDING, yOffset + 76, largeW, largeH, '이미지\n더블클릭', 0),
      mkText(captions[0] || '@customer1', BLOCK_PADDING + largeW / 2, yOffset + 76 + largeH + 8, {
        fontSize: 20, fontFamily: f.body, fill: c.subtext, textAlign: 'center', originX: 'center',
        _contentKey: 'captions[0]',
      }),
    ];
    [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([col, row], i) => {
      const sx = gridX + col * (smallW + gap);
      const sy = yOffset + 76 + row * (smallH + gap);
      objs.push(
        ...mkPlaceholder(sx, sy, smallW, smallH, '이미지', i + 1),
        mkText(captions[i + 1] || `@customer${i + 2}`, sx + smallW / 2, sy + smallH + 4, {
          fontSize: 18, fontFamily: f.body, fill: c.subtext, textAlign: 'center', originX: 'center',
          _contentKey: `captions[${i + 1}]`,
        }),
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b28: FAQ ────────────────────────────────────────────────────────────
  'b28-faq': (yOffset, theme, content) => {
    const h = 700;
    const c = theme?.colors || { bg: '#ffffff', bgAlt: '#f8fafc', text: '#111827', subtext: '#6b7280', accent: '#2563eb', border: '#e5e7eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const title = content?.title || '자주 묻는 질문';
    const defaults = [
      { q: '제품 보증 기간은 어떻게 되나요?', a: '구매일로부터 1년간 무상 보증을 지원합니다.' },
      { q: '배송은 얼마나 걸리나요?', a: '주문 확인 후 1~2영업일 이내에 출고되며,\n평균 2~3일 내 수령 가능합니다.' },
      { q: '교환 및 환불이 가능한가요?', a: '수령 후 7일 이내 미사용 상태라면\n교환 및 환불이 가능합니다.' },
      { q: '해외 배송도 가능한가요?', a: '현재 국내 배송만 지원하고 있습니다.\n해외 배송은 추후 안내드릴 예정입니다.' },
    ];
    const items = content?.items || defaults;
    const itemH = 140;
    const startY = yOffset + 110;
    const lineColor = c.border || '#e5e7eb';
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bgAlt || '#f8fafc', 'left', '_isBg'),
      mkText(title, ARTBOARD_W / 2, yOffset + 40, {
        fontSize: 42, fontFamily: f.heading, fontWeight: '800',
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        _contentKey: 'title',
      }),
      mkRect(BLOCK_PADDING, startY, CONTENT_W, 1, lineColor, 'left'),
    ];
    items.forEach((item, i) => {
      const iy = startY + i * itemH;
      objs.push(
        mkText(item.q, BLOCK_PADDING, iy + 18, {
          fontSize: 24, fontFamily: f.heading, fontWeight: '700',
          fill: c.text, width: CONTENT_W, _isHeading: true,
          _contentKey: `items[${i}].q`,
        }),
        mkText(item.a, BLOCK_PADDING, iy + 58, {
          fontSize: 22, fontFamily: f.body, lineHeight: 1.65,
          fill: c.subtext, width: CONTENT_W,
          _contentKey: `items[${i}].a`,
        }),
        mkRect(BLOCK_PADDING, iy + itemH, CONTENT_W, 1, lineColor, 'left'),
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b29: 이미지+오버랩 카드 ────────────────────────────────────────────
  'b29-img-overlay': (yOffset, theme, content) => {
    const h = 620;
    const c = theme?.colors || { bg: '#ffffff', surface: '#ffffff', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const title = content?.title || '디자인과 기능의 완벽한 조화';
    const desc = content?.desc || '작은 디테일 하나까지 놓치지 않았습니다.\n최고의 품질, 최고의 경험.';
    const cardW = 440;
    const cardH = 220;
    const cardX = BLOCK_PADDING;
    const cardY = yOffset + h - cardH - 50;
    const cardShadow = new fabric.Shadow({ color: 'rgba(0,0,0,0.22)', blur: 28, offsetX: 0, offsetY: 8 });
    return {
      height: h,
      objects: [
        ...mkPlaceholder(0, yOffset, ARTBOARD_W, h - 20, '이미지 영역\n더블클릭하여 업로드', 0),
        new fabric.Rect({
          left: cardX, top: cardY, width: cardW, height: cardH,
          fill: c.surface || '#ffffff', shadow: cardShadow,
          selectable: true, stroke: 'transparent', strokeWidth: 0, _isSurface: true,
        }),
        mkRect(cardX, cardY, 5, cardH, c.accent, 'left', '_isAccent'),
        mkText(title, cardX + 28, cardY + 30, {
          fontSize: 34, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, _isHeading: true, width: cardW - 48,
          _contentKey: 'title',
        }),
        mkText(desc, cardX + 28, cardY + 120, {
          fontSize: 24, fontFamily: f.body, lineHeight: 1.7,
          fill: c.subtext, width: cardW - 48,
          _contentKey: 'desc',
        }),
      ]
    };
  },

  // ─── b30: 번호 프로세스 ──────────────────────────────────────────────────
  'b30-process-num': (yOffset, theme, content) => {
    const h = 680;
    const c = theme?.colors || { bg: '#ffffff', text: '#111827', subtext: '#6b7280', accent: '#2563eb', border: '#e5e7eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const title = content?.title || '제작 과정';
    const defaults = [
      { num: '01', title: '원료 선정', desc: '엄격한 기준으로 최상의 원료를 선별합니다.\n품질이 모든 것의 시작입니다.' },
      { num: '02', title: '전문 제조', desc: '숙련된 전문가가 최적의 공정으로 제조합니다.\n세심한 손길로 완성도를 높입니다.' },
      { num: '03', title: '품질 검증', desc: '출고 전 엄격한 품질 검사를 진행합니다.\n기준을 통과한 제품만 고객께 전달됩니다.' },
    ];
    const items = content?.items || defaults;
    const rowH = 170;
    const numW = 160;
    const startY = yOffset + 110;
    const lineColor = c.border || '#e5e7eb';
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
      mkText(title, ARTBOARD_W / 2, yOffset + 40, {
        fontSize: 42, fontFamily: f.heading, fontWeight: '800',
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        _contentKey: 'title',
      }),
      mkRect(BLOCK_PADDING, startY, CONTENT_W, 1, lineColor, 'left'),
    ];
    items.forEach((item, i) => {
      const ry = startY + i * rowH;
      objs.push(
        mkText(item.num, BLOCK_PADDING + numW / 2, ry + 44, {
          fontSize: 72, fontFamily: f.heading, fontWeight: '900',
          fill: c.accent, textAlign: 'center', originX: 'center', _isAccentText: true,
          _contentKey: `items[${i}].num`,
        }),
        mkText(item.title, BLOCK_PADDING + numW + 30, ry + 30, {
          fontSize: 34, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, _isHeading: true, width: CONTENT_W - numW - 30,
          _contentKey: `items[${i}].title`,
        }),
        mkText(item.desc, BLOCK_PADDING + numW + 30, ry + 80, {
          fontSize: 24, fontFamily: f.body, lineHeight: 1.65,
          fill: c.subtext, width: CONTENT_W - numW - 30,
          _contentKey: `items[${i}].desc`,
        }),
        mkRect(BLOCK_PADDING, ry + rowH, CONTENT_W, 1, lineColor, 'left'),
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b31: 엇갈린 레이아웃 ───────────────────────────────────────────────
  'b31-staggered': (yOffset, theme, content) => {
    const rowH = 480;
    const h = rowH * 2;
    const c = theme?.colors || { bg: '#ffffff', surface: '#f8fafc', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const imgW = Math.floor(ARTBOARD_W * 0.58);
    const textW = ARTBOARD_W - imgW;
    const defaults = [
      { title: '완벽한 디자인', desc: '모든 라인과 곡선 하나까지\n정밀하게 설계되었습니다.\n시각적 아름다움과 실용성을 동시에.' },
      { title: '탁월한 소재', desc: '최고급 원재료만을 엄선하여\n내구성과 편안함을 모두 갖췄습니다.\n직접 사용해보시면 차이를 느낄 수 있습니다.' },
    ];
    const items = content?.items || defaults;
    const cx1 = imgW + textW / 2;
    const cx2 = textW / 2;
    return {
      height: h,
      objects: [
        ...mkPlaceholder(0, yOffset, imgW, rowH, '이미지 영역\n더블클릭하여 업로드', 0),
        mkRect(imgW, yOffset, textW, rowH, c.surface || c.bg, 'left', '_isBg'),
        mkRect(cx1 - 18, yOffset + 148, 36, 4, c.accent, 'left', '_isAccent'),
        mkText(items[0]?.title || defaults[0].title, cx1, yOffset + 170, {
          fontSize: 52, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: textW - 60,
          _contentKey: 'items[0].title',
        }),
        mkText(items[0]?.desc || defaults[0].desc, cx1, yOffset + 302, {
          fontSize: 26, fontFamily: f.body, lineHeight: 1.75,
          fill: c.subtext, textAlign: 'center', originX: 'center', width: textW - 60,
          _contentKey: 'items[0].desc',
        }),
        mkRect(0, yOffset + rowH, textW, rowH, c.bg, 'left', '_isSurface'),
        ...mkPlaceholder(textW, yOffset + rowH, imgW, rowH, '이미지 영역\n더블클릭하여 업로드', 1),
        mkRect(cx2 - 18, yOffset + rowH + 148, 36, 4, c.accent, 'left', '_isAccent'),
        mkText(items[1]?.title || defaults[1].title, cx2, yOffset + rowH + 170, {
          fontSize: 52, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: textW - 60,
          _contentKey: 'items[1].title',
        }),
        mkText(items[1]?.desc || defaults[1].desc, cx2, yOffset + rowH + 302, {
          fontSize: 26, fontFamily: f.body, lineHeight: 1.75,
          fill: c.subtext, textAlign: 'center', originX: 'center', width: textW - 60,
          _contentKey: 'items[1].desc',
        }),
      ]
    };
  },

  // ─── b32: 재료/성분 그리드 ───────────────────────────────────────────────
  'b32-ingredient': (yOffset, theme, content) => {
    const h = 640;
    const c = theme?.colors || { bg: '#ffffff', bgAlt: '#f8fafc', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const title = content?.title || '핵심 원료';
    const mainLabel = content?.mainLabel || '완성품';
    const gap = 16;
    const sideW = 200;
    const sideH = 160;
    const mainW = CONTENT_W - sideW * 2 - gap * 4;
    const mainH = sideH * 2 + gap;
    const mainX = BLOCK_PADDING + sideW + gap * 2;
    const mainY = yOffset + 120;
    const leftX = BLOCK_PADDING;
    const rightX = mainX + mainW + gap * 2;
    const sideYs = [mainY, mainY + sideH + gap];
    const defaultLabels = content?.labels || ['원재료 A', '원재료 B', '원재료 C', '원재료 D'];
    const connColor = c.accent;
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bgAlt || '#f8fafc', 'left', '_isBg'),
      mkText(title, ARTBOARD_W / 2, yOffset + 44, {
        fontSize: 42, fontFamily: f.heading, fontWeight: '800',
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        _contentKey: 'title',
      }),
      ...mkPlaceholder(mainX, mainY, mainW, mainH, '메인\n이미지', 0),
      mkText(mainLabel, mainX + mainW / 2, mainY + mainH + 10, {
        fontSize: 22, fontFamily: f.body, fontWeight: '700',
        fill: c.accent, textAlign: 'center', originX: 'center', _isAccentText: true,
        _contentKey: 'mainLabel',
      }),
      mkRect(leftX + sideW, mainY + sideH / 2, gap * 2, 1, connColor, 'left', '_isAccent'),
      mkRect(leftX + sideW, mainY + sideH + gap + sideH / 2, gap * 2, 1, connColor, 'left', '_isAccent'),
      mkRect(rightX - gap * 2, mainY + sideH / 2, gap * 2, 1, connColor, 'left', '_isAccent'),
      mkRect(rightX - gap * 2, mainY + sideH + gap + sideH / 2, gap * 2, 1, connColor, 'left', '_isAccent'),
    ];
    sideYs.forEach((sy, row) => {
      objs.push(
        ...mkPlaceholder(leftX, sy, sideW, sideH, '재료', row),
        mkText(defaultLabels[row] || `원재료 ${row + 1}`, leftX + sideW / 2, sy + sideH + 6, {
          fontSize: 20, fontFamily: f.body, fill: c.subtext, textAlign: 'center', originX: 'center',
          _contentKey: `labels[${row}]`,
        }),
        ...mkPlaceholder(rightX, sy, sideW, sideH, '재료', row + 2),
        mkText(defaultLabels[row + 2] || `원재료 ${row + 3}`, rightX + sideW / 2, sy + sideH + 6, {
          fontSize: 20, fontFamily: f.body, fill: c.subtext, textAlign: 'center', originX: 'center',
          _contentKey: `labels[${row + 2}]`,
        }),
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b33: 제작자 스토리 ──────────────────────────────────────────────────
  'b33-creator-story': (yOffset, theme, content) => {
    const h = 500;
    const c = theme?.colors || { bg: '#ffffff', bgAlt: '#f8fafc', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const quote = content?.quote || '"제가 직접 만들고 가족에게도 먹이는 제품입니다.\n품질에 대해서만큼은 절대 타협하지 않습니다."';
    const name = content?.name || '김○○ 대표';
    const role = content?.role || '10년 경력 장인';
    const imgSize = 190;
    const imgX = BLOCK_PADDING + 30;
    const imgCy = yOffset + h / 2;
    const textX = imgX + imgSize + 60;
    const textW = ARTBOARD_W - textX - BLOCK_PADDING;
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bgAlt || '#f8fafc', 'left', '_isBg'),
        ...mkPlaceholder(imgX, imgCy - imgSize / 2, imgSize, imgSize, '인물\n사진', 0),
        mkText('\u201C', textX - 10, yOffset + 50, {
          fontSize: 160, fontFamily: f.heading, fontWeight: '900',
          fill: c.accent, originX: 'left', _isAccentText: true,
        }),
        mkText(quote, textX, yOffset + 140, {
          fontSize: 30, fontFamily: f.heading, fontWeight: '700', lineHeight: 1.75,
          fill: c.text, _isHeading: true, width: textW,
          _contentKey: 'quote',
        }),
        mkText(name, textX, yOffset + 390, {
          fontSize: 26, fontFamily: f.body, fontWeight: '700',
          fill: c.accent, _isAccentText: true,
          _contentKey: 'name',
        }),
        mkText(role, textX, yOffset + 428, {
          fontSize: 22, fontFamily: f.body,
          fill: c.subtext,
          _contentKey: 'role',
        }),
      ]
    };
  },

  // ─── b34: 매거진 레이아웃 ────────────────────────────────────────────────
  'b34-magazine': (yOffset, theme, content) => {
    const h = 580;
    const c = theme?.colors || { bg: '#ffffff', surface: '#f8fafc', text: '#111827', subtext: '#6b7280', accent: '#2563eb' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const gap = 16;
    const largeW = Math.floor(ARTBOARD_W * 0.58);
    const rightW = ARTBOARD_W - largeW - gap;
    const smallH = Math.floor(h * 0.44);
    const textBlockH = h - smallH - gap;
    const title = content?.title || 'Urban Explorer';
    const desc = content?.desc || '도시의 어떤 환경에도\n자연스럽게 녹아듭니다.\n감각적인 디자인, 실용적인 기능.';
    const caption = content?.caption || '라이프스타일 컷';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
        ...mkPlaceholder(0, yOffset, largeW, h, '메인 이미지\n더블클릭하여 업로드', 0),
        mkRect(largeW + gap, yOffset, rightW, textBlockH, c.surface || '#f8fafc', 'left', '_isSurface'),
        mkRect(largeW + gap + 20, yOffset + 52, 4, 64, c.accent, 'left', '_isAccent'),
        mkText(title, largeW + gap + 44, yOffset + 52, {
          fontSize: 52, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: c.text, _isHeading: true, width: rightW - 64,
          _contentKey: 'title',
        }),
        mkText(desc, largeW + gap + 44, yOffset + 190, {
          fontSize: 24, fontFamily: f.body, lineHeight: 1.8,
          fill: c.subtext, width: rightW - 64,
          _contentKey: 'desc',
        }),
        ...mkPlaceholder(largeW + gap, yOffset + h - smallH, rightW, smallH, '서브 이미지\n더블클릭', 1),
        mkText(caption, largeW + gap + rightW / 2, yOffset + h - smallH + 14, {
          fontSize: 18, fontFamily: f.body, fontWeight: '700',
          fill: 'rgba(255,255,255,0.9)', textAlign: 'center', originX: 'center',
          _contentKey: 'caption',
        }),
      ]
    };
  },

  // ─── b35: 스킨케어 히어로 (SES SAKNOON CLEANSER 스타일) ─────────────────
  // 크림 베이지 배경 · 중앙 제품 이미지 · 브랜드 라벨 · 세리프 제품명
  'b35-skincare-hero': (yOffset, theme, content) => {
    const h = 1060;
    const c = theme?.colors || {};
    const f = theme?.fonts || { heading: 'Nanum Myeongjo', body: 'Noto Serif KR' };
    const hw = theme?.headingWeight || '700';
    const bgColor   = c.hero || c.bg || '#EDE4D6';
    const isLight   = _isLightColor(bgColor);
    const titleColor = isLight ? (c.text || '#2C1A0E') : '#ffffff';
    const subColor   = isLight ? (c.subtext || '#6B4E34') : 'rgba(255,255,255,0.72)';
    const accentColor = isLight ? (c.accent || '#8B7355') : '#ffffff';
    const brand    = content?.brand    || 'BRAND NAME';
    const title    = content?.title    || '제품명을 입력하세요';
    const subtitle = content?.subtitle || '핵심 성분 · 특징 · 인증';
    const cx = ARTBOARD_W / 2;
    const imgSize = 380;
    const circleCenter = yOffset + h * 0.48;   // 원 중심 Y
    const imgY = circleCenter - imgSize / 2;   // 이미지 중심을 원 중심에 정렬
    const titleY = imgY + imgSize + 52;
    const divY = titleY + Math.ceil(title.split('\n').length * 68 * 1.3) + 20;
    const subY = divY + 22;
    // 배경 대형 원형 장식
    const decorFill = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, bgColor, 'left', '_isHero'),
        new fabric.Circle({
          left: cx, top: circleCenter,
          radius: h * 0.38, originX: 'center', originY: 'center',
          fill: decorFill, selectable: false, evented: false,
          hoverCursor: 'default', stroke: 'transparent', strokeWidth: 0, _isDecor: true,
        }),
        // 브랜드 라벨 (레터스페이싱, 상단 고정)
        mkText(brand, cx, yOffset + 64, {
          fontSize: 24, fontFamily: f.body, fontWeight: '400', charSpacing: 360,
          fill: subColor, textAlign: 'center', originX: 'center', _isHeroText: true,
          _contentKey: 'brand',
        }),
        // 얇은 상단 구분선
        mkRect(cx - 28, yOffset + 100, 56, 1, accentColor, 'left', '_isHeroDivider'),
        // 제품 이미지 (정사각형, 원 중심 정렬)
        ...mkPlaceholder(cx - imgSize / 2, imgY, imgSize, imgSize, '제품 이미지\n더블클릭하여 업로드', 0),
        // 제품명 (세리프, 중앙)
        mkText(title, cx, titleY, {
          fontSize: 68, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.3,
          fill: titleColor, textAlign: 'center', originX: 'center',
          _isHeading: true, _isHeroText: true, width: 860,
          _contentKey: 'title',
        }),
        // 하단 구분선
        mkRect(cx - 24, divY, 48, 1, accentColor, 'left', '_isHeroDivider'),
        // 부제목
        mkText(subtitle, cx, subY, {
          fontSize: 28, fontFamily: f.body, fontWeight: '400', lineHeight: 1.7, charSpacing: 60,
          fill: subColor, textAlign: 'center', originX: 'center', _isHeroText: true, width: 760,
          _contentKey: 'subtitle',
        }),
      ],
    };
  },

  // ─── b36: 다크 이미지 텍스트 오버레이 히어로 (CERAMIC FRYING PAN 스타일) ──
  // 풀블리드 다크 사진 · 상단 그라디언트 오버레이 · 텍스트 직접 오버레이
  'b36-dark-overlay-hero': (yOffset, theme, content) => {
    const h = 840;
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '800';
    const label = content?.label || 'PREMIUM';
    const title = content?.title || '제품명을 입력하세요';
    const desc  = content?.desc  || '제품의 핵심 특징을 간결하게 설명하세요.';
    const textX = BLOCK_PADDING;
    const textW = 700;
    return {
      height: h,
      objects: [
        // 다크 이미지 플레이스홀더
        ...mkPlaceholder(0, yOffset, ARTBOARD_W, h, '다크 컨셉 이미지\n더블클릭하여 업로드', 0),
        // 상단 → 중간 다크 그라디언트 오버레이 (텍스트 가독성)
        mkGradientRect(0, yOffset, ARTBOARD_W, h * 0.68, 'rgba(0,0,0,0.62)', 'rgba(0,0,0,0)', '_isDecor'),
        // 브랜드/카테고리 라벨 (Cormorant Garamond 이탤릭 — 럭셔리 영문 세리프)
        mkText(label, textX, yOffset + 110, {
          fontSize: 22, fontFamily: 'Cormorant Garamond', fontWeight: '400', fontStyle: 'italic', charSpacing: 280,
          fill: 'rgba(255,255,255,0.75)', textAlign: 'left', originX: 'left',
          _contentKey: 'label',
        }),
        // 얇은 구분선
        mkRect(textX, yOffset + 148, 56, 1, 'rgba(255,255,255,0.45)', 'left'),
        // 대형 제품명 (Noto Serif KR, 화이트)
        mkText(title, textX, yOffset + 170, {
          fontSize: 86, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.15,
          fill: '#ffffff', textAlign: 'left', originX: 'left',
          _isHeading: true, _isHeroText: true, width: textW,
          _contentKey: 'title',
        }),
        // 설명 텍스트 (얇은 Noto Sans, 화이트)
        mkText(desc, textX, yOffset + 430, {
          fontSize: 28, fontFamily: f.body, fontWeight: '300', lineHeight: 1.75,
          fill: 'rgba(255,255,255,0.80)', textAlign: 'left', originX: 'left', width: textW,
          _contentKey: 'desc',
        }),
      ],
    };
  },

  // ─── b37: 볼드 제품 배너 (ORIGINAL MINT 스타일) ───────────────────────────
  // 솔리드 강렬한 배경 · 좌측 브랜드+제품명 · 우측 제품 이미지
  'b37-bold-product-banner': (yOffset, theme, content) => {
    const h = 700;
    const c = theme?.colors || {};
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '900';
    const bgColor   = c.hero || '#CC2200';
    const isLight   = _isLightColor(bgColor);
    const whiteText = isLight ? (c.text || '#111111') : '#ffffff';
    const dimText   = isLight ? (c.subtext || '#444444') : 'rgba(255,255,255,0.72)';
    const accentCol = isLight ? c.accent : 'rgba(255,255,255,0.30)';
    const brand    = content?.brand    || 'BRAND';
    const title    = content?.title    || '제품명';
    const tagline  = content?.tagline  || 'The Great Balance of Natural Extracts';
    const specs    = content?.specs    || 'Natural Extracts  ·  Safe To Use';
    const textX  = BLOCK_PADDING;
    const textW  = ARTBOARD_W * 0.52 - BLOCK_PADDING;
    const imgX   = Math.round(ARTBOARD_W * 0.54);
    const imgW   = ARTBOARD_W - imgX;
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, bgColor, 'left', '_isHero'),
        // 우측 이미지 영역
        ...mkPlaceholder(imgX, yOffset, imgW, h, '제품 이미지\n더블클릭하여 업로드', 0),
        // 브랜드명 (레터스페이싱)
        mkText(brand, textX, yOffset + 130, {
          fontSize: 24, fontFamily: 'Bebas Neue', fontWeight: '400', charSpacing: 360,
          fill: dimText, textAlign: 'left', originX: 'left', _isHeroText: true,
          _contentKey: 'brand',
        }),
        // 얇은 구분선
        mkRect(textX, yOffset + 170, 48, 2, accentCol, 'left'),
        // 대형 제품명 (Bebas Neue — 임팩트 디스플레이)
        mkText(title, textX, yOffset + 188, {
          fontSize: 110, fontFamily: 'Bebas Neue', fontWeight: '400', lineHeight: 1.0,
          fill: whiteText, textAlign: 'left', originX: 'left',
          _isHeading: true, _isHeroText: true, width: textW,
          _contentKey: 'title',
        }),
        // 태그라인
        mkText(tagline, textX, yOffset + 452, {
          fontSize: 27, fontFamily: f.body, fontWeight: '300', lineHeight: 1.7,
          fill: dimText, textAlign: 'left', originX: 'left', width: textW,
          _contentKey: 'tagline',
        }),
        // 스펙/성분 텍스트
        mkText(specs, textX, yOffset + 568, {
          fontSize: 24, fontFamily: f.body, fontWeight: '300', charSpacing: 40,
          fill: dimText, textAlign: 'left', originX: 'left', width: textW,
          _contentKey: 'specs',
        }),
      ],
    };
  },

  // ─── b38: 코스메틱 그라디언트 히어로 (BLISS TINT 스타일) ─────────────────
  // 소프트 핑크 배경 · 좌측 대형 제목+배지 · 우측 모델/제품 이미지
  'b38-cosmetic-hero': (yOffset, theme, content) => {
    const h = 800;
    const c = theme?.colors || {};
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '800';
    const bgColor   = c.hero || '#FFADC2';
    const isLight   = _isLightColor(bgColor);
    const titleColor = isLight ? (c.text || '#2D0015') : '#ffffff';
    const subColor   = isLight ? (c.subtext || '#7A2045') : 'rgba(255,255,255,0.78)';
    const badgeBg    = isLight ? (c.accent || '#E83265') : 'rgba(255,255,255,0.22)';
    const badgeText  = isLight ? '#ffffff' : '#ffffff';
    const label    = content?.label    || 'Color Cosmetic';
    const title    = content?.title    || '제품명을 입력하세요';
    const subtitle = content?.subtitle || '제품 타입 · 주요 기능';
    const badge1   = content?.badge1   || 'SPF40 PA++';
    const badge2   = content?.badge2   || 'Vegan';
    const hashtags = content?.hashtags || ['#데일리립', '#촉촉립', '#롱래스팅'];
    const textX = BLOCK_PADDING;
    const textW = Math.round(ARTBOARD_W * 0.56) - BLOCK_PADDING;
    const imgX  = Math.round(ARTBOARD_W * 0.58);
    const imgW  = ARTBOARD_W - imgX;
    // 배경 소프트 글로우 (밝은 원형 오버레이)
    const glowFill = isLight ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.10)';
    return {
      height: h,
      objects: [
        // 그라디언트 배경 (좌상→우하 대각선, 연한 핑크→진한 핑크)
        (() => {
          const lightColor = _lightenHex(bgColor, 50);
          const darkColor  = _darkenHex(bgColor, 28);
          const grad = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels',
            coords: { x1: 0, y1: 0, x2: ARTBOARD_W, y2: h },
            colorStops: [
              { offset: 0,    color: lightColor },
              { offset: 0.55, color: bgColor },
              { offset: 1,    color: darkColor },
            ],
          });
          return new fabric.Rect({
            left: 0, top: yOffset, width: ARTBOARD_W, height: h,
            fill: grad, selectable: true, stroke: 'transparent', strokeWidth: 0,
            lockMovementX: true, lockMovementY: true, lockScalingX: true, lockScalingY: true,
            lockRotation: true, hasControls: false, _isGradientHero: true,
          });
        })(),
        // 소프트 원형 글로우 장식
        new fabric.Circle({
          left: Math.round(ARTBOARD_W * 0.60), top: yOffset + h * 0.38,
          radius: h * 0.50, originX: 'center', originY: 'center',
          fill: glowFill, selectable: false, evented: false,
          hoverCursor: 'default', stroke: 'transparent', strokeWidth: 0, _isDecor: true,
        }),
        // 우측 모델/제품 이미지
        ...mkPlaceholder(imgX, yOffset, imgW, h, '모델/제품 이미지\n더블클릭하여 업로드', 0),
        // 카테고리 라벨 (Cormorant Garamond — 우아한 영문 세리프)
        mkText(label, textX, yOffset + 148, {
          fontSize: 22, fontFamily: 'Cormorant Garamond', fontWeight: '400', charSpacing: 320,
          fontStyle: 'italic',
          fill: subColor, textAlign: 'left', originX: 'left', _isHeroText: true,
          _contentKey: 'label',
        }),
        // 얇은 구분선
        mkRect(textX, yOffset + 182, 40, 1, subColor, 'left'),
        // 대형 제품명 (Noto Serif KR 얇은 세리프 → 고급 감성)
        mkText(title, textX, yOffset + 200, {
          fontSize: 78, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.25,
          fill: titleColor, textAlign: 'left', originX: 'left',
          _isHeading: true, _isHeroText: true, width: textW,
          _contentKey: 'title',
        }),
        // 제품 부제 (얇은 Noto Sans)
        mkText(subtitle, textX, yOffset + 450, {
          fontSize: 30, fontFamily: f.body, fontWeight: '300', lineHeight: 1.6,
          charSpacing: 60,
          fill: subColor, textAlign: 'left', originX: 'left', width: textW,
          _contentKey: 'subtitle',
        }),
        // 배지 1
        new fabric.Rect({
          left: textX, top: yOffset + 520, width: 172, height: 48,
          rx: 24, ry: 24, fill: badgeBg,
          selectable: true, stroke: 'transparent', strokeWidth: 0,
        }),
        mkText(badge1, textX + 86, yOffset + 520 + 24, {
          fontSize: 21, fontFamily: f.body, fontWeight: '400',
          fill: badgeText, textAlign: 'center', originX: 'center', originY: 'center',
          charSpacing: 40,
          _contentKey: 'badge1',
        }),
        // 배지 2
        new fabric.Rect({
          left: textX + 184, top: yOffset + 520, width: 120, height: 48,
          rx: 24, ry: 24, fill: badgeBg,
          selectable: true, stroke: 'transparent', strokeWidth: 0,
        }),
        mkText(badge2, textX + 244, yOffset + 520 + 24, {
          fontSize: 21, fontFamily: f.body, fontWeight: '400',
          fill: badgeText, textAlign: 'center', originX: 'center', originY: 'center',
          charSpacing: 40,
          _contentKey: 'badge2',
        }),
        // 해시태그 필 배지들
        ...(() => {
          const pillH = 40;
          const pillY = yOffset + 610;
          const pillPadX = 22;
          const gap = 12;
          const pillColor = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.18)';
          const pillTextColor = isLight ? (c.text || '#2D0015') : '#ffffff';
          const items = [];
          let px = textX;
          hashtags.forEach((tag) => {
            const charW = 19;
            const pillW = tag.length * charW + pillPadX * 2;
            items.push(new fabric.Rect({
              left: px, top: pillY, width: pillW, height: pillH,
              rx: pillH / 2, ry: pillH / 2, fill: pillColor,
              selectable: false, evented: false, stroke: 'transparent', strokeWidth: 0, _isDecor: true,
            }));
            items.push(mkText(tag, px + pillW / 2, pillY + pillH / 2, {
              fontSize: 19, fontFamily: f.body, fontWeight: '400',
              fill: pillTextColor, textAlign: 'center', originX: 'center', originY: 'center',
              _isDecor: true,
            }));
            px += pillW + gap;
          });
          return items;
        })(),
      ],
    };
  },

  // ─── b39: 미니멀 에디토리얼 히어로 (TOUCH OF KOREA 스타일) ──────────────
  // 순백 배경 · 얇은 라인 · 세리프 대형 제목 · 여백 극대화
  'b39-minimal-hero': (yOffset, theme, content) => {
    const h = 740;
    const c = theme?.colors || {};
    const f = theme?.fonts || { heading: 'Nanum Myeongjo', body: 'Noto Sans KR' };
    const hw = theme?.headingWeight || '700';
    const bgColor    = c.bg    || '#FFFFFF';
    const textColor  = c.text  || '#222222';
    const subColor   = c.subtext  || '#666666';
    const accentColor = c.accent || '#5A5550';
    const cx = ARTBOARD_W / 2;
    const label    = content?.label    || 'LIFESTYLE CLASS';
    const title    = content?.title    || '브랜드 이름';
    const subtitle = content?.subtitle || '브랜드 슬로건 또는 카테고리 소개 문구';
    const titleFontSize = 88;
    const titleLines = title.split('\n').length;
    const titleEndY = yOffset + 340 + Math.ceil(titleLines * titleFontSize * 1.2);
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, bgColor, 'left', '_isBg'),
        // 상단 얇은 가로선
        mkRect(cx - 80, yOffset + 100, 160, 1, accentColor, 'left', '_isAccent'),
        // 카테고리 라벨 (레터스페이싱, 소문자 금지 — 영문 대문자)
        mkText(label, cx, yOffset + 118, {
          fontSize: 17, fontFamily: f.body, fontWeight: '400', charSpacing: 360,
          fill: subColor, textAlign: 'center', originX: 'center', _isMutedText: true,
          _contentKey: 'label',
        }),
        // 대형 브랜드/제품명 (세리프, 얇게)
        mkText(title, cx, yOffset + 260, {
          fontSize: titleFontSize, fontFamily: f.heading, fontWeight: hw, lineHeight: 1.2,
          fill: textColor, textAlign: 'center', originX: 'center',
          _isHeading: true, width: 1000,
          _contentKey: 'title',
        }),
        // 하단 얇은 가로선
        mkRect(cx - 56, titleEndY + 30, 112, 1, accentColor, 'left', '_isAccent'),
        // 서브타이틀
        mkText(subtitle, cx, titleEndY + 52, {
          fontSize: 24, fontFamily: f.body, fontWeight: '300', lineHeight: 1.7,
          fill: subColor, textAlign: 'center', originX: 'center', width: 720,
          _contentKey: 'subtitle',
        }),
      ],
    };
  },

  // ─── b18: 인용구 밴드 ────────────────────────────────────────────────────
  'b18-quote-band': (yOffset, theme, content) => {
    const h = 300;
    const c = theme?.colors || { hero: '#1a1a1a', accent2: '#ffffff', accent: '#ffffff' };
    const f = theme?.fonts || { heading: 'Nanum Square' };
    const heroBg  = c.hero || c.bg;
    const isLight = _isLightColor(heroBg);
    const lineColor = isLight ? c.accent : (c.accent2 || 'rgba(255,255,255,0.35)');
    const quote = content?.quote || '"브랜드 철학을 담은 한 줄 카피를 입력하세요"';
    return {
      height: h,
      objects: [
        mkGradientRect(0, yOffset, ARTBOARD_W, h, heroBg, _darkenHex(heroBg, 40), '_isGradientHero'),
        mkRect(ARTBOARD_W / 2 - 50, yOffset + 70, 100, 3, lineColor, 'center', '_isHeroDivider'),
        mkText(quote, ARTBOARD_W / 2, yOffset + 94, {
          fontSize: 46, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.5,
          fill: isLight ? (c.text || '#111111') : '#ffffff',
          textAlign: 'center', originX: 'center', width: 900,
          _isHeading: true, _isHeroText: true,
          _contentKey: 'quote',
        }),
        mkRect(ARTBOARD_W / 2 - 50, yOffset + 250, 100, 3, lineColor, 'center', '_isHeroDivider'),
      ],
    };
  },
};

// ===== 헬퍼 함수 =====
function _isLightColor(hex) {
  if (!hex || typeof hex !== 'string') return true;
  const c = hex.replace('#', '');
  if (c.length < 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

// 헥스 색상을 어둡게 (amount: 0~255)
function _darkenHex(hex, amount = 30) {
  const raw = (hex || '#000000').replace('#', '');
  if (raw.length < 6) return hex;
  const r = Math.max(0, parseInt(raw.slice(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(raw.slice(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(raw.slice(4, 6), 16) - amount);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

// 헥스 색상을 밝게 (amount: 0~255, 흰색 방향으로)
function _lightenHex(hex, amount = 30) {
  const raw = (hex || '#ffffff').replace('#', '');
  if (raw.length < 6) return hex;
  const r = Math.min(255, parseInt(raw.slice(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(raw.slice(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(raw.slice(4, 6), 16) + amount);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

// 세로 그라디언트 배경 직사각형 생성
function mkGradientRect(left, top, width, height, colorTop, colorBottom, flag = null) {
  const grad = new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'pixels',
    coords: { x1: 0, y1: 0, x2: 0, y2: height },
    colorStops: [
      { offset: 0, color: colorTop },
      { offset: 1, color: colorBottom },
    ],
  });
  const opts = { left, top, width, height, fill: grad, selectable: true, stroke: 'transparent', strokeWidth: 0, lockMovementX: true, lockMovementY: true, lockScalingX: true, lockScalingY: true, lockRotation: true, hasControls: false };
  if (flag) opts[flag] = true;
  return new fabric.Rect(opts);
}


function mkRect(left, top, width, height, fill, originX = 'left', flag = null) {
  const bgFlags = ['_isBg', '_isSurface'];
  const isBg = flag && bgFlags.includes(flag);
  const opts = { left, top, width, height, fill, selectable: true, stroke: 'transparent', strokeWidth: 0,
    ...(isBg ? { lockMovementX: true, lockMovementY: true, lockScalingX: true, lockScalingY: true, lockRotation: true, hasControls: false } : {})
  };
  if (originX === 'center') opts.originX = 'center';
  if (flag) opts[flag] = true;
  return new fabric.Rect(opts);
}

function mkText(text, left, top, opts = {}) {
  const useTextbox = !!opts.width;
  const obj = new (useTextbox ? fabric.Textbox : fabric.IText)(text, {
    left, top,
    fontFamily: opts.fontFamily || 'Noto Sans KR',
    fontSize: opts.fontSize || 18,
    fontWeight: opts.fontWeight || '400',
    fill: opts.fill || '#111111',
    textAlign: opts.textAlign || 'left',
    originX: opts.originX || 'left',
    originY: opts.originY || 'top',
    lineHeight: opts.lineHeight || 1.4,
    _isHeading: opts._isHeading || false,
    ...(useTextbox ? { width: opts.width } : {}),
  });
  if (opts._isHeroText)          obj._isHeroText   = true;
  if (opts._isAccentText)        obj._isAccentText = true;
  if (opts._contentKey)          obj._contentKey   = opts._contentKey;
  if (opts.charSpacing !== undefined) obj.set('charSpacing', opts.charSpacing);
  return obj;
}

function mkCircle(left, top, radius, fill, flag = null) {
  const opts = { left, top, radius, fill, originX: 'center', originY: 'center', selectable: true };
  if (flag) opts[flag] = true;
  return new fabric.Circle(opts);
}

function mkPlaceholder(left, top, width, height, label, placeholderIndex = 0) {
  const rect = new fabric.Rect({
    left, top, width, height,
    fill: '#e2e8f0',
    selectable: true,
    stroke: 'transparent',
    strokeWidth: 0,
    _isPlaceholder: true,
    _placeholderIndex: placeholderIndex,
  });
  const fontSize = Math.max(16, Math.min(28, Math.round(width / 18)));
  const text = new fabric.IText(label, {
    left: left + width / 2,
    top: top + height / 2,
    originX: 'center', originY: 'center',
    fontSize,
    fontFamily: 'Noto Sans KR',
    fill: '#94a3b8',
    textAlign: 'center',
    lineHeight: 1.8,
    selectable: false,
    evented: false,
    _isPlaceholderLabel: true,
  });
  return [rect, text];
}

// ===== 블록 매니저 =====
window.BlockManager = {
  // 현재 쌓인 블록 목록 [{id, yOffset, height}]
  blocks: [],

  // 현재 아트보드 폭 반환
  getWidth() { return ARTBOARD_W; },

  // 변수만 갱신 (프로젝트 로드 시 — 오브젝트 스케일링 없음)
  restoreWidth(w) {
    ARTBOARD_W = w;
    CONTENT_W = ARTBOARD_W - BLOCK_PADDING * 2;
    CanvasManager.setArtboardWidth(w);
    const sel = document.getElementById('canvas-width-select');
    if (sel) sel.value = String(w);
  },

  // 폭 변경: 기존 오브젝트 비율 스케일링
  setWidth(newWidth) {
    const canvas = CanvasManager.getCanvas();
    const artboard = CanvasManager.getArtboard();
    if (!canvas || !artboard) return;
    const oldWidth = ARTBOARD_W;
    if (newWidth === oldWidth) return;
    const scale = newWidth / oldWidth;

    // 전역 상수 업데이트
    ARTBOARD_W = newWidth;
    CONTENT_W = ARTBOARD_W - BLOCK_PADDING * 2;
    CanvasManager.setArtboardWidth(newWidth);

    // 모든 비아트보드 오브젝트 비율 스케일
    canvas.getObjects().forEach(obj => {
      if (obj === artboard) return;
      obj.set({ left: obj.left * scale, top: obj.top * scale });
      const isText = obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text';
      if (isText) {
        obj.set({ fontSize: Math.round(obj.fontSize * scale) });
        if (obj.width) obj.set({ width: obj.width * scale });
      } else {
        obj.set({
          scaleX: (obj.scaleX || 1) * scale,
          scaleY: (obj.scaleY || 1) * scale,
        });
      }
      // absolutePositioned clipPath 스케일 (업로드 이미지 클립)
      if (obj.clipPath && obj.clipPath.absolutePositioned) {
        const cp = obj.clipPath;
        cp.set({
          left: cp.left * scale, top: cp.top * scale,
          scaleX: (cp.scaleX || 1) * scale, scaleY: (cp.scaleY || 1) * scale,
        });
        cp.setCoords();
      }
      obj.setCoords();
    });

    // 블록 메타데이터 업데이트
    this.blocks.forEach(b => {
      b.yOffset = Math.round(b.yOffset * scale);
      b.height = Math.round(b.height * scale);
      if (b.extraHeight) b.extraHeight = Math.round(b.extraHeight * scale);
    });

    CanvasManager.setArtboardHeight(this.getTotalHeight());
    canvas.renderAll();
    CanvasManager.saveHistory();
    CanvasManager.fitToScreen();
  },

  // 블록 추가 (extraHeight: 초기 여백, 기본 0)
  addBlock(blockId, content = null, extraHeight = 0) {
    const canvas = CanvasManager.getCanvas();
    const theme = ThemeManager.getCurrent();
    const builder = BlockBuilders[blockId];
    if (!builder) return;

    const yOffset = this.getTotalHeight();
    const result = builder(yOffset, theme, content);
    const blockKey = blockId + '_' + Date.now() + '_' + Math.random().toString(36).slice(2);

    const blockIndex = this.blocks.length;
    const flatObjs = result.objects.flat();
    flatObjs.forEach(obj => {
      obj._blockId = blockId;
      obj._blockKey = blockKey;
      obj._blockIndex = blockIndex;
      // extraHeight가 있으면 콘텐츠를 아래로 half 이동 (위아래 반반)
      if (extraHeight > 0) obj.set('top', (obj.top || 0) + extraHeight / 2);
      canvas.add(obj);
    });

    // 하단 여백용 투명 spacer rect
    const spacer = new fabric.Rect({
      left: 0, top: yOffset + result.height,
      width: ARTBOARD_W, height: extraHeight,
      fill: 'transparent', stroke: null, strokeWidth: 0,
      selectable: false, evented: false, hoverCursor: 'default',
      _blockKey: blockKey, _isSpacer: true, excludeFromExport: true,
    });
    canvas.add(spacer);

    this.blocks.push({ id: blockId, key: blockKey, yOffset, height: result.height, extraHeight });
    CanvasManager.setArtboardHeight(this.getTotalHeight());
    canvas.renderAll();
    CanvasManager.saveHistory();
    if (window.PanelLeft?.refreshBlockStack) window.PanelLeft.refreshBlockStack();
  },

  // 블록 삭제
  removeBlock(idx) {
    const canvas = CanvasManager.getCanvas();
    const block = this.blocks[idx];
    if (!block) return;

    // spacer 포함한 실제 점유 높이
    const deletedHeight = block.height + (block.extraHeight || 0);

    // 고유 블록 키로 오브젝트 제거 (spacer 포함)
    canvas.getObjects().filter(o => o._blockKey === block.key).forEach(o => canvas.remove(o));

    this.blocks.splice(idx, 1);

    // 삭제된 블록 이후의 오브젝트들을 위로 이동
    const keysAfter = new Set(this.blocks.slice(idx).map(b => b.key));
    canvas.getObjects().forEach(obj => {
      if (keysAfter.has(obj._blockKey)) {
        obj.set('top', obj.top - deletedHeight);
      }
    });

    this._rebuildYOffsets();
    canvas.renderAll();
    CanvasManager.saveHistory();
    if (window.PanelLeft?.refreshBlockStack) window.PanelLeft.refreshBlockStack();
  },

  // 블록 순서 변경 (dir: -1 위로, 1 아래로)
  moveBlock(idx, dir) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= this.blocks.length) return;

    // 배열 순서 교환
    [this.blocks[idx], this.blocks[newIdx]] = [this.blocks[newIdx], this.blocks[idx]];
    this._rebuildYOffsets();

    // 캔버스 오브젝트 Y좌표 재계산
    this._rerenderAll();
  },

  // Y 오프셋 재계산 (extraHeight 포함)
  _rebuildYOffsets() {
    let y = 0;
    this.blocks.forEach(b => {
      b.yOffset = y;
      y += b.height + (b.extraHeight || 0);
    });
    CanvasManager.setArtboardHeight(this.getTotalHeight());
  },

  // 전체 재렌더링 (순서 변경 후, extraHeight 보존)
  _rerenderAll() {
    const artboard = CanvasManager.getArtboard();
    const canvas = CanvasManager.getCanvas();
    canvas.getObjects().filter(o => o !== artboard).forEach(o => canvas.remove(o));

    const savedBlocks = [...this.blocks];
    this.blocks = [];

    savedBlocks.forEach(b => {
      this.addBlock(b.id, null, b.extraHeight || 0);
    });

    canvas.renderAll();
    CanvasManager.saveHistory();
  },

  // 전체 블록 높이 합산 (extraHeight 포함)
  getTotalHeight() {
    return this.blocks.reduce((sum, b) => sum + b.height + (b.extraHeight || 0), 0);
  },

  // 개별 블록 여백 조절 (위아래 반반)
  resizeBlock(blockKey, newExtraHeight) {
    const idx = this.blocks.findIndex(b => b.key === blockKey);
    if (idx === -1) return;
    const block = this.blocks[idx];
    const clamped = Math.max(0, Math.round(newExtraHeight));
    const delta = clamped - (block.extraHeight || 0);
    if (delta === 0) return;

    block.extraHeight = clamped;

    const canvas = CanvasManager.getCanvas();
    canvas.getObjects().forEach(obj => {
      if (obj._blockKey !== blockKey) return;
      if (obj._isSpacer) {
        obj.set('height', clamped);
      } else if (obj._isPlaceholder) {
        // 이미지 플레이스홀더: 블록 전체를 채우도록 높이 증가 (top은 유지)
        obj.set('height', (obj.height || 0) + delta);
      } else if (obj.type === 'image' && obj.clipPath) {
        // 업로드된 이미지: 클립 프레임 높이 확장 (이미지 위치 유지)
        obj.clipPath.height = (obj.clipPath.height || 0) + delta;
        obj.clipPath.setCoords();
      } else {
        // 일반 콘텐츠 (텍스트, 도형, 라벨 등): 위아래 반반 이동
        obj.set('top', (obj.top || 0) + delta / 2);
      }
    });

    // 이후 블록 오브젝트는 전체 delta 이동
    const laterKeys = new Set(this.blocks.slice(idx + 1).map(b => b.key));
    canvas.getObjects().forEach(obj => {
      if (!laterKeys.has(obj._blockKey)) return;
      obj.set('top', (obj.top || 0) + delta);
      if (obj.type === 'image' && obj.clipPath) {
        obj.clipPath.top = (obj.clipPath.top || 0) + delta;
        obj.clipPath.setCoords();
      }
    });

    this._rebuildYOffsets();
    canvas.renderAll();
    CanvasManager.saveHistory();
    if (window.PanelLeft?.refreshBlockStack) window.PanelLeft.refreshBlockStack();
  },

  // 일괄 여백 조절 (모든 블록에 delta 추가, 위아래 반반)
  resizeAll(delta) {
    if (!this.blocks.length) return;
    const canvas = CanvasManager.getCanvas();

    // 실제 적용 delta 계산 (clamp 고려)
    const actualDeltas = this.blocks.map(b => {
      const newExtra = Math.max(0, (b.extraHeight || 0) + delta);
      return newExtra - (b.extraHeight || 0);
    });

    // extraHeight 업데이트 + spacer 갱신
    this.blocks.forEach((block, i) => {
      block.extraHeight = Math.max(0, (block.extraHeight || 0) + delta);
      canvas.getObjects().forEach(obj => {
        if (obj._blockKey === block.key && obj._isSpacer) obj.set('height', block.extraHeight);
      });
    });

    // 블록별 위치 재계산 + 콘텐츠 센터링
    let y = 0;
    this.blocks.forEach((block, idx) => {
      const oldY = block.yOffset;
      block.yOffset = y;
      const posShift = y - oldY;          // 앞 블록들이 커진 만큼 이동
      const centerShift = actualDeltas[idx] / 2; // 자기 블록 내 위아래 반반

      canvas.getObjects().forEach(obj => {
        if (obj._blockKey !== block.key) return;
        if (obj._isSpacer) return; // spacer는 height만 이미 처리
        if (obj._isPlaceholder) {
          // 이미지 플레이스홀더: 앞 블록 이동분만 적용하고 높이 증가
          obj.set('top', (obj.top || 0) + posShift);
          obj.set('height', (obj.height || 0) + actualDeltas[idx]);
        } else if (obj.type === 'image' && obj.clipPath) {
          // 업로드된 이미지: 클립 프레임 이동 + 높이 확장
          obj.set('top', (obj.top || 0) + posShift);
          obj.clipPath.top = (obj.clipPath.top || 0) + posShift;
          obj.clipPath.height = (obj.clipPath.height || 0) + actualDeltas[idx];
          obj.clipPath.setCoords();
        } else {
          obj.set('top', (obj.top || 0) + posShift + centerShift);
        }
      });

      y += block.height + block.extraHeight;
    });

    CanvasManager.setArtboardHeight(this.getTotalHeight());
    canvas.renderAll();
    CanvasManager.saveHistory();
    if (window.PanelLeft?.refreshBlockStack) window.PanelLeft.refreshBlockStack();
  },

  // 블록 복제 (idx 바로 뒤에 동일 블록 삽입)
  duplicateBlock(idx) {
    const block = this.blocks[idx];
    if (!block) return;

    const artboard = CanvasManager.getArtboard();
    const canvas = CanvasManager.getCanvas();
    canvas.getObjects().filter(o => o !== artboard).forEach(o => canvas.remove(o));

    const savedBlocks = this.blocks.map(b => ({ id: b.id, extraHeight: b.extraHeight || 0 }));
    savedBlocks.splice(idx + 1, 0, { id: block.id, extraHeight: block.extraHeight || 0 });

    this.blocks = [];
    savedBlocks.forEach(b => this.addBlock(b.id, null, b.extraHeight));

    canvas.renderAll();
    CanvasManager.saveHistory();
  },

  // 블록 초기화 (템플릿 로드 시)
  reset() {
    this.blocks = [];
  },

  // 템플릿 블록 일괄 로드
  loadTemplate(blockIds, theme, contentMap = {}) {
    const canvas = CanvasManager.getCanvas();
    const artboard = CanvasManager.getArtboard();
    canvas.getObjects().filter(o => o !== artboard).forEach(o => canvas.remove(o));
    this.reset();
    // 블록 빌드 전에 테마를 먼저 설정해야 각 블록이 올바른 색상으로 렌더됨
    if (theme) ThemeManager.apply(theme);
    blockIds.forEach(id => this.addBlock(id, contentMap[id] || null));
    if (window.PanelLeft?.refreshBlockStack) window.PanelLeft.refreshBlockStack();
  },
};
