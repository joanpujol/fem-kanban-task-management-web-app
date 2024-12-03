import { create } from 'zustand';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/Task';
import { Subtask } from '../models/Subtask';
import { Board } from '../models/Board';
import { loadDataFromJson } from '../loadDataFromJson';

interface AppState {
  isDarkThemeActive: boolean;
  boards: Board[];
  tasks: Task[];
  toggleIsDarkThemeActive: () => void;
  moveTask: (taskId: string, toStatusId: string, toIndexId?: string) => void;
  addBoard: (board: Board) => void;
  updateBoard: (board: string, updates: Partial<Board>) => void;
  deleteBoard: (board: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  updateSubtask: (
    taskId: string,
    subtaskId: string,
    updates: Partial<Subtask>
  ) => void;
}

const useStore = create<AppState>((set) => {
  const { boards, tasks } = loadDataFromJson();

  return {
    isDarkThemeActive: false,
    boards,
    tasks,

    toggleIsDarkThemeActive: () =>
      set(
        produce((state) => {
          state.isDarkThemeActive = !state.isDarkThemeActive;
        })
      ),

    moveTask: (taskId: string, toStatusId: string, toIndexId?: string) =>
      set(
        produce((state) => {
          const taskToMoveIndex = state.tasks.findIndex(
            (task: Task) => task.id === taskId
          );
          if (taskToMoveIndex === -1) return;
          const taskToMove = state.tasks[taskToMoveIndex];

          // Find the index of the task we're dropping onto
          const targetIndex =
            state.tasks.findIndex((task: Task) => task.id === toIndexId) ?? 0;

          // Remove the task from its current position
          state.tasks.splice(taskToMoveIndex, 1);

          // Update the task's status
          taskToMove.statusId = toStatusId;

          // Insert the task at the target position
          state.tasks.splice(targetIndex, 0, taskToMove);

          // If the task was moved to a later position, we need to adjust the target index
          // because the removal of the task shifted the array
          const adjustedTargetIndex =
            taskToMoveIndex < targetIndex ? targetIndex - 1 : targetIndex;

          // Shifts tasks if necessary
          if (taskToMoveIndex !== adjustedTargetIndex) {
            const tasksToShift = state.tasks.slice(adjustedTargetIndex + 1);
            tasksToShift.forEach((task: Task, index: number) => {
              if (task.statusId === toStatusId) {
                state.tasks[adjustedTargetIndex + 1 + index] = task;
              }
            });
          }
        })
      ),

    addBoard: (board) =>
      set(
        produce((state) => {
          state.boards.push({ ...board });
        })
      ),

    updateBoard: (boardId, updates) =>
      set(
        produce((state) => {
          const board = state.boards.find(
            (board: Board) => board.id === boardId
          );
          if (board) Object.assign(board, updates);
        })
      ),

    deleteBoard: (boardId) =>
      set(
        produce((state) => {
          state.boards = state.boards.filter(
            (board: Board) => board.id !== boardId
          );
        })
      ),

    addTask: (task) =>
      set(
        produce((state) => {
          state.tasks.push({ ...task, id: uuidv4() });
        })
      ),

    updateTask: (taskId, updates) =>
      set(
        produce((state) => {
          const task = state.tasks.find((task: Task) => task.id === taskId);
          if (task) Object.assign(task, updates);
        })
      ),

    deleteTask: (taskId) =>
      set(
        produce((state) => {
          state.tasks = state.tasks.filter((task: Task) => task.id !== taskId);
        })
      ),

    updateSubtask: (taskId, subtaskId, updates) =>
      set(
        produce((state) => {
          const task = state.tasks.find((task: Task) => task.id === taskId);
          if (task) {
            const subtask = task.subtasks.find(
              (subtask: Subtask) => subtask.id === subtaskId
            );
            if (subtask) Object.assign(subtask, updates);
          }
        })
      ),
  };
});

export default useStore;
