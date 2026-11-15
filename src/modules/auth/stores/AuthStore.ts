import { makeAutoObservable, runInAction } from 'mobx';
import UserModel, { initialUser, UserStatus } from '../../../shared/models/user_model';
import { BlockedUserError } from '../../../shared/errors/AppError';
import { authMe, getToken, setTokenInStorage } from '../datasources/authorization_data_source';

type ShowError = (error: unknown) => void;

export default class AuthStore {
  token = getToken() ?? '';
  user: UserModel = initialUser;

  isAuthChecked = !this.token;
  private requestId = 0;

  constructor(private readonly showError: ShowError) {
    makeAutoObservable<AuthStore, 'showError' | 'requestId'>(
      this,
      { showError: false, requestId: false },
      { autoBind: true },
    );
  }

  setToken(token: string, userData: UserModel): void {
    this.token = token;
    this.isAuthChecked = !token;
    setTokenInStorage(token || null);
    this.requestId += 1;

    if (token) {
      this.authenticate(userData);
    }
  }

  setUser(user: UserModel): void {
    if (!this.token || !this.user.id || user.id !== this.user.id) return;

    this.user = user;
  }

  logout(): void {
    this.requestId += 1;
    this.token = '';
    this.user = initialUser;
    this.isAuthChecked = true;
    setTokenInStorage(null);
  }

  async authenticate(userData?: UserModel): Promise<void> {
    if (!this.token) {
      this.logout();
      return;
    }

    const token = this.token;
    const requestId = ++this.requestId;

    try {
      const user = userData ? userData : await authMe(token);
      if (!user) {
        this.logout();
        return;
      }

      if (requestId !== this.requestId) return;

      if (user.status === UserStatus.Blocked) {
        this.showError(new BlockedUserError());
        this.logout();
        return;
      }

      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      if (requestId !== this.requestId) return;

      this.showError(error);
      this.logout();
    } finally {
      runInAction(() => {
        if (requestId === this.requestId) this.isAuthChecked = true;
      });
    }
  }
}
