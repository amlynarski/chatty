import React, { useContext, useState } from 'react';
import { Colors, IconButton, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import { SendMessageMutation, SendMessageMutationVariables } from '../../generated/graphql';
import { SEND_MESSAGE } from './conversations.schema';
import { NetworkStatusContext, NetworkStatusContextType } from '../../globalContexts/NetworkStatus/NetworkStatusContext';

interface Props {
  conversationId: string;
}

export default function MessageInput({conversationId}: Props) {
  const [text, setText] = useState<string>('');

  const {connected} = useContext<NetworkStatusContextType>(NetworkStatusContext);

  const [sendMessage, {loading}] = useMutation<
    SendMessageMutation,
    SendMessageMutationVariables>(
      SEND_MESSAGE
  );

  async function handleSendMessage() {
    if (connected) {
      await sendMessage({variables: {conversationId, text}})
      setText('');
    }
  }

  return(
    <View style={styles.messageInput}>
      <TextInput
        label='Aa'
        value={text}
        onChangeText={value => setText(value)}
        mode="outlined"
        multiline
        style={styles.textInput}
      />
      <IconButton
        icon="chevron-right"
        size={30}
        color={Colors.blue500}
        style={styles.sendButton}
        onPress={handleSendMessage}
        disabled={text === '' || loading || !connected}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  messageInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  sendButton: {
    flexGrow: 1
  },
  textInput: {
    flexGrow: 10,
    width: '85%'
  }
});