import { injectMobxStore, Role } from '../../../shared';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { AuthStore } from '../../auth';
import Box from '@mui/material/Box';
import { useCallback } from 'react';

interface LandingAppBarProps {
  authStore: AuthStore;
}

const LandingAppBar = ({ authStore }: LandingAppBarProps) => {
  const { logout, user, token } = authStore;
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    let url = user.role === Role.Admin ? '/admin' : '/schedule';
    if (!token) {
      navigate('/register');
    } else {
      navigate(url);
    }
  }, [navigate, token, user.role]);

  return (
    <Box sx={{ p: 4 }}>
      <AppBar position="fixed" sx={{ backdropFilter: 'blur(10px)' }}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, minWidth: 0, fontSize: { xs: '1.75rem', sm: '2rem' } }}>
            Chronos
          </Typography>

          {token ? (
            <Button onClick={logout} sx={{ color: 'error.main' }}>
              Выход
            </Button>
          ) : (
            <Button onClick={onClick} sx={{ color: 'text.primary' }}>
              Регистрация
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default injectMobxStore('authStore', LandingAppBar);
