import { useDispatch } from "react-redux";
import apiClient from "../api";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_SUCCESS,
  DUMMY_JSON_REQUEST,
  DUMMY_JSON_SUCCESS,
  DUMMY_JSON_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
} from "../types/ActionTypes";

export const signupaction = (userData) => async (dispatch) => {
  console.log("signup action called");
  try {
    dispatch({ type: SIGNUP_REQUEST });
    const response = await apiClient.post("/api/v1/auth/signup", {
      username: userData.username,
      fullname: userData.fullName,
      email: userData.email,
      password: userData.password,
      organization: userData.organization,
      branch: userData.branch
    });
    const out = response.data;
    dispatch({ type: SIGNUP_SUCCESS, payload: out });
    return out;
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    throw error;
  }
};

export const loginaction = (userData) => async (dispatch) => {
  console.log("login action called");
  try {
    dispatch({ type: LOGIN_REQUEST });
    const response = await apiClient.post("/api/v1/auth/login", {
      email: userData.email,
      password: userData.password,
    });
    const out = response.data;
    dispatch({ type: LOGIN_SUCCESS, payload: out });
    return out;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    throw error;
  }
};

export const logoutAction = () => async (dispatch) => {
  console.log("logout action called");
  try {
    const response = await apiClient.post("/api/v1/auth/logout");

    // This clears the user from your Redux state
    dispatch({ type: LOGOUT_SUCCESS, payload: response.data });

  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOAD_REQUEST" });

    // apiClient should have withCredentials: true to send the cookie
    const { data } = await apiClient.get("/api/v1/auth/me");

    dispatch({
      type: "USER_LOAD_SUCCESS",
      payload: data,
    });
  } catch (error) {
    // 🛡️ Silent failure: If no cookie/expired, just set auth to false
    dispatch({
      type: "USER_LOAD_FAILURE",
      payload: error.response?.data?.message,
    });
  }
};

export const loadDummyUser = () => async (dispatch) => {
  try {
    dispatch({ type: DUMMY_JSON_REQUEST })
    const { data } = await apiClient.get("https://dummyjson.com/users/?limit=10", {
      baseURL: "",             // Overrides the default baseURL
      withCredentials: false,  // Prevents sending your local cookies to DummyJSON
      headers: {
        Authorization: undefined // Removes the Bearer token injected by interceptor
      }
    });
    dispatch({ type: DUMMY_JSON_SUCCESS, payload: data })
    return data;
  } catch (error) {
    dispatch({ type: DUMMY_JSON_FAILURE, payload: error.message })
    throw error;
  }
};


export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const response = await apiClient.post("/api/v1/auth/forgot-password", { email });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
    throw error;
  }
};

export const resetPasswordAction = (token, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const response = await apiClient.post("/api/v1/auth/reset-password", { token, newPassword });
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
    throw error;
  }
};