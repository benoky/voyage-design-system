import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';
import { Portal } from './Portal';

const tooltipVariants = cva(
  'z-50 overflow-hidden rounded-[6px] bg-[#1e293b] px-3 py-1.5 text-xs text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  {
    variants: {
      variant: {
        default: 'bg-[#1e293b] text-white',
        secondary: 'bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]',
        success: 'bg-[#22c55e] text-white',
        warning: 'bg-[#eab308] text-white',
        error: 'bg-[#ef4444] text-white',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1.5 text-xs',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof tooltipVariants> {
  /**
   * Tooltip content
   */
  content: React.ReactNode;
  /**
   * Child element that triggers the tooltip
   */
  children: React.ReactElement;
  /**
   * Tooltip position
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Trigger method
   */
  trigger?: 'hover' | 'click' | 'focus';
  /**
   * Tooltip open state (controlled)
   */
  open?: boolean;
  /**
   * Tooltip open state change handler
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Delay before showing tooltip (ms)
   */
  delayDuration?: number;
  /**
   * Whether to show arrow
   */
  showArrow?: boolean;
  /**
   * Offset from trigger element
   */
  offset?: number;
  /**
   * Whether the tooltip is disabled
   */
  disabled?: boolean;
}

/**
 * Tooltip component
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 *
 * @param content - Tooltip content
 * @param children - Child element that triggers the tooltip
 * @param position - Tooltip position relative to trigger
 * @param trigger - How the tooltip is triggered
 * @param open - Controlled open state
 * @param onOpenChange - Open state change handler
 * @param delayDuration - Delay before showing tooltip
 * @param showArrow - Whether to show arrow pointing to trigger
 * @param offset - Distance from trigger element
 * @param disabled - Whether the tooltip is disabled
 * @param variant - Tooltip style variant
 * @param size - Tooltip size
 * @param className - Additional CSS classes
 * @returns Tooltip component
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = 'top',
      trigger = 'hover',
      open: controlledOpen,
      onOpenChange,
      delayDuration = 500,
      showArrow = true,
      offset = 8,
      disabled = false,
      variant,
      size,
      className,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const triggerRef = React.useRef<HTMLElement>(null);
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout>();

    // Determine if tooltip is controlled or uncontrolled
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Update open state
    const updateOpen = React.useCallback(
      (newOpen: boolean) => {
        if (disabled) return;

        if (isControlled) {
          onOpenChange?.(newOpen);
        } else {
          setInternalOpen(newOpen);
          onOpenChange?.(newOpen);
        }
      },
      [disabled, isControlled, onOpenChange]
    );

    // Calculate tooltip position
    const calculatePosition = React.useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollX = window.pageXOffset;
      const scrollY = window.pageYOffset;

      let x = 0;
      let y = 0;

      switch (position) {
        case 'top':
          x = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.top + scrollY - tooltipRect.height - offset;
          break;
        case 'bottom':
          x = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.bottom + scrollY + offset;
          break;
        case 'left':
          x = triggerRect.left + scrollX - tooltipRect.width - offset;
          y = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
        case 'right':
          x = triggerRect.right + scrollX + offset;
          y = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
      }

      // Keep tooltip within viewport
      const padding = 8;
      x = Math.max(padding + scrollX, Math.min(x, window.innerWidth - tooltipRect.width - padding + scrollX));
      y = Math.max(padding + scrollY, Math.min(y, window.innerHeight - tooltipRect.height - padding + scrollY));

      setTooltipPosition({ x, y });
    }, [position, offset]);

    // Show tooltip with delay
    const showTooltip = React.useCallback(() => {
      if (disabled) return;

      if (delayDuration > 0) {
        timeoutRef.current = setTimeout(() => {
          updateOpen(true);
        }, delayDuration);
      } else {
        updateOpen(true);
      }
    }, [disabled, delayDuration, updateOpen]);

    // Hide tooltip immediately
    const hideTooltip = React.useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      updateOpen(false);
    }, [updateOpen]);

    // Toggle tooltip
    const toggleTooltip = () => {
      if (isOpen) {
        hideTooltip();
      } else {
        showTooltip();
      }
    };

    // Event handlers
    const handleMouseEnter = () => {
      if (trigger === 'hover') showTooltip();
    };

    const handleMouseLeave = () => {
      if (trigger === 'hover') hideTooltip();
    };

    const handleClick = () => {
      if (trigger === 'click') toggleTooltip();
    };

    const handleFocus = () => {
      if (trigger === 'focus') showTooltip();
    };

    const handleBlur = () => {
      if (trigger === 'focus') hideTooltip();
    };

    // Update position when tooltip opens
    React.useEffect(() => {
      if (isOpen) {
        calculatePosition();

        // Recalculate on scroll/resize
        const handleReposition = () => calculatePosition();
        window.addEventListener('scroll', handleReposition);
        window.addEventListener('resize', handleReposition);

        return () => {
          window.removeEventListener('scroll', handleReposition);
          window.removeEventListener('resize', handleReposition);
        };
      }
    }, [isOpen, calculatePosition]);

    // Click outside to close
    React.useEffect(() => {
      if (isOpen && trigger === 'click') {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            tooltipRef.current &&
            triggerRef.current &&
            !tooltipRef.current.contains(event.target as Node) &&
            !triggerRef.current.contains(event.target as Node)
          ) {
            hideTooltip();
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen, trigger, hideTooltip]);

    // Cleanup timeout
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    // Clone child element with event handlers
    const childElement = React.cloneElement(children, {
      ref: (node: HTMLElement | null) => {
        // Set triggerRef
        if (triggerRef && 'current' in triggerRef) {
          (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }

        // Forward original ref
        const originalRef = (children as any).ref;
        if (originalRef) {
          if (typeof originalRef === 'function') {
            originalRef(node);
          } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
            (originalRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }
      },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur,
    });

    return (
      <>
        {childElement}

        {/* Tooltip portal */}
        {isOpen && (
          <Portal>
            <div
              ref={tooltipRef}
              className={cn(tooltipVariants({ variant, size }), className)}
              style={{
                position: 'absolute',
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                zIndex: 50,
              }}
              role='tooltip'
              {...props}
            >
              {content}

              {/* Arrow */}
              {showArrow && (
                <div
                  className={cn(
                    'absolute w-2 h-2 rotate-45',
                    variant === 'secondary' ? 'bg-[#f1f5f9] border border-[#e2e8f0]' : 'bg-inherit',
                    {
                      'top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2': position === 'top',
                      'bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2': position === 'bottom',
                      'top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2': position === 'left',
                      'top-1/2 right-full transform -translate-y-1/2 translate-x-1/2': position === 'right',
                    }
                  )}
                />
              )}
            </div>
          </Portal>
        )}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
