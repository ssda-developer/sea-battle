import { CHANGE_CURRENT_PLAYER, CHANGE_GAME_START, GameDispatchTypes } from './types';
import { Owners } from '../area/interfaces';

export const ChangeGameStart = (status: boolean): GameDispatchTypes => {
    return {
        type: CHANGE_GAME_START,
        payload: status,
    };
};

export const ChangeCurrentPlayer = (currentPlayer: Owners): GameDispatchTypes => {
    return {
        type: CHANGE_CURRENT_PLAYER,
        payload: currentPlayer,
    };
};
