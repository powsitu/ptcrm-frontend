import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_TRAININGS } from "../../store/trainings/gql_trainings";
import TrainingsTable from "../../components/Tables/managetrainings";
import AddTraining from "../../components/AddTraining";
import "./ManageTrainings.css";

export default function ManageTrainings() {
  const [trainings, set_trainings] = useState();

  const { data } = useQuery(ALL_TRAININGS);

  useEffect(() => {
    if (data) {
      set_trainings(data);
    }
  }, [data]);

  return (
    <div className="trainings-container">
      <div>
        {data !== undefined && data.length !== 0 ? (
          <TrainingsTable data={data} />
        ) : null}
      </div>
      <div>
        <AddTraining />
      </div>
    </div>
  );
}
