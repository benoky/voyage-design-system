import * as React from 'react';
import { cn } from '@/utils/styleUtils';
import { Tag } from './Tag';

export interface CardTag {
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  tags?: CardTag[];
  maxTags?: number;
}

/**
 * Card 컴포넌트 <br>
 * @param {string} title - 카드 제목 <br>
 * @param {string} description - 카드 설명 <br>
 * @param {CardTag[]} tags - 카드 하단에 표시될 태그 목록 <br>
 * @param {number} maxTags - 최대로 표시할 태그 개수 (기본값: 3) <br>
 * @returns Card 컴포넌트
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, tags, maxTags = 3, className, ...props }, ref) => {
    // 표시할 태그와 더보기 태그 계산
    const visibleTags = tags ? tags.slice(0, maxTags) : [];
    const hiddenTagsCount = tags ? Math.max(0, tags.length - maxTags) : 0;

    return (
      <div
        ref={ref}
        className={cn(
          'w-[212px] h-[156px] bg-white rounded-[4px] border border-gray-200 shadow-[0px_1px_3px_rgba(0,0,0,0.1)] flex flex-col',
          className
        )}
        {...props}
      >
        <div className="p-4">
          <h3 className="text-[24px] leading-[32px] text-black/87 font-normal mb-0 truncate">{title}</h3>
          {description && (
            <p className="text-[12px] leading-[20px] tracking-[0.4px] text-black/87 mt-0 line-clamp-2 overflow-hidden text-ellipsis">
              {description}
            </p>
          )}
        </div>
        
        <div className="mt-auto">
          {tags && tags.length > 0 && (
            <>
              <div className="w-full h-[1px] bg-black/12"></div>
              <div className="p-2 flex flex-wrap gap-2">
                {visibleTags.map((tag, index) => (
                  <Tag
                    key={index}
                    backgroundColor={tag.backgroundColor || 'rgba(0,0,0,0.08)'}
                    textColor={tag.textColor || 'rgba(0,0,0,0.87)'}
                    autoWidth={true}
                  >
                    {tag.text}
                  </Tag>
                ))}
                
                {hiddenTagsCount > 0 && (
                  <Tag
                    backgroundColor="rgba(0,0,0,0.08)"
                    textColor="rgba(0,0,0,0.87)"
                    autoWidth={true}
                    title={`${hiddenTagsCount}개의 태그가 더 있습니다`}
                  >
                    +{hiddenTagsCount}
                  </Tag>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card }; 