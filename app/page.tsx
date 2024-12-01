'use client';

import useStore from '@/lib/store/useStore';
import Header from '@/components/atoms/Header';
import { useState } from 'react';
import BoardTopBar from '@/components/molecules/BoardTopBar';
import { cn } from '@/lib/utils';
import { Task } from '@/lib/models/Task';
import ViewTaskDialog from '@/components/organisms/dialogs/ViewTaskDialog';
import CreateEditTaskDialog from '@/components/organisms/dialogs/CreateEditTaskDialog';
import DeleteTaskBoardDialog from '@/components/organisms/dialogs/DeleteTaskBoardDialog';
import CreateEditBoardDialog from '@/components/organisms/dialogs/CreateEditBoardDialog';
import BoardDialog from '@/components/molecules/BoardDialog';
import MobileBoardMenu from '@/components/molecules/MobileBoardMenu';
import BoardSideMenu from '@/components/molecules/BoardSideMenu';
import { Logo } from '@/components/atoms/svgs/Logo';
import Column from '@/components/molecules/Column';
import Button from '@/components/atoms/Button';

export default function ExamplePage() {
  const allBoards = useStore((state) => state.boards);
  const allTasks = useStore((state) => state.tasks) ?? [];
  const isDarkThemeActive = useStore((state) => state.isDarkThemeActive);

  const [currentBoardId, setCurrentBoardId] = useState(
    () => allBoards[0]?.id || ''
  );
  const board = allBoards.find((b) => b.id === currentBoardId) ?? {
    id: '',
    statuses: [],
    title: '',
  };

  const tasks = allTasks.filter((task) => task.boardId === board.id);

  const [currentTask, setCurrentTask] = useState(tasks[0]);

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [dialogType, setDialogType] = useState<'create' | 'edit'>('create');
  const [deleteDialogType, setDeleteDialogType] = useState<'task' | 'board'>(
    'task'
  );

  const [isCreateEditTaskDialogOpen, setIsCreateEditTaskDialogOpen] =
    useState(false);
  const [isDeleteTaskBoardDialogOpen, setDeleteIsTaskBoardDialogOpen] =
    useState(false);
  const [isCreateEditBoardDialogOpen, setIsCreateEditBoardDialogOpen] =
    useState(false);
  const [isMobileBoardMenuOpen, setIsMobileBoardMenuOpen] = useState(false);
  const [isViewTaskDialogOpen, setIsViewTaskDialogOpen] = useState(false);

  const handleOpenCreateEditTaskDialog = (
    task: Task,
    dialogType: 'create' | 'edit'
  ) => {
    setDialogType(dialogType);
    setCurrentTask({ ...task });
    setIsCreateEditTaskDialogOpen(true);
    setIsViewTaskDialogOpen(false);
  };

  const handleOpenDeleteTaskBoardDialog = (
    deleteDialogType: 'task' | 'board'
  ) => {
    setIsViewTaskDialogOpen(false);
    setDeleteDialogType(deleteDialogType);
    setDeleteIsTaskBoardDialogOpen(true);
  };

  const handleOpenCreateEditBoardDialog = (dialogType: 'create' | 'edit') => {
    setDialogType(dialogType);
    setIsCreateEditBoardDialogOpen(true);
  };

  return (
    <div className={cn(isDarkThemeActive ? 'dark' : 'light')}>
      <div
        className={cn(
          'md:grid md:min-h-screen',
          isSidebarOpen
            ? 'md:grid-cols-[260px,1fr] lg:grid-cols-[300px,1fr]'
            : 'md:grid-cols-[200px,1fr] lg:grid-cols-[210px,1fr]'
        )}
      >
        <div className="md:pl-[24px] lg:pl-[32px] h-[96px] hidden md:flex items-center bg-background-soft border-r border-border-primary">
          <Logo className="text-contrast-pure" />
        </div>
        <BoardTopBar
          board={board}
          handleOpenCreateEditTaskDialog={(dialogType: 'create' | 'edit') =>
            handleOpenCreateEditTaskDialog(currentTask, dialogType)
          }
          handleOpenDeleteTaskBoardDialog={(
            deleteDialogType: 'task' | 'board'
          ) => handleOpenDeleteTaskBoardDialog(deleteDialogType)}
          handleOpenCreateEditBoardDialog={(dialogType: 'create' | 'edit') =>
            handleOpenCreateEditBoardDialog(dialogType)
          }
          toggleMobileBoardMenuOpen={() => {
            setIsMobileBoardMenuOpen(!isMobileBoardMenuOpen);
          }}
          isMobileBoardMenuOpen={isMobileBoardMenuOpen}
          mobileBoardMenu={
            <MobileBoardMenu
              handleOpenCreateEditBoardDialog={() =>
                handleOpenCreateEditBoardDialog('create')
              }
              allBoards={allBoards}
              currentBoardId={currentBoardId}
              setCurrentBoardId={setCurrentBoardId}
              open={isMobileBoardMenuOpen}
              handleClose={() => setIsMobileBoardMenuOpen(false)}
            />
          }
        />
        <BoardSideMenu
          isSidebarOpen={isSidebarOpen}
          allBoards={allBoards}
          currentBoardId={currentBoardId}
          setCurrentBoardId={setCurrentBoardId}
          setSidebarOpen={setSidebarOpen}
        />
        <main
          className={cn(
            'overflow-y-auto h-[calc(100vh-64px)] md:h-[calc(100vh-96px)] overflow-x-auto bg-background-pure border-t border-border-primary',
            {
              'md:col-span-2': !isSidebarOpen,
            }
          )}
        >
          {!board.id ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <Header variant="lg" className="text-medium-gray mb-[32px]">
                There are no boards. Create a new board to get started.
              </Header>
              <Button
                onClick={() => handleOpenCreateEditBoardDialog('create')}
                size="large"
              >
                + Add New Board
              </Button>
            </div>
          ) : undefined}
          {board.id && !board.statuses.length ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <Header variant="lg" className="text-medium-gray mb-[32px]">
                This board is empty. Create a new column to get started.
              </Header>
              <Button
                onClick={() => handleOpenCreateEditBoardDialog('edit')}
                size="large"
              >
                + Add New Column
              </Button>
            </div>
          ) : undefined}
          {board.id && board.statuses.length ? (
            <div
              className={
                'flex gap-x-[24px] px-[16px] py-[24px] md:p-[24px] md:pb-[50px] min-w-max min-h-full'
              }
            >
              {board.statuses.map((status) => (
                <Column
                  key={status.id}
                  status={status}
                  tasks={tasks}
                  handleOpenDialog={(task: Task) => {
                    setCurrentTask({ ...task });
                    setIsViewTaskDialogOpen(true);
                  }}
                />
              ))}
              <div
                onClick={() => handleOpenCreateEditBoardDialog('edit')}
                className="group w-[280px] bg-gradient-to-b from-new-column-color to-new-column-color/50 rounded-[6px] mt-[39px] cursor-pointer"
              >
                <Header
                  variant="xl"
                  className="text-medium-gray flex justify-center items-center h-full group-hover:text-main"
                >
                  + New Column
                </Header>
              </div>
            </div>
          ) : undefined}
        </main>
      </div>
      <BoardDialog
        open={isViewTaskDialogOpen}
        onOpenChange={setIsViewTaskDialogOpen}
        handleCloseDialog={() => setIsViewTaskDialogOpen(false)}
        dialogTitle={'View Task Dialog'}
        dialogDescription={'A Dialog to view task details'}
      >
        <ViewTaskDialog
          board={board}
          task={currentTask}
          setCurrentTask={setCurrentTask}
          handleOpenCreateEditTaskDialog={(dialogType: 'create' | 'edit') =>
            handleOpenCreateEditTaskDialog(currentTask, dialogType)
          }
          handleOpenDeleteTaskBoardDialog={(
            deleteDialogType: 'task' | 'board'
          ) => handleOpenDeleteTaskBoardDialog(deleteDialogType)}
        />
      </BoardDialog>
      <BoardDialog
        open={isCreateEditTaskDialogOpen}
        onOpenChange={setIsCreateEditTaskDialogOpen}
        handleCloseDialog={() => setIsCreateEditTaskDialogOpen(false)}
        dialogTitle={'CreateEdit Task Dialog'}
        dialogDescription={'A Dialog to create and edit task details'}
      >
        <CreateEditTaskDialog
          board={board}
          task={currentTask}
          dialogType={dialogType}
        />
      </BoardDialog>
      <BoardDialog
        open={isCreateEditBoardDialogOpen}
        onOpenChange={setIsCreateEditBoardDialogOpen}
        handleCloseDialog={() => setIsCreateEditBoardDialogOpen(false)}
        dialogTitle={'CreateEdit Board Dialog'}
        dialogDescription={'A Dialog to create and edit board details'}
      >
        <CreateEditBoardDialog
          board={board}
          dialogType={dialogType}
          setCurrentBoardId={setCurrentBoardId}
        />
      </BoardDialog>
      <BoardDialog
        open={isDeleteTaskBoardDialogOpen}
        onOpenChange={setDeleteIsTaskBoardDialogOpen}
        handleCloseDialog={() => setDeleteIsTaskBoardDialogOpen(false)}
        dialogTitle={'Delete TaskBoard Dialog'}
        dialogDescription={'A Dialog to delete tasks and boards'}
      >
        <DeleteTaskBoardDialog
          board={board}
          task={currentTask}
          dialogType={deleteDialogType}
        />
      </BoardDialog>
    </div>
  );
}
