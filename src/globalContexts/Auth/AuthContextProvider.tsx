import React, { PropsWithChildren, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';

import { AuthContext } from './AuthContext';
import { ME, SIGNIN } from './schemas/auth.schema';
import { MeQuery, MeQueryVariables, SigninMutation, SigninMutationVariables, User } from '../../generated/graphql';

export const AuthContextProvider = (props: PropsWithChildren<{}>) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [me, setMe] = useState<User | null>(null);

  const apolloClient = useApolloClient();

  async function getMeUser(): Promise<User> {
    const response = await apolloClient.query<MeQuery, MeQueryVariables>({
      query: ME
    });
    return response.data.me;
  }

  useEffect(() => {
    apolloClient.cache.reset();
  }, []);

  useEffect(() => {
    async function checkIfTokenExist() {
      const jwt = await getItemAsync('token');
      if (jwt) {
        setToken(jwt);
        const meUser = await getMeUser();
        setMe(meUser);
      }
      setLoading(false);
    }

    checkIfTokenExist();
  }, []);

  useEffect(() => {
    async function clearData() {
      await apolloClient.cache.reset();
      setMe(null);
    }

    if (!token) {
      clearData()
    }
  }, [token]);

  const [signin] = useMutation<SigninMutation, SigninMutationVariables>(SIGNIN);

  async function login(username: string, password: string): Promise<string> {
    const response = await signin( {variables: {username, password}});
    await SecureStore.setItemAsync('token', response.data.signin.jwt);
    setToken(response.data.signin.jwt);
    const meUser = await getMeUser();
    setMe(meUser);
    return Promise.resolve(response.data.signin.jwt);
  }

  async function logout(): Promise<void> {
    await deleteItemAsync('token');
    setToken(null);
  }

  return(
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        loading,
        me
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
};
