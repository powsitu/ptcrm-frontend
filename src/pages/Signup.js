import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import SignUpForm from "../components/signupform";
import { SIGNUP } from "../store/user/gql_user";
import { signupAction } from "../store/user/actions";
import { selectToken } from "../store/user/selectors";

export default function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [firstName, set_firstName] = useState("");
  const [lastName, set_lastName] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [signup] = useMutation(SIGNUP);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    console.log(
      `trying to create an account for ${firstName} ${lastName} with email: ${email}`
    );
    event.preventDefault();
    const newUser = signup({
      variables: { email, password, firstName, lastName },
    });
    dispatch(signupAction(newUser));

    set_firstName("");
    set_lastName("");
    set_email("");
    set_password("");
  }

  return (
    <div>
      <SignUpForm
        firstName={firstName}
        firstNameChange={(event) => set_firstName(event.target.value)}
        lastName={lastName}
        lastNameChange={(event) => set_lastName(event.target.value)}
        email={email}
        emailChange={(event) => set_email(event.target.value)}
        password={password}
        passwordChange={(event) => set_password(event.target.value)}
        clickSubmit={submitForm}
      />
    </div>
  );
}
