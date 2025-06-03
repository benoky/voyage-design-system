import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const inputVariants = cva(
  'bg-white border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 disabled:opacity-50 disabled:cursor-not-allowed font-normal',
  {
    variants: {
      variant: {
        default: 'border-[#cbd5e1] placeholder-[#94a3b8]',
        error: 'border-[#ef4444] border-1 focus:ring-red-500/20 focus:border-red-500 placeholder-[#94a3b8]',
      },
      inputSize: {
        default: 'w-full max-w-[384px] h-[40px] px-[12px] py-[8px] text-[16px] leading-[24px]',
        sm: 'w-full max-w-[276px] h-[32px] px-[10px] py-[6px] text-[14px] leading-[20px]',
        lg: 'w-full max-w-[450px] h-[48px] px-[14px] py-[10px] text-[18px] leading-[28px]',
        auto: 'w-full h-[36px] px-[12px] py-[8px] text-[14px] leading-[20px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  }
);

type InputVariantsType = VariantProps<typeof inputVariants>;

interface InputPropsType extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  labelLocation?: 'top' | 'left';
  helperText?: string;
  variant?: InputVariantsType['variant'];
  inputSize?: InputVariantsType['inputSize'];
  type?: 'text' | 'password' | 'email' | 'number';
}

/**
 * 입력 컴포넌트 <br>
 * @param {string} className 추가 클래스 이름 <br>
 * @param {string} variant 입력 필드 스타일 변형 <br>
 * @param {string} inputSize 입력 필드 크기 <br>
 * @param {string} label 라벨 텍스트 <br>
 * @param {string} labelLocation 라벨 위치 (top 또는 left) <br>
 * @param {string} helperText 도움말 텍스트 <br>
 * @param {string} type 입력 필드 타입 <br>
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props 입력 필드 속성 <br>
 * @returns 입력 컴포넌트 <br>
 */
const Input = React.forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  const { className, variant, inputSize, label, labelLocation = 'top', helperText, type, ...restProps } = props;

  // 실제 input 타입 계산
  const inputType = type === 'password' ? 'text' : type;

  // variant에 따른 helperText 색상 설정
  const helperTextColorClass = variant === 'error' ? 'text-[#ef4444]' : 'text-[#64748b]';

  // label 스타일 정의 - 공통 스타일과 위치별 추가 스타일
  const labelBaseStyle = 'text-[14px] font-medium text-[#0f172a] leading-[20px]';
  const labelPositionStyle =
    labelLocation === 'left' ? 'min-w-[120px] text-right whitespace-nowrap mr-[8px]' : 'text-left w-full mb-[6px]';

  return (
    <div className='w-full'>
      <div
        className={
          labelLocation === 'left' ? 'flex flex-row items-center flex-wrap sm:flex-nowrap' : 'flex flex-col w-full'
        }
      >
        {label && (
          <label className={cn(labelBaseStyle, labelPositionStyle)} htmlFor={restProps.id}>
            {label}
          </label>
        )}
        <div className={labelLocation === 'left' ? 'flex-1' : 'flex w-full'}>
          <div className='relative w-full'>
            <input
              ref={ref}
              type={inputType}
              className={cn(inputVariants({ variant, inputSize, className }))}
              {...restProps}
            />
          </div>
        </div>
      </div>
      {helperText ? (
        <p
          className={`text-[14px] ${helperTextColorClass} font-normal leading-[20px] mt-[4px] text-left ${
            labelLocation === 'left' ? 'ml-[128px]' : ''
          }`}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
