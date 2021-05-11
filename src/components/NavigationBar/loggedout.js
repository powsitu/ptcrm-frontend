import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function LoggedOut() {
  const history = useHistory();
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => handleButtonClick("/login")}
    >
      Login
    </Button>
  );
}
