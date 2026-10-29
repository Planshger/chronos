export type AppErrorCode =
  'NETWORK_ERROR' | 'HTTP_ERROR' | 'EMPTY_RESPONSE' | 'INVALID_RESPONSE' | 'INVALID_CREDENTIALS';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: AppErrorCode,
    public readonly userMessage: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class NetworkError extends AppError {
  constructor(method: string, path: string, originalError?: unknown) {
    super(
      `${method} ${path} failed because the server could not be reached`,
      'NETWORK_ERROR',
      'Не удалось связаться с сервером. Проверьте подключение и повторите попытку.',
      originalError,
    );
  }
}

export class HttpError extends AppError {
  constructor(
    public readonly method: string,
    public readonly path: string,
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(
      `${method} ${path} failed with status ${status}${statusText ? ` ${statusText}` : ''}`,
      'HTTP_ERROR',
      status >= 500
        ? 'На сервере произошла ошибка. Попробуйте позже.'
        : 'Не удалось выполнить запрос. Попробуйте ещё раз.',
    );
  }
}

export class EmptyResponseError extends AppError {
  constructor(method: string, path: string, status: number) {
    super(
      `${method} ${path} returned an empty response with status ${status}`,
      'EMPTY_RESPONSE',
      'Сервер вернул пустой ответ. Попробуйте позже.',
    );
  }
}

export class ResponseParseError extends AppError {
  constructor(method: string, path: string, originalError: unknown) {
    super(
      `${method} ${path} returned an invalid JSON response`,
      'INVALID_RESPONSE',
      'Сервер вернул некорректный ответ. Попробуйте позже.',
      originalError,
    );
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Invalid email or password', 'INVALID_CREDENTIALS', 'Неверная почта или пароль');
  }
}
