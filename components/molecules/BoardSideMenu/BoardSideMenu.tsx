import { Board } from '@/lib/models/Board';
import Header from '../../atoms/Header';
import { cn } from '@/lib/utils';
import { Logo } from '../../atoms/svgs/Logo';
import BoardSideMenuItem from './components/BoardSideMenuItem';
import BoardDialog from '../BoardDialog';
import CreateBoardDialog from '@/components/organisms/dialogs/CreateBoardDialog';
import { Dispatch, SetStateAction } from 'react';

interface BoardSideMenuProps {
  currentBoardId: string;
  allBoards: Board[];
  isSidebarOpen: boolean;
  setCurrentBoardId: Dispatch<SetStateAction<string>>;
}

const BoardSideMenu: React.FC<BoardSideMenuProps> = ({
  currentBoardId,
  allBoards,
  isSidebarOpen,
  setCurrentBoardId,
}) => {
  return (
    <div className="h-full">
      <div className="pl-[32px] h-[96px] flex items-center bg-white border-r border-light-lines">
        <Logo />
      </div>
      <div
        className={cn(
          'flex flex-col min-h-[calc(100vh-96px)] [&>*]:mr-[24px]',
          isSidebarOpen ? 'bg-white border-r border-light-lines' : 'hidden'
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
        <BoardDialog
          dialogContent={
            <CreateBoardDialog setCurrentBoardId={setCurrentBoardId} />
          }
        >
          <BoardSideMenuItem
            title="+ Create New Board"
            className="pl-[24px]"
            isHighlighted
          />
        </BoardDialog>
      </div>
    </div>
  );
};

export default BoardSideMenu;
