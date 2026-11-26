import { Box, Chip, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { injectMobxStore } from '../../../shared';
import { SettingId } from '../../settings/models/settings_model';
import { SettingIcons, SettingsData } from '../../settings';
import { Logout, TouchApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '../../auth';
import { useCallback } from 'react';

interface ScheduleMenuUserProps {
  openMenu: null | HTMLElement;
  closeUserMenu: () => void;
  authStore: AuthStore;
}

function ScheduleMenuUser({ openMenu, closeUserMenu, authStore }: ScheduleMenuUserProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = authStore;

  const onClick = useCallback(
    (id: SettingId) => {
      if (id === SettingId.Telegram || id === SettingId.WhatsApp) {
        navigate(`/settings/${id}`, { state: { open: true } });
      } else {
        navigate(`/settings/${id}`);
      }
    },
    [navigate],
  );

  const handleSettingClick = useCallback(
    (id: SettingId) => {
      onClick(id === SettingId.Messengers ? SettingId.Telegram : id);
      closeUserMenu();
    },
    [closeUserMenu, onClick],
  );

  return (
    <Menu
      id="menu-appbar"
      anchorEl={openMenu}
      open={Boolean(openMenu)}
      onClose={closeUserMenu}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${theme.custom.border.light}` }}>
        <Typography variant="body2">{user?.name}</Typography>

        <Chip label={`${user?.plan} тариф`} size="small" color="primary" sx={{ mt: 0.5 }} />
      </Box>

      {SettingsData.map((item) => {
        const Icon = SettingIcons.get(item.id) ?? TouchApp;
        return (
          <MenuItem key={item.id} sx={{ py: 1 }} onClick={() => handleSettingClick(item.id)}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Icon fontSize="small" sx={{ color: theme.palette.text.primary }} />
            </ListItemIcon>

            <ListItemText primary={item.label} />
          </MenuItem>
        );
      })}

      <Divider />

      <MenuItem
        sx={{ color: 'error.main' }}
        onClick={async () => {
          await logout();
          navigate('/');
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}>
          <Logout fontSize="small" />
        </ListItemIcon>

        <ListItemText primary="Выход из аккаунта" />
      </MenuItem>
    </Menu>
  );
}

export default injectMobxStore('authStore', ScheduleMenuUser);
