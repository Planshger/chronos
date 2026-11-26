import { UserModel } from '../../../shared';

export interface RegisterUserModel {
  token: string;
  data: UserModel;
}
