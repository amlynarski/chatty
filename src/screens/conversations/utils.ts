import { Conversation, User } from '../../generated/graphql';

export function countNotReadMessages(conversation: Conversation, me: User): number {
  return conversation.messages.reduce((acc, curr) => {
    if (curr.author.id === me.id) {
      return acc;
    } else {
      if (!!curr.readBy.find(user => user.id === me.id)) {
        return acc;
      } else {
        return acc + 1;
      }
    }
  }, 0);
}
