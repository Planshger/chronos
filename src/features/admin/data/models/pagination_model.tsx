import UserModel from "./user_model"

export interface PaginationModel {
    meta: {
        total_items: number,
        total_pages: number,
        current_page: number,
        per_page: number,
        remaining_count: number
    },
    items: UserModel[]        
}