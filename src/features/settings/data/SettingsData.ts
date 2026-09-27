import { SettingsModel } from "../models/SettingsModel";

export const SettingsData: SettingsModel[] = [
    {id: 'profile_settings', label: 'Настройки профиля'},
    {id: 'manage_plans', label: 'Управление тарифом'},
    {id: 'analytics', label: 'Аналитика'},
    {id: 'maps_settings', label: 'Карты для такси'},
    {id: 'messengers', label: 'Мессенджеры', messenger: [
        {id: 'telegram', label: 'Telegram'},
        {id: 'whatsapp', label: 'WhatsApp'},
    ]}
];

export const AdminSettingsData: SettingsModel[] = [
    {id: 'admin_profile_settings', label: 'Настройки профиля'},
    {id: 'admin_manage_plans', label: 'Управление тарифами'},
];

