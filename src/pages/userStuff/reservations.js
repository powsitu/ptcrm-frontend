import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/user/selectors";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MY_RESERVATIONS } from "../../store/trainings/gql_trainings";

export default function Reservations() {
  const currentUser = useSelector(selectUserId);
  const [reservations, set_reservations] = useState([]);

  const { error, loading, data } = useQuery(MY_RESERVATIONS, {
    variables: { userId: currentUser },
  });

  useEffect(() => {
    if (data) {
      set_reservations(data);
    }
  }, [data]);

  return (
    <div>
      This is gonna be the page for the users to check all their reservations
      {console.log(data)}
    </div>
  );
}
