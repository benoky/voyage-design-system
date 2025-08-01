import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const tooltipVariants = cva(
  'z-50 rounded-[6px] bg-[#1e293b] px-3 py-1.5 text-xs text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
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
    const [tooltipStyle, setTooltipStyle] = React.useState<React.CSSProperties>({
      position: 'fixed',
      left: 0,
      top: 0,
      transform: 'translate(-50%, -100%)',
      zIndex: 50,
      pointerEvents: 'none',
      visibility: 'hidden',
    });
    const triggerRef = React.useRef<HTMLElement>(null);
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout>();
    const isFirstRender = React.useRef(true);

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
      const maxLeft = window.innerWidth - tooltipRect.width - padding;
      const maxTop = window.innerHeight - tooltipRect.height - padding;

      left = Math.max(padding, Math.min(left, maxLeft));
      top = Math.max(padding, Math.min(top, maxTop));

      setTooltipStyle({
        position: 'fixed',
        left,
        top,
        transform,
        zIndex: 50,
        pointerEvents: 'none',
        visibility: 'visible',
      });
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
        // 첫 번째 렌더링 시에는 즉시 계산
        if (isFirstRender.current) {
          calculatePosition();
          isFirstRender.current = false;
        } else {
          // 이후에는 약간의 지연을 두고 계산
          const timer = setTimeout(() => {
            calculatePosition();
          }, 10);

          return () => clearTimeout(timer);
        }
      }
    }, [isOpen, calculatePosition]);

    // Recalculate on scroll/resize
    React.useEffect(() => {
      if (isOpen) {
        const handleReposition = () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            calculatePosition();
          }, 16);
        };

        window.addEventListener('scroll', handleReposition, { passive: true });
        window.addEventListener('resize', handleReposition, { passive: true });

        return () => {
          window.removeEventListener('scroll', handleReposition);
          window.removeEventListener('resize', handleReposition);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
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
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur,
    });

    return (
      <>
        {childElement}

        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className={cn(tooltipVariants({ variant, size }), className)}
          style={{
            ...tooltipStyle,
            visibility: isOpen ? 'visible' : 'hidden',
          }}
          role='tooltip'
          {...props}
        >
          {content}

          {/* Arrow */}
          {showArrow && (
            <div
              className={cn(
                'absolute w-3 h-3 rotate-45',
                variant === 'secondary' ? 'bg-[#f1f5f9] border border-[#e2e8f0]' : 'bg-[#1e293b]',
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
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
