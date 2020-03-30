import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {Text} from 'react-native-paper';

import { Message } from '../../generated/graphql';
import { AuthContext, AuthContextType } from '../../globalContexts/Auth/AuthContext';
import getFormattedTime from '../../utils/getFormattedTime';
import { ConversationsContext, ConversationsContextType } from '../../globalContexts/Conversations/ConversationsContext';

interface Props {
  message: Message
}

export default function MessageItem({message}: Props) {
  const { me } = useContext<AuthContextType>(AuthContext);

  const {markAsRead} = useContext<ConversationsContextType>(ConversationsContext);

  useEffect(() => {
    markAsRead(message.id);
  }, []);

  if (!me) {
    return null;
  }

  const isWrittenByMe = () => {
    return me.id === message.author.id;
  };

  return(
    <View key={message.id} style={{
      ...styles.message,
      ...(isWrittenByMe() ? {...styles.myMessage} : {...styles.othersMessage})
    }}>
      <View style={styles.timeContainer}><Text style={styles.timeText}>{getFormattedTime(message.createdAt)}</Text></View>
      <Text style={{...(isWrittenByMe() ? {...styles.myText} : {})}}>
        {message.text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    marginTop: 10,
    width: '80%',
    borderRadius: 20,
    padding: 10,
    position: 'relative'
  },
  myMessage: {
    marginRight: 10,
    alignSelf: 'flex-end',
    backgroundColor: "#287ee6"
  },
  othersMessage: {
    marginLeft: 10,
    alignSelf: 'flex-start',
    backgroundColor: "#ddd"
  },
  myText: {
    color: '#fff'
  },
  timeContainer: {
    position: 'absolute',
    top: -7,
    right: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20
  },
  timeText: {
    color: '#222',
    fontSize: 10,
  }
});
