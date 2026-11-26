import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const RegistrationToggleSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  paddingTop: theme.spacing(3),
  borderTop: `1px solid ${theme.custom.border.light}`,
  textAlign: 'center',
}));

export const RegistrationToggleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));
