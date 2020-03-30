import { View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { List, Text } from 'react-native-paper';

import {
  Conversation
} from '../../generated/graphql';
import { AuthContext, AuthContextType } from '../../globalContexts/Auth/AuthContext';
import { ConversationsContext, ConversationsContextType } from '../../globalContexts/Conversations/ConversationsContext';
import getFormattedTime from '../../utils/getFormattedTime';
import { Badge } from '../../components/Badge';
import { ErrorMessagesContext, ErrorMessagesContextType } from '../../globalContexts/ErrorMessages/ErrorMessagesContext';
import { countNotReadMessages } from './utils';

function leftListElement(unreadCount: number) {
  return (
    <>
      <List.Icon icon="email" />
      {
        unreadCount > 0 && <Badge value={unreadCount}/>
      }
    </>
  )
}

export default function ConversationsScreen({navigation}) {
  const { me } = useContext<AuthContextType>(AuthContext);
  const { loading, error, conversations, setTotalUnread } = useContext<ConversationsContextType>(ConversationsContext);
  const {showError} = useContext<ErrorMessagesContextType>(ErrorMessagesContext);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  useEffect(() => {
    if (conversations) {
      const totalUnread = conversations.reduce((acc, curr) => acc + countNotReadMessages(curr, me), 0);
      setTotalUnread(totalUnread);
    }
  }, [conversations]);

  function conversationUserNames(conversation: Conversation): String {
    const usersWithoutMe = conversation.users.filter(user => user.id !== me.id);
    return usersWithoutMe.map(user => user.username).join(', ');
  }

  function openConversation(conversationId: string) {
    navigation.navigate('Message', {conversationId});
  }

  function conversationItem(conversation: Conversation) {
    return (
      <List.Item
        key={conversation.id}
        onPress={() => openConversation(conversation.id)}
        title={conversationUserNames(conversation)}
        left={() => leftListElement(countNotReadMessages(conversation, me))}
        description={getFormattedTime(conversation.lastMessageCreatedAt)}
        descriptionStyle={{'fontSize': 10}}
      />
    )
  }

  if (!me) {
    return null;
  }

  return (
    <View>
      <List.Section>
        {
          conversations
            .sort((a, b) => b.lastMessageCreatedAt - a.lastMessageCreatedAt)
            .map(conversation => conversationItem(conversation as Conversation))}
      </List.Section>
      {
        !loading && conversations && conversations.length === 0 &&
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            You don't have any messages yet.
          </Text>
        </View>
      }
    </View>
  );
}
