/**
 * ai-fill.js — AI 자동 채우기
 * Step 0: 캔버스 이미지 수집 + Gemini 분석
 * Step 1: 상품 정보 입력 모달
 * Step 2: GPT 텍스트 + 이미지 프롬프트 생성
 * Step 3: 결과 편집 모달 → 캔버스 적용 / 이미지 생성
 */

window.AiFill = (() => {

  // ─── API 헬퍼 ────────────────────────────────────────────────────────────
  // 로컬: CONFIG 키 / 프로덕션: /api/config 에서 키 수령 후 직접 호출
  let _googleApiKey = (typeof CONFIG !== 'undefined' && CONFIG.GOOGLE_API_KEY) ? CONFIG.GOOGLE_API_KEY : null;

  async function _ensureGoogleKey() {
    if (_googleApiKey) return;
    try {
      const res = await fetch('/api/config');
      const cfg = await res.json();
      _googleApiKey = cfg.googleApiKey || null;
    } catch (e) {
      console.warn('API config 로드 실패:', e);
    }
  }

  async function _callGemini(model, body) {
    await _ensureGoogleKey();
    if (!_googleApiKey) throw new Error('Google API 키가 없습니다.');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${_googleApiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Gemini 오류 (${res.status})`);
    }
    return res.json();
  }

  async function _callOpenAI(body) {
    let res;
    if (typeof CONFIG !== 'undefined' && CONFIG.OPENAI_API_KEY) {
      res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(body),
      });
    } else {
      res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `OpenAI 오류 (${res.status})`);
    }
    return res.json();
  }

  // ─── 상태 ───────────────────────────────────────────────────────────────
  let _refImages = [];      // { data: base64, mimeType, dataUrl }
  let _imageAnalysis = null;
  let _gptResult = null;    // { texts: [], images: [] }
  let _lastProduct = null;  // 마지막으로 생성한 상품 정보

  // ─── 퍼시스턴스 ─────────────────────────────────────────────────────────
  function _storageKey() {
    const pid = window.currentProjectId || new URLSearchParams(window.location.search).get('project');
    return pid ? `ai_result_${pid}` : null;
  }

  // 참조이미지를 localStorage 저장용으로 압축 (긴 변 최대 512px, JPEG 0.7)
  function _compressImage(dataUrl) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const MAX = 512;
        const ratio = Math.min(1, MAX / Math.max(img.width, img.height));
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        const compressed = c.toDataURL('image/jpeg', 0.7);
        resolve({ dataUrl: compressed, data: compressed.split(',')[1], mimeType: 'image/jpeg' });
      };
      img.onerror = () => resolve(null);
      img.src = dataUrl;
    });
  }

  // API 전송용 압축 (긴 변 최대 1024px, JPEG 0.85) — Vercel 4.5MB 제한 대응
  function _compressForAPI(imgObj) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const MAX = 1024;
        const ratio = Math.min(1, MAX / Math.max(img.width, img.height));
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        const compressed = c.toDataURL('image/jpeg', 0.85);
        resolve({ dataUrl: compressed, data: compressed.split(',')[1], mimeType: 'image/jpeg' });
      };
      img.onerror = () => resolve(imgObj);
      img.src = imgObj.dataUrl;
    });
  }

  async function _compressImagesForAPI(images) {
    return (await Promise.all(images.map(_compressForAPI))).filter(Boolean);
  }

  async function _saveResult() {
    const key = _storageKey();
    if (!key) return;
    try {
      const compressedImages = (await Promise.all(_refImages.map(img => _compressImage(img.dataUrl)))).filter(Boolean);
      localStorage.setItem(key, JSON.stringify({
        gptResult: _gptResult,
        lastProduct: _lastProduct,
        refImages: compressedImages,
      }));
    } catch (e) {
      // 용량 초과 시 이미지 없이 저장
      try {
        localStorage.setItem(key, JSON.stringify({ gptResult: _gptResult, lastProduct: _lastProduct, refImages: [] }));
      } catch (_) {}
    }
  }

  function _loadResult() {
    const key = _storageKey();
    if (!key) return;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const saved = JSON.parse(raw);
      _gptResult = saved.gptResult || null;
      _lastProduct = saved.lastProduct || null;
      if (saved.refImages?.length) _refImages = saved.refImages;
      if (_gptResult) setStepState(2);
    } catch (e) { /* 파싱 오류 무시 */ }
  }

  function _clearResult() {
    const key = _storageKey();
    if (key) localStorage.removeItem(key);
  }

  // ─── 스텝 버튼 상태 관리 ────────────────────────────────────────────────
  function setStepState(step) {
    const btn1 = document.getElementById('btn-ai-fill');
    const btn2 = document.getElementById('btn-ai-image');
    if (!btn1 || !btn2) return;
    if (step === 2) {
      btn1.className = 'btn-ai-step btn-ai-step--idle';
      btn2.className = 'btn-ai-step btn-ai-step--ready';
    } else {
      btn1.className = 'btn-ai-step btn-ai-step--active';
      btn2.className = 'btn-ai-step btn-ai-step--idle';
    }
  }

  // ─── 진입점 ─────────────────────────────────────────────────────────────
  function init() {
    document.getElementById('btn-ai-fill')?.addEventListener('click', run);
    document.getElementById('btn-ai-image')?.addEventListener('click', onImageStepClick);
  }

  function loadAfterProject() {
    _loadResult();
  }

  function onImageStepClick() {
    if (_gptResult) {
      openImageModal();
      return;
    }
    // 문구 미생성 시 유도 다이얼로그
    const el = createOverlay('ai-step-guide');
    el.innerHTML = `
      <div class="ai-modal" style="width:420px">
        <div class="ai-modal-header">
          <span class="ai-modal-title">② 이미지 생성</span>
          <button class="ai-modal-close">✕</button>
        </div>
        <div class="ai-modal-body" style="padding:20px 24px">
          <p style="margin:0 0 8px;font-size:14px;color:#1a1d23;font-weight:600">먼저 AI 문구를 생성해보세요</p>
          <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6">① 문구 생성을 먼저 하면 각 이미지 슬롯에 맞는<br>프롬프트가 자동으로 만들어져서 더 잘 어울리는<br>이미지를 생성할 수 있어요.</p>
        </div>
        <div class="ai-modal-footer">
          <button class="ai-btn-secondary" id="ai-guide-skip">그냥 진행하기</button>
          <button class="ai-btn-primary" id="ai-guide-go">① 문구 생성하러 가기</button>
        </div>
      </div>`;
    document.body.appendChild(el);
    el.querySelector('.ai-modal-close').addEventListener('click', () => el.remove());
    el.querySelector('#ai-guide-skip').addEventListener('click', () => { el.remove(); openImageModal(); });
    el.querySelector('#ai-guide-go').addEventListener('click', () => { el.remove(); run(); });
  }

  async function run() {
    // 이전 결과가 있으면 바로 결과 모달 열기
    if (_gptResult) {
      openResultModal(_gptResult, _lastProduct);
      return;
    }

    // Step 1: 상품 정보 입력 모달 열기 (_refImages는 모달에서 직접 업로드)
    openInputModal();
  }

  // ─── Step 0: 캔버스 이미지 수집 ─────────────────────────────────────────
  function collectCanvasImages() {
    return CanvasManager.getCanvas().getObjects()
      .filter(obj => obj.type === 'image' && !obj._isPlaceholder && !obj._isPlaceholderLabel && obj._placeholderIndex === undefined)
      .map(img => {
        // fabric 오브젝트의 toDataURL은 clipPath 때문에 빈 이미지가 될 수 있으므로
        // 원본 HTMLImageElement에서 직접 캡처
        const el = img.getElement();
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = el.naturalWidth || el.width || 512;
        tempCanvas.height = el.naturalHeight || el.height || 512;
        const ctx = tempCanvas.getContext('2d');
        ctx.drawImage(el, 0, 0, tempCanvas.width, tempCanvas.height);
        const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.85);
        return {
          dataUrl,
          data: dataUrl.split(',')[1],
          mimeType: 'image/jpeg',
        };
      });
  }

  // ─── Step 0: Gemini 이미지 분석 ─────────────────────────────────────────
  async function analyzeProductImages(images) {
    if (!images.length) return null;

    const imageCountText = images.length > 1
      ? `총 ${images.length}장의 제품 이미지가 제공됩니다. 모든 이미지를 종합적으로 분석하여`
      : '이 제품 이미지를 분석하여';

    const parts = [
      { text: `당신은 전문 제품 사진 분석가입니다.\n${imageCountText} 다음 정보를 JSON 형식으로 추출해주세요:\n\n{ "colors": ["주요 색상 1", "주요 색상 2"], "material": "제품의 재질", "texture": "표면 질감", "style": "디자인 스타일", "shape": "형태 및 실루엣 설명", "key_features": ["특징 1", "특징 2", "특징 3"], "suggested_mood": "추천 촬영 분위기", "lighting_suggestion": "추천 조명 유형", "suggest_model": "착용/사용 모델 추천 (예: '한국인 여성 20대, 캐주얼 의류 착용, 자연스러운 미소' 또는 '없음')" }\n\n여러 이미지가 있다면 각 이미지를 종합하여 하나의 결과로 통합해주세요. 구체적이고 상세하게 분석해주세요.` },
      ...images.map(img => ({ inlineData: { mimeType: img.mimeType, data: img.data } })),
    ];

    const data = await _callGemini('gemini-2.0-flash', { contents: [{ parts }] });
    const text = data.candidates?.[0]?.content?.parts?.find(p => p.text)?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Gemini 응답에서 JSON을 찾을 수 없습니다. 응답: ' + text.slice(0, 200));
    return JSON.parse(match[0]);
  }

  // ─── Step 1: 상품 정보 입력 모달 ────────────────────────────────────────
  const FEATURE_CHIPS = {
    '전자제품':  ['무선', '노이즈캔슬링', '방수/방진', '고속충전', '장시간 배터리', '경량', '고음질', '터치 컨트롤', 'Bluetooth 5.0', 'USB-C'],
    '뷰티·패션': ['저자극', '비건', '향료 무첨가', '피부 보습', '자외선 차단', '오래 지속', '천연 성분', '수분 공급', '탄력 개선', '미백 효과'],
    '식품·건강': ['무설탕', '저칼로리', '고단백', '글루텐프리', '유기농', 'HACCP 인증', '국내산 원료', '무방부제', '다이어트', '면역 강화'],
    '생활용품': ['친환경', '항균', '방수', '내구성 우수', '인체공학 설계', '공간 절약', '다용도', '세척 편리', '안전 인증', '국내 생산'],
    '기타':      ['고품질', '가성비', '친환경', '국내 생산', '안전 인증', '인체공학', '다용도', '내구성', '간편 사용', '프리미엄'],
  };
  const TARGET_AGE_CHIPS   = ['10대', '20대', '30대', '40대', '50대+'];
  const TARGET_LIFE_CHIPS  = ['직장인', '학생', '주부', '운동족', '여행자', '육아맘·대디', '시니어'];
  const TARGET_GENDER_CHIPS = ['남성', '여성', '남녀공용'];

  function renderChips(chips, groupId) {
    return `<div class="ai-chip-group" id="${groupId}">
      ${chips.map(c => `<button type="button" class="ai-chip" data-value="${c}">${c}</button>`).join('')}
    </div>`;
  }

  function openInputModal() {
    const el = createOverlay('ai-input-modal');
    const defaultCat = '전자제품';
    el.innerHTML = `
      <div class="ai-modal">
        <div class="ai-modal-header">
          <span class="ai-modal-title">✨ AI 채우기 — 상품 정보 입력</span>
          <button class="ai-modal-close" data-close>✕</button>
        </div>
        <div class="ai-modal-body">
          <div class="ai-field">
            <span class="ai-label">상품 이미지 <span style="color:#9ca3af;font-weight:400">(Gemini가 색상·재질을 분석해 이미지 프롬프트에 반영)</span></span>
            <div class="ai-img-upload-zone" id="ai-img-upload-zone">
              <div id="ai-input-thumbs" class="ai-ref-thumbs" style="min-height:64px">
                ${_refImages.length
                  ? _refImages.map((img, i) => `
                    <div class="ai-ref-thumb-wrap" data-ref-idx="${i}">
                      <img class="ai-ref-thumb" src="${img.dataUrl}">
                      <button class="ai-ref-thumb-del" type="button" data-ref-idx="${i}">✕</button>
                    </div>`).join('')
                  : '<span class="ai-ref-empty-small" id="ai-upload-hint">클릭하거나 이미지를 드래그하세요</span>'}
              </div>
            </div>
            <input type="file" id="ai-input-file" accept="image/*" multiple style="display:none">
          </div>
          <div class="ai-field">
            <label class="ai-label" for="ai-product-name">상품명 <span style="color:#ef4444">*</span></label>
            <input id="ai-product-name" class="ai-input" placeholder="예: 프리미엄 무선 이어폰" />
          </div>
          <div class="ai-field">
            <label class="ai-label" for="ai-category">카테고리</label>
            <select id="ai-category" class="ai-select">
              <option>전자제품</option>
              <option>뷰티·패션</option>
              <option>식품·건강</option>
              <option>생활용품</option>
              <option>기타</option>
            </select>
          </div>

          <div class="ai-field">
            <span class="ai-label">주요 특징 <span style="color:#9ca3af;font-weight:400">(복수 선택 가능)</span></span>
            ${renderChips(FEATURE_CHIPS[defaultCat], 'ai-feature-chips')}
            <input id="ai-features-custom" class="ai-input" style="margin-top:8px" placeholder="직접 입력 (선택)" />
          </div>

          <div class="ai-field">
            <span class="ai-label">타겟 고객 <span style="color:#9ca3af;font-weight:400">(복수 선택 가능)</span></span>
            <div style="display:flex;flex-direction:column;gap:6px">
              <div>
                <div class="ai-chip-section-label">연령대</div>
                ${renderChips(TARGET_AGE_CHIPS, 'ai-target-age')}
              </div>
              <div>
                <div class="ai-chip-section-label">라이프스타일</div>
                ${renderChips(TARGET_LIFE_CHIPS, 'ai-target-life')}
              </div>
              <div>
                <div class="ai-chip-section-label">성별</div>
                ${renderChips(TARGET_GENDER_CHIPS, 'ai-target-gender')}
              </div>
            </div>
          </div>

          <div class="ai-field">
            <label class="ai-label" for="ai-tone">브랜드 톤</label>
            <select id="ai-tone" class="ai-select">
              <option>모던</option>
              <option>프리미엄</option>
              <option>내추럴</option>
              <option>귀여움</option>
              <option>전문적</option>
            </select>
          </div>
        </div>
        <div class="ai-modal-footer">
          <button class="ai-btn-secondary" data-close>취소</button>
          <button class="ai-btn-primary" id="ai-btn-generate">생성 시작</button>
        </div>
      </div>`;

    document.body.appendChild(el);
    el.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => el.remove()));

    // ─ 입력 모달 이미지 업로드
    function refreshInputThumbs() {
      const thumbsEl = el.querySelector('#ai-input-thumbs');
      thumbsEl.innerHTML = _refImages.length
        ? _refImages.map((img, i) => `
            <div class="ai-ref-thumb-wrap" data-ref-idx="${i}">
              <img class="ai-ref-thumb" src="${img.dataUrl}">
              <button class="ai-ref-thumb-del" type="button" data-ref-idx="${i}">✕</button>
            </div>`).join('')
        : '<span class="ai-ref-empty-small">클릭하거나 이미지를 드래그하세요</span>';
      thumbsEl.querySelectorAll('.ai-ref-thumb-del').forEach(btn => {
        btn.addEventListener('click', e => { e.stopPropagation(); _refImages.splice(+btn.dataset.refIdx, 1); refreshInputThumbs(); });
      });
    }

    async function handleInputFiles(files) {
      for (const file of [...files]) {
        await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = ev => {
            const dataUrl = ev.target.result;
            _refImages.push({ dataUrl, data: dataUrl.split(',')[1], mimeType: file.type || 'image/jpeg' });
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
      refreshInputThumbs();
    }

    const zone = el.querySelector('#ai-img-upload-zone');
    zone.addEventListener('click', () => el.querySelector('#ai-input-file').click());
    el.querySelector('#ai-input-file').addEventListener('change', e => { handleInputFiles(e.target.files); e.target.value = ''; });
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('dragover'); handleInputFiles(e.dataTransfer.files); });

    // 초기 삭제 버튼 바인딩
    refreshInputThumbs();

    // 칩 토글
    el.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => chip.classList.toggle('selected'));
    });

    // 카테고리 변경 시 특징 칩 갱신
    el.querySelector('#ai-category').addEventListener('change', e => {
      const cat = e.target.value;
      const group = el.querySelector('#ai-feature-chips');
      group.innerHTML = (FEATURE_CHIPS[cat] || FEATURE_CHIPS['기타'])
        .map(c => `<button type="button" class="ai-chip" data-value="${c}">${c}</button>`).join('');
      group.querySelectorAll('.ai-chip').forEach(chip => {
        chip.addEventListener('click', () => chip.classList.toggle('selected'));
      });
    });

    el.querySelector('#ai-btn-generate').addEventListener('click', () => onGenerate(el));
  }

  function getSelectedChips(el, groupId) {
    return [...el.querySelectorAll(`#${groupId} .ai-chip.selected`)].map(c => c.dataset.value);
  }

  // ─── Step 2: GPT 호출 ────────────────────────────────────────────────────
  async function onGenerate(inputModal) {
    const name = inputModal.querySelector('#ai-product-name').value.trim();
    if (!name) { alert('상품명을 입력하세요.'); return; }

    const selectedFeatures = getSelectedChips(inputModal, 'ai-feature-chips');
    const customFeature = inputModal.querySelector('#ai-features-custom').value.trim();
    if (customFeature) selectedFeatures.push(customFeature);

    const selectedTarget = [
      ...getSelectedChips(inputModal, 'ai-target-age'),
      ...getSelectedChips(inputModal, 'ai-target-life'),
      ...getSelectedChips(inputModal, 'ai-target-gender'),
    ];

    const product = {
      name,
      category: inputModal.querySelector('#ai-category').value,
      features: selectedFeatures.join(', ') || '없음',
      target: selectedTarget.join(', ') || '일반 소비자',
      tone: inputModal.querySelector('#ai-tone').value,
    };

    inputModal.remove();
    const loadingEl = showLoading('이미지 분석 중...');

    try {
      // 이미지 분석 (참조 이미지 있을 때만, 실패해도 계속 진행)
      if (_refImages.length) {
        loadingEl.querySelector('.ai-loading-msg').textContent = '참조 이미지 분석 중...';
        try {
          _imageAnalysis = await analyzeProductImages(await _compressImagesForAPI(_refImages));
        } catch (imgErr) {
          console.warn('Gemini 이미지 분석 실패, 건너뜀:', imgErr.message);
          _imageAnalysis = null;
        }
      }

      // GPT 호출
      loadingEl.querySelector('.ai-loading-msg').textContent = 'GPT로 카피 생성 중...';
      _gptResult = await callGPT(product, _imageAnalysis);
      _lastProduct = product;

      loadingEl.remove();
      setStepState(2);
      _saveResult(); // async, 백그라운드 저장
      openResultModal(_gptResult, _lastProduct);
    } catch (e) {
      loadingEl.remove();
      alert('오류: ' + e.message);
    }
  }

  // ─── GPT API 호출 ────────────────────────────────────────────────────────
  async function callGPT(product, imageAnalysis) {
    const blockStack = BlockManager.blocks;
    if (!blockStack.length) throw new Error('캔버스에 블록이 없습니다.');

    const blockSchema = buildBlockSchema(blockStack);
    const analysisText = imageAnalysis ? `
[제품 이미지 분석 결과 — imagePrompt 작성 시 반드시 반영]
- 주요 색상: ${imageAnalysis.colors?.join(', ')} → 톤: 필드에 이 색상을 기반으로 작성할 것
- 재질/질감: ${[imageAnalysis.material, imageAnalysis.texture].filter(Boolean).join(', ')} → 배경·소품에 반영
- 스타일: ${imageAnalysis.style}
- 주요 특징: ${imageAnalysis.key_features?.join(', ')}
- 추천 분위기: ${imageAnalysis.suggested_mood} → 감성: 필드에 반영
- 추천 조명: ${imageAnalysis.lighting_suggestion || ''} → 조명: 필드에 반영
- 추천 모델: ${imageAnalysis.suggest_model || ''} → 모델 필드 참고 (needsModel 블록에만)
` : '';

    const systemPrompt = `당신은 쿠팡 상품 상세 페이지 전문 카피라이터 겸 제품 사진 감독입니다.
텍스트 카피를 작성하고, 그 텍스트 내용과 시각적으로 일치하는 이미지 촬영 시나리오도 함께 작성합니다.
이미지는 반드시 텍스트가 전달하는 메시지를 사진으로 표현해야 합니다.
JSON만 반환하고 다른 설명은 절대 붙이지 마세요.`;

    const userPrompt = `상품명: ${product.name}
카테고리: ${product.category}
주요 특징: ${product.features || '없음'}
타겟 고객: ${product.target || '일반 소비자'}
브랜드 톤: ${product.tone}
${analysisText}

아래 블록 배열을 채워서 반환하세요. 이미지가 있는 블록은 텍스트 내용과 어울리는 촬영 시나리오를 imagePrompt(단일) 또는 imagePrompts(배열)에 작성하세요:
${JSON.stringify(blockSchema, null, 2)}

반환 형식 (입력 배열과 동일한 구조):
{ "blocks": [ ...입력과 같은 구조, 단 [작성] 자리에 실제 내용 채움... ] }

텍스트 작성 규칙:
- title: 15~25자의 임팩트 있는 헤드라인
- desc/body: 40~80자의 구체적이고 설득력 있는 설명 (기능, 장점, 사용 상황 포함)
- subtitle: 20~35자의 보조 문구
- 각 블록마다 서로 다른 메시지 각도 (기능, 감성, 상황, 신뢰 등)

이미지 prompt 작성 규칙:
- 텍스트에서 전달하는 핵심 메시지를 사진으로 표현 (예: 타이틀이 "극강의 방수 성능"이면 물속 촬영)
- 반드시 아래 7개 필드를 개행으로 구분하여 한국어로 상세하게 작성:
  톤: / 조명: / 배경: / 구도: / 모델: / 소품: / 감성:
- 모델: 스키마에서 모델 필드가 "[한국인 타겟 고객 기반으로 반드시 작성]"인 블록은 반드시 한국인 모델을 구체적으로 묘사 (성별/연령대/외형/표정/포즈). 타겟 고객(${product.target || '일반 소비자'})의 전형적인 모습으로. "없음"이라고 이미 명시된 블록만 없음으로 작성
- 같은 블록 타입이라도 각자 다른 메시지이므로 서로 다른 촬영 컨셉 적용`;

    const data = await _callOpenAI({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });
    return parseGPTResponse(JSON.parse(data.choices[0].message.content));
  }

  // 블록 스택에서 GPT용 스키마 구성 (블록 단위 통합 형식)
  function buildBlockSchema(blockStack) {
    const BLOCK_DEFS = {
      'b01-main-banner':  { role: '메인 배너 — 강렬한 첫인상 문구', text: { title: '[작성]', subtitle: '[작성]' } },
      'b02-img-left':     { role: '좌이미지+우텍스트 — 왼쪽 이미지가 오른쪽 텍스트 메시지를 시각적으로 표현', text: { title: '[작성]', desc: '[작성]' }, imageSlots: 1, needsModel: true },
      'b03-img-right':    { role: '우이미지+좌텍스트 — 오른쪽 이미지가 왼쪽 텍스트 메시지를 시각적으로 표현', text: { title: '[작성]', desc: '[작성]' }, imageSlots: 1, needsModel: true },
      'b04-feature-2col': { role: '특징 2단 — 핵심 특징 2가지', items: [{ title: '[작성]', desc: '[작성]' }, { title: '[작성]', desc: '[작성]' }] },
      'b05-feature-3col': { role: '특징 3단 — 핵심 특징 3가지', items: [{ title: '[작성]', desc: '[작성]' }, { title: '[작성]', desc: '[작성]' }, { title: '[작성]', desc: '[작성]' }] },
      'b06-full-image':   { role: '전체 이미지 — 타겟 고객이 제품을 사용하는 감성 라이프스타일 와이드샷', imageSlots: 1, needsModel: true },
      'b07-spec-table':   { role: '스펙 표 — 제품 사양', rows: [['[항목]','[값]'],['[항목]','[값]'],['[항목]','[값]'],['[항목]','[값]'],['[항목]','[값]']] },
      'b08-gallery-2col': { role: '갤러리 2열 — 제품 디테일 클로즈업 2컷, 각각 다른 각도/소재/기능 강조 (모델 없음)', imageSlots: 2, needsModel: false },
      'b09-gallery-3col': { role: '갤러리 3열 — 제품 디테일 클로즈업 3컷, 각각 다른 각도/소재/기능 강조 (모델 없음)', imageSlots: 3, needsModel: false },
      'b10-text-center':  { role: '텍스트 중심 — 브랜드 스토리 또는 감성 문구', text: { title: '[작성]', body: '[작성]' } },
      'b11-caution':      { role: '주의사항', items: ['[작성]', '[작성]', '[작성]'] },
      'b12-brand-banner': { role: '브랜드 배너', text: { name: '[작성]', slogan: '[작성]' } },
      'b13-how-to-use':   { role: '사용 방법 3단계', items: [{ step:'01', title:'[작성]', desc:'[작성]' }, { step:'02', title:'[작성]', desc:'[작성]' }, { step:'03', title:'[작성]', desc:'[작성]' }] },
      'b14-review':       { role: '고객 후기', items: [{ stars:'⭐⭐⭐⭐⭐', text:'[작성]', name:'[작성]' }, { stars:'⭐⭐⭐⭐⭐', text:'[작성]', name:'[작성]' }, { stars:'⭐⭐⭐⭐⭐', text:'[작성]', name:'[작성]' }] },
      'b15-cta':          { role: '구매 유도 배너', text: { headline: '[작성]', sub: '[작성]' } },
      'b16-delivery':     { role: '배송 안내', rows: [['배송방법','[값]'],['배송기간','[값]'],['배송비','[값]'],['교환','[값]'],['반품','[값]'],['환불','[값]'],['주의','[값]']] },
      'b19-journey':      { role: '제품 여정 5단계 — 원료→개발→검수→생산→배송 등 브랜드 스토리', text: { label: '[작성]' }, items: [{ step:'01', title:'[작성]', desc:'[작성]' }, { step:'02', title:'[작성]', desc:'[작성]' }, { step:'03', title:'[작성]', desc:'[작성]' }, { step:'04', title:'[작성]', desc:'[작성]' }, { step:'05', title:'[작성]', desc:'[작성]' }] },
      'b20-comparison':   { role: '사용 전후 비교 이미지', text: { title: '[작성]', beforeLabel: 'BEFORE', afterLabel: 'AFTER' }, imageSlots: 2, needsModel: true },
      'b21-benefit-4col': { role: '혜택 4단 카드 — 핵심 혜택 4가지', items: [{ num:'01', title:'[작성]', desc:'[작성]' }, { num:'02', title:'[작성]', desc:'[작성]' }, { num:'03', title:'[작성]', desc:'[작성]' }, { num:'04', title:'[작성]', desc:'[작성]' }] },
      'b22-testimonial':  { role: '대형 고객 추천사 — 가장 인상적인 단일 후기', text: { quote: '[작성]', name: '[작성]', stars: '★★★★★' } },
      'b23-timeline':     { role: '브랜드/제품 연대기 — 3개 연도/단계로 성장 스토리 표현', items: [{ year: '[연도/단계]', title: '[작성]', desc: '[작성]' }, { year: '[연도/단계]', title: '[작성]', desc: '[작성]' }, { year: '[연도/단계]', title: '[작성]', desc: '[작성]' }] },
      'b24-split-screen': { role: '이미지+텍스트 50:50 분할 — 한 가지 핵심 메시지 강조', text: { label: '[작성]', title: '[작성]', desc: '[작성]' }, imageSlots: 1 },
      'b25-stats':        { role: '임팩트 있는 수치 3개 — 만족도/판매량/수상 등 숫자로 신뢰 강조', items: [{ value: '[숫자+단위]', label: '[설명]' }, { value: '[숫자+단위]', label: '[설명]' }, { value: '[숫자+단위]', label: '[설명]' }] },
      'b26-manifesto':    { role: '브랜드 선언문 — 철학/가치관을 강렬하게 한 페이지에 담음', text: { heading: '[작성]', body: '[작성]', tagline: '[작성]' } },
      'b27-ugc-grid':     { role: '고객 SNS 사진 그리드 — 실제 사용자 사진 5컷 + 핸들', text: { label: '[작성]' }, captions: ['[작성]', '[작성]', '[작성]', '[작성]', '[작성]'], imageSlots: 5 },
      'b28-faq':          { role: '자주 묻는 질문 4세트 — 구매 전 궁금증 해소', text: { title: '[작성]' }, items: [{ q: '[질문]', a: '[답변]' }, { q: '[질문]', a: '[답변]' }, { q: '[질문]', a: '[답변]' }, { q: '[질문]', a: '[답변]' }] },
      'b29-img-overlay':  { role: '풀이미지 위 플로팅 카드 — 강렬한 비주얼에 핵심 카피 오버랩', text: { title: '[작성]', desc: '[작성]' }, imageSlots: 1 },
      'b30-process-num':  { role: '번호 프로세스 3단계 — 제작/생산/사용 과정을 순서대로 설명', text: { title: '[작성]' }, items: [{ num: '01', title: '[작성]', desc: '[작성]' }, { num: '02', title: '[작성]', desc: '[작성]' }, { num: '03', title: '[작성]', desc: '[작성]' }] },
      'b31-staggered':    { role: '이미지+텍스트 좌우 교차 2세트 — 두 가지 핵심 특징을 시각적으로 대비', items: [{ title: '[작성]', desc: '[작성]' }, { title: '[작성]', desc: '[작성]' }], imageSlots: 2 },
      'b32-ingredient':   { role: '재료/성분 그리드 — 메인 제품 + 핵심 원료 4가지 시각화', text: { title: '[작성]', mainLabel: '[작성]' }, labels: ['[작성]', '[작성]', '[작성]', '[작성]'], imageSlots: 5 },
      'b33-creator-story':{ role: '제작자/농부/대표 스토리 — 인물 사진과 진솔한 인용구로 신뢰 구축', text: { quote: '[작성]', name: '[작성]', role: '[직함/경력]' }, imageSlots: 1, needsModel: true },
      'b34-magazine':     { role: '매거진 스타일 비대칭 레이아웃 — 대형 이미지 + 감성 텍스트 + 서브 이미지', text: { title: '[작성]', desc: '[작성]', caption: '[작성]' }, imageSlots: 2 },
    };

    const modelField = (needsModel) => needsModel
      ? '모델: [한국인 타겟 고객 기반으로 반드시 작성 — 성별/연령대/외형/표정/포즈 구체적으로. 예: "한국인 여성 30대, 캐주얼 착장, 자연스러운 미소"]'
      : '모델: 없음';

    const makeTemplate = (needsModel) =>
      `톤: [작성]\n조명: [작성]\n배경: [작성]\n구도: [작성]\n${modelField(needsModel)}\n소품: [작성]\n감성: [작성]`;

    return blockStack.map((block, idx) => {
      const def = BLOCK_DEFS[block.id];
      if (!def) return null;

      const entry = { blockId: block.id, blockIndex: idx, role: def.role };
      if (def.text)  Object.assign(entry, def.text);
      if (def.items) entry.items = JSON.parse(JSON.stringify(def.items));
      if (def.rows)  entry.rows  = JSON.parse(JSON.stringify(def.rows));
      if (def.imageSlots === 1) entry.imagePrompt = makeTemplate(def.needsModel);
      if (def.imageSlots > 1)  entry.imagePrompts = Array.from({ length: def.imageSlots }, () => makeTemplate(def.needsModel));

      return entry;
    }).filter(Boolean);
  }

  // GPT unified 응답 → { texts, images } 변환
  function parseGPTResponse(data) {
    const blocks = data.blocks || [];
    const texts = [];
    const images = [];
    const SKIP = new Set(['blockId', 'blockIndex', 'role', 'imagePrompt', 'imagePrompts']);

    blocks.forEach(block => {
      const textEntry = { blockId: block.blockId, blockIndex: block.blockIndex };
      let hasText = false;
      Object.keys(block).forEach(k => {
        if (!SKIP.has(k)) { textEntry[k] = block[k]; hasText = true; }
      });
      if (hasText) texts.push(textEntry);

      if (block.imagePrompt) {
        images.push({ blockId: block.blockId, blockIndex: block.blockIndex, placeholderIndex: 0, prompt: block.imagePrompt });
      }
      if (block.imagePrompts) {
        block.imagePrompts.forEach((p, i) => {
          images.push({ blockId: block.blockId, blockIndex: block.blockIndex, placeholderIndex: i, prompt: p });
        });
      }
    });

    return { texts, images };
  }

  // ─── Step 3: 텍스트 결과 모달 ──────────────────────────────────────────
  function openResultModal(result, _product) {
    const el = createOverlay('ai-result-modal');

    el.innerHTML = `
      <div class="ai-modal" style="width:640px">
        <div class="ai-modal-header">
          <span class="ai-modal-title">✨ AI 텍스트 결과</span>
          <button class="ai-modal-close">✕</button>
        </div>
        <div class="ai-modal-body">
          ${renderTextResults(result.texts || [])}
        </div>
        <div class="ai-modal-footer">
          <button class="ai-btn-secondary" id="ai-btn-regenerate">새로 생성</button>
          <button class="ai-btn-secondary" id="ai-btn-apply-text">적용만</button>
          <button class="ai-btn-primary" id="ai-btn-apply-and-image">적용 + 이미지 생성 →</button>
        </div>
      </div>`;

    document.body.appendChild(el);

    el.querySelector('.ai-modal-close').addEventListener('click', () => el.remove());

    el.querySelector('#ai-btn-regenerate').addEventListener('click', () => {
      _gptResult = null;
      _lastProduct = null;
      _clearResult();
      setStepState(1);
      el.remove();
      openInputModal();
    });

    el.querySelector('#ai-btn-apply-text').addEventListener('click', () => {
      const texts = collectEditedTexts(el);
      applyTextToCanvas(texts);
      el.remove();
    });

    el.querySelector('#ai-btn-apply-and-image').addEventListener('click', () => {
      const texts = collectEditedTexts(el);
      applyTextToCanvas(texts);
      el.remove();
      openImageModal();
    });
  }

  // ─── 이미지 생성 모달 (독립) ─────────────────────────────────────────────
  const IMAGE_BLOCKS = new Set(['b02-img-left', 'b03-img-right', 'b06-full-image', 'b08-gallery-2col', 'b09-gallery-3col']);

  // 슬롯 타입별 구조화 기본 프롬프트 (나노페이지 형식: 톤/조명/배경/구도/모델/소품/감성)
  const SLOT_STRUCTURED_DEFAULTS = {
    'b02-img-left': `톤: 밝고 깔끔한 스튜디오 톤, 흰색 또는 연회색 배경, 제품 색상이 선명하게 표현
조명: 정면 소프트박스 주조명, 측면 보조광으로 입체감 부여, 상부 하이라이트
배경: 순백색 무지 배경, 제품에 집중되는 미니멀한 구성
구도: 제품 정면 또는 3/4 앵글 클로즈업, 중앙 정렬, 전체 제품이 프레임 안에
모델: 없음
소품: 없음
감성: 고품질 제품의 신뢰감과 정교한 디테일이 느껴지는 프리미엄 제품 촬영`,

    'b03-img-right': `톤: 밝고 깔끔한 스튜디오 톤, 흰색 또는 연회색 배경, 제품 색상이 선명하게 표현
조명: 정면 소프트박스 주조명, 측면 보조광으로 입체감 부여, 상부 하이라이트
배경: 순백색 무지 배경, 제품에 집중되는 미니멀한 구성
구도: 제품 정면 또는 3/4 앵글 클로즈업, 중앙 정렬, 전체 제품이 프레임 안에
모델: 없음
소품: 없음
감성: 고품질 제품의 신뢰감과 정교한 디테일이 느껴지는 프리미엄 제품 촬영`,

    'b06-full-image': `톤: 따뜻하고 자연스러운 라이프스타일 톤, 햇살이 느껴지는 밝은 분위기
조명: 자연광 또는 대형 소프트박스, 부드럽고 그림자가 적은 조명, 따뜻한 색온도
배경: 일상적인 생활 공간 또는 야외, 제품 사용 환경이 연상되는 자연스러운 배경
구도: 와이드샷, 제품과 사용 환경이 함께 보이는 환경 강조 구도
모델: 없음
소품: 생활감 있는 소품들, 제품과 어울리는 인테리어 또는 자연 소품
감성: 실제 생활에서 사용하는 장면, 구매 후 일상을 상상하게 하는 편안한 감성`,

    'b08-gallery-2col': `톤: 깨끗하고 선명한 화이트 스튜디오 톤, 제품 세부 디테일이 부각되는 밝기
조명: 링라이트 또는 탑라이트, 제품 표면 질감이 잘 드러나는 조명 각도
배경: 흰색 또는 연한 파스텔 배경, 제품 색상과 대비되는 깔끔한 배경
구도: 제품 디테일 클로즈업, 특정 기능이나 소재가 강조되는 앵글
모델: 없음
소품: 없음
감성: 제품 품질과 디테일에 집중, 구매 전 꼼꼼히 살펴보는 느낌의 상세 촬영`,

    'b09-gallery-3col': `톤: 깨끗하고 선명한 화이트 스튜디오 톤, 제품 세부 디테일이 부각되는 밝기
조명: 링라이트 또는 탑라이트, 제품 표면 질감이 잘 드러나는 조명 각도
배경: 흰색 또는 연한 파스텔 배경, 제품 색상과 대비되는 깔끔한 배경
구도: 제품 디테일 클로즈업, 특정 기능이나 소재가 강조되는 앵글
모델: 없음
소품: 없음
감성: 제품 품질과 디테일에 집중, 구매 전 꼼꼼히 살펴보는 느낌의 상세 촬영`,

  };

  // 구조화 프롬프트에서 특정 필드 값을 교체하는 유틸
  function updateStructuredField(text, field, value) {
    const regex = new RegExp(`(${field}:)[^\n]*`, '');
    return text.replace(regex, `$1 ${value}`);
  }

  function buildImageSlots() {
    const slots = [];
    const gptImages = _gptResult?.images || [];
    BlockManager.blocks.forEach((block, idx) => {
      if (!IMAGE_BLOCKS.has(block.id)) return;
      const count = block.id === 'b08-gallery-2col' ? 2 : block.id === 'b09-gallery-3col' ? 3 : 1;
      for (let pi = 0; pi < count; pi++) {
        // GPT 생성 프롬프트 우선, 없으면 기본값
        const gptEntry = gptImages.find(
          g => g.blockId === block.id && g.blockIndex === idx && g.placeholderIndex === pi
        );
        const prompt = gptEntry?.prompt || SLOT_STRUCTURED_DEFAULTS[block.id] || '';
        slots.push({
          blockId: block.id,
          blockIndex: idx,
          placeholderIndex: pi,
          prompt,
        });
      }
    });
    return slots;
  }

  function openImageModal() {
    const slots = buildImageSlots();
    if (!slots.length) {
      alert('캔버스에 이미지 블록이 없습니다.\n(좌이미지, 우이미지, 전체이미지, 갤러리, 브랜드배너 블록을 추가해주세요)');
      return;
    }

    // 처음 열 때만 캔버스에서 자동 수집, 이후엔 사용자가 수동 관리
    if (_refImages.length === 0) {
      _refImages = collectCanvasImages();
    }

    const el = createOverlay('ai-image-modal');
    el.innerHTML = `
      <div class="ai-modal" style="width:600px">
        <div class="ai-modal-header">
          <span class="ai-modal-title">🎨 AI 이미지 생성</span>
          <span class="ai-mini-progress" id="ai-mini-progress" style="display:none"></span>
          <div style="display:flex;gap:4px;margin-left:auto">
            <button class="ai-modal-minimize" id="ai-modal-minimize-btn" title="최소화">－</button>
            <button class="ai-modal-close">✕</button>
          </div>
        </div>
        <div class="ai-modal-body">
          ${_refImages.length ? `
          <div class="ai-analyze-section">
            <div class="ai-analyze-header">
              <span class="ai-analyze-label">참조 이미지 ${_refImages.length}장 — AI가 이 제품을 그대로 재현합니다</span>
            </div>
            <div class="ai-ref-thumbs">
              ${_refImages.map(img => `<img class="ai-ref-thumb" src="${img.dataUrl}">`).join('')}
            </div>
          </div>` : ''}
          <p class="ai-ref-empty" style="margin-bottom:12px">각 슬롯의 시나리오를 수정 후 생성 버튼을 누르세요.</p>
          ${slots.map((slot, idx) => `
            <div class="ai-img-prompt-card" data-img-idx="${idx}">
              <div class="ai-img-prompt-header">
                <span class="ai-img-prompt-label">${slot.blockId} — 슬롯 ${slot.placeholderIndex + 1}</span>
                <div class="ai-img-prompt-actions">
                  <button class="ai-btn-sm primary ai-btn-gen-img" data-idx="${idx}">생성</button>
                </div>
              </div>
              <textarea class="ai-result-textarea" data-img-idx="${idx}" style="min-height:160px;font-size:12px;line-height:1.6">${escHtml(slot.prompt)}</textarea>
              <div class="ai-img-status" id="ai-img-status-${idx}"></div>
            </div>`).join('')}
        </div>
        <div class="ai-gen-caution">생성 중 캔버스 작업은 가능하나, 생성 중인 슬롯의 블록을 삭제하면 해당 슬롯은 오류 처리됩니다.</div>
        <div class="ai-modal-footer">
          <span class="ai-gen-progress" id="ai-gen-progress" style="font-size:13px;color:#6b7280;margin-right:auto">0 / ${slots.length} 완료</span>
          <button class="ai-btn-secondary ai-modal-close-btn">닫기</button>
          <button class="ai-btn-primary" id="ai-btn-gen-all">전체 생성</button>
        </div>
      </div>`;

    document.body.appendChild(el);

    el.querySelector('.ai-modal-close').addEventListener('click', () => el.remove());
    el.querySelector('.ai-modal-close-btn').addEventListener('click', () => el.remove());

    // 최소화 토글
    el.querySelector('#ai-modal-minimize-btn').addEventListener('click', () => {
      const isMin = el.classList.toggle('minimized');
      el.querySelector('#ai-modal-minimize-btn').textContent = isMin ? '＋' : '－';
    });

    // 개별 생성
    el.querySelectorAll('.ai-btn-gen-img').forEach(btn => {
      btn.addEventListener('click', () => onGenerateImage(btn, slots, el));
    });

    // 전체 생성 (순차)
    el.querySelector('#ai-btn-gen-all').addEventListener('click', async () => {
      _minimizeImageModal(el, slots.length);
      const allBtns = [...el.querySelectorAll('.ai-btn-gen-img:not([disabled])')];
      for (const btn of allBtns) {
        await onGenerateImage(btn, slots, el);
      }
    });

  }

  function renderTextResults(texts) {
    if (!texts.length) return '<p class="ai-ref-empty">생성된 텍스트 결과가 없습니다.</p>';
    return texts.map((block, bi) => {
      const fields = Object.entries(block).filter(([k]) => !['blockId','blockIndex'].includes(k));
      return `
        <div class="ai-block-result">
          <div class="ai-block-result-header">${block.blockId} (블록 ${block.blockIndex + 1})</div>
          <div class="ai-block-result-fields">
            ${fields.map(([key, val]) => renderField(bi, key, val)).join('')}
          </div>
        </div>`;
    }).join('');
  }

  function renderField(bi, key, val) {
    if (Array.isArray(val)) {
      return val.map((item, ii) => {
        if (typeof item === 'object') {
          return Object.entries(item).map(([k, v]) => `
            <div>
              <div class="ai-result-field-label">${key}[${ii}].${k}</div>
              <textarea class="ai-result-textarea" data-bi="${bi}" data-key="${key}" data-ii="${ii}" data-subkey="${k}">${v}</textarea>
            </div>`).join('');
        }
        return `
          <div>
            <div class="ai-result-field-label">${key}[${ii}]</div>
            <textarea class="ai-result-textarea" data-bi="${bi}" data-key="${key}" data-ii="${ii}">${item}</textarea>
          </div>`;
      }).join('');
    }
    return `
      <div>
        <div class="ai-result-field-label">${key}</div>
        <textarea class="ai-result-textarea" data-bi="${bi}" data-key="${key}">${val}</textarea>
      </div>`;
  }


  // 편집된 텍스트 수집
  function collectEditedTexts(el) {
    const result = [..._gptResult.texts];
    el.querySelectorAll('.ai-result-textarea[data-bi]').forEach(ta => {
      const bi = +ta.dataset.bi;
      const key = ta.dataset.key;
      const ii = ta.dataset.ii !== undefined ? +ta.dataset.ii : null;
      const subkey = ta.dataset.subkey;
      if (ii !== null && subkey) {
        result[bi][key][ii][subkey] = ta.value;
      } else if (ii !== null) {
        result[bi][key][ii] = ta.value;
      } else {
        result[bi][key] = ta.value;
      }
    });
    return result;
  }

  // ─── 캔버스 텍스트 적용 ─────────────────────────────────────────────────
  const SINGLE_LINE_FIELDS = new Set(['title', 'subtitle', 'name', 'slogan', 'headline', 'step']);

  function applyTextToCanvas(texts) {
    const canvas = CanvasManager.getCanvas();
    const objects = canvas.getObjects();

    // 1차: 텍스트 설정 + 제목류 각자 최소 폰트 계산
    // blockKey별 제목류 오브젝트 수집
    const singleLineObjsByBlock = {}; // blockKey → [obj, ...]

    texts.forEach(blockData => {
      const blockKey = `${blockData.blockId}__${blockData.blockIndex}`;
      objects
        .filter(obj => obj._blockId === blockData.blockId && obj._blockIndex === blockData.blockIndex && obj._contentKey)
        .forEach(obj => {
          const value = getNestedValue(blockData, obj._contentKey);
          if (value !== undefined && value !== null) {
            let text = String(value);
            if (obj._contentKey.endsWith('.stars')) {
              const num = parseFloat(text);
              if (!isNaN(num)) {
                const n = Math.min(5, Math.max(0, Math.round(num)));
                text = '★'.repeat(n) + '☆'.repeat(5 - n);
              } else {
                text = /[★☆]/.test(text) ? text : '★★★★★';
              }
            }
            const prefix = obj._contentKey.startsWith('items[') && blockData.blockId === 'b11-caution' ? '•  ' : '';
            obj.set('text', prefix + text);

            // 제목류 Textbox: 1줄 맞도록 폰트 축소 후 모아두기
            const fieldName = obj._contentKey.split('.').pop().replace(/\[\d+\].*/, '');
            if (obj.type === 'textbox' && SINGLE_LINE_FIELDS.has(fieldName)) {
              obj.initDimensions?.();
              const MIN_FONT = Math.max(18, Math.round(obj.fontSize * 0.6));
              while ((obj._textLines?.length || 1) > 1 && obj.fontSize > MIN_FONT) {
                obj.set('fontSize', obj.fontSize - 2);
                obj.initDimensions?.();
              }
              if (!singleLineObjsByBlock[blockKey]) singleLineObjsByBlock[blockKey] = [];
              singleLineObjsByBlock[blockKey].push(obj);
            }
          }
        });
    });

    // 2차: 같은 블록 내 제목류는 최솟값 폰트로 통일
    Object.values(singleLineObjsByBlock).forEach(objs => {
      const minFont = Math.min(...objs.map(o => o.fontSize));
      objs.forEach(o => {
        if (o.fontSize !== minFont) {
          o.set('fontSize', minFont);
          o.initDimensions?.();
        }
      });
    });

    canvas.renderAll();
    CanvasManager.saveHistory();
    // 자동저장 트리거 (object:modified 이벤트가 발생하지 않으므로 직접 fire)
    canvas.fire('object:modified');
  }

  // 중첩 키 파싱: 'items[0].title', 'rows[1][0]' 등
  function getNestedValue(obj, keyPath) {
    const parts = keyPath.replace(/\[(\d+)\]/g, '.$1').split('.');
    return parts.reduce((cur, k) => (cur != null ? cur[k] : undefined), obj);
  }

  // ─── Gemini 이미지 생성 ────────────────────────────────────────────────
  async function onGenerateImage(btn, slots, _modalEl) {
    const idx = +btn.dataset.idx;
    const imgData = slots[idx];
    const card = btn.closest('.ai-img-prompt-card');
    const modal = card.closest('.ai-modal');
    const promptEl = card.querySelector(`textarea[data-img-idx="${idx}"]`);
    const statusEl = card.querySelector('.ai-img-status');
    const prompt = promptEl?.value || imgData.prompt;

    btn.disabled = true;
    statusEl.className = 'ai-img-status generating';
    statusEl.textContent = '생성 중...';

    try {
      const dataUrl = await generateImageWithGemini(prompt, await _compressImagesForAPI(_refImages));
      await applyImageToPlaceholder(imgData.blockId, imgData.blockIndex, imgData.placeholderIndex, dataUrl);
      statusEl.className = 'ai-img-status done';
      statusEl.textContent = '✓ 캔버스에 적용됨';
      _updateGenProgress(modal, slots);
    } catch (e) {
      statusEl.className = 'ai-img-status error';
      statusEl.textContent = '오류: ' + e.message;
      btn.disabled = false;
    }
  }

  function _minimizeImageModal(overlay, total) {
    if (!overlay.classList.contains('minimized')) {
      overlay.classList.add('minimized');
      overlay.querySelector('#ai-modal-minimize-btn').textContent = '＋';
      const miniProgress = overlay.querySelector('#ai-mini-progress');
      if (miniProgress) { miniProgress.textContent = `0 / ${total}`; miniProgress.style.display = ''; }
    }
  }

  function _updateGenProgress(modal, slots) {
    const progressEl = modal?.querySelector('#ai-gen-progress');
    if (!progressEl) return;
    const done = modal.querySelectorAll('.ai-img-status.done').length;
    const text = done === slots.length ? `✓ ${done} / ${slots.length} 완료` : `${done} / ${slots.length} 완료`;
    progressEl.textContent = text;
    const overlay = modal.closest('.ai-modal-overlay');
    const miniProgress = overlay?.querySelector('#ai-mini-progress');
    if (done === slots.length) {
      progressEl.style.color = '#16a34a';
      if (miniProgress) miniProgress.textContent = `✓ ${done} / ${slots.length}`;
      if (overlay?.classList.contains('minimized')) {
        setTimeout(() => overlay.remove(), 1500);
      }
    } else {
      if (miniProgress) miniProgress.textContent = `${done} / ${slots.length}`;
    }
  }

  async function generateImageWithGemini(promptText, refImages = []) {
    const hasRef = refImages.length > 0;
    const fullPrompt = hasRef
      ? `${refImages.length > 1
          ? `You are provided with ${refImages.length} product reference images showing the product from different angles.`
          : 'You are provided with a product reference image.'}
Create a professional product photography image using this EXACT product in the scenario described below.

🚨 CRITICAL REQUIREMENT: You MUST use the provided product reference images to understand the product's appearance. Do NOT create a different product — use the EXACT product shown in the reference images and stage it according to the scenario.

Scenario:
${promptText}

Requirements:
- Use the EXACT product shown in the reference images
- Reference ALL provided images to understand the product's full appearance (shape, color, texture, packaging)
- Stage and style the product according to the scenario description
- Create a photorealistic, high-quality e-commerce product photography
- Use professional lighting that matches the scenario mood
- The product should be clearly visible and be the main focus`
      : `Create a professional product photography image based on this scenario:\n\n${promptText}\n\nRequirements:\n- Create a photorealistic, high-quality e-commerce product image\n- Follow the exact scenario description\n- Use professional lighting and composition`;

    const parts = [
      ...refImages.map(img => ({ inlineData: { mimeType: img.mimeType, data: img.data } })),
      { text: fullPrompt },
    ];

    const data = await _callGemini('gemini-2.5-flash-image', {
      contents: [{ parts }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    });
    const resParts = data.candidates?.[0]?.content?.parts || [];
    for (const part of resParts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error('응답에 이미지가 없습니다.');
  }

  async function applyImageToPlaceholder(blockId, blockIndex, placeholderIndex, dataUrl) {
    const canvas = CanvasManager.getCanvas();
    // 플레이스홀더 또는 이미 적용된 이미지 모두 탐색
    const placeholder = canvas.getObjects().find(
      obj => (obj._isPlaceholder || obj.type === 'image')
        && obj._blockId === blockId
        && obj._blockIndex === blockIndex
        && obj._placeholderIndex === placeholderIndex
    );
    // 함께 있는 플레이스홀더 레이블도 제거
    const label = canvas.getObjects().find(
      obj => obj._isPlaceholderLabel && obj._blockId === blockId && obj._blockIndex === blockIndex && obj._placeholderIndex === placeholderIndex
    );

    if (!placeholder) throw new Error('플레이스홀더를 찾을 수 없습니다.');

    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(dataUrl, img => {
        if (!img) { reject(new Error('이미지 로드 실패')); return; }

        // 이미 적용된 이미지면 저장된 원본 크기 사용, 플레이스홀더면 rect 크기 사용
        const pw = placeholder._placeholderWidth || placeholder.width;
        const ph = placeholder._placeholderHeight || placeholder.height;

        // Contain: 이미지 전체가 보이도록 축소, 중앙 배치
        const finalScale = Math.min(pw / img.width, ph / img.height);
        const imgLeft = placeholder.left + (pw - img.width * finalScale) / 2;
        const imgTop  = placeholder.top  + (ph - img.height * finalScale) / 2;

        img.set({
          left: imgLeft,
          top: imgTop,
          scaleX: finalScale,
          scaleY: finalScale,
          _blockId: blockId,
          _blockKey: placeholder._blockKey,
          _blockIndex: blockIndex,
          _placeholderIndex: placeholderIndex,
          _placeholderWidth: pw,
          _placeholderHeight: ph,
        });

        if (label) canvas.remove(label);
        canvas.remove(placeholder);
        canvas.add(img);
        canvas.renderAll();
        CanvasManager.saveHistory();
        resolve();
      });
    });
  }

  // ─── 유틸 ────────────────────────────────────────────────────────────────
  function createOverlay(id) {
    document.getElementById(id)?.remove();
    const el = document.createElement('div');
    el.id = id;
    el.className = 'ai-modal-overlay';
    return el;
  }

  function showLoading(msg) {
    const el = createOverlay('ai-loading-overlay');
    el.innerHTML = `
      <div class="ai-modal" style="width:320px;align-items:center">
        <div class="ai-modal-body" style="width:100%">
          <div class="ai-loading">
            <div class="ai-spinner"></div>
            <span class="ai-loading-msg">${msg}</span>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);
    return el;
  }

  function escHtml(str) {
    return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // 외부 노출
  return { init, loadAfterProject };
})();
