/**
 * panel-left.js — 좌측 패널
 * - 요소 추가 (이미지, 텍스트, 도형)
 * - 블록 추가
 * - 탭 전환
 */

function initPanelLeft() {
  bindTabButtons();
  bindElementButtons();
  renderBlockList();
  renderThemeList();
}

// ===== 탭 전환 =====
function bindTabButtons() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      document.getElementById('tab-' + this.dataset.tab).classList.add('active');
    });
  });
}

// ===== 요소 추가 버튼 =====
function bindElementButtons() {
  const canvas = CanvasManager.getCanvas();
  const artW = CanvasManager.getArtboardWidth();

  // 현재 뷰포트에서 보이는 아트보드 Y 기준점 계산
  // 캔버스 viewportTransform[5] = canvas Y 이동량 (음수면 아래로 스크롤)
  function getDropY() {
    const zoom = canvas.getZoom();
    const vt = canvas.viewportTransform;
    const canvasEl = canvas.getElement();
    const viewH = canvasEl.height;
    const topInArtboard = (-vt[5]) / zoom;
    const visibleH = viewH / zoom;
    return topInArtboard + visibleH * 0.25;
  }

  // 아트보드 왼쪽에 배치: 오브젝트 너비 고려해 겹치지 않도록
  function getDropX(objWidth) {
    const zoom = canvas.getZoom();
    // 아트보드 left=0 기준, 화면상 60px 왼쪽에 오른쪽 끝이 오도록
    return -60 / zoom - objWidth;
  }

  // 이미지 업로드
  document.getElementById('btn-add-image').addEventListener('click', () => {
    document.getElementById('image-upload').click();
  });
  document.getElementById('image-upload').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target.result, (img) => {
        const maxW = artW * 0.5;
        if (img.width > maxW) img.scaleToWidth(maxW);
        img.set({
          left: getDropX(img.getScaledWidth()),
          top: Math.max(0, getDropY()),
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        CanvasManager.saveHistory();
      });
    };
    reader.readAsDataURL(file);
    this.value = '';
  });

  // 텍스트 추가
  document.getElementById('btn-add-text').addEventListener('click', () => {
    const text = new fabric.IText('텍스트를 입력하세요', {
      left: getDropX(400),
      top: Math.max(0, getDropY()),
      fontFamily: 'Noto Sans KR',
      fontSize: 32,
      fontWeight: '700',
      fill: '#111111',
      textAlign: 'left',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    CanvasManager.saveHistory();
  });

  // 사각형
  document.getElementById('btn-add-rect').addEventListener('click', () => {
    const rect = new fabric.Rect({
      left: getDropX(300),
      top: Math.max(0, getDropY()),
      width: 300,
      height: 160,
      fill: '#e2e8f0',
      stroke: 'transparent',
      strokeWidth: 0,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
    CanvasManager.saveHistory();
  });

  // 원
  document.getElementById('btn-add-circle').addEventListener('click', () => {
    const circle = new fabric.Circle({
      left: getDropX(160),
      top: Math.max(0, getDropY()),
      radius: 80,
      fill: '#e2e8f0',
      stroke: 'transparent',
      strokeWidth: 0,
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
    CanvasManager.saveHistory();
  });

  // 선
  document.getElementById('btn-add-line').addEventListener('click', () => {
    const y = Math.max(0, getDropY());
    const x1 = getDropX(400);
    const x2 = x1 + 400;
    const line = new fabric.Line([x1, y, x2, y], {
      stroke: '#94a3b8',
      strokeWidth: 2,
    });
    canvas.add(line);
    canvas.setActiveObject(line);
    canvas.renderAll();
    CanvasManager.saveHistory();
  });
}

// ===== 블록 목록 렌더링 =====
function renderBlockList() {
  const list = document.getElementById('block-list');
  if (!list || !window.BlockLibrary) return;

  window.BlockLibrary.forEach(block => {
    const item = document.createElement('div');
    item.className = 'block-item';
    item.innerHTML = `
      <div class="block-item-name">${block.name}</div>
      <div class="block-item-desc">${block.desc}</div>
    `;
    item.addEventListener('click', () => {
      window.BlockManager?.addBlock(block.id);
    });
    list.appendChild(item);
  });
}

// ===== 테마 목록 렌더링 =====
function renderThemeList() {
  const list = document.getElementById('theme-list');
  if (!list || !window.Themes) return;

  window.Themes.forEach(theme => {
    const c = theme.colors;
    const item = document.createElement('div');
    item.className = 'theme-item';
    item.dataset.id = theme.id;
    item.innerHTML = `
      <div class="theme-swatch-mini" style="background:${c.bg};border:1px solid ${c.accent}33">
        <div class="theme-swatch-dot" style="background:${c.accent}"></div>
      </div>
      <div class="theme-item-info">
        <div class="theme-item-name">${theme.name}</div>
        <div class="theme-item-desc">${theme.desc}</div>
      </div>
    `;
    item.addEventListener('click', () => {
      document.querySelectorAll('.theme-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      window.ThemeManager.apply(theme.id);
    });
    list.appendChild(item);
  });
}

// ===== 블록 스택 UI 갱신 =====
function refreshBlockStack() {
  const stack = document.getElementById('block-stack');
  if (!stack) return;
  stack.innerHTML = '';

  if (!window.BlockManager?.blocks?.length) {
    stack.innerHTML = '<div style="font-size:11px;color:#9ca3af;padding:4px 2px">블록 없음</div>';
    return;
  }

  window.BlockManager.blocks.forEach((block, idx) => {
    const lib = window.BlockLibrary?.find(b => b.id === block.id);
    const name = lib?.name || block.id;

    const item = document.createElement('div');
    item.className = 'block-stack-item';
    item.innerHTML = `
      <span class="block-stack-name">${name}</span>
      <div class="block-stack-btns">
        <button class="block-stack-btn" title="위로" data-action="up" data-idx="${idx}">↑</button>
        <button class="block-stack-btn" title="아래로" data-action="down" data-idx="${idx}">↓</button>
        <button class="block-stack-btn" title="복제" data-action="dup" data-idx="${idx}">⧉</button>
        <button class="block-stack-btn danger" title="삭제" data-action="del" data-idx="${idx}">✕</button>
      </div>
    `;

    item.querySelectorAll('.block-stack-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const i = parseInt(btn.dataset.idx);
        if (action === 'up') window.BlockManager.moveBlock(i, -1);
        else if (action === 'down') window.BlockManager.moveBlock(i, 1);
        else if (action === 'dup') window.BlockManager.duplicateBlock(i);
        else if (action === 'del') window.BlockManager.removeBlock(i);
        refreshBlockStack();
      });
    });

    stack.appendChild(item);
  });
}

window.PanelLeft = { init: initPanelLeft, refreshBlockStack };
