import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CalendarRoot = styled(Paper)(({ theme }) => ({
  width: '100%',
  flex: '1 1 0',
  minWidth: 0,
  padding: theme.spacing(3),
  borderRadius: 28,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.custom.border.light}`,
  boxShadow: theme.custom.shadows.sm,
}));

export const CalendarHeader = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  position: 'relative',
  zIndex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const CalendarTitleIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.8),
  backgroundColor: theme.palette.primary.main,
  borderRadius: 8,
  display: 'flex',
}));

export const WeekdayLabel = styled(Typography)(({ theme }) => ({
  minWidth: 0,
  textTransform: 'uppercase',
  letterSpacing: 0,
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    letterSpacing: '0.5px',
  },
}));

interface CalendarDayProps {
  isSelected: boolean;
  isCurrentMonth: boolean;
}

export const CalendarDay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isCurrentMonth',
})<CalendarDayProps>(({ theme, isSelected, isCurrentMonth }) => ({
  minWidth: 0,
  minHeight: 68,
  padding: theme.spacing(0.5),
  borderRadius: 6,
  cursor: 'pointer',
  border: '1px solid transparent',
  backgroundColor: isSelected ? theme.custom.accent.amber : 'transparent',
  color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  opacity: isCurrentMonth ? 1 : 0.4,
  filter: isCurrentMonth ? 'none' : 'grayscale(0.5)',
  '&:hover': {
    backgroundColor: isSelected ? theme.custom.accent.amber : theme.palette.action.hover,
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: 92,
    padding: theme.spacing(1),
    borderRadius: 12,
  },
  [theme.breakpoints.up('md')]: {
    minHeight: 105,
  },
}));

interface DayNumberProps {
  isToday: boolean;
  isSelected: boolean;
}

export const DayNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isToday' && prop !== 'isSelected',
})<DayNumberProps>(({ theme, isToday, isSelected }) => ({
  fontWeight: 600,
  borderRadius: '50%',
  backgroundColor: isToday && !isSelected ? theme.palette.primary.main : 'transparent',
  color: isToday && !isSelected ? theme.palette.primary.contrastText : 'inherit',
  width: 32,
  height: 32,
  textAlign: 'center',
  lineHeight: '32px',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

export const DayTaskList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.25),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(1),
  },
}));

interface DayTaskChipProps {
  isMeeting: boolean;
}

export const DayTaskChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'isMeeting',
})<DayTaskChipProps>(({ theme, isMeeting }) => ({
  fontSize: '0.6rem',
  height: 20,
  maxWidth: '100%',
  backgroundColor: isMeeting ? theme.palette.secondary.light : theme.palette.primary.light,
  color: isMeeting ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText,
  border: 'none',
  '& .MuiChip-label': {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));
