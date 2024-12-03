import Text from './Text';
import Header from './Header';
import { Task } from '@/lib/models/Task';
import { cn } from '@/lib/utils';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import useStore from '@/lib/store/useStore';

interface CardProps {
  task: Task;
  className?: string;
  handleOpenDialog: () => void;
}

const Card: React.FC<CardProps> = ({ task, className, handleOpenDialog }) => {
  const moveTask = useStore((state) => state.moveTask);

  const completedTasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const totalTasks = task.subtasks.length;

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { ...task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item: Task) => {
      moveTask(item.id, task.statusId, task.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      onClick={handleOpenDialog}
      className={cn(
        'group bg-background-soft w-[280px] px-[16px] py-[23px] rounded-[8px] grid grid-cols-1 gap-[8px] shadow-[0_4px_6px_0_rgba(54,78,126,0.1015)]',
        className,
        {
          'border border-main': isDragging,
          'border border-hover-primary': isOver,
        }
      )}
    >
      <Header variant="md" className="group-hover:text-main">
        {task.title}
      </Header>
      <Text variant="bold" className="text-medium-gray">
        {completedTasks} of {totalTasks} subtasks
      </Text>
    </div>
  );
};

export default Card;
