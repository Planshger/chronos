import UserModel from "../../admin/models/user_model";

export interface RegisterUserModel {
    token: string,
    data: UserModel,
}