export interface TaskModel {
  [dateKey: string]: { id: string; title: string; description: string; type: string }[];
}