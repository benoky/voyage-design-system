import * as React from 'react';
import { cn } from '@/utils/styleUtils';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  autoWidth?: boolean;
  minWidth?: string;
  width?: string;
}

/**
 * Tag 컴포넌트 <br>
 * @param {ReactNode} children - 태그에 표시될 텍스트 <br>
 * @param {string} backgroundColor - 태그 배경색 <br>
 * @param {string} textColor - 태그 텍스트 색상 <br>
 * @param {boolean} autoWidth - 태그의 너비를 자동으로 조정할지 여부 <br>
 * @param {string} minWidth - 태그의 최소 너비 (autoWidth가 true일 때 유효) <br>
 * @param {string} width - 태그의 고정 너비 (autoWidth가 false일 때 유효) <br>
 * @returns Tag 컴포넌트
 */
const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      backgroundColor = '#e8e8e8',
      textColor = '#64748b',
      autoWidth = false,
      minWidth = '52px',
      width = '52px',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'h-[21px] rounded-[8px] flex items-center justify-center',
          autoWidth ? 'min-w-[--min-width] w-fit px-[4px]' : 'w-[--width]',
          className
        )}
        style={
          {
            backgroundColor,
            '--min-width': minWidth,
            '--width': width,
          } as React.CSSProperties
        }
        {...props}
      >
        <span
          className='text-[9px] leading-[20px] flex items-center justify-center py-[3.5px] px-[4px]'
          style={{ color: textColor }}
        >
          {children}
        </span>
      </div>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag };
