import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        email
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
      }
    }
  }
`;

export const ALL_USERS = gql`
  query allUsers {
    getAllUsers {
      firstName
      lastName
      email
      isBlocked
    }
  }
`;
