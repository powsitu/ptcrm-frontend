import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  TRAININGS_ON_DAY,
  JOIN_TRAINING,
} from "../store/trainings/gql_trainings";
import TrainingTable from "../components/Tables/trainings";
import { selectUserId } from "../store/user/selectors";
import Loading from "../components/Loading";
import {
  setMessage,
  appLoading,
  appDoneLoading,
} from "../store/appState/actions";

export default function Homepage() {
  const dispatch = useDispatch();
  const [date, set_date] = useState(new Date());
  const currentUser = useSelector(selectUserId);
  const [joinTraining] = useMutation(JOIN_TRAINING);
  const onDateChange = (date) => {
    set_date(date);
  };

  const { data, loading, error } = useQuery(TRAININGS_ON_DAY, {
    variables: { date: moment(date).format("YYYY-MM-DD") },
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    dispatch(setMessage("danger", true, error.message));
    return <Loading />;
  }

  async function clickJoinTraining(userId, trainingId) {
    dispatch(appLoading());
    try {
      const response = await joinTraining({
        variables: { userId: userId, trainingId: parseInt(trainingId) },
      });
      dispatch(appDoneLoading());
    } catch (error) {
      dispatch(setMessage("danger", true, error.message));
      dispatch(appDoneLoading());
    }
  }

  return (
    <div className="container">
      <div>
        <Calendar value={date} onChange={onDateChange} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Training</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 ? (
              data.getTrainingThisDay.map((training) => {
                return (
                  <TrainingTable
                    key={training.id}
                    time={training.time}
                    trainingType={training.trainingType.name}
                    city={training.place.city}
                    buttonAction={() =>
                      clickJoinTraining(currentUser, training.id)
                    }
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
