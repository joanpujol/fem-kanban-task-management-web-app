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
