export enum Role {
  User = 'user',
  Admin = 'admin',
}

export enum UserStatus {
  Active = 'Активен',
  Blocked = 'Заблокирован',
  PendingPayment = 'Ожидание оплаты',
  NotActive = 'Не активен',
}

export default interface UserModel {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: UserStatus;
  password?: string;
  tgLinked: boolean;
  role: Role;
}

export const initialUser: UserModel = {
  id: -1,
  name: '',
  email: '',
  plan: '',
  status: UserStatus.NotActive,
  password: '',
  role: Role.User,
  tgLinked: false,
};

export function isAuthorizedUser(user: UserModel): user is UserModel {
  return Boolean(
    user && user.id !== initialUser.id && user.id > 0 && user.name !== initialUser.name && user.email !== initialUser.email,
  );
}
