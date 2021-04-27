export const CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS';

export type ChangeGameStatus = {
    type: typeof CHANGE_GAME_STATUS;
    payload: boolean;
};

export type GameDispatchTypes = ChangeGameStatus;
