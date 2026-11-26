import { AppBar, Avatar, Box, IconButton, Stack, Toolbar, useTheme } from '@mui/material';
import { AccessTime, Chat, Person } from '@mui/icons-material';
import { appName } from '../../../shared';
import ScheduleMenuUser from './ScheduleMenuUser';
import { useState } from 'react';
import { ScheduleAiButton, ScheduleTitle } from './style/ScheduleAppBar.style';

interface MainAppBarProps {
  isAiOpen: boolean;
  setIsAiOpen: (isAiOpen: boolean) => void;
}

export default function ScheduleAppBar({ isAiOpen, setIsAiOpen }: MainAppBarProps) {
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const closeUserMenu = () => {
    setOpenMenu(null);
  };

  const openAIWindow = () => {
    setIsAiOpen(!isAiOpen);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <ScheduleTitle variant="h6">
          <AccessTime sx={{ fontSize: { xs: 28, sm: 38 }, color: theme.palette.primary.main }} />
          {appName}
        </ScheduleTitle>

        <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} sx={{ alignItems: 'center' }}>
          <ScheduleAiButton variant="outlined" startIcon={<Chat />} onClick={openAIWindow}>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              ИИ-ассистент
            </Box>
          </ScheduleAiButton>

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
