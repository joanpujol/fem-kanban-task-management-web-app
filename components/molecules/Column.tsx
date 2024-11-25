import { Status } from '@/lib/models/Status';
import { cn } from '@/lib/utils';
import Header from '../atoms/Header';
import Card from '../atoms/Card';
import { Task } from '@/lib/models/Task';
import BoardDialog from './BoardDialog';
import ViewTaskDialog from '../organisms/dialogs/ViewTaskDialog';

interface ColumnProps {
  status: Status;
  tasks: Task[];
  className: string;
}

const Column: React.FC<ColumnProps> = ({ status, tasks, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-[auto_1fr] gap-y-[24px] gap-x-[12px]',
        className
      )}
    >
      <div
        style={{ backgroundColor: status.color ? status.color : undefined }}
        className={cn('w-[15px] h-[15px] rounded-full self-center')}
      />
      <Header
        variant="sm"
        className="self-center uppercase"
      >{`${status.name} (${tasks.length})`}</Header>

      <div className="col-span-2">
        {tasks.map((task: Task) => (
          <div key={task.id} className="mb-[20px] last:mb-0">
            <BoardDialog
              dialogTitle="View Task Dialog"
              dialogContent={<ViewTaskDialog task={task} />}
            >
              <Card task={task} />
            </BoardDialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
