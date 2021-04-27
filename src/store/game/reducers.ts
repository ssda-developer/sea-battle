import { CHANGE_GAME_STATUS, GameDispatchTypes } from './types';
import { IGame } from './interfaces';

const initialState: IGame = {
    gameStatus: false,
};

const reducers = (state: IGame = initialState, action: GameDispatchTypes): IGame => {
    switch (action.type) {
        case CHANGE_GAME_STATUS:
            return {
                ...state,
                gameStatus: action.payload,
            };
        default:
            return state;
    }
};

export default reducers;
