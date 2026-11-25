import { Button, Grid, Stack, Typography } from '@mui/material';
import injectMobxStore from '../../../../shared/utils/injectMobxStore';
import { withLoading } from '../../../../shared/utils/withLoading';
import { UserStatus } from '../../../../shared/models/user_model';
import { useApiError } from '../../../../shared/errors/ApiError';
import { updateUserData } from '../../../../shared/api/userApi';
import SettingsStore from '../../stores/SettingsStore';
import { AutoAwesome } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '../../../auth';
import { CurrentPlanAvatar } from './style/ManagePlansSettings.style';

interface ManagePlansSettingsProps {
  authStore: AuthStore;
  settingsStore: SettingsStore;
}

function ManagePlansSettings({ authStore, settingsStore }: ManagePlansSettingsProps) {
  const user = authStore.user;
  const { showError } = useApiError();
  const navigate = useNavigate();

  const cancelPlan = async () => {
    if (!user) return;
    try {
      await withLoading(
        () => updateUserData({ ...user, plan: '', status: UserStatus.PendingPayment }).then((res) => authStore.setUser(res)),
        settingsStore.setLoading,
      );
    } catch (error) {
      showError(error);
    }
  };
  if (!user) return null;

  return (
    <Stack spacing={3} sx={{ alignItems: 'center' }}>
      <CurrentPlanAvatar>
        <AutoAwesome fontSize="large" sx={{ color: '#fff' }} />
      </CurrentPlanAvatar>

      <Typography variant="h5">{user.plan}</Typography>

      <Typography variant="body2" color="text.secondary">
        Активен до 12 октября 2026 г.
      </Typography>

      <Grid container spacing={2}>
        <Button variant="outlined" fullWidth sx={{ borderRadius: 3, color: 'text.primary' }}>
          Продлить подписку
        </Button>

        <Button variant="outlined" onClick={() => navigate('/plans')} fullWidth sx={{ borderRadius: 3, color: 'text.primary' }}>
          Сменить тарифный план
        </Button>

        <Button variant="outlined" color="error" fullWidth sx={{ borderRadius: 3 }} onClick={cancelPlan}>
          Отменить подписку
        </Button>
      </Grid>
    </Stack>
  );
}

export default injectMobxStore(['authStore', 'settingsStore'], ManagePlansSettings);
