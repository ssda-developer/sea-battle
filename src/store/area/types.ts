import { IField } from '../field/interfaces';

export const RENDER_USER_SQUARE = 'RENDER_USER_SQUARE';
export const RENDER_COMPUTER_SQUARE = 'RENDER_COMPUTER_SQUARE';
export const CHANGE_USER_SQUARE_COMPLETE = 'CHANGE_USER_SQUARE_COMPLETE';
export const CHANGE_COMPUTER_SQUARE_COMPLETE = 'CHANGE_COMPUTER_SQUARE_COMPLETE';
export const CHANGE_USER_SHIPS = 'CHANGE_USER_SHIPS';
export const CHANGE_COMPUTER_SHIPS = 'CHANGE_COMPUTER_SHIPS';

export type RenderUserSquare = {
    type: typeof RENDER_USER_SQUARE;
    payload: IField[][];
};

export type RenderComputerSquare = {
    type: typeof RENDER_COMPUTER_SQUARE;
    payload: IField[][];
};

export type ChangeUserSquareComplete = {
    type: typeof CHANGE_USER_SQUARE_COMPLETE;
    payload: boolean;
};

export type ChangeComputerSquareComplete = {
    type: typeof CHANGE_COMPUTER_SQUARE_COMPLETE;
    payload: boolean;
};

export type ChangeUserShips = {
    type: typeof CHANGE_USER_SHIPS;
    payload: number[];
};

export type ChangeComputerShips = {
    type: typeof CHANGE_COMPUTER_SHIPS;
    payload: number[];
};

export type AreaDispatchTypes =
    | RenderUserSquare
    | RenderComputerSquare
    | ChangeUserSquareComplete
    | ChangeComputerSquareComplete
    | ChangeUserShips
    | ChangeComputerShips;
