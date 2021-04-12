import { GAME_STATUS, CHANGE_HINT, GameDispatchTypes } from './types';
import { IGame } from './interfaces';

const initialState: IGame = {
    gameStatus: false,
    hint: '',
};

const reducers = (state: IGame = initialState, action: GameDispatchTypes): IGame => {
    switch (action.type) {
        case GAME_STATUS:
            return state;
        case CHANGE_HINT:
            return state;
        default:
            return state;
    }
};

export default reducers;
