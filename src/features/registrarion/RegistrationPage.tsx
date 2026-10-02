import { useCallback, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {Box, Typography, TextField, Button, Link, Paper} from '@mui/material';
import {Person as UserIcon, Shield as ShieldIcon, ArrowBack as ArrowBackIcon, PersonAddAlt1} from '@mui/icons-material';
import theme from '../../core/theme/darkTheme';
import { useAuth } from '../../providers/AuthProvider';
import { auth, errorHandlerFromAPI, register } from '../../core/datasources/authorization_data_source';
import UserModel from '../../core/ models/user_model';
import Loader from '../../core/components/Loader';
import { RegisterUserModel } from './models/register_user_model';
import { Loading } from '../../core/datasources/admin_data_source';

export default function RegistrationPage() {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, seInput] = useState<UserModel>({name: '', email: '', plan: '', status: '', password: ''} as UserModel);
  const {setToken} = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // e.target.
    if (isAdminLogin) {
      await Loading(() => errorHandlerFromAPI<RegisterUserModel>(() => auth(input)).then((res) => {res.data.role === 'admin' ? setToken(res.token) : alert('Не админ')}), setLoading);
      navigate('/admin', { replace: true });
      return;
    } 

    if (isLogin) {
      await Loading(() => errorHandlerFromAPI<RegisterUserModel>(() => auth(input)).then((res) => {res.data.role === 'user' ? setToken(res.token) : alert('Не пользователь')}), setLoading);
      navigate('/schedule', { replace: true });
      return;
    }

    await Loading(() => register({...input, status: 'Ожидание оплаты'}).then(res => setToken(res.token)), setLoading);
    navigate('/plans', { replace: true });
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
     seInput((prev) => ({...prev, [e.target.name]: e.target.value} as UserModel))
  }, [])

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
              <Typography variant="h5" color={theme.palette.text.primary}>{isAdminLogin ? 'Доступ Администратора' : isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}</Typography>              
              <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mt: 1 }}>
                {isAdminLogin ? 'Введите данные для входа в панель управления.' : isLogin ? 'Введите данные для входа в аккаунта.': 'Введите данные для создания аккаунта и выбора тарифа.'}
              </Typography>   
            </Box>

            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField name='email' label="Эл. почта" type="email" placeholder="name@example.com" fullWidth margin="normal" variant="outlined" value={input.email} onChange={onChange} required/>
              
              {!isAdminLogin ? !isLogin ?
                <TextField name='name' label={isAdminLogin ? 'Логин Администратора' : 'Имя пользователя'} placeholder="Логин" fullWidth margin="normal" variant="outlined" value={input.name}  onChange={onChange} required/>
                : null : null
              }

              <TextField name='password' label="Пароль" type="password" placeholder="••••••••" fullWidth margin="normal" variant="outlined" sx={{ mb: 3}} value={input.password}  onChange={onChange} required/>
              
              <Button type='sumbit' variant="contained" fullWidth sx={{py: 1.5, borderRadius: 2, fontWeight: 600, boxShadow: 2, color: theme.palette.text.primary}}>
                {isAdminLogin ? 'Войти в админ-панель' : isLogin ?  'Войти' : 'Продолжить'}
              </Button>
            </form>

            <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.custom.border.light}`, textAlign: 'center' }}>
              {!isAdminLogin &&
                <Button variant="text" onClick={() => setIsLogin(!isLogin)} sx={{ color: theme.palette.text.secondary, fontWeight: 500, textTransform: 'none', '&:hover': { color: theme.palette.text.primary } }} startIcon={!isLogin ? <UserIcon sx={{ width: 18, height: 18 }} /> : <PersonAddAlt1 sx={{ width: 18, height: 18 }} />}>
                  {isLogin ? 'Создать аккаунт' : 'Войти как пользователь'}
                </Button>
              }  
              <Button variant="text" onClick={() => {setIsAdminLogin(!isAdminLogin); setIsLogin(true)}} sx={{ color: theme.palette.text.secondary, fontWeight: 500, textTransform: 'none', '&:hover': { color: theme.palette.text.primary } }} startIcon={isAdminLogin ? <UserIcon sx={{ width: 18, height: 18 }} /> : <ShieldIcon sx={{ width: 18, height: 18 }} />}>
                {isAdminLogin ? 'Войти как пользователь' : 'Вход для Администратора'}
              </Button>
            </Box>
        </Paper>
      </Box>
        {loading && (
          <Loader size={80} />
        )}
    </Box>
  );
}