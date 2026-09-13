import React from "react";
import { API_BASE_URL } from "../../../../core/constants/url";
import { FilterValuesProps } from "../../components/table/AdminTableFilterMenu";
import { PaginationModel } from "../models/pagination_model";
import UserModel from "../models/user_model";

export function getAllUsers(): Promise<UserModel[]> {
    return fetch(API_BASE_URL, {method: 'GET'}).then(res => res.json());;
}

export async function getUsersWithPagination(page: number, limit: number): Promise<PaginationModel> {
    let responce = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`).then((res) => res.json());
    return responce;
}

export async function getSortBy(sortBy: string, page: number, limit: number, order?: 'asc' | 'desc') : Promise<PaginationModel> {
    const sortParam = order === 'desc' ? `-${sortBy}` : sortBy;
    let responce = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}&sortBy=${sortParam}`).then((res) => res.json());
    return responce;
}

export function getFilterData(page: number, limit: number, filterValues: FilterValuesProps[]) {
    let str = `${API_BASE_URL}?page=${page}&limit=${limit}`;
    filterValues.map((item) => {
        if(item.value != '') {str += `&${item.id}=${item.value}`;}
    });
    return fetch(str).then(res => res.json())
}

export async function deleteUserData(idsToDelete: number[]) {
    for (const id of idsToDelete) {
        await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    }
}

export const Loading = async (fn: () => Promise<unknown> | unknown, onLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    onLoading(true);
    try {
        await fn();
    } finally {
        onLoading(false);
    }
}

