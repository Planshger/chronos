import { API_BASE_URL } from "../api/URL";
import { Task, TaskItem, TaskModel } from "../../features/schedule/models/task_model";


export function emptyDays(tasks: Task): Task {
    return Object.fromEntries(
        Object.entries(tasks).filter(([, list]) => Array.isArray(list) && list.length > 0)
    );
}

export async function getUserTasksByUserId(userId: number): Promise<TaskModel | undefined> {
  const res = await fetch(`${API_BASE_URL}/tasks?userId=${userId}`);
  const data: TaskModel[] = await res.json();
  return data[0];
}

export async function addTask(dateKey: string, newTask: TaskItem, taskData: TaskModel, userId: number): Promise<TaskModel> {
  const hasTaskData = taskData?.id && taskData.id !== 0;

  if (hasTaskData) {
    const mergedTasks: Task = {
      ...taskData.tasks,
      [dateKey]: [...(taskData.tasks?.[dateKey] ?? []), newTask],
    };
    return updateTasksData({ ...taskData, tasks: mergedTasks });
  }

  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, tasks: { [dateKey]: [newTask] } }),
  });
  return res.json();
}


export async function editTask(dateKey: string, newTask: TaskItem, taskData: TaskModel): Promise<TaskModel> {
    const dayTasks = taskData.tasks?.[dateKey] ?? [];
    const mergedTasks: Task = {
      ...taskData.tasks,
      [dateKey]: dayTasks.map(t => t.id === newTask.id ? newTask : t),
    };
    return updateTasksData({ ...taskData, tasks: mergedTasks });
}

export async function updateTasksData(task: TaskModel): Promise<TaskModel> {
  const cleaned: TaskModel = { ...task, tasks: emptyDays(task.tasks) };
  const res = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cleaned),
  });
  return res.json();
}



