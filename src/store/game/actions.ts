import { GAME_STATUS, CHANGE_HINT, GameDispatchTypes } from './types';
import { IHints } from './interfaces';

export const gameStatus = (): GameDispatchTypes => {
    return {
        type: GAME_STATUS,
    };
};

export const changeHint = (hintText: IHints): GameDispatchTypes => {
    return {
        type: CHANGE_HINT,
        payload: hintText,
    };
};
