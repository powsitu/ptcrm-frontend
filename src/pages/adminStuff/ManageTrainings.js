import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_TRAININGS } from "../../store/trainings/gql_trainings";

export default function ManageTrainings() {
  const [trainings, set_trainings] = useState();

  const { data } = useQuery(ALL_TRAININGS);

  useEffect(() => {
    if (data) {
      set_trainings(data);
    }
  }, [data]);

  console.log(data);

  return (
    <div>This is gonna be the page for the admin to manage trainings!</div>
  );
}
