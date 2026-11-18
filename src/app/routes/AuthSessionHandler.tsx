import injectMobxStore from '../../shared/utils/injectMobxStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { Role } from '../../shared/models/user_model';
import { AuthStore } from '../../modules/auth';
import { useEffect } from 'react';

interface AuthSessionHandlerProps {
  authStore: AuthStore;
}

function AuthSessionHandler({ authStore }: AuthSessionHandlerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = (event: Event) => {
      const { token } = (event as CustomEvent<{ token: string }>).detail;
      if (token !== authStore.token) return;

      const loginPath = authStore.user.role === Role.Admin ? '/admin/login' : '/register';
      authStore.logout();
      navigate(loginPath, { replace: true, state: { from: location } });
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [authStore, location, navigate]);

  return null;
}

export default injectMobxStore('authStore', AuthSessionHandler);
