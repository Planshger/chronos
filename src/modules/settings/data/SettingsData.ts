import { SettingsModel, SettingId } from '../models/settings_model';

export const SettingsData: SettingsModel[] = [
  { id: SettingId.Profile, label: 'Настройки профиля' },
  { id: SettingId.ManagePlans, label: 'Управление тарифом' },
  { id: SettingId.Analytics, label: 'Аналитика' },
  { id: SettingId.Map, label: 'Карты для такси' },
  {
    id: SettingId.Messengers,
    label: 'Мессенджеры',
    messenger: [{ id: SettingId.Telegram, label: 'Telegram' }],
  },
];

export const AdminSettingsData: SettingsModel[] = [
  { id: SettingId.AdminProfile, label: 'Настройки профиля' },
  { id: SettingId.AdminManagePlans, label: 'Управление тарифами' },
];
