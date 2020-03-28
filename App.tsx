import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


import BottomTabNavigator from './navigation/BottomTabNavigator';
import HomeScreen from './screens/HomeScreen';
import useLinking from './navigation/useLinking';
import LoginScreen from './screens/LoginScreen';
import { AuthContextProvider } from './globalContexts/AuthContextProvider';
import { ApolloContextProvider } from './globalContexts/ApolloContextProvider';

const Stack = createStackNavigator();



export default function App() {
  const containerRef = React.useRef();
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const { getInitialState } = useLinking(containerRef);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return (
    <ApolloContextProvider>
      <AuthContextProvider>
        <PaperProvider>
          <LoginScreen />
          {/*<NavigationContainer ref={containerRef} initialState={initialNavigationState}>*/}
          {/*  <Stack.Navigator>*/}
          {/*    <Stack.Screen name="Root" component={BottomTabNavigator} />*/}
          {/*  </Stack.Navigator>*/}
          {/*</NavigationContainer>*/}
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
