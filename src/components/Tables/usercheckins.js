import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserId } from "../../store/user/selectors";
import { useQuery } from "@apollo/react-hooks";
import { CHECKINS_FOR_USER } from "../../store/checkins/gql_checkins";
import Loading from "../Loading";
import { setMessage } from "../../store/appState/actions";

export default function CheckinTable() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUserId);

  const { data, loading, error } = useQuery(CHECKINS_FOR_USER, {
    variables: { id: parseInt(currentUser) },
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
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Calories</th>
          <th>Proteins</th>
          <th>Carbs</th>
          <th>Fats</th>
          <th>Day Rating</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {data.getCheckinForUser !== undefined &&
        data.getCheckinForUser.length !== 0
          ? data.getCheckinForUser.map((checkin) => {
              return (
                <tr key={checkin.id}>
                  <td>{checkin.date}</td>
                  <td>{checkin.calories}</td>
                  <td>{checkin.proteins}</td>
                  <td>{checkin.carbs}</td>
                  <td>{checkin.fats}</td>
                  <td>{checkin.dailyRating}</td>
                  <td>{checkin.comment}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
}
