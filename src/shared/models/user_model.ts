export enum Role {
  User = 'user',
  Admin = 'admin',
}

export enum UserStatus {
  Active = 'Активен',
  Blocked = 'Заблокирован',
  PendingPayment = 'Ожидание оплаты',
}

export default interface UserModel {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: UserStatus | '';
  password?: string;
  tgLinked: boolean;
  role: Role;
}

export const initialUser: UserModel = {
  id: -1,
  name: '',
  email: '',
  plan: '',
  status: '',
  password: '',
  role: Role.User,
  tgLinked: false,
};

export function isAuthorizedUser(user: UserModel): user is UserModel {
  return Boolean(
    user && user.id !== initialUser.id && user.id > 0 && user.name !== initialUser.name && user.email !== initialUser.email,
  );
}
