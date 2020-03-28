import { gql } from 'apollo-boost';

export const CONVERSATIONS = gql`
  query conversations {
    conversations {
      id
      users {
        id 
        username
      }
    }
  }
`;