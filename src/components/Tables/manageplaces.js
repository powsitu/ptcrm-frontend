import React from "react";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_TRAINING } from "../../store/trainings/gql_trainings";

export default function PlacesTable({ data }) {
  const [removeTraining] = useMutation(REMOVE_TRAINING);

  async function clickRemovePlace(placeId) {
    console.log("trying to remove place", placeId);
    // const response = await removeTraining({
    //   variables: { trainingId: parseInt(trainingId) },
    // });
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
