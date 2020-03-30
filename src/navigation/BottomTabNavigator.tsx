import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ConversationsStackNavigator from '../screens/conversations/ConversationsStackNavigator';
import UsersStackNavigation from '../screens/users/UserStackNavigation';
import ProfileStackNavigator from '../screens/profile/ProfileStackNavigator';
import { ConversationsContextProvider } from '../globalContexts/Conversations/ConversationsContextProvider';
import { NavigationTabBarIcon } from './NavigationTabBarIcon';


export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <ConversationsContextProvider>
      <Tab.Navigator>
        <Tab.Screen name="Messages" component={ConversationsStackNavigator} options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => <NavigationTabBarIcon color={color} size={size} />,
        }}
        />
        <Tab.Screen name="Users" component={UsersStackNavigation} options={{
          tabBarLabel: 'Users',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          )}}
        />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          )}}
        />
      </Tab.Navigator>
    </ConversationsContextProvider>
  );
}
