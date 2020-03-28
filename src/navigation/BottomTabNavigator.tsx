import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import UsersScreen from '../screens/users/UsersScreen';
import { BottomNavigation, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ConversationsScreen from '../screens/conversations/ConversationsScreen';

const BottomTab = createBottomTabNavigator(); // todo check https://callstack.github.io/react-native-paper/bottom-navigation.html
const INITIAL_ROUTE_NAME = 'Home';

const routes = [
  { key: 'conversations', title: 'Conversations', icon: 'camera' },
  { key: 'users', title: 'App friends', icon: 'album' },
  { key: 'profile', title: 'Profile', icon: 'history' },
];

export default function BottomTabNavigator({ navigation, route }) {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    navigation.setOptions({headerTitle: routes[index].title});
  }, [index]);

  const handleIndexChange = index => setIndex(index);

  const renderScene = BottomNavigation.SceneMap({
    conversations: ConversationsScreen,
    users: UsersScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{
        index,
        routes
      }}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
    />
  );

}
