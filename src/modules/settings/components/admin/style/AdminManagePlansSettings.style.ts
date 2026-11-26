import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AdminPlansSettingsRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingBottom: theme.spacing(2),
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.custom.border.light,
    borderRadius: 16,
  },
}));

export const AdminPlansGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  justifyContent: 'center',
  gridTemplateColumns: '1fr',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
}));
