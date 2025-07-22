import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const skeletonVariants = cva('animate-pulse bg-[#f1f5f9] rounded', {
  variants: {
    variant: {
      default: 'rounded',
      circle: 'rounded-full',
      rect: 'rounded-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton component
 * A placeholder component to show during data loading.
 *
 * @param width - Skeleton width
 * @param height - Skeleton height
 * @param variant - Skeleton shape (default, circle, rect)
 * @param className - Additional CSS classes
 * @returns Skeleton component
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    // Add width and height to style
    const combinedStyle: React.CSSProperties = {
      ...style,
      width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : '100%',
      height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : '16px',
    };

    return <div className={cn(skeletonVariants({ variant }), className)} ref={ref} style={combinedStyle} {...props} />;
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
