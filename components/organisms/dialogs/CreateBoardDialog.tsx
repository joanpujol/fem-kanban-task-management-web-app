import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import useStore from '@/lib/store/useStore';
import TextInput from '@/components/atoms/TextInput';
import Button from '@/components/atoms/Button';
import DynamicTextInputList from '../../molecules/DynamicTextInputList';
import { Dispatch, SetStateAction, useState } from 'react';
import { generateRandomColors } from '@/lib/generateRandomColors';

const BoardSchema = z.object({
  title: z.string().min(1, "Can't be empty"),
  statuses: z.array(z.string()).superRefine((statuses, ctx) => {
    statuses.forEach((status, index) => {
      if (status.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Can't be empty",
          path: [index],
        });
      }
    });
  }),
});

type BoardSchemaType = z.infer<typeof BoardSchema>;

interface CreateBoardDialogProps {
  setCurrentBoardId: Dispatch<SetStateAction<string>>;
  closeDialog?: () => void;
}

const CreateBoardDialog: React.FC<CreateBoardDialogProps> = ({
  setCurrentBoardId,
  closeDialog,
}) => {
  const addBoard = useStore((state) => state.addBoard);

  const [title, setTitle] = useState('');
  const [statuses, setStatuses] = useState(['Todo', 'Doing']);
  const [errors, setErrors] = useState<Partial<BoardSchemaType>>({});

  const onSaveChangesButtonClicked = () => {
    const boardData: BoardSchemaType = {
      title,
      statuses,
    };

    const result = BoardSchema.safeParse(boardData);

    if (!result.success) {
      const formattedErrors = result.error.format();

      const transformedErrors: Partial<BoardSchemaType> = {
        title: formattedErrors.title?._errors?.join(', '),

        statuses: statuses.map(
          (_, index) =>
            (
              formattedErrors.statuses as
                | Record<string, { _errors: string[] }>
                | undefined
            )?.[index]?._errors[0] || ''
        ),
      };

      setErrors(transformedErrors);
      return;
    }

    const newBoardId = uuidv4();

    addBoard({
      id: newBoardId,
      title,
      statuses: statuses.map((name) => {
        return {
          id: uuidv4(),
          name,
          color: generateRandomColors(),
        };
      }),
    });

    setCurrentBoardId(newBoardId);

    if (closeDialog) closeDialog();
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <Header variant="lg" className="flex-1">
        Add New Board
      </Header>
      <div>
        <Text variant="bold" className="text-medium-gray mb-[8px]">
          Board Name
        </Text>
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Web Design"
          className="max-w-full"
          error={errors.title}
        />
      </div>

      <div>
        <Text variant="bold" className="text-medium-gray mb-[8px]">
          Board Columns
        </Text>
        <DynamicTextInputList
          actionButtonText="+ Add New Column"
          initialValues={statuses}
          onInputsChange={(values: string[]) => {
            setStatuses(values);
          }}
          errors={errors.statuses}
        />
      </div>

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

export default CreateBoardDialog;
