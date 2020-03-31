import { Conversation, Message } from '../../generated/graphql';

export function getUpdatedConversationsWithReadBy(conversations: Conversation[], message: Message): Conversation[] {
  return conversations.map(conv => {
    if (conv.id !== message.conversation.id) {
        return conv;
    }

    return ({
      ...conv,
      messages: conv.messages.map(msg => {
        if (msg.id !== message.id) {
            return msg
        }
        return ({ ...msg, readBy: message.readBy })
      })
    })
  })
}
