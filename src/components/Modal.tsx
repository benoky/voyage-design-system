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

/**
 * Overlay style variants for background dimming effect.
 */
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

/**
 * Props for the Modal component.
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof modalVariants> {
  /** Controls whether the modal is visible */
  open: boolean;
  /** Handler for confirm button click */
  onConfirm?: () => void;
  /** Handler for cancel button click (only for 'confirm' variant) */
  onCancel?: () => void;
  /** Text for the confirm button */
  confirmText?: string;
  /** Text for the cancel button (only for 'confirm' variant) */
  cancelText?: string;
  /** Style variant for the confirm button */
  confirmButtonVariant?: React.ComponentProps<typeof Button>['variant'];
  /** Style variant for the cancel button */
  cancelButtonVariant?: React.ComponentProps<typeof Button>['variant'];
  /** Modal title */
  title: string;
  /** Modal description or content */
  description: React.ReactNode;
}
/**
 * Modal component
 * A reusable dialog component supporting 'alert' and 'confirm' variants.
 *
 * - 'alert': shows only the confirm button.
 * - 'confirm': shows both confirm and cancel buttons.
 *
 * The component uses a Portal to render outside the DOM hierarchy.
 *
 * @param variant - Modal variant type
 * @param open - Whether the modal is open
 * @param onConfirm - Handler for confirm button click
 * @param onCancel - Handler for cancel button click (only used in 'confirm' variant)
 * @param confirmText - Confirm button label
 * @param cancelText- Cancel button label (only for 'confirm' variant)
 * @param confirmButtonVariant - Confirm button style variant
 * @param cancelButtonVariant - Cancel button style variant
 * @param title - Modal title text
 * @param description - Modal description content
 * @param className - Additional className for modal container
 * @returns Rendered Modal element if `open` is true; otherwise null
 */

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((ModalProps: ModalProps, ref) => {
  if (!ModalProps.open) return null;

  return (
    <Portal>
      <div className={overlayVariants({ visible: ModalProps.open })} />
      <div ref={ref} className={cn(modalVariants({ variant: ModalProps.variant }), ModalProps.className)}>
        <div className='p-[20px] text-left'>
          <h2 className='text-[24px] font-semibold text-[#0f172a] leading-[32px] tracking-[-0.144px] mb-[8px]'>
            {ModalProps.title}
          </h2>
          <p className='text-[14px] text-[#64748b] leading-[20px]'>{ModalProps.description}</p>
        </div>
        <div className='px-[20px] py-[16px]'>
          <div className='flex justify-end gap-[12px]'>
            {ModalProps.variant === 'confirm' && (
              <Button variant={ModalProps.cancelButtonVariant} onClick={ModalProps.onCancel}>
                {ModalProps.cancelText}
              </Button>
            )}
            <Button variant={ModalProps.confirmButtonVariant} onClick={ModalProps.onConfirm}>
              {ModalProps.confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
});

Modal.displayName = 'Modal';

export { Modal };
