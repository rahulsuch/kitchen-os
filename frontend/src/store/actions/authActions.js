import { useDispatch } from "react-redux";
import apiClient from "../api";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  LOGIN_REQUEST,
} from "../types/ActionTypes";

export const signupaction = (userData) => async (dispatch) => {
  console.log("signup action called");
  try {
    dispatch({ type: SIGNUP_REQUEST });
    const response = await apiClient.post("api/v1/auth/signup", {
      username: userData.username,
      fullname: userData.fullName,
      email: userData.email,
      password: userData.password,
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
    const response = await apiClient.post("/v1/auth/login", {
      username: "alex",
      password: "securepassword",
    });
    const out = response.data;
    dispatch({ type: LOGIN_SUCCESS, payload: out });
    return out;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    throw error;
  }
};
