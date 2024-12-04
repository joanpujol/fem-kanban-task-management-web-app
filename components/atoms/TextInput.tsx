'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value?: string;
  className?: string;
  error?: string;
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md focus:outline-none focus:ring-0 border text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

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
          placeholder={error ? undefined : placeholder}
          value={value}
          type="text"
          {...props}
        />
        {error && !value ? (
          <div className="absolute text-red top-[9px] right-[16px] font-medium text-sm leading-lg">
            {error}
          </div>
        ) : undefined}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
