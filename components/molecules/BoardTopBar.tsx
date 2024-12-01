import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Header from '../atoms/Header';
import { Board } from '@/lib/models/Board';
import { ThreeDots } from '../atoms/svgs/ThreeDots';
import BoardPopover from '../atoms/BoardPopover';
import { cn } from '@/lib/utils';
import { MobileLogo } from '../atoms/svgs/MobileLogo';
import { DownCaret } from '../atoms/svgs/DownCaret';
import useBreakpoint from '@/lib/useBreakpoint';
import { Plus } from '../atoms/svgs/Plus';
import React from 'react';

interface BoardTopBarProps {
  board: Board;
  handleOpenCreateEditTaskDialog: (dialogType: 'create' | 'edit') => void;
  handleOpenCreateEditBoardDialog: (dialogType: 'create' | 'edit') => void;
  handleOpenDeleteTaskBoardDialog: (deleteDialogType: 'task' | 'board') => void;
  toggleMobileBoardMenuOpen: () => void;
  isMobileBoardMenuOpen: boolean;
  mobileBoardMenu: React.ReactNode;
  className?: string;
}

const BoardTopBar: React.FC<BoardTopBarProps> = ({
  board,
  handleOpenCreateEditTaskDialog,
  handleOpenCreateEditBoardDialog,
  handleOpenDeleteTaskBoardDialog,
  toggleMobileBoardMenuOpen,
  isMobileBoardMenuOpen,
  mobileBoardMenu,
  className,
}) => {
  const breakpoint = useBreakpoint();

  const isAddTasksButtonEnabled = Boolean(board.statuses.length);

  return (
    <header
      className={cn(
        'flex items-center bg-background-soft h-[64px] md:h-[96px] px-[16px] md:px-[24px]',
        className
      )}
    >
      <MobileLogo className="mr-[16px] md:hidden" />
      <div className="flex items-center" onClick={breakpoint === "sm" ? toggleMobileBoardMenuOpen : undefined}>
        <Header
          variant={breakpoint === 'sm' ? 'lg' : 'xl'}
          className="md:flex-1"
        >
          {board.title}
        </Header>
        <DownCaret
          className={cn(
            'ml-[8px] md:hidden transition-transform duration-150 ease-in-out',
            {
              'transform rotate-180': isMobileBoardMenuOpen,
            }
          )}
        />
      </div>
      <Button
        className={cn('w-[164px] hidden md:block ml-auto', {
          'opacity-25': !isAddTasksButtonEnabled,
        })}
        size="large"
        disabled={!isAddTasksButtonEnabled}
        onClick={() => handleOpenCreateEditTaskDialog('create')}
      >
        + Add New Task
      </Button>
      <Button
        className={cn(
          'w-[48px] h-[32px] md:hidden flex items-center justify-center ml-auto',
          {
            'opacity-25': !isAddTasksButtonEnabled,
          }
        )}
        disabled={!isAddTasksButtonEnabled}
        onClick={() => handleOpenCreateEditTaskDialog('create')}
      >
        <Plus />
      </Button>
      {board.id ? (
        <BoardPopover
          popoverContent={
            <>
              <div onClick={() => handleOpenCreateEditBoardDialog('edit')}>
                <Text className="text-medium-gray">Edit Board</Text>
              </div>
              <div onClick={() => handleOpenDeleteTaskBoardDialog('board')}>
                <Text className="text-red">Delete Board</Text>
              </div>
            </>
          }
        >
          <ThreeDots className="ml-[16px]" />
        </BoardPopover>
      ) : undefined}
      {mobileBoardMenu}
    </header>
  );
};

export default BoardTopBar;
