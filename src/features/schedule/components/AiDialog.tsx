import { Box, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import theme from "../../../core/theme/darkTheme";
import { AutoAwesome, Close } from "@mui/icons-material";

interface AiDialogProps {
    setIsAiOpen: Function;
}

export default function AiDialog({setIsAiOpen}: AiDialogProps) {
    return (
        <Paper elevation={8} sx={{position: 'fixed', bottom: 24, right: 24, width: 320, height: 450, borderRadius: 4, bgcolor: theme.palette.background.paper, border: `1px solid ${theme.custom.border.light}`, display: 'flex', flexDirection: 'column', zIndex: 1300, overflow: 'hidden'}}>
          <Box sx={{p: 2, bgcolor: theme.palette.primary.main + '10', borderBottom: `1px solid ${theme.custom.border.light}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
              <AutoAwesome sx={{fontSize: 18, color: theme.palette.primary.main}}/>
              <Typography variant="subtitle2">ИИ-ассистент</Typography>
            </Stack>

            <IconButton size="small" onClick={() => setIsAiOpen(false)}><Close fontSize="small" /></IconButton>
          </Box>

          <Box sx={{flex: 1, p: 2, overflowY: 'auto', bgcolor: theme.palette.action.hover}}>
            <Paper variant="outlined" sx={{p: 1.5, borderRadius: 3, maxWidth: '85%', bgcolor: theme.palette.background.paper, borderColor: theme.custom.border.light, fontSize: '0.875rem'}}>
              Привет! Я ваш ИИ-помощник. Помогу проанализировать расписание, добавить встречу или найти нужную информацию. Чем займемся?
            </Paper>
          </Box>
          
          <Box sx={{p: 2, borderTop: `1px solid ${theme.custom.border.light}`}}>
            <TextField fullWidth size="small" placeholder="Спросите меня о чем угодно..."/>
          </Box>
        </Paper>
     
    );
}