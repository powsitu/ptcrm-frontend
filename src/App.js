import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Checkins from "./pages/userStuff/Checkins";
import Feedback from "./pages/userStuff/Feedback";
import Reservations from "./pages/userStuff/Reservations";
import UserManagement from "./pages/adminStuff/UserManagement";
import Attendees from "./pages/adminStuff/Attendees";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/checkins" component={Checkins} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/reservations" component={Reservations} />
        <Route path="/admin/users" component={UserManagement} />
        <Route path="/admin/attendees" component={Attendees} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
