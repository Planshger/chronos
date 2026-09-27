export type Role = 'user' | 'admin';

export default interface UserModel {
    id: number,
    name: string,
    email: string,
    plan: string,
    status: string,
    password?: string,
    role?: Role,
}