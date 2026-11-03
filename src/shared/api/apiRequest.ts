import {
  EmptyResponseError,
  HttpError,
  NetworkError,
  ResponseParseError,
} from '../errors/AppError';
import { preventDuplicateCall } from '../utils/preventDuplicateCall';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('REACT_APP_API_BASE_URL is not set. Add it to your .env file.');
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  if (typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const method = options.method ?? 'GET';
  const url = `${API_BASE_URL}${path}`;
  const executeRequest = async (): Promise<T> => {
    let response: Response;
    try {
      response = await fetch(url, {
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
  };

  const duplicateKey = getDuplicateKey(url, method, headers, options);
  if (duplicateKey === null) {
    return executeRequest();
  }

  return preventDuplicateCall(duplicateKey, executeRequest);
}

function getDuplicateKey(
  url: string,
  method: string,
  headers: Headers,
  options: RequestInit,
): string | null {
  if (options.signal || (options.body !== undefined && typeof options.body !== 'string')) {
    return null;
  }

  const normalizedHeaders = Array.from(headers.entries()).sort(([left], [right]) =>
    left.localeCompare(right),
  );
  const requestSettings = {
    mode: options.mode,
    credentials: options.credentials,
    cache: options.cache,
    redirect: options.redirect,
    referrer: options.referrer,
    referrerPolicy: options.referrerPolicy,
    integrity: options.integrity,
    keepalive: options.keepalive,
  };

  return JSON.stringify([url, method, normalizedHeaders, options.body ?? null, requestSettings]);
}
