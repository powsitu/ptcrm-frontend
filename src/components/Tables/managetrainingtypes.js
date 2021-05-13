import React from "react";
import Button from "@material-ui/core/Button";
// import { useMutation } from "@apollo/react-hooks";
// import { REMOVE_TRAINING } from "../../store/trainings/gql_trainings";

export default function TrainingTypesTable({ data }) {
  // const [removeTraining] = useMutation(REMOVE_TRAINING);

  // async function clickRemoveTraining(trainingId) {
  //   const response = await removeTraining({
  //     variables: { trainingId: parseInt(trainingId) },
  //   });
  // }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Intensity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((trainingType) => {
          return (
            <tr key={trainingType.id}>
              <td>{trainingType.name}</td>
              <td>{trainingType.description}</td>
              <td>{trainingType.intensity}</td>
              <td>
                <Button
                  variant="contained"
                  // onClick={() => clickRemoveTraining(trainingType.id)}
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
