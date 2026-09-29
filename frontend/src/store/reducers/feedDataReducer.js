const initialState = {
  createBranchLoading: false,
  createOrganizationLoading: false,
  createBranchError: null,
  createOrganizationError: null,
  createBranchData: [],
  createOrganizationData: [],
};

const feedDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_BRANCH_REQUEST":
      return {
        ...state,
        createBranchLoading: true,
        createBranchError: null,
      };
    case "CREATE_BRANCH_SUCCESS":
      return {
        ...state,
        createBranchLoading: false,
        createOrganizationLoading: false,
        createBranchData: action.payload,
      };
    case "CREATE_BRANCH_FAILURE":
      return {
        ...state,
        createBranchLoading: false,
        createOrganizationLoading: false,
        createBranchError: action.payload,
      };
    case "CREATE_ORGANIZATION_REQUEST":
      return {
        ...state,
        createOrganizationLoading: true,
        createOrganizationError: null,
      };
    case "CREATE_ORGANIZATION_SUCCESS":
      return {
        ...state,
        createOrganizationLoading: false,
        createOrganizationData: action.payload,
      };
    case "CREATE_ORGANIZATION_FAILURE":
      return {
        ...state,
        createOrganizationLoading: false,
        createOrganizationError: action.payload,
      };
    default:
      return state;
  }
};

export default feedDataReducer;
