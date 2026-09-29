import apiClient from "../api";

export const UPDATE_USER_PROFILE_REQUEST = "UPDATE_USER_PROFILE_REQUEST";
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const UPDATE_USER_PROFILE_FAILURE = "UPDATE_USER_PROFILE_FAILURE";

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

/**
 * Update personal profile
 */
export const updateMyProfileAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
    const response = await apiClient.put("/api/v1/users/me", userData);
    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload: response.data.user,
    });
    // Also update auth user in redux
    dispatch({
      type: "USER_LOAD_SUCCESS",
      payload: { user: response.data.user },
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      typeof error === "string"
        ? error
        : error.response?.data?.message || error.message || "Failed to update profile";
    dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: errorMsg });
    throw error;
  }
};

/**
 * Change personal password
 */
export const changePasswordAction = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    const response = await apiClient.put("/api/v1/users/change-password", passwords);
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data.message });
    return response.data;
  } catch (error) {
    const errorMsg =
      typeof error === "string"
        ? error
        : error.response?.data?.message || error.message || "Failed to change password";
    dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: errorMsg });
    throw error;
  }
};
