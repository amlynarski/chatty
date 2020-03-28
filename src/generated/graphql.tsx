export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
};

export type Message = {
   __typename?: 'Message';
  author: User;
  text: Scalars['String'];
  createdAt: Scalars['Int'];
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
  conversationId: Scalars['ID'];
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
