import { Subtask } from './Subtask';

export interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
  statusId: string;
  boardId: string;
}
