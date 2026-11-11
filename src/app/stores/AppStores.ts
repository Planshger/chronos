import { reaction } from 'mobx';
import ScheduleStore from '../../modules/schedule/stores/ScheduleStore';
import AuthStore from '../../modules/auth/stores/AuthStore';
import ApiErrorStore from '../../shared/errors/ApiErrorStore';

export interface AppStores {
  authStore: AuthStore;
  scheduleStore: ScheduleStore;
  apiErrorStore: ApiErrorStore;
}

export function createStores(): AppStores {
  const apiErrorStore = new ApiErrorStore();

  return {
    authStore: new AuthStore(apiErrorStore.showError),
    scheduleStore: new ScheduleStore(apiErrorStore.showError),
    apiErrorStore,
  };
}

export function initializeStores({ authStore, scheduleStore }: AppStores): () => void {
  const disposeAuthReaction = reaction(
    () => authStore.user.id,
    (userId) =>
      authStore.user.role === 'user' ? scheduleStore.setUserId(userId > 0 ? userId : null) : null,
    { fireImmediately: true },
  );

  authStore.authenticate();
  return disposeAuthReaction;
}
