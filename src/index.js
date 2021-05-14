import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "http://localhost:4000/graphql",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
