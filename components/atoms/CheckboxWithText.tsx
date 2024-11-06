"use client"

import React from 'react';
import { Checkbox } from '../ui/checkbox';
import Text from "@/components/atoms/Text";
import { cn } from '@/lib/utils';

interface CheckboxWithTextProps {
  id?: string;
  label: string;
  isCompleted: boolean;
  onCheckboxChange?: () => void;
  className?: string;
}

const CheckboxWithText = ({ id = 'checkbox', label, isCompleted, onCheckboxChange, className }: CheckboxWithTextProps): JSX.Element => {
  return (
    <div
      onClick={onCheckboxChange}
      className={
        cn(
          "flex space-x-[16px] bg-light-gray hover:bg-purple/25 p-[12px] rounded-[4px] max-w-[350px] cursor-pointer",
          className
        )
      }>
      <Checkbox 
        id={id}
        checked={isCompleted}
        className='w-[16px] h-[16px] border-medium-gray/24 data-[state=checked]:border-purple data-[state=checked]:bg-purple bg-white rounded-[2px]'
      />
      <label 
        htmlFor={id}
        className="cursor-pointer"
        onClick={(e) => e.preventDefault()}
      >
        <Text variant={isCompleted ? "strikethrough" : "bold"}>{label}</Text>
      </label>
    </div>
  )
}

export default CheckboxWithText
