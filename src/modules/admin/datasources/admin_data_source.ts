import { FilterValuesProps } from '../components/table/AdminTableFilterMenu';
import { PaginationModel } from '../models/user_pagination_model';
import UserModel from '../../../shared/models/user_model';
import { apiRequest } from '../../../shared/api/apiRequest';
import { queryClient } from '../../../shared/queryClient';

export function getAllUsers(): Promise<UserModel[]> {
  return apiRequest<UserModel[]>('/users');
}

export async function getUsersWithPagination(
  page: number,
  limit: number,
): Promise<PaginationModel> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  return queryClient.fetchQuery({
    queryKey: ['usersPag', params],
    queryFn: () => apiRequest<PaginationModel>(`/users?${params.toString()}`),
  });
}

export async function getSortBy(
  sortBy: string,
  page: number,
  limit: number,
  order?: 'asc' | 'desc',
): Promise<PaginationModel> {
  const sortParam = order === 'desc' ? `-${sortBy}` : sortBy;
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy: sortParam,
  });
  return apiRequest<PaginationModel>(`/users?${params.toString()}`);
}

export function getFilterData(
  page: number,
  limit: number,
  filterValues: FilterValuesProps[],
): Promise<PaginationModel> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  filterValues.forEach((item) => {
    if (item.value !== '') {
      params.set(item.id, item.value);
    }
  });
  return apiRequest<PaginationModel>(`/users?${params.toString()}`);
}

export async function deleteUserData(idsToDelete: number[]) {
  await Promise.all(
    idsToDelete.map((id) => apiRequest<void>(`/users/${id}`, { method: 'DELETE' })),
  );
}
