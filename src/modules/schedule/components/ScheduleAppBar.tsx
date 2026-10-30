import { AccessTime, Chat, Person } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { appName } from '../../../shared/constants/name';
import { useState } from 'react';
import ScheduleMenuUser from './ScheduleMenuUser';

interface MainAppBarProps {
  isAiOpen: boolean;
  setIsAiOpen: Function;
}

export default function ScheduleAppBar({ isAiOpen, setIsAiOpen }: MainAppBarProps) {
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  function openUserMenu(event: React.MouseEvent<HTMLElement>) {
    setOpenMenu(event.currentTarget);
  }
  function closeUserMenu() {
    setOpenMenu(null);
  }

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          <AccessTime sx={{ fontSize: { xs: 28, sm: 38 }, color: theme.palette.primary.main }} />
          {appName}
        </Typography>

        <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} sx={{ alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<Chat />}
            onClick={() => setIsAiOpen(!isAiOpen)}
            sx={{
              minWidth: { xs: 40, sm: 'auto' },
              px: { xs: 0, sm: 2 },
              pl: { xs: 1.5, sm: 2 },
              color: theme.palette.primary.main,
              bgcolor: `${theme.palette.primary.main}15`,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                bgcolor: `${theme.palette.primary.main}15`,
              },
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              ИИ-ассистент
            </Box>
          </Button>

          <IconButton
            onClick={openUserMenu}
            sx={{
              border: '2px solid transparent',
              '&:hover': { borderColor: theme.palette.primary.main },
              p: 0.5,
            }}
          >
            <Avatar sx={{ bgcolor: theme.palette.action.hover, width: 36, height: 36 }}>
              <Person sx={{ color: theme.palette.text.primary }} />
            </Avatar>
          </IconButton>

          <ScheduleMenuUser openMenu={openMenu} closeUserMenu={closeUserMenu} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
