import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const radioVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-full border border-[#cbd5e1] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:border-[#0f172a] data-[state=checked]:bg-[#0f172a]',
        primary: 'data-[state=checked]:border-[#3b82f6] data-[state=checked]:bg-[#3b82f6]',
        success: 'data-[state=checked]:border-[#22c55e] data-[state=checked]:bg-[#22c55e]',
        warning: 'data-[state=checked]:border-[#eab308] data-[state=checked]:bg-[#eab308]',
        error: 'data-[state=checked]:border-[#ef4444] data-[state=checked]:bg-[#ef4444]',
      },
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const radioLabelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
  helperText?: string;
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof radioVariants> {
  /**
   * Radio options array
   */
  options?: RadioOption[];
  /**
   * Label for single radio (when options is not provided)
   */
  label?: string;
  /**
   * Label position
   */
  labelPosition?: 'left' | 'right';
  /**
   * Whether the radio is in an error state
   */
  error?: boolean;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Label CSS class name
   */
  labelClassName?: string;
  /**
   * Container CSS class name
   */
  containerClassName?: string;
  /**
   * Options layout direction
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Group change handler (when using options)
   */
  onValueChange?: (value: string) => void;
}

/**
 * Radio component
 * An input component that allows users to select only one option from multiple choices.
 *
 * @param options - Radio options array (when used as a group)
 * @param label - Label for single radio
 * @param checked - Checked state
 * @param value - Radio value
 * @param onChange - State change handler
 * @param onValueChange - Group change handler
 * @param variant - Radio style variant
 * @param size - Radio size
 * @param labelPosition - Label position
 * @param direction - Options layout direction
 * @param error - Whether the radio is in an error state
 * @param helperText - Helper text
 * @param disabled - Whether the radio is disabled
 * @param className - Additional CSS classes
 * @param labelClassName - Label CSS class name
 * @param containerClassName - Container CSS class name
 * @returns Radio component
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      variant,
      size,
      label,
      labelPosition = 'right',
      error,
      helperText,
      labelClassName,
      containerClassName,
      options,
      direction = 'vertical',
      value,
      checked,
      onChange,
      onValueChange,
      name,
      ...props
    },
    ref
  ) => {
    // Render single radio button
    const renderSingleRadio = (
      radioValue?: string,
      radioLabel?: string,
      isChecked?: boolean,
      radioDisabled?: boolean,
      radioHelperText?: string,
      radioOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    ) => {
      const radioElement = (
        <div className='relative'>
          <input
            ref={ref}
            type='radio'
            className={cn(
              radioVariants({
                variant: error ? 'error' : variant,
                size,
              }),
              'appearance-none',
              className
            )}
            data-state={isChecked ? 'checked' : 'unchecked'}
            checked={isChecked}
            value={radioValue}
            name={name}
            disabled={radioDisabled}
            onChange={radioOnChange}
            {...props}
          />

          {/* Selection indicator (inner circle) */}
          {isChecked && (
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div
                className={cn(
                  'rounded-full bg-white',
                  size === 'sm' ? 'w-1 h-1' : size === 'lg' ? 'w-2 h-2' : 'w-1.5 h-1.5'
                )}
              />
            </div>
          )}
        </div>
      );

      const labelElement = radioLabel && (
        <label className={cn(radioLabelVariants(), error && 'text-[#ef4444]', labelClassName)} htmlFor={props.id}>
          {radioLabel}
        </label>
      );

      return (
        <div className='space-y-1'>
          <div
            className={cn(
              'flex items-center',
              labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
              'space-x-2',
              labelPosition === 'left' && 'space-x-reverse'
            )}
          >
            {radioElement}
            {labelElement}
          </div>

          {radioHelperText && (
            <p className={cn('text-sm', error ? 'text-[#ef4444]' : 'text-[#64748b]')}>{radioHelperText}</p>
          )}
        </div>
      );
    };

    // When options group is provided
    if (options && options.length > 0) {
      return (
        <div className={cn('space-y-2', containerClassName)}>
          <div className={cn('flex', direction === 'horizontal' ? 'flex-row space-x-4' : 'flex-col space-y-2')}>
            {options.map((option, index) => (
              <div key={option.value || index}>
                {renderSingleRadio(
                  option.value,
                  option.label,
                  value === option.value,
                  option.disabled || props.disabled,
                  option.helperText,
                  e => {
                    onValueChange?.(option.value);
                    onChange?.(e);
                  }
                )}
              </div>
            ))}
          </div>

          {helperText && <p className={cn('text-sm', error ? 'text-[#ef4444]' : 'text-[#64748b]')}>{helperText}</p>}
        </div>
      );
    }

    // Single radio
    return (
      <div className={cn(containerClassName)}>
        {renderSingleRadio(
          typeof value === 'string' ? value : String(value || ''),
          label,
          checked,
          props.disabled,
          helperText,
          onChange
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export { Radio };
