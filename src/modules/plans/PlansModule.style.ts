import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PlansPageRoot = styled(Paper)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
}));

export const PlansHeader = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(8),
  },
}));

export const PlansBackLinkContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  position: 'absolute',
  top: 0,
  left: 0,
}));

export const PlansDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: 600,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: theme.spacing(5),
  fontSize: 17,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  textAlign: 'center',
}));

export const PlansGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 350px))',
  justifyContent: 'center',
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: 1280,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(3),
  },
}));
