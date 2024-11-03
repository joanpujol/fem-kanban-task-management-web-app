"use client"

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: SelectOption[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select an option",
  onValueChange,
  defaultValue,
  disabled = false,
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger className="focus:outline-none focus:ring-0 data-[state=open]:border-purple max-w-[350px] rounded-[4px] px-[16px] font-medium text-sm leading-lg ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-[8px]">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="cursor-pointer px-[16px] h-[40px] rounded-[8px] py-[8px] focus:bg-purple/25 focus:text-black font-medium text-sm leading-lg text-medium-gray">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
