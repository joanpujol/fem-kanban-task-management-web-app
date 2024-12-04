import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import useBreakpoint from '@/lib/useBreakpoint';
import useStore from '@/lib/store/useStore';
import { cn } from '@/lib/utils';

interface BoardPopoverProps {
  popoverContent: React.ReactNode;
  children: React.ReactNode;
}

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', ...props }, ref) => {
  const isTablet = useBreakpoint('md');

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={isTablet ? 24 : 16}
        avoidCollisions={true}
        collisionPadding={isTablet ? 24 : 16}
        className={cn(
          'z-50 w-72 rounded-md p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

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
          'p-[16px] w-[160px] flex flex-col gap-[16px] rounded-[8px] shadow-[0_10px_20px_0_rgba(54,78,126,0.25)] bg-background-secondary cursor-pointer',
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
