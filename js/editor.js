/**
 * editor.js — 에디터 진입점
 * 모든 모듈 초기화 및 글로벌 이벤트 연결
 */

let currentProjectId = null;

document.addEventListener('DOMContentLoaded', () => {
  // 1. 캔버스 초기화
  CanvasManager.init();
  CanvasManager.bindZoomButtons();

  // 2. 패널 초기화
  PanelRight.init();
  PanelLeft.init();

  // 3. 내보내기 초기화
  ExportManager.init();

  // 4. 툴바 버튼 연결
  document.getElementById('btn-undo').addEventListener('click', CanvasManager.undo);
  document.getElementById('btn-redo').addEventListener('click', CanvasManager.redo);
  document.getElementById('btn-back').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // 전체 텍스트 크기 조절
  document.getElementById('btn-text-larger').addEventListener('click', () => adjustAllTextSize(4));
  document.getElementById('btn-text-smaller').addEventListener('click', () => adjustAllTextSize(-4));

  // 5. 자동저장 이벤트 연결
  initAutoSave();

  // 6. URL 파라미터 처리
  const params = new URLSearchParams(window.location.search);
  const templateId = params.get('template');
  const themeId = params.get('theme');
  const projectId = params.get('project');

  if (projectId) {
    // 기존 프로젝트 열기
    currentProjectId = projectId;
    loadProject(projectId);
  } else if (templateId && window.Templates) {
    // 템플릿으로 새 프로젝트 시작
    currentProjectId = ProjectDB.newId();
    const tpl = window.Templates.find(t => t.id === templateId);
    if (tpl) {
      document.getElementById('project-name').textContent = tpl.name;
      BlockManager.loadTemplate(tpl.blocks, themeId || tpl.defaultTheme, tpl.content || {});
      CanvasManager.fitToScreen();
      // 즉시 저장 (나가도 목록에 나타나게)
      setTimeout(saveProject, 300);
    }
  } else if (params.get('new')) {
    // 빈 캔버스로 새 프로젝트 시작
    currentProjectId = ProjectDB.newId();
    BlockManager.addBlock('b01-main-banner');
    CanvasManager.fitToScreen();
    setTimeout(saveProject, 300);
  }

  // 7. 저장 버튼 + Ctrl+S
  document.getElementById('btn-save').addEventListener('click', saveProject);
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveProject();
    }
  });

  // 8. 초기화 버튼
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (!confirm('캔버스를 모두 지우고 처음 상태로 초기화할까요?')) return;

    const canvas = CanvasManager.getCanvas();
    const artboard = CanvasManager.getArtboard();

    canvas.getObjects().filter(o => o !== artboard).forEach(o => canvas.remove(o));
    BlockManager.reset();
    CanvasManager.setArtboardHeight(1600);
    CanvasManager.drawArtboard(1600);
    canvas.discardActiveObject();
    canvas.renderAll();
    CanvasManager.saveHistory();

    if (window.PanelLeft?.refreshBlockStack) window.PanelLeft.refreshBlockStack();
    CanvasManager.fitToScreen();
  });
});

// ===== 자동 저장 =====
let autoSaveTimer = null;

function initAutoSave() {
  const canvas = CanvasManager.getCanvas();
  canvas.on('object:modified', scheduleAutoSave);
  canvas.on('object:added', scheduleAutoSave);
  canvas.on('object:removed', scheduleAutoSave);

  canvas.on('selection:created', updateTextSizeDisplay);
  canvas.on('selection:updated', updateTextSizeDisplay);
  canvas.on('selection:cleared', updateTextSizeDisplay);

  // project-name 변경 시 저장
  const nameEl = document.getElementById('project-name');
  nameEl.addEventListener('input', scheduleAutoSave);
}

function scheduleAutoSave() {
  if (_isLoadingProject) return; // 프로젝트 로드 중에는 자동저장 억제
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(saveProject, 2000);
}

// ===== 프로젝트 저장 =====
function saveProject() {
  if (!currentProjectId) return;
  const canvas = CanvasManager.getCanvas();

  // 사용자가 업로드한 이미지가 있으면 썸네일로 사용, 없으면 null (테마 배경색)
  let thumbnail = null;
  const imgObjs = canvas.getObjects().filter(o => o.type === 'image' && !o._isPlaceholder);
  if (imgObjs.length > 0) {
    try {
      const el = imgObjs[0].getElement();
      const TW = 320, scale = Math.min(1, TW / (el.naturalWidth || TW));
      const tw = Math.max(1, Math.round((el.naturalWidth || TW) * scale));
      const th = Math.max(1, Math.round((el.naturalHeight || TW) * scale));
      const tmp = document.createElement('canvas');
      tmp.width = tw; tmp.height = th;
      tmp.getContext('2d').drawImage(el, 0, 0, tw, th);
      thumbnail = tmp.toDataURL('image/jpeg', 0.8);
    } catch(e) {}
  }

  const data = {
    id: currentProjectId,
    name: document.getElementById('project-name').textContent.trim() || '새 프로젝트',
    canvas: canvas.toJSON(['name', '_blockId', '_blockKey', '_isHeading', '_isAccent', '_isPlaceholder', '_isPlaceholderLabel', '_isSpacer', 'excludeFromExport']),
    blocks: BlockManager.blocks,
    themeId: ThemeManager.getCurrent()?.id || '',
    artboardHeight: CanvasManager.getArtboardHeight(),
    savedAt: Date.now(),
    thumbnail,
  };

  setSaveStatus('saving');
  ProjectDB.save(data)
    .then(() => setSaveStatus('saved'))
    .catch(e => { console.warn('저장 실패:', e); setSaveStatus('error'); });
}

let _saveStatusTimer = null;
function setSaveStatus(state) {
  const el = document.getElementById('save-status');
  if (!el) return;
  clearTimeout(_saveStatusTimer);
  if (state === 'saving') {
    el.textContent = '저장 중...';
    el.className = 'save-status saving';
  } else if (state === 'saved') {
    el.textContent = '저장됨';
    el.className = 'save-status saved';
    _saveStatusTimer = setTimeout(() => { el.textContent = ''; el.className = 'save-status'; }, 2500);
  } else {
    el.textContent = '저장 실패';
    el.className = 'save-status error';
    _saveStatusTimer = setTimeout(() => { el.textContent = ''; el.className = 'save-status'; }, 3000);
  }
}

// ===== 프로젝트 불러오기 =====
let _isLoadingProject = false;

function loadProject(id) {
  ProjectDB.get(id).then(data => {
    if (!data) return;
    if (data.name) {
      document.getElementById('project-name').textContent = data.name;
    }
    if (data.canvas) {
      _isLoadingProject = true; // 로드 중 자동저장 억제
      CanvasManager.loadJSON(data.canvas, () => {
        if (data.artboardHeight) CanvasManager.setArtboardHeight(data.artboardHeight);
        if (data.blocks) {
          BlockManager.blocks = data.blocks;
          if (window.PanelLeft?.refreshBlockStack) window.PanelLeft.refreshBlockStack();
        }
        CanvasManager.fitToScreen();
        _isLoadingProject = false;
      });
    }
  }).catch(e => console.warn('불러오기 실패:', e));
}

// ===== 전체 텍스트 크기 일괄 조절 =====
function adjustAllTextSize(delta) {
  const canvas = CanvasManager.getCanvas();
  canvas.getObjects().filter(o =>
    o.type === 'i-text' || o.type === 'text' || o.type === 'textbox'
  ).forEach(obj => {
    obj.set('fontSize', Math.max(8, (obj.fontSize || 18) + delta));
  });
  canvas.renderAll();
  CanvasManager.saveHistory();
  updateTextSizeDisplay();
}

function updateTextSizeDisplay() {
  const canvas = CanvasManager.getCanvas();
  const el = document.getElementById('text-size-val');
  if (!el) return;
  const active = canvas.getActiveObject();
  if (active && (active.type === 'i-text' || active.type === 'text' || active.type === 'textbox')) {
    el.textContent = active.fontSize + 'px';
  } else {
    const textObjs = canvas.getObjects().filter(o =>
      o.type === 'i-text' || o.type === 'text' || o.type === 'textbox'
    );
    if (!textObjs.length) { el.textContent = '—'; return; }
    const avg = Math.round(textObjs.reduce((s, o) => s + o.fontSize, 0) / textObjs.length);
    el.textContent = avg + 'px';
  }
}

window.onCanvasUpdate = function () {
  const canvas = CanvasManager.getCanvas();
  updateTextSizeDisplay();
  const obj = canvas.getActiveObject();
  if (obj) {
    canvas.fire('selection:created', { selected: [obj] });
  }
};
