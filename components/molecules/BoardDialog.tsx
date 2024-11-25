import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import useStore from '@/lib/store/useStore';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface BoardDialogProps {
  dialogContent: React.ReactElement;
  children: React.ReactNode;
  dialogTitle: string;
  className?: string;
}

const BoardDialog: React.FC<BoardDialogProps> = ({
  dialogContent,
  children,
  dialogTitle,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const isDarkThemeActive = useStore((state) => state.isDarkThemeActive);

  const handleOpenDialog = () => setIsOpen(true);
  const handleCloseDialog = () => setIsOpen(false);

  return (
    <>
      <div
        onClick={handleOpenDialog}
        className={cn('cursor-pointer', className)}
      >
        {children}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <VisuallyHidden>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </VisuallyHidden>
        <DialogContent
          className={cn(
            'rounded-[6px] max-w-[480px] focus:outline-none p-[32px] bg-background-soft',
            {
              dark: isDarkThemeActive,
            }
          )}
        >
          {React.cloneElement(dialogContent, {
            closeDialog: handleCloseDialog,
          })}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BoardDialog;
