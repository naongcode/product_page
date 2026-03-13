# 상품 페이지 메이커 — 프로젝트 개요

쿠팡 상품 상세 페이지를 브라우저에서 시각적으로 제작하는 도구.
템플릿 선택 → 에디터에서 블록/요소 편집 → PNG/JPG 내보내기 흐름으로 동작한다.
백엔드 없이 순수 HTML/CSS/JS로 구성되며, 데이터는 IndexedDB에 로컬 저장된다.

---

## 페이지 구조

| 파일 | 역할 |
|------|------|
| `index.html` | 갤러리 페이지 — 저장된 프로젝트 목록 표시, 템플릿 카드 그리드 렌더링 |
| `editor.html` | 에디터 페이지 — Fabric.js 기반 캔버스, 좌우 패널, 툴바 |

---

## JS 파일별 역할

### 진입점
- **`js/editor.js`** — 에디터 전체 진입점. DOMContentLoaded 시 모든 모듈 초기화, URL 파라미터(template/project/new) 처리, 저장/불러오기, 자동저장(2초 디바운스), 전체 텍스트 크기 일괄 조절

### 캔버스
- **`js/canvas.js`** — `CanvasManager` 네임스페이스. Fabric.js 초기화, 아트보드(1200px 폭 흰 사각형) 렌더링, 마우스 휠 줌, 드래그 팬, 실행취소/다시실행 히스토리, `fitToScreen()`

### 블록 시스템
- **`js/blocks.js`** — `BlockManager` + `BlockLibrary`. 15가지 블록 타입 정의 및 Fabric.js 오브젝트 배열로 캔버스에 삽입. 각 블록은 `{ objects, height }` 반환. 블록 추가/삭제/순서 관리

  | 블록 ID | 이름 |
  |---------|------|
  | b01-main-banner | 메인 배너 |
  | b02-img-left | 좌이미지 우텍스트 |
  | b03-img-right | 우이미지 좌텍스트 |
  | b04-feature-2col | 특징 2단 |
  | b05-feature-3col | 특징 3단 |
  | b06-full-image | 전체 이미지 |
  | b07-spec-table | 스펙 표 |
  | b08-gallery-2col | 갤러리 2열 |
  | b09-gallery-3col | 갤러리 3열 |
  | b10-text-center | 텍스트 중심 |
  | b11-caution | 주의사항 |
  | b12-brand-banner | 브랜드 배너 |
  | b13-how-to-use | 사용 방법 |
  | b14-review | 고객 후기 |
  | b15-cta | 구매 유도 배너 |

### 패널
- **`js/panel-left.js`** — `PanelLeft`. 좌측 패널 — 요소 추가(이미지/텍스트/도형), 블록 목록 렌더링, 테마 목록 렌더링, 현재 블록 스택(순서/삭제), 탭 전환(요소·블록·테마)
- **`js/panel-right.js`** — `PanelRight`. 우측 속성 패널 — 선택 오브젝트 타입에 따라 패널 전환(텍스트/이미지/도형/플레이스홀더), 속성 양방향 연동(색상·폰트·크기·정렬·위치·레이어), 블록 여백 조절

### 데이터
- **`js/themes.js`** — `window.Themes`. 색상 팔레트 + 폰트 세트 정의. 클린모던, 프리미엄다크, 내추럴오가닉 등 여러 테마. `ThemeManager`로 테마 전체 적용
- **`js/project-db.js`** — `ProjectDB`. IndexedDB(`ProductPageEditor` DB, `projects` 스토어) 기반 멀티 프로젝트 CRUD. `save/get/getAll/delete/newId` API
- **`js/export.js`** — `ExportManager`. 아트보드 영역만 크롭하여 PNG/JPG 파일로 다운로드. 모달 UI 포함

### 데이터 파일
- **`data/templates.js`** — `window.Templates`. 템플릿 정의 — 블록 ID 조합 + 기본 테마 + 카테고리(공통/뷰티·패션/식품·건강). index.html과 editor.html 양쪽에서 참조

---

## CSS 파일별 역할

- **`css/gallery.css`** — `index.html` 전용 스타일. 헤더, 히어로 섹션, 템플릿 카드 그리드, 프로젝트 카드, 미리보기 블록(preview-block 계열), 필터 탭
- **`css/editor.css`** — `editor.html` 전용 스타일. 툴바, 3열 레이아웃(패널-캔버스-패널), 좌우 패널 내부 UI, 속성 입력 컨트롤, 줌 버튼, 모달, 저장 상태 표시

---

## 스크립트 로드 순서 (editor.html)

```
templates.js → themes.js → project-db.js → blocks.js
→ canvas.js → panel-right.js → panel-left.js → export.js → editor.js
```

의존성: `editor.js`가 다른 모든 모듈에 의존. `blocks.js`는 `canvas.js`에 의존.

---

## 핵심 상수

| 상수 | 값 | 위치 |
|------|----|------|
| `ARTBOARD_WIDTH` / `ARTBOARD_W` | 1200px | canvas.js / blocks.js |
| `BLOCK_PADDING` | 80px | blocks.js |
| `CONTENT_W` | 1040px (1200 - 80*2) | blocks.js |
| DB 이름 | `ProductPageEditor` | project-db.js |
| DB 버전 | 2 | project-db.js |

## 참고할 프로젝트
C:\Users\user\Desktop\project\nanopage\claude.md

