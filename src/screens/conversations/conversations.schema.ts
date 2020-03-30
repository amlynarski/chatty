import { gql } from 'apollo-boost';

export const CONVERSATIONS = gql`
  query conversations {
    conversations {
      id
      lastMessageCreatedAt
      users {
        id 
        username
      }
      messages {
        id
        author {
          id
        }
        readBy {
          id
        }
      }
    }
  }
`;

export const MESSAGES = gql`
  query messagesByConversationId($conversationId: ID!) {
    messagesByConversationId(id: $conversationId) {
      id
      text
      createdAt
      author {
        id
        username
      }
      readBy {
        id 
        username
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($conversationId: ID!, $text: String!) {
    sendMessage(conversationId: $conversationId, text: $text) {
      id
      text
      createdAt
      author {
        id
        username
      }
      readBy {
        id 
        username
      }
    }
  }
`;

export const ON_MESSAGE_ADDED = gql`
  subscription messageAdded($userId: ID!) {
    messageAdded(userId: $userId) {
      id
      text
      createdAt
      author {
        id
        username
      }
      readBy {
        id 
        username
      }
      conversation {
        id
        lastMessageCreatedAt
        users {
          id
          username
        }
      }
    }
  }
`;

export const CREATE_CONVERSATION = gql`
  mutation createConversation($userIds: [ID!]!) {
    createConversation(userIds: $userIds) {
      id
      lastMessageCreatedAt
      users {
        id 
        username
      }
      messages {
        author {
          id
          username
        }
        text
        createdAt
        readBy {
          id
          username
        }
        id
      }
    }
  }
`;

export const MARK_MESSAGE_AS_READ = gql`
  mutation markMessageAsRead($messageId: ID!) {
    markMessageAsRead(messageId: $messageId) {
      id
      text
      createdAt
      conversation {
        id
      }
      author {
        id
        username
      }
      readBy {
        id 
        username
      }
    }
  }
`;
