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
  document.getElementById('panel-text').style.display = type === 'text' ? 'block' : 'none';
  document.getElementById('panel-image').style.display = type === 'image' ? 'block' : 'none';
  document.getElementById('panel-shape').style.display = type === 'shape' ? 'block' : 'none';
  document.getElementById('panel-common').style.display = type === 'placeholder' ? 'none' : 'block';
}

function hidePanel() {
  document.getElementById('panel-empty').style.display = 'flex';
  document.getElementById('panel-placeholder').style.display = 'none';
  document.getElementById('panel-text').style.display = 'none';
  document.getElementById('panel-image').style.display = 'none';
  document.getElementById('panel-shape').style.display = 'none';
  document.getElementById('panel-common').style.display = 'none';
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
  const obj = e.selected?.[0] || CanvasManager.getCanvas().getActiveObject();
  if (!obj || obj.name === '__artboard__') { hidePanel(); return; }
  const type = getObjType(obj);
  showPanel(type);
  syncFromObject(obj, type);
}

function onDeselect() {
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

    // 정렬 버튼
    document.querySelectorAll('.align-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.align === obj.textAlign);
    });
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
  // rgb(r,g,b) 변환
  const m = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
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
  document.getElementById('btn-bring-front').addEventListener('click', () => {
    const obj = getActive();
    if (obj && obj.name !== '__artboard__') { canvas.bringToFront(obj); CanvasManager.saveHistory(); }
  });
  document.getElementById('btn-send-back').addEventListener('click', () => {
    const obj = getActive();
    if (obj && obj.name !== '__artboard__') {
      canvas.sendToBack(obj);
      // 아트보드는 항상 맨 뒤로
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
        // cover + clipPath: 프레임을 꽉 채우고 넘치는 부분 클립
        // 이미지를 드래그하면 프레임 안에서 보이는 영역 조절 가능
        const scale = Math.max(
          placeholder.width / img.width,
          placeholder.height / img.height
        );
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

        // 플레이스홀더 rect + 라벨 텍스트 제거
        canvas.getObjects()
          .filter(o => o._blockKey === placeholder._blockKey && (o._isPlaceholder || o._isPlaceholderLabel))
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
}

window.PanelRight = { init: initPanelRight };
