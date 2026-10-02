import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authMe, getToken, setTokenInStorage } from "../core/datasources/authorization_data_source";
import UserModel from "../core/ models/user_model";

interface AuthContextType {
  token: string;
  user: UserModel | null;
  isAuthChecked: boolean;
  setToken: (token: string) => void; 
  setUser: (user: UserModel) => void; 
  logout: () => void; 
};

const AuthContext = createContext<AuthContextType>({token: '', user: null, setToken: () => {},  logout: () => {}, setUser: () => {}, isAuthChecked: false});

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken_] = useState<string>(getToken() ?? '');
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(!getToken());

  const setToken = useCallback((newToken: string) => {
    setIsAuthChecked(false);  
    setToken_(newToken);
  }, []);

  const logout = useCallback(() => {
    setToken_("");
    setTokenInStorage(null);
    setUser(null);
    setIsAuthChecked(true);   
  }, []);

  useEffect(() => {
    if (!token) {logout(); return;}

    setTokenInStorage(token);
    let cancelled = false;

    (async () => {
      try {
        const user = await authMe(token);
        if (cancelled) { 
          return; 
        } else {
          setUser(user);
        }
       
        } catch (e) {
          if (!cancelled) {
            setUser(null);
          }
        } finally {
          if (!cancelled) setIsAuthChecked(true);
        }
      })();

      return () => { cancelled = true; };
  }, [token]);

  const contextValue = useMemo(() => ({token, setToken, user, logout, isAuthChecked, setUser} as AuthContextType),[token, setToken, user, logout, isAuthChecked, setUser]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;