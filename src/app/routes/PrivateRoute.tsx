import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthStore } from '../../modules/auth';
import { Role, UserStatus } from '../../shared/models/user_model';
import injectMobxStore from '../../shared/utils/injectMobxStore';

interface PrivateRouteProps {
  roles?: Role[];
  authStore: AuthStore;
}

function PrivateRoute({ roles, authStore }: PrivateRouteProps) {
  const location = useLocation();
  const { token, user, isAuthChecked } = authStore;

  if (!isAuthChecked) {
    return null;
  }

  if (token === '') {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  if (user?.plan === '' && user.role === 'user' && user.status === UserStatus.PendingPayment) {
    return <Navigate to="/plans" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user?.role ?? 'user')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default injectMobxStore('authStore', PrivateRoute);
