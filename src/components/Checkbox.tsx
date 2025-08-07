import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded border border-[#cbd5e1] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'data-[state=checked]:bg-[#0f172a] data-[state=checked]:text-white data-[state=checked]:border-[#0f172a]',
        primary:
          'data-[state=checked]:bg-[#3b82f6] data-[state=checked]:text-white data-[state=checked]:border-[#3b82f6]',
        success:
          'data-[state=checked]:bg-[#22c55e] data-[state=checked]:text-white data-[state=checked]:border-[#22c55e]',
        warning:
          'data-[state=checked]:bg-[#eab308] data-[state=checked]:text-white data-[state=checked]:border-[#eab308]',
        error:
          'data-[state=checked]:bg-[#ef4444] data-[state=checked]:text-white data-[state=checked]:border-[#ef4444]',
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

const checkboxLabelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  /**
   * Label text
   */
  label?: string;
  /**
   * Label position
   */
  labelPosition?: 'left' | 'right';
  /**
   * Whether the checkbox is in an error state
   */
  error?: boolean;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Indeterminate state (partially checked)
   */
  indeterminate?: boolean;
  /**
   * Label CSS class name
   */
  labelClassName?: string;
  /**
   * Container CSS class name
   */
  containerClassName?: string;
}

/**
 * Checkbox component
 * An input component that allows users to select one or more options.
 *
 * @param checked - Checked state
 * @param onChange - State change handler
 * @param variant - Checkbox style variant
 * @param size - Checkbox size
 * @param label - Label text
 * @param labelPosition - Label position
 * @param error - Whether the checkbox is in an error state
 * @param helperText - Helper text
 * @param indeterminate - Indeterminate state
 * @param disabled - Whether the checkbox is disabled
 * @param className - Additional CSS classes
 * @param labelClassName - Label CSS class name
 * @param containerClassName - Container CSS class name
 * @returns Checkbox component
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size,
      label,
      labelPosition = 'right',
      error,
      helperText,
      indeterminate,
      labelClassName,
      containerClassName,
      checked,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Connect ref
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Set indeterminate state
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    const checkboxElement = (
      <div className='relative'>
        <input
          ref={inputRef}
          type='checkbox'
          className={cn(
            checkboxVariants({
              variant: error ? 'error' : variant,
              size,
            }),
            'appearance-none',
            className
          )}
          data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
          checked={checked}
          {...props}
        />

        {/* Check icon */}
        {(checked || indeterminate) && (
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            {indeterminate ? (
              <svg
                className={cn('text-current', size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5')}
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <rect x='3' y='7' width='10' height='2' rx='1' />
              </svg>
            ) : (
              <svg
                className={cn('text-current', size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5')}
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
              </svg>
            )}
          </div>
        )}
      </div>
    );

    const labelElement = label && (
      <label className={cn(checkboxLabelVariants(), error && 'text-[#ef4444]', labelClassName)} htmlFor={props.id}>
        {label}
      </label>
    );

    return (
      <div className={cn('space-y-1', containerClassName)}>
        <div
          className={cn(
            'flex items-center',
            labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
            'space-x-2',
            labelPosition === 'left' && 'space-x-reverse'
          )}
        >
          {checkboxElement}
          {labelElement}
        </div>

        {helperText && <p className={cn('text-sm', error ? 'text-[#ef4444]' : 'text-[#64748b]')}>{helperText}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
