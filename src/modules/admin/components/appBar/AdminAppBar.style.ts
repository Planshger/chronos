import { Button, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import GppGood from '@mui/icons-material/GppGood';

export const Title = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  minWidth: 0,
  fontSize: '1.1rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem',
  },
}));

export const TitleIcon = styled(GppGood)(({ theme }) => ({
  flexShrink: 0,
  fontSize: 30,
  color: theme.palette.primary.main,
  [theme.breakpoints.up('sm')]: {
    fontSize: 38,
  },
}));

export const Label = styled('span')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'inline',
  },
}));

type AdminActionTone = 'profile' | 'plans' | 'logout';

interface AdminActionButtonProps {
  tone: AdminActionTone;
}

export const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'tone',
})<AdminActionButtonProps>(({ theme, tone }) => {
  const toneStyles: Record<AdminActionTone, object> = {
    plans: {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
      },
    },
    logout: {
      color: theme.palette.error.main,
      backgroundColor: alpha(theme.palette.error.main, 0.08),
      '&:hover': {
        borderColor: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.15),
      },
    },
    profile: {
      borderColor: theme.custom.border.light,
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: theme.custom.background.muted,
      },
    },
  };

  return {
    minWidth: 40,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      minWidth: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    ...toneStyles[tone],
  };
});
