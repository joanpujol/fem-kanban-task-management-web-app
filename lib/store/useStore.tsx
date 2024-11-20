import { create } from 'zustand';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/Task';
import { Subtask } from '../models/Subtask';
import { Board } from '../models/Board';

interface AppState {
  boards: Board[];
  tasks: Task[];
  addBoard: (board: Omit<Board, 'id'>) => void;
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

const useStore = create<AppState>((set) => ({
  boards: [
    {
      id: '123',
      title: 'Platform Launch',
      statuses: [
        {
          id: '1',
          name: 'Todo',
          color: '#49C4E5',
        },
        {
          id: '2',
          name: 'Doing',
          color: '#8471F2',
        },
        {
          id: '3',
          name: 'Done',
          color: '#67E2AE',
        },
        {
          id: '4',
          name: 'Review',
          color: '#FFA500',
        },
      ],
    },
  ],
  tasks: [
    {
      id: uuidv4(),
      title: 'Build UI for onboard flow',
      statusId: '1',
      boardId: '123',
      description:
        'Not just another task, lorem ipsum dolor sit amet, this will be a long text.',
      subtasks: [
        {
          id: '124',
          title: 'A subtask',
          isCompleted: true,
        },
        {
          id: '125',
          title: 'Another subtask',
          isCompleted: false,
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Build UI for onboard flow',
      statusId: '2',
      boardId: '123',
      description: 'Not just another task',
      subtasks: [
        {
          id: '124',
          title: 'A subtask',
          isCompleted: false,
        },
        {
          id: '125',
          title: 'Another subtask',
          isCompleted: false,
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Build UI for onboard flow',
      statusId: '2',
      boardId: '123',
      description: 'Not just another task',
      subtasks: [
        {
          id: '124',
          title: 'A subtask',
          isCompleted: true,
        },
        {
          id: '125',
          title: 'Another subtask',
          isCompleted: false,
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Build UI for onboard flow',
      statusId: '3',
      boardId: '123',
      description: 'Not just another task',
      subtasks: [
        {
          id: '124',
          title: 'A subtask',
          isCompleted: true,
        },
        {
          id: '125',
          title: 'Another subtask',
          isCompleted: true,
        },
      ],
    },
  ],

  addBoard: (board) =>
    set(
      produce((state) => {
        state.boards.push({ ...board, id: uuidv4() });
      })
    ),

  updateBoard: (boardId, updates) =>
    set(
      produce((state) => {
        const board = state.boards.find((board: Board) => board.id === boardId);
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
}));

export default useStore;
