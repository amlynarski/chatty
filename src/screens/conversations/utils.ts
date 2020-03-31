import { Conversation, User } from '../../generated/graphql';

export function countNotReadMessages(conversation: Conversation, me: User): number {
  return sum(conversation.messages.map((message) => {
    if (message.author.id === me.id) {
      return 0
    }
    if (!!message.readBy.find(user => user.id === me.id)) {
      return 0
    }
    return 1
  })
}
