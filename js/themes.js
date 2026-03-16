/**
 * themes.js — 테마 정의 (색상 톤 + 폰트 세트)
 *
 * 색조 시스템 슬롯 정의
 * ─────────────────────────────────────────────
 * Neutral scale  (밝기 순)
 *   bg         페이지 배경 (가장 밝음)
 *   bgAlt      교대 섹션 배경 (bg 바로 아래 단계)
 *   surface    카드/컴포넌트 배경
 *   border     구분선·스트로크
 *
 * Text hierarchy  (강조 → 흐림)
 *   text       주 본문 텍스트
 *   subtext    보조 텍스트
 *   textMuted  캡션·힌트 텍스트
 *
 * Brand
 *   hero       히어로 섹션 배경 (브랜드 컬러 기반)
 *   accent     주 강조색 (버튼·아이콘·라인)
 *   accent2    보조 강조색 (뱃지·포인트)
 * ─────────────────────────────────────────────
 */

window.Themes = [
  {
    id: 'clean-modern',
    name: '클린 모던',
    desc: '생활용품, 전자',
    colors: {
      bg:         '#FFFFFF',
      bgAlt:      '#F9FAFB',
      surface:    '#F3F4F6',
      border:     '#E5E7EB',
      hero:       '#111827',
      accent:     '#2563EB',
      accent2:    '#6366F1',
      text:       '#111827',
      subtext:    '#4B5563',
      textMuted:  '#9CA3AF',
    },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'premium-dark',
    name: '프리미엄 다크',
    desc: '고급 소비재',
    colors: {
      bg:         '#181818',
      bgAlt:      '#1E1E1E',
      surface:    '#272727',
      border:     '#363636',
      hero:       '#C9A84C',
      accent:     '#E8C060',
      accent2:    '#C9A84C',
      text:       '#F2F2F2',
      subtext:    '#ABABAB',
      textMuted:  '#6E6E6E',
    },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'natural-organic',
    name: '내추럴 오가닉',
    desc: '친환경, 식품',
    colors: {
      bg:         '#FAF7F2',
      bgAlt:      '#F5EDE2',
      surface:    '#EDE0CF',
      border:     '#D6C4AD',
      hero:       '#3D2B1F',
      accent:     '#8B6F47',
      accent2:    '#5C8A6A',
      text:       '#2C1A10',
      subtext:    '#6B4E34',
      textMuted:  '#9E8070',
    },
    fonts: { heading: 'Gowun Batang', body: 'Noto Serif KR' },
    headingWeight: '700',
    bodyWeight: '400',
  },
  {
    id: 'beauty-soft',
    name: '뷰티 감성',
    desc: '뷰티, 화장품',
    colors: {
      bg:         '#FEF0F4',
      bgAlt:      '#FAE4EC',
      surface:    '#F5D4E2',
      border:     '#EAB8CC',
      hero:       '#8C1A3C',
      accent:     '#C83C68',
      accent2:    '#9050A8',
      text:       '#3D0D20',
      subtext:    '#7A3050',
      textMuted:  '#B07890',
    },
    fonts: { heading: 'Nanum Myeongjo', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '300',
  },
  {
    id: 'healthy-green',
    name: '헬시 그린',
    desc: '건강식품',
    colors: {
      bg:         '#F0FAF8',
      bgAlt:      '#E2F5F1',
      surface:    '#C8EAE4',
      border:     '#A0D4CC',
      hero:       '#0D4A40',
      accent:     '#1A8C7E',
      accent2:    '#E8623C',
      text:       '#0A2E28',
      subtext:    '#2E7268',
      textMuted:  '#60A89E',
    },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'vivid-food',
    name: '활기 비비드',
    desc: '식품, 스낵',
    colors: {
      bg:         '#FFFCF0',
      bgAlt:      '#FFF7DC',
      surface:    '#FEEEBB',
      border:     '#F5D870',
      hero:       '#C03800',
      accent:     '#E85000',
      accent2:    '#F5A800',
      text:       '#2C1A00',
      subtext:    '#7A4800',
      textMuted:  '#B88030',
    },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '900',
    bodyWeight: '400',
  },
  {
    id: 'navy-trust',
    name: '네이비 트러스트',
    desc: '신뢰, 전문',
    colors: {
      bg:         '#F0F5FC',
      bgAlt:      '#E4EEF8',
      surface:    '#D0E2F4',
      border:     '#B0C8E8',
      hero:       '#071428',
      accent:     '#1A3A82',
      accent2:    '#0A90C8',
      text:       '#071428',
      subtext:    '#2A487A',
      textMuted:  '#6080A8',
    },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'soft-gray',
    name: '소프트 그레이',
    desc: '모던, 심플',
    colors: {
      bg:         '#F8F8F8',
      bgAlt:      '#F2F2F2',
      surface:    '#E8E8E8',
      border:     '#D4D4D4',
      hero:       '#1F2937',
      accent:     '#4F46E5',
      accent2:    '#7C3AED',
      text:       '#1F2937',
      subtext:    '#4B5563',
      textMuted:  '#9CA3AF',
    },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '700',
    bodyWeight: '400',
  },
  {
    id: 'kids-pastel',
    name: '키즈 파스텔',
    desc: '유아동, 완구',
    colors: {
      bg:         '#FFFBFE',
      bgAlt:      '#FFF0FA',
      surface:    '#FFE0F4',
      border:     '#FFC8E8',
      hero:       '#D8406C',
      accent:     '#F06292',
      accent2:    '#4FC3F7',
      text:       '#3C0A24',
      subtext:    '#7A2850',
      textMuted:  '#B07090',
    },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '900',
    bodyWeight: '400',
  },
  {
    id: 'luxury-wine',
    name: '럭셔리 와인',
    desc: '와인, 주류, 고급 식품',
    colors: {
      bg:         '#1A0810',
      bgAlt:      '#220E18',
      surface:    '#2E1424',
      border:     '#481C30',
      hero:       '#5A1828',
      accent:     '#C0884A',
      accent2:    '#EAC96A',
      text:       '#F5E0D0',
      subtext:    '#C8A888',
      textMuted:  '#8A7068',
    },
    fonts: { heading: 'Nanum Myeongjo', body: 'Noto Serif KR' },
    headingWeight: '700',
    bodyWeight: '400',
  },
  {
    id: 'yuzu-fresh',
    name: '유자 프레시',
    desc: '시트러스, 청, 과일 가공식품',
    colors: {
      bg:         '#FEFCE8',
      bgAlt:      '#FEFACC',
      surface:    '#FDEE9C',
      border:     '#F5D860',
      hero:       '#2E4A10',
      accent:     '#C8A000',
      accent2:    '#2A9240',
      text:       '#1A1A00',
      subtext:    '#4A6010',
      textMuted:  '#8A9040',
    },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '900',
    bodyWeight: '400',
  },
];

window.ThemeManager = {
  current: null,

  apply(themeId) {
    const theme = window.Themes.find(t => t.id === themeId);
    if (!theme) return;
    this.current = theme;

    const canvas = CanvasManager.getCanvas();
    const artboard = CanvasManager.getArtboard();

    if (artboard) {
      artboard.set('fill', theme.colors.bg);
    }

    const c = theme.colors;
    const heroBg    = c.hero || c.bg;
    const heroLight = _isLightColor(heroBg);
    const bgLight   = _isLightColor(c.bg);

    // 배경 밝기에 따른 안전한 텍스트 색상
    const safeText    = bgLight ? c.text    : (_isLightColor(c.text)    ? c.text    : '#f5f5f5');
    const safeSub     = bgLight ? c.subtext : (_isLightColor(c.subtext) ? c.subtext : 'rgba(255,255,255,0.72)');
    const safeMuted   = bgLight ? (c.textMuted || c.subtext)
                                : (_isLightColor(c.textMuted || c.subtext)
                                    ? (c.textMuted || c.subtext)
                                    : 'rgba(255,255,255,0.45)');

    const heroTextOnLight    = _isLightColor(c.text)    ? '#111111' : c.text;
    const heroSubtextOnLight = _isLightColor(c.subtext) ? '#444444' : c.subtext;

    canvas.getObjects().forEach(obj => {
      if (obj.name === '__artboard__') return;
      if (obj._isDecor) return;

      // 액센트 텍스트
      if (obj._isAccentText) {
        obj.set({
          fill: c.accent,
          fontFamily: obj._isHeading ? theme.fonts.heading : theme.fonts.body,
        });
        return;
      }

      // 히어로 텍스트
      if (obj._isHeroText) {
        const isHeading = obj.fontSize >= 28 || obj._isHeading;
        if (isHeading) {
          obj.set({
            fontFamily: theme.fonts.heading,
            fill: heroLight ? heroTextOnLight : '#ffffff',
            fontWeight: theme.headingWeight,
          });
        } else {
          obj.set({
            fontFamily: theme.fonts.body,
            fill: heroLight ? heroSubtextOnLight : 'rgba(255,255,255,0.72)',
            fontWeight: theme.bodyWeight,
          });
        }
        return;
      }

      // 일반 텍스트 — 3단 위계
      if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') {
        const isHeading = (obj.fontSize >= 28) || obj._isHeading;
        const isMuted   = obj._isMutedText;
        if (isHeading) {
          obj.set({ fontFamily: theme.fonts.heading, fill: safeText,  fontWeight: theme.headingWeight });
        } else if (isMuted) {
          obj.set({ fontFamily: theme.fonts.body,    fill: safeMuted, fontWeight: theme.bodyWeight });
        } else {
          obj.set({ fontFamily: theme.fonts.body,    fill: safeSub,   fontWeight: theme.bodyWeight });
        }
      }

      // 도형
      if ((obj.type === 'rect' || obj.type === 'circle') && obj._isAccent) {
        obj.set('fill', c.accent);
      }
      if ((obj.type === 'rect' || obj.type === 'circle') && obj._isAccent2) {
        obj.set('fill', c.accent2 || c.accent);
      }
      if (obj.type === 'rect' && obj._isBorder) {
        obj.set('fill', c.border || c.surface);
      }
      if (obj.type === 'rect' && obj._isBg) {
        obj.set('fill', c.bg);
      }
      if (obj.type === 'rect' && obj._isBgAlt) {
        obj.set('fill', c.bgAlt || c.surface);
      }
      if (obj.type === 'rect' && obj._isSurface) {
        obj.set('fill', c.surface || c.bg);
      }
      if (obj.type === 'rect' && obj._isGradientHero) {
        const grad = new fabric.Gradient({
          type: 'linear', gradientUnits: 'pixels',
          coords: { x1: 0, y1: 0, x2: 0, y2: obj.height },
          colorStops: [
            { offset: 0, color: heroBg },
            { offset: 1, color: _darkenHex(heroBg, 32) },
          ],
        });
        obj.set('fill', grad);
      }
      if (obj.type === 'rect' && obj._isHero) {
        obj.set('fill', heroBg);
      }
      if (obj.type === 'rect' && obj._isHeroDivider) {
        obj.set('fill', heroLight ? c.accent : (c.accent2 || '#ffffff'));
      }
    });

    canvas.renderAll();
    CanvasManager.saveHistory();
  },

  getTheme(id) {
    return window.Themes.find(t => t.id === id);
  },

  getCurrent() {
    return this.current;
  },
};
