// prettier-ignore
import { HttpError, InvalidCredentialsError, InvalidUserRoleError } from '../../../shared/errors/AppError';
import UserModel, { Role } from '../../../shared/models/user_model';
import { RegisterUserModel } from '../models/register_user_model';
import { apiRequest } from '../../../shared/api/apiRequest';
import { queryClient } from '../../../shared/queryClient';

export async function register(user: UserModel, role: string = 'user'): Promise<RegisterUserModel> {
  return apiRequest<RegisterUserModel>('/register', {
    method: 'POST',
    body: JSON.stringify({ ...user, role }),
  });
}

export async function auth(user: UserModel, role: Role): Promise<RegisterUserModel> {
  let data: RegisterUserModel;
  try {
    data = await apiRequest<RegisterUserModel>('/auth', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
  } catch (error) {
    if (error instanceof HttpError && error.status === 401) {
      throw new InvalidCredentialsError();
    }
    throw error;
  }

  if (data.data.role !== role) {
    throw new InvalidUserRoleError();
  }

  return data;
}

export async function authMe(token: string): Promise<UserModel | null> {
  return queryClient.query({
    queryKey: ['authMe', token],
    queryFn: () =>
      apiRequest<UserModel | null>('/auth_me', {
        headers: { Authorization: `Bearer ${token}` },
      }),
  });
}
