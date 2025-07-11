import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const buttonVariants = cva('flex items-center justify-center rounded-[6px] text-[14px] font-medium transition', {
  variants: {
    variant: {
      primary: 'bg-[#0F172A] border-[#0F172A] border-0 text-[#FFFFFF] hover:cursor-pointer',
      secondary: 'bg-[#FFFFFF] text-[#0F172A] border border-[#B2B8BF] hover:cursor-pointer',
      ghost: 'bg-transparent text-[#0F172A] border-0 hover:cursor-pointer',
      disabled: 'bg-slate-300 text-[#64748B] border-0 border-[#E2E8F0]',
    },
    size: {
      default: 'w-[108px] h-[40px]',
      small: 'w-[108px] h-[40px]',
      medium: 'w-[120px] h-[48px]',
      large: 'w-[132px] h-[56px]',
      iconSmall: 'w-[40px] h-[40px]',
      iconMedium: 'w-[70px] h-[70px]',
      icon: 'p-2',
      auto: 'px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

/**
 * 버튼 컴포넌트 <br>
 * @param {string} className 추가 클래스 이름 <br>
 * @param {string} variant 버튼 스타일 변형 <br>
 * @param {string} size 버튼 크기 <br>
 * @param {boolean} isLoading 로딩 상태 여부 <br>
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props 버튼 속성 <br>
 * @returns 버튼 컴포넌트 <br>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, size, isLoading, children, ...restProps } = props;

  return (
    <button
      ref={ref}
      data-slot='button'
      className={cn(buttonVariants({ variant: restProps.disabled ? 'disabled' : variant, size, className }))}
      disabled={isLoading || restProps.disabled}
      {...restProps}
    >
      {isLoading ? (
        <div className='w-5 h-5 border-2 border-t-current border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin'></div>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
