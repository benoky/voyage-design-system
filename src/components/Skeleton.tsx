import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

// 스켈레톤 스타일링
const skeletonVariants = cva('animate-pulse bg-gray-200 rounded-md', {
  variants: {
    variant: {
      default: '',
      circle: 'rounded-full',
      rect: 'rounded-md',
    },
  },
  defaultVariants: { variant: 'default' },
});

// Skeleton Props 인터페이스
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

/**
 * 스켈레톤 로딩 컴포넌트 <br>
 * 데이터 로딩 중에 보여줄 플레이스홀더 컴포넌트입니다. <br>
 * @param {string | number} width - 스켈레톤 너비 <br>
 * @param {string | number} height - 스켈레톤 높이 <br>
 * @param {string} variant - 스켈레톤 형태 (default, circle, rect) <br>
 * @returns 스켈레톤 컴포넌트 <br>
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    // 너비와 높이를 스타일에 추가
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
