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
}

/**
 * ContextMenu component
 * Displays a dropdown menu or context menu.
 *
 * @param open - Whether the menu is open
 * @param title - Menu title (optional)
 * @param items - Menu items array or array of menu item arrays (separated by dividers)
 * @param variant - Menu style variant
 * @param position - Menu position
 * @param className - Additional CSS classes
 * @returns ContextMenu component
 */
const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, variant, position, open, title, items, ...props }, ref) => {
    if (!open) return null;

    // Check if items is a 2D array
    const isItemsNested = Array.isArray(items[0]);

    // Convert to 1D array
    const sections = isItemsNested ? (items as MenuItem[][]) : [items as MenuItem[]];

    return (
      <div ref={ref} className={cn(contextMenuVariants({ variant, position }), className)} {...props}>
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
    );
  }
);

ContextMenu.displayName = 'ContextMenu';

export { ContextMenu };
