/**
 * export.js — PNG/JPG 내보내기
 * 출력 영역(아트보드)만 크롭하여 저장
 */

function initExport() {
  // 내보내기 버튼 → 모달 열기
  document.getElementById('btn-export').addEventListener('click', () => {
    document.getElementById('export-modal').style.display = 'flex';
  });

  // 모달 취소
  document.getElementById('btn-export-cancel').addEventListener('click', () => {
    document.getElementById('export-modal').style.display = 'none';
  });

  // 형식 버튼 토글
  document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 내보내기 실행
  document.getElementById('btn-export-confirm').addEventListener('click', () => {
    const filename = document.getElementById('export-filename').value.trim() || '상품페이지';
    const format = document.querySelector('.format-btn.active')?.dataset.format || 'png';
    exportImage(filename, format);
    document.getElementById('export-modal').style.display = 'none';
  });

}

function exportImage(filename, format) {
  const canvas = CanvasManager.getCanvas();
  const artboard = CanvasManager.getArtboard();
  if (!artboard) return;

  // 현재 뷰포트 변환 저장
  const zoom = canvas.getZoom();
  const vpt = [...canvas.viewportTransform];

  // 1:1 스케일로 리셋
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  canvas.setZoom(1);

  const artW = artboard.width;
  const artH = artboard.height;

  const dataURL = canvas.toDataURL({
    format: format === 'jpg' ? 'jpeg' : 'png',
    quality: 1,
    left: artboard.left,
    top: artboard.top,
    width: artW,
    height: artH,
    multiplier: 1,
  });

  // 뷰포트 복구
  canvas.setViewportTransform(vpt);
  canvas.setZoom(zoom);
  canvas.renderAll();

  // 다운로드
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${filename}.${format}`;
  link.click();
}

window.ExportManager = { init: initExport };
