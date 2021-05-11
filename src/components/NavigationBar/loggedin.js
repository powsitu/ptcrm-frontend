import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../store/user/actions";

export default function LoggedIn() {
  const dispatch = useDispatch();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => dispatch(logoutAction())}
    >
      Logout
    </Button>
  );
}
