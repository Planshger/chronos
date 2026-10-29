import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { PageWithQR } from './PageWithQR';
import { PageWithChat } from './PageWithChat';
import { useAuth } from '../../../../auth/AuthProvider';
import { authMe } from '../../../../auth/datasources/authorization_data_source';
import Loader from '../../../../../shared/ui/Loader';
import { useApiError } from '../../../../../shared/errors/ApiErrorProvider';

export default function TelegramSettings() {
  const { token } = useAuth();
  const [tgLinked, setTgLinked] = useState<boolean | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const { showError } = useApiError();

  const loadTelegramStatus = useCallback(async () => {
    setLoadFailed(false);
    setTgLinked(null);
    try {
      const user = await authMe(token);
      setTgLinked(user ? user.tgLinked : false);
    } catch (error) {
      setLoadFailed(true);
      showError(error);
    }
  }, [token, showError]);

  useEffect(() => {
    void loadTelegramStatus();
  }, [loadTelegramStatus]);

  if (loadFailed) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4 }}>
        <Typography>Не удалось загрузить статус Telegram. Попробуйте ещё раз.</Typography>
        <Button variant="contained" onClick={() => void loadTelegramStatus()}>
          Повторить
        </Button>
      </Box>
    );
  }

  if (tgLinked === null) {
    return <Loader size={80} />;
  }
  return !tgLinked ? <PageWithQR /> : <PageWithChat />;
}
