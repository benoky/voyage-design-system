import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-[#0f172a] text-white border-transparent',
        secondary: 'bg-[#f1f5f9] text-[#0f172a] border-transparent',
        success: 'bg-[#22c55e] text-white border-transparent',
        warning: 'bg-[#eab308] text-white border-transparent',
        error: 'bg-[#ef4444] text-white border-transparent',
        info: 'bg-[#3b82f6] text-white border-transparent',
        outline: 'bg-transparent text-[#0f172a] border border-[#cbd5e1]',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 h-5 rounded-full',
        default: 'text-sm px-2.5 py-0.5 h-6 rounded-full',
        lg: 'text-base px-3 py-1 h-7 rounded-[6px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /**
   * Icon displayed before the badge text
   */
  icon?: React.ReactNode;
  /**
   * Icon displayed after the badge text
   */
  endIcon?: React.ReactNode;
  /**
   * Whether to display as a dot-style badge
   */
  dot?: boolean;
  /**
   * Number count to display
   */
  count?: number;
  /**
   * Maximum number to display (shows '99+' format when count exceeds this value)
   */
  max?: number;
}

/**
 * Badge component
 * A small label component for displaying status, notifications, categories, etc.
 *
 * @param variant - Badge style variant
 * @param size - Badge size
 * @param icon - Icon displayed before the badge text
 * @param endIcon - Icon displayed after the badge text
 * @param dot - Whether to display as a dot-style badge
 * @param count - Number count to display
 * @param max - Maximum number to display
 * @param className - Additional CSS classes
 * @param children - Badge content
 * @returns Badge component
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, endIcon, dot, count, max = 99, children, ...props }, ref) => {
    // Dot mode
    if (dot) {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-block w-2 h-2 rounded-full',
            variant === 'success' && 'bg-[#22c55e]',
            variant === 'warning' && 'bg-[#eab308]',
            variant === 'error' && 'bg-[#ef4444]',
            variant === 'info' && 'bg-[#3b82f6]',
            (!variant || variant === 'default') && 'bg-[#0f172a]',
            variant === 'secondary' && 'bg-[#64748b]',
            variant === 'outline' && 'bg-transparent border border-[#cbd5e1]',
            className
          )}
          {...props}
        />
      );
    }

    // Count mode
    if (typeof count === 'number') {
      const displayCount = count > max ? `${max}+` : count.toString();

      return (
        <span ref={ref} className={cn(badgeVariants({ variant, size }), 'min-w-[1.25rem] px-1', className)} {...props}>
          {displayCount}
        </span>
      );
    }

    // Regular text badge
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {icon && <span className='mr-1 flex-shrink-0'>{icon}</span>}
        {children}
        {endIcon && <span className='ml-1 flex-shrink-0'>{endIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
