const loginSuccess = (userWithToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userWithToken,
  };
};

export const logoutAction = () => ({ type: "LOGOUT" });

export const loginAction = (userLogin) => {
  return async (dispatch, getState) => {
    try {
      const response = await userLogin;
      console.log("logged in correctly");
      dispatch(loginSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signupAction = (newUser) => {
  return async (dispatch, getState) => {
    try {
      const response = await newUser;
      console.log("new user created correctly");
      dispatch(loginSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
