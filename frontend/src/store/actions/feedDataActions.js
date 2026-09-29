import {
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_FAILURE,
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE,
} from "../types/ActionTypes";
import apiClient from "../api";

export const createBranch = (branchData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BRANCH_REQUEST });
    const response = await apiClient.post("/api/v1/feedData/createBranch", {
      data: branchData,
    });
    const data = await response.data;
    dispatch({ type: CREATE_BRANCH_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: CREATE_BRANCH_FAILURE, payload: error.message });
    throw error;
  }
};

export const createOrganization = (organizationData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORGANIZATION_REQUEST });
    const response = await apiClient.post("/api/v1/feedData/createOrganization", {
      data: organizationData,
    });
    const data = await response.data;
    dispatch({ type: CREATE_ORGANIZATION_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: CREATE_ORGANIZATION_FAILURE, payload: error.message });
    throw error;
  }
};
