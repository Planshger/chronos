import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import TelegramIcon from '../TelegramIcon';
import SendIcon from '@mui/icons-material/Send';
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { MessageModel } from '../../../models/message_model';
import { getMessages, sendMessage } from '../../../data/datasources/messages_data_source';
import { useAuth } from '../../../../auth/AuthProvider';
import theme from '../../../../../shared/ui/theme/darkTheme';
import { useApiError } from '../../../../../shared/errors/ApiErrorProvider';

const POLL_INTERVAL = 3000;
const MAX_MESSAGES = 10;

export function PageWithChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const loadFailureReported = useRef(false);
  const { showError } = useApiError();

  const loadMessages = useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await getMessages(user.id);
      const last10 = data.slice(0, MAX_MESSAGES).reverse();
      setMessages(last10);
      loadFailureReported.current = false;
    } catch (err) {
      if (!loadFailureReported.current) {
        showError(err);
        loadFailureReported.current = true;
      }
    } finally {
      setLoading(false);
    }
  }, [user?.id, showError]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !user?.id || sending) return;

    setSending(true);

    try {
      await sendMessage({
        text: text,
        source: 'web',
        userId: String(user.id),
        telegramId: null,
        createdAt: new Date().toISOString(),
        processed: false,
      } as MessageModel);
      setInput('');
      await loadMessages();
    } catch (err) {
      showError(err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown: ComponentProps<typeof TextField>['onKeyDown'] = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    loadMessages();
    const id = setInterval(loadMessages, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [user?.id, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto', p: 2 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
        <TelegramIcon />

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Чат с ботом
        </Typography>
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          height: 420,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: 'background.default' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress size={24} />
            </Box>
          ) : messages.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 6, textAlign: 'center' }}>
              Пока сообщений нет. Напишите боту в Telegram или отправьте первое сообщение ниже.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {messages.map((m) => {
                const isUser = m.source === 'web' || m.source === 'telegram';
                return (
                  <Box
                    key={m.id}
                    sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.25,
                        px: 1.75,
                        maxWidth: '75%',
                        borderRadius: 2,
                        bgcolor: theme.custom.background.muted,
                        color: theme.palette.text.primary,
                        borderBottomRightRadius: isUser ? 0 : 2,
                        borderBottomLeftRadius: isUser ? 2 : 0,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ opacity: 0.7, display: 'block', mb: 0.25 }}
                      >
                        {isUser ? 'Вы' : 'Бот'}
                      </Typography>

                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {m.text}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.6,
                          display: 'block',
                          mt: 0.25,
                          textAlign: isUser ? 'right' : 'left',
                        }}
                      >
                        {new Date(m.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </Paper>
                  </Box>
                );
              })}

              <div ref={bottomRef} />
            </Stack>
          )}
        </Box>

        <Divider />

        <Box sx={{ p: 1.5, bgcolor: 'background.paper' }}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={3}
              placeholder="Напишите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={sending}
            />

            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!input.trim() || sending}
              sx={{ alignSelf: 'flex-end' }}
            >
              {sending ? <CircularProgress size={20} /> : <SendIcon />}
            </IconButton>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
