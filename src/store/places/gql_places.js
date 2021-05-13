import gql from "graphql-tag";

export const GET_PLACES = gql`
  query getAllPlaces {
    getAllPlaces {
      id
      street
      city
      zip
      country
      description
    }
  }
`;

export const REMOVE_PLACE = gql`
  mutation removePlace($placeId: Int!) {
    removePlace(placeId: $placeId) {
      id
    }
  }
`;
