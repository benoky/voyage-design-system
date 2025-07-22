import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/utils/styleUtils';
import { Portal } from './Portal';

const modalVariants = cva(
  'fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      position: {
        center: 'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border',
        top: 'top-0 left-0 right-0 rounded-b-lg border-b border-l border-r',
        bottom: 'bottom-0 left-0 right-0 rounded-t-lg border-t border-l border-r',
        left: 'left-0 top-0 bottom-0 rounded-r-lg border-t border-r border-b',
        right: 'right-0 top-0 bottom-0 rounded-l-lg border-t border-l border-b',
      },
    },
    defaultVariants: {
      position: 'center',
    },
  }
);

const overlayVariants = cva('fixed inset-0 bg-black/50 z-40', {
  variants: {
    blur: {
      none: '',
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
    },
  },
  defaultVariants: {
    blur: 'sm',
  },
});

export interface ModalProps extends VariantProps<typeof modalVariants>, VariantProps<typeof overlayVariants> {
  /**
   * 모달 열림/닫힘 상태
   */
  open: boolean;
  /**
   * 모달 닫기 콜백
   */
  onClose?: () => void;
  /**
   * 모달 제목
   */
  title?: string;
  /**
   * 모달 내용
   */
  children: React.ReactNode;
  /**
   * 오버레이 클릭 시 모달 닫기 여부
   */
  closeOnOverlayClick?: boolean;
  /**
   * ESC 키로 모달 닫기 여부
   */
  closeOnEscape?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 오버레이 CSS 클래스
   */
  overlayClassName?: string;
}

/**
 * Modal 컴포넌트
 * 화면 위에 오버레이와 함께 표시되는 모달 다이얼로그입니다.
 * SSR 환경에서 안전하게 작동합니다.
 *
 * @param open - 모달 열림/닫힘 상태
 * @param onClose - 모달 닫기 콜백
 * @param title - 모달 제목
 * @param children - 모달 내용
 * @param position - 모달 위치
 * @param blur - 오버레이 블러 효과
 * @param closeOnOverlayClick - 오버레이 클릭 시 모달 닫기 여부
 * @param closeOnEscape - ESC 키로 모달 닫기 여부
 * @param className - 추가 CSS 클래스
 * @param overlayClassName - 오버레이 CSS 클래스
 * @returns Modal 컴포넌트
 */
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  position,
  blur,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  overlayClassName,
}) => {
  const [mounted, setMounted] = React.useState(false);

  // SSR 호환성을 위한 마운트 상태 관리
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ESC 키 이벤트 처리 (SSR 호환)
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

  // 바디 스크롤 방지 (SSR 호환)
  React.useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;

    if (open) {
      // 현재 스크롤 위치 저장
      const scrollY = window.pageYOffset;
      const body = document.body;
      const originalOverflow = body.style.overflow;
      const originalPosition = body.style.position;
      const originalTop = body.style.top;

      // 스크롤 방지
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';

      return () => {
        // 원래 상태 복원
        body.style.overflow = originalOverflow;
        body.style.position = originalPosition;
        body.style.top = originalTop;
        body.style.width = '';

        // 스크롤 위치 복원
        window.scrollTo(0, scrollY);
      };
    }
  }, [open, mounted]);

  // SSR 중이거나 아직 마운트되지 않았거나 모달이 닫혀있으면 렌더링하지 않음
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
      {/* 오버레이 */}
      <div
        className={cn(overlayVariants({ blur }), overlayClassName)}
        onClick={handleOverlayClick}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* 모달 콘텐츠 */}
        <div className={cn(modalVariants({ position }), className)} onClick={e => e.stopPropagation()}>
          {title && (
            <div className='flex items-center justify-between mb-4'>
              <h2 id='modal-title' className='text-lg font-semibold'>
                {title}
              </h2>
              {onClose && (
                <button
                  onClick={onClose}
                  className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
                  aria-label='모달 닫기'
                >
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Close</span>
                </button>
              )}
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

Modal.displayName = 'Modal';

export { Modal };
