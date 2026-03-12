/**
 * themes.js — 테마 정의 (색상 톤 + 폰트 세트)
 */

window.Themes = [
  {
    id: 'clean-modern',
    name: '클린 모던',
    desc: '생활용품, 전자',
    colors: { bg: '#FFFFFF', surface: '#F3F4F6', hero: '#111827', accent: '#222222', accent2: '#3B82F6', text: '#111111', subtext: '#6b7280' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'premium-dark',
    name: '프리미엄 다크',
    desc: '고급 소비재',
    colors: { bg: '#1A1A1A', surface: '#2A2A2A', hero: '#C9A84C', accent: '#FFFFFF', accent2: '#C9A84C', text: '#F0F0F0', subtext: '#9ca3af' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'natural-organic',
    name: '내추럴 오가닉',
    desc: '친환경, 식품',
    colors: { bg: '#FAF6F0', surface: '#EDE5D8', hero: '#4A3728', accent: '#8B6F47', accent2: '#5C8A6A', text: '#3D2B1F', subtext: '#92745a' },
    fonts: { heading: 'Gowun Batang', body: 'Noto Serif KR' },
    headingWeight: '700',
    bodyWeight: '400',
  },
  {
    id: 'beauty-soft',
    name: '뷰티 감성',
    desc: '뷰티, 화장품',
    colors: { bg: '#FDF0F3', surface: '#F8DDE5', hero: '#A03055', accent: '#D4607A', accent2: '#9B59A0', text: '#3D1A24', subtext: '#a06070' },
    fonts: { heading: 'Nanum Myeongjo', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '300',
  },
  {
    id: 'healthy-green',
    name: '헬시 그린',
    desc: '건강식품',
    colors: { bg: '#F0FAF8', surface: '#D4F0EA', hero: '#155E52', accent: '#2A9D8F', accent2: '#E76F51', text: '#1A3D38', subtext: '#4a8077' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'vivid-food',
    name: '활기 비비드',
    desc: '식품, 스낵',
    colors: { bg: '#FFFBF0', surface: '#FFF0CC', hero: '#CC4400', accent: '#E9A800', accent2: '#E05C00', text: '#3D2E00', subtext: '#8a6800' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '900',
    bodyWeight: '400',
  },
  {
    id: 'navy-trust',
    name: '네이비 트러스트',
    desc: '신뢰, 전문',
    colors: { bg: '#F0F4FA', surface: '#DBEAFE', hero: '#0A1830', accent: '#1B3A7A', accent2: '#0EA5E9', text: '#0D1F45', subtext: '#4a6090' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'soft-gray',
    name: '소프트 그레이',
    desc: '모던, 심플',
    colors: { bg: '#F5F5F5', surface: '#E8E8E8', hero: '#1F2937', accent: '#333333', accent2: '#6366F1', text: '#222222', subtext: '#737373' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '700',
    bodyWeight: '400',
  },
  {
    id: 'kids-pastel',
    name: '키즈 파스텔',
    desc: '유아동, 완구',
    colors: { bg: '#FFFBFE', surface: '#FDE8F5', hero: '#F06292', accent: '#F48FB1', accent2: '#81D4FA', text: '#3D1A30', subtext: '#a05070' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '900',
    bodyWeight: '400',
  },
  {
    id: 'luxury-wine',
    name: '럭셔리 와인',
    desc: '와인, 주류, 고급 식품',
    colors: { bg: '#1C0A14', surface: '#2E1422', hero: '#5C1A2E', accent: '#C0884A', accent2: '#E8C97A', text: '#F5E6D8', subtext: '#c9a98a' },
    fonts: { heading: 'Nanum Myeongjo', body: 'Noto Serif KR' },
    headingWeight: '700',
    bodyWeight: '400',
  },
];

window.ThemeManager = {
  // 현재 적용된 테마
  current: null,

  // 테마 적용 (캔버스 전체 텍스트/도형 색상 일괄 변경)
  apply(themeId) {
    const theme = window.Themes.find(t => t.id === themeId);
    if (!theme) return;
    this.current = theme;

    const canvas = CanvasManager.getCanvas();
    const artboard = CanvasManager.getArtboard();

    // 아트보드 배경색 변경
    if (artboard) {
      artboard.set('fill', theme.colors.bg);
    }

    // 모든 텍스트 오브젝트 폰트/색상 변경
    const heroBg = theme.colors.hero || theme.colors.bg;
    const heroIsLight = _isLightColor(heroBg);
    const bgIsLight = _isLightColor(theme.colors.bg);

    // 배경 밝기에 따른 안전한 텍스트 색상
    const safeText = bgIsLight ? theme.colors.text : (_isLightColor(theme.colors.text) ? theme.colors.text : '#f5f5f5');
    const safeSubtext = bgIsLight ? theme.colors.subtext : (_isLightColor(theme.colors.subtext) ? theme.colors.subtext : 'rgba(255,255,255,0.72)');

    const heroTextOnLight = _isLightColor(theme.colors.text) ? '#111111' : theme.colors.text;
    const heroSubtextOnLight = _isLightColor(theme.colors.subtext) ? '#444444' : theme.colors.subtext;

    canvas.getObjects().forEach(obj => {
      if (obj.name === '__artboard__') return;

      // 히어로 블록 텍스트 — 히어로 배경 밝기 기준으로 별도 처리
      if (obj._isHeroText) {
        const isHeading = obj.fontSize >= 28 || obj._isHeading;
        if (isHeading) {
          obj.set({
            fontFamily: theme.fonts.heading,
            fill: heroIsLight ? heroTextOnLight : '#ffffff',
            fontWeight: theme.headingWeight,
          });
        } else {
          obj.set({
            fontFamily: theme.fonts.body,
            fill: heroIsLight ? heroSubtextOnLight : 'rgba(255,255,255,0.7)',
            fontWeight: theme.bodyWeight,
          });
        }
        return;
      }

      if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') {
        const isHeading = (obj.fontSize >= 28) || obj._isHeading;
        if (isHeading) {
          obj.set({ fontFamily: theme.fonts.heading, fill: safeText, fontWeight: theme.headingWeight });
        } else {
          obj.set({ fontFamily: theme.fonts.body, fill: safeSubtext, fontWeight: theme.bodyWeight });
        }
      }

      // 도형 — 강조색으로
      if ((obj.type === 'rect' || obj.type === 'circle') && obj._isAccent) {
        obj.set('fill', theme.colors.accent);
      }
      if ((obj.type === 'rect' || obj.type === 'circle') && obj._isAccent2) {
        obj.set('fill', theme.colors.accent2 || theme.colors.accent);
      }
      if (obj.type === 'rect' && obj._isBg) {
        obj.set('fill', theme.colors.bg);
      }
      if (obj.type === 'rect' && obj._isSurface) {
        obj.set('fill', theme.colors.surface || theme.colors.bg);
      }
      if (obj.type === 'rect' && obj._isHero) {
        obj.set('fill', heroBg);
      }
      if (obj.type === 'rect' && obj._isHeroDivider) {
        obj.set('fill', heroIsLight ? theme.colors.accent : (theme.colors.accent2 || '#ffffff'));
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
