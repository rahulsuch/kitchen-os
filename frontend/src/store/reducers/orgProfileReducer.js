import {
  GET_ORG_PROFILE_REQUEST,
  GET_ORG_PROFILE_SUCCESS,
  GET_ORG_PROFILE_FAILURE,
  UPDATE_ORG_PROFILE_REQUEST,
  UPDATE_ORG_PROFILE_SUCCESS,
  UPDATE_ORG_PROFILE_FAILURE,
  TRANSFER_OWNERSHIP_REQUEST,
  TRANSFER_OWNERSHIP_SUCCESS,
  TRANSFER_OWNERSHIP_FAILURE,
} from "../actions/orgProfileActions";

const initialState = {
  profile: null,
  loading: false,
  saving: false,
  error: null,
  successMessage: null,
};

const orgProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORG_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_ORG_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: null,
      };

    case GET_ORG_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ORG_PROFILE_REQUEST:
    case TRANSFER_OWNERSHIP_REQUEST:
      return {
        ...state,
        saving: true,
        error: null,
        successMessage: null,
      };

    case UPDATE_ORG_PROFILE_SUCCESS:
      return {
        ...state,
        saving: false,
        profile: action.payload,
        error: null,
        successMessage: "Organization profile updated successfully",
      };

    case TRANSFER_OWNERSHIP_SUCCESS:
      return {
        ...state,
        saving: false,
        profile: action.payload,
        error: null,
        successMessage: "Ownership transferred successfully",
      };

    case UPDATE_ORG_PROFILE_FAILURE:
    case TRANSFER_OWNERSHIP_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default orgProfileReducer;
