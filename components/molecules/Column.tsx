import { Status } from '@/lib/models/Status';
import { Task } from '@/lib/models/Task';
import { cn } from '@/lib/utils';
import Header from '../atoms/Header';
import Card from '../atoms/Card';

interface ColumnProps {
  status: Status;
  tasks: Task[];
  handleOpenDialog: (task: Task) => void;
}

const Column: React.FC<ColumnProps> = ({ status, tasks, handleOpenDialog }) => {
  return (
    <div className={cn('flex-shrink-0 gap-y-[24px] gap-x-[12px] w-[280px]')}>
      <div className="flex gap-[8px] mb-[24px]">
        <div
          suppressHydrationWarning
          style={{
            backgroundColor: status.color ? status.color : undefined,
          }}
          className={cn('w-[15px] h-[15px] rounded-full self-center')}
        />
        <Header variant="sm" className="self-center uppercase">
          {`${status.name} (${tasks.filter((task) => task.statusId === status.id).length})`}
        </Header>
      </div>

      {tasks
        .filter((task) => task.statusId === status.id)
        .map((task: Task) => (
          <div
            key={task.id}
            className="mb-[20px] cursor-pointer"
            onClick={() => handleOpenDialog(task)}
          >
            <Card task={task} />
          </div>
        ))}
    </div>
  );
};

export default Column;
