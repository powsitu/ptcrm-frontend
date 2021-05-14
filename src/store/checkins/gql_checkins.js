import gql from "graphql-tag";

export const CHECKINS_FOR_USER = gql`
  query yourCheckins($id: ID!) {
    getCheckinForUser(id: $id) {
      id
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

export const ADD_CHECKIN = gql`
  mutation addCheckin(
    $userId: ID!
    $date: String
    $calories: Int
    $proteins: Int
    $carbs: Int
    $fats: Int
    $dailyRating: Int
    $comment: String
  ) {
    addCheckin(
      userId: $userId
      date: $date
      calories: $calories
      proteins: $proteins
      carbs: $carbs
      fats: $fats
      dailyRating: $dailyRating
      comment: $comment
    ) {
      id
    }
  }
`;
