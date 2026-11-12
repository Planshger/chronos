export enum SettingId {
  Profile = 'profile_settings',
  ManagePlans = 'manage_plans',
  Analytics = 'analytics',
  Map = 'map_settings',
  Messengers = 'messengers',
  Telegram = 'telegram',
  WhatsApp = 'whatsapp',
  AdminProfile = 'admin_profile_settings',
  AdminManagePlans = 'admin_manage_plans',
}

export interface SettingsModel {
  id: SettingId;
  label: string;
  messenger?: SettingsModel[];
}
