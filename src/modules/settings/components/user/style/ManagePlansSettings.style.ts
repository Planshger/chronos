import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CurrentPlanAvatar = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  backgroundColor: theme.palette.warning.main,
  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
}));
