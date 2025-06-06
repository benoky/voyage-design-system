import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';
import { LucideIcon } from 'lucide-react';

// ContextMenu 스타일링
const contextMenuVariants = cva('bg-white', {
  variants: {
    variant: {
      default: 'w-[224px] rounded-[6px] shadow-[0px_0px_25px_rgba(0,0,0,0.25)]',
      compact: 'w-[180px] rounded-[6px] shadow-[0px_0px_25px_rgba(0,0,0,0.25)]',
      wide: 'w-[260px] rounded-[6px] shadow-[0px_0px_25px_rgba(0,0,0,0.25)]',
    },
    position: { absolute: 'absolute', fixed: 'fixed', inline: 'relative' },
  },
  defaultVariants: { variant: 'default', position: 'absolute' },
});

// MenuItem 인터페이스
export interface MenuItem {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
}

// ContextMenu 인터페이스
interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextMenuVariants> {
  open: boolean;
  title?: string;
  items: MenuItem[] | MenuItem[][];
}

/**
 * ContextMenu 컴포넌트 <br>
 * 드롭다운 메뉴 또는 컨텍스트 메뉴를 표시합니다. <br>
 * @param {boolean} open - 메뉴가 열려있는지 여부 <br>
 * @param {string} title - 메뉴 제목 (선택적) <br>
 * @param {MenuItem[] | MenuItem[][]} items - 메뉴 아이템 배열 또는 메뉴 아이템 배열의 배열 (구분선으로 구분) <br>
 * @returns ContextMenu 컴포넌트 <br>
 */
const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, variant, position, open, title, items, ...props }, ref) => {
    if (!open) return null;

    // 아이템이 2차원 배열인지 확인
    const isItemsNested = Array.isArray(items[0]);

    // 1차원 배열로 변환
    const sections = isItemsNested ? (items as MenuItem[][]) : [items as MenuItem[]];

    return (
      <div ref={ref} className={cn(contextMenuVariants({ variant, position, className }))} {...props}>
        {/* 제목 영역 (제목이 있는 경우) */}
        {title && (
          <>
            <div className='w-full h-[42px]'>
              <div className='mx-[5px] my-[5px] h-[32px]'>
                <div className='px-[8px] py-[6px]'>
                  <p className='text-[14px] font-semibold text-[#334155] leading-[20px]'>{title}</p>
                </div>
              </div>
            </div>
            {/* 구분선 */}
            <div className='w-full h-[1px] bg-[#f1f5f9]'></div>
          </>
        )}

        {/* 섹션별 메뉴 아이템 렌더링 */}
        {sections.map((section, sectionIndex) => (
          <React.Fragment key={`section-${sectionIndex}`}>
            {/* 첫 번째 섹션이 아니고 제목이 있거나 섹션이 여러 개인 경우에만 구분선 추가 */}
            {(sectionIndex > 0 || title) && sectionIndex > 0 && <div className='w-full h-[1px] bg-[#f1f5f9]'></div>}

            {/* 메뉴 아이템 렌더링 */}
            {section.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <div className='w-full h-[42px]' key={`item-${sectionIndex}-${itemIndex}`}>
                  <div className='mx-[5px] my-[5px] h-[32px]'>
                    <button
                      className={cn(
                        'w-full h-full px-[8px] py-[6px] flex items-center rounded-[4px]',
                        item.disabled
                          ? 'opacity-50 cursor-not-allowed text-[#94a3b8]'
                          : 'hover:bg-[#f8fafc] text-[#334155] cursor-pointer'
                      )}
                      onClick={item.disabled ? undefined : item.onClick}
                      disabled={item.disabled}
                    >
                      {Icon && <Icon className='w-[16px] h-[16px] text-[#334155] mr-[8px]' />}
                      <span className='text-[14px] font-medium leading-[20px]'>{item.label}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
