import { useEffect, useRef, useState } from 'react';
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import TelegramIcon from '../TelegramIcon';
import { useAuth } from '../../../../../providers/AuthProvider';

interface PageWithQRProps {
    setTgLink: (value: boolean) => void;
}

const POLL_INTERVAL = 4000;

export function PageWithQR({ setTgLink }: PageWithQRProps) {
    const { user, refreshUser } = useAuth();
    const [checking, setChecking] = useState(false);
    const checkingRef = useRef(false);

    const botUsername = 'AssistFromChronos_bot';
    const deepLink = `https://t.me/${botUsername}?start=${encodeURIComponent(user?.id ?? '')}`;

    // Проверка статуса — без «залипания» параллельных запросов
    const checkStatus = async () => {
        if (checkingRef.current) return;
        checkingRef.current = true;
        setChecking(true);
        try {
            await refreshUser(); // обновляет user в AuthProvider
        } catch (err) {
            console.error('refreshUser failed', err);
        } finally {
            checkingRef.current = false;
            setChecking(false);
        }
    };

    // 1. Возврат на вкладку после Telegram
    useEffect(() => {
        const handler = () => {
            if (document.visibilityState === 'visible') checkStatus();
        };
        document.addEventListener('visibilitychange', handler);
        window.addEventListener('focus', handler);
        return () => {
            document.removeEventListener('visibilitychange', handler);
            window.removeEventListener('focus', handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 2. Polling — если QR сканируют с другого устройства
    useEffect(() => {
        const id = setInterval(checkStatus, POLL_INTERVAL);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 3. Как только tgLinked стал true — переключаем экран
    useEffect(() => {
        if (user?.tgLinked) {
            setTgLink(true);
        }
    }, [user?.tgLinked, setTgLink]);

    return (
        <Box sx={{ maxWidth: 480, mx: 'auto', p: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
                Связать с Telegram
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Отсканируйте QR-код или перейдите по ссылке, чтобы получать и отправлять
                задачи через Telegram.
            </Typography>

            <Paper elevation={0} sx={{ display: 'inline-block', p: 2, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                <QRCodeSVG value={deepLink} size={220} />
            </Paper>

            <Box sx={{ mt: 3, wordBreak: 'break-all' }}>
                <Button component="a" href={deepLink} target="_blank" rel="noopener noreferrer" startIcon={<TelegramIcon />} variant="outlined" sx={{ textTransform: 'none' }}>
                    Открыть в Telegram
                </Button>
            </Box>

            {checking && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={16} />
                    <Typography variant="caption" color="text.secondary">
                        Проверяем статус…
                    </Typography>
                </Box>
            )}
        </Box>
    );
}