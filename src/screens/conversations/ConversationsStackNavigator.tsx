import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ConversationsScreen from './ConversationsScreen';
import ConversationScreen from './ConversationScreen';

export default function ConversationsStackNavigator({navigation, route}) {
  const ConversationStack = createStackNavigator();

  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }

  return(
    <ConversationStack.Navigator>
      <ConversationStack.Screen name="Messages" component={ConversationsScreen} />
      <ConversationStack.Screen name="Message" component={ConversationScreen} />
    </ConversationStack.Navigator>
  )
}