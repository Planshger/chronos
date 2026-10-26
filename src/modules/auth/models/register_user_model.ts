import UserModel from '../../../shared/models/user_model';

export interface RegisterUserModel {
  token: string;
  data: UserModel;
}
