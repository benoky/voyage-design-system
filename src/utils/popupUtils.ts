import { cva } from 'class-variance-authority';

// Default popup dimensions
export const DEFAULT_WIDTH = 400;
export const HEADER_HEIGHT = 40;
export const MIN_HEIGHT = 200;

export const popupVariants = cva('fixed bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden', {
  variants: {
    size: {
      sm: 'w-80 min-h-48',
      md: 'w-96 min-h-56',
      lg: 'w-[500px] min-h-64',
      xl: 'w-[600px] min-h-80',
      auto: 'min-w-64 min-h-48',
    },
    position: {
      center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
    },
  },
  defaultVariants: {
    size: 'md',
    position: 'center',
  },
});

export interface PopupPosition {
  x: number;
  y: number;
}

export interface PopupDimensions {
  width: number;
  height: number;
}

/**
 * Adjusts popup position to keep it within the viewport
 * @param position - Current popup position
 * @param dimensions - Popup dimensions
 * @param viewportWidth - Viewport width
 * @param viewportHeight - Viewport height
 * @param padding - Minimum padding from viewport edges
 * @returns Adjusted position
 */
export function adjustPopupPosition(
  position: PopupPosition,
  dimensions: PopupDimensions,
  viewportWidth: number = window.innerWidth,
  viewportHeight: number = window.innerHeight,
  padding: number = 16
): PopupPosition {
  let { x, y } = position;
  const { width, height } = dimensions;

  // Adjust horizontal position
  if (x + width > viewportWidth - padding) {
    x = viewportWidth - width - padding;
  }
  if (x < padding) {
    x = padding;
  }

  // Adjust vertical position
  if (y + height > viewportHeight - padding) {
    y = viewportHeight - height - padding;
  }
  if (y < padding) {
    y = padding;
  }

  return { x, y };
}
