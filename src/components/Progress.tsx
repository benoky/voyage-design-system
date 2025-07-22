import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const progressVariants = cva('relative h-4 w-full overflow-hidden rounded-full bg-[#f1f5f9] border border-[#e2e8f0]', {
  variants: {
    variant: {
      default: 'bg-[#f1f5f9]',
      secondary: 'bg-[#e2e8f0]',
      success: 'bg-[#dcfce7]',
      warning: 'bg-[#fef3c7]',
      error: 'bg-[#fee2e2]',
    },
    size: {
      sm: 'h-2',
      default: 'h-4',
      lg: 'h-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const progressBarVariants = cva('h-full flex-1 transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      default: 'bg-[#0f172a]',
      secondary: 'bg-[#64748b]',
      success: 'bg-[#22c55e]',
      warning: 'bg-[#eab308]',
      error: 'bg-[#ef4444]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressVariants> {
  /**
   * Progress value (0-100)
   */
  value?: number;
  /**
   * Maximum progress value
   */
  max?: number;
  /**
   * Whether to show the progress label
   */
  showLabel?: boolean;
  /**
   * Custom label format function
   */
  labelFormat?: (value: number, max: number) => string;
  /**
   * Whether the progress is indeterminate (loading animation)
   */
  indeterminate?: boolean;
  /**
   * Progress bar color variant
   */
  barVariant?: VariantProps<typeof progressBarVariants>['variant'];
}

/**
 * Progress component
 * A visual indicator of task completion or loading progress.
 *
 * @param value - Current progress value (0-100)
 * @param max - Maximum progress value
 * @param variant - Progress background style variant
 * @param barVariant - Progress bar color variant
 * @param size - Progress bar size
 * @param showLabel - Whether to show the progress label
 * @param labelFormat - Custom label format function
 * @param indeterminate - Whether to show loading animation
 * @param className - Additional CSS classes
 * @returns Progress component
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    { className, variant, barVariant, size, value = 0, max = 100, showLabel, labelFormat, indeterminate, ...props },
    ref
  ) => {
    // Calculate progress percentage
    const percentage = (Math.min(Math.max(value, 0), max) / max) * 100;

    // Default label formatter
    const defaultLabelFormat = (val: number, maxVal: number) => `${Math.round(val)}%`;

    return (
      <div className='w-full space-y-2'>
        {/* Progress bar */}
        <div ref={ref} className={cn(progressVariants({ variant, size }), className)} {...props}>
          <div
            className={cn(progressBarVariants({ variant: barVariant || variant }), indeterminate && 'animate-pulse')}
            style={{
              width: indeterminate ? '100%' : `${percentage}%`,
              ...(indeterminate && {
                background: 'linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%)',
                animation: 'progress-indeterminate 2s ease-in-out infinite',
              }),
            }}
          />
        </div>

        {/* Progress label */}
        {showLabel && !indeterminate && (
          <div className='flex justify-between items-center text-sm text-[#64748b]'>
            <span>{labelFormat ? labelFormat(value, max) : defaultLabelFormat(value, max)}</span>
            <span>{max}</span>
          </div>
        )}

        {/* Indeterminate label */}
        {showLabel && indeterminate && <div className='text-center text-sm text-[#64748b]'>Loading...</div>}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
