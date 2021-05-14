import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { TRAININGS_ON_DAY } from "../../store/trainings/gql_trainings";
import TrainingsTable from "../../components/Tables/managetrainings";
import AddTraining from "../../components/AddTraining";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { setMessage } from "../../store/appState/actions";

export default function ManageTrainings() {
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
          <TrainingsTable data={data} date={date} />
        ) : null}
      </div>
      <div>
        <AddTraining date={moment(date).format("YYYY-MM-DD")} />
      </div>
    </div>
  );
}
