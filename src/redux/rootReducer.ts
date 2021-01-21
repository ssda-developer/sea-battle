import { combineReducers } from 'redux';
import areaReducer from './Area/areaReducer';
import fieldReducer from './Field/fieldReducer';

const rootReducer = combineReducers({
    areaReducer,
    fieldReducer,
});

export default rootReducer;
