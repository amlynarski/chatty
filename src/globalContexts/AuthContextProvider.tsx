import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useApolloClient, useQuery, useLazyQuery } from '@apollo/react-hooks';

import { AuthContext } from './AuthContext';
import { ME, SIGNIN } from './schemas/auth.schema';
import { MeQuery, MeQueryVariables, SigninMutation, SigninMutationVariables, User } from '../generated/graphql';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';

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
    if (!token) {
      console.log('reseting cache');
      apolloClient.cache.reset();
      setMe(null);
    }
  }, [token]);

  const [signin] = useMutation<SigninMutation, SigninMutationVariables>(SIGNIN);

  async function login(username: string, password: string): Promise<string> {
    // todo refactor
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
    setMe(null);
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
