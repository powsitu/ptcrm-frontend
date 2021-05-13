import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { TRAININGS_ON_DAY } from "../../store/trainings/gql_trainings";
import TrainingsTable from "../../components/Tables/managetrainings";
import AddTraining from "../../components/AddTraining";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

export default function ManageTrainings() {
  const [trainings, set_trainings] = useState();
  const [date, set_date] = useState(new Date());

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
          <TrainingsTable data={trainings} date={date} />
        ) : null}
      </div>
      <div>
        <AddTraining date={moment(date).format("YYYY-MM-DD")} />
      </div>
    </div>
  );
}
