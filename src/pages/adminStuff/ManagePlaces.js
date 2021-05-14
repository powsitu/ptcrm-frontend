import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLACES } from "../../store/places/gql_places";
import PlacesTable from "../../components/Tables/manageplaces";
import AddPlace from "../../components/AddPlace";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { setMessage } from "../../store/appState/actions";

export default function ManagePlaces() {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_PLACES, {
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
        {data.getAllPlaces !== undefined && data.getAllPlaces.length !== 0 ? (
          <PlacesTable data={data.getAllPlaces} />
        ) : null}
      </div>
      <div>
        <AddPlace />
      </div>
    </div>
  );
}
