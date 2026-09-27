import { FilterValuesProps } from "../../features/admin/components/table/AdminTableFilterMenu";
import { PaginationModel } from "../../features/admin/models/pagination_model";
import UserModel from "../../features/admin/models/user_model";
import { API_BASE_URL } from "../api/URL";


export const Loading = async (fn: () => Promise<unknown> | unknown, onLoading: (value: boolean) => void) => {
    onLoading(true);
    try {
        await fn();
    } finally {
        onLoading(false);
    }
}

export function getAllUsers(): Promise<UserModel[]> {
    return fetch(`${API_BASE_URL}/users`, {method: 'GET'}).then(res => res.json());;
}

export async function getUsersWithPagination(page: number, limit: number): Promise<PaginationModel> {
    let responce = await fetch(`${API_BASE_URL}/users?page=${page}&limit=${limit}`).then((res) => res.json());
    return responce;
}

export async function getSortBy(sortBy: string, page: number, limit: number, order?: 'asc' | 'desc') : Promise<PaginationModel> {
    const sortParam = order === 'desc' ? `-${sortBy}` : sortBy;
    let responce = await fetch(`${API_BASE_URL}/users?page=${page}&limit=${limit}&sortBy=${sortParam}`).then((res) => res.json());
    return responce;
}

export function getFilterData(page: number, limit: number, filterValues: FilterValuesProps[]): Promise<PaginationModel> {
    let str = `${API_BASE_URL}/users?page=${page}&limit=${limit}`;
    filterValues.map((item) => {
        if(item.value !== '') {str += `&${item.id}=${item.value}`;}
    });
    return fetch(str).then(res => res.json());
}

export async function deleteUserData(idsToDelete: number[]) {
    for (const id of idsToDelete) {
        await fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });
    }
}

export async function updateUserData(user: UserModel) {
    await fetch(`${API_BASE_URL}/users/${user.id}`, {method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user)});
}

