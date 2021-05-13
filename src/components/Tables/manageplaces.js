import React from "react";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_PLACE, GET_PLACES } from "../../store/places/gql_places";

export default function PlacesTable({ data }) {
  const [removePlace] = useMutation(REMOVE_PLACE);

  async function clickRemovePlace(placeId) {
    const response = await removePlace({
      variables: { placeId: parseInt(placeId) },
      refetchQueries: [
        {
          query: GET_PLACES,
        },
      ],
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Street</th>
          <th>City</th>
          <th>Zip</th>
          <th>Country</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((place) => {
          return (
            <tr key={place.id}>
              <td>{place.street}</td>
              <td>{place.city}</td>
              <td>{place.zip}</td>
              <td>{place.country}</td>
              <td>{place.description}</td>
              <td>
                <Button
                  variant="contained"
                  onClick={() => clickRemovePlace(place.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
