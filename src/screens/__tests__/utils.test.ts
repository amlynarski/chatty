import { countNotReadMessages } from '../conversations/utils';

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

describe('countNotReadMessages', () => {
  it('should not count messages which author is the user', () => {
    const count = countNotReadMessages(conversations[0] as any, users[0]);
    expect(count).toBe(0);
  });

  it('should count only messages which are not read by me', () => {
    const count = countNotReadMessages(conversations[1] as any, users[0]);
    expect(count).toBe(1);
  });
});
