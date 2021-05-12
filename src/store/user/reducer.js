const initialState = {
  token: localStorage.getItem("token"),
  id: null,
  firstName: null,
  email: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
}
