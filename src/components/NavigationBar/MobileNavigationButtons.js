import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserAdmin } from "../../store/user/selectors";
import MenuItem from "@material-ui/core/MenuItem";

const userMenuItems = [
  {
    menuTitle: "Home",
    pageURL: "/",
  },
  {
    menuTitle: "Checkins",
    pageURL: "/checkins",
  },
  {
    menuTitle: "Feedback",
    pageURL: "/feedback",
  },
  {
    menuTitle: "Reservations",
    pageURL: "/reservations",
  },
];

const adminMenuItems = [
  {
    menuTitle: "Users",
    pageURL: "/admin/users",
  },
  {
    menuTitle: "Attendees",
    pageURL: "/admin/Attendees",
  },
  {
    menuTitle: "Trainings",
    pageURL: "/admin/trainings",
  },
  {
    menuTitle: "Training Types",
    pageURL: "/admin/ttypes",
  },
  {
    menuTitle: "Places",
    pageURL: "/admin/places",
  },
];

export default function MobileNavigationButtons(props) {
  const history = useHistory();
  const admin = useSelector(selectUserAdmin);
  const [anchorEl, setAnchorEl] = useState(null);

  function handleMenuClick(pageURL) {
    history.push(pageURL);
    setAnchorEl(null);
  }

  return (
    <>
      {!admin
        ? userMenuItems.map((menuItem, index) => {
            const { menuTitle, pageURL } = menuItem;
            return (
              <MenuItem key={index} onClick={() => handleMenuClick(pageURL)}>
                {menuTitle}
              </MenuItem>
            );
          })
        : adminMenuItems.map((menuItem, index) => {
            const { menuTitle, pageURL } = menuItem;
            return (
              <MenuItem key={index} onClick={() => handleMenuClick(pageURL)}>
                {menuTitle}
              </MenuItem>
            );
          })}
    </>
  );
}
