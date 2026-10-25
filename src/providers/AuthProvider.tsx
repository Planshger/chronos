import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authMe, getToken, setTokenInStorage } from '../core/datasources/authorization_data_source';
import UserModel, { initialUser } from '../core/ models/user_model';

interface AuthContextType {
  token: string;
  user: UserModel;
  isAuthChecked: boolean;
  setToken: (token: string) => void;
  setUser: (user: UserModel) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: '',
  user: initialUser,
  setToken: () => {},
  logout: () => {},
  setUser: () => {},
  isAuthChecked: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken_] = useState<string>(getToken() ?? '');
  const [user, setUser] = useState<UserModel>(initialUser);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(!getToken());

  const setToken = useCallback((newToken: string) => {
    setIsAuthChecked(false);
    setToken_(newToken);
  }, []);

  const logout = useCallback(() => {
    setToken_('');
    setTokenInStorage(null);
    setUser(initialUser);
    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    if (!token) {
      logout();
      return;
    }

    setTokenInStorage(token);
    let cancelled = false;

    (async () => {
      try {
        const user = (await authMe(token)) ?? initialUser;
        if (user.status === 'Заблокирован') {
          alert('Пользователь заблокирован');
          logout();
          return;
        }
        if (cancelled) {
          return;
        } else {
          setUser(user);
        }
      } catch (e) {
        if (!cancelled) {
          setUser(initialUser);
        }
      } finally {
        if (!cancelled) setIsAuthChecked(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const contextValue = useMemo(
    () => ({ token, setToken, user, logout, isAuthChecked, setUser }),
    [token, setToken, user, logout, isAuthChecked, setUser],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
