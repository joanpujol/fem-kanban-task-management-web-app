import { Board } from '@/lib/models/Board';
import Header from '../../atoms/Header';
import { cn } from '@/lib/utils';
import { Logo } from '../../atoms/svgs/Logo';
import BoardSideMenuItem from './components/BoardSideMenuItem';

interface BoardSideMenuProps {
  allBoards: Board[];
  isSidebarOpen: boolean;
}

const BoardSideMenu: React.FC<BoardSideMenuProps> = ({
  allBoards,
  isSidebarOpen,
}) => {
  return (
    <div className="h-full">
      <div className="pl-[32px] h-[96px] flex items-center bg-white border-r border-light-lines">
        <Logo />
      </div>
      <div
        className={cn(
          'flex flex-col min-h-[calc(100vh-96px)] [&>*]:pl-[24px] [&>*]:mr-[24px]',
          {
            hidden: !isSidebarOpen,
            'bg-white border-r border-light-lines': isSidebarOpen,
          }
        )}
      >
        <Header
          className="h-[48px] flex items-center"
          variant="sm"
        >{`ALL BOARDS (${allBoards.length})`}</Header>
        <BoardSideMenuItem title="Platform Launch" isCurrent />
        <BoardSideMenuItem title="+ Create New Board" isHighlighted />
      </div>
    </div>
  );
};

export default BoardSideMenu;
