import { create } from 'zustand';
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
  getTasksByColumnId: (columnId: string) => Task[];
  addSubtask: (taskId: string, subtask: Omit<Subtask, 'id'>) => void;
  updateSubtask: (taskId: string, subtaskId: string, updates: Partial<Subtask>) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  addStatus: (status: Omit<Status, 'id'>) => void;
  updateStatus: (statusId: string, updates: Partial<Status>) => void;
  deleteStatus: (statusId: string) => void;
}

const useStore = create<AppState>((set, get) => ({
  tasks: [
    {
      id: uuidv4(),
      title: "Build UI for onboard flow",
      statusId: "123",
      description: "Not just another task",
      subtasks: [
        {
          id: "124",
          title: "A subtask",
          isCompleted: true
        },
        {
          id: "125",
          title: "Another subtask",
          isCompleted: false
        }
      ]
    },
    {
      id: uuidv4(),
      title: "Build UI for onboard flow",
      statusId: "123",
      description: "Not just another task",
      subtasks: [
        {
          id: "124",
          title: "A subtask",
          isCompleted: true
        },
        {
          id: "125",
          title: "Another subtask",
          isCompleted: false
        }
      ]
    },
  ],
  statuses: [],

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: uuidv4() }]
  })),

  updateTask: (taskId, updates) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    )
  })),

  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),

  getTasksByColumnId: (columnId: string) => {
    const { tasks } = get();
    return tasks.filter((task: Task) => task.statusId === columnId);
  },

  addSubtask: (taskId, subtask) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId 
        ? { ...task, subtasks: [...task.subtasks, { ...subtask, id: uuidv4() }] }
        : task
    )
  })),

  updateSubtask: (taskId, subtaskId, updates) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId 
        ? {
            ...task,
            subtasks: task.subtasks.map(subtask => 
              subtask.id === subtaskId ? { ...subtask, ...updates } : subtask
            )
          }
        : task
    )
  })),

  deleteSubtask: (taskId, subtaskId) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId 
        ? { ...task, subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId) }
        : task
    )
  })),

  addStatus: (status) => set((state) => ({
    statuses: [...state.statuses, { ...status, id: uuidv4() }]
  })),

  updateStatus: (statusId, updates) => set((state) => ({
    statuses: state.statuses.map(status => 
      status.id === statusId ? { ...status, ...updates } : status
    )
  })),

  deleteStatus: (statusId) => set((state) => ({
    statuses: state.statuses.filter(status => status.id !== statusId)
  })),
}));

export default useStore;
