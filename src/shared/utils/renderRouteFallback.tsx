import { NO_PLAN_LABEL } from '../../modules/admin/constants/adminTableOptions';
import type { AuthStore } from '../../modules/auth';
import { Role, UserStatus } from '../models/user_model';
import { Navigate } from 'react-router-dom';
import type { Location } from 'react-router-dom';

export const renderRouteFallback = (authStore: AuthStore, roles: Role[], location: Location) => {
  const { token, user } = authStore;

  if (token === '') {
    if (roles.length === 1 && roles.includes(Role.Admin)) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  if (user.plan === NO_PLAN_LABEL && user.role === Role.User && user.status === UserStatus.PendingPayment) {
    return <Navigate to="/plans" state={{ from: location }} replace />;
  }

  if (user.status === UserStatus.NotActive) {
    return <Navigate to="/register" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return null;
};
