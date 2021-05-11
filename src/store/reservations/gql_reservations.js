import gql from "graphql-tag";

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

export const CANCEL_RESERVATION = gql`
  mutation cancelReservation($reservationId: ID!) {
    removeReservation(reservationId: $reservationId) {
      id
    }
  }
`;
