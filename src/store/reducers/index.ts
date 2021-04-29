import { combineReducers } from 'redux';
import area from './area';
import game from './game';

const rootReducer = combineReducers({
    gameReducer: game,
    areaReducer: area,
});

export default rootReducer;
