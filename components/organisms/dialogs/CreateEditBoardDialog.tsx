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
import { Board } from '@/lib/models/Board';

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

interface CreateEditBoardDialogProps {
  board: Board;
  setCurrentBoardId: Dispatch<SetStateAction<string>>;
  closeDialog?: () => void;
  dialogType: 'create' | 'edit';
}

const CreateEditBoardDialog: React.FC<CreateEditBoardDialogProps> = ({
  board,
  setCurrentBoardId,
  closeDialog,
  dialogType,
}) => {
  const addBoard = useStore((state) => state.addBoard);
  const updateBoard = useStore((state) => state.updateBoard);

  const [title, setTitle] = useState(
    dialogType === 'create' ? '' : board.title
  );
  const [statuses, setStatuses] = useState(
    dialogType === 'create'
      ? ['Todo', 'Doing']
      : board.statuses.map((status) => status.name)
  );
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

    if (dialogType === 'create') {
      addBoard({
        id: newBoardId,
        title: result.data.title,
        statuses: result.data.statuses.map((name) => {
          return {
            id: uuidv4(),
            name,
            color: generateRandomColors(),
          };
        }),
      });

      setCurrentBoardId(newBoardId);
    } else {
      updateBoard(board.id, {
        title: result.data.title,
        statuses: result.data.statuses.map((name) => {
          const existingStatus = board.statuses.find(
            (status) => status.name === name
          );
          if (existingStatus) return existingStatus;
          return {
            id: uuidv4(),
            name,
            color: generateRandomColors(),
          };
        }),
      });
    }

    if (closeDialog) closeDialog();
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <Header variant="lg" className="flex-1">
        {dialogType === 'create' ? 'Add New Board' : 'Edit Board'}
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
          initialValues={
            dialogType === 'create'
              ? statuses
              : [
                  ...board.statuses.map((status) => {
                    return status.name;
                  }),
                ]
          }
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

export default CreateEditBoardDialog;
