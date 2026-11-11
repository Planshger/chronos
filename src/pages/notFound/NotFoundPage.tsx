import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Stack
      spacing={2}
      sx={{ minHeight: '100vh', p: 3, alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="h2" component="h2">
        Страница не найдена
      </Typography>
      <Typography color="text.secondary">
        Возможно, адрес указан неверно или страница была перемещена.
      </Typography>
      <Button component={Link} to="/" variant="contained">
        На главную
      </Button>
    </Stack>
  );
}
