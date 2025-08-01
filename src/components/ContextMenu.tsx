import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const contextMenuVariants = cva(
  'min-w-[160px] overflow-hidden rounded-md border bg-white p-1 text-slate-900 shadow-md',
  {
    variants: {
      variant: {
        default: 'bg-white border-slate-200',
        dark: 'bg-slate-800 border-slate-700 text-slate-100',
      },
      position: {
        auto: '',
        top: 'origin-top',
        bottom: 'origin-bottom',
        left: 'origin-left',
        right: 'origin-right',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'auto',
    },
  }
);

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ContextMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contextMenuVariants> {
  /**
   * Whether the menu is open
   */
  open: boolean;
  /**
   * Menu title (optional)
   */
  title?: string;
  /**
   * Menu items array or array of menu item arrays (separated by dividers)
   */
  items: MenuItem[] | MenuItem[][];
  /**
   * Trigger element that opens the context menu
   */
  children: React.ReactElement;
  /**
   * Context menu position relative to trigger
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Offset from trigger element
   */
  offset?: number;
}

/**
 * ContextMenu component
 * Displays a dropdown menu or context menu.
 *
 * @param open - Whether the menu is open
 * @param title - Menu title (optional)
 * @param items - Menu items array or array of menu item arrays (separated by dividers)
 * @param children - Trigger element
 * @param position - Menu position relative to trigger
 * @param offset - Distance from trigger element
 * @param variant - Menu style variant
 * @param className - Additional CSS classes
 * @returns ContextMenu component
 */
const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  (
    {
      className,
      variant,
      position: menuPosition,
      open,
      title,
      items,
      children,
      position = 'bottom',
      offset = 8,
      ...props
    },
    ref
  ) => {
    const [contextMenuStyle, setContextMenuStyle] = React.useState<React.CSSProperties>({
      position: 'fixed',
      left: 0,
      top: 0,
      transform: 'translate(-50%, 0)',
      zIndex: 50,
      visibility: 'hidden',
    });
    const triggerRef = React.useRef<HTMLElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const isFirstRender = React.useRef(true);

    // Calculate context menu position
    const calculatePosition = React.useCallback(() => {
      if (!triggerRef.current || !menuRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();

      let left = 0;
      let top = 0;
      let transform = '';

      switch (position) {
        case 'top':
          left = triggerRect.left + triggerRect.width / 2;
          top = triggerRect.top - offset;
          transform = 'translate(-50%, -100%)';
          break;
        case 'bottom':
          left = triggerRect.left + triggerRect.width / 2;
          top = triggerRect.bottom + offset;
          transform = 'translate(-50%, 0)';
          break;
        case 'left':
          left = triggerRect.left - offset;
          top = triggerRect.top + triggerRect.height / 2;
          transform = 'translate(-100%, -50%)';
          break;
        case 'right':
          left = triggerRect.right + offset;
          top = triggerRect.top + triggerRect.height / 2;
          transform = 'translate(0, -50%)';
          break;
      }

      // Viewport area check
      const padding = 8;
      const maxLeft = window.innerWidth - menuRect.width - padding;
      const maxTop = window.innerHeight - menuRect.height - padding;

      left = Math.max(padding, Math.min(left, maxLeft));
      top = Math.max(padding, Math.min(top, maxTop));

      setContextMenuStyle({
        position: 'fixed',
        left,
        top,
        transform,
        zIndex: 50,
        visibility: 'visible',
      });
    }, [position, offset]);

    // Update position when menu opens
    React.useEffect(() => {
      if (open) {
        if (isFirstRender.current) {
          calculatePosition();
          isFirstRender.current = false;
        } else {
          const timer = setTimeout(() => {
            calculatePosition();
          }, 10);

          return () => clearTimeout(timer);
        }
      }
    }, [open, calculatePosition]);

    // Recalculate on scroll/resize
    React.useEffect(() => {
      if (open) {
        const handleReposition = () => {
          const timer = setTimeout(() => {
            calculatePosition();
          }, 16);

          return () => clearTimeout(timer);
        };

        window.addEventListener('scroll', handleReposition, { passive: true });
        window.addEventListener('resize', handleReposition, { passive: true });

        return () => {
          window.removeEventListener('scroll', handleReposition);
          window.removeEventListener('resize', handleReposition);
        };
      }
    }, [open, calculatePosition]);

    // Clone child element with ref
    const childElement = React.cloneElement(children, {
      ref: (node: HTMLElement | null) => {
        if (triggerRef && 'current' in triggerRef) {
          (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }

        const originalRef = (children as any).ref;
        if (originalRef) {
          if (typeof originalRef === 'function') {
            originalRef(node);
          } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
            (originalRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }
      },
    });

    // Check if items is a 2D array
    const isItemsNested = Array.isArray(items[0]);

    // Convert to 1D array
    const sections = isItemsNested ? (items as MenuItem[][]) : [items as MenuItem[]];

    return (
      <>
        {childElement}

        {/* Context Menu */}
        <div
          ref={menuRef}
          className={cn(contextMenuVariants({ variant, position: menuPosition }), className)}
          style={{
            ...contextMenuStyle,
            visibility: open ? 'visible' : 'hidden',
          }}
          {...props}
        >
          {title && (
            <>
              <div className='px-2 py-1.5 text-sm font-semibold text-slate-600'>{title}</div>
              <div className='h-px bg-slate-200 my-1' />
            </>
          )}

          {sections.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {section.map(item => (
                <button
                  key={item.key}
                  className={cn(
                    'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                    'hover:bg-slate-100 focus:bg-slate-100',
                    item.disabled && 'pointer-events-none opacity-50'
                  )}
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.icon && <span className='mr-2 h-4 w-4'>{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              ))}
              {sectionIndex < sections.length - 1 && <div className='h-px bg-slate-200 my-1' />}
            </React.Fragment>
          ))}
        </div>
      </>
    );
  }
);

ContextMenu.displayName = 'ContextMenu';

export { ContextMenu };
