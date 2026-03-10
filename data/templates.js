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

  // ─── 5. 미니멀형 (뷰티/패션) ─────────────────────────────────────────────
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
