import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, error, ...props }, ref) => {
    return (
      <div className="flex flex-col relative gap-1">
        {label && <label htmlFor={props.id}>{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              'h-10 w-[100%] pl-10 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-opacity-50 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
              error ? 'border-red-500' : '',
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
