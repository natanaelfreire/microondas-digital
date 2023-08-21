import { ReactNode, createContext, useEffect, useState } from 'react';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: string | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [ user, setUser ] = useState<string | null>(null);

  useEffect(() => {
    const storageUser = localStorage.getItem('SavedUserMicroondas');
    const storageToken = localStorage.getItem('SavedTokenMicroondas');
    if (storageUser && storageToken) {
      api.defaults.headers.common['Authorization'] = `${storageToken}`;
      setUser(storageUser);
    }
    else {
      setUser(null)
    }

  }, []);

  return (
    <AuthContext.Provider value={{signed: !!user, user}}>
      {children}
    </AuthContext.Provider>
  );
 };

export default AuthContext;