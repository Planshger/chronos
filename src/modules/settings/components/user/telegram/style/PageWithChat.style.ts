import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChatPageContent = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 560,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: 0,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const ChatPanel = styled(Paper)({
  height: 'clamp(240px, 60dvh, 420px)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  overflow: 'hidden',
});

export const ChatMessagesViewport = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

interface ChatMessageBubbleProps {
  isUser: boolean;
}

export const ChatMessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<ChatMessageBubbleProps>(({ theme, isUser }) => ({
  padding: theme.spacing(1.25),
  paddingLeft: theme.spacing(1.75),
  paddingRight: theme.spacing(1.75),
  maxWidth: '75%',
  borderRadius: 8,
  backgroundColor: theme.custom.background.muted,
  color: theme.palette.text.primary,
  borderBottomRightRadius: isUser ? 0 : 8,
  borderBottomLeftRadius: isUser ? 8 : 0,
}));

export const ChatMessageTime = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<ChatMessageBubbleProps>(({ isUser, theme }) => ({
  opacity: 0.6,
  display: 'block',
  marginTop: theme.spacing(0.25),
  textAlign: isUser ? 'right' : 'left',
}));
