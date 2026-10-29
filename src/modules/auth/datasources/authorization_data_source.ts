import UserModel, { Role } from '../../../shared/models/user_model';
import { RegisterUserModel } from '../models/register_user_model';
import { apiRequest } from '../../../shared/api/apiRequest';
import { HttpError, InvalidCredentialsError } from '../../../shared/errors/AppError';

const TOKEN_KEY = 'token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setTokenInStorage(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

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

  if ((data.data.role ?? '') !== role) {
    throw new InvalidCredentialsError();
  }

  return data;
}

export async function authMe(token: string): Promise<UserModel | null> {
  return apiRequest<UserModel | null>('/auth_me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}
