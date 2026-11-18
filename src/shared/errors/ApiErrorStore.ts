import { makeAutoObservable } from 'mobx';
import { AppError } from './AppError';

interface ErrorNotification {
  id: number;
  message: string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.userMessage;
  }
  return 'Произошла непредвиденная ошибка. Попробуйте ещё раз.';
}

export default class ApiErrorStore {
  notifications: ErrorNotification[] = [];
  private readonly activeErrors = new Set<object>();
  private readonly notificationErrors = new Map<number, object>();
  private nextNotificationId = 0;

  constructor() {
    makeAutoObservable<ApiErrorStore, 'activeErrors' | 'notificationErrors' | 'nextNotificationId'>(
      this,
      {
        activeErrors: false,
        notificationErrors: false,
        nextNotificationId: false,
      },
      { autoBind: true },
    );
  }

  get currentNotification(): ErrorNotification | null {
    return this.notifications[0] ?? null;
  }

  showError(error: unknown): void {
    let errorIdentity: object | null = null;
    if ((typeof error === 'object' && error !== null) || typeof error === 'function') {
      errorIdentity = error;
      if (this.activeErrors.has(errorIdentity)) return;
    }

    const id = this.nextNotificationId++;
    this.notifications.push({ id, message: getErrorMessage(error) });
    if (errorIdentity) {
      this.activeErrors.add(errorIdentity);
      this.notificationErrors.set(id, errorIdentity);
    }
  }

  clearError(): void {
    const notification = this.notifications.shift();
    if (notification) {
      const error = this.notificationErrors.get(notification.id);
      if (error) {
        this.activeErrors.delete(error);
        this.notificationErrors.delete(notification.id);
      }
    }
  }
}
