import { Board } from '@/lib/models/Board';
import Header from '../atoms/Header';
import BoardSideMenuItem from '../molecules/BoardSideMenu/components/BoardSideMenuItem';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';
import ThemeToggle from '../atoms/ThemeToggle';

interface MobileBoardMenuProps {
  open: boolean;
  handleClose: () => void;
  currentBoardId: string;
  allBoards: Board[];
  setCurrentBoardId: Dispatch<SetStateAction<string>>;
  handleOpenCreateEditBoardDialog: () => void;
}

const MobileBoardMenu: React.FC<MobileBoardMenuProps> = ({
  open,
  allBoards,
  currentBoardId,
  setCurrentBoardId,
  handleClose,
  handleOpenCreateEditBoardDialog,
}) => {
  return (
    <div
      className={cn('fixed inset-0 top-[64px] w-full h-full bg-black/50', {
        hidden: !open,
      })}
      onClick={handleClose}
    >
      <div
        className="w-[70%] mt-[16px] ml-[15%] pb-[16px] bg-background-soft rounded-[8px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Header
          className="h-[48px] flex items-center pl-[24px] mb-[4px]"
          variant="sm"
        >
          {`ALL BOARDS (${allBoards.length})`}
        </Header>
        {allBoards.map((board) => (
          <BoardSideMenuItem
            onClick={() => {
              setCurrentBoardId(board.id);
              handleClose();
            }}
            key={board.id}
            title={board.title}
            className="pl-[24px] mr-[24px]"
            isCurrent={currentBoardId === board.id}
          />
        ))}
        <BoardSideMenuItem
          onClick={() => {
            handleClose();
            handleOpenCreateEditBoardDialog();
          }}
          title="+ Create New Board"
          className="pl-[24px] mr-[24px]"
          isHighlighted
        />
        <ThemeToggle className="mx-[16px] mt-[16px]" />
      </div>
    </div>
  );
};

export default MobileBoardMenu;
