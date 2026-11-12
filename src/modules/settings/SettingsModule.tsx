import { Box, Container, Paper, Stack, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { SettingsModel } from './models/settings_model';
import { SettingIcons } from './constants/SettingIcons';
import { TouchApp } from '@mui/icons-material';
import React from 'react';
import { AdminSettingsData, SettingsData } from './data/SettingsData';
import Loader from '../../shared/ui/Loader';
import AdminManagePlansSettings from './components/admin/AdminManagePlansSettings';
import ProfileSettings from './components/user/ProfileSettings';
import ManagePlansSettings from './components/user/ManagePlansSettings';
import AnalyticsSettings from './components/user/AnalyticsSettings';
import TelegramSettings from './components/user/telegram/TelegramSettings';
import ListSettings from './components/ListSettings';
import MapSettings from './components/user/MapSettings';
import { AuthStore } from '../auth';
import injectMobxStore from '../../shared/utils/injectMobxStore';
import SettingsStore from './stores/SettingsStore';

const settingsComponents: Record<string, React.ComponentType> = {
  profile_settings: ProfileSettings,
  manage_plans: ManagePlansSettings,
  analytics: AnalyticsSettings,
  map_settings: MapSettings,
  telegram: TelegramSettings,
  admin_profile_settings: ProfileSettings,
  admin_manage_plans: AdminManagePlansSettings,
};

interface SettingsProps {
  authStore: AuthStore;
  settingsStore: SettingsStore;
}

function Settings({ authStore, settingsStore }: SettingsProps) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const user = authStore.user;

  const currentPath = location.pathname.split('/').pop() || 'profile_settings';
  let settingsData: SettingsModel[] = user?.role === 'admin' ? AdminSettingsData : SettingsData;

  const CurrentComponent = settingsComponents[currentPath] || ProfileSettings;

  const handleSelect = (id: string) => {
    navigate(`/settings/${id}`);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          py: { xs: 1, sm: 2, md: 3 },
          px: { xs: 1, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <Stack
          spacing={4}
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          sx={{ alignItems: 'stretch', minWidth: 0, flex: 1, minHeight: 0 }}
        >
          <ListSettings onSelect={handleSelect} settingsData={settingsData} />

          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 7,
              flex: '1 1 0',
              minWidth: 0,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: theme.palette.background.default,
              border: `1px solid ${theme.custom.border.light}`,
              boxShadow: theme.custom.shadows.sm,
            }}
          >
            <Stack
              direction="row"
              spacing={3}
              sx={{ alignItems: 'center', minWidth: 0, pt: { xs: 0, md: 1 } }}
            >
              {settingsData.map((item) => {
                const messenger = item.messenger?.find((m) => m.id === currentPath);
                const IconComponent = SettingIcons.get(item.id) ?? TouchApp;

                return item.id === currentPath || messenger ? (
                  <Typography
                    key={item.id}
                    variant="h6"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                    }}
                  >
                    <Box sx={{ p: 0.8, bgcolor: 'primary.main', borderRadius: 2, display: 'flex' }}>
                      <IconComponent />
                    </Box>

                    {messenger?.label || item.label}
                  </Typography>
                ) : null;
              })}
            </Stack>

            <Box
              sx={{
                pt: { xs: 3, sm: 6, md: 4 },
                width: '100%',
                flex: '1',
                minHeight: 0,
                minWidth: 0,
              }}
            >
              <CurrentComponent key={`${user.id}:${user.role}`} />
            </Box>
          </Paper>
        </Stack>
      </Container>
      {settingsStore.loading && <Loader size={80} />}
    </Box>
  );
}

export default injectMobxStore(['authStore', 'settingsStore'], Settings);
