import type { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { injectMobxStore, Loader } from '../../shared';
import type { AuthStore } from '../../modules/auth';

interface PrivateRouteProps {
  authStore: AuthStore;
  fallback: (authStore: AuthStore, location: Location) => ReactNode | null;
}

function PrivateRoute({ authStore, fallback }: PrivateRouteProps) {
  const location = useLocation();

  if (!authStore.isAuthChecked) {
    return <Loader size={80} />;
  }

  const fallbackElement = fallback(authStore, location);
  if (fallbackElement !== null) return fallbackElement;

  return <Outlet />;
}

export default injectMobxStore('authStore', PrivateRoute);
