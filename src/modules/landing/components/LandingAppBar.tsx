import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import AuthStore from '../../auth/stores/AuthStore';
import injectMobxStore from '../../../shared/utils/injectMobxStore';

interface LandingAppBarProps {
  authStore: AuthStore;
}

const LandingAppBar = ({ authStore }: LandingAppBarProps) => {
  const token = authStore.token;
  const navigate = useNavigate();

  const onClick = useCallback(
    (url: string) => {
      if (!token) {
        navigate('/register');
      } else {
        navigate(url);
      }
    },
    [navigate, token],
  );

  const { logout, user } = authStore;

  return (
    <Box sx={{ p: 4 }}>
      <AppBar position="fixed" sx={{ backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Chronos
          </Typography>

          {token ? (
            <Button onClick={logout} sx={{ color: 'error.main' }}>
              Выход
            </Button>
          ) : (
            <Button
              onClick={() => onClick(user.role === 'admin' ? '/admin' : '/schedule')}
              sx={{ color: 'text.primary' }}
            >
              Вход
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default injectMobxStore('authStore', LandingAppBar);
