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
   * 라디오 옵션들
   */
  options?: RadioOption[];
  /**
   * 단일 라디오의 라벨 (options가 없을 때)
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
   * 라벨 클래스명
   */
  labelClassName?: string;
  /**
   * 컨테이너 클래스명
   */
  containerClassName?: string;
  /**
   * 옵션들의 방향
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 그룹 변경 핸들러 (options 사용 시)
   */
  onValueChange?: (value: string) => void;
}

/**
 * Radio 컴포넌트
 * 사용자가 여러 옵션 중 하나만 선택할 수 있는 라디오 버튼 컴포넌트입니다.
 *
 * @param options - 라디오 옵션들 (그룹으로 사용할 때)
 * @param label - 단일 라디오의 라벨
 * @param checked - 체크 상태
 * @param value - 라디오 값
 * @param onChange - 상태 변경 핸들러
 * @param onValueChange - 그룹 변경 핸들러
 * @param variant - 라디오 스타일 변형
 * @param size - 라디오 크기
 * @param labelPosition - 라벨 위치
 * @param direction - 옵션들의 방향
 * @param error - 에러 상태 여부
 * @param helperText - 도움말 텍스트
 * @param disabled - 비활성화 여부
 * @param className - 추가 CSS 클래스
 * @param labelClassName - 라벨 클래스명
 * @param containerClassName - 컨테이너 클래스명
 * @returns Radio 컴포넌트
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
    // 단일 라디오 버튼 렌더링
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

          {/* 선택 표시 (내부 원) */}
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

    // 옵션 그룹이 있는 경우
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

    // 단일 라디오
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
