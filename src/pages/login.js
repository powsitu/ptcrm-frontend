import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogIn from "../components/loginForm";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  function submitForm(event) {
    console.log("trying to login");
    event.preventDefault();

    dispatch(login(email, password));

    set_email("");
    set_password("");
  }

  return (
    <div>
      <LogIn
        email={email}
        emailChange={(event) => set_email(event.target.value)}
        password={password}
        passwordChange={(event) => set_password(event.target.value)}
        clickSubmit={submitForm}
      />
    </div>
  );
}
