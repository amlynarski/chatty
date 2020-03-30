import React, { useContext, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import {
  Message,
  MessagesByConversationIdQuery,
  MessagesByConversationIdQueryVariables
} from '../../generated/graphql';
import { MESSAGES } from './conversations.schema';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { NetworkStatusContext, NetworkStatusContextType } from '../../globalContexts/NetworkStatus/NetworkStatusContext';
import { ActivityIndicator } from 'react-native-paper';
import { ErrorMessagesContext, ErrorMessagesContextType } from '../../globalContexts/ErrorMessages/ErrorMessagesContext';

export default function ConversationScreen({route}) {
  const {conversationId} = route.params;

  const {connected} = useContext<NetworkStatusContextType>(NetworkStatusContext);
  const {showError} = useContext<ErrorMessagesContextType>(ErrorMessagesContext);

  const [refetchOnConnection, setRefetchOnConnection] = useState<boolean>(false);

  const {data, loading, error, networkStatus, refetch} = useQuery<
    MessagesByConversationIdQuery,
    MessagesByConversationIdQueryVariables>
  (MESSAGES, {variables: {conversationId}, notifyOnNetworkStatusChange: true});

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

  if (networkStatus === 4 || loading) return <ActivityIndicator size="large"/>;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          {
            data &&
            <View style={styles.conversation}>
              <Messages messages={data.messagesByConversationId as Message[]}/>
              <MessageInput conversationId={conversationId}/>
            </View>
          }
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  conversation: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around'
  }
});