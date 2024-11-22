import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useStore from '@/lib/store/useStore';
import { cn } from '@/lib/utils';

interface BoardPopoverProps {
  popoverContent: React.ReactNode;
  children: React.ReactNode;
}
const BoardPopover: React.FC<BoardPopoverProps> = ({
  popoverContent,
  children,
}) => {
  const isDarkThemeActive = useStore((state) => state.isDarkThemeActive);

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        className={cn(
          'p-[16px] w-[160px] flex flex-col gap-[16px] rounded-[8px] shadow-[0_10px_20px_0_rgba(54,78,126,0.25)] bg-background-secondary',
          {
            dark: isDarkThemeActive,
          }
        )}
      >
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
};

export default BoardPopover;
