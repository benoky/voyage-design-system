import * as React from 'react';
import { cn } from '@/utils/styleUtils';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

/**
 * Switch component
 * A slide toggle component for binary choices.
 *
 * @param checked - Switch checked state
 * @param onChange - State change handler
 * @param disabled - Whether the switch is disabled
 * @param className - Additional CSS classes
 * @returns Switch component
 */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, disabled, className, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled) onChange(!checked);
    };

    return (
      <button
        ref={ref}
        type='button'
        className={cn(
          'w-11 h-6 flex items-center rounded-full transition-colors duration-200',
          checked ? 'bg-[#0f172a]' : 'bg-[#e2e8f0]',
          disabled ? 'opacity-40 cursor-not-allowed' : '',
          className
        )}
        aria-pressed={checked}
        aria-disabled={disabled}
        tabIndex={0}
        onClick={handleClick}
        disabled={disabled}
        style={{ minWidth: 44, minHeight: 24 }}
        {...props}
      >
        <span
          className={cn(
            'inline-block rounded-full bg-white shadow transition-transform duration-200',
            'w-5 h-5',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        />
      </button>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
