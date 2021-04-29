import { CHANGE_CURRENT_PLAYER, CHANGE_GAME_OVER, CHANGE_GAME_START, GameDispatchTypes } from '../types/game';

import { Owners } from '../../enums';

export const changeGameStart = (status: boolean): GameDispatchTypes => {
    return {
        type: CHANGE_GAME_START,
        payload: status,
    };
};

export const changeGameOver = (status: boolean): GameDispatchTypes => {
    return {
        type: CHANGE_GAME_OVER,
        payload: status,
    };
};

export const changeCurrentPlayer = (currentPlayer: Owners): GameDispatchTypes => {
    return {
        type: CHANGE_CURRENT_PLAYER,
        payload: currentPlayer,
    };
};
