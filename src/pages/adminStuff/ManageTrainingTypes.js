import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TYPES } from "../../store/trainingTypes/gql_trainingTypes";
import PlacesTable from "../../components/Tables/manageplaces";
import AddPlace from "../../components/AddPlace";
import "./ManagePlaces.css";

export default function ManagePlaces() {
  const [places, set_places] = useState();

  const { data } = useQuery(GET_TYPES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      set_places(data.getAllTrainingTypes);
    }
  }, [data]);

  console.log(places);

  return (
    <div className="places-container">
      <div>
        {places !== undefined && places.length !== 0 ? (
          <PlacesTable data={places} />
        ) : null}
      </div>
      <div>
        <AddPlace />
      </div>
    </div>
  );
}
