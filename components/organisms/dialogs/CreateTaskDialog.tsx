import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import CurrentStatus from '../../molecules/CurrentStatus';
import useStore from '@/lib/store/useStore';
import TextInput from '@/components/atoms/TextInput';
import BoardTextArea from '@/components/atoms/BoardTextArea';
import Button from '@/components/atoms/Button';
import DynamicTextInputList from '../../molecules/DynamicTextInputList';
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

interface CreateTaskDialogProps {
  board: Board;
  closeDialog?: () => void;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  board,
  closeDialog,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState(['', '']);
  const [errors, setErrors] = useState<Partial<TaskSchemaType>>({});

  const addTask = useStore((state) => state.addTask);
  const statuses = board.statuses;

  if (!statuses.length) {
    throw new Error('A minimum of one column is required');
  }

  const [statusId, setStatusId] = useState(statuses[0].id);
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

    addTask({
      title,
      description,
      statusId,
      boardId: board.id,
      subtasks: subtasks.map((title) => ({
        id: uuidv4(),
        title,
        isCompleted: false,
      })),
    });

    if (closeDialog) closeDialog();
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <Header variant="lg" className="flex-1">
        Add New Task
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
          initialValues={[
            ...subtasks.map((subtask: string) => {
              return subtask;
            }),
          ]}
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
        Create Task
      </Button>
    </div>
  );
};

export default CreateTaskDialog;
