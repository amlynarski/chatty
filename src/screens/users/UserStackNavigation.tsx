import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UsersScreen from './UsersScreen';


export default function UsersStackNavigation() {
  const UserStack = createStackNavigator();

  return(
    <UserStack.Navigator>
      <UserStack.Screen name="Users" component={UsersScreen} />
    </UserStack.Navigator>
  )
}