import useStore from '@/lib/store/useStore';
import Dropdown from '../atoms/Dropdown';
import Text from '../atoms/Text';

interface CurrentStatusProps {
  status: string;
  onValueChange: (value: string) => void;
}

const CurrentStatus: React.FC<CurrentStatusProps> = ({
  status,
  onValueChange,
}) => {
  const statuses = useStore((state) => state.statuses);

  return (
    <div>
      <Text variant="bold" className="text-medium-gray mb-[8px]">
        Current Status
      </Text>
      <Dropdown
        options={[
          ...statuses.map((status) => {
            return {
              value: status.id,
              label: status.name,
            };
          }),
        ]}
        placeholder={status}
        onValueChange={(value: string) => {
          onValueChange(value);
        }}
      />
    </div>
  );
};

export default CurrentStatus;
