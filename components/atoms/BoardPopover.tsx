import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface BoardPopoverProps {
  popoverContent: React.ReactNode;
  children: React.ReactNode;
}
const BoardPopover: React.FC<BoardPopoverProps> = ({
  popoverContent,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-[16px] w-[160px] flex flex-col gap-[16px] rounded-[8px] shadow-[0_10px_20px_0_rgba(54,78,126,0.25)]">
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
};

export default BoardPopover;
