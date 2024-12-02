import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import CurrentStatus from '../../molecules/CurrentStatus';
import useStore from '@/lib/store/useStore';
import { Task } from '@/lib/models/Task';
import TextInput from '@/components/atoms/TextInput';
import BoardTextArea from '@/components/atoms/BoardTextArea';
import Button from '@/components/atoms/Button';
import DynamicTextInputList from '../../molecules/DynamicTextInputList';
import { Subtask } from '@/lib/models/Subtask';
import { useState } from 'react';
import { Board } from '@/lib/models/Board';

const TaskSchema = z.object({
  title: z.string().min(1, "Can't be empty"),
  subtasks: z.array(z.string()).superRefine((subtasks, ctx) => {
    subtasks.forEach((subtask, index) => {
      if (subtask.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Can't be empty",
          path: [index],
        });
      }
    });
  }),
});

type TaskSchemaType = z.infer<typeof TaskSchema>;

interface CreateEditTaskDialogProps {
  task: Task;
  board: Board;
  dialogType: 'create' | 'edit';
  closeDialog?: () => void;
}

const CreateEditTaskDialog: React.FC<CreateEditTaskDialogProps> = ({
  task,
  board,
  dialogType,
  closeDialog,
}) => {
  const [title, setTitle] = useState(dialogType === 'create' ? '' : task.title);
  const [description, setDescription] = useState(
    dialogType === 'create' ? '' : task.description
  );
  const [subtasks, setSubtasks] = useState(
    dialogType === 'create'
      ? ['', '']
      : task.subtasks.map((subtask) => subtask.title)
  );
  const statuses = board.statuses;
  const [statusId, setStatusId] = useState(
    dialogType === 'create' ? statuses[0].id : task.statusId
  );
  const [errors, setErrors] = useState<Partial<TaskSchemaType>>({});

  const addTask = useStore((state) => state.addTask);
  const updateTask = useStore((state) => state.updateTask);

  const currentStatus = statuses.find((status) => status.id === statusId);

  if (!currentStatus) {
    throw new Error(`Status with id ${statusId} not found`);
  }

  const onSaveChangesButtonClicked = () => {
    const taskData: TaskSchemaType = {
      title,
      subtasks,
    };

    const result = TaskSchema.safeParse(taskData);

    if (!result.success) {
      const formattedErrors = result.error.format();

      const transformedErrors: Partial<TaskSchemaType> = {
        title: formattedErrors.title?._errors?.join(', '),

        subtasks: subtasks.map(
          (_, index) =>
            (
              formattedErrors.subtasks as
                | Record<string, { _errors: string[] }>
                | undefined
            )?.[index]?._errors[0] || ''
        ),
      };

      setErrors(transformedErrors);
      return;
    }

    if (dialogType === 'create') {
      addTask({
        title: result.data.title,
        description,
        statusId,
        boardId: board.id,
        subtasks: result.data.subtasks.map((title) => ({
          id: uuidv4(),
          title,
          isCompleted: false,
        })),
      });
    } else {
      updateTask(task.id, {
        title,
        description,
        subtasks: subtasks.map((title) => ({
          id: uuidv4(),
          title,
          isCompleted:
            task.subtasks?.find((subtask) => subtask.title === title)
              ?.isCompleted || false,
        })),
        statusId,
      });
    }

    if (closeDialog) {
      closeDialog();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <Header variant="lg" className="flex-1">
        {dialogType === 'create' ? 'Add New Task' : 'Edit Task'}
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
          error={errors.title}
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
          initialValues={
            dialogType === 'create'
              ? [
                  ...subtasks.map((subtask: string) => {
                    return subtask;
                  }),
                ]
              : [
                  ...task.subtasks.map((subtask: Subtask) => {
                    return subtask.title;
                  }),
                ]
          }
          onInputsChange={(values: string[]) => {
            setSubtasks(values);
          }}
          errors={errors.subtasks}
        />
      </div>

      <CurrentStatus
        title="Status"
        statuses={statuses}
        currentStatus={currentStatus.name}
        onValueChange={(newValue) => setStatusId(newValue)}
      />

      <Button
        size="small"
        className="w-full"
        onClick={onSaveChangesButtonClicked}
      >
        {dialogType === 'create' ? 'Create Task' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default CreateEditTaskDialog;
