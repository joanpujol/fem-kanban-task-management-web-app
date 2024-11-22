import Header from '@/components/atoms/Header';
import { Board } from '@/components/atoms/svgs/Board';
import { cn } from '@/lib/utils';

interface BoardSideMenuItemProps {
  title: string;
  isHighlighted?: boolean;
  className?: string;
  isCurrent?: boolean;
  onClick?: () => void;
}

const BoardSideMenuItem: React.FC<BoardSideMenuItemProps> = ({
  title,
  className,
  isHighlighted,
  isCurrent,
  onClick,
}) => {
  const color = isHighlighted ? 'text-main' : 'text-medium-gray';
  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex gap-[12px] items-center h-[48px] hover:bg-hover-secondary rounded-r-[24px] cursor-pointer',
        className,
        {
          'bg-main': isCurrent,
        }
      )}
    >
      <Board
        className={cn(
          color,
          {
            'text-white': isCurrent,
          },
          'group-hover:text-main'
        )}
      />
      <Header
        variant="md"
        className={cn(
          color,
          {
            'text-white': isCurrent,
          },
          'group-hover:text-main'
        )}
      >
        {title}
      </Header>
    </div>
  );
};

export default BoardSideMenuItem;
