import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const tabsVariants = cva('', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-[#e2e8f0] rounded-[6px]',
    },
    size: {
      default: '',
      compact: 'text-xs',
      large: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const tabListVariants = cva('flex', {
  variants: {
    variant: {
      default: 'border-b border-[#e2e8f0]',
      pills: 'gap-1 p-1 bg-[#f1f5f9] rounded-[6px]',
      cards: 'gap-2',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    variant: 'default',
    justify: 'start',
  },
});

const tabTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e3aba] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'px-4 py-2 border-b-2 border-transparent text-[#64748b] hover:text-[#0f172a] data-[state=active]:border-[#4e3aba] data-[state=active]:text-[#4e3aba]',
        pills:
          'px-3 py-1.5 rounded-md text-[#64748b] hover:bg-white hover:text-[#0f172a] data-[state=active]:bg-white data-[state=active]:text-[#0f172a] data-[state=active]:shadow-sm',
        cards:
          'px-4 py-2 border border-[#e2e8f0] rounded-t-[6px] bg-[#f8fafc] text-[#64748b] hover:bg-white hover:text-[#0f172a] data-[state=active]:bg-white data-[state=active]:text-[#0f172a] data-[state=active]:border-b-white data-[state=active]:relative data-[state=active]:z-10',
      },
      size: {
        default: '',
        sm: 'text-xs px-2 py-1',
        lg: 'text-base px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type TabsVariantsType = VariantProps<typeof tabsVariants>;
type TabListVariantsType = VariantProps<typeof tabListVariants>;
type TabTriggerVariantsType = VariantProps<typeof tabTriggerVariants>;

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  content: React.ReactNode;
}

export interface TabsProps extends TabsVariantsType {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  className?: string;
  tabListVariant?: TabListVariantsType['variant'];
  tabListJustify?: TabListVariantsType['justify'];
  tabTriggerVariant?: TabTriggerVariantsType['variant'];
  tabTriggerSize?: TabTriggerVariantsType['size'];
  contentClassName?: string;
  destroyInactiveTabPane?: boolean;
}

/**
 * 탭 컴포넌트 <br>
 * @param {TabItem[]} items 탭 아이템 배열 <br>
 * @param {string} defaultActiveKey 기본 활성 탭 키 <br>
 * @param {string} activeKey 제어되는 활성 탭 키 <br>
 * @param {(key: string) => void} onChange 탭 변경 콜백 <br>
 * @param {string} variant 탭 컨테이너 변형 <br>
 * @param {string} size 탭 크기 <br>
 * @param {string} tabListVariant 탭 리스트 변형 <br>
 * @param {string} tabListJustify 탭 리스트 정렬 <br>
 * @param {string} tabTriggerVariant 탭 버튼 변형 <br>
 * @param {string} tabTriggerSize 탭 버튼 크기 <br>
 * @param {string} contentClassName 콘텐츠 영역 클래스 <br>
 * @param {boolean} destroyInactiveTabPane 비활성 탭 콘텐츠 제거 여부 <br>
 * @returns 탭 컴포넌트 <br>
 */
const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  activeKey,
  onChange,
  variant,
  size,
  className,
  tabListVariant = 'default',
  tabListJustify = 'start',
  tabTriggerVariant = 'default',
  tabTriggerSize = 'default',
  contentClassName,
  destroyInactiveTabPane = false,
}) => {
  const [internalActiveKey, setInternalActiveKey] = React.useState(
    activeKey || defaultActiveKey || (items.length > 0 ? items[0].key : '')
  );

  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey;

  const handleTabChange = React.useCallback(
    (key: string) => {
      if (activeKey === undefined) {
        setInternalActiveKey(key);
      }
      onChange?.(key);
    },
    [activeKey, onChange]
  );

  const activeItem = React.useMemo(() => items.find(item => item.key === currentActiveKey), [items, currentActiveKey]);

  return (
    <div className={cn(tabsVariants({ variant, size }), className)}>
      {/* 탭 리스트 */}
      <div className={cn(tabListVariants({ variant: tabListVariant, justify: tabListJustify }))}>
        {items.map(item => (
          <button
            key={item.key}
            className={cn(tabTriggerVariants({ variant: tabTriggerVariant, size: tabTriggerSize }))}
            data-state={currentActiveKey === item.key ? 'active' : 'inactive'}
            disabled={item.disabled}
            onClick={() => !item.disabled && handleTabChange(item.key)}
          >
            <div className='flex items-center gap-2'>
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className='inline-flex items-center justify-center min-w-[16px] h-4 px-1 text-xs font-medium bg-[#4e3aba] text-white rounded-full'>
                  {item.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className={cn('mt-4', contentClassName)}>
        {destroyInactiveTabPane
          ? activeItem?.content
          : items.map(item => (
              <div key={item.key} className={currentActiveKey === item.key ? 'block' : 'hidden'}>
                {item.content}
              </div>
            ))}
      </div>
    </div>
  );
};

export { Tabs };
