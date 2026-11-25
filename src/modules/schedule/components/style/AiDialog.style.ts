import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AiDialogPanel = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
  width: 'min(320px, calc(100vw - 32px))',
  height: 'min(450px, calc(100dvh - 32px))',
  maxHeight: 'calc(100dvh - 32px)',
  borderRadius: 16,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.custom.border.light}`,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1300,
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    bottom: 24,
    right: 24,
  },
}));

export const AiDialogHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: `${theme.palette.primary.main}10`,
  borderBottom: `1px solid ${theme.custom.border.light}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const AiDialogMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  backgroundColor: theme.palette.action.hover,
}));

export const AiMessage = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 12,
  maxWidth: '85%',
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.custom.border.light,
  fontSize: '0.875rem',
}));
