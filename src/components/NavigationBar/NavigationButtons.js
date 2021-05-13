import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAdmin } from "../../store/user/selectors";
import Button from "@material-ui/core/Button";

export default function NavigationButtons() {
  const history = useHistory();
  const admin = useSelector(selectUserAdmin);

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  // USER BUTTONS
  function userButtons() {
    return (
      <>
        <Button variant="contained" onClick={() => handleButtonClick("/")}>
          Home
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick("/checkins")}
        >
          Checkins
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick("/feedback")}
        >
          Feedback
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick("/reservations")}
        >
          Reservations
        </Button>
      </>
    );
  }
  // END OF USER BUTTONS

  // ADMIN BUTTONS
  function adminButtons() {
    return (
      <>
        <Button
          variant="contained"
          onClick={() => handleButtonClick("/admin/users")}
        >
          Users
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick("/admin/attendees")}
        >
          Attendees
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick("/admin/trainings")}
        >
          Trainings
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick("/admin/ttypes")}
        >
          Training Types
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick("/admin/places")}
        >
          Places
        </Button>
      </>
    );
  }
  // END OF ADMIN BUTTONS

  return <>{!admin ? userButtons() : adminButtons()}</>;
}
