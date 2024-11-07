import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import CurrentStatus from '../CurrentStatus';
import useStore from '@/lib/store/useStore';
import { Task } from '@/lib/models/Task';
import TextInput from '@/components/atoms/TextInput';
import BoardTextArea from '@/components/atoms/BoardTextArea';
import Button from '@/components/atoms/Button';
import DynamicTextInputList from '../DynamicTextInputList';
import { Subtask } from '@/lib/models/Subtask';
import { useState } from 'react';

interface EditTaskDialogProps {
  task: Task;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({ task }) => {
  const updateTask = useStore((state) => state.updateTask);
  const statuses = useStore((state) => state.statuses);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [subtasks, setSubtasks] = useState(
    task.subtasks.map((subtask) => subtask.title)
  );
  const [statusId, setStatusId] = useState(task.statusId);

  const status = statuses.find((status) => status.id === statusId);

  if (!status) {
    throw new Error(`Status with id ${status} not found`);
  }

  const onSaveChangesButtonClicked = () => {
    // TODO: Add validation

    updateTask(task.id, {
      title,
      description,
      subtasks: subtasks.map((title, index) => ({
        id: index.toString(), // TODO: Use uuid
        title,
        isCompleted: task.subtasks[index]?.isCompleted || false, // TODO: Keep state based on id, not index
      })),
      statusId,
    });

    // TODO: Close dialog after update
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <Header variant="lg" className="flex-1">
        Edit Task
      </Header>
      <div>
        <Text variant="bold" className="text-medium-gray mb-[8px]">
          Title
        </Text>
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Take coffee break"
          className="max-w-full"
        />
      </div>

      <div>
        <Text variant="bold" className="text-medium-gray mb-[8px]">
          Description
        </Text>
        <BoardTextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. It's always good to take a break. This 15 minute break will 
recharge the batteries a little."
          className="max-w-full"
        />
      </div>

      <div>
        <Text variant="bold" className="text-medium-gray mb-[8px]">
          Substasks
        </Text>
        <DynamicTextInputList
          actionButtonText="+ Add New Subtask"
          initialValues={[
            ...task.subtasks.map((subtask: Subtask) => {
              return subtask.title;
            }),
          ]}
          onInputsChange={(values: string[]) => {
            setSubtasks(values);
          }}
        />
      </div>

      <CurrentStatus
        status={status.name}
        onValueChange={(newValue) => setStatusId(newValue)}
      />

      <Button
        size="small"
        className="w-full"
        onClick={onSaveChangesButtonClicked}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default EditTaskDialog;
