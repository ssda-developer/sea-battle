import { Owners } from '../../enums';

export const CHANGE_GAME_START = 'CHANGE_GAME_START';
export const CHANGE_GAME_OVER = 'CHANGE_GAME_OVER';
export const CHANGE_CURRENT_PLAYER = 'CHANGE_CURRENT_PLAYER';

export type ChangeGameStart = {
    type: typeof CHANGE_GAME_START;
    payload: boolean;
};

export type ChangeGameOver = {
    type: typeof CHANGE_GAME_OVER;
    payload: boolean;
};

export type ChangeCurrentPlayer = {
    type: typeof CHANGE_CURRENT_PLAYER;
    payload: Owners;
};

export type GameDispatchTypes = ChangeGameStart | ChangeCurrentPlayer | ChangeGameOver;
