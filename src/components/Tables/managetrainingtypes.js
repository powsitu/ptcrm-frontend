import React from "react";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_TRAINING } from "../../store/trainings/gql_trainings";

export default function TrainingTypesTable({ data }) {
  const [removeTraining] = useMutation(REMOVE_TRAINING);

  async function clickRemoveTraining(trainingId) {
    const response = await removeTraining({
      variables: { trainingId: parseInt(trainingId) },
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>City</th>
          <th>Training</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.getTrainingThisDay.map((training) => {
          return (
            <tr key={training.id}>
              <td>{training.time}</td>
              <td>{training.place.city}</td>
              <td>{training.trainingType.name}</td>
              <td>
                <Button
                  variant="contained"
                  onClick={() => clickRemoveTraining(training.id)}
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
