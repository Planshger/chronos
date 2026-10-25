import { BarChart, CreditCard, Settings, Message, Map as MapSett } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import TelegramIcon from '../../features/settings/components/user/TelegramIcon';
import WhatsAppIcon from '../../features/settings/components/user/WhatsAppIcon';

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
