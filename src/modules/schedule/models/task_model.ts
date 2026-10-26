export interface TaskModel {
  id?: number;
  userId: number;
  tasks: Task;
}

export const initialTaskModel: TaskModel = { id: 0, userId: 0, tasks: {} };

export interface Task {
  [dateKey: string]: TaskItem[];
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  type: string;
}

export const initialTaskItem: TaskItem = { id: '', title: '', description: '', type: 'задача' };
