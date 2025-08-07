import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const cardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm', {
  variants: {
    variant: {
      default: 'bg-white border-[#e5e7eb]',
      outline: 'border-2 border-[#e5e7eb]',
      ghost: 'border-transparent shadow-none',
      clickable: 'bg-white border-[#e5e7eb] cursor-pointer hover:shadow-md transition-shadow',
    },
    size: {
      default: 'p-6',
      sm: 'p-4',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card description
   */
  description?: string;
  /**
   * Header content
   */
  header?: React.ReactNode;
  /**
   * Footer content
   */
  footer?: React.ReactNode;
}

/**
 * Card component
 * A container component for grouping related content.
 *
 * @param variant - Card style variant
 * @param size - Card padding size
 * @param title - Card title
 * @param description - Card description
 * @param header - Header content
 * @param footer - Footer content
 * @param className - Additional CSS classes
 * @param children - Card content
 * @returns Card component
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, title, description, header, footer, children, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, size }), className)} {...props}>
      {/* Header */}
      {(header || title || description) && (
        <div className='mb-4'>
          {header}
          {title && <h3 className='text-2xl font-semibold leading-none tracking-tight'>{title}</h3>}
          {description && <p className='text-sm text-muted-foreground mt-1'>{description}</p>}
        </div>
      )}

      {/* Content */}
      {children}

      {/* Footer */}
      {footer && <div className='mt-4 pt-4 border-t border-border'>{footer}</div>}
    </div>
  )
);

Card.displayName = 'Card';

export { Card };
