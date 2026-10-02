import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Role } from "../core/ models/user_model";

interface PrivateRouteProps {
  roles?: Role[];
}

export default function PrivateRoute({ roles }: PrivateRouteProps) {
  const { token, user, isAuthChecked } = useAuth();
  const location = useLocation();

   if (!isAuthChecked) {
    return null; 
  }

  if (token === '') {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  if (user?.plan === '' && user.role === 'user') {
    return <Navigate to="/plans" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user?.role ?? 'user')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}