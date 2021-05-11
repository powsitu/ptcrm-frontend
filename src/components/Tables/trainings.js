import React from "react";

export default function TrainingTable(props) {
  return (
    <tr>
      <td>{props.time}</td>
      <td>{props.trainingType}</td>
      <td>{props.city}</td>
    </tr>
  );
}
