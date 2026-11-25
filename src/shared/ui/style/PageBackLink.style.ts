import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const PageBackLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: 15,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));
