import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/user/selectors";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  MY_RESERVATIONS,
  CANCEL_RESERVATION,
} from "../../store/reservations/gql_reservations";
import ReservationsTable from "../../components/Tables/reservations";
import "./reservations.css";

export default function Reservations() {
  const currentUser = useSelector(selectUserId);
  const [reservations, set_reservations] = useState();

  const { error, loading, data } = useQuery(MY_RESERVATIONS, {
    variables: { userId: currentUser },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      set_reservations(data);
    }
  }, [data]);

  return (
    <div className="reservations-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>City</th>
            <th>Training</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations ? (
            reservations.getAllReservationsForUser.map((reservation) => {
              return (
                <ReservationsTable
                  key={reservation.id}
                  date={reservation.training.date}
                  time={reservation.training.time}
                  city={reservation.training.place.city}
                  trainingType={reservation.training.trainingType.name}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
