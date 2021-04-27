import { IField } from '../field/interfaces';
import { Owners } from './interfaces';

export const RENDER_USER_SQUARE = 'RENDER_USER_SQUARE';
export const RENDER_COMPUTER_SQUARE = 'RENDER_COMPUTER_SQUARE';
export const CHANGE_OWNS = 'CHANGE_OWNS';
export const CHANGE_USER_SQUARE_COMPLETE = 'CHANGE_USER_SQUARE_COMPLETE';
export const CHANGE_COMPUTER_SQUARE_COMPLETE = 'CHANGE_COMPUTER_SQUARE_COMPLETE';

export type RenderUserSquare = {
    type: typeof RENDER_USER_SQUARE;
    payload: IField[][];
};

export type RenderComputerSquare = {
    type: typeof RENDER_COMPUTER_SQUARE;
    payload: IField[][];
};

export type ChangeOwns = {
    type: typeof CHANGE_OWNS;
    payload: Owners;
};

export type ChangeUserSquareComplete = {
    type: typeof CHANGE_USER_SQUARE_COMPLETE;
    payload: boolean;
};

export type ChangeComputerSquareComplete = {
    type: typeof CHANGE_COMPUTER_SQUARE_COMPLETE;
    payload: boolean;
};

export type AreaDispatchTypes =
    | RenderUserSquare
    | RenderComputerSquare
    | ChangeOwns
    | ChangeUserSquareComplete
    | ChangeComputerSquareComplete;
