import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SettingsRoot = styled(Box)(({ theme }) => ({
  minHeight: '100dvh',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('md')]: {
    height: '100dvh',
  },
}));

export const SettingsContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const SettingsLayout = styled(Stack)({
  alignItems: 'stretch',
  minWidth: 0,
  flex: 1,
  minHeight: 0,
});

export const SettingsContentPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 28,
  flex: '0 0 auto',
  minWidth: 0,
  minHeight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.custom.border.light}`,
  boxShadow: theme.custom.shadows.sm,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    flex: '1 1 0',
    minHeight: 0,
  },
}));

export const SettingsSectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '1rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem',
  },
}));

export const SettingsTitleIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.8),
  backgroundColor: theme.palette.primary.main,
  borderRadius: 8,
  display: 'flex',
}));

export const SettingsSectionContent = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  width: '100%',
  flex: '1',
  minHeight: 0,
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(6),
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(4),
  },
}));
