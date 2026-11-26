import { Box, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import { AutoAwesome, Close } from '@mui/icons-material';
import { AiDialogHeader, AiDialogMessages, AiDialogPanel, AiMessage } from './style/AiDialog.style';

interface AiDialogProps {
  setIsAiOpen: (isAiOpen: boolean) => void;
}

export default function AiDialog({ setIsAiOpen }: AiDialogProps) {
  const theme = useTheme();

  return (
    <AiDialogPanel elevation={8}>
      <AiDialogHeader>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <AutoAwesome sx={{ fontSize: 18, color: theme.palette.primary.main }} />
          <Typography variant="subtitle2">ИИ-ассистент</Typography>
        </Stack>

        <IconButton size="small" onClick={() => setIsAiOpen(false)}>
          <Close fontSize="small" />
        </IconButton>
      </AiDialogHeader>

      <AiDialogMessages>
        <AiMessage variant="outlined">
          Привет! Я ваш ИИ-помощник. Помогу проанализировать расписание, добавить встречу или найти нужную информацию. Чем займемся?
        </AiMessage>
      </AiDialogMessages>

      <Box sx={{ p: 2, borderTop: `1px solid ${theme.custom.border.light}` }}>
        <TextField fullWidth size="small" placeholder="Спросите меня о чем угодно..." />
      </Box>
    </AiDialogPanel>
  );
}
