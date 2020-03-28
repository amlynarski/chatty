import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from '../screens/login/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import useLinking from './useLinking';
import { AuthContext, AuthContextType } from '../globalContexts/AuthContext';
import { LoadingScreen } from '../screens/loading/LoadingScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
  const containerRef = React.useRef();

  const {token, loading, me} = useContext<AuthContextType>(AuthContext);

  return(
    <NavigationContainer ref={containerRef}>
      <Stack.Navigator>
        {
          loading
            ? <Stack.Screen name="Loading" component={LoadingScreen} />
            : (
              <>
                {
                  token && me
                    ? (
                      <>
                        <Stack.Screen name="Root" component={BottomTabNavigator} />
                      </>
                    )
                    : <Stack.Screen name="Login" component={LoginScreen} />
                }
              </>)

        }

      </Stack.Navigator>
    </NavigationContainer>
  )
}