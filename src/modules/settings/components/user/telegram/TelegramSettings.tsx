import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import PageWithQR from './PageWithQR';
import PageWithChat from './PageWithChat';
import { authMe, AuthStore } from '../../../../auth';
import Loader from '../../../../../shared/ui/Loader';
import { useApiError } from '../../../../../shared/errors/ApiError';
import injectMobxStore from '../../../../../shared/utils/injectMobxStore';

interface TelegramSettingsProps {
  authStore: AuthStore;
}

interface TelegramStatusState {
  token: string;
  linked: boolean | null;
  loadFailed: boolean;
}

function TelegramSettings({ authStore }: TelegramSettingsProps) {
  const token = authStore.token;
  const user = authStore.user;
  const [status, setStatus] = useState<TelegramStatusState>({
    token,
    linked: null,
    loadFailed: false,
  });
  const { showError } = useApiError();
  const tgLinked = status.token === token ? status.linked : null;
  const loadFailed = status.token === token && status.loadFailed;

  const loadTelegramStatus = useCallback(async () => {
    setStatus({ token, linked: null, loadFailed: false });
    try {
      const currentUser = await authMe(token);
      if (authStore.token === token) {
        setStatus({ token, linked: currentUser ? currentUser.tgLinked : false, loadFailed: false });
      }
    } catch (error) {
      if (authStore.token === token) {
        setStatus({ token, linked: null, loadFailed: true });
        showError(error);
      }
    }
  }, [authStore, token, showError]);

  useEffect(() => {
    loadTelegramStatus();
  }, [loadTelegramStatus]);

  if (!user) return null;

  if (loadFailed) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4 }}>
        <Typography>Не удалось загрузить статус Telegram. Попробуйте ещё раз.</Typography>
        <Button variant="contained" onClick={() => loadTelegramStatus()}>
          Повторить
        </Button>
      </Box>
    );
  }

  if (tgLinked === null) {
    return <Loader size={80} />;
  }
  return !tgLinked ? <PageWithQR /> : <PageWithChat key={user.id} />;
}

export default injectMobxStore('authStore', TelegramSettings);
