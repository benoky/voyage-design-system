import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded border border-[#cbd5e1] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
   * 라벨 텍스트
   */
  label?: string;
  /**
   * 라벨 위치
   */
  labelPosition?: 'left' | 'right';
  /**
   * 에러 상태 여부
   */
  error?: boolean;
  /**
   * 도움말 텍스트
   */
  helperText?: string;
  /**
   * 중간 상태 (indeterminate)
   */
  indeterminate?: boolean;
  /**
   * 라벨 클래스명
   */
  labelClassName?: string;
  /**
   * 컨테이너 클래스명
   */
  containerClassName?: string;
}

/**
 * Checkbox 컴포넌트
 * 사용자가 하나 이상의 옵션을 선택할 수 있는 체크박스 입력 컴포넌트입니다.
 *
 * @param checked - 체크 상태
 * @param onChange - 상태 변경 핸들러
 * @param variant - 체크박스 스타일 변형
 * @param size - 체크박스 크기
 * @param label - 라벨 텍스트
 * @param labelPosition - 라벨 위치
 * @param error - 에러 상태 여부
 * @param helperText - 도움말 텍스트
 * @param indeterminate - 중간 상태
 * @param disabled - 비활성화 여부
 * @param className - 추가 CSS 클래스
 * @param labelClassName - 라벨 클래스명
 * @param containerClassName - 컨테이너 클래스명
 * @returns Checkbox 컴포넌트
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

    // ref 연결
    React.useImperativeHandle(ref, () => inputRef.current!);

    // indeterminate 상태 설정
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

        {/* 체크 아이콘 */}
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
