# AI 자동 채우기 기능 기획서

> 상품 페이지 메이커에 GPT 텍스트 생성 + 나노바나나(Gemini) 이미지 생성을 연동하는 기능

---

## 개요

### 목표

- 블록 내 고정 문구를 GPT로 상품에 맞게 자동 생성
- 이미지 블록에 쓸 이미지 프롬프트를 GPT가 함께 생성
- Gemini(`gemini-2.5-flash-image`)로 이미지 생성 후 캔버스 플레이스홀더에 자동 삽입

### 전체 파이프라인

```
캔버스 이미지 수집 → Gemini 이미지 분석 → 상품 정보 입력
→ GPT 호출 (분석 결과 포함) → 텍스트 적용 + 이미지 프롬프트 획득
→ Gemini 이미지 생성 (참조 이미지 포함) → 캔버스 삽입
```

> 사용자가 캔버스 블록에 올려둔 이미지를 참조 이미지로 활용.
> 별도 이미지 업로드 UI 없음 — 에디터에서 이미 추가한 이미지를 그대로 사용.

### API Key 관리 전략

| 단계 | 방식 | 키 위치 |
|------|------|--------|
| 현재 (프론트 전용) | `js/config.js` + `.gitignore` | 로컬 파일 |
| 추후 (Supabase 도입) | Edge Functions으로 API 호출 이전 | Supabase 대시보드 Secrets |

```js
// js/config.js — .gitignore에 추가, git에 올라가지 않음
const CONFIG = {
  OPENAI_API_KEY: 'sk-...',
  GOOGLE_API_KEY: 'AIza...',
};
```

```
// .gitignore에 추가
js/config.js
```

editor.html에서 ai-fill.js보다 먼저 로드:
```html
<script src="js/config.js"></script>
<script src="js/ai-fill.js"></script>
```

### API 스택 (nanopage 참고)

| 역할 | API | 모델 |
|------|-----|------|
| 텍스트 카피 생성 | OpenAI Chat Completions | `gpt-4o-mini` |
| 이미지 생성 | Google Gemini (`@google/genai`) | `gemini-2.5-flash-image` |

---

## Phase 1 — GPT 텍스트 자동 채우기

### UI 흐름

```
툴바 [✨ AI 채우기] 버튼 클릭
  ↓
[Step 0] 캔버스에서 참조 이미지 자동 수집 (사용자 액션 없음)
    · canvas.getObjects()에서 fabric.Image 오브젝트 추출
    · _isPlaceholder가 아닌 것 = 사용자가 업로드한 실제 이미지
    · 각 이미지를 img.toDataURL()로 base64 변환 → 메모리 보관
    · 이미지가 있으면 → Gemini로 분석 (gemini-2.0-flash)
    · 분석 결과(색상/재질/스타일 등) → GPT 프롬프트에 포함
  ↓
[Step 1] 상품 정보 입력 모달
    · 상품명
    · 카테고리 (전자제품 / 뷰티·패션 / 식품·건강 / 생활용품 / 기타)
    · 주요 특징 (3~5개, 줄바꿈 입력)
    · 타겟 고객 (예: 직장인 20~40대)
    · 브랜드 톤 (모던 / 프리미엄 / 내추럴 / 귀여움 / 전문적)
    · API Key는 `js/config.js`에서 자동 로드 (입력 UI 불필요)
    · 수집된 참조 이미지 썸네일 표시 (확인용)
  ↓
[Step 2] GPT 호출 (로딩 표시)
    · 현재 블록 스택을 읽어 블록 타입별 필드 구조 구성
    · Gemini 이미지 분석 결과를 프롬프트에 포함
    · 텍스트 카피 + 이미지 프롬프트 동시 생성 (단일 호출)
  ↓
[Step 3] 결과 편집 모달
    · 탭 1: 텍스트 — 블록별 생성 내용 나열, 인라인 편집 가능
    · 탭 2: 이미지 프롬프트 — 플레이스홀더별 프롬프트, [복사] / [이미지 생성] 버튼
    · [캔버스에 텍스트 적용] 버튼
```

### blocks.js 수정 — 텍스트 오브젝트에 메타데이터 추가

현재 Fabric.js 텍스트 오브젝트에 식별자가 없어 GPT 결과를 특정 필드에 주입할 수 없음.
`mkText()` 호출 시 커스텀 속성을 부여하도록 수정 필요.

```js
// blocks.js — mkText 호출 후 메타데이터 설정
const obj = mkText(content.title, x, y, opts);
obj._blockId    = 'b01-main-banner'; // 어느 블록인지
obj._contentKey = 'title';           // 어느 필드인지 (title / subtitle / desc / items[0].title …)
obj._blockIndex = blockIndex;        // 캔버스 내 블록 순서 (동일 블록 타입 여러 개 구분)
```

### 블록별 GPT 입력 필드 정의

| 블록 ID | 블록명 | 필드 |
|---------|--------|------|
| b01-main-banner | 메인 배너 | title, subtitle |
| b02-img-left | 좌이미지 우텍스트 | title, desc |
| b03-img-right | 우이미지 좌텍스트 | title, desc |
| b04-feature-2col | 특징 2단 | items[0~1].title, items[0~1].desc |
| b05-feature-3col | 특징 3단 | items[0~2].title, items[0~2].desc |
| b07-spec-table | 스펙 표 | rows[N][0] (항목명), rows[N][1] (값) |
| b10-text-center | 텍스트 중심 | title, body |
| b11-caution | 주의사항 | title, items[N] |
| b12-brand-banner | 브랜드 배너 | title, subtitle |
| b13-how-to-use | 사용 방법 | items[N].step, items[N].title, items[N].desc |
| b14-review | 고객 후기 | items[N].text, items[N].name |
| b15-cta | 구매 유도 배너 | title, subtitle, cta |

### GPT 호출 패턴 (nanopage 방식 그대로)

```js
// ai-fill.js — CONFIG.OPENAI_API_KEY 참조
async function callGPT(systemPrompt, userPrompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    }),
  });
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}
```

### GPT 프롬프트 구조

```
[system]
당신은 쿠팡 상품 상세 페이지 전문 카피라이터입니다.
간결하고 구매욕을 자극하는 한국어 카피를 작성하세요.

[user]
상품명: {name} / 카테고리: {category} / 특징: {features}
타겟: {target} / 톤: {tone}

다음 블록 구조에 맞게 JSON으로 반환하세요:
{
  "texts": [
    { "blockId": "b01-main-banner", "blockIndex": 0, "title": "...", "subtitle": "..." },
    { "blockId": "b04-feature-2col", "blockIndex": 1, "items": [...] },
    ...
  ],
  "images": [
    { "blockId": "b06-full-image", "blockIndex": 2, "placeholderLabel": "전체 이미지",
      "prompt": "영문 이미지 생성 프롬프트 (구체적, e-commerce 스타일)" },
    ...
  ]
}
```

### 캔버스 적용 로직

```js
function applyTextToCanvas(texts) {
  const objects = CanvasManager.canvas.getObjects();
  texts.forEach(blockData => {
    objects
      .filter(obj => obj._blockId === blockData.blockId && obj._blockIndex === blockData.blockIndex)
      .forEach(obj => {
        const value = getNestedValue(blockData, obj._contentKey); // 'items[0].title' 파싱
        if (value) obj.set('text', value);
      });
  });
  CanvasManager.canvas.renderAll();
  CanvasManager.saveHistory();
}
```

---

## Phase 2 — Gemini 이미지 생성 + 캔버스 삽입

### 캔버스 이미지 수집 로직

```js
// ai-fill.js — 캔버스에서 참조 이미지 추출
function collectCanvasImages() {
  return CanvasManager.canvas.getObjects()
    .filter(obj => obj.type === 'image' && !obj._isPlaceholder && !obj._isPlaceholderLabel)
    .map(img => {
      // 임시 캔버스에 원본 크기로 그려서 base64 추출
      const dataUrl = img.toDataURL({ format: 'jpeg', quality: 0.85 });
      return {
        data: dataUrl.split(',')[1],   // base64 부분만
        mimeType: 'image/jpeg',
      };
    });
}
```

### Gemini 이미지 분석 (Step 0 — nanopage `analyze-image` 패턴)

```js
// gemini-2.0-flash로 참조 이미지 분석 → 상품 특성 추출
async function analyzeProductImages(images) {
  if (images.length === 0) return null;

  const genAI = new GoogleGenAI({ apiKey: CONFIG.GOOGLE_API_KEY });
  const contents = [
    { text: '이 제품 이미지를 분석하여 JSON으로 반환: { colors, material, texture, style, shape, key_features, suggested_mood }' },
    ...images.map(img => ({ inlineData: { mimeType: img.mimeType, data: img.data } })),
  ];

  const result = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents,
  });

  const text = result.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
  return JSON.parse(text.match(/\{[\s\S]*\}/)[0]);
}
```

### API 호출 패턴 (nanopage `generate-image/route.ts` 참고)

nanopage는 Next.js 서버에서 호출했지만, product_page는 순수 프론트엔드이므로
`@google/genai` SDK를 CDN에서 불러와 브라우저에서 직접 호출.

```html
<!-- editor.html에 추가 -->
<script type="importmap">
  { "imports": { "@google/genai": "https://esm.sh/@google/genai" } }
</script>
```

```js
// ai-fill.js — Gemini 이미지 생성 (참조 이미지 포함)
import { GoogleGenAI } from '@google/genai';

async function generateImageWithGemini(promptText, referenceImages = []) {
  const genAI = new GoogleGenAI({ apiKey: CONFIG.GOOGLE_API_KEY });

  // nanopage와 동일: 참조 이미지를 먼저, 프롬프트를 나중에
  const contents = [
    ...referenceImages.map(img => ({ inlineData: { mimeType: img.mimeType, data: img.data } })),
    { text: referenceImages.length > 0
        ? `위 제품 참조 이미지를 기반으로 다음 장면을 생성하세요. 반드시 동일한 제품이 등장해야 합니다.\n\n${promptText}`
        : promptText
    },
  ];

  const result = await genAI.models.generateContent({
    model: 'gemini-2.5-flash-image',          // nanopage와 동일 모델
    contents,
  });

  // 응답에서 base64 이미지 추출 (nanopage와 동일 파싱 로직)
  const parts = result.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      return `data:image/png;base64,${part.inlineData.data}`; // dataURL 반환
    }
  }
  throw new Error('이미지 생성 실패: 응답에 이미지 없음');
}
```

### 이미지를 플레이스홀더에 삽입

nanopage는 Supabase Storage에 업로드했지만, product_page는 base64 dataURL을 바로 Fabric.js에 주입.

```js
async function applyImageToPlaceholder(placeholder, dataUrl) {
  return new Promise(resolve => {
    fabric.Image.fromURL(dataUrl, img => {
      // 기존 panel-right.js의 업로드 로직과 동일하게 clipPath + 크기 맞춤
      const scaleX = placeholder.width / img.width;
      img.set({
        left: placeholder.left,
        top: placeholder.top,
        scaleX,
        scaleY: scaleX,
        clipPath: new fabric.Rect({
          width: placeholder.width,
          height: placeholder.height,
          originX: 'left',
          originY: 'top',
          absolutePositioned: true,
          left: placeholder.left,
          top: placeholder.top,
        }),
        _blockId: placeholder._blockId,
        _blockIndex: placeholder._blockIndex,
      });
      CanvasManager.canvas.remove(placeholder);
      CanvasManager.canvas.add(img);
      CanvasManager.canvas.renderAll();
      resolve();
    });
  });
}
```

### 블록별 이미지 프롬프트 스타일 가이드 (GPT에게 전달)

| 블록 | 이미지 성격 | 접미사 힌트 |
|------|------------|------------|
| b01 메인 배너 | 히어로 컷 | `hero product shot, dramatic lighting, high end photography` |
| b06 전체 이미지 | 라이프스타일 | `lifestyle photography, natural light, candid` |
| b02/03 이미지+텍스트 | 상품 클로즈업 | `product close-up, clean background, detailed` |
| b08/09 갤러리 | 디테일/다각도 | `product detail shot, white background, e-commerce` |
| b12 브랜드 배너 | 브랜드 무드 | `minimal brand visual, premium mood, abstract` |

---

## 구현 파일 구성

### 신규 파일

```
js/config.js     API Key 보관 — .gitignore 처리 (git에 올라가지 않음)
js/ai-fill.js    메인 모듈 (모달 UI + GPT 호출 + Gemini 호출 + 캔버스 적용)
css/ai-fill.css  AI 관련 모달 스타일
```

### 수정 파일

| 파일 | 수정 내용 |
|------|----------|
| `js/blocks.js` | `mkText()` 호출 시 `_blockId`, `_contentKey`, `_blockIndex` 메타데이터 부여 |
| `js/blocks.js` | `mkPlaceholder()` 호출 시 `_blockId`, `_blockIndex` 메타데이터 부여 |
| `editor.html` | 툴바에 `[✨ AI 채우기]` 버튼 추가, importmap + config.js + ai-fill.js 로드 |
| `css/editor.css` | AI 버튼 스타일 추가 |

### 스크립트 로드 순서 (수정 후)

```
templates.js → themes.js → project-db.js → blocks.js
→ canvas.js → panel-right.js → panel-left.js → export.js
→ config.js → ai-fill.js → editor.js
```

---

## 구현 체크리스트

### 사전 작업

- [ ] **blocks.js** — `mkText()` 호출부마다 `_blockId`, `_contentKey`, `_blockIndex` 부여
- [ ] **blocks.js** — `mkPlaceholder()` 호출부마다 `_blockId`, `_blockIndex` 부여
- [ ] **blocks.js** — 사용자 업로드 이미지(`fabric.Image`)에 `_blockId`, `_blockIndex` 부여 (panel-right.js 업로드 로직)
- [ ] **.gitignore** — `js/config.js` 추가
- [ ] **js/config.js** — `CONFIG` 객체 생성 (OPENAI_API_KEY, GOOGLE_API_KEY)
- [ ] **editor.html** — importmap(`@google/genai`) + `config.js` + `ai-fill.js` 스크립트 추가
- [ ] **editor.html** — 툴바에 `[✨ AI 채우기]` 버튼 추가
- [ ] **css/editor.css** — AI 버튼 스타일
- [ ] **css/ai-fill.css** — 모달 스타일 파일 생성

### Phase 1 — GPT 텍스트 생성

- [ ] **Step 0** — `collectCanvasImages()`: 캔버스에서 실제 이미지(non-placeholder) base64 수집
- [ ] **Step 0** — `analyzeProductImages()`: Gemini(`gemini-2.0-flash`)로 이미지 분석 → 색상/재질/스타일 추출
- [ ] **Step 1** — 상품 정보 입력 모달 UI (상품명/카테고리/특징/타겟/톤 + 수집된 이미지 썸네일)
- [ ] **Step 2** — `callGPT()`: OpenAI API 호출, 블록 스택 + 분석 결과 포함한 프롬프트 구성
- [ ] **Step 2** — 현재 블록 스택을 읽어 블록 타입별 필드 구조 자동 구성
- [ ] **Step 3** — 결과 편집 모달: 텍스트 탭 (블록별 인라인 편집)
- [ ] **Step 3** — `applyTextToCanvas()`: 메타데이터 기반 텍스트 오브젝트 매핑 + 적용

### Phase 2 — Gemini 이미지 생성

- [ ] **Step 3** — 결과 편집 모달: 이미지 프롬프트 탭 (플레이스홀더별 프롬프트 + [복사] 버튼)
- [ ] **Step 3** — `generateImageWithGemini()`: `gemini-2.5-flash-image` 호출, 참조 이미지 inlineData 포함
- [ ] **Step 3** — `applyImageToPlaceholder()`: base64 dataURL → Fabric.js 이미지 → 플레이스홀더 교체 (clipPath 적용)
- [ ] 이미지 생성 로딩 상태 표시 (플레이스홀더별 개별 로딩)
- [ ] 이미지 생성 실패 시 에러 처리 + 재시도 버튼

---

## 미결 사항

- [ ] `@google/genai` CDN(esm.sh) 브라우저 호환성 확인
- [ ] GPT 이미지 프롬프트 품질 검증 (영문 vs 한영 혼용)
- [ ] Gemini 이미지 생성 실패 시 폴백 (재시도 or 수동 업로드 안내)
- [ ] base64 이미지를 IndexedDB에 저장할 때 용량 이슈 검토 (대형 이미지 다수 시)

## 추후 Supabase 전환 시

1. GPT/Gemini 호출 코드를 Supabase Edge Functions으로 이전
2. `config.js` 제거, 키는 Supabase 대시보드 Secrets에 등록
3. `ai-fill.js`의 API 호출부만 Edge Function 엔드포인트로 교체 (나머지 로직 동일)
