import { useCallback, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Button, Link, Paper } from '@mui/material';
import {
  Person as UserIcon,
  Shield as ShieldIcon,
  ArrowBack as ArrowBackIcon,
  PersonAddAlt1,
} from '@mui/icons-material';
import theme from '../../shared/ui/theme/darkTheme';
import { useAuth } from '../auth/AuthProvider';
import { auth, register } from '../auth/datasources/authorization_data_source';
import UserModel, { initialUser } from '../../shared/models/user_model';
import Loader from '../../shared/ui/Loader';
import { withLoading } from '../../shared/utils/withLoading';
import { useApiError } from '../../shared/errors/ApiErrorProvider';

export default function RegistrationPage() {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, seInput] = useState<UserModel>(initialUser);
  const { setToken } = useAuth();
  const { showError } = useApiError();
  const navigate = useNavigate();
  let pageTitle = 'Создать аккаунт';
  let pageDescription = 'Введите данные для создания аккаунта и выбора тарифа.';
  let submitLabel = 'Продолжить';

  if (isAdminLogin) {
    pageTitle = 'Доступ Администратора';
    pageDescription = 'Введите данные для входа в панель управления.';
    submitLabel = 'Войти в админ-панель';
  } else if (isLogin) {
    pageTitle = 'Вход в аккаунт';
    pageDescription = 'Введите данные для входа в аккаунта.';
    submitLabel = 'Войти';
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (isAdminLogin) {
        await withLoading(
          () =>
            auth(input, 'admin').then((res) => {
              setToken(res.token);
              navigate('/admin', { replace: true });
            }),
          setLoading,
        );
        return;
      }

      if (isLogin) {
        await withLoading(
          () =>
            auth(input, 'user').then((res) => {
              setToken(res.token);
              navigate('/schedule', { replace: true });
            }),
          setLoading,
        );
        return;
      }

      await withLoading(
        () =>
          register({ ...input, status: 'Ожидание оплаты' }).then((res) => {
            setToken(res.token);
            navigate('/plans', { replace: true });
          }),
        setLoading,
      );
    } catch (error: unknown) {
      showError(error);
    }
  }

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    seInput((prev) => ({ ...prev, [e.target.name]: e.target.value }) as UserModel);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '15px',
            fontWeight: 500,
            color: theme.palette.text.secondary,
            textDecoration: 'none',
            '&:hover': { color: theme.palette.text.primary },
          }}
        >
          <ArrowBackIcon sx={{ width: 20, height: 20 }} />
          На главную
        </Link>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 450,
            p: 4,
            borderRadius: 3,
            border: `1px solid ${theme.custom.border.light}`,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {pageTitle}
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mt: 1 }}>
              {pageDescription}
            </Typography>
          </Box>

          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              name="email"
              label="Эл. почта"
              type="email"
              placeholder="name@example.com"
              fullWidth
              margin="normal"
              variant="outlined"
              value={input.email}
              onChange={onChange}
              required
            />

            {!isAdminLogin && !isLogin && (
              <TextField
                name="name"
                label="Имя пользователя"
                placeholder="Логин"
                fullWidth
                margin="normal"
                variant="outlined"
                value={input.name}
                onChange={onChange}
                required
              />
            )}

            <TextField
              name="password"
              label="Пароль"
              type="password"
              placeholder="••••••••"
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ mb: 3 }}
              value={input.password}
              onChange={onChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: 2,
                color: theme.palette.text.primary,
              }}
            >
              {submitLabel}
            </Button>
          </form>

          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${theme.custom.border.light}`,
              textAlign: 'center',
            }}
          >
            {!isAdminLogin && (
              <Button
                variant="text"
                onClick={() => setIsLogin(!isLogin)}
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': { color: theme.palette.text.primary },
                }}
                startIcon={
                  !isLogin ? (
                    <UserIcon sx={{ width: 18, height: 18 }} />
                  ) : (
                    <PersonAddAlt1 sx={{ width: 18, height: 18 }} />
                  )
                }
              >
                {isLogin ? 'Создать аккаунт' : 'Войти как пользователь'}
              </Button>
            )}
            <Button
              variant="text"
              onClick={() => {
                setIsAdminLogin(!isAdminLogin);
                setIsLogin(true);
              }}
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': { color: theme.palette.text.primary },
              }}
              startIcon={
                isAdminLogin ? (
                  <UserIcon sx={{ width: 18, height: 18 }} />
                ) : (
                  <ShieldIcon sx={{ width: 18, height: 18 }} />
                )
              }
            >
              {isAdminLogin ? 'Войти как пользователь' : 'Вход для Администратора'}
            </Button>
          </Box>
        </Paper>
      </Box>
      {loading && <Loader size={80} />}
    </Box>
  );
}
