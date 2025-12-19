import { combineReducers } from 'redux';
import authReducer from './authReducer.js'; // We will create/fix this next

const rootReducer = combineReducers({
    auth: authReducer,
    // When you create orderReducer later, you add it here
});

export default rootReducer;