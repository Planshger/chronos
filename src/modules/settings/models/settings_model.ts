export interface SettingsModel {
  id: string;
  label: string;
  messenger?: SettingsModel[];
}
