import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

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
    dispatch(appLoading());
    try {
      const response = await userLogin;

      if (response.data.login.user.isBlocked === false) {
        dispatch(loginSuccess(response.data.login));
        dispatch(showMessageWithTimeout("success", false, "Welcome!", 1500));
        dispatch(appDoneLoading());
      } else {
        dispatch(logoutAction());
        dispatch(
          showMessageWithTimeout(
            "danger",
            false,
            "Youre blocked, please contact our admin!",
            1500
          )
        );
        dispatch(appDoneLoading());
      }
    } catch (error) {
      if (error.response) {
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const signupAction = (newUser) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await newUser;
      dispatch(loginSuccess(response.data.signup));
      dispatch(showMessageWithTimeout("success", true, "Account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserFromStoredToken = (data, error) => {
  return async (dispatch, getState) => {
    if (error) console.log(error);
    if (!data) return;
    const user = await data;
    dispatch(appLoading());
    try {
      dispatch(validToken(user.checkToken));
      dispatch(appDoneLoading());
    } catch (error) {
      console.log(error);
      dispatch(logoutAction);
      dispatch(appDoneLoading());
    }
  };
};
