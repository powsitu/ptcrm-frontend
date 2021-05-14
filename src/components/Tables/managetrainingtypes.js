import React from "react";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import {
  REMOVE_TRAININGTYPE,
  GET_TYPES,
} from "../../store/trainingTypes/gql_trainingTypes";
import { useDispatch } from "react-redux";
import {
  setMessage,
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../../store/appState/actions";

export default function TrainingTypesTable({ data }) {
  const dispatch = useDispatch();
  const [removeTrainingType] = useMutation(REMOVE_TRAININGTYPE);

  async function clickRemoveTrainingType(trainingTypeId) {
    dispatch(appLoading());
    try {
      const response = await removeTrainingType({
        variables: { trainingTypeId: parseInt(trainingTypeId) },
        refetchQueries: [
          {
            query: GET_TYPES,
          },
        ],
      });
      dispatch(
        showMessageWithTimeout("success", false, "Training type removed!", 1500)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      dispatch(setMessage("danger", true, error.message));
      dispatch(appDoneLoading());
    }
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
