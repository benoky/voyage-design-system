import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const textareaVariants = cva(
  'min-h-[80px] w-full rounded-[6px] border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default: 'border-[#e5e7eb] focus:ring-[#3b82f6]',
        error: 'border-[#ef4444] focus:ring-[#ef4444]',
        success: 'border-[#22c55e] focus:ring-[#22c55e]',
      },
      size: {
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        default: 'min-h-[80px] px-3 py-2 text-sm',
        lg: 'min-h-[120px] px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  /**
   * Textarea label
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
   * Character count display
   */
  showCharCount?: boolean;
  /**
   * Maximum number of characters
   */
  maxLength?: number;
  /**
   * Whether the textarea should auto-resize based on content
   */
  autoResize?: boolean;
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
 * Textarea component
 * A multi-line text input field with label, character count, and auto-resize features.
 *
 * @param label - Textarea label
 * @param placeholder - Textarea placeholder
 * @param value - Textarea value
 * @param onChange - Value change handler
 * @param variant - Textarea style variant
 * @param size - Textarea size
 * @param error - Error message
 * @param helperText - Helper text
 * @param showCharCount - Whether to show character count
 * @param maxLength - Maximum number of characters
 * @param autoResize - Whether to auto-resize based on content
 * @param disabled - Whether the textarea is disabled
 * @param className - Additional CSS classes
 * @param containerClassName - Container CSS class name
 * @param labelClassName - Label CSS class name
 * @returns Textarea component
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      label,
      helperText,
      error,
      showCharCount,
      maxLength,
      autoResize,
      containerClassName,
      labelClassName,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [charCount, setCharCount] = React.useState(0);

    // Handle ref forwarding
    React.useImperativeHandle(ref, () => textareaRef.current!);

    // Auto-resize functionality
    const adjustHeight = React.useCallback(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [autoResize]);

    // Update character count and handle auto-resize
    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
      adjustHeight();
    }, [value, adjustHeight]);

    // Handle change event
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      // Character limit validation
      if (maxLength && newValue.length > maxLength) {
        return;
      }

      setCharCount(newValue.length);
      onChange?.(e);

      // Auto-resize after state update
      setTimeout(adjustHeight, 0);
    };

    // Determine variant based on error state
    const currentVariant = error ? 'error' : variant;

    return (
      <div className={cn('w-full', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            className={cn(
              'block text-sm font-medium leading-6 text-[#0f172a] mb-1',
              disabled && 'text-[#64748b]',
              error && 'text-[#ef4444]',
              labelClassName
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className={cn(
            textareaVariants({ variant: currentVariant, size }),
            autoResize && 'resize-none overflow-hidden',
            className
          )}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          disabled={disabled}
          {...props}
        />

        {/* Footer: Helper text and character count */}
        <div className='flex justify-between items-start mt-1'>
          {/* Helper text or error message */}
          <div className='flex-1'>
            {(error || helperText) && (
              <p className={cn('text-sm', error ? 'text-[#ef4444]' : 'text-[#64748b]')}>{error || helperText}</p>
            )}
          </div>

          {/* Character count */}
          {showCharCount && (
            <p
              className={cn(
                'text-xs ml-2 flex-shrink-0',
                maxLength && charCount > maxLength * 0.9 ? 'text-[#ef4444]' : 'text-[#64748b]'
              )}
            >
              {charCount}
              {maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
