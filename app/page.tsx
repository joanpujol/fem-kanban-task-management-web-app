'use client';

import Header from '@/components/atoms/Header';
import BoardDialog from '@/components/molecules/BoardDialog';
import BoardTopBar from '@/components/molecules/BoardTopBar';
import Column from '@/components/molecules/Column';
import EditBoardDialog from '@/components/organisms/dialogs/EditBoardDialog';
import useStore from '@/lib/store/useStore';
import { useState } from 'react';

export default function Home() {
  const [currentBoardId] = useState('123');

  const allBoards = useStore((state) => state.boards);
  const board = allBoards.find((board) => board.id === currentBoardId);

  if (!board) {
    throw new Error('No Board was found with the provided id');
  }

  const allTasks = useStore((state) => state.tasks);
  const tasks = allTasks.filter((task) => task.boardId === board.id);

  return (
    <main className="min-h-screen bg-light-gray">
      <BoardTopBar board={board} />
      <div className="flex flex-row gap-[24px] p-[24px] min-h-[calc(100vh-96px)]">
        {board.statuses.map((status) => {
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
          <BoardDialog
            className="h-full"
            dialogContent={<EditBoardDialog board={board} />}
          >
            <Header
              variant="xl"
              className="text-medium-gray flex justify-center items-center h-full"
            >
              + New Column
            </Header>
          </BoardDialog>
        </div>
      </div>
    </main>
  );
}
