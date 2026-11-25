import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const QRPageContent = styled(Box)(({ theme }) => ({
  maxWidth: 480,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

export const QRCodePanel = styled(Paper)(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  border: '1px solid',
  borderColor: theme.palette.divider,
}));
