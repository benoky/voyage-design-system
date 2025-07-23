import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const tabsVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'space-y-2',
      card: 'bg-white rounded-lg border border-gray-200 overflow-hidden',
    },
    size: {
      default: '',
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const tabListVariants = cva(
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 border-b border-gray-200',
        card: 'bg-gray-50 border-b border-gray-200',
        pills: 'bg-gray-100 p-1 rounded-lg',
        underline: 'border-b border-gray-200',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
      },
    },
    defaultVariants: {
      variant: 'default',
      justify: 'start',
    },
  }
);

const tabTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        card: 'data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        pills: 'data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        underline: 'border-b-2 border-transparent data-[state=active]:border-primary rounded-none',
      },
      size: {
        default: 'px-3 py-1.5',
        sm: 'px-2 py-1 text-xs',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof tabsVariants> {
  /**
   * Tab items array
   */
  items: TabItem[];
  /**
   * Active tab key (controlled)
   */
  activeKey?: string;
  /**
   * Default active tab key
   */
  defaultActiveKey?: string;
  /**
   * Tab change handler
   */
  onChange?: (key: string) => void;
  /**
   * Tab list variant
   */
  tabListVariant?: VariantProps<typeof tabListVariants>['variant'];
  /**
   * Tab list justify
   */
  tabListJustify?: VariantProps<typeof tabListVariants>['justify'];
  /**
   * Tab trigger variant
   */
  tabTriggerVariant?: VariantProps<typeof tabTriggerVariants>['variant'];
  /**
   * Tab trigger size
   */
  tabTriggerSize?: VariantProps<typeof tabTriggerVariants>['size'];
}

/**
 * Tabs component
 * A component for organizing content into multiple panels with tab navigation.
 *
 * @param items - Tab items array
 * @param activeKey - Active tab key (controlled)
 * @param defaultActiveKey - Default active tab key
 * @param onChange - Tab change handler
 * @param variant - Tabs variant
 * @param size - Tabs size
 * @param tabListVariant - Tab list variant
 * @param tabListJustify - Tab list justify
 * @param tabTriggerVariant - Tab trigger variant
 * @param tabTriggerSize - Tab trigger size
 * @param className - Additional CSS classes
 * @returns Tabs component
 */
const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  variant,
  size,
  tabListVariant,
  tabListJustify,
  tabTriggerVariant,
  tabTriggerSize,
  className,
  ...props
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
    <div className={cn(tabsVariants({ variant, size }), className)} {...props}>
      {/* Tab list */}
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

      {/* Tab content */}
      <div className='mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
        {activeItem ? activeItem.content : items[0]?.content}
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export { Tabs };
