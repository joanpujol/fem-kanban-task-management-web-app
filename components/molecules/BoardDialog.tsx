import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import useStore from '@/lib/store/useStore';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogDescription } from '@radix-ui/react-dialog';

interface BoardDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseDialog: () => void;
  children: React.ReactElement;
  dialogTitle: string;
  dialogDescription?: string;
}

const BoardDialog: React.FC<BoardDialogProps> = ({
  open,
  onOpenChange,
  handleCloseDialog,
  children,
  dialogTitle,
  dialogDescription,
}) => {
  const isDarkThemeActive = useStore((state) => state.isDarkThemeActive);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <VisuallyHidden>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogDescription>{dialogDescription}</DialogDescription>
      </VisuallyHidden>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          'rounded-[6px] max-w-[min(calc(100%-32px),480px)] focus:outline-none p-[24px] pb-[32px] md:p-[32px] bg-background-soft max-h-[70vh] overflow-y-auto',
          {
            dark: isDarkThemeActive,
          }
        )}
      >
        {React.cloneElement(children, {
          closeDialog: handleCloseDialog,
        })}
      </DialogContent>
    </Dialog>
  );
};

export default BoardDialog;
