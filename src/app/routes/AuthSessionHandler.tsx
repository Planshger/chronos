import { injectMobxStore, registerUnauthorizedHandler, Role } from '../../shared';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthStore } from '../../modules/auth';
import { useEffect } from 'react';

interface AuthSessionHandlerProps {
  authStore: AuthStore;
}

function AuthSessionHandler({ authStore }: AuthSessionHandlerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    return registerUnauthorizedHandler((token) => {
      const role = authStore.handleUnauthorized(token);
      if (role === null) return;

      const loginPath = role === Role.Admin ? '/admin/login' : '/register';
      navigate(loginPath, { replace: true, state: { from: location } });
    });
  }, [authStore, location, navigate]);

  return null;
}

export default injectMobxStore('authStore', AuthSessionHandler);
