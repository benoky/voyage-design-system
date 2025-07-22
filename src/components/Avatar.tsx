import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center text-white font-medium border border-[#e2e8f0] overflow-hidden bg-[#f1f5f9]',
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        default: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-20 h-20 text-2xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-[6px]',
      },
    },
    defaultVariants: {
      size: 'default',
      shape: 'circle',
    },
  }
);

const avatarImageVariants = cva('w-full h-full object-cover');

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  /**
   * 아바타 이미지 URL
   */
  src?: string;
  /**
   * 이미지 alt 텍스트
   */
  alt?: string;
  /**
   * 이미지가 없을 때 표시할 fallback 텍스트 (보통 이니셜)
   */
  fallback?: string;
  /**
   * 커스텀 fallback 컨텐츠
   */
  fallbackContent?: React.ReactNode;
  /**
   * 이미지 로드 실패 시 호출되는 콜백
   */
  onImageError?: () => void;
}

/**
 * Avatar 컴포넌트
 * 사용자 프로필 이미지나 이니셜을 표시하는 컴포넌트입니다.
 *
 * @param src - 아바타 이미지 URL
 * @param alt - 이미지 alt 텍스트
 * @param fallback - 이미지가 없을 때 표시할 fallback 텍스트
 * @param fallbackContent - 커스텀 fallback 컨텐츠
 * @param size - 아바타 크기
 * @param shape - 아바타 모양 (circle 또는 square)
 * @param className - 추가 CSS 클래스
 * @param onImageError - 이미지 로드 실패 시 호출되는 콜백
 * @returns Avatar 컴포넌트
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, fallbackContent, size, shape, className, onImageError, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    // src가 변경되면 에러 상태 리셋
    React.useEffect(() => {
      setImageError(false);
      setImageLoaded(false);
    }, [src]);

    const handleImageError = () => {
      setImageError(true);
      onImageError?.();
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const showFallback = !src || imageError || !imageLoaded;

    // fallback 텍스트에서 이니셜 생성
    const getInitials = (text: string) => {
      return text
        .split(' ')
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };

    // fallback 배경색 생성 (텍스트 기반)
    const getFallbackColor = (text: string) => {
      const colors = [
        'bg-[#ef4444]', // red
        'bg-[#f97316]', // orange
        'bg-[#eab308]', // yellow
        'bg-[#22c55e]', // green
        'bg-[#06b6d4]', // cyan
        'bg-[#3b82f6]', // blue
        'bg-[#8b5cf6]', // violet
        'bg-[#ec4899]', // pink
      ];

      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
      }

      return colors[Math.abs(hash) % colors.length];
    };

    const fallbackText = fallback || alt || '';
    const fallbackBgColor = fallbackText ? getFallbackColor(fallbackText) : 'bg-[#64748b]';

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape }), showFallback && fallbackBgColor, className)}
        {...props}
      >
        {src && !imageError && (
          <img
            src={src}
            alt={alt}
            className={cn(avatarImageVariants(), !imageLoaded && 'opacity-0')}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}

        {showFallback && (
          <div className='flex items-center justify-center w-full h-full'>
            {fallbackContent || <span className='select-none'>{fallbackText ? getInitials(fallbackText) : '?'}</span>}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
