export type Role = 'user' | 'admin' | '';

export default interface UserModel {
    id: number,
    name: string,
    email: string,
    plan: string,
    status: string,
    password?: string 
    tgLinked: boolean,
    role: Role,
}

export const initialUser: UserModel = {id: 0, name: '', email: '', plan: '', status: '', password: '', role: '', tgLinked: false};