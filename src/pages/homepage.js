import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@apollo/react-hooks";
import { TRAININGS_ON_DAY } from "../store/trainings/gql_trainings";
import TrainingTable from "../components/Tables/trainings";
import "./homepage.css";

export default function Homepage() {
  const [date, set_date] = useState(new Date());
  const onDateChange = (date) => {
    set_date(date);
  };

  const { error, loading, data } = useQuery(TRAININGS_ON_DAY, {
    variables: { date: date.toISOString().split("T")[0] },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const OnDateClick = () => {
    console.log("you clicked on a day", date.toISOString().split("T")[0]);
  };

  return (
    <div className="home-container">
      <div>
        <Calendar
          value={date}
          onChange={onDateChange}
          onClickDay={OnDateClick}
        />
      </div>
      <div className="trainings-container">
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
            {!loading ? (
              data.getTrainingThisDay.map((training) => {
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
              <td>Loading...</td>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
