import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import homepage from "./pages/homepage";
import checkins from "./pages/userStuff/checkins";
import feedback from "./pages/userStuff/feedback";
import reservations from "./pages/userStuff/reservations";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/checkins" component={checkins} />
        <Route path="/feedback" component={feedback} />
        <Route path="/reservations" component={reservations} />
        <Route exact path="/" component={homepage} />
      </Switch>
    </div>
  );
}

export default App;
