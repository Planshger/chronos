import { DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TaskDialogTitle = styled(DialogTitle)(({ theme }) => ({
  borderBottom: `1px solid ${theme.custom.border.light}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
