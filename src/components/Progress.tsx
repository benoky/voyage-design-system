import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const progressVariants = cva('relative h-2 w-full overflow-hidden rounded-full bg-[#f1f5f9]', {
  variants: {
    size: {
      sm: 'h-1',
      default: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const progressIndicatorVariants = cva('h-full w-full flex-1 transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      default: 'bg-[#0f172a]',
      primary: 'bg-[#3b82f6]',
      success: 'bg-[#22c55e]',
      warning: 'bg-[#eab308]',
      error: 'bg-[#ef4444]',
      gradient: 'bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  /**
   * 진행률 값 (0-100)
   */
  value?: number;
  /**
   * 최대값 (기본값: 100)
   */
  max?: number;
  /**
   * 애니메이션 여부
   */
  animated?: boolean;
  /**
   * 스트라이프 패턴 여부
   */
  striped?: boolean;
  /**
   * 라벨 표시 여부
   */
  showLabel?: boolean;
  /**
   * 커스텀 라벨
   */
  label?: string;
  /**
   * 라벨 위치
   */
  labelPosition?: 'inside' | 'outside' | 'top';
  /**
   * 부정확한 진행률 (무한 로딩)
   */
  indeterminate?: boolean;
}

/**
 * Progress 컴포넌트
 * 작업의 진행률을 시각적으로 표시하는 컴포넌트입니다.
 *
 * @param value - 진행률 값 (0-100)
 * @param max - 최대값
 * @param variant - 진행바 색상 변형
 * @param size - 진행바 크기
 * @param animated - 애니메이션 여부
 * @param striped - 스트라이프 패턴 여부
 * @param showLabel - 라벨 표시 여부
 * @param label - 커스텀 라벨
 * @param labelPosition - 라벨 위치
 * @param indeterminate - 부정확한 진행률 여부
 * @param className - 추가 CSS 클래스
 * @returns Progress 컴포넌트
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant,
      size,
      animated,
      striped,
      showLabel,
      label,
      labelPosition = 'outside',
      indeterminate,
      ...props
    },
    ref
  ) => {
    // 진행률 계산
    const percentage = indeterminate ? 0 : Math.min(Math.max((value / max) * 100, 0), 100);

    // 라벨 텍스트 결정
    const displayLabel = label || (showLabel ? `${Math.round(percentage)}%` : '');

    return (
      <div className={cn('w-full', className)} {...props}>
        {/* 상단 라벨 */}
        {displayLabel && labelPosition === 'top' && (
          <div className='mb-2 flex justify-between text-sm font-medium text-[#0f172a]'>
            <span>{displayLabel}</span>
          </div>
        )}

        <div
          ref={ref}
          className={cn(progressVariants({ size }))}
          role='progressbar'
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-label={indeterminate ? 'Loading...' : `${percentage}% complete`}
        >
          <div
            className={cn(
              progressIndicatorVariants({ variant }),
              striped && 'bg-stripes',
              animated && striped && 'animate-pulse',
              indeterminate && 'animate-pulse'
            )}
            style={{
              width: indeterminate ? '40%' : `${percentage}%`,
              transition: indeterminate ? 'none' : 'width 0.3s ease-in-out',
            }}
          >
            {/* 내부 라벨 */}
            {displayLabel && labelPosition === 'inside' && percentage > 15 && (
              <div className='flex h-full items-center justify-center text-xs font-medium text-white'>
                {displayLabel}
              </div>
            )}
          </div>
        </div>

        {/* 외부 라벨 */}
        {displayLabel && labelPosition === 'outside' && (
          <div className='mt-1 text-right text-xs text-[#64748b]'>{displayLabel}</div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
