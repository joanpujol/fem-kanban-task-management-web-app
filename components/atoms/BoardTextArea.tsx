'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BoardTextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  placeholder?: string;
  className?: string;
  error?: string;
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

const BoardTextArea = React.forwardRef<HTMLTextAreaElement, BoardTextAreaProps>(
  ({ value, placeholder, className, error, ...props }, ref) => {
    return (
      <div className={cn('relative max-w-[350px]', className)}>
        <Textarea
          className={cn(
            'min-h-[112px] border-medium-gray/25 px-[16px] hover:border-main focus:border-main bg-background-soft text-contrast-pure rounded-[4px] placeholder:text-contrast-pure/25 font-medium text-sm leading-lg',
            error && 'border-red'
          )}
          ref={ref}
          value={value}
          placeholder={placeholder}
          {...props}
        />
        {error && (
          <div className="absolute text-red top-[8px] right-[16px] font-medium text-sm leading-lg">
            {error}
          </div>
        )}
      </div>
    );
  }
);

BoardTextArea.displayName = 'BoardTextArea';

export default BoardTextArea;
