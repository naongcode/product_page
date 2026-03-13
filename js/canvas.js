/**
 * canvas.js — Fabric.js 캔버스 초기화 및 핵심 제어
 * - 아트보드(출력 영역) 렌더링
 * - 마우스 휠 줌
 * - 실행취소/다시실행 히스토리
 * - 팬(드래그로 캔버스 이동)
 */

const ARTBOARD_WIDTH = 1200;   // 출력 영역 실제 px
const ARTBOARD_COLOR = '#ffffff';

let canvas = null;
let artboard = null;           // 출력 영역 사각형
let currentZoom = 1;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 4;

// 히스토리 (undo/redo)
let history = [];
let historyIndex = -1;
let isUndoRedo = false;

// ===== 초기화 =====
function initCanvas() {
  // 화면 크기에서 패널 너비 제외한 캔버스 영역 계산
  const panelW = 220;
  const toolbarH = 52;
  const availW = window.innerWidth - panelW * 2;
  const availH = window.innerHeight - toolbarH;

  canvas = new fabric.Canvas('main-canvas', {
    width: availW,
    height: availH,
    backgroundColor: null,
    preserveObjectStacking: true,
    selection: true,
  });

  // 아트보드 초기 높이: 기본 블록 없을 때 A4 비슷한 비율
  const initialArtboardHeight = 1600;
  drawArtboard(initialArtboardHeight);

  // 초기 줌: 화면에 맞게 자동 조절
  fitToScreen();

  // 이벤트 등록
  bindCanvasEvents();
  bindKeyboardShortcuts();

  // 초기 히스토리 저장
  saveHistory();

  return canvas;
}

// ===== 아트보드 (출력 영역) 렌더링 =====
function drawArtboard(height) {
  if (artboard) canvas.remove(artboard);

  artboard = new fabric.Rect({
    left: 0,
    top: 0,
    width: ARTBOARD_WIDTH,
    height: height,
    fill: ARTBOARD_COLOR,
    stroke: '#d1d5db',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    excludeFromExport: false,
    name: '__artboard__',
    shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.12)', blur: 24, offsetX: 0, offsetY: 4 }),
  });

  canvas.add(artboard);
  canvas.sendToBack(artboard);
}

function getArtboardHeight() {
  return artboard ? artboard.height : 1600;
}

function setArtboardHeight(h) {
  if (artboard) {
    artboard.set({ height: Math.max(h, 400) });
    canvas.renderAll();
  }
}

// ===== 캔버스를 뷰포트 크기에 맞게 조정 =====
function resizeCanvasToViewport() {
  if (!canvas) return;
  const panelW = 220;
  const toolbarH = 52;
  const availW = window.innerWidth - panelW * 2;
  const availH = window.innerHeight - toolbarH;
  canvas.setWidth(availW);
  canvas.setHeight(availH);
}

// ===== 줌 =====
function setZoom(zoom, point) {
  zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
  currentZoom = zoom;

  if (point) {
    canvas.zoomToPoint(point, zoom);
  } else {
    canvas.setZoom(zoom);
  }

  updateZoomLabel();
}

function fitToScreen() {
  const toolbarH = 52;
  const panelW = 220;
  const availW = window.innerWidth - panelW * 2 - 48;
  const availH = window.innerHeight - toolbarH - 48;

  const artH = getArtboardHeight();
  const zoomX = availW / ARTBOARD_WIDTH;
  const zoomY = availH / artH;
  const zoom = Math.min(zoomX, zoomY, 1);

  canvas.setZoom(zoom);
  currentZoom = zoom;

  // 아트보드를 캔버스 중앙에 위치
  const vpW = canvas.getWidth();
  const vpH = canvas.getHeight();
  const offsetX = (vpW - ARTBOARD_WIDTH * zoom) / 2;
  const offsetY = (vpH - artH * zoom) / 2;
  canvas.absolutePan(new fabric.Point(-offsetX, -offsetY));

  updateZoomLabel();
}

function updateZoomLabel() {
  const label = document.getElementById('zoom-label');
  if (label) label.textContent = Math.round(currentZoom * 100) + '%';
}

// ===== 캔버스 이벤트 =====
function bindCanvasEvents() {
  // 마우스 휠: Ctrl+휠 = 줌 / 휠 단독 = 세로 패닝 / Shift+휠 = 가로 패닝
  canvas.on('mouse:wheel', function (opt) {
    const e = opt.e;
    e.preventDefault();
    e.stopPropagation();

    if (e.ctrlKey) {
      // Ctrl+휠 → 줌 (마우스 위치 기준)
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** e.deltaY;
      const point = new fabric.Point(e.offsetX, e.offsetY);
      setZoom(zoom, point);
    } else if (e.shiftKey) {
      // Shift+휠 → 가로 패닝
      canvas.relativePan(new fabric.Point(-e.deltaY, 0));
    } else {
      // 휠 단독 → 세로 패닝
      canvas.relativePan(new fabric.Point(0, -e.deltaY));
    }
  });

  // 스페이스바 상태 (중간 버튼 mouseup에서도 참조하므로 먼저 선언)
  let isSpaceDown = false;

  // 중간 버튼(휠 클릭) 드래그로 패닝
  let isMidPanning = false;
  let midLastX, midLastY;

  canvas.upperCanvasEl.addEventListener('mousedown', function (e) {
    if (e.button === 1) { // 중간 버튼
      isMidPanning = true;
      midLastX = e.clientX;
      midLastY = e.clientY;
      canvas.defaultCursor = 'grabbing';
      e.preventDefault();
    }
  });

  document.addEventListener('mousemove', function (e) {
    if (!isMidPanning) return;
    canvas.relativePan(new fabric.Point(e.clientX - midLastX, e.clientY - midLastY));
    midLastX = e.clientX;
    midLastY = e.clientY;
  });

  document.addEventListener('mouseup', function (e) {
    if (e.button === 1 && isMidPanning) {
      isMidPanning = false;
      canvas.defaultCursor = isSpaceDown ? 'grab' : 'default';
    }
  });

  // 스페이스바 + 드래그로 캔버스 팬 (피그마/포토샵 방식)
  let isPanning = false;
  let lastPosX, lastPosY;

  // 스페이스바 누름 → 커서를 grab으로 변경
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && !isSpaceDown) {
      const tag = document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      // 텍스트 편집 중이면 무시
      if (canvas.getActiveObject()?.isEditing) return;
      isSpaceDown = true;
      canvas.defaultCursor = 'grab';
      canvas.hoverCursor = 'grab';
      canvas.forEachObject(o => { o.hoverCursor = 'grab'; });
      e.preventDefault(); // 페이지 스크롤 방지
    }
  });

  document.addEventListener('keyup', function (e) {
    if (e.code === 'Space') {
      isSpaceDown = false;
      isPanning = false;
      canvas.defaultCursor = 'default';
      canvas.hoverCursor = 'move';
      canvas.forEachObject(o => { o.hoverCursor = 'move'; });
    }
  });

  canvas.on('mouse:down', function (opt) {
    if (isSpaceDown) {
      isPanning = true;
      canvas.selection = false;
      lastPosX = opt.e.clientX;
      lastPosY = opt.e.clientY;
      canvas.defaultCursor = 'grabbing';
      canvas.hoverCursor = 'grabbing';
      opt.e.preventDefault();
    }
  });

  canvas.on('mouse:move', function (opt) {
    if (!isPanning) return;
    const dx = opt.e.clientX - lastPosX;
    const dy = opt.e.clientY - lastPosY;
    canvas.relativePan(new fabric.Point(dx, dy));
    lastPosX = opt.e.clientX;
    lastPosY = opt.e.clientY;
    canvas.requestRenderAll();
  });

  canvas.on('mouse:up', function () {
    if (!isPanning) return;
    isPanning = false;
    canvas.selection = true;
    // 스페이스 아직 누르고 있으면 grab 유지
    canvas.defaultCursor = isSpaceDown ? 'grab' : 'default';
    canvas.hoverCursor = isSpaceDown ? 'grab' : 'move';
  });

  // 플레이스홀더 더블클릭 → 이미지 업로드 자동 실행
  canvas.on('mouse:dblclick', (opt) => {
    const obj = opt.target;
    if (obj && obj._isPlaceholder) {
      document.getElementById('placeholder-upload')?.click();
    }
  });

  // 오브젝트 변경 시 히스토리 저장
  canvas.on('object:modified', () => { if (!isUndoRedo) saveHistory(); });
  canvas.on('object:added', () => { if (!isUndoRedo) saveHistory(); });
  canvas.on('object:removed', () => { if (!isUndoRedo) saveHistory(); });

  // 윈도우 크기 변경 시 캔버스 재조정
  window.addEventListener('resize', () => {
    resizeCanvasToViewport();
    fitToScreen();
  });
}

// ===== 키보드 단축키 =====
function bindKeyboardShortcuts() {
  document.addEventListener('keydown', function (e) {
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    // 편집 중인 텍스트 오브젝트면 무시
    if (canvas.isDrawingMode) return;

    if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); }
    if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo(); }
    if (e.ctrlKey && e.key === 'c') { copySelected(); }
    if (e.ctrlKey && e.key === 'v') { pasteSelected(); }

    if ((e.key === 'Delete' || e.key === 'Backspace') && !canvas.getActiveObject()?.__isEditing) {
      deleteSelected();
    }
  });
}

// ===== 히스토리 =====
function saveHistory() {
  const json = JSON.stringify(canvas.toJSON(['name', '_blockId', '_blockIndex', '_blockKey', '_isPlaceholder', '_isPlaceholderLabel', '_isSpacer', '_isAccent', '_placeholderIndex', '_placeholderWidth', '_placeholderHeight', 'excludeFromExport']));
  // 현재 위치 이후 히스토리 제거
  history = history.slice(0, historyIndex + 1);
  history.push(json);
  historyIndex = history.length - 1;
  // 최대 50개 유지
  if (history.length > 50) { history.shift(); historyIndex--; }
  updateUndoRedoButtons();
}

function undo() {
  if (historyIndex <= 0) return;
  historyIndex--;
  isUndoRedo = true;
  canvas.loadFromJSON(history[historyIndex], () => {
    canvas.renderAll();
    isUndoRedo = false;
    updateUndoRedoButtons();
    if (window.onCanvasUpdate) window.onCanvasUpdate();
  });
}

function redo() {
  if (historyIndex >= history.length - 1) return;
  historyIndex++;
  isUndoRedo = true;
  canvas.loadFromJSON(history[historyIndex], () => {
    canvas.renderAll();
    isUndoRedo = false;
    updateUndoRedoButtons();
    if (window.onCanvasUpdate) window.onCanvasUpdate();
  });
}

function updateUndoRedoButtons() {
  const btnUndo = document.getElementById('btn-undo');
  const btnRedo = document.getElementById('btn-redo');
  if (btnUndo) btnUndo.disabled = historyIndex <= 0;
  if (btnRedo) btnRedo.disabled = historyIndex >= history.length - 1;
}

// ===== 복사/붙여넣기 =====
let clipboard = null;

function copySelected() {
  const obj = canvas.getActiveObject();
  if (!obj) return;
  obj.clone((cloned) => { clipboard = cloned; });
}

function pasteSelected() {
  if (!clipboard) return;
  clipboard.clone((cloned) => {
    canvas.discardActiveObject();
    cloned.set({ left: cloned.left + 20, top: cloned.top + 20, evented: true });
    if (cloned.type === 'activeSelection') {
      cloned.canvas = canvas;
      cloned.forEachObject((obj) => canvas.add(obj));
      cloned.setCoords();
    } else {
      canvas.add(cloned);
    }
    clipboard = cloned;
    canvas.setActiveObject(cloned);
    canvas.requestRenderAll();
  });
}

// ===== 삭제 =====
function deleteSelected() {
  const obj = canvas.getActiveObject();
  if (!obj) return;
  if (obj.name === '__artboard__') return;
  if (obj.type === 'activeSelection') {
    obj.forEachObject((o) => {
      if (o.name !== '__artboard__') canvas.remove(o);
    });
    canvas.discardActiveObject();
  } else {
    canvas.remove(obj);
  }
  canvas.requestRenderAll();
}

// ===== 줌 버튼 =====
function bindZoomButtons() {
  document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
    setZoom(currentZoom * 1.2);
  });
  document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
    setZoom(currentZoom / 1.2);
  });
  document.getElementById('btn-zoom-fit')?.addEventListener('click', fitToScreen);
}

// ===== 프로젝트 로드용 loadFromJSON 래퍼 (히스토리/자동저장 억제) =====
function loadJSON(json, callback) {
  isUndoRedo = true; // object:added/removed 이벤트 중 saveHistory 억제
  canvas.loadFromJSON(json, () => {
    canvas.renderAll();
    isUndoRedo = false;
    // 로드 완료 후 히스토리 초기화 (이전 blank 상태 제거)
    history = [];
    historyIndex = -1;
    saveHistory();
    updateUndoRedoButtons();
    if (callback) callback();
  });
}

// ===== 공개 API =====
window.CanvasManager = {
  init: initCanvas,
  getCanvas: () => canvas,
  getArtboard: () => artboard,
  getArtboardWidth: () => ARTBOARD_WIDTH,
  getArtboardHeight,
  setArtboardHeight,
  drawArtboard,
  fitToScreen,
  setZoom,
  saveHistory,
  loadJSON,
  undo,
  redo,
  deleteSelected,
  copySelected,
  pasteSelected,
  bindZoomButtons,
};
