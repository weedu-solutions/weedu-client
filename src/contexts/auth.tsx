import React, { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ICredentials from '../interfaces/credentials';
import { Api } from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  active: string;
  created_at: Date | string;
  updated_at: Date | string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

export interface IAuthContextState {
  user: IUser;
  token: string;
  signIn(credentials: ICredentials, route: string): Promise<void>;
  signOut(): void;
  error: string;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContextState>(
  {} as IAuthContextState,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    
    return {} as IAuthState;
  });

  const signIn = async (credentials: ICredentials, route: string) => {
      try {
        setLoading(loading => !loading);
        const { data } = await Api.post('/login', credentials);
        console.log(data.error)
        setLoading(loading => !loading);
        if(data.error) return setError(data.error);

        setError("");
        const { access_token, user } = data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        setData({
          token: access_token,
          user,
        });
        navigate(route);
      } catch (error) {
        setError("Usuário não autorizado");
        setLoading(loading => !loading);
      }
  };

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, user: data.user, token: data.token, signOut, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
