import { combineReducers } from 'redux';
import areaReducer from './Area/AreaReducer';
import fieldReducer from './Field/FieldReducer';

const rootReducer = combineReducers({
    areaReducer,
    fieldReducer,
});

export default rootReducer;
