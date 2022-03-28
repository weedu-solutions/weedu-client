import React, { createContext, useCallback, useState } from 'react';
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
  signIn(credentials: ICredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<IAuthContextState>(
  {} as IAuthContextState,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async (credentials: ICredentials) => {
    const response = await Api.post('/login', credentials);

    const { access_token, user } = response.data;

    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    setData({
      token: access_token,
      user,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, user: data.user, token: data.token, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
