import React from "react";
import Button from "@material-ui/core/Button";

export default function ReservationsTable(props) {
  return (
    <tr>
      <td>{props.date}</td>
      <td>{props.time}</td>
      <td>{props.city}</td>
      <td>{props.trainingType}</td>
      <td>
        <Button variant="contained" onClick={() => props.buttonAction()}>
          Cancel
        </Button>
      </td>
    </tr>
  );
}
