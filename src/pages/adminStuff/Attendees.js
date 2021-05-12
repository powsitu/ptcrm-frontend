import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@apollo/react-hooks";
import { TRAININGS_ON_DAY } from "../../store/trainings/gql_trainings";
import TrainingTable from "../../components/Tables/trainings";
import "../Homepage.css";
import { selectUserAdmin } from "../../store/user/selectors";

export default function Attendees() {
  const [date, set_date] = useState(new Date());
  const [trainings, set_trainings] = useState([]);
  const currentUser = useSelector(selectUserAdmin);

  const onDateChange = (date) => {
    set_date(date);
  };

  const { data } = useQuery(TRAININGS_ON_DAY, {
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
