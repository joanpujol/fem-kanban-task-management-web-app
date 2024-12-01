import Button from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import { Board } from '@/lib/models/Board';
import { Task } from '@/lib/models/Task';
import useStore from '@/lib/store/useStore';

interface DeleteTaskBoardDialogProps {
  board: Board;
  task: Task;
  dialogType: 'task' | 'board';
  closeDialog?: () => void;
}

const DeleteTaskBoardDialog: React.FC<DeleteTaskBoardDialogProps> = ({
  board,
  task,
  dialogType,
  closeDialog,
}) => {
  const deleteTask = useStore((state) => state.deleteTask);
  const deleteBoard = useStore((state) => state.deleteBoard);

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <Header variant="lg" className="text-red">
        {`Delete this ${dialogType}?`}
      </Header>
      <Text variant="regular" className="text-medium-gray">
        {dialogType === 'task'
          ? `
            Are you sure you want to delete the '${task.title}' task
            and its subtasks? This action cannot be reversed.
            `
          : `
            Are you sure you want to delete the '${board.title}' board?
            This action will remove all columns and tasks and cannot be reversed.
            `}
      </Text>
      <div className="flex gap-[16px] md:mb-[8px] flex-col md:flex-row">
        <Button
          color="destructive"
          className="md:flex-1 w-full"
          onClick={() => {
            if (dialogType === 'task') {
              deleteTask(task.id);
            } else {
              deleteBoard(board.id);
            }
            if (closeDialog) closeDialog();
          }}
        >
          Delete
        </Button>
        <Button
          color="secondary"
          className="md:flex-1 w-full"
          onClick={closeDialog}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteTaskBoardDialog;
