import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { AuthStore } from '../../auth';
import injectMobxStore from '../../../shared/utils/injectMobxStore';
import { Role } from '../../../shared/models/user_model';

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
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1, minWidth: 0, fontSize: { xs: '1.75rem', sm: '2rem' } }}
          >
            Chronos
          </Typography>

          {token ? (
            <Button onClick={logout} sx={{ color: 'error.main' }}>
              Выход
            </Button>
          ) : (
            <Button
              onClick={() => onClick(user.role === Role.Admin ? '/admin' : '/schedule')}
              sx={{ color: 'text.primary' }}
            >
              Регистрация
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default injectMobxStore('authStore', LandingAppBar);
