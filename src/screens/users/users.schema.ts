import { gql } from 'apollo-boost';

export const USERS = gql`
  query users {
    users {
      id 
      username
    }
  }
`;
