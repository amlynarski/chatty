import React from 'react';
import { Conversation, Message } from '../../generated/graphql';

export interface ConversationsContextType {
  conversations: Conversation[],
  loading: boolean,
  error: string | null,
  createConversation: (userIds: string[]) => Promise<Conversation>,
  markAsRead: (messageId: string) => Promise<Message>,
  setTotalUnread: (value: number) => void,
  totalUnread: number
}

const emptyFn = () => undefined;

export const defaultConversationsContext = {
  conversations: [],
  loading: false,
  error: null,
  createConversation: emptyFn,
  markAsRead: emptyFn,
  setTotalUnread: emptyFn,
  totalUnread: 0
};

export const ConversationsContext = React.createContext<ConversationsContextType>(defaultConversationsContext);
