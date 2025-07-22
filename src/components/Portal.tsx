import * as React from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  /**
   * 포털 대상 컨테이너 (기본값: document.body)
   */
  container?: Element | null;
}

/**
 * Portal 컴포넌트
 * 자식 요소를 DOM의 다른 위치에 렌더링합니다.
 * SSR 환경에서 안전하게 작동합니다.
 *
 * @param children - 포털로 렌더링할 자식 요소
 * @param container - 포털 대상 컨테이너 (기본값: document.body)
 * @returns Portal 컴포넌트
 */
const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const [mounted, setMounted] = React.useState(false);
  const [portalContainer, setPortalContainer] = React.useState<Element | null>(null);

  React.useEffect(() => {
    // SSR 환경에서는 document가 없으므로 클라이언트에서만 실행
    if (typeof document !== 'undefined') {
      const targetContainer = container || document.body;
      setPortalContainer(targetContainer);
      setMounted(true);
    }

    return () => {
      setMounted(false);
    };
  }, [container]);

  // SSR 중이거나 아직 마운트되지 않은 경우 null 반환
  if (!mounted || !portalContainer) {
    return null;
  }

  return createPortal(children, portalContainer);
};

Portal.displayName = 'Portal';

export { Portal };
