import React from "react";
import Button from "@material-ui/core/Button";

export default function TrainingTable(props) {
  return (
    <tr>
      <td>{props.time}</td>
      <td>{props.trainingType}</td>
      <td>{props.city}</td>
      <td>
        <Button variant="contained" onClick={() => props.buttonAction()}>
          Join
        </Button>
      </td>
    </tr>
  );
}
