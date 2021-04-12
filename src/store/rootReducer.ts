import { combineReducers } from 'redux';
import gameReducers from './game/reducers';
import areaReducers from './area/reducers';
import shipsReducers from './ships/reducers';

const rootReducer = combineReducers({
    gameReducer: gameReducers,
    areaReducer: areaReducers,
    shipsReducer: shipsReducers,
});

export default rootReducer;
