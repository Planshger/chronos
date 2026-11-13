import { Box, Paper, Typography, Link, useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import injectMobxStore from '../../shared/utils/injectMobxStore';
import { AuthStore } from '../auth';
import { updateUserData } from '../../shared/api/userApi';
import Loader from '../../shared/ui/Loader';
import PlanModel from './models/plan_model';
import { getAllPlans } from './datasources/plans_data_source';
import { withLoading } from '../../shared/utils/withLoading';
import { useApiError } from '../../shared/errors/ApiError';
import { UserStatus } from '../../shared/models/user_model';
import { Role } from '../../shared/models/user_model';
import PlanCard from './components/PlanCard';

interface PlansPageProps {
  authStore: AuthStore;
}

function PlansPage({ authStore }: PlansPageProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PlanModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = authStore?.user;
  const { showError } = useApiError();

  const savePlanFromUser = useCallback(
    async (namePlan: string) => {
      if (user?.role === Role.User) {
        try {
          await withLoading(async () => {
            const updatedUser = await updateUserData({
              ...user,
              plan: namePlan,
              status: UserStatus.Active,
            });
            authStore.setUser(updatedUser);
          }, setLoading);
          navigate('/schedule');
        } catch (error) {
          showError(error);
        }
      } else {
        navigate('/register');
      }
    },
    [user, navigate, showError, authStore],
  );

  useEffect(() => {
    withLoading(async () => {
      const plans = await getAllPlans();
      setPlans(plans);
    }, setLoading).catch(showError);
  }, [showError]);

  return (
    <Paper
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          pt: { xs: 10, sm: 8 },
          px: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box sx={{ p: 3, position: 'absolute', top: 0, left: 0 }}>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              fontSize: '15px',
              fontWeight: 500,
              color: theme.palette.text.secondary,
              textDecoration: 'none',
              '&:hover': { color: theme.palette.text.primary },
            }}
          >
            <ArrowBack sx={{ width: 20, height: 20 }} />
            На главную
          </Link>
        </Box>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: '1.75rem', sm: '2.2rem' }, mb: 3, textAlign: 'center' }}
        >
          Выберите ваш тариф
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 600,
            mx: 'auto',
            mb: 5,
            fontSize: '17px',
            pr: 4,
            pl: 4,
            textAlign: 'center',
          }}
        >
          Выберите план, который лучше всего подходит для ваших нужд.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 350px))',
          justifyContent: 'center',
          gap: { xs: 2, md: 3 },
          width: '100%',
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          pb: 4,
        }}
      >
        {plans
          .filter((p) => p.active === true)
          .map((p) => (
            <Box key={p.name} sx={{ minWidth: 0, display: 'flex' }}>
              <PlanCard
                plan={p}
                actionLabel={`Выбрать ${p.name}`}
                onAction={() => savePlanFromUser(p.name)}
              />
            </Box>
          ))}
      </Box>
      {loading && <Loader size={80} />}
    </Paper>
  );
}

export default injectMobxStore('authStore', PlansPage);
