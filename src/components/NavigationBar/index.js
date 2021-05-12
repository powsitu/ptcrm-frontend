import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./loggedin";
import LoggedOut from "./loggedout";
import { logoUrl } from "../../config/myVars";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly",
  },
  logo: {
    height: 60,
  },
}));

const NavigationBar = (props) => {
  const { history } = props;
  const token = useSelector(selectToken);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const menuItems = [
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ background: "#2E3B55" }}>
          <img src={logoUrl} alt="JO Coaching" className={classes.logo} />
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map((menuItem, index) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => handleMenuClick(pageURL)}
                    >
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : (
            <div className={classes.headerOptions}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick("/")}
              >
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
              {loginLogoutControls}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavigationBar);
