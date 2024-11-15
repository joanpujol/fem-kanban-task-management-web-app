import CheckboxWithText from '@/components/atoms/CheckboxWithText';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import { Subtask } from '@/lib/models/Subtask';
import CurrentStatus from '../CurrentStatus';
import useStore from '@/lib/store/useStore';
import { useCallback } from 'react';
import { Task } from '@/lib/models/Task';
import BoardPopover from '@/components/atoms/BoardPopover';
import BoardDialog from '../BoardDialog';
import EditTaskDialog from './EditTaskDialog';
import DeleteTaskDialog from './DeleteTaskDialog';

interface ViewTaskDialogProps {
  task: Task;
}

const ViewTaskDialog: React.FC<ViewTaskDialogProps> = ({ task }) => {
  const updateSubtask = useStore((state) => state.updateSubtask);
  const updateTask = useStore((state) => state.updateTask);

  const status = useStore((state) =>
    state.statuses.find((status) => status.id === task.statusId)
  );

  if (!status) {
    throw new Error(`Status with id ${status} not found`);
  }

  const completedTasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const totalTasks = task.subtasks.length;

  const onSubtaskCompleteChange = useCallback(
    (subtaskId: string, newValue: boolean) => {
      updateSubtask(task.id, subtaskId, { isCompleted: newValue });
    },
    [task.id, updateSubtask]
  );

  const onCurrentStatusChange = (value: string) => {
    updateTask(task.id, { statusId: value });
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <div className="flex justify-between">
        <Header variant="lg" className="flex-1">
          {task.title}
        </Header>
        <BoardPopover
          popoverContent={
            <>
              <BoardDialog dialogContent={<EditTaskDialog task={task} />}>
                <Text className="text-medium-gray">Edit Task</Text>
              </BoardDialog>
              <BoardDialog
                dialogContent={<DeleteTaskDialog taskId={task.id} />}
              >
                <Text className="text-red">Delete Task</Text>
              </BoardDialog>
            </>
          }
        >
          <svg
            width="5"
            height="20"
            viewBox="0 0 5 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="10.0001" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="17.6925" r="2.30769" fill="#828FA3" />
          </svg>
        </BoardPopover>
      </div>
      <Text variant="regular" className="text-medium-gray">
        {task.description}
      </Text>

      <div>
        <Text variant="bold" className="text-medium-gray mb-[16px]">
          Subtasks &#40;{completedTasks} of {totalTasks}&#41;
        </Text>
        <div className="[&>*:not(:last-child)]:mb-[8px]">
          {task.subtasks.map((subtask: Subtask) => {
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
        status={status.name}
        onValueChange={onCurrentStatusChange}
      />
    </div>
  );
};

export default ViewTaskDialog;
