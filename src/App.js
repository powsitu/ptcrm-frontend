import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import LogIn from "./pages/Login";
import SignUp from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Checkins from "./pages/userStuff/Checkins";
import Feedback from "./pages/userStuff/Feedback";
import Reservations from "./pages/userStuff/Reservations";
import UserManagement from "./pages/adminStuff/UserManagement";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/checkins" component={Checkins} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/reservations" component={Reservations} />
        <Route path="/admin/users" component={UserManagement} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
