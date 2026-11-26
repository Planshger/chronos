import { EmptyResponseError, HttpError, NetworkError, ResponseParseError } from '../errors/AppError';
import { getToken } from './authToken';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_ENDPOINTS = new Set(['/auth', '/register', '/auth_me']);

type UnauthorizedHandler = (token: string) => void;

let unauthorizedHandler: UnauthorizedHandler | null = null;

export function registerUnauthorizedHandler(handler: UnauthorizedHandler): () => void {
  unauthorizedHandler = handler;

  return () => {
    if (unauthorizedHandler === handler) unauthorizedHandler = null;
  };
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const token = AUTH_ENDPOINTS.has(path) ? null : getToken();

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const method = options.method ?? 'GET';

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    throw new NetworkError(method, path, error);
  }

  if (!response.ok) {
    if (response.status === 401 && token) {
      unauthorizedHandler?.(token);
    }
    throw new HttpError(method, path, response.status, response.statusText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  let body: string;
  try {
    body = await response.text();
  } catch (error) {
    throw new NetworkError(method, path, error);
  }

  if (!body.trim() && method === 'DELETE') {
    return undefined as T;
  }

  if (!body) {
    throw new EmptyResponseError(method, path, response.status);
  }

  try {
    return JSON.parse(body) as T;
  } catch (error) {
    throw new ResponseParseError(method, path, error);
  }
}
