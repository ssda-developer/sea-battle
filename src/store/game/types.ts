import { IHints } from './interfaces';

export const GAME_STATUS = 'GAME_STATUS';
export const CHANGE_HINT = 'CHANGE_HINT';

export type GameStatus = {
    type: typeof GAME_STATUS;
};

export type ChangeHint = {
    type: typeof CHANGE_HINT;
    payload: IHints;
};

export type GameDispatchTypes = GameStatus | ChangeHint;
