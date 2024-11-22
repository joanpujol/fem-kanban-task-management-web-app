import { Sun } from './svgs/Sun';
import { Moon } from './svgs/Moon';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  isDarkThemeActive: boolean;
  toggleIsDarkThemeActive: () => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkThemeActive,
  toggleIsDarkThemeActive,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex justify-center gap-[24px] items-center h-[48px] w-[calc(300px-48px)] ml-[24px] bg-background-pure rounded-[6px]',
        className
      )}
    >
      <Sun className="text-medium-gray" />
      <div
        className="w-[40px] h-[20px] bg-main rounded-[10px] cursor-pointer hover:bg-hover-primary"
        onClick={() => toggleIsDarkThemeActive()}
      >
        <div
          className={cn(
            'h-[14px] w-[14px] mt-[3px] bg-white rounded-[100%] transition-all duration-300 ease-in-out',
            isDarkThemeActive ? 'ml-[calc(40px-14px-3px)]' : 'ml-[3px]'
          )}
        />
      </div>
      <Moon className="text-medium-gray" />
    </div>
  );
};

export default ThemeToggle;
