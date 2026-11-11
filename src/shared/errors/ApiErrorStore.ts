import { makeAutoObservable } from 'mobx';
import { AppError } from './AppError';

function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.userMessage;
  }
  return 'Произошла непредвиденная ошибка. Попробуйте ещё раз.';
}

export default class ApiErrorStore {
  message: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  showError(error: unknown): void {
    this.message = getErrorMessage(error);
  }

  clearError(): void {
    this.message = null;
  }
}
