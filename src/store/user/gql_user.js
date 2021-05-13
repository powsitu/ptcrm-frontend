import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        email
        isAdmin
        isBlocked
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
      user {
        id
        firstName
        email
        isAdmin
        isBlocked
      }
    }
  }
`;

export const ALL_USERS = gql`
  query allUsers {
    getAllUsers {
      id
      firstName
      lastName
      email
      isBlocked
    }
  }
`;

export const SWITCH_USER_BLOCK = gql`
  mutation switchUserBlock($userId: ID!) {
    switchBlockStatus(userId: $userId) {
      id
    }
  }
`;

export const CHECK_TOKEN = gql`
  query checkToken {
    checkToken {
      id
      firstName
      email
      isAdmin
      isBlocked
    }
  }
`;
