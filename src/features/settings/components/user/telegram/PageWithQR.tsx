import { Box, Button, Paper, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import TelegramIcon from '../TelegramIcon';
import { useAuth } from '../../../../../providers/AuthProvider';

export function PageWithQR() {
  const { user } = useAuth();
  const botUsername = 'AssistFromChronos_bot';
  const deepLink = `https://t.me/${botUsername}?start=${encodeURIComponent(user?.id ?? '')}`;

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', p: 3, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
        Связать с Telegram
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Отсканируйте QR-код или перейдите по ссылке, чтобы получать и отправлять задачи через
        Telegram.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          display: 'inline-block',
          p: 2,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <QRCodeSVG value={deepLink} size={220} />
      </Paper>

      <Box sx={{ mt: 3, wordBreak: 'break-all' }}>
        <Button
          component="a"
          href={deepLink}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<TelegramIcon />}
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Открыть в Telegram
        </Button>
      </Box>
    </Box>
  );
}
