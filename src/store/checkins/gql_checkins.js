import gql from "graphql-tag";

export const CHECKINS_FOR_USER = gql`
  query yourCheckins($id: Int!) {
    getOneCheckinForUser(id: $id) {
      date
      dailyRating
      calories
      proteins
      carbs
      fats
      comment
    }
  }
`;
