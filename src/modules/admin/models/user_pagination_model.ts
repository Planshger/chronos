import { UserModel } from '../../../shared';

export interface PaginationModel {
  meta: {
    total_items: number;
    total_pages: number;
    current_page: number;
    per_page: number;
    remaining_count: number;
  };
  items: UserModel[];
}
