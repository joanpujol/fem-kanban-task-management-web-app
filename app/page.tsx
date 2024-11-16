'use client';

import Header from '@/components/atoms/Header';
import BoardTopBar from '@/components/molecules/BoardTopBar';
import Column from '@/components/molecules/Column';
import useStore from '@/lib/store/useStore';

export default function Home() {
  const statuses = useStore((state) => state.statuses);
  const tasks = useStore((state) => state.tasks);

  return (
    <main className="min-h-screen bg-light-gray">
      <BoardTopBar />
      <div className="flex flex-row gap-[24px] p-[24px] min-h-[calc(100vh-96px)]">
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
        <div className="w-[280px] bg-gradient-to-b from-lines to-lines/50 rounded-[6px]">
          <Header
            variant="xl"
            className="text-medium-gray flex justify-center items-center h-full"
          >
            + New Column
          </Header>
        </div>
      </div>
    </main>
  );
}
