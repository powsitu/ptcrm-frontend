import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/react-hooks";
import {
  REMOVE_TRAINING,
  TRAININGS_ON_DAY,
} from "../../store/trainings/gql_trainings";
import {
  setMessage,
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../../store/appState/actions";

export default function TrainingsTable({ data, date }) {
  const dispatch = useDispatch();
  const [removeTraining] = useMutation(REMOVE_TRAINING);

  async function clickRemoveTraining(trainingId) {
    dispatch(appLoading());
    try {
      const response = await removeTraining({
        variables: { trainingId: parseInt(trainingId) },
        refetchQueries: [
          {
            query: TRAININGS_ON_DAY,
            variables: { date: moment(date).format("YYYY-MM-DD") },
          },
        ],
      });
      dispatch(
        showMessageWithTimeout("success", false, "Training removed!", 1500)
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
