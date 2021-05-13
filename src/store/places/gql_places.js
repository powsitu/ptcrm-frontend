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
