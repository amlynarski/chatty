import React, { PropsWithChildren } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import * as SecureStore from 'expo-secure-store';

export const ApolloContextProvider = ({children}: PropsWithChildren<{}>) => {
  const client = new ApolloClient({
    uri: 'http://192.168.100.133:4000',
    request: async (operation) => { // todo probably move token to not await in request
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        operation.setContext({
          headers: {
            authorization: token
          }
        })
      }
    }
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
