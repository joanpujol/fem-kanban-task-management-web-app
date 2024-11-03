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
      <div className="relative max-w-[350px] font-medium text-sm leading-lg">
          <Input
            className={cn(
              "border-medium-gray/25 rounded-[4px] placeholder:text-black/25",
              error && "border-red"
            )}
            ref={ref}
            placeholder={placeholder}
            {...props}
          />
          {error && (
            <div className="absolute text-red top-[8px] right-[16px]">
              {error}
            </div>
          )}
        </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
