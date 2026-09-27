import UserModel from "../../features/admin/models/user_model";
import { RegisterUserModel } from "../../features/registrarion/models/register_user_model";
import { API_BASE_URL } from "../api/URL";

const TOKEN_KEY = 'token';

const headers = {Accept: "application/json", "Content-Type": "application/json"};

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

export async function register(user: UserModel, role: string = 'user'):  Promise<RegisterUserModel> {
  const res = await fetch(`${API_BASE_URL}/register`, { 
    method: "POST", 
    headers: {...headers},
      body: JSON.stringify({...user, role}),
  });

  return res.json();
} 

export async function auth(user: UserModel): Promise<Response> {
  return await fetch(`${API_BASE_URL}/auth`, { 
    method: "POST", 
    headers: {...headers},
      body:JSON.stringify({
      email: user.email,
      password: user.password,
    })
  });
}

export async function authMe(token: string): Promise<UserModel | null> {
  const res = await fetch(`${API_BASE_URL}/auth_me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
}

export async function errorHandlerFromAPI<T>(fnc: () => Promise<Response>): Promise<T> {
    const res = await fnc();
    if(!res.ok) {
      if(res.status === 401) {
        alert('Пользователь не найден');
      } else {
        const dataError = await res.json();
        alert(dataError.message);
      }  
    } 
    return res.json();
}
