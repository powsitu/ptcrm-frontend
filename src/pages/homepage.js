import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  TRAININGS_ON_DAY,
  JOIN_TRAINING,
} from "../store/trainings/gql_trainings";
import TrainingTable from "../components/Tables/trainings";
import "./homepage.css";
import { selectUserId } from "../store/user/selectors";

export default function Homepage() {
  const [date, set_date] = useState(new Date());
  const [trainings, set_trainings] = useState([]);
  const currentUser = useSelector(selectUserId);
  const [joinTraining] = useMutation(JOIN_TRAINING);
  const onDateChange = (date) => {
    set_date(date);
  };

  const { error, loading, data } = useQuery(TRAININGS_ON_DAY, {
    variables: { date: moment(date).format("YYYY-MM-DD") },
  });

  async function clickJoinTraining(userId, trainingId) {
    console.log(`The user ${userId} tried to join the training ${trainingId}`);
    const response = await joinTraining({
      variables: { userId: userId, trainingId: parseInt(trainingId) },
    });
  }

  useEffect(() => {
    if (data) {
      set_trainings(data);
    }
  }, [data]);

  return (
    <div className="home-container">
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
            {trainings.length !== 0 ? (
              trainings.getTrainingThisDay.map((training) => {
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
