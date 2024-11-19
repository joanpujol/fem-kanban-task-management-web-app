import Button from '../atoms/Button';
import Header from '../atoms/Header';
import BoardDialog from './BoardDialog';
import CreateTaskDialog from '../organisms/dialogs/CreateTaskDialog';
import { Board } from '@/lib/models/Board';

interface BoardTopBarProps {
  board: Board;
}

const BoardTopBar: React.FC<BoardTopBarProps> = ({ board }) => {
  return (
    <div className="flex items-center bg-white h-[96px] pl-[24px]">
      <Header variant="xl" className="flex-1">
        {board.title}
      </Header>
      <BoardDialog dialogContent={<CreateTaskDialog board={board} />}>
        <Button className="w-[164px]">+ Add New Task</Button>
      </BoardDialog>
      <div className="mx-[24px]">
        <svg
          width="5"
          height="20"
          viewBox="0 0 5 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3" />
          <circle cx="2.30769" cy="10" r="2.30769" fill="#828FA3" />
          <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3" />
        </svg>
      </div>
    </div>
  );
};

export default BoardTopBar;
