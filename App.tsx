import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import HomeScreen from './src/screens/conversations/ConversationsScreen';
import useLinking from './src/navigation/useLinking';
import LoginScreen from './src/screens/login/LoginScreen';
import { AuthContextProvider } from './src/globalContexts/AuthContextProvider';
import { ApolloContextProvider } from './src/globalContexts/ApolloContextProvider';
import { Navigation } from './src/navigation/Navigation';

const Stack = createStackNavigator();

export default function App() {

  return (
    <ApolloContextProvider>
      <AuthContextProvider>
        <PaperProvider>
          <Navigation/>
        </PaperProvider>
      </AuthContextProvider>
    </ApolloContextProvider>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
