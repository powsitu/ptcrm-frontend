import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_TYPES } from "../../store/trainingTypes/gql_trainingTypes";
import TrainingTypesTable from "../../components/Tables/managetrainingtypes";
import AddTrainingType from "../../components/AddTrainingType";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { setMessage } from "../../store/appState/actions";

export default function ManagePlaces() {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_TYPES, {
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
        {data.getAllTrainingTypes !== undefined &&
        data.getAllTrainingTypes.length !== 0 ? (
          <TrainingTypesTable data={data.getAllTrainingTypes} />
        ) : null}
      </div>
      <div>
        <AddTrainingType />
      </div>
    </div>
  );
}
