import { TaskModel } from './task_model';

export interface TaskPaginationModel {
  meta: {
    total_items: number;
    total_pages: number;
    current_page: number;
    per_page: number;
    remaining_count: number;
  };
  items: TaskModel[];
}
