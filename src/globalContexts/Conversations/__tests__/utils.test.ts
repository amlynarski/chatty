import { getUpdatedConversationsWithReadBy } from '../utils';
import { Conversation, Message } from '../../../generated/graphql';

const users = [
  {
    username: 'testuser',
    id: 'ID_USER_TEST_USER'
  },
  {
    username: 'adam',
    id: 'ID_USER_ADAM'
  }
];

const conversations = [
  {
    id: 'conv1',
    users: [users[0], users[1]],
    messages: [
      {
        author: users[0],
        text: 'lorem ipsum ',
        createdAt: new Date(1585129870344),
        readBy: [],
        id: "rand1"
      },
      {
        author: users[0],
        text: 'Other text',
        createdAt: new Date(1585517339938),
        readBy: [],
        id: "rand2"
      }
    ],
    lastMessageCreatedAt: new Date(1585517339938)
  }];

const message = {
  author: users[0],
  text: 'lorem ipsum ',
  createdAt: new Date(1585129870344),
  readBy: [users[1]],
  id: "rand1",
  conversation: {
    id: 'conv1'
  }
};


describe('getUpdatedConversationsWithReadBy', () => {
  it('should return updated conversation with message which contains correct readBy field', () => {
    const updatedConversations = getUpdatedConversationsWithReadBy(conversations as Conversation[], message as Message);
    const updatedConversation = updatedConversations.find(conv => conv.id === 'conv1');
    const updatedMessage = updatedConversation.messages.find(msg => msg.id === message.id);
    expect(updatedMessage.readBy.length).toBe(message.readBy.length);
  })
});
