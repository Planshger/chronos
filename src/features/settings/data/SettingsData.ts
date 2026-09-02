import { BarChart, CreditCard, Settings, Map, Message } from "@mui/icons-material";
import { SettingsModel } from "../models/SettingsModel";
import TelegramIcon from "../components/TelegramIcon";
import WhatsAppIcon from "../components/WhatsAppIcon";


const SettingsData: SettingsModel[] = [
    {id: 'profile_settings', icon: Settings, label: 'Настройки профиля'},
    {id: 'manage_plans', icon: CreditCard, label: 'Управление тарифом'},
    {id: 'analytics', icon: BarChart, label: 'Аналитика'},
    {id: 'maps_settings', icon: Map, label: 'Карты для такси'},
    {id: 'messengers', icon: Message, label: 'Мессенджеры', messenger: [
        {id: 'telegram', icon: TelegramIcon, label: 'Telegram'},
        {id: 'whatsapp', icon: WhatsAppIcon, label: 'WhatsApp'},
    ]}
];

export default SettingsData;