import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from './ProfileScreen';

export default function ProfileStackNavigator() {
  const ProfileStack = createStackNavigator();

  return(
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  )
}