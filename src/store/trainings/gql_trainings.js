import gql from "graphql-tag";

export const TRAININGS_ON_DAY = gql`
  query trainingsOnDay($date: String!) {
    getTrainingThisDay(date: $date) {
      id
      date
      time
      place {
        city
      }
      trainingType {
        name
      }
      users {
        id
        firstName
        email
      }
    }
  }
`;

export const JOIN_TRAINING = gql`
  mutation joinThisTraining($userId: ID!, $trainingId: Int!) {
    makeReservation(userId: $userId, trainingId: $trainingId) {
      id
    }
  }
`;

export const ALL_TRAININGS = gql`
  query allTrainings {
    getAllTrainings {
      id
      date
      time
      place {
        city
      }
      trainingType {
        name
      }
      users {
        firstName
        email
      }
    }
  }
`;

export const ADD_TRAINING = gql`
  mutation addTraining(
    $date: String
    $time: String
    $attendees: Int
    $isBookable: Boolean
    $placeId: Int
    $trainingTypeId: Int
  ) {
    addTraining(
      date: $date
      time: $time
      attendees: $attendees
      isBookable: $isBookable
      placeId: $placeId
      trainingTypeId: $trainingTypeId
    ) {
      id
    }
  }
`;

export const REMOVE_TRAINING = gql`
  mutation removeTraining($trainingId: ID!) {
    removeTraining(trainingId: $trainingId) {
      id
    }
  }
`;
