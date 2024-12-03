import defaultData from './data.json';
import { v4 as uuidv4 } from 'uuid';
import { Board } from './models/Board';
import { generateRandomColors } from './generateRandomColors';
import { Task } from './models/Task';

type StoredData = typeof defaultData;

export async function loadDataFromJson(): Promise<{
  boards: Board[];
  tasks: Task[];
}> {
  let data: StoredData = {
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
    id: uuidv4(),
    title: board.name,
    statuses: board.columns.map((column) => ({
      id: uuidv4(),
      name: column.name,
      color: column.color === '' ? generateRandomColors() : column.color,
    })),
  }));

  const tasks: Task[] = data.boards.flatMap((board) =>
    board.columns.flatMap((column) =>
      column.tasks.map((task) => ({
        id: uuidv4(),
        title: task.title,
        statusId:
          boards
            .find((b) => b.title === board.name)
            ?.statuses.find((s) => s.name === column.name)?.id || '',
        boardId: boards.find((b) => b.title === board.name)?.id || '',
        description: task.description,
        subtasks: task.subtasks.map((subtask) => ({
          id: uuidv4(),
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        })),
      }))
    )
  );

  return { boards, tasks };
}
