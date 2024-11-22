import { useState } from 'react';
import TextInput from '../atoms/TextInput';
import Button from '../atoms/Button';
import { Close } from '../atoms/svgs/Close';

interface DynamicTextInputListProps {
  onInputsChange: (newInputs: string[]) => void;
  actionButtonText: string;
  initialValues?: string[];
  errors?: string[];
}

const DynamicTextInputList: React.FC<DynamicTextInputListProps> = ({
  onInputsChange,
  actionButtonText,
  initialValues,
  errors = [],
}) => {
  const [inputs, setInputs] = useState(initialValues ?? ['']);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    onInputsChange(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, '']);
    onInputsChange([...inputs, '']);
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
              value={input}
              className="max-w-full w-full"
              onChange={(e) => handleInputChange(index, e.target.value)}
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
