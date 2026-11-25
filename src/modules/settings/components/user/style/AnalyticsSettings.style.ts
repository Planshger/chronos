import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

type SummaryTone = 'primary' | 'secondary';

interface AnalyticsSummaryCardProps {
  tone: SummaryTone;
}

export const AnalyticsSummaryCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'tone',
})<AnalyticsSummaryCardProps>(({ theme, tone }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette[tone].light,
  color: theme.palette[tone].contrastText,
}));

export const AnalyticsChartPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 160,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));
