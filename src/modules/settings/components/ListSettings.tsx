import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBack, ExpandLess, ExpandMore, TouchApp } from '@mui/icons-material';
import { SettingsModel, SettingId } from '../models/settings_model';
import { useLocation, useNavigate } from 'react-router-dom';
import { SettingIcons } from '../constants/SettingIcons';
import { useCallback, useEffect, useState } from 'react';

interface ListSettingsProps {
  onSelect: (id: SettingId) => void;
  settingsData: SettingsModel[];
}

export default function ListSettings({ onSelect, settingsData }: ListSettingsProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const backPath = location.pathname.startsWith('/settings/admin_') ? '/admin' : '/schedule';
  const initialOpen = location.state?.open;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [messOpen, setMessOpen] = useState(false);

  const handleBack = useCallback(() => navigate(backPath), [navigate, backPath]);

  const handleSelect = useCallback(
    (id: SettingId) => {
      if (id === SettingId.Messengers) {
        setOpen(!open);
        setMessOpen(!messOpen);
      } else {
        onSelect(id);
      }
    },
    [open, onSelect, messOpen],
  );

  useEffect(() => {
    setOpen(Boolean(initialOpen));
  }, [initialOpen]);

  return (
    <List
      sx={{
        width: { xs: messOpen ? '50%' : '100%', md: '27%', lg: '20%' },
        display: { xs: 'flex', md: 'block', lg: 'block' },
        flexDirection: { xs: 'row', md: 'column', lg: 'column' },
      }}
      component="nav"
    >
      <ListItemButton
        key="back"
        onClick={handleBack}
        sx={{
          '&:hover': { transform: 'translateY(-4px)' },
          backgroundColor: 'transparent',
        }}
      >
        <ListItemIcon>
          <ArrowBack sx={{ color: theme.palette.text.primary }} />
        </ListItemIcon>

        <ListItemText primary="Назад" sx={{ display: { xs: 'none', md: 'block' } }} />
      </ListItemButton>

      {settingsData.map((item: SettingsModel) => {
        const Icon = SettingIcons.get(item.id) ?? TouchApp;
        return (
          <ListItemButton
            key={item.id}
            onClick={() => handleSelect(item.id)}
            sx={{
              display: messOpen && item.id !== SettingId.Messengers && isMobile ? { xs: 'none' } : null,
              '&:hover': {
                transform: 'translateY(-4px)',
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon>
              <Icon sx={{ color: theme.palette.text.primary }} />
            </ListItemIcon>

            <ListItemText primary={item.label} sx={{ display: { xs: 'none', md: 'block' } }} />

            {item.id === SettingId.Messengers && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        );
      })}

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {settingsData
            .find((i) => i.id === SettingId.Messengers)
            ?.messenger?.map((messenger) => {
              const Icon = SettingIcons.get(messenger.id) ?? TouchApp;

              return (
                <ListItemButton
                  key={messenger.id}
                  onClick={() => onSelect(messenger.id)}
                  sx={{
                    pl: 4,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      background: 'transparent',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>

                  <ListItemText primary={messenger.label} sx={{ display: { xs: 'none', md: 'block' } }} />
                </ListItemButton>
              );
            })}
        </List>
      </Collapse>
    </List>
  );
}
