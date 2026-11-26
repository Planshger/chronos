import { Box, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SelectedDayPanel = styled(Paper)(({ theme }) => ({
  position: 'sticky',
  top: 80,
  padding: theme.spacing(3),
  borderRadius: 16,
  border: `1px solid ${theme.custom.border.light}`,
  backgroundColor: theme.palette.background.paper,
}));

export const ScheduleActionButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  borderRadius: 12,
  borderColor: theme.custom.border.light,
  color: theme.palette.text.primary,
  textTransform: 'none',
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface ScheduleActionIconProps {
  accent: string;
  iconBackground: string;
}

export const ScheduleActionIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accent' && prop !== 'iconBackground',
})<ScheduleActionIconProps>(({ accent, iconBackground }) => ({
  width: 35,
  height: 35,
  borderRadius: 8,
  backgroundColor: iconBackground,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: accent,
}));

export const EmptySchedulePanel = styled(Paper)(({ theme }) => ({
  position: 'sticky',
  top: 80,
  padding: theme.spacing(4),
  borderRadius: 16,
  borderStyle: 'dashed',
  borderColor: theme.custom.border.medium,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent',
  minHeight: 300,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));
