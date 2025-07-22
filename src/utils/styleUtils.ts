import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as React from 'react';

/**
 * Combines class names using clsx and merges Tailwind CSS classes
 * @param inputs - Class values to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * SSR-safe layout effect hook
 * Uses useLayoutEffect on client side and useEffect on server side
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * SSR-safe window object access hook
 * Returns window object on client side, null on server side
 * @returns Window object or null
 */
export function useWindow(): Window | null {
  const [windowObj, setWindowObj] = React.useState<Window | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowObj(window);
    }
  }, []);

  return windowObj;
}
