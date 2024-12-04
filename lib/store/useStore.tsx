import { create } from 'zustand';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/Task';
import { Board } from '../models/Board';

interface AppState {
  isDarkThemeActive: boolean;
  boards: Board[];
  tasks: Task[];
  setBoardsAndTasks: (
    isDarkThemeActive: boolean,
    boards: Board[],
    tasks: Task[]
  ) => void;
  toggleIsDarkThemeActive: () => void;
  moveTask: (taskId: string, toStatusId: string, toIndexId?: string) => void;
  addBoard: (board: Board) => void;
  updateBoard: (board: string, updates: Partial<Board>) => void;
  deleteBoard: (board: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

const useStore = create<AppState>((set) => {
  return {
    isDarkThemeActive: false,
    boards: [],
    tasks: [],

    setBoardsAndTasks: (
      isDarkThemeActive: boolean,
      boards: Board[],
      tasks: Task[]
    ) =>
      set(
        produce((state) => {
          state.isDarkThemeActive = isDarkThemeActive;
          state.boards = boards;
          state.tasks = tasks;
        })
      ),

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

          const taskToMove = { ...state.tasks[taskToMoveIndex] };
          taskToMove.statusId = toStatusId;

          // Remove the task from its current position
          const newTasks = state.tasks.filter(
            (_: Task, index: number) => index !== taskToMoveIndex
          );

          // Determine the target index for insertion
          const targetIndex = toIndexId
            ? newTasks.findIndex((task: Task) => task.id === toIndexId)
            : newTasks.length; // If no target ID, append to the end

          newTasks.splice(targetIndex, 0, taskToMove);

          state.tasks = newTasks;
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
  };
});

export default useStore;
