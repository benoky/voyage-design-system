import * as React from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  /**
   * Target container for the portal (default: document.body)
   */
  container?: Element | null;
}

/**
 * Portal component
 * Renders children into a different part of the DOM tree.
 * Works safely in SSR environments.
 *
 * @param children - Elements to render in the portal
 * @param container - Target container (default: document.body)
 * @returns Portal component
 */
const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const [mounted, setMounted] = React.useState(false);
  const [portalContainer, setPortalContainer] = React.useState<Element | null>(null);

  React.useEffect(() => {
    // Only run on client side since document is not available on server
    if (typeof document !== 'undefined') {
      const targetContainer = container || document.body;
      setPortalContainer(targetContainer);
      setMounted(true);
    }

    return () => {
      setMounted(false);
    };
  }, [container]);

  // Return null during SSR or before mounting
  if (!mounted || !portalContainer) {
    return null;
  }

  return createPortal(children, portalContainer);
};

Portal.displayName = 'Portal';

export { Portal };
