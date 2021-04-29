import { CHANGE_CURRENT_PLAYER, CHANGE_GAME_OVER, CHANGE_GAME_START, GameDispatchTypes } from '../types/game';

import { IGame } from '../../interface';

const initialState: IGame = {
    gameStart: false,
    gameOver: false,
    currentPlayer: null,
};

const game = (state: IGame = initialState, action: GameDispatchTypes): IGame => {
    switch (action.type) {
        case CHANGE_GAME_START:
            return {
                ...state,
                gameStart: action.payload,
            };
        case CHANGE_GAME_OVER:
            return {
                ...state,
                gameOver: action.payload,
            };
        case CHANGE_CURRENT_PLAYER:
            return { ...state, currentPlayer: action.payload };
        default:
            return state;
    }
};

export default game;
