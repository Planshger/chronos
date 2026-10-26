import { AutoAwesome } from '@mui/icons-material';
import { Avatar, Button, Grid, Stack, Typography } from '@mui/material';
import theme from '../../../../shared/ui/theme/darkTheme';
import { useAuth } from '../../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../../../admin/datasources/admin_data_source';
import { useLoading } from '../../SettingsModule';
import { withLoading } from '../../../../shared/utils/withLoading';

export default function ManagePlansSettings() {
  const { user, setUser } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const cancelPlan = async () => {
    await withLoading(
      () =>
        updateUserData({ ...user, plan: '', status: 'Ожидание оплаты' }).then((res) =>
          setUser(res),
        ),
      setLoading,
    );
  };
  return (
    <Stack spacing={3} sx={{ alignItems: 'center' }}>
      <Avatar
        sx={{
          width: 64,
          height: 64,
          bgcolor: 'warning.main',
          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
        }}
      >
        <AutoAwesome fontSize="large" sx={{ color: '#fff' }} />
      </Avatar>

      <Typography variant="h5">{user.plan}</Typography>

      <Typography variant="body2" color="text.secondary">
        Активен до 12 октября 2026 г.
      </Typography>

      <Grid container spacing={2}>
        <Button
          variant="outlined"
          fullWidth
          sx={{ borderRadius: 3, color: theme.palette.text.primary }}
        >
          Продлить подписку
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate('/plans')}
          fullWidth
          sx={{ borderRadius: 3, color: theme.palette.text.primary }}
        >
          Сменить тарифный план
        </Button>

        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ borderRadius: 3 }}
          onClick={cancelPlan}
        >
          Отменить подписку
        </Button>
      </Grid>
    </Stack>
  );
}
