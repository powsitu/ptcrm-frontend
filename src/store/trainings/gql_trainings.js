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
