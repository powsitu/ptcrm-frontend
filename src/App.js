import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import LogIn from "./pages/login";
import homepage from "./pages/homepage";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route exact path="/" component={homepage} />
      </Switch>
    </div>
  );
}

export default App;
