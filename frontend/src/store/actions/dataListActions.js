import {
  LOAD_ORGANIZATION_REQUEST,
  LOAD_ORGANIZATION_SUCCESS,
  LOAD_ORGANIZATION_FAILURE,
  LOAD_BRANCH_REQUEST,
  LOAD_BRANCH_SUCCESS,
  LOAD_BRANCH_FAILURE,
  LOAD_BRANCH_BY_ORGANIZATION_REQUEST,
  LOAD_BRANCH_BY_ORGANIZATION_SUCCESS,
  LOAD_BRANCH_BY_ORGANIZATION_FAILURE
} from "../types/ActionTypes";
import apiClient from "../api";

export const loadOrganizationData = async (dispatch) => {
  try {
    dispatch({ type: LOAD_ORGANIZATION_REQUEST });
    const response = await apiClient.get("/api/v1/organizations/getOrganizationList");
    const data = await response.data;
    dispatch({ type: LOAD_ORGANIZATION_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: LOAD_ORGANIZATION_FAILURE, payload: error.message });
    throw error;
  }
};

export const loadBranchData = async (dispatch) => {
  try {
    dispatch({ type: LOAD_BRANCH_REQUEST });
    const response = await apiClient.get("/api/v1/branches/getBranchList");
    const data = await response.data;
    dispatch({ type: LOAD_BRANCH_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: LOAD_BRANCH_FAILURE, payload: error.message });
    throw error;
  }
};

export const loadBranchByOrganization = async (dispatch, organizationId) => {
  try {
    dispatch({ type: LOAD_BRANCH_BY_ORGANIZATION_REQUEST });
    const response = await apiClient.get(`/api/v1/branches/getBranchListByOrganization/${organizationId}`);
    const data = await response.data;
    dispatch({ type: LOAD_BRANCH_BY_ORGANIZATION_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: LOAD_BRANCH_BY_ORGANIZATION_FAILURE, payload: error.message });
    throw error;
  }
};
