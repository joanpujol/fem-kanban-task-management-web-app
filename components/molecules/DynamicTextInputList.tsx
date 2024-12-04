import { useState } from 'react';
import TextInput from '../atoms/TextInput';
import Button from '../atoms/Button';
import { v4 as uuidv4 } from 'uuid';
import { Close } from '../atoms/svgs/Close';

export type DynamicTextInput = {
  id: string;
  title: string;
};

interface DynamicTextInputListProps {
  onInputsChange: (newInputs: DynamicTextInput[]) => void;
  actionButtonText: string;
  initialValues?: DynamicTextInput[];
  errors?: string[];
}

const DynamicTextInputList: React.FC<DynamicTextInputListProps> = ({
  onInputsChange,
  actionButtonText,
  initialValues,
  errors = [],
}) => {
  const [inputs, setInputs] = useState(
    initialValues ?? [
      {
        id: uuidv4(),
        title: '',
      },
    ]
  );

  const handleInputChange = (id: string, value: string) => {
    const newInputs = inputs.map((input) =>
      input.id === id ? { ...input, title: value } : input
    );

    setInputs(newInputs);
    onInputsChange(newInputs);
  };

  const addInput = () => {
    setInputs([
      ...inputs,
      {
        id: uuidv4(),
        title: '',
      },
    ]);
    onInputsChange([
      ...inputs,
      {
        id: uuidv4(),
        title: '',
      },
    ]);
  };

  const removeInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
    onInputsChange(newInputs);
  };

  return (
    <>
      <div className="[&>*]:mb-[12px]">
        {inputs.map((input, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-[16px]"
          >
            <TextInput
              value={input.title}
              className="max-w-full w-full"
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              placeholder={'e.g. Add some text to this subtask'}
              error={
                errors.length > index && errors[index].length
                  ? errors[index]
                  : undefined
              }
            />
            <button
              className="h-[14.75px] w-[14.75px]"
              onClick={() => removeInput(index)}
            >
              <Close className="text-medium-gray hover:text-red" />
            </button>
          </div>
        ))}
      </div>
      <Button
        size="small"
        color="secondary"
        className="w-full"
        onClick={addInput}
      >
        {actionButtonText}
      </Button>
    </>
  );
};

export default DynamicTextInputList;
