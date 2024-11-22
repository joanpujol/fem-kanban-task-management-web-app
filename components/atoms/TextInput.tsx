'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value?: string;
  className?: string;
  error?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ placeholder, value, className, error, ...props }, ref) => {
    return (
      <div className={cn('relative max-w-[350px]', className)}>
        <Input
          className={cn(
            'border-medium-gray/25 px-[16px] hover:border-main focus:border-main bg-background-soft text-contrast-pure rounded-[4px] placeholder:text-contrast-pure/25 font-medium text-sm leading-lg',
            error && 'border-red'
          )}
          ref={ref}
          placeholder={placeholder}
          value={value}
          type="text"
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

TextInput.displayName = 'TextInput';

export default TextInput;
