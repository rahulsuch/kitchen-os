const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false, // Starts as false, but App.jsx triggers loadUser immediately
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOAD_REQUEST":
    case "SIGNUP_REQUEST":
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_LOAD_SUCCESS":
    case "SIGNUP_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case "LOGOUT_SUCCESS":
      return {
        ...initialState, // 🛡️ Wipes all user data from memory
        isAuthenticated: false,
        loading: false,
      };

    case "USER_LOAD_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        // We don't set the error string here to keep the UI clean on refresh
      };

    case "SIGNUP_FAILURE":
    case "LOGIN_FAILURE":
    case "LOGOUT_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;