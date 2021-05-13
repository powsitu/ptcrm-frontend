import React from "react";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_TRAININGTYPE } from "../../store/trainingTypes/gql_trainingTypes";

export default function TrainingTypesTable({ data }) {
  const [removeTrainingType] = useMutation(REMOVE_TRAININGTYPE);

  async function clickRemoveTrainingType(trainingTypeId) {
    const response = await removeTrainingType({
      variables: { trainingTypeId: parseInt(trainingTypeId) },
    });
  }

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
                  onClick={() => clickRemoveTrainingType(trainingType.id)}
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
