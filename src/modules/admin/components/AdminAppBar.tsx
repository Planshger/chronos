import { AppBar, Box, Button, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import { CreditCard, GppGood, Logout, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '../../auth';
import injectMobxStore from '../../../shared/utils/injectMobxStore';
import { SettingId } from '../../settings/models/settings_model';

interface AdminAppBarProps {
  authStore: AuthStore;
}

function AdminAppBar({ authStore }: AdminAppBarProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between', gap: { xs: 1, sm: 2 } }}>
        <Typography
          variant="h6"
          aria-label="Админ панель"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            minWidth: 0,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
          }}
        >
          <GppGood
            sx={{ flexShrink: 0, fontSize: { xs: 30, sm: 38 }, color: theme.palette.primary.main }}
          />
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Админ панель
          </Box>
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 0.5, sm: 2 }}
          sx={{ alignItems: 'center', flexShrink: 0 }}
        >
          <Button
            variant="outlined"
            aria-label="Профиль"
            title="Профиль"
            onClick={() => navigate(`/settings/${SettingId.AdminProfile}`)}
            sx={{
              minWidth: { xs: 40, sm: 'auto' },
              px: { xs: 1, sm: 2 },
              borderColor: theme.custom.border.light,
              color: theme.palette.text.primary,
              '&:hover': { backgroundColor: theme.custom.background.muted },
            }}
          >
            <Settings sx={{ mr: { xs: 0, sm: 1 } }} />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Профиль
            </Box>
          </Button>

          <Button
            variant="outlined"
            aria-label="Тарифы"
            title="Тарифы"
            onClick={() => navigate(`/settings/${SettingId.AdminManagePlans}`)}
            sx={{
              minWidth: { xs: 40, sm: 'auto' },
              px: { xs: 1, sm: 2 },
              color: theme.palette.primary.main,
              bgcolor: `${theme.palette.primary.main}15`,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                bgcolor: `${theme.palette.primary.main}15`,
              },
            }}
          >
            <CreditCard sx={{ mr: { xs: 0, sm: 1 } }} />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Тарифы
            </Box>
          </Button>

          <Button
            variant="outlined"
            aria-label="Выход"
            title="Выход"
            onClick={authStore.logout}
            sx={{
              minWidth: { xs: 40, sm: 'auto' },
              px: { xs: 1, sm: 2 },
              color: 'error.main',
              bgcolor: `${theme.palette.primary.main}15`,
              '&:hover': { borderColor: 'error.main', bgcolor: `${theme.palette.primary.main}15` },
            }}
          >
            <Logout sx={{ mr: { xs: 0, sm: 1 } }} />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Выход
            </Box>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default injectMobxStore('authStore', AdminAppBar);
