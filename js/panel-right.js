/**
 * panel-right.js — 우측 속성 패널
 * 선택된 오브젝트 타입에 따라 해당 패널 표시 및 양방향 연동
 */

function initPanelRight() {
  const canvas = CanvasManager.getCanvas();

  // 선택 이벤트
  canvas.on('selection:created', onSelect);
  canvas.on('selection:updated', onSelect);
  canvas.on('selection:cleared', onDeselect);
  canvas.on('object:modified', syncFromCanvas);
  canvas.on('object:moving', syncPositionOnly);
  canvas.on('object:scaling', syncPositionOnly);

  bindPropInputs();
}

// ===== 패널 표시 제어 =====
function showPanel(type) {
  document.getElementById('panel-empty').style.display = 'none';
  document.getElementById('panel-placeholder').style.display = type === 'placeholder' ? 'block' : 'none';
  document.getElementById('panel-image').style.display = type === 'image' ? 'block' : 'none';
  document.getElementById('panel-shape').style.display = type === 'shape' ? 'block' : 'none';
  document.getElementById('panel-text-props').style.display = type === 'text' ? 'block' : 'none';
  document.getElementById('panel-common').style.display = type === 'placeholder' ? 'none' : 'block';
}

function hidePanel() {
  document.getElementById('panel-empty').style.display = 'flex';
  document.getElementById('panel-placeholder').style.display = 'none';
  document.getElementById('panel-image').style.display = 'none';
  document.getElementById('panel-shape').style.display = 'none';
  document.getElementById('panel-text-props').style.display = 'none';
  document.getElementById('panel-block-height').style.display = 'none';
  document.getElementById('panel-common').style.display = 'none';
  document.getElementById('panel-elem-align').style.display = 'none';
  // 좌측 텍스트 패널 숨김
  document.getElementById('panel-text').style.display = 'none';
}

let _currentBlockKey = null;
let _suppressDeselect = false;

function showBlockHeightPanel(obj) {
  const blockKey = obj?._blockKey;
  const panel = document.getElementById('panel-block-height');
  if (!blockKey) { panel.style.display = 'none'; _currentBlockKey = null; return; }

  _currentBlockKey = blockKey;
  const block = BlockManager.blocks.find(b => b.key === blockKey);
  if (!block) { panel.style.display = 'none'; return; }

  panel.style.display = 'block';
  document.getElementById('prop-block-extra').value = block.extraHeight || 0;
  // 블록 이름 표시 (id에서 앞부분 추출)
  const name = block.id.replace(/^b\d+-/, '').replace(/-/g, ' ');
  document.getElementById('block-height-name').textContent = name;
}

// ===== 오브젝트 타입 판별 =====
function getObjType(obj) {
  if (!obj) return null;
  if (obj._isPlaceholder) return 'placeholder';
  if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') return 'text';
  if (obj.type === 'image') return 'image';
  if (obj.type === 'rect' || obj.type === 'circle' || obj.type === 'line' || obj.type === 'ellipse') return 'shape';
  return 'shape';
}

// ===== 선택 시 패널 채우기 =====
function onSelect(e) {
  const canvas = CanvasManager.getCanvas();
  const active = canvas.getActiveObject();

  // 다중 선택: 요소 정렬 패널만 표시
  if (active?.type === 'activeSelection') {
    document.getElementById('panel-empty').style.display = 'none';
    document.getElementById('panel-common').style.display = 'block';
    document.getElementById('panel-elem-align').style.display = 'block';
    document.getElementById('panel-placeholder').style.display = 'none';
    document.getElementById('panel-image').style.display = 'none';
    document.getElementById('panel-shape').style.display = 'none';
    document.getElementById('panel-block-height').style.display = 'none';
    document.getElementById('panel-text').style.display = 'none';
    return;
  }

  const obj = e.selected?.[0] || active;
  if (!obj || obj.name === '__artboard__') { hidePanel(); return; }
  document.getElementById('panel-elem-align').style.display = 'none';
  const type = getObjType(obj);
  showPanel(type);
  syncFromObject(obj, type);
  showBlockHeightPanel(obj);

  // 텍스트 선택 시 좌측 패널 텍스트 속성 표시 + 요소 탭 자동 전환
  const textPanel = document.getElementById('panel-text');
  if (type === 'text') {
    textPanel.style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="elements"]').classList.add('active');
    document.getElementById('tab-elements').classList.add('active');
  } else {
    textPanel.style.display = 'none';
  }
}

function onDeselect() {
  if (_suppressDeselect) return;
  hidePanel();
}

function syncFromCanvas(e) {
  const obj = e.target;
  if (!obj || obj.name === '__artboard__') return;
  const type = getObjType(obj);
  syncFromObject(obj, type);
}

function syncPositionOnly(e) {
  const obj = e.target;
  if (!obj) return;
  document.getElementById('prop-x').value = Math.round(obj.left);
  document.getElementById('prop-y').value = Math.round(obj.top);
  document.getElementById('prop-w').value = Math.round(obj.getScaledWidth());
  document.getElementById('prop-h').value = Math.round(obj.getScaledHeight());
}

function syncFromObject(obj, type) {
  // 공통 위치/크기
  document.getElementById('prop-x').value = Math.round(obj.left);
  document.getElementById('prop-y').value = Math.round(obj.top);
  document.getElementById('prop-w').value = Math.round(obj.getScaledWidth());
  document.getElementById('prop-h').value = Math.round(obj.getScaledHeight());

  if (type === 'text') {
    document.getElementById('prop-text-content').value = obj.text || '';
    document.getElementById('prop-font-family').value = obj.fontFamily || 'Noto Sans KR';
    document.getElementById('prop-font-size').value = obj.fontSize || 24;
    document.getElementById('prop-font-weight').value = obj.fontWeight || '400';
    setColorInput('prop-text-color', 'prop-text-color-hex', obj.fill || '#111111');

    // 텍스트 정렬 버튼
    document.querySelectorAll('.align-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.align === obj.textAlign);
    });

    // 줄간격
    const lh = obj.lineHeight ?? 1.2;
    document.getElementById('prop-line-height').value = lh;
    document.getElementById('prop-line-height-val').textContent = lh.toFixed(2);

    // 자간
    const cs = obj.charSpacing ?? 0;
    document.getElementById('prop-char-spacing').value = cs;
    document.getElementById('prop-char-spacing-val').textContent = cs;
  }

  // 잠금 버튼 상태 동기화
  const lockBtn = document.getElementById('btn-lock-obj');
  if (lockBtn) {
    const isLocked = !!obj._locked;
    lockBtn.classList.toggle('locked', isLocked);
    lockBtn.innerHTML = isLocked
      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> 잠금 해제`
      : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> 잠금`;
  }

  if (type === 'image') {
    const opacity = Math.round((obj.opacity ?? 1) * 100);
    document.getElementById('prop-opacity').value = opacity;
    document.getElementById('prop-opacity-val').textContent = opacity + '%';
  }

  if (type === 'shape') {
    setColorInput('prop-fill-color', 'prop-fill-color-hex', obj.fill || '#e2e8f0');
    setColorInput('prop-stroke-color', 'prop-stroke-color-hex', obj.stroke || '#cccccc');
    document.getElementById('prop-stroke-width').value = obj.strokeWidth ?? 0;
    const opacity = Math.round((obj.opacity ?? 1) * 100);
    document.getElementById('prop-shape-opacity').value = opacity;
    document.getElementById('prop-shape-opacity-val').textContent = opacity + '%';
  }
}

function setColorInput(inputId, hexId, color) {
  const hex = fabricColorToHex(color);
  document.getElementById(inputId).value = hex;
  document.getElementById(hexId).textContent = hex;
}

function fabricColorToHex(color) {
  if (!color || color === 'transparent') return '#000000';
  if (color.startsWith('#') && color.length === 7) return color;
  // rgb(r,g,b) 또는 rgba(r,g,b,a) 변환
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) {
    return '#' + [m[1], m[2], m[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
  }
  return '#000000';
}

// ===== 입력 → 캔버스 반영 =====
function bindPropInputs() {
  const canvas = CanvasManager.getCanvas();

  function getActive() { return canvas.getActiveObject(); }

  // 텍스트 내용
  document.getElementById('prop-text-content').addEventListener('input', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'text') return;
    obj.set('text', this.value);
    canvas.renderAll();
  });

  // 폰트 패밀리
  document.getElementById('prop-font-family').addEventListener('change', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'text') return;
    obj.set('fontFamily', this.value);
    canvas.renderAll();
    CanvasManager.saveHistory();
  });

  // 폰트 크기
  document.getElementById('prop-font-size').addEventListener('change', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'text') return;
    obj.set('fontSize', parseInt(this.value));
    canvas.renderAll();
    CanvasManager.saveHistory();
  });

  // 폰트 굵기
  document.getElementById('prop-font-weight').addEventListener('change', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'text') return;
    obj.set('fontWeight', this.value);
    canvas.renderAll();
    CanvasManager.saveHistory();
  });

  // 텍스트 색상
  document.getElementById('prop-text-color').addEventListener('input', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'text') return;
    obj.set('fill', this.value);
    document.getElementById('prop-text-color-hex').textContent = this.value;
    canvas.renderAll();
  });
  document.getElementById('prop-text-color').addEventListener('change', () => CanvasManager.saveHistory());

  // 정렬
  document.querySelectorAll('.align-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const obj = getActive();
      if (!obj || getObjType(obj) !== 'text') return;
      obj.set('textAlign', this.dataset.align);
      canvas.renderAll();
      document.querySelectorAll('.align-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      CanvasManager.saveHistory();
    });
  });

  // 줄간격
  document.getElementById('prop-line-height').addEventListener('input', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'text') return;
    const val = parseFloat(this.value);
    obj.set('lineHeight', val);
    document.getElementById('prop-line-height-val').textContent = val.toFixed(2);
    canvas.renderAll();
  });
  document.getElementById('prop-line-height').addEventListener('change', () => CanvasManager.saveHistory());

  // 자간
  document.getElementById('prop-char-spacing').addEventListener('input', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'text') return;
    const val = parseInt(this.value);
    obj.set('charSpacing', val);
    document.getElementById('prop-char-spacing-val').textContent = val;
    canvas.renderAll();
  });
  document.getElementById('prop-char-spacing').addEventListener('change', () => CanvasManager.saveHistory());

  // 아트보드 정렬
  document.querySelectorAll('[data-align-dir]').forEach(btn => {
    btn.addEventListener('click', () => alignToArtboard(btn.dataset.alignDir));
  });

  // 요소 정렬 (다중 선택)
  document.querySelectorAll('[data-elem-dir]').forEach(btn => {
    btn.addEventListener('click', () => alignElements(btn.dataset.elemDir));
  });

  // 잠금 토글
  document.getElementById('btn-lock-obj').addEventListener('click', () => {
    const obj = getActive();
    if (!obj || obj.name === '__artboard__') return;
    const isLocked = !obj._locked;
    obj._locked = isLocked;
    obj.set({
      lockMovementX: isLocked,
      lockMovementY: isLocked,
      lockScalingX: isLocked,
      lockScalingY: isLocked,
      lockRotation: isLocked,
      hasControls: !isLocked,
    });
    canvas.renderAll();
    CanvasManager.saveHistory();
    // 버튼 상태 갱신
    const lockBtn = document.getElementById('btn-lock-obj');
    lockBtn.classList.toggle('locked', isLocked);
    lockBtn.innerHTML = isLocked
      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> 잠금 해제`
      : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> 잠금`;
  });

  // 이미지 불투명도
  document.getElementById('prop-opacity').addEventListener('input', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'image') return;
    obj.set('opacity', parseInt(this.value) / 100);
    document.getElementById('prop-opacity-val').textContent = this.value + '%';
    canvas.renderAll();
  });
  document.getElementById('prop-opacity').addEventListener('change', () => CanvasManager.saveHistory());

  // 도형 채우기 색
  document.getElementById('prop-fill-color').addEventListener('input', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'shape') return;
    obj.set('fill', this.value);
    document.getElementById('prop-fill-color-hex').textContent = this.value;
    canvas.renderAll();
  });
  document.getElementById('prop-fill-color').addEventListener('change', () => CanvasManager.saveHistory());

  // 도형 테두리 색
  document.getElementById('prop-stroke-color').addEventListener('input', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'shape') return;
    obj.set('stroke', this.value);
    document.getElementById('prop-stroke-color-hex').textContent = this.value;
    canvas.renderAll();
  });
  document.getElementById('prop-stroke-color').addEventListener('change', () => CanvasManager.saveHistory());

  // 도형 테두리 두께
  document.getElementById('prop-stroke-width').addEventListener('change', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'shape') return;
    obj.set('strokeWidth', parseInt(this.value) || 0);
    canvas.renderAll();
    CanvasManager.saveHistory();
  });

  // 도형 불투명도
  document.getElementById('prop-shape-opacity').addEventListener('input', function () {
    const obj = getActive();
    if (!obj || getObjType(obj) !== 'shape') return;
    obj.set('opacity', parseInt(this.value) / 100);
    document.getElementById('prop-shape-opacity-val').textContent = this.value + '%';
    canvas.renderAll();
  });
  document.getElementById('prop-shape-opacity').addEventListener('change', () => CanvasManager.saveHistory());

  // 위치 X/Y
  ['prop-x', 'prop-y'].forEach(id => {
    document.getElementById(id).addEventListener('change', function () {
      const obj = getActive();
      if (!obj) return;
      const key = id === 'prop-x' ? 'left' : 'top';
      obj.set(key, parseInt(this.value));
      obj.setCoords();
      canvas.renderAll();
      CanvasManager.saveHistory();
    });
  });

  // 레이어 순서
  document.getElementById('btn-bring-forward').addEventListener('click', () => {
    const obj = getActive();
    if (obj && obj.name !== '__artboard__') { canvas.bringForward(obj); CanvasManager.saveHistory(); }
  });
  document.getElementById('btn-send-backward').addEventListener('click', () => {
    const obj = getActive();
    if (obj && obj.name !== '__artboard__') {
      canvas.sendBackwards(obj);
      if (CanvasManager.getArtboard()) canvas.sendToBack(CanvasManager.getArtboard());
      CanvasManager.saveHistory();
    }
  });
  document.getElementById('btn-bring-front').addEventListener('click', () => {
    const obj = getActive();
    if (obj && obj.name !== '__artboard__') { canvas.bringToFront(obj); CanvasManager.saveHistory(); }
  });
  document.getElementById('btn-send-back').addEventListener('click', () => {
    const obj = getActive();
    if (obj && obj.name !== '__artboard__') {
      canvas.sendToBack(obj);
      if (CanvasManager.getArtboard()) canvas.sendToBack(CanvasManager.getArtboard());
      CanvasManager.saveHistory();
    }
  });

  // 요소 삭제
  document.getElementById('btn-delete-obj').addEventListener('click', () => {
    CanvasManager.deleteSelected();
    hidePanel();
  });

  // 플레이스홀더 → 이미지 업로드
  document.getElementById('btn-upload-placeholder').addEventListener('click', () => {
    document.getElementById('placeholder-upload').click();
  });
  document.getElementById('placeholder-upload').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const placeholder = canvas.getActiveObject();
    if (!placeholder || !placeholder._isPlaceholder) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target.result, (img) => {
        // 가로 맞춤 + clipPath: 이미지 너비를 프레임에 맞추고 넘치는 부분 클립
        // 이미지를 드래그하면 프레임 안에서 보이는 영역 조절 가능
        const scale = placeholder.width / img.width;
        img.set({
          left: placeholder.left + (placeholder.width - img.width * scale) / 2,
          top: placeholder.top + (placeholder.height - img.height * scale) / 2,
          scaleX: scale,
          scaleY: scale,
          clipPath: new fabric.Rect({
            left: placeholder.left,
            top: placeholder.top,
            width: placeholder.width,
            height: placeholder.height,
            absolutePositioned: true,
          }),
          _blockKey: placeholder._blockKey,
          _blockId: placeholder._blockId,
        });

        // 플레이스홀더 rect + 쌍을 이루는 라벨 텍스트만 제거 (다른 플레이스홀더는 유지)
        const phCx = placeholder.left + placeholder.width / 2;
        const phCy = placeholder.top + placeholder.height / 2;
        canvas.getObjects()
          .filter(o => {
            if (o === placeholder) return true;
            if (o._isPlaceholderLabel && o._blockKey === placeholder._blockKey) {
              return Math.abs(o.left - phCx) < 1 && Math.abs(o.top - phCy) < 1;
            }
            return false;
          })
          .forEach(o => canvas.remove(o));

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        CanvasManager.saveHistory();
        showPanel('image');
        syncFromObject(img, 'image');
      });
    };
    reader.readAsDataURL(file);
    this.value = '';
  });

  // 이미지 교체
  document.getElementById('btn-replace-image').addEventListener('click', () => {
    document.getElementById('image-replace-upload').click();
  });
  document.getElementById('image-replace-upload').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const obj = canvas.getActiveObject();
    if (!obj || getObjType(obj) !== 'image') return;
    const reader = new FileReader();
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target.result, (newImg) => {
        newImg.set({ left: obj.left, top: obj.top, scaleX: obj.scaleX, scaleY: obj.scaleY, angle: obj.angle });
        canvas.remove(obj);
        canvas.add(newImg);
        canvas.setActiveObject(newImg);
        canvas.renderAll();
        CanvasManager.saveHistory();
      });
    };
    reader.readAsDataURL(file);
    this.value = '';
  });

  // ===== 블록 높이 개별 조절 =====
  function applyBlockHeight(val) {
    if (!_currentBlockKey) return;
    BlockManager.resizeBlock(_currentBlockKey, val);
    document.getElementById('prop-block-extra').value = val;
  }

  document.getElementById('btn-block-h-minus').addEventListener('click', () => {
    const cur = parseInt(document.getElementById('prop-block-extra').value) || 0;
    applyBlockHeight(Math.max(0, cur - 20));
  });
  document.getElementById('btn-block-h-plus').addEventListener('click', () => {
    const cur = parseInt(document.getElementById('prop-block-extra').value) || 0;
    applyBlockHeight(cur + 20);
  });
  document.getElementById('prop-block-extra').addEventListener('change', (e) => {
    applyBlockHeight(Math.max(0, parseInt(e.target.value) || 0));
  });

  // ===== 일괄 높이 조절 =====
  document.getElementById('btn-bulk-h-minus').addEventListener('click', () => {
    BlockManager.resizeAll(-20);
    // 현재 선택된 블록 표시 갱신
    const obj = CanvasManager.getCanvas().getActiveObject();
    if (obj?._blockKey) showBlockHeightPanel(obj);
  });
  document.getElementById('btn-bulk-h-plus').addEventListener('click', () => {
    BlockManager.resizeAll(20);
    const obj = CanvasManager.getCanvas().getActiveObject();
    if (obj?._blockKey) showBlockHeightPanel(obj);
  });
}

// ===== 아트보드 기준 정렬 =====
function alignToArtboard(direction) {
  const canvas = CanvasManager.getCanvas();
  const obj = canvas.getActiveObject();
  if (!obj || obj.name === '__artboard__') return;

  const artW = CanvasManager.getArtboardWidth();
  const artH = CanvasManager.getArtboardHeight();

  // Fabric.js 헬퍼(getCenterPoint/getScaledWidth 등)는 뷰포트·origin 계산 혼입 위험 있음.
  // obj.left/top/width/height/scaleX/scaleY/originX/originY 를 직접 사용해 canvas 좌표 계산.
  const w  = obj.width  * (obj.scaleX || 1);
  const h  = obj.height * (obj.scaleY || 1);
  const ox = obj.originX || 'left';
  const oy = obj.originY || 'top';

  // obj.left/top → 실제 canvas 좌측/상단 끝
  const edgeL = ox === 'center' ? obj.left - w / 2 : ox === 'right' ? obj.left - w : obj.left;
  const edgeT = oy === 'center' ? obj.top  - h / 2 : oy === 'bottom'? obj.top  - h : obj.top;

  let newEdgeL = edgeL;
  let newEdgeT = edgeT;

  switch (direction) {
    case 'left':    newEdgeL = 0;               break;
    case 'centerH': newEdgeL = (artW - w) / 2;  break;
    case 'right':   newEdgeL = artW - w;         break;
    case 'top':     newEdgeT = 0;               break;
    case 'centerV': newEdgeT = (artH - h) / 2;  break;
    case 'bottom':  newEdgeT = artH - h;         break;
  }

  // 다시 obj.left/top 기준으로 역산
  const newLeft = ox === 'center' ? newEdgeL + w / 2 : ox === 'right' ? newEdgeL + w : newEdgeL;
  const newTop  = oy === 'center' ? newEdgeT + h / 2 : oy === 'bottom'? newEdgeT + h : newEdgeT;

  obj.set({ left: newLeft, top: newTop });
  obj.setCoords();
  canvas.renderAll();
  CanvasManager.saveHistory();
  syncPositionOnly({ target: obj });
}

// ===== 요소들끼리 정렬 (다중 선택) =====
function alignElements(direction) {
  const canvas = CanvasManager.getCanvas();
  const active = canvas.getActiveObject();
  if (!active || active.type !== 'activeSelection') return;

  const objects = active.getObjects();
  if (objects.length < 2) return;

  // discardActiveObject() → 각 오브젝트가 canvas 절대좌표로 복원됨
  // selection:cleared 이벤트가 hidePanel()을 호출하지 않도록 억제
  _suppressDeselect = true;
  canvas.discardActiveObject();
  _suppressDeselect = false;

  // 각 오브젝트의 canvas 좌표계 bounding box 계산
  const bounds = objects.map(obj => {
    const w  = obj.width  * (obj.scaleX || 1);
    const h  = obj.height * (obj.scaleY || 1);
    const ox = obj.originX || 'left';
    const oy = obj.originY || 'top';
    const edgeL = ox === 'center' ? obj.left - w / 2 : ox === 'right' ? obj.left - w : obj.left;
    const edgeT = oy === 'center' ? obj.top  - h / 2 : oy === 'bottom'? obj.top  - h : obj.top;
    return { obj, edgeL, edgeT, edgeR: edgeL + w, edgeB: edgeT + h, w, h };
  });

  // 정렬 기준값
  const minL = Math.min(...bounds.map(b => b.edgeL));
  const maxR = Math.max(...bounds.map(b => b.edgeR));
  const minT = Math.min(...bounds.map(b => b.edgeT));
  const maxB = Math.max(...bounds.map(b => b.edgeB));
  const midH = (minL + maxR) / 2;
  const midV = (minT + maxB) / 2;

  bounds.forEach(({ obj, edgeL, edgeT, w, h }) => {
    const ox = obj.originX || 'left';
    const oy = obj.originY || 'top';
    let newEdgeL = edgeL;
    let newEdgeT = edgeT;

    switch (direction) {
      case 'left':    newEdgeL = minL;        break;
      case 'centerH': newEdgeL = midH - w / 2; break;
      case 'right':   newEdgeL = maxR - w;     break;
      case 'top':     newEdgeT = minT;        break;
      case 'centerV': newEdgeT = midV - h / 2; break;
      case 'bottom':  newEdgeT = maxB - h;     break;
    }

    const newLeft = ox === 'center' ? newEdgeL + w / 2 : ox === 'right' ? newEdgeL + w : newEdgeL;
    const newTop  = oy === 'center' ? newEdgeT + h / 2 : oy === 'bottom'? newEdgeT + h : newEdgeT;
    obj.set({ left: newLeft, top: newTop });
    obj.setCoords();
  });

  // 선택 복원
  const newSel = new fabric.ActiveSelection(objects, { canvas });
  canvas.setActiveObject(newSel);
  canvas.renderAll();
  CanvasManager.saveHistory();
}

window.PanelRight = { init: initPanelRight };
