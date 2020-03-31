import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { AuthContext, AuthContextType } from '../globalContexts/Auth/AuthContext';
import { LoadingScreen } from '../screens/loading/LoadingScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
  const containerRef = React.useRef();

  const {token, loading, me} = useContext<AuthContextType>(AuthContext);

  const renderContent = () => {
    if (loading) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />
    }

    if (token && me) {
      return <Stack.Screen name="Root" component={BottomTabNavigator} />
    }

    return <Stack.Screen name="Login" component={LoginScreen} />
  }

  return(
    <NavigationContainer ref={containerRef}>
      <Stack.Navigator headerMode="none">
        { renderContent() }
      </Stack.Navigator>
    </NavigationContainer>
  )
};
