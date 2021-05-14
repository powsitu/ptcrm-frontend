import React from "react";
import Button from "@material-ui/core/Button";

export default function UsersTable(props) {
  return (
    <tr>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.email}</td>
      <td>
        <Button variant="contained" onClick={() => props.profileButtonAction()}>
          Profile
        </Button>
      </td>
      <td>
        <Button variant="contained" onClick={() => props.buttonAction()}>
          {props.isBlocked === "false" ? "Block" : "Unblock"}
        </Button>
      </td>
    </tr>
  );
}
