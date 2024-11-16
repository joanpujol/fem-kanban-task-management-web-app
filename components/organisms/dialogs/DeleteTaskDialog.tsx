import Button from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import useStore from '@/lib/store/useStore';

interface DeleteTaskDialogProps {
  taskId: string;
  closeDialog?: () => void;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  taskId,
  closeDialog,
}) => {
  const deleteTask = useStore((state) => state.deleteTask);

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <Header variant="lg" className="text-red">
        Delete this task?
      </Header>
      <Text variant="regular" className="text-medium-gray">
        Are you sure you want to delete the &apos;Build settings UI&apos; task
        and its subtasks? This action cannot be reversed.
      </Text>
      <div className="flex gap-[16px] mb-[8px]">
        <Button
          color="destructive"
          className="flex-1"
          onClick={() => deleteTask(taskId)}
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

export default DeleteTaskDialog;
