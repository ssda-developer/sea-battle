import { combineReducers } from 'redux';
import { temporaryReducer } from './temporaryReducer';
import { areaReducer } from './areaReducer';

const rootReducer = combineReducers({
    temporaryReducer,
    areaReducer,
});

export default rootReducer;
