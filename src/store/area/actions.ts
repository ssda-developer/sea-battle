import {
    RENDER_USER_SQUARE,
    RENDER_COMPUTER_SQUARE,
    CHANGE_USER_SQUARE_COMPLETE,
    CHANGE_COMPUTER_SQUARE_COMPLETE,
    CHANGE_USER_SHIPS,
    CHANGE_COMPUTER_SHIPS,
    AreaDispatchTypes,
} from './types';
import { IField } from '../field/interfaces';

export const RenderUserSquare = (square: IField[][]): AreaDispatchTypes => {
    return {
        type: RENDER_USER_SQUARE,
        payload: square,
    };
};

export const RenderComputerSquare = (square: IField[][]): AreaDispatchTypes => {
    return {
        type: RENDER_COMPUTER_SQUARE,
        payload: square,
    };
};

export const ChangeUserSquareComplete = (complete: boolean): AreaDispatchTypes => {
    return {
        type: CHANGE_USER_SQUARE_COMPLETE,
        payload: complete,
    };
};

export const ChangeComputerSquareComplete = (complete: boolean): AreaDispatchTypes => {
    return {
        type: CHANGE_COMPUTER_SQUARE_COMPLETE,
        payload: complete,
    };
};

export const ChangeUserShips = (ships: number[]): AreaDispatchTypes => {
    return {
        type: CHANGE_USER_SHIPS,
        payload: ships,
    };
};

export const ChangeComputerShips = (ships: number[]): AreaDispatchTypes => {
    return {
        type: CHANGE_COMPUTER_SHIPS,
        payload: ships,
    };
};
