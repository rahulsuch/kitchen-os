import * as types from "../types/ActionTypes.js";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case types.SIGNUP_SUCCESS:
      console.log("signup reached reducer", action.payload);
      return { ...state, loading: false, user: action.payload };
    case types.SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.LOGIN_REQUEST: // 👈 You can group these to save space
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user, // Matches your backend { user: {...} }
        isAuthenticated: true, // 👈 User is now logged in
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // The error string from your interceptor
        isAuthenticated: false,
        user: null, // 👈 Clear user on failure
      };
    default:
      return state;
  }
};

export default authReducer;
