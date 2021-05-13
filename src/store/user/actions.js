const loginSuccess = (userWithToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userWithToken,
  };
};

const validToken = (userWithNoToken) => ({
  type: "USER_WITH_NO_TOKEN",
  payload: userWithNoToken,
});

export const logoutAction = () => ({ type: "LOGOUT" });

export const loginAction = (userLogin) => {
  return async (dispatch, getState) => {
    try {
      const response = await userLogin;
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
      dispatch(loginSuccess(response.data.signup));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserFromStoredToken = (data, error) => {
  return async (dispatch, getState) => {
    if (error) console.log(error);
    if (!data) return;
    const user = await data;
    try {
      dispatch(validToken(user.checkToken));
    } catch (error) {
      console.log(error);
      dispatch(logoutAction);
    }
  };
};
