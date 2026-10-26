import { BarChart, CreditCard, Settings, Message, Map as MapSett } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import TelegramIcon from '../components/user/TelegramIcon';
import WhatsAppIcon from '../components/user/WhatsAppIcon';

export const SettingIcons: Map<string, React.ComponentType<SvgIconProps>> = new Map<
  string,
  React.ComponentType<SvgIconProps>
>([
  ['profile_settings', Settings],
  ['manage_plans', CreditCard],
  ['analytics', BarChart],
  ['map_settings', MapSett],
  ['messengers', Message],
  ['telegram', TelegramIcon],
  ['whatsapp', WhatsAppIcon],
  ['admin_profile_settings', Settings],
  ['admin_manage_plans', CreditCard],
]);
