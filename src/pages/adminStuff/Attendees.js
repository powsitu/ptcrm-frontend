import React, { useState, useEffect } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@apollo/react-hooks";
import { TRAININGS_ON_DAY } from "../../store/trainings/gql_trainings";
import AttendeesTable from "../../components/Tables/attendees";

export default function Attendees() {
  const [date, set_date] = useState(new Date());
  const [trainings, set_trainings] = useState([]);

  const onDateChange = (date) => {
    set_date(date);
  };

  const { data } = useQuery(TRAININGS_ON_DAY, {
    variables: { date: moment(date).format("YYYY-MM-DD") },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      set_trainings(data);
    }
  }, [data]);

  return (
    <div className="container">
      <div>
        <Calendar value={date} onChange={onDateChange} />
      </div>
      <div>
        {trainings !== undefined && trainings.length !== 0 ? (
          <AttendeesTable data={trainings} />
        ) : null}
      </div>
    </div>
  );
}
