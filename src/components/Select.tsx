import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';
import { ChevronDown } from 'lucide-react';

const selectVariants = cva(
  'bg-white border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 disabled:opacity-50 disabled:cursor-not-allowed font-normal appearance-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border-[#cbd5e1]',
        error: 'border-[#ef4444] border-1 focus:ring-red-500/20 focus:border-red-500',
      },
      size: {
        default: 'w-full max-w-[384px] h-[40px] px-[12px] py-[8px] text-[16px] leading-[24px]',
        sm: 'w-full max-w-[276px] h-[32px] px-[10px] py-[6px] text-[14px] leading-[20px]',
        lg: 'w-full max-w-[450px] h-[48px] px-[14px] py-[10px] text-[18px] leading-[28px]',
        auto: 'w-full h-[40px] px-[12px] py-[8px] text-[14px] leading-[20px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  /**
   * Select label
   */
  label?: string;
  /**
   * Label position
   */
  labelPosition?: 'top' | 'left';
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Select options array
   */
  options: SelectOption[];
  /**
   * Placeholder text
   */
  placeholder?: string;
}

/**
 * Select component
 * A dropdown selection component for choosing from multiple options.
 *
 * @param className - Additional CSS classes
 * @param variant - Select field style variant
 * @param size - Select field size
 * @param label - Label text
 * @param labelPosition - Label position (top or left)
 * @param helperText - Helper text
 * @param options - Select options array
 * @param placeholder - Placeholder text
 * @returns Select component
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    className,
    variant,
    size,
    label,
    labelPosition = 'top',
    helperText,
    options,
    placeholder,
    ...restProps
  } = props;

  // Helper text color based on variant
  const helperTextColorClass = variant === 'error' ? 'text-[#ef4444]' : 'text-[#64748b]';

  // Label styles - base style and position-specific styles
  const labelBaseStyle = 'text-[14px] font-medium text-[#0f172a] leading-[20px]';
  const labelPositionStyle =
    labelPosition === 'left' ? 'min-w-[120px] text-right whitespace-nowrap mr-[8px]' : 'text-left w-full mb-[6px]';

  return (
    <div className='w-full'>
      <div
        className={
          labelPosition === 'left' ? 'flex flex-row items-center flex-wrap sm:flex-nowrap' : 'flex flex-col w-full'
        }
      >
        {label && (
          <label className={cn(labelBaseStyle, labelPositionStyle)} htmlFor={restProps.id}>
            {label}
          </label>
        )}
        <div className={labelPosition === 'left' ? 'flex-1' : 'flex w-full'}>
          <div className='relative w-full'>
            <select
              ref={ref}
              className={cn(selectVariants({ variant, size, className }), 'pr-[40px] text-[#0f172a]')}
              {...restProps}
            >
              {placeholder && (
                <option value='' disabled>
                  {placeholder}
                </option>
              )}
              {options.map(option => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none' />
          </div>
        </div>
      </div>
      {helperText ? (
        <p
          className={`text-[14px] ${helperTextColorClass} font-normal leading-[20px] mt-[4px] text-left ${
            labelPosition === 'left' ? 'ml-[128px]' : ''
          }`}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';

export { Select };
