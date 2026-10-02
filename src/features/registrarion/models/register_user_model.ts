import UserModel from "../../../core/ models/user_model";

export interface RegisterUserModel {
    token: string,
    data: UserModel,
}