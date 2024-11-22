'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

interface BoardTextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  placeholder?: string;
  className?: string;
  error?: string;
}

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
