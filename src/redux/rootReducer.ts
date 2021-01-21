import { combineReducers } from 'redux';
import areaReducer from './Area/areaReducer';

const rootReducer = combineReducers({
    areaReducer,
});

export default rootReducer;
