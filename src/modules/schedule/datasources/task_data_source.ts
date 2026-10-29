import { apiRequest } from '../../../shared/api/apiRequest';
import { initialTaskModel, Task, TaskItem, TaskModel } from '../models/task_model';

export function emptyDays(tasks: Task): Task {
  return Object.fromEntries(
    Object.entries(tasks).filter(([, list]) => Array.isArray(list) && list.length > 0),
  );
}

export async function getUserTasksByUserId(userId: number): Promise<TaskModel> {
  const params = new URLSearchParams({ userId: String(userId) });
  const data = await apiRequest<TaskModel[]>(`/tasks?${params.toString()}`);
  return data[0] ?? { ...initialTaskModel, userId };
}

export async function addTask(
  dateKey: string,
  newTask: TaskItem,
  taskData: TaskModel,
  userId: number,
): Promise<TaskModel> {
  const hasTaskData = taskData?.id && taskData.id !== 0;

  if (hasTaskData) {
    const mergedTasks: Task = {
      ...taskData.tasks,
      [dateKey]: [...(taskData.tasks?.[dateKey] ?? []), newTask],
    };
    return updateTasksData({ ...taskData, tasks: mergedTasks });
  }

  return apiRequest<TaskModel>('/tasks', {
    method: 'POST',
    body: JSON.stringify({ userId, tasks: { [dateKey]: [newTask] } }),
  });
}

export async function editTask(
  dateKey: string,
  newTask: TaskItem,
  taskData: TaskModel,
): Promise<TaskModel> {
  const dayTasks = taskData.tasks?.[dateKey] ?? [];
  const mergedTasks: Task = {
    ...taskData.tasks,
    [dateKey]: dayTasks.map((t) => (t.id === newTask.id ? newTask : t)),
  };
  return updateTasksData({ ...taskData, tasks: mergedTasks });
}

export async function updateTasksData(task: TaskModel): Promise<TaskModel> {
  const cleaned: TaskModel = { ...task, tasks: emptyDays(task.tasks) };
  return apiRequest<TaskModel>(`/tasks/${task.id}`, {
    method: 'PATCH',
    body: JSON.stringify(cleaned),
  });
}
