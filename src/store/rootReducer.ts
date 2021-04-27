import { combineReducers } from 'redux';
import gameReducers from './game/reducers';
import areaReducers from './area/reducers';

const rootReducer = combineReducers({
    gameReducer: gameReducers,
    areaReducer: areaReducers,
});

export default rootReducer;
