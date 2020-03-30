import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';

import { ConversationsContext } from './ConversationsContext';
import { AuthContext, AuthContextType } from '../Auth/AuthContext';
import {
  Conversation,
  ConversationsQuery,
  ConversationsQueryVariables,
  CreateConversationMutation,
  CreateConversationMutationVariables,
  MarkMessageAsReadMutation, MarkMessageAsReadMutationVariables, Message,
  MessageAddedSubscription,
  MessageAddedSubscriptionVariables, MessagesByConversationIdQuery, MessagesByConversationIdQueryVariables
} from '../../generated/graphql';
import {
  CONVERSATIONS,
  CREATE_CONVERSATION, MARK_MESSAGE_AS_READ,
  MESSAGES,
  ON_MESSAGE_ADDED
} from '../../screens/conversations/conversations.schema';
import { NetworkStatusContext, NetworkStatusContextType } from '../NetworkStatus/NetworkStatusContext';
import { getUpdatedConversationsWithReadBy } from './utils';

export const ConversationsContextProvider = (props: PropsWithChildren<{}>) => {
  const { me } = useContext<AuthContextType>(AuthContext);
  const apolloClient = useApolloClient();
  const {connected} = useContext<NetworkStatusContextType>(NetworkStatusContext);
  const [newMessageData, setNewMessageData] = useState<MessageAddedSubscription | null>(null);
  const [totalUnread, setTotalUnread] = useState<number>(0);

  const { loading, error, data: conversationsData, refetch } = useQuery<ConversationsQuery, ConversationsQueryVariables>(CONVERSATIONS);

  useEffect(() => {
    let subscription;
    function subscribe() {
      const observer = apolloClient.subscribe<MessageAddedSubscription, MessageAddedSubscriptionVariables>({
        query: ON_MESSAGE_ADDED,
        variables: {
          userId: me.id
        }
      });

      subscription = observer.subscribe(({data}) => {
        setNewMessageData(data);
      })
    }

    if (me && connected) {
      subscribe();
      refetch();
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }

  }, [me, connected]);

  useEffect(() => {
    if (newMessageData) {
      const updatedConversation = conversationsData.conversations.find(conv => conv.id === newMessageData.messageAdded.conversation.id);
      if (!updatedConversation) {
        apolloClient.writeQuery({
          query: CONVERSATIONS,
          data: {
            conversations: [...conversationsData.conversations, {
              ...newMessageData.messageAdded.conversation,
              messages: [newMessageData.messageAdded]
            }]
          }
        })
      } else {
        try {
          const messagesData = apolloClient.readQuery<MessagesByConversationIdQuery, MessagesByConversationIdQueryVariables>(
            { query: MESSAGES, variables: {conversationId: updatedConversation.id} }
          );
          apolloClient.writeQuery({
            query: MESSAGES,
            variables: {conversationId: updatedConversation.id},
            data: {
              messagesByConversationId: [...messagesData.messagesByConversationId, newMessageData.messageAdded]
            }
          });
        } catch {
          // no data in cache
        }

        apolloClient.writeQuery({
          query: CONVERSATIONS,
          data: {
            conversations: conversationsData.conversations.map(conv => {
              if (conv.id === updatedConversation.id) {
                return ({
                  ...conv,
                  messages: [
                    ...conv.messages,
                    newMessageData.messageAdded
                  ],
                  lastMessageCreatedAt: newMessageData.messageAdded.createdAt
                })
              } else {
                return conv;
              }
            })
          }
        })
      }
    }
  }, [newMessageData]);

  const [_createConversation, {loading: createConversationLoading}] = useMutation<
    CreateConversationMutation,
    CreateConversationMutationVariables>(
    CREATE_CONVERSATION,
    {
      update(cache, {data: {createConversation}}) {
        const {conversations} = cache.readQuery<ConversationsQuery, ConversationsQueryVariables>({query: CONVERSATIONS});
        cache.writeQuery<ConversationsQuery, ConversationsQueryVariables>({
          query: CONVERSATIONS,
          data: {
            conversations: conversations.concat([createConversation])
          }
        })
      }
    }
  );

  const [_markMessageAsRead] = useMutation<
    MarkMessageAsReadMutation,
    MarkMessageAsReadMutationVariables>(
    MARK_MESSAGE_AS_READ,
    {
      update(cache, {data: {markMessageAsRead}}) {
        const {conversations} = cache.readQuery<ConversationsQuery, ConversationsQueryVariables>({query: CONVERSATIONS});
        cache.writeQuery<ConversationsQuery, ConversationsQueryVariables>({
          query: CONVERSATIONS,
          data: {
            conversations: getUpdatedConversationsWithReadBy(conversations as Conversation[], markMessageAsRead as Message)
          }
        })
      }
    }
  );

  async function createConversation (userIds: string[]): Promise<Conversation> {
    const createdResponse = await _createConversation({variables: {userIds}});
    return createdResponse.data.createConversation as Conversation;
  }

  async function markAsRead (messageId: string): Promise<Message> {
    const response = await _markMessageAsRead({variables: {messageId}});
    return response.data.markMessageAsRead as Message;
  }

  return (
    <ConversationsContext.Provider
      value={{
        conversations: conversationsData ? conversationsData.conversations as Conversation[] : [],
        createConversation,
        loading,
        error: error ? error.message : null,
        markAsRead,
        totalUnread,
        setTotalUnread
      }}
    >
      {props.children}
    </ConversationsContext.Provider>
  )
};
