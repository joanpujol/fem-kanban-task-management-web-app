import { Board } from './models/Board';
import { Task } from './models/Task';

export function saveDataToLocalStorage(
  isDarkThemeActive: boolean,
  boards: Board[],
  tasks: Task[]
): void {
  const dataToSave = {
    isDarkThemeActive: isDarkThemeActive,
    boards: boards.map((board) => ({
      id: board.id,
      name: board.title,
      columns: board.statuses.map((status) => ({
        id: status.id,
        name: status.name,
        color: status.color,
        tasks: tasks
          .filter(
            (task) => task.boardId === board.id && task.statusId === status.id
          )
          .map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            subtasks: task.subtasks.map((subtask) => ({
              id: subtask.id,
              title: subtask.title,
              isCompleted: subtask.isCompleted,
            })),
          })),
      })),
    })),
  };

  localStorage.setItem('boardData', JSON.stringify(dataToSave));
}
