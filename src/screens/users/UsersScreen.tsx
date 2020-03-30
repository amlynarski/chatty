import * as React from 'react';
import { View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ActivityIndicator, List } from 'react-native-paper';

import { AuthContext, AuthContextType } from '../../globalContexts/Auth/AuthContext';
import {
  User,
  UsersQuery,
  UsersQueryVariables
} from '../../generated/graphql';
import { USERS } from './users.schema';
import { ConversationsContext, ConversationsContextType } from '../../globalContexts/Conversations/ConversationsContext';
import { NetworkStatusContext, NetworkStatusContextType } from '../../globalContexts/NetworkStatus/NetworkStatusContext';
import { ErrorMessagesContext, ErrorMessagesContextType } from '../../globalContexts/ErrorMessages/ErrorMessagesContext';

export default function UsersScreen({navigation}) {
  const {me} = useContext<AuthContextType>(AuthContext);
  const {connected} = useContext<NetworkStatusContextType>(NetworkStatusContext);
  const {conversations, createConversation} = useContext<ConversationsContextType>(ConversationsContext);
  const {showError} = useContext<ErrorMessagesContextType>(ErrorMessagesContext);

  const [refetchOnConnection, setRefetchOnConnection] = useState<boolean>(false);

  const { loading, error, data: usersData, refetch, networkStatus } = useQuery<UsersQuery, UsersQueryVariables>(USERS);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  useEffect(() => {
    if (!connected) {
      setRefetchOnConnection(true);
    }
  },[connected]);

  useEffect(() => {
    if (refetchOnConnection && connected) {
      refetch();
      setRefetchOnConnection(false);
    }
  }, [refetchOnConnection, refetch, connected]);

  async function openConversation(userId: string) {
    const convUserIds = [userId, me.id];
    const existingConversation = conversations.find(
      conversation => conversation.users.every(user => convUserIds.includes((user.id)))
    );

    if (existingConversation) {
      navigation.navigate("Message", {conversationId: existingConversation.id});
    } else {
      const newConversation = await createConversation(convUserIds);
      navigation.navigate("Message", {conversationId: newConversation.id});
    }
  }

  function userItem(user: User) {
    return (
      <List.Item
        key={user.id}
        onPress={() => openConversation(user.id)}
        title={user.username}
        left={() => <List.Icon icon="emoticon-wink-outline" />}
      />
    )
  }

  if (networkStatus === 4 || loading) return <ActivityIndicator size="large"/>;

  return (
    <View>
      <List.Section>
        {usersData && usersData.users.map(user => userItem(user as User))}
      </List.Section>
    </View>
  );
}

