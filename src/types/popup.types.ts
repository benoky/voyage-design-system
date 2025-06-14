import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import { popupVariants } from '../utils/popupUtils';

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof popupVariants> {
  open: boolean;
  title?: string;
  onClose?: () => void;
  resizable?: boolean;
  initialWidth?: number;
  initialHeight?: number;
  onResize?: (width: number, height: number) => void;
  draggable?: boolean;
  onMove?: (x: number, y: number) => void;
  initialX?: number;
  initialY?: number;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}
