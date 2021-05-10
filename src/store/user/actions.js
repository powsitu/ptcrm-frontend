import { apiUrl } from "../../config/myVars";

const loginSuccess = (userWithToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userWithToken,
  };
};

export const loginAction = (userLogin) => {
  return async (dispatch, getState) => {
    try {
      const response = await userLogin;
      console.log("logged in correctly");
      console.log("received back ", response);
      dispatch(loginSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
