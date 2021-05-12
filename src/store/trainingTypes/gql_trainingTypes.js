import gql from "graphql-tag";

export const GET_TYPES = gql`
  query getAllTypes {
    getAllTrainingTypes {
      id
      name
      description
      intensity
    }
  }
`;
