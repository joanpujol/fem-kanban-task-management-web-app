'use client';

import React from 'react';
import Text from '@/components/atoms/Text';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';

interface CheckboxWithTextProps {
  id?: string;
  label: string;
  isCompleted: boolean;
  onCheckboxChange?: () => void;
  className?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-[2px] disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        transform="translate(0, 1)"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.27588 3.06593L4.03234 5.82239L9.03234 0.822388"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CheckboxWithText = ({
  id = 'checkbox',
  label,
  isCompleted,
  onCheckboxChange,
  className,
}: CheckboxWithTextProps): JSX.Element => {
  return (
    <div
      onClick={onCheckboxChange}
      className={cn(
        'flex space-x-[16px] bg-background-pure hover:bg-main/25 p-[12px] rounded-[4px] max-w-[350px] cursor-pointer',
        className
      )}
    >
      <Checkbox
        id={id}
        checked={isCompleted}
        className="w-[16px] h-[16px] border border-medium-gray/25 data-[state=checked]:border-main data-[state=checked]:bg-main bg-background-soft rounded-[2px]"
      />
      <label
        htmlFor={id}
        className="cursor-pointer"
        onClick={(e) => e.preventDefault()}
      >
        <Text variant={isCompleted ? 'strikethrough' : 'bold'}>{label}</Text>
      </label>
    </div>
  );
};

export default CheckboxWithText;
