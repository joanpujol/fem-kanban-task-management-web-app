import { Status } from '@/lib/models/Status';
import { Task } from '@/lib/models/Task';
import { cn } from '@/lib/utils';
import Header from '../atoms/Header';
import Card from '../atoms/Card';
import { useDrop } from 'react-dnd';
import { useRef } from 'react';
import useStore from '@/lib/store/useStore';

interface ColumnProps {
  status: Status;
  tasks: Task[];
  handleOpenDialog: (task: Task) => void;
}

const Column: React.FC<ColumnProps> = ({ status, tasks, handleOpenDialog }) => {
  const moveTask = useStore((state) => state.moveTask);
  const ref = useRef<HTMLDivElement>(null);

  const filteredTasks = tasks.filter((task) => task.statusId === status.id);

  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item: Task) => {
      if (!filteredTasks.length) {
        moveTask(item.id, status.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className="flex-shrink-0 gap-y-[24px] gap-x-[12px] w-[280px]"
    >
      <div className="flex gap-[8px] mb-[24px]">
        <div
          suppressHydrationWarning
          style={{
            backgroundColor: status.color ? status.color : undefined,
          }}
          className="w-[15px] h-[15px] rounded-full self-center"
        />
        <Header variant="sm" className="self-center uppercase">
          {`${status.name} (${filteredTasks.length})`}
        </Header>
      </div>

      <div
        className={cn({
          'border border-hover-primary h-full rounded-[6px]':
            isOver && !filteredTasks.length,
        })}
      >
        {filteredTasks.map((task: Task) => (
          <Card
            key={task.id}
            task={task}
            className="mb-[20px] cursor-pointer"
            handleOpenDialog={() => handleOpenDialog(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
