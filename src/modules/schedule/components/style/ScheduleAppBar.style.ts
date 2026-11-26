import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ScheduleTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '1rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem',
  },
}));

export const ScheduleAiButton = styled(Button)(({ theme }) => ({
  minWidth: 40,
  paddingLeft: theme.spacing(1.5),
  paddingRight: 0,
  color: theme.palette.primary.main,
  backgroundColor: `${theme.palette.primary.main}15`,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: `${theme.palette.primary.main}15`,
  },
  [theme.breakpoints.up('sm')]: {
    minWidth: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
