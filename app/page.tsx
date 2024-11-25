'use client';

import Button from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { Hide } from '@/components/atoms/svgs/Hide';
import { Show } from '@/components/atoms/svgs/Show';
import ThemeToggle from '@/components/atoms/ThemeToggle';
import BoardDialog from '@/components/molecules/BoardDialog';
import BoardSideMenu from '@/components/molecules/BoardSideMenu';
import BoardTopBar from '@/components/molecules/BoardTopBar';
import Column from '@/components/molecules/Column';
import CreateBoardDialog from '@/components/organisms/dialogs/CreateBoardDialog';
import EditBoardDialog from '@/components/organisms/dialogs/EditBoardDialog';
import { Board } from '@/lib/models/Board';
import useStore from '@/lib/store/useStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Home() {
  const allBoards = useStore((state) => state.boards) ?? [
    {
      id: '',
      statuses: [],
      title: '',
    },
  ];
  const allTasks = useStore((state) => state.tasks) ?? [];
  const isDarkThemeActive = useStore((state) => state.isDarkThemeActive);
  const toggleIsDarkThemeActive = useStore(
    (state) => state.toggleIsDarkThemeActive
  );

  let board: Board = allBoards[0];

  const [currentBoardId, setCurrentBoardId] = useState(board.id);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  if (allBoards.length) {
    board = allBoards.find((board) => board.id === currentBoardId) ?? board;
  }

  const tasks = allTasks.filter((task) => task.boardId === board?.id);

  return (
    <main
      className={cn(
        'min-h-screen grid',
        isSidebarOpen ? 'grid-cols-[300px,1fr]' : 'grid-cols-[210px,1fr]',
        isDarkThemeActive ? 'dark' : 'light'
      )}
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
            'flex flex-row gap-[24px] p-[24px] min-h-[calc(100vh-96px)] border-t border-border-primary bg-background-pure',
            {
              'ml-[-210px]': !isSidebarOpen,
            }
          )}
        >
          <ThemeToggle
            className={cn('absolute bottom-0 left-0 mb-[88px]', {
              hidden: !isSidebarOpen,
            })}
            isDarkThemeActive={isDarkThemeActive}
            toggleIsDarkThemeActive={toggleIsDarkThemeActive}
          />
          <div
            onClick={() => setSidebarOpen(false)}
            className={cn(
              'absolute bottom-0 left-0 z-1 w-[calc(300px-24px)] group flex gap-[12px] items-center mb-[32px] pl-[24px] h-[48px] hover:bg-hover-secondary rounded-r-[24px] cursor-pointer',
              {
                hidden: !isSidebarOpen,
              }
            )}
          >
            <Hide className="text-medium-gray group-hover:text-main" />
            <Header
              variant="md"
              className="text-medium-gray group-hover:text-main"
            >
              Hide Sidebar
            </Header>
          </div>
          <div
            onClick={() => setSidebarOpen(true)}
            className={cn(
              'absolute bottom-0 left-0 z-1 w-[56px] h-[48px] mb-[32px] flex items-center justify-center rounded-r-[24px] bg-main hover:bg-hover-primary cursor-pointer',
              {
                hidden: isSidebarOpen,
              }
            )}
          >
            <Show className="text-white" />
          </div>
          {!board.id ? (
            <div className="flex flex-col items-center justify-center w-full">
              <Header variant="lg" className="text-medium-gray mb-[32px]">
                There are no boards. Create a new board to get started.
              </Header>
              <BoardDialog
                dialogTitle="Create Board Dialog"
                dialogContent={
                  <CreateBoardDialog setCurrentBoardId={setCurrentBoardId} />
                }
              >
                <Button size="large">+ Add New Board</Button>
              </BoardDialog>
            </div>
          ) : undefined}
          {board.id && board.statuses.length ? (
            <>
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
              <div className="group w-[280px] bg-gradient-to-b from-new-column-color to-new-column-color/50 rounded-[6px]">
                <BoardDialog
                  dialogTitle="Edit Board Dialog"
                  className="h-full"
                  dialogContent={<EditBoardDialog board={board} />}
                >
                  <Header
                    variant="xl"
                    className="text-medium-gray flex justify-center items-center h-full group-hover:text-main"
                  >
                    + New Column
                  </Header>
                </BoardDialog>
              </div>
            </>
          ) : undefined}
          {board.id && !board.statuses.length ? (
            <div className="flex flex-col items-center justify-center w-full">
              <Header variant="lg" className="text-medium-gray mb-[32px]">
                This board is empty. Create a new column to get started.
              </Header>
              <BoardDialog
                dialogTitle="Edit Board Dialog"
                dialogContent={<EditBoardDialog board={board} />}
              >
                <Button size="large">+ Add New Column</Button>
              </BoardDialog>
            </div>
          ) : undefined}
        </div>
      </div>
    </main>
  );
}
