import React from 'react';
import { User } from '../../generated/graphql';

export interface AuthContextType {
  token: string | null,
  loading: boolean,
  me: User | null,
  login(username: string, password: string): Promise<string>,
  logout(): Promise<void>
}

const emptyFn = () => undefined;

export const defaultAuthContext = {
  token: null,
  loading: true,
  me: null,
  login: emptyFn,
  logout: emptyFn
};

export const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);
