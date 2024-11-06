import Text from './Text';
import Header from './Header';
import { Task } from '@/lib/models/Task';

interface CardProps {
  task: Task;
}

const Card: React.FC<CardProps> = ({ task }) => {
  const completedTasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const totalTasks = task.subtasks.length;

  return (
    <div className="bg-white w-[280px] px-[16px] py-[23px] rounded-[8px] grid grid-cols-1 gap-[8px] shadow-[0_4px_6px_0_rgba(54,78,126,0.1015)]">
      <Header variant="md">{task.title}</Header>
      <Text variant="bold" className="text-medium-gray">
        {completedTasks} of {totalTasks} subtasks
      </Text>
    </div>
  );
};

export default Card;
