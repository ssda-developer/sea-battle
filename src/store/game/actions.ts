import { CHANGE_GAME_STATUS, GameDispatchTypes } from './types';

export const changeGameStatus = (status: boolean): GameDispatchTypes => {
    return {
        type: CHANGE_GAME_STATUS,
        payload: status,
    };
};
