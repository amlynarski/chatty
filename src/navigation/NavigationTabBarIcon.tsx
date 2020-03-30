import React, { useContext } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ConversationsContext, ConversationsContextType } from '../globalContexts/Conversations/ConversationsContext';
import { Badge } from '../components/Badge';

export const NavigationTabBarIcon = ({color, size}) => {
  const {totalUnread} = useContext<ConversationsContextType>(ConversationsContext);

  return (
    <View>
      <MaterialCommunityIcons name="message" color={color} size={size} />
      {totalUnread > 0 && <Badge value={totalUnread}/>}
    </View>
  )
};