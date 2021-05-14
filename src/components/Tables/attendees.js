import React from "react";

export default function AttendeesTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Training</th>
          <th>City</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.getTrainingThisDay.map((training) => {
          return (
            <>
              <tr key={training.id}>
                <td rowSpan={training.users.length + 1}>{training.time}</td>
                <td rowSpan={training.users.length + 1}>
                  {training.trainingType.name}
                </td>
                <td rowSpan={training.users.length + 1}>
                  {training.place.city}
                </td>
              </tr>
              {training.users.map((attendee, index) => {
                return (
                  <tr key={index}>
                    <td>{attendee.firstName}</td>
                    <td>{attendee.email}</td>
                  </tr>
                );
              })}
            </>
          );
        })}
      </tbody>
    </table>
  );
}
