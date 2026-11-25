import { Box, Stack } from '@mui/material';
import { Toolbar } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const SearchRow = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  minWidth: 0,
}));

export const SearchFields = styled(Stack)(({ theme }) => ({
  alignItems: 'stretch',
  width: '100%',
  maxWidth: 960,
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
  },
}));

interface ToolbarStyleProps {
  hasSelection: boolean;
}

export const TableToolbarRoot = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'hasSelection',
})<ToolbarStyleProps>(({ theme, hasSelection }) => ({
  paddingRight: theme.spacing(1),
  backgroundColor: hasSelection
    ? alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
    : theme.palette.background.default,
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(2),
  },
}));
