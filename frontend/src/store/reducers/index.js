import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import dataListReducer from './dataListReducer.js';
import feedDataReducer from './feedDataReducer.js';
import orgProfileReducer from './orgProfileReducer.js';

const rootReducer = combineReducers({
    auth: authReducer,
    dataList: dataListReducer,
    feedData: feedDataReducer,
    orgProfile: orgProfileReducer,
});

export default rootReducer;