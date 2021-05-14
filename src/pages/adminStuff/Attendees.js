import React, { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@apollo/react-hooks";
import { TRAININGS_ON_DAY } from "../../store/trainings/gql_trainings";
import AttendeesTable from "../../components/Tables/attendees";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { setMessage } from "../../store/appState/actions";

export default function Attendees() {
  const dispatch = useDispatch();
  const [date, set_date] = useState(new Date());

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

  return (
    <div className="container">
      <div>
        <Calendar value={date} onChange={onDateChange} />
      </div>
      <div>
        {data !== undefined && data.length !== 0 ? (
          <AttendeesTable data={data} />
        ) : null}
      </div>
    </div>
  );
}
