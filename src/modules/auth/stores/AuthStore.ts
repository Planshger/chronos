import { UserModel, initialUser, Role, UserStatus, getToken, setTokenInStorage, BlockedUserError } from '../../../shared';
import { authMe } from '../datasources/authorization_data_source';
import { makeAutoObservable, runInAction } from 'mobx';

type ShowError = (error: unknown) => void;

export default class AuthStore {
  token = getToken();
  user: UserModel = initialUser;

  isAuthChecked = !this.token;
  private requestId = 0;

  constructor(private readonly showError: ShowError) {
    makeAutoObservable<AuthStore, 'showError' | 'requestId'>(this, { showError: false, requestId: false }, { autoBind: true });
  }

  setUser(user: UserModel): void {
    if (!this.token || !this.user.id || user.id !== this.user.id) return;

    this.user = user;
  }

  private resetSession(isAuthChecked: boolean): number {
    ++this.requestId;
    this.token = '';
    this.user = initialUser;
    this.isAuthChecked = isAuthChecked;
    return this.requestId;
  }

  logout(): void {
    this.resetSession(true);
    setTokenInStorage(null);
  }

  handleUnauthorized(token: string): Role | null {
    if (token !== this.token) return null;

    const role = this.user.role;
    this.logout();
    return role;
  }

  async authenticate(token = this.token, userData?: UserModel): Promise<void> {
    if (!token) {
      this.logout();
      return;
    }

    const requestId = this.resetSession(false);

    try {
      const user = userData ?? (await authMe(token));
      if (requestId !== this.requestId) return;

      if (!user) {
        this.logout();
        return;
      }

      if (user.status === UserStatus.Blocked) {
        throw new BlockedUserError();
      }

      setTokenInStorage(token);

      runInAction(() => {
        this.token = token;
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
