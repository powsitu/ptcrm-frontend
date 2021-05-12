import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import LogInForm from "../components/loginForm";
import { LOGIN } from "../store/user/gql_user";
import { loginAction } from "../store/user/actions";
import { selectToken } from "../store/user/selectors";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [login] = useMutation(LOGIN);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();
    const user = login({ variables: { email, password } });
    dispatch(loginAction(user));

    set_email("");
    set_password("");
  }

  return (
    <div>
      <LogInForm
        email={email}
        emailChange={(event) => set_email(event.target.value)}
        password={password}
        passwordChange={(event) => set_password(event.target.value)}
        clickSubmit={submitForm}
      />
    </div>
  );
}
