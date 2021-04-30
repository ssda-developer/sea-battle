import { ICell } from '../../interface';

export const RENDER_USER_SQUARE = 'RENDER_USER_SQUARE';
export const RENDER_COMPUTER_SQUARE = 'RENDER_COMPUTER_SQUARE';
export const CHANGE_USER_SQUARE_COMPLETE = 'CHANGE_USER_SQUARE_COMPLETE';
export const CHANGE_USER_SHIPS = 'CHANGE_USER_SHIPS';
export const CHANGE_COMPUTER_SHIPS = 'CHANGE_COMPUTER_SHIPS';

export type RenderUserField = {
    type: typeof RENDER_USER_SQUARE;
    payload: ICell[][];
};

export type RenderComputerField = {
    type: typeof RENDER_COMPUTER_SQUARE;
    payload: ICell[][];
};

export type ChangeUserShips = {
    type: typeof CHANGE_USER_SHIPS;
    payload: number[];
};

export type ChangeComputerShips = {
    type: typeof CHANGE_COMPUTER_SHIPS;
    payload: number[];
};

export type ChangeUserFieldComplete = {
    type: typeof CHANGE_USER_SQUARE_COMPLETE;
    payload: boolean;
};

export type AreaDispatchTypes = RenderUserField | RenderComputerField | ChangeUserFieldComplete | ChangeUserShips | ChangeComputerShips;
