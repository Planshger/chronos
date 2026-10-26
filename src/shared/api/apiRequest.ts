import { API_BASE_URL } from './URL';

export class ApiRequestError extends Error {
  constructor(method: string, path: string, status: number, statusText: string) {
    super(`${method} ${path} failed with status ${status}${statusText ? ` ${statusText}` : ''}`);
    this.name = 'ApiRequestError';
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  if (typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiRequestError(options.method ?? 'GET', path, response.status, response.statusText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.text();
  return body ? (JSON.parse(body) as T) : (undefined as T);
}
