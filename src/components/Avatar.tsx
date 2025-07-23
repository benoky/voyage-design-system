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
   * Avatar image URL
   */
  src?: string;
  /**
   * Image alt text
   */
  alt?: string;
  /**
   * Fallback text displayed when image is not available (usually initials)
   */
  fallback?: string;
  /**
   * Custom fallback content
   */
  fallbackContent?: React.ReactNode;
  /**
   * Callback function called when image fails to load
   */
  onImageError?: () => void;
}

/**
 * Avatar component
 * Displays user profile images or initials.
 *
 * @param src - Avatar image URL
 * @param alt - Image alt text
 * @param fallback - Fallback text when image is not available
 * @param fallbackContent - Custom fallback content
 * @param size - Avatar size
 * @param shape - Avatar shape (circle or square)
 * @param className - Additional CSS classes
 * @param onImageError - Callback function called when image fails to load
 * @returns Avatar component
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, fallbackContent, size, shape, className, onImageError, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    // Reset error state when src changes
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

    // Generate initials from fallback text
    const getInitials = (text: string) => {
      return text
        .split(' ')
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };

    // Generate fallback background color based on text
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
