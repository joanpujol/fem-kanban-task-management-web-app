import CheckboxWithText from '@/components/atoms/CheckboxWithText';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import { Subtask } from '@/lib/models/Subtask';
import CurrentStatus from '../CurrentStatus';
import useStore from '@/lib/store/useStore';
import { useCallback } from 'react';

interface ViewTaskDialogProps {
  taskId: string;
}

const ViewTaskDialog: React.FC<ViewTaskDialogProps> = ({ taskId }) => {
  const task = useStore((state) =>
    state.tasks.find((task) => task.id === taskId)
  );
  const updateSubtask = useStore((state) => state.updateSubtask);

  // Throw an error if task is not found
  if (!task) {
    throw new Error(`Task with id ${taskId} not found`);
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
    console.log(value);
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <div className="flex justify-between">
        <Header variant="lg" className="flex-1">
          {task.title}
        </Header>
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
      </div>
      <Text variant="regular" className="text-medium-gray">
        We know what we&apos;re planning to build for version one. Now we need
        to finalise the first pricing model we&apos;ll use. Keep iterating the
        subtasks until we have a coherent proposition.
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

      <CurrentStatus onValueChange={onCurrentStatusChange} />
    </div>
  );
};

export default ViewTaskDialog;
