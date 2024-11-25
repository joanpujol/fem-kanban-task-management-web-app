import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/atoms/Header';
import Text from '@/components/atoms/Text';
import useStore from '@/lib/store/useStore';
import TextInput from '@/components/atoms/TextInput';
import Button from '@/components/atoms/Button';
import DynamicTextInputList from '../../molecules/DynamicTextInputList';
import { useState } from 'react';
import { Board } from '@/lib/models/Board';
import { generateRandomColors } from '@/lib/generateRandomColors';
import { Status } from '@/lib/models/Status';

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

interface EditBoardDialogProps {
  board: Board;
  closeDialog?: () => void;
}

const EditBoardDialog: React.FC<EditBoardDialogProps> = ({
  board,
  closeDialog,
}) => {
  const updateBoard = useStore((state) => state.updateBoard);

  const [title, setTitle] = useState(board.title);
  const [statuses, setStatuses] = useState(
    board.statuses.map((status) => status.name)
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

    updateBoard(board.id, {
      title,
      statuses: statuses.map((name) => {
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

    if (closeDialog) closeDialog();
  };

  return (
    <div className="grid grid-cols-1 gap-[24px]">
      <Header variant="lg" className="flex-1">
        Edit Board
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
          initialValues={[
            ...board.statuses.map((status: Status) => {
              return status.name;
            }),
          ]}
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

export default EditBoardDialog;
