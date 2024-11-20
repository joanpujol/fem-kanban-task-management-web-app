'use client';

import Header from '@/components/atoms/Header';
import { Hide } from '@/components/atoms/svgs/Hide';
import { Show } from '@/components/atoms/svgs/Show';
import BoardDialog from '@/components/molecules/BoardDialog';
import BoardSideMenu from '@/components/molecules/BoardSideMenu';
import BoardTopBar from '@/components/molecules/BoardTopBar';
import Column from '@/components/molecules/Column';
import EditBoardDialog from '@/components/organisms/dialogs/EditBoardDialog';
import useStore from '@/lib/store/useStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Home() {
  const [currentBoardId, setCurrentBoardId] = useState('123');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const allBoards = useStore((state) => state.boards);
  const board = allBoards.find((board) => board.id === currentBoardId);

  if (!board) {
    throw new Error('No Board was found with the provided id');
  }

  const allTasks = useStore((state) => state.tasks);
  const tasks = allTasks.filter((task) => task.boardId === board.id);

  return (
    <main
      className={cn('min-h-screen grid', {
        'grid-cols-[300px,1fr]': isSidebarOpen,
        'grid-cols-[210px,1fr]': !isSidebarOpen,
      })}
    >
      <BoardSideMenu
        isSidebarOpen={isSidebarOpen}
        allBoards={allBoards}
        currentBoardId={currentBoardId}
        setCurrentBoardId={setCurrentBoardId}
      />
      <div>
        <BoardTopBar board={board} />
        <div
          className={cn(
            'flex flex-row gap-[24px] p-[24px] min-h-[calc(100vh-96px)] border-t border-light-lines bg-light-gray',
            {
              'ml-[-210px]': !isSidebarOpen,
            }
          )}
        >
          <div
            onClick={() => setSidebarOpen(false)}
            className={cn(
              'absolute bottom-0 left-0 z-1 w-[calc(300px-24px)] group flex gap-[12px] items-center mb-[32px] pl-[24px] h-[48px] hover:bg-purple/10 rounded-r-[24px] cursor-pointer',
              {
                hidden: !isSidebarOpen,
              }
            )}
          >
            <Hide className="text-medium-gray group-hover:text-purple" />
            <Header
              variant="md"
              className="text-medium-gray group-hover:text-purple"
            >
              Hide Sidebar
            </Header>
          </div>
          <div
            onClick={() => setSidebarOpen(true)}
            className={cn(
              'absolute bottom-0 left-0 z-1 w-[56px] h-[48px] mb-[32px] flex items-center justify-center rounded-r-[24px] bg-purple hover:bg-purple-hover cursor-pointer',
              {
                hidden: isSidebarOpen,
              }
            )}
          >
            <Show className="text-white" />
          </div>

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
      </div>
    </main>
  );
}
