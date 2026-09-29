import apiClient from "../api";

// Action Types
export const GET_ORG_PROFILE_REQUEST = "GET_ORG_PROFILE_REQUEST";
export const GET_ORG_PROFILE_SUCCESS = "GET_ORG_PROFILE_SUCCESS";
export const GET_ORG_PROFILE_FAILURE = "GET_ORG_PROFILE_FAILURE";

export const UPDATE_ORG_PROFILE_REQUEST = "UPDATE_ORG_PROFILE_REQUEST";
export const UPDATE_ORG_PROFILE_SUCCESS = "UPDATE_ORG_PROFILE_SUCCESS";
export const UPDATE_ORG_PROFILE_FAILURE = "UPDATE_ORG_PROFILE_FAILURE";

export const TRANSFER_OWNERSHIP_REQUEST = "TRANSFER_OWNERSHIP_REQUEST";
export const TRANSFER_OWNERSHIP_SUCCESS = "TRANSFER_OWNERSHIP_SUCCESS";
export const TRANSFER_OWNERSHIP_FAILURE = "TRANSFER_OWNERSHIP_FAILURE";

/**
 * Fetch organization profile
 */
export const getOrgProfileAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORG_PROFILE_REQUEST });
    const response = await apiClient.get("/api/v1/organizations/profile");
    dispatch({
      type: GET_ORG_PROFILE_SUCCESS,
      payload: response.data.organization,
    });
    return response.data.organization;
  } catch (error) {
    const errorMsg =
      typeof error === "string"
        ? error
        : error.response?.data?.message || error.message || "Failed to load organization profile";
    dispatch({ type: GET_ORG_PROFILE_FAILURE, payload: errorMsg });
    throw error;
  }
};

/**
 * Update organization profile
 */
export const updateOrgProfileAction = (profileData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORG_PROFILE_REQUEST });
    const response = await apiClient.put("/api/v1/organizations/profile", profileData);
    dispatch({
      type: UPDATE_ORG_PROFILE_SUCCESS,
      payload: response.data.organization,
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      typeof error === "string"
        ? error
        : error.response?.data?.message || error.message || "Failed to update organization profile";
    dispatch({ type: UPDATE_ORG_PROFILE_FAILURE, payload: errorMsg });
    throw error;
  }
};

/**
 * Transfer Enterprise Admin ownership
 */
export const transferOwnershipAction = (targetUserId) => async (dispatch) => {
  try {
    dispatch({ type: TRANSFER_OWNERSHIP_REQUEST });
    const response = await apiClient.post("/api/v1/organizations/transfer-ownership", { targetUserId });
    dispatch({
      type: TRANSFER_OWNERSHIP_SUCCESS,
      payload: response.data.organization,
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      typeof error === "string"
        ? error
        : error.response?.data?.message || error.message || "Failed to transfer ownership";
    dispatch({ type: TRANSFER_OWNERSHIP_FAILURE, payload: errorMsg });
    throw error;
  }
};
