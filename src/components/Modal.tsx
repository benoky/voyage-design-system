import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';
import { Portal } from './Portal';
import { Button } from './Button';

const modalVariants = cva(
  'relative z-50 w-full max-w-lg border border-border bg-white shadow-lg duration-200 sm:rounded-lg animate-in fade-in-0 zoom-in-95',
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

const overlayVariants = cva('fixed inset-0 z-40 bg-black/50 transition-opacity', {
  variants: {
    visible: {
      true: 'opacity-100 pointer-events-auto',
      false: 'opacity-0 pointer-events-none',
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof modalVariants> {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  title: string;
  description: React.ReactNode;
}

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
    return (
      <Portal>
        {/* background overlay */}
        <div className={overlayVariants({ visible: open })} />

        {/* Modal */}
        <div ref={ref} className={cn(modalVariants({ variant, className }))} {...props}>
          {/* content area */}
          <div className='p-[20px] text-left'>
            <h2 className='text-[24px] font-semibold text-[#0f172a] leading-[32px] tracking-[-0.144px] mb-[8px]'>
              {title}
            </h2>
            <p className='text-[14px] text-[#64748b] leading-[20px]'>{description}</p>
          </div>

          {/* button area */}
          <div className='px-[20px] py-[16px] border-t border-[#f1f5f9]'>
            <div className='flex justify-end gap-[12px]'>
              {variant === 'confirm' && (
                <Button variant='outline' onClick={onCancel}>
                  {cancelText}
                </Button>
              )}
              <Button onClick={onConfirm}>{confirmText}</Button>
            </div>
          </div>
        </div>
      </Portal>
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };
