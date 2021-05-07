import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import LogIn from "./pages/login";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={LogIn} />
      </Switch>
    </div>
  );
}

export default App;
