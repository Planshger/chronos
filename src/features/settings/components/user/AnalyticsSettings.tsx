import { BarChart } from "@mui/icons-material";
import { Grid, Paper, Stack, Typography } from "@mui/material";

export default function AnalyticsSettings() {
    return (
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Paper sx={{p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText'}}><Typography variant="h4" >24</Typography><Typography variant="caption">Задачи за месяц</Typography></Paper>

            <Paper sx={{p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'secondary.contrastText'}}><Typography variant="h4">8</Typography><Typography variant="caption">Встречи</Typography></Paper>
          </Grid>

          <Paper sx={{p: 4, textAlign: 'center', color: 'text.secondary', height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <BarChart sx={{fontSize: 40, opacity: 0.3, mb: 1}}/>
            
            <Typography variant="body2">График активности</Typography>
          </Paper>
        </Stack>
    );
}