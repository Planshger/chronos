import { Box, Button, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HeroScreen = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100dvh - 56px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    minHeight: 'calc(100dvh - 64px)',
  },
}));

export const HeroGlow = styled(Box)({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: 768,
  height: 500,
  opacity: 0.5,
  pointerEvents: 'none',
});

export const HeroGlowInner = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background: theme.custom.gradients.hero,
  filter: 'blur(90px)',
  borderRadius: '50%',
}));

export const HeroBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 2),
  borderRadius: 80,
  backgroundColor: theme.custom.background.glass,
  border: `2px solid ${theme.custom.border.light}`,
  fontSize: '0.75rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('lg')]: {
    fontSize: '0.875rem',
  },
}));

export const HeroDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: 672,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: theme.spacing(5),
  fontSize: '1rem',
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.25rem',
  },
}));

export const PrimaryHeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.2, 2),
  borderRadius: 120,
  color: theme.palette.text.primary,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(1.8, 5),
  },
}));

export const SecondaryHeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.2, 2),
  borderRadius: 120,
  borderColor: theme.custom.border.light,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.custom.background.muted,
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(1.8, 5),
  },
}));

export const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 16,
  border: `1px solid ${theme.custom.border.light}`,
  boxShadow: theme.custom.shadows.sm,
  '&:hover': {
    boxShadow: theme.custom.shadows.md,
    transform: 'translateY(-4px)',
    '& .icon-wrapper': {
      transform: 'scale(1.1)',
    },
  },
}));

interface FeatureIconWrapperProps {
  accent: string;
}

export const FeatureIconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accent',
})<FeatureIconWrapperProps>(({ theme, accent }) => ({
  width: 56,
  height: 56,
  borderRadius: 8,
  backgroundColor: `${accent}15`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  color: accent,
}));

export const ClosingButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.8, 6),
  borderRadius: 120,
  backgroundColor: theme.palette.text.primary,
  boxShadow: theme.custom.shadows.lg,
  '&:hover': {
    boxShadow: '0 20px 25px -5px #a855f7',
  },
}));

export const LandingFooter = styled('footer')(({ theme }) => ({
  borderTop: `1px solid ${theme.custom.border.light}`,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
