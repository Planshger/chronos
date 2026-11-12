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
  role: Role | '';
}

export const initialUser: UserModel = {
  id: 0,
  name: '',
  email: '',
  plan: '',
  status: '',
  password: '',
  role: '',
  tgLinked: false,
};
