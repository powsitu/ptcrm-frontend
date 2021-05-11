import gql from "graphql-tag";

export const TRAININGS_ON_DAY = gql`
  query trainingsOnDay($date: String!) {
    getTrainingThisDay(date: $date) {
      id
      time
      trainingType {
        name
      }
      place {
        city
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

export const MY_RESERVATIONS = gql`
  query myReservations($userId: ID!) {
    getAllReservationsForUser(id: $userId) {
      id
      training {
        date
        time
        place {
          city
        }
        trainingType {
          name
        }
      }
    }
  }
`;
