/**
 * templates.js — 템플릿 정의
 * 각 템플릿은 블록 ID 조합 + 기본 테마
 * 블록은 실제 상품 페이지 흐름에 맞게 15개 구성
 */

window.Templates = [

  // ─── 1. 기본형 (생활용품) ─────────────────────────────────────────────────
  {
    id: 'basic',
    name: '기본형',
    desc: '범용적으로 사용 가능한 기본 구성',
    category: '공통',
    defaultTheme: 'clean-modern',
    blocks: [
      'b01-main-banner',
      'b10-text-center',
      'b04-feature-2col',
      'b06-full-image',
      'b05-feature-3col',
      'b02-img-left',
      'b03-img-right',
      'b08-gallery-2col',
      'b13-how-to-use',
      'b09-gallery-3col',
      'b07-spec-table',
      'b14-review',
      'b15-cta',
      'b11-caution',
      'b12-brand-banner',
    ],
    content: {
      'b01-main-banner': {
        title: '공기청정기\nPure Air 360',
        subtitle: 'H13 헤파필터 · PM2.5 99.97% 제거 · 360° 청정',
      },
      'b10-text-center': {
        title: '맑은 공기, 건강한 일상',
        body: '미세먼지와 유해물질로부터 가족을 지키세요.\n국제 인증 H13 등급 헤파필터로 가장 작은 먼지까지 포집합니다.',
      },
      'b04-feature-2col': {
        items: [
          { title: 'H13 헤파필터', desc: 'PM2.5 초미세먼지 99.97% 제거\n병원급 공기 청정 성능' },
          { title: '저소음 운전', desc: '수면 모드 22dB 초저소음\n숙면을 방해하지 않습니다' },
        ],
      },
      'b02-img-left': {
        title: '360° 전방향 흡입',
        desc: '사방에서 공기를 흡입하여\n빠르게 실내 전체를 청정합니다.\n20평 기준 15분이면 충분합니다.',
      },
      'b03-img-right': {
        title: '스마트 공기질 감지',
        desc: '실시간으로 공기질을 측정하고\n자동으로 풍량을 조절합니다.\n앱으로 외출 중에도 제어 가능.',
      },
      'b05-feature-3col': {
        items: [
          { title: '프리필터', desc: '머리카락·대형 먼지\n1차 포집' },
          { title: '헤파필터', desc: '초미세먼지·세균\n99.97% 제거' },
          { title: '활성탄필터', desc: '유해가스·악취\n완전 탈취' },
        ],
      },
      'b13-how-to-use': {
        items: [
          { step: '01', title: '전원 연결', desc: '콘센트에 연결 후\n전원 버튼을 누르세요.' },
          { step: '02', title: '모드 선택', desc: '자동/수면/강력 모드 중\n원하는 모드를 선택하세요.' },
          { step: '03', title: '필터 관리', desc: '6개월마다 필터를 교체하면\n최상의 성능을 유지합니다.' },
        ],
      },
      'b07-spec-table': {
        title: '제품 사양',
        rows: [
          ['제품명', 'Pure Air 360 공기청정기'],
          ['적용 면적', '최대 20평 (66m²)'],
          ['필터 등급', 'H13 헤파필터 (의료용)'],
          ['소음', '22dB (수면 모드) / 48dB (강력 모드)'],
          ['전력 소비', '45W (최대)'],
        ],
      },
      'b14-review': {
        items: [
          { stars: '★★★★★', text: '알레르기 있는 아이가 확실히\n재채기가 줄었어요. 대만족!', name: '아이 둔 부모' },
          { stars: '★★★★★', text: '소음이 정말 조용해요.\n켜놓고 자도 전혀 불편하지 않아요.', name: '직장인 구매자' },
          { stars: '★★★★☆', text: '공기질 수치가 눈에 띄게 좋아졌어요.\n디자인도 예쁘고 만족합니다.', name: '신혼부부 구매자' },
        ],
      },
      'b15-cta': {
        headline: '깨끗한 공기로 시작하세요',
        sub: '무료 배송 · 30일 체험 보장 · 1년 A/S',
      },
      'b11-caution': {
        items: [
          '필터 교체 주기를 지켜 최적의 성능을 유지하세요 (6개월 권장)',
          '직사광선이나 열원 근처에 설치하지 마세요',
          '어린이 손에 닿지 않도록 주의하세요',
        ],
      },
      'b12-brand-banner': {
        name: 'PureAir',
        slogan: '모든 숨결이 맑아지는 순간',
      },
    },
  },

  // ─── 2. 감성형 (뷰티/패션) ───────────────────────────────────────────────
  {
    id: 'emotional',
    name: '감성형',
    desc: '감성적인 이미지 중심 레이아웃',
    category: '뷰티/패션',
    defaultTheme: 'beauty-soft',
    blocks: [
      'b01-main-banner',
      'b10-text-center',
      'b06-full-image',
      'b02-img-left',
      'b03-img-right',
      'b06-full-image',
      'b05-feature-3col',
      'b09-gallery-3col',
      'b10-text-center',
      'b08-gallery-2col',
      'b13-how-to-use',
      'b14-review',
      'b15-cta',
      'b11-caution',
      'b12-brand-banner',
    ],
    content: {
      'b01-main-banner': {
        title: '피부가 빛나는\n순간을 위해',
        subtitle: '수분 집중 앰플 · 히알루론산 5중 복합체 · 피부과 테스트 완료',
      },
      'b10-text-center': {
        title: '피부 속부터 채우는 수분',
        body: '단순히 표면을 촉촉하게 하는 것이 아닙니다.\n히알루론산 5중 복합체가 피부 깊숙이 침투하여\n24시간 지속되는 수분막을 형성합니다.',
      },
      'b02-img-left': {
        title: '5중 히알루론산',
        desc: '분자 크기가 다른 5가지 히알루론산으로\n피부 표면부터 진피층까지\n촘촘하게 수분을 채워줍니다.',
      },
      'b03-img-right': {
        title: '24시간 수분 지속',
        desc: '한 번 바르면 24시간 동안\n수분 손실을 차단합니다.\n건조한 환경에서도 촉촉함 유지.',
      },
      'b05-feature-3col': {
        items: [
          { title: '무향·무색소', desc: '민감한 피부에도\n안전한 성분' },
          { title: '피부과 테스트', desc: '임상 시험 완료\n저자극 인증' },
          { title: '비건 인증', desc: '동물 유래 성분\n불포함' },
        ],
      },
      'b10-text-center': {
        title: '사용 전 · 후',
        body: '4주 사용 후 수분도 38% 증가\n탄력 지수 27% 개선 (자체 임상 데이터)',
      },
      'b13-how-to-use': {
        items: [
          { step: '01', title: '세안 후 즉시', desc: '피부가 촉촉할 때\n즉시 도포하면 흡수율이 높아요.' },
          { step: '02', title: '2~3방울 사용', desc: '손바닥에 덜어 체온으로\n살짝 데운 후 얼굴에 흡수시키세요.' },
          { step: '03', title: '아침·저녁 사용', desc: '하루 2회 꾸준히 사용하면\n가장 빠른 효과를 느낄 수 있어요.' },
        ],
      },
      'b14-review': {
        items: [
          { stars: '★★★★★', text: '건성 피부인데 이제 세안 후\n당김이 없어졌어요. 진짜 수분이 차요!', name: '건성 피부 30대' },
          { stars: '★★★★★', text: '발림성이 너무 좋고 끈적이지 않아요.\n화장 전에 쓰면 더 잘 먹어요.', name: '뷰티 블로거' },
          { stars: '★★★★☆', text: '2주 만에 피부가 탱탱해진 느낌!\n향이 없어서 민감한 피부에도 굿.', name: '민감성 피부' },
        ],
      },
      'b15-cta': {
        headline: '지금 피부를 바꾸세요',
        sub: '첫 구매 20% 할인 · 7일 체험 키트 증정 · 무료 배송',
      },
      'b11-caution': {
        items: [
          '사용 후 이상이 있을 경우 즉시 사용을 중단하세요',
          '눈에 들어가지 않도록 주의하세요',
          '개봉 후 12개월 이내에 사용하세요',
        ],
      },
      'b12-brand-banner': {
        name: 'LUMIÈRE',
        slogan: '당신의 빛을 되찾아드립니다',
      },
    },
  },

  // ─── 3. 정보형 (식품/건강) ───────────────────────────────────────────────
  {
    id: 'informative',
    name: '정보형',
    desc: '성분/스펙 정보를 강조하는 구성',
    category: '식품/건강',
    defaultTheme: 'healthy-green',
    blocks: [
      'b01-main-banner',
      'b10-text-center',
      'b04-feature-2col',
      'b06-full-image',
      'b05-feature-3col',
      'b02-img-left',
      'b03-img-right',
      'b13-how-to-use',
      'b08-gallery-2col',
      'b07-spec-table',
      'b09-gallery-3col',
      'b14-review',
      'b15-cta',
      'b11-caution',
      'b12-brand-banner',
    ],
    content: {
      'b01-main-banner': {
        title: '하루 한 알\n프리미엄 오메가3',
        subtitle: '노르웨이산 원료 · EPA+DHA 1,200mg · 장용성 캡슐',
      },
      'b10-text-center': {
        title: '혈행 건강의 시작',
        body: '바다 깊은 곳에서 온 순수한 오메가3.\n노르웨이 청정 해역의 등푸른 생선에서만 추출한\n고순도 원료로 혈행 건강을 지킵니다.',
      },
      'b04-feature-2col': {
        items: [
          { title: '고농도 EPA·DHA', desc: '오메가3 지방산 1,200mg 고함량\n혈행 건강을 집중적으로 케어합니다' },
          { title: '비린내 Zero', desc: '특허 장용성 캡슐 기술 적용\n위에서 녹지 않아 비린내가 없습니다' },
        ],
      },
      'b02-img-left': {
        title: '노르웨이산 원료',
        desc: '세계 최고 품질의 노르웨이 청정 해역에서\n엄선한 원료만 사용합니다.\nIFOS 5성급 인증으로 순도를 보장합니다.',
      },
      'b03-img-right': {
        title: '장용성 캡슐 기술',
        desc: '위산에 녹지 않고 소장에서 흡수되는\n특허 장용성 캡슐 기술 적용.\n비린내 없이 최대 흡수율을 실현합니다.',
      },
      'b05-feature-3col': {
        items: [
          { title: 'IFOS 인증', desc: '국제 어유 기준\n5성급 품질 인증' },
          { title: 'GMP 제조', desc: '의약품 기준\nGMP 공장 생산' },
          { title: '중금속 無', desc: '중금속·오염물질\n불검출 확인' },
        ],
      },
      'b13-how-to-use': {
        items: [
          { step: '01', title: '식사와 함께', desc: '하루 1캡슐, 식사 중 또는\n식후에 물과 함께 섭취하세요.' },
          { step: '02', title: '꾸준히 섭취', desc: '최소 3개월 이상 꾸준히\n섭취해야 효과를 느낄 수 있습니다.' },
          { step: '03', title: '서늘하게 보관', desc: '직사광선을 피해 서늘하고\n건조한 곳에 보관하세요.' },
        ],
      },
      'b07-spec-table': {
        title: '제품 상세 정보',
        rows: [
          ['제품명', '프리미엄 오메가3 1200mg'],
          ['내용량', '60캡슐 (30일분)'],
          ['원료명', '노르웨이산 정제어유 (EPA·DHA)'],
          ['유통기한', '제조일로부터 24개월'],
          ['보관방법', '직사광선을 피해 서늘한 곳에 보관'],
        ],
      },
      'b14-review': {
        items: [
          { stars: '★★★★★', text: '꾸준히 먹은 지 2개월 됐는데\n혈액검사 수치가 좋아졌어요!', name: '40대 직장인' },
          { stars: '★★★★★', text: '비린내가 전혀 없어서 놀랐어요.\n매일 아침 먹기 정말 편합니다.', name: '건강 관심 주부' },
          { stars: '★★★★☆', text: '캡슐이 작고 삼키기 쉬워요.\n부모님께도 챙겨드리고 있습니다.', name: '효도 구매 고객' },
        ],
      },
      'b15-cta': {
        headline: '지금 시작하세요',
        sub: '30일분 무료 체험 · 100% 만족 보장 · 당일 출고',
      },
      'b11-caution': {
        items: [
          '혈액응고억제제를 복용 중이라면 전문가와 상담 후 섭취하세요',
          '어패류 알레르기가 있으신 분은 섭취 전 성분을 확인하세요',
          '어린이 손에 닿지 않는 곳에 보관하세요',
        ],
      },
      'b12-brand-banner': {
        name: 'OceanPure',
        slogan: '자연에서 온 건강, 과학이 만든 순수',
      },
    },
  },

  // ─── 4. 이미지 중심형 (공통) ─────────────────────────────────────────────
  {
    id: 'image-focus',
    name: '이미지 중심형',
    desc: '고품질 이미지를 앞세운 구성',
    category: '공통',
    defaultTheme: 'premium-dark',
    blocks: [
      'b01-main-banner',
      'b06-full-image',
      'b10-text-center',
      'b09-gallery-3col',
      'b02-img-left',
      'b06-full-image',
      'b03-img-right',
      'b05-feature-3col',
      'b08-gallery-2col',
      'b10-text-center',
      'b09-gallery-3col',
      'b14-review',
      'b15-cta',
      'b11-caution',
      'b12-brand-banner',
    ],
    content: {
      'b01-main-banner': {
        title: '공간을 완성하는\n프리미엄 조명',
        subtitle: '수제 황동 소재 · 조광 가능 · 인테리어 디자이너 추천',
      },
      'b10-text-center': {
        title: '빛으로 만드는 분위기',
        body: '조명 하나가 공간 전체의 무드를 바꿉니다.\n장인이 직접 제작한 황동 소재의 따뜻한 빛으로\n당신만의 공간을 완성하세요.',
      },
      'b02-img-left': {
        title: '수제 황동 소재',
        desc: '국내 장인이 직접 손으로 다듬은\n황동 소재는 시간이 지날수록\n더욱 깊은 질감으로 변화합니다.',
      },
      'b03-img-right': {
        title: '조광 기능',
        desc: '밝기를 1~100%까지 자유롭게 조절하여\n식사, 영화, 독서 등 상황에 맞는\n최적의 조명 분위기를 연출하세요.',
      },
      'b05-feature-3col': {
        items: [
          { title: '수제 황동', desc: '장인 핸드메이드\n고급 황동 소재' },
          { title: '조광 기능', desc: '1~100% 밝기\n무단 조절 가능' },
          { title: '3년 보증', desc: '제품 불량 시\n무상 교체 보증' },
        ],
      },
      'b10-text-center': {
        title: '어떤 공간에도',
        body: '거실, 침실, 서재, 카페까지.\n공간의 성격에 맞게 각도와 밝기를 조절하여\n완벽한 조명 인테리어를 완성하세요.',
      },
      'b14-review': {
        items: [
          { stars: '★★★★★', text: '인테리어 소품 중 가장 만족스러운\n구매예요. 집이 카페가 됐어요!', name: '인테리어 관심 고객' },
          { stars: '★★★★★', text: '황동 특유의 질감이 사진보다 훨씬\n예뻐요. 선물받은 친구가 넘 좋아해요.', name: '선물 구매 고객' },
          { stars: '★★★★☆', text: '조광 기능이 정말 편리해요.\n분위기 있는 저녁이 필요할 때 딱!', name: '홈카페 운영자' },
        ],
      },
      'b15-cta': {
        headline: '공간을 완성하세요',
        sub: '전국 무료 배송 · 30일 반품 보장 · 3년 AS 보증',
      },
      'b11-caution': {
        items: [
          '전기 제품입니다. 물기가 있는 곳에서 사용하지 마세요',
          '어린이 손에 닿지 않도록 설치하세요',
          '최대 정격 와트 이상의 전구를 사용하지 마세요',
        ],
      },
      'b12-brand-banner': {
        name: 'BRASS & LIGHT',
        slogan: '빛으로 완성되는 공간의 품격',
      },
    },
  },

  // ─── 5. 식품 감성형 (식품/건강) ──────────────────────────────────────────
  {
    id: 'food-artisan',
    name: '식품 감성형',
    desc: '원재료 스토리와 감성을 담은 식품 특화 구성',
    category: '식품/건강',
    defaultTheme: 'yuzu-fresh',
    blocks: [
      'b01-main-banner',
      'b10-text-center',
      'b06-full-image',
      'b02-img-left',
      'b03-img-right',
      'b05-feature-3col',
      'b06-full-image',
      'b08-gallery-2col',
      'b13-how-to-use',
      'b04-feature-2col',
      'b07-spec-table',
      'b09-gallery-3col',
      'b14-review',
      'b15-cta',
      'b11-caution',
      'b12-brand-banner',
    ],
    content: {
      'b01-main-banner': {
        title: '제주 유자로 빚은\n수제 유자청',
        subtitle: '제주산 유자 100% · 무방부제 · 소량 수공 제조',
      },
      'b10-text-center': {
        title: '자연 그대로의 맛과 향',
        body: '설탕 한 꼬집, 유자 한 조각 — 그것이 전부입니다.\n제주 해풍을 맞고 자란 유자를 손으로 직접 손질하여\n시간을 들여 정성껏 숙성시킨 청입니다.',
      },
      'b02-img-left': {
        title: '제주산 유자만 고집합니다',
        desc: '해풍을 맞으며 자란 제주 유자는\n껍질이 두툼하고 향이 짙습니다.\n당도와 산미의 균형이 가장 아름다운\n제철 유자만을 골라 담습니다.',
      },
      'b03-img-right': {
        title: '손으로 만드는 정성',
        desc: '기계 대신 사람 손으로 하나하나 썰고\n정해진 비율대로 켜켜이 재웁니다.\n급하지 않게, 서두르지 않게\n최소 3개월 이상 저온 숙성합니다.',
      },
      'b05-feature-3col': {
        items: [
          { title: '무방부제', desc: '합성 첨가물 없이\n유자와 설탕만으로' },
          { title: '국내산 100%', desc: '제주 인증 농장\n직거래 유자 원물' },
          { title: '소량 수공 제조', desc: '한 번에 소량만\n정성 들여 만듭니다' },
        ],
      },
      'b13-how-to-use': {
        items: [
          { step: '01', title: '유자청 차로', desc: '따뜻한 물 200ml에\n2~3 스푼 넣어 드세요.' },
          { step: '02', title: '베이킹에 활용', desc: '케이크·머핀 반죽에 넣으면\n은은한 유자 향이 납니다.' },
          { step: '03', title: '드레싱·소스로', desc: '샐러드 드레싱, 고기 소스에\n감칠맛을 더해줍니다.' },
        ],
      },
      'b04-feature-2col': {
        items: [
          { title: '저당 레시피', desc: '일반 유자청 대비 30% 적은 설탕\n유자 본연의 맛이 더욱 살아있습니다' },
          { title: '냉장 6개월 보관', desc: '개봉 후 냉장 보관 시 6개월까지\n맛과 향을 그대로 즐기실 수 있습니다' },
        ],
      },
      'b07-spec-table': {
        title: '제품 정보',
        rows: [
          ['제품명', '제주 수제 유자청'],
          ['내용량', '500g / 1kg (선택)'],
          ['원재료', '제주산 유자(국내산), 설탕(국내산)'],
          ['유통기한', '제조일로부터 12개월'],
          ['보관방법', '개봉 전 실온 보관, 개봉 후 냉장 보관'],
        ],
      },
      'b14-review': {
        items: [
          { stars: '★★★★★', text: '향이 정말 진해요. 시중 유자청과는\n급이 다릅니다. 재구매 확정!', name: '유자청 마니아' },
          { stars: '★★★★★', text: '설탕이 덜해서 유자 맛이 살아있어요.\n차로 마시면 환상이에요.', name: '건강 챙기는 주부' },
          { stars: '★★★★☆', text: '선물용으로 샀는데 포장도 예쁘고\n받은 분이 너무 좋아했어요.', name: '선물 구매 후기' },
        ],
      },
      'b15-cta': {
        headline: '한 병에 담긴 제주의 여름',
        sub: '전국 무료 배송 · 선물 포장 무료 · 100% 국내산 보장',
      },
      'b11-caution': {
        items: [
          '개봉 후에는 반드시 냉장 보관하고 6개월 이내 섭취하세요',
          '유자 알레르기가 있으신 분은 섭취 전 성분을 확인하세요',
          '자연 발효로 인해 뚜껑을 열 때 가스가 발생할 수 있습니다',
        ],
      },
      'b12-brand-banner': {
        name: '제주청방',
        slogan: '제주의 햇살을 담아, 한 스푼의 행복',
      },
    },
  },

  // ─── 6. 프리미엄 테크형 (공통) ───────────────────────────────────────────
  {
    id: 'premium-tech',
    name: '프리미엄 테크형',
    desc: '수치·비교·분할로 기능을 강조하는 테크/가전 특화 구성',
    category: '공통',
    defaultTheme: 'clean-modern',
    blocks: [
      'b01-main-banner',
      'b25-stats',
      'b21-benefit-4col',
      'b29-img-overlay',
      'b31-staggered',
      'b24-split-screen',
      'b20-comparison',
      'b07-spec-table',
      'b28-faq',
      'b22-testimonial',
      'b27-ugc-grid',
      'b26-manifesto',
      'b34-magazine',
      'b15-cta',
      'b11-caution',
      'b12-brand-banner',
    ],
    content: {
      'b01-main-banner': {
        title: '소음 없는 세상\nQuietPro ANC',
        subtitle: '하이브리드 ANC · 드라이버 40mm · 연속 재생 30시간',
      },
      'b25-stats': {
        items: [
          { value: '-40dB', label: '소음 감쇠량' },
          { value: '30h', label: '연속 재생' },
          { value: '99%', label: '고객 만족도' },
        ],
      },
      'b21-benefit-4col': {
        items: [
          { num: '01', title: '하이브리드 ANC', desc: '외부 마이크 + 내부 마이크\n이중 능동 소음 차단' },
          { num: '02', title: '40mm 드라이버', desc: '풍부한 저음과 선명한\n고음을 동시에' },
          { num: '03', title: '30시간 재생', desc: 'ANC 켠 상태에서도\n30시간 연속 사용' },
          { num: '04', title: '멀티포인트', desc: '기기 2대 동시 연결\n끊김 없는 전환' },
        ],
      },
      'b29-img-overlay': {
        title: '착용하는 순간, 세상이 멈춘다',
        desc: '40mm 다이나믹 드라이버가 만들어내는\n풍부하고 입체적인 사운드.',
      },
      'b31-staggered': {
        items: [
          { title: '인체공학적 설계', desc: '장시간 착용해도 귀가 아프지 않습니다.\n메모리폼 이어쿠션이 귀에 완벽하게 밀착되어\n3시간 이상 착용 테스트 완료.' },
          { title: '폴더블 디자인', desc: '가방에 쏙 들어가는 컴팩트한 폴딩 구조.\n단단한 알루미늄 프레임과 플렉시블 힌지로\n어디서든 가볍게 휴대하세요.' },
        ],
      },
      'b24-split-screen': {
        label: 'SOUND QUALITY',
        title: '음악을 다시 발견하세요',
        desc: '처음 듣는 것처럼 생생하게.\n당신이 좋아하는 모든 음악을\n새로운 방식으로 경험하세요.',
      },
      'b20-comparison': {
        title: 'ANC 소음 차단 효과',
        beforeLabel: 'WITHOUT ANC',
        afterLabel: 'WITH ANC',
      },
      'b07-spec-table': {
        title: '제품 사양',
        rows: [
          ['모델명', 'QuietPro ANC'],
          ['드라이버', '40mm 다이나믹 드라이버'],
          ['ANC 방식', '하이브리드 ANC (-40dB)'],
          ['연속 재생', '30시간 (ANC ON) / 40시간 (ANC OFF)'],
          ['충전 시간', '2시간 (USB-C)'],
          ['연결 방식', 'Bluetooth 5.3 / 멀티포인트'],
          ['무게', '260g'],
        ],
      },
      'b28-faq': {
        title: '자주 묻는 질문',
        items: [
          { q: 'ANC를 끄면 배터리가 더 오래 가나요?', a: 'ANC OFF 시 최대 40시간, ANC ON 시 30시간 사용 가능합니다.' },
          { q: '통화할 때도 사용할 수 있나요?', a: '내장 마이크로 통화 가능하며, 음성 통화 시 최대 20시간 지속됩니다.' },
          { q: '스마트폰과 노트북을 동시에 연결할 수 있나요?', a: '멀티포인트 기능으로 2대 기기를 동시 연결하여 끊김 없이 전환됩니다.' },
          { q: '보증 기간은 얼마나 되나요?', a: '구매일로부터 1년간 무상 보증을 지원하며, 유상 수리 서비스도 제공됩니다.' },
        ],
      },
      'b22-testimonial': {
        quote: '출퇴근 지하철에서 매일 쓰는데,\n정말 다른 세상에 있는 것 같아요. 강력 추천합니다.',
        name: '— 직장인 박○○, 재구매 고객',
        stars: '★★★★★',
      },
      'b26-manifesto': {
        heading: '우리는 소리를 설계합니다.',
        body: '단순한 헤드폰이 아닙니다. 10년의 음향 연구와\n수백 번의 청음 테스트 끝에 탄생한 사운드 경험.\n당신이 음악을 듣는 방식을 바꿔드립니다.',
        tagline: '소리에 진심, QuietPro.',
      },
      'b34-magazine': {
        title: 'Engineered for Focus',
        desc: '주변 소음을 차단하고\n당신의 집중력을 극대화합니다.\n작업, 학습, 감상 — 모든 순간에.',
        caption: '프리미엄 헤드폰 라이프스타일',
      },
      'b15-cta': {
        headline: '조용한 집중을 경험하세요',
        sub: '무료 배송 · 14일 체험 보장 · 1년 A/S',
      },
      'b11-caution': {
        items: [
          '장시간 큰 음량 사용 시 청력에 영향을 줄 수 있습니다',
          '물에 닿지 않도록 주의하세요 (생활 방수 아님)',
          '직사광선 및 고온 환경에 장시간 보관하지 마세요',
        ],
      },
      'b12-brand-banner': {
        name: 'QuietPro',
        slogan: '소리를 설계하다',
      },
    },
  },

  // ─── 7. 자연 스토리텔링형 (식품/건강) ────────────────────────────────────
  {
    id: 'natural-story',
    name: '자연 스토리텔링형',
    desc: '원재료 여정과 제작자 스토리를 담은 자연/식품 특화 구성',
    category: '식품/건강',
    defaultTheme: 'healthy-green',
    blocks: [
      'b01-main-banner',
      'b33-creator-story',
      'b32-ingredient',
      'b19-journey',
      'b30-process-num',
      'b21-benefit-4col',
      'b25-stats',
      'b31-staggered',
      'b29-img-overlay',
      'b20-comparison',
      'b22-testimonial',
      'b28-faq',
      'b26-manifesto',
      'b23-timeline',
      'b15-cta',
      'b11-caution',
      'b12-brand-banner',
    ],
    content: {
      'b01-main-banner': {
        title: '벌이 고른 꿀\n제주 천연 아카시아꿀',
        subtitle: '제주산 아카시아 100% · 비가열 원심분리 · 항생제 無',
      },
      'b33-creator-story': {
        quote: '"벌 한 마리가 평생 모으는 꿀은 티스푼 하나도 안 됩니다.\n그 소중함을 알기에 저는 절대 타협하지 않습니다."',
        name: '양봉가 김○○',
        role: '제주 아카시아꿀 20년 경력',
      },
      'b32-ingredient': {
        title: '자연이 만든 원료',
        mainLabel: '제주 천연 아카시아꿀',
        labels: ['제주 아카시아 꽃', '청정 지하수', '제주 토종벌', '항생제 무첨가'],
      },
      'b19-journey': {
        label: '꿀이 식탁에 오기까지',
        items: [
          { step: '01', title: '아카시아 개화', desc: '제주 청정 환경\n아카시아 만개' },
          { step: '02', title: '벌의 채집', desc: '토종벌이 정성껏\n꽃꿀을 모읍니다' },
          { step: '03', title: '소상 숙성', desc: '벌집에서 자연\n숙성 14일 이상' },
          { step: '04', title: '비가열 추출', desc: '열 없이 원심분리\n효소 파괴 없음' },
          { step: '05', title: '당일 출고', desc: '주문 당일 신선\n포장 직배송' },
        ],
      },
      'b30-process-num': {
        title: '우리가 지키는 원칙',
        items: [
          { num: '01', title: '비가열 처리', desc: '열을 가하지 않아 효소와 영양소를 그대로 보존합니다.\n시중 제품 대부분이 사용하는 가열 공정을 완전히 배제했습니다.' },
          { num: '02', title: '항생제 무투여', desc: '벌 건강을 위해 항생제를 단 한 번도 사용하지 않습니다.\n자연 그대로의 면역력으로 건강하게 키웁니다.' },
          { num: '03', title: '당도 기준 엄수', desc: '수분 함량 18% 이하 고당도 원칙을 지킵니다.\n묽은 꿀은 단 하나도 출고하지 않습니다.' },
        ],
      },
      'b21-benefit-4col': {
        items: [
          { num: '01', title: '비가열 원심분리', desc: '효소·영양소\n100% 보존' },
          { num: '02', title: '항생제 무투여', desc: '자연 그대로\n청정 양봉' },
          { num: '03', title: '당도 80Brix+', desc: '수분 18% 이하\n고농도 원칙' },
          { num: '04', title: '당일 수확 출고', desc: '주문 후 당일\n신선 직배송' },
        ],
      },
      'b25-stats': {
        items: [
          { value: '20년', label: '양봉 경력' },
          { value: '80°', label: 'Brix 이상' },
          { value: '100%', label: '국내산 원료' },
        ],
      },
      'b31-staggered': {
        items: [
          { title: '꽃 한 송이의 정성', desc: '아카시아 꽃이 피는 단 2주,\n벌들이 쉬지 않고 꽃꿀을 모읍니다.\n제주의 청정한 자연이 그대로 담깁니다.' },
          { title: '손대지 않은 자연 그대로', desc: '채취부터 포장까지 가열 공정이 없습니다.\n자연이 만들어낸 효소와 아미노산,\n폴리페놀이 그대로 살아있습니다.' },
        ],
      },
      'b29-img-overlay': {
        title: '한 스푼이 주는 풍요로움',
        desc: '따뜻한 물에 녹여 차로,\n요거트 토핑으로, 빵에 발라서.',
      },
      'b20-comparison': {
        title: '가열 꿀 vs 비가열 꿀',
        beforeLabel: '가열 처리',
        afterLabel: '비가열 (당사)',
      },
      'b22-testimonial': {
        quote: '아이 면역력이 걱정돼서 먹이기 시작했는데\n감기를 달고 살던 아이가 올 겨울 한 번도 안 아팠어요.',
        name: '— 두 아이 엄마 이○○, 3년째 구독 고객',
        stars: '★★★★★',
      },
      'b28-faq': {
        title: '자주 묻는 질문',
        items: [
          { q: '일반 아카시아꿀과 무엇이 다른가요?', a: '시중 제품 대부분은 유통기한 연장을 위해 가열 처리합니다.\n저희는 비가열 원심분리만 사용해 효소와 영양소를 보존합니다.' },
          { q: '설탕이나 물을 섞지는 않나요?', a: '100% 순수 아카시아꿀만 사용합니다.\n당도 검사서와 원산지 확인서를 요청하시면 제공해드립니다.' },
          { q: '어린이도 먹을 수 있나요?', a: '만 1세 이상 어린이부터 섭취 가능합니다.\n1세 미만 영아에게는 먹이지 마세요 (보툴리누스균 위험).' },
          { q: '꿀이 굳으면 상한 건가요?', a: '아닙니다. 천연 꿀은 저온에서 자연스럽게 결정화됩니다.\n중탕(40°C 이하)으로 녹이면 원래 상태로 돌아옵니다.' },
        ],
      },
      'b26-manifesto': {
        heading: '자연은 거짓말하지 않습니다.',
        body: '20년간 단 하나의 원칙을 지켜왔습니다.\n자연이 만들어준 것에 손대지 않는 것.\n그것이 제주 아카시아꿀의 전부이자, 우리의 자존심입니다.',
        tagline: '자연 그대로, 제주에서.',
      },
      'b23-timeline': {
        items: [
          { year: '2004', title: '양봉 시작', desc: '제주 한라산 기슭에\n첫 벌통을 놓았습니다.' },
          { year: '2012', title: '비가열 공법 도입', desc: '영양을 지키는 방법을 연구하여\n비가열 원심분리 방식으로 전환했습니다.' },
          { year: '2025', title: '전국 직배송 시작', desc: '제주의 청정 꿀을\n전국 어디든 당일 출고로 보내드립니다.' },
        ],
      },
      'b15-cta': {
        headline: '자연이 만든 꿀, 지금 만나보세요',
        sub: '전국 무료 배송 · 선물 포장 무료 · 100% 국내산 보장',
      },
      'b11-caution': {
        items: [
          '만 1세 미만 영아에게는 먹이지 마세요 (보툴리누스균)',
          '직사광선을 피해 서늘한 곳에 보관하세요',
          '개봉 후에는 밀봉하여 냉장 보관 권장 (18개월 이내 섭취)',
        ],
      },
      'b12-brand-banner': {
        name: '제주청밀',
        slogan: '자연이 빚고, 시간이 익힌 꿀',
      },
    },
  },

  // ─── 8. 미니멀형 (뷰티/패션) ─────────────────────────────────────────────
  {
    id: 'minimal',
    name: '미니멀형',
    desc: '여백과 텍스트를 살린 미니멀 구성',
    category: '뷰티/패션',
    defaultTheme: 'soft-gray',
    blocks: [
      'b01-main-banner',
      'b10-text-center',
      'b06-full-image',
      'b02-img-left',
      'b10-text-center',
      'b03-img-right',
      'b06-full-image',
      'b04-feature-2col',
      'b09-gallery-3col',
      'b13-how-to-use',
      'b07-spec-table',
      'b14-review',
      'b15-cta',
      'b11-caution',
      'b12-brand-banner',
    ],
    content: {
      'b01-main-banner': {
        title: '덜어내고\n남은 것들',
        subtitle: '오가닉 코튼 100% · 무형광·무형광증백제 · 평생 세탁 보증',
      },
      'b10-text-center': {
        title: '필요한 것만',
        body: '화려한 장식도, 불필요한 기능도 없습니다.\n좋은 소재와 올바른 제작 방식만 남겼습니다.\n입을수록 몸에 맞춰지는 옷.',
      },
      'b02-img-left': {
        title: '오가닉 코튼',
        desc: '인도 GOTS 인증 농장에서 재배한\n오가닉 코튼 100% 원단을 사용합니다.\n피부에 닿는 모든 부분이 순합니다.',
      },
      'b10-text-center': {
        title: '색에 대하여',
        body: '자연에서 추출한 천연 염료만 사용합니다.\n계절이 바뀌어도, 세탁을 반복해도\n처음의 색을 유지합니다.',
      },
      'b03-img-right': {
        title: '한 땀 한 땀',
        desc: '국내 장인 봉제 공방에서\n한 벌씩 직접 제작합니다.\n솔기 하나까지 꼼꼼하게 마감.',
      },
      'b04-feature-2col': {
        items: [
          { title: 'GOTS 인증', desc: '글로벌 유기농 섬유 기준\n최고 등급 인증 원단 사용' },
          { title: '무독성 염료', desc: '아이 피부에도 안전한\nOeko-Tex 인증 염료' },
        ],
      },
      'b13-how-to-use': {
        items: [
          { step: '01', title: '찬물 세탁', desc: '30°C 이하 찬물로\n단독 세탁을 권장합니다.' },
          { step: '02', title: '그늘 건조', desc: '직사광선을 피해\n그늘에서 자연 건조하세요.' },
          { step: '03', title: '저온 다림질', desc: '면 소재 설정으로\n뒤집어 다림질하세요.' },
        ],
      },
      'b07-spec-table': {
        title: '소재 및 원산지',
        rows: [
          ['소재', '오가닉 코튼 100% (GOTS 인증)'],
          ['염료', 'Oeko-Tex 인증 무독성 천연 염료'],
          ['봉제', '국내 장인 봉제 (서울 성동구)'],
          ['세탁', '30°C 이하 찬물 단독 세탁'],
          ['원산지', '대한민국'],
        ],
      },
      'b14-review': {
        items: [
          { stars: '★★★★★', text: '피부 트러블이 있는데\n이 옷 입고 나서 훨씬 나아졌어요.', name: '아토피 피부 고객' },
          { stars: '★★★★★', text: '입을수록 몸에 맞춰지는 느낌.\n세탁 후에도 변형이 없어요.', name: '재구매 고객' },
          { stars: '★★★★☆', text: '심플한 디자인이라 어디든 잘 어울려요.\n10년 입을 것 같아요.', name: '미니멀 라이프 추구' },
        ],
      },
      'b15-cta': {
        headline: '진짜 좋은 옷',
        sub: '무료 배송·반품 · 평생 세탁 가이드 제공 · 국내 제작',
      },
      'b11-caution': {
        items: [
          '처음 세탁 시 색이 조금 빠질 수 있습니다 (천연 염료 특성)',
          '30°C 이상 뜨거운 물로 세탁하지 마세요',
          '드라이클리닝 시 소재가 손상될 수 있습니다',
        ],
      },
      'b12-brand-banner': {
        name: 'PLAIN.',
        slogan: '좋은 것만 남긴 옷',
      },
    },
  },
];
