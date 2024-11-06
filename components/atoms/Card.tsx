import Text from './Text';
import Header from './Header';
import useStore from '@/lib/store/useStore';

interface CardProps {
  taskId: string;
}

const Card: React.FC<CardProps> = ({ taskId }) => {
  const task = useStore((state) =>
    state.tasks.find((task) => task.id === taskId)
  );

  // Throw an error if task is not found
  if (!task) {
    throw new Error(`Task with id ${taskId} not found`);
  }

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
