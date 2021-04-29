import {
    RENDER_USER_SQUARE,
    RENDER_COMPUTER_SQUARE,
    CHANGE_USER_SQUARE_COMPLETE,
    CHANGE_USER_SHIPS,
    CHANGE_COMPUTER_SHIPS,
    AreaDispatchTypes,
} from '../types/area';

import { ICell } from '../../interface';

export const renderUserSquare = (square: ICell[][]): AreaDispatchTypes => {
    return {
        type: RENDER_USER_SQUARE,
        payload: square,
    };
};

export const renderComputerSquare = (square: ICell[][]): AreaDispatchTypes => {
    return {
        type: RENDER_COMPUTER_SQUARE,
        payload: square,
    };
};

export const changeUserSquareComplete = (complete: boolean): AreaDispatchTypes => {
    return {
        type: CHANGE_USER_SQUARE_COMPLETE,
        payload: complete,
    };
};

export const changeUserShips = (ships: number[]): AreaDispatchTypes => {
    return {
        type: CHANGE_USER_SHIPS,
        payload: ships,
    };
};

export const changeComputerShips = (ships: number[]): AreaDispatchTypes => {
    return {
        type: CHANGE_COMPUTER_SHIPS,
        payload: ships,
    };
};
