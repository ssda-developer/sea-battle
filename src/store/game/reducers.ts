import { CHANGE_GAME_STATUS, CHANGE_HINT, GameDispatchTypes } from './types';
import { IGame } from './interfaces';

const initialState: IGame = {
    gameStatus: false,
    hint: '',
};

const reducers = (state: IGame = initialState, action: GameDispatchTypes): IGame => {
    switch (action.type) {
        case CHANGE_GAME_STATUS:
            return {
                ...state,
                gameStatus: action.payload,
            };
        case CHANGE_HINT:
            return state;
        default:
            return state;
    }
};

export default reducers;
