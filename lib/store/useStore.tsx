import { create } from 'zustand';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/Task';
import { Status } from '../models/Status';
import { Subtask } from '../models/Subtask';

interface AppState {
  tasks: Task[];
  statuses: Status[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  addSubtask: (taskId: string, subtask: Omit<Subtask, 'id'>) => void;
  updateSubtask: (
    taskId: string,
    subtaskId: string,
    updates: Partial<Subtask>
  ) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  addStatus: (status: Omit<Status, 'id'>) => void;
  updateStatus: (statusId: string, updates: Partial<Status>) => void;
  deleteStatus: (statusId: string) => void;
}

const useStore = create<AppState>((set) => ({
  tasks: [
    {
      id: uuidv4(),
      title: 'Build UI for onboard flow',
      statusId: '1',
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
  statuses: [
    {
      id: '1',
      name: 'TODO',
      color: '#49C4E5',
    },
    {
      id: '2',
      name: 'DOING',
      color: '#8471F2',
    },
    {
      id: '3',
      name: 'DONE',
      color: '#67E2AE',
    },
  ],

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

  addSubtask: (taskId, subtask) =>
    set(
      produce((state) => {
        const task = state.tasks.find((task: Task) => task.id === taskId);
        if (task) task.subtasks.push({ ...subtask, id: uuidv4() });
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

  deleteSubtask: (taskId, subtaskId) =>
    set(
      produce((state) => {
        const task = state.tasks.find((task: Task) => task.id === taskId);
        if (task) {
          task.subtasks = task.subtasks.filter(
            (subtask: Subtask) => subtask.id !== subtaskId
          );
        }
      })
    ),

  addStatus: (status) =>
    set(
      produce((state) => {
        state.statuses.push({ ...status, id: uuidv4() });
      })
    ),

  updateStatus: (statusId, updates) =>
    set(
      produce((state) => {
        const status = state.statuses.find(
          (status: Status) => status.id === statusId
        );
        if (status) Object.assign(status, updates);
      })
    ),

  deleteStatus: (statusId) =>
    set(
      produce((state) => {
        state.statuses = state.statuses.filter(
          (status: Status) => status.id !== statusId
        );
      })
    ),
}));

export default useStore;
