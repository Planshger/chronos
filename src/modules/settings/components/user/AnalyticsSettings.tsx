import { Grid, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/icons-material';
import { AnalyticsChartPanel, AnalyticsSummaryCard } from './style/AnalyticsSettings.style';

export default function AnalyticsSettings() {
  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <AnalyticsSummaryCard tone="primary">
          <Typography variant="h4">24</Typography>
          <Typography variant="caption">Задачи за месяц</Typography>
        </AnalyticsSummaryCard>

        <AnalyticsSummaryCard tone="secondary">
          <Typography variant="h4">8</Typography>
          <Typography variant="caption">Встречи</Typography>
        </AnalyticsSummaryCard>
      </Grid>

      <AnalyticsChartPanel>
        <BarChart sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />

        <Typography variant="body2">График активности</Typography>
      </AnalyticsChartPanel>
    </Stack>
  );
}
