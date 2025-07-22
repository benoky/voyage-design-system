import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const textareaVariants = cva(
  'flex w-full rounded-[6px] border border-[#cbd5e1] bg-white px-3 py-2 text-base ring-offset-background placeholder:text-[#94a3b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default: 'border-[#cbd5e1] focus-visible:ring-slate-900/20 focus-visible:border-slate-900',
        error: 'border-[#ef4444] focus-visible:ring-red-500/20 focus-visible:border-red-500',
      },
      size: {
        sm: 'min-h-[80px] text-sm px-2 py-1',
        default: 'min-h-[100px] text-base px-3 py-2',
        lg: 'min-h-[120px] text-lg px-4 py-3',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      resize: 'vertical',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  /**
   * 라벨 텍스트
   */
  label?: string;
  /**
   * 라벨 위치
   */
  labelPosition?: 'top' | 'left';
  /**
   * 도움말 텍스트
   */
  helperText?: string;
  /**
   * 에러 상태 여부
   */
  error?: boolean;
  /**
   * 최대 문자수
   */
  maxLength?: number;
  /**
   * 문자수 표시 여부
   */
  showCount?: boolean;
  /**
   * 자동 높이 조절 여부
   */
  autoResize?: boolean;
  /**
   * 최대 높이 (autoResize 사용 시)
   */
  maxHeight?: number;
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
 * Textarea 컴포넌트
 * 여러 줄의 텍스트를 입력할 수 있는 텍스트 영역 컴포넌트입니다.
 *
 * @param variant - 텍스트영역 스타일 변형
 * @param size - 텍스트영역 크기
 * @param resize - 리사이즈 옵션
 * @param label - 라벨 텍스트
 * @param labelPosition - 라벨 위치
 * @param helperText - 도움말 텍스트
 * @param error - 에러 상태 여부
 * @param maxLength - 최대 문자수
 * @param showCount - 문자수 표시 여부
 * @param autoResize - 자동 높이 조절 여부
 * @param maxHeight - 최대 높이
 * @param disabled - 비활성화 여부
 * @param className - 추가 CSS 클래스
 * @param labelClassName - 라벨 클래스명
 * @param containerClassName - 컨테이너 클래스명
 * @returns Textarea 컴포넌트
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      resize,
      label,
      labelPosition = 'top',
      helperText,
      error,
      maxLength,
      showCount,
      autoResize,
      maxHeight,
      labelClassName,
      containerClassName,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [currentLength, setCurrentLength] = React.useState(0);

    // ref 연결
    React.useImperativeHandle(ref, () => textareaRef.current!);

    // 자동 높이 조절
    const adjustHeight = React.useCallback(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, maxHeight || 300);
        textarea.style.height = `${newHeight}px`;
      }
    }, [autoResize, maxHeight]);

    // 값 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      // 최대 길이 체크
      if (maxLength && newValue.length > maxLength) {
        return;
      }

      setCurrentLength(newValue.length);
      adjustHeight();
      onChange?.(e);
    };

    // 초기 문자수 설정
    React.useEffect(() => {
      const initialValue = value?.toString() || '';
      setCurrentLength(initialValue.length);
    }, [value]);

    // 초기 높이 조절
    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight, value]);

    // 라벨 스타일
    const labelBaseStyle = 'text-[14px] font-medium text-[#0f172a] leading-[20px]';
    const labelPositionStyle =
      labelPosition === 'left' ? 'min-w-[120px] text-right whitespace-nowrap mr-[8px]' : 'text-left w-full mb-[6px]';

    const textareaElement = (
      <div className='relative w-full'>
        <textarea
          ref={textareaRef}
          className={cn(
            textareaVariants({
              variant: error ? 'error' : variant,
              size,
              resize: autoResize ? 'none' : resize,
            }),
            className
          )}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />

        {/* 문자수 표시 */}
        {showCount && (
          <div className='absolute bottom-2 right-2 text-xs text-[#64748b] bg-white/80 px-1 rounded'>
            {currentLength}
            {maxLength && `/${maxLength}`}
          </div>
        )}
      </div>
    );

    const labelElement = label && (
      <label
        className={cn(labelBaseStyle, labelPositionStyle, error && 'text-[#ef4444]', labelClassName)}
        htmlFor={props.id}
      >
        {label}
      </label>
    );

    return (
      <div className={cn('w-full', containerClassName)}>
        <div
          className={
            labelPosition === 'left' ? 'flex flex-row items-start flex-wrap sm:flex-nowrap' : 'flex flex-col w-full'
          }
        >
          {labelElement}
          <div className={labelPosition === 'left' ? 'flex-1' : 'flex w-full'}>{textareaElement}</div>
        </div>

        {helperText && (
          <p
            className={cn(
              'text-[14px] font-normal leading-[20px] mt-[4px] text-left',
              error ? 'text-[#ef4444]' : 'text-[#64748b]',
              labelPosition === 'left' && 'ml-[128px]'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
