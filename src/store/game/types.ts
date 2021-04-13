import { IHints } from './interfaces';

export const CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS';
export const CHANGE_HINT = 'CHANGE_HINT';

export type ChangeGameStatus = {
    type: typeof CHANGE_GAME_STATUS;
    payload: boolean;
};

export type ChangeHint = {
    type: typeof CHANGE_HINT;
    payload: IHints;
};

export type GameDispatchTypes = ChangeGameStatus | ChangeHint;
