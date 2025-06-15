import * as React from 'react';
import { cn } from '@/utils/styleUtils';
import { Button } from './Button';
import { X } from 'lucide-react';
import { DEFAULT_WIDTH, HEADER_HEIGHT, MIN_HEIGHT, popupVariants, adjustPopupPosition } from '@/utils/popupUtils';
import { VariantProps } from 'class-variance-authority';

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof popupVariants> {
  open: boolean;
  title?: string;
  onClose?: () => void;
  resizable?: boolean;
  initialWidth?: number;
  initialHeight?: number;
  onResize?: (width: number, height: number) => void;
  draggable?: boolean;
  onMove?: (x: number, y: number) => void;
  initialX?: number;
  initialY?: number;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}


/**
 * Popup 컴포넌트
 * 헤더가 포함된 팝업 컴포넌트입니다. 내용은 children으로 자유롭게 구성할 수 있습니다.
 * @param props - 컴포넌트 속성
 * @returns JSX.Element - 렌더링될 React 컴포넌트
 */
const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      className,
      position,
      open,
      title = 'Popup',
      onClose,
      resizable = false,
      initialWidth,
      initialHeight,
      onResize,
      draggable = true,
      onMove,
      initialX,
      initialY,
      children,
      footer,
      ...props
    },
    ref
  ) => {
    const [dimensions, setDimensions] = React.useState<{ width: number; height: number }>({
      width: initialWidth || DEFAULT_WIDTH,
      height: initialHeight || DEFAULT_WIDTH * 0.75, // 초기 높이가 없으면 너비의 75% 정도로 설정
    });
    const [isResizing, setIsResizing] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
    const [position_, setPosition] = React.useState(() => {
      // initialX와 initialY가 제공되지 않았을 때 중앙 위치 계산
      if (initialX !== undefined && initialY !== undefined) {
        return { x: initialX, y: initialY };
      } else {
        // 초기 팝업 크기로 중앙 위치 계산
        const width = initialWidth || DEFAULT_WIDTH;
        const height = initialHeight || DEFAULT_WIDTH * 0.75;

        if (typeof window !== 'undefined') {
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          return {
            x: Math.max(0, (windowWidth - width) / 2),
            y: Math.max(0, (windowHeight - height) / 2),
          };
        }
        return { x: 0, y: 0 };
      }
    });
    const [minDimensions, setMinDimensions] = React.useState({
      width: initialWidth || DEFAULT_WIDTH,
      height: initialHeight || MIN_HEIGHT,
    });
    const popupRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const animationFrameRef = React.useRef<number | null>(null);
    const currentPositionRef = React.useRef(position_);
    const isInitialMountRef = React.useRef(true);

    // 위치 업데이트 함수: 연속적인 업데이트를 위해 requestAnimationFrame 사용
    const updatePosition = React.useCallback(
      (newPosition: { x: number; y: number }, skipStateUpdate = false) => {
        if (popupRef.current) {
          // DOM 직접 조작으로 부드러운 이동 구현
          popupRef.current.style.left = `${newPosition.x}px`;
          popupRef.current.style.top = `${newPosition.y}px`;
        }

        // 필요한 경우만 상태 업데이트
        if (!skipStateUpdate && animationFrameRef.current === null) {
          animationFrameRef.current = requestAnimationFrame(() => {
            setPosition(newPosition);

            // 콜백 호출
            if (onMove) {
              onMove(newPosition.x, newPosition.y);
            }

            animationFrameRef.current = null;
          });
        }
      },
      [onMove]
    );

    // 초기 상태 설정 - 컴포넌트 마운트 시 한 번만 실행
    React.useEffect(() => {
      if (!open) return;

      // 초기 상태 설정
      if (isInitialMountRef.current) {
        isInitialMountRef.current = false;

        // 초기 위치 설정
        currentPositionRef.current = position_;
        setPosition(currentPositionRef.current);

        // 초기 크기 설정
        if (resizable) {
          setDimensions({
            width: initialWidth || DEFAULT_WIDTH,
            height: initialHeight || DEFAULT_WIDTH * 0.75,
          });
        }
      }
    }, [open, position_, initialWidth, initialHeight, resizable]);

    // 콘텐츠 크기 측정 및 조정 - 콘텐츠나 크기 관련 props가 변경될 때 실행
    React.useEffect(() => {
      if (!open || !popupRef.current || !contentRef.current) return;

      // 초기 렌더링 시에만 기본 크기 계산
      if (isInitialMountRef.current === false) {
        // 콘텐츠의 자연스러운 크기 측정
        const contentHeight = contentRef.current.scrollHeight;
        const naturalHeight = contentHeight + HEADER_HEIGHT / 2; // 여유 공간 추가

        // initialWidth/Height가 있으면 그 값을 최소 크기로 유지
        // 없으면 콘텐츠 크기 또는 최소 높이 중 큰 값으로 설정
        setMinDimensions(() => ({
          width: initialWidth || DEFAULT_WIDTH,
          height: initialHeight || Math.max(naturalHeight, MIN_HEIGHT),
        }));

        // 초기 높이가 지정되지 않았을 때만 콘텐츠 높이로 설정
        if (!initialHeight && resizable) {
          setDimensions(prev => ({
            ...prev,
            height: naturalHeight,
          }));

          // DOM 직접 설정 (부드러운 표시를 위해)
          if (popupRef.current) {
            popupRef.current.style.height = `${naturalHeight}px`;
          }
        }
      }
    }, [open, resizable, initialHeight, initialWidth, title, children]);

    // 위치 조정 - 팝업이 열렸을 때와 뷰포트 크기가 변경될 때 실행
    React.useEffect(() => {
      if (!open || position === 'inline' || !draggable || !popupRef.current) return;

      const handlePopupPosition = () => {
        if (!popupRef.current) return;

        const rect = popupRef.current.getBoundingClientRect();
        const newPosition = adjustPopupPosition(currentPositionRef.current.x, currentPositionRef.current.y, rect.width);

        // 위치가 변경되었을 때만 업데이트
        if (newPosition.x !== currentPositionRef.current.x || newPosition.y !== currentPositionRef.current.y) {
          currentPositionRef.current = newPosition;
          updatePosition(newPosition, true);
        }
      };

      // 초기 위치 조정
      handlePopupPosition();

      // 뷰포트 크기 변경 이벤트 연결
      window.addEventListener('resize', handlePopupPosition);

      return () => {
        window.removeEventListener('resize', handlePopupPosition);
      };
    }, [open, position, draggable, updatePosition]);

    // Popup이 닫힐 때 상태 초기화
    React.useEffect(() => {
      if (!open) {
        // 진행 중인 애니메이션 프레임 취소
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }

        // 다음에 팝업이 열릴 때 초기 마운트 상태로 설정
        isInitialMountRef.current = true;
      }
    }, [open]);

    // 리사이즈 이벤트 핸들러
    React.useEffect(() => {
      if (!resizable) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing || !popupRef.current) return;

        const rect = popupRef.current.getBoundingClientRect();

        // 새 너비와 높이 계산 (최소값은 콘텐츠 기반 최소 크기)
        const newWidth = Math.max(minDimensions.width, e.clientX - rect.left);
        const newHeight = Math.max(minDimensions.height, e.clientY - rect.top);

        // 즉시 DOM 업데이트 (부드러운 리사이징)
        if (popupRef.current) {
          popupRef.current.style.width = `${newWidth}px`;
          popupRef.current.style.height = `${newHeight}px`;
        }

        // 크기 변경 상태 업데이트 (애니메이션 프레임으로 최적화)
        if (animationFrameRef.current === null) {
          animationFrameRef.current = requestAnimationFrame(() => {
            setDimensions({ width: newWidth, height: newHeight });

            // 크기 변경 콜백 호출
            if (onResize) {
              onResize(newWidth, newHeight);
            }

            animationFrameRef.current = null;
          });
        }

        e.preventDefault();
      };

      const handleMouseUp = () => {
        if (isResizing && popupRef.current) {
          // 리사이징이 끝날 때 최종 크기 가져오기
          const finalWidth = popupRef.current.offsetWidth;
          const finalHeight = popupRef.current.offsetHeight;

          // 상태 업데이트
          setDimensions({ width: finalWidth, height: finalHeight });

          // 리사이즈 콜백 호출
          if (onResize) {
            onResize(finalWidth, finalHeight);
          }
        }

        setIsResizing(false);
        document.body.style.cursor = 'default';
      };

      if (isResizing) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'se-resize';
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        if (!isDragging) {
          document.body.style.cursor = 'default';
        }

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    }, [isResizing, resizable, onResize, minDimensions]);

    // 드래그 이벤트 핸들러
    React.useEffect(() => {
      if (!draggable) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !popupRef.current) return;

        // 마우스 위치로부터 새 위치 계산
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // 화면 경계 확인 및 위치 조정
        const rect = popupRef.current.getBoundingClientRect();
        const newPosition = adjustPopupPosition(newX, newY, rect.width);

        // 위치 업데이트 (DOM 직접 조작)
        updatePosition(newPosition, true);

        // 현재 위치 ref 업데이트
        currentPositionRef.current = newPosition;

        e.preventDefault();
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.cursor = 'default';

        // 최종 위치 상태 업데이트 (마우스 업 시에만 반영)
        setPosition(currentPositionRef.current);
        if (onMove) {
          onMove(currentPositionRef.current.x, currentPositionRef.current.y);
        }
      };

      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'move';
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        if (!isResizing) {
          document.body.style.cursor = 'default';
        }

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    }, [isDragging, draggable, dragOffset, updatePosition, onMove]);

    // 컴포넌트 언마운트 시 애니메이션 프레임 정리
    React.useEffect(() => {
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    }, []);

    if (!open) return null;

    const handleResizeStart = (e: React.MouseEvent) => {
      setIsResizing(true);
      e.preventDefault();
    };

    const handleDragStart = (e: React.MouseEvent) => {
      if (!draggable || !popupRef.current) return;

      const rect = popupRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      setIsDragging(true);
      e.preventDefault();
    };

    return (
      <div
        ref={node => {
          // ref를 popupRef와 외부에서 제공된 ref 모두에 연결
          popupRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          popupVariants({ position, className }),
          !resizable && !initialWidth && 'w-auto', // 리사이즈 불가능하고 초기 너비가 없으면 자동 너비
          !resizable && initialWidth && `w-[${initialWidth}px]`, // 리사이즈 불가능하고 초기 너비가 있으면 고정 너비
          'will-change-transform', // GPU 가속 힌트
          'transition-[opacity] duration-200' // 부드러운 등장 효과
        )}
        style={{
          zIndex: 50,
          // 기본 최소 너비/높이 설정
          minWidth: `${DEFAULT_WIDTH}px`,
          minHeight: `${MIN_HEIGHT}px`,
          // 너비 설정
          width: `${dimensions.width}px`,
          // 높이 설정 (항상 숫자로 처리)
          height: `${dimensions.height}px`,
          // 위치 스타일 적용
          position: position === 'inline' ? 'relative' : position || 'absolute',
          overflow: 'hidden',
          ...(draggable &&
            position !== 'inline' && {
              left: `${position_.x}px`,
              top: `${position_.y}px`,
              touchAction: 'none', // 터치 장치 드래그 개선
            }),
        }}
        {...props}
      >
        <div className='box-border h-full min-h-[0px] flex flex-col overflow-hidden' ref={contentRef}>
          {/* 헤더 영역 - 고정 */}
          <div
            ref={headerRef}
            className={cn(
              'mx-[20px] my-[20px] flex justify-between items-center flex-shrink-0',
              isDragging && 'cursor-move'
            )}
            onMouseDown={handleDragStart}
            style={{
              cursor: isDragging ? 'move' : 'default',
            }}
          >
            <div>
              <h2 className='text-[24px] font-semibold text-[#0f172a] leading-[32px] tracking-[-0.144px]'>{title}</h2>
            </div>
            <Button
              variant='secondary'
              size='icon'
              onClick={onClose}
              onMouseDown={e => e.stopPropagation()} // 버튼 클릭 시 드래그가 시작되지 않도록 함
            >
              <X />
            </Button>
          </div>

          {/* 콘텐츠 영역 - 사용자 정의 */}
          <div className='px-[20px] flex-1 overflow-auto min-h-0'>{children}</div>

          {/* 푸터 영역 - 버튼들이 위치할 고정 영역 */}
          {footer && (
            <div className='px-[20px] py-[16px] border-t border-[#f1f5f9] flex-shrink-0 bg-white'>
              {footer}
            </div>
          )}
        </div>

        {/* 리사이즈 핸들 - 빗금 모양 */}
        {resizable && (
          <div
            className='absolute bottom-0 right-0 w-[20px] h-[20px] cursor-se-resize z-10 overflow-hidden hover:bg-gray-100'
            onMouseDown={handleResizeStart}
            aria-label='Resize handle'
            role='button'
            tabIndex={0}
          >
            {/* 빗금 모양 생성 (세 개의 작은 선) */}
            <div className='absolute bottom-[12px] right-[4px] w-[8px] h-[1.5px] bg-[#64748b] transform rotate-[-45deg]'></div>
            <div className='absolute bottom-[8px] right-[6px] w-[10px] h-[1.5px] bg-[#64748b] transform rotate-[-45deg]'></div>
            <div className='absolute bottom-[4px] right-[8px] w-[12px] h-[1.5px] bg-[#64748b] transform rotate-[-45deg]'></div>
          </div>
        )}
      </div>
    );
  }
);

Popup.displayName = 'Popup';

export {Popup};
