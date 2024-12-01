import { Board } from '@/lib/models/Board';
import Header from '../../atoms/Header';
import { cn } from '@/lib/utils';
import BoardSideMenuItem from './components/BoardSideMenuItem';
import { Dispatch, SetStateAction } from 'react';
import { Show } from '@/components/atoms/svgs/Show';
import { Hide } from '@/components/atoms/svgs/Hide';
import ThemeToggle from '@/components/atoms/ThemeToggle';

interface BoardSideMenuProps {
  currentBoardId: string;
  allBoards: Board[];
  isSidebarOpen: boolean;
  setCurrentBoardId: Dispatch<SetStateAction<string>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const BoardSideMenu: React.FC<BoardSideMenuProps> = ({
  currentBoardId,
  allBoards,
  isSidebarOpen,
  setCurrentBoardId,
  setSidebarOpen,
  className,
}) => {
  return (
    <>
      <div className="absolute bottom-0 left-0 mb-[32px]">
        {isSidebarOpen ? (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:w-[calc(260px-24px)] lg:w-[calc(300px-24px)] group hidden md:flex gap-[12px] items-center pl-[24px] h-[48px] hover:bg-hover-secondary rounded-r-[24px] cursor-pointer"
          >
            <Hide className="text-medium-gray group-hover:text-main" />
            <Header
              variant="md"
              className="text-medium-gray group-hover:text-main"
            >
              Hide Sidebar
            </Header>
          </div>
        ) : (
          <div
            onClick={() => setSidebarOpen(true)}
            className="w-[56px] h-[48px] hidden md:flex items-center justify-center rounded-r-[24px] bg-main hover:bg-hover-primary cursor-pointer"
          >
            <Show className="text-white" />
          </div>
        )}
      </div>
      <div className={cn('hidden md:block md:h-full', className)}>
        <div
          className={cn(
            'flex flex-col min-h-[calc(100vh-96px)] [&>*]:mr-[24px]',
            isSidebarOpen
              ? 'bg-background-soft border-r border-border-primary'
              : 'hidden'
          )}
        >
          <Header
            className="h-[48px] flex items-center pl-[24px]"
            variant="sm"
          >{`ALL BOARDS (${allBoards.length})`}</Header>
          {allBoards.map((board) => (
            <BoardSideMenuItem
              onClick={() => setCurrentBoardId(board.id)}
              key={board.id}
              title={board.title}
              className="pl-[24px]"
              isCurrent={currentBoardId === board.id}
            />
          ))}

          <BoardSideMenuItem
            title="+ Create New Board"
            className="pl-[24px]"
            isHighlighted
          />
          <ThemeToggle className="mt-auto ml-[24px] mb-[88px]" />
        </div>
      </div>
    </>
  );
};

export default BoardSideMenu;
