const initialState = {
    organizationData: [],
    organizationLoading: false,
    organizationError: null,
    branchData: [],
    branchLoading: false,
    branchError: null,
    branchByOrganizationData: [],
    branchByOrganizationLoading: false,
    branchByOrganizationError: null,
}

const dataListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_ORGANIZATION_REQUEST":
            return {
                ...state,
                organizationLoading: true,
                organizationError: null
            };
        case "LOAD_ORGANIZATION_SUCCESS":
            return {
                ...state,
                organizationLoading: false,
                organizationData: action.payload
            };
        case "LOAD_ORGANIZATION_FAILURE":
            return {
                ...state,
                organizationLoading: false,
                organizationError: action.payload
            };
        case "LOAD_BRANCH_REQUEST":
            return {
                ...state,
                branchLoading: true,
                branchError: null
            };
        case "LOAD_BRANCH_SUCCESS":
            return {
                ...state,
                branchLoading: false,
                branchData: action.payload
            };
        case "LOAD_BRANCH_FAILURE":
            return {
                ...state,
                branchLoading: false,
                branchError: action.payload
            };
        case "LOAD_BRANCH_BY_ORGANIZATION_REQUEST":
            return {
                ...state,
                branchByOrganizationLoading: true,
                branchByOrganizationError: null
            };
        case "LOAD_BRANCH_BY_ORGANIZATION_SUCCESS":
            return {
                ...state,
                branchByOrganizationLoading: false,
                branchByOrganizationData: action.payload
            };
        case "LOAD_BRANCH_BY_ORGANIZATION_FAILURE":
            return {
                ...state,
                branchByOrganizationLoading: false,
                branchByOrganizationError: action.payload
            };
        default:
            return state;
    }
};

export default dataListReducer;