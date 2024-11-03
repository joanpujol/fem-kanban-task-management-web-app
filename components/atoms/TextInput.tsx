"use client"

import React from 'react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ placeholder, error, ...props }, ref) => {
    return (
      <div className="relative max-w-[350px]">
          <Input
            className={cn(
              "border-medium-gray/25 px-[16px] rounded-[4px] placeholder:text-black/25 font-medium text-sm leading-lg",
              error && "border-red"
            )}
            ref={ref}
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

TextInput.displayName = "TextInput";

export default TextInput;
