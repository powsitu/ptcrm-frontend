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

export const REMOVE_TRAININGTYPE = gql`
  mutation removeTrainingType($trainingTypeId: ID!) {
    removeTrainingType(trainingTypeId: $trainingTypeId) {
      id
    }
  }
`;

export const ADD_TRAININGTYPE = gql`
  mutation addTrainingType(
    $name: String
    $description: String
    $intensity: Int
  ) {
    addTrainingType(
      name: $name
      description: $description
      intensity: $intensity
    ) {
      id
    }
  }
`;
