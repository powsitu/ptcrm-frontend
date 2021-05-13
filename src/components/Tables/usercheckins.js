import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/user/selectors";
import { useQuery } from "@apollo/react-hooks";
import { CHECKINS_FOR_USER } from "../../store/checkins/gql_checkins";

export default function CheckinTable() {
  const currentUser = useSelector(selectUserId);
  const [myCheckins, set_myCheckins] = useState();

  const { data } = useQuery(CHECKINS_FOR_USER, {
    variables: { id: parseInt(currentUser) },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      set_myCheckins(data.getCheckinForUser);
    }
  }, [data]);

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
        {myCheckins !== undefined && myCheckins.length !== 0
          ? myCheckins.map((checkin) => {
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
