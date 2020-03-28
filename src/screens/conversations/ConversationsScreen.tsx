import { Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CONVERSATIONS } from './conversations.schema';
import { Conversation, ConversationsQuery, ConversationsQueryVariables } from '../../generated/graphql';
import { List } from 'react-native-paper';
import { AuthContext, AuthContextType } from '../../globalContexts/AuthContext';

export default function ConversationsScreen() {
  const { me } = useContext<AuthContextType>(AuthContext);
  const { loading, error, data } = useQuery<ConversationsQuery, ConversationsQueryVariables>(CONVERSATIONS);

  if (!me) {
    return null;
  }

  function conversationUserNames(conversation: Conversation): String {
    const usersWithoutMe = conversation.users.filter(user => user.id !== me.id);
    return usersWithoutMe.map(user => user.username).join(', ');
  }

  function openConversation(conversationId: string) {
    console.log('conversation id', conversationId);
  }

  function conversationItem(conversation: Conversation) {
    return (
      <View>
        <List.Item
          key={conversation.id}
          onPress={() => openConversation(conversation.id)}
          title={conversationUserNames(conversation)}
        />
      </View>
    )
  }

  return (
    <View>
      <List.Section>
        {data && data.conversations.map(conversation => conversationItem(conversation as Conversation))}
      </List.Section>
    </View>
  );
}