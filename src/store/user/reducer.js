const initialState = {
  token: localStorage.getItem("token"),
  id: null,
  firstName: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.login.token);
      return {
        ...state,
        ...action.payload.login.user,
        token: action.payload.login.token,
      };
      return state;

    default:
      return state;
  }
};
