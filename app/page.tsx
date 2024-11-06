'use client';

import Column from '@/components/molecules/Column';
import useStore from '@/lib/store/useStore';

export default function Home() {
  const statuses = useStore((state) => state.statuses);
  const tasks = useStore((state) => state.tasks);

  return (
    <main className="h-screen p-[24px] bg-light-gray">
      <div className="flex flex-row gap-[24px]">
        {statuses.map((status) => {
          return (
            <Column
              key={status.id}
              status={status}
              tasks={tasks.filter((task) => task.statusId === status.id)}
              className="self-start w-[280px]"
            />
          );
        })}
      </div>
    </main>
  );
}
