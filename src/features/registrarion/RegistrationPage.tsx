import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {Box, Typography, TextField, Button, Link, Paper} from '@mui/material';
import {Person as UserIcon, Shield as ShieldIcon, ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import theme from '../../core/theme/darkTheme';

export default function RegistrationPage() {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  function handleSubmit() {
    if (isAdminLogin) {
      navigate('/admin');
    } else {
      navigate('/plans');
    }
  };

  return (
    <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Box sx={{p: 3}}>
        <Link component={RouterLink} to="/" sx={{display: 'inline-flex', alignItems: 'center', gap: 1,fontSize: '15px', fontWeight: 500, color: theme.palette.text.secondary, textDecoration: 'none','&:hover': {color: theme.palette.text.primary}}}>
          <ArrowBackIcon sx={{width: 20, height: 20}}/>
            На главную
        </Link>
      </Box>


      <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Paper elevation={3} sx={{maxWidth: 450, p: 4, borderRadius: 3, border: `1px solid ${theme.custom.border.light}`}}>
            <Box sx={{textAlign: 'center', mb: 4}}>
              <Typography variant="h5" color={theme.palette.text.primary}>{isAdminLogin ? 'Доступ Администратора' : 'Создать аккаунт'}</Typography>              
              <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mt: 1 }}>
                {isAdminLogin ? 'Введите данные для входа в панель управления.' : 'Введите данные для создания аккаунта и выбора тарифа.'}
              </Typography>
            </Box>


            <form>
              {!isAdminLogin && (
                <TextField label="Эл. почта" type="email" placeholder="name@example.com" fullWidth margin="normal" variant="outlined"/>
              )}

              <TextField label={isAdminLogin ? 'Логин Администратора' : 'Имя пользователя'} placeholder="Логин" fullWidth margin="normal" variant="outlined"/>

              <TextField label="Пароль" type="password" placeholder="••••••••" fullWidth margin="normal" variant="outlined" sx={{ mb: 3}}/>
              
              <Button variant="contained" onClick={handleSubmit} fullWidth sx={{py: 1.5, borderRadius: 2, fontWeight: 600, boxShadow: 2, color: theme.palette.text.primary}}>
                {isAdminLogin ? 'Войти в админ-панель' : 'Продолжить'}
              </Button>
            </form>

            <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.custom.border.light}`, textAlign: 'center' }}>
                <Button variant="text" onClick={() => setIsAdminLogin(!isAdminLogin)} sx={{ color: theme.palette.text.secondary, fontWeight: 500, textTransform: 'none', '&:hover': { color: theme.palette.text.primary } }} startIcon={isAdminLogin ? <UserIcon sx={{ width: 18, height: 18 }} /> : <ShieldIcon sx={{ width: 18, height: 18 }} />}>
                    {isAdminLogin ? 'Войти как пользователь' : 'Вход для Администратора'}
                </Button>
            </Box>
        </Paper>
      </Box>
    </Box>
  );
}