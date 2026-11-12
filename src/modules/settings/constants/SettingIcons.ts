import { BarChart, CreditCard, Settings, Message, Map as MapSett } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import TelegramIcon from '../components/user/TelegramIcon';
import WhatsAppIcon from '../components/user/WhatsAppIcon';
import { SettingId } from '../models/settings_model';

export const SettingIcons: Map<SettingId, React.ComponentType<SvgIconProps>> = new Map<
  SettingId,
  React.ComponentType<SvgIconProps>
>([
  [SettingId.Profile, Settings],
  [SettingId.ManagePlans, CreditCard],
  [SettingId.Analytics, BarChart],
  [SettingId.Map, MapSett],
  [SettingId.Messengers, Message],
  [SettingId.Telegram, TelegramIcon],
  [SettingId.WhatsApp, WhatsAppIcon],
  [SettingId.AdminProfile, Settings],
  [SettingId.AdminManagePlans, CreditCard],
]);
