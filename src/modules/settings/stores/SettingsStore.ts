import { makeAutoObservable } from 'mobx';

export default class SettingsStore {
  loading = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }
}
