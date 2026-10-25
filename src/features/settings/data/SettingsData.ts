import { SettingsModel } from '../models/settings_model';

export const SettingsData: SettingsModel[] = [
  { id: 'profile_settings', label: 'Настройки профиля' },
  { id: 'manage_plans', label: 'Управление тарифом' },
  { id: 'analytics', label: 'Аналитика' },
  { id: 'map_settings', label: 'Карты для такси' },
  { id: 'messengers', label: 'Мессенджеры', messenger: [{ id: 'telegram', label: 'Telegram' }] },
];

export const AdminSettingsData: SettingsModel[] = [
  { id: 'admin_profile_settings', label: 'Настройки профиля' },
  { id: 'admin_manage_plans', label: 'Управление тарифами' },
];
