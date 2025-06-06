import { cva } from 'class-variance-authority';

// 기본 너비 상수 정의
export const DEFAULT_WIDTH = 424;
// 헤더 높이 상수 정의 (헤더가 보이는 최소 높이)
export const HEADER_HEIGHT = 60;
// 최소 높이 상수 정의 (최소 높이 제약)
export const MIN_HEIGHT = 100;

// UI 디자인 기준 스타일링
export const popupVariants = cva('bg-white rounded-[8px] shadow-[0px_0px_25px_rgba(0,0,0,0.25)]', {
  variants: { position: { absolute: 'absolute', fixed: 'fixed', inline: 'relative' } },
  defaultVariants: { position: 'absolute' },
});

/**
 * 팝업 위치를 화면 내로 조정하는 함수
 * @param x - X 좌표
 * @param y - Y 좌표
 * @param width - 팝업 너비
 * @param height - 팝업 높이
 * @returns 조정된 X, Y 좌표
 */
export const adjustPopupPosition = (x: number, y: number, width: number, _height: number) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // 헤더가 보이도록 최소 HEADER_HEIGHT만큼은 화면 내에 유지
  let newX = x;
  let newY = y;

  // 오른쪽 경계 처리 - 최소 기본 너비만큼은 항상 화면에 표시
  if (x + width > viewportWidth) {
    newX = Math.max(0, viewportWidth - width);
  }

  // 아래쪽 경계 처리 - 헤더 높이만큼은 항상 화면에 표시
  if (y + HEADER_HEIGHT > viewportHeight) {
    newY = Math.max(0, viewportHeight - HEADER_HEIGHT);
  }

  // 왼쪽과 위쪽 경계 처리
  newX = Math.max(0, newX);
  newY = Math.max(0, newY);

  return { x: newX, y: newY };
};
