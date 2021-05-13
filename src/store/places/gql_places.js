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

export const ADD_PLACE = gql`
  mutation addPlace(
    $street: String
    $city: String
    $zip: String
    $country: String
    $description: String
  ) {
    addPlace(
      street: $street
      city: $city
      zip: $zip
      country: $country
      description: $description
    ) {
      id
    }
  }
`;
