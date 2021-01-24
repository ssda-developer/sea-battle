import { combineReducers } from 'redux';
import areaReducer from './Area/areaReducer';
import shipsReducer from './Ships/shipsReducer';

const rootReducer = combineReducers({
    areaReducer,
    shipsReducer,
});

export default rootReducer;
