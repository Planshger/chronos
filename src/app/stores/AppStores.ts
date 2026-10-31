import { reaction } from 'mobx';
import ScheduleStore from '../../modules/schedule/stores/ScheduleStore';
import AuthStore from '../../modules/auth/stores/AuthStore';

export interface AppStores {
  authStore: AuthStore;
  scheduleStore: ScheduleStore;
}

export function createStores(showError: (error: unknown) => void): AppStores {
  return {
    authStore: new AuthStore(showError),
    scheduleStore: new ScheduleStore(showError),
  };
}

export function initializeStores({ authStore, scheduleStore }: AppStores): () => void {
  const disposeAuthReaction = reaction(
    () => authStore.user.id,
    (userId) => scheduleStore.setUserId(userId > 0 ? userId : null),
    { fireImmediately: true },
  );

  authStore.authenticate();
  return disposeAuthReaction;
}
