import React, { PropsWithChildren } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import * as SecureStore from 'expo-secure-store';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';

import { httpUri, wsUri } from '../../const';

export const ApolloContextProvider = ({children}: PropsWithChildren<{}>) => {
  const httpLink = createHttpLink({
    uri: httpUri
  });

  const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true
    }
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync('token');
    return {
      headers: {
        ...headers,
        authorization: token
      }
    }
  });

  const link = split(
    ({query}) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
