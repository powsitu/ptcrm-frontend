import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLACES } from "../../store/places/gql_places";
import PlacesTable from "../../components/Tables/manageplaces";
import AddPlace from "../../components/AddPlace";

export default function ManagePlaces() {
  const [places, set_places] = useState();

  const { data } = useQuery(GET_PLACES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      set_places(data.getAllPlaces);
    }
  }, [data]);

  return (
    <div className="container">
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
