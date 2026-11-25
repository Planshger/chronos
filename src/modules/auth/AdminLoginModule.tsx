import { ArrowBack as ArrowBackIcon, ShieldTwoTone as ShieldIcon } from '@mui/icons-material';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import UserModel, { initialUser, Role } from '../../shared/models/user_model';
import { useNavigate } from 'react-router-dom';
import injectMobxStore from '../../shared/utils/injectMobxStore';
import { auth } from './datasources/authorization_data_source';
import ApiErrorStore from '../../shared/errors/ApiErrorStore';
import { withLoading } from '../../shared/utils/withLoading';
import { useCallback, useState } from 'react';
import Loader from '../../shared/ui/Loader';
import AuthStore from './stores/AuthStore';
import { AuthFormCard, AuthFormContent, AuthSubmitButton } from '../../shared/ui/style/AuthForm.style';
import { PageBackLink } from '../../shared/ui/style/PageBackLink.style';

interface AdminLoginModuleProps {
  authStore: AuthStore;
  apiErrorStore: ApiErrorStore;
}

function AdminLoginModule({ authStore, apiErrorStore }: AdminLoginModuleProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<UserModel>(initialUser);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }) as UserModel);
  }, []);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await withLoading(async () => {
        const res = await auth(input, Role.Admin);
        authStore.authenticate(res.token, res.data);
        navigate('/admin', { replace: true });
      }, setLoading);
    } catch (error: unknown) {
      apiErrorStore.showError(error);
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <PageBackLink to="/">
          <ArrowBackIcon sx={{ width: 20, height: 20 }} />
          На главную
        </PageBackLink>
      </Box>

      <AuthFormContent>
        <AuthFormCard elevation={3}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <ShieldIcon sx={{ fontSize: 44, color: theme.palette.primary.main, mb: 1 }} />
            <Typography variant="h5" color={theme.palette.text.primary}>
              Доступ Администратора
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mt: 1 }}>
              Введите данные для входа в панель управления.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Эл. почта"
              type="email"
              placeholder="admin@example.com"
              fullWidth
              margin="normal"
              variant="outlined"
              value={input.email}
              onChange={onChange}
              required
            />

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

            <AuthSubmitButton type="submit" variant="contained" fullWidth>
              Войти в админ-панель
            </AuthSubmitButton>
          </form>
        </AuthFormCard>
      </AuthFormContent>
      {loading && <Loader size={80} />}
    </Box>
  );
}

export default injectMobxStore(['authStore', 'apiErrorStore'], AdminLoginModule);
