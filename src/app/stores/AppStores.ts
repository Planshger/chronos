import { reaction } from 'mobx';
import { ScheduleStore } from '../../modules/schedule';
import { AuthStore } from '../../modules/auth';
import { SettingsStore } from '../../modules/settings';
import ApiErrorStore from '../../shared/errors/ApiErrorStore';

export interface AppStores {
  authStore: AuthStore;
  scheduleStore: ScheduleStore;
  settingsStore: SettingsStore;
  apiErrorStore: ApiErrorStore;
}

export function createStores(): AppStores {
  const apiErrorStore = new ApiErrorStore();

  return {
    authStore: new AuthStore(apiErrorStore.showError),
    scheduleStore: new ScheduleStore(apiErrorStore.showError),
    settingsStore: new SettingsStore(),
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
