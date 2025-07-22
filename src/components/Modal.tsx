import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';
import { Portal } from './Portal';

// Placeholder for X icon
const X = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m18 6-12 12' />
    <path d='m6 6 12 12' />
  </svg>
);

const overlayVariants = cva('fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300', {
  variants: {
    blur: {
      none: 'bg-black/50',
      sm: 'bg-black/50 backdrop-blur-sm',
      md: 'bg-black/50 backdrop-blur-md',
      lg: 'bg-black/50 backdrop-blur-lg',
    },
  },
  defaultVariants: {
    blur: 'sm',
  },
});

const modalVariants = cva(
  'relative z-50 grid w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg animate-in fade-in-0 zoom-in-95',
  {
    variants: {
      position: {
        center: 'data-[state=open]:slide-in-from-bottom-2',
        top: 'data-[state=open]:slide-in-from-top-2',
        bottom: 'data-[state=open]:slide-in-from-bottom-2',
      },
    },
    defaultVariants: {
      position: 'center',
    },
  }
);

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants>,
    VariantProps<typeof overlayVariants> {
  /**
   * Whether the modal is open
   */
  open: boolean;
  /**
   * Function to close the modal
   */
  onClose?: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking overlay closes modal
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether ESC key closes modal
   */
  closeOnEscape?: boolean;
  /**
   * Overlay CSS class name
   */
  overlayClassName?: string;
}

/**
 * Modal component
 * A dialog box that appears on top of the main content to display important information or collect user input.
 *
 * @param open - Whether the modal is open
 * @param onClose - Function to close the modal
 * @param title - Modal title
 * @param showCloseButton - Whether to show close button
 * @param position - Modal position
 * @param blur - Background blur effect
 * @param closeOnOverlayClick - Whether clicking overlay closes modal
 * @param closeOnEscape - Whether ESC key closes modal
 * @param className - Additional CSS classes
 * @param overlayClassName - Overlay CSS class name
 * @param children - Modal content
 * @returns Modal component
 */
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  showCloseButton = true,
  position,
  blur,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  overlayClassName,
  children,
  ...props
}) => {
  const [mounted, setMounted] = React.useState(false);

  // SSR compatibility
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ESC key handler (SSR safe)
  React.useEffect(() => {
    if (!open || !closeOnEscape || typeof window === 'undefined') return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Body scroll prevention (SSR safe)
  React.useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;

    if (open) {
      // Save current scroll position
      const scrollY = window.pageYOffset;
      const body = document.body;
      const originalOverflow = body.style.overflow;
      const originalPosition = body.style.position;
      const originalTop = body.style.top;

      // Prevent scrolling
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';

      return () => {
        // Restore original state
        body.style.overflow = originalOverflow;
        body.style.position = originalPosition;
        body.style.top = originalTop;
        body.style.width = '';

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [open, mounted]);

  // Don't render during SSR or when not mounted or when closed
  if (!mounted || !open) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      {/* Overlay */}
      <div
        className={cn(overlayVariants({ blur }), overlayClassName)}
        onClick={handleOverlayClick}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Modal content */}
        <div className={cn(modalVariants({ position }), className)} onClick={e => e.stopPropagation()} {...props}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className='flex items-center justify-between'>
              {title && (
                <h2 id='modal-title' className='text-lg font-semibold'>
                  {title}
                </h2>
              )}
              {showCloseButton && onClose && (
                <button
                  onClick={onClose}
                  className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
                  aria-label='Close modal'
                >
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Close</span>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className='flex-1'>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

Modal.displayName = 'Modal';

export { Modal };
