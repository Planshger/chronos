import { AppBar, Stack, Toolbar } from '@mui/material';
import { CreditCard, Logout, Settings } from '@mui/icons-material';
import { injectMobxStore } from '../../../../shared';
import { SettingId } from '../../../settings/models/settings_model';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '../../../auth';
import { Title, TitleIcon, Label, ActionButton } from './AdminAppBar.style';

interface AdminAppBarProps {
  authStore: AuthStore;
}

function AdminAppBar({ authStore }: AdminAppBarProps) {
  const navigator = useNavigate();

  const navigate = (props: SettingId) => {
    navigator(`/settings/${props}`);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Title variant="h6" aria-label="Админ панель">
          <TitleIcon />
          <Label>Админ панель</Label>
        </Title>

        <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} sx={{ alignItems: 'center', flexShrink: 0 }}>
          <ActionButton
            variant="outlined"
            aria-label="Профиль"
            title="Профиль"
            tone="profile"
            onClick={() => navigate(SettingId.AdminProfile)}
          >
            <Settings sx={{ mr: { xs: 0, sm: 1 } }} />
            <Label>Профиль</Label>
          </ActionButton>

          <ActionButton
            variant="outlined"
            aria-label="Тарифы"
            title="Тарифы"
            tone="plans"
            onClick={() => navigate(SettingId.AdminManagePlans)}
          >
            <CreditCard sx={{ mr: { xs: 0, sm: 1 } }} />
            <Label>Тарифы</Label>
          </ActionButton>

          <ActionButton variant="outlined" aria-label="Выход" title="Выход" tone="logout" onClick={authStore.logout}>
            <Logout sx={{ mr: { xs: 0, sm: 1 } }} />
            <Label>Выход</Label>
          </ActionButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default injectMobxStore('authStore', AdminAppBar);
