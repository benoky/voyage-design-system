import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';
import { Portal } from './Portal';

const tooltipVariants = cva(
  'z-50 overflow-hidden rounded-[4px] px-3 py-1.5 text-xs text-white shadow-md animate-in fade-in-0 zoom-in-95',
  {
    variants: {
      variant: {
        default: 'bg-[#0f172a]',
        dark: 'bg-[#1f2937]',
        light: 'bg-white text-[#0f172a] border border-[#e5e7eb]',
        success: 'bg-[#22c55e]',
        warning: 'bg-[#eab308]',
        error: 'bg-[#ef4444]',
        info: 'bg-[#3b82f6]',
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

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  /**
   * 툴팁 내용
   */
  content: React.ReactNode;
  /**
   * 툴팁이 표시될 대상 요소
   */
  children: React.ReactElement;
  /**
   * 툴팁 위치
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * 표시 지연 시간 (ms)
   */
  delay?: number;
  /**
   * 숨김 지연 시간 (ms)
   */
  hideDelay?: number;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 클릭으로 표시 여부
   */
  trigger?: 'hover' | 'click' | 'focus';
  /**
   * 화살표 표시 여부
   */
  arrow?: boolean;
  /**
   * 최대 너비
   */
  maxWidth?: number;
  /**
   * 툴팁 클래스명
   */
  tooltipClassName?: string;
}

/**
 * Tooltip 컴포넌트
 * 요소에 마우스를 올리거나 포커스할 때 추가 정보를 표시하는 컴포넌트입니다.
 *
 * @param content - 툴팁 내용
 * @param children - 툴팁이 표시될 대상 요소
 * @param placement - 툴팁 위치
 * @param variant - 툴팁 스타일 변형
 * @param size - 툴팁 크기
 * @param delay - 표시 지연 시간
 * @param hideDelay - 숨김 지연 시간
 * @param disabled - 비활성화 여부
 * @param trigger - 표시 트리거
 * @param arrow - 화살표 표시 여부
 * @param maxWidth - 최대 너비
 * @param tooltipClassName - 툴팁 클래스명
 * @returns Tooltip 컴포넌트
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  variant,
  size,
  delay = 200,
  hideDelay = 0,
  disabled = false,
  trigger = 'hover',
  arrow = true,
  maxWidth = 300,
  tooltipClassName,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const showTimer = React.useRef<NodeJS.Timeout>();
  const hideTimer = React.useRef<NodeJS.Timeout>();

  // 위치 계산
  const calculatePosition = React.useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let x = 0;
    let y = 0;
    const gap = 8; // 화살표와 요소 사이의 간격

    switch (placement) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - gap;
        break;
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + gap;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - gap;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right + gap;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // 화면 경계 처리
    const padding = 8;
    x = Math.max(padding, Math.min(x, window.innerWidth - tooltipRect.width - padding));
    y = Math.max(padding, Math.min(y, window.innerHeight - tooltipRect.height - padding));

    setPosition({ x: x + scrollX, y: y + scrollY });
  }, [placement]);

  // 표시
  const show = React.useCallback(() => {
    if (disabled) return;

    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = undefined;
    }

    showTimer.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay, disabled]);

  // 숨김
  const hide = React.useCallback(() => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = undefined;
    }

    hideTimer.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  }, [hideDelay]);

  // 위치 업데이트
  React.useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, calculatePosition]);

  // 이벤트 핸들러들
  const handleMouseEnter = () => {
    if (trigger === 'hover') show();
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') hide();
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hide();
      } else {
        show();
      }
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') show();
  };

  const handleBlur = () => {
    if (trigger === 'focus') hide();
  };

  // 클린업
  React.useEffect(() => {
    return () => {
      if (showTimer.current) clearTimeout(showTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // 자식 요소에 이벤트 핸들러 추가
  const childElement = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      // triggerRef 설정
      if (triggerRef && 'current' in triggerRef) {
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }

      // 원래 ref도 전달 (안전한 방식으로)
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

  // 화살표 스타일 계산
  const getArrowStyle = () => {
    const arrowSize = 4;
    const arrowStyles: Record<string, React.CSSProperties> = {
      top: {
        bottom: -arrowSize,
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid transparent`,
        borderTop: `${arrowSize}px solid currentColor`,
      },
      bottom: {
        top: -arrowSize,
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid currentColor`,
      },
      left: {
        right: -arrowSize,
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
        borderLeft: `${arrowSize}px solid currentColor`,
      },
      right: {
        left: -arrowSize,
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: `${arrowSize}px solid transparent`,
        borderBottom: `${arrowSize}px solid transparent`,
        borderRight: `${arrowSize}px solid currentColor`,
      },
    };

    return arrowStyles[placement];
  };

  return (
    <>
      {childElement}
      {isVisible && content && (
        <Portal>
          <div
            ref={tooltipRef}
            className={cn(tooltipVariants({ variant, size }), tooltipClassName)}
            style={{
              position: 'absolute',
              left: position.x,
              top: position.y,
              maxWidth: `${maxWidth}px`,
              zIndex: 50,
            }}
            role='tooltip'
          >
            {content}

            {/* 화살표 */}
            {arrow && <div className='absolute w-0 h-0 text-current' style={getArrowStyle()} />}
          </div>
        </Portal>
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };
