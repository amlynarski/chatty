import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import { List } from 'react-native-paper';

import ConversationsScreen from '../conversations/ConversationsScreen';
import { AuthContext } from '../../globalContexts/Auth/AuthContext';
import { ConversationsContext } from '../../globalContexts/Conversations/ConversationsContext';
import { ErrorMessagesContext } from '../../globalContexts/ErrorMessages/ErrorMessagesContext';
import { Conversation } from '../../generated/graphql';

const navigateMock = jest.fn();

const me = {
  username: 'testuser',
  id: 'ID_USER_TEST_USER'
};

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
  },
  {
    id: 'conv2',
    users: [users[0], users[1]],
    lastMessageCreatedAt: new Date(1585129878644),
    messages: [
      {
        author: users[0],
        text: 'test 1',
        createdAt: new Date(1585129870344),
        readBy: [users[0]],
        id: "rand3"
      },
      {
        author: users[1],
        text: 'test 2',
        createdAt: new Date(1585129878344),
        readBy: [users[0]],
        id: "rand4"
      },
      {
        author: users[1],
        text: 'test 3',
        createdAt: new Date(1585129878644),
        readBy: [],
        id: "rand5"
      }
    ]
  }
];

const ConversationsWithProviders = () => (
  <AuthContext.Provider value={{me, token: '', loading: false, login: jest.fn(), logout: jest.fn()}}>
    <ConversationsContext.Provider value={{
      conversations: conversations as Conversation[],
      loading: false,
      error: null,
      createConversation: jest.fn(),
      markAsRead: jest.fn(),
      setTotalUnread: jest.fn(),
      totalUnread: 0
    }}>
      <ErrorMessagesContext.Provider value={{showError: jest.fn()}}>
        <ConversationsScreen navigation={{navigate: navigateMock}} />
      </ErrorMessagesContext.Provider>
    </ConversationsContext.Provider>
  </AuthContext.Provider>
);

describe('ConversationsScreen', () => {
  it('renders correctly', () => {
    const conversationsScreen = renderer.create(<ConversationsWithProviders />).toJSON();
    expect(conversationsScreen).toMatchSnapshot()
  });

  it('should display two conversations', () => {
    const instance = renderer.create(<ConversationsWithProviders />);
    const listItems = instance.root.findAllByType(List.Item);

    expect(listItems.length).toBe(2);
  });

  it('should call navigate function on click', () => {
    const instance = renderer.create(<ConversationsWithProviders />);
    const listItems = instance.root.findAllByType(List.Item);

    listItems[0].props.onPress();

    expect(navigateMock).toHaveBeenCalledWith("Message", {"conversationId": "conv1"});
  });
});
