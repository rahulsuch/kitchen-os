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
      type: "LOGOUT_FAILURE",
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};

export const loadUser = () => async (dispatch) => {
  console.log("loadUser action called");
  try {
    dispatch({ type: "USER_LOAD_REQUEST" });

    // apiClient should have withCredentials: true to send the cookie
    const { data } = await apiClient.get("/api/v1/auth/me");

    dispatch({
      type: "USER_LOAD_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    // 🛡️ Silent failure: If no cookie/expired, just set auth to false
    dispatch({
      type: "USER_LOAD_FAILURE",
      payload: error.response?.data?.message,
    });
  }
};
