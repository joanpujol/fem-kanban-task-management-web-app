import { Board } from './models/Board';
import { Task } from './models/Task';

export function saveDataToLocalStorage(boards: Board[], tasks: Task[]): void {
  const dataToSave = {
    boards: boards.map((board) => ({
      name: board.title,
      columns: board.statuses.map((status) => ({
        name: status.name,
        color: status.color,
        tasks: tasks
          .filter(
            (task) => task.boardId === board.id && task.statusId === status.id
          )
          .map((task) => ({
            title: task.title,
            description: task.description,
            subtasks: task.subtasks.map((subtask) => ({
              title: subtask.title,
              isCompleted: subtask.isCompleted,
            })),
          })),
      })),
    })),
  };

  localStorage.setItem('boardData', JSON.stringify(dataToSave));
}
