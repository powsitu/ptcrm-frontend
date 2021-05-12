import React from "react";
import Button from "@material-ui/core/Button";

export default function TrainingsTable({ data }) {
  return (
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
        {data.getTrainingThisDay.map((training) => {
          return (
            <tr key={training.id}>
              <td>{training.date}</td>
              <td>{training.time}</td>
              <td>{training.place.city}</td>
              <td>{training.trainingType.name}</td>
              <td>
                <Button variant="contained">Delete</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
