import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AdminPlanModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(640px, calc(100vw - 32px))',
  maxHeight: 'calc(100dvh - 32px)',
  overflowY: 'auto',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: theme.shadows[24],
  borderRadius: '20px',
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5),
  },
}));

export const AdminPlanModalCloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  color: theme.palette.grey[500],
}));
