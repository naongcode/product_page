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

    // 제목 줄 수에 따라 높이 동적 계산
    const titleLines = title.split('\n').length;
    const titleLineH = 82 * 1.2; // fontSize * lineHeight
    const titleH = titleLineH * titleLines;
    const subtitleH = 34 * 1.2;
    const contentH = titleH + 28 + 3 + 20 + subtitleH; // title + gap + divider + gap + sub
    const h = Math.max(520, Math.round(contentH + 200)); // 상하 여백 포함

    const titleY = yOffset + Math.round((h - contentH) / 2);
    const dividerY = titleY + Math.round(titleH) + 28;
    const subY = dividerY + 3 + 20;

    const bgColor = c.bg;
    const isLightBg = _isLightColor(bgColor);
    const titleColor = isLightBg ? c.text : '#ffffff';
    const subColor = isLightBg ? c.subtext : 'rgba(255,255,255,0.72)';
    const dividerColor = c.accent;
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, bgColor),
        mkText(title, ARTBOARD_W / 2, titleY, {
          fontSize: 82, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: titleColor, textAlign: 'center', originX: 'center', _isHeading: true,
        }),
        mkRect(ARTBOARD_W / 2 - 30, dividerY, 60, 3, dividerColor, 'center', '_isAccent'),
        mkText(subtitle, ARTBOARD_W / 2, subY, {
          fontSize: 34, fontFamily: f.body, fontWeight: '400', lineHeight: 1.2,
          fill: subColor, textAlign: 'center', originX: 'center',
        }),
      ]
    };
  },

  'b02-img-left': (yOffset, theme, content) => {
    const h = 580;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const imgW = ARTBOARD_W / 2;
    const colCx = imgW + (ARTBOARD_W - imgW) / 2; // 텍스트 영역 중심
    const title = content?.title || '특징 제목';
    const desc = content?.desc || '상품의 특징을 자세히 설명하세요.\n여러 줄로 작성하면 더욱 효과적입니다.\n구체적인 수치나 장점을 강조해보세요.';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
        mkPlaceholder(0, yOffset, imgW, h, '이미지 영역\n더블클릭하여 업로드'),
        mkRect(colCx - 20, yOffset + 190, 40, 4, c.accent, 'left', '_isAccent'),
        mkText(title, colCx, yOffset + 208, {
          fontSize: 46, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        }),
        mkText(desc, colCx, yOffset + 274, {
          fontSize: 22, fontFamily: f.body, fontWeight: '400',
          fill: c.subtext, lineHeight: 1.7, textAlign: 'center', originX: 'center',
        }),
      ]
    };
  },

  'b03-img-right': (yOffset, theme, content) => {
    const h = 580;
    const c = theme?.colors || { bg: '#f8f9fa', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const imgX = ARTBOARD_W / 2;
    const colCx = imgX / 2; // 텍스트 영역 중심
    const title = content?.title || '특징 제목';
    const desc = content?.desc || '상품의 특징을 자세히 설명하세요.\n여러 줄로 작성하면 더욱 효과적입니다.\n구체적인 수치나 장점을 강조해보세요.';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
        mkPlaceholder(imgX, yOffset, ARTBOARD_W / 2, h, '이미지 영역\n더블클릭하여 업로드'),
        mkRect(colCx - 20, yOffset + 190, 40, 4, c.accent, 'left', '_isAccent'),
        mkText(title, colCx, yOffset + 208, {
          fontSize: 46, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        }),
        mkText(desc, colCx, yOffset + 274, {
          fontSize: 22, fontFamily: f.body, fontWeight: '400',
          fill: c.subtext, lineHeight: 1.7, textAlign: 'center', originX: 'center',
        }),
      ]
    };
  },

  'b04-feature-2col': (yOffset, theme, content) => {
    const h = 430;
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
    const txtOpts = (isHead) => ({
      textAlign: 'center', originX: 'center',
      ...(isHead ? { fontSize: 36, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2, fill: c.text, _isHeading: true }
                 : { fontSize: 18, fontFamily: f.body, fill: c.subtext, lineHeight: 1.7 })
    });
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
        mkCircle(cx1, yOffset + 95, 30, c.accent),
        mkText(items[0]?.title || defaults[0].title, cx1, yOffset + 147, txtOpts(true)),
        mkText(items[0]?.desc  || defaults[0].desc,  cx1, yOffset + 201, txtOpts(false)),
        mkCircle(cx2, yOffset + 95, 30, c.accent),
        mkText(items[1]?.title || defaults[1].title, cx2, yOffset + 147, txtOpts(true)),
        mkText(items[1]?.desc  || defaults[1].desc,  cx2, yOffset + 201, txtOpts(false)),
      ]
    };
  },

  'b05-feature-3col': (yOffset, theme, content) => {
    const h = 410;
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
    const objs = [mkRect(0, yOffset, ARTBOARD_W, h, c.bg)];
    cxs.forEach((cx, i) => {
      objs.push(
        mkCircle(cx, yOffset + 90, 28, c.accent),
        mkText(items[i]?.title || defaults[i].title, cx, yOffset + 138, {
          fontSize: 30, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        }),
        mkText(items[i]?.desc || defaults[i].desc, cx, yOffset + 182, {
          fontSize: 17, fontFamily: f.body, fill: c.subtext, lineHeight: 1.7,
          textAlign: 'center', originX: 'center',
        })
      );
    });
    return { height: h, objects: objs };
  },

  'b06-full-image': (yOffset, theme) => {
    const h = 680;
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
    const rowH = 62;
    const headerH = 100;
    const h = headerH + rows.length * rowH + 60;
    const tableY = yOffset + headerH;
    const labelW = 220;
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
      mkText(sectionTitle, ARTBOARD_W / 2, yOffset + (headerH - 46) / 2, {
        fontSize: 38, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
      }),
    ];
    rows.forEach(([label, value], i) => {
      const rowY = tableY + i * rowH;
      const isEven = i % 2 === 0;
      objs.push(
        mkRect(BLOCK_PADDING, rowY, CONTENT_W, rowH, isEven ? '#f8f9fa' : c.bg),
        mkRect(BLOCK_PADDING, rowY, labelW, rowH, isEven ? '#f1f3f5' : '#f8f9fa'),
        mkText(label, BLOCK_PADDING + 24, rowY + rowH / 2, {
          fontSize: 20, fontFamily: f.body, fontWeight: '700', fill: c.text, originY: 'center',
        }),
        mkText(value, BLOCK_PADDING + labelW + 24, rowY + rowH / 2, {
          fontSize: 20, fontFamily: f.body, fill: c.subtext, originY: 'center',
        })
      );
    });
    return { height: h, objects: objs };
  },

  'b08-gallery-2col': (yOffset, theme) => {
    const h = 500;
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
    const h = 420;
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
    const h = 440;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const title = content?.title || '섹션 제목';
    const body = content?.body || '여기에 본문 내용을 입력하세요. 상품의 스토리나 브랜드 철학,\n사용 방법 등을 자세히 설명할 수 있습니다.';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
        mkText(title, ARTBOARD_W / 2, yOffset + 90, {
          fontSize: 56, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        }),
        mkRect(ARTBOARD_W / 2 - 30, yOffset + 173, 60, 4, c.accent, 'center', '_isAccent'),
        mkText(body, ARTBOARD_W / 2, yOffset + 197, {
          fontSize: 22, fontFamily: f.body, fontWeight: '400',
          fill: c.subtext, textAlign: 'center', originX: 'center', lineHeight: 1.8,
        }),
      ]
    };
  },

  'b11-caution': (yOffset, theme, content) => {
    const c = theme?.colors || { bg: '#fff9f0', text: '#111111', subtext: '#6b7280', accent: '#E9A800' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const items = content?.items || ['주의사항 1을 입력하세요', '주의사항 2를 입력하세요', '주의사항 3을 입력하세요'];
    const rowH = 58;
    // 제목(36px·~43px) + 간격16 → 첫 항목 시작, 항목간격 58px
    const h = 86 + items.length * rowH + 52;
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
      mkText('⚠ 주의사항', BLOCK_PADDING, yOffset + 28, {
        fontSize: 36, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
        fill: c.accent, _isHeading: true,
      }),
    ];
    items.forEach((txt, i) => {
      objs.push(
        mkText('•  ' + txt, BLOCK_PADDING, yOffset + 87 + i * rowH, {
          fontSize: 20, fontFamily: f.body, fill: c.subtext, lineHeight: 1.4,
        })
      );
    });
    return { height: h, objects: objs };
  },

  'b12-brand-banner': (yOffset, theme, content) => {
    const h = 320;
    const c = theme?.colors || { bg: '#111111', text: '#ffffff', subtext: 'rgba(255,255,255,0.6)', accent: '#ffffff' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const name = content?.name || '브랜드명';
    const slogan = content?.slogan || '브랜드 슬로건을 여기에 입력하세요';
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
        mkText(name, ARTBOARD_W / 2, yOffset + 94, {
          fontSize: 66, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: c.accent, textAlign: 'center', originX: 'center', _isHeading: true,
        }),
        mkText(slogan, ARTBOARD_W / 2, yOffset + 193, {
          fontSize: 28, fontFamily: f.body, fontWeight: '300', lineHeight: 1.2,
          fill: c.subtext, textAlign: 'center', originX: 'center',
        }),
      ]
    };
  },

  // ─── b13: 사용 방법 (3단계 번호형) ───────────────────────────────────────
  'b13-how-to-use': (yOffset, theme, content) => {
    const h = 460;
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
    const circleY = yOffset + 168;
    const circleR = 38;
    const inCircleColor = _isLightColor(c.accent) ? c.text : '#ffffff';
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
      mkText('사용 방법', ARTBOARD_W / 2, yOffset + 44, {
        fontSize: 38, fontFamily: f.heading, fontWeight: '800',
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
      }),
    ];
    xs.forEach((x, i) => {
      const item = items[i] || defaults[i];
      const cx = x + colW / 2;
      objs.push(
        mkCircle(cx, circleY, circleR, c.accent),
        mkText(item.step, cx, circleY, {
          fontSize: 26, fontFamily: f.heading, fontWeight: '800',
          fill: inCircleColor, textAlign: 'center', originX: 'center', originY: 'center',
        }),
        mkText(item.title, cx, yOffset + 232, {
          fontSize: 28, fontFamily: f.heading, fontWeight: '800', lineHeight: 1.2,
          fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
        }),
        mkText(item.desc, cx, yOffset + 280, {
          fontSize: 18, fontFamily: f.body, fill: c.subtext, lineHeight: 1.7,
          textAlign: 'center', originX: 'center',
        })
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b14: 고객 후기 (3열 카드) ─────────────────────────────────────────
  'b14-review': (yOffset, theme, content) => {
    const h = 430;
    const c = theme?.colors || { bg: '#ffffff', text: '#111111', subtext: '#6b7280', accent: '#222222' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const gap = 20;
    const cardW = (CONTENT_W - gap * 2) / 3;
    const cardH = 272;
    const cardTop = yOffset + 110;
    const xs = [BLOCK_PADDING, BLOCK_PADDING + cardW + gap, BLOCK_PADDING + (cardW + gap) * 2];
    const defaults = [
      { stars: '★★★★★', text: '정말 만족스러운 제품이에요.\n품질도 좋고 배송도 빨랐습니다.', name: '구매자 A' },
      { stars: '★★★★★', text: '재구매 의사 100%입니다.\n주변에도 적극 추천하고 있어요.', name: '구매자 B' },
      { stars: '★★★★☆', text: '가격 대비 정말 훌륭합니다.\n사용 후 효과를 바로 느꼈어요.', name: '구매자 C' },
    ];
    const items = content?.items || defaults;
    const objs = [
      mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
      mkText('고객 후기', ARTBOARD_W / 2, yOffset + 36, {
        fontSize: 38, fontFamily: f.heading, fontWeight: '800',
        fill: c.text, textAlign: 'center', originX: 'center', _isHeading: true,
      }),
    ];
    xs.forEach((x, i) => {
      const item = items[i] || defaults[i];
      objs.push(
        mkRect(x, cardTop, cardW, cardH, '#f8f9fa'),
        mkText(item.stars, x + 22, cardTop + 24, {
          fontSize: 20, fontFamily: f.body, fill: c.accent,
        }),
        mkText(item.text, x + 22, cardTop + 62, {
          fontSize: 17, fontFamily: f.body, fill: c.subtext, lineHeight: 1.75,
        }),
        mkText('— ' + item.name, x + 22, cardTop + cardH - 46, {
          fontSize: 15, fontFamily: f.body, fontWeight: '700', fill: c.text,
        })
      );
    });
    return { height: h, objects: objs };
  },

  // ─── b15: 구매 유도 배너 (CTA) ─────────────────────────────────────────
  'b15-cta': (yOffset, theme, content) => {
    const h = 360;
    const c = theme?.colors || { bg: '#111111', text: '#ffffff', subtext: '#aaaaaa', accent: '#ffffff' };
    const f = theme?.fonts || { heading: 'Nanum Square', body: 'Noto Sans KR' };
    const headline = content?.headline || '지금 바로 경험해보세요';
    const sub = content?.sub || '첫 구매 고객을 위한 특별 혜택이 준비되어 있습니다';
    const isLight = _isLightColor(c.bg);
    const headColor = isLight ? c.text : '#ffffff';
    const subColor = isLight ? c.subtext : 'rgba(255,255,255,0.65)';
    const lineColor = c.accent;
    return {
      height: h,
      objects: [
        mkRect(0, yOffset, ARTBOARD_W, h, c.bg),
        mkRect(ARTBOARD_W / 2 - 30, yOffset + 68, 60, 4, lineColor, 'center', '_isAccent'),
        mkText(headline, ARTBOARD_W / 2, yOffset + 96, {
          fontSize: 58, fontFamily: f.heading, fontWeight: '900', lineHeight: 1.2,
          fill: headColor, textAlign: 'center', originX: 'center', _isHeading: true,
        }),
        mkText(sub, ARTBOARD_W / 2, yOffset + 232, {
          fontSize: 26, fontFamily: f.body, fontWeight: '400', lineHeight: 1.4,
          fill: subColor, textAlign: 'center', originX: 'center',
        }),
      ]
    };
  },
};

// ===== 헬퍼 함수 =====
function _isLightColor(hex) {
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
  return new fabric.IText(text, {
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
  });
}

function mkCircle(left, top, radius, fill) {
  return new fabric.Circle({ left, top, radius, fill, originX: 'center', originY: 'center', selectable: true });
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

  // 블록 추가
  addBlock(blockId, content = null) {
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
      canvas.add(obj);
    });

    this.blocks.push({ id: blockId, key: blockKey, yOffset, height: result.height });
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

    const deletedHeight = block.height;

    // 고유 블록 키로 오브젝트 제거
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

  // Y 오프셋 재계산
  _rebuildYOffsets() {
    let y = 0;
    this.blocks.forEach(b => {
      b.yOffset = y;
      y += b.height;
    });
    CanvasManager.setArtboardHeight(this.getTotalHeight());
  },

  // 전체 재렌더링 (순서 변경 후)
  _rerenderAll() {
    const canvas = CanvasManager.getCanvas();
    const theme = ThemeManager.getCurrent();

    // 아트보드 제외 전체 삭제 후 재생성
    const artboard = CanvasManager.getArtboard();
    canvas.getObjects().filter(o => o !== artboard).forEach(o => canvas.remove(o));

    const savedBlocks = [...this.blocks];
    this.blocks = [];

    savedBlocks.forEach(b => {
      const builder = BlockBuilders[b.id];
      if (!builder) return;
      const yOffset = this.getTotalHeight();
      const blockKey = b.key || (b.id + '_' + Date.now() + '_' + Math.random().toString(36).slice(2));
      const result = builder(yOffset, theme);
      const flatObjs = result.objects.flat();
      flatObjs.forEach(obj => {
        obj._blockId = b.id;
        obj._blockKey = blockKey;
        canvas.add(obj);
      });
      this.blocks.push({ id: b.id, key: blockKey, yOffset, height: result.height });
    });

    canvas.renderAll();
    CanvasManager.saveHistory();
  },

  // 전체 블록 높이 합산
  getTotalHeight() {
    return this.blocks.reduce((sum, b) => sum + b.height, 0);
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
    // 텍스트/강조 오브젝트 색상 재적용
    if (theme) ThemeManager.apply(theme);
    if (window.PanelLeft?.refreshBlockStack) window.PanelLeft.refreshBlockStack();
  },
};
