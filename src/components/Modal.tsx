import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';
import { Button } from './Button';

const modalVariants = cva(
  'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px] border border-[#cbd5e1] w-[504px] z-50',
  {
    variants: {
      variant: {
        alert: '',
        confirm: '',
      },
    },
    defaultVariants: {
      variant: 'alert',
    },
  }
);

const overlayVariants = cva('fixed inset-0 bg-black/50 z-40', {
  variants: {
    visible: {
      true: 'opacity-100',
      false: 'opacity-0 pointer-events-none',
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof modalVariants> {
  title: string;
  description: string;
  open: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

/**
 * Modal 컴포넌트 <br>
 * Alert 또는 Confirm 팝업을 표시합니다. <br>
 * variant에 따라 버튼이 하나 또는 두 개가 표시됩니다. <br>
 * @param {string} title - 제목 <br>
 * @param {string} description - 내용 <br>
 * @param {boolean} open - 팝업이 열려있는지 여부 <br>
 * @param {string} cancelText - 취소 버튼 라벨 (confirm에서만 사용) <br>
 * @param {string} confirmText - 확인 버튼 라벨 <br>
 * @param {function} onCancel - 취소 버튼 클릭 시 실행될 함수 (confirm에서만 사용) <br>
 * @param {function} onConfirm - 확인 버튼 클릭 시 실행될 함수 <br>
 * @returns Modal 컴포넌트 <br>
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      variant,
      title,
      description,
      open,
      cancelText = 'Cancel',
      confirmText = 'Continue',
      onCancel,
      onConfirm,
      ...props
    },
    ref
  ) => {
    // 모달이 열리면 body의 스크롤을 막음
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    if (!open) return null;

    return (
      <>
        {/* 백그라운드 오버레이 */}
        <div className={overlayVariants({ visible: open })} />

        {/* 모달 */}
        <div ref={ref} className={cn(modalVariants({ variant, className }))} {...props}>
          {/* 콘텐츠 영역 - UI 디자인에 맞게 패딩 조정 */}
          <div className='p-[20px] text-left'>
            <h2 className='text-[24px] font-semibold text-[#0f172a] leading-[32px] tracking-[-0.144px] mb-[8px]'>
              {title}
            </h2>
            <p className='text-[14px] text-[#64748b] leading-[20px]'>{description}</p>
          </div>

          {/* 버튼 영역 - UI 디자인과 일치하도록 조정 */}
          <div className='px-[20px] py-[16px] border-t border-[#f1f5f9]'>
            <div className='flex justify-end gap-[12px]'>
              {variant === 'confirm' && (
                <Button variant='secondary' onClick={onCancel}>
                  {cancelText}
                </Button>
              )}
              <Button onClick={onConfirm}>{confirmText}</Button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };
