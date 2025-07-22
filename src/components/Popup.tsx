import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';
import { Portal } from './Portal';
import {
  popupVariants,
  adjustPopupPosition,
  DEFAULT_WIDTH,
  HEADER_HEIGHT,
  MIN_HEIGHT,
  type PopupPosition,
  type PopupDimensions,
} from '@/utils/popupUtils';

// Updated popup variants for inline positioning
const internalPopupVariants = cva('bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden', {
  variants: {
    positioning: {
      fixed: 'fixed',
      absolute: 'absolute',
      relative: 'relative',
    },
    size: {
      sm: 'w-80 min-h-48',
      md: 'w-96 min-h-56',
      lg: 'w-[500px] min-h-64',
      xl: 'w-[600px] min-h-80',
      auto: 'min-w-64 min-h-48',
    },
  },
  defaultVariants: {
    positioning: 'fixed',
    size: 'md',
  },
});

interface MinDimensions {
  width: number;
  height: number;
}

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof popupVariants> {
  /**
   * Whether the popup is open
   */
  open: boolean;
  /**
   * Function to close the popup
   */
  onClose?: () => void;
  /**
   * Popup title
   */
  title?: string;
  /**
   * Initial popup position
   */
  initialPosition?: PopupPosition;
  /**
   * Whether the popup can be dragged
   */
  draggable?: boolean;
  /**
   * Whether the popup can be resized
   */
  resizable?: boolean;
  /**
   * Minimum dimensions when resizing
   */
  minDimensions?: MinDimensions;
  /**
   * Popup positioning type
   */
  positioning?: 'fixed' | 'absolute' | 'inline';
  /**
   * Drag event handler
   */
  onMove?: (position: PopupPosition) => void;
  /**
   * Resize event handler
   */
  onResize?: (dimensions: PopupDimensions) => void;
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking outside closes popup
   */
  closeOnOutsideClick?: boolean;
  /**
   * Whether ESC key closes popup
   */
  closeOnEscape?: boolean;
  /**
   * Header CSS class name
   */
  headerClassName?: string;
  /**
   * Content CSS class name
   */
  contentClassName?: string;
}

/**
 * Popup component
 * A draggable and resizable popup window that can be positioned anywhere on the screen.
 *
 * @param open - Whether the popup is open
 * @param onClose - Function to close the popup
 * @param title - Popup title
 * @param initialPosition - Initial popup position
 * @param draggable - Whether the popup can be dragged
 * @param resizable - Whether the popup can be resized
 * @param minDimensions - Minimum dimensions when resizing
 * @param positioning - Popup positioning type
 * @param onMove - Drag event handler
 * @param onResize - Resize event handler
 * @param showCloseButton - Whether to show close button
 * @param closeOnOutsideClick - Whether clicking outside closes popup
 * @param closeOnEscape - Whether ESC key closes popup
 * @param className - Additional CSS classes
 * @param headerClassName - Header CSS class name
 * @param contentClassName - Content CSS class name
 * @param children - Popup content
 * @returns Popup component
 */
const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      open,
      onClose,
      title,
      initialPosition = { x: 100, y: 100 },
      draggable = true,
      resizable = true,
      minDimensions = { width: 300, height: 200 },
      positioning = 'fixed',
      onMove,
      onResize,
      showCloseButton = true,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      className,
      headerClassName,
      contentClassName,
      children,
      ...props
    },
    ref
  ) => {
    const popupRef = React.useRef<HTMLDivElement>(null);
    const currentPositionRef = React.useRef<PopupPosition>(initialPosition);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState(false);
    const [dragOffset, setDragOffset] = React.useState<PopupPosition>({ x: 0, y: 0 });

    // Update position when dragging
    const updatePosition = React.useCallback(
      (newPosition: PopupPosition) => {
        if (!popupRef.current) return;

        // Adjust position to keep popup within viewport
        if (typeof window !== 'undefined' && popupRef.current) {
          const rect = popupRef.current.getBoundingClientRect();
          const adjustedPosition = adjustPopupPosition(newPosition, { width: rect.width, height: rect.height });
          currentPositionRef.current = adjustedPosition;

          popupRef.current.style.left = `${adjustedPosition.x}px`;
          popupRef.current.style.top = `${adjustedPosition.y}px`;

          onMove?.(adjustedPosition);
        }
      },
      [onMove]
    );

    // Handle dragging
    React.useEffect(() => {
      if (!open || positioning === 'inline' || !draggable || !popupRef.current || typeof window === 'undefined') return;

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && popupRef.current) {
          const rect = popupRef.current.getBoundingClientRect();
          const newPosition = adjustPopupPosition(
            { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y },
            { width: rect.width, height: rect.height }
          );
          updatePosition(newPosition);
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        if (!isResizing) {
          document.body.style.cursor = 'default';
        }
      };

      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'move';
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        if (!isResizing) {
          document.body.style.cursor = 'default';
        }
      };
    }, [isDragging, draggable, dragOffset, updatePosition, isResizing, open, positioning]);

    // Handle resizing
    React.useEffect(() => {
      if (!open || positioning === 'inline' || !resizable || !popupRef.current || typeof window === 'undefined') return;

      const handleMouseMove = (e: MouseEvent) => {
        if (isResizing && popupRef.current) {
          const rect = popupRef.current.getBoundingClientRect();
          const newWidth = Math.max(e.clientX - rect.left, minDimensions.width);
          const newHeight = Math.max(e.clientY - rect.top, minDimensions.height);

          popupRef.current.style.width = `${newWidth}px`;
          popupRef.current.style.height = `${newHeight}px`;

          onResize?.({ width: newWidth, height: newHeight });
        }
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        if (!isDragging) {
          document.body.style.cursor = 'default';
        }
      };

      if (isResizing) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'nw-resize';
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        if (!isDragging) {
          document.body.style.cursor = 'default';
        }
      };
    }, [isResizing, resizable, onResize, minDimensions, isDragging, open, positioning]);

    // Handle drag start
    const handleMouseDown = (e: React.MouseEvent) => {
      if (!draggable || positioning === 'inline') return;

      const rect = popupRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setIsDragging(true);
      }
    };

    // Handle resize start
    const handleResizeMouseDown = (e: React.MouseEvent) => {
      if (!resizable || positioning === 'inline') return;
      e.stopPropagation();
      setIsResizing(true);
    };

    // ESC key handler
    React.useEffect(() => {
      if (!open || !closeOnEscape || typeof window === 'undefined') return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Click outside handler
    React.useEffect(() => {
      if (!open || !closeOnOutsideClick || positioning === 'inline') return;

      const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node) && onClose) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, closeOnOutsideClick, onClose, positioning]);

    // Initialize position
    React.useEffect(() => {
      if (open && popupRef.current && positioning !== 'inline') {
        updatePosition(initialPosition);
      }
    }, [open, initialPosition, updatePosition, positioning]);

    if (!open) return null;

    const popupContent = (
      <div
        ref={node => {
          // Set ref
          if (popupRef && 'current' in popupRef) {
            (popupRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }

          // Forward original ref
          const originalRef = ref as any;
          if (originalRef) {
            if (typeof originalRef === 'function') {
              originalRef(node);
            } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
              (originalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
          }
        }}
        className={cn(
          internalPopupVariants({
            positioning: positioning === 'inline' ? 'relative' : (positioning as 'fixed' | 'absolute'),
          }),
          className
        )}
        style={{
          ...(positioning !== 'inline' && {
            left: currentPositionRef.current.x,
            top: currentPositionRef.current.y,
            minWidth: minDimensions.width,
            minHeight: minDimensions.height,
          }),
        }}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={cn(
              'flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50',
              draggable && positioning !== 'inline' && 'cursor-move',
              headerClassName
            )}
            onMouseDown={handleMouseDown}
          >
            {title && <h3 className='text-lg font-semibold text-gray-900 select-none'>{title}</h3>}
            {showCloseButton && onClose && (
              <button
                onClick={onClose}
                className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                aria-label='Close popup'
              >
                <svg
                  className='h-4 w-4'
                  fill='none'
                  height='24'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <path d='m18 6-12 12' />
                  <path d='m6 6 12 12' />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn('p-4 flex-1', contentClassName)}>{children}</div>

        {/* Resize handle */}
        {resizable && positioning !== 'inline' && (
          <div
            className='absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize opacity-50 hover:opacity-100'
            onMouseDown={handleResizeMouseDown}
          >
            <svg className='w-full h-full' viewBox='0 0 16 16' fill='currentColor'>
              <path d='M16 0v16h-16l16-16z' />
              <path d='M11 5v6h-6l6-6z' opacity='0.5' />
              <path d='M7 9v2h-2l2-2z' opacity='0.7' />
            </svg>
          </div>
        )}
      </div>
    );

    if (positioning === 'inline') {
      return popupContent;
    }

    return <Portal>{popupContent}</Portal>;
  }
);

Popup.displayName = 'Popup';

export { Popup };
