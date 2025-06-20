import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as React from 'react';

/**
 * 클래스 이름을 병합하는 함수
 * @param {ClassValue[]} inputs - 병합할 클래스 이름
 * @returns {string} 병합된 클래스 이름
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * SSR 호환 useLayoutEffect 훅
 * 서버에서는 useEffect를 사용하고, 클라이언트에서는 useLayoutEffect를 사용
 */
export const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * SSR 환경에서 안전하게 window 객체를 사용하는 훅
 * @returns window 객체 또는 undefined
 */
export const useWindow = (): Window | undefined => {
  const [windowObj, setWindowObj] = React.useState<Window | undefined>(
    typeof window !== 'undefined' ? window : undefined
  );

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowObj(window);
    }
  }, []);

  return windowObj;
};
