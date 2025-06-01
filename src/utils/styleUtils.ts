import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스 이름을 병합하는 함수
 * @param {ClassValue[]} inputs - 병합할 클래스 이름
 * @returns {string} 병합된 클래스 이름
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
