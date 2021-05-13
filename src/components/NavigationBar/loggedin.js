import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../store/user/actions";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleButtonClick = (pageURL) => {
    dispatch(logoutAction());
    history.push(pageURL);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => handleButtonClick("/login")}
    >
      Logout
    </Button>
  );
}
