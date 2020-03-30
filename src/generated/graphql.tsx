export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Conversation = {
   __typename?: 'Conversation';
  users: Array<User>;
  messages: Array<Message>;
  id: Scalars['ID'];
  lastMessageCreatedAt?: Maybe<Scalars['Date']>;
};


export type Message = {
   __typename?: 'Message';
  author: User;
  text: Scalars['String'];
  createdAt: Scalars['Date'];
  conversation: Conversation;
  readBy: Array<User>;
  id: Scalars['ID'];
};

export type Mutation = {
   __typename?: 'Mutation';
  sendMessage: Message;
  createConversation: Conversation;
  markMessageAsRead: Message;
  signin: Token;
};


export type MutationSendMessageArgs = {
  conversationId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationCreateConversationArgs = {
  userIds: Array<Scalars['ID']>;
};


export type MutationMarkMessageAsReadArgs = {
  messageId: Scalars['ID'];
};


export type MutationSigninArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  me: User;
  messagesByConversationId: Array<Message>;
  conversations: Array<Conversation>;
  users: Array<User>;
};


export type QueryMessagesByConversationIdArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
   __typename?: 'Subscription';
  messageAdded: Message;
};


export type SubscriptionMessageAddedArgs = {
  userId: Scalars['ID'];
};

export type Token = {
   __typename?: 'Token';
  jwt: Scalars['String'];
};


export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type SigninMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type SigninMutation = (
  { __typename?: 'Mutation' }
  & { signin: (
    { __typename?: 'Token' }
    & Pick<Token, 'jwt'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type ConversationsQueryVariables = {};


export type ConversationsQuery = (
  { __typename?: 'Query' }
  & { conversations: Array<(
    { __typename?: 'Conversation' }
    & Pick<Conversation, 'id' | 'lastMessageCreatedAt'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ), readBy: Array<(
        { __typename?: 'User' }
        & Pick<User, 'id'>
      )> }
    )> }
  )> }
);

export type MessagesByConversationIdQueryVariables = {
  conversationId: Scalars['ID'];
};


export type MessagesByConversationIdQuery = (
  { __typename?: 'Query' }
  & { messagesByConversationId: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), readBy: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  )> }
);

export type SendMessageMutationVariables = {
  conversationId: Scalars['ID'];
  text: Scalars['String'];
};


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), readBy: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type MessageAddedSubscriptionVariables = {
  userId: Scalars['ID'];
};


export type MessageAddedSubscription = (
  { __typename?: 'Subscription' }
  & { messageAdded: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), readBy: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, conversation: (
      { __typename?: 'Conversation' }
      & Pick<Conversation, 'id' | 'lastMessageCreatedAt'>
      & { users: Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      )> }
    ) }
  ) }
);

export type CreateConversationMutationVariables = {
  userIds: Array<Scalars['ID']>;
};


export type CreateConversationMutation = (
  { __typename?: 'Mutation' }
  & { createConversation: (
    { __typename?: 'Conversation' }
    & Pick<Conversation, 'id' | 'lastMessageCreatedAt'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'text' | 'createdAt' | 'id'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ), readBy: Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      )> }
    )> }
  ) }
);

export type MarkMessageAsReadMutationVariables = {
  messageId: Scalars['ID'];
};


export type MarkMessageAsReadMutation = (
  { __typename?: 'Mutation' }
  & { markMessageAsRead: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'createdAt'>
    & { conversation: (
      { __typename?: 'Conversation' }
      & Pick<Conversation, 'id'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), readBy: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);
