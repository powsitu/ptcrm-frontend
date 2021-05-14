import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserId } from "../../store/user/selectors";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  MY_RESERVATIONS,
  CANCEL_RESERVATION,
} from "../../store/reservations/gql_reservations";
import ReservationsTable from "../../components/Tables/reservations";
import Loading from "../../components/Loading";
import {
  setMessage,
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../../store/appState/actions";

export default function Reservations() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUserId);
  const [cancelReservation] = useMutation(CANCEL_RESERVATION);

  async function clickCancelReservation(reservationId) {
    dispatch(appLoading());
    try {
      const response = await cancelReservation({
        variables: { reservationId: parseInt(reservationId) },
        refetchQueries: [
          {
            query: MY_RESERVATIONS,
            variables: { userId: currentUser },
          },
        ],
      });
      dispatch(
        showMessageWithTimeout("success", false, "Reservation cancelled", 1500)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      dispatch(setMessage("danger", true, error.message));
      dispatch(appDoneLoading());
    }
  }

  const { data, loading, error } = useQuery(MY_RESERVATIONS, {
    variables: { userId: currentUser },
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
          {data ? (
            data.getAllReservationsForUser.map((reservation) => {
              return (
                <ReservationsTable
                  key={reservation.id}
                  date={reservation.training.date}
                  time={reservation.training.time}
                  city={reservation.training.place.city}
                  trainingType={reservation.training.trainingType.name}
                  buttonAction={() => clickCancelReservation(reservation.id)}
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
