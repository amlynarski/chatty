import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import {
  Message
} from '../../generated/graphql';
import MessageItem from './MessageItem';

interface Props {
  messages: Message[]
}

export default function Messages({messages}: Props) {
  const scrollRef = useRef<ScrollView>();

  useEffect(() => {
    scrollToBottom(false)
  }, []);

  function scrollToBottom(animated: boolean = true) {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollToEnd({animated})
    }
  }

  if (messages.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          Type and send first message!
        </Text>
      </View>)
  }

  return (
    <ScrollView ref={scrollRef} onContentSizeChange={() => scrollToBottom()}>
      {
        messages
          .sort((a, b) => a.createdAt - b.createdAt)
          .map(message => <MessageItem key={message.id} message={message}/>)
      }
    </ScrollView>
  )
}
