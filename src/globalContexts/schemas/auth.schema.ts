import { gql } from 'apollo-boost';

export const SIGNIN = gql`
  mutation signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      jwt
    }
  }
`;