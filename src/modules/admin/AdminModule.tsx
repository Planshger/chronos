import { Box, Stack, Typography, useTheme } from '@mui/material';
import AdminAppBar from './components/AdminAppBar';
import AdminTable from './components/table/AdminTable';

export default function Admin() {
  const theme = useTheme();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.paper }}>
      <AdminAppBar />

      <Stack sx={{ alignItems: 'flex-start', px: { xs: 2, sm: 4 }, py: 4 }}>
        <Typography variant="h2" sx={{ fontSize: '30px' }}>
          Пользователи
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.secondary, maxWidth: 672, fontSize: '15px' }}
        >
          Управление пользователями, их статусами и тарифными планами.
        </Typography>
      </Stack>

      <AdminTable />
    </Box>
  );
}
