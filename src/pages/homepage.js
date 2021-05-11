import React, { useState, useEffect } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@apollo/react-hooks";
import { TRAININGS_ON_DAY } from "../store/trainings/gql_trainings";
import TrainingTable from "../components/Tables/trainings";
import "./homepage.css";

export default function Homepage() {
  const [date, set_date] = useState(new Date());
  const [trainings, set_trainings] = useState([]);
  const onDateChange = (date) => {
    set_date(date);
  };

  const { error, loading, data } = useQuery(TRAININGS_ON_DAY, {
    variables: { date: moment(date).format("YYYY-MM-DD") },
  });

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
