/**
 * blocks.js — 블록 라이브러리 정의 및 캔버스 삽입
 * 각 블록은 Fabric.js 오브젝트 배열로 구성됨
 */

const ARTBOARD_W = 1200;
const BLOCK_PADDING = 80;      // 블록 내부 수평 패딩
const CONTENT_W = ARTBOARD_W - BLOCK_PADDING * 2;  // 콘텐츠 폭 = 1040

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
  { id: 'b16-delivery',     name: '배송 안내',      desc: '배송방법/기간/비용/반품 안내' },
];

// ===== 블록 생성 함수 =====
// 각 함수는 { objects: FabricObject[], height: number } 반환

const BlockBuilders = {

  // 단일행 텍스트 기준 높이: fontSize * 1.2 (lineHeight:1.2 사용)
  // 다행 텍스트: fontSize * lineHeight * 줄수

  'b01-main-banner': (yOffset, theme, content) => {
    const c = theme?.colors || { bg: '#1a1a1a', text: '#ffffff', subtext: '#aaaaaa', accent: '#ffffff' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const title = content?.title || '상품명을 입력하세요';
    const subtitle = content?.subtitle || '핵심 특징을 한 줄로 설명하세요';
    const bgColor = c.hero || c.bg;
    const isLightBg = _isLightColor(bgColor);
    const titleColor = isLightBg ? (_isLightColor(c.text) ? '#111111' : c.text) : '#ffffff';
    const subColor = isLightBg ? (_isLightColor(c.subtext) ? '#444444' : c.subtext) : 'rgba(255,255,255,0.72)';
    const dividerColor = isLightBg ? c.accent : (c.accent2 || '#ffffff');
    const titleLines = title.split('\n').length;
    const titleH = Math.ceil(titleLines * 90 * 1.2);
    const dividerY = yOffset + 232 + titleH + 36;
    const subtitleY = dividerY + 3 + 26;
    const h = Math.max(680, (subtitleY - yOffset) + Math.ceil(38 * 1.2) + 150);
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, bgColor, 'left', '_isHero'),
        mkText(title, ARTBOARD_W / 2, yOffset + 232, {
          fontSize: 90, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: titleColor, textAlign: 'center', originX: 'center', _isHeading: true, _isHeroText: true, width: 960,
        }),
        mkRect(ARTBOARD_W / 2 - 30, dividerY, 60, 3, dividerColor, 'center', '_isHeroDivider'),
        mkText(subtitle, ARTBOARD_W / 2, subtitleY, {
          fontSize: 38, fontFamily: f.body, fontWeight: '400', lineHeight: 1.2,
          fill: subColor, textAlign: 'center', originX: 'center', _isHeroText: true, width: 960,
        }),
      ]
    };
  },

  'b02-img-left': (yOffset, theme, content) => {
    const h = 720;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const imgW = ARTBOARD_W / 2;
    const colCx = imgW + (ARTBOARD_W - imgW) / 2; // 텍스트 영역 중심
    const title = content?.title || '특징 제목';
    const desc = content?.desc || '상품의 특징을 자세히 설명하세요.\n여러 줄로 작성하면 더욱 효과적입니다.\n구체적인 수치나 장점을 강조해보세요.';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
        mkPlaceholder(0, yOffset, imgW, h, '이미지 영역\n더블클릭하여 업로드'),
        mkRect(colCx - 20, yOffset + 228, 40, 4, c.accent, 'left', '_isAccent'),
        mkText(title, colCx, yOffset + 248, {
          fontSize: 52, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: 480,
        }),
        mkText(desc, colCx, yOffset + 356, {
          fontSize: 28, fontFamily: f.body, fontWeight: '400',
          fill: c.subtext, lineHeight: 1.7, textAlign: 'center', originX: 'center', width: 480,
        }),
      ]
    };
  },

  'b03-img-right': (yOffset, theme, content) => {
    const h = 720;
    const c = theme?.colors || { bg: '#f8f9fa', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const imgX = ARTBOARD_W / 2;
    const colCx = imgX / 2; // 텍스트 영역 중심
    const title = content?.title || '특징 제목';
    const desc = content?.desc || '상품의 특징을 자세히 설명하세요.\n여러 줄로 작성하면 더욱 효과적입니다.\n구체적인 수치나 장점을 강조해보세요.';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.surface || c.bg, 'left', '_isSurface'),
        mkPlaceholder(imgX, yOffset, ARTBOARD_W / 2, h, '이미지 영역\n더블클릭하여 업로드'),
        mkRect(colCx - 20, yOffset + 228, 40, 4, c.accent, 'left', '_isAccent'),
        mkText(title, colCx, yOffset + 248, {
          fontSize: 52, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: 480,
        }),
        mkText(desc, colCx, yOffset + 356, {
          fontSize: 28, fontFamily: f.body, fontWeight: '400',
          fill: c.subtext, lineHeight: 1.7, textAlign: 'center', originX: 'center', width: 480,
        }),
      ]
    };
  },

  'b04-feature-2col': (yOffset, theme, content) => {
    const h = 560;
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
      ...(isHead ? { fontSize: 42, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2, fill: c.text, _isHeading: true }
                 : { fontSize: 26, fontFamily: f.body, fill: c.subtext, lineHeight: 1.7 })
    });
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
        mkCircle(cx1, yOffset + 182, 30, c.accent, '_isAccent'),
        mkText(items[0]?.title || defaults[0].title, cx1, yOffset + 250, txtOpts(true)),
        mkText(items[0]?.desc  || defaults[0].desc,  cx1, yOffset + 320, txtOpts(false)),
        mkCircle(cx2, yOffset + 182, 30, c.accent2 || c.accent, '_isAccent2'),
        mkText(items[1]?.title || defaults[1].title, cx2, yOffset + 250, txtOpts(true)),
        mkText(items[1]?.desc  || defaults[1].desc,  cx2, yOffset + 320, txtOpts(false)),
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
    const objs = [mkRect(0, yOffset, ARTBOARD_W, h, c.surface || c.bg, 'left', '_isSurface')];
    cxs.forEach((cx, i) => {
      objs.push(
        mkCircle(cx, yOffset + 180, 28, circleAccents[i], circleFlags3[i]),
        mkText(items[i]?.title || defaults[i].title, cx, yOffset + 242, {
          fontSize: 36, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: Math.floor(colW * 0.84),
        }),
        mkText(items[i]?.desc || defaults[i].desc, cx, yOffset + 304, {
          fontSize: 25, fontFamily: f.body, fill: c.subtext, lineHeight: 1.7,
          textAlign: 'center', originX: 'center', width: Math.floor(colW * 0.84),
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
        mkPlaceholder(0, yOffset, ARTBOARD_W, h, '이미지 영역\n더블클릭하여 업로드'),
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
          width: labelW - 30,
        }),
        mkText(value, BLOCK_PADDING + labelW + 24, rowY + rowH / 2, {
          fontSize: 26, fontFamily: f.body, fill: c.subtext, originY: 'center',
          width: CONTENT_W - labelW - 48,
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
        mkPlaceholder(0, yOffset, imgW, h, '이미지 1\n더블클릭하여 업로드'),
        mkPlaceholder(imgW + gap, yOffset, imgW, h, '이미지 2\n더블클릭하여 업로드'),
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
        mkPlaceholder(0, yOffset, imgW, h, '이미지 1\n더블클릭하여 업로드'),
        mkPlaceholder(imgW + gap, yOffset, imgW, h, '이미지 2\n더블클릭하여 업로드'),
        mkPlaceholder((imgW + gap) * 2, yOffset, imgW, h, '이미지 3\n더블클릭하여 업로드'),
      ]
    };
  },

  'b10-text-center': (yOffset, theme, content) => {
    const h = 580;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const title = content?.title || '섹션 제목';
    const body = content?.body || '여기에 본문 내용을 입력하세요. 상품의 스토리나 브랜드 철학,\n사용 방법 등을 자세히 설명할 수 있습니다.';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
        mkText(title, ARTBOARD_W / 2, yOffset + 166, {
          fontSize: 62, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: 880,
        }),
        mkRect(ARTBOARD_W / 2 - 30, yOffset + 284, 60, 4, c.accent, 'center', '_isAccent'),
        mkText(body, ARTBOARD_W / 2, yOffset + 314, {
          fontSize: 28, fontFamily: f.body, fontWeight: '400',
          fill: c.subtext, textAlign: 'center', originX: 'center', lineHeight: 1.8, width: 880,
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
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
      mkText('⚠ 주의사항', BLOCK_PADDING, yOffset + topPad, {
        fontSize: 42, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
        fill: c.accent, _isHeading: true,
      }),
    ];
    items.forEach((txt, i) => {
      objs.push(
        mkText('•  ' + txt, BLOCK_PADDING, yOffset + itemsStart + i * rowH, {
          fontSize: 26, fontFamily: f.body, fill: c.subtext, lineHeight: 1.4, width: CONTENT_W,
        })
      );
    });
    return { height: h, objects: objs };
  },

  'b12-brand-banner': (yOffset, theme, content) => {
    const h = 440;
    const c = theme?.colors || { bg: '#111111', text: '#ffffff', subtext: 'rgba(255,255,255,0.6)', accent: '#ffffff' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const name = content?.name || '브랜드명';
    const slogan = content?.slogan || '브랜드 슬로건을 여기에 입력하세요';
    const heroBg = c.hero || c.bg;
    const isLightHero = _isLightColor(heroBg);
    const nameColor = isLightHero ? (_isLightColor(c.text) ? '#111111' : c.text) : '#ffffff';
    const sloganColor = isLightHero ? (_isLightColor(c.subtext) ? '#444444' : c.subtext) : 'rgba(255,255,255,0.65)';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, heroBg, 'left', '_isHero'),
        mkText(name, ARTBOARD_W / 2, yOffset + 130, {
          fontSize: 74, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: nameColor, textAlign: 'center', originX: 'center', _isHeading: true, _isHeroText: true,
        }),
        mkText(slogan, ARTBOARD_W / 2, yOffset + 276, {
          fontSize: 32, fontFamily: f.body, fontWeight: '300', lineHeight: 1.2,
          fill: sloganColor, textAlign: 'center', originX: 'center', _isHeroText: true,
        }),
      ]
    };
  },

  // ─── b13: 사용 방법 (3단계 번호형) ───────────────────────────────────────
  'b13-how-to-use': (yOffset, theme, content) => {
    const h = 600;
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
    const circleY = yOffset + 262;
    const circleR = 38;
    const stepAccents = [c.accent, c.accent2 || c.accent, c.accent];
    const stepFlags = ['_isAccent', '_isAccent2', '_isAccent'];
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.surface || c.bg, 'left', '_isSurface'),
      mkText('사용 방법', ARTBOARD_W / 2, yOffset + 100, {
        fontSize: 44, fontFamily: f.heading, fontWeight: '800',
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
      }),
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
        }),
        mkText(item.title, cx, yOffset + 344, {
          fontSize: 34, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true, width: Math.floor(colW * 0.84),
        }),
        mkText(item.desc, cx, yOffset + 412, {
          fontSize: 26, fontFamily: f.body, fill: c.subtext, lineHeight: 1.7,
          textAlign: 'center', originX: 'center', width: Math.floor(colW * 0.84),
        })
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b14: 고객 후기 (3열 카드) ─────────────────────────────────────────
  'b14-review': (yOffset, theme, content) => {
    const h = 580;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const gap = 20;
    const cardW = (CONTENT_W - gap * 2) / 3;
    const cardH = 360;
    const cardTop = yOffset + 159;
    const xs = [BLOCK_PADDING, BLOCK_PADDING + cardW + gap, BLOCK_PADDING + (cardW + gap) * 2];
    const defaults = [
      { stars: '★★★★★', text: '정말 만족스러운 제품이에요.\n품질도 좋고 배송도 빨랐습니다.', name: '구매자 A' },
      { stars: '★★★★★', text: '재구매 의사 100%입니다.\n주변에도 적극 추천하고 있어요.', name: '구매자 B' },
      { stars: '★★★★☆', text: '가격 대비 정말 훌륭합니다.\n사용 후 효과를 바로 느꼈어요.', name: '구매자 C' },
    ];
    const items = content?.items || defaults;
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg, 'left', '_isBg'),
      mkText('고객 후기', ARTBOARD_W / 2, yOffset + 61, {
        fontSize: 44, fontFamily: f.heading, fontWeight: '800',
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
      }),
    ];
    xs.forEach((x, i) => {
      const item = items[i] || defaults[i];
      objs.push(
        mkRect(x, cardTop, cardW, cardH, c.surface || '#f8f9fa', 'left', '_isSurface'),
        mkText(item.stars, x + 22, cardTop + 30, {
          fontSize: 26, fontFamily: f.body, fill: c.accent,
        }),
        mkText(item.text, x + 22, cardTop + 86, {
          fontSize: 25, fontFamily: f.body, fill: c.subtext, lineHeight: 1.75, width: cardW - 44,
        }),
        mkText('— ' + item.name, x + 22, cardTop + cardH - 52, {
          fontSize: 25, fontFamily: f.body, fontWeight: '700', fill: c.text, width: cardW - 44,
        })
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
        fontSize: 44, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
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
          width: labelW - 30,
        }),
        mkText(value, BLOCK_PADDING + labelW + 24, rowY + rowH / 2, {
          fontSize: 26, fontFamily: f.body, fill: c.subtext, originY: 'center',
          width: CONTENT_W - labelW - 48,
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
    const headline = content?.headline || '지금 바로 경험해보세요';
    const sub = content?.sub || '첫 구매 고객을 위한 특별 혜택이 준비되어 있습니다';
    const heroBg = c.hero || c.bg;
    const isLight = _isLightColor(heroBg);
    const headColor = isLight ? (_isLightColor(c.text) ? '#111111' : c.text) : '#ffffff';
    const subColor = isLight ? (_isLightColor(c.subtext) ? '#444444' : c.subtext) : 'rgba(255,255,255,0.65)';
    const lineColor = isLight ? c.accent : (c.accent2 || '#ffffff');
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, heroBg, 'left', '_isHero'),
        mkRect(ARTBOARD_W / 2 - 30, yOffset + 92, 60, 4, lineColor, 'center', '_isHeroDivider'),
        mkText(headline, ARTBOARD_W / 2, yOffset + 130, {
          fontSize: 64, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: headColor, textAlign: 'center', originX: 'center', _isHeading: true, _isHeroText: true, width: 960,
        }),
        mkText(sub, ARTBOARD_W / 2, yOffset + 318, {
          fontSize: 30, fontFamily: f.body, fontWeight: '400', lineHeight: 1.4,
          fill: subColor, textAlign: 'center', originX: 'center', _isHeroText: true, width: 960,
        }),
      ]
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


function mkRect(left, top, width, height, fill, originX = 'left', flag = null) {
  const opts = { left, top, width, height, fill, selectable: true, stroke: 'transparent', strokeWidth: 0 };
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
  if (opts._isHeroText) obj._isHeroText = true;
  return obj;
}

function mkCircle(left, top, radius, fill, flag = null) {
  const opts = { left, top, radius, fill, originX: 'center', originY: 'center', selectable: true };
  if (flag) opts[flag] = true;
  return new fabric.Circle(opts);
}

function mkPlaceholder(left, top, width, height, label) {
  const rect = new fabric.Rect({
    left, top, width, height,
    fill: '#e2e8f0',
    selectable: true,
    stroke: 'transparent',
    strokeWidth: 0,
    _isPlaceholder: true,
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

  // 블록 추가 (extraHeight: 초기 여백, 기본 0)
  addBlock(blockId, content = null, extraHeight = 0) {
    const canvas = CanvasManager.getCanvas();
    const theme = ThemeManager.getCurrent();
    const builder = BlockBuilders[blockId];
    if (!builder) return;

    const yOffset = this.getTotalHeight();
    const result = builder(yOffset, theme, content);
    const blockKey = blockId + '_' + Date.now() + '_' + Math.random().toString(36).slice(2);

    const flatObjs = result.objects.flat();
    flatObjs.forEach(obj => {
      obj._blockId = blockId;
      obj._blockKey = blockKey;
      // extraHeight가 있으면 콘텐츠를 아래로 half 이동 (위아래 반반)
      if (extraHeight > 0) obj.set('top', (obj.top || 0) + extraHeight / 2);
      canvas.add(obj);
    });

    // 하단 여백용 투명 spacer rect
    const spacer = new fabric.Rect({
      left: 0, top: yOffset + result.height,
      width: 1200, height: extraHeight,
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
