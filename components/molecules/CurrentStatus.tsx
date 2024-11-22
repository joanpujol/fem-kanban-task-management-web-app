import Dropdown from '../atoms/Dropdown';
import Text from '../atoms/Text';
import { Status } from '@/lib/models/Status';

interface CurrentStatusProps {
  title: string;
  currentStatus: string;
  statuses: Status[];
  onValueChange: (value: string) => void;
}

const CurrentStatus: React.FC<CurrentStatusProps> = ({
  title,
  currentStatus,
  statuses,
  onValueChange,
}) => {
  return (
    <div>
      <Text variant="bold" className="text-subheader mb-[8px]">
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
        placeholder={currentStatus}
        onValueChange={(value: string) => {
          onValueChange(value);
        }}
      />
    </div>
  );
};

export default CurrentStatus;
