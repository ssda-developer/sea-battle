import { CHANGE_GAME_STATUS, CHANGE_HINT, GameDispatchTypes } from './types';
import { IHints } from './interfaces';

export const changeGameStatus = (status: boolean): GameDispatchTypes => {
    return {
        type: CHANGE_GAME_STATUS,
        payload: status,
    };
};

export const changeHint = (hintText: IHints): GameDispatchTypes => {
    return {
        type: CHANGE_HINT,
        payload: hintText,
    };
};
