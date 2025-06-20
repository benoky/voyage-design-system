import * as React from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  container?: Element | DocumentFragment;
  enabled?: boolean;
}

/**
 * SSR 호환 Portal 컴포넌트
 * 서버에서는 children을 그대로 렌더링하고, 클라이언트에서는 Portal을 사용
 * @param children - 포털로 전달할 컴포넌트
 * @param container - 포털 대상 컨테이너 (기본값: document.body)
 * @param enabled - 포털 사용 여부 (기본값: true)
 * @returns Portal 컴포넌트
 */
const Portal = (props: PortalProps) => {
  const { children, container, enabled = true } = props;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // SSR에서는 포털을 사용하지 않고 그대로 렌더링
  if (!mounted || !enabled || typeof window === 'undefined') {
    return <>{children}</>;
  }

  // 클라이언트에서는 포털 사용
  const portalContainer = container || document.body;
  return createPortal(children, portalContainer);
};

Portal.displayName = 'Portal';

export { Portal }; 