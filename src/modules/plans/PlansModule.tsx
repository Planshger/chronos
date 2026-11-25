import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import injectMobxStore from '../../shared/utils/injectMobxStore';
import { getAllPlans } from './datasources/plans_data_source';
import { withLoading } from '../../shared/utils/withLoading';
import { isAuthorizedUser, UserStatus } from '../../shared/models/user_model';
import { useApiError } from '../../shared/errors/ApiError';
import { updateUserData } from '../../shared/api/userApi';
import { useCallback, useEffect, useState } from 'react';
import { Role } from '../../shared/models/user_model';
import { ArrowBack } from '@mui/icons-material';
import PlanCard from './components/PlanCard';
import Loader from '../../shared/ui/Loader';
import PlanModel from './models/plan_model';
import { AuthStore } from '../auth';
import { PageBackLink } from '../../shared/ui/style/PageBackLink.style';
import { PlansBackLinkContainer, PlansDescription, PlansGrid, PlansHeader, PlansPageRoot } from './PlansModule.style';

interface PlansPageProps {
  authStore: AuthStore;
}

function PlansPage({ authStore }: PlansPageProps) {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PlanModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = authStore.user;
  const { showError } = useApiError();

  const savePlanFromUser = useCallback(
    async (namePlan: string) => {
      if (user.role === Role.User && isAuthorizedUser(user)) {
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
    <PlansPageRoot>
      <PlansHeader>
        <PlansBackLinkContainer>
          <PageBackLink to="/">
            <ArrowBack sx={{ width: 20, height: 20 }} />
            На главную
          </PageBackLink>
        </PlansBackLinkContainer>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', sm: '2.2rem' }, mb: 3, textAlign: 'center' }}>
          Выберите ваш тариф
        </Typography>

        <PlansDescription variant="h6">Выберите план, который лучше всего подходит для ваших нужд.</PlansDescription>
      </PlansHeader>

      <PlansGrid>
        {plans
          .filter((p) => p.active === true)
          .map((p) => (
            <Box key={p.name} sx={{ minWidth: 0, display: 'flex' }}>
              <PlanCard plan={p} actionLabel={`Выбрать ${p.name}`} onAction={() => savePlanFromUser(p.name)} />
            </Box>
          ))}
      </PlansGrid>
      {loading && <Loader size={80} />}
    </PlansPageRoot>
  );
}

export default injectMobxStore('authStore', PlansPage);
