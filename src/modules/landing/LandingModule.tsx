import { Box, useTheme } from '@mui/material';
import injectMobxStore from '../../shared/utils/injectMobxStore';
import LandingAppBar from './components/LandingAppBar';
import { Role } from '../../shared/models/user_model';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { AuthStore } from '../auth';
import LandingHeroSection from './components/sections/LandingHeroSection';
import LandingFeaturesSection from './components/sections/LandingFeaturesSection';
import LandingFooterSection from './components/sections/LandingFooterSection';
import LandingProposalSection from './components/sections/LandingProposalSection';

interface LandingPageProps {
  authStore: AuthStore;
}

function LandingPage({ authStore }: LandingPageProps) {
  const theme = useTheme();
  const token = authStore.token;
  const user = authStore.user;
  const navigator = useNavigate();

  const continueOrRegistrationButton = useCallback(() => {
    if (token) {
      if (user.role === Role.Admin) {
        navigator('/admin');
      } else {
        navigator('/schedule');
      }
      if (user.plan === '' && user.role === Role.User) {
        navigator('/plans');
      }
    } else {
      navigator('/register');
    }
  }, [navigator, token, user.plan, user.role]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <LandingAppBar />

      <LandingHeroSection token={token} continueOrRegistrationButton={continueOrRegistrationButton} />

      <LandingFeaturesSection />

      <LandingProposalSection continueOrRegistrationButton={continueOrRegistrationButton} />

      <LandingFooterSection />
    </Box>
  );
}

export default injectMobxStore('authStore', LandingPage);
