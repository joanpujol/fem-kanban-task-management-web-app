"use client"

import React, { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import Text from "@/components/atoms/Text";

interface CheckboxWithTextProps {
  id?: string;
  label: string;
}

const CheckboxWithText = ({ id = 'checkbox', label }: CheckboxWithTextProps): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  }

  return (
    <div
      onClick={handleChange}
      className="flex space-x-[16px] bg-light-gray hover:bg-purple/25 p-[12px] rounded-[4px] max-w-[350px] cursor-pointer">
      <Checkbox 
        id={id}
        checked={checked}
        className='w-[16px] h-[16px] border-medium-gray/24 data-[state=checked]:border-purple data-[state=checked]:bg-purple bg-white rounded-[2px]'
      />
      <label 
        htmlFor={id}
        className="cursor-pointer"
        onClick={(e) => e.preventDefault()}
      >
        <Text variant={checked ? "strikethrough" : "bold"}>{label}</Text>
      </label>
    </div>
  )
}

export default CheckboxWithText
