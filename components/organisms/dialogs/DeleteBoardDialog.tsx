import Button from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import { Board } from '@/lib/models/Board';
import useStore from '@/lib/store/useStore';

interface DeleteBoardDialogProps {
  board: Board;
  closeDialog?: () => void;
}

const DeleteBoardDialog: React.FC<DeleteBoardDialogProps> = ({
  board,
  closeDialog,
}) => {
  const deleteBoard = useStore((state) => state.deleteBoard);

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <Header variant="lg" className="text-red">
        Delete this board?
      </Header>
      <Text variant="regular" className="text-medium-gray">
        Are you sure you want to delete the &apos;{board.title}&apos; board?
        This action will remove all columns and tasks and cannot be reversed.
      </Text>
      <div className="flex gap-[16px] mb-[8px]">
        <Button
          color="destructive"
          className="flex-1"
          onClick={() => {
            deleteBoard(board.id);
            if (closeDialog) closeDialog();
          }}
        >
          Delete
        </Button>
        <Button color="secondary" className="flex-1" onClick={closeDialog}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteBoardDialog;
