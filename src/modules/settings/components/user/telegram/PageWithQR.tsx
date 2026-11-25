import injectMobxStore from '../../../../../shared/utils/injectMobxStore';
import { Box, Button, Typography } from '@mui/material';
import { AuthStore } from '../../../../auth';
import TelegramIcon from '../TelegramIcon';
import { QRCodeSVG } from 'qrcode.react';
import { QRCodePanel, QRPageContent } from './style/PageWithQR.style';

interface PageWithQRProps {
  authStore: AuthStore;
}

function PageWithQR({ authStore }: PageWithQRProps) {
  const { user } = authStore;
  const botUsername = 'AssistFromChronos_bot';
  const deepLink = `https://t.me/${botUsername}?start=${encodeURIComponent(user?.id ?? '')}`;

  return (
    <QRPageContent>
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
        Связать с Telegram
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Отсканируйте QR-код или перейдите по ссылке, чтобы получать и отправлять задачи через Telegram.
      </Typography>

      <QRCodePanel elevation={0}>
        <QRCodeSVG value={deepLink} size={220} />
      </QRCodePanel>

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
    </QRPageContent>
  );
}

export default injectMobxStore('authStore', PageWithQR);
