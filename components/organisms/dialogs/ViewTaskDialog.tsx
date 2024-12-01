import CheckboxWithText from '@/components/atoms/CheckboxWithText';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import CurrentStatus from '../../molecules/CurrentStatus';
import useStore from '@/lib/store/useStore';
import { Task } from '@/lib/models/Task';
import BoardPopover from '@/components/atoms/BoardPopover';
import { ThreeDots } from '@/components/atoms/svgs/ThreeDots';
import { Board } from '@/lib/models/Board';

interface ViewTaskDialogProps {
  task: Task;
  board: Board;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task>>;
  handleOpenCreateEditTaskDialog: (dialogType: 'create' | 'edit') => void;
  handleOpenDeleteTaskBoardDialog: (deleteDialogType: 'task' | 'board') => void;
}

const ViewTaskDialog: React.FC<ViewTaskDialogProps> = ({
  task,
  board,
  setCurrentTask,
  handleOpenCreateEditTaskDialog,
  handleOpenDeleteTaskBoardDialog,
}) => {
  // const updateSubtask = useStore((state) => state.updateSubtask); Delete
  const updateTask = useStore((state) => state.updateTask);

  const statuses = board.statuses;

  if (!statuses) {
    throw new Error('List of statuses not found');
  }

  const currentStatus = statuses.find((status) => status.id === task.statusId);

  if (!currentStatus) {
    throw new Error(`Status with id ${task.statusId} not found`);
  }

  const completedTasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const totalTasks = task.subtasks.length;

  const onSubtaskCompleteChange = (subtaskId: string, newValue: boolean) => {
    const updatedSubtasks = task.subtasks.map((subtask) =>
      subtask.id === subtaskId ? { ...subtask, isCompleted: newValue } : subtask
    );
    const updatedTask: Task = {
      ...task,
      subtasks: updatedSubtasks,
    };
    updateTask(task.id, updatedTask);
    setCurrentTask(updatedTask);
  };

  const onCurrentStatusChange = (value: string) => {
    const updatedTask: Task = {
      ...task,
      statusId: value,
    };
    updateTask(task.id, updatedTask);
    setCurrentTask(updatedTask);
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <div className="flex justify-between">
        <Header variant="lg" className="flex-1 mr-[16px]">
          {task.title}
        </Header>
        <BoardPopover
          popoverContent={
            <>
              <div onClick={() => handleOpenCreateEditTaskDialog('edit')}>
                <Text className="text-medium-gray">Edit Task</Text>
              </div>
              <div onClick={() => handleOpenDeleteTaskBoardDialog('task')}>
                <Text className="text-red">Delete Task</Text>
              </div>
            </>
          }
        >
          <ThreeDots />
        </BoardPopover>
      </div>

      {task.description ? (
        <Text variant="regular" className="text-medium-gray">
          {task.description}
        </Text>
      ) : undefined}

      <div>
        <Text variant="bold" className="text-subheader mb-[16px]">
          Subtasks &#40;{completedTasks} of {totalTasks}&#41;
        </Text>
        <div className="[&>*:not(:last-child)]:mb-[8px]">
          {task.subtasks.map((subtask) => {
            return (
              <CheckboxWithText
                key={subtask.id}
                label={subtask.title}
                isCompleted={subtask.isCompleted}
                onCheckboxChange={() =>
                  onSubtaskCompleteChange(subtask.id, !subtask.isCompleted)
                }
                className="max-w-full"
              />
            );
          })}
        </div>
      </div>

      <CurrentStatus
        title="Current Status"
        statuses={statuses}
        currentStatus={currentStatus.name}
        onValueChange={onCurrentStatusChange}
      />
    </div>
  );
};

export default ViewTaskDialog;
