import { Box, Container, Stack, Typography } from '@mui/material';
import {
  HeroBadge,
  HeroDescription,
  HeroGlow,
  HeroGlowInner,
  HeroScreen,
  PrimaryHeroButton,
  SecondaryHeroButton,
} from './LandingSection.style';
import { FlashOn } from '@mui/icons-material';
import { theme } from '../../../../shared';
import { useNavigate } from 'react-router-dom';

interface LandingHeroSectionProps {
  token: string;
  continueOrRegistrationButton: () => void;
}

function LandingHeroSection({ token, continueOrRegistrationButton }: LandingHeroSectionProps) {
  const navigator = useNavigate();
  return (
    <HeroScreen>
      <HeroGlow>
        <HeroGlowInner />
      </HeroGlow>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <HeroBadge>
          <FlashOn sx={{ fontSize: 20, color: theme.custom.accent.amber }} />
          <span>Новый стандарт личной продуктивности</span>
        </HeroBadge>

        <Typography variant="h3" sx={{ fontSize: { lg: '4.5rem', xs: '2.5rem' }, lineHeight: 1.2, mb: 3 }}>
          Управляйте временем с{' '}
          <Box
            component="span"
            sx={{
              background: theme.custom.gradients.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ИИ-ассистентом.
          </Box>
        </Typography>

        <HeroDescription variant="h6">
          Единое пространство, объединяющее ваш календарь, задачи, ИИ-ассистента и бронирование сервисов в одном интерфейсе.
        </HeroDescription>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4, justifyContent: 'center', alignItems: 'center' }}>
          <PrimaryHeroButton variant="contained" onClick={continueOrRegistrationButton}>
            {token ? 'Продолжить' : 'Начать бесплатно'}
          </PrimaryHeroButton>

          <SecondaryHeroButton variant="outlined" onClick={() => navigator('/plans')}>
            Тарифы
          </SecondaryHeroButton>
        </Stack>
      </Container>
    </HeroScreen>
  );
}

export default LandingHeroSection;
