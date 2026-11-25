import { Person as UserIcon, ArrowBack as ArrowBackIcon, PersonAddAlt1 } from '@mui/icons-material';
import { Box, Typography, TextField, useTheme } from '@mui/material';
import UserModel, { initialUser, Role, UserStatus } from '../../shared/models/user_model';
import { useNavigate } from 'react-router-dom';
import injectMobxStore from '../../shared/utils/injectMobxStore';
import ApiErrorStore from '../../shared/errors/ApiErrorStore';
import { withLoading } from '../../shared/utils/withLoading';
import { auth, AuthStore, register } from '../auth';
import { useCallback, useState } from 'react';
import Loader from '../../shared/ui/Loader';
import { AuthFormCard, AuthFormContent, AuthSubmitButton } from '../../shared/ui/style/AuthForm.style';
import { PageBackLink } from '../../shared/ui/style/PageBackLink.style';
import { RegistrationToggleButton, RegistrationToggleSection } from './RegistrationModule.style';

interface RegistrationModuleProps {
  authStore: AuthStore;
  apiErrorStore: ApiErrorStore;
}

function RegistrationModule({ authStore, apiErrorStore }: RegistrationModuleProps) {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<UserModel>(initialUser);
  const navigate = useNavigate();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }) as UserModel);
  }, []);

  let pageTitle = 'Создать аккаунт';
  let pageDescription = 'Введите данные для создания аккаунта и выбора тарифа.';
  let submitLabel = 'Продолжить';

  if (isLogin) {
    pageTitle = 'Вход в аккаунт';
    pageDescription = 'Введите данные для входа в аккаунта.';
    submitLabel = 'Войти';
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (isLogin) {
        await withLoading(async () => {
          const res = await auth(input, Role.User);
          authStore.authenticate(res.token, res.data);
          navigate('/schedule', { replace: true });
        }, setLoading);
        return;
      }

      await withLoading(async () => {
        const res = await register({ ...input, status: UserStatus.PendingPayment });
        authStore.authenticate(res.token, res.data);
        navigate('/plans', { replace: true });
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

            {!isLogin && (
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

            <AuthSubmitButton type="submit" variant="contained" fullWidth>
              {submitLabel}
            </AuthSubmitButton>
          </form>

          <RegistrationToggleSection>
            <RegistrationToggleButton
              variant="text"
              onClick={() => setIsLogin(!isLogin)}
              startIcon={!isLogin ? <UserIcon sx={{ width: 18, height: 18 }} /> : <PersonAddAlt1 sx={{ width: 18, height: 18 }} />}
            >
              {isLogin ? 'Создать аккаунт' : 'Войти как пользователь'}
            </RegistrationToggleButton>
          </RegistrationToggleSection>
        </AuthFormCard>
      </AuthFormContent>
      {loading && <Loader size={80} />}
    </Box>
  );
}

export default injectMobxStore(['authStore', 'apiErrorStore'], RegistrationModule);
