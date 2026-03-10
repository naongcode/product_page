/**
 * themes.js — 테마 정의 (색상 톤 + 폰트 세트)
 */

window.Themes = [
  {
    id: 'clean-modern',
    name: '클린 모던',
    desc: '생활용품, 전자',
    colors: { bg: '#FFFFFF', accent: '#222222', text: '#111111', subtext: '#6b7280' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'premium-dark',
    name: '프리미엄 다크',
    desc: '고급 소비재',
    colors: { bg: '#1A1A1A', accent: '#FFFFFF', text: '#F0F0F0', subtext: '#9ca3af' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'natural-organic',
    name: '내추럴 오가닉',
    desc: '친환경, 식품',
    colors: { bg: '#FAF6F0', accent: '#8B6F47', text: '#3D2B1F', subtext: '#92745a' },
    fonts: { heading: 'Gowun Batang', body: 'Noto Serif KR' },
    headingWeight: '700',
    bodyWeight: '400',
  },
  {
    id: 'beauty-soft',
    name: '뷰티 감성',
    desc: '뷰티, 화장품',
    colors: { bg: '#FDF0F3', accent: '#D4607A', text: '#3D1A24', subtext: '#a06070' },
    fonts: { heading: 'Nanum Myeongjo', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '300',
  },
  {
    id: 'healthy-green',
    name: '헬시 그린',
    desc: '건강식품',
    colors: { bg: '#F0FAF8', accent: '#2A9D8F', text: '#1A3D38', subtext: '#4a8077' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'vivid-food',
    name: '활기 비비드',
    desc: '식품, 스낵',
    colors: { bg: '#FFFBF0', accent: '#E9A800', text: '#3D2E00', subtext: '#8a6800' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '900',
    bodyWeight: '400',
  },
  {
    id: 'navy-trust',
    name: '네이비 트러스트',
    desc: '신뢰, 전문',
    colors: { bg: '#F0F4FA', accent: '#1B3A7A', text: '#0D1F45', subtext: '#4a6090' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
    headingWeight: '800',
    bodyWeight: '400',
  },
  {
    id: 'soft-gray',
    name: '소프트 그레이',
    desc: '모던, 심플',
    colors: { bg: '#F5F5F5', accent: '#333333', text: '#222222', subtext: '#737373' },
    fonts: { heading: 'Nanum Square', body: 'Noto Sans KR' },
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
    canvas.getObjects().forEach(obj => {
      if (obj.name === '__artboard__') return;

      if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') {
        const isHeading = (obj.fontSize >= 28) || obj._isHeading;
        if (isHeading) {
          obj.set({
            fontFamily: theme.fonts.heading,
            fill: theme.colors.text,
            fontWeight: theme.headingWeight,
          });
        } else {
          obj.set({
            fontFamily: theme.fonts.body,
            fill: theme.colors.subtext,
            fontWeight: theme.bodyWeight,
          });
        }
      }

      // 도형 — 강조색으로
      if (obj.type === 'rect' && obj._isAccent) {
        obj.set('fill', theme.colors.accent);
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
