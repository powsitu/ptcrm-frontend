import { apiUrl } from "../../config/myVars";

export const loginAction = (userLogin) => {
  return async (dispatch, getState) => {
    try {
      const response = await userLogin;
      console.log("logged in correctly");
    } catch (error) {
      console.log(error);
    }
  };
};
