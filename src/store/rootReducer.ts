import { combineReducers } from 'redux';
import areaReducers from './area/reducers';
import shipsReducers from './ships/reducers';

const rootReducer = combineReducers({
    areaReducer: areaReducers,
    shipsReducer: shipsReducers,
});

export default rootReducer;
