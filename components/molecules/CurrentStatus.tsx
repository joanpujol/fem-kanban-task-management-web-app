import useStore from '@/lib/store/useStore';
import Dropdown from '../atoms/Dropdown';
import Text from '../atoms/Text';

interface CurrentStatusProps {
  title: string;
  status: string;
  onValueChange: (value: string) => void;
}

const CurrentStatus: React.FC<CurrentStatusProps> = ({
  title,
  status,
  onValueChange,
}) => {
  const statuses = useStore((state) => state.statuses);

  return (
    <div>
      <Text variant="bold" className="text-medium-gray mb-[8px]">
        {title}
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
