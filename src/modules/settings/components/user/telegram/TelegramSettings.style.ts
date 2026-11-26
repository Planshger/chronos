import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TelegramStatusError = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
}));
