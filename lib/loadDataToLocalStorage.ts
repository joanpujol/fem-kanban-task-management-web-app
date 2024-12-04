import defaultData from './data.json';
import { v4 as uuidv4 } from 'uuid';
import { Board } from './models/Board';
import { generateRandomColors } from './generateRandomColors';
import { Task } from './models/Task';

type StoredData = {
  isDarkThemeActive: boolean;
  boards: {
    id?: string;
    name: string;
    columns: {
      id?: string;
      name: string;
      color: string;
      tasks: {
        id?: string;
        title: string;
        description: string;
        status: string;
        subtasks: {
          id?: string;
          title: string;
          isCompleted: boolean;
        }[];
      }[];
    }[];
  }[];
};

export async function loadDataToLocalStorage(): Promise<{
  isDarkThemeActive: boolean;
  boards: Board[];
  tasks: Task[];
}> {
  let data: StoredData = {
    isDarkThemeActive: false,
    boards: [],
  };

  if (typeof window !== 'undefined') {
    const localStorageData = localStorage.getItem('boardData');
    if (localStorageData) {
      data = JSON.parse(localStorageData);
    } else {
      data = defaultData;
    }
  }

  const boards: Board[] = data.boards.map((board) => ({
    id: board.id ?? uuidv4(),
    title: board.name,
    statuses: board.columns.map((column) => ({
      id: column.id ?? uuidv4(),
      name: column.name,
      color: column.color === '' ? generateRandomColors() : column.color,
    })),
  }));

  const tasks: Task[] = data.boards.flatMap((board) =>
    board.columns.flatMap((column) =>
      column.tasks.map((task) => ({
        id: task.id ?? uuidv4(),
        title: task.title,
        statusId:
          boards
            .find((b) => b.title === board.name)
            ?.statuses.find((s) => s.name === column.name)?.id || '',
        boardId: boards.find((b) => b.title === board.name)?.id || '',
        description: task.description,
        subtasks: task.subtasks.map((subtask) => ({
          id: subtask.id ?? uuidv4(),
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        })),
      }))
    )
  );

  return { isDarkThemeActive: data.isDarkThemeActive, boards, tasks };
}
