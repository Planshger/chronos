import { API_BASE_URL } from './URL';
import {
  EmptyResponseError,
  HttpError,
  NetworkError,
  ResponseParseError,
} from '../errors/AppError';

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
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

  if (!body) {
    throw new EmptyResponseError(method, path, response.status);
  }

  try {
    return JSON.parse(body) as T;
  } catch (error) {
    throw new ResponseParseError(method, path, error);
  }
}
