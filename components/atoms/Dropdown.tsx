'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useStore from '@/lib/store/useStore';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: SelectOption[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select an option',
  onValueChange,
  defaultValue,
  disabled = false,
}) => {
  const isDarkThemeActive = useStore((state) => state.isDarkThemeActive);

  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger className="focus:outline-none focus:ring-0 bg-background-soft hover:border-main border border-medium-gray/25 text-contrast-pure data-[state=open]:border-main rounded-[4px] px-[16px] font-medium text-sm leading-lg ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className={cn('rounded-[8px] bg-background-pure', {
          dark: isDarkThemeActive,
        })}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer px-[16px] h-[40px] rounded-[8px] py-[8px] focus:text-contrast-pure bg-background-secondary text-sm leading-lg text-medium-gray"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
