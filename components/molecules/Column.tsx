import { Status } from "@/lib/models/Status";
import useStore from "@/lib/store/useStore";
import { cn } from "@/lib/utils";
import Header from "../atoms/Header";
import Card from "../atoms/Card";
import { Task } from "@/lib/models/Task";

interface ColumnProps {
    status: Status
  }
  
const Column: React.FC<ColumnProps> = ({status}) => {
    const getTasksByColumnId = useStore(state => state.getTasksByColumnId);
    const tasks = getTasksByColumnId(status.id)

    return (
        <div className="grid grid-cols-[auto_1fr] gap-y-[24px] gap-x-[12px]">
            <div style={{ backgroundColor: status.color ? status.color : undefined }} className={cn(
                "w-[15px] h-[15px] rounded-full self-center",
            )} />
            <Header variant="sm" className="self-center">{`${status.name} (${tasks.length})`}</Header>
            
            <div className="col-span-2">
                {tasks.map((task: Task) => (
                <div key={task.id} className="mb-[20px] last:mb-0">
                    <Card task={task} />
                </div>
                ))}
            </div>
        </div>
    );
};

export default Column;
