import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { CHECK_TOKEN } from "./store/user/gql_user";
import { getUserFromStoredToken } from "./store/user/actions";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Checkins from "./pages/userStuff/Checkins";
import Feedback from "./pages/userStuff/Feedback";
import Reservations from "./pages/userStuff/Reservations";
import UserManagement from "./pages/adminStuff/UserManagement";
import Attendees from "./pages/adminStuff/Attendees";
import ManageTrainings from "./pages/adminStuff/ManageTrainings";
import ManagePlaces from "./pages/adminStuff/ManagePlaces";
import ManageTrainingTypes from "./pages/adminStuff/ManageTrainingTypes";
import MessageBox from "./components/MessageBox";
import UserProfile from "./pages/adminStuff/UserProfile";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { error, data } = useQuery(CHECK_TOKEN, { skip: !token });

  useEffect(() => {
    dispatch(getUserFromStoredToken(data, error));
  }, [dispatch, error, data]);

  return (
    <div className="App">
      <NavigationBar />
      <MessageBox />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/checkins" component={Checkins} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/reservations" component={Reservations} />
        <Route exact path="/admin/users" component={UserManagement} />
        <Route path="/admin/users/:id" component={UserProfile} />
        <Route path="/admin/attendees" component={Attendees} />
        <Route path="/admin/trainings" component={ManageTrainings} />
        <Route path="/admin/places" component={ManagePlaces} />
        <Route path="/admin/ttypes" component={ManageTrainingTypes} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
