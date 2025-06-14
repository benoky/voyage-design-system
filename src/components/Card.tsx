import * as React from 'react';
import { cn } from '@/utils/styleUtils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

/**
 * Card 컴포넌트 <br>
 * @param {string} title - 카드 제목 <br>
 * @param {string} description - 카드 설명 <br>
 * @param {React.ReactNode} footer - 카드 하단에 표시될 콘텐츠 (태그, 버튼 등) <br>
 * @returns Card 컴포넌트
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, footer, className, ...props }, ref) => {

    return (
      <div
        ref={ref}
        className={cn(
          'w-[212px] h-[156px] bg-white rounded-[4px] border border-gray-200 shadow-[0px_1px_3px_rgba(0,0,0,0.1)] flex flex-col',
          className
        )}
        {...props}
      >
        <div className="p-4 flex-1">
          <h3 className="text-[24px] leading-[32px] text-black/87 font-normal mb-0 truncate">{title}</h3>
          {description && (
            <p className="text-[12px] leading-[20px] tracking-[0.4px] text-black/87 mt-0 line-clamp-2 overflow-hidden text-ellipsis">
              {description}
            </p>
          )}
        </div>
        
        {footer && (
          <div className="mt-auto">
            <div className="w-full h-[1px] bg-black/12"></div>
            <div className="p-2">
              {footer}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card }; 