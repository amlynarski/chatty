import { Conversation, Message } from '../../generated/graphql';

export function getUpdatedConversationsWithReadBy(conversations: Conversation[], message: Message): Conversation[] {
  return conversations.map(conv => {
    if (conv.id === message.conversation.id) {
      return ({
        ...conv,
        messages: conv.messages.map(msg => {
          if (msg.id === message.id) {
            return ({
              ...msg,
              readBy: message.readBy
            })
          } else {
            return msg;
          }
        })
      })
    } else {
      return conv;
    }
  })
}
