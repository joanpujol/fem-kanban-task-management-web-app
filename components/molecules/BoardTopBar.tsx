import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Header from '../atoms/Header';
import BoardDialog from './BoardDialog';
import CreateTaskDialog from '../organisms/dialogs/CreateTaskDialog';
import { Board } from '@/lib/models/Board';
import { ThreeDots } from '../atoms/svgs/ThreeDots';
import BoardPopover from '../atoms/BoardPopover';
import EditBoardDialog from '../organisms/dialogs/EditBoardDialog';
import DeleteBoardDialog from '../organisms/dialogs/DeleteBoardDialog';

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
        <BoardPopover
          popoverContent={
            <>
              <BoardDialog dialogContent={<EditBoardDialog board={board} />}>
                <Text className="text-medium-gray">Edit Board</Text>
              </BoardDialog>
              <BoardDialog dialogContent={<DeleteBoardDialog board={board} />}>
                <Text className="text-red">Delete Board</Text>
              </BoardDialog>
            </>
          }
        >
          <ThreeDots />
        </BoardPopover>
      </div>
    </div>
  );
};

export default BoardTopBar;
