import { Box, CircularProgress, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import { getMessages, sendMessage } from '../../../data/datasources/messages_data_source';
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import injectMobxStore from '../../../../../shared/utils/injectMobxStore';
import { useApiError } from '../../../../../shared/errors/ApiError';
import { MessageModel } from '../../../models/message_model';
import SendIcon from '@mui/icons-material/Send';
import { AuthStore } from '../../../../auth';
import TelegramIcon from '../TelegramIcon';
import { ChatMessageBubble, ChatMessageTime, ChatMessagesViewport, ChatPageContent, ChatPanel } from './style/PageWithChat.style';

const POLL_INTERVAL = 3000;
const MAX_MESSAGES = 10;

interface PageWithChatProps {
  authStore: AuthStore;
}

function PageWithChat({ authStore }: PageWithChatProps) {
  const user = authStore.user;
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
      });
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

  if (!user) return null;

  return (
    <ChatPageContent>
      <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
        <TelegramIcon />

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Чат с ботом
        </Typography>
      </Stack>

      <ChatPanel variant="outlined">
        <ChatMessagesViewport>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {messages.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 6, textAlign: 'center' }}>
              Пока сообщений нет. Напишите боту в Telegram или отправьте первое сообщение ниже.
            </Typography>
          )}

          <Stack spacing={1}>
            {messages.map((m) => {
              const isUser = m.source === 'web' || m.source === 'telegram';
              return (
                <Box key={m.id} sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
                  <ChatMessageBubble elevation={0} isUser={isUser}>
                    <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 0.25 }}>
                      {isUser ? 'Вы' : 'Бот'}
                    </Typography>

                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {m.text}
                    </Typography>

                    <ChatMessageTime variant="caption" isUser={isUser}>
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </ChatMessageTime>
                  </ChatMessageBubble>
                </Box>
              );
            })}

            <div ref={bottomRef} />
          </Stack>
        </ChatMessagesViewport>

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

            <IconButton color="primary" onClick={handleSend} disabled={!input.trim() || sending} sx={{ alignSelf: 'flex-end' }}>
              {sending ? <CircularProgress size={20} /> : <SendIcon />}
            </IconButton>
          </Stack>
        </Box>
      </ChatPanel>
    </ChatPageContent>
  );
}

export default injectMobxStore('authStore', PageWithChat);
