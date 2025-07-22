import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/styleUtils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[6px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#0f172a] text-white hover:bg-[#1e293b]',
        destructive: 'bg-[#ef4444] text-white hover:bg-[#dc2626]',
        outline: 'border border-[#cbd5e1] bg-white hover:bg-[#f1f5f9] hover:text-[#0f172a]',
        secondary: 'bg-[#f1f5f9] text-[#0f172a] hover:bg-[#e2e8f0]',
        ghost: 'hover:bg-[#f1f5f9] hover:text-[#0f172a]',
        link: 'text-[#0f172a] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-[6px] px-3',
        lg: 'h-11 rounded-[6px] px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether the button should display as a link
   */
  asChild?: boolean;
}

/**
 * Button component
 * A clickable button element with various styling options.
 *
 * @param variant - Button style variant
 * @param size - Button size
 * @param asChild - Whether the button should display as a link
 * @param className - Additional CSS classes
 * @param children - Button content
 * @returns Button component
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
