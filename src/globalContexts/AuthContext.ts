import React from 'react';

export interface AuthContextType {
  token: string | null,
  login(username: string, password: string): Promise<void>,
  logout(): Promise<void>
}

const emptyFn = () => undefined;

export const defaultAuthContext = {
  token: null,
  login: emptyFn,
  logout: emptyFn
};

export const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);
