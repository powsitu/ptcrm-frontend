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
      console.log(response.data);
      dispatch(loginSuccess(response.data.login));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signupAction = (newUser) => {
  return async (dispatch, getState) => {
    try {
      const response = await newUser;
      console.log(response.data.signup);
      dispatch(loginSuccess(response.data.signup));
    } catch (error) {
      console.log(error);
    }
  };
};
