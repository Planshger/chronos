import UserModel from '../models/user_model';
import { apiRequest } from './apiRequest';

export async function updateUserData(user: UserModel): Promise<UserModel> {
  return apiRequest<UserModel>(`/users/${user.id}`, {
    method: 'PATCH',
    body: JSON.stringify(user),
  });
}
