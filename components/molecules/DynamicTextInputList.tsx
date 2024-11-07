import { useState } from 'react';
import TextInput from '../atoms/TextInput';
import Button from '../atoms/Button';

interface DynamicTextInputListProps {
  onInputsChange: (newInputs: string[]) => void;
  actionButtonText: string;
  initialValues?: string[];
}
const DynamicTextInputList: React.FC<DynamicTextInputListProps> = ({
  onInputsChange,
  actionButtonText,
  initialValues,
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
            />
            <button
              className="h-[14.75px] w-[14.75px]"
              onClick={() => removeInput(index)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="12.728"
                  width="3"
                  height="18"
                  transform="rotate(45 12.728 0)"
                  fill="#828FA3"
                />
                <rect
                  y="2.12109"
                  width="3"
                  height="18"
                  transform="rotate(-45 0 2.12109)"
                  fill="#828FA3"
                />
              </svg>
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
