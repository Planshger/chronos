import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
  Link,
  useTheme,
} from '@mui/material';
import { ArrowBack, Done } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useCallback, useEffect, useState } from 'react';
import { updateUserData } from '../admin/datasources/admin_data_source';
import Loader from '../../shared/ui/Loader';
import PlanModel from './models/plan_model';
import { getAllPlans } from './datasources/plans_data_source';
import { withLoading } from '../../shared/utils/withLoading';
import { useApiError } from '../../shared/errors/ApiErrorProvider';

export default function PlansPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PlanModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, setUser } = useAuth();
  const { showError } = useApiError();

  const savePlanFromUser = useCallback(
    async (namePlan: string) => {
      if (user?.role === 'user') {
        try {
          await withLoading(
            () =>
              updateUserData({ ...user, plan: namePlan, status: 'Активен' }).then((res) =>
                setUser(res),
              ),
            setLoading,
          );
          navigate('/schedule');
        } catch (error) {
          showError(error);
        }
      } else {
        navigate('/register');
      }
    },
    [user, navigate, setLoading, setUser, showError],
  );

  useEffect(() => {
    void withLoading(() => getAllPlans().then((res) => setPlans(res)), setLoading).catch(showError);
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
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
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
              <Card
                sx={{
                  height: '100%',
                  width: '100%',
                  minWidth: 0,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 4,
                  border: p.popular
                    ? `2px solid ${theme.palette.text.primary}`
                    : `1px solid ${theme.custom.border.light}`,
                  boxShadow: theme.custom.shadows.sm,
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {p.popular ? (
                    <Box
                      sx={{
                        bgcolor: theme.palette.text.primary,
                        textAlign: 'center',
                        borderRadius: '20px',
                        width: '130px',
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          textTransform: 'uppercase',
                          color: theme.palette.background.default,
                          fontSize: '13px',
                          mb: 0.5,
                          mt: 0.5,
                        }}
                      >
                        Хит продаж
                      </Typography>
                    </Box>
                  ) : (
                    ''
                  )}

                  <Typography variant="h3" sx={{ pb: 1, pt: 2 }}>
                    {p.name}
                  </Typography>

                  <Typography variant="h2" sx={{ pb: 1 }}>
                    {p.price} {p.trial ? '₽' : '₽ / мес'}
                  </Typography>

                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {p.description}
                  </Typography>

                  <Stack
                    direction="column"
                    spacing={3}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      pt: 4,
                    }}
                  >
                    <Stack direction="column" spacing={3}>
                      {p.features.map((f) => (
                        <Box key={f} sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Done sx={{ width: 20, height: 20, color: 'grey' }} />
                          <Typography variant="h3" sx={{ fontSize: '15px', ml: 1 }}>
                            {f}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>

                    <Button
                      variant="contained"
                      onClick={() => savePlanFromUser(p.name)}
                      sx={{
                        borderRadius: '10px',
                        bgcolor: p.popular
                          ? theme.palette.text.primary
                          : theme.palette.background.paper,
                        color: p.popular
                          ? theme.palette.background.default
                          : theme.palette.text.primary,
                        fontSize: p.popular ? '16px' : '14px',
                        boxShadow: 'none',
                        border: `1px solid ${theme.custom.border.light}`,
                        '&:hover': { boxShadow: '0 15px 25px -5px #a855f7' },
                      }}
                    >
                      Выбрать {p.name}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
      </Box>
      {loading && <Loader size={80} />}
    </Paper>
  );
}
