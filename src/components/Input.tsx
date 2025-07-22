import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const inputVariants = cva(
  'w-full border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all',
  {
    variants: {
      variant: {
        default: 'bg-white',
        filled: 'bg-gray-50',
        outline: 'bg-transparent border-2',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        default: 'px-4 py-3 text-base',
        lg: 'px-4 py-4 text-lg',
      },
      state: {
        default: 'border-gray-300',
        error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
        success: 'border-green-500 focus:ring-green-500 focus:border-green-500',
        disabled: 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Input label
   */
  label?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Whether the input is in an error state
   */
  isError?: boolean;
  /**
   * Icon displayed at the start of the input
   */
  startIcon?: React.ReactNode;
  /**
   * Icon displayed at the end of the input
   */
  endIcon?: React.ReactNode;
  /**
   * Container CSS class name
   */
  containerClassName?: string;
  /**
   * Label CSS class name
   */
  labelClassName?: string;
}

/**
 * Input component
 * A text input field with label, icons, and error states.
 *
 * @param label - Input label
 * @param placeholder - Input placeholder
 * @param value - Input value
 * @param onChange - Value change handler
 * @param variant - Input style variant
 * @param size - Input size
 * @param state - Input state (error, success, etc.)
 * @param isError - Whether the input is in an error state
 * @param error - Error message
 * @param helperText - Helper text
 * @param startIcon - Icon at the start of the input
 * @param endIcon - Icon at the end of the input
 * @param disabled - Whether the input is disabled
 * @param className - Additional CSS classes
 * @param containerClassName - Container CSS class name
 * @param labelClassName - Label CSS class name
 * @returns Input component
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      size,
      state,
      label,
      helperText,
      error,
      isError,
      startIcon,
      endIcon,
      containerClassName,
      labelClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    // Determine input state
    const inputState = disabled ? 'disabled' : isError || error ? 'error' : state;
    const hasIcons = startIcon || endIcon;

    return (
      <div className={cn('w-full', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1',
              disabled && 'text-gray-500',
              isError && 'text-red-600',
              labelClassName
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}

        {/* Input container */}
        <div className='relative'>
          {/* Start icon */}
          {startIcon && (
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>{startIcon}</div>
          )}

          {/* Input */}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size, state: inputState }),
              hasIcons && startIcon && 'pl-10',
              hasIcons && endIcon && 'pr-10',
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {/* End icon */}
          {endIcon && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>{endIcon}</div>
          )}
        </div>

        {/* Helper text or error message */}
        {(helperText || error) && (
          <p className={cn('mt-1 text-sm', error || isError ? 'text-red-600' : 'text-gray-500')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
