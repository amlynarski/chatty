import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { AuthContextProvider } from './src/globalContexts/Auth/AuthContextProvider';
import { ApolloContextProvider } from './src/globalContexts/ApolloContextProvider';
import { Navigation } from './src/navigation/Navigation';
import NetworkStatusContextProvider from './src/globalContexts/NetworkStatus/NetworkStatusContextProvider';
import ErrorMessagesContextProvider from './src/globalContexts/ErrorMessages/ErrorMessagesContextProvider';

export default function App() {
  return (
    <PaperProvider>
      <NetworkStatusContextProvider>
        <ApolloContextProvider>
          <AuthContextProvider>
            <ErrorMessagesContextProvider>
              <Navigation/>
            </ErrorMessagesContextProvider>
          </AuthContextProvider>
        </ApolloContextProvider>
      </NetworkStatusContextProvider>
    </PaperProvider>
  );
}
