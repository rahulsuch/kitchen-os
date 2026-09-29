import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import dataListReducer from './dataListReducer.js'; // We will create/fix this next
import feedDataReducer from './feedDataReducer.js'; // We will create/fix this next

const rootReducer = combineReducers({
    auth: authReducer,
    dataList: dataListReducer, // Add this line for the dataListReducer
    feedData: feedDataReducer, // Add this line for the feedDataReducer
    // When you create orderReducer later, you add it here
});

export default rootReducer;