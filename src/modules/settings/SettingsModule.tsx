import { Stack } from '@mui/material';
import AdminManagePlansSettings from './components/admin/AdminManagePlansSettings';
import TelegramSettings from './components/user/telegram/TelegramSettings';
import ManagePlansSettings from './components/user/ManagePlansSettings';
import { AdminSettingsData, SettingsData } from './data/SettingsData';
import AnalyticsSettings from './components/user/AnalyticsSettings';
import { SettingsModel, SettingId } from './models/settings_model';
import { injectMobxStore, Role, Loader } from '../../shared';
import ProfileSettings from './components/user/ProfileSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { SettingIcons } from './constants/SettingIcons';
import MapSettings from './components/user/MapSettings';
import ListSettings from './components/ListSettings';
import SettingsStore from './stores/SettingsStore';
import { TouchApp } from '@mui/icons-material';
import { AuthStore } from '../auth';
import React from 'react';
import {
  SettingsContainer,
  SettingsContentPanel,
  SettingsLayout,
  SettingsRoot,
  SettingsSectionContent,
  SettingsSectionTitle,
  SettingsTitleIconWrapper,
} from './SettingsModule.style';

const settingsComponents: Partial<Record<SettingId, React.ComponentType>> = {
  [SettingId.Profile]: ProfileSettings,
  [SettingId.ManagePlans]: ManagePlansSettings,
  [SettingId.Analytics]: AnalyticsSettings,
  [SettingId.Map]: MapSettings,
  [SettingId.Telegram]: TelegramSettings,
  [SettingId.AdminProfile]: ProfileSettings,
  [SettingId.AdminManagePlans]: AdminManagePlansSettings,
};

interface SettingsProps {
  authStore: AuthStore;
  settingsStore: SettingsStore;
}

function Settings({ authStore, settingsStore }: SettingsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authStore.user;

  const currentPath = location.pathname.split('/').pop() || SettingId.Profile;
  const currentSettingId = Object.values(SettingId).find((id) => id === currentPath);
  const settingsData: SettingsModel[] = user?.role === Role.Admin ? AdminSettingsData : SettingsData;

  const CurrentComponent = (currentSettingId && settingsComponents[currentSettingId]) || ProfileSettings;

  const handleSelect = (id: SettingId) => {
    navigate(`/settings/${id}`);
  };

  return (
    <SettingsRoot>
      <SettingsContainer maxWidth={false}>
        <SettingsLayout spacing={4} direction={{ xs: 'column', sm: 'column', md: 'row' }}>
          <ListSettings onSelect={handleSelect} settingsData={settingsData} />

          <SettingsContentPanel>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', minWidth: 0, pt: { xs: 0, md: 1 } }}>
              {settingsData.map((item) => {
                const messenger = item.messenger?.find((m) => m.id === currentSettingId);
                const IconComponent = SettingIcons.get(item.id) ?? TouchApp;

                return item.id === currentSettingId || messenger ? (
                  <SettingsSectionTitle key={item.id} variant="h6">
                    <SettingsTitleIconWrapper>
                      <IconComponent />
                    </SettingsTitleIconWrapper>

                    {messenger?.label || item.label}
                  </SettingsSectionTitle>
                ) : null;
              })}
            </Stack>

            <SettingsSectionContent>
              <CurrentComponent key={`${user.id}:${user.role}`} />
            </SettingsSectionContent>
          </SettingsContentPanel>
        </SettingsLayout>
      </SettingsContainer>
      {settingsStore.loading && <Loader size={80} />}
    </SettingsRoot>
  );
}

export default injectMobxStore(['authStore', 'settingsStore'], Settings);
