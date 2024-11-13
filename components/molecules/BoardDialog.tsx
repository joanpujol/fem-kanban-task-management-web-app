import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface BoardDialogProps {
  dialogContent: React.ReactElement;
  children: React.ReactNode;
}
const BoardDialog: React.FC<BoardDialogProps> = ({
  dialogContent,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenDialog = () => setIsOpen(true);
  const handleCloseDialog = () => setIsOpen(false);

  return (
    <>
      <div onClick={handleOpenDialog} className="cursor-pointer">
        {children}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="rounded-[6px] w-[480px] focus:outline-none p-[32px]">
          {React.cloneElement(dialogContent, {
            closeDialog: handleCloseDialog,
          })}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BoardDialog;
