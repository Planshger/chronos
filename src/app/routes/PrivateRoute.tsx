import { Role, UserStatus } from '../../shared/models/user_model';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import injectMobxStore from '../../shared/utils/injectMobxStore';
import { AuthStore } from '../../modules/auth';
import Loader from '../../shared/ui/Loader';
import { NO_PLAN_LABEL } from '../../modules/admin';

interface PrivateRouteProps {
  roles?: Role[];
  authStore: AuthStore;
}

function PrivateRoute({ roles, authStore }: PrivateRouteProps) {
  const location = useLocation();
  const { token, user, isAuthChecked } = authStore;

  if (!isAuthChecked) {
    return <Loader size={80} />;
  }

  if (token === '') {
    if (roles?.length === 1 && roles.includes(Role.Admin)) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  if (user?.plan === NO_PLAN_LABEL && user.role === Role.User && user.status === UserStatus.PendingPayment) {
    return <Navigate to="/plans" state={{ from: location }} replace />;
  }

  if (user.status === UserStatus.NotActive) {
    return <Navigate to="/register" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default injectMobxStore('authStore', PrivateRoute);
