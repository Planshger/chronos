import { Box, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AuthFormContent = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const AuthFormCard = styled(Paper)(({ theme }) => ({
  maxWidth: 450,
  width: 'calc(100% - 32px)',
  padding: theme.spacing(4),
  borderRadius: 12,
  border: `1px solid ${theme.custom.border.light}`,
}));

export const AuthSubmitButton = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: 8,
  fontWeight: 600,
  boxShadow: theme.shadows[2],
  color: theme.palette.text.primary,
}));
