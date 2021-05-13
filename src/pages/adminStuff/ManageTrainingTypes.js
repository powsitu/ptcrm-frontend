import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_TYPES } from "../../store/trainingTypes/gql_trainingTypes";
import TrainingTypesTable from "../../components/Tables/managetrainingtypes";
import AddTrainingType from "../../components/AddTrainingType";

export default function ManagePlaces() {
  const [trainingTypes, set_trainingTypes] = useState();

  const { data } = useQuery(GET_TYPES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      set_trainingTypes(data.getAllTrainingTypes);
    }
  }, [data]);

  return (
    <div className="container">
      <div>
        {trainingTypes !== undefined && trainingTypes.length !== 0 ? (
          <TrainingTypesTable data={trainingTypes} />
        ) : null}
      </div>
      <div>
        <AddTrainingType />
      </div>
    </div>
  );
}
