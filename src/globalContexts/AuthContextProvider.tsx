import React, { PropsWithChildren, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from './AuthContext';
import { gql } from 'apollo-boost';

const SIGNIN = gql`
  mutation signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      jwt
    }
  }
`;

export const AuthContextProvider = (props: PropsWithChildren<{}>) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // todo here check localstorage https://openbase.io/js/expo-secure-store
  }, []);

  const [signin] = useMutation(SIGNIN);

  async function login(username: string, password: string): Promise<void> {
    const data = await signin( {variables: {username, password}});
    console.log('data', data);
    // SecureStore.setItemAsync('token', (data as any).jwt);
    return Promise.resolve(data);
  }

  function logout(): Promise<void> {
    return Promise.resolve();
  }

  return(
    <AuthContext.Provider
      value={{
        login,
        logout,
        token
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
};
